import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

import { storyFixtureEducationCount, storyFixtureEducationInstitution } from "@ui/fixtures/cv-story-args";

export const educationSectionDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: /^education$/i })).toBeVisible();
  const articles = canvas.getAllByRole("article");
  expect(articles.length).toBeGreaterThan(0);
  expect(canvas.getByText(storyFixtureEducationInstitution)).toBeVisible();
};

export const educationSectionEmptyPlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(within(canvasElement).getByRole("status")).toHaveTextContent(/no education entries listed/i);
};

export const educationSectionLongContentPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: /^education$/i })).toBeVisible();
  expect(canvas.getAllByRole("article").length).toBeGreaterThan(0);
  expect(
    canvas.getByText(new RegExp(storyFixtureEducationInstitution.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))),
  ).toBeVisible();
};

export const educationSectionManyItemsPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getAllByRole("article")).toHaveLength(storyFixtureEducationCount * 2);
};

export const educationSectionNarrowViewportPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: /^education$/i })).toBeVisible();
  expect(canvas.getAllByRole("article").length).toBeGreaterThan(0);
};
