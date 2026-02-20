"use client";
import { useState } from "react";
import Image from "next/image";

const artworks = [
  {
    src: "/images/gallery/bee.jpg",
    title: "Honeybee",
    medium: "Acrylic on Vintage Dictionary Page",
    year: "2024",
    dimensions: "11 × 11 in",
    available: true,
  },
  {
    src: "/images/gallery/pelican.jpg",
    title: "Pelican",
    medium: "Acrylic on Vintage Dictionary Page",
    year: "2024",
    dimensions: "9 × 12 in",
    available: true,
  },
  {
    src: "/images/gallery/cricket.jpg",
    title: "Cricket",
    medium: "Acrylic on Vintage Dictionary Page",
    year: "2024",
    dimensions: "11 × 14 in",
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
          Each work is painted in acrylic on pages sourced from vintage dictionaries — where the language of nature and the language of definition meet.
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
            <div className="md:w-64 text-center md:text-left">
              <p
                className="font-sans-light mb-2"
                style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--amber-light)" }}
              >
                {selected.available ? "Available" : "Sold"}
              </p>
              <h2
                className="font-display mb-4"
                style={{ fontSize: "2.5rem", fontWeight: 300, color: "var(--parchment)", lineHeight: 1.1 }}
              >
                {selected.title}
              </h2>
              <div style={{ width: "40px", height: "1px", background: "var(--amber)", marginBottom: "1.5rem" }} />
              <p className="font-sans-light mb-2" style={{ fontSize: "0.7rem", color: "var(--parchment-deeper)", letterSpacing: "0.1em" }}>
                {selected.medium}
              </p>
              <p className="font-sans-light mb-1" style={{ fontSize: "0.7rem", color: "var(--parchment-deeper)", letterSpacing: "0.1em" }}>
                {selected.dimensions}
              </p>
              <p className="font-sans-light mb-8" style={{ fontSize: "0.7rem", color: "var(--parchment-deeper)", letterSpacing: "0.1em" }}>
                {selected.year}
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
