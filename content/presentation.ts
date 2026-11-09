import type { Artwork } from "@/content/types";

export function getArtworkCta(artwork: Artwork) {
  if (!artwork.isVisible || artwork.availability === "not-for-sale") {
    return null;
  }

  // Sold work keeps its gallery link so visitors can see it there, but never
  // falls back to the "Ask about this piece" contact prompt.
  if (artwork.availability === "sold" && !artwork.purchaseUrl) {
    return null;
  }

  if (artwork.purchaseUrl) {
    return {
      href: artwork.purchaseUrl,
      label:
        artwork.purchaseButtonLabel ||
        `View at ${artwork.galleryName || "gallery"}`,
      external: true,
    };
  }

  return { href: "/contact", label: "Ask about this piece", external: false };
}

export function getVisiblePrice(artwork: Artwork) {
  if (!artwork.showPrice || typeof artwork.price !== "number") return null;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(artwork.price);
}

// Sold work shows no status label on the site; the gallery page reports it.
export function getAvailabilityLabel(
  availability: Artwork["availability"],
): string | null {
  return {
    available: "Available",
    reserved: "Reserved",
    sold: null,
    "not-for-sale": "Not for sale",
  }[availability];
}
