"use client";
import { useState } from "react";
import Image from "next/image";

const artworks = [
  {
    src: "/images/gallery/bee.jpg",
    title: "Saint of the Southern Hive",
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "16 × 16 in",
    depth: "1.5 in deep · Collaged sides · Wired and ready to hang",
    price: "$550",
    description: "The definition of \"bee\" is woven into the background alongside the dictionary's own sketch of a honeycomb — a quiet conversation between the written word and the living subject above it. The bee itself is built from a mosaic of actual photographs of bees and other insects, each fragment chosen for its color and texture. Her transparent wings — so delicate they seem to catch light — were hand cut from vintage sewing dress patterns, their tissue-thin translucency becoming the shimmer of flight.",
    available: true,
  },
  {
    src: "/images/gallery/pelican.jpg",
    title: "The Gulf Sentinel",
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "16 × 12 in",
    depth: "1.5 in deep · Collaged sides · Wired and ready to hang",
    price: "$450",
    description: "The Gulf Sentinel stands on the dictionary page that carries his own definition — the word \"pelican\" visible beneath him, accompanied by a small printed sketch, as if the bird has simply stepped out of the text that tried to contain him. His striking black and white head was painstakingly sourced from photographs of panda bears. The greenish iridescence of his beak came from images of fish. Each individual feather was hand cut separately — one of the most time-consuming elements in the entire series. Look closely and the page beneath begins to reveal itself.",
    available: true,
  },
  {
    src: "/images/gallery/temptation.jpg",
    title: "La Tentation",
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "10 × 10 in",
    depth: "1.5 in deep · Collaged sides · Wired and ready to hang",
    price: "$195",
    description: "\"La Tentation\" — The Temptation — was born from the idea that the forbidden fruit in the Garden of Eden was not an apple at all, but a pomegranate. Rich, jeweled, and ancient, the pomegranate sits coiled in the serpent's embrace on a background of vintage French/English dictionary pages. The snake was built from an advertisement for a luxury purse — temptation constructed from temptation itself. The deep crimson of the pomegranate came from a food advertisement. A piece about desire, knowledge, and the oldest story ever told.",
    available: true,
  },
  {
    src: "/images/gallery/trout.jpg",
    title: "La Truite",
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "6 × 12 in",
    depth: "1.5 in deep · Collaged sides · Wired and ready to hang",
    price: "$195",
    description: "\"La Truite\" — the trout — swims across a background of vintage French/English dictionary pages, a companion piece to Les Huitres in Shelly's growing French series. The body of the fish was assembled from images sourced across many different fish photographs, each fragment chosen for its color and scale. The fins along the bottom and the upper fin were cut from an image of a skirt — the flow of fabric becoming the movement of water, the suggestion of current and grace.",
    available: true,
  },
  {
    src: "/images/gallery/oyster.jpg",
    title: "Les Huitres",
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "9 × 12 in",
    depth: "1.5 in deep · Collaged sides · Wired and ready to hang",
    price: "$250",
    description: "\"Les Huitres\" — the oysters — sits on a background of vintage French/English dictionary pages, a quiet nod to the Louisiana culture that inspired it. The rough, ancient exterior of the shell was built from magazine images of rocks and sand, each fragment chosen for its texture and weight. The soft, luminous meat within came from clothing advertisements — silks and satins transformed into something altogether more alive. A Gulf Coast delicacy, rendered in the language of two worlds.",
    available: true,
  },
  {
    src: "/images/gallery/cricket.jpg",
    title: "Mascot of the Gulf Coast",
    medium: "Mixed Media Hand Cut Paper Collage on Wood Panel",
    year: "2024",
    dimensions: "16 × 16 in",
    depth: "1.5 in deep · Collaged sides · Wired and ready to hang",
    price: "$550",
    description: "Every Gulf Coast resident knows this creature intimately — and here he is, immortalized on the very dictionary page that carries his definition. The mosquito's body was built from an image of petrified wood, giving it an ancient, almost geological weight. The hair-like structures along his back were sourced from an extreme close-up photograph of deer hair, each strand cut with painstaking fineness. A creature most people swat without a second glance, rendered here as the complex, extraordinary thing he actually is.",
    available: true,
  },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<(typeof artworks)[0] | null>(null);

  return (
    <>
      {/* Header */}
      <section
        className="pt-40 pb-16 px-8 text-center"
        style={{ background: "var(--parchment)" }}
      >
        <p
          className="font-sans-light mb-4"
          style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--amber)" }}
        >
          Original Works
        </p>
        <h1
          className="font-display"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: "var(--ink)", lineHeight: 1.1 }}
        >
          Gallery
        </h1>
        <div className="mt-6 divider" />
        <p
          className="mt-6 font-display mx-auto"
          style={{ fontSize: "1.1rem", fontStyle: "italic", color: "var(--sepia)", maxWidth: "520px", lineHeight: 1.8 }}
        >
          Each work is a hand cut paper collage — built from pieces sourced from magazines and layered by hand onto pages from vintage dictionaries, where the language of nature and the language of definition meet.
        </p>
      </section>

      {/* Gallery Grid */}
      <section
        className="px-4 pb-32"
        style={{ background: "var(--parchment)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {artworks.map((work, i) => (
            <div
              key={i}
              className="art-card"
              style={{ aspectRatio: "1 / 1.05" }}
              onClick={() => setSelected(work)}
            >
              <Image
                src={work.src}
                alt={work.title}
                width={700}
                height={735}
                className="art-card-img object-cover"
                style={{ height: "100%", objectFit: "cover" }}
              />
              <div className="art-card-overlay">
                <p
                  className="font-sans-light mb-1"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber-light)" }}
                >
                  {work.available ? "Available" : "Sold"}
                </p>
                <h3
                  className="font-display"
                  style={{ fontSize: "1.75rem", fontWeight: 400, color: "var(--parchment)", lineHeight: 1.1 }}
                >
                  {work.title}
                </h3>
                <p
                  className="font-sans-light mt-1"
                  style={{ fontSize: "0.65rem", color: "rgba(244,239,228,0.65)", letterSpacing: "0.1em" }}
                >
                  {work.dimensions} · {work.year}
                </p>
                <p
                  className="font-sans-light mt-3"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber-light)", borderTop: "1px solid rgba(196,168,90,0.3)", paddingTop: "0.75rem" }}
                >
                  Click to enlarge →
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* More works notice */}
        <div className="text-center mt-16">
          <p
            className="font-display"
            style={{ fontSize: "1.1rem", fontStyle: "italic", color: "var(--sepia)" }}
          >
            More works available — inquire for the full collection
          </p>
          <a
            href="/contact"
            className="font-sans-light mt-4 inline-block animated-underline"
            style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            Contact Shelly
          </a>
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(26, 23, 20, 0.95)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-5xl w-full flex flex-col md:flex-row gap-8 items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="flex-1 flex justify-center">
              <Image
                src={selected.src}
                alt={selected.title}
                width={800}
                height={840}
                style={{ maxHeight: "80vh", width: "auto", objectFit: "contain" }}
              />
            </div>

            {/* Details */}
            <div className="md:w-72 text-center md:text-left">
              <p
                className="font-sans-light mb-2"
                style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--amber-light)" }}
              >
                {selected.available ? "Available" : "Sold"}
              </p>
              <h2
                className="font-display mb-4"
                style={{ fontSize: "2.25rem", fontWeight: 300, color: "var(--parchment)", lineHeight: 1.1 }}
              >
                {selected.title}
              </h2>
              <div style={{ width: "40px", height: "1px", background: "var(--amber)", marginBottom: "1.5rem" }} />

              <p className="font-sans-light mb-1" style={{ fontSize: "0.7rem", color: "var(--parchment-deeper)", letterSpacing: "0.1em" }}>
                {selected.medium}
              </p>
              <p className="font-sans-light mb-1" style={{ fontSize: "0.7rem", color: "var(--parchment-deeper)", letterSpacing: "0.1em" }}>
                {selected.dimensions}{selected.depth ? ` · ${selected.depth}` : ""}
              </p>
              <p className="font-sans-light mb-4" style={{ fontSize: "0.7rem", color: "var(--parchment-deeper)", letterSpacing: "0.1em" }}>
                {selected.year}
              </p>

              {selected.price && (
                <p className="font-display mb-4" style={{ fontSize: "1.75rem", fontWeight: 400, color: "var(--amber-light)" }}>
                  {selected.price}
                </p>
              )}

              {selected.description && (
                <p className="font-display mb-4" style={{ fontSize: "0.95rem", fontStyle: "italic", color: "rgba(244,239,228,0.75)", lineHeight: 1.8 }}>
                  {selected.description}
                </p>
              )}

              <p className="font-sans-light mb-6" style={{ fontSize: "0.6rem", letterSpacing: "0.12em", color: "rgba(244,239,228,0.45)", lineHeight: 1.8, borderTop: "1px solid rgba(196,168,90,0.2)", paddingTop: "1rem" }}>
                Includes original artwork stamp &amp; certificate of authenticity
              </p>

              <a
                href="/contact"
                className="font-sans-light"
                style={{
                  display: "inline-block",
                  padding: "0.75rem 2rem",
                  background: "var(--amber)",
                  color: "var(--parchment)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Inquire
              </a>
            </div>

            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-0 right-0 font-sans-light"
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--parchment-deeper)", textTransform: "uppercase", padding: "0.5rem" }}
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
