import Image from "next/image";
import Link from "next/link";

import { getArtworks, getCollections } from "@/sanity/lib/content";

export default async function GalleryPage() {
  const [artworks, collections] = await Promise.all([
    getArtworks(),
    getCollections(),
  ]);

  return (
    <div style={{ background: "var(--parchment)", minHeight: "100vh" }}>
      <section className="px-8 pb-16 pt-40 text-center">
        <p className="section-eyebrow mb-4">Original Works</p>
        <h1 className="page-title">Gallery</h1>
        <div className="divider mt-6" />
        <p
          className="font-display mx-auto mt-6 max-w-xl"
          style={{
            fontSize: "1.1rem",
            fontStyle: "italic",
            color: "var(--sepia)",
            lineHeight: 1.8,
          }}
        >
          Each work is a hand cut paper collage — built from magazine fragments
          and layered by hand onto pages from vintage dictionaries.
        </p>
      </section>

      {collections.length > 0 && (
        <nav
          aria-label="Collections"
          className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3 px-8 pb-16"
        >
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="collection-chip"
            >
              {collection.title}
            </Link>
          ))}
        </nav>
      )}

      <section className="px-8 pb-32">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork) => (
            <Link
              key={artwork.id}
              href={`/gallery/${artwork.slug}`}
              className="artwork-card"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={artwork.mainImage.src}
                  alt={artwork.mainImage.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                className="border-b px-2 pb-8 pt-4 text-center"
                style={{ borderColor: "var(--parchment-deeper)" }}
              >
                <h2
                  className="font-display"
                  style={{ fontSize: "1.05rem", color: "var(--ink)" }}
                >
                  {artwork.title}
                </h2>
                <p
                  className="font-sans-light mt-2"
                  style={{
                    fontSize: "0.55rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--amber)",
                  }}
                >
                  View work →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
