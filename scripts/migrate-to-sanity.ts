import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { loadEnvFile } from "node:process";

import { createClient } from "@sanity/client";

import {
  fallbackArtworks,
  fallbackCollections,
  fallbackPages,
  fallbackSiteSettings,
} from "../content/fallback";
import type { SiteImage } from "../content/types";

if (existsSync(".env.local")) loadEnvFile(".env.local");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before running the migration.",
  );
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-08-01",
  useCdn: false,
});
const assetCache = new Map<string, string>();

async function uploadImage(image: SiteImage) {
  if (!image.src.startsWith("/"))
    throw new Error(
      `Migration expected a local image path, received ${image.src}`,
    );
  const existing = assetCache.get(image.src);
  if (existing)
    return {
      _type: "image",
      asset: { _type: "reference", _ref: existing },
      alt: image.alt,
      caption: image.caption,
    };

  const filePath = path.join(process.cwd(), "public", image.src);
  const asset = await client.assets.upload(
    "image",
    createReadStream(filePath),
    { filename: path.basename(filePath) },
  );
  assetCache.set(image.src, asset._id);
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: image.alt,
    caption: image.caption,
  };
}

async function run() {
  const existingDocuments = await client.fetch<number>(
    'count(*[_type in ["artwork", "collection", "homePage", "aboutPage", "processPage", "contactPage", "siteSettings"]])',
  );
  if (existingDocuments > 0 && !process.argv.includes("--force")) {
    throw new Error(
      `The dataset already contains ${existingDocuments} site documents. Migration stopped to protect CMS edits. Add --force only when you intentionally want to replace the migrated records.`,
    );
  }

  console.log(
    `Migrating the current site into Sanity project ${projectId}, dataset ${dataset}.`,
  );

  for (const collection of fallbackCollections) {
    await client.createOrReplace({
      _id: collection.id,
      _type: "collection",
      title: collection.title,
      slug: { _type: "slug", current: collection.slug },
      description: collection.description,
      displayOrder: collection.displayOrder,
      isVisible: collection.isVisible,
    });
  }

  for (const artwork of fallbackArtworks) {
    await client.createOrReplace({
      _id: artwork.id,
      _type: "artwork",
      title: artwork.title,
      slug: { _type: "slug", current: artwork.slug },
      mainImage: await uploadImage(artwork.mainImage),
      detailImages: [],
      medium: artwork.medium,
      year: artwork.year,
      dimensions: artwork.dimensions,
      depth: artwork.depth,
      description: artwork.description,
      collections: artwork.collectionSlugs.map((slug) => ({
        _key: slug,
        _type: "reference",
        _ref: fallbackCollections.find(
          (collection) => collection.slug === slug,
        )!.id,
      })),
      availability: artwork.availability,
      price: artwork.price,
      showPrice: artwork.showPrice,
      galleryName: artwork.galleryName,
      purchaseUrl: artwork.purchaseUrl,
      purchaseButtonLabel: artwork.purchaseButtonLabel,
      certificateNote: artwork.certificateNote,
      featured: artwork.featured,
      displayOrder: artwork.displayOrder,
      isVisible: artwork.isVisible,
    });
  }

  const portrait = await uploadImage(fallbackPages.about.portrait);
  const logo = await uploadImage(fallbackSiteSettings.logo);

  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    ...fallbackPages.home,
    featuredArtwork: {
      _type: "reference",
      _ref: `artwork-${fallbackPages.home.featuredArtworkSlug}`,
    },
    featuredArtworkSlug: undefined,
  });
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    ...fallbackPages.about,
    portrait,
  });
  await client.createOrReplace({
    _id: "processPage",
    _type: "processPage",
    ...fallbackPages.process,
    steps: fallbackPages.process.steps.map((step) => ({
      ...step,
      _key: step.number,
    })),
  });
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    ...fallbackPages.contact,
  });
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    ...fallbackSiteSettings,
    logo,
  });

  console.log(
    `Migration complete: ${fallbackArtworks.length} artworks, ${fallbackCollections.length} collections, four pages, and site settings.`,
  );
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
