import type { Meta, StoryObj } from "@storybook/react";

import {
  narrowMobileStory,
  portfolioHeroArgs,
  portfolioHeroEmptyArgs,
  portfolioHeroLongContentArgs,
} from "@ui/fixtures/cv-story-args";
import { PortfolioHero } from "@ui/hero";

import {
  portfolioHeroDefaultPlay,
  portfolioHeroEmptyPlay,
  portfolioHeroLongContentPlay,
  portfolioHeroNarrowViewportPlay,
} from "./hero.stories.test";

const meta = {
  title: "UI/Hero/PortfolioHero",
  component: PortfolioHero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PortfolioHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: portfolioHeroArgs(),
  play: portfolioHeroDefaultPlay,
};

export const Empty: Story = {
  args: portfolioHeroEmptyArgs(),
  play: portfolioHeroEmptyPlay,
};

export const LongContent: Story = {
  args: portfolioHeroLongContentArgs(),
  play: portfolioHeroLongContentPlay,
};

export const NarrowViewport: Story = {
  args: portfolioHeroArgs(),
  ...narrowMobileStory,
  play: portfolioHeroNarrowViewportPlay,
};
