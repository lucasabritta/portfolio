import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const colorTokensPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Color Tokens" })).toBeVisible();
  expect(canvas.getByText("--background")).toBeVisible();
  expect(canvas.getByText("--accent")).toBeVisible();
};
