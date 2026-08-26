import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shelly Ryan Art",
  description: "Original fine art by Shelly Ryan — hyperrealistic animals and nature subjects in hand cut paper collage on vintage dictionary pages.",
  keywords: "Shelly Ryan, art, original paintings, hyperrealism, dictionary art, nature art",
  openGraph: {
    title: "Shelly Ryan Art",
    description: "Original fine art in hand cut paper collage on vintage dictionary pages.",
    url: "https://shellyryan.art",
    siteName: "Shelly Ryan Art",
    type: "website",
  },
  twitter: {
    title: "Shelly Ryan Art",
    description: "Original fine art in hand cut paper collage on vintage dictionary pages.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
