const ageGate = document.getElementById("ageGate");
const confirmAge = document.getElementById("confirmAge");
const denyAge = document.getElementById("denyAge");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const filterButtons = document.querySelectorAll(".chip");
const productCards = document.querySelectorAll("#catalogGrid .product-card");
const citiesToggle = document.getElementById("cities-toggle");
const footerCities = document.getElementById("portugal-cities");
const footerYear = document.getElementById("footer-year");

const AGE_KEY = "vapeporto_age_verified";
let activeFilter = "VapSolo";

function getAgeGateAccepted() {
  try {
    return window.localStorage.getItem(AGE_KEY) === "true";
  } catch (error) {
    return false;
  }
}

function setAgeGateAccepted() {
  try {
    window.localStorage.setItem(AGE_KEY, "true");
  } catch (error) {
    // Ignore storage failures and keep the gate open for this visit.
  }
}

function showAgeGate() {
  if (!ageGate) {
    return;
  }

  ageGate.classList.add("is-visible");
  ageGate.setAttribute("aria-hidden", "false");
  document.documentElement.classList.add("age-gate-pending");
  document.body.classList.add("age-gate-open");
}

function hideAgeGate() {
  if (!ageGate) {
    return;
  }

  ageGate.classList.remove("is-visible");
  ageGate.setAttribute("aria-hidden", "true");
  document.documentElement.classList.remove("age-gate-pending");
  document.body.classList.remove("age-gate-open");
}

if (ageGate) {
  if (getAgeGateAccepted()) {
    hideAgeGate();
  } else {
    showAgeGate();
  }
}

confirmAge?.addEventListener("click", () => {
  setAgeGateAccepted();
  hideAgeGate();
});

denyAge?.addEventListener("click", () => {
  window.location.href = "https://www.google.com/";
});

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

function updateCatalogVisibility() {
  productCards.forEach((card) => {
    const matchesFilter = !activeFilter || card.dataset.brand === activeFilter;
    const shouldShow = matchesFilter;
    card.style.display = shouldShow ? "" : "none";
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextFilter = button.dataset.filter;
    activeFilter = activeFilter === nextFilter ? "" : nextFilter;

    filterButtons.forEach((chip) => chip.classList.remove("is-active"));
    if (activeFilter) {
      button.classList.add("is-active");
    }
    updateCatalogVisibility();
  });
});

updateCatalogVisibility();

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

citiesToggle?.addEventListener("click", () => {
  const isExpanded = citiesToggle.getAttribute("aria-expanded") === "true";
  citiesToggle.setAttribute("aria-expanded", String(!isExpanded));

  if (footerCities) {
    footerCities.hidden = isExpanded;
  }
});
