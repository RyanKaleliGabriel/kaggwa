// homepage why maps? section animation and interaction
document.addEventListener("DOMContentLoaded", () => {
  const teaser = document.getElementById("why-maps-teaser");
  const toggleBtn = teaser?.querySelector(".why-maps-toggle");
  const section = document.getElementById("why-maps");

  const bgWrapper = section?.querySelector(".why-maps-backgrounds-wrapper");
  const backgrounds = bgWrapper
    ? Array.from(bgWrapper.querySelectorAll(".why-maps-background"))
    : [];

  const steps = section
    ? Array.from(section.querySelectorAll(".why-maps-step"))
    : [];

  const lineColored = section?.querySelector(".why-line.line-colored");
  const lineFiller = lineColored?.querySelector(".why-line-filler");
  const lineTrack = section?.querySelector(".why-line.line-track");
  const nextStepDot = lineTrack?.querySelector(".why-next-step");

  if (toggleBtn && section) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = section.classList.contains("is-open");
      if (isOpen) {
        section.classList.remove("is-open");
        teaser.classList.remove("is-open");

        setTimeout(() => section.classList.add("is-collapsed"), 400);
      } else {
        section.classList.remove("is-collapsed");
        section.classList.add("is-open");
        teaser.classList.add("is-open");
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  if (section && steps.length > 0 && backgrounds.length > 0 &&
      lineFiller && nextStepDot) {

    const totalSteps = steps.length - 1;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const stepEl = entry.target;
            const index = parseInt(stepEl.dataset.step || "0", 10);
            steps.forEach((s) => s.classList.remove("is-active"));
            stepEl.classList.add("is-active");

            // swap background
            backgrounds.forEach((bg) => {
              const bgIndex = parseInt(bg.dataset.step || "0", 10);
              bg.classList.toggle("is-active", bgIndex === index);
            });

            const progress = totalSteps <= 0 ? 1 : index / totalSteps;
            const linePct = 10 + progress * 80;

            lineFiller.style.height = `${linePct}%`;
            nextStepDot.style.top = `${linePct}%`;
          });
        },
        {
          root: null,
          threshold: 0.5,
          rootMargin: "-20% 0px -40% 0px",
        }
      );

      steps.forEach((step) => observer.observe(step));
    }
  }
});
