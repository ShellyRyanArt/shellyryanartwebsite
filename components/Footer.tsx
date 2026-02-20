import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="py-16 px-8"
      style={{ borderTop: "1px solid rgba(107, 90, 62, 0.2)", background: "var(--parchment-dark)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <Image
            src="/images/logo/shelly-ryan-logo-transparent.png"
            alt="Shelly Ryan Art"
            width={140}
            height={56}
            style={{ height: "40px", width: "auto", opacity: 0.8 }}
          />

          {/* Nav */}
          <div className="flex items-center gap-8">
            {["Gallery", "About", "Contact"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="nav-link">
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 divider" />

        <div className="text-center">
          <p
            className="font-sans-light"
            style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--sepia)", textTransform: "uppercase" }}
          >
            © {new Date().getFullYear()} Shelly Ryan Art — All Rights Reserved
          </p>
          <p
            className="mt-2 font-sans-light"
            style={{ fontSize: "0.65rem", letterSpacing: "0.12em", color: "var(--parchment-deeper)", textTransform: "uppercase" }}
          >
            All artwork is original and may not be reproduced without permission
          </p>
        </div>
      </div>
    </footer>
  );
}
