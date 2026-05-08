import type { Meta, StoryObj } from "@storybook/react";

import { BorderTokens } from "./border-tokens";
import { borderTokensPlay } from "./border-tokens.stories.test";

const meta = {
  title: "Foundations/Design Tokens/Borders",
  component: BorderTokens,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Border and outline tokens define consistent widths and focus offsets across Storybook primitives and page patterns.",
      },
    },
  },
} satisfies Meta<typeof BorderTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: borderTokensPlay,
};
