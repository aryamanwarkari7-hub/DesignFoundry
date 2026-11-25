/**
 * DesignFoundry - Solution Section (#answers) Interactive Speed Comparison
 */
document.addEventListener("DOMContentLoaded", function () {
    "use strict";


        // Solution Section: Center Card Clickable Speed Comparison (Auto-Resets After 5s)
        (function initSolutionSpeedToggle() {
            var morph = document.getElementById("ansTimeMorph");
            var coreCard = document.getElementById("ansCoreCard");
            if (!morph || !coreCard) return;

            var resetTimer = null;

            function setMode(mode) {
                var isDf = mode === "designfoundry";
                morph.setAttribute("data-mode", mode);
                coreCard.classList.toggle("is-active", isDf);
                coreCard.setAttribute("aria-pressed", String(isDf));

                if (resetTimer) clearTimeout(resetTimer);
                if (isDf) {
                    resetTimer = setTimeout(function () {
                        setMode("conventional");
                    }, 5000);
                }
            }

            coreCard.addEventListener("click", function () {
                var isDf = morph.getAttribute("data-mode") === "designfoundry";
                setMode(isDf ? "conventional" : "designfoundry");
            });
        })();

});
