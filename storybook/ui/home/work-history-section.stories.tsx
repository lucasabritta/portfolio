import type { Meta, StoryObj } from "@storybook/react";

import { cvData } from "@/lib/cv-data";
import { WorkHistorySection } from "@/storybook/ui/home/work-history-section";

const meta = {
  title: "UI/Home/WorkHistorySection",
  component: WorkHistorySection,
} satisfies Meta<typeof WorkHistorySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    workHistory: cvData.workHistory,
  },
};
