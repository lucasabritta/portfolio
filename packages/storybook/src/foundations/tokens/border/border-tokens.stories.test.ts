import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const borderTokensPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Borders" })).toBeVisible();
  expect(canvas.getByText("--border-width-default")).toBeVisible();
  expect(canvas.getByText("--outline-width-strong")).toBeVisible();
};
