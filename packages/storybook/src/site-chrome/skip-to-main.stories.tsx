import type { Meta, StoryObj } from "@storybook/react";

import { SkipToMain } from "./skip-to-main";

const meta = {
  title: "Site chrome/Skip to main",
  component: SkipToMain,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SkipToMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
