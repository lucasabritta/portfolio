import storybookUiBoundary from "./rules/storybook-ui-boundary.mjs";

const plugin = {
  meta: { name: "eslint-plugin-portfolio", version: "0.0.0" },
  rules: {
    "storybook-ui-boundary": storybookUiBoundary,
  },
};

export default plugin;
