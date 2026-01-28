document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname || "";
  const isFrench = path.startsWith("/fr/");

  if (!isFrench) return;

  function findNavLink(hrefPart) {
    return document.querySelector(`.navbar a[href*="${hrefPart}"]`);
  }

  const solDropdownToggle = document.querySelector('.navbar .dropdown-toggle');
  if (solDropdownToggle && solDropdownToggle.textContent.trim() === "State of the Land") {
    solDropdownToggle.textContent = "État des terres";
  }

  const storiesLink = findNavLink("content/restoration-stories/restoration_stories");
  if (storiesLink) {
    storiesLink.href = "/fr/content/restoration-stories/restoration_stories.html";
    storiesLink.textContent = "Récits de restauration";
  }

  const solLink = findNavLink("content/state_of_land/state_of_land");
  if (solLink) {
    solLink.href = "/fr/content/state_of_land/state_of_land.html";
    solLink.textContent = "État des terres";
  }

  const eventsLink = findNavLink("content/events-workshops/events_workshops");
  if (eventsLink) {
    eventsLink.href = "/fr/content/events-workshops/events_workshops.html";
    eventsLink.textContent = "Ateliers et événements";
  }

  const aboutLink = findNavLink("content/about_ggw/about_ggw");
  if (aboutLink) {
    aboutLink.href = "/fr/content/about_ggw/about_ggw.html";
    aboutLink.textContent = "À propos de K4GGWA";
  }

  const enToggle = document.querySelector('.navbar a[href="/index.html"]');
  const frToggle = document.querySelector('.navbar a[href="/fr/index.html"]');
  if (enToggle) enToggle.classList.remove("active");
  if (frToggle) frToggle.classList.add("active");
});
