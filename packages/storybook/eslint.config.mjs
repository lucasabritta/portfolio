import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["node_modules/**", "storybook-static/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@portfolio/resume-content",
              message:
                "Keep Storybook presentation-only: pass props from fixtures; do not import resume-content.",
            },
          ],
          patterns: [
            {
              group: ["**/packages/resume-content/**", "**/resume-content/src/**"],
              message:
                "Do not import resume-content by path from Storybook; use fixtures and presentation types.",
            },
            {
              group: [
                "@portfolio/frontend",
                "@portfolio/frontend/**",
                "**/apps/frontend/**",
                "**/frontend/app/**",
                "**/frontend/lib/**",
              ],
              message:
                "Storybook must not import apps/frontend: DOM UI flows props-in only, consumers compose from the Next app.",
            },
          ],
        },
      ],
    },
  },
);
