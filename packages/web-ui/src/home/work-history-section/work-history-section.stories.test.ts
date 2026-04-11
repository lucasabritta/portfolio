import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

import { cvData } from "@portfolio/cv";

export const workHistorySectionDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: /^work history$/i })).toBeVisible();
  expect(canvas.getAllByRole("article").length).toBeGreaterThan(0);
  const first = cvData.workHistory[0];
  if (first) {
    expect(canvas.getByRole("heading", { level: 3, name: new RegExp(first.company) })).toBeVisible();
  }
};

export const workHistorySectionEmptyPlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(within(canvasElement).getByRole("status")).toHaveTextContent(/no work history entries listed/i);
};

export const workHistorySectionLongContentPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: /^work history$/i })).toBeVisible();
  expect(canvas.getAllByRole("article")).toHaveLength(1);
  const first = cvData.workHistory[0];
  if (first) {
    expect(canvas.getByRole("heading", { level: 3, name: new RegExp(first.company) })).toBeVisible();
  }
};

export const workHistorySectionManyItemsPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const count = canvas.getAllByRole("article").length;
  if (cvData.workHistory.length > 0) {
    expect(count).toBeGreaterThanOrEqual(6);
  } else {
    expect(count).toBe(0);
  }
};

export const workHistorySectionNarrowViewportPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: /^work history$/i })).toBeVisible();
  expect(canvas.getAllByRole("article").length).toBeGreaterThan(0);
};
