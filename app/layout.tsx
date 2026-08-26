import type { Metadata } from "next";

import "./globals.css";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { getSiteSettings } from "@/sanity/lib/content";

export const metadata: Metadata = {
  title: "Shelly Ryan Art",
  description: "Original fine art and hand cut paper collage by Shelly Ryan.",
  keywords:
    "Shelly Ryan, art, hand cut paper collage, Gulf Coast art, nature art",
  openGraph: {
    title: "Shelly Ryan Art",
    description: "Original fine art and hand cut paper collage by Shelly Ryan.",
    type: "website",
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
