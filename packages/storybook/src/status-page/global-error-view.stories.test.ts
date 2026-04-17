import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const globalErrorDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const heading = canvas.getByRole("heading", {
    level: 1,
    name: /portfolio is temporarily unavailable/i,
  });
  expect(heading).toBeInTheDocument();
  const retry = canvas.getByRole("button", { name: /try again/i });
  retry.focus();
  expect(retry).toHaveFocus();
};

export const globalErrorHasRetryPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const heading = canvas.getByRole("heading", { level: 1 });
  expect(heading).toBeInTheDocument();
  const button = canvas.getByRole("button");
  button.focus();
  expect(button).toHaveFocus();
};
