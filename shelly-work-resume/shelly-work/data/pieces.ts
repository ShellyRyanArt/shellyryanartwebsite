// Shared source of truth for all artwork pieces.
// Used by the gallery listing, the home page featured work, and the
// individual detail route at /gallery/[slug].
//
// Copy verified against live shellyryan.art on Apr 22 2026.

export type Piece = {
  slug: string;
  title: string;
  image: string;              // main image path under /public
  detailImages?: string[];    // optional zoom/detail shots
  medium: string;
  year: string;
  dimensions: string;
  depth: string;
  description: string;
  available: boolean;
  // When set, this piece is also represented at Orleans Gallery.
  // The detail page swaps the "Inquire" CTA for "Purchase at Orleans Gallery".
  orleansSlug?: string;
};

export const pieces: Piece[] = [
  {
    slug: "saint-of-the-southern-hive",
    title: "Saint of the Southern Hive",
    image: "/images/gallery/bee.jpg",
    detailImages: [
      "/images/gallery/bee-detail-1.jpg",
      "/images/gallery/bee-detail-2.jpg",
    ],
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "16 × 16 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      'The definition of "bee" is woven into the background alongside the dictionary\'s own sketch of a honeycomb — a quiet conversation between the written word and the living subject above it. The bee itself is built from a mosaic of magazine page photographs of bees and other insects, each fragment chosen for its color and texture. Her transparent wings — so delicate they seem to catch light — were hand cut from vintage sewing dress patterns, their tissue-thin translucency becoming the shimmer of flight.',
    available: true,
    orleansSlug: "saint-of-the-southern-hive",
  },
  {
    slug: "the-gulf-sentinel",
    title: "The Gulf Sentinel",
    image: "/images/gallery/pelican.jpg",
    detailImages: [
      "/images/gallery/pelican-detail-1.jpg",
      "/images/gallery/pelican-detail-2.jpg",
    ],
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "16 × 12 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      'The Gulf Sentinel stands on the dictionary page that carries his own definition — the word "pelican" visible beneath him, accompanied by a small printed sketch, as if the bird has simply stepped out of the text that tried to contain him. His striking black and white head was painstakingly sourced from magazine page photographs of panda bears. The greenish iridescence of his beak came from images of fish. Each individual feather was hand cut separately — one of the most time-consuming elements in the entire series. Look closely and the page beneath begins to reveal itself.',
    available: true,
    orleansSlug: "the-gulf-sentinel",
  },
  {
    slug: "la-tentation",
    title: "La Tentation",
    image: "/images/gallery/temptation.jpg",
    detailImages: [
      "/images/gallery/temptation-detail-1.jpg",
      "/images/gallery/temptation-detail-2.jpg",
    ],
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "10 × 10 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      '"La Tentation" — The Temptation — was born from the idea that the forbidden fruit in the Garden of Eden was not an apple at all, but a pomegranate. Rich, jeweled, and ancient, the pomegranate sits coiled in the serpent\'s embrace on a background of vintage French/English dictionary pages. The snake was built from a magazine advertisement for a luxury purse — temptation constructed from temptation itself. The deep crimson of the pomegranate came from a food advertisement. A piece about desire, knowledge, and the oldest story ever told.',
    available: true,
    orleansSlug: "la-tentation",
  },
  {
    slug: "la-truite",
    title: "La Truite",
    image: "/images/gallery/trout.jpg",
    detailImages: [
      "/images/gallery/trout-detail-1.jpg",
      "/images/gallery/trout-detail-2.jpg",
    ],
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "6 × 12 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      '"La Truite" — the trout — swims across a background of vintage French/English dictionary pages, a companion piece to Les Huitres in Shelly\'s growing French series. The body of the fish was assembled from images sourced across many magazines for different fish, each fragment chosen for its color and scale. The fins along the bottom and the upper fin were cut from a magazine image of a skirt — the flow of fabric becoming the movement of water, the suggestion of current and grace.',
    available: true,
    orleansSlug: "la-truite",
  },
  {
    slug: "les-huitres",
    title: "Les Huitres",
    image: "/images/gallery/oyster.jpg",
    detailImages: [
      "/images/gallery/oyster-detail-1.jpg",
      "/images/gallery/oyster-detail-2.jpg",
    ],
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "9 × 12 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      '"Les Huitres" — the oysters — sits on a background of vintage French/English dictionary pages, a quiet nod to the Louisiana culture that inspired it. The rough, ancient exterior of the shell was built from magazine images of rocks and sand, each fragment chosen for its texture and weight. The soft, luminous meat within came from clothing advertisements — silks and satins transformed into something altogether more alive. A Gulf Coast delicacy, rendered in the language of two worlds.',
    available: true,
    orleansSlug: "les-huitres",
  },
  {
    slug: "mascot-of-the-gulf-coast",
    title: "Mascot of the Gulf Coast",
    image: "/images/gallery/cricket.jpg",
    // Note: main image is cricket.jpg but detail images use the "mosquito"
    // naming convention on production — matches how the piece is described.
    detailImages: [
      "/images/gallery/mosquito-detail-1.jpg",
      "/images/gallery/mosquito-detail-2.jpg",
    ],
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "16 × 16 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      "Every Gulf Coast resident knows this creature intimately — and here he is, immortalized on the very dictionary page that carries his definition. The mosquito's body was built from magazine images of petrified wood, giving it an ancient, almost geological weight. The hair-like structures along his back were sourced from an extreme close-up photograph of deer hair, each strand cut with painstaking fineness. A creature most people swat without a second glance, rendered here as the complex, extraordinary thing he actually is.",
    available: true,
    orleansSlug: "mascot-of-the-gulf-coast",
  },
];

/**
 * Build an Orleans Gallery purchase URL for a piece.
 * Pattern verified against orleansgallery.com/art/* :
 *   /art/{pieceSlug}-by-shelly-ryan
 */
export function orleansUrlFor(piece: Piece): string | null {
  if (!piece.orleansSlug) return null;
  return `https://orleansgallery.com/art/${piece.orleansSlug}-by-shelly-ryan`;
}

export function getPieceBySlug(slug: string): Piece | undefined {
  return pieces.find((p) => p.slug === slug);
}
