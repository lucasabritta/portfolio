import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    settings: {
      next: {
        rootDir: "apps/frontend",
      },
    },
  },
  {
    files: ["packages/storybook/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@portfolio/resume-content",
              message:
                "Keep Storybook presentation-only: pass props from fixtures; do not import résumé data package.",
            },
          ],
          patterns: [
            {
              group: ["**/packages/resume-content/**", "**/resume-content/src/**"],
              message:
                "Do not import résumé data by path from Storybook; use fixtures and presentation types.",
            },
          ],
        },
      ],
    },
  },
  globalIgnores([
    "apps/frontend/.next/**",
    ".next/**",
    "out/**",
    "build/**",
    "node_modules/**",
    "apps/frontend/next-env.d.ts",
    "next-env.d.ts",
    "vitest.config.mjs",
    "packages/storybook/vitest.config.mjs",
    "vitest.setup.ts",
    "**/storybook-static/**",
    "apps/frontend/public/storybook/**",
  ]),
]);

export default eslintConfig;
