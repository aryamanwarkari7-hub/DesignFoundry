using System.Diagnostics;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Designsfactory.Pages;

[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
[IgnoreAntiforgeryToken]
public class ErrorModel : PageModel
{
    private readonly ILogger<ErrorModel> _logger;

    public ErrorModel(ILogger<ErrorModel> logger)
    {
        _logger = logger;
    }

    public string? RequestId { get; set; }
    public int ErrorStatusCode { get; set; } = 500;
    public bool IsNotFound => ErrorStatusCode == 404;

    public void OnGet(int? statusCode = null)
    {
        RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
        ErrorStatusCode = statusCode ?? HttpContext.Response.StatusCode;

        var exceptionFeature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
        if (exceptionFeature?.Error != null)
        {
            _logger.LogError(
                exceptionFeature.Error,
                "Unhandled exception on path {Path} (RequestId: {RequestId})",
                exceptionFeature.Path,
                RequestId
            );
            ErrorStatusCode = 500;
            return;
        }

        var reExecuteFeature = HttpContext.Features.Get<IStatusCodeReExecuteFeature>();
        if (ErrorStatusCode == 404)
        {
            _logger.LogWarning(
                "404 Not Found: {OriginalPath}{QueryString} (RequestId: {RequestId})",
                reExecuteFeature?.OriginalPath ?? HttpContext.Request.Path.ToString(),
                reExecuteFeature?.OriginalQueryString ?? "",
                RequestId
            );
        }
        else if (ErrorStatusCode >= 400)
        {
            _logger.LogWarning(
                "HTTP {StatusCode} on {OriginalPath} (RequestId: {RequestId})",
                ErrorStatusCode,
                reExecuteFeature?.OriginalPath ?? HttpContext.Request.Path.ToString(),
                RequestId
            );
        }
    }
}
