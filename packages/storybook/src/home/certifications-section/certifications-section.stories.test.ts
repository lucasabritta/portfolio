import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

import { storyFixtureCert, storyFixtureCertCount } from "@ui/fixtures/cv-story-args";

export const certificationsSectionDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: /^certifications$/i })).toBeVisible();
  expect(canvas.getAllByRole("article").length).toBeGreaterThan(0);
  expect(canvas.getByText(storyFixtureCert)).toBeVisible();
};

export const certificationsSectionEmptyPlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(within(canvasElement).getByRole("status")).toHaveTextContent(/no certifications listed/i);
};

export const certificationsSectionLongContentPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: /^certifications$/i })).toBeVisible();
  expect(canvas.getAllByRole("article").length).toBeGreaterThan(storyFixtureCertCount);
};

export const certificationsSectionManyItemsPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getAllByRole("article").length).toBeGreaterThan(10);
};

export const certificationsSectionNarrowViewportPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: /^certifications$/i })).toBeVisible();
  expect(canvas.getAllByRole("article").length).toBeGreaterThan(0);
};
