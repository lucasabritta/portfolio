import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import portfolio from "./tools/eslint-plugin-portfolio/index.mjs";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      portfolio,
    },
    rules: {
      "portfolio/storybook-ui-boundary": "error",
    },
  },
  {
    settings: {
      next: {
        rootDir: "apps/web",
      },
    },
  },
  globalIgnores([
    "apps/web/.next/**",
    ".next/**",
    "out/**",
    "build/**",
    "node_modules/**",
    "apps/web/next-env.d.ts",
    "next-env.d.ts",
    "vitest.config.mjs",
    "packages/web-ui/vitest.config.mjs",
    "vitest.setup.ts",
    "**/storybook-static/**",
    "apps/web/public/storybook/**",
  ]),
]);

export default eslintConfig;
