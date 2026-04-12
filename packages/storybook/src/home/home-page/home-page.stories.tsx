import type { Meta, StoryObj } from "@storybook/react";

import { homePageViewArgs, narrowMobileStory } from "@ui/fixtures/cv-story-args";
import { HomePageView } from "@ui/home/home-page-view";

import { homePageDefaultPlay, homePageNarrowViewportPlay } from "./home-page.stories.test";

const meta = {
  title: "Pages/Home",
  component: HomePageView,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof HomePageView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: homePageViewArgs(),
  play: homePageDefaultPlay,
};

export const NarrowViewport: Story = {
  args: homePageViewArgs(),
  ...narrowMobileStory,
  play: homePageNarrowViewportPlay,
};
