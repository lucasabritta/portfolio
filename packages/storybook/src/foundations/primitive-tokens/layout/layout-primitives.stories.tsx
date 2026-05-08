import type { Meta, StoryObj } from "@storybook/react";

import { LayoutPrimitives } from "./layout-primitives-section";
import { layoutPrimitivesPlay } from "./layout-primitives.stories.test";

const meta = {
  title: "Foundations/Primitives/Layout",
  component: LayoutPrimitives,
  tags: ["autodocs"],
} satisfies Meta<typeof LayoutPrimitives>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: layoutPrimitivesPlay,
};
