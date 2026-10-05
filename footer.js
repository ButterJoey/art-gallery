/*
  Builds the site footer (shared by the gallery and timeline pages) inside
  <footer id="site-footer">. Era links come from ERA_MENU in art.js, so they
  stay in sync with the gallery menu. To change the wording, edit FOOTER below.
*/

const FOOTER = {
  statement: "Pieces I love, with my own thoughts on each piece.",
  updated: "Updated Weekly",
};

(() => {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  const count = PIECES.length;
  const eras = typeof ERA_MENU !== "undefined" ? ERA_MENU : [];
  const year = new Date().getFullYear();

  const eraLinks = eras
    .map((era) => `<li><a href="index.html?era=${encodeURIComponent(era.label)}" data-era="${era.label}">${era.label}</a></li>`)
    .join("");

  footer.innerHTML = `
    <div class="footer-top">
      <div class="footer-statement">
        <p class="footer-lede">${FOOTER.statement}</p>
        <p class="footer-count">${count} piece${count === 1 ? "" : "s"} in the collection · ${FOOTER.updated}</p>
      </div>
      <nav class="footer-col" aria-label="Footer">
        <h2>Explore</h2>
        <ul>
          <li><a href="index.html">Gallery</a></li>
          <li><a href="timeline.html">Timeline</a></li>
        </ul>
      </nav>
      <nav class="footer-col" aria-label="Eras">
        <h2>Eras</h2>
        <ul>${eraLinks}</ul>
      </nav>
    </div>
    <div class="footer-word vv-mark" aria-hidden="true"><span class="vv-rule"></span><span class="vv-line"><span>VENI</span><svg class="vv-chev" viewBox="0 0 120 116" aria-hidden="true"><polygon points="0,0 60,70 120,0 109.5,0 66.6,50 23.7,0"></polygon><polygon points="0,46 60,116 120,46 109.5,46 66.6,96 23.7,46"></polygon></svg><span>VIDI</span></span><span class="vv-rule"></span></div>
    <div class="footer-bottom">
      <span>© ${year} Veni Vidi</span>
      <span>Images belong to their respective artists and collections</span>
      <a href="#top" class="footer-top-link">Back to top ↑</a>
    </div>
  `;

  footer.querySelector(".footer-top-link").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });
})();
