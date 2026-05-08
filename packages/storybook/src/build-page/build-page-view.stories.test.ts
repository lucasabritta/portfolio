import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const buildPageDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const heading = canvas.getByRole("heading", { level: 1, name: /site architecture/i });
  expect(heading).toBeInTheDocument();
  const cta = canvas.getByRole("link", { name: /open storybook/i });
  cta.focus();
  expect(cta).toHaveFocus();
  const githubRepo = canvas.getByRole("link", {
    name: /view github repository.*opens in a new tab/i,
  });
  expect(githubRepo.querySelector("svg")).toBeTruthy();
};
