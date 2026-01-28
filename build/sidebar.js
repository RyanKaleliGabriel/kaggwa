// build sidebar - tutorials section collapsed by default
window.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector("#quarto-sidebar");
  if (!sidebar) return;

  const sections = sidebar.querySelectorAll(".sidebar-item.sidebar-item-section");

  sections.forEach((section, index) => {
    if (index === 0) return;

    const toggle = section.querySelector(".sidebar-item-toggle");
    if (!toggle) return;

    const targetSelector = toggle.getAttribute("data-bs-target");
    const target = targetSelector ? document.querySelector(targetSelector) : null;
    const expanded = toggle.getAttribute("aria-expanded");
    const isOpen =
      (target && target.classList.contains("show")) ||
      expanded === "true" ||
      expanded === null;

    if (isOpen) {
      toggle.click();
    }
  });
});
