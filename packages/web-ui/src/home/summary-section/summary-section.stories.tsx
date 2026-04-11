import type { Meta, StoryObj } from "@storybook/react";

import {
  narrowMobileStory,
  summarySectionArgs,
  summarySectionEmptyArgs,
  summarySectionLongContentArgs,
} from "@ui/fixtures/cv-story-args";
import { SummarySection } from "./summary-section";

const meta = {
  title: "UI/Home/SummarySection",
  component: SummarySection,
  tags: ["autodocs"],
} satisfies Meta<typeof SummarySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: summarySectionArgs(),
};

export const Empty: Story = {
  args: summarySectionEmptyArgs(),
};

export const LongContent: Story = {
  args: summarySectionLongContentArgs(),
};

export const NarrowViewport: Story = {
  args: summarySectionArgs(),
  ...narrowMobileStory,
};
