const header = document.querySelector("[data-header]");
const filters = document.querySelectorAll("[data-filter]");
const taskCards = document.querySelectorAll("[data-category]");
const revealItems = document.querySelectorAll(".reveal");
const playButton = document.querySelector("[data-play]");
const trackTitle = document.querySelector("[data-track-title]");
const trackStatus = document.querySelector("[data-track-status]");

document.querySelector("[data-year]").textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });

    taskCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.classList.toggle("is-hidden", selected !== "all" && !categories.includes(selected));
    });
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

playButton.addEventListener("click", () => {
  const playing = playButton.classList.toggle("is-playing");
  playButton.setAttribute("aria-label", playing ? "Pause the Nerds Department idea" : "Play the Nerds Department idea");
  trackTitle.textContent = playing ? "Curiosity is now playing" : "From curiosity to contribution";
  trackStatus.textContent = playing ? "Now build something that matters" : "The story is already in motion";
});
