# Render Cloud Deployment Guide — DesignFoundry

> **Quick Summary:** A guide on how DesignFoundry is temporarily hosted for free on Render.com, how the automated pipeline works, security details, and how to manage or update the deployment.

---

## 1. How It Works (The Pipeline)

```
[Local Computer] 
      │  (git push origin main)
      ▼
[GitHub Repository: aryamanwarkari7-hub/DesignFoundry]
      │  (Webhook Trigger)
      ▼
[Render.com Singapore Cloud Cluster]
      │  1. Pulls code + Dockerfile
      │  2. Builds official Microsoft .NET 8 SDK image
      │  3. Compiles Release bundle (`dotnet publish`)
      │  4. Runs lightweight ASP.NET 8 runtime on port 8080
      ▼
[Live Public Internet (HTTPS 🔒)]
   👉 https://<your-service-name>.onrender.com
```

Every time you push code to `main`, Render **automatically detects the commit**, rebuilds the container, and deploys the new version with zero manual intervention.

---

## 2. Cost & Billing (Guaranteed $0 / Free Tier)

| Metric | Setting | Notes |
| :--- | :--- | :--- |
| **Monthly Cost** | **$0 / month (Free)** | No credit card or billing details required. |
| **Compute** | 0.1 vCPU, 512 MB RAM | Plenty of power for presentation & interactive SVG/Canvas demos. |
| **Bandwidth** | 100 GB / month | Far exceeds requirements for demo & client reviews. |
| **SSL / HTTPS** | Free automatic 256-bit TLS | Managed automatically by Let's Encrypt / Cloudflare. |

---

## 3. The "Spin-Down" / Sleep Behavior (Important!)

Render's free tier uses an **inactivity sleep timer** to save cloud energy:

* **Idle Sleep:** If nobody visits the website for **15 consecutive minutes**, the container spins down to sleep.
* **Cold Start:** When someone clicks the link after it has been asleep, Render boots the container up. The **first page load takes ~30 to 50 seconds**.
* **Subsequent Loads:** Once awake, the website responds in **< 100 milliseconds** for all subsequent pages, navigation, and visitors.

> **Tip for Client Demos:** Before sending the link to a client or stakeholder, click the URL yourself once to wake up the server so it opens instantly for them!

---

## 4. Security & Isolation

### Is it safe? Yes, 100%.

1. **Automatic SSL / HTTPS (🔒 Padlock):** All traffic between visitors and the website is encrypted end-to-end.
2. **Container Isolation:** The application runs in an isolated Linux micro-container. It has **zero access** to your personal computer, local network, or files.
3. **No Database / Secrets Exposed:** DesignFoundry is a client-side presentation and calculation engine. There are no user passwords, credit card vaults, or proprietary databases stored inside the application.
4. **Log Warning Explanation:** 
   ```
   warn: Microsoft.AspNetCore.DataProtection... No XML encryptor configured
   ```
   This standard ASP.NET Core log only relates to cookie authentication for logged-in user accounts. Because this site does not require user accounts or logins, this warning has **zero security impact**.

---

## 5. How to Deploy Future Code Changes

Whenever you make improvements to HTML, CSS, or JS:

```powershell
# 1. Stage and commit your changes
git add .
git commit -m "Update website styling and features"

# 2. Push to GitHub
git push origin main
```

**That's it!** Render will automatically detect the push, rebuild, and update the live URL within ~2 minutes.

---

## 6. How to Pause or Delete When Done

When your client review is finished or when you are ready to migrate to your official production domain:

1. Open your **Render Dashboard** ([dashboard.render.com](https://dashboard.render.com)).
2. Click on **DesignFoundry**.
3. Go to **Settings** (left sidebar):
   * **To Pause (temporarily stop traffic):** Scroll down and click **Suspend Service**.
   * **To Remove Permanently:** Scroll to the bottom and click **Delete Web Service**.
