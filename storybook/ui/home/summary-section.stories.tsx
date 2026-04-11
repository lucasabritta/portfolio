import type { Meta, StoryObj } from "@storybook/react";

import { cvData } from "@/lib/cv-data";
import { SummarySection } from "@/storybook/ui/home/summary-section";

const meta = {
  title: "UI/Home/SummarySection",
  component: SummarySection,
} satisfies Meta<typeof SummarySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    summaryHighlights: cvData.summaryHighlights,
    techStack: cvData.techStack,
  },
};
