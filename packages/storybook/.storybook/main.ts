import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs-vite";
import { mergeConfig } from "vite";

const configDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.join(configDir, "..");

/** Vite base for static export (`/` for dev on :6006, `/storybook/` when embedded under Next `public/storybook`). */
function storybookViteBase(): string {
  const raw = process.env.STORYBOOK_PUBLIC_PATH?.trim();
  if (!raw || raw === "/") {
    return "/";
  }
  const withLeading = raw.startsWith("/") ? raw : `/${raw}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  // Must stay *under* `public/`, not `public/` itself — static export writes to `public/storybook/`.
  staticDirs: [path.join(packageRoot, "../../apps/frontend/public/cv-fonts")],
  viteFinal: async (viteConfig) =>
    mergeConfig(viteConfig, {
      base: storybookViteBase(),
      resolve: {
        alias: {
          "@ui": path.join(packageRoot, "src"),
        },
      },
    }),
};

export default config;
