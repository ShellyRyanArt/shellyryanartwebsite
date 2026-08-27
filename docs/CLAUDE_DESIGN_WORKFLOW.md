# Claude design workflow

Use Claude for layout, visual direction, new reusable page types, accessibility, or real feature work. Use Sanity for routine content.

The Studio navigation includes **Design with Claude**. It turns four plain-language answers into a bounded prompt and opens Claude Code. This keeps Studio as Shelly's front door even though the code change still goes through a reviewable GitHub branch.

## Good Claude request

> Make the French Series collection page feel more editorial. Preserve the existing typography and color tokens, keep collection membership CMS-owned, support long titles, and verify mobile and desktop. Do not deploy; show me the checked change first.

## Request template

> Change: [describe the visual or functional outcome].
>
> Preserve: the current brand tokens, Sanity content ownership, artwork URLs, accessibility, and Cloudflare deployment path.
>
> CMS fields involved: [name them if known, or ask Claude to identify them].
>
> Verify: mobile, desktop, long/empty optional content, `npm run check`, and a Cloudflare build when infrastructure is touched.
>
> External actions: [none / deploy only after I approve / other explicit permission].

Claude must read `CLAUDE.md`, `docs/DESIGN_SYSTEM.md`, and `docs/CMS_SCHEMA.md` before editing. Schema changes require a migration-compatible update across schema, queries, types, tests, and documentation.

## Recovery boundaries

- Every merged change remains in GitHub history.
- The weekly code-snapshot workflow tags the current production commit and keeps a complete Git bundle for 90 days.
- Cloudflare deployment history is the production rollback layer.
- Sanity document history and the weekly dataset export protect content separately from code.
