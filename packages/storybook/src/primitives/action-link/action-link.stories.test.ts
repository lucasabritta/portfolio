import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const actionLinkPrimaryPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole("link", { name: /download cv/i });
  link.focus();
  expect(link).toHaveFocus();
};

export const actionLinkSecondaryPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole("link", { name: /github/i });
  link.focus();
  expect(link).toHaveFocus();
};

export const actionLinkInlineNeutralPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole("link", { name: /phone number/i });
  link.focus();
  expect(link).toHaveFocus();
};

export const actionLinkInlineAccentPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole("link", { name: /email/i });
  link.focus();
  expect(link).toHaveFocus();
};

export const actionLinkAccentUnderlinePlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole("link", { name: /view project/i });
  link.focus();
  expect(link).toHaveFocus();
};
