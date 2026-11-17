/**
 * Realistic Industrial Pick & Place (PnP) Cartesian Linear Actuator
 * Modeled after Festo / SMC / Misumi linear guide with servo drive,
 * Z-axis pneumatic slide, and downward parallel gripper holding a workpiece.
 */
(function () {
    "use strict";

    var canvas = document.getElementById("cadHeroCanvas");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    var angleDisplay = document.getElementById("cadAngle");
    var zoomDisplay = document.getElementById("cadZoomVal");
    var fillBtn = document.getElementById("cadFillBtn");
    var fillModeText = document.getElementById("cadFillMode");
    var wrap = canvas.parentElement;

    // View & Transform state
    var rotX = -0.36;
    var rotY = 0.62;
    var userZoom = 1.05;
    var isFilled = true;
    var autoSpin = true;
    var isDragging = false;
    var lastMouseX = 0;
    var lastMouseY = 0;
    var idleTimer = null;

    // ==========================================
    // 3D GEOMETRY DEFINITION (Realistic Actuator)
    // Centered at Origin (0, 0, 0) in mm
    // ==========================================

    var rawVertices = [
        // --- 1. Base Structural Bed (X: -85 to +95, Y: 14 to 28, Z: -20 to +20) ---
        [-85, 14, -20], [95, 14, -20], [95, 14, 20], [-85, 14, 20],   // 0..3 (Bed Top)
        [-85, 28, -20], [95, 28, -20], [95, 28, 20], [-85, 28, 20],   // 4..7 (Bed Bottom)

        // --- 2. Right Idler End Cap (X: 95 to 108, Y: 10 to 30, Z: -22 to +22) ---
        [95, 10, -22],  [108, 10, -22], [108, 10, 22],  [95, 10, 22],   // 8..11 (Cap Top)
        [95, 30, -22],  [108, 30, -22], [108, 30, 22],  [95, 30, 22],   // 12..15 (Cap Bottom)

        // --- 3. Left Motor Mounting Flange (X: -98 to -85, Y: 8 to 32, Z: -22 to +22) ---
        [-98, 8, -22],  [-85, 8, -22],  [-85, 8, 22],  [-98, 8, 22],    // 16..19 (Flange Top)
        [-98, 32, -22], [-85, 32, -22], [-85, 32, 22], [-98, 32, 22],   // 20..23 (Flange Bottom)

        // --- 4. Servo Motor Housing (X: -136 to -98, Y: 10 to 30, Z: -18 to +18) ---
        [-136, 10, -18], [-98, 10, -18], [-98, 10, 18], [-136, 10, 18], // 24..27 (Motor Top)
        [-136, 30, -18], [-98, 30, -18], [-98, 30, 18], [-136, 30, 18], // 28..31 (Motor Bottom)

        // --- 5. Dual Linear Guide Rails (Polished Steel Rods) ---
        [-85, 8, -11], [95, 8, -11], // 32, 33 (Rear Rail)
        [-85, 8, 11],  [95, 8, 11],  // 34, 35 (Front Rail)

        // --- 6. Horizontal Slide Carriage (X: -26 to +26, Y: -2 to 14, Z: -26 to +26) ---
        [-26, -2, -26], [26, -2, -26], [26, -2, 26], [-26, -2, 26],     // 36..39 (Carriage Top)
        [-26, 14, -26], [26, 14, -26], [26, 14, 26], [-26, 14, 26],     // 40..43 (Carriage Bottom)

        // --- 7. Vertical Z-Axis Slide Body (X: -12 to +12, Y: -34 to -2, Z: -12 to +12) ---
        [-12, -34, -12], [12, -34, -12], [12, -34, 12], [-12, -34, 12], // 44..47 (Z-Slide Top)
        [-12, -2, -12],  [12, -2, -12],  [12, -2, 12],  [-12, -2, 12],   // 48..51 (Z-Slide Bottom)

        // --- 8. Downward Gripper Body (X: -16 to +16, Y: -2 to 16, Z: -14 to +14) ---
        // Note: Extends DOWNWARD from carriage toward the work surface
        [-16, 2, -14],  [16, 2, -14],  [16, 2, 14],  [-16, 2, 14],      // 52..55 (Gripper Base)
        [-16, 16, -14], [16, 16, -14], [16, 16, 14], [-16, 16, 14],     // 56..59 (Gripper Head)

        // --- 9. Parallel Gripper Jaws (Facing DOWNWARD) ---
        [-14, 16, -6], [-8, 28, -6], [-8, 28, 6], [-14, 16, 6],         // 60..63 (Left Jaw)
        [8, 28, -6],   [14, 16, -6], [14, 16, 6],  [8, 28, 6],           // 64..67 (Right Jaw)

        // --- 10. Machined Workpiece Held Between Jaws (X: -7 to +7, Y: 20 to 32, Z: -8 to +8) ---
        [-7, 20, -8], [7, 20, -8], [7, 20, 8], [-7, 20, 8],             // 68..71 (Workpiece Top)
        [-7, 32, -8], [7, 32, -8], [7, 32, 8], [-7, 32, 8]              // 72..75 (Workpiece Bottom)
    ];

    // Connectivity matrix (Edges)
    var edges = [
        // Base Bed
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7],

        // Idler Cap
        [8, 9], [9, 10], [10, 11], [11, 8],
        [12, 13], [13, 14], [14, 15], [15, 12],
        [8, 12], [9, 13], [10, 14], [11, 15],

        // Motor Flange
        [16, 17], [17, 18], [18, 19], [19, 16],
        [20, 21], [21, 22], [22, 23], [23, 20],
        [16, 20], [17, 21], [18, 22], [19, 23],

        // Servo Motor
        [24, 25], [25, 26], [26, 27], [27, 24],
        [28, 29], [29, 30], [30, 31], [31, 28],
        [24, 28], [25, 29], [26, 30], [27, 31],

        // Linear Guide Rails
        [32, 33], [34, 35],

        // Carriage Block
        [36, 37], [37, 38], [38, 39], [39, 36],
        [40, 41], [41, 42], [42, 43], [43, 40],
        [36, 40], [37, 41], [38, 42], [39, 43],

        // Z-Axis Slide Body
        [44, 45], [45, 46], [46, 47], [47, 44],
        [48, 49], [49, 50], [50, 51], [51, 48],
        [44, 48], [45, 49], [46, 50], [47, 51],

        // Downward Gripper
        [52, 53], [53, 54], [54, 55], [55, 52],
        [56, 57], [57, 58], [58, 59], [59, 56],
        [52, 56], [53, 57], [54, 58], [55, 59],

        // Jaws
        [60, 61], [61, 62], [62, 63], [63, 60],
        [64, 65], [65, 66], [66, 67], [67, 64],

        // Workpiece
        [68, 69], [69, 70], [70, 71], [71, 68],
        [72, 73], [73, 74], [74, 75], [75, 72],
        [68, 72], [69, 73], [70, 74], [71, 75]
    ];

    // Solid Faces for 3D Shading
    var faces = [
        // Base Extrusion
        { indices: [0, 1, 2, 3], part: "bed" },
        { indices: [4, 7, 6, 5], part: "bed" },
        { indices: [0, 3, 7, 4], part: "bed" },
        { indices: [1, 5, 6, 2], part: "bed" },

        // Right Idler End Cap
        { indices: [8, 9, 10, 11], part: "metal" },
        { indices: [9, 13, 14, 10], part: "metal" },
        { indices: [10, 14, 15, 11], part: "metal" },

        // Left Motor Flange
        { indices: [16, 17, 18, 19], part: "metal" },
        { indices: [16, 20, 21, 17], part: "metal" },
        { indices: [19, 18, 22, 23], part: "metal" },

        // Servo Motor Housing
        { indices: [24, 25, 26, 27], part: "motor" },
        { indices: [28, 31, 30, 29], part: "motor" },
        { indices: [24, 28, 29, 25], part: "motor" },
        { indices: [27, 26, 30, 31], part: "motor" },
        { indices: [24, 27, 31, 28], part: "motor" },

        // Slide Carriage (Safety Orange)
        { indices: [36, 37, 38, 39], part: "carriage" },
        { indices: [40, 43, 42, 41], part: "carriage" },
        { indices: [36, 40, 41, 37], part: "carriage" },
        { indices: [39, 38, 42, 43], part: "carriage" },
        { indices: [36, 39, 43, 40], part: "carriage" },
        { indices: [37, 41, 42, 38], part: "carriage" },

        // Vertical Z-Axis Mast
        { indices: [44, 45, 46, 47], part: "zaxis" },
        { indices: [44, 48, 49, 45], part: "zaxis" },
        { indices: [47, 46, 50, 51], part: "zaxis" },
        { indices: [44, 47, 51, 48], part: "zaxis" },
        { indices: [45, 49, 50, 46], part: "zaxis" },

        // Downward Gripper Base
        { indices: [52, 53, 54, 55], part: "gripper" },
        { indices: [56, 59, 58, 57], part: "gripper" },
        { indices: [52, 56, 57, 53], part: "gripper" },
        { indices: [55, 54, 58, 59], part: "gripper" },

        // Gripper Jaws
        { indices: [60, 61, 62, 63], part: "jaw" },
        { indices: [64, 65, 66, 67], part: "jaw" },

        // Machined Workpiece (Gold / Brass contrast highlight)
        { indices: [68, 69, 70, 71], part: "workpiece" },
        { indices: [72, 75, 74, 73], part: "workpiece" },
        { indices: [68, 72, 73, 69], part: "workpiece" },
        { indices: [71, 70, 74, 75], part: "workpiece" }
    ];

    // Directional Light Vector (from Top-Front-Left)
    var lightVec = [0.45, -0.75, 0.48];
    var lLen = Math.sqrt(lightVec[0] * lightVec[0] + lightVec[1] * lightVec[1] + lightVec[2] * lightVec[2]);
    lightVec = [lightVec[0] / lLen, lightVec[1] / lLen, lightVec[2] / lLen];

    // ==========================================
    // RESIZE & DPI
    // ==========================================
    var logicalWidth = 400;
    var logicalHeight = 320;

    function resize() {
        var rect = wrap ? wrap.getBoundingClientRect() : canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        var dpr = window.devicePixelRatio || 1;
        logicalWidth = rect.width;
        logicalHeight = rect.height;

        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
    }
    window.addEventListener("resize", resize);
    resize();

    // ==========================================
    // 3D ROTATION & PROJECTION
    // ==========================================
    function rotatePoint(p) {
        var cosY = Math.cos(rotY), sinY = Math.sin(rotY);
        var x1 = p[0] * cosY - p[2] * sinY;
        var z1 = p[0] * sinY + p[2] * cosY;

        var cosX = Math.cos(rotX), sinX = Math.sin(rotX);
        var y2 = p[1] * cosX - z1 * sinX;
        var z2 = p[1] * sinX + z1 * cosX;

        return [x1, y2, z2];
    }

    function project3D(rotatedP, cx, cy, dynamicScale) {
        var fov = 340;
        var distance = 360;
        var scale = (fov / (distance + rotatedP[2])) * dynamicScale * userZoom;

        return {
            x: cx + rotatedP[0] * scale,
            y: cy + rotatedP[1] * scale,
            z: rotatedP[2]
        };
    }

    // ==========================================
    // RENDER LOOP
    // ==========================================
    function draw() {
        var dpr = window.devicePixelRatio || 1;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, logicalWidth, logicalHeight);

        var cx = logicalWidth / 2;
        var cy = logicalHeight / 2 - 4;
        var minDim = Math.min(logicalWidth, logicalHeight);
        var dynamicScale = Math.max(0.65, Math.min(1.15, minDim / 350));

        if (autoSpin) rotY += 0.0055;

        if (angleDisplay) {
            var deg = Math.round((((rotY * 180 / Math.PI) % 360) + 360) % 360);
            angleDisplay.textContent = deg + "°";
        }
        if (zoomDisplay) {
            zoomDisplay.textContent = Math.round(userZoom * 100) + "%";
        }

        var isDark = document.documentElement.getAttribute("data-theme") === "dark" ||
            window.matchMedia("(prefers-color-scheme: dark)").matches;

        var baseWireColor = isDark ? "#8fb0ff" : "#0b1f4d";
        var accentColor = isDark ? "#ff7a1f" : "#f26a0a";

        // 1. Rotate all 3D points
        var rotatedPoints = rawVertices.map(rotatePoint);

        // 2. Project to 2D screen coordinates
        var projected = rotatedPoints.map(function (rp) {
            return project3D(rp, cx, cy, dynamicScale);
        });

        // 3. Render Solid Surfaces with Directional CAD Shading
        if (isFilled) {
            var faceData = faces.map(function (f) {
                var p0 = rotatedPoints[f.indices[0]];
                var p1 = rotatedPoints[f.indices[1]];
                var p2 = rotatedPoints[f.indices[2]];

                var v1 = [p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]];
                var v2 = [p2[0] - p0[0], p2[1] - p0[1], p2[2] - p0[2]];

                var nx = v1[1] * v2[2] - v1[2] * v2[1];
                var ny = v1[2] * v2[0] - v1[0] * v2[2];
                var nz = v1[0] * v2[1] - v1[1] * v2[0];
                var len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
                nx /= len; ny /= len; nz /= len;

                var dot = nx * lightVec[0] + ny * lightVec[1] + nz * lightVec[2];
                var intensity = Math.max(0.25, Math.min(1.0, 0.45 + 0.55 * dot));

                var avgZ = f.indices.reduce(function (sum, idx) {
                    return sum + rotatedPoints[idx][2];
                }, 0) / f.indices.length;

                return {
                    face: f,
                    intensity: intensity,
                    depth: avgZ
                };
            });

            // Painter's algorithm: sort back-to-front
            faceData.sort(function (a, b) {
                return b.depth - a.depth;
            });

            faceData.forEach(function (fd) {
                var f = fd.face;
                var I = fd.intensity;

                ctx.beginPath();
                var pStart = projected[f.indices[0]];
                ctx.moveTo(pStart.x, pStart.y);
                for (var i = 1; i < f.indices.length; i++) {
                    var pNext = projected[f.indices[i]];
                    ctx.lineTo(pNext.x, pNext.y);
                }
                ctx.closePath();

                if (f.part === "bed") {
                    // Anodized Aluminum Extruded Track
                    var r = Math.round(20 + 30 * I);
                    var g = Math.round(40 + 50 * I);
                    var b = Math.round(75 + 85 * I);
                    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ", 0.92)";
                } else if (f.part === "motor") {
                    // Matte Black / Dark Gray Industrial Servo
                    var v = Math.round(15 + 40 * I);
                    ctx.fillStyle = "rgba(" + v + "," + (v + 5) + "," + (v + 15) + ", 0.95)";
                } else if (f.part === "carriage") {
                    // Precision Safety Orange Carriage Block
                    var r = Math.round(180 + 75 * I);
                    var g = Math.round(65 + 45 * I);
                    var b = Math.round(5 + 15 * I);
                    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ", 0.96)";
                } else if (f.part === "zaxis" || f.part === "gripper") {
                    // Toolhead Assembly (Orange-accented machinery)
                    var r = Math.round(200 + 55 * I);
                    var g = Math.round(85 + 40 * I);
                    var b = Math.round(10 + 20 * I);
                    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ", 0.95)";
                } else if (f.part === "workpiece") {
                    // Machined Brass / Gold Workpiece in Gripper
                    var r = Math.round(190 + 65 * I);
                    var g = Math.round(150 + 55 * I);
                    var b = Math.round(30 + 40 * I);
                    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + ", 0.96)";
                } else {
                    // Machined steel end plates
                    var v = Math.round(60 + 70 * I);
                    ctx.fillStyle = "rgba(" + v + "," + (v + 10) + "," + (v + 25) + ", 0.92)";
                }
                ctx.fill();
            });
        }

        // 4. Render Sharp CAD Contour Edges
        edges.forEach(function (e) {
            var p1 = projected[e[0]];
            var p2 = projected[e[1]];

            ctx.beginPath();
            if (e[0] >= 36 && e[0] <= 43) {
                // Carriage
                ctx.strokeStyle = isFilled ? "#ffe0cc" : accentColor;
                ctx.lineWidth = 1.8;
            } else if (e[0] >= 44 && e[0] <= 67) {
                // Z-Axis & Gripper
                ctx.strokeStyle = isFilled ? "#ffeedd" : accentColor;
                ctx.lineWidth = 1.6;
            } else if (e[0] >= 68) {
                // Workpiece
                ctx.strokeStyle = isFilled ? "#fff8db" : "#f59e0b";
                ctx.lineWidth = 1.8;
            } else if (e[0] >= 24 && e[0] <= 31) {
                // Motor
                ctx.strokeStyle = isFilled ? "#8fa8d6" : "#475569";
                ctx.lineWidth = 1.4;
            } else if (e[0] >= 32 && e[0] <= 35) {
                // Dual Steel Guide Rods
                ctx.strokeStyle = isFilled ? "#e2e8f0" : "#94a3b8";
                ctx.lineWidth = 1.6;
            } else {
                // Base Extrusion
                ctx.strokeStyle = isFilled ? (isDark ? "#b0c8ff" : "#d0dcff") : baseWireColor;
                ctx.lineWidth = 1.2;
            }
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        });

        // 5. Bearing joint dots on carriage & Z-slide
        projected.forEach(function (p, idx) {
            if ((idx >= 36 && idx <= 39) || (idx >= 60 && idx <= 67)) {
                ctx.fillStyle = accentColor;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2.0, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // 6. Coordinate Tripod (Bottom-Right)
        var tripodX = logicalWidth - 55;
        var tripodY = logicalHeight - 45;
        var tripodLen = 20;

        var cosY = Math.cos(rotY), sinY = Math.sin(rotY);
        var cosX = Math.cos(rotX), sinX = Math.sin(rotX);

        function projectAxis(ax, ay, az) {
            var x1 = ax * cosY - az * sinY;
            var z1 = ax * sinY + az * cosY;
            var y2 = ay * cosX - z1 * sinX;
            return { x: tripodX + x1 * tripodLen, y: tripodY + y2 * tripodLen };
        }

        var pX = projectAxis(1, 0, 0);
        var pY = projectAxis(0, -1, 0);
        var pZ = projectAxis(0, 0, 1);

        ctx.lineWidth = 1.8;
        ctx.strokeStyle = "#f26a0a";
        ctx.beginPath(); ctx.moveTo(tripodX, tripodY); ctx.lineTo(pX.x, pX.y); ctx.stroke();
        ctx.strokeStyle = "#10b981";
        ctx.beginPath(); ctx.moveTo(tripodX, tripodY); ctx.lineTo(pY.x, pY.y); ctx.stroke();
        ctx.strokeStyle = "#3b82f6";
        ctx.beginPath(); ctx.moveTo(tripodX, tripodY); ctx.lineTo(pZ.x, pZ.y); ctx.stroke();

        ctx.font = "9px var(--font-family-mono, monospace)";
        ctx.fillStyle = "#f26a0a"; ctx.fillText("X", pX.x + 3, pX.y + 3);
        ctx.fillStyle = "#10b981"; ctx.fillText("Y", pY.x + 3, pY.y - 3);
        ctx.fillStyle = "#3b82f6"; ctx.fillText("Z", pZ.x + 3, pZ.y + 3);

        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    // ==========================================
    // MOUSE SCROLL ZOOM
    // ==========================================
    wrap.addEventListener("wheel", function (e) {
        e.preventDefault();
        var zoomDelta = -e.deltaY * 0.0015;
        userZoom = Math.max(0.5, Math.min(2.4, userZoom + zoomDelta));
    }, { passive: false });

    // ==========================================
    // FILL / WIREFRAME TOGGLE BUTTON
    // ==========================================
    if (fillBtn) {
        fillBtn.addEventListener("click", function () {
            isFilled = !isFilled;
            if (fillModeText) {
                fillModeText.textContent = isFilled ? "SOLID SHADED" : "WIREFRAME";
            }
        });
    }

    // ==========================================
    // DRAG-TO-ORBIT CONTROLS
    // ==========================================
    function onPointerDown(clientX, clientY) {
        isDragging = true;
        autoSpin = false;
        lastMouseX = clientX;
        lastMouseY = clientY;
        if (idleTimer) clearTimeout(idleTimer);
    }

    function onPointerMove(clientX, clientY) {
        if (!isDragging) return;
        var dx = clientX - lastMouseX;
        var dy = clientY - lastMouseY;

        rotY += dx * 0.008;
        rotX += dy * 0.008;

        rotX = Math.max(-1.3, Math.min(1.3, rotX));

        lastMouseX = clientX;
        lastMouseY = clientY;
    }

    function onPointerUp() {
        if (isDragging) {
            isDragging = false;
            idleTimer = setTimeout(function () {
                if (!isDragging) autoSpin = true;
            }, 2000);
        }
    }

    wrap.addEventListener("mousedown", function (e) { onPointerDown(e.clientX, e.clientY); });
    window.addEventListener("mousemove", function (e) { onPointerMove(e.clientX, e.clientY); });
    window.addEventListener("mouseup", onPointerUp);

    wrap.addEventListener("touchstart", function (e) {
        if (e.touches.length === 1) onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    window.addEventListener("touchmove", function (e) {
        if (!isDragging || e.touches.length !== 1) return;
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    window.addEventListener("touchend", onPointerUp);

})();
