import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
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
          The Artist
        </p>
        <h1
          className="font-display"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: "var(--ink)", lineHeight: 1.1 }}
        >
          About Shelly
        </h1>
        <div className="mt-6 divider" />
      </section>

      {/* Bio section */}
      <section className="py-20 px-8" style={{ background: "var(--parchment)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Featured artwork */}
          <div className="relative">
            <Image
              src="/images/gallery/bee.jpg"
              alt="Honeybee — Hand Cut Paper Collage on Vintage Dictionary Page"
              width={600}
              height={630}
              style={{ width: "100%", height: "auto" }}
            />
            <p
              className="mt-3 font-sans-light text-center"
              style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sepia)" }}
            >
              Honeybee · Hand Cut Paper Collage on Vintage Dictionary Page
            </p>
          </div>

          {/* Bio text */}
          <div>
            <h2
              className="font-display mb-6"
              style={{ fontSize: "2rem", fontWeight: 300, fontStyle: "italic", color: "var(--ink)", lineHeight: 1.2 }}
            >
              Where nature meets the written word — one cut piece at a time
            </h2>
            <div style={{ width: "40px", height: "1px", background: "var(--amber)", marginBottom: "2rem" }} />
            <p
              className="font-display mb-6"
              style={{ fontSize: "1.15rem", color: "var(--ink-light)", lineHeight: 1.9, fontWeight: 300 }}
            >
              Shelly Ryan is a collage artist whose work lives at the intersection of language and the natural world. Her signature Dictionary Series features hyperrealistic animals and insects built entirely from hand cut pieces of magazine pages, layered by hand onto the densely typeset pages of vintage dictionaries.
            </p>
            <p
              className="font-display mb-6"
              style={{ fontSize: "1.15rem", color: "var(--ink-light)", lineHeight: 1.9, fontWeight: 300 }}
            >
              Every piece begins with Shelly sitting with stacks of magazines — patiently sourcing the exact colors, textures, and tones she needs. A wing might come from a fashion spread. A beak from a travel photograph. The iridescent shimmer of an insect from a cosmetics advertisement. Each fragment is chosen, cut by hand, and placed with intention.
            </p>
            <p
              className="font-display"
              style={{ fontSize: "1.15rem", color: "var(--ink-light)", lineHeight: 1.9, fontWeight: 300 }}
            >
              The dictionary page beneath is never just a background — it is a collaborator. A pelican rises from a page of words beginning with P. A bee hovers above definitions of industry and sweetness. The juxtaposition is deliberate: no dictionary can fully contain what it means to be alive, and no magazine image alone can capture the wildness of nature. Together, they come close.
            </p>

            <div className="mt-10">
              <Link
                href="/contact"
                className="font-sans-light"
                style={{
                  display: "inline-block",
                  padding: "0.875rem 2.5rem",
                  background: "var(--ink)",
                  color: "var(--parchment)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  transition: "background 0.3s ease",
                }}
              >
                Inquire About This Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="py-24 px-8" style={{ background: "var(--parchment-dark)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="font-sans-light mb-4"
            style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            The Process
          </p>
          <h2
            className="font-display mb-8"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", fontWeight: 300, color: "var(--ink)", lineHeight: 1.2 }}
          >
            Entirely made by hand
          </h2>
          <div className="divider mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mt-12">
            {[
              {
                number: "01",
                title: "The Hunt",
                body: "Shelly begins each piece by sitting with magazines — searching for the precise colors, textures, and tones she needs. A single piece might require sourcing fragments from dozens of magazines before the right ones are found.",
              },
              {
                number: "02",
                title: "The Cut",
                body: "Every element is hand cut — no digital tools, no machines. Tiny pieces are trimmed with scissors and blades, shaped to follow the contours of feathers, fur, and wings. It is slow, meditative, intentional work.",
              },
              {
                number: "03",
                title: "The Collage",
                body: "Fragments are layered onto a page sourced from a vintage dictionary — building the subject piece by piece, color by color, until a living creature emerges from the language of a world that tried to define it.",
              },
            ].map((step) => (
              <div key={step.number}>
                <p
                  className="font-sc mb-3"
                  style={{ fontSize: "1.75rem", fontWeight: 300, color: "var(--amber)", letterSpacing: "0.1em" }}
                >
                  {step.number}
                </p>
                <h3
                  className="font-display mb-4"
                  style={{ fontSize: "1.3rem", fontWeight: 400, color: "var(--ink)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-display"
                  style={{ fontSize: "1rem", color: "var(--ink-light)", lineHeight: 1.9, fontWeight: 300 }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Handmade note */}
      <section className="py-20 px-8" style={{ background: "var(--parchment)" }}>
        <div className="max-w-xl mx-auto text-center">
          <p
            className="font-display"
            style={{ fontSize: "1.3rem", fontStyle: "italic", color: "var(--sepia)", lineHeight: 1.8 }}
          >
            "Each piece is designed to be discovered. From a distance, the work appears almost photographic — a pelican, a bee, a cricket rendered with startling realism. Step closer and the illusion gives way to something more intimate: hundreds of tiny hand cut fragments of magazine paper, each one chosen for its color, texture, and tone. Stay a little longer, and the background beneath begins to speak — details and layers that only reveal themselves to those who take the time to look."
          </p>
          <div className="mt-8 divider" />
        </div>
      </section>
    </>
  );
}
