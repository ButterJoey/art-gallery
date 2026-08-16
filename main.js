/*
  Renders the gallery grid from ARTWORKS (defined in art.js)
  and handles opening/closing the modal.
  You shouldn't need to edit this file to add new art —
  just edit art.js.
*/

const grid = document.getElementById("gallery-grid");
const overlay = document.getElementById("modal-overlay");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalMeta = document.getElementById("modal-meta");
const modalDescription = document.getElementById("modal-description");
const modalClose = document.getElementById("modal-close");

function renderGrid() {
  grid.innerHTML = "";

  ARTWORKS.forEach((art) => {
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

    card.addEventListener("click", () => openModal(art));
    grid.appendChild(card);
  });
}

function openModal(art) {
  modalImage.src = art.image;
  modalImage.alt = art.title;
  modalTitle.textContent = art.title;
  modalMeta.textContent = `${art.artist}${art.year ? " · " + art.year : ""}`;

  modalDescription.innerHTML = art.description
    .split("\n\n")
    .map((para) => `<p>${para}</p>`)
    .join("");

  overlay.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  overlay.hidden = true;
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !overlay.hidden) closeModal();
});

renderGrid();
