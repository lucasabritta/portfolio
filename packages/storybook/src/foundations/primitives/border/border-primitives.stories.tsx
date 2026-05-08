import type { Meta, StoryObj } from "@storybook/react";

import { BorderPrimitives } from "../primitives-reference";
import { borderPrimitivesPlay } from "./border-primitives.stories.test";

const meta = {
  title: "Foundations/Primitives/Borders",
  component: BorderPrimitives,
  tags: ["autodocs"],
} satisfies Meta<typeof BorderPrimitives>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: borderPrimitivesPlay,
};
