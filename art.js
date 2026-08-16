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
    id: "sample-1",
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    year: "1889",
    image: "images/sample-1.svg",
    description:
      "This is a placeholder description. Replace this with your own analysis of the piece — what draws you to it, how it makes you feel, what the artist was doing technically or historically, or anything else you want to say about it.\n\nYou can write multiple paragraphs — just leave a blank line (using \\n\\n) between them, like this one."
  },
  {
    id: "sample-2",
    title: "Untitled",
    artist: "Artist Name",
    year: "Year",
    image: "images/sample-2.svg",
    description:
      "Another placeholder entry, just to show how the grid looks with more than one piece in it. Swap the image, title, artist, year, and this text for a real artwork whenever you're ready."
  }
];
