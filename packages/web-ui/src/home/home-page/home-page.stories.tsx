import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";

import { narrowMobileStory } from "@ui/fixtures/cv-story-args";
import { HomePageView } from "@ui/home/home-page-view";

const meta = {
  title: "Pages/Home",
  component: HomePageView,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof HomePageView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const skip = canvas.getByRole("link", { name: /skip to content/i });
    skip.focus();
    expect(skip).toHaveFocus();
  },
};

export const NarrowViewport: Story = {
  ...narrowMobileStory,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const skip = canvas.getByRole("link", { name: /skip to content/i });
    skip.focus();
    expect(skip).toHaveFocus();
  },
};
