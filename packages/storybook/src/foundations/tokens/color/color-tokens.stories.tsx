import type { Meta, StoryObj } from "@storybook/react";

import { ColorTokens } from "./color-tokens";
import { colorTokensPlay } from "./color-tokens.stories.test";

const meta = {
  title: "Foundations/Design Tokens/Colors",
  component: ColorTokens,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Color tokens mirror the CSS custom properties declared in globals.css and document light/dark values side by side.",
      },
    },
  },
} satisfies Meta<typeof ColorTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: colorTokensPlay,
};
