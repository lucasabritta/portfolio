import type { Meta, StoryObj } from "@storybook/react";

import { FeaturedWorkPreview } from "./featured-work-preview";
import { featuredWorkPreviewDefaultPlay } from "./featured-work-preview.stories.test";

const meta = {
  title: "Patterns/Home Marketing/FeaturedWorkPreview",
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
      actions: [
        {
          label: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.echoes.missingcat",
          variant: "primary",
          external: true,
        },
        {
          label: "Medium article",
          href: "https://medium.com/@lucasabritta_93729/what-i-learned-building-an-android-game-with-ai-agents-5f64d23024fe",
          variant: "secondary",
          external: true,
          icon: "medium",
        },
      ],
    },
    supporting: [
      {
        title: "Projects & GitHub",
        description: "Case study layout, pinned repositories, and outbound links.",
        href: "/projects",
        ctaLabel: "View Projects",
      },
      {
        title: "How I build this website",
        description: "Site structure, shared UI, release checks, and hosting path.",
        href: "/site-architecture",
        ctaLabel: "Read site architecture",
      },
    ],
  },
  play: featuredWorkPreviewDefaultPlay,
};
