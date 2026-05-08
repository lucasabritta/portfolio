import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const linkInlineNeutralPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole("link", { name: /phone number/i });
  link.focus();
  expect(link).toHaveFocus();
};

export const linkInlineAccentPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole("link", { name: /email/i });
  link.focus();
  expect(link).toHaveFocus();
};

export const linkAccentUnderlinePlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole("link", { name: /view project/i });
  link.focus();
  expect(link).toHaveFocus();
};

export const linkAccentUnderlineMediumPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole("link", { name: /medium article/i });
  link.focus();
  expect(link).toHaveFocus();
};

export const linkAccentChipPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const link = canvas.getByRole("link", { name: /contacts/i });
  expect(link).toHaveAttribute("href", "#contact-heading");
  link.focus();
  expect(link).toHaveFocus();
};
