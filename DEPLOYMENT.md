# DesignFoundry — Deployment & Handover Guide

**Git Backup Commit:** `796f7b2` on branch `main` (`31 files changed`)  
**Target Framework:** `.NET 8.0` (`Designsfactory`)

---

## 1. What Has Been Completed

### A. Backend, Error Handling & Logging

- **Global Exception Handling & Custom Error Page:** Configured `Program.cs` with `UseExceptionHandler("/Error")`, `UseStatusCodePagesWithReExecute("/Error")`, and HSTS in non-development environments, backed by `Pages/Error.cshtml` and `Pages/Error.cshtml.cs`.
- **Daily Rolling File Logging:** Added `Services/FileLoggerProvider.cs` and registered it in `Program.cs` so application warnings, errors, and contact/SMTP diagnostics are written to daily log files (excluded from Git via `.gitignore`).
- **Microsoft 365 SMTP Integration (`Controllers/ContactController.cs`):**
  - Configured `SmtpSettings` (`smtp.office365.com`, port `587`, STARTTLS) in `appsettings.json` and `appsettings.example.json`.
  - Fixed recipient address so inquiries are delivered to the configured office `RecipientEmail`, while any visitor email can submit the form (`ReplyTo` set to the visitor's email).
  - Enforced compulsory form fields and added support for custom CAD platform entry when **Other** is selected.
- **Microsoft Bookings Integration:**
  - Centralized `BookingSettings:MicrosoftBookingsUrl` in `appsettings.json` / `appsettings.example.json` and wired it into `Pages/Shared/_Layout.cshtml`, `Pages/Shared/_Customers.cshtml`, `Pages/Shared/_About.cshtml`, and `Pages/Shared/_Contact.cshtml` (via `Pages/_ViewImports.cshtml` injecting `IConfiguration`).

### B. Frontend Architecture, Theme & Sections

- **Global Theme Tokens (`wwwroot/css/variables.css`, `wwwroot/css/site.css`):**
  - Standardized Light and Dark mode semantic tokens (`--surface-stage`, `--border-subtle`, `--text-head`, `--text-secondary`, `--primary-accent`, `--nav-bg`, etc.).
  - Fixed the **Book a Call** `#inquiryDialog` modal to obey Light/Dark theme tokens and resolved the `.inquiry-head` close (`×`) button overlap.
  - Standardized section vertical rhythm (`--section-pad-top`, `--section-pad-bottom`), fluid root `font-size`, and `@media (max-height: 760px)` viewport guard.
- **Solution & Benefits Sections:**
  - Redesigned `Pages/Shared/_Answers.cshtml` (`wwwroot/css/answers.css`, `wwwroot/js/answers.js`) with the interactive `Conventional` / `DesignFoundry` pipeline and 5s auto-reset.
  - Added the `03 / BENEFITS` section (`Pages/Shared/_Impact.cshtml`, `wwwroot/css/impact.css`) and linked `#benefits` in the navigation.
- **Modular JavaScript:**
  - Split section logic out of `wwwroot/js/site.js` into `wwwroot/js/answers.js`, `wwwroot/js/copilot.js`, `wwwroot/js/foundation.js`, `wwwroot/js/customers.js`, `wwwroot/js/about.js`, and `wwwroot/js/contact.js`.

### C. Mobile & Tablet Responsiveness

- **Navbar & Floating Dropdown (`Pages/Shared/_Layout.cshtml`, `wwwroot/css/navbar.css`, `wwwroot/js/site.js`, `wwwroot/js/contact.js`):**
  - Compacted tablet links (`<= 1120px`), added `#mobileBookCallBtn` and `#mobileMenuBtn` (`<= 900px`), and converted `#mobileNavDrawer` into an interactive floating dropdown below `.nav-capsule`.
  - Synced ScrollSpy and click `.active` states + glowing orange `::after` underline and pill hover highlights across both desktop and mobile links.
- **Section Breakpoints:**
  - Refined mobile CSS across `wwwroot/css/hero.css`, `wwwroot/css/copilot.css`, `wwwroot/css/foundation.css`, `wwwroot/css/contact.css`, and `wwwroot/css/footer.css` (complementing existing responsive rules in `problem.css`, `answers.css`, `impact.css`, `customers.css`, and `about.css`).

---

## 2. What Is Left Before Production Deployment

1. **Configure Real Secrets & Booking URL in `appsettings.json` (or Environment Variables):**
   - `BookingSettings:MicrosoftBookingsUrl`: Replace `"https://outlook.office.com/bookwithme/"` with your live Microsoft Bookings / *Bookings with me* scheduling page URL.
   - `SmtpSettings:Password`: Replace `"YOUR_MICROSOFT_APP_PASSWORD"` with your Microsoft 365 App Password (recommended: set `SmtpSettings__Password` via hosting environment variables instead of storing secrets on disk).
   - Confirm `SmtpSettings:SenderEmail` and `SmtpSettings:RecipientEmail` (`mail@aryamantechnologies.com`) match the licensed Microsoft 365 mailbox, and ensure **Authenticated SMTP** is enabled for that mailbox in the Microsoft 365 Admin Center.
   - *(Optional)* Enable email notifications inside Microsoft Bookings so Aryaman receives calendar/email alerts whenever a call slot is booked.

2. **Live End-to-End Verification:**
   - **Contact Form & SMTP Test:** Submit both the **Book a Call** modal and `/contact` form (including selecting **Other** CAD platform) and confirm email delivery + daily log output in `Logs/`.
   - **Bookings Flow:** Click the **Discuss this Copilot** / Bookings links and confirm the live Microsoft Bookings slot-selection page opens properly.
   - **Mobile Browser QA:** Test on real mobile/tablet viewports (`375px`, `480px`, `768px`, `900px`) in both Light and Dark themes to verify dropdown navigation, scroll-spy highlights, modals, and section spacing.

3. **Publish & Push:**
   - Commit `DEPLOYMENT.md` (if desired) and push `main` to `origin/main` (`git push origin main`).
   - Run `dotnet publish -c Release` and deploy to your target server/host with `ASPNETCORE_ENVIRONMENT=Production`.
