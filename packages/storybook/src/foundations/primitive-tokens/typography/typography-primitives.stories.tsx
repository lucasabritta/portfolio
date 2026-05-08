import type { Meta, StoryObj } from "@storybook/react";

import { TypographyPrimitives } from "./typography-primitives-section";
import { typographyPrimitivesPlay } from "./typography-primitives.stories.test";

const meta = {
  title: "Foundations/Primitives/Typography",
  component: TypographyPrimitives,
  tags: ["autodocs"],
} satisfies Meta<typeof TypographyPrimitives>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: typographyPrimitivesPlay,
};
