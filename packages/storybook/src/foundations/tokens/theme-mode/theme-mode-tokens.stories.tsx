import type { Meta, StoryObj } from "@storybook/react";

import { ThemeModeTokens } from "./theme-mode-tokens";
import { themeModeTokensPlay } from "./theme-mode-tokens.stories.test";

const meta = {
  title: "Foundations/Design Tokens/Theme Modes",
  component: ThemeModeTokens,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Theme mode samples pin the same data-theme token overrides used by the app bootstrap script.",
      },
    },
  },
} satisfies Meta<typeof ThemeModeTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: themeModeTokensPlay,
};
