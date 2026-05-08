import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const buttonPrimaryPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole("link", { name: /open project/i });
  link.focus();
  expect(link).toHaveFocus();
};

export const buttonSecondaryPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole("link", { name: /github/i });
  link.focus();
  expect(link).toHaveFocus();
};

export const buttonPrimaryAsButtonPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole("button", { name: /submit/i });
  button.focus();
  expect(button).toHaveFocus();
};

export const buttonSecondaryAsButtonPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole("button", { name: /cancel/i });
  button.focus();
  expect(button).toHaveFocus();
};
