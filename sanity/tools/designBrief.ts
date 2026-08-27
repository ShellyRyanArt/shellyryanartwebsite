export const repositoryUrl =
  "https://github.com/ShellyRyanArt/shellyryanartwebsite";

export type DesignBriefInput = {
  goal: string;
  page?: string;
  referenceImages?: string[];
};

export function buildClaudeBrief({
  goal,
  page,
  referenceImages = [],
}: DesignBriefInput) {
  const request =
    goal.trim() ||
    "[Ask Shelly what she wants to change before making any edits.]";
  const area = page?.trim() || "Let the request determine the affected area.";
  const references = referenceImages.length
    ? `Shelly will attach these files in Claude: ${referenceImages.join(", ")}. Use them for direction only; do not copy protected artwork or branding.`
    : "No reference images were selected in Studio.";

  return `You are helping Shelly Ryan make a design or feature change to her art website.

Repository: ${repositoryUrl}

Shelly's request:
${request}

Likely page or area:
${area}

Reference images:
${references}

Before changing code, read CLAUDE.md, docs/DESIGN_SYSTEM.md, docs/CMS_SCHEMA.md, and the affected page or component. Sanity owns editable content; the repository owns design and features. Preserve the site's established visual language, use existing tokens and components, and ask a short clarifying question if Shelly's intent is genuinely ambiguous.

Carry this delivery workflow through the entire session:
1. Create a new feature branch before editing. Never work directly on main.
2. Make only the requested, bounded change. Do not publish Sanity content, change DNS, expose secrets, or alter deployment infrastructure unless Shelly explicitly expands the scope.
3. Run npm run check. For visible work, inspect the affected experience at mobile and desktop widths.
4. Do not leave finished work only in the working tree. Commit every intended change with a clear message and push the feature branch to GitHub.
5. Open a pull request into main. Give Shelly the pull-request link, the preview or screenshots, and a plain-language summary of what changed.
6. Stop and ask Shelly for explicit approval before merging. A request to design or build is not approval to merge.
7. After Shelly explicitly approves, merge the pull request into main, confirm the Cloudflare deployment completes successfully, and report the live status. Do not use a direct production deploy command.

If permissions or authentication prevent committing, pushing, opening the pull request, merging, or checking deployment, say exactly which step is blocked and what Shelly needs to do. Do not silently stop before the GitHub handoff is complete.

End every progress update with this compact checklist so the handoff cannot be forgotten:
Delivery status — branch: [status] · checks: [status] · committed: [status] · pushed: [status] · PR: [status] · approval: [waiting/approved] · merged: [status] · Cloudflare: [status]`;
}
