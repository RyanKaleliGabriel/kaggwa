// toolkit subpage js// 

document.addEventListener("DOMContentLoaded", () => {
  const navItems = Array.from(document.querySelectorAll(".toolkit-nav-item"));
  const rail = document.querySelector(".toolkit-rail");
  const railThumb = document.querySelector(".toolkit-rail-thumb");

  // Collapsible panels
  const panels = Array.from(document.querySelectorAll(".toolkit-panel"));
  const toggles = Array.from(document.querySelectorAll(".toolkit-panel-toggle"));

  if (!navItems.length) {
    console.warn("[toolkit] No .toolkit-nav-item found");
  }

  // Helpers: accordion open/close
  const getPanelParts = (panel) => {
    const toggle = panel.querySelector(".toolkit-panel-toggle");
    const body = panel.querySelector(".toolkit-panel-body");
    return { toggle, body };
  };

  const setBodyHeight = (body) => {
    body.style.maxHeight = body.scrollHeight + "px";
  };

  const clearBodyHeight = (body) => {
    body.style.maxHeight = "";
  };

  const openPanel = (panel) => {
    const { toggle, body } = getPanelParts(panel);
    if (!toggle || !body) return;

    panel.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    setBodyHeight(body);
  };

  const closePanel = (panel) => {
    const { toggle, body } = getPanelParts(panel);
    if (!toggle || !body) return;
    body.style.maxHeight = body.scrollHeight + "px";
    void body.offsetHeight;
    body.style.maxHeight = "0px";

    panel.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  const togglePanel = (panel) => {
    if (panel.classList.contains("is-open")) closePanel(panel);
    else openPanel(panel);
  };

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.closest(".toolkit-panel");
      if (!panel) return;
      togglePanel(panel);
    });
  });

  const refreshOpenPanels = () => {
    panels.forEach((panel) => {
      if (!panel.classList.contains("is-open")) return;
      const { body } = getPanelParts(panel);
      if (!body) return;
      setBodyHeight(body);
    });
  };

  window.addEventListener("resize", () => {
    requestAnimationFrame(refreshOpenPanels);
  });

  window.addEventListener("load", () => {
    refreshOpenPanels();
  });


  // Scrollspy for toc
  const pairs = navItems
    .map((item) => {
      const hash = item.hash || item.getAttribute("href") || "";
      if (!hash.startsWith("#")) return null;

      const id = hash.slice(1);
      const section = document.getElementById(id);
      return section ? { id, item, section } : null;
    })
    .filter(Boolean);

  if (!pairs.length) {
    console.warn("[toolkit] No matching sections found for nav hrefs");
    return;
  }

  const moveThumbToItem = (item) => {
    if (!rail || !railThumb) return;

    const railRect = rail.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const thumbH = railThumb.offsetHeight || 38;
    const targetY =
      itemRect.top - railRect.top + itemRect.height / 2 - thumbH / 2;

    const maxY = rail.offsetHeight - thumbH;
    const y = Math.max(0, Math.min(targetY, maxY));
    railThumb.style.transform = `translateY(${y}px)`;
  };

  const setActive = (id) => {
    navItems.forEach((i) => i.classList.remove("is-active"));
    const match = pairs.find((p) => p.id === id);
    if (!match) return;

    match.item.classList.add("is-active");
    moveThumbToItem(match.item);
  };

  const computeActive = () => {
    const activationY = 160;
    let current = pairs[0];

    for (const p of pairs) {
      const top = p.section.getBoundingClientRect().top;
      if (top - activationY <= 0) current = p;
    }

    setActive(current.id);
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      computeActive();
      ticking = false;
    });
  };

  computeActive();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", computeActive);
  window.addEventListener("load", computeActive);

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const hash = item.hash || item.getAttribute("href") || "";
      if (!hash.startsWith("#")) return;

      const id = hash.slice(1);
      const section = document.getElementById(id);
      if (!section) return;
      openPanel(section);
      setActive(id);
      requestAnimationFrame(refreshOpenPanels);
    });
  });
});