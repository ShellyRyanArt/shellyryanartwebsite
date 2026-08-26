import type {
  Artwork,
  Collection,
  PageContent,
  SiteSettings,
} from "@/content/types";

const defaultMedium = "Mixed Media Hand Cut Paper Collage on Wood Panel";
const certificateNote =
  "Includes original artwork stamp & certificate of authenticity";

export const fallbackCollections: Collection[] = [
  {
    id: "collection-original-works",
    slug: "original-works",
    title: "Original Works",
    description:
      "One-of-a-kind mixed media hand cut paper collages by Shelly Ryan.",
    displayOrder: 10,
    isVisible: true,
  },
  {
    id: "collection-french-series",
    slug: "french-series",
    title: "French Series",
    description: "Works made on vintage French and English dictionary pages.",
    displayOrder: 20,
    isVisible: true,
  },
];

export const fallbackArtworks: Artwork[] = [
  {
    id: "artwork-saint-of-the-southern-hive",
    slug: "saint-of-the-southern-hive",
    title: "Saint of the Southern Hive",
    mainImage: {
      src: "/images/gallery/bee.jpg",
      alt: "Saint of the Southern Hive",
    },
    detailImages: [],
    medium: defaultMedium,
    year: "2024",
    dimensions: "16 × 16 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      "The definition of “bee” is woven into the background alongside the dictionary’s own sketch of a honeycomb — a quiet conversation between the written word and the living subject above it. The bee itself is built from a mosaic of magazine page photographs of bees and other insects, each fragment chosen for its color and texture. Her transparent wings — so delicate they seem to catch light — were hand cut from vintage sewing dress patterns, their tissue-thin translucency becoming the shimmer of flight.",
    collectionSlugs: ["original-works"],
    availability: "available",
    showPrice: false,
    galleryName: "Orleans Gallery",
    purchaseUrl:
      "https://orleansgallery.com/art/saint-of-the-southern-hive-by-shelly-ryan",
    purchaseButtonLabel: "Purchase at Orleans Gallery",
    certificateNote,
    featured: false,
    displayOrder: 10,
    isVisible: true,
  },
  {
    id: "artwork-the-gulf-sentinel",
    slug: "the-gulf-sentinel",
    title: "The Gulf Sentinel",
    mainImage: { src: "/images/gallery/pelican.jpg", alt: "The Gulf Sentinel" },
    detailImages: [],
    medium: defaultMedium,
    year: "2024",
    dimensions: "16 × 12 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      "The Gulf Sentinel stands on the dictionary page that carries his own definition — the word “pelican” visible beneath him, accompanied by a small printed sketch, as if the bird has simply stepped out of the text that tried to contain him. His striking black and white head was painstakingly sourced from magazine page photographs of panda bears. The greenish iridescence of his beak came from images of fish. Each individual feather was hand cut separately — one of the most time-consuming elements in the entire series. Look closely and the page beneath begins to reveal itself.",
    collectionSlugs: ["original-works"],
    availability: "available",
    showPrice: false,
    galleryName: "Orleans Gallery",
    purchaseUrl:
      "https://orleansgallery.com/art/the-gulf-sentinel-by-shelly-ryan",
    purchaseButtonLabel: "Purchase at Orleans Gallery",
    certificateNote,
    featured: false,
    displayOrder: 20,
    isVisible: true,
  },
  {
    id: "artwork-la-tentation",
    slug: "la-tentation",
    title: "La Tentation",
    mainImage: { src: "/images/gallery/temptation.jpg", alt: "La Tentation" },
    detailImages: [],
    medium: defaultMedium,
    year: "2024",
    dimensions: "10 × 10 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      "“La Tentation” — The Temptation — was born from the idea that the forbidden fruit in the Garden of Eden was not an apple at all, but a pomegranate. Rich, jeweled, and ancient, the pomegranate sits coiled in the serpent’s embrace on a background of vintage French/English dictionary pages. The snake was built from a magazine advertisement for a luxury purse — temptation constructed from temptation itself. The deep crimson of the pomegranate came from a food advertisement. A piece about desire, knowledge, and the oldest story ever told.",
    collectionSlugs: ["original-works", "french-series"],
    availability: "available",
    showPrice: false,
    galleryName: "Orleans Gallery",
    purchaseUrl: "https://orleansgallery.com/art/la-tentation-by-shelly-ryan",
    purchaseButtonLabel: "Purchase at Orleans Gallery",
    certificateNote,
    featured: false,
    displayOrder: 30,
    isVisible: true,
  },
  {
    id: "artwork-la-truite",
    slug: "la-truite",
    title: "La Truite",
    mainImage: { src: "/images/gallery/trout.jpg", alt: "La Truite" },
    detailImages: [],
    medium: defaultMedium,
    year: "2024",
    dimensions: "6 × 12 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      "“La Truite” — the trout — swims across a background of vintage French/English dictionary pages, a companion piece to Les Huitres in Shelly’s growing French series. The body of the fish was assembled from images sourced across many magazines for different fish, each fragment chosen for its color and scale. The fins along the bottom and the upper fin were cut from a magazine image of a skirt — the flow of fabric becoming the movement of water, the suggestion of current and grace.",
    collectionSlugs: ["original-works", "french-series"],
    availability: "available",
    showPrice: false,
    galleryName: "Orleans Gallery",
    purchaseUrl: "https://orleansgallery.com/art/la-truite-by-shelly-ryan",
    purchaseButtonLabel: "Purchase at Orleans Gallery",
    certificateNote,
    featured: false,
    displayOrder: 40,
    isVisible: true,
  },
  {
    id: "artwork-les-huitres",
    slug: "les-huitres",
    title: "Les Huitres",
    mainImage: { src: "/images/gallery/oyster.jpg", alt: "Les Huitres" },
    detailImages: [],
    medium: defaultMedium,
    year: "2024",
    dimensions: "9 × 12 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      "“Les Huitres” — the oysters — sits on a background of vintage French/English dictionary pages, a quiet nod to the Louisiana culture that inspired it. The rough, ancient exterior of the shell was built from magazine images of rocks and sand, each fragment chosen for its texture and weight. The soft, luminous meat within came from clothing advertisements — silks and satins transformed into something altogether more alive. A Gulf Coast delicacy, rendered in the language of two worlds.",
    collectionSlugs: ["original-works", "french-series"],
    availability: "available",
    showPrice: false,
    galleryName: "Orleans Gallery",
    purchaseUrl: "https://orleansgallery.com/art/les-huitres-by-shelly-ryan",
    purchaseButtonLabel: "Purchase at Orleans Gallery",
    certificateNote,
    featured: false,
    displayOrder: 50,
    isVisible: true,
  },
  {
    id: "artwork-mascot-of-the-gulf-coast",
    slug: "mascot-of-the-gulf-coast",
    title: "Mascot of the Gulf Coast",
    mainImage: {
      src: "/images/gallery/cricket.jpg",
      alt: "Mascot of the Gulf Coast",
    },
    detailImages: [],
    medium: defaultMedium,
    year: "2024",
    dimensions: "16 × 16 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      "Every Gulf Coast resident knows this creature intimately — and here he is, immortalized on the very dictionary page that carries his definition. The mosquito’s body was built from magazine images of petrified wood, giving it an ancient, almost geological weight. The hair-like structures along his back were sourced from an extreme close-up photograph of deer hair, each strand cut with painstaking fineness. A creature most people swat without a second glance, rendered here as the complex, extraordinary thing he actually is.",
    collectionSlugs: ["original-works"],
    availability: "available",
    showPrice: false,
    galleryName: "Orleans Gallery",
    purchaseUrl:
      "https://orleansgallery.com/art/mascot-of-the-gulf-coast-by-shelly-ryan",
    purchaseButtonLabel: "Purchase at Orleans Gallery",
    certificateNote,
    featured: true,
    displayOrder: 60,
    isVisible: true,
  },
];

