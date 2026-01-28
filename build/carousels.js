document.addEventListener("DOMContentLoaded", function () {

  const POLL_MAX_ATTEMPTS = 25;
  const POLL_DELAY_MS     = 200;

  function pollUntil(conditionFn, onReady, maxAttempts = POLL_MAX_ATTEMPTS, delayMs = POLL_DELAY_MS, attempt = 0) {
    const result = conditionFn();
    if (result) {
      onReady(result);
      return;
    }
    if (attempt < maxAttempts) {
      setTimeout(
        () => pollUntil(conditionFn, onReady, maxAttempts, delayMs, attempt + 1),
        delayMs
      );
    }
  }

  // Main carousel initializer
  function initCarousel(root, {
    trackSelector,
    cardSelector,
    dotsElement,
    visible = 3,
    autoMs = 8000
  }) {
    if (!root) return;

    const track = root.querySelector(trackSelector);
    if (!track) return;

    const cards = Array.from(track.querySelectorAll(cardSelector));
    if (!cards.length) return;

    const prev = root.querySelector(".carousel-arrow.left");
    const next = root.querySelector(".carousel-arrow.right");
    const dotsBox = dotsElement || root.parentElement.querySelector(".carousel-dots");

    if (!prev || !next || !dotsBox) return;

    const total = cards.length;
    if (total <= visible) return;

    const maxIndex = total - visible;

    let stepPx  = 0;
    let current = 0;

    function computeStep() {
      if (cards.length > 1) {
        const r0 = cards[0].getBoundingClientRect();
        const r1 = cards[1].getBoundingClientRect();
        const delta = r1.left - r0.left;
        stepPx = delta !== 0 ? delta : cards[0].getBoundingClientRect().width;
      } else {
        stepPx = cards[0].getBoundingClientRect().width;
      }
      track.style.transform = `translateX(-${current * stepPx}px)`;
    }

    computeStep();
    window.addEventListener("resize", computeStep);

    // Dots
    dotsBox.innerHTML = "";
    const dots = [];
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement("span");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dot.dataset.index = i;
      dotsBox.appendChild(dot);
      dots.push(dot);
    }

    function updateDots() {
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === current);
      });
    }

    function goTo(index) {
      if (index < 0)        index = maxIndex;
      if (index > maxIndex) index = 0;
      current = index;

      const offset = current * stepPx;
      track.style.transform = `translateX(-${offset}px)`;
      updateDots();
    }

    prev.addEventListener("click", () => goTo(current - 1));
    next.addEventListener("click", () => goTo(current + 1));

    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        goTo(parseInt(dot.dataset.index, 10));
      });
    });

    setInterval(() => {
      goTo(current + 1);
    }, autoMs);

    goTo(0);
  }

  // Guidance & resources carousel 
  const guidesCarousel = document.getElementById("guides-carousel");

  if (guidesCarousel) {
    initCarousel(guidesCarousel, {
      trackSelector: ".carousel-track",
      cardSelector: ".resource-card-rotating",
      dotsElement: document.getElementById("guides-dots"),
      visible: 3,
      autoMs: 8000
    });
  }

  // Restoration stories carousel 
  const storiesCarousel = document.querySelector(".resource-carousel.stories-carousel");

  if (storiesCarousel) {
    pollUntil(
      () => {
        const listingContainer = document.querySelector("#listing-latest-content");
        if (!listingContainer) return null;

        const grid = listingContainer.querySelector(".list.grid");
        if (!grid || !grid.children.length) return null;

        return { listingContainer, grid };
      },
      ({ listingContainer, grid }) => {
        const track = storiesCarousel.querySelector(".carousel-track");
        if (!track) return;

        const cards = Array.from(grid.querySelectorAll(".g-col-1"));
        if (!cards.length) return;

        cards.forEach(card => {
          card.classList.add("resource-card-rotating");
          track.appendChild(card);
        });

        listingContainer.style.display = "none";

        initCarousel(storiesCarousel, {
          trackSelector: ".carousel-track",
          cardSelector: ".resource-card-rotating",
          dotsElement:
            storiesCarousel.parentElement.querySelector(".stories-dots") ||
            storiesCarousel.parentElement.querySelector(".carousel-dots"),
          visible: 3,
          autoMs: 8000
        });
      }
    );
  }

  // Workshops & events carousel (Quarto listing)
  pollUntil(
    () => {
      const eventsRoot = document.querySelector(".events-carousel");
      if (!eventsRoot) return null;

      const listingContainer = document.querySelector("#listing-workshops-events");
      if (!listingContainer) return null;

      const list = listingContainer.querySelector(".list");
      if (!list || !list.children.length) return null;

      return { eventsRoot, listingContainer, list };
    },
    ({ eventsRoot, listingContainer, list }) => {
      const toolbar    = listingContainer.querySelector(".quarto-listing-header");
      const pagination = listingContainer.querySelector(".quarto-listing-pagination");
      if (toolbar)    toolbar.style.display    = "none";
      if (pagination) pagination.style.display = "none";

      initCarousel(eventsRoot, {
        trackSelector: ".list",
        cardSelector: ".quarto-post",
        dotsElement: eventsRoot.parentElement.querySelector(".events-dots"),
        visible: 1, // one card per slide
        autoMs: 8000
      });
    }
  );

});
