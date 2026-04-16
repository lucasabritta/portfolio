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

const storybookPkg = path.join(root, "packages", "storybook");
const viteMarker = path.join(storybookPkg, "node_modules", "vite");
if (!fs.existsSync(viteMarker)) {
  console.log("ensure-storybook-public: installing packages/storybook deps (vite required for static build)…");
  const yarnInstall = spawnSync("yarn", ["install", "--non-interactive"], {
    cwd: storybookPkg,
    stdio: "inherit",
    env: process.env,
    shell: process.platform === "win32",
  });
  if (yarnInstall.status !== 0) {
    process.exit(yarnInstall.status ?? 1);
  }
}

console.log("ensure-storybook-public: missing apps/frontend/public/storybook/index.html; building…");
const script = path.join(toolsDir, "build-storybook-for-next.mjs");
const result = spawnSync(process.execPath, [script], { stdio: "inherit", cwd: root, env: process.env });
process.exit(result.status ?? 1);
