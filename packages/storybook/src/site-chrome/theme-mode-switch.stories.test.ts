import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, userEvent, within } from "storybook/test";

export const themeModeSwitchDefaultPlay: StoryPlayFn = async ({
  canvasElement,
}) => {
  const canvas = within(canvasElement);

  const group = canvas.getByRole("group", { name: "Theme" });
  const system = within(group).getByRole("button", { name: "System" });
  const light = within(group).getByRole("button", { name: "Light" });
  const dark = within(group).getByRole("button", { name: "Dark" });

  expect(system).toHaveAttribute("aria-pressed", "true");
  expect(light).toHaveAttribute("aria-pressed", "false");
  expect(dark).toHaveAttribute("aria-pressed", "false");

  await userEvent.click(light);
  expect(light).toHaveAttribute("aria-pressed", "true");
  expect(system).toHaveAttribute("aria-pressed", "false");

  await userEvent.click(dark);
  expect(dark).toHaveAttribute("aria-pressed", "true");
  expect(light).toHaveAttribute("aria-pressed", "false");
};
