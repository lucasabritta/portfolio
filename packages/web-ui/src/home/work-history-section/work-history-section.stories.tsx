import type { Meta, StoryObj } from "@storybook/react";

import {
  narrowMobileStory,
  workHistorySectionArgs,
  workHistorySectionEmptyArgs,
  workHistorySectionLongContentArgs,
  workHistorySectionManyItemsArgs,
} from "@ui/fixtures/cv-story-args";
import { WorkHistorySection } from "./work-history-section";

const meta = {
  title: "UI/Home/WorkHistorySection",
  component: WorkHistorySection,
  tags: ["autodocs"],
} satisfies Meta<typeof WorkHistorySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: workHistorySectionArgs(),
};

export const Empty: Story = {
  args: workHistorySectionEmptyArgs(),
};

export const LongContent: Story = {
  args: workHistorySectionLongContentArgs(),
};

export const ManyItems: Story = {
  args: workHistorySectionManyItemsArgs(),
};

export const NarrowViewport: Story = {
  args: workHistorySectionArgs(),
  ...narrowMobileStory,
};
