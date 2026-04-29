#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const expectedVercelEngine = "24.14.1";
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
  console.error("Package engines must pin the Node.js LTS runtime to 24.14.1.");
  console.error(
    "Keep package engines, .nvmrc, and apps/frontend/Dockerfile on the same Node.js version.",
  );
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}
