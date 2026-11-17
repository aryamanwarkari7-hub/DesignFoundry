/**
 * Designsfoundry Generative CAD - Global Application Script
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
            intro: "A comprehensive engineering design platform for sizing, performance evaluation and engineering documentation of axial-flow fans.",
            caps: [
                "Design-point based fan sizing and aerodynamic calculations",
                "Airflow, pressure, speed, power and efficiency evaluation",
                "Blade and impeller geometry parameterization",
                "Performance prediction and operating-point evaluation",
                "Systematic engineering calculations with configurable design inputs",
                "Automated engineering reports, BOM and design documentation",
                "Engineering-driven AI capabilities for data-assisted performance prediction and design refinement"
            ],
            apps: "Industrial ventilation, process air handling, cooling systems, exhaust systems, HVAC and engineered air-moving equipment.",
            value: "Reduces repetitive engineering work, improves design consistency and provides a structured path from design inputs to engineering output.",
            pdf: "/leaflets/aryaman-axial-fan-leaflet.pdf"
        },
        {
            title: "Cyclone Design Software",
            cat: "AI-ASSISTED ENGINEERING DESIGN",
            intro: "Engineering software for the design and evaluation of cyclone separators used for particulate separation from process gas streams.",
            caps: [
                "Process input based cyclone sizing",
                "Gas flow, particle and operating-condition calculations",
                "Pressure-drop and separation-performance evaluation",
                "Geometric parameterization of cyclone components",
                "Design alternatives and comparative evaluation",
                "Automated calculation sheets and engineering documentation",
                "AI-based modelling support for engineering-driven prediction and design optimization"
            ],
            apps: "Dust collection, process plants, material handling, combustion systems, cement, minerals, chemicals and industrial pollution-control systems.",
            value: "Combines established engineering relationships with data-driven computational methods to accelerate evaluation of cyclone designs.",
            pdf: "/leaflets/aryaman-cyclone-leaflet.pdf"
        },
        {
            title: "Storage Tank Design Software",
            cat: "ENGINEERING DESIGN AUTOMATION",
            intro: "A design automation solution for engineering and documentation of industrial storage tanks based on capacity, process and construction requirements.",
            caps: [
                "Capacity and dimensional calculations",
                "Tank diameter, height and geometry selection",
                "Shell, roof, bottom and support-related design inputs",
                "Nozzle and connection configuration",
                "Design checks and engineering calculations",
                "BOM and material estimation support",
                "Automated design reports and documentation"
            ],
            apps: "Water, chemicals, process liquids, utilities, industrial storage and manufacturing plants.",
            value: "Standardizes tank design workflows and helps engineering teams move efficiently from specification to manufacturing-ready documentation.",
            pdf: "/leaflets/aryaman-storage-tank-leaflet.pdf"
        },
        {
            title: "Belt Conveyor Design Software",
            cat: "ENGINEERING DESIGN AUTOMATION",
            intro: "A structured engineering platform for sizing and configuring belt conveyor systems for bulk material handling.",
            caps: [
                "Capacity and material-flow based design",
                "Conveyor length, speed and belt-width calculations",
                "Drive power and operating-condition evaluation",
                "Inclination and conveying arrangement calculations",
                "Pulley, idler and conveyor component selection support",
                "BOM and engineering documentation",
                "Design alternatives for different operating requirements"
            ],
            apps: "Bulk solids, minerals, aggregates, cement, food, chemicals, power plants and general material handling.",
            value: "Creates a repeatable conveyor engineering workflow while reducing manual calculation and documentation effort.",
            pdf: "/leaflets/aryaman-belt-conveyor-leaflet.pdf"
        },
        {
            title: "Bucket Elevator Design Software",
            cat: "ENGINEERING DESIGN AUTOMATION",
            intro: "Engineering software for the design and configuration of bucket elevators used for vertical bulk-material transportation.",
            caps: [
                "Capacity and material characteristics based design",
                "Elevator height and bucket arrangement calculations",
                "Belt/chain speed and drive-power evaluation",
                "Bucket selection and spacing support",
                "Head, boot and casing configuration",
                "Component and BOM generation support",
                "Engineering reports and design documentation"
            ],
            apps: "Cement, grains, fertilizers, minerals, chemicals, food processing and bulk-material handling plants.",
            value: "Streamlines the complete preliminary design process and provides consistent engineering outputs for project execution.",
            pdf: "/leaflets/aryaman-bucket-elevator-leaflet.pdf"
        },
        {
            title: "Wet Scrubber Design Software",
            cat: "AI-ASSISTED ENGINEERING DESIGN",
            intro: "A process and engineering design platform for wet scrubbers used for gas cleaning, particulate removal and selected gas-treatment applications.",
            caps: [
                "Gas-flow and contaminant-load based design inputs",
                "Scrubber geometry and equipment sizing",
                "Gas-side pressure-drop evaluation",
                "Liquid circulation and operating-parameter calculations",
                "Spray/contacting configuration support",
                "Performance evaluation and design comparison",
                "AI-based modelling capabilities for engineering-driven prediction and optimization"
            ],
            apps: "Industrial air pollution control, chemical processing, metal processing, combustion exhaust, mineral processing and process gas treatment.",
            value: "Helps engineers evaluate scrubber configurations faster while combining process engineering calculations with data-driven computational intelligence.",
            pdf: "/leaflets/aryaman-wet-scrubber-leaflet.pdf"
        },
        {
            title: "Screw Conveyor Design Software",
            cat: "ENGINEERING DESIGN AUTOMATION",
            intro: "Engineering software for the sizing and configuration of screw conveyors for controlled transport of bulk solids.",
            caps: [
                "Capacity and material-property based design",
                "Screw diameter, pitch and rotational-speed calculations",
                "Conveyor length and inclination evaluation",
                "Drive power and torque calculations",
                "Trough, shaft and flight configuration support",
                "Component and BOM generation support",
                "Engineering calculation reports"
            ],
            apps: "Powders, granules, ash, chemicals, food products, cement, minerals and process materials.",
            value: "Provides a standardized approach to screw conveyor sizing and reduces engineering effort for repeated equipment designs.",
            pdf: "/leaflets/aryaman-screw-conveyor-leaflet.pdf"
        },
        {
            title: "Heat Exchanger \u2013 Fin Tube Type",
            cat: "THERMAL DESIGN AUTOMATION",
            intro: "Thermal design software for fin-tube heat exchangers, supporting engineering evaluation from process requirements to equipment configuration.",
            caps: [
                "Hot- and cold-side process input definition",
                "Heat-duty and temperature-program calculations",
                "Tube, fin and geometry selection support",
                "Heat-transfer and pressure-drop evaluation",
                "Surface-area and performance calculations",
                "Design iteration and comparison",
                "Engineering calculation reports and documentation"
            ],
            apps: "Air coolers, gas heating/cooling, process equipment, HVAC, industrial dryers and thermal process systems.",
            value: "Accelerates thermal sizing and helps engineers compare exchanger configurations using a consistent calculation workflow.",
            pdf: "/leaflets/aryaman-heat-exchanger-fin-tube-type-leaflet.pdf"
        },
        {
            title: "Heat Exchanger \u2013 Shell & Tube Type",
            cat: "THERMAL DESIGN AUTOMATION",
            intro: "Engineering design software for shell-and-tube heat exchangers, supporting thermal sizing and configuration studies.",
            caps: [
                "Process-stream and heat-duty definition",
                "Temperature-program and thermal-balance calculations",
                "Tube-side and shell-side configuration",
                "Heat-transfer area estimation",
                "Pressure-drop evaluation",
                "Tube, shell and baffle configuration support",
                "Design iteration, comparison and engineering reports"
            ],
            apps: "Chemical, pharmaceutical, food, oil & gas, power, utilities and general process industries.",
            value: "Brings thermal calculations and equipment configuration into a repeatable digital engineering workflow.",
            pdf: "/leaflets/aryaman-heat-exchanger-shell-tube-type-leaflet.pdf"
        },
        {
            title: "Web Dryer Design Software",
            cat: "THERMAL & PROCESS DESIGN AUTOMATION",
            intro: "Engineering software for the preliminary design and process evaluation of web and continuous dryers for sheet, film and web-type products.",
            caps: [
                "Product and process-condition definition",
                "Moisture-removal and drying-duty calculations",
                "Airflow and thermal requirement evaluation",
                "Drying-zone and equipment configuration support",
                "Heat-transfer and energy-balance calculations",
                "Fan/heater requirement estimation",
                "Engineering documentation and design comparison"
            ],
            apps: "Paper, textile, film, coated sheets, continuous webs and industrial drying processes.",
            value: "Helps engineers translate production and drying requirements into a structured equipment design with repeatable calculations.",
            pdf: "/leaflets/aryaman-web-dryer-leaflet.pdf"
        },
        {
            title: "Damper Design Software",
            cat: "ENGINEERING DESIGN AUTOMATION",
            intro: "Design automation software for industrial air and gas dampers used to regulate, isolate or control flow in ducting systems.",
            caps: [
                "Flow and duct-size based damper sizing",
                "Damper geometry and blade configuration",
                "Pressure-drop evaluation",
                "Material and construction selection support",
                "Actuator and operating arrangement inputs",
                "BOM and component documentation",
                "Standardized design reports"
            ],
            apps: "Industrial ventilation, exhaust systems, air pollution control, HVAC, process plants and combustion-air systems.",
            value: "Improves consistency in damper sizing and documentation while reducing repetitive engineering calculations.",
            pdf: "/leaflets/aryaman-damper-leaflet.pdf"
        },
        {
            title: "Ducting Design Software",
            cat: "ENGINEERING DESIGN AUTOMATION",
            intro: "Engineering design software for industrial ducting systems, from airflow requirements and routing to pressure-drop evaluation and documentation.",
            caps: [
                "Airflow and duct-size calculations",
                "Velocity and pressure-drop evaluation",
                "Fittings, elbows, transitions and branches",
                "System resistance and fan-duty evaluation",
                "Duct geometry and routing configuration",
                "Material take-off and BOM support",
                "Engineering drawings and calculation documentation"
            ],
            apps: "Industrial ventilation, dust collection, exhaust, process air, HVAC and pollution-control systems.",
            value: "Provides a systematic workflow for duct-system engineering and helps maintain consistency across complex installations.",
            pdf: "/leaflets/aryaman-ducting-leaflet.pdf"
        },
        {
            title: "Sheet Metal Nesting Software",
            cat: "MANUFACTURING & NESTING AUTOMATION",
            intro: "Nesting and manufacturing automation software for arranging sheet-metal parts efficiently on standard or custom sheets for cutting and fabrication.",
            caps: [
                "Automatic part nesting and layout generation",
                "Material-utilization and scrap reduction analysis",
                "Part quantity and sheet-size optimization",
                "Kerf, spacing and manufacturing constraints support",
                "Multiple part and batch nesting",
                "NC/CNC preparation workflow support",
                "Nesting reports and material-consumption documentation"
            ],
            apps: "Laser cutting, plasma cutting, oxy-fuel cutting, sheet-metal fabrication, HVAC, equipment manufacturing and industrial enclosures.",
            value: "Improves material utilization, reduces manual nesting effort and creates a more efficient path from design data to cutting.",
            pdf: "/leaflets/aryaman-sheet-metal-nesting-leaflet.pdf"
        }
    ];

    // Expose globally on window
    window.PRODUCTS = PRODUCTS;

    // ==========================================
    // 2. GLOBAL APP OBJECT (Namespace)
    // ==========================================
    var DesignsfoundryApp = {
        products: PRODUCTS,

        // Modal methods
        openProductModal: function (index) {
            var dlg = document.getElementById("pd");
            if (!dlg || !PRODUCTS[index]) return;

            var p = PRODUCTS[index];
            document.getElementById("pdCat").textContent = p.cat;
            document.getElementById("pdTitle").textContent = p.title;
            document.getElementById("pdIntro").textContent = p.intro;
            document.getElementById("pdApps").textContent = p.apps;
            document.getElementById("pdVal").textContent = p.value;

            var ul = document.getElementById("pdCaps");
            ul.innerHTML = "";
            p.caps.forEach(function (c) {
                var li = document.createElement("li");
                li.textContent = c;
                ul.appendChild(li);
            });

            document.getElementById("pdPdf").setAttribute("href", p.pdf);

            if (dlg.showModal) {
                dlg.showModal();
            } else {
                dlg.setAttribute("open", "");
            }

            var body = dlg.querySelector(".pd-body");
            if (body) body.scrollTop = 0;
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
    window.DesignsfoundryApp = DesignsfoundryApp;

    // ==========================================
    // 3. EVENT LISTENERS INITIALIZATION
    // ==========================================
    document.addEventListener("DOMContentLoaded", function () {
        DesignsfoundryApp.initReducedMotion();

        // Product modal triggers
        document.querySelectorAll("button.prod").forEach(function (b) {
            b.addEventListener("click", function () {
                var idx = parseInt(b.getAttribute("data-i"), 10);
                DesignsfoundryApp.openProductModal(idx);
            });
        });

        // Product modal close buttons
        var closeBtn = document.getElementById("pdClose");
        if (closeBtn) {
            closeBtn.addEventListener("click", DesignsfoundryApp.closeProductModal);
        }

        var talkBtn = document.getElementById("pdTalk");
        if (talkBtn) {
            talkBtn.addEventListener("click", DesignsfoundryApp.closeProductModal);
        }

        // Close on backdrop click
        var dlg = document.getElementById("pd");
        if (dlg) {
            dlg.addEventListener("click", function (e) {
                if (e.target === dlg) {
                    DesignsfoundryApp.closeProductModal();
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
        // 21st.dev FAQ REEL + SEARCH & TOGGLE CONTROLLER
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

        var reelStack = document.getElementById("reelItemsStack");
        var asideCategory = document.getElementById("asideCategory");
        var asideCounter = document.getElementById("asideCounter");
        var asideQuestion = document.getElementById("asideQuestion");
        var asideAnswer = document.getElementById("asideAnswer");
        var asideChips = document.getElementById("asideChips");
        var prevBtn = document.getElementById("reelPrev");
        var nextBtn = document.getElementById("reelNext");

        var searchInput = document.getElementById("faqSearchInput");
        var btnViewReel = document.getElementById("btnViewReel");
        var btnViewGrid = document.getElementById("btnViewGrid");
        var reelView = document.getElementById("faqReelView");
        var gridView = document.getElementById("faqGridView");
        var cardsMatrix = document.getElementById("faqCardsMatrix");

        if (reelStack && asideQuestion) {
            var currentIndex = 0;

            function renderReelItems() {
                reelStack.innerHTML = "";
                FAQ_ITEMS.forEach(function (item, idx) {
                    var div = document.createElement("div");
                    div.className = "reel-item" + (idx === currentIndex ? " active" : "");
                    div.innerHTML =
                        '<div class="tile-top">' +
                        '<i class="bi ' + item.icon + '"></i>' +
                        '<span class="tile-num mono">0' + item.id + '</span>' +
                        '</div>' +
                        '<span class="tile-label">' + item.cat + '</span>';

                    div.addEventListener("click", function () {
                        currentIndex = idx;
                        updateReelView();
                    });
                    reelStack.appendChild(div);
                });
            }

            function updateReelView() {
                var item = FAQ_ITEMS[currentIndex];
                if (!item) return;

                // Update text aside
                asideCategory.textContent = item.tag;
                asideCounter.textContent = "0" + item.id + " / 0" + FAQ_ITEMS.length;
                asideQuestion.textContent = item.q;
                asideAnswer.textContent = item.a;

                // Update chips
                asideChips.innerHTML = "";
                item.chips.forEach(function (chip) {
                    var s = document.createElement("span");
                    s.textContent = chip;
                    asideChips.appendChild(s);
                });

                // Update active tile highlight
                var items = reelStack.querySelectorAll(".reel-item");
                items.forEach(function (el, idx) {
                    el.classList.toggle("active", idx === currentIndex);
                });
            }

            // Arrow Controls
            if (prevBtn) {
                prevBtn.addEventListener("click", function () {
                    currentIndex = (currentIndex - 1 + FAQ_ITEMS.length) % FAQ_ITEMS.length;
                    updateReelView();
                });
            }
            if (nextBtn) {
                nextBtn.addEventListener("click", function () {
                    currentIndex = (currentIndex + 1) % FAQ_ITEMS.length;
                    updateReelView();
                });
            }

            // Populate Grid View Matrix
            function renderGridView(filtered) {
                if (!cardsMatrix) return;
                cardsMatrix.innerHTML = "";
                var list = filtered || FAQ_ITEMS;

                if (list.length === 0) {
                    cardsMatrix.innerHTML = '<p style="grid-column: span 2; text-align: center; color: var(--text-secondary); padding: 40px;">No questions matched your search query.</p>';
                    return;
                }

                list.forEach(function (item) {
                    var card = document.createElement("div");
                    card.className = "matrix-card";
                    card.innerHTML = '<span class="mono" style="color: var(--primary-accent); font-size: 11px;">0' + item.id + ' &bull; ' + item.cat + '</span>' +
                        '<h3>' + item.q + '</h3>' +
                        '<p>' + item.a + '</p>';
                    cardsMatrix.appendChild(card);
                });
            }

            // View Mode Switching
            function setViewMode(mode) {
                if (mode === "grid") {
                    reelView.style.display = "none";
                    gridView.style.display = "block";
                    btnViewGrid.classList.add("active");
                    btnViewReel.classList.remove("active");
                    renderGridView();
                } else {
                    gridView.style.display = "none";
                    reelView.style.display = "grid";
                    btnViewReel.classList.add("active");
                    btnViewGrid.classList.remove("active");
                    updateReelView();
                }
            }

            if (btnViewReel) btnViewReel.addEventListener("click", function () { setViewMode("reel"); });
            if (btnViewGrid) btnViewGrid.addEventListener("click", function () { setViewMode("grid"); });

            // Live Search
            if (searchInput) {
                searchInput.addEventListener("input", function () {
                    var q = searchInput.value.toLowerCase().trim();
                    if (q.length > 0) {
                        setViewMode("grid");
                        var matches = FAQ_ITEMS.filter(function (item) {
                            return item.q.toLowerCase().includes(q) ||
                                item.a.toLowerCase().includes(q) ||
                                item.tag.toLowerCase().includes(q) ||
                                item.chips.some(function (c) { return c.toLowerCase().includes(q); });
                        });
                        renderGridView(matches);
                    } else {
                        setViewMode("reel");
                    }
                });
            }

            // Initial render
            renderReelItems();
            updateReelView();
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
        // DYNAMIC PICK & PLACE ADJUSTMENT ENGINE
        // ==========================================
        var pnpSlider = document.getElementById("pnpSlider");
        var pnpStrokeVal = document.getElementById("pnpStrokeVal");
        var svgBaseBed = document.getElementById("svgBaseBed");
        var svgRightPost = document.getElementById("svgRightPost");
        var svgGuideRail = document.getElementById("svgGuideRail");
        var svgDimLine = document.getElementById("svgDimLine");
        var svgDimTickR = document.getElementById("svgDimTickR");
        var svgDimText = document.getElementById("svgDimText");
        var svgTargetZone = document.getElementById("svgTargetZone");
        var telemDeflect = document.getElementById("telemDeflect");
        var telemTorque = document.getElementById("telemTorque");
        var presetBtns = document.querySelectorAll(".preset-btn");

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

        if (pnpSlider) {
            pnpSlider.addEventListener("input", function (e) {
                updatePnpMachine(e.target.value);
                presetBtns.forEach(function (b) { b.classList.remove("active"); });
            });
        }

        presetBtns.forEach(function (b) {
            b.addEventListener("click", function () {
                var s = b.getAttribute("data-stroke");
                updatePnpMachine(s);
                presetBtns.forEach(function (btn) { btn.classList.remove("active"); });
                b.classList.add("active");
            });
        });

        // ==========================================
        // WORKFLOW STEPPER CONTROLLER
        // ==========================================
        var workflowData = [
            {
                tag: "STEP 01",
                desc: "Scanning SolidWorks assembly tree (84 components, 112 mates detected)",
                stroke: 350
            },
            {
                tag: "STEP 02",
                desc: "Capturing kinematics: slider stroke constrained to guide rails & actuator bed",
                stroke: 400
            },
            {
                tag: "STEP 03",
                desc: 'Prompt received: "Extend stroke to 500mm and recalculate rail bearings"',
                stroke: 500
            },
            {
                tag: "STEP 04",
                desc: "Verifying FEA & ASME logic: Deflection δ = 0.038 mm (< allowable 0.08 mm) ✓",
                stroke: 550
            },
            {
                tag: "STEP 05",
                desc: "Regeneration complete: 2D fabrication drawings updated, BOM synced to ERP ✓",
                stroke: 600
            }
        ];

        var stepBtns = document.querySelectorAll(".cp-pipe-step");
        var hudStepTag = document.getElementById("hudStepTag");
        var hudStepDesc = document.getElementById("hudStepDesc");

        stepBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                var stepNum = parseInt(btn.getAttribute("data-step"), 10);
                var data = workflowData[stepNum - 1];
                if (!data) return;

                stepBtns.forEach(function (b) { b.classList.remove("active"); });
                btn.classList.add("active");

                if (hudStepTag) hudStepTag.textContent = data.tag;
                if (hudStepDesc) hudStepDesc.textContent = data.desc;

                updatePnpMachine(data.stroke);
                presetBtns.forEach(function (b) {
                    if (parseInt(b.getAttribute("data-stroke"), 10) === data.stroke) {
                        b.classList.add("active");
                    } else {
                        b.classList.remove("active");
                    }
                });
            });
        });

        // Copy buttons
        document.querySelectorAll(".copy").forEach(function (b) {
            b.addEventListener("click", function () {
                var targetText = b.getAttribute("data-copy");
                DesignsfoundryApp.copyToClipboard(targetText, b);
            });
        });

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

                // 3. ScrollSpy for Floating Navbar
                var sections = document.querySelectorAll("section[id]");
                var navLinks = document.querySelectorAll(".nav-links a[href^='#']");

                if (sections.length && navLinks.length) {
                    var spyObserver = new IntersectionObserver(function (entries) {
                        entries.forEach(function (entry) {
                            if (entry.isIntersecting) {
                                var id = entry.target.getAttribute("id");
                                navLinks.forEach(function (link) {
                                    if (link.getAttribute("href") === "#" + id) {
                                        link.classList.add("active");
                                    } else {
                                        link.classList.remove("active");
                                    }
                                });
                            }
                        });
                    }, {
                        threshold: 0.2,
                        rootMargin: "-60px 0px -40% 0px"
                    });

                    sections.forEach(function (sec) {
                        spyObserver.observe(sec);
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
                localStorage.setItem("designsfoundry_theme", theme);
                if (themeBtn) {
                    themeBtn.setAttribute("aria-label", "Switch to " + (theme === "dark" ? "light" : "dark") + " mode");
                }
            }

            var currentTheme = html.getAttribute("data-theme") || localStorage.getItem("designsfoundry_theme") || "dark";
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
        // CAD CROSSHAIR HUD & BACKGROUND GRID PARALLAX
        // ==========================================
        (function initCadReticleAndGrid() {
            var hud = document.getElementById("cadCursorHud");
            var gimbal = document.getElementById("cadGimbalSpin");
            var teleXY = document.getElementById("cadTeleXY");
            var toggleBtn = document.getElementById("btnToggleCadCursor");

            if (!hud || !gimbal) return;

            // State: Enabled by default, remembers user preference in localStorage
            var isCadEnabled = localStorage.getItem("df_cad_reticle") !== "false";

            function updateCadToggleUI(enabled) {
                if (enabled) {
                    hud.classList.remove("is-disabled");
                    if (toggleBtn) {
                        toggleBtn.classList.remove("is-off");
                        toggleBtn.setAttribute("aria-pressed", "true");
                        var statusEl = toggleBtn.querySelector(".toggle-status");
                        if (statusEl) statusEl.textContent = "ON";
                    }
                } else {
                    hud.classList.add("is-disabled");
                    hud.classList.remove("is-active");
                    if (toggleBtn) {
                        toggleBtn.classList.add("is-off");
                        toggleBtn.setAttribute("aria-pressed", "false");
                        var statusEl = toggleBtn.querySelector(".toggle-status");
                        if (statusEl) statusEl.textContent = "OFF";
                    }
                }
            }

            updateCadToggleUI(isCadEnabled);

            if (toggleBtn) {
                toggleBtn.addEventListener("click", function () {
                    isCadEnabled = !isCadEnabled;
                    localStorage.setItem("df_cad_reticle", isCadEnabled ? "true" : "false");
                    updateCadToggleUI(isCadEnabled);
                });
            }

            var mouseX = -100, mouseY = -100;
            var curX = -100, curY = -100;
            var targetScale = 1;
            var currentScale = 1;
            var targetAngle = 0;
            var currentAngle = 0;
            var isScrollingTimeout = null;

            // Track mouse cursor coordinates
            window.addEventListener("mousemove", function (e) {
                if (!isCadEnabled) return;
                mouseX = e.clientX;
                mouseY = e.clientY;
                hud.classList.add("is-active");
            }, { passive: true });

            document.addEventListener("mouseleave", function () {
                hud.classList.remove("is-active");
            });

            // Expand & spin needles on mouse wheel scroll
            window.addEventListener("wheel", function (e) {
                hud.classList.add("is-scrolling");

                // Needles expand outward
                targetScale = 1.6;
                // Spin in direction of wheel scroll
                targetAngle += (e.deltaY > 0 ? 32 : -32);

                clearTimeout(isScrollingTimeout);
                isScrollingTimeout = setTimeout(function () {
                    targetScale = 1; // Snap back to center box
                    // Snap to nearest 90-degree quadrant
                    targetAngle = Math.round(targetAngle / 90) * 90;
                    hud.classList.remove("is-scrolling");
                }, 180);
            }, { passive: true });

            // Moving CAD Blueprint Background Grid Parallax on Scroll
            var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
            function onScrollUpdate() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
                var delta = scrollTop - lastScrollTop;
                lastScrollTop = scrollTop;

                // Shift 32px grid lines smoothly along with scroll
                var gridShiftY = -(scrollTop * 0.45 % 32);
                document.documentElement.style.setProperty("--grid-offset-y", gridShiftY.toFixed(1) + "px");

                if (Math.abs(delta) > 1) {
                    hud.classList.add("is-scrolling");
                    targetScale = 1.65;
                    targetAngle += delta * 0.28;

                    clearTimeout(isScrollingTimeout);
                    isScrollingTimeout = setTimeout(function () {
                        targetScale = 1;
                        targetAngle = Math.round(targetAngle / 90) * 90;
                        hud.classList.remove("is-scrolling");
                    }, 180);
                }
            }

            if (window.lenis) {
                window.lenis.on("scroll", onScrollUpdate);
            }
            window.addEventListener("scroll", onScrollUpdate, { passive: true });

            // 60/120 FPS Physics Animation Loop
            function render() {
                // Smooth trailing chase ("cat behind mouse" offset + soft spring lag)
                var destX = mouseX + 60; // Stays 32px away to the right
                var destY = mouseY + 78; // Stays 28px away below the cursor
                curX += (destX - curX) * 0.09; // Soft trailing chase factor (0.09)
                curY += (destY - curY) * 0.09;

                // Smooth spring physics for expansion & spin
                currentScale += (targetScale - currentScale) * 0.16;
                currentAngle += (targetAngle - currentAngle) * 0.16;

                hud.style.transform = "translate3d(" + curX.toFixed(1) + "px, " + curY.toFixed(1) + "px, 0)";
                gimbal.style.transform = "scale(" + currentScale.toFixed(3) + ") rotate(" + currentAngle.toFixed(2) + "deg)";

                if (teleXY && mouseX > 0) {
                    teleXY.textContent = "X:" + Math.round(curX) + " Y:" + Math.round(curY);
                }

                requestAnimationFrame(render);
            }

            requestAnimationFrame(render);
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
            var RADIUS = 90;         // Area of effect around cursor (lower = smaller circle, e.g. 80-120)
            var PUSH_STRENGTH = 8;    // Push depression strength (lower = gentler warp, e.g. 4-10)
            var DRAG_STRENGTH = 0.18; // Pull along with mouse movement (lower = less pull, e.g. 0.10-0.25)
            var TENSION = 0.11;       // Elastic return stiffness (higher = stiffer cloth, e.g. 0.10-0.15)
            var DAMPING = 0.84;       // Friction damping (lower = stops waving faster, e.g. 0.80-0.85)

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
            function onScroll() {
                var s = window.pageYOffset || document.documentElement.scrollTop || 0;
                scrollOffset = -(s * 0.45) % CELL;
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
                var dotPrefix = isDark ? "rgba(59, 130, 246, " : "rgba(242, 106, 10, ";

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

                // 4. Subtle Glowing Nodes Near Mouse Interaction
                if (mouse.active) {
                    for (var r = 0; r <= rows; r++) {
                        for (var c = 0; c <= cols; c++) {
                            var p = points[r][c];
                            var dx = p.x - mouse.x;
                            var dy = p.y - mouse.y;
                            var dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < RADIUS) {
                                var alpha = (1 - dist / RADIUS) * 0.35;
                                ctx.fillStyle = dotPrefix + alpha + ")";
                                ctx.beginPath();
                                ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
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
