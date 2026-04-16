import type { Meta, StoryObj } from "@storybook/react";

import { projectsPageViewFixture } from "./projects-page.fixtures";
import { ProjectsPageView } from "./projects-page-view";

const meta = {
  title: "Pages/Projects",
  component: ProjectsPageView,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ProjectsPageView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: projectsPageViewFixture(),
};
