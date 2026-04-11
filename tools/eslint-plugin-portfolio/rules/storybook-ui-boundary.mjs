import path from "node:path";

/** @typedef {import('eslint').Rule.RuleModule} RuleModule */

const ALLOWED_TSX_PREFIXES = [
  `${path.sep}packages${path.sep}web-ui${path.sep}src${path.sep}`,
  `${path.sep}apps${path.sep}web${path.sep}app${path.sep}`,
  `${path.sep}apps${path.sep}web${path.sep}lib${path.sep}cv-pdf${path.sep}`,
  `${path.sep}packages${path.sep}web-ui${path.sep}.storybook${path.sep}`,
];

/**
 * TSX that contains JSX must live under packages/web-ui/src (design system),
 * apps/web/app (Next views), apps/web/lib/cv-pdf (react-pdf), or web-ui .storybook (preview).
 * @type {RuleModule}
 */
const rule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Require DOM-oriented React components to live under `packages/web-ui/src/` (or allowed app / react-pdf paths).",
    },
    schema: [],
    messages: {
      forbidden:
        "TSX with JSX must live under `packages/web-ui/src/`, `apps/web/app/`, `apps/web/lib/cv-pdf/`, or `packages/web-ui/.storybook/`. Move this file or split view vs logic.",
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
