using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;

namespace Designsfactory.Controllers;

[ApiController]
[Route("api/[controller]")]
[IgnoreAntiforgeryToken]
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

    [HttpPost("inquiry")]
    public async Task<IActionResult> SubmitInquiry([FromBody] InquiryModel model)
    {
        if (string.IsNullOrWhiteSpace(model?.Email) || !model.Email.Contains("@"))
        {
            return BadRequest(
                new { success = false, message = "A valid corporate or work email is required." }
            );
        }

        var senderEmail = _config["SmtpSettings:SenderEmail"];
        var recipientEmail = _config["SmtpSettings:RecipientEmail"];
        var password = _config["SmtpSettings:Password"];
        var smtpHost = _config["SmtpSettings:Server"] ?? "smtp.rediffmailpro.com";
        var smtpPort = int.TryParse(_config["SmtpSettings:Port"], out var port) ? port : 587;

        if (string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(senderEmail))
        {
            _logger.LogWarning("SMTP credentials pending in appsettings.json.");
            await Task.Delay(500);
            return Ok(
                new
                {
                    success = true,
                    message = "Inquiry logged. (Add Rediff credentials in appsettings.json)",
                }
            );
        }

        try
        {
            using var mail = new MailMessage();
            mail.From = new MailAddress(
                senderEmail,
                _config["SmtpSettings:SenderName"] ?? "DesignFoundry Copilot"
            );
            mail.To.Add(recipientEmail);
            mail.ReplyToList.Add(new MailAddress(model.Email)); // Replies go directly to prospective client

            mail.Subject =
                $"[DesignFoundry Lead] Discuss {model.Equipment ?? "Copilot"} - {model.CadPlatform ?? "CAD"}";
            mail.Body =
                $@"Hello Team,

A prospective client submitted an engineering copilot inquiry:

--------------------------------------------------
CLIENT BRIEF:
--------------------------------------------------
• Client Work Email: {model.Email}
• CAD Platform:      {model.CadPlatform ?? "SolidWorks"}
• Target Equipment:  {model.Equipment ?? "Custom Copilot"}
• Submitted At:      {DateTime.Now:yyyy-MM-dd HH:mm:ss} (IST)
--------------------------------------------------

Hit 'Reply' to respond directly to this client.";

            using var smtpClient = new SmtpClient(smtpHost, smtpPort)
            {
                Credentials = new NetworkCredential(senderEmail, password),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
            };

            await smtpClient.SendMailAsync(mail);
            _logger.LogInformation(
                "Email dispatched from {Sender} to {Recipient}",
                senderEmail,
                recipientEmail
            );

            return Ok(
                new
                {
                    success = true,
                    message = "Inquiry sent successfully to our engineering team!",
                }
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "SMTP dispatch error: {Message}", ex.Message);
            return StatusCode(
                500,
                new
                {
                    success = false,
                    message = "Email dispatch failed. Please check credentials.",
                }
            );
        }
    }
}
