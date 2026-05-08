import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const layoutPrimitivesPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Layout Primitives" })).toBeVisible();
  expect(canvas.getByText("--size-layout-container-max")).toBeVisible();
  expect(canvas.getByText("--size-control-hit-md")).toBeVisible();
};
