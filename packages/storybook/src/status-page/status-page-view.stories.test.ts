import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const statusPageDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const heading = canvas.getByRole("heading", { level: 1, name: /page not found/i });
  expect(heading).toBeInTheDocument();
  const homeLink = canvas.getByRole("link", { name: /back to home/i });
  homeLink.focus();
  expect(homeLink).toHaveFocus();
};

export const statusPageLoadingPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const liveRegion = canvas.getByRole("status");
  expect(liveRegion).toHaveAttribute("aria-live", "polite");
  expect(liveRegion).toHaveTextContent(/loading/i);
};

export const statusPageErrorPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const heading = canvas.getByRole("heading", { level: 1, name: /something went wrong/i });
  expect(heading).toBeInTheDocument();
  const retry = canvas.getByRole("button", { name: /try again/i });
  retry.focus();
  expect(retry).toHaveFocus();
};
