import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const homePageShellPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("main")).toBeVisible();
  expect(canvas.getByRole("heading", { name: "Hero section" })).toBeVisible();
  expect(canvas.getByRole("heading", { name: "Featured work" })).toBeVisible();
};
