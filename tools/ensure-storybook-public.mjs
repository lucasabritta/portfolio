/**
 * If static Storybook is missing under Next `public/storybook/`, run
 * `build-storybook-for-next.mjs` so `/storybook` rewrites resolve locally (e.g. `yarn dev:docker`).
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const toolsDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(toolsDir, "..");
const marker = path.join(root, "apps", "frontend", "public", "storybook", "index.html");

if (fs.existsSync(marker)) {
  process.exit(0);
}

console.log("ensure-storybook-public: missing apps/frontend/public/storybook/index.html; building…");
const script = path.join(toolsDir, "build-storybook-for-next.mjs");
const result = spawnSync(process.execPath, [script], { stdio: "inherit", cwd: root, env: process.env });
process.exit(result.status ?? 1);
