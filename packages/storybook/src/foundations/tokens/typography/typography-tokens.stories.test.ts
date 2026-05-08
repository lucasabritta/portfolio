import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const typographyTokensPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Typography" })).toBeVisible();
  expect(canvas.getByText("Engineering systems with clear ownership.")).toBeVisible();
  expect(canvas.getByText("Type scale demo")).toBeVisible();
  expect(canvas.getByText("Weight and tracking demo")).toBeVisible();
  expect(canvas.getByText("caption · --text-size-caption")).toBeVisible();
  expect(canvas.getByText("TRACKING WIDE · --text-tracking-wide-2xl")).toBeVisible();
};
