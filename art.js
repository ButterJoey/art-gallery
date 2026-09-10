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
  - medium:      what it's made of/with (e.g. "Oil on canvas", "Watercolor", "Lithograph")
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
    medium: "Oil on canvas",
    image: "images/Watchers in the Night Thomas BlackHeath.jpg",
    description:
      "This work depicts a winged angel with a flame and spear standing guard over a sleeping child. Showing God's protection of the most vulnerable."
  },
  {
    id: "The Battle of the Nile",
    title: "The Battle of the Nile",
    artist: "George Arnald",
    year: "Between 1825 and 1827",
    medium: "Oil on canvas",
    image: "images/The Battle of the Nile.jpg",
    description:
      "This scene depicts one of Admiral Nelson's greatest battles. The Battle of the Nile was the naval battle between the British naval task force led by Admiral Horatio Nelson and the French fleet led by Admiral François-Paul Brueys d'Aigalliers. The French fleet was anchored just off the coast of Egypt, having recently deployed Napoleon and his army in the efforts to take Cairo. The specific moment this piece captures is during the later part of the engagement when a fire reached the ammunition storage of the L'Orient, the French Flagship."
  },
  {
    id: "The Battle of the Pyramids",
    title: "The Battle of the Pyramids",
    artist: "Antoine-Jean Gros",
    year: "1810",
    medium: "Oil on canvas",
    image: "images/The Battle of the Pyramids.jpg",
    description:
      "On July 21, 1798, near Embabeh, a village near Cairo, Napoleon clashed with Murad Bey and Ibrahim Bey, leaders of the Egyptian and Mamluk forces. Napoleon used divisional square formations to wipe out the Mamluk cavalry before counterattacking the fortified village of Embabeh. The battle was a decisive victory for the French with only 300 casualties, while the Egyptian/Mamluk forces had an estimated 2,000-6,000 casualties, opening Cairo to French occupation."
  },
  {
    id: "Alexander the Great Refuses Water in the Desert",
    title: "Alexander the Great Refuses Water in the Desert",
    artist: "Tom Lovell",
    year: "1968",
    medium: "Tempera with wax on canvas",
    image: "images/Alexander the Great Refuses Water in the Desert.jpeg",
    description:
      "Around 325 BC, Alexander the Great returns from his conquest in India. His journey takes him through the deadly Gedrosian Desert, his army is dangerously dehydrated and exhausted. A soldier managed to find some water and gave it to Alexander in a helmet, however, in a genius stroke of leadership, he spilled the water on the ground. Alexander shows his solidarity to his men, not willing to let his men suffer while he does not."
  },
  {
    id: "The British Squares Receiving the Charge of the French Cuirassiers",
    title: "The British Squares Receiving the Charge of the French Cuirassiers",
    artist: "Félix Henri Emmanuel Philippoteaux",
    year: "1874",
    medium: "Oil on canvas",
    image: "images/The British Squares Receiving the Charge of the French Cuirassiers.jpg",
    description:
      "18 June 1815, Napoleon's last battle, the Battle of Waterloo. There are many paintings of the infamous battle however, this one depicts the famous British infantry squares repelling the French cavalry, a pivotal point of the battle."
  },
  {
    id: "Running the Batteries",
    title: "Running the Batteries",
    artist: "Kurz & Allison",
    year: "1888",
    medium: "Lithograph",
    image: "images/Running the Batteries.jpg",
    description:
      "On April 16, 1863, the Union forces ran the artillery emplacements past Vicksburg. While \"running its guns,\" the captains figured out that the city's guns could only depress so low, leading them to sail as close to the shore as possible to avoid cannon fire. This lithograph was created in 1888 commemorating the 25th anniversary of the victory over Vicksburg."
  },
  {
    id: "Bombardment of Fort McHenry", 
    title: "Bombardment of Fort McHenry",
    artist: "Peter Spier",
    year: "1973",
    medium: "Pen-and-ink and watercolor",
    image: "images/Bombardment of Fort Mchenry.jpg",
    description:
      "Peter Spier, a Dutch-American illustrator known for detailed pen-and-ink line work layered with watercolor washes. In his 1973 picture book, The Star-Spangled Banner he depicts the famous bombardment of September 13–14, 1814, during the War of 1812 that led to the creation of the United States national anthem, \"The Star-Spangled Banner.\" After Washington DC was burned by the British, the Royal Navy moved to take Baltimore. The British first attempted a land invasion but they were thwearted when Major General Robert Ross who was leading the operation, was killed by a sharpshooter. The militia and citizens of Baltimore decided to scuttle their merchant ships at the entrance of the harbor. This forced the British to prepare for a naval assault, which required the destruction of Fort McHenry. After 25 hours of bombardment, the Fort was still standing, and the Baltimoreans were able to repel the British invasion of their city."
  }
];