import type { Metadata, Viewport } from "next";
import { redirect } from "next/navigation";

import { studioUrl } from "@/sanity/env";

export const metadata: Metadata = {
  title: "Shelly Ryan Art Studio",
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function StudioPage() {
  if (studioUrl) {
    redirect(studioUrl);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        background: "#f4efe4",
      }}
    >
      <section
        style={{
          maxWidth: "42rem",
          padding: "3rem",
          background: "#faf7f2",
          color: "#1a1714",
          fontFamily: "Georgia, serif",
        }}
      >
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          Studio setup is almost complete
        </h1>
        <p style={{ lineHeight: 1.7 }}>
          Deploy the editing studio once with <code>npm run sanity:deploy</code>
          , then add its address as <code>NEXT_PUBLIC_SANITY_STUDIO_URL</code>.
          This shortcut will send Shelly directly to the code-free editor.
        </p>
      </section>
    </div>
  );
}
