import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

import { cvData } from "@portfolio/cv";

export const certificationsSectionDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: /^certifications$/i })).toBeVisible();
  expect(canvas.getAllByRole("article").length).toBeGreaterThan(0);
  const first = cvData.certifications[0];
  if (first) {
    expect(canvas.getByText(first)).toBeVisible();
  }
};

export const certificationsSectionEmptyPlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(within(canvasElement).getByRole("status")).toHaveTextContent(/no certifications listed/i);
};

export const certificationsSectionLongContentPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: /^certifications$/i })).toBeVisible();
  expect(canvas.getAllByRole("article").length).toBeGreaterThan(cvData.certifications.length);
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
