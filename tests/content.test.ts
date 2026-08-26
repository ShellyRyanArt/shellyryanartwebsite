import { describe, expect, it } from "vitest";

import {
  fallbackArtworks,
  fallbackCollections,
  fallbackPages,
  fallbackSiteSettings,
} from "@/content/fallback";
import { getArtworkCta, getVisiblePrice } from "@/content/presentation";
import { mergePublishedContent } from "@/sanity/lib/content";

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

  it("does not show a purchase action for sold or hidden work", () => {
    expect(
      getArtworkCta({ ...fallbackArtworks[0], availability: "sold" }),
    ).toBeNull();
    expect(
      getArtworkCta({ ...fallbackArtworks[0], isVisible: false }),
    ).toBeNull();
  });

  it("only exposes a formatted price when the editor enables it", () => {
    const artwork = { ...fallbackArtworks[0], price: 4800 };
    expect(getVisiblePrice({ ...artwork, showPrice: false })).toBeNull();
    expect(getVisiblePrice({ ...artwork, showPrice: true })).toBe("$4,800");
  });
});
