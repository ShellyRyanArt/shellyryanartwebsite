import Image from "next/image";
import Link from "next/link";

import type { SiteSettings } from "@/content/types";

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer
      className="px-8 py-16"
      style={{
        borderTop: "1px solid rgba(107,90,62,.2)",
        background: "var(--parchment-dark)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        {settings.newsletterSignupUrl && (
          <section className="mb-14 text-center">
            <h2 className="font-display mb-3 text-3xl">
              {settings.newsletterHeading || "Studio notes"}
            </h2>
            {settings.newsletterBody && (
              <p
                className="font-display mx-auto mb-6 max-w-xl"
                style={{ color: "var(--sepia)" }}
              >
                {settings.newsletterBody}
              </p>
            )}
            <a
              href={settings.newsletterSignupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button-outline"
            >
              Join the email list
            </a>
          </section>
        )}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <Image
            src={settings.logo.src}
            alt={settings.logo.alt}
            width={140}
            height={56}
            style={{ height: "40px", width: "auto", opacity: 0.8 }}
          />
          <nav
            className="flex flex-wrap items-center justify-center gap-6"
            aria-label="Footer navigation"
          >
            <Link href="/gallery" className="nav-link">
              Gallery
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/process" className="nav-link">
              Process
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
            {settings.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                Instagram
              </a>
            )}
          </nav>
        </div>
        <div className="divider my-10" />
        <div className="text-center">
          <p
            className="font-sans-light"
            style={{
              fontSize: ".65rem",
              letterSpacing: ".15em",
              color: "var(--sepia)",
              textTransform: "uppercase",
            }}
          >
            © {new Date().getFullYear()} {settings.footerCopyright}
          </p>
          <p
            className="font-sans-light mt-2"
            style={{
              fontSize: ".65rem",
              letterSpacing: ".12em",
              color: "var(--sepia)",
              textTransform: "uppercase",
            }}
          >
            {settings.footerArtworkNotice}
          </p>
        </div>
      </div>
    </footer>
  );
}
