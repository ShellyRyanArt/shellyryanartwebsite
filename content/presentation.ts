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

// Gallery grouping: work that can still be bought comes first, then reserved,
// then sold and not-for-sale. Within each group the editor's display order
// (and then the title) is kept, so a piece moves down automatically when it
// is marked sold.
const availabilityRank: Record<Artwork["availability"], number> = {
  available: 0,
  reserved: 1,
  sold: 2,
  "not-for-sale": 2,
};

export function sortForGallery(artworks: Artwork[]): Artwork[] {
  return artworks
    .map((artwork, index) => ({ artwork, index }))
    .sort(
      (a, b) =>
        availabilityRank[a.artwork.availability] -
          availabilityRank[b.artwork.availability] || a.index - b.index,
    )
    .map(({ artwork }) => artwork);
}
