# Microsoft 365 Email Setup Guide (DesignFoundry)

This guide provides step-by-step instructions to switch the DesignFoundry lead generation engine to your official corporate Microsoft 365 email account (**`mail@aryamantechnologies.com`**).

---

## 1. Overview of the Flow

When a prospective client submits an inquiry on DesignFoundry:
1. **Frontend:** The visitor enters their work email, CAD platform, and equipment brief.
2. **Backend (`POST /api/contact/inquiry`):** `ContactController` packages the details.
3. **Microsoft 365 SMTP Relay:** The server authenticates with `smtp.office365.com` and dispatches the email.
4. **Delivery:** The inquiry lands directly in **`mail@aryamantechnologies.com`**.
5. **1-Click Reply:** You hit **"Reply"** in Outlook, and your response goes directly to the client's work email (`Reply-To` header).

---

## 2. Microsoft 365 Pre-Requisites

Before updating your configuration, verify two settings in Microsoft 365:

### A. Enable "Authenticated SMTP" for the Mailbox
Microsoft disables SMTP client submission by default on newer tenants. Enable it with these steps:
1. Go to the [Microsoft 365 Admin Center](https://admin.microsoft.com).
2. Navigate to **Users** &rarr; **Active users**.
3. Click on **`mail@aryamantechnologies.com`**.
4. In the pane on the right, click the **Mail** tab.
5. Under **Email apps**, click **Manage email apps**.
6. Ensure **Authenticated SMTP** is **checked** &check;.
7. Click **Save changes**.

### B. Handle Two-Factor Authentication (MFA)
* **If 2FA/MFA is enabled on `mail@aryamantechnologies.com` (Standard / Recommended):**
  You must generate an **App Password** (your normal login password will be rejected by SMTP):
  1. Sign in to [mysignins.microsoft.com/security-info](https://mysignins.microsoft.com/security-info) using `mail@aryamantechnologies.com`.
  2. Click **+ Add sign-in method**.
  3. Select **App password** from the dropdown and click **Add**.
  4. Enter a name (e.g. `DesignFoundry Website`) and copy the generated 16-character password.
* **If 2FA/MFA is disabled:**
  You can use your standard Microsoft 365 account password.

---

## 3. Exact Code Changes to Make

### File 1: `appsettings.json`
Open `d:\CODING\ARYAMAN\Designsfactory\appsettings.json` and replace the `SmtpSettings` block:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "SmtpSettings": {
    "Server": "smtp.office365.com",
    "Port": 587,
    "SenderEmail": "mail@aryamantechnologies.com",
    "SenderName": "DesignFoundry Copilot Lead",
    "RecipientEmail": "mail@aryamantechnologies.com",
    "Password": "YOUR_M365_PASSWORD_OR_APP_PASSWORD"
  }
}
```

---

### File 2: Optional Multi-Recipient CC in `Controllers/ContactController.cs`
If you want leads to be delivered to both `mail@aryamantechnologies.com` and a secondary leadership email (such as `dhananjay@aryamantechnologies.com`):

In `d:\CODING\ARYAMAN\Designsfactory\Controllers\ContactController.cs`, locate line 64:

```csharp
mail.To.Add(recipientEmail);
```

Add an optional CC below it:

```csharp
mail.To.Add(recipientEmail);
// Optional: CC leadership
mail.CC.Add("dhananjay@aryamantechnologies.com");
```

---

## 4. How to Apply & Verify

1. Save `appsettings.json`.
2. Restart the web application:
   ```powershell
   # In terminal:
   Ctrl + C
   dotnet run
   ```
3. Open the website in your browser:
   * Click **"Book a Call"** (or **"Discuss your Copilot"**).
   * Enter a test email (e.g. `test.engineer@company.com`).
   * Select a CAD tool (e.g. `SolidWorks`) and enter equipment (`Centrifugal Fan`).
   * Click **"Send Inquiry"**.
4. Check your Outlook or Microsoft 365 webmail at [outlook.office.com](https://outlook.office.com):
   * An email titled `[DesignFoundry Lead] Discuss Centrifugal Fan - SolidWorks` will be in your inbox.
   * Click **"Reply"** to verify that Outlook targets `test.engineer@company.com`.

---

## 5. Troubleshooting Microsoft 365 Errors

| Error Code | Cause | Solution |
| :--- | :--- | :--- |
| `5.7.139 Authentication unsuccessful` | Authenticated SMTP is turned off in M365 Admin Portal. | Follow Step 2A above to enable "Authenticated SMTP" for `mail@aryamantechnologies.com`. |
| `5.7.57 Client was not authenticated` | Incorrect password or MFA is active. | Generate a fresh App Password following Step 2B above and update `appsettings.json`. |
| `5.7.60 SendAsDeniedException` | `From` address does not match authenticated user. | Ensure `SenderEmail` in `appsettings.json` is set to `mail@aryamantechnologies.com`. |
