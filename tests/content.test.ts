import { describe, expect, it } from "vitest";

import {
  fallbackArtworks,
  fallbackCollections,
  fallbackPages,
  fallbackSiteSettings,
} from "@/content/fallback";
import {
  getArtworkCta,
  getAvailabilityLabel,
  getVisiblePrice,
  sortForGallery,
} from "@/content/presentation";
import {
  mergePublishedContent,
  withDetailAltFallback,
} from "@/sanity/lib/content";

describe("migrated content snapshot", () => {
  it("keeps every artwork addressable with a unique slug and primary image", () => {
    expect(fallbackArtworks).toHaveLength(6);
    expect(new Set(fallbackArtworks.map((artwork) => artwork.slug)).size).toBe(
      fallbackArtworks.length,
    );

    for (const artwork of fallbackArtworks) {
      expect(artwork.title).toBeTruthy();
      expect(artwork.mainImage.src).toMatch(/^\/images\/gallery\//);
      expect(artwork.mainImage.alt).toBeTruthy();
    }
  });

  it("keeps page singletons and site settings available before Sanity is connected", () => {
    expect(fallbackPages.home.heroTagline).toContain("Hand Cut Paper Collage");
    expect(fallbackPages.about.body.length).toBeGreaterThan(2);
    expect(fallbackPages.process.steps).toHaveLength(3);
    expect(fallbackPages.contact.intro).toContain("Shelly");
    expect(fallbackSiteSettings.siteTitle).toBe("Shelly Ryan Art");
    expect(fallbackCollections.length).toBeGreaterThan(0);
  });

  it("keeps every artwork collection reference resolvable", () => {
    const collectionSlugs = new Set(
      fallbackCollections.map((collection) => collection.slug),
    );
    for (const artwork of fallbackArtworks) {
      for (const slug of artwork.collectionSlugs) {
        expect(collectionSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("fills unpublished optional fields without overwriting intentional blanks", () => {
    expect(
      mergePublishedContent(fallbackPages.contact, {
        eyebrow: "",
        title: "Get in touch",
        confirmationBody: null,
      }),
    ).toEqual({
      ...fallbackPages.contact,
      eyebrow: "",
      title: "Get in touch",
    });
  });
});

describe("artwork purchase presentation", () => {
  it("uses the gallery link and editor-supplied button label when available", () => {
    const artwork = fallbackArtworks[0];
    expect(getArtworkCta(artwork)).toEqual({
      href: artwork.purchaseUrl,
      label: artwork.purchaseButtonLabel,
      external: true,
    });
  });

  it("falls back to contact for an available work with no external URL", () => {
    expect(
      getArtworkCta({
        ...fallbackArtworks[0],
        purchaseUrl: undefined,
        purchaseButtonLabel: undefined,
      }),
    ).toEqual({
      href: "/contact",
      label: "Ask about this piece",
      external: false,
    });
  });

  it("keeps the gallery link for sold work that has one", () => {
    const artwork = { ...fallbackArtworks[0], availability: "sold" as const };
    expect(getArtworkCta(artwork)).toEqual({
      href: artwork.purchaseUrl,
      label: artwork.purchaseButtonLabel,
      external: true,
    });
  });

  it("does not show a purchase action for unlinked sold, not-for-sale, or hidden work", () => {
    expect(
      getArtworkCta({
        ...fallbackArtworks[0],
        availability: "sold",
        purchaseUrl: undefined,
      }),
    ).toBeNull();
    expect(
      getArtworkCta({ ...fallbackArtworks[0], availability: "not-for-sale" }),
    ).toBeNull();
    expect(
      getArtworkCta({ ...fallbackArtworks[0], isVisible: false }),
    ).toBeNull();
  });

  it("hides the status label only for sold work", () => {
    expect(getAvailabilityLabel("sold")).toBeNull();
    expect(getAvailabilityLabel("available")).toBe("Available");
    expect(getAvailabilityLabel("reserved")).toBe("Reserved");
    expect(getAvailabilityLabel("not-for-sale")).toBe("Not for sale");
  });

  it("only exposes a formatted price when the editor enables it", () => {
    const artwork = { ...fallbackArtworks[0], price: 4800 };
    expect(getVisiblePrice({ ...artwork, showPrice: false })).toBeNull();
    expect(getVisiblePrice({ ...artwork, showPrice: true })).toBe("$4,800");
  });
});

describe("close-up image text", () => {
  it("fills blank close-up descriptions from the artwork title", () => {
    expect(
      withDetailAltFallback(
        [
          { src: "/a.jpg" },
          { src: "/b.jpg", alt: "   " },
          { src: "/c.jpg", alt: "Orange claw" },
        ],
        "Tide Walker",
      ),
    ).toEqual([
      { src: "/a.jpg", alt: "Detail of Tide Walker" },
      { src: "/b.jpg", alt: "Detail of Tide Walker" },
      { src: "/c.jpg", alt: "Orange claw" },
    ]);
  });

  it("drops close-ups that have no uploaded image", () => {
    expect(withDetailAltFallback([{ alt: "Empty" }], "Tide Walker")).toEqual(
      [],
    );
  });
});

describe("gallery order", () => {
  it("lists available work first, then reserved, then sold, keeping display order within each group", () => {
    const base = fallbackArtworks[0];
    const make = (slug: string, availability: typeof base.availability) => ({
      ...base,
      id: slug,
      slug,
      availability,
    });
    const input = [
      make("sold-a", "sold"),
      make("avail-a", "available"),
      make("nfs-a", "not-for-sale"),
      make("reserved-a", "reserved"),
      make("avail-b", "available"),
      make("sold-b", "sold"),
    ];
    expect(sortForGallery(input).map((artwork) => artwork.slug)).toEqual([
      "avail-a",
      "avail-b",
      "reserved-a",
      "sold-a",
      "nfs-a",
      "sold-b",
    ]);
  });
});
