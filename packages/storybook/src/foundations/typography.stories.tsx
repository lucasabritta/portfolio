import type { Meta, StoryObj } from "@storybook/react";

import { TypographyTokens } from "./foundation-tokens";
import { typographyTokensPlay } from "./foundation-tokens.stories.test";

const meta = {
  title: "Foundations/Design Tokens/Typography",
  component: TypographyTokens,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Typography tokens show the Geist font variables shared by the app root layout and Storybook preview.",
      },
    },
  },
} satisfies Meta<typeof TypographyTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: typographyTokensPlay,
};
