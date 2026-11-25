/**
 * DesignFoundry - Hero & How It Works Section (#copilot)
 */
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

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




});
