# Design system

The site should feel quiet, tactile, editorial, and rooted in vintage paper. The artwork is always the visual priority.

## Canonical tokens

The live token source is the `:root` block in `app/globals.css`:

- `--parchment`, `--parchment-dark`, `--parchment-deeper`: page and panel surfaces.
- `--ink`, `--ink-light`: primary and secondary text.
- `--amber`, `--amber-light`: restrained accent, focus, dividers, and calls to action.
- `--sepia`: secondary copy and metadata.
- `--cream-white`: limited high-contrast surface.

Do not duplicate these values in another token file. If a color changes, update the CSS variable so every consumer moves together.

## Typography

- Display and editorial copy: Cormorant Garamond (`.font-display`).
- Small caps: Cormorant SC (`.font-sc`).
- Navigation, labels, metadata, and buttons: Jost (`.font-sans-light`).
- Use generous line height for body copy and avoid long all-caps sentences.

## Reusable surfaces

- `Navigation` and `Footer`: global shell; both receive CMS site settings.
- `HomePageContent`: animated presentation only; data is fetched by the server page.
- `ContactPageContent`: client-side mail handoff; contact address comes from Site Settings.
- `.page-title`, `.section-eyebrow`: consistent page hierarchy.
- `.button-primary`, `.button-outline`, `.button-link`: calls to action.
- `.artwork-card`, `.collection-chip`: collection browsing.

## Layout and accessibility rules

- Design mobile-first; verify roughly 390 px and 1440 px widths.
- Preserve image aspect ratios. Artwork may be cropped only in browsing cards, never on the detail page.
- Every CMS image requires useful alt text. Decorative backgrounds may use empty alt text only when they convey no information.
- Keep keyboard focus visible and do not encode availability using color alone.
- Long titles, long gallery names, missing detail images, and missing optional hero images must remain usable.
