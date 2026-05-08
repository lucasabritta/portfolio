import type { Meta, StoryObj } from "@storybook/react";

import { ColorPrimitives } from "../primitives-reference";
import { colorPrimitivesPlay } from "./color-primitives.stories.test";

const meta = {
  title: "Foundations/Primitives/Colors",
  component: ColorPrimitives,
  tags: ["autodocs"],
} satisfies Meta<typeof ColorPrimitives>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: colorPrimitivesPlay,
};
