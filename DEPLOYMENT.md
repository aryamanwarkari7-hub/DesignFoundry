# DesignFoundry — Deployment & Handover Guide

**Target Framework:** `.NET 8.0` (`Designsfactory`)  
**Last Updated:** 26 Nov 2026

---

## 1. What Has Been Completed

### A. Backend, Error Handling & Logging
- **Global Exception Handling & Custom Error Page:** Configured `Program.cs` with `UseExceptionHandler("/Error")`, `UseStatusCodePagesWithReExecute("/Error")`, and HSTS in non-development environments, backed by `Pages/Error.cshtml` and `Pages/Error.cshtml.cs`.
- **Daily Rolling File Logging:** Added `Services/FileLoggerProvider.cs` and registered it in `Program.cs` so warnings, errors, and contact/SMTP diagnostics write to daily files in `Logs/` (ignored in `.gitignore`).
- **Microsoft 365 SMTP Integration (`Controllers/ContactController.cs`):**
  - Configured `SmtpSettings` (`smtp.office365.com`, port `587`, STARTTLS) in `appsettings.json` and `appsettings.example.json`.
  - Delivers inquiries to the configured office `RecipientEmail` while setting `ReplyTo` to the visitor's email.
  - Enforces compulsory form fields and supports custom CAD platform entry when **Other** is selected.
- **Microsoft Bookings Integration:** Centralized `BookingSettings:MicrosoftBookingsUrl` in `appsettings.json` / `appsettings.example.json` and wired it across `_Layout.cshtml`, `_Customers.cshtml`, `_About.cshtml`, `_Contact.cshtml`, and `Pages/Applications/Detail.cshtml`.

### B. Frontend Architecture, Theme & Sections
- **Global Tokens & Pointer Behavior (`wwwroot/css/variables.css`, `wwwroot/css/site.css`):**
  - Standardized Light/Dark semantic tokens (`--surface-stage`, `--surface-elevated`, `--border-subtle`, `--text-head`, `--text-secondary`, `--primary-accent`, `--nav-bg`, etc.), fixed the `#inquiryDialog` Light/Dark theme + `.inquiry-head` close button clash, and enforced global `cursor: pointer` across all clickable elements.
- **Hero (`Pages/Shared/_Hero.cshtml`, `wwwroot/css/hero.css`):**
  - Updated transformation cards to Axial Fan inputs (`AIR FLOW`, `PRESSURE`, `TEMPERATURE`, `SPEED`) and `wwwroot/images/hero_card_deliverables_fan.png`.
- **Problem (`Pages/Shared/_Problem.cshtml`, `wwwroot/css/problem.css`):**
  - Replaced with the 5-step Axial Flow Fan workflow (`1 | Sketch` → `2 | Design Calculations` → `3 | 3D Model` → `4 | 2D Drawing` → `5 | BOM`).
- **Solution (`Pages/Shared/_Answers.cshtml`, `wwwroot/css/answers.css`, `wwwroot/js/answers.js`):**
  - Interactive `Conventional` (5 Bootstrap-icon step cards, red progress bar) ↔ `DesignFoundry` (compact left card with 4 individual step boxes, Hero-style circular orange glass arrow, right `Ready for manufacturing` card, green progress bar) stage with tapping-hand cue on the `DesignFoundry` pill.
- **Benefits (`Pages/Shared/_Impact.cshtml`, `wwwroot/css/impact.css`):**
  - 3 separate cards, each with 3 bullet points featuring filled orange circles with white ticks.
- **Applications Grid & Redirects (`Pages/Shared/_Foundation.cshtml`, `wwwroot/css/foundation.css`, `wwwroot/js/foundation.js`):**
  - Commented out the conveyor animation, added `1376×768` `#132135` 3D CAD product thumbnails (`wwwroot/images/products/`) and 1–2 word industry headings across all 14 cards, added **See more / Show less** after the first 8 cards (with smooth scroll-up on collapse), and wired cards `01`–`13` to `/applications/{slug}`.
- **Dynamic Application Detail Pages (`Pages/Applications/Detail.cshtml`, `Detail.cshtml.cs`, `wwwroot/css/application-detail.css`, `Data/application-pills.json`):**
  - Built `/applications/{slug}` with **Demo Video / 3D Render** viewport tabs, 4 data-driven highlight pills per product from `Data/application-pills.json`, `Share Link` (native mobile share sheet / desktop clipboard copy), inputs & deliverables cards, and randomized 3-card **Explore Other Engines** strip.
- **Footer (`Pages/Shared/_Layout.cshtml`, `wwwroot/css/footer.css`):**
  - Simplified to brand/legal text on the left and clickable pill links (`+91 20 2546 2557`, `mail@aryamantechnologies.com`, `DOMAIN : DesignFoundry.com`) on the right.

### C. Mobile & Tablet Responsiveness
- **Navbar & Touch Support:** Tablet link compaction (`<= 1120px`), `#mobileBookCallBtn` + `#mobileMenuBtn` + floating `#mobileNavDrawer` dropdown (`<= 900px`), synced ScrollSpy/active highlights, and `:active` / `:focus-visible` touch animation support.
- **Section Breakpoints:** Refined mobile layouts across `hero.css` (fixed unwrapped `white-space: nowrap` heading overflow), `problem.css` (3-col / 2-col card grid), `answers.css`, `impact.css`, `foundation.css`, `customers.css` (added `#ccPrevBtn` / `#ccNextBtn` / `#ccCounter` above cards), `application-detail.css` (centered mobile layout), `contact.css`, and `footer.css`.

---

## 2. What Is Left Before Production Deployment

1. **Add Product Demo Videos (Optional / Content):**
   - Replace the `DEMO VIDEO PLACEHOLDER` pane in `Pages/Applications/Detail.cshtml` (and add a `VideoPath` property in `Detail.cshtml.cs`) once product walkthrough videos are ready.
2. **Configure Real Secrets & Booking URL (`appsettings.json` or Environment Variables):**
   - `BookingSettings:MicrosoftBookingsUrl`: Replace `"https://outlook.office.com/bookwithme/"` with your live Microsoft Bookings / *Bookings with me* URL.
   - `SmtpSettings:Password`: Set your Microsoft 365 App Password (recommended: `SmtpSettings__Password` via hosting environment variables) and confirm **Authenticated SMTP** is enabled for `mail@aryamantechnologies.com` in the Microsoft 365 Admin Center.
3. **Live End-to-End Verification:**
   - Test `/api/contact` (modal + `/contact` page, including **Other** CAD input) for live M365 SMTP delivery and `Logs/` output.
   - Test Microsoft Bookings links and mobile Share Sheet over **HTTPS** (`navigator.share` requires HTTPS on mobile browsers).
4. **Publish & Deploy:**
   - Commit and push `main` (`git push origin main`).
   - Run `dotnet publish -c Release` and deploy to a `.NET 8`-capable host with `ASPNETCORE_ENVIRONMENT=Production`.
