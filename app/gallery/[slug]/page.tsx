import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Piece = {
  slug: string;
  src: string;
  title: string;
  medium: string;
  year: string;
  dimensions: string;
  depth: string;
  description: string;
  available: boolean;
  orleansSlug: string;
};

const artworks: Piece[] = [
  {
    slug: "saint-of-the-southern-hive",
    src: "/images/gallery/bee.jpg",
    title: "Saint of the Southern Hive",
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "16 × 16 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      "The definition of \u201Cbee\u201D is woven into the background alongside the dictionary\u2019s own sketch of a honeycomb \u2014 a quiet conversation between the written word and the living subject above it. The bee itself is built from a mosaic of magazine page photographs of bees and other insects, each fragment chosen for its color and texture. Her transparent wings \u2014 so delicate they seem to catch light \u2014 were hand cut from vintage sewing dress patterns, their tissue-thin translucency becoming the shimmer of flight.",
    available: true,
    orleansSlug: "saint-of-the-southern-hive",
  },
  {
    slug: "the-gulf-sentinel",
    src: "/images/gallery/pelican.jpg",
    title: "The Gulf Sentinel",
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "16 × 12 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      "The Gulf Sentinel stands on the dictionary page that carries his own definition \u2014 the word \u201Cpelican\u201D visible beneath him, accompanied by a small printed sketch, as if the bird has simply stepped out of the text that tried to contain him. His striking black and white head was painstakingly sourced from magazine page photographs of panda bears. The greenish iridescence of his beak came from images of fish. Each individual feather was hand cut separately \u2014 one of the most time-consuming elements in the entire series. Look closely and the page beneath begins to reveal itself.",
    available: true,
    orleansSlug: "the-gulf-sentinel",
  },
  {
    slug: "la-tentation",
    src: "/images/gallery/temptation.jpg",
    title: "La Tentation",
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "10 × 10 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      "\u201CLa Tentation\u201D \u2014 The Temptation \u2014 was born from the idea that the forbidden fruit in the Garden of Eden was not an apple at all, but a pomegranate. Rich, jeweled, and ancient, the pomegranate sits coiled in the serpent\u2019s embrace on a background of vintage French/English dictionary pages. The snake was built from a magazine advertisement for a luxury purse \u2014 temptation constructed from temptation itself. The deep crimson of the pomegranate came from a food advertisement. A piece about desire, knowledge, and the oldest story ever told.",
    available: true,
    orleansSlug: "la-tentation",
  },
  {
    slug: "la-truite",
    src: "/images/gallery/trout.jpg",
    title: "La Truite",
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "6 × 12 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      "\u201CLa Truite\u201D \u2014 the trout \u2014 swims across a background of vintage French/English dictionary pages, a companion piece to Les Huitres in Shelly\u2019s growing French series. The body of the fish was assembled from images sourced across many magazines for different fish, each fragment chosen for its color and scale. The fins along the bottom and the upper fin were cut from a magazine image of a skirt \u2014 the flow of fabric becoming the movement of water, the suggestion of current and grace.",
    available: true,
    orleansSlug: "la-truite",
  },
  {
    slug: "les-huitres",
    src: "/images/gallery/oyster.jpg",
    title: "Les Huitres",
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "9 × 12 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      "\u201CLes Huitres\u201D \u2014 the oysters \u2014 sits on a background of vintage French/English dictionary pages, a quiet nod to the Louisiana culture that inspired it. The rough, ancient exterior of the shell was built from magazine images of rocks and sand, each fragment chosen for its texture and weight. The soft, luminous meat within came from clothing advertisements \u2014 silks and satins transformed into something altogether more alive. A Gulf Coast delicacy, rendered in the language of two worlds.",
    available: true,
    orleansSlug: "les-huitres",
  },
  {
    slug: "mascot-of-the-gulf-coast",
    src: "/images/gallery/cricket.jpg",
    title: "Mascot of the Gulf Coast",
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "16 × 16 in",
    depth: "1.5 in deep · Collaged sides",
    description:
      "Every Gulf Coast resident knows this creature intimately \u2014 and here he is, immortalized on the very dictionary page that carries his definition. The mosquito\u2019s body was built from magazine images of petrified wood, giving it an ancient, almost geological weight. The hair-like structures along his back were sourced from an extreme close-up photograph of deer hair, each strand cut with painstaking fineness. A creature most people swat without a second glance, rendered here as the complex, extraordinary thing he actually is.",
    available: true,
    orleansSlug: "mascot-of-the-gulf-coast",
  },
];

export function generateStaticParams() {
  return artworks.map((w) => ({ slug: w.slug }));
}

export default async function PiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = artworks.find((w) => w.slug === slug);
  if (!piece) notFound();

  const orleansUrl = `https://orleansgallery.com/art/${piece.orleansSlug}-by-shelly-ryan`;

  return (
    <div style={{ background: "var(--parchment)", minHeight: "100vh" }}>
      <section className="pt-40 pb-10 px-8 text-center">
        <p
          className="font-sans-light mb-4"
          style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          {piece.available ? "Available" : "Sold"}
        </p>
        <h1
          className="font-display"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 300, color: "var(--ink)", lineHeight: 1.1 }}
        >
          {piece.title}
        </h1>
        <div className="mt-6 divider" />
      </section>

      <section className="px-8 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="relative">
            <Image
              src={piece.src}
              alt={piece.title}
              width={800}
              height={800}
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
          </div>

          <div>
            <p
              className="font-sans-light mb-2"
              style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--amber)" }}
            >
              {piece.medium}
            </p>
            <p
              className="font-sans-light mb-1"
              style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--sepia)" }}
            >
              {piece.dimensions} · {piece.year}
            </p>
            <p
              className="font-sans-light mb-6"
              style={{ fontSize: "0.7rem", letterSpacing: "0.12em", color: "var(--sepia)", lineHeight: 1.8 }}
            >
              {piece.depth}
            </p>

            <div style={{ width: "40px", height: "1px", background: "var(--amber)", marginBottom: "1.5rem" }} />

            <p
              className="font-display mb-8"
              style={{ fontSize: "1.1rem", color: "var(--ink-light)", lineHeight: 1.9, fontWeight: 300 }}
            >
              {piece.description}
            </p>

            <p
              className="font-sans-light mb-8"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                color: "var(--sepia)",
                lineHeight: 1.8,
                textTransform: "uppercase",
                borderTop: "1px solid rgba(107, 90, 62, 0.2)",
                paddingTop: "1rem",
              }}
            >
              Includes original artwork stamp & certificate of authenticity
            </p>

            <a
              href={orleansUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans-light"
              style={{
                display: "inline-block",
                padding: "0.875rem 2.5rem",
                background: "var(--ink)",
                color: "var(--parchment)",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Purchase at Orleans Gallery &rarr;
            </a>
          </div>
        </div>

        <div className="text-center mt-20">
          <Link
            href="/gallery"
            className="font-sans-light animated-underline"
            style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            &larr; Back to Gallery
          </Link>
        </div>
      </section>
    </div>
  );
}
