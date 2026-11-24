/**
 * DesignFoundry - Connected Carousel Controller
 * Inspired by 21st.dev/@arunachalam/components/connected-carousel
 */
document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("ccTrack");
    if (!track) return;

    const cards = Array.from(track.querySelectorAll(".cc-card"));
    const dots = Array.from(document.querySelectorAll("#ccIndicators .cc-dot"));
    const total = cards.length;
    let activeIndex = 0;
    let timer = null;
    const intervalMs = 6000;
    let isPaused = false;

    function updateCarousel(newIndex) {
        activeIndex = (newIndex + total) % total;

        cards.forEach((card, idx) => {
            // Remove previous positioning classes
            card.classList.remove(
                "is-active",
                "is-prev-1",
                "is-next-1",
                "is-prev-2",
                "is-next-2",
                "is-hidden"
            );

            // Compute circular offset relative to active card
            let diff = (idx - activeIndex + total) % total;
            if (diff > total / 2) diff -= total;

            if (diff === 0) {
                card.classList.add("is-active");
            } else if (diff === -1) {
                card.classList.add("is-prev-1");
            } else if (diff === 1) {
                card.classList.add("is-next-1");
            } else if (diff === -2) {
                card.classList.add("is-prev-2");
            } else if (diff === 2) {
                card.classList.add("is-next-2");
            } else {
                card.classList.add("is-hidden");
            }
        });

        // Update progress dots
        dots.forEach((dot, idx) => {
            const fill = dot.querySelector(".cc-dot-fill");
            if (idx === activeIndex) {
                dot.classList.add("active");
                if (fill) {
                    fill.style.transition = "none";
                    fill.style.width = "0%";
                    // Force reflow then start 6s progress animation
                    void fill.offsetWidth;
                    fill.style.transition = `width ${intervalMs}ms linear`;
                    fill.style.width = "100%";
                }
            } else {
                dot.classList.remove("active");
                if (fill) {
                    fill.style.transition = "none";
                    fill.style.width = "0%";
                }
            }
        });

        resetTimer();
    }

    function resetTimer() {
        if (timer) clearInterval(timer);
        if (!isPaused) {
            timer = setInterval(() => {
                updateCarousel(activeIndex + 1);
            }, intervalMs);
        }
    }

    // Click on preview cards to rotate to them
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            const idx = parseInt(card.getAttribute("data-index"), 10);
            if (idx !== activeIndex) {
                updateCarousel(idx);
            }
        });
    });

    // Click on indicator dots
    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const idx = parseInt(dot.getAttribute("data-index"), 10);
            updateCarousel(idx);
        });
    });

    // Pause on hover
    const stage = document.querySelector(".cc-stage-wrapper");
    if (stage) {
        stage.addEventListener("mouseenter", () => {
            isPaused = true;
            if (timer) clearInterval(timer);
            const activeFill = document.querySelector(".cc-dot.active .cc-dot-fill");
            if (activeFill) {
                const computedWidth = window.getComputedStyle(activeFill).width;
                activeFill.style.transition = "none";
                activeFill.style.width = computedWidth;
            }
        });

        stage.addEventListener("mouseleave", () => {
            isPaused = false;
            updateCarousel(activeIndex);
        });
    }

    // Initialize first slide
    updateCarousel(0);
});