import type { StoryPlayFn } from "@ui/storybook-play-types";
import { expect } from "storybook/test";

export const brandIconGithubPlay: StoryPlayFn = async ({ canvasElement }) => {
  const svg = canvasElement.querySelector("svg");
  expect(svg).toBeTruthy();
  expect(svg?.querySelector("path")).toBeTruthy();
};

export const brandIconLinkedinPlay: StoryPlayFn = async ({ canvasElement }) => {
  const svg = canvasElement.querySelector("svg");
  expect(svg).toBeTruthy();
  expect(svg?.querySelector("path")).toBeTruthy();
};

export const brandIconMediumPlay: StoryPlayFn = async ({ canvasElement }) => {
  const svg = canvasElement.querySelector("svg");
  expect(svg).toBeTruthy();
  expect(svg?.querySelector("path")).toBeTruthy();
};

export const brandIconGooglePlayPlay: StoryPlayFn = async ({ canvasElement }) => {
  const svg = canvasElement.querySelector("svg");
  expect(svg).toBeTruthy();
  expect(svg?.querySelector("path")).toBeTruthy();
};
