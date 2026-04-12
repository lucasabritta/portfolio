// Unit tests: apps/frontend (jsdom), apps/backend (node), packages/resume-content (node).
// Storybook browser tests: `yarn workspace @portfolio/storybook test:storybook`.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, defineProject } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const sharedResolve = {
  alias: {
    "@portfolio/resume-content": path.resolve(dirname, "packages/resume-content/src/index.ts"),
  },
};

export default defineConfig({
  test: {
    projects: [
      defineProject({
        resolve: {
          alias: {
            ...sharedResolve.alias,
            "@": path.resolve(dirname, "apps/frontend"),
          },
        },
        esbuild: { jsx: "automatic" },
        test: {
          name: "unit-frontend",
          environment: "jsdom",
          include: ["apps/frontend/**/*.{test,spec}.{ts,tsx}"],
          exclude: ["**/node_modules/**", "**/.next/**"],
          setupFiles: ["./vitest.setup.ts"],
        },
      }),
      defineProject({
        resolve: {
          alias: {
            ...sharedResolve.alias,
            "@cv-pdf": path.resolve(dirname, "apps/backend/src/cv-pdf"),
          },
        },
        esbuild: { jsx: "automatic" },
        test: {
          name: "unit-backend",
          environment: "node",
          include: ["apps/backend/**/*.{test,spec}.{ts,tsx}"],
          exclude: ["**/node_modules/**"],
          setupFiles: ["./vitest.setup.ts"],
        },
      }),
      defineProject({
        resolve: { alias: { ...sharedResolve.alias } },
        test: {
          name: "unit-resume-content",
          environment: "node",
          include: ["packages/resume-content/**/*.{test,spec}.ts"],
          exclude: ["**/node_modules/**"],
          setupFiles: ["./vitest.setup.ts"],
        },
      }),
    ],
  },
});
