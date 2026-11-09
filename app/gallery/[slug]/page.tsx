import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getArtworkCta,
  getAvailabilityLabel,
  getVisiblePrice,
} from "@/content/presentation";
import { getArtworkBySlug } from "@/sanity/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);
  return artwork
    ? {
        title: `${artwork.title} | Shelly Ryan Art`,
        description: artwork.description,
      }
    : {};
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);
  if (!artwork) notFound();

  const cta = getArtworkCta(artwork);
  const price = getVisiblePrice(artwork);
  const availabilityLabel = getAvailabilityLabel(artwork.availability);

  return (
    <div style={{ background: "var(--parchment)", minHeight: "100vh" }}>
      <section className="px-8 pb-10 pt-40 text-center">
        {availabilityLabel && (
          <p className="section-eyebrow mb-4">{availabilityLabel}</p>
        )}
        <h1 className="page-title">{artwork.title}</h1>
        <div className="divider mt-6" />
      </section>

      <section className="px-8 pb-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
          <div>
            <figure>
              <Image
                src={artwork.mainImage.src}
                alt={artwork.mainImage.alt}
                width={1200}
                height={1200}
                sizes="(max-width: 768px) 100vw, 60vw"
                style={{ width: "100%", height: "auto", display: "block" }}
                priority
              />
              {artwork.mainImage.caption && (
                <ImageCaption>{artwork.mainImage.caption}</ImageCaption>
              )}
            </figure>

            {/* Close-ups sit in a row of small squares under the full piece.
                Only close-ups are cropped; the main image is always shown whole. */}
            {artwork.detailImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {artwork.detailImages.map((image, index) => (
                  <figure key={`${image.src}-${index}`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={600}
                      height={600}
                      sizes="(max-width: 768px) 50vw, 30vw"
                      style={{
                        width: "100%",
                        height: "auto",
                        aspectRatio: "1 / 1",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    {image.caption && (
                      <ImageCaption>{image.caption}</ImageCaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>

          <aside className="md:sticky md:top-32">
            <p className="section-eyebrow mb-2">{artwork.medium}</p>
            <p
              className="font-sans-light mb-1"
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                color: "var(--sepia)",
              }}
            >
              {artwork.dimensions}
              {artwork.year ? ` · ${artwork.year}` : ""}
            </p>
            {artwork.depth && (
              <p
                className="font-sans-light mb-6"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  color: "var(--sepia)",
                }}
              >
                {artwork.depth}
              </p>
            )}
            <div
              className="mb-6 h-px w-10"
              style={{ background: "var(--amber)" }}
            />
            <p
              className="font-display mb-8"
              style={{
                fontSize: "1.1rem",
                color: "var(--ink-light)",
                lineHeight: 1.9,
                fontWeight: 300,
              }}
            >
              {artwork.description}
            </p>
            {price && (
              <p
                className="font-display mb-6"
                style={{ fontSize: "1.4rem", color: "var(--ink)" }}
              >
                {price}
              </p>
            )}
            {artwork.certificateNote && (
              <p
                className="font-sans-light mb-8 border-t pt-4"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "var(--sepia)",
                  textTransform: "uppercase",
                  borderColor: "rgba(107,90,62,.2)",
                }}
              >
                {artwork.certificateNote}
              </p>
            )}
            {cta &&
              (cta.external ? (
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary"
                >
                  {cta.label} →
                </a>
              ) : (
                <Link href={cta.href} className="button-primary">
                  {cta.label}
                </Link>
              ))}
          </aside>
        </div>
        <div className="mt-20 text-center">
          <Link href="/gallery" className="button-link">
            ← Back to Gallery
          </Link>
        </div>
      </section>
    </div>
  );
}

function ImageCaption({ children }: { children: ReactNode }) {
  return (
    <figcaption
      className="font-sans-light mt-2 text-center"
      style={{ fontSize: "0.65rem", color: "var(--sepia)" }}
    >
      {children}
    </figcaption>
  );
}
