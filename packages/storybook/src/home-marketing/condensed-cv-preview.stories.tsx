import type { Meta, StoryObj } from "@storybook/react";

import { homePageArgs } from "@ui/fixtures/cv-story-args";
import { condensedCvPreviewFromHomePageProps } from "@ui/fixtures/home-marketing-story";

import { condensedCvPreviewDefaultPlay } from "./condensed-cv-preview.stories.test";
import { CondensedCvPreview } from "./condensed-cv-preview";

const meta = {
  title: "UI/HomeMarketing/CondensedCvPreview",
  component: CondensedCvPreview,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof CondensedCvPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: condensedCvPreviewFromHomePageProps(homePageArgs()),
  play: condensedCvPreviewDefaultPlay,
};
