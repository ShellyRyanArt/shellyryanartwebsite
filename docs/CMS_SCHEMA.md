# CMS schema and ownership

Sanity is the canonical source for every field below once `NEXT_PUBLIC_SANITY_PROJECT_ID` is configured. `content/fallback.ts` is only the initial migration/outage snapshot.

## Artwork

`title`, `slug`, `mainImage`, `detailImages`, `medium`, `dimensions`, `depth`, `year`, `description`, `collections`, `availability`, `price`, `showPrice`, `galleryName`, `purchaseUrl`, `purchaseButtonLabel`, `certificateNote`, `featured`, `displayOrder`, `isVisible`.

Collection membership is owned only by the artwork's `collections` references. Do not add a second editable artwork list to Collection documents.

## Collection / Series

`title`, `slug`, `description`, optional `heroImage`, `displayOrder`, `isVisible`. Collection pages are created automatically at `/collections/<slug>`.

## Page singletons

- Home: hero tagline/image, featured-work copy and artwork reference, statement, contact CTA.
- About: title, portrait, introduction, biography paragraphs, quote.
- Process: title, introduction, optional image, ordered steps with optional images, quote.
- Contact: title, introduction, optional image, confirmation copy.

Singleton IDs are fixed: `homePage`, `aboutPage`, `processPage`, `contactPage`, and `siteSettings`. Do not make duplicate page documents.

## Site Settings

Site title, logo, contact email, Instagram URL, footer copy, and optional hosted newsletter-signup link/copy.

## Runtime behavior

Published content is fetched at request time with `cache: no-store`, so CMS publishing does not require a GitHub commit or Cloudflare deployment. If Sanity is not configured or temporarily fails, the site serves the safe local snapshot.

The editor shell is deployed to Sanity's managed Studio hosting. The public site's `/studio` route redirects there, keeping a consistent bookmark for the client without bundling the full editor into the Cloudflare Worker.
