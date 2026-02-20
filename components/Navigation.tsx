"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(244, 239, 228, 0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(107, 90, 62, 0.15)" : "none",
        padding: scrolled ? "0.75rem 2rem" : "1.5rem 2rem",
      }}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="block" style={{ opacity: scrolled ? 1 : 0.95 }}>
          <Image
            src="/images/logo/shelly-ryan-logo-transparent.png"
            alt="Shelly Ryan Art"
            width={180}
            height={72}
            style={{ height: scrolled ? "44px" : "56px", width: "auto", transition: "height 0.4s ease" }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/gallery" className="nav-link">Gallery</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-px transition-all duration-300" style={{ background: "var(--ink)", transform: menuOpen ? "rotate(45deg) translate(2px, 2px)" : "" }} />
          <span className="block w-6 h-px transition-all duration-300" style={{ background: "var(--ink)", opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-6 h-px transition-all duration-300" style={{ background: "var(--ink)", transform: menuOpen ? "rotate(-45deg) translate(2px, -2px)" : "" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-8 py-6 flex flex-col gap-6 border-t mt-2" style={{ borderColor: "rgba(107, 90, 62, 0.2)", background: "rgba(244, 239, 228, 0.98)" }}>
          {["Home", "Gallery", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="nav-link text-base"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
