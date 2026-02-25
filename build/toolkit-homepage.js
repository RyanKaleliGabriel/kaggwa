// small animator script for the toolkit band on homepage
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("guidance-band");
  if (!el) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      });
    },
    { threshold: 0.35 }
  );

  obs.observe(el);
});