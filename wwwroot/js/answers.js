/**
 * DesignFoundry - Solution Section (#answers) Interactive Speed Comparison
 */
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    (function initSolutionStage() {
        var stage = document.getElementById("ansStage");
        var tabConv = document.getElementById("ansTabConventional");
        var tabDf = document.getElementById("ansTabDesignFoundry");
        var actionBtn = document.getElementById("ansStageActionBtn");
        if (!stage || !tabConv || !tabDf || !actionBtn) return;

        var viewConv = stage.querySelector(".ans-view-conv");
        var viewDf = stage.querySelector(".ans-view-df");

        function setMode(mode) {
            var isDf = mode === "designfoundry";
            stage.setAttribute("data-mode", mode);

            tabConv.classList.toggle("is-active", !isDf);
            tabConv.setAttribute("aria-selected", String(!isDf));

            tabDf.classList.toggle("is-active", isDf);
            tabDf.setAttribute("aria-selected", String(isDf));

            if (viewConv) viewConv.setAttribute("aria-hidden", String(isDf));
            if (viewDf) viewDf.setAttribute("aria-hidden", String(!isDf));
        }

        tabConv.addEventListener("click", function () {
            setMode("conventional");
        });

        tabDf.addEventListener("click", function () {
            setMode("designfoundry");
        });

        actionBtn.addEventListener("click", function () {
            var isDf = stage.getAttribute("data-mode") === "designfoundry";
            setMode(isDf ? "conventional" : "designfoundry");
        });
    })();
});
