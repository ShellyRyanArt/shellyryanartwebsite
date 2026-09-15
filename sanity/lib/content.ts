import {
  fallbackArtworks,
  fallbackCollections,
  fallbackPages,
  fallbackSiteSettings,
} from "@/content/fallback";
import type {
  AboutPageContent,
  Artwork,
  Collection,
  ContactPageContent,
  HomePageContent,
  ProcessPageContent,
  SiteSettings,
} from "@/content/types";
import { isSanityConfigured } from "@/sanity/env";
import { sanityClient } from "@/sanity/lib/client";
import {
  aboutPageQuery,
  artworkBySlugQuery,
  artworksQuery,
  collectionBySlugQuery,
  collectionsQuery,
  contactPageQuery,
  homePageQuery,
  processPageQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";

// If Sanity is slow or unresponsive, abort the request rather than let it hang.
// A hung fetch can exhaust the Cloudflare Worker's resource limits and return a
// site-wide error; timing out lets us fall back to the local snapshot instead.
const CONTENT_FETCH_TIMEOUT_MS = 8000;

async function fetchPublished<T>(
  query: string,
  params: Record<string, string> = {},
): Promise<T | undefined> {
  if (!isSanityConfigured) return undefined;

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    CONTENT_FETCH_TIMEOUT_MS,
  );

  try {
    return await sanityClient.fetch<T>(query, params, {
      cache: "no-store",
      signal: controller.signal,
    });
  } catch (error) {
    console.error(
      "Sanity content fetch failed or timed out; serving the safe local snapshot.",
      error,
    );
    return undefined;
  } finally {
    clearTimeout(timeout);
  }
}

export function mergePublishedContent<T extends object>(
  fallback: T,
  published: Partial<{ [Key in keyof T]: T[Key] | null }> | null | undefined,
): T {
  if (!published) return fallback;

  const definedFields = Object.fromEntries(
    Object.entries(published).filter(([, value]) => value != null),
  ) as Partial<T>;

  return { ...fallback, ...definedFields };
}

function normalizeArtwork(artwork: Partial<Artwork>): Artwork | null {
  if (!artwork.id || !artwork.slug || !artwork.title || !artwork.mainImage?.src)
    return null;

  return {
    id: artwork.id,
    slug: artwork.slug,
    title: artwork.title,
    mainImage: artwork.mainImage,
    detailImages: artwork.detailImages || [],
    medium: artwork.medium || "Mixed Media",
    year: artwork.year,
    dimensions: artwork.dimensions || "Dimensions available on request",
    depth: artwork.depth,
    description: artwork.description || "",
    collectionSlugs: artwork.collectionSlugs || [],
    availability: artwork.availability || "not-for-sale",
    price: artwork.price,
    showPrice: artwork.showPrice ?? false,
    galleryName: artwork.galleryName,
    purchaseUrl: artwork.purchaseUrl,
    purchaseButtonLabel: artwork.purchaseButtonLabel,
    certificateNote: artwork.certificateNote,
    featured: artwork.featured ?? false,
    displayOrder: artwork.displayOrder ?? 9999,
    isVisible: artwork.isVisible ?? true,
  };
}

export async function getArtworks(): Promise<Artwork[]> {
  const data = await fetchPublished<Partial<Artwork>[]>(artworksQuery);
  if (data === undefined) return fallbackArtworks;

  return data
    .map(normalizeArtwork)
    .filter((item): item is Artwork => Boolean(item));
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  const data = await fetchPublished<Partial<Artwork> | null>(
    artworkBySlugQuery,
    { slug },
  );
  if (data === undefined) {
    return fallbackArtworks.find((artwork) => artwork.slug === slug) || null;
  }
  return data ? normalizeArtwork(data) : null;
}

export async function getCollections(): Promise<Collection[]> {
  const data = await fetchPublished<Collection[]>(collectionsQuery);
  return data === undefined ? fallbackCollections : data;
}

export async function getCollectionBySlug(
  slug: string,
): Promise<Collection | null> {
  const data = await fetchPublished<Collection | null>(collectionBySlugQuery, {
    slug,
  });
  if (data === undefined) {
    return (
      fallbackCollections.find((collection) => collection.slug === slug) || null
    );
  }
  return data;
}

export async function getHomePage(): Promise<HomePageContent> {
  const data = await fetchPublished<Partial<HomePageContent> | null>(
    homePageQuery,
  );
  return mergePublishedContent(fallbackPages.home, data);
}

export async function getAboutPage(): Promise<AboutPageContent> {
  const data = await fetchPublished<Partial<AboutPageContent> | null>(
    aboutPageQuery,
  );
  return mergePublishedContent(fallbackPages.about, data);
}

export async function getProcessPage(): Promise<ProcessPageContent> {
  const data = await fetchPublished<Partial<ProcessPageContent> | null>(
    processPageQuery,
  );
  return mergePublishedContent(fallbackPages.process, data);
}

export async function getContactPage(): Promise<ContactPageContent> {
  const data = await fetchPublished<Partial<ContactPageContent> | null>(
    contactPageQuery,
  );
  return mergePublishedContent(fallbackPages.contact, data);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await fetchPublished<Partial<SiteSettings> | null>(
    siteSettingsQuery,
  );
  return mergePublishedContent(fallbackSiteSettings, data);
}
