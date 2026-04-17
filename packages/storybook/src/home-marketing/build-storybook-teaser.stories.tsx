import type { Meta, StoryObj } from "@storybook/react";

import { SYNTH_BUILD_TEASER } from "@ui/fixtures/home-marketing-story";

import { BuildStorybookTeaser } from "./build-storybook-teaser";
import { buildStorybookTeaserDefaultPlay } from "./build-storybook-teaser.stories.test";

const meta = {
  title: "UI/HomeMarketing/BuildStorybookTeaser",
  component: BuildStorybookTeaser,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BuildStorybookTeaser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: SYNTH_BUILD_TEASER,
  play: buildStorybookTeaserDefaultPlay,
};
