import Image from "next/image";
import Link from "next/link";
import { pieces } from "@/data/pieces";

export default function GalleryPage() {
  return (
    <>
      {/* Header */}
      <section
        className="pt-40 pb-16 px-8 text-center"
        style={{ background: "var(--parchment)" }}
      >
        <p
          className="font-sans-light mb-4"
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--amber)",
          }}
        >
          Original Works
        </p>
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 300,
            color: "var(--ink)",
            lineHeight: 1.1,
          }}
        >
          Gallery
        </h1>
        <div className="mt-6 divider" />
        <p
          className="mt-6 font-display mx-auto"
          style={{
            fontSize: "1.1rem",
            fontStyle: "italic",
            color: "var(--sepia)",
            maxWidth: "520px",
            lineHeight: 1.8,
          }}
        >
          Each work is a hand cut paper collage — built from pieces sourced from
          magazines and layered by hand onto pages from vintage dictionaries,
          where the language of nature and the language of definition meet.
        </p>
      </section>

      {/* Gallery Grid */}
      <section
        className="px-4 pb-32"
        style={{ background: "var(--parchment)" }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {pieces.map((work) => (
            <Link
              key={work.slug}
              href={`/gallery/${work.slug}`}
              className="art-card block"
              style={{ aspectRatio: "1 / 1.05" }}
            >
              <Image
                src={work.image}
                alt={work.title}
                width={700}
                height={735}
                className="art-card-img object-cover"
                style={{ height: "100%", objectFit: "cover" }}
              />
              <div className="art-card-overlay">
                <p
                  className="font-sans-light mb-1"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--amber-light)",
                  }}
                >
                  {work.available ? "Available" : "Sold"}
                </p>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 400,
                    color: "var(--parchment)",
                    lineHeight: 1.1,
                  }}
                >
                  {work.title}
                </h3>
                <p
                  className="font-sans-light mt-1"
                  style={{
                    fontSize: "0.65rem",
                    color: "rgba(244,239,228,0.65)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {work.dimensions} · {work.year}
                </p>
                <p
                  className="font-sans-light mt-3"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--amber-light)",
                    borderTop: "1px solid rgba(196,168,90,0.3)",
                    paddingTop: "0.75rem",
                  }}
                >
                  View →
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* More works notice */}
        <div className="text-center mt-16">
          <p
            className="font-display"
            style={{
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "var(--sepia)",
            }}
          >
            More works available — inquire for the full collection
          </p>
          <Link
            href="/contact"
            className="font-sans-light mt-4 inline-block animated-underline"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--amber)",
            }}
          >
            Contact Shelly
          </Link>
        </div>
      </section>
    </>
  );
}
