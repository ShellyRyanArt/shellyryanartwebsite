"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import type {
  Artwork,
  HomePageContent as HomeContent,
  SiteSettings,
} from "@/content/types";

export default function HomePageContent({
  content,
  featuredArtwork,
  settings,
}: {
  content: HomeContent;
  featuredArtwork: Artwork | null;
  settings: SiteSettings;
}) {
  const [heroVisible, setHeroVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setHeroVisible(true), 100);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "85vh", background: "var(--parchment)" }}
      >
        {content.heroImage && (
          <Image
            src={content.heroImage.src}
            alt={content.heroImage.alt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", opacity: 0.16 }}
          />
        )}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Ctext x='0' y='14' font-size='11' font-family='Georgia' fill='%231A1714'%3Eabound v. to be present in great quantity. — abounding adj.%3C/text%3E%3Ctext x='0' y='28' font-size='11' font-family='Georgia' fill='%231A1714'%3Eacquire v. to come into possession of; gain.%3C/text%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        />

        <div
          className="relative z-10 px-8 text-center"
          style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1.2s ease, transform 1.2s ease",
          }}
        >
          <div className="mb-8 flex justify-center">
            <Image
              src={settings.logo.src}
              alt={settings.logo.alt}
              width={480}
              height={200}
              style={{ height: "auto", width: "min(480px, 80vw)" }}
              priority
            />
          </div>
          <div className="divider mb-8" />
          <p
            className="font-sans-light mx-auto"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--sepia)",
              maxWidth: "380px",
              lineHeight: 2,
            }}
          >
            {content.heroTagline}
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/gallery" className="button-primary">
              View Gallery
            </Link>
            <Link href="/about" className="button-link">
              About the Artist
            </Link>
          </div>
        </div>
      </section>

      <section
        className="px-8 py-24"
        style={{ background: "var(--parchment)" }}
      >
        <div className="mx-auto max-w-sm text-center">
          <p className="section-eyebrow mb-4">{content.worksEyebrow}</p>
          <h2
            className="font-display mb-6"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              fontWeight: 300,
              color: "var(--ink)",
            }}
          >
            {content.worksHeading}
          </h2>
          <div className="divider mb-10" />
          {featuredArtwork && (
            <Link
              href={`/gallery/${featuredArtwork.slug}`}
              style={{ display: "inline-block" }}
            >
              <Image
                src={featuredArtwork.mainImage.src}
                alt={featuredArtwork.mainImage.alt}
                width={560}
                height={560}
                sizes="280px"
                style={{ width: "280px", height: "auto", display: "block" }}
              />
            </Link>
          )}
          <p
            className="font-display mb-10 mt-6"
            style={{
              fontSize: "1rem",
              fontStyle: "italic",
              color: "var(--sepia)",
              lineHeight: 1.7,
            }}
          >
            {content.worksBody}
          </p>
          <Link href="/gallery" className="button-outline">
            See All Works
          </Link>
        </div>
      </section>

      <section
        className="relative px-8 py-32"
        style={{ background: "var(--parchment)" }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow mb-6">Artist Statement</p>
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
            “{content.artistStatement}”
          </blockquote>
          <div className="divider mt-8" />
          <p
            className="font-display mt-10"
            style={{
              fontSize: "2rem",
              fontStyle: "italic",
              color: "var(--ink)",
            }}
          >
            — {content.artistStatementAttribution}
          </p>
        </div>
      </section>

      <section
        className="px-8 py-24"
        style={{ background: "var(--parchment-dark)" }}
      >
        <div className="mx-auto max-w-xl text-center">
          <h2
            className="font-display mb-6"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 300,
              color: "var(--ink)",
            }}
          >
            {content.contactHeading}
          </h2>
          <p
            className="font-display mb-10"
            style={{
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "var(--sepia)",
              lineHeight: 1.8,
            }}
          >
            {content.contactBody}
          </p>
          <Link href="/contact" className="button-primary">
            {content.contactButtonLabel}
          </Link>
        </div>
      </section>
    </>
  );
}
