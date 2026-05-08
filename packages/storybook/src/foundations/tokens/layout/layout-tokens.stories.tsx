import type { Meta, StoryObj } from "@storybook/react";

import { LayoutTokens } from "./layout-tokens";
import { layoutTokensPlay } from "./layout-tokens.stories.test";

const meta = {
  title: "Foundations/Design Tokens/Layout",
  component: LayoutTokens,
  tags: ["autodocs"],
} satisfies Meta<typeof LayoutTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: layoutTokensPlay,
};
