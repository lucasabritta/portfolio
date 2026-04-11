import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

import { cvData } from "@portfolio/cv";

export const educationSectionDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: /^education$/i })).toBeVisible();
  const articles = canvas.getAllByRole("article");
  expect(articles.length).toBeGreaterThan(0);
  const first = cvData.education[0];
  if (first) {
    expect(canvas.getByText(first.institution)).toBeVisible();
  }
};

export const educationSectionEmptyPlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(within(canvasElement).getByRole("status")).toHaveTextContent(/no education entries listed/i);
};

export const educationSectionLongContentPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: /^education$/i })).toBeVisible();
  expect(canvas.getAllByRole("article").length).toBeGreaterThan(0);
  const first = cvData.education[0];
  if (first) {
    expect(canvas.getByText(new RegExp(first.institution.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))).toBeVisible();
  }
};

export const educationSectionManyItemsPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const n = cvData.education.length;
  expect(canvas.getAllByRole("article")).toHaveLength(n * 2);
};

export const educationSectionNarrowViewportPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByRole("heading", { name: /^education$/i })).toBeVisible();
  expect(canvas.getAllByRole("article").length).toBeGreaterThan(0);
};
