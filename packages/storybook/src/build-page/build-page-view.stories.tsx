import type { Meta, StoryObj } from "@storybook/react";

import { BuildPageView } from "./build-page-view";
import { buildPageDefaultPlay } from "./build-page-view.stories.test";

const meta = {
  title: "Pages/Site Architecture",
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
    title: "Site architecture",
    lead: "A small multi-package repo with a clear split between the Next.js app, shared DOM UI, résumé data, automated checks, and the Vercel to Cloudflare hosting path.",
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
      {
        id: "edge",
        heading: "Vercel to Cloudflare",
        body: "Vercel serves the app while Cloudflare owns DNS and the public domain path.",
      },
    ],
    ctas: [
      { label: "Open Storybook", href: "/storybook", variant: "primary", external: true },
      {
        label: "View GitHub repository",
        href: "https://github.com/lucasabritta/portfolio",
        variant: "secondary",
        external: true,
      },
      { label: "View projects", href: "/projects", variant: "secondary" },
    ],
  },
  play: buildPageDefaultPlay,
};
