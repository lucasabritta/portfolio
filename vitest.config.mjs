// Unit tests only: app (`apps/web`) and shared CV package (`packages/cv`).
// Storybook browser tests run via `yarn workspace @portfolio/web-ui test:storybook`.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(dirname, "apps/web"),
      "@portfolio/cv": path.resolve(dirname, "packages/cv/src/index.ts"),
    },
  },
  esbuild: {
    jsx: "automatic",
  },
  test: {
    name: "unit",
    environment: "node",
    include: [
      "apps/web/**/*.{test,spec}.{ts,tsx}",
      "packages/cv/**/*.{test,spec}.{ts,tsx}",
    ],
    exclude: ["**/node_modules/**", "**/.next/**", "**/storybook-static/**"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
