import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Visible DOM primitives that indicate a presentational component is being
// rendered directly by the Next app instead of composed from `@portfolio/storybook`.
// Structural/landmark elements (`main`, `section`, `article`, `header`, `footer`,
// `nav`, `aside`, `div`, `span`, `html`, `body`) are allowed because the app is
// responsible for composition/layout.
const FORBIDDEN_APP_JSX = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "button",
  "input",
  "select",
  "textarea",
  "form",
  "label",
  "ul",
  "ol",
  "li",
  "dl",
  "img",
  "figure",
  "blockquote",
];

const forbiddenJsxRules = FORBIDDEN_APP_JSX.map((element) => ({
  selector: `JSXOpeningElement[name.name='${element}']`,
  message: `<${element}> belongs in @portfolio/storybook. apps/frontend/app/** must compose storybook components with data; presentational JSX lives in packages/storybook/src/.`,
}));

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "next-env.d.ts", "public/storybook/**"]),
  {
    // Keep app route segments purely compositional: no visible JSX primitives,
    // no local CSS modules. Presentation (markup + classes) belongs in
    // @portfolio/storybook; the app composes components with data and slots.
    // See .cursor/rules/nextjs-react.mdc and docs/agents/storybook-ui.md.
    files: ["app/**/*.tsx"],
    ignores: ["app/**/*.test.tsx"],
    rules: {
      "no-restricted-syntax": ["error", ...forbiddenJsxRules],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "./*.module.css",
                "./**/*.module.css",
                "../*.module.css",
                "../**/*.module.css",
                "@/*.module.css",
                "@/**/*.module.css",
              ],
              message:
                "CSS modules under apps/frontend/app/** belong in @portfolio/storybook. Move the styles next to a storybook component (packages/storybook/src/<feature>/) and compose it from the app. Package CSS subpaths like '@portfolio/storybook/layout.module.css' are allowed.",
            },
          ],
        },
      ],
    },
  },
]);
