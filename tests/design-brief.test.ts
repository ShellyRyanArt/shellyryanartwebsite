import { describe, expect, it } from "vitest";

import {
  buildClaudeBrief,
  buildClaudeLaunchUrl,
  clientStatusTemplate,
  repositoryBaseBranch,
  repositorySlug,
} from "@/sanity/tools/designBrief";

describe("Design with Claude handoff", () => {
  it("carries the complete checked GitHub delivery workflow into Claude", () => {
    const brief = buildClaudeBrief({
      goal: "Make the home page feel quieter.",
      page: "Home",
    });

    expect(brief).toContain("Create a new feature branch");
    expect(brief).toContain("Run npm run check");
    expect(brief).toContain("Commit every intended change");
    expect(brief).toContain("push the feature branch");
    expect(brief).toContain("Open a pull request into main");
    expect(brief).toContain("explicit approval before merging");
    expect(brief).toContain("confirm the Cloudflare deployment");
    expect(brief).toContain(clientStatusTemplate);
    expect(brief).toContain("The steps above are behind-the-scenes mechanics");
  });

  it("keeps CMS content and production actions outside a design request", () => {
    const brief = buildClaudeBrief({ goal: "Try a new gallery layout." });

    expect(brief).toContain("Sanity owns editable content");
    expect(brief).toContain("Do not publish Sanity content");
    expect(brief).toContain("Do not use a direct production deploy command");
  });

  it("keeps developer vocabulary out of Shelly's progress status", () => {
    expect(clientStatusTemplate).not.toMatch(
      /branch|commit|push|pull request|merge|deploy/i,
    );
    expect(clientStatusTemplate).toContain("ready for your review");
    expect(clientStatusTemplate).toContain("live and checked");
  });

  it("opens Claude Code with the full request and repository preselected", () => {
    const brief = buildClaudeBrief({
      goal: "Match this certificate to the earlier design.",
      page: "Site-wide",
      referenceImages: ["artwork.jpg"],
    });
    const url = new URL(buildClaudeLaunchUrl(brief));

    expect(`${url.origin}${url.pathname}`).toBe("https://claude.ai/code/new");
    expect(url.searchParams.get("q")).toBe(brief);
    expect(url.searchParams.get("repo")).toBe(repositorySlug);
    expect(url.searchParams.get("branch")).toBe(repositoryBaseBranch);
    expect(url.searchParams.get("mode")).toBe("code");
  });
});
