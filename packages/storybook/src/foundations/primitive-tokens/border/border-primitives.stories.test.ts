import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const borderPrimitivesPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Border Primitives" })).toBeVisible();
  expect(canvas.getByText("--border-width-1")).toBeVisible();
  expect(canvas.getByText("--shadow-surface-sm-raw")).toBeVisible();
  expect(canvas.getByText("Border width demo")).toBeVisible();
  expect(canvas.getByText("Outline offset demo")).toBeVisible();
};
