import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "@/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "shelly-ryan-art",
  deployment: {
    appId: "dyc2gl6nh6axxic71ybq3yl2",
  },
});
