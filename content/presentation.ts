import type { Artwork } from "@/content/types";

export function getArtworkCta(artwork: Artwork) {
  if (
    !artwork.isVisible ||
    artwork.availability === "sold" ||
    artwork.availability === "not-for-sale"
  ) {
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

export function getAvailabilityLabel(availability: Artwork["availability"]) {
  return {
    available: "Available",
    reserved: "Reserved",
    sold: "Sold",
    "not-for-sale": "Not for sale",
  }[availability];
}
