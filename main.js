/*
  Runs the Veni Vidi intro, renders the gallery grid from ARTWORKS (defined in
  art.js) and handles the era menu + search filtering. The pop-up lives in modal.js.
  You shouldn't need to edit this file to add new art — just edit art.js.
*/

const FEATURED = PIECES.find((art) => art.featured) || PIECES[0];
const MENU = (typeof ERA_MENU !== "undefined" ? ERA_MENU : []).concat([{ label: "All", tags: null }]);

const intro = document.getElementById("intro");
const introImage = document.getElementById("intro-image");
const introFeatured = document.getElementById("intro-featured");
const introFeaturedTitle = document.getElementById("intro-featured-title");
const introEnter = document.getElementById("intro-enter");
const introReplay = document.getElementById("intro-replay");
const eraNav = document.getElementById("era-nav");

const grid = document.getElementById("gallery-grid");
const noResults = document.getElementById("no-results");
const searchInput = document.getElementById("search-input");

let searchTerm = "";
let activeEra = "All";

/* ---------- Intro ---------- */

const INTRO_STEPS = [
  ["is-panel", 300],  // panel wipes in
  ["is-word", 1500],  // wordmark rises
  ["is-art", 2500],   // featured piece slides in behind
];
const INTRO_SEEN_KEY = "jistIntroSeen";
let introTimers = [];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function introAlreadySeen() {
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch (e) {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch (e) {
    // Storage blocked (private mode etc.) — the intro will just play again next time.
  }
}

function clearIntroTimers() {
  introTimers.forEach((t) => clearTimeout(t));
  introTimers = [];
}

function isSettled() {
  return intro.classList.contains("is-settled");
}

function playIntro() {
  clearIntroTimers();
  // Reset to the blank wall instantly, then animate forward.
  intro.classList.add("no-anim");
  intro.classList.remove("is-panel", "is-word", "is-art", "is-settled");
  document.body.classList.add("intro-active");
  window.scrollTo(0, 0);
  void intro.offsetWidth; // force the reset to apply before re-enabling transitions
  intro.classList.remove("no-anim");

  INTRO_STEPS.forEach(([cls, ms]) => {
    introTimers.push(setTimeout(() => intro.classList.add(cls), ms));
  });
}

function settleIntro({ animate = true } = {}) {
  if (isSettled()) return;
  clearIntroTimers();
  if (!animate) intro.classList.add("no-anim");
  intro.classList.add("is-panel", "is-word", "is-art", "is-settled");
  document.body.classList.remove("intro-active");
  markIntroSeen();
  if (!animate) {
    void intro.offsetWidth;
    intro.classList.remove("no-anim");
  }
}

function setupIntro() {
  if (!FEATURED) return;
  // Stop the browser from jumping back down the page on reload while the intro plays.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  introImage.src = FEATURED.image;
  introImage.alt = FEATURED.title;
  introFeaturedTitle.textContent =
    `${FEATURED.title} — ${FEATURED.artist}${FEATURED.year ? ", " + FEATURED.year : ""}`;

  if (prefersReducedMotion() || introAlreadySeen()) {
    settleIntro({ animate: false });
  } else {
    playIntro();
  }

  introEnter.addEventListener("click", () => settleIntro());
  introReplay.addEventListener("click", playIntro);
  introFeatured.addEventListener("click", () => {
    const list = getVisibleList().includes(FEATURED) ? getVisibleList() : PIECES;
    Modal.open(list, list.indexOf(FEATURED));
  });

  // While the intro is up, the first scroll / swipe / scroll key settles it.
  const settleOnScroll = () => {
    if (!isSettled() && !Modal.isOpen()) settleIntro();
  };
  window.addEventListener("wheel", settleOnScroll, { passive: true });
  window.addEventListener("touchmove", settleOnScroll, { passive: true });
  document.addEventListener("keydown", (e) => {
    if (isSettled() || Modal.isOpen()) return;
    if (["ArrowDown", "PageDown", " ", "End"].includes(e.key)) {
      e.preventDefault();
      settleIntro();
    }
  });
}

/* ---------- Era menu ---------- */

function renderEraNav() {
  eraNav.innerHTML = "";
  MENU.forEach((item) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = item.label;
    btn.setAttribute("aria-pressed", String(item.label === activeEra));
    btn.addEventListener("click", () => {
      activeEra = item.label;
      renderEraNav();
      renderGrid();
    });
    eraNav.appendChild(btn);
  });
}

function matchesEra(art) {
  const item = MENU.find((m) => m.label === activeEra);
  if (!item || !item.tags) return true;
  return (art.tags || []).some((tag) => item.tags.includes(tag));
}

/* ---------- Grid ---------- */

function getVisibleList() {
  let list = PIECES.filter(matchesEra);

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    list = list.filter(
      (art) =>
        art.title.toLowerCase().includes(term) ||
        art.artist.toLowerCase().includes(term)
    );
  }

  return list;
}

function renderGrid() {
  const list = getVisibleList();

  grid.innerHTML = "";
  noResults.hidden = list.length > 0;

  list.forEach((art) => {
    const isFeatured = art === FEATURED;
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "art-tile" + (isFeatured ? " is-featured is-big" : "");
    tile.setAttribute("aria-label", `View ${art.title} by ${art.artist}`);

    const badge = isFeatured
      ? "Featured" + (art.depicted ? " · " + art.depicted : "")
      : art.depicted || "";

    tile.innerHTML = `
      <img src="${art.image}" alt="" loading="lazy">
      <span class="art-tile-title">${art.title}</span>
      ${badge ? `<span class="art-tile-badge">${badge}</span>` : ""}
    `;

    const img = tile.querySelector("img");
    img.addEventListener("load", () => img.classList.add("loaded"));
    // In case the image is already cached and "load" won't fire again
    if (img.complete) img.classList.add("loaded");

    tile.addEventListener("click", () => Modal.open(list, list.indexOf(art)));
    grid.appendChild(tile);
  });
}

searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value.trim();
  renderGrid();
});

/* ---------- Era links (footer, or arriving from the timeline page) ---------- */

function showEra(label) {
  if (!MENU.some((m) => m.label === label)) return;
  activeEra = label;
  renderEraNav();
  renderGrid();
}

function scrollToGallery() {
  const behavior = prefersReducedMotion() ? "auto" : "smooth";
  document.querySelector(".controls").scrollIntoView({ behavior, block: "start" });
}

// Footer era links filter in place instead of reloading the page
document.getElementById("site-footer").addEventListener("click", (e) => {
  const link = e.target.closest("a[data-era]");
  if (!link) return;
  e.preventDefault();
  showEra(link.dataset.era);
  history.replaceState(null, "", "?era=" + encodeURIComponent(link.dataset.era));
  scrollToGallery();
});

const eraFromUrl = new URLSearchParams(location.search).get("era");

renderEraNav();
renderGrid();
setupIntro();

// index.html?era=Napoleonic → skip the intro and show that era's pieces
if (eraFromUrl && MENU.some((m) => m.label === eraFromUrl)) {
  settleIntro({ animate: false });
  showEra(eraFromUrl);
  scrollToGallery();
}