export const fallbackPages: PageContent = {
  home: {
    heroTagline: "Original Fine Art · Hand Cut Paper Collage",
    worksEyebrow: "Original Works",
    worksHeading: "Hand Cut Paper Collage",
    worksBody:
      "Each piece is built by hand — hundreds of tiny fragments of magazine paper, layered onto pages from vintage dictionaries.",
    featuredArtworkSlug: "mascot-of-the-gulf-coast",
    artistStatement:
      "Each piece is designed to be discovered. From a distance, the work appears almost photographic. Step closer and the illusion gives way to something more intimate — hundreds of tiny hand cut fragments, each chosen with intention. Stay a little longer, and the background beneath begins to speak.",
    artistStatementAttribution: "Shelly Ryan",
    contactHeading: "Interested in a piece?",
    contactBody:
      "Original works available. Inquiries welcome. Each piece is sold with a certificate of authenticity.",
    contactButtonLabel: "Get in Touch",
  },
  about: {
    eyebrow: "The Artist",
    title: "About Shelly",
    portrait: {
      src: "/images/shelly-ryan.jpg",
      alt: "Shelly Ryan — Rip Van Winkle Gardens, Louisiana",
      caption: "Shelly Ryan · Rip Van Winkle Gardens, Louisiana",
    },
    introHeading:
      "Art rooted in the Gulf Coast and a lifelong love of the natural world",
    body: [
      "Shelly Ryan is a Gulf Coast artist whose work is inseparable from the world she lives in. Based in Beaumont, Texas — just miles from the Louisiana state line — her art draws from the rich natural and cultural landscape of the Southeast Texas and Louisiana Gulf Coast: its wildlife, its waterways, its unhurried, deeply rooted sense of place.",
      "Before dedicating herself to art, Shelly spent years working as a horticulturist — a practice that trained her to observe the natural world with patience and precision. She learned to see the architecture of a leaf, the geometry of an insect’s wing, the way light moves through living things. That same eye now guides every piece she makes.",
      "Her signature work is hand cut paper collage — each piece built fragment by fragment from images sourced from magazines, layered by hand onto the pages of vintage dictionaries. She sits with stacks of magazines searching for exactly the right color, the right texture, the right tone. A feather might come from a fashion spread. A beak from a wildlife photograph. The iridescent shimmer of an insect wing from a cosmetics advertisement. Every fragment is chosen, cut by hand, and placed with intention.",
      "The result is work that rewards those who slow down — art that reveals more the longer you look.",
    ],
    quote:
      "Each piece is designed to be discovered. From a distance, the work appears almost photographic. Step closer and the illusion gives way to something more intimate: hundreds of tiny hand cut fragments of magazine paper, each one chosen for its color, texture, and tone.",
  },
  process: {
    eyebrow: "The Process",
    title: "Entirely made by hand",
    intro:
      "Every work begins with close observation, patient searching, and a stack of printed material waiting to become something new.",
    steps: [
      {
        number: "01",
        title: "The Hunt",
        body: "Shelly begins each piece by sitting with magazines — searching for the precise colors, textures, and tones she needs. A single piece might require sourcing fragments from dozens of magazines before the right ones are found.",
      },
      {
        number: "02",
        title: "The Cut",
        body: "Every element is hand cut — no digital tools, no machines. Tiny pieces are trimmed with scissors and blades, shaped to follow the contours of feathers, fur, and wings. It is slow, meditative, intentional work.",
      },
      {
        number: "03",
        title: "The Collage",
        body: "Fragments are layered onto a page sourced from a vintage dictionary — building the subject piece by piece, color by color, until a living creature emerges from the language of a world that tried to define it.",
      },
    ],
    quote:
      "The result is work that rewards those who slow down — art that reveals more the longer you look.",
  },
  contact: {
    eyebrow: "Reach Out",
    title: "Contact",
    intro:
      "For work inquiries, purchasing information or general questions — Shelly would love to hear from you.",
    confirmationHeading: "Thank you",
    confirmationBody:
      "Your message has been prepared. Shelly will be in touch soon.",
  },
};

export const fallbackSiteSettings: SiteSettings = {
  siteTitle: "Shelly Ryan Art",
  logo: {
    src: "/images/logo/shelly-ryan-logo-transparent.png",
    alt: "Shelly Ryan Art",
  },
  contactEmail: "",
  footerCopyright: "Shelly Ryan Art — All Rights Reserved",
  footerArtworkNotice:
    "All artwork is original and may not be reproduced without permission",
};
