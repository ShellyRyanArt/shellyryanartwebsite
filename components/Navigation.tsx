"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { SiteImage } from "@/content/types";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation({ logo }: { logo: SiteImage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        backgroundColor:
          scrolled || menuOpen ? "rgba(244,239,228,.97)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(107,90,62,.15)" : "none",
        padding: scrolled ? ".75rem 2rem" : "1.5rem 2rem",
      }}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between"
        aria-label="Main navigation"
      >
        <Link href="/" aria-label="Shelly Ryan Art home">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={180}
            height={72}
            style={{
              height: scrolled ? "44px" : "56px",
              width: "auto",
              transition: "height .4s ease",
            }}
            priority
          />
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </div>
        <button
          className="font-sans-light md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          style={{
            fontSize: ".65rem",
            letterSpacing: ".2em",
            textTransform: "uppercase",
          }}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>
      {menuOpen && (
        <div
          id="mobile-menu"
          className="mt-3 flex flex-col gap-6 border-t px-4 py-6 md:hidden"
          style={{ borderColor: "rgba(107,90,62,.2)" }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-base"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
