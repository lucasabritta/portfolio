import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect, within } from "storybook/test";

export const heroTypeDefaultPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByText("Staff software engineer")).toBeVisible();
  expect(canvas.getByRole("heading", { level: 1, name: "Jordan Example" })).toBeVisible();
  expect(
    canvas.getByText(
      "Building resilient web platforms with a focus on accessibility and performance.",
    ),
  ).toBeVisible();
};

export const heroTypeLongContentPlay: StoryPlayFn = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(
    canvas.getByText(/Principal engineer — platform infrastructure and developer experience/),
  ).toBeVisible();
  expect(
    canvas.getByRole("heading", { level: 1, name: "Alexandria Montgomery-Hughes" }),
  ).toBeVisible();
  expect(canvas.getByText(/A longer professional summary/)).toBeVisible();
};

export const heroTypeRolePlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(within(canvasElement).getByText("Staff software engineer")).toBeVisible();
};

export const heroTypeNamePlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(
    within(canvasElement).getByRole("heading", { level: 1, name: "Jordan Example" }),
  ).toBeVisible();
};

export const heroTypeLeadPlay: StoryPlayFn = async ({ canvasElement }) => {
  expect(
    within(canvasElement).getByText(
      "Building resilient web platforms with a focus on accessibility and performance.",
    ),
  ).toBeVisible();
};
