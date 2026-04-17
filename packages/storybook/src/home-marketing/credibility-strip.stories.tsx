import type { Meta, StoryObj } from "@storybook/react";

import { SYNTH_CREDIBILITY_ITEMS } from "@ui/fixtures/home-marketing-story";

import { CredibilityStrip } from "./credibility-strip";
import { credibilityStripDefaultPlay } from "./credibility-strip.stories.test";

const meta = {
  title: "UI/HomeMarketing/CredibilityStrip",
  component: CredibilityStrip,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CredibilityStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: SYNTH_CREDIBILITY_ITEMS,
  },
  play: credibilityStripDefaultPlay,
};
