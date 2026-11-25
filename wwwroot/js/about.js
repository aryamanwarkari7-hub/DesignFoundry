/**
 * DesignFoundry - About Section (#about) Live Scroll Counter
 */
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

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


});
