document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname || "";
  const isFrench = /(^|\/)fr(\/|$)/.test(path);
  if (!isFrench) return;

  // Make sure bootstrap icons show on french navbar
  const id = "bootstrap-icons-css";
  if (!document.getElementById(id)) {
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css";
    document.head.appendChild(link);
  }

  function findNavLink(hrefPart) {
    return document.querySelector(`nav.navbar a[href*="${hrefPart}"], #quarto-header nav a[href*="${hrefPart}"]`);
  }

  function setNavLabelPreserveIcon(a, newLabel) {
    if (!a) return;
    const icon = a.querySelector("i");
    if (icon) {
      a.innerHTML = icon.outerHTML + " " + newLabel;
    } else {
      a.textContent = newLabel;
    }
  }

  const solDropdownToggle =
    document.querySelector('nav.navbar .dropdown-toggle, #quarto-header nav .dropdown-toggle');

  if (solDropdownToggle && solDropdownToggle.textContent.includes("State of the Land")) {
  setNavLabelPreserveIcon(solDropdownToggle, "État des terres");
  }

  const storiesLink = findNavLink("content/restoration-stories/restoration_stories");
  if (storiesLink) {
    storiesLink.href = "/fr/content/restoration-stories/restoration_stories.html";
    setNavLabelPreserveIcon(storiesLink, "Récits de restauration");
  }

  const solLink = findNavLink("content/state_of_land/state_of_land");
  if (solLink) {
    solLink.href = "/fr/content/state_of_land/state_of_land.html";
    setNavLabelPreserveIcon(solLink, "État des terres");
  }

  const eventsLink = findNavLink("content/events-workshops/events_workshops");
  if (eventsLink) {
    eventsLink.href = "/fr/content/events-workshops/events_workshops.html";
    setNavLabelPreserveIcon(eventsLink, "Ateliers et événements");
  }

  const aboutLink = findNavLink("content/about_ggw/about_ggw");
  if (aboutLink) {
    aboutLink.href = "/fr/content/about_ggw/about_ggw.html";
    setNavLabelPreserveIcon(aboutLink, "À propos de K4GGWA");
  }

  const enToggle = document.querySelector('nav.navbar a[href="/index.html"], #quarto-header nav a[href="/index.html"]');
  const frToggle = document.querySelector('nav.navbar a[href="/fr/index.html"], #quarto-header nav a[href="/fr/index.html"]');
  if (enToggle) enToggle.classList.remove("active");
  if (frToggle) frToggle.classList.add("active");
});
