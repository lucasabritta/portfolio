import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const spacingPrimitivesPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Spacing Primitives" })).toBeVisible();
  expect(canvas.getByText("Default spacing unit")).toBeVisible();
  expect(canvas.getByText("Large vertical rhythm")).toBeVisible();
  expect(canvas.getByText("Spacing scale demo")).toBeVisible();
  expect(canvas.getByText("Micro spacing")).toBeVisible();
};
