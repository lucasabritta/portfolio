import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const typographyPrimitivesPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Typography Primitives" })).toBeVisible();
  expect(canvas.getByText("--font-size-sm")).toBeVisible();
  expect(canvas.getByText("--tracking-wide-2xl")).toBeVisible();
  expect(canvas.getByText("Typography specimen demo")).toBeVisible();
  expect(canvas.getByText("Weight sample using --font-weight-semibold")).toBeVisible();
};
