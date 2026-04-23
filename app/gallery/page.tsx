import Image from "next/image";
import Link from "next/link";

const artworks = [
  { slug: "saint-of-the-southern-hive", src: "/images/gallery/bee.jpg", title: "Saint of the Southern Hive" },
  { slug: "the-gulf-sentinel", src: "/images/gallery/pelican.jpg", title: "The Gulf Sentinel" },
  { slug: "la-tentation", src: "/images/gallery/temptation.jpg", title: "La Tentation" },
  { slug: "la-truite", src: "/images/gallery/trout.jpg", title: "La Truite" },
  { slug: "les-huitres", src: "/images/gallery/oyster.jpg", title: "Les Huitres" },
  { slug: "mascot-of-the-gulf-coast", src: "/images/gallery/cricket.jpg", title: "Mascot of the Gulf Coast" },
];

export default function GalleryPage() {
  return (
    <div style={{ background: "var(--parchment)", minHeight: "100vh" }}>
      <section className="pt-40 pb-16 px-8 text-center">
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

      <section className="px-8 pb-32">
        <div className="mx-auto grid grid-cols-1 gap-16" style={{ maxWidth: "380px" }}>
          {artworks.map((work) => (
            <Link
              key={work.slug}
              href={`/gallery/${work.slug}`}
              style={{ display: "block", textDecoration: "none" }}
            >
              <Image
                src={work.src}
                alt={work.title}
                width={380}
                height={380}
                style={{ width: "100%", height: "auto", display: "block", maxWidth: "380px" }}
              />
              <div
                style={{
                  paddingTop: "0.6rem",
                  paddingBottom: "2.5rem",
                  textAlign: "center",
                  borderBottom: "1px solid var(--parchment-deeper)",
                }}
              >
                <p
                  className="font-display"
                  style={{ fontSize: "0.9rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1.3 }}
                >
                  {work.title}
                </p>
                <p
                  className="font-sans-light mt-1"
                  style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)" }}
                >
                  View →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <p
            className="font-display"
            style={{ fontSize: "1.1rem", fontStyle: "italic", color: "var(--sepia)" }}
          >
            More works available — inquire for the full collection
          </p>
          <Link
            href="/contact"
            className="font-sans-light mt-4 inline-block animated-underline"
            style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            Contact Shelly
          </Link>
        </div>
      </section>
    </div>
  );
}
