# Studio pane flashing — November 9, 2026

## What is established

- Shelly reported repeated Artwork-list/document-pane switching in Edge on her Windows laptop in portrait orientation, including one occurrence while adjusting an image crop/hotspot. Refresh temporarily helped; zooming out and clearing site data did not resolve it. These are reported symptoms, not a locally reproduced browser session.
- [Studio deployment 42669914669](https://github.com/ShellyRyanArt/shellyryanartwebsite/actions/runs/42669914669) completed successfully at 18:00 UTC from `ed38e888`. It used Sanity 6.10.1, validated the schema with zero errors/warnings, and skipped migration.
- The hosted root, `/structure`, and `/structure/artwork` returned HTTP 302 redirects into Dashboard during this investigation. A successful redirect alone does not establish a navigation loop.
- PRs #16 and #17 changed availability help text and close-up-image validation. Neither changed the structure resolver or router. The current branch also preserves the later #18 image-layout change.
- An isolated check against the installed 6.10.1 pane-layout controller reproduced an upstream defect: subscribe two listeners, unsubscribe the first, then call `setRootWidth(768)`. The removed listener was called **twice**, while the active listener was called once. The removed listener should receive zero calls.

## Proposed remediation and its limits

Update `sanity` and its matching `@sanity/vision` package from 6.10.1 to the pinned 6.22.0 release. Align `react` and `react-dom` at 19.3.1 because the resolved Portable Text editor requires React `^19.3.1`. This also updates the public site's React runtime, so validate the website and Cloudflare build as well as Studio. This includes upstream fixes for:

- [Removing pane-layout observers on unsubscribe](https://github.com/sanity-io/sanity/commit/455bd4524aee1500a2a569cbe84b3f0a7f818650).
- [Keeping pane-router context stable during resizing](https://github.com/sanity-io/sanity/commit/3b92c51b57194aafe85db80bc3f94fd2435cd202).
- [Avoiding Studio layout remounts when feature checks settle](https://github.com/sanity-io/sanity/commit/14f139fe2adfddf4d0acf1b8285a8c8be660a375).

The listener defect is confirmed in the installed dependency; its role in Shelly's reported flashing remains unconfirmed. The upgrade includes other upstream changes, so passing static checks is not a substitute for the browser acceptance check below. Dashboard URL synchronization, persisted browser state, and responsive layout remain competing explanations if the symptom persists.

Pin the existing deployment app ID in `sanity.cli.ts`, as requested by the successful deployment log. This removes target ambiguity, not a runtime routing defect. Default the setup workflow to `migrate_content=false`; existing content and drafts need no migration for this update.

No schema fields, validation rules, artwork records, or public-site presentation are changed by this remediation.

## Local verification

- Pane-controller regression check: the same unsubscribe sequence on 6.22.0 invokes the removed listener **zero** times and the active listener once.
- `npm run check`: lint, TypeScript, all 15 existing tests, content/design boundaries, schema validation (zero errors/warnings), and Next.js production build passed.
- `npm run sanity:build` with the existing public project ID/dataset: passed. This produces local files only; it does not deploy.
- `npm run cf:build`: passed, including generation of the Cloudflare Worker bundle.
- `npm ls --all` and `npm ci --dry-run --no-audit --no-fund`: passed without React peer conflicts.
- Local HTTP smoke checks cover seven public routes with fallback content. These check server rendering, not client hydration or the live CMS dataset.
- Browser visual/hydration checks could not run in this environment because the Chromium download failed. No authenticated Studio session or Shelly's Windows/Edge environment was tested. The browser acceptance check remains required.

Local checks used Node 24.22.1. The workflow uses Node 22; the updated Sanity package requires Node 22.12 or later. The last successful workflow used Node 22.23.4, which satisfies that requirement.

## Deploy after approval

1. Run `npm ci`, `npm run check`, `npm run sanity:build`, and `npm run cf:build` on the reviewed commit. Check the public site at mobile/desktop widths before approving the React runtime update.
2. Obtain approval under `CLAUDE.md`, then merge the reviewed branch. Check the resulting Cloudflare workflow.
3. Run **Set up Sanity content and Studio** on `main` with **migrate_content** unchecked. The Cloudflare workflow alone does not deploy Studio.
4. Verify the deployment log names the existing Studio/application, shows schema success, and skips migration. Close old Studio tabs and open a fresh tab through the normal `/studio` shortcut. Verify the Studio reports 6.22.0 (or inspect the deployed bundle if the version is unavailable in the UI).

## Acceptance check on Shelly's laptop

Use her normal Edge profile and the same portrait orientation/zoom that triggered the issue. Record the Edge version, display scaling, browser zoom, and viewport dimensions.

1. Open **Artwork → Common Green Darner**, return using the Studio back button, and repeat at least 20 times. Repeat with another artwork and browser Back/Forward.
2. Leave the Artwork list idle for two minutes. It must stay on the list without changing panes or alternating URLs.
3. Resize between portrait/narrow and landscape/wide layouts, then repeat navigation. Include approximately 390 px, 768 px, and 1440 px widths where practical.
4. Open the image crop/hotspot editor. Exercise dragging only on a disposable test artwork/draft with the owner's permission: these controls can autosave changes. Do not use the existing Common Green Darner draft as a destructive test fixture.
5. Confirm the existing draft remains intact and no unintended content was published. Record which navigation paths passed, rather than treating a brief absence of flashing as a complete pass.

Pass condition: navigation settles on the chosen pane, the URL remains stable while idle, no repeating navigation errors occur, and image editing remains usable.

## If it still flashes

Capture a short recording showing the address bar and panes, plus console errors and the exact navigation sequence. Compare the same account/document in normal Edge, InPrivate, and another browser. A clean profile passing alone does not establish the cause.

To isolate Dashboard from Studio, an owner can run the same reviewed Studio locally with the same project/dataset and an approved localhost CORS origin. If standalone is stable while Dashboard loops, investigate the Dashboard bridge with Sanity support. Do not change organization-wide settings or add unsupported URL parameters as an assumed fix.

For an upgrade regression, restore the four previous runtime versions (`sanity`/`@sanity/vision` 6.10.1 and `react`/`react-dom` 19.2.8) and the corresponding lockfile through a reviewed branch. Then redeploy both the website and Studio with migration unchecked. Keep the app ID and safe migration default. Do not reset `main` or revert unrelated artwork changes. This returns to the previous runtime and may restore its original flashing; it is a recovery step, not a confirmed cure.
