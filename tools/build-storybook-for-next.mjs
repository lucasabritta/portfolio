/**
 * Builds Storybook into apps/web/public/storybook with base path /storybook/
 * (no cross-env — works on Windows, Linux, and Docker bind mounts).
 *
 * Injects `<base href="/storybook/">` into each built HTML file so relative `./assets/*`
 * URLs resolve when Next serves the app at `/storybook` (no trailing slash in the address bar).
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const webUi = path.join(root, "packages", "web-ui");
const outDir = path.join(root, "apps", "web", "public", "storybook");
const storybookBin = path.join(root, "node_modules", "storybook", "dist", "bin", "dispatcher.js");

const BASE_TAG = '<base href="/storybook/" />';

function hasStorybookBaseHref(html) {
  // Match only `<base href="/storybook/...">` — iframe also contains `href="/storybook/assets/..."` on scripts.
  return /<base[^>]*\bhref\s*=\s*["']\/storybook\//i.test(html);
}

function injectBaseIntoHtml(filePath) {
  let html = fs.readFileSync(filePath, "utf8");
  if (hasStorybookBaseHref(html)) {
    return;
  }
  if (/<base\s/i.test(html)) {
    html = html.replace(/<base(\s[^>]*?)\s*\/>/i, (full, attrs) => {
      if (/href\s*=/i.test(attrs)) {
        return full.replace(/\bhref\s*=\s*["'][^"']*["']/i, 'href="/storybook/"');
      }
      return `<base href="/storybook/"${attrs} />`;
    });
  } else {
    const injected = html.replace(/<head(\s[^>]*)?>/i, (m) => `${m}\n    ${BASE_TAG}\n`);
    if (injected === html) {
      console.warn(`build-storybook-for-next: no <head> in ${filePath}, skipping base injection`);
      return;
    }
    html = injected;
  }
  fs.writeFileSync(filePath, html);
}

function patchStorybookHtml(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith(".html")) {
      continue;
    }
    injectBaseIntoHtml(path.join(dir, name));
  }
}

const env = { ...process.env, STORYBOOK_PUBLIC_PATH: "/storybook" };

const result = spawnSync(process.execPath, [storybookBin, "build", "-o", outDir], {
  cwd: webUi,
  env,
  stdio: "inherit",
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

patchStorybookHtml(outDir);
process.exit(0);
