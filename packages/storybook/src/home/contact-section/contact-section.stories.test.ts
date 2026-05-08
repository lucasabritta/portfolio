import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, userEvent, within } from "storybook/test";

import { storyFixtureEmail, storyFixturePhone, SYNTH_LINKEDIN } from "@ui/fixtures/cv-story-args";

export const contactSectionDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole("link", { name: storyFixturePhone }).focus();
  expect(canvas.getByRole("link", { name: storyFixturePhone })).toHaveFocus();
  await userEvent.tab();
  expect(canvas.getByRole("link", { name: storyFixtureEmail })).toHaveFocus();
  const linkedin = canvas.getByRole("link", { name: /LinkedIn.*opens in a new tab/i });
  expect(linkedin).toHaveAttribute("href", SYNTH_LINKEDIN);
  expect(linkedin.querySelector("svg")).toBeTruthy();
};

export const contactSectionEmptyPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.queryAllByRole("link")).toHaveLength(0);
  expect(canvas.getByLabelText("Phone not provided")).toBeInTheDocument();
  expect(canvas.getByLabelText("Email not provided")).toBeInTheDocument();
  expect(canvas.getByLabelText("LinkedIn not provided")).toBeInTheDocument();
};

export const contactSectionLongContentPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole("link", { name: storyFixturePhone }).focus();
  await userEvent.tab();
  expect(
    canvas.getByRole("link", {
      name: new RegExp(storyFixtureEmail.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    }),
  ).toHaveFocus();
  await userEvent.tab();
  expect(canvas.getByRole("link", { name: /LinkedIn.*opens in a new tab/i })).toHaveFocus();
};

export const contactSectionNarrowViewportPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole("link", { name: storyFixturePhone }).focus();
  await userEvent.tab();
  expect(canvas.getByRole("link", { name: storyFixtureEmail })).toHaveFocus();
};
