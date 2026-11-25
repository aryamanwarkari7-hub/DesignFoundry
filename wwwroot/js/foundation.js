/**
 * DesignFoundry - Applications & Foundation Section (#foundation)
 */
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

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


});
