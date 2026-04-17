import type { Meta, StoryObj } from "@storybook/react";

import { SkipToMain } from "./skip-to-main";
import { skipToMainDefaultPlay } from "./skip-to-main.stories.test";

const meta = {
  title: "UI/SiteChrome/SkipToMain",
  component: SkipToMain,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SkipToMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: skipToMainDefaultPlay,
};
