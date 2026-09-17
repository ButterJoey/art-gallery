/*
  ART DATA FILE
  =============
  This is the only file you need to edit to add, remove, or change artwork.

  HOW TO ADD A NEW PIECE:
  1. Put your image file in the /images folder (e.g. images/my-painting.jpg)
  2. Copy one of the objects below, paste it into the ARTWORKS array,
     and fill in your own details.
  3. Save the file and refresh the page in your browser.

  NOTE: Pieces are ordered by the date of the historical event/scene
  DEPICTED in the artwork (not the date the artwork itself was made),
  from MOST RECENT to OLDEST.
  Keep new entries in that chronological order when you add them.

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
    id: "Bombardment of Fort McHenry",
    title: "Bombardment of Fort McHenry",
    artist: "Peter Spier",
    year: "1973",
    medium: "Pen-and-ink and watercolor",
    image: "images/Bombardment of Fort Mchenry.jpg",
    description:
      "Peter Spier, a Dutch-American illustrator known for detailed pen-and-ink line work layered with watercolor washes. In his 1973 picture book, The Star-Spangled Banner, he depicts the famous bombardment of September 13–14, 1814, during the War of 1812 that led to the creation of the United States national anthem, \"The Star-Spangled Banner.\" After Washington DC was burned by the British, the Royal Navy moved to take Baltimore. The British first attempted a land invasion, but they were thwarted when Major General Robert Ross, who was leading the operation, was killed by a sharpshooter. The militia and citizens of Baltimore decided to scuttle their merchant ships at the entrance of the harbor. This forced the British to prepare for a naval assault, which required the destruction of Fort McHenry. After 25 hours of bombardment, the Fort was still standing, and the Baltimoreans were able to repel the British invasion of their city."
  },
  {
    id: "The Death of Nelson, 21 October 1805",
    title: "The Death of Nelson, 21 October 1805",
    artist: "Arthur William Devis",
    year: "1807",
    medium: "Oil on canvas",
    image: "images/The Death of Nelson, 21 October 1805.jpg",
    description:
      "October 21, 1805, a tragic day in British history. The Battle of Trafalgar would define British maritime supremacy for the next 140 years. Admiral Horatio Nelson, with a fleet of 27 ships of the line, 4 frigates, 1 schooner, and 1 cutter, would face off against the joint French-Spanish fleet led by Pierre-Charles Villeneuve and Federico Gravina, composed of 33 ships of the line, 5 frigates, and 2 brigs. In an unorthodox stroke of genius, Nelson charged the French-Spanish fleet (which was sailing North) from the East, crossing their T. He conducted this maneuver with two British columns, leading the Northernmost column with his own flagship, HMS Victory. After a successful approach, Nelson had split the French-Spanish Fleet in half, forcing the Northernmost French ships of the line into a painstakingly long U-turn back into the fight. The slugfest that ensued led to close ship-to-ship combat, point-blank broadsides and boardings. During the fray, while Nelson was walking along the quarterdeck, a sniper from the opposing French Redoutable fired from atop its rigging. Nelson was shot at 1:15 pm, puncturing his left shoulder and going through his ribs and spine before puncturing his lungs, causing his death at 4:30 pm."
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
    id: "The Battle of Lodi",
    title: "The Battle of Lodi",
    artist: "Louis-François Lejeune",
    year: "1804",
    medium: "Oil on Canvas",
    image: "images/The Battle of Lodi.jpg",
    description:
      "This piece depicts the Battle of Lodi, where Napoleon was convinced that he was a man of destiny. The battle took place on 10 May 1796, in the Italian campaign during the French Revolutionary Wars. Napoleon is shown in the lower left, mounted and giving orders to charge through the bridge, leading to immediate casualties but an ultimate victory. The painting was produced the same year Napoleon would declare himself Emperor of France."
  },
  {
    id: "Ottoman Sipahi and Aragonese Mercenary",
    title: "Ottoman Sipahi and Aragonese Mercenary",
    artist: "Jose Daniel Cabrera Peña",
    year: "2014",
    medium: "Oil on Canvas",
    image: "images/Ottoman Sipahi and Aragonese Mercenary.jpg",
    description:
      "This piece illustrates the aftermath of the Fall of Constantinople, 1453. An Ottoman Sipahi (professional cavalryman) looks down at a fallen Aragonese mercenary (Elite Infantryman) after the fall of the city, with a Byzantine flag on the floor beside him. This defining moment in history was the end of the Byzantine Empire, ending the Roman imperial legacy in the world. Many historians use this point as the end of Medieval times and the beginning of the modern era."
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
    id: "Watchers in the Night Thomas BlackHeath",
    title: "Watchers in the Night",
    artist: "Thomas Blackshear II",
    year: "2004",
    medium: "Oil on canvas",
    image: "images/Watchers in the Night Thomas BlackHeath.jpg",
    description:
      "This work depicts a winged angel with a flame and spear standing guard over a sleeping child. Showing God's protection of the most vulnerable."
  }
];
