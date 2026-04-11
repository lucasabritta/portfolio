import type { Meta, StoryObj } from "@storybook/react";

import { cvData } from "@/lib/cv-data";
import { ProjectsSection } from "@/storybook/ui/home/projects-section";

const meta = {
  title: "UI/Home/ProjectsSection",
  component: ProjectsSection,
} satisfies Meta<typeof ProjectsSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    projects: cvData.personalProjects,
  },
};
