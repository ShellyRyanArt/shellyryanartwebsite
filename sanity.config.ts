import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";
import { DesignAssistantTool } from "@/sanity/tools/DesignAssistantTool";

const singletonTypes = new Set([
  "homePage",
  "aboutPage",
  "processPage",
  "contactPage",
  "siteSettings",
]);

export default defineConfig({
  name: "shelly-ryan-art",
  title: "Shelly Ryan Art",
  projectId,
  dataset,
  basePath: "/",
  plugins: [structureTool({ structure })],
  tools: (previousTools) => [
    ...previousTools.filter(({ name }) => name === "structure"),
    {
      name: "design-with-claude",
      title: "Design with Claude",
      component: DesignAssistantTool,
    },
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(
            ({ action }) => action !== "duplicate" && action !== "delete",
          )
        : actions,
  },
});
