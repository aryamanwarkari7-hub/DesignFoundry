using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace Designsfactory.Controllers;

[ApiController]
[Route("api/[controller]")]
[IgnoreAntiforgeryToken]
[EnableRateLimiting("InquiryLimit")]
public class ContactController : ControllerBase
{
    private readonly ILogger<ContactController> _logger;
    private readonly IConfiguration _config;

    public ContactController(ILogger<ContactController> logger, IConfiguration config)
    {
        _logger = logger;
        _config = config;
    }

    public class InquiryModel
    {
        public string? CadPlatform { get; set; }
        public string? Equipment { get; set; }
        public string? Email { get; set; }
    }

    public class BookingNotificationModel
    {
        public string? VisitorEmail { get; set; }
        public string? VisitorName { get; set; }
        public string? SlotTime { get; set; }
        public string? Topic { get; set; }
    }

    /// <summary>
    /// Validates all required inquiry fields and dispatches lead to corporate Microsoft 365 inbox.
    /// Sender (visitor) can use any email; Reply-To is set to the visitor's email.
    /// POST: /api/contact/inquiry
    /// </summary>
    [HttpPost("inquiry")]
    public async Task<IActionResult> SubmitInquiry([FromBody] InquiryModel? model)
    {
        if (model == null)
        {
            return BadRequest(new { success = false, message = "All inquiry fields are required." });
        }

        var cadPlatform = model.CadPlatform?.Trim();
        var equipment = model.Equipment?.Trim();
        var visitorEmail = model.Email?.Trim();

        // Compulsory validation for every field in the form
        if (string.IsNullOrWhiteSpace(cadPlatform))
        {
            return BadRequest(new { success = false, message = "Please select your CAD platform." });
        }

        if (string.IsNullOrWhiteSpace(equipment))
        {
            return BadRequest(new { success = false, message = "Please enter the equipment or product to automate." });
        }

        if (string.IsNullOrWhiteSpace(visitorEmail) || !MailAddress.TryCreate(visitorEmail, out var replyToAddress))
        {
            return BadRequest(new { success = false, message = "Please enter a valid email address." });
        }

        var subject = $"[DesignFoundry Lead] {equipment} — {cadPlatform}";
        var body =
$@"Hello Aryaman Engineering Team,

A visitor submitted a DesignFoundry inquiry from the website:

--------------------------------------------------
CLIENT BRIEF:
--------------------------------------------------
• Sender Email:      {visitorEmail}
• CAD Platform:      {cadPlatform}
• Target Equipment:  {equipment}
• Submitted At:      {DateTime.Now:yyyy-MM-dd HH:mm:ss} (IST)
--------------------------------------------------

Click 'Reply' to respond directly to {visitorEmail}.";

        return await DispatchSmtpEmailAsync(
            visitorEmail: visitorEmail,
            replyToAddress: replyToAddress,
            subject: subject,
            body: body,
            successMessage: "Inquiry sent successfully to our engineering team!"
        );
    }

    /// <summary>
    /// Optional endpoint/webhook to notify Aryaman when a call slot is booked.
    /// POST: /api/contact/booking-notify
    /// </summary>
    [HttpPost("booking-notify")]
    public async Task<IActionResult> NotifySlotBooked([FromBody] BookingNotificationModel? model)
    {
        if (model == null || string.IsNullOrWhiteSpace(model.SlotTime))
        {
            return BadRequest(new { success = false, message = "Slot time is required." });
        }

        MailAddress? replyTo = null;
        if (!string.IsNullOrWhiteSpace(model.VisitorEmail))
        {
            MailAddress.TryCreate(model.VisitorEmail.Trim(), out replyTo);
        }

        var visitorLabel = replyTo?.Address ?? model.VisitorName?.Trim() ?? "Website Visitor";
        var subject = $"[DesignFoundry Slot Booked] {model.SlotTime.Trim()} — {visitorLabel}";
        var body =
$@"Hello Aryaman Engineering Team,

A DesignFoundry demo/consultation slot has been booked:

--------------------------------------------------
BOOKING DETAILS:
--------------------------------------------------
• Booked Slot:   {model.SlotTime.Trim()}
• Visitor Name:  {model.VisitorName?.Trim() ?? "Not provided"}
• Visitor Email: {replyTo?.Address ?? "Not provided"}
• Topic / Flow:  {model.Topic?.Trim() ?? "DesignFoundry Demo"}
• Logged At:     {DateTime.Now:yyyy-MM-dd HH:mm:ss} (IST)
--------------------------------------------------";

        return await DispatchSmtpEmailAsync(
            visitorEmail: visitorLabel,
            replyToAddress: replyTo,
            subject: subject,
            body: body,
            successMessage: "Booking notification sent to Aryaman team!"
        );
    }

    private async Task<IActionResult> DispatchSmtpEmailAsync(
        string visitorEmail,
        MailAddress? replyToAddress,
        string subject,
        string body,
        string successMessage)
    {
        var senderEmail = _config["SmtpSettings:SenderEmail"] ?? "mail@aryamantechnologies.com";
        var recipientEmail = _config["SmtpSettings:RecipientEmail"] ?? "mail@aryamantechnologies.com";
        var senderName = _config["SmtpSettings:SenderName"] ?? "DesignFoundry Lead Engine";
        var password = _config["SmtpSettings:Password"];
        var smtpHost = _config["SmtpSettings:Server"] ?? "smtp.office365.com";
        var smtpPort = int.TryParse(_config["SmtpSettings:Port"], out var port) ? port : 587;

        if (string.IsNullOrWhiteSpace(password) || password.Contains("YOUR_MICROSOFT", StringComparison.OrdinalIgnoreCase))
        {
            _logger.LogWarning("Microsoft 365 SMTP password not configured in appsettings.json. Logged notification without live email: {Subject}", subject);
            await Task.Delay(400);
            return Ok(new
            {
                success = true,
                message = "Logged locally. (Add Microsoft 365 App Password in appsettings.json for live email delivery)"
            });
        }

        try
        {
            using var mail = new MailMessage();
            mail.From = new MailAddress(senderEmail, $"{visitorEmail} (via {senderName})");
            mail.To.Add(recipientEmail);
            if (replyToAddress != null)
            {
                mail.ReplyToList.Add(replyToAddress);
            }
            mail.Subject = subject;
            mail.Body = body;

            using var smtpClient = new SmtpClient(smtpHost, smtpPort)
            {
                Credentials = new NetworkCredential(senderEmail, password),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Timeout = 15000
            };

            await smtpClient.SendMailAsync(mail);
            _logger.LogInformation(
                "Email dispatched via {SmtpHost} to {Recipient} | Subject: {Subject}",
                smtpHost, recipientEmail, subject
            );

            return Ok(new { success = true, message = successMessage });
        }
        catch (SmtpException smtpEx)
        {
            _logger.LogError(smtpEx, "SMTP dispatch failed (StatusCode: {StatusCode}): {Message}", smtpEx.StatusCode, smtpEx.Message);
            return StatusCode(500, new
            {
                success = false,
                message = "Email service temporarily unavailable. Please contact mail@aryamantechnologies.com directly."
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error dispatching email for {Visitor}", visitorEmail);
            return StatusCode(500, new
            {
                success = false,
                message = "An unexpected error occurred while sending notification."
            });
        }
    }
}
