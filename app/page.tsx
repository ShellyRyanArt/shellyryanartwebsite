"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const featuredWorks = [
  {
    src: "/images/gallery/bee.jpg",
    title: "Honeybee",
    medium: "Hand Cut Paper Collage",
    year: "2024",
  },
  {
    src: "/images/gallery/pelican.jpg",
    title: "Pelican",
    medium: "Hand Cut Paper Collage",
    year: "2024",
  },
  {
    src: "/images/gallery/cricket.jpg",
    title: "Cricket",
    medium: "Hand Cut Paper Collage",
    year: "2024",
  },
];

export default function HomePage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => { clearTimeout(timer); window.removeEventListener("scroll", handleScroll); };
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "100vh", background: "var(--parchment)" }}
      >
        {/* Subtle dictionary texture background */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Ctext x='0' y='14' font-size='11' font-family='Georgia' fill='%231A1714' opacity='0.8'%3Eabound v. 1. to be present in great quantity. 2. to be fully supplied. — abounding adj.%3C/text%3E%3Ctext x='0' y='28' font-size='11' font-family='Georgia' fill='%231A1714' opacity='0.8'%3Eacquire v. to come into possession of; gain. — acquisition n.%3C/text%3E%3Ctext x='0' y='42' font-size='11' font-family='Georgia' fill='%231A1714' opacity='0.8'%3Ebeautiful adj. pleasing to the senses or mind. — beautifully adv.%3C/text%3E%3Ctext x='0' y='56' font-size='11' font-family='Georgia' fill='%231A1714' opacity='0.8'%3Ecreate v. to cause to come into being; make. — creation n. — creative adj.%3C/text%3E%3Ctext x='0' y='70' font-size='11' font-family='Georgia' fill='%231A1714' opacity='0.8'%3Edelicate adj. fine in texture or structure; intricate. — delicately adv.%3C/text%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        />

        {/* Main hero content */}
        <div
          className="relative z-10 text-center px-8"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1.2s ease, transform 1.2s ease",
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/logo/shelly-ryan-logo-transparent.png"
              alt="Shelly Ryan Art"
              width={480}
              height={200}
              style={{ height: "auto", width: "min(480px, 80vw)" }}
              priority
            />
          </div>

          {/* Divider */}
          <div className="divider mb-8" />

          {/* Tagline */}
          <p
            className="font-sans-light mx-auto"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--sepia)",
              maxWidth: "360px",
              lineHeight: 2,
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1.4s ease 0.4s",
            }}
          >
            Original Fine Art · Hand Cut Paper Collage
          </p>

          {/* CTA */}
          <div
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1.4s ease 0.7s",
            }}
          >
            <Link
              href="/gallery"
              className="font-sans-light"
              style={{
                display: "inline-block",
                padding: "0.875rem 2.5rem",
                background: "var(--ink)",
                color: "var(--parchment)",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                transition: "background 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = "var(--amber)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "var(--ink)";
              }}
            >
              View Gallery
            </Link>
            <Link
              href="/about"
              className="font-sans-light animated-underline"
              style={{
                display: "inline-block",
                padding: "0.875rem 2.5rem",
                color: "var(--ink)",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              About the Artist
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: heroVisible ? 0.5 : 0,
            transition: "opacity 1.6s ease 1.2s",
          }}
        >
          <span
            className="font-sans-light"
            style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--sepia)" }}
          >
            Scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, var(--amber), transparent)",
              animation: "pulse 2s ease infinite",
            }}
          />
        </div>
      </section>

      {/* ── FEATURED WORKS ── */}
      <section
        className="py-24 px-8"
        style={{ background: "var(--ink)" }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <p
              className="font-sans-light mb-4"
              style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--amber-light)" }}
            >
              Selected Works
            </p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--parchment)", lineHeight: 1.2 }}
            >
              The Dictionary Series
            </h2>
            <div className="mt-6 divider" />
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {featuredWorks.map((work, i) => (
              <Link href="/gallery" key={i} className="art-card block group" style={{ aspectRatio: "1 / 1.1" }}>
                <Image
                  src={work.src}
                  alt={work.title}
                  width={600}
                  height={660}
                  className="art-card-img object-cover"
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
                <div className="art-card-overlay">
                  <p
                    className="font-sans-light mb-1"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--amber-light)" }}
                  >
                    {work.medium}
                  </p>
                  <h3
                    className="font-display"
                    style={{ fontSize: "1.6rem", fontWeight: 400, color: "var(--parchment)", lineHeight: 1.1 }}
                  >
                    {work.title}
                  </h3>
                  <p
                    className="font-sans-light mt-1"
                    style={{ fontSize: "0.65rem", color: "var(--parchment-deeper)", letterSpacing: "0.1em" }}
                  >
                    {work.year}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* View all */}
          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="font-sans-light"
              style={{
                display: "inline-block",
                padding: "0.875rem 3rem",
                border: "1px solid rgba(196, 168, 90, 0.4)",
                color: "var(--amber-light)",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = "rgba(196, 168, 90, 0.1)";
                (e.target as HTMLElement).style.borderColor = "var(--amber-light)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "transparent";
                (e.target as HTMLElement).style.borderColor = "rgba(196, 168, 90, 0.4)";
              }}
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ── ARTIST STATEMENT ── */}
      <section
        className="py-32 px-8 relative"
        style={{ background: "var(--parchment)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="font-sans-light mb-6"
            style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--amber)" }}
          >
            Artist Statement
          </p>
          <blockquote
            className="font-display"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--ink)",
              lineHeight: 1.6,
            }}
          >
            "Each collage lives on the page where language defines the world — a reminder that nature, too, defies definition."
          </blockquote>
          <div className="mt-8 divider" />
          <p
            className="mt-8 font-sans-light"
            style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sepia)" }}
          >
            — Shelly Ryan
          </p>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section
        className="py-24 px-8"
        style={{ background: "var(--parchment-dark)" }}
      >
        <div className="max-w-xl mx-auto text-center">
          <p
            className="font-sans-light mb-4"
            style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--sepia)" }}
          >
            Inquiries & Commissions
          </p>
          <h2
            className="font-display mb-6"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 300, color: "var(--ink)", lineHeight: 1.2 }}
          >
            Interested in a piece?
          </h2>
          <p
            className="font-display mb-10"
            style={{ fontSize: "1.1rem", fontStyle: "italic", color: "var(--sepia)", lineHeight: 1.8 }}
          >
            Original works and limited prints available. Commission inquiries welcome.
          </p>
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
            onMouseEnter={(e) => (e.target as HTMLElement).style.background = "var(--amber)"}
            onMouseLeave={(e) => (e.target as HTMLElement).style.background = "var(--ink)"}
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
