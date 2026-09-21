/*
  Renders the gallery grid from ARTWORKS (defined in art.js),
  handles search filtering, and the modal (with prev/next).
  You shouldn't need to edit this file to add new art — just edit art.js.
*/

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
let currentList = ARTWORKS.slice(); // the list currently on screen, for modal prev/next
let currentIndex = -1;

function getVisibleList() {
  let list = ARTWORKS.slice();

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
    const card = document.createElement("button");
    card.className = "art-card";
    card.setAttribute("aria-label", `View ${art.title} by ${art.artist}`);

    card.innerHTML = `
      <div class="art-card-image-wrap">
        <img src="${art.image}" alt="${art.title}" loading="lazy">
      </div>
      <h3 class="art-card-title">${art.title}</h3>
      <p class="art-card-meta">${art.artist}${art.year ? " · " + art.year : ""}</p>
    `;

    const img = card.querySelector("img");
    img.addEventListener("load", () => img.classList.add("loaded"));
    // In case the image is already cached and "load" won't fire again
    if (img.complete) img.classList.add("loaded");

    card.addEventListener("click", () => {
      currentIndex = list.indexOf(art);
      openModal(art);
    });
    grid.appendChild(card);
  });
}

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

renderGrid();
