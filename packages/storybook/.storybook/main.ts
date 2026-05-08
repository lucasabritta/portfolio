import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs-vite";

process.env.VITE_CJS_IGNORE_WARNING = "true";

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

function shouldSuppressRollupWarning(warning: { code?: string; message?: string }): boolean {
  const message = warning.message ?? "";
  return (
    warning.code === "MODULE_LEVEL_DIRECTIVE" ||
    message.includes("Module level directives cause errors when bundled") ||
    message.includes("Error when using sourcemap for reporting an error")
  );
}

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-vitest"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  // Storybook renders DOM UI only and must not reach into `apps/frontend/public`.
  viteFinal: async (viteConfig) => {
    const existingAlias = viteConfig.resolve?.alias;
    const alias = Array.isArray(existingAlias)
      ? [...existingAlias, { find: "@ui", replacement: path.join(packageRoot, "src") }]
      : {
          ...existingAlias,
          "@ui": path.join(packageRoot, "src"),
        };

    return {
      ...viteConfig,
      base: storybookViteBase(),
      resolve: {
        ...viteConfig.resolve,
        alias,
      },
      build: {
        ...viteConfig.build,
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
          ...viteConfig.build?.rollupOptions,
          onwarn(warning, defaultHandler) {
            if (shouldSuppressRollupWarning(warning)) {
              return;
            }
            defaultHandler(warning);
          },
        },
      },
    };
  },
};

export default config;
