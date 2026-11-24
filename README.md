# DesignFoundry — Generative CAD Copilot

<div align="center">

![.NET 8](https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?logo=csharp&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core-Razor_Pages_%26_Web_API-blue)
![Architecture](https://img.shields.io/badge/Architecture-Modular_Glassmorphism-21st.dev?color=f26a0a)
![License](https://img.shields.io/badge/License-Proprietary-orange)

**Turn your design requirements into manufacturing-ready 3D CAD models, drawings, and BOMs — in minutes.**

[Overview](#-overview) • [Key Capabilities](#-key-capabilities) • [Landing Page Architecture](#-landing-page-architecture) • [Backend & Asynchronous API](#-backend--asynchronous-api) • [Getting Started](#-getting-started) • [Deployment Options](#-deployment-options) • [Contact](#-contact--leadership)

</div>

---

## 🌟 Overview

**DesignFoundry** is an intelligent generative engineering CAD copilot built by **Aryaman Technologies** (Pune, India).

Traditional machinery OEMs and engineering fabricators spend **days to weeks** manually recalculating parameter sizing curves, redrawing repetitive 3D CAD assembly variants from scratch, and updating 2D fabrication sheets and BOMs.

DesignFoundry automates this pipeline using 19+ years of proven algorithmic design logic across custom machinery, bulk material handling, and thermal process equipment — delivering manufacturing-ready models and drawings in under two minutes without proprietary lock-in.

---

## ⚡ Key Capabilities

- **Zero Manual Spreadsheets:** Automatically solves aerodynamics, velocity triangles, pressure duties, and thermal ratings in seconds.
- **Parametric 3D CAD Assemblies:** Generates component assemblies with intact kinematic constraints, editable sketches, and native mates (SOLIDWORKS, Inventor, Creo, Siemens NX).
- **Automated Deliverables:** Auto-produces 2D DWG fabrication drawings, flat unrolls, and synchronized ERP Bill of Materials (BOM).
- **13 Production-Ready Engines:** Proven algorithmic software modules covering Axial Fans, Cyclones, Storage Tanks, Belt Conveyors, Bucket Elevators, Scrubbers, Heat Exchangers, and more.
- **Air-Gapped & Enterprise Security:** Deploys within your private VPC or on-premise Windows IIS intranet. Your proprietary CAD files and IP never leave your secure firewall.

---

## 🏗️ Landing Page Architecture

The web platform is built on **ASP.NET Core (.NET 8)** combining server-side Razor Pages with modular, interactive client-side components:

```text
01 / THE CHALLENGE    ──► Visual 4-step engineering flow (Sketch → 3D Model → 2D Drawing → BOM)
02 / THE SOLUTION     ──► 3 Glassmorphic Solution Cards with full Light/Dark mode adaptability
03 / HOW IT WORKS     ──► Centered cinematic video showcase with squircle bezel frame
04 / APPLICATIONS     ──► Dual-view: Real-time linear conveyor line + 13-engine bento catalog
05 / CUSTOMER STORIES ──► 21st.dev Connected Carousel (5 customer stories, auto-rotation, pill previews)
06 / ABOUT            ──► Built by Aryaman Technologies with live scroll-triggered count-up metrics (20+ / 100+ / 15+)
CONTACT (Standalone)  ──► Dedicated /contact page with interactive 3D Pune globe and copyable contact dossiers
```

---

## 🔌 Backend & Asynchronous API

The application features full backend asynchronicity through ASP.NET Core API Controllers:

### 1. Asynchronous Lead Generation Endpoint (`POST /api/contact/inquiry`)
* Managed by `Controllers/ContactController.cs`.
* Receives client brief payloads (`cadPlatform`, `equipment`, `email`) asynchronously via `fetch()`.
* Automatically dispatches email notifications via SMTP (Microsoft 365, Rediffmail, or custom relay) with `Reply-To` set directly to the prospective client.
* Front-end button provides instant loading spinner and verified green checkmark feedback with zero page reloads.

### 2. Global "Book a Call" Modal
* Mounted globally in `Pages/Shared/_Layout.cshtml`.
* Clicking **"Book a Call"** in the floating navbar or anywhere on the page opens the inquiry console asynchronously without leaving the current view.
* Direct link allows users to jump to the standalone `/contact` page with the interactive 3D Pune canvas globe at any time.

---

## 📁 Repository Structure

```text
├── Controllers/
│   └── ContactController.cs       # Asynchronous API controller for lead capture & SMTP dispatch
├── Documents/
│   ├── MICROSOFT_365_EMAIL_SETUP.md # Step-by-step corporate email & SMTP relay guide
│   ├── RENDER_DEPLOYMENT.md       # Linux container deployment instructions
│   └── DOCKER_EXPLAINED.md        # Containerization documentation
├── Pages/
│   ├── Index.cshtml               # Single-page landing page narrative
│   ├── Contact.cshtml             # Standalone /contact page entry point
│   ├── About.cshtml               # /about redirect handler
│   ├── Faq.cshtml                 # /faq redirect handler
│   └── Shared/
│       ├── _Layout.cshtml         # Floating glass navbar, global modal, and blueprint footer
│       ├── _Hero.cshtml           # Central parameter-to-deliverables transformation stage
│       ├── _Problem.cshtml        # The Challenge 4-card flow
│       ├── _Answers.cshtml        # The Solution 3-pillar glassmorphic cards
│       ├── _Copilot.cshtml        # How It Works cinematic video stage
│       ├── _Foundation.cshtml     # 13-Engine conveyor belt and bento grid
│       ├── _Customers.cshtml      # Connected Carousel (21st.dev)
│       ├── _About.cshtml          # Built by Aryaman authority cards with animated counter
│       └── _Contact.cshtml        # 3D interactive Pune canvas globe & contact dossier
├── wwwroot/
│   ├── css/
│   │   ├── site.css               # Design system variables, reset, and section imports
│   │   ├── answers.css            # Solution cards & dark mode tokens
│   │   ├── copilot.css            # Video player bezel & layout
│   │   ├── foundation.css         # Conveyor belt animation & catalog styles
│   │   ├── customers.css          # Connected carousel squircle geometry & transitions
│   │   ├── about.css              # About section styling
│   │   └── contact.css            # 3D globe chamber & standalone layout
│   ├── js/
│   │   ├── site.js                # Core app controller, scrollspy, counters, and async API fetch
│   │   ├── customers.js           # Connected carousel auto-rotation & hover management
│   │   └── cad-viewer.js          # Interactive CAD viewer logic
├── appsettings.example.json       # Sanitized environment configuration template
├── Program.cs                     # ASP.NET Core service registration (Razor Pages + Controllers)
├── Designsfactory.csproj          # .NET 8 project file
└── README.md                      # Primary project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or later
- Visual Studio 2022, VS Code (with C# Dev Kit), or JetBrains Rider

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aryamanwarkari7-hub/DesignFoundry.git
   cd DesignFoundry
   ```

2. **Configure local environment:**
   Copy the example settings template to create your local `appsettings.json`:
   ```powershell
   copy appsettings.example.json appsettings.json
   ```
   *(Add your local SMTP or testing credentials in `appsettings.json`. This file is git-ignored to prevent credential leaks).*

3. **Restore & Run:**
   ```powershell
   dotnet restore
   dotnet run
   ```

4. **Access in browser:**
   Open [https://localhost:7189](https://localhost:7189) or [http://localhost:5128](http://localhost:5128).

---

## 🌐 Deployment Options

### 1. Windows IIS Server (Enterprise On-Premise)
* **Hosting Model:** In-Process hosting via ASP.NET Core Module (`AspNetCoreModuleV2`).
* **Requirements:** Install the **.NET 8.0 Hosting Bundle for Windows** on the IIS server.
* **Publish Command:**
  ```powershell
  dotnet publish -c Release -o ./publish
  ```
* **IIS App Pool:** Set .NET CLR version to **`No Managed Code`** with **Integrated** pipeline.

### 2. Linux / Container Deployment
* Pre-configured with multi-stage `Dockerfile`.
* Supports Linux VM, Docker Compose, or container clouds (Render, AWS ECS, Azure App Service).
* See [RENDER_DEPLOYMENT.md](Documents/RENDER_DEPLOYMENT.md) for details.

### 3. Corporate Email Integration
* To connect corporate Microsoft 365 (`mail@aryamantechnologies.com`), follow the step-by-step setup in [MICROSOFT_365_EMAIL_SETUP.md](Documents/MICROSOFT_365_EMAIL_SETUP.md).

---

## 📍 Contact & Leadership

**Aryaman Technologies Private Limited**  
- **Headquarters:** S. No. 44, Plot No. 22, Navsahyadri Society, Karvenagar, Pune – 411052, Maharashtra, India  
- **Coordinates:** `18.5204° N, 73.8567° E`  
- **Corporate Inquiry:** `mail@aryamantechnologies.com`  
- **Leadership:** Dhananjay Warkari (`dhananjay@aryamantechnologies.com`)  
- **Website:** [aryamantechnologies.com](https://www.aryamantechnologies.com)

---

<div align="center">
<sub>&copy; 2026 Aryaman Technologies Private Limited. All rights reserved.</sub>
</div>
