import type { Meta, StoryObj } from "@storybook/react";

import { SpacingPrimitives } from "./spacing-primitives-section";
import { spacingPrimitivesPlay } from "./spacing-primitives.stories.test";

const meta = {
  title: "Foundations/Primitives/Spacing",
  component: SpacingPrimitives,
  tags: ["autodocs"],
} satisfies Meta<typeof SpacingPrimitives>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: spacingPrimitivesPlay,
};
