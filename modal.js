/*
  The artwork pop-up (modal) with prev/next, shared by the gallery and
  timeline pages. Each page calls:
    Modal.open(list, index)   — show list[index]; prev/next move through list
    Modal.isOpen()
  Needs the #modal-overlay markup from index.html / timeline.html.
*/

// Skip half-filled template entries (no title or image yet) so they don't show up broken.
const PIECES = ARTWORKS.filter(
  (art) => art.title && art.title.trim() && art.image && !art.image.endsWith("/.jpg")
);

const Modal = (() => {
  const overlay = document.getElementById("modal-overlay");
  const image = document.getElementById("modal-image");
  const title = document.getElementById("modal-title");
  const meta = document.getElementById("modal-meta");
  const description = document.getElementById("modal-description");
  const closeBtn = document.getElementById("modal-close");
  const prevBtn = document.getElementById("modal-prev");
  const nextBtn = document.getElementById("modal-next");

  let list = [];
  let index = -1;

  function show(art) {
    image.src = art.image;
    image.alt = art.title;
    title.textContent = art.title;
    meta.textContent = `${art.artist}${art.year ? " · " + art.year : ""}${art.medium ? " · " + art.medium : ""}`;

    description.innerHTML = art.description
      .split("\n\n")
      .map((para) => `<p>${para}</p>`)
      .join("");

    const multiple = list.length > 1 ? "visible" : "hidden";
    prevBtn.style.visibility = multiple;
    nextBtn.style.visibility = multiple;
  }

  function open(newList, newIndex) {
    list = newList;
    index = newIndex;
    show(list[index]);
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function showByOffset(offset) {
    if (list.length === 0) return;
    index = (index + offset + list.length) % list.length;
    show(list[index]);
  }

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => showByOffset(-1));
  nextBtn.addEventListener("click", () => showByOffset(1));

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (overlay.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") showByOffset(-1);
    if (e.key === "ArrowRight") showByOffset(1);
  });

  return { open, close, isOpen: () => !overlay.hidden };
})();
