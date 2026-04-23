# Orleans CTA + Production Sync — Handoff

This branch does two things at once:

1. **Syncs git with production.** Production had code that wasn't in the GitHub `main` branch — specifically the `/gallery/[slug]` detail page route and detail images that someone deployed outside of git. This branch rebuilds that work from the live site so git is finally the source of truth again.
2. **Adds Orleans Gallery cross-links.** On each piece's detail page, when the piece is represented at Orleans Gallery, the "Inquire About This Piece" CTA is replaced with "Purchase at Orleans Gallery →" and clicks are tracked via Vercel Analytics.

All six current pieces are flagged as `orleansSlug` set in `data/pieces.ts`, because all six are currently at Orleans.

**Also included in this branch:**
- **Price removed from all piece detail pages.** The `price` field has been dropped from `data/pieces.ts` entirely so Orleans is the single source of truth for pricing.
- **Shipping disclaimer removed** ("Price does not include shipping...") — no longer relevant without price display.
- **"Wired and ready to hang" removed** from the `depth` string on every piece, per request. The depth line now reads "1.5 in deep · Collaged sides" on every piece.

---

## How to apply this

From the root of your local checkout of `shellyryanartwebsite`:

```bash
# 1. Start fresh from main
git checkout main
git pull

# 2. Create the branch
git checkout -b orleans-cta-and-sync
```

Now **extract the `shelly-work-final.zip` I sent you, on top of your repo** — letting it overwrite existing files. Files you'll be adding/replacing:

- `data/pieces.ts` (NEW — shared piece data)
- `app/gallery/[slug]/page.tsx` (NEW — detail route)
- `app/gallery/page.tsx` (REPLACED — now links instead of lightbox)
- `app/page.tsx` (REPLACED — simpler home, single featured piece)
- `app/layout.tsx` (REPLACED — now mounts `<Analytics />`)
- `scripts/pull-detail-images.sh` (NEW — download helper)

Verify with `git status` — you should see exactly those files listed as modified/new.

```bash
# 3. Pull the 12 detail images from the live site into public/images/gallery/
chmod +x scripts/pull-detail-images.sh
./scripts/pull-detail-images.sh
```

If the script reports any missing images, follow its instructions (edit `data/pieces.ts` to drop the `detailImages` array for those pieces). Then commit:

```bash
# 4. Commit + push
git add .
git commit -m "Sync production code to git + add Orleans Gallery cross-links

- Reconstruct /gallery/[slug] detail route from live site
- Add shared data/pieces.ts as source of truth
- Swap 'Inquire' CTA for 'Purchase at Orleans Gallery' on represented pieces
- Wire up Vercel Analytics for orleans_click tracking
- Simplify home page to match production (single featured piece)"

git push -u origin orleans-cta-and-sync
```

Vercel will automatically build a **preview deployment** from the branch push. The URL appears in the Vercel dashboard under the project's Deployments tab, usually within 60–90 seconds. It'll look like `https://shellyryanartwebsite-git-orleans-cta-an-<hash>-shelly-ryans-projects.vercel.app`.

---

## Pre-merge review checklist

Open the preview URL and verify:

**Home page**
- [ ] Hero loads with logo, tagline, and "View Gallery" / "About the Artist" buttons
- [ ] Scroll down: featured piece image displays (currently Mascot of the Gulf Coast)
- [ ] Clicking the featured piece image goes to `/gallery/mascot-of-the-gulf-coast`
- [ ] "See All Works" button goes to `/gallery`

**Gallery listing (`/gallery`)**
- [ ] All 6 pieces display in the grid
- [ ] Hover overlay shows the piece title and "View →"
- [ ] Clicking a card goes to that piece's detail page (not a lightbox)

**Detail pages — spot-check at least 3 of the 6 pieces**
- [ ] Main image loads
- [ ] Both detail images load (or the "Detail views" section is absent if you had to remove them)
- [ ] Title, medium, dimensions all match what's on the current live site
- [ ] Depth line reads "1.5 in deep · Collaged sides" (NO "Wired and ready to hang")
- [ ] **No price displayed** (pricing lives on Orleans only)
- [ ] **No shipping disclaimer paragraph**
- [ ] Description text is present
- [ ] **Primary CTA reads "Purchase at Orleans Gallery →"** (not "Inquire")
- [ ] Clicking the CTA opens `https://orleansgallery.com/art/<slug>-by-shelly-ryan` in a NEW TAB
- [ ] "← Back to Gallery" link works

**Orleans URL spot-check** (click from preview, confirm correct page loads on Orleans):
- [ ] Saint of the Southern Hive → `orleansgallery.com/art/saint-of-the-southern-hive-by-shelly-ryan`
- [ ] Mascot of the Gulf Coast → `orleansgallery.com/art/mascot-of-the-gulf-coast-by-shelly-ryan`

**Analytics**
- [ ] Click a "Purchase at Orleans Gallery" button on the preview
- [ ] In Vercel dashboard → project → Analytics → Events tab, you should eventually see an `orleans_click` event with the piece title/slug properties. May take a few minutes to appear.

**General**
- [ ] Navigation + footer still render correctly
- [ ] No visual regressions on About or Contact pages (neither was touched, but verify)

---

## Merge to production

Once the preview checks out:

```bash
git checkout main
git merge orleans-cta-and-sync
git push
```

Vercel auto-deploys from `main`. Production updates within ~90 seconds. The custom domain `shellyryan.art` continues pointing to the same Vercel project — nothing DNS-side needs changing.

---

## Known caveats (none of these block shipping)

1. **Description copy may differ slightly from what's currently live.** I couldn't scrape 5 of the 6 detail pages due to rate limits, so I used the copy that was in the zip. One instance I did catch: the bee piece on live says "magazine page photographs of bees" while the zip said "actual photographs of bees" — I went with the live wording. Other pieces may have similar small edits on live that aren't in this branch. Compare on the preview URL and fix any before merging if you want an exact match.
2. **The contact form is still a placeholder in git.** The form in `app/contact/page.tsx` has a `// Placeholder — will wire up to email service` comment and fakes submission via `setSubmitted(true)`. But the live site clearly has a working contact form (Resend is configured). This is another piece of production work that lives outside of git. Not in scope for this branch, but worth addressing in a follow-up — otherwise when this branch merges to main, Vercel will rebuild with the fake form and the real contact flow breaks.
3. **The About page wasn't touched.** I didn't verify whether the live About page differs from the zip. If someone edited it on production, merging this branch could regress those edits. Worth a quick diff check on the preview.

## If something goes wrong

Nothing in this branch affects DNS or external services. Worst case if the merge breaks something:

```bash
git revert HEAD
git push
```

Rolls production back to the previous deployment within ~90 seconds. The production Vercel dashboard also has a "Promote to Production" button next to any older deployment for one-click rollback.
