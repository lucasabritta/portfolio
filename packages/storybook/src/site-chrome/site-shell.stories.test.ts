import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const siteShellPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("link", { name: /skip to content/i })).toBeInTheDocument();
  expect(canvas.getByRole("banner")).toBeInTheDocument();
  expect(canvas.getByRole("contentinfo")).toBeInTheDocument();
  expect(canvas.getByText(/page body content/i)).toBeInTheDocument();
};
