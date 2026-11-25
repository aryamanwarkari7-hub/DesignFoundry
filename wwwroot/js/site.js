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

            // Direct Meeting Booking Link (reads Microsoft Bookings URL from _Layout data attribute)
            var elTalk = document.getElementById("pdTalk");
            if (elTalk) {
                var bookingUrl = elTalk.getAttribute("data-booking-url") || "/contact";
                elTalk.setAttribute("href", bookingUrl);
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
                // 3. Robust ScrollSpy for Floating Navbar & Mobile Drawer
                var sections = document.querySelectorAll("section[id]");
                var navLinks = document.querySelectorAll(".nav-links a, .mobile-nav-list a");
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
                                navLinks.forEach(function (item) {
                                    var itemHref = item.getAttribute("href") || "";
                                    var itemHash = itemHref.includes("#") ? itemHref.split("#")[1] : "";
                                    if (itemHash === hash) {
                                        item.classList.add("active");
                                    } else if (itemHash) {
                                        item.classList.remove("active");
                                    }
                                });
                                var targetEl = document.getElementById(hash);
                                if (targetEl && (currentPath === "" || currentPath === "/")) {
                                    e.preventDefault();
                                    var header = document.querySelector("header.header-floating");
                                    var navOffset = header ? -(Math.round(header.getBoundingClientRect().bottom) + 12) : -92;
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
        // MOBILE NAVIGATION DRAWER CONTROLLER
        // ==========================================
        (function initMobileNav() {
            var menuBtn = document.getElementById("mobileMenuBtn");
            var drawer = document.getElementById("mobileNavDrawer");
            if (!menuBtn || !drawer) return;

            function setDrawerOpen(isOpen) {
                if (isOpen) {
                    drawer.removeAttribute("hidden");
                } else {
                    drawer.setAttribute("hidden", "");
                }
                menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
            }

            menuBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                var isOpen = menuBtn.getAttribute("aria-expanded") === "true";
                setDrawerOpen(!isOpen);
            });

            drawer.querySelectorAll("a").forEach(function (link) {
                link.addEventListener("click", function () {
                    setDrawerOpen(false);
                });
            });

            document.addEventListener("click", function (e) {
                if (menuBtn.getAttribute("aria-expanded") === "true" &&
                    !drawer.contains(e.target) &&
                    !menuBtn.contains(e.target)) {
                    setDrawerOpen(false);
                }
            });

            document.addEventListener("keydown", function (e) {
                if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
                    setDrawerOpen(false);
                }
            });
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
    });
})(window, document);
