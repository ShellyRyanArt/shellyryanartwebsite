import Image from "next/image";
import Link from "next/link";

import { getAboutPage } from "@/sanity/lib/content";

export default async function AboutPage() {
  const content = await getAboutPage();

  return (
    <>
      <section
        className="px-8 pb-16 pt-40 text-center"
        style={{ background: "var(--parchment)" }}
      >
        <p className="section-eyebrow mb-4">{content.eyebrow}</p>
        <h1 className="page-title">{content.title}</h1>
        <div className="divider mt-6" />
      </section>

      <section
        className="px-8 py-20"
        style={{ background: "var(--parchment)" }}
      >
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-16 md:grid-cols-2">
          <figure className="relative mx-auto max-w-sm md:mx-0">
            <Image
              src={content.portrait.src}
              alt={content.portrait.alt}
              width={800}
              height={1000}
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ width: "100%", height: "auto" }}
              priority
            />
            {content.portrait.caption && (
              <figcaption
                className="font-sans-light mt-3 text-center"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--sepia)",
                }}
              >
                {content.portrait.caption}
              </figcaption>
            )}
          </figure>

          <div>
            <h2
              className="font-display mb-6"
              style={{
                fontSize: "2rem",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--ink)",
                lineHeight: 1.2,
              }}
            >
              {content.introHeading}
            </h2>
            <div
              className="mb-8 h-px w-10"
              style={{ background: "var(--amber)" }}
            />
            {content.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="font-display mb-6"
                style={{
                  fontSize: "1.15rem",
                  color: "var(--ink-light)",
                  lineHeight: 1.9,
                  fontWeight: 300,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-8 py-20"
        style={{ background: "var(--parchment-dark)" }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <blockquote
            className="font-display"
            style={{
              fontSize: "1.3rem",
              fontStyle: "italic",
              color: "var(--sepia)",
              lineHeight: 1.8,
            }}
          >
            “{content.quote}”
          </blockquote>
          <div className="divider mt-8" />
          <Link href="/process" className="button-outline mt-10">
            See the process
          </Link>
        </div>
      </section>
    </>
  );
}
