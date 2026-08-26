import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getArtworks, getCollectionBySlug } from "@/sanity/lib/content";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [collection, allArtworks] = await Promise.all([
    getCollectionBySlug(slug),
    getArtworks(),
  ]);
  if (!collection) notFound();
  const artworks = allArtworks.filter((artwork) =>
    artwork.collectionSlugs.includes(slug),
  );

  return (
    <div style={{ background: "var(--parchment)", minHeight: "100vh" }}>
      <section className="relative px-8 pb-20 pt-40 text-center">
        {collection.heroImage && (
          <div className="relative mx-auto mb-12 aspect-[16/7] max-w-5xl overflow-hidden">
            <Image
              src={collection.heroImage.src}
              alt={collection.heroImage.alt}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        )}
        <p className="section-eyebrow mb-4">Collection</p>
        <h1 className="page-title">{collection.title}</h1>
        <div className="divider mt-6" />
        <p
          className="font-display mx-auto mt-6 max-w-2xl"
          style={{
            fontSize: "1.15rem",
            fontStyle: "italic",
            color: "var(--sepia)",
            lineHeight: 1.8,
          }}
        >
          {collection.description}
        </p>
      </section>

      <section className="px-8 pb-32">
        {artworks.length ? (
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {artworks.map((artwork) => (
              <Link
                key={artwork.id}
                href={`/gallery/${artwork.slug}`}
                className="artwork-card text-center"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={artwork.mainImage.src}
                    alt={artwork.mainImage.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h2
                  className="font-display mt-4"
                  style={{ fontSize: "1.05rem" }}
                >
                  {artwork.title}
                </h2>
              </Link>
            ))}
          </div>
        ) : (
          <p
            className="font-display text-center"
            style={{ fontSize: "1.15rem", color: "var(--sepia)" }}
          >
            Works will be added to this collection soon.
          </p>
        )}
        <div className="mt-20 text-center">
          <Link href="/gallery" className="button-link">
            ← All artwork
          </Link>
        </div>
      </section>
    </div>
  );
}
