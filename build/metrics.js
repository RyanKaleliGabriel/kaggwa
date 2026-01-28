// hero metric numbers animated
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".metric-card");

  console.log("[metrics.js] DOM ready, found metric cards:", cards.length);

  if (!cards.length) return;

  const animateValue = (el, target, duration = 1500) => {
    const start = 0;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * (target - start) + start);
      el.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const startAnimationForCard = (card) => {
    const valueEl = card.querySelector(".metric-value");
    if (!valueEl) return;

    if (valueEl.dataset.animated === "true") return;

    const target = parseInt(valueEl.dataset.target, 10);
    if (isNaN(target)) return;

    console.log("[metrics.js] animating card to", target);
    valueEl.dataset.animated = "true";
    animateValue(valueEl, target);
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          startAnimationForCard(entry.target);
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    cards.forEach((card) => observer.observe(card));
  } else {

    cards.forEach(startAnimationForCard);
  }
});
