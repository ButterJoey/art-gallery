/*
  Builds the timeline page: every piece placed at the year it DEPICTS,
  grouped into eras, with a bar showing how long after (or before) the
  event the piece was made. All data comes from art.js — pieces without
  a "depicted" year are listed at the end under "Date unknown".
*/

const ERAS = [
  { id: "c21", name: "21st century", from: 2001, to: Infinity },
  { id: "c20", name: "20th century", from: 1901, to: 2000 },
  { id: "c19", name: "19th century", from: 1801, to: 1900 },
  { id: "c18", name: "18th century", from: 1701, to: 1800 },
  { id: "early-modern", name: "Early modern", from: 1501, to: 1700 },
  { id: "medieval", name: "Medieval", from: 501, to: 1500 },
  { id: "antiquity", name: "Antiquity", from: -Infinity, to: 500 },
];
const UNDATED = { id: "undated", name: "Date unknown" };
const GAP_BAR_MAX_YEARS = 300; // bars stop growing past this many years

const rail = document.getElementById("tl-rail");
const sections = document.getElementById("tl-sections");
const summary = document.getElementById("tl-summary");
const orderNewest = document.getElementById("order-newest");
const orderOldest = document.getElementById("order-oldest");

let newestFirst = true;

// "1815" → 1815, "325 BC" → -325, "Between 1825 and 1827" → 1826, "c. 1889" → 1889,
// "May 29, 1453" → 1453 (day numbers are ignored when a 3–4 digit year is present)
function parseYear(value) {
  if (!value) return null;
  const str = String(value);
  let nums = (str.match(/\d+/g) || []).map(Number);
  if (nums.length === 0) return null;
  const years = nums.filter((n) => n >= 100);
  if (years.length) nums = years;
  const year = nums.reduce((a, b) => a + b, 0) / nums.length;
  return Math.round(/\bBC\b|\bBCE\b/i.test(str) ? -year : year);
}

function formatYear(n) {
  return n < 0 ? `${-n} BC` : String(n);
}

function gapLabel(art) {
  if (art.eventYear === null || art.madeYear === null) return "";
  const gap = art.madeYear - art.eventYear;
  if (gap === 0) return "Made the same year";
  const years = Math.abs(gap).toLocaleString("en-US") + (Math.abs(gap) === 1 ? " yr" : " yrs");
  return gap > 0 ? `Made ${years} later` : `Made ${years} before`;
}

const DATED = PIECES.map((art) => ({
  art,
  eventYear: parseYear(art.depicted),
  madeYear: parseYear(art.year),
}));

function eraFor(item) {
  if (item.eventYear === null) return UNDATED;
  return ERAS.find((era) => item.eventYear >= era.from && item.eventYear <= era.to);
}

function sortedItems() {
  const dated = DATED.filter((item) => item.eventYear !== null);
  // Stable sort keeps art.js order for pieces depicting the same year.
  dated.sort((a, b) => (newestFirst ? b.eventYear - a.eventYear : a.eventYear - b.eventYear));
  return dated.concat(DATED.filter((item) => item.eventYear === null));
}

function renderSummary() {
  const years = DATED.map((d) => d.eventYear).filter((y) => y !== null);
  const range = years.length
    ? ` · ${formatYear(Math.min(...years))} → ${formatYear(Math.max(...years))}`
    : "";
  summary.textContent = `${PIECES.length} piece${PIECES.length === 1 ? "" : "s"}${range}`;
}

function renderEntry(item, list) {
  const { art } = item;
  const entry = document.createElement("button");
  entry.type = "button";
  entry.className = "tl-entry";
  entry.setAttribute("aria-label", `View ${art.title} by ${art.artist}`);

  const label = gapLabel(item);
  let bar = "";
  if (label) {
    const frac = Math.min(Math.abs(item.madeYear - item.eventYear) / GAP_BAR_MAX_YEARS, 1);
    bar = `
      <div class="tl-gap">
        <div class="tl-gap-ends"><span>Event ${art.depicted}</span><span>Made ${art.year}</span></div>
        <div class="tl-gap-track" style="--gap: ${(frac * 100).toFixed(1)}%"><span class="tl-gap-start"></span><span class="tl-gap-fill"></span><span class="tl-gap-end"></span></div>
        <span class="tl-gap-label">${label}</span>
      </div>`;
  }

  entry.innerHTML = `
    <div class="tl-when">
      <div class="tl-year">${item.eventYear === null ? "—" : formatYear(item.eventYear)}</div>
      ${art.depicted && art.depicted !== formatYear(item.eventYear) ? `<div class="tl-date">${art.depicted}</div>` : ""}
    </div>
    <div class="tl-thumb"><img src="${art.image}" alt="" loading="lazy"></div>
    <div class="tl-info">
      <span class="tl-title">${art.title}</span>
      <span class="tl-meta">${art.artist}${art.medium ? " · " + art.medium : ""}</span>
      ${bar}
    </div>
  `;

  const img = entry.querySelector("img");
  img.addEventListener("load", () => img.classList.add("loaded"));
  if (img.complete) img.classList.add("loaded");

  entry.addEventListener("click", () => Modal.open(list, list.indexOf(art)));
  return entry;
}

function render() {
  const items = sortedItems();
  const list = items.map((item) => item.art); // modal prev/next follows timeline order

  // Group into eras, in display order
  const groups = [];
  items.forEach((item) => {
    const era = eraFor(item);
    let group = groups.find((g) => g.era === era);
    if (!group) {
      group = { era, items: [] };
      groups.push(group);
    }
    group.items.push(item);
  });

  rail.innerHTML = `<span class="tl-rail-label">Jump to</span>`;
  sections.innerHTML = "";

  groups.forEach(({ era, items: eraItems }) => {
    const link = document.createElement("a");
    link.href = `#${era.id}`;
    link.dataset.era = era.id;
    link.innerHTML = `${era.name}<span>${eraItems.length}</span>`;
    rail.appendChild(link);

    const section = document.createElement("section");
    section.className = "tl-era";
    section.id = era.id;
    section.innerHTML = `
      <div class="tl-era-head">
        <h2>${era.name}</h2>
        <span>${eraItems.length} piece${eraItems.length === 1 ? "" : "s"}</span>
      </div>
    `;
    eraItems.forEach((item) => section.appendChild(renderEntry(item, list)));
    sections.appendChild(section);
  });

  watchActiveEra();
}

/* Underline the era in the rail that's currently on screen */
let observer = null;
function setActiveEra(id) {
  rail.querySelectorAll("a").forEach((a) => {
    if (a.dataset.era === id) a.setAttribute("aria-current", "true");
    else a.removeAttribute("aria-current");
  });
}

function watchActiveEra() {
  if (observer) observer.disconnect();
  const first = sections.querySelector(".tl-era");
  if (first) setActiveEra(first.id);
  if (!("IntersectionObserver" in window)) return;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActiveEra(e.target.id);
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );
  sections.querySelectorAll(".tl-era").forEach((s) => observer.observe(s));
}

function setOrder(newest) {
  newestFirst = newest;
  orderNewest.setAttribute("aria-pressed", String(newest));
  orderOldest.setAttribute("aria-pressed", String(!newest));
  render();
}

orderNewest.addEventListener("click", () => setOrder(true));
orderOldest.addEventListener("click", () => setOrder(false));

renderSummary();
render();
