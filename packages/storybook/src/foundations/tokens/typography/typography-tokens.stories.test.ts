import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const typographyTokensPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: "Typography" })).toBeVisible();
  expect(canvas.getByText("Engineering systems with clear ownership.")).toBeVisible();
};
