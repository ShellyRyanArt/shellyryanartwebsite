import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Shelly Ryan Art",
  description: "Original fine art by Shelly Ryan — hyperrealistic animals and nature subjects painted on vintage dictionary pages.",
  keywords: "Shelly Ryan, art, original paintings, hyperrealism, dictionary art, nature art",
  openGraph: {
    title: "Shelly Ryan Art",
    description: "Original fine art painted on vintage dictionary pages.",
    url: "https://shellyryan.art",
    siteName: "Shelly Ryan Art",
    type: "website",
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
