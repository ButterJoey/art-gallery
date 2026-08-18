/*
  ART DATA FILE
  =============
  This is the only file you need to edit to add, remove, or change artwork.

  HOW TO ADD A NEW PIECE:
  1. Put your image file in the /images folder (e.g. images/my-painting.jpg)
  2. Copy one of the objects below, paste it into the ARTWORKS array,
     and fill in your own details.
  3. Save the file and refresh the page in your browser.

  Fields:
  - id:          a short unique code, no spaces (used internally, e.g. "starry-night")
  - title:       the artwork's title
  - artist:      the artist's name
  - year:        year or date made (can be a string like "c. 1889" or "Unknown")
  - image:       path to the image file inside the images/ folder
  - description: YOUR analysis/writeup. Can be as long as you like.
                 Use \n\n inside the string to create a paragraph break.
*/

const ARTWORKS = [
  {
    id: "Watchers in the Night Thomas BlackHeath",
    title: "Watchers in the Night",
    artist: "Thomas Blackshear II",
    year: "2001",
    image: "images/Watchers in the Night Thomas BlackHeath.jpg",
    description:
      "This work depicts a winged angel with a flame and spear standing guard over a sleeping child. Showing God's protection of the most vulnerable."
  },
  {
    id: "The Battle of the Nile",
    title: "The Battle of the Nile",
    artist: "George Arnald",
    year: "Between 1825 and 1827",
    image: "images/The Battle of the Nile.jpg",
    description:
      "This scene depicts one of Admiral Nelson's greatest battles. The Battle of the Nile was the naval battle between the British naval task force led by Admiral Horatio Nelson and the French fleet led by Admiral François-Paul Brueys d'Aigalliers. The French fleet was anchored just off the coast of Egypt, having recently deployed Napoleon and his army in the efforts to take Cairo. The specific moment this piece captures is during the later part of the engagement when a fire reached the ammunition storage of the L'Orient, the French Flagship."
  },
  {
    id: "The Battle of the Pyramids",
    title: "The Battle of the Pyramids",
    artist: "Antoine-Jean Gros",
    year: "1810",
    image: "images/The Battle of the Pyramids.jpg",
    description:
      "On July 21, 1798, near Embabeh, a village near Cairo, Napoleon clashed with Murad Bey and Ibrahim Bey, leaders of the Egyptian and Mamluk forces. Napoleon used divisional square formations to wipe out the Mamluk cavalry before counterattacking the fortified village of Embabeh. The battle was a decisive victory for the French with only 300 casualties, while the Egyptian/Mamluk forces had an estimated 2,000-6,000 casualties, opening Cairo to French occupation."
  }
];