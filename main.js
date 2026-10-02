/*
  Runs the JIST intro, renders the gallery grid from ARTWORKS (defined in
  art.js), handles the era menu + search filtering, and the modal (with prev/next).
  You shouldn't need to edit this file to add new art — just edit art.js.
*/

// Skip half-filled template entries (no title or image yet) so they don't show as broken tiles.
const PIECES = ARTWORKS.filter(
  (art) => art.title && art.title.trim() && art.image && !art.image.endsWith("/.jpg")
);
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

const overlay = document.getElementById("modal-overlay");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalMeta = document.getElementById("modal-meta");
const modalDescription = document.getElementById("modal-description");
const modalClose = document.getElementById("modal-close");
const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");

let searchTerm = "";
let activeEra = "All";
let currentList = PIECES.slice(); // the list currently on screen, for modal prev/next
let currentIndex = -1;

/* ---------- Intro ---------- */

const INTRO_STEPS = [
  ["is-panel", 300],  // panel wipes in
  ["is-word", 1500],  // JIST rises
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
    currentList = getVisibleList();
    currentIndex = currentList.indexOf(FEATURED);
    if (currentIndex === -1) {
      currentList = PIECES.slice();
      currentIndex = currentList.indexOf(FEATURED);
    }
    openModal(FEATURED);
  });

  // While the intro is up, the first scroll / swipe / scroll key settles it.
  const settleOnScroll = () => {
    if (!isSettled() && overlay.hidden) settleIntro();
  };
  window.addEventListener("wheel", settleOnScroll, { passive: true });
  window.addEventListener("touchmove", settleOnScroll, { passive: true });
  document.addEventListener("keydown", (e) => {
    if (isSettled() || !overlay.hidden) return;
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
  currentList = list;

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

    tile.addEventListener("click", () => {
      currentIndex = list.indexOf(art);
      openModal(art);
    });
    grid.appendChild(tile);
  });
}

/* ---------- Modal ---------- */

function openModal(art) {
  modalImage.src = art.image;
  modalImage.alt = art.title;
  modalTitle.textContent = art.title;
  modalMeta.textContent = `${art.artist}${art.year ? " · " + art.year : ""}${art.medium ? " · " + art.medium : ""}`;

  modalDescription.innerHTML = art.description
    .split("\n\n")
    .map((para) => `<p>${para}</p>`)
    .join("");

  overlay.hidden = false;
  document.body.style.overflow = "hidden";
  updateNavButtons();
}

function updateNavButtons() {
  modalPrev.style.visibility = currentList.length > 1 ? "visible" : "hidden";
  modalNext.style.visibility = currentList.length > 1 ? "visible" : "hidden";
}

function showByOffset(offset) {
  if (currentList.length === 0) return;
  currentIndex = (currentIndex + offset + currentList.length) % currentList.length;
  openModal(currentList[currentIndex]);
}

function closeModal() {
  overlay.hidden = true;
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalPrev.addEventListener("click", () => showByOffset(-1));
modalNext.addEventListener("click", () => showByOffset(1));

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (overlay.hidden) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") showByOffset(-1);
  if (e.key === "ArrowRight") showByOffset(1);
});

searchInput.addEventListener("input", (e) => {
  searchTerm = e.target.value.trim();
  renderGrid();
});

renderEraNav();
renderGrid();
setupIntro();
