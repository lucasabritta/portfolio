import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

import { storyFixtureHighlight, storyFixtureTech } from "@ui/fixtures/cv-story-args";

export const summarySectionDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: /professional summary/i })).toBeVisible();
  expect(canvas.getByText(storyFixtureHighlight)).toBeVisible();
  expect(canvas.getByText(storyFixtureTech)).toBeVisible();
};

export const summarySectionEmptyPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const statuses = canvas.getAllByRole("status");
  expect(statuses).toHaveLength(2);
  expect(statuses[0]).toHaveTextContent(/no summary highlights listed/i);
  expect(statuses[1]).toHaveTextContent(/no technologies listed/i);
};

export const summarySectionLongContentPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: /professional summary/i })).toBeVisible();
  expect(
    canvas.getByText(new RegExp(storyFixtureHighlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))),
  ).toBeVisible();
  expect(canvas.getAllByText(/\(primary\)/).length).toBeGreaterThan(0);
};

export const summarySectionNarrowViewportPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: /professional summary/i })).toBeVisible();
  expect(canvas.getByText(storyFixtureHighlight)).toBeVisible();
};
