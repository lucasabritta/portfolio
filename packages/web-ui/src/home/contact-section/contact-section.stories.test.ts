import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, userEvent, within } from "storybook/test";

import { cvData } from "@portfolio/cv";

export const contactSectionDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole("link", { name: cvData.phone }).focus();
  expect(canvas.getByRole("link", { name: cvData.phone })).toHaveFocus();
  await userEvent.tab();
  expect(canvas.getByRole("link", { name: cvData.email })).toHaveFocus();
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
  canvas.getByRole("link", { name: cvData.phone }).focus();
  await userEvent.tab();
  expect(canvas.getByRole("link", { name: new RegExp(cvData.email.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) })).toHaveFocus();
  await userEvent.tab();
  expect(canvas.getByRole("link", { name: "LinkedIn" })).toHaveFocus();
};

export const contactSectionNarrowViewportPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  canvas.getByRole("link", { name: cvData.phone }).focus();
  await userEvent.tab();
  expect(canvas.getByRole("link", { name: cvData.email })).toHaveFocus();
};
