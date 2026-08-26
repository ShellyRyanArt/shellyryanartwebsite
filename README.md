# Shelly Ryan Art

A custom Next.js portfolio with a code-free Sanity Studio for normal content updates and Cloudflare Workers for production hosting.

## Editing model

- Client content work: `/studio`
- Design and feature work: **Design with Claude** in Studio creates a bounded request for repository changes governed by `CLAUDE.md`
- Production hosting: Cloudflare Workers through OpenNext
- Source and deploy history: GitHub

The contact form posts to the Cloudflare Worker and uses a restricted Email Service binding. It does not expose an API key or depend on the visitor's email application.

## Local development

```bash
npm install
npm run dev
```

The site serves its complete migration snapshot when Sanity environment variables are absent. Copy `.env.example` to `.env.local` after creating the Sanity project.

## Verification

```bash
npm run check
npm run cf:build
```

## Handoffs

- Client editing guide: `docs/CLIENT_RUNBOOK.md`
- Owner setup: `docs/OWNER_SETUP.md`
- Claude design workflow: `docs/CLAUDE_DESIGN_WORKFLOW.md`
- CMS contract: `docs/CMS_SCHEMA.md`
- Design system: `docs/DESIGN_SYSTEM.md`
