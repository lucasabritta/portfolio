import type { Meta, StoryObj } from "@storybook/react";

import { SpacingTokens } from "./spacing-tokens";
import { spacingTokensPlay } from "./spacing-tokens.stories.test";

const meta = {
  title: "Foundations/Design Tokens/Spacing",
  component: SpacingTokens,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Spacing examples document the rhythm used by current cards, chips, and section layouts.",
      },
    },
  },
} satisfies Meta<typeof SpacingTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: spacingTokensPlay,
};
