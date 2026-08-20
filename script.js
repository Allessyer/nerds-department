const header = document.querySelector("[data-header]");
const filters = document.querySelectorAll("[data-filter]");
const taskCards = document.querySelectorAll("[data-category]");
const revealItems = document.querySelectorAll(".reveal");
const playButton = document.querySelector("[data-play]");
const trackTitle = document.querySelector("[data-track-title]");
const trackStatus = document.querySelector("[data-track-status]");
const languageButtons = document.querySelectorAll("[data-lang]");
const translations = window.NERDS_TRANSLATIONS;
const supportedLanguages = Object.keys(translations);
let currentLanguage = "en";

function updateYear() {
  document.querySelectorAll("[data-year]").forEach((year) => {
    year.textContent = new Date().getFullYear();
  });
}

function translated(key) {
  return translations[currentLanguage][key] || translations.en[key] || key;
}

function setLanguage(language, updateUrl = true) {
  currentLanguage = supportedLanguages.includes(language) ? language : "en";
  const copy = translations[currentLanguage];

  document.documentElement.lang = currentLanguage;
  document.title = copy.metaTitle;
  document.querySelector('meta[name="description"]').content = copy.metaDescription;
  document.querySelector('meta[property="og:title"]').content = copy.metaTitle;
  document.querySelector('meta[property="og:description"]').content = copy.ogDescription;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = copy[element.dataset.i18n] || translations.en[element.dataset.i18n];
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    element.innerHTML = copy[element.dataset.i18nHtml] || translations.en[element.dataset.i18nHtml];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", copy[element.dataset.i18nAria] || translations.en[element.dataset.i18nAria]);
  });

  languageButtons.forEach((button) => {
    const active = button.dataset.lang === currentLanguage;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  const playing = playButton.classList.contains("is-playing");
  playButton.setAttribute("aria-label", translated(playing ? "pauseLabel" : "playLabel"));
  trackTitle.textContent = translated(playing ? "trackPlayingTitle" : "trackTitle");
  trackStatus.textContent = translated(playing ? "trackPlayingStatus" : "trackStatus");
  updateYear();

  try {
    localStorage.setItem("nerds-language", currentLanguage);
  } catch {}

  if (updateUrl) {
    const url = new URL(window.location.href);
    if (currentLanguage === "en") {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", currentLanguage);
    }
    history.replaceState({}, "", url);
  }
}

const queryLanguage = new URLSearchParams(window.location.search).get("lang");
let savedLanguage;
try {
  savedLanguage = localStorage.getItem("nerds-language");
} catch {}
setLanguage(queryLanguage || savedLanguage || "en", false);

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

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
  playButton.setAttribute("aria-label", translated(playing ? "pauseLabel" : "playLabel"));
  trackTitle.textContent = translated(playing ? "trackPlayingTitle" : "trackTitle");
  trackStatus.textContent = translated(playing ? "trackPlayingStatus" : "trackStatus");
});
