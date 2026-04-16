import type { Meta, StoryObj } from "@storybook/react";

import { homePageArgs } from "@ui/fixtures/cv-story-args";
import { homeLeadHeroFromHomePageProps } from "@ui/fixtures/home-marketing-story";

import { homeLeadHeroDefaultPlay } from "./home-lead-hero.stories.test";
import { HomeLeadHero } from "./home-lead-hero";

const meta = {
  title: "UI/HomeMarketing/HomeLeadHero",
  component: HomeLeadHero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HomeLeadHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: homeLeadHeroFromHomePageProps(homePageArgs()),
  play: homeLeadHeroDefaultPlay,
};
