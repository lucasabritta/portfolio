import type { Meta, StoryObj } from "@storybook/react";

import { HomePageView } from "@/app/page.view";

const meta = {
  title: "Pages/Home",
  component: HomePageView,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof HomePageView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
