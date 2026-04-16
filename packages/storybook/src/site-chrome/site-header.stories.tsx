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
  title: "Site chrome/Header",
  component: SiteHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function SiteHeaderStory() {
    const [mode, setMode] = useState<"system" | "light" | "dark">("system");
    return (
      <SiteHeader
        wordmarkText="Lucas Abritta"
        wordmarkHref="/"
        navItems={navItems}
        downloadCvHref="/api/cv"
        currentPath="/build"
        themeControl={<ThemeModeSwitch value={mode} onChange={setMode} />}
      />
    );
  },
};
