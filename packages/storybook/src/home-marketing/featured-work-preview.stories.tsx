import type { Meta, StoryObj } from "@storybook/react";

import { FeaturedWorkPreview } from "./featured-work-preview";
import { featuredWorkPreviewDefaultPlay } from "./featured-work-preview.stories.test";

const meta = {
  title: "UI/HomeMarketing/FeaturedWorkPreview",
  component: FeaturedWorkPreview,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FeaturedWorkPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: "Recent work",
    flagship: {
      title: "Flagship: Echoes — Missing Cat",
      description:
        "A short narrative mobile game on Android, designed as a platform to experiment with LLM-assisted workflows end to end.",
      href: "https://play.google.com/store/apps/details?id=com.echoes.missingcat",
      ctaLabel: "Google Play",
      external: true,
    },
    supporting: [
      {
        title: "Projects & GitHub",
        description: "Case study layout, pinned repositories, and outbound links.",
        href: "/projects",
        ctaLabel: "View Projects",
      },
      {
        title: "Build story",
        description: "Monorepo, Storybook, CI, and how this site is hosted.",
        href: "/build",
        ctaLabel: "Read build notes",
      },
    ],
  },
  play: featuredWorkPreviewDefaultPlay,
};
