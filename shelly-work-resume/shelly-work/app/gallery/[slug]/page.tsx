"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { track } from "@vercel/analytics";
import { getPieceBySlug, orleansUrlFor } from "@/data/pieces";

export default function PieceDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const piece = slug ? getPieceBySlug(slug) : undefined;

  if (!piece) {
    notFound();
  }

  const orleansUrl = orleansUrlFor(piece);

  const handleOrleansClick = () => {
    track("orleans_click", {
      piece: piece.title,
      slug: piece.slug,
    });
  };

  return (
    <>
      {/* Back link + content wrapper */}
      <section
        className="pt-28 md:pt-32 pb-24 px-6 md:px-10"
        style={{ background: "var(--parchment)" }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Back to Gallery */}
          <Link
            href="/gallery"
            className="font-sans-light animated-underline inline-block mb-12"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--sepia)",
            }}
          >
            ← Back to Gallery
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Images column */}
            <div className="flex flex-col gap-4">
              {/* Main image */}
              <div className="relative">
                <Image
                  src={piece.image}
                  alt={piece.title}
                  width={1000}
                  height={1000}
                  priority
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Detail images, if any */}
              {piece.detailImages && piece.detailImages.length > 0 && (
                <>
                  <p
                    className="font-sans-light mt-4"
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "var(--amber)",
                    }}
                  >
                    Detail views
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {piece.detailImages.map((src, i) => (
                      <Image
                        key={src}
                        src={src}
                        alt={`${piece.title} detail ${i + 1}`}
                        width={600}
                        height={600}
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Text column */}
            <div>
              {/* Availability */}
              <p
                className="font-sans-light mb-3"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: piece.available ? "var(--amber)" : "var(--sepia)",
                }}
              >
                {piece.available ? "Available" : "Sold"}
              </p>

              {/* Title */}
              <h1
                className="font-display mb-5"
                style={{
                  fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
                  fontWeight: 300,
                  color: "var(--ink)",
                  lineHeight: 1.05,
                }}
              >
                {piece.title}
              </h1>

              <div
                style={{
                  width: "48px",
                  height: "1px",
                  background: "var(--amber)",
                  marginBottom: "1.5rem",
                }}
              />

              {/* Medium / dimensions */}
              <p
                className="font-display mb-1"
                style={{
                  fontSize: "1rem",
                  color: "var(--ink-light)",
                  lineHeight: 1.6,
                }}
              >
                {piece.medium}
              </p>
              <p
                className="font-display mb-8"
                style={{
                  fontSize: "0.95rem",
                  color: "var(--sepia)",
                  lineHeight: 1.6,
                }}
              >
                {piece.dimensions}
                {piece.depth ? ` · ${piece.depth}` : ""}
              </p>

              {/* Description */}
              <p
                className="font-display mb-8"
                style={{
                  fontSize: "1.05rem",
                  color: "var(--ink-light)",
                  lineHeight: 1.85,
                  fontStyle: "italic",
                }}
              >
                {piece.description}
              </p>

              {/* Authenticity note */}
              <p
                className="font-sans-light mb-10"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "var(--sepia)",
                  borderTop: "1px solid rgba(107, 90, 62, 0.2)",
                  paddingTop: "1rem",
                }}
              >
                Includes original artwork stamp & certificate of authenticity.
              </p>

              {/* CTA: swap Inquire → Purchase at Orleans when piece is represented */}
              {orleansUrl ? (
                <a
                  href={orleansUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleOrleansClick}
                  className="font-sans-light"
                  style={{
                    display: "inline-block",
                    padding: "1rem 2.25rem",
                    background: "var(--ink)",
                    color: "var(--parchment)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    transition: "background 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.background =
                      "var(--amber)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.background = "var(--ink)")
                  }
                >
                  Purchase at Orleans Gallery →
                </a>
              ) : (
                <Link
                  href="/contact"
                  className="font-sans-light"
                  style={{
                    display: "inline-block",
                    padding: "1rem 2.25rem",
                    background: "var(--ink)",
                    color: "var(--parchment)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    transition: "background 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.background =
                      "var(--amber)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.background = "var(--ink)")
                  }
                >
                  Inquire About This Piece
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
