import type { Meta, StoryObj } from "@storybook/react";

import { BuildPageView } from "./build-page-view";
import { buildPageDefaultPlay } from "./build-page-view.stories.test";

const meta = {
  title: "Pages/Build",
  component: BuildPageView,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BuildPageView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "How this site is built",
    lead: "A small multi-package repo with a clear split between the Next.js app, shared DOM UI, résumé data, and automated checks.",
    sections: [
      {
        id: "architecture",
        heading: "Architecture",
        body: "Frontend lives in apps/frontend. Shared browser UI ships from packages/storybook. Résumé data and types come from packages/resume-content.",
      },
      {
        id: "storybook",
        heading: "UI system and Storybook",
        body: "Storybook runs as its own workspace with Vite, a11y and docs addons, and Vitest-driven story tests.",
      },
      {
        id: "quality",
        heading: "Quality checks and CI",
        body: "GitHub Actions split lint, typecheck, unit tests, Storybook checks, and Playwright smoke tests across the packages they touch.",
      },
    ],
    ctas: [
      { label: "Open Storybook", href: "/storybook", variant: "primary", external: true },
      { label: "View projects", href: "/projects", variant: "secondary" },
    ],
  },
  play: buildPageDefaultPlay,
};
