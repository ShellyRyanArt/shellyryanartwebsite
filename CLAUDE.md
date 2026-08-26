# Shelly Ryan Art — Claude Working Agreement

This repository has two deliberately separate editing surfaces:

- **Sanity owns content.** Artwork records, images, collections, availability, prices, purchase links, and editable page copy belong in Sanity.
- **Claude owns bounded design and feature changes.** Layout, typography, responsive behavior, reusable components, accessibility, and intentionally requested features belong in this repository.

## Non-negotiable boundaries

1. Never hardcode a new artwork, collection, gallery URL, price, availability state, or editable page paragraph in `app/` or `components/`.
2. Never make `content/fallback.ts` the live authoring surface. It is a migration and outage snapshot only.
3. Read CMS content through `sanity/lib/content.ts`. Schema changes must update the schema, queries, TypeScript contracts, migration, tests, and `docs/CMS_SCHEMA.md` together.
4. Preserve the canonical design tokens in `app/globals.css`. Prefer existing utilities and components before adding one-off styles.
5. Cloudflare Workers is the production host. Do not add Vercel runtime packages or deployment files.
6. Do not publish CMS content, run the migration, deploy, change DNS, or alter Cloudflare/Sanity/GitHub secrets unless the user explicitly requests that external action.
7. Do not add direct commerce, payment collection, newsletter infrastructure, or a general page builder without a separately approved scope.

## Required workflow for design changes

1. Read `docs/DESIGN_SYSTEM.md`, `docs/CMS_SCHEMA.md`, and the affected page/component.
2. State which content fields and responsive states the change touches.
3. Work on a feature branch. Keep content and infrastructure boundaries intact.
4. Test empty/long text, missing optional images, mobile width, desktop width, keyboard focus, and external links when applicable.
5. Run `npm run check`. For visible changes, inspect the page at approximately 390 px and 1440 px widths.
6. Explain the user-visible change and any CMS fields the client should use. Do not describe routine content changes as code changes.

## Deploy-safe rule

`npm run deploy` is an external production action. A successful local `npm run check` or `npm run cf:build` does not authorize deployment. GitHub Actions deploys `main` only after the configured checks pass.
