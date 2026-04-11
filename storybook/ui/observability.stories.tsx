import type { Meta, StoryObj } from "@storybook/react";

import { Observability } from "@/storybook/ui/observability";

const meta = {
  title: "UI/Layout/Observability",
  component: Observability,
} satisfies Meta<typeof Observability>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
