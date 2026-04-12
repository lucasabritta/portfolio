import type { Meta, StoryObj } from "@storybook/react";

import {
  narrowMobileStory,
  summarySectionArgs,
  summarySectionEmptyArgs,
  summarySectionLongContentArgs,
} from "@ui/fixtures/cv-story-args";
import { SummarySection } from "./summary-section";
import {
  summarySectionDefaultPlay,
  summarySectionEmptyPlay,
  summarySectionLongContentPlay,
  summarySectionNarrowViewportPlay,
} from "./summary-section.stories.test";

const meta = {
  title: "UI/Sections/SummarySection",
  component: SummarySection,
  tags: ["autodocs"],
} satisfies Meta<typeof SummarySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: summarySectionArgs(),
  play: summarySectionDefaultPlay,
};

export const Empty: Story = {
  args: summarySectionEmptyArgs(),
  play: summarySectionEmptyPlay,
};

export const LongContent: Story = {
  args: summarySectionLongContentArgs(),
  play: summarySectionLongContentPlay,
};

export const NarrowViewport: Story = {
  args: summarySectionArgs(),
  ...narrowMobileStory,
  play: summarySectionNarrowViewportPlay,
};
