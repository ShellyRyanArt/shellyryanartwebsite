# RESUMING SHELLY SITE RECONSTRUCTION

## Paste this into the next Claude chat

> "I'm resuming work on Shelly Ryan's website (shellyryan.art) from a prior session. This zip contains the in-progress reconstruction. Please read `NEXT_SESSION_STATE.md` first — it tells you exactly where we left off and what's left to do."

---

## State of the world (as of April 22, 2026)

### What the site is

- `shellyryan.art` — Next.js 16 app, deployed on Vercel
- GitHub repo: `ShellyRyanArt/shellyryanartwebsite`, branch `main`
- Connected to Vercel team `shelly-ryans-projects` (NOT in jace-ryans-projects)
- MCP access: Jace (the user) has GitHub collaborator access on the repo; the
  Vercel MCP in the chat does NOT have access to the team
- Domain registrar: Squarespace. Email: Microsoft 365. Contact form: Resend.

### The critical anomaly: git-orphan production deploy

- Vercel's last production deployment is from **March 15, 2026**
- Commit SHA: `6vbg3w3Qu`
- Source label: "from this repo"
- **BUT** that SHA does not exist anywhere in the repo now — no branch, no tag,
  no commit matches. "No matching refs" on search.
- This means: either the branch was force-pushed over, rebased, or deleted
  after deployment. The deployed code is in Vercel's build cache only. It's
  not recoverable from git.
- Implication: what's in `ShellyRyanArt/shellyryanartwebsite@main` TODAY is
  NOT what's running in production. It's the zip that the user has been
  sending — an older state.

### The approach we settled on

Rather than recover the orphan source, we reconstructed production from
scraping the live site. That reconstruction is what's in this zip (it's
grown over multiple turns as more live content was verified).

Everything in this zip is **based on the live site as of April 22, 2026**.
When this ships, git becomes the source of truth again (replaces the orphan
deployment).

## What's already done in this zip

Starting from the zip Jace originally sent (stale `main` branch), the
reconstruction adds / modifies:

1. **`data/pieces.ts`** (NEW) — shared source of truth for all 6 pieces.
   Every description was verified against the live site. "magazine" / "magazine page"
   wording was added to match live (5 of 6 pieces had prose edits vs zip).
   Mosquito detail images use `mosquito-detail-*.jpg` (not cricket-).
   **NO PRICE FIELD** — removed per user request, Orleans handles pricing.
   "Wired and ready to hang" stripped from depth strings.

2. **`app/gallery/[slug]/page.tsx`** (NEW) — detail page route. Doesn't
   exist in the zip-from-github-main but DOES exist in production. Has
   the Orleans CTA swap logic and the `track("orleans_click")` call.
   NO price display. NO shipping disclaimer.

3. **`app/gallery/page.tsx`** (REPLACED) — listing now links to detail pages
   instead of opening a lightbox (matches live).

4. **`app/page.tsx`** (REPLACED) — simplified to 1 featured piece linking to
   its detail page, not the 3-card grid (matches live).

5. **`app/layout.tsx`** (REPLACED) — mounts `<Analytics />` from
   `@vercel/analytics/next` so track() events actually report.

6. **`app/about/page.tsx`** (MINOR EDIT) — process quote now says
   "a pelican, a bee, a mosquito" (matches live; zip had "cricket").

7. **`app/contact/page.tsx`** (EDITED) — subheader updated to match live
   ("For work inquiries, purchasing information or general questions").
   Submit handler now POSTs to `/api/contact` with error handling.
   **BUT** — the API route itself (`app/api/contact/route.ts`) has
   NOT been written yet. See "what's left" below.

8. **`scripts/pull-detail-images.sh`** (NEW) — downloads the 12 detail
   images from the live site into `public/images/gallery/` before push.
   (Detail images aren't in the zip — have to pull them from live.)

9. **`ORLEANS_BRANCH_HANDOFF.md`** (NEW) — full step-by-step push guide.

## What's LEFT to do

### 1. Create `app/api/contact/route.ts` (CRITICAL — blocks merge)

The contact form on production works (uses Resend). When we merge this
branch, Vercel rebuilds from the new code, and the contact form will
break unless the API route exists on the server and reads the correct
env var names.

**We do NOT know the exact env var names in production.** Jace did not
want to share them. We need either:

- **Option A:** Jace reads the env var names from Vercel → Settings
  → Environment Variables (names only — RESEND_API_KEY, CONTACT_TO_EMAIL,
  etc). Values stay masked. Then write the route using those exact names.

- **Option B:** Pick reasonable names (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
  `CONTACT_FROM_EMAIL`), write the route, and require Jace to ensure the
  Vercel env vars match those names before merging.

- **Option C:** Detect and use whatever's there — read
  `process.env.RESEND_API_KEY ?? process.env.RESEND_KEY ?? process.env.RESEND_TOKEN`.
  Kludgy but survives naming drift.

Recommend **Option A**. If not possible, then **Option B** with a clear
pre-merge checklist.

A minimal route handler that works:

```ts
// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.CONTACT_TO_EMAIL || "shelly@shellyryan.art";
    const from = process.env.CONTACT_FROM_EMAIL || "noreply@shellyryan.art";

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[shellyryan.art] ${subject || "New inquiry"} — from ${name}`,
      text: `From: ${name} <${email}>\nSubject: ${subject || "(none)"}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact route error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
```

Also need to add `resend` to `package.json` dependencies.

### 2. Update `ORLEANS_BRANCH_HANDOFF.md`

Add a section at the top about the API route requirement, and a
pre-merge checklist item: "verify RESEND_API_KEY, CONTACT_TO_EMAIL,
CONTACT_FROM_EMAIL env vars exist in Vercel (or rename existing ones to
these names)."

### 3. Re-zip and hand back

Standard packaging — zip the `shelly-work` folder excluding `node_modules`,
`.next`, `.git`, `package-lock.json`. Present to user.

### 4. Ship path (for Jace to execute)

Since production is a git-orphan, the safest path is:

```bash
git checkout main
git pull
git checkout -b orleans-sync
# extract zip over working dir
chmod +x scripts/pull-detail-images.sh && ./scripts/pull-detail-images.sh
git add . && git commit -m "Sync production + Orleans cross-links"
git push -u origin orleans-sync
```

Vercel builds preview from the branch. REVIEW THE PREVIEW before merging.
If preview looks right: open PR, merge to main. Vercel auto-deploys.
The orphan commit finally gets replaced with real git-tracked code.

## Things NOT to do

- Do NOT try to transfer the Vercel project to Jace's team. User declined,
  doesn't want ownership change.
- Do NOT push directly to `main`. Always go through a branch + PR.
- Do NOT assume the repo zip represents production. It doesn't — production
  is orphaned.
- Do NOT edit the `ShellyRyanArt/shellyryanartwebsite` repo through GitHub's
  web editor without first confirming the branch. Orphan commits can confuse
  the UI.

## Known unknowns

- Whether the live site's `/api/contact` implementation does anything besides
  send a Resend email. Could have rate limiting, honeypot fields, etc.
  We're reconstructing minimum viable.
- Whether the `scripts/pull-detail-images.sh` script will find all 12
  detail images. Five of them were verified (pelican-detail-1.jpg,
  pelican-detail-2.jpg, temptation-detail-1.jpg, oyster-detail-1.jpg,
  oyster-detail-2.jpg, mosquito-detail-1.jpg, mosquito-detail-2.jpg, etc
  — the exact list is in pieces.ts). The bee images were definitely
  confirmed. Others were inferred from the live HTML but the script will
  fail loudly if any are missing.
