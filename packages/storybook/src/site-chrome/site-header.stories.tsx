import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { SiteHeader } from "./site-header";
import { ThemeModeSwitch } from "./theme-mode-switch";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Build", href: "/build" },
  { label: "CV", href: "/#resume" },
];

const meta = {
  title: "UI/SiteChrome/Header",
  component: SiteHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    wordmarkText: "Lucas Abritta",
    wordmarkHref: "/",
    navItems,
    downloadCvHref: "/api/cv",
    currentPath: "/build",
    themeControl: <></>,
  },
  render: function SiteHeaderStory(args) {
    const [mode, setMode] = useState<"system" | "light" | "dark">("system");
    return (
      <SiteHeader
        {...args}
        themeControl={<ThemeModeSwitch value={mode} onChange={setMode} />}
      />
    );
  },
};
