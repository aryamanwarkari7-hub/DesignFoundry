using System.Threading.RateLimiting;
using Designsfactory.Services;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.ResponseCompression;

var builder = WebApplication.CreateBuilder(args);

// ==========================================================
// 0. PRODUCTION LOGGING (CONSOLE TIMESTAMPS + DAILY LOG FILES)
// ==========================================================
builder.Logging.AddSimpleConsole(options =>
{
    options.TimestampFormat = "[yyyy-MM-dd HH:mm:ss] ";
    options.SingleLine = true;
});
builder.Logging.AddProvider(
    new FileLoggerProvider(Path.Combine(builder.Environment.ContentRootPath, "Logs"))
);

// ==========================================================
// 1. CORE SERVICES (MVC CONTROLLERS + RAZOR PAGES + HEALTH)
// ==========================================================
// AddControllersWithViews supports both JSON API Controllers (e.g. ContactController)
// and future MVC View Controllers (e.g. individual Foundation product pages).
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();
builder.Services.AddHealthChecks();

// ==========================================================
// 2. RESPONSE COMPRESSION (BROTLI + GZIP FOR FASTER LOADS)
// ==========================================================
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
});

// ==========================================================
// 3. API RATE LIMITING (PROTECT /api/contact/inquiry FROM SPAM)
// ==========================================================
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddFixedWindowLimiter("InquiryLimit", limiterOptions =>
    {
        limiterOptions.PermitLimit = 5;
        limiterOptions.Window = TimeSpan.FromMinutes(1);
        limiterOptions.QueueLimit = 0;
    });
});

// ==========================================================
// 4. REVERSE PROXY / IIS FORWARDED HEADERS
// ==========================================================
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});

var app = builder.Build();

// ==========================================================
// 5. HTTP REQUEST PIPELINE
// ==========================================================
app.UseForwardedHeaders();

if (!app.Environment.IsDevelopment())
{
    // Production error page & strict HTTPS transport (HSTS)
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

// Render branded /Error page for 404/status codes on web pages (keep /api/* returning JSON)
app.UseWhen(
    ctx => !ctx.Request.Path.StartsWithSegments("/api"),
    branch => branch.UseStatusCodePagesWithReExecute("/Error", "?statusCode={0}")
);

app.UseHttpsRedirection();

// Compress HTML, CSS, JS, and JSON responses
app.UseResponseCompression();

// Serve wwwroot static assets (with 30-day browser caching in Production)
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        if (!app.Environment.IsDevelopment())
        {
            ctx.Context.Response.Headers.CacheControl = "public,max-age=2592000";
        }
    }
});

// Security hardening headers on all responses
app.Use(async (context, next) =>
{
    context.Response.Headers.XContentTypeOptions = "nosniff";
    context.Response.Headers.XFrameOptions = "SAMEORIGIN";
    context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    context.Response.Headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()";
    await next();
});

app.UseRouting();
app.UseRateLimiter();
app.UseAuthorization();

// ==========================================================
// 6. ENDPOINT MAPPINGS
// ==========================================================
app.MapHealthChecks("/health");
app.MapControllers();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
);
app.MapRazorPages();

app.Run();
