using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Designsfactory.Pages.Applications;

public class DetailModel : PageModel
{
    public ApplicationItem Item { get; private set; } = default!;
    public IReadOnlyList<ApplicationItem> RelatedItems { get; private set; } = Array.Empty<ApplicationItem>();

    public IActionResult OnGet(string slug)
    {
        if (string.IsNullOrWhiteSpace(slug) || !Catalog.TryGetValue(slug.Trim().ToLowerInvariant(), out var found))
        {
            return NotFound();
        }

        Item = found;
        RelatedItems = Catalog.Values
            .Where(x => x.Slug != found.Slug)
            .OrderBy(_ => Random.Shared.Next())
            .Take(3)
            .ToList();

        return Page();
    }

    public sealed record ApplicationItem(
        string Slug,
        string Number,
        string Category,
        string Standard,
        string Title,
        string Summary,
        string AutomationDetail,
        string ImagePath,
        string PdfPath,
        string[] SampleInputs,
        string[] Deliverables);

    private static readonly Dictionary<string, ApplicationItem> Catalog = new(StringComparer.OrdinalIgnoreCase)
    {
        ["axial-fan"] = new(
            "axial-fan", "01", "AIR MOVEMENT", "AMCA 210",
            "Axial Fan Design Software",
            "Sizing, aerodynamic performance evaluation and complete 3D impeller modeling.",
            "Enter airflow (m³/h or CFM), static pressure, temperature, and RPM. DesignFoundry computes aerodynamic velocity triangles, sizes the impeller and casing, generates the mated 3D CAD assembly, and exports fabrication drawings and BOM in under 2 minutes.",
            "/images/products/axial-fan.jpg",
            "/leaflets/aryaman-axial-fan-leaflet.pdf",
            new[] { "Air Flow (m³/h)", "Static Pressure (Pa)", "Operating Temp (°C)", "Speed (RPM)" },
            new[] { "Aerodynamic Performance Curve", "Mated 3D Impeller & Casing CAD", "Orthographic 2D DWG + ERP BOM" }),

        ["cyclone-separator"] = new(
            "cyclone-separator", "02", "DUST COLLECTION", "STAIRMAND",
            "Cyclone Separator Design Software",
            "Gas-solid particulate separation efficiency and sheet-metal unrolls.",
            "Solves Stairmand cut-point and collection efficiency curves automatically, sizes cylinder/cone proportions and tangential inlet geometry, and exports flat sheet-metal unrolls and 3D CAD models with one click.",
            "/images/products/cyclone-separator.jpg",
            "/leaflets/aryaman-cyclone-leaflet.pdf",
            new[] { "Gas Flow Rate", "Particle Size Distribution", "Inlet Velocity", "Pressure Drop Limit" },
            new[] { "Collection Efficiency Report", "3D Cyclone Assembly", "Flat Sheet-Metal Unrolls + BOM" }),

        ["storage-tank"] = new(
            "storage-tank", "03", "PROCESS STORAGE", "API 650 / IS 803",
            "Storage Tank Design Software",
            "API 650 shell course sizing, roof truss geometry, and nozzle cutouts.",
            "Automates shell thickness checks, wind girders, roof truss geometry, spiral stairway, and nozzle placement—generating complete manufacturing BOMs and unrolled plate profiles.",
            "/images/products/storage-tank.jpg",
            "/leaflets/aryaman-storage-tank-leaflet.pdf",
            new[] { "Tank Capacity (m³)", "Design Code (API 650 / IS 803)", "Specific Gravity", "Wind / Seismic Zone" },
            new[] { "Shell Course & Roof Sizing", "Full 3D Vessel & Nozzle CAD", "Plate Cutting Plans + BOM" }),

        ["belt-conveyor"] = new(
            "belt-conveyor", "04", "BULK HANDLING", "CEMA 576",
            "Belt Conveyor Design Software",
            "CEMA power calculations, belt tension, pulley sizing and truss frames.",
            "Automates CEMA calculation standards: computes motor kW, belt tension, pulley diameters, and idler spacing, then outputs dynamic 3D truss assemblies directly into SolidWorks or Inventor.",
            "/images/products/belt-conveyor.png",
            "/leaflets/aryaman-belt-conveyor-leaflet.pdf",
            new[] { "Tonnage (TPH)", "Conveyor Length & Lift", "Belt Width & Speed", "Bulk Material Density" },
            new[] { "CEMA Tension & Power Sheet", "Dynamic 3D Truss & Idler CAD", "Fabrication Drawings + BOM" }),

        ["bucket-elevator"] = new(
            "bucket-elevator", "05", "MATERIAL HANDLING", "DIN 15201",
            "Bucket Elevator Design Software",
            "Vertical lift configuration, chain pull, head & boot take-up geometry.",
            "Sizes head and boot pulleys, chain/belt pull, and motor torque automatically. Generates casing fabrication cut-lists and fully mated bucket assemblies with zero manual redrawing.",
            "/images/products/bucket-elevator.jpg",
            "/leaflets/aryaman-bucket-elevator-leaflet.pdf",
            new[] { "Capacity (TPH)", "Discharge Height", "Material Lumps & Density", "Drive Type (Chain / Belt)" },
            new[] { "Drive & Chain Pull Sizing", "3D Casing & Bucket Assembly", "Casing Cut-Lists + 2D DWG" }),

        ["wet-scrubber"] = new(
            "wet-scrubber", "06", "POLLUTION CONTROL", "EPA METHOD 5",
            "Wet Scrubber Design Software",
            "Flue gas cleaning, pollutant loading, throat velocity & mist demisters.",
            "Translates gas flow and pollutant concentration into optimal throat velocity, nozzle spray coverage, and demister sizing, generating verified vessel assemblies and piping layouts automatically.",
            "/images/products/wet-scrubber.jpg",
            "/leaflets/aryaman-wet-scrubber-leaflet.pdf",
            new[] { "Gas Volume & Temp", "Pollutant Loading", "Liquid-to-Gas Ratio", "Target Outlet Limit" },
            new[] { "Scrubbing Efficiency Sizing", "3D Vessel & Spray Header CAD", "Nozzle Layout 2D DWG + BOM" }),

        ["screw-conveyor"] = new(
            "screw-conveyor", "07", "SOLIDS HANDLING", "CEMA 350",
            "Screw Conveyor Design Software",
            "Volumetric loading, shaft deflection, helical flight cut-lists & troughs.",
            "Computes screw RPM, volumetric loading, and shaft deflection in real time. Generates helical flight cutting templates and fully mated trough assemblies ready for fabrication.",
            "/images/products/screw-conveyor.jpg",
            "/leaflets/aryaman-screw-conveyor-leaflet.pdf",
            new[] { "Throughput (TPH)", "Screw Diameter & Pitch", "Trough Loading (%)", "Inclination Angle" },
            new[] { "Torque & Shaft Deflection", "3D Auger & U-Trough CAD", "Helical Flight Blank Templates" }),

        ["fin-tube-exchanger"] = new(
            "fin-tube-exchanger", "08", "HEAT TRANSFER", "ASME / API 661",
            "Fin Tube Heat Exchanger Software",
            "Thermal rating, air-cooler fin density, tube pitch, and header passes.",
            "Solves heat duty, fin density, and pressure-drop curves. Auto-selects fin geometry and header passes, exporting complete 3D tube bundles and tube-sheet cut-lists in minutes.",
            "/images/products/fin-tube-exchanger.jpg",
            "/leaflets/aryaman-heat-exchanger-fin-tube-type-leaflet.pdf",
            new[] { "Heat Duty (kW)", "Inlet / Outlet Temps", "Fin Pitch & Tube OD", "Allowable Pressure Drop" },
            new[] { "Thermal Rating Datasheet", "3D Finned Bundle & Header CAD", "Tube-Sheet Drilling DWG + BOM" }),

        ["shell-and-tube-exchanger"] = new(
            "shell-and-tube-exchanger", "09", "PROCESS THERMAL", "TEMA CLASS R / B",
            "Shell & Tube Heat Exchanger Software",
            "TEMA tube layout drafting, baffle cut spacing, and bundle assembly.",
            "Eliminates manual tube layout drafting and baffle pitch calculations. Sizes the tube bundle, places mates dynamically, and outputs inspection-ready fabrication drawings with BOM.",
            "/images/products/shell-tube-exchanger.jpg",
            "/leaflets/aryaman-heat-exchanger-shell-tube-type-leaflet.pdf",
            new[] { "TEMA Type (BEM / AES)", "Shell ID & Tube Length", "Operating Pressure & Temp", "Baffle Cut (%)" },
            new[] { "Tube-Sheet Layout Plot", "3D Shell, Baffle & Bundle CAD", "ASME / TEMA Fabrication DWG" }),

        ["web-dryer"] = new(
            "web-dryer", "10", "WEB PROCESSING", "ISO 13732",
            "Web Dryer Design Software",
            "Continuous sheet & film drying chamber balance and nozzle sizing.",
            "Solves complex moisture-removal and energy-balance equations. Converts line speed and moisture targets into drying zone chamber lengths and nozzle duct geometry in CAD.",
            "/images/products/web-dryer.jpg",
            "/leaflets/aryaman-web-dryer-leaflet.pdf",
            new[] { "Web Width & Line Speed", "Inlet / Target Moisture", "Air Velocity & Temp", "Number of Zones" },
            new[] { "Psychrometric Energy Balance", "3D Chamber & Plenum CAD", "Nozzle & Roller Assembly DWG" }),

        ["industrial-damper"] = new(
            "industrial-damper", "11", "FLOW CONTROL", "AMCA 500-D",
            "Industrial Damper Design Software",
            "Multi-louver blade linkage kinematics, torque sizing & leakage control.",
            "Sizes blade linkage, shaft diameters, and actuator torque from differential pressure specs. Generates complete multi-blade assemblies with kinematic linkage motion in CAD.",
            "/images/products/industrial-damper.jpg",
            "/leaflets/aryaman-damper-leaflet.pdf",
            new[] { "Duct Cross-Section", "Differential Pressure", "Blade Type (Opposed / Parallel)", "Gas Temperature" },
            new[] { "Actuator Torque & Leakage", "Kinematic 3D Linkage CAD", "Frame & Blade Fabrication DWG" }),

        ["ducting-systems"] = new(
            "ducting-systems", "12", "HVAC DUCTWORK", "SMACNA / EN 1507",
            "Ducting Systems Design Automation",
            "Rectangular-to-round transitions, expansion joints & CNC unrolls.",
            "Automates transition geometry, expansion joints, and SMACNA stiffener spacing. Generates flat sheet-metal unrolls and bend tables directly for CNC cutting.",
            "/images/products/ducting-systems.jpg",
            "/leaflets/aryaman-ducting-leaflet.pdf",
            new[] { "Duct Dimensions / Ø", "Pressure Class (SMACNA)", "Sheet Gauge & Material", "Transition Offsets" },
            new[] { "Stiffener & Flange Sizing", "3D Duct Segment Assembly", "CNC Flat Unrolls & Bend Tables" }),

        ["sheet-metal-nesting"] = new(
            "sheet-metal-nesting", "13", "CNC FABRICATION", "CNC / G-CODE",
            "Sheet Metal Nesting Software",
            "Plate layout optimization minimizing raw cutting scrap.",
            "Packs 2D CAD profiles onto standard raw metal plates with kerf allowance and grain orientation constraints, exporting DXF nests and scrap utilization reports automatically.",
            "/images/products/sheet-metal-nesting.jpg",
            "/leaflets/aryaman-sheet-metal-nesting-leaflet.pdf",
            new[] { "Raw Sheet Size & Thickness", "Part Quantities & DXFs", "Kerf Width & Margin", "Grain Lock Rules" },
            new[] { "Material Utilization Report", "Optimized 2D Nest Layouts", "Ready-to-Cut DXF / NC Output" }),
    };
}
