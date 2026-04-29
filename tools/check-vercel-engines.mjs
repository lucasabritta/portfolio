#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const expectedVercelEngine = "22.x";
const packagePaths = [
  "package.json",
  "apps/frontend/package.json",
  "apps/e2e/package.json",
  "packages/storybook/package.json",
  "packages/resume-content/package.json",
];

const failures = [];

for (const packagePath of packagePaths) {
  const fullPath = path.join(root, packagePath);
  const packageJson = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  const actual = packageJson.engines?.node;

  if (actual !== expectedVercelEngine) {
    failures.push(
      `${packagePath}: expected engines.node "${expectedVercelEngine}", got ${JSON.stringify(actual)}`,
    );
  }
}

if (failures.length > 0) {
  console.error("Vercel only selects Node.js by major version, so package engines must use 22.x.");
  console.error(
    "Keep exact local/CI runtime pinning in .nvmrc and apps/frontend/Dockerfile instead.",
  );
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}
