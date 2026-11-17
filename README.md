# Designsfoundry — Generative CAD Copilot

<div align="center">

![.NET 8](https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet&logoColor=white)
![C#](https://img.shields.io/badge/C%23-239120?logo=csharp&logoColor=white)
![Razor Pages](https://img.shields.io/badge/ASP.NET_Core-Razor_Pages-blue)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?logo=three.js)
![License](https://img.shields.io/badge/License-Proprietary-orange)

**Turn historical CAD archives into active, reusable engineering intelligence.**

[Overview](#overview) • [Key Capabilities](#key-capabilities) • [Supported CAD Platforms](#supported-cad-platforms) • [UI & Interaction Stack](#ui--interaction-stack) • [Getting Started](#getting-started) • [Contact & About](#contact--about)

</div>

---

## 🌟 Overview

**Designsfoundry** is an intelligent generative engineering CAD copilot developed by **Aryaman Technologies** (Pune, India). 

Engineering enterprises accumulate decades of 3D CAD data, yet engineers still spend **up to 80% of their time** redesigning variants from blank files or digging through cryptic folder structures. 

Designsfoundry indexes proprietary CAD archives, preserves parametric feature trees and mating constraints, and allows engineers to query and modify complex assemblies in plain language — producing native CAD solids without proprietary lock-in.

---

## ⚡ Key Capabilities

- **Natural Language CAD Recall:** Query past assemblies and components using functional engineering specifications instead of file paths.
- **Parametric B-Rep Geometry:** Generates true native parametric models with intact feature trees, editable sketches, and mating constraints (STEP AP242 compliant).
- **Automated Multi-Part Propagation:** Modify one specification (e.g. stroke length) and all affected mating parts, 2D production drawings, and Bill of Materials (BOM) update automatically.
- **100% On-Premise & Air-Gapped:** Deployed within your private VPC or on-premise intranet. Proprietary CAD models, IP, and drawings never leave your secure firewall.
- **Zero Switching Barrier:** Operates natively inside your engineering team's existing CAD suites without forcing adoption of a foreign CAD platform.

---

## 🛠️ Supported CAD Platforms

| Platform | Native Add-in | Feature Tree Sync | BOM & Drawing Sync |
| :--- | :---: | :---: | :---: |
| **Dassault Systèmes SOLIDWORKS** |  Yes |  Full B-Rep |  Auto |
| **Autodesk Inventor** |  Yes |  Full B-Rep |  Auto |
| **PTC Creo** |  Yes |  Full B-Rep |  Auto |
| **Siemens NX** |  Yes |  Full B-Rep |  Auto |
| **CATIA** |  Yes |  Full B-Rep |  Auto |

---

## 💻 Tech Stack & Web Architecture

Built on **ASP.NET Core Razor Pages (.NET 8)**, providing high-performance server-rendered UI paired with modular, glassmorphic client-side experiences:

- **Backend:** C# / ASP.NET Core 8.0 Web Application
- **Frontend Styling:** Modular CSS architecture adhering to modern glassmorphic specifications (`21st.dev` design language):
  - `site.css`: Universal tokens, cloth grid physics canvas, responsive layout.
  - `cards.css`: Specular bevels, crystal refraction, and responsive multi-column proof matrices.
  - `why.css`, `copilot.css`, `faq.css`, `contact.css`: Section-specific presentation layers.
- **Interactive Visualizations:**
  - **Cloth Physics Grid Canvas:** Interactive mouse-driven tension cloth simulation across the blueprint grid.
  - **CAD Precision Reticle:** Real-time gimbal and aperture target tracking cursor with on/off toggle.
  - **Interactive 3D Earth Console:** Three.js dot-matrix globe highlighting Aryaman Technologies Pune HQ coordinates (`18.5204° N, 73.8567° E`).
  - **Interactive Assembly Simulator:** Real-time stroke/drive recalculator demo.
  - **Theme System:** Fully reversible High-Contrast Light Mode & Deep CAD Navy Dark Mode.

---

## 🚀 Getting Started

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or later
- Visual Studio 2022, VS Code with C# Dev Kit, or JetBrains Rider

### Installation & Local Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aryamanwarkari7-hub/DesignFoundry.git
   cd DesignFoundry
   ```

2. **Restore dependencies:**
   ```bash
   dotnet restore
   ```

3. **Run the development server:**
   ```bash
   dotnet run
   ```

4. **Open in browser:**
   Navigate to `https://localhost:7189` (HTTPS) or `http://localhost:5128` (HTTP).

---

## 📁 Repository Structure

```text
├── Pages/
│   ├── Index.cshtml              # Main single-page application entry point
│   ├── Index.cshtml.cs           # Page model
│   └── Shared/
│       ├── _Hero.cshtml          # Hero headline & CAD announcement pill
│       ├── _Answers.cshtml       # 2-column executive proof matrix & 8 metrics
│       ├── _Why.cshtml           # Why it matters: Legacy vs AI comparison
│       ├── _Copilot.cshtml       # 5-stage engineering workflow pipeline
│       ├── _Foundation.cshtml    # Aryaman Technologies foundation architecture
│       ├── _FAQ.cshtml           # Interactive FAQ reel console
│       └── _Contact.cshtml       # 3D interactive Pune HQ globe console
├── wwwroot/
│   ├── css/
│   │   ├── site.css              # Master stylesheet & overrides
│   │   ├── components/cards.css  # 21st.dev glass card primitives
│   │   └── ...                   # Section stylesheets
│   └── js/                       # Interactive canvas & globe scripts
├── Designsfactory.csproj         # .NET 8 project definition
├── .gitignore                    # Build output & artifact filtering
└── README.md                     # Project documentation
```

---

## 📍 Contact & Leadership

**Aryaman Technologies**  
- **Headquarters:** S. No. 44, Plot No. 22, Navsahyadri Society, Karvenagar, Pune – 411052, Maharashtra, India  
- **Coordinates:** `18.5204° N, 73.8567° E`  
- **Leadership:** Dhananjay Warkari (`dhananjay@aryamantechnologies.com`)  
- **Website:** [aryamantechnologies.com](https://aryamantechnologies.com)

---

<div align="center">
<sub>&copy; 2026 Aryaman Technologies. All rights reserved.</sub>
</div>
