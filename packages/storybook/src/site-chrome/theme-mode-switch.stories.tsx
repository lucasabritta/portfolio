import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { ThemeModeSwitch } from "./theme-mode-switch";

function ThemeSwitchDemo() {
  const [value, setValue] = useState<"system" | "light" | "dark">("system");
  return <ThemeModeSwitch value={value} onChange={setValue} />;
}

const meta = {
  title: "Site chrome/Theme mode",
  component: ThemeSwitchDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeSwitchDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
