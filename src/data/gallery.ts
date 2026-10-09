export type GalleryItem = {
  id: number;
  title: string;
  note: string;
  image: string;
  alt: string;
  category: 'food' | 'kitchen';
};

// Selected from the supplied archive; captions describe only visible details.
export const gallery: GalleryItem[] = [
  { id: 1, title: 'Sliced composition', note: 'Food', image: '/images/food/plated-composition-01.webp', alt: 'Sliced pieces arranged on a wooden board beside dark sauce.', category: 'food' },
  { id: 2, title: 'Colour and texture', note: 'Food', image: '/images/food/plated-composition-02.webp', alt: 'Pink and green elements arranged on a ribbed grey plate.', category: 'food' },
  { id: 3, title: 'Dark ceramic', note: 'Food', image: '/images/food/plated-composition-03.webp', alt: 'Small composed bites arranged around the rim of a dark round plate.', category: 'food' },
  { id: 4, title: 'At the table', note: 'Food', image: '/images/food/plated-composition-04.webp', alt: 'Leafy bites and green leaves arranged across a light pan.', category: 'food' },
  { id: 5, title: 'Vivid blue', note: 'Food', image: '/images/food/plated-composition-05.webp', alt: 'Pale and green elements arranged on a vivid blue plate with blue sauce.', category: 'food' },
  { id: 6, title: 'An overhead composition', note: 'Food', image: '/images/food/plated-composition-06.webp', alt: 'Top-down view of a circular plate with green garnish, red details and a crisp-edged element.', category: 'food' },
  { id: 7, title: 'A composed plate', note: 'Food', image: '/images/food/plated-composition-07.webp', alt: 'A browned piece of food presented with an upright crisp and dark sauce.', category: 'food' },
  { id: 8, title: 'Geometric presentation', note: 'Food', image: '/images/food/plated-composition-08.webp', alt: 'Red and green geometric pieces arranged on a white plate with sauce details.', category: 'food' },
  { id: 9, title: 'A study in contrast', note: 'Food', image: '/images/food/plated-composition-09.webp', alt: 'Sliced meat and green details arranged with a crisp element and sauce on a white plate.', category: 'food' },
  { id: 10, title: 'Colour on white', note: 'Food', image: '/images/food/plated-composition-10.webp', alt: 'A red circular plate design with pale garnishes, dark flecks and citrus sections.', category: 'food' },
  { id: 11, title: 'Stone and colour', note: 'Food', image: '/images/food/plated-composition-11.webp', alt: 'A green centre with red and pale details in a dark round vessel, with crisp pieces around the edge.', category: 'food' },
  { id: 12, title: 'Quiet composition', note: 'Food', image: '/images/food/plated-composition-12.webp', alt: 'Several browned pieces arranged with green and orange elements on a white plate beside a small bowl.', category: 'food' },
  { id: 13, title: 'In the pass light', note: 'Food', image: '/images/food/plated-composition-13.webp', alt: 'A small composed plate with a tall crisp, photographed against warm, out-of-focus lights.', category: 'food' },
  { id: 14, title: 'Grid composition', note: 'Food', image: '/images/food/plated-composition-14.webp', alt: 'Small browned square pieces and green elements arranged in a geometric pattern on a white plate.', category: 'food' },
  { id: 15, title: 'Final touches', note: 'Kitchen', image: '/images/kitchen/final-touches.webp', alt: 'Hands finishing a plate beside a small pan at a kitchen pass.', category: 'kitchen' },
  { id: 16, title: 'Service at the pass', note: 'Kitchen', image: '/images/kitchen/service-at-the-pass.webp', alt: 'A chef’s hands placing a garnish on a plate at the pass.', category: 'kitchen' },
];
