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
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "node_modules/**",
    "next-env.d.ts",
    "vitest.config.mjs",
    "vitest.setup.ts",
    "storybook-static/**",
  ]),
]);

export default eslintConfig;
