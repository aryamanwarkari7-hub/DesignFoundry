/**
 * DesignFoundry Generative CAD - Global Application Script
 * Defines global variables and event handlers used across the application.
 */

(function (window, document) {
    "use strict";

    // ==========================================
    // 1. GLOBAL PRODUCTS DATABASE
    // ==========================================
    var PRODUCTS = [
        {
            title: "Axial Fan Design Software",
            cat: "AI-ASSISTED ENGINEERING DESIGN",
            brief: "Industrial axial-flow fan used for moving high volumes of air at low-to-medium static pressures across ventilation, cooling towers, and exhaust ducting.",
            ease: "Eliminates days of manual blade camber calculation and drafting from scratch. Enter airflow (CFM) and static pressure—DesignFoundry computes aerodynamic velocity triangles, generates the mated 3D CAD assembly, and outputs fabrication drawings in under 2 minutes.",
            pdf: "/leaflets/aryaman-axial-fan-leaflet.pdf"
        },
        {
            title: "Cyclone Design Software",
            cat: "AI-ASSISTED ENGINEERING DESIGN",
            brief: "Centrifugal particulate separator used in industrial flue and process gas cleaning to extract dust and granules without filter media.",
            ease: "Stops engineers from manually solving Stairmand cut-point formulas. Solves collection efficiency curves, sizes cylinder/cone proportions, and exports flat sheet-metal unrolls and 3D models with one click.",
            pdf: "/leaflets/aryaman-cyclone-leaflet.pdf"
        },
        {
            title: "Storage Tank Design Software",
            cat: "ENGINEERING DESIGN AUTOMATION",
            brief: "Cylindrical storage vessels designed to API 650 / IS 803 standards for bulk liquids, industrial chemicals, and process water handling.",
            ease: "Replaces hours of spreadsheet shell thickness checks and nozzle placement. Automatically calculates wind girders, roof truss geometry, and nozzle cutouts, generating manufacturing BOMs and unrolled plate profiles.",
            pdf: "/leaflets/aryaman-storage-tank-leaflet.pdf"
        },
        {
            title: "Belt Conveyor Design Software",
            cat: "ENGINEERING DESIGN AUTOMATION",
            brief: "Continuous bulk material transport system handling coal, cement, aggregates, and minerals over long horizontal spans and inclines.",
            ease: "Automates CEMA calculation standards: computes motor kW, belt tension, pulley diameters, and idler spacing, then outputs dynamic 3D truss assemblies directly into SolidWorks or Inventor.",
            pdf: "/leaflets/aryaman-belt-conveyor-leaflet.pdf"
        },
        {
            title: "Bucket Elevator Design Software",
            cat: "ENGINEERING DESIGN AUTOMATION",
            brief: "Vertical conveyor equipment designed for elevating powders, grains, and ores in compact, dust-tight vertical footprints.",
            ease: "Sizes head and boot pulleys, chain/belt pull, and motor torque automatically. Generates casing fabrication cut-lists and fully mated bucket assemblies with zero manual redrawing.",
            pdf: "/leaflets/aryaman-bucket-elevator-leaflet.pdf"
        },
        {
            title: "Wet Scrubber Design Software",
            cat: "AI-ASSISTED ENGINEERING DESIGN",
            brief: "Gas cleaning and air pollution control equipment utilizing liquid contact to capture acid fumes, toxic vapors, and fine dust.",
            ease: "Translates gas flow and pollutant concentration into optimal throat velocity, nozzle spray coverage, and demister sizing, generating verified vessel assemblies and piping layouts automatically.",
            pdf: "/leaflets/aryaman-wet-scrubber-leaflet.pdf"
        },
        {
            title: "Screw Conveyor Design Software",
            cat: "ENGINEERING DESIGN AUTOMATION",
            brief: "Enclosed helical screw transport system moving powders, granules, and sludges through troughs in process plants.",
            ease: "Computes screw RPM, volumetric loading, and shaft deflection in real time. Generates helical flight cutting templates and fully mated trough assemblies ready for fabrication.",
            pdf: "/leaflets/aryaman-screw-conveyor-leaflet.pdf"
        },
        {
            title: "Heat Exchanger – Fin Tube Type",
            cat: "THERMAL DESIGN AUTOMATION",
            brief: "Extended-surface heat exchanger designed for radiators, air coolers, and gas heating/cooling applications.",
            ease: "Solves heat duty, fin density, and pressure-drop curves. Auto-selects fin geometry and header passes, exporting complete 3D tube bundles and tube-sheet cut-lists in minutes.",
            pdf: "/leaflets/aryaman-heat-exchanger-fin-tube-type-leaflet.pdf"
        },
        {
            title: "Heat Exchanger – Shell & Tube Type",
            cat: "THERMAL DESIGN AUTOMATION",
            brief: "TEMA and ASME Section VIII code-compliant thermal exchanger for process plants, refineries, and power stations.",
            ease: "Eliminates manual tube layout drafting and baffle pitch calculations. Sizes the tube bundle, places mates dynamically, and outputs inspection-ready fabrication drawings with BOM.",
            pdf: "/leaflets/aryaman-heat-exchanger-shell-tube-type-leaflet.pdf"
        },
        {
            title: "Web Dryer Design Software",
            cat: "THERMAL & PROCESS AUTOMATION",
            brief: "Continuous drying chamber for sheet, film, paper, and textile web materials moving over heated rollers and air knives.",
            ease: "Solves complex moisture-removal and energy-balance equations. Converts line speed and moisture targets into drying zone chamber lengths and nozzle duct geometry in CAD.",
            pdf: "/leaflets/aryaman-web-dryer-leaflet.pdf"
        },
        {
            title: "Damper Design Software",
            cat: "ENGINEERING DESIGN AUTOMATION",
            brief: "Industrial multi-louver and butterfly dampers regulating or isolating air and flue gas flow in high-temperature ducting.",
            ease: "Sizes blade linkage, shaft diameters, and actuator torque from differential pressure specs. Generates complete multi-blade assemblies with kinematic linkage motion in CAD.",
            pdf: "/leaflets/aryaman-damper-leaflet.pdf"
        },
        {
            title: "Ducting Design Automation",
            cat: "ENGINEERING DESIGN AUTOMATION",
            brief: "Heavy-duty ventilation and flue gas ducting networks with complex transitions, bends, and stiffening rings.",
            ease: "Automates transition geometry, expansion joints, and SMACNA stiffener spacing. Generates flat sheet-metal unrolls and bend tables directly for CNC cutting.",
            pdf: "/leaflets/aryaman-ducting-leaflet.pdf"
        },
        {
            title: "Sheet Metal Nesting Software",
            cat: "MANUFACTURING AUTOMATION",
            brief: "Plate layout optimization engine arranging multiple 2D CAD parts onto raw metal sheets to minimize cutting scrap.",
            ease: "Ingests batches of DXF parts and runs algorithmic multi-part nesting in seconds, maximizing plate utilization (88%+) and generating ready-to-cut CNC laser/plasma paths.",
            pdf: "/leaflets/aryaman-sheet-metal-nesting-leaflet.pdf"
        }
    ];

    // Expose globally on window
    window.PRODUCTS = PRODUCTS;

    // ==========================================
    // 2. GLOBAL APP OBJECT (Namespace)
    // ==========================================
    var DesignFoundryApp = {
        products: PRODUCTS,

        // Lightweight Product Modal with Visual Schematics
        // Clean Engineering Intelligence Dossier Modal
        // Pill-Driven Scannable Product Modal
        openProductModal: function (index) {
            var dlg = document.getElementById("pd");
            if (!dlg || !PRODUCTS[index]) return;

            var p = PRODUCTS[index];
            document.getElementById("pdCat").textContent = p.cat;
            document.getElementById("pdTitle").textContent = p.title;

            // 1-Line Brief
            var elBrief = document.getElementById("pdBrief");
            if (elBrief) elBrief.textContent = p.brief || p.intro;

            // Render Application Pills Cloud
            var elApps = document.getElementById("pdAppsPills");
            if (elApps) {
                elApps.innerHTML = "";
                var appsList = p.apps ? p.apps.split(/[,•]/).map(function (s) { return s.trim(); }).filter(Boolean) : [];
                appsList.forEach(function (app) {
                    var chip = document.createElement("span");
                    chip.className = "pd-chip";
                    chip.textContent = app;
                    elApps.appendChild(chip);
                });
            }

            // Render Governing Codes Pills Cloud
            var elStandards = document.getElementById("pdStandardsPills");
            if (elStandards) {
                elStandards.innerHTML = "";
                var stdList = (p.standards || "ASME • ISO • INDUSTRIAL CODES").split(/[,•]/).map(function (s) { return s.trim(); }).filter(Boolean);
                stdList.forEach(function (std) {
                    var chip = document.createElement("span");
                    chip.className = "pd-chip";
                    chip.textContent = std;
                    elStandards.appendChild(chip);
                });
            }

            // Technical Leaflet PDF link
            var elPdf = document.getElementById("pdPdf");
            if (elPdf) elPdf.setAttribute("href", p.pdf);

            // Direct Meeting Booking Link
            var elTalk = document.getElementById("pdTalk");
            if (elTalk) {
                elTalk.setAttribute("href", "https://calendar.google.com/calendar/u/0/r?pli=1");
                elTalk.setAttribute("target", "_blank");
                elTalk.setAttribute("rel", "noopener noreferrer");
            }

            // 1-Click Copy Technical Specs
            var elCopySpecs = document.getElementById("pdCopySpecs");
            if (elCopySpecs) {
                elCopySpecs.onclick = function () {
                    var specsText =
                        "=== DesignFoundry Industrial Engine Dossier ===\n" +
                        "Equipment: " + p.title + " (" + p.cat + ")\n" +
                        "Summary: " + (p.brief || p.intro) + "\n" +
                        "Applications: " + (p.apps || "Heavy Engineering, Custom Machinery") + "\n" +
                        "Governing Codes: " + (p.standards || "ASME, ISO, DIN") + "\n" +
                        "Speed Benchmark: < 2 Mins Automated Assembly vs 3-5 Days Legacy CAD\n" +
                        "Engineered by: Aryaman Technologies, Pune, India";

                    DesignFoundryApp.copyToClipboard(specsText, elCopySpecs);
                    elCopySpecs.classList.add("copied");
                    elCopySpecs.innerHTML = '<i class="bi bi-check-lg"></i> Copied Specs!';
                    setTimeout(function () {
                        elCopySpecs.classList.remove("copied");
                        elCopySpecs.innerHTML = '<i class="bi bi-clipboard"></i> Copy Specs';
                    }, 2500);
                };
            }

            if (dlg.showModal) {
                dlg.showModal();
            } else {
                dlg.setAttribute("open", "");
            }
        },

        // Lightweight CAD Blueprint Line-Art Generator
        getSchematicSvg: function (index) {
            var schematics = [
                // 0: Axial Fan (Impeller & Casing)
                '<svg viewBox="0 0 200 150" fill="none" stroke="#8cb4f0" stroke-width="1.5"><circle cx="100" cy="75" r="55" stroke-dasharray="3 3"/><circle cx="100" cy="75" r="50" stroke="#f26a0a" stroke-width="2"/><circle cx="100" cy="75" r="18" fill="#142a58" stroke="#ffffff"/><path d="M100 57 L100 25 M100 93 L100 125 M82 75 L50 75 M118 75 L150 75 M87 62 L64 39 M113 88 L136 111 M87 88 L64 111 M113 62 L136 39" stroke="#f26a0a" stroke-width="2.5"/><text x="100" y="145" font-size="9" fill="#8cb4f0" font-family="monospace" text-anchor="middle">DIA: Ø1200 MM &bull; 8 BLADES</text></svg>',
                // 1: Cyclone (Cylinder & Cone)
                '<svg viewBox="0 0 200 150" fill="none" stroke="#8cb4f0" stroke-width="1.5"><rect x="70" y="20" width="60" height="40" fill="#142a58" stroke="#f26a0a" stroke-width="2"/><polygon points="70,60 130,60 110,115 90,115" fill="#142a58" stroke="#f26a0a" stroke-width="2"/><rect x="88" y="115" width="24" height="15" stroke="#ffffff"/><line x1="45" y1="30" x2="70" y2="30" stroke="#f26a0a" stroke-width="2"/><rect x="90" y="10" width="20" height="25" stroke="#ffffff"/><text x="100" y="145" font-size="9" fill="#8cb4f0" font-family="monospace" text-anchor="middle">VORTEX: Ø800 &bull; DUST CONE</text></svg>',
                // 2: Storage Tank
                '<svg viewBox="0 0 200 150" fill="none" stroke="#8cb4f0" stroke-width="1.5"><path d="M60 40 Q100 25 140 40 L140 120 L60 120 Z" fill="#142a58" stroke="#f26a0a" stroke-width="2"/><line x1="60" y1="65" x2="140" y2="65" stroke-dasharray="3 3"/><line x1="60" y1="92" x2="140" y2="92" stroke-dasharray="3 3"/><circle cx="100" cy="80" r="4" fill="#f26a0a"/><text x="100" y="145" font-size="9" fill="#8cb4f0" font-family="monospace" text-anchor="middle">API 650 &bull; 50 KL VESSEL</text></svg>',
                // 3: Belt Conveyor
                '<svg viewBox="0 0 200 150" fill="none" stroke="#8cb4f0" stroke-width="1.5"><circle cx="45" cy="75" r="18" fill="#142a58" stroke="#f26a0a" stroke-width="2"/><circle cx="155" cy="75" r="18" fill="#142a58" stroke="#f26a0a" stroke-width="2"/><line x1="45" y1="57" x2="155" y2="57" stroke="#ffffff" stroke-width="2"/><line x1="45" y1="93" x2="155" y2="93" stroke="#ffffff" stroke-width="2"/><circle cx="85" cy="62" r="6" stroke="#8cb4f0"/><circle cx="115" cy="62" r="6" stroke="#8cb4f0"/><text x="100" y="145" font-size="9" fill="#8cb4f0" font-family="monospace" text-anchor="middle">SPAN: 24 M &bull; 650 MM BELT</text></svg>',
                // 4: Bucket Elevator
                '<svg viewBox="0 0 200 150" fill="none" stroke="#8cb4f0" stroke-width="1.5"><rect x="75" y="20" width="50" height="105" fill="#142a58" stroke="#8cb4f0"/><circle cx="100" cy="35" r="10" stroke="#f26a0a"/><circle cx="100" cy="110" r="10" stroke="#f26a0a"/><rect x="80" y="52" width="10" height="8" fill="#f26a0a"/><rect x="80" y="75" width="10" height="8" fill="#f26a0a"/><rect x="110" y="60" width="10" height="8" fill="#f26a0a"/><text x="100" y="145" font-size="9" fill="#8cb4f0" font-family="monospace" text-anchor="middle">LIFT: 18 M &bull; 45 TPH</text></svg>',
                // 5: Wet Scrubber
                '<svg viewBox="0 0 200 150" fill="none" stroke="#8cb4f0" stroke-width="1.5"><rect x="70" y="20" width="60" height="100" rx="4" fill="#142a58" stroke="#f26a0a" stroke-width="2"/><line x1="50" y1="95" x2="70" y2="95" stroke="#ffffff" stroke-width="2"/><line x1="100" y1="20" x2="100" y2="5" stroke="#ffffff" stroke-width="2"/><line x1="80" y1="50" x2="120" y2="50" stroke="#f26a0a" stroke-dasharray="2 2"/><text x="100" y="145" font-size="9" fill="#8cb4f0" font-family="monospace" text-anchor="middle">GAS FLOW: 15,000 M³/HR</text></svg>',
                // 6: Screw Conveyor
                '<svg viewBox="0 0 200 150" fill="none" stroke="#8cb4f0" stroke-width="1.5"><rect x="30" y="60" width="140" height="30" fill="#142a58" stroke="#8cb4f0"/><line x1="20" y1="75" x2="180" y2="75" stroke="#ffffff" stroke-width="2"/><path d="M40 63 Q50 75 40 87 M65 63 Q75 75 65 87 M90 63 Q100 75 90 87 M115 63 Q125 75 115 87 M140 63 Q150 75 140 87" stroke="#f26a0a" stroke-width="2.5"/><text x="100" y="145" font-size="9" fill="#8cb4f0" font-family="monospace" text-anchor="middle">PITCH: 250 MM &bull; SHAFT Ø60</text></svg>',
                // 7: Fin Tube Exchanger
                '<svg viewBox="0 0 200 150" fill="none" stroke="#8cb4f0" stroke-width="1.5"><rect x="40" y="40" width="120" height="65" fill="#142a58" stroke="#f26a0a" stroke-width="2"/><line x1="55" y1="40" x2="55" y2="105" stroke="#ffffff"/><line x1="85" y1="40" x2="85" y2="105" stroke="#ffffff"/><line x1="115" y1="40" x2="115" y2="105" stroke="#ffffff"/><line x1="145" y1="40" x2="145" y2="105" stroke="#ffffff"/><path d="M40 55 H160 M40 72 H160 M40 90 H160" stroke="#f26a0a" stroke-dasharray="2 3"/><text x="100" y="145" font-size="9" fill="#8cb4f0" font-family="monospace" text-anchor="middle">FIN DENSITY: 11 FPI</text></svg>',
                // 8: Shell & Tube Exchanger
                '<svg viewBox="0 0 200 150" fill="none" stroke="#8cb4f0" stroke-width="1.5"><rect x="40" y="45" width="120" height="55" rx="10" fill="#142a58" stroke="#f26a0a" stroke-width="2"/><line x1="60" y1="45" x2="60" y2="100" stroke="#ffffff" stroke-width="2"/><line x1="140" y1="45" x2="140" y2="100" stroke="#ffffff" stroke-width="2"/><line x1="65" y1="62" x2="135" y2="62" stroke="#8cb4f0" stroke-dasharray="4 2"/><line x1="65" y1="82" x2="135" y2="82" stroke="#8cb4f0" stroke-dasharray="4 2"/><text x="100" y="145" font-size="9" fill="#8cb4f0" font-family="monospace" text-anchor="middle">TEMA CLASS R &bull; 2-PASS</text></svg>',
                // 9: Web Dryer
                '<svg viewBox="0 0 200 150" fill="none" stroke="#8cb4f0" stroke-width="1.5"><rect x="35" y="45" width="130" height="55" fill="#142a58" stroke="#8cb4f0"/><path d="M30 72 H170" stroke="#f26a0a" stroke-width="2.5"/><circle cx="65" cy="62" r="5" stroke="#ffffff"/><circle cx="100" cy="62" r="5" stroke="#ffffff"/><circle cx="135" cy="62" r="5" stroke="#ffffff"/><text x="100" y="145" font-size="9" fill="#8cb4f0" font-family="monospace" text-anchor="middle">3 THERMAL ZONES &bull; 120 M/MIN</text></svg>',
                // 10: Damper
                '<svg viewBox="0 0 200 150" fill="none" stroke="#8cb4f0" stroke-width="1.5"><rect x="50" y="30" width="100" height="85" fill="#142a58" stroke="#8cb4f0" stroke-width="2"/><line x1="55" y1="50" x2="145" y2="50" stroke="#f26a0a" stroke-width="3"/><line x1="55" y1="72" x2="145" y2="72" stroke="#f26a0a" stroke-width="3"/><line x1="55" y1="94" x2="145" y2="94" stroke="#f26a0a" stroke-width="3"/><circle cx="145" cy="50" r="3" fill="#ffffff"/><circle cx="145" cy="72" r="3" fill="#ffffff"/><circle cx="145" cy="94" r="3" fill="#ffffff"/><line x1="145" y1="45" x2="145" y2="98" stroke="#ffffff"/><text x="100" y="145" font-size="9" fill="#8cb4f0" font-family="monospace" text-anchor="middle">OPPOSED BLADE &bull; LEAK CLASS IV</text></svg>',
                // 11: Ducting
                '<svg viewBox="0 0 200 150" fill="none" stroke="#8cb4f0" stroke-width="1.5"><path d="M40 45 L90 45 L130 65 L160 65 L160 95 L130 95 L90 115 L40 115 Z" fill="#142a58" stroke="#f26a0a" stroke-width="2"/><line x1="40" y1="40" x2="40" y2="120" stroke="#ffffff" stroke-width="2"/><line x1="160" y1="60" x2="160" y2="100" stroke="#ffffff" stroke-width="2"/><text x="100" y="145" font-size="9" fill="#8cb4f0" font-family="monospace" text-anchor="middle">RECT-TO-ROUND TRANSITION</text></svg>',
                // 12: Sheet Metal Nesting
                '<svg viewBox="0 0 200 150" fill="none" stroke="#8cb4f0" stroke-width="1.5"><rect x="35" y="30" width="130" height="85" fill="#142a58" stroke="#ffffff" stroke-width="1.5"/><rect x="42" y="38" width="35" height="25" fill="rgba(242,106,10,0.3)" stroke="#f26a0a"/><circle cx="105" cy="50" r="12" fill="rgba(242,106,10,0.3)" stroke="#f26a0a"/><polygon points="45,72 70,72 60,105 45,105" fill="rgba(242,106,10,0.3)" stroke="#f26a0a"/><rect x="85" y="72" width="40" height="35" fill="rgba(242,106,10,0.3)" stroke="#f26a0a"/><polygon points="135,38 158,38 158,95 135,70" fill="rgba(242,106,10,0.3)" stroke="#f26a0a"/><text x="100" y="145" font-size="9" fill="#8cb4f0" font-family="monospace" text-anchor="middle">UTILIZATION: 88.4% &bull; SCRAP &minus;42%</text></svg>'
            ];
            return schematics[index] || schematics[0];
        },

        closeProductModal: function () {
            var dlg = document.getElementById("pd");
            if (dlg) dlg.close();
        },

        // Clipboard copy utility
        copyToClipboard: function (text, btnElement) {
            if (!navigator.clipboard) return;
            navigator.clipboard.writeText(text).then(function () {
                if (btnElement) {
                    var originalText = btnElement.textContent;
                    btnElement.textContent = "Copied";
                    setTimeout(function () {
                        btnElement.textContent = originalText;
                    }, 1400);
                }
            }).catch(function (err) {
                console.warn("Clipboard copy failed:", err);
            });
        },

        // Pause animations for reduced-motion users
        initReducedMotion: function () {
            try {
                var svg = document.getElementById("cpSvg");
                if (svg && window.matchMedia("(prefers-reduced-motion: reduce)").matches && svg.pauseAnimations) {
                    svg.pauseAnimations();
                    svg.setCurrentTime(6);
                }
            } catch (e) {
                console.warn("SVG animation control error:", e);
            }
        }
    };

    // Expose application object globally
    window.DesignFoundryApp = DesignFoundryApp;


    // ==========================================
    // 3. EVENT LISTENERS INITIALIZATION
    // ==========================================
    document.addEventListener("DOMContentLoaded", function () {
        DesignFoundryApp.initReducedMotion();

        // Lenis Smooth Scrolling Engine Initialization
        if (typeof window.Lenis === "function") {
            try {
                var lenis = new window.Lenis({
                    duration: 1.1,
                    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
                    smoothWheel: true,
                    wheelMultiplier: 0.95,
                    touchMultiplier: 1.5
                });
                window.lenis = lenis;

                function lenisRaf(time) {
                    lenis.raf(time);
                    requestAnimationFrame(lenisRaf);
                }
                requestAnimationFrame(lenisRaf);
            } catch (e) {
                console.warn("Lenis init skipped", e);
            }
        }

        // Product modal triggers...

        // Product modal triggers
        document.querySelectorAll("button.prod").forEach(function (b) {
            b.addEventListener("click", function () {
                var idx = parseInt(b.getAttribute("data-i"), 10);
                DesignFoundryApp.openProductModal(idx);
            });
        });

        // Foundation View Switcher (Conveyor vs All 13 Engines Grid)
        (function initFoundationViewSwitch() {
            var btnConveyor = document.getElementById("btnViewConveyor");
            var btnGrid = document.getElementById("btnViewGrid");
            var conveyorWrap = document.getElementById("prodConveyor");
            var gridWrap = document.getElementById("foundationGridView");

            if (!btnConveyor || !btnGrid || !conveyorWrap || !gridWrap) return;

            btnConveyor.addEventListener("click", function () {
                btnConveyor.classList.add("active");
                btnGrid.classList.remove("active");
                conveyorWrap.style.display = "block";
                gridWrap.style.display = "none";
            });

            btnGrid.addEventListener("click", function () {
                btnGrid.classList.add("active");
                btnConveyor.classList.remove("active");
                conveyorWrap.style.display = "none";
                gridWrap.style.display = "block";
            });
        })();

        // Product modal close buttons
        var closeBtn = document.getElementById("pdClose");
        if (closeBtn) {
            closeBtn.addEventListener("click", DesignFoundryApp.closeProductModal);
        }

        var talkBtn = document.getElementById("pdTalk");
        if (talkBtn) {
            talkBtn.addEventListener("click", DesignFoundryApp.closeProductModal);
        }

        // Close on backdrop click
        var dlg = document.getElementById("pd");
        if (dlg) {
            dlg.addEventListener("click", function (e) {
                if (e.target === dlg) {
                    DesignFoundryApp.closeProductModal();
                }
            });
        }

        // ==========================================
        // REAL LINEAR CONVEYOR ENGINE (60 FPS)
        // ==========================================
        var viewport = document.getElementById("conveyorViewport");
        var track = document.getElementById("conveyorTrack");
        var slats = document.getElementById("beltMovingSlats");
        var prevBtn = document.getElementById("convPrev");
        var nextBtn = document.getElementById("convNext");

        if (viewport && track) {
            var position = 0;
            var cruiseSpeed = 0.75; // Smooth horizontal cruise speed (px/frame)
            var velocity = 0;
            var isDown = false;
            var startX = 0;
            var lastX = 0;
            var totalDragDist = 0;
            var isHovered = false;

            // Half width of track (for infinite looping reset)
            function getLoopLimit() {
                return track.scrollWidth / 2;
            }

            // Pause when mouse hovers over cards
            viewport.addEventListener("mouseenter", function () { isHovered = true; });
            viewport.addEventListener("mouseleave", function () { isHovered = false; });

            // Prevent drag from triggering clicks on cards
            track.querySelectorAll(".conv-card").forEach(function (card) {
                card.addEventListener("click", function (e) {
                    if (totalDragDist > 8) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }, true);
            });

            // Pointer drag events
            viewport.addEventListener("mousedown", function (e) {
                isDown = true;
                startX = e.clientX;
                lastX = e.clientX;
                totalDragDist = 0;
                velocity = 0;
            });

            window.addEventListener("mousemove", function (e) {
                if (!isDown) return;
                var deltaX = e.clientX - lastX;
                lastX = e.clientX;
                totalDragDist += Math.abs(deltaX);

                position -= deltaX;
                velocity = -deltaX;
            });

            window.addEventListener("mouseup", function () {
                isDown = false;
            });

            // Touch support for mobile & tablet
            viewport.addEventListener("touchstart", function (e) {
                if (e.touches.length === 1) {
                    isDown = true;
                    startX = e.touches[0].clientX;
                    lastX = e.touches[0].clientX;
                    totalDragDist = 0;
                    velocity = 0;
                }
            }, { passive: true });

            window.addEventListener("touchmove", function (e) {
                if (!isDown || e.touches.length !== 1) return;
                var deltaX = e.touches[0].clientX - lastX;
                lastX = e.touches[0].clientX;
                totalDragDist += Math.abs(deltaX);

                position -= deltaX;
                velocity = -deltaX;
            }, { passive: true });

            window.addEventListener("touchend", function () {
                isDown = false;
            });

            // Nudge button controls
            if (prevBtn) {
                prevBtn.addEventListener("click", function () {
                    velocity = -14;
                });
            }
            if (nextBtn) {
                nextBtn.addEventListener("click", function () {
                    velocity = 14;
                });
            }

            // 60 FPS Render Loop
            function stepConveyor() {
                var loopLimit = getLoopLimit();

                // Auto cruise when idle
                if (!isDown && !isHovered) {
                    position += cruiseSpeed;
                }

                // Apply drag inertia with smooth friction
                if (!isDown && Math.abs(velocity) > 0.05) {
                    position += velocity;
                    velocity *= 0.94;
                }

                // Seamless Infinite Loop Wrapping
                if (loopLimit > 0) {
                    if (position >= loopLimit) {
                        position -= loopLimit;
                    } else if (position < 0) {
                        position += loopLimit;
                    }
                }

                // Translate the cards track
                track.style.transform = "translate3d(" + (-position).toFixed(1) + "px, 0, 0)";

                // Synchronize moving rubber belt slats
                if (slats) {
                    var slatOffset = (position % 20);
                    slats.style.transform = "translate3d(" + (-slatOffset).toFixed(1) + "px, 0, 0)";
                }

                requestAnimationFrame(stepConveyor);
            }

            requestAnimationFrame(stepConveyor);
        }

        // ==========================================================
        // PERMANENT BENTO FAQ CONTROLLER (SEARCH & DISCIPLINE FILTERS)
        // ==========================================================
        var FAQ_ITEMS = [
            {
                id: 1,
                tag: "CAD COMPATIBILITY",
                cat: "Compatibility",
                icon: "bi-laptop",
                q: "Which CAD software does it work with?",
                a: "It runs on your own CAD platform, from any CAD software. There is no change of software, no proprietary file formats, and no new CAD system to learn.",
                chips: ["SolidWorks", "Autodesk Inventor", "PTC Creo", "Siemens NX", "CATIA"]
            },
            {
                id: 2,
                tag: "CAD DATA EXTRACTION",
                cat: "Extraction",
                icon: "bi-diagram-3",
                q: "What does it read from our CAD data?",
                a: "It reads and analyses your historical parts, assemblies, and geometric relations. It captures the design logic and exposes it on screen for engineers to review or select as parameters.",
                chips: ["Feature Trees", "Mating Relations", "Parameters", "Assembly Constraints"]
            },
            {
                id: 3,
                tag: "NATURAL LANGUAGE INTERACTION",
                cat: "NLP Logic",
                icon: "bi-chat-square-text",
                q: "How do engineers ask for a change?",
                a: "In plain language. Built-in natural language processing (NLP) lets engineers ask for changes the way they would describe them to a colleague. When an input changes, the copilot checks rules and redesigns the affected assemblies.",
                chips: ["Plain English", "Prompt-to-CAD", "Constraint Checking", "Auto-Regenerate"]
            },
            {
                id: 4,
                tag: "MODEL INTEGRITY & CONTROL",
                cat: "Model Safety",
                icon: "bi-shield-check",
                q: "Does it change our existing models?",
                a: "Your engineer decides. They can create new part numbers and assemblies, or update the existing ones without overwriting historical baseline archives.",
                chips: ["Version Branching", "Safe Overwrite", "New Part Numbers", "Revision Sync"]
            },
            {
                id: 5,
                tag: "FEA & CFD SIMULATION",
                cat: "Simulation",
                icon: "bi-cpu",
                q: "What if the design needs analysis?",
                a: "If the design requires structural FEA or flow CFD analysis, the software automatically executes the calculation routines and serves verified stress, displacement, or flow results directly inside the workflow.",
                chips: ["FEA Stress Sizing", "CFD Flow Checks", "Code Compliance", "Instant Reports"]
            },
            {
                id: 6,
                tag: "TARGET TEAMS & WORKFLOWS",
                cat: "Audience",
                icon: "bi-gear-wide-connected",
                q: "Who gets the most from it?",
                a: "Engineering companies with extensive CAD archives and repetitive or customized design cycles—such as custom machine builders, heavy equipment manufacturers, and motion automation OEMs.",
                chips: ["Custom Machine Builders", "OEM Manufacturers", "EPC Contractors", "Motion Automation"]
            }
        ];

        var cardsMatrix = document.getElementById("faqCardsMatrix");
        var searchInput = document.getElementById("faqSearchInput");
        var filterPills = document.querySelectorAll(".faq-filter-pill");

        if (cardsMatrix) {
            var activeFilter = "all";

            function renderCards(list) {
                cardsMatrix.innerHTML = "";

                if (!list || list.length === 0) {
                    cardsMatrix.innerHTML =
                        '<div class="faq-empty-state">' +
                        '<i class="bi bi-search"></i>' +
                        '<p class="mono">NO MATCHING QUESTIONS FOUND</p>' +
                        '<p style="margin-top: 6px; font-size: 12px;">Try adjusting your keyword or selecting "All Questions" above.</p>' +
                        '</div>';
                    return;
                }

                list.forEach(function (item) {
                    var card = document.createElement("div");
                    card.className = "matrix-card";

                    var chipsHtml = item.chips.map(function (c) {
                        return '<span>' + c + '</span>';
                    }).join("");

                    card.innerHTML =
                        '<div class="matrix-card-header">' +
                        '<span class="matrix-card-tag mono">0' + item.id + ' &bull; ' + item.tag + '</span>' +
                        '<i class="bi ' + item.icon + ' matrix-card-icon"></i>' +
                        '</div>' +
                        '<h3>' + item.q + '</h3>' +
                        '<p>' + item.a + '</p>' +
                        '<div class="matrix-card-chips">' + chipsHtml + '</div>';

                    cardsMatrix.appendChild(card);
                });
            }

            function applyFilters() {
                var query = searchInput ? searchInput.value.toLowerCase().trim() : "";

                var filtered = FAQ_ITEMS.filter(function (item) {
                    var matchesCat = (activeFilter === "all" || item.cat === activeFilter);
                    if (!matchesCat) return false;
                    if (query.length === 0) return true;

                    return item.q.toLowerCase().includes(query) ||
                        item.a.toLowerCase().includes(query) ||
                        item.tag.toLowerCase().includes(query) ||
                        item.chips.some(function (c) { return c.toLowerCase().includes(query); });
                });

                renderCards(filtered);
            }

            // Category Filter Pills Click Handling
            filterPills.forEach(function (pill) {
                pill.addEventListener("click", function () {
                    filterPills.forEach(function (p) { p.classList.remove("active"); });
                    pill.classList.add("active");
                    activeFilter = pill.getAttribute("data-cat") || "all";
                    applyFilters();
                });
            });

            // Live Search
            if (searchInput) {
                searchInput.addEventListener("input", function () {
                    applyFilters();
                });
            }

            // Initial Render of All 6 Cards
            applyFilters();
        }

        // ==========================================================
        // 3D REAL CONTINENTS CANVAS GLOBE (HIGH-RES EQUAL-AREA ENGINE)
        // ==========================================================
        var globeCanvas = document.getElementById("contactGlobeCanvas");
        if (globeCanvas && globeCanvas.getContext) {
            var ctx = globeCanvas.getContext("2d");
            var width = globeCanvas.width;
            var height = globeCanvas.height;
            var radius = 138;
            var centerX = width / 2;
            var centerY = height / 2;

            // Simplified Real Geographic Polygons for Earth Continents [lon, lat]
            var CONTINENTS = {
                india: [[68, 24], [70, 22], [72, 19], [73, 18.5], [73.8, 18.5], [73, 15], [75, 11], [77.5, 8], [78, 9], [79.8, 10], [80, 13], [82, 16], [85, 19], [87, 21.5], [90, 22], [92, 21], [92, 26], [88, 27], [85, 27], [80, 31], [76, 33], [74, 35], [71, 32], [68, 27], [68, 24]],
                sri_lanka: [[80, 6], [81, 7], [82, 8], [80, 9], [79.5, 8], [80, 6]],
                africa: [[-17, 15], [-14, 20], [-16, 28], [-5, 36], [10, 37], [20, 32], [32, 31], [34, 27], [43, 12], [51, 11], [49, 8], [42, 2], [40, -5], [40, -12], [35, -22], [28, -34], [18, -34], [12, -18], [8, -4], [4, 5], [-4, 5], [-12, 8], [-17, 15]],
                madagascar: [[44, -13], [50, -15], [47, -25], [43, -24], [44, -13]],
                arabia: [[35, 32], [45, 30], [50, 26], [55, 24], [60, 22], [58, 16], [48, 13], [43, 12], [34, 27], [35, 32]],
                europe: [[-9, 36], [-9, 43], [0, 44], [5, 43], [12, 44], [16, 39], [24, 37], [28, 41], [35, 46], [38, 47], [36, 54], [28, 59], [20, 60], [14, 56], [9, 54], [5, 52], [-4, 48], [-9, 43], [-9, 36]],
                scandinavia: [[5, 58], [10, 54], [18, 56], [24, 60], [30, 70], [18, 68], [5, 62], [5, 58]],
                uk: [[-5, 50], [1, 51], [0, 54], [-2, 58], [-5, 58], [-5, 54], [-5, 50]],
                asia: [[35, 32], [45, 35], [50, 40], [55, 38], [65, 37], [70, 42], [75, 45], [85, 48], [100, 52], [120, 48], [130, 40], [122, 32], [115, 22], [108, 18], [100, 10], [104, 1], [108, 12], [98, 15], [92, 20], [88, 27], [80, 31], [70, 40], [60, 45], [50, 42], [40, 42], [35, 32]],
                se_asia: [[98, 8], [104, 1], [110, -5], [115, -8], [120, -8], [125, -8], [130, -4], [120, 0], [115, 4], [108, 12], [98, 8]],
                japan: [[130, 32], [136, 34], [141, 38], [144, 44], [140, 43], [132, 34], [130, 32]],
                australia: [[114, -22], [122, -18], [130, -14], [136, -12], [142, -11], [146, -18], [152, -26], [150, -36], [140, -38], [130, -32], [116, -34], [114, -22]],
                north_america: [[-165, 65], [-140, 70], [-100, 72], [-80, 65], [-65, 60], [-55, 48], [-70, 42], [-76, 35], [-81, 25], [-88, 30], [-97, 26], [-97, 20], [-84, 10], [-77, 8], [-84, 16], [-105, 23], [-117, 32], [-124, 45], [-135, 56], [-165, 65]],
                south_america: [[-77, 8], [-60, 8], [-48, -1], [-35, -6], [-38, -18], [-48, -28], [-58, -38], [-68, -54], [-75, -45], [-72, -30], [-76, -14], [-80, -2], [-80, 9], [-77, 8]]
            };

            function isInside(x, y, poly) {
                var inside = false;
                for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
                    var xi = poly[i][0], yi = poly[i][1];
                    var xj = poly[j][0], yj = poly[j][1];
                    var intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                    if (intersect) inside = !inside;
                }
                return inside;
            }

            // Generate Equal-Surface-Distance Land Dots (No pole bunching!)
            var landDots = [];
            var baseStep = 2.6; // High density resolution
            for (var lat = -54; lat <= 70; lat += baseStep) {
                var rLat = lat * (Math.PI / 180);
                var cosLat = Math.cos(rLat);
                var lonStep = Math.max(baseStep, baseStep / Math.max(0.12, cosLat));

                for (var lon = -180; lon <= 180; lon += lonStep) {
                    for (var key in CONTINENTS) {
                        if (isInside(lon, lat, CONTINENTS[key])) {
                            var rLon = lon * (Math.PI / 180);
                            landDots.push({
                                x0: cosLat * Math.sin(rLon),
                                y0: -Math.sin(rLat),
                                z0: cosLat * Math.cos(rLon)
                            });
                            break;
                        }
                    }
                }
            }

            // Exact Coordinates of Pune, India (18.5204° N, 73.8567° E)
            var pLat = 18.5204 * (Math.PI / 180);
            var pLon = 73.8567 * (Math.PI / 180);
            var puneDot = {
                x0: Math.cos(pLat) * Math.sin(pLon),
                y0: -Math.sin(pLat),
                z0: Math.cos(pLat) * Math.cos(pLon)
            };

            var yaw = -1.28; // Face directly at India on load
            var pitch = 0.26;
            var isDragging = false;
            var startX = 0, startY = 0;
            var velocityYaw = 0, velocityPitch = 0;
            var pulseAngle = 0;

            var isAutoSpinning = true;
            var spinBtn = document.getElementById("globeSpinBtn");
            var spinIcon = document.getElementById("globeSpinIcon");
            var spinText = document.getElementById("globeSpinText");

            if (spinBtn) {
                spinBtn.addEventListener("click", function () {
                    isAutoSpinning = !isAutoSpinning;
                    if (isAutoSpinning) {
                        spinIcon.className = "bi bi-pause-fill";
                        spinText.textContent = "Pause";
                        spinBtn.classList.remove("paused");
                        velocityYaw = 0; // Smooth resume
                    } else {
                        spinIcon.className = "bi bi-play-fill";
                        spinText.textContent = "Resume";
                        spinBtn.classList.add("paused");
                        velocityYaw = 0; // Immediate stop
                    }
                });
            }

            // Drag to Rotate
            var wrap = globeCanvas.parentElement;
            wrap.addEventListener("mousedown", function (e) {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                velocityYaw = 0;
                velocityPitch = 0;
            });

            window.addEventListener("mousemove", function (e) {
                if (!isDragging) return;
                var dx = e.clientX - startX;
                var dy = e.clientY - startY;
                startX = e.clientX;
                startY = e.clientY;
                yaw += dx * 0.007;
                pitch = Math.max(-0.7, Math.min(0.7, pitch + dy * 0.007));
                velocityYaw = dx * 0.007;
                velocityPitch = dy * 0.007;
            });

            window.addEventListener("mouseup", function () { isDragging = false; });

            // Touch Support
            wrap.addEventListener("touchstart", function (e) {
                if (e.touches.length === 1) {
                    isDragging = true;
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                }
            }, { passive: true });

            window.addEventListener("touchmove", function (e) {
                if (!isDragging || e.touches.length !== 1) return;
                var dx = e.touches[0].clientX - startX;
                var dy = e.touches[0].clientY - startY;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                yaw += dx * 0.007;
                pitch = Math.max(-0.7, Math.min(0.7, pitch + dy * 0.007));
            }, { passive: true });

            window.addEventListener("touchend", function () { isDragging = false; });

            // 60 FPS Render Loop
            function drawGlobe() {
                if (!isDragging && isAutoSpinning) {
                    yaw += 0.0024; // Smooth planetary cruise
                    if (Math.abs(velocityYaw) > 0.0001) {
                        yaw += velocityYaw;
                        velocityYaw *= 0.94;
                    }
                }
                pulseAngle += 0.04;

                ctx.clearRect(0, 0, width, height);

                // 1. Atmosphere Glow Halo
                var halo = ctx.createRadialGradient(centerX, centerY, radius * 0.85, centerX, centerY, radius * 1.18);
                halo.addColorStop(0, "rgba(35, 90, 220, 0.28)");
                halo.addColorStop(0.65, "rgba(242, 106, 10, 0.08)");
                halo.addColorStop(1, "transparent");
                ctx.fillStyle = halo;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius * 1.18, 0, Math.PI * 2);
                ctx.fill();

                // 2. Dark Deep-Ocean Base Sphere
                var oceanGrad = ctx.createRadialGradient(centerX - 35, centerY - 35, 15, centerX, centerY, radius);
                oceanGrad.addColorStop(0, "rgba(12, 28, 68, 0.96)");
                oceanGrad.addColorStop(0.8, "rgba(6, 14, 34, 0.98)");
                oceanGrad.addColorStop(1, "rgba(2, 6, 18, 1)");
                ctx.fillStyle = oceanGrad;
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.fill();

                // 3. Specular Edge Hairline
                ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
                ctx.lineWidth = 1.5;
                ctx.stroke();

                var cosY = Math.cos(yaw), sinY = Math.sin(yaw);
                var cosP = Math.cos(pitch), sinP = Math.sin(pitch);

                // 4. Subtle CAD Graticule Lines (Fills ocean areas with elegant depth)
                ctx.strokeStyle = "rgba(100, 160, 255, 0.08)";
                ctx.lineWidth = 1;
                [-25, 0, 25].forEach(function (latDeg) {
                    var rL = latDeg * (Math.PI / 180);
                    var cy = -Math.sin(rL);
                    var cr = Math.cos(rL);
                    ctx.beginPath();
                    var first = true;
                    for (var a = 0; a <= Math.PI * 2; a += 0.1) {
                        var x0 = cr * Math.sin(a);
                        var y0 = cy;
                        var z0 = cr * Math.cos(a);

                        var x1 = x0 * cosY - z0 * sinY;
                        var z1 = x0 * sinY + z0 * cosY;
                        var y1 = y0 * cosP - z1 * sinP;
                        var z2 = y0 * sinP + z1 * cosP;

                        if (z2 > 0) {
                            var sx = centerX + x1 * radius;
                            var sy = centerY + y1 * radius;
                            if (first) { ctx.moveTo(sx, sy); first = false; }
                            else { ctx.lineTo(sx, sy); }
                        } else {
                            first = true;
                        }
                    }
                    ctx.stroke();
                });

                // 5. RENDER REAL CONTINENT LAND-DOTS (Equal Distance + Depth Shading)
                for (var i = 0; i < landDots.length; i++) {
                    var d = landDots[i];
                    var x1 = d.x0 * cosY - d.z0 * sinY;
                    var z1 = d.x0 * sinY + d.z0 * cosY;
                    var y1 = d.y0 * cosP - z1 * sinP;
                    var z2 = d.y0 * sinP + z1 * cosP;

                    if (z2 > 0.01) {
                        var screenX = centerX + x1 * radius;
                        var screenY = centerY + y1 * radius;

                        // 3D Depth Lighting (Facing camera = bright crystal; edges = deep cyan)
                        var depthAlpha = 0.25 + (z2 * 0.72);
                        var dotSize = 1.0 + (z2 * 1.4);

                        if (z2 > 0.7) {
                            ctx.fillStyle = "rgba(200, 230, 255, " + depthAlpha.toFixed(2) + ")";
                        } else {
                            ctx.fillStyle = "rgba(120, 180, 255, " + depthAlpha.toFixed(2) + ")";
                        }

                        ctx.beginPath();
                        ctx.arc(screenX, screenY, dotSize, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }

                // 6. PROJECT EXACT PUNE, INDIA BEACON
                var px1 = puneDot.x0 * cosY - puneDot.z0 * sinY;
                var pz1 = puneDot.x0 * sinY + puneDot.z0 * cosY;
                var py1 = puneDot.y0 * cosP - pz1 * sinP;
                var pz2 = puneDot.y0 * sinP + pz1 * cosP;

                if (pz2 > 0.05) {
                    var puneX = centerX + px1 * radius;
                    var puneY = centerY + py1 * radius;

                    var r1 = (pulseAngle % 2) / 2;
                    var r2 = ((pulseAngle + 1) % 2) / 2;

                    // Concentric Sonar Pulse Rings
                    ctx.strokeStyle = "rgba(242, 106, 10, " + (1 - r1).toFixed(2) + ")";
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.arc(puneX, puneY, 6 + (r1 * 22), 0, Math.PI * 2);
                    ctx.stroke();

                    ctx.strokeStyle = "rgba(242, 106, 10, " + (1 - r2).toFixed(2) + ")";
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.arc(puneX, puneY, 6 + (r2 * 22), 0, Math.PI * 2);
                    ctx.stroke();

                    // Solid Core Pin
                    ctx.fillStyle = "#ffffff";
                    ctx.beginPath();
                    ctx.arc(puneX, puneY, 3, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = "var(--primary-accent)";
                    ctx.beginPath();
                    ctx.arc(puneX, puneY, 5.5, 0, Math.PI * 2);
                    ctx.fill();

                    // Clean Floating Leader Line & Glass Tag (Positioned cleanly to top-right)
                    var labelX = puneX + 28;
                    var labelY = puneY - 24;

                    ctx.strokeStyle = "rgba(242, 106, 10, 0.85)";
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.moveTo(puneX, puneY);
                    ctx.lineTo(labelX, labelY);
                    ctx.lineTo(labelX + 54, labelY);
                    ctx.stroke();

                    // Mini Glass Tag Background
                    ctx.fillStyle = "rgba(8, 17, 38, 0.85)";
                    ctx.strokeStyle = "rgba(242, 106, 10, 0.6)";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.roundRect(labelX - 2, labelY - 14, 58, 16, 4);
                    ctx.fill();
                    ctx.stroke();

                    ctx.font = "bold 9px monospace";
                    ctx.fillStyle = "#ffffff";
                    ctx.fillText("PUNE HQ", labelX + 4, labelY - 3);
                }

                requestAnimationFrame(drawGlobe);
            }

            requestAnimationFrame(drawGlobe);
        }

        // ==========================================
        // HERO TYPEWRITER (Designali Style - Tuned Timing)
        // ==========================================
        var typewriterEl = document.getElementById("heroTypewriter");
        if (typewriterEl) {
            var words = [
                "SolidWorks Mating Constraints",
                "Assembly Feature Trees (84 Parts)",
                "Production 2D Drawings & Tolerances",
                "BOM Sizing & ERP Costing",
                "FEA Deflection & IS/ASME Logic"
            ];
            var wordIndex = 0;
            var charIndex = words[0].length;
            var isDeleting = true;

            function typeLoop() {
                var currentWord = words[wordIndex];
                if (isDeleting) {
                    charIndex--;
                    typewriterEl.textContent = currentWord.substring(0, charIndex);
                    if (charIndex === 0) {
                        isDeleting = false;
                        wordIndex = (wordIndex + 1) % words.length;
                        setTimeout(typeLoop, 450); // Pause on empty before next word
                        return;
                    }
                    setTimeout(typeLoop, 22); // Fast deletion speed
                } else {
                    charIndex++;
                    typewriterEl.textContent = currentWord.substring(0, charIndex);
                    if (charIndex === currentWord.length) {
                        isDeleting = true;
                        setTimeout(typeLoop, 2800); // 2.8s reading pause on completed word
                        return;
                    }
                    setTimeout(typeLoop, 55); // Natural typing speed
                }
            }

            // Give visitors 3 seconds to read the initial text before first delete
            setTimeout(typeLoop, 3000);
        }

        // ==========================================
        // DYNAMIC PICK & PLACE ADJUSTMENT ENGINE + AMBIENT AUTO-DEMO
        // ==========================================
        var pnpSlider = document.getElementById("pnpSlider");
        if (pnpSlider) {
            var pnpStrokeVal = document.getElementById("pnpStrokeVal");
            var svgBaseBed = document.getElementById("svgBaseBed");
            var svgRightPost = document.getElementById("svgRightPost");
            var svgGuideRail = document.getElementById("svgGuideRail");
            var svgDimLine = document.getElementById("svgDimLine");
            var svgDimTickR = document.getElementById("svgDimTickR");
            var svgDimText = document.getElementById("svgDimText");
            var svgTargetZone = document.getElementById("svgTargetZone");
            var svgCarriageGroup = document.getElementById("svgCarriageGroup");
            var telemDeflect = document.getElementById("telemDeflect");
            var telemTorque = document.getElementById("telemTorque");
            var simDemoBadge = document.getElementById("simDemoBadge");
            var presetBtns = document.querySelectorAll(".preset-btn");

            var userHasInteracted = false;
            var demoRaf = null;
            var autoDemoTimer = null;

            function updatePnpMachine(stroke) {
                stroke = parseInt(stroke, 10);
                if (pnpStrokeVal) pnpStrokeVal.textContent = stroke + " MM";
                if (pnpSlider) pnpSlider.value = stroke;

                // Map stroke 300..680 mm to SVG coordinates
                var progress = (stroke - 300) / (680 - 300); // 0.0 to 1.0
                var postX = 260 + progress * 140; // 260 to 400
                var bedWidth = postX + 40;
                var railWidth = postX - 60;
                var midX = (74 + postX + 7) / 2;

                if (svgBaseBed) svgBaseBed.setAttribute("width", bedWidth);
                if (svgRightPost) svgRightPost.setAttribute("x", postX);
                if (svgGuideRail) svgGuideRail.setAttribute("width", railWidth);

                // DYNAMIC FIX: Keep FEA Stress bar matching the guide rail length exactly
                var feaBar = document.getElementById("svgFeaStressBar");
                if (feaBar) feaBar.setAttribute("width", railWidth);
                // DYNAMIC FIX: Keep right post mate dot locked to the right post
                var rightPostMate = document.getElementById("svgRightPostMate");
                if (rightPostMate) rightPostMate.setAttribute("cx", postX + 7);

                if (svgDimLine) svgDimLine.setAttribute("x2", postX + 7);
                if (svgDimTickR) {
                    svgDimTickR.setAttribute("x1", postX + 7);
                    svgDimTickR.setAttribute("x2", postX + 7);
                }
                if (svgDimText) {
                    svgDimText.setAttribute("x", midX);
                    svgDimText.textContent = "STROKE: " + stroke + " MM";
                }
                if (svgTargetZone) svgTargetZone.setAttribute("x", postX - 32);

                // Dynamic Carriage Travel along the rail
                if (svgCarriageGroup) {
                    var carriageX = 84 + progress * (postX - 140);
                    svgCarriageGroup.setAttribute("transform", "translate(" + (carriageX - 84) + ", 0)");
                }

                // Dynamic Engineering Telemetry calculation
                if (telemDeflect) {
                    var def = (0.024 + progress * 0.038).toFixed(3);
                    telemDeflect.textContent = def + " MM";
                }
                if (telemTorque) {
                    var tor = (3.6 + progress * 3.8).toFixed(1);
                    telemTorque.textContent = tor + " NM";
                }
            }

            // Stop auto-demo and give permanent manual control
            function stopAmbientDemo() {
                if (userHasInteracted) return;
                userHasInteracted = true;
                if (demoRaf) cancelAnimationFrame(demoRaf);
                if (autoDemoTimer) clearTimeout(autoDemoTimer);
                if (simDemoBadge) {
                    simDemoBadge.textContent = "MANUAL CONTROL";
                    simDemoBadge.classList.remove("is-demo");
                    simDemoBadge.classList.add("is-manual");
                }
            }

            // Ambient Demonstration: Smooth sinusoidal sweep between 350mm & 600mm
            function runAmbientDemo() {
                if (userHasInteracted) return;
                var startTime = null;
                var duration = 4000; // 4s cycle

                if (simDemoBadge) {
                    simDemoBadge.textContent = "DRAG TO CONTROL";
                    simDemoBadge.classList.add("is-demo");
                }

                function demoStep(timestamp) {
                    if (userHasInteracted) return;
                    if (!startTime) startTime = timestamp;
                    var elapsed = timestamp - startTime;
                    var t = (elapsed % duration) / duration;

                    // Smooth sinusoidal sweep: 450 -> 600 -> 350 -> 450
                    var currentStroke = Math.round(475 + 125 * Math.sin(t * Math.PI * 2));
                    updatePnpMachine(currentStroke);

                    // Update preset buttons visually during demo
                    presetBtns.forEach(function (btn) {
                        var val = parseInt(btn.getAttribute("data-stroke"), 10);
                        if (Math.abs(val - currentStroke) < 25) {
                            btn.classList.add("active");
                        } else {
                            btn.classList.remove("active");
                        }
                    });

                    demoRaf = requestAnimationFrame(demoStep);
                }

                demoRaf = requestAnimationFrame(demoStep);
            }

            // Trigger auto-demo when Copilot section scrolls into view
            var copilotSection = document.getElementById("copilot");
            if (copilotSection && "IntersectionObserver" in window) {
                var copilotObserver = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting && !userHasInteracted) {
                            autoDemoTimer = setTimeout(runAmbientDemo, 2000);
                        } else if (!entry.isIntersecting && !userHasInteracted) {
                            if (demoRaf) cancelAnimationFrame(demoRaf);
                            if (autoDemoTimer) clearTimeout(autoDemoTimer);
                        }
                    });
                }, { threshold: 0.35 });
                copilotObserver.observe(copilotSection);
            }

            // User Controls & Overrides
            if (pnpSlider) {
                pnpSlider.addEventListener("mousedown", stopAmbientDemo);
                pnpSlider.addEventListener("touchstart", stopAmbientDemo, { passive: true });
                pnpSlider.addEventListener("input", function (e) {
                    stopAmbientDemo();
                    updatePnpMachine(e.target.value);
                    presetBtns.forEach(function (b) { b.classList.remove("active"); });
                });
            }

            presetBtns.forEach(function (b) {
                b.addEventListener("click", function () {
                    stopAmbientDemo();
                    var s = b.getAttribute("data-stroke");
                    updatePnpMachine(s);
                    presetBtns.forEach(function (btn) { btn.classList.remove("active"); });
                    b.classList.add("active");
                });
            });

            // ==========================================
            // WORKFLOW STEPPER CONTROLLER WITH LIVE STAGE OVERLAYS
            // ==========================================
            var workflowData = [
                {
                    tag: "STEP 01",
                    desc: "Scanning SolidWorks assembly tree (84 components, 112 mates detected)",
                    stroke: 350,
                    overlayId: "svgStage1Mates",
                    telemIdx: 0 // MATES
                },
                {
                    tag: "STEP 02",
                    desc: "Capturing kinematics: slider stroke constrained to guide rails & actuator bed",
                    stroke: 400,
                    overlayId: "svgStage2Logic",
                    telemIdx: 2 // TORQUE
                },
                {
                    tag: "STEP 03",
                    desc: 'Prompt received: "Extend stroke to 500mm and recalculate rail bearings"',
                    stroke: 500,
                    overlayId: "svgStage3Prompt",
                    telemIdx: -1
                },
                {
                    tag: "STEP 04",
                    desc: "Verifying FEA & ASME logic: Deflection δ = 0.038 mm (< allowable 0.08 mm) ✓",
                    stroke: 550,
                    overlayId: "svgStage4Fea",
                    telemIdx: 1 // FEA
                },
                {
                    tag: "STEP 05",
                    desc: "Regeneration complete: 2D fabrication drawings updated, BOM synced to ERP ✓",
                    stroke: 600,
                    overlayId: "svgStage5Fab",
                    telemIdx: 3 // BOM
                }
            ];

            var stepBtns = document.querySelectorAll(".cp-pipe-step");
            var hudStepTag = document.getElementById("hudStepTag");
            var hudStepDesc = document.getElementById("hudStepDesc");
            var telemItems = document.querySelectorAll(".sim-telemetry .telem-item");
            var stageOverlays = document.querySelectorAll(".svg-stage-overlay");

            function activateWorkflowStep(stepNum) {
                var data = workflowData[stepNum - 1];
                if (!data) return;

                // 1. Update rail buttons
                stepBtns.forEach(function (b) { b.classList.remove("active"); });
                if (stepBtns[stepNum - 1]) stepBtns[stepNum - 1].classList.add("active");
                // Toggle carriage mate node along with Step 1
                var carriageMateNode = document.getElementById("svgCarriageMateNode");
                if (carriageMateNode) {
                    carriageMateNode.classList.toggle("active", stepNum === 1);
                }

                // 2. Update HUD text
                if (hudStepTag) hudStepTag.textContent = data.tag;
                if (hudStepDesc) hudStepDesc.textContent = data.desc;

                // 3. Actuate Carriage Machine
                updatePnpMachine(data.stroke);

                // 4. Update Preset Buttons
                presetBtns.forEach(function (b) {
                    if (parseInt(b.getAttribute("data-stroke"), 10) === data.stroke) {
                        b.classList.add("active");
                    } else {
                        b.classList.remove("active");
                    }
                });

                // 5. Toggle SVG Visualizer Stage Overlays
                stageOverlays.forEach(function (el) {
                    el.classList.toggle("active", el.id === data.overlayId);
                });

                // 6. Highlight Telemetry Focus
                telemItems.forEach(function (t, idx) {
                    t.classList.toggle("highlight", idx === data.telemIdx);
                });
            }

            stepBtns.forEach(function (btn) {
                btn.addEventListener("click", function () {
                    var stepNum = parseInt(btn.getAttribute("data-step"), 10);
                    activateWorkflowStep(stepNum);
                });
            });

            // Initialize at Step 1
            activateWorkflowStep(1);
        } // End if (pnpSlider)

        // ==========================================
        // WORKFLOW VIDEO FULLSCREEN CONTROLLER
        // ==========================================
        (function initWorkflowVideoFullscreen() {
            var btn = document.getElementById("cpBtnFullscreen");
            var video = document.getElementById("cpWorkflowVideo");
            if (!btn || !video) return;

            function toggleFullscreen() {
                var isFs = document.fullscreenElement || document.webkitFullscreenElement;
                if (!isFs) {
                    // Enter fullscreen (standard + vendor prefixes)
                    if (video.requestFullscreen) {
                        video.requestFullscreen();
                    } else if (video.webkitRequestFullscreen) {
                        video.webkitRequestFullscreen();
                    } else if (video.msRequestFullscreen) {
                        video.msRequestFullscreen();
                    }
                    // Auto-play if paused when expanding
                    if (video.paused) {
                        video.play().catch(function () { });
                    }
                } else {
                    // Exit fullscreen
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                }
            }

            // Click button to toggle
            btn.addEventListener("click", toggleFullscreen);

            // Double-click directly on video to toggle fullscreen
            video.addEventListener("dblclick", function (e) {
                e.preventDefault();
                toggleFullscreen();
            });

            // Dynamically update button icon & text on fullscreen change
            function updateBtnState() {
                var isFs = document.fullscreenElement || document.webkitFullscreenElement;
                if (isFs) {
                    btn.innerHTML = '<i class="bi bi-fullscreen-exit"></i><span>EXIT FULLSCREEN</span>';
                } else {
                    btn.innerHTML = '<i class="bi bi-arrows-fullscreen"></i><span>EXPAND FULLSCREEN</span>';
                }
            }

            document.addEventListener("fullscreenchange", updateBtnState);
            document.addEventListener("webkitfullscreenchange", updateBtnState);
        })();



        // ==========================================
        // UPGRADED CONTACT & INQUIRY CONTROLLER
        // ==========================================

        // 1. Detect incoming URL subject from Product Modal (?subject=...)
        (function checkInquiryUrlParams() {
            var params = new URLSearchParams(window.location.search);
            var subject = params.get("subject");
            if (subject) {
                var cleanName = decodeURIComponent(subject).replace("Discuss ", "").replace(" Copilot Automation", "");
                var badge = document.getElementById("contactInquiryBadge");
                var badgeText = document.getElementById("contactInquiryText");
                var eqInput = document.getElementById("inquiryEquipment");

                if (badge && badgeText) {
                    badgeText.textContent = "INQUIRY SPECIFIED: " + cleanName.toUpperCase() + " COPILOT";
                    badge.style.display = "inline-flex";
                }
                if (eqInput) {
                    eqInput.value = cleanName;
                }
            }
        })();

        // 2. Enhanced Card Copy Buttons with Visual Green Feedback
        document.querySelectorAll(".contact-subcard .copy").forEach(function (b) {
            b.addEventListener("click", function () {
                var targetText = b.getAttribute("data-copy");
                if (!targetText) return;

                DesignFoundryApp.copyToClipboard(targetText, b);
                b.classList.add("copied");
                b.innerHTML = '<i class="bi bi-check-lg"></i> Copied!';

                setTimeout(function () {
                    b.classList.remove("copied");
                    b.innerHTML = b.getAttribute("data-copy").indexOf("@") !== -1 ? "Copy Email"
                        : (b.getAttribute("data-copy").indexOf("+") !== -1 ? "Copy Phone" : "Copy Address");
                }, 2000);
            });
        });

        // 3. Quick Inquiry Modal Handling
        var inqDialog = document.getElementById("inquiryDialog");
        var btnOpenInq = document.getElementById("btnOpenInquiryModal");
        var btnCloseInq = document.getElementById("inquiryClose");
        var cadChips = document.querySelectorAll(".cad-chip");
        var activeCad = "SolidWorks";

        cadChips.forEach(function (chip) {
            chip.addEventListener("click", function () {
                cadChips.forEach(function (c) { c.classList.remove("active"); });
                chip.classList.add("active");
                activeCad = chip.getAttribute("data-cad");
                updateInquiryLinks();
            });
        });

        function getInquiryDraft() {
            var eq = (document.getElementById("inquiryEquipment") ? document.getElementById("inquiryEquipment").value.trim() : "") || "Equipment Automation";
            var email = (document.getElementById("inquiryEmail") ? document.getElementById("inquiryEmail").value.trim() : "") || "Not specified";

            return {
                subject: "Discuss " + eq + " Copilot - " + activeCad,
                body: "Hello Aryaman Technologies Team,\n\n" +
                    "We are exploring DesignFoundry CAD Copilot automation for our engineering designs.\n\n" +
                    "Details:\n" +
                    "- CAD Platform: " + activeCad + "\n" +
                    "- Target Equipment / Assembly: " + eq + "\n" +
                    "- Contact Email: " + email + "\n\n" +
                    "Please share feasibility and how historical CAD archives can be automated.\n\n" +
                    "Best regards,"
            };
        }

        function updateInquiryLinks() {
            var draft = getInquiryDraft();
            var sendBtn = document.getElementById("btnSendInquiryEmail");
            if (sendBtn) {
                sendBtn.setAttribute("href", "mailto:mail@aryamantechnologies.com?subject=" + encodeURIComponent(draft.subject) + "&body=" + encodeURIComponent(draft.body));
            }
        }

        var eqField = document.getElementById("inquiryEquipment");
        var mailField = document.getElementById("inquiryEmail");
        if (eqField) eqField.addEventListener("input", updateInquiryLinks);
        if (mailField) mailField.addEventListener("input", updateInquiryLinks);

        if (btnOpenInq && inqDialog) {
            btnOpenInq.addEventListener("click", function () {
                updateInquiryLinks();
                if (inqDialog.showModal) inqDialog.showModal();
                else inqDialog.setAttribute("open", "");
            });
        }

        // Close on Cross button click
        var btnCloseInq = document.getElementById("inquiryClose");
        if (btnCloseInq && inqDialog) {
            btnCloseInq.addEventListener("click", function (e) {
                e.stopPropagation();
                if (inqDialog.close) inqDialog.close();
                else inqDialog.removeAttribute("open");
            });
        }

        // Close when clicking outside on the backdrop
        if (inqDialog) {
            inqDialog.addEventListener("click", function (e) {
                if (e.target === inqDialog) {
                    if (inqDialog.close) inqDialog.close();
                    else inqDialog.removeAttribute("open");
                }
            });
        }

        // 4. 1-Click Copy Draft for Webmail users (Gmail / Outlook Web)
        var btnCopyDraft = document.getElementById("btnCopyInquiryDraft");
        if (btnCopyDraft) {
            btnCopyDraft.addEventListener("click", function () {
                var draft = getInquiryDraft();
                var fullText = "Subject: " + draft.subject + "\n\n" + draft.body;
                DesignFoundryApp.copyToClipboard(fullText, btnCopyDraft);
                btnCopyDraft.innerHTML = '<i class="bi bi-check-lg"></i> Copied to Clipboard!';
                setTimeout(function () {
                    btnCopyDraft.innerHTML = '<i class="bi bi-clipboard"></i> Copy Draft for Webmail';
                }, 2200);
            });
        }

        // ==========================================
        // ASYNCHRONOUS CONTACT & BACKEND CONTROLLER
        // ==========================================
        var inqDialog = document.getElementById("inquiryDialog");
        var navBookCallBtn = document.getElementById("navBookCallBtn");
        var btnOpenInq = document.getElementById("btnOpenInquiryModal");
        var btnCloseInq = document.getElementById("inquiryClose");
        var cadChips = document.querySelectorAll(".cad-chip");
        var activeCad = "SolidWorks";

        // Asynchronous Open on "Book a Call"
        function openInquiryModalAsync(e) {
            if (e) e.preventDefault();
            if (inqDialog) {
                if (inqDialog.showModal) inqDialog.showModal();
                else inqDialog.setAttribute("open", "");
            }
        }

        if (navBookCallBtn) navBookCallBtn.addEventListener("click", openInquiryModalAsync);
        if (btnOpenInq) btnOpenInq.addEventListener("click", openInquiryModalAsync);

        if (btnCloseInq && inqDialog) {
            btnCloseInq.addEventListener("click", function () {
                if (inqDialog.close) inqDialog.close();
                else inqDialog.removeAttribute("open");
            });
        }

        if (inqDialog) {
            inqDialog.addEventListener("click", function (e) {
                if (e.target === inqDialog) {
                    if (inqDialog.close) inqDialog.close();
                    else inqDialog.removeAttribute("open");
                }
            });
        }

        cadChips.forEach(function (chip) {
            chip.addEventListener("click", function () {
                cadChips.forEach(function (c) { c.classList.remove("active"); });
                chip.classList.add("active");
                activeCad = chip.getAttribute("data-cad");
            });
        });

        // Asynchronous Form Submission to Controller
        var btnSend = document.getElementById("btnSendInquiryEmail");
        if (btnSend) {
            btnSend.addEventListener("click", async function (e) {
                e.preventDefault();

                var eqVal = (document.getElementById("inquiryEquipment")?.value || "").trim();
                var emailVal = (document.getElementById("inquiryEmail")?.value || "").trim();

                if (!emailVal || emailVal.indexOf("@") === -1) {
                    alert("Please enter a valid work email address.");
                    document.getElementById("inquiryEmail")?.focus();
                    return;
                }

                var originalContent = btnSend.innerHTML;
                btnSend.disabled = true;
                btnSend.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Sending...';

                try {
                    var response = await fetch("/api/contact/inquiry", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            cadPlatform: activeCad,
                            equipment: eqVal || "Custom CAD Copilot",
                            email: emailVal
                        })
                    });

                    var result = await response.json();

                    if (response.ok && result.success) {
                        btnSend.innerHTML = '<i class="bi bi-check-circle-fill"></i> Sent Successfully!';
                        btnSend.style.background = "#10b981";
                        btnSend.style.borderColor = "#10b981";

                        setTimeout(function () {
                            if (inqDialog && inqDialog.close) inqDialog.close();
                            btnSend.disabled = false;
                            btnSend.innerHTML = originalContent;
                            btnSend.style.background = "";
                            btnSend.style.borderColor = "";
                        }, 2000);
                    } else {
                        throw new Error(result.message || "Failed to submit inquiry");
                    }
                } catch (err) {
                    alert("Error submitting inquiry. Opening webmail backup...");
                    window.location.href = "mailto:mail@aryamantechnologies.com?subject=Discuss%20" +
                        encodeURIComponent(eqVal || "Copilot") + "%20Automation&body=CAD%20Platform:%20" + activeCad;
                    btnSend.disabled = false;
                    btnSend.innerHTML = originalContent;
                }
            });
        }

        // ==========================================
        // MODERN SCROLL EXPERIENCE (Progress Bar, Reveal Physics, & ScrollSpy)
        // ==========================================
        (function initScrollExperience() {
            var progressBar = document.getElementById("scrollProgressBar");

            // 1. Top Laser Scroll Progress Indicator
            function updateScrollProgress() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
                var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                var progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
                if (progressBar) {
                    progressBar.style.width = Math.min(100, Math.max(0, progress)) + "%";
                }
            }

            if (window.lenis) {
                window.lenis.on("scroll", updateScrollProgress);
            }
            window.addEventListener("scroll", updateScrollProgress, { passive: true });
            updateScrollProgress();

            // 2. Viewport Reveal Engine via IntersectionObserver
            if ("IntersectionObserver" in window) {
                document.documentElement.classList.add("js-reveal");

                var revealObserver = new IntersectionObserver(function (entries, obs) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-revealed");
                            obs.unobserve(entry.target); // Reveal once smoothly
                        }
                    });
                }, {
                    threshold: 0.05,
                    rootMargin: "0px 0px -40px 0px"
                });

                // Landmark targets for smooth spring rise
                var revealSelectors = [
                    "section .sec-head",
                    ".hero-enterprise-grid",
                    ".ans-grid",
                    ".ans-card",
                    ".why-grid",
                    ".cp-studio-stage",
                    ".linear-conveyor-wrap",
                    ".faq-toolbar",
                    ".faq-reel-stage",
                    ".contact-console",
                    ".site-footer"
                ];

                document.querySelectorAll(revealSelectors.join(", ")).forEach(function (el) {
                    el.classList.add("scroll-reveal");
                    revealObserver.observe(el);
                });
                // 3. Robust ScrollSpy for Floating Navbar
                var sections = document.querySelectorAll("section[id]");
                var navLinks = document.querySelectorAll(".nav-links a");
                var currentPath = window.location.pathname.toLowerCase().replace(/\/$/, "");

                // A. Auto-highlight standalone page links (e.g. /About, /Faq)
                navLinks.forEach(function (link) {
                    var href = link.getAttribute("href") || "";
                    if (!href.includes("#")) {
                        var linkPath = href.toLowerCase().replace(/\/$/, "");
                        if (currentPath === linkPath && linkPath !== "") {
                            link.classList.add("active");
                        }
                    }
                });

                // B. Section ScrollSpy for Home Page (#answers, #why, #copilot, #contact)
                if (sections.length && navLinks.length) {
                    var spyObserver = new IntersectionObserver(function (entries) {
                        entries.forEach(function (entry) {
                            if (entry.isIntersecting) {
                                var id = entry.target.getAttribute("id");
                                navLinks.forEach(function (link) {
                                    var href = link.getAttribute("href") || "";
                                    var hash = href.includes("#") ? href.split("#")[1] : "";
                                    if (hash === id) {
                                        link.classList.add("active");
                                    } else if (hash) {
                                        link.classList.remove("active");
                                    }
                                });
                            }
                        });
                    }, {
                        threshold: 0.25,
                        rootMargin: "-80px 0px -35% 0px"
                    });

                    sections.forEach(function (sec) {
                        spyObserver.observe(sec);
                    });

                    // C. In-page smooth scroll on clicking navbar links on the home page
                    navLinks.forEach(function (link) {
                        var href = link.getAttribute("href") || "";
                        if (href.includes("#")) {
                            link.addEventListener("click", function (e) {
                                var hash = href.split("#")[1];
                                var targetEl = document.getElementById(hash);
                                if (targetEl && (currentPath === "" || currentPath === "/")) {
                                    e.preventDefault();
                                    var navOffset = -95; // Perfectly clears the floating capsule navbar
                                    if (window.lenis) {
                                        window.lenis.scrollTo(targetEl, { offset: navOffset });
                                    } else {
                                        var targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset + navOffset;
                                        window.scrollTo({ top: targetPos, behavior: "smooth" });
                                    }
                                    history.pushState(null, null, "#" + hash);
                                }
                            });
                        }
                    });
                }
            }
        })();

        // ==========================================
        // 21st.dev @dhxwhy SUN-MOON THEME TOGGLE CONTROLLER
        // ==========================================
        (function initThemeToggle() {
            var themeBtn = document.getElementById("themeToggleBtn");
            var html = document.documentElement;

            function applyTheme(theme) {
                html.setAttribute("data-theme", theme);
                localStorage.setItem("DesignFoundry_theme", theme);
                if (themeBtn) {
                    themeBtn.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " mode");
                }
            }

            var currentTheme = html.getAttribute("data-theme") || localStorage.getItem("DesignFoundry_theme") || "dark";
            applyTheme(currentTheme);

            if (themeBtn) {
                themeBtn.addEventListener("click", function () {
                    var current = html.getAttribute("data-theme") || "dark";
                    var next = current === "dark" ? "light" : "dark";
                    applyTheme(next);
                });
            }
        })();

        // ==========================================
        // CONTACT TELEMETRY LIVE COUNTER
        // ==========================================
        (function initContactTrustCounter() {
            var strip = document.getElementById("contactTrustStrip");
            if (!strip) return;

            var numbers = strip.querySelectorAll(".trust-num");
            var hasAnimated = false;

            function animateCount(el) {
                var target = parseInt(el.getAttribute("data-target"), 10) || 0;
                var duration = 1400; // 1.4s smooth roll
                var startTime = null;

                function step(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var progress = Math.min((timestamp - startTime) / duration, 1);
                    // Smooth ease-out cubic curve
                    var eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target);

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        el.textContent = target;
                    }
                }
                requestAnimationFrame(step);
            }

            if ("IntersectionObserver" in window) {
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting && !hasAnimated) {
                            hasAnimated = true;
                            numbers.forEach(animateCount);
                            observer.unobserve(strip);
                        }
                    });
                }, { threshold: 0.3 });
                observer.observe(strip);
            } else {
                numbers.forEach(function (el) {
                    el.textContent = el.getAttribute("data-target");
                });
            }
        })();

        // ==========================================
        // ABOUT SECTION LIVE SCROLL COUNTER
        // ==========================================
        (function initAboutCounters() {
            var statsRow = document.querySelector(".about-stats-row");
            if (!statsRow) return;

            var counters = statsRow.querySelectorAll(".about-count");
            if (!counters.length) return;

            var hasAnimated = false;

            function animateCount(el) {
                var target = parseInt(el.getAttribute("data-target"), 10) || 0;
                var duration = 1500; // 1.5s smooth roll
                var startTime = null;

                function step(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var progress = Math.min((timestamp - startTime) / duration, 1);
                    // Smooth ease-out cubic deceleration
                    var eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target);

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        el.textContent = target;
                    }
                }
                requestAnimationFrame(step);
            }

            if ("IntersectionObserver" in window) {
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting && !hasAnimated) {
                            hasAnimated = true;
                            counters.forEach(animateCount);
                            observer.unobserve(statsRow);
                        }
                    });
                }, { threshold: 0.25 });
                observer.observe(statsRow);
            } else {
                counters.forEach(function (el) {
                    el.textContent = el.getAttribute("data-target");
                });
            }
        })();

        // ==========================================
        // INTERACTIVE CAD CLOTH MESH CANVAS (Elastic Fabric Physics)
        // ==========================================
        (function initClothGrid() {
            var canvas = document.getElementById("clothGridCanvas");
            if (!canvas) return;
            var ctx = canvas.getContext("2d");
            if (!ctx) return;

            var width = 0, height = 0;
            var CELL = 36; // Matching 36px CAD blueprint grid cell size
            var cols = 0, rows = 0;
            var points = [];

            var mouse = {
                x: -1000,
                y: -1000,
                px: -1000,
                py: -1000,
                vx: 0,
                vy: 0,
                active: false
            };

            // ==========================================
            // CLOTH INTERACTION INTENSITY (TUNE HERE)
            // ==========================================
            var RADIUS = 60;          // Area of elastic mesh warp around cursor
            var PUSH_STRENGTH = 8;    // Push depression strength (gentle warp)
            var DRAG_STRENGTH = 0.18; // Pull along with mouse movement
            var TENSION = 0.11;       // Elastic return stiffness
            var DAMPING = 0.80;       // Friction damping

            // ==========================================
            // PRIMARY ACCENT COLOR FLOW (TUNE HERE)
            // ==========================================
            var FLOW_RADIUS = 100;     // Fluid color reach around mouse (px)
            var FLOW_BASE_ALPHA = 0.08;// Subtle aura when hovering / at rest
            var FLOW_MAX_ALPHA = 0.22; // Dynamic peak aura during active movement / scroll

            function resize() {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
                cols = Math.ceil(width / CELL) + 2;
                rows = Math.ceil(height / CELL) + 2;

                points = [];
                for (var r = 0; r <= rows; r++) {
                    var row = [];
                    for (var c = 0; c <= cols; c++) {
                        var x = c * CELL;
                        var y = r * CELL;
                        row.push({
                            x: x, y: y,
                            ox: x, oy: y,
                            vx: 0, vy: 0
                        });
                    }
                    points.push(row);
                }
            }

            resize();
            window.addEventListener("resize", resize, { passive: true });

            window.addEventListener("mousemove", function (e) {
                if (!mouse.active) {
                    mouse.px = e.clientX;
                    mouse.py = e.clientY;
                    mouse.active = true;
                } else {
                    mouse.px = mouse.x;
                    mouse.py = mouse.y;
                }
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                mouse.vx = (mouse.x - mouse.px) * 0.75;
                mouse.vy = (mouse.y - mouse.py) * 0.75;
            }, { passive: true });

            document.addEventListener("mouseleave", function () {
                mouse.active = false;
                mouse.x = -1000;
                mouse.y = -1000;
            });

            var scrollOffset = 0;
            var lastScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
            function onScroll() {
                var s = window.pageYOffset || document.documentElement.scrollTop || 0;
                var delta = s - lastScrollY;
                lastScrollY = s;
                scrollOffset = -(s * 0.45) % CELL;

                // When user scrolls, impart velocity to the active cursor so cloth & color flow with scroll
                if (mouse.active) {
                    mouse.vy -= Math.max(-16, Math.min(16, delta * 0.4));
                }
            }
            if (window.lenis) window.lenis.on("scroll", onScroll);
            window.addEventListener("scroll", onScroll, { passive: true });

            function updateAndDraw() {
                ctx.clearRect(0, 0, width, height);

                // 1. Update Cloth Mesh Physics (Elastic deformation & recovery)
                for (var r = 0; r <= rows; r++) {
                    for (var c = 0; c <= cols; c++) {
                        var p = points[r][c];
                        var targetY = p.oy + scrollOffset;

                        // Mouse interaction: push & pull like touching elastic cloth
                        if (mouse.active) {
                            var dx = p.x - mouse.x;
                            var dy = p.y - mouse.y;
                            var dist = Math.sqrt(dx * dx + dy * dy);

                            if (dist < RADIUS && dist > 0) {
                                var force = (1 - dist / RADIUS);
                                var push = force * PUSH_STRENGTH;
                                p.vx += (dx / dist) * push * 0.18 + mouse.vx * force * DRAG_STRENGTH;
                                p.vy += (dy / dist) * push * 0.18 + mouse.vy * force * DRAG_STRENGTH;
                            }
                        }

                        // Hooke's Law: Spring return to resting blueprint grid
                        p.vx += (p.ox - p.x) * TENSION;
                        p.vy += (targetY - p.y) * TENSION;
                        p.vx *= DAMPING; // Cloth damping friction
                        p.vy *= DAMPING;

                        p.x += p.vx;
                        p.y += p.vy;
                    }
                }

                var isDark = document.documentElement.getAttribute("data-theme") !== "light";
                var gridColor = isDark ? "rgba(100, 160, 240, 0.085)" : "rgba(11, 31, 77, 0.075)";

                // 2. Draw Horizontal Cloth Grid Lines
                ctx.lineWidth = 1;
                for (var r = 0; r <= rows; r++) {
                    ctx.beginPath();
                    ctx.strokeStyle = gridColor;
                    ctx.moveTo(points[r][0].x, points[r][0].y);
                    for (var c = 1; c <= cols; c++) {
                        ctx.lineTo(points[r][c].x, points[r][c].y);
                    }
                    ctx.stroke();
                }

                // 3. Draw Vertical Cloth Grid Lines
                for (var c = 0; c <= cols; c++) {
                    ctx.beginPath();
                    ctx.strokeStyle = gridColor;
                    ctx.moveTo(points[0][c].x, points[0][c].y);
                    for (var r = 1; r <= rows; r++) {
                        ctx.lineTo(points[r][c].x, points[r][c].y);
                    }
                    ctx.stroke();
                }

                // 4. Primary Accent Fluid Flow Aura & Illuminated Cloth Mesh
                if (mouse.active) {
                    var speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
                    var flowAlpha = Math.min(FLOW_BASE_ALPHA + speed * 0.012, FLOW_MAX_ALPHA);

                    // 4A. Soft Fluid Wake Aura (drags slightly behind cursor motion)
                    var wakeX = mouse.x - mouse.vx * 1.6;
                    var wakeY = mouse.y - mouse.vy * 1.6;
                    var auraGrad = ctx.createRadialGradient(
                        mouse.x, mouse.y, 2,
                        wakeX, wakeY, FLOW_RADIUS
                    );
                    auraGrad.addColorStop(0, "rgba(242, 106, 10, " + flowAlpha + ")");
                    auraGrad.addColorStop(0.45, "rgba(242, 106, 10, " + (flowAlpha * 0.45) + ")");
                    auraGrad.addColorStop(1, "rgba(242, 106, 10, 0)");

                    ctx.fillStyle = auraGrad;
                    ctx.beginPath();
                    ctx.arc(mouse.x, mouse.y, FLOW_RADIUS, 0, Math.PI * 2);
                    ctx.fill();

                    // 4B. Subtle Accent Highlight on Distorted Cloth Mesh Lines & Nodes
                    for (var r = 0; r <= rows; r++) {
                        for (var c = 0; c <= cols; c++) {
                            var p = points[r][c];
                            var dx = p.x - mouse.x;
                            var dy = p.y - mouse.y;
                            var dist = Math.sqrt(dx * dx + dy * dy);

                            if (dist < FLOW_RADIUS) {
                                var factor = 1 - dist / FLOW_RADIUS;

                                // Orange highlight on horizontal segment
                                if (c < cols) {
                                    var pRight = points[r][c + 1];
                                    var segAlpha = factor * (0.16 + Math.min(speed * 0.01, 0.20));
                                    ctx.strokeStyle = "rgba(242, 106, 10, " + segAlpha + ")";
                                    ctx.lineWidth = 1.1;
                                    ctx.beginPath();
                                    ctx.moveTo(p.x, p.y);
                                    ctx.lineTo(pRight.x, pRight.y);
                                    ctx.stroke();
                                }

                                // Orange highlight on vertical segment
                                if (r < rows) {
                                    var pDown = points[r + 1][c];
                                    var segAlpha = factor * (0.16 + Math.min(speed * 0.01, 0.20));
                                    ctx.strokeStyle = "rgba(242, 106, 10, " + segAlpha + ")";
                                    ctx.lineWidth = 1.1;
                                    ctx.beginPath();
                                    ctx.moveTo(p.x, p.y);
                                    ctx.lineTo(pDown.x, pDown.y);
                                    ctx.stroke();
                                }

                                // Illuminated mesh node
                                var nodeAlpha = factor * (0.35 + Math.min(speed * 0.015, 0.35));
                                ctx.fillStyle = "rgba(242, 106, 10, " + nodeAlpha + ")";
                                ctx.beginPath();
                                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                                ctx.fill();
                            }
                        }
                    }
                }

                // Damp mouse drag velocity
                mouse.vx *= 0.8;
                mouse.vy *= 0.8;

                requestAnimationFrame(updateAndDraw);
            }

            requestAnimationFrame(updateAndDraw);
        })();

        // Solution Section: Center Card Clickable Speed Comparison
        (function initSolutionSpeedToggle() {
            var morph = document.getElementById("ansTimeMorph");
            var coreCard = document.getElementById("ansCoreCard");
            if (!morph || !coreCard) return;

            coreCard.addEventListener("click", function () {
                var isDf = morph.getAttribute("data-mode") === "designfoundry";
                var nextMode = isDf ? "conventional" : "designfoundry";
                morph.setAttribute("data-mode", nextMode);
                coreCard.classList.toggle("is-active", !isDf);
                coreCard.setAttribute("aria-pressed", String(!isDf));
            });
        })();
    });
})(window, document);
