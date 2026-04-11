import type { Meta, StoryObj } from "@storybook/react";

import {
  narrowMobileStory,
  workHistorySectionArgs,
  workHistorySectionEmptyArgs,
  workHistorySectionLongContentArgs,
  workHistorySectionManyItemsArgs,
} from "@ui/fixtures/cv-story-args";
import { WorkHistorySection } from "./work-history-section";
import {
  workHistorySectionDefaultPlay,
  workHistorySectionEmptyPlay,
  workHistorySectionLongContentPlay,
  workHistorySectionManyItemsPlay,
  workHistorySectionNarrowViewportPlay,
} from "./work-history-section.stories.test";

const meta = {
  title: "UI/Sections/WorkHistorySection",
  component: WorkHistorySection,
  tags: ["autodocs"],
} satisfies Meta<typeof WorkHistorySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: workHistorySectionArgs(),
  play: workHistorySectionDefaultPlay,
};

export const Empty: Story = {
  args: workHistorySectionEmptyArgs(),
  play: workHistorySectionEmptyPlay,
};

export const LongContent: Story = {
  args: workHistorySectionLongContentArgs(),
  play: workHistorySectionLongContentPlay,
};

export const ManyItems: Story = {
  args: workHistorySectionManyItemsArgs(),
  play: workHistorySectionManyItemsPlay,
};

export const NarrowViewport: Story = {
  args: workHistorySectionArgs(),
  ...narrowMobileStory,
  play: workHistorySectionNarrowViewportPlay,
};
