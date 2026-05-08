import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const layoutPrimitivesPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Layout Primitives" })).toBeVisible();
  expect(canvas.getByText("Raw container width primitive")).toBeVisible();
  expect(canvas.getByText("Raw default hit target size")).toBeVisible();
  expect(canvas.getByText("Layout width demo")).toBeVisible();
  expect(canvas.getByText("Hit target demo")).toBeVisible();
};
