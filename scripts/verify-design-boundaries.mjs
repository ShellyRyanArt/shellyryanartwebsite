import { readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const violations = [];

async function sourceFiles(directory) {
  const entries = await readdir(path.join(root, directory), {
    withFileTypes: true,
  });
  const files = [];
  for (const entry of entries) {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await sourceFiles(relative)));
    if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name))
      files.push(relative);
  }
  return files;
}

for (const file of [
  ...(await sourceFiles("app")),
  ...(await sourceFiles("components")),
]) {
  const source = readFileSync(path.join(root, file), "utf8");
  if (source.includes("content/fallback"))
    violations.push(
      `${file}: UI code must read through sanity/lib/content, never the migration snapshot.`,
    );
  if (source.includes("/images/gallery/"))
    violations.push(
      `${file}: artwork images may not be hardcoded in presentation code.`,
    );
}

const packageJson = JSON.parse(
  readFileSync(path.join(root, "package.json"), "utf8"),
);
if (
  packageJson.dependencies?.["@vercel/analytics"] ||
  packageJson.dependencies?.["@vercel/edge"]
) {
  violations.push(
    "package.json: Vercel runtime dependencies are outside the Cloudflare hosting boundary.",
  );
}

for (const required of [
  "sanity.config.ts",
  "wrangler.jsonc",
  "open-next.config.ts",
  "CLAUDE.md",
  "docs/CMS_SCHEMA.md",
]) {
  try {
    readFileSync(path.join(root, required));
  } catch {
    violations.push(`${required}: required workflow boundary file is missing.`);
  }
}

if (violations.length) {
  console.error(
    "Design workflow boundary check failed:\n- " + violations.join("\n- "),
  );
  process.exit(1);
}

console.log("Design workflow boundaries verified.");
