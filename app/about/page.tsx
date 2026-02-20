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
      <section
        className="py-20 px-8"
        style={{ background: "var(--parchment)" }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Featured artwork as portrait stand-in */}
          <div className="relative">
            <Image
              src="/images/gallery/bee.jpg"
              alt="Featured Work — Honeybee"
              width={600}
              height={630}
              style={{ width: "100%", height: "auto" }}
            />
            <p
              className="mt-3 font-sans-light text-center"
              style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sepia)" }}
            >
              Honeybee · Acrylic on Vintage Dictionary Page
            </p>
          </div>

          {/* Bio text */}
          <div>
            <h2
              className="font-display mb-6"
              style={{ fontSize: "2rem", fontWeight: 300, fontStyle: "italic", color: "var(--ink)", lineHeight: 1.2 }}
            >
              Where nature meets the written word
            </h2>
            <div
              style={{ width: "40px", height: "1px", background: "var(--amber)", marginBottom: "2rem" }}
            />
            <p
              className="font-display mb-6"
              style={{ fontSize: "1.15rem", color: "var(--ink-light)", lineHeight: 1.9, fontWeight: 300 }}
            >
              Shelly Ryan is an artist whose work lives at the intersection of language and the natural world. Her signature Dictionary Series features hyperrealistic animals and insects rendered in acrylic atop the densely typeset pages of vintage dictionaries.
            </p>
            <p
              className="font-display mb-6"
              style={{ fontSize: "1.15rem", color: "var(--ink-light)", lineHeight: 1.9, fontWeight: 300 }}
            >
              The dictionary page — with its columns of definitions, etymologies, and cross-references — becomes a landscape in itself. A pelican rises from a page defining words beginning with the letter P. A honeybee hovers above entries for human industry and sweetness. The juxtaposition is deliberate: no dictionary can fully contain what it means to be alive.
            </p>
            <p
              className="font-display"
              style={{ fontSize: "1.15rem", color: "var(--ink-light)", lineHeight: 1.9, fontWeight: 300 }}
            >
              Each piece is one of a kind — painted on a specific, unrepeatable page — making every original a dual artifact of human knowledge and artistic vision.
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
                Commission a Piece
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process section */}
      <section
        className="py-24 px-8"
        style={{ background: "var(--parchment-dark)" }}
      >
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
            Found pages, painted worlds
          </h2>
          <div className="divider mb-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mt-12">
            {[
              {
                number: "01",
                title: "The Page",
                body: "Each work begins with a sourced page from a vintage dictionary — selected for its age, density of text, and the resonance between the words on the page and the subject to be painted.",
              },
              {
                number: "02",
                title: "The Study",
                body: "Shelly works from detailed observation and reference, building an intimate understanding of her subject before the first brushstroke touches the dictionary's aged surface.",
              },
              {
                number: "03",
                title: "The Painting",
                body: "Acrylic paint is layered with precision, allowing the underlying text to breathe through in places — a deliberate dialogue between the written and the observed.",
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
    </>
  );
}
