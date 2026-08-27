import { describe, expect, it } from "vitest";

import { buildClaudeBrief } from "@/sanity/tools/designBrief";

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
    expect(brief).toContain("Delivery status — branch:");
  });

  it("keeps CMS content and production actions outside a design request", () => {
    const brief = buildClaudeBrief({ goal: "Try a new gallery layout." });

    expect(brief).toContain("Sanity owns editable content");
    expect(brief).toContain("Do not publish Sanity content");
    expect(brief).toContain("Do not use a direct production deploy command");
  });
});
