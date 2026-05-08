import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const borderTokensPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Borders" })).toBeVisible();
  expect(canvas.getByText("--border-width-default")).toBeVisible();
  expect(canvas.getByText("--outline-width-strong")).toBeVisible();
  expect(canvas.getByText("Border width examples")).toBeVisible();
  expect(canvas.getByText("Outline and offset examples")).toBeVisible();
  expect(canvas.getByText("Shadow examples")).toBeVisible();
};
