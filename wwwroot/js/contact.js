/**
 * DesignFoundry - Contact Page & Global Inquiry Modal (#contact)
 */
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

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
        var mobileBookCallBtn = document.getElementById("mobileBookCallBtn");
        var mobileDrawerBookBtn = document.getElementById("mobileDrawerBookBtn");
        var btnOpenInq = document.getElementById("btnOpenInquiryModal");
        var btnCloseInq = document.getElementById("inquiryClose");
        var cadChips = document.querySelectorAll(".cad-chip");
        var activeCad = "SolidWorks";

        // Asynchronous Open on "Book a Call"
        function openInquiryModalAsync(e) {
            if (e) e.preventDefault();
            var drawer = document.getElementById("mobileNavDrawer");
            var menuBtn = document.getElementById("mobileMenuBtn");
            if (drawer) drawer.setAttribute("hidden", "");
            if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
            if (inqDialog) {
                if (inqDialog.showModal) inqDialog.showModal();
                else inqDialog.setAttribute("open", "");
            }
        }

        if (navBookCallBtn) navBookCallBtn.addEventListener("click", openInquiryModalAsync);
        if (mobileBookCallBtn) mobileBookCallBtn.addEventListener("click", openInquiryModalAsync);
        if (mobileDrawerBookBtn) mobileDrawerBookBtn.addEventListener("click", openInquiryModalAsync);
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

        var otherCadInput = document.getElementById("inquiryOtherCad");

        cadChips.forEach(function (chip) {
            chip.addEventListener("click", function () {
                cadChips.forEach(function (c) { c.classList.remove("active"); });
                chip.classList.add("active");
                activeCad = chip.getAttribute("data-cad");

                if (otherCadInput) {
                    if (activeCad === "Other") {
                        otherCadInput.style.display = "block";
                        otherCadInput.required = true;
                        otherCadInput.focus();
                    } else {
                        otherCadInput.style.display = "none";
                        otherCadInput.required = false;
                        otherCadInput.value = "";
                    }
                }
            });
        });

        // Asynchronous Form Submission to Controller
        var btnSend = document.getElementById("btnSendInquiryEmail");
        if (btnSend) {
            btnSend.addEventListener("click", async function (e) {
                e.preventDefault();

                var eqInput = document.getElementById("inquiryEquipment");
                var emailInput = document.getElementById("inquiryEmail");
                var chosenCad = activeCad === "Other" ? (otherCadInput?.value || "").trim() : activeCad;
                var eqVal = (eqInput?.value || "").trim();
                var emailVal = (emailInput?.value || "").trim();
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!chosenCad) {
                    alert(activeCad === "Other" ? "Please enter your CAD platform." : "Please select your CAD platform.");
                    if (activeCad === "Other") otherCadInput?.focus();
                    return;
                }

                if (!eqVal) {
                    alert("Please enter the equipment or product you want to automate.");
                    eqInput?.focus();
                    return;
                }

                if (!emailVal || !emailRegex.test(emailVal)) {
                    alert("Please enter a valid email address.");
                    emailInput?.focus();
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
                            cadPlatform: chosenCad,
                            equipment: eqVal,
                            email: emailVal
                        })
                    });

                    var result = await response.json();

                    if (response.ok && result.success) {
                        btnSend.innerHTML = '<i class="bi bi-check-circle-fill"></i> Sent Successfully!';
                        btnSend.style.background = "#10b981";
                        btnSend.style.borderColor = "#10b981";
                        if (eqInput) eqInput.value = "";
                        if (emailInput) emailInput.value = "";
                        if (otherCadInput) otherCadInput.value = "";

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


});
