# Owner setup and production handoff

The code integration is complete without credentials. These one-time account steps connect the editing and hosting services.

## 1. Create and connect Sanity

1. Create a Sanity project and a public `production` dataset in the Sanity management console.
2. Add the production domain, temporary `workers.dev` address, and `http://localhost:3000` to the project's CORS origins. Allow credentials for Studio login.
3. Create a short-lived Editor token for migration.
4. Copy `.env.example` to `.env.local` and add the project ID, dataset, and migration token.
5. Run the **Set up Sanity content and Studio** GitHub workflow once. It uploads the six current artwork images, portrait, logo, collections, pages, and settings, then deploys the Studio. The migration refuses to overwrite existing site content.
6. The Studio is deployed at `https://shelly-ryan-art.sanity.studio`.
7. Open the hosted Studio, confirm every document, add Shelly as an Editor, then revoke the temporary migration token.

The production dataset must be public for token-free website reads. Studio authentication still controls editing.

## 2. Enable contact-form email

1. In Cloudflare, open **Compute → Email Service → Email Sending** and onboard `shellyryan.art`.
2. Let Cloudflare create the SPF, DKIM, DMARC, and bounce-domain DNS records.
3. Verify `shelly@shellyryan.art` as a permitted destination if Cloudflare requests it.

The Worker binding is restricted to messages from `website@shellyryan.art` to `shelly@shellyryan.art`. Visitors' addresses are used only as Reply-To values. The form also validates same-origin requests, limits field sizes, and includes a hidden spam trap.

## 3. Configure GitHub

Add repository variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (`production`)
- `NEXT_PUBLIC_SANITY_API_VERSION` (`2026-08-01`)
- `NEXT_PUBLIC_SANITY_STUDIO_URL` (the URL returned by `npm run sanity:deploy`)

Add repository secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN` with Workers Scripts edit permission
- `SANITY_AUTH_TOKEN` with read/export permission for weekly backups

Pushes to `main` run all checks and deploy to Cloudflare Workers. The weekly Sanity export and code-snapshot workflows retain recovery artifacts for 90 days. Code snapshots also create permanent dated Git tags.

## 4. Put the site on Cloudflare

1. Run `npm run cf:build` locally once; then use the GitHub workflow or `npm run deploy` for the first Worker deployment.
2. In the `shelly-ryan-art` Worker, add the Cloudflare-managed custom domain under **Settings → Domains & Routes**.
3. Verify the temporary Worker address, custom domain, `/studio` redirect, artwork pages, images, and mobile navigation.
4. Only after verification, remove the custom domain from Vercel and retire the Vercel project. DNS is already controlled in Cloudflare, so there is no registrar transfer in this step.

The repo intentionally uses the supported OpenNext adapter for this existing Next.js 16 application. Cloudflare's newer default `vinext` route is currently beta; it can be evaluated later without coupling that experiment to the CMS migration.

The editor itself is hosted on Sanity's managed Studio service. `/studio` remains the client's stable shortcut, while the public Cloudflare Worker stays small and focused on the website.

## 5. Recovery layers

- Content edit: Sanity document history.
- Dataset incident: weekly Sanity export artifact.
- Code incident: GitHub branch/commit history plus the weekly `snapshot/YYYY-MM-DD` tag and restorable Git bundle.
- Deployment incident: Cloudflare Worker version rollback.

Do not run a dataset migration, deploy production, change DNS, or rotate secrets as part of a normal client content update.

## Post-deploy monitoring & validation

For the first production release, the site owner should check the custom domain at approximately 390 px and 1440 px widths immediately after cutover and again the next day.

- Visit Home, Gallery, one artwork with a gallery button, one collection, About, Process, Contact, and `/studio`.
- Publish a harmless test edit in Studio, confirm it appears without a GitHub deployment, then restore the original text from document history.
- In Cloudflare **Workers & Pages → shelly-ryan-art → Observability**, watch request errors and search logs for `Sanity content fetch failed`, `TypeError`, or HTTP 5xx responses.
- Healthy signals: the custom domain uses HTTPS, images load, mobile navigation works, `/studio` reaches Sanity, content publishes within a normal refresh, and Worker errors remain at zero.
- Roll back to the previous Cloudflare Worker version if 5xx errors persist for more than five minutes or a core route fails. A Sanity-only outage should serve the local snapshot; investigate the CMS connection before rolling back code.

The site owner owns this 24-hour validation window. After that, the weekly backup job and Cloudflare error view are the normal recovery signals.
