export const galleryCategories = [
  'Selected work',
  'Beef',
  'Seafood',
  'Poultry',
  'Mains',
  'Starters & small plates',
  'Desserts',
  'In the kitchen',
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = {
  image: string;
  alt: string;
  category: GalleryCategory;
  /** Original supplied filenames, retained to make source coverage auditable. */
  sourceFiles: string[];
};

// Existing project images remain available in Selected work unless a matching
// source photograph is presented under its supplied category below.
const selectedWork: GalleryItem[] = [
  { image: '/images/food/plated-composition-03.webp', alt: 'Small composed bites arranged around the rim of a dark round plate.', category: 'Selected work', sourceFiles: [] },
  { image: '/images/food/plated-composition-04.webp', alt: 'Leafy bites and green leaves arranged across a light pan.', category: 'Selected work', sourceFiles: [] },
  { image: '/images/food/plated-composition-05.webp', alt: 'Pale and green elements arranged on a vivid blue plate with blue sauce.', category: 'Selected work', sourceFiles: [] },
  { image: '/images/food/plated-composition-07.webp', alt: 'A browned piece of food presented with an upright crisp and dark sauce.', category: 'Selected work', sourceFiles: [] },
  { image: '/images/food/plated-composition-08.webp', alt: 'Red and green geometric pieces arranged on a white plate with sauce details.', category: 'Selected work', sourceFiles: [] },
  { image: '/images/food/plated-composition-09.webp', alt: 'Sliced meat and green details arranged with a crisp element and sauce on a white plate.', category: 'Selected work', sourceFiles: [] },
  { image: '/images/food/plated-composition-10.webp', alt: 'A red circular plate design with pale garnishes, dark flecks and citrus sections.', category: 'Selected work', sourceFiles: [] },
  { image: '/images/food/plated-composition-11.webp', alt: 'A green centre with red and pale details in a dark round vessel, with crisp pieces around the edge.', category: 'Selected work', sourceFiles: [] },
  { image: '/images/food/plated-composition-12.webp', alt: 'Several browned pieces arranged with green and orange elements on a white plate beside a small bowl.', category: 'Selected work', sourceFiles: [] },
  { image: '/images/food/plated-composition-13.webp', alt: 'A small composed plate with a tall crisp, photographed against warm, out-of-focus lights.', category: 'Selected work', sourceFiles: [] },
  { image: '/images/food/plated-composition-14.webp', alt: 'Small browned square pieces and green elements arranged in a geometric pattern on a white plate.', category: 'Selected work', sourceFiles: [] },
];

// The supplied index photos are grouped by their original section. Five
// repeated scenes reuse the existing higher-resolution project assets. The two
// poultry source files are the same photograph, so their source names share one
// gallery entry rather than showing the image twice.
const suppliedWork: GalleryItem[] = [
  { image: '/images/gallery/beef/beef-01.jpg', alt: 'A beef portion on a white plate with dark sauce and small garnishes.', category: 'Beef', sourceFiles: ['beef-01.jpg'] },
  { image: '/images/gallery/beef/beef-02.jpg', alt: 'Sliced beef with vegetables and sauce arranged on a white plate.', category: 'Beef', sourceFiles: ['beef-02.jpg'] },
  { image: '/images/gallery/beef/beef-03.jpg', alt: 'A composed beef plate with small garnishes and red and yellow sauces.', category: 'Beef', sourceFiles: ['beef-03.jpg'] },
  { image: '/images/gallery/beef/beef-04.jpg', alt: 'A small beef portion with vegetables and sauce on a white plate.', category: 'Beef', sourceFiles: ['beef-04.jpg'] },
  { image: '/images/gallery/beef/beef-05.jpg', alt: 'A browned beef portion with green leaves and sauce on a white plate.', category: 'Beef', sourceFiles: ['beef-05.jpg'] },
  { image: '/images/gallery/beef/beef-06.jpg', alt: 'Several small bites arranged on a narrow dark slate.', category: 'Beef', sourceFiles: ['beef-06.jpg'] },
  { image: '/images/food/plated-composition-01.webp', alt: 'Sliced beef arranged on a wooden board beside dark sauce.', category: 'Beef', sourceFiles: ['beef-07.jpg'] },

  { image: '/images/gallery/seafood/seafood-01.jpg', alt: 'A seafood plate arranged at the centre of a white plate with small garnishes.', category: 'Seafood', sourceFiles: ['seafood-01.jpg'] },
  { image: '/images/gallery/seafood/seafood-02.jpg', alt: 'Composed seafood portions with small garnishes and sauce on a white plate.', category: 'Seafood', sourceFiles: ['seafood-02.jpg'] },
  { image: '/images/gallery/seafood/seafood-03.jpg', alt: 'Seafood with pale and green elements arranged on a textured grey plate.', category: 'Seafood', sourceFiles: ['seafood-03.jpg'] },
  { image: '/images/gallery/seafood/seafood-04.jpg', alt: 'A pale seafood plate with green details on textured stoneware.', category: 'Seafood', sourceFiles: ['seafood-04.jpg'] },
  { image: '/images/gallery/seafood/seafood-05.jpg', alt: 'A plated seafood portion presented on a dark grey dish.', category: 'Seafood', sourceFiles: ['seafood-05.jpg'] },

  { image: '/images/gallery/poultry/poultry-01.jpg', alt: 'A poultry plate with dark and green details on white ceramic.', category: 'Poultry', sourceFiles: ['poultry-01.jpg'] },
  { image: '/images/gallery/poultry/poultry-02.jpg', alt: 'A poultry plate with green sauce and small garnishes.', category: 'Poultry', sourceFiles: ['poultry-02.jpg'] },
  { image: '/images/gallery/poultry/poultry-03.jpg', alt: 'A poultry plate with green elements on a dark round dish.', category: 'Poultry', sourceFiles: ['poultry-03.jpg'] },
  { image: '/images/gallery/poultry/poultry-04.jpg', alt: 'A small poultry plate with yellow and green elements.', category: 'Poultry', sourceFiles: ['poultry-04.jpg'] },
  { image: '/images/gallery/poultry/poultry-05.jpg', alt: 'A browned poultry portion with vegetables and sauce on a round plate.', category: 'Poultry', sourceFiles: ['poultry-05.jpg'] },
  { image: '/images/gallery/poultry/poultry-06.jpg', alt: 'A poultry plate with vegetables, sauce and pale purée.', category: 'Poultry', sourceFiles: ['poultry-06.jpg'] },
  { image: '/images/gallery/poultry/poultry-07.jpg', alt: 'A poultry portion with bright details and sauce on a white plate.', category: 'Poultry', sourceFiles: ['poultry-07.jpg'] },
  { image: '/images/gallery/poultry/poultry-08.jpg', alt: 'A poultry plate with purée, vegetables and a crisp element on dark stoneware.', category: 'Poultry', sourceFiles: ['poultry-08.jpg', 'poultry-10.jpg'] },
  { image: '/images/gallery/poultry/poultry-09.jpg', alt: 'A poultry portion served with vegetables and purée on a dark plate.', category: 'Poultry', sourceFiles: ['poultry-09.jpg'] },
  { image: '/images/gallery/poultry/poultry-11.jpg', alt: 'Poultry with green and red details arranged on a white plate.', category: 'Poultry', sourceFiles: ['poultry-11.jpg'] },

  { image: '/images/gallery/mains/mains-01.jpg', alt: 'A composed plate with red, green and pale details on white ceramic.', category: 'Mains', sourceFiles: ['mains-01.jpg'] },
  { image: '/images/gallery/mains/mains-02.jpg', alt: 'A plated main with green and red details on a white dish.', category: 'Mains', sourceFiles: ['mains-02.jpg'] },
  { image: '/images/gallery/mains/mains-03.jpg', alt: 'A white plate with a central portion and small green and red accompaniments.', category: 'Mains', sourceFiles: ['mains-03.jpg'] },
  { image: '/images/gallery/mains/mains-04.jpg', alt: 'A green rectangular portion arranged on a white plate with sauce details.', category: 'Mains', sourceFiles: ['mains-04.jpg'] },
  { image: '/images/gallery/mains/mains-05.jpg', alt: 'A plated main with pale, green and orange elements on a grey plate.', category: 'Mains', sourceFiles: ['mains-05.jpg'] },
  { image: '/images/gallery/mains/mains-06.jpg', alt: 'A composed plate with green leaves, orange details and a crisp element.', category: 'Mains', sourceFiles: ['mains-06.jpg'] },
  { image: '/images/gallery/mains/mains-07.jpg', alt: 'A pale dish with green accents arranged on a white plate.', category: 'Mains', sourceFiles: ['mains-07.jpg'] },
  { image: '/images/gallery/mains/mains-08.jpg', alt: 'A plate with green and browned elements arranged in a line.', category: 'Mains', sourceFiles: ['mains-08.jpg'] },

  { image: '/images/gallery/starters-small-plates/starters-small-plates-01.jpg', alt: 'Three small plates arranged on a metal tray, each with a garnish.', category: 'Starters & small plates', sourceFiles: ['starters-small-plates-01.jpg'] },
  { image: '/images/gallery/starters-small-plates/starters-small-plates-02.jpg', alt: 'Three small bites arranged in a row on a metal tray.', category: 'Starters & small plates', sourceFiles: ['starters-small-plates-02.jpg'] },
  { image: '/images/food/plated-composition-06.webp', alt: 'A green centre with red and pale details in a dark round vessel, with crisp pieces around the edge.', category: 'Starters & small plates', sourceFiles: ['starters-small-plates-03.jpg'] },
  { image: '/images/gallery/starters-small-plates/starters-small-plates-04.jpg', alt: 'A small composed plate centred on a wide white plate.', category: 'Starters & small plates', sourceFiles: ['starters-small-plates-04.jpg'] },

  { image: '/images/gallery/desserts/desserts-01.jpg', alt: 'A pale round dessert with red and green details on a ridged plate.', category: 'Desserts', sourceFiles: ['desserts-01.jpg'] },
  { image: '/images/food/plated-composition-02.webp', alt: 'Pink and green elements arranged on a ribbed grey plate.', category: 'Desserts', sourceFiles: ['desserts-02.jpg'] },
  { image: '/images/gallery/desserts/desserts-03.jpg', alt: 'A plated dessert with red and pale elements on a ridged plate.', category: 'Desserts', sourceFiles: ['desserts-03.jpg'] },

  { image: '/images/kitchen/final-touches.webp', alt: 'A chef’s hands finishing a plated dish at the kitchen pass.', category: 'In the kitchen', sourceFiles: ['in-the-kitchen-01.jpg'] },
  { image: '/images/kitchen/service-at-the-pass.webp', alt: 'A chef plating a dish at the kitchen pass.', category: 'In the kitchen', sourceFiles: ['in-the-kitchen-02.jpg'] },
];

export const gallery: GalleryItem[] = [...selectedWork, ...suppliedWork];
