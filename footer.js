/*
  Builds the site footer (shared by the gallery and timeline pages) inside
  <footer id="site-footer">. Era links come from ERA_MENU in art.js, so they
  stay in sync with the gallery menu. To change the wording, edit FOOTER below.
*/

const FOOTER = {
  statement: "Pieces I love, with my own thoughts on each piece.",
  updated: "Updated Weekly",

  // Recommendation form. Submissions go through Formspree (formspree.io) and
  // arrive in your inbox. Paste your form's ID here: the part after /f/ in
  // the endpoint, e.g. "https://formspree.io/f/xyzabcd" → "xyzabcd".
  formspreeId: "mrpegwgv",
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
    <section class="footer-recommend" aria-labelledby="recommend-heading">
      <div class="recommend-intro">
        <h2 id="recommend-heading">Recommend a piece</h2>
        <p>Know a painting that belongs here? Send it my way. If it makes the collection, it’ll be featured with a credit to you.</p>
      </div>
      <form id="recommend-form" class="recommend-form" novalidate>
        <label class="rf-field">
          <span>Title of the piece *</span>
          <input type="text" name="title" required autocomplete="off">
        </label>
        <label class="rf-field">
          <span>Artist</span>
          <input type="text" name="artist" autocomplete="off">
        </label>
        <label class="rf-field rf-wide">
          <span>Link to an image of it</span>
          <input type="url" name="link" placeholder="https://" autocomplete="off">
        </label>
        <label class="rf-field rf-wide">
          <span>Why it belongs here *</span>
          <textarea name="why" rows="3" required></textarea>
        </label>
        <label class="rf-field">
          <span>Your name (for the credit)</span>
          <input type="text" name="name" autocomplete="name">
        </label>
        <label class="rf-field">
          <span>Your email (optional, if you’d like a reply)</span>
          <input type="email" name="email" autocomplete="email">
        </label>
        <!-- Spam trap: people never see or fill this; bots often do -->
        <input type="text" name="_gotcha" class="rf-trap" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div class="rf-actions rf-wide">
          <button type="submit">Send recommendation</button>
          <p class="rf-status" role="status" aria-live="polite"></p>
        </div>
      </form>
    </section>
    <div class="footer-word vv-mark" aria-hidden="true"><span class="vv-rule"></span><span class="vv-line"><span>VENI</span><svg class="vv-chev" viewBox="0 0 120 116" aria-hidden="true"><polygon points="0,0 60,70 120,0 109.5,0 66.6,50 23.7,0"></polygon><polygon points="0,46 60,116 120,46 109.5,46 66.6,96 23.7,46"></polygon></svg><span>VIDI</span></span><span class="vv-rule"></span></div>
    <div class="footer-bottom">
      <span>© ${year} Veni Vidi</span>
      <span>Images belong to their respective artists and collections</span>
      <a href="#top" class="footer-top-link">Back to top ↑</a>
    </div>
  `;

  setupRecommendForm(footer.querySelector("#recommend-form"));

  footer.querySelector(".footer-top-link").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });
})();

function setupRecommendForm(form) {
  const status = form.querySelector(".rf-status");
  const button = form.querySelector("button[type=submit]");

  function say(message, kind) {
    status.textContent = message;
    status.dataset.kind = kind || "";
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const missing = [...form.querySelectorAll("[required]")].find((f) => !f.value.trim());
    if (missing) {
      say("Please fill in the title and why it belongs here.", "error");
      missing.focus();
      return;
    }
    const badField = [...form.elements].find((f) => f.value && f.validity && !f.validity.valid);
    if (badField) {
      say(badField.type === "email" ? "That email address doesn’t look right." : "That link doesn’t look right. It should start with https://", "error");
      badField.focus();
      return;
    }

    if (!FOOTER.formspreeId) {
      say("Recommendations aren’t connected yet. Check back soon!", "error");
      return;
    }

    button.disabled = true;
    say("Sending…");
    try {
      const response = await fetch(`https://formspree.io/f/${FOOTER.formspreeId}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        form.reset();
        say("Thanks! I read every recommendation.", "ok");
        return;
      }
      // Formspree explains rejections (e.g. a field it couldn't accept) as JSON
      const data = await response.json().catch(() => ({}));
      const reason = (data.errors || []).map((err) => err.message).join(" ");
      say(reason || "Something went wrong sending that. Please try again in a moment.", "error");
    } catch (err) {
      say("Couldn’t reach the server. Check your connection and try again.", "error");
    } finally {
      button.disabled = false;
    }
  });
}
