import path from "node:path";

/** @typedef {import('eslint').Rule.RuleModule} RuleModule */

const ALLOWED_TSX_PREFIXES = [
  `${path.sep}storybook${path.sep}ui${path.sep}`,
  `${path.sep}app${path.sep}`,
  `${path.sep}lib${path.sep}cv-pdf${path.sep}`,
  `${path.sep}.storybook${path.sep}`,
];

/**
 * TSX that contains JSX must live under storybook/ui (web UI), app (views),
 * lib/cv-pdf (react-pdf), or .storybook (preview).
 * @type {RuleModule}
 */
const rule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Require DOM-oriented React components to live under storybook/ui (or allowed app / react-pdf paths).",
    },
    schema: [],
    messages: {
      forbidden:
        "TSX with JSX must live under `storybook/ui/`, `app/`, `lib/cv-pdf/`, or `.storybook/`. Move this file or split view vs logic.",
    },
  },

  create(context) {
    const filename = path.normalize(context.filename);
    if (!filename.endsWith(".tsx")) {
      return {};
    }

    const lower = filename.toLowerCase();
    if (lower.includes(`${path.sep}node_modules${path.sep}`)) {
      return {};
    }

    if (ALLOWED_TSX_PREFIXES.some((prefix) => filename.includes(prefix))) {
      return {};
    }

    let reported = false;

    return {
      JSXOpeningElement(node) {
        if (reported) return;
        reported = true;
        context.report({ node, messageId: "forbidden" });
      },
    };
  },
};

export default rule;
