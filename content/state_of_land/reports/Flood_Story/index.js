
let slideIndex = 0;
let isScrolling = false;
let manualOverride = false; // Flag to prevent scroll from overriding manual changes

// Function to show slides and bring the corresponding story into view
function showSlides(n) {
    let slides = document.querySelectorAll(".mySlides");
    let stories = document.querySelectorAll(".story");
    let captionText = document.getElementById("caption");

    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    slides.forEach((slide, index) => {
        slide.style.display = "none";

        // Remove old masks before adding new ones
        let oldMasks = slide.querySelectorAll(".image-mask");
        oldMasks.forEach(mask => mask.remove());

        if (index === slideIndex) {
            slide.style.display = "block";

            // Create masks for bit-by-bit effect
            for (let i = 0; i < 5; i++) {
                let mask = document.createElement("div");
                mask.className = "image-mask";
                slide.appendChild(mask);
            }

            // Update caption
            captionText.innerText = slide.getAttribute("data-caption");
        }
    });

    // Update story highlight and scroll it into view
    stories.forEach(story => story.classList.remove("highlighted-story"));
    let activeStory = stories[slideIndex];
    if (activeStory) {
        activeStory.classList.add("highlighted-story");
        activeStory.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // Temporarily disable scroll-based updates to prevent conflicts
    manualOverride = true;
    setTimeout(() => {
        manualOverride = false;
    }, 800); // Add timeout 
}

// Function to change slides manually
function plusSlides(n) {
    slideIndex += n;
    showSlides(slideIndex);
}

// Sync slides when scrolling in the stories container
document.querySelector(".stories-container").addEventListener("scroll", function() {
    if (isScrolling || manualOverride) return;
    isScrolling = true;

    setTimeout(() => {
        let stories = document.querySelectorAll(".story");
        let closestStory = null;
        let minDistance = Infinity;
        let updatedSlideIndex = -1;

        stories.forEach((story, index) => {
            let rect = story.getBoundingClientRect();
            let distance = Math.abs(rect.top - window.innerHeight / 4);

            if (distance < minDistance) {
                minDistance = distance;
                closestStory = story;
                updatedSlideIndex = index;
            }
        });

        if (closestStory && updatedSlideIndex !== -1) {
            stories.forEach(story => story.classList.remove("highlighted-story"));
            closestStory.classList.add("highlighted-story");

            if (!manualOverride && updatedSlideIndex !== slideIndex) {
                slideIndex = updatedSlideIndex;
                showSlides(slideIndex);
            }
        }

        isScrolling = false;
    }, 300);
});

// Change slides when a story is clicked
document.querySelectorAll(".story").forEach((story, index) => {
    story.addEventListener("click", () => {
        slideIndex = index;
        showSlides(slideIndex);
    });
});

// Handle thumbnail clicks
document.querySelectorAll(".thumbnail-container img").forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
        slideIndex = index;
        showSlides(slideIndex);
    });
});

// Initialize slides
showSlides(slideIndex);




