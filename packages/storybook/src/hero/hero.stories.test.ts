import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, userEvent, within } from "storybook/test";

import { storyFixtureEmail, storyFixturePhone } from "@ui/fixtures/cv-story-args";

export const portfolioHeroDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole("link", { name: storyFixturePhone }).focus();
  expect(canvas.getByRole("link", { name: storyFixturePhone })).toHaveFocus();
  await userEvent.tab();
  expect(canvas.getByRole("link", { name: storyFixtureEmail })).toHaveFocus();
};

export const portfolioHeroEmptyPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByLabelText("Role not provided")).toBeInTheDocument();
  expect(canvas.getByLabelText("Name not provided")).toBeInTheDocument();
  expect(canvas.getByLabelText("Summary not provided")).toBeInTheDocument();
  expect(canvas.getByLabelText("Location not provided")).toBeInTheDocument();
  expect(canvas.getByLabelText("Phone not provided")).toBeInTheDocument();
  expect(canvas.getByLabelText("Email not provided")).toBeInTheDocument();
  const download = canvas.getByRole("link", { name: /download cv/i });
  download.focus();
  expect(download).toHaveFocus();
};

export const portfolioHeroLongContentPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole("link", { name: storyFixturePhone }).focus();
  await userEvent.tab();
  expect(canvas.getByRole("link", { name: storyFixtureEmail })).toHaveFocus();
};

export const portfolioHeroNarrowViewportPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole("link", { name: storyFixturePhone }).focus();
  await userEvent.tab();
  expect(canvas.getByRole("link", { name: storyFixtureEmail })).toHaveFocus();
};
