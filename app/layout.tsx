import type { Metadata } from "next";

import "./globals.css";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { getSiteSettings } from "@/sanity/lib/content";

// The public site is CMS-driven. Render requests dynamically so published
// Sanity edits appear without requiring a GitHub or Cloudflare redeploy.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shelly Ryan Art",
  description:
    "Original fine art by Shelly Ryan — hyperrealistic animals and nature subjects in hand cut paper collage on vintage dictionary pages.",
  keywords:
    "Shelly Ryan, art, hand cut paper collage, Gulf Coast art, nature art",
  openGraph: {
    title: "Shelly Ryan Art",
    description:
      "Original fine art in hand cut paper collage on vintage dictionary pages.",
    url: "https://shellyryan.art",
    siteName: "Shelly Ryan Art",
    type: "website",
  },
  twitter: {
    title: "Shelly Ryan Art",
    description:
      "Original fine art in hand cut paper collage on vintage dictionary pages.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  return (
    <html lang="en">
      <body>
        <Navigation logo={settings.logo} />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
