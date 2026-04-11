import type { Meta, StoryObj } from "@storybook/react";

import { cvData } from "@/lib/cv-data";
import { EducationSection } from "@/storybook/ui/home/education-section";

const meta = {
  title: "UI/Home/EducationSection",
  component: EducationSection,
} satisfies Meta<typeof EducationSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    education: cvData.education,
  },
};
