import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const themeModeTokensPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Theme Modes" })).toBeVisible();
  expect(canvas.getByText("light mode")).toBeVisible();
  expect(canvas.getByText("dark mode")).toBeVisible();
};
