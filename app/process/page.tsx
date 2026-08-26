import Image from "next/image";

import { getProcessPage } from "@/sanity/lib/content";

export default async function ProcessPage() {
  const content = await getProcessPage();

  return (
    <div style={{ background: "var(--parchment)", minHeight: "100vh" }}>
      <section className="px-8 pb-16 pt-40 text-center">
        <p className="section-eyebrow mb-4">{content.eyebrow}</p>
        <h1 className="page-title">{content.title}</h1>
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
          {content.intro}
        </p>
      </section>

      {content.heroImage && (
        <div className="relative mx-auto mb-20 aspect-[16/7] max-w-5xl overflow-hidden">
          <Image
            src={content.heroImage.src}
            alt={content.heroImage.alt}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      )}

      <section className="px-8 pb-24">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {content.steps.map((step) => (
            <article
              key={step.number}
              className="p-8"
              style={{ background: "var(--parchment-dark)" }}
            >
              {step.image && (
                <div className="relative mb-8 aspect-square overflow-hidden">
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <p
                className="font-sc mb-3"
                style={{ fontSize: "1.75rem", color: "var(--amber)" }}
              >
                {step.number}
              </p>
              <h2
                className="font-display mb-4"
                style={{ fontSize: "1.3rem", color: "var(--ink)" }}
              >
                {step.title}
              </h2>
              <p
                className="font-display"
                style={{
                  fontSize: "1rem",
                  color: "var(--ink-light)",
                  lineHeight: 1.9,
                }}
              >
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-8 pb-24 text-center">
        <blockquote
          className="font-display mx-auto max-w-2xl"
          style={{
            fontSize: "1.35rem",
            fontStyle: "italic",
            color: "var(--sepia)",
            lineHeight: 1.8,
          }}
        >
          “{content.quote}”
        </blockquote>
      </section>
    </div>
  );
}
