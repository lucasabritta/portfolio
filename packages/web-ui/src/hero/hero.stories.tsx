import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";

import { cvData } from "@portfolio/cv";
import {
  narrowMobileStory,
  portfolioHeroArgs,
  portfolioHeroEmptyArgs,
  portfolioHeroLongContentArgs,
} from "@ui/fixtures/cv-story-args";
import { PortfolioHero } from "@ui/hero";

const meta = {
  title: "UI/Hero/PortfolioHero",
  component: PortfolioHero,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PortfolioHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: portfolioHeroArgs(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByRole("link", { name: cvData.phone }).focus();
    expect(canvas.getByRole("link", { name: cvData.phone })).toHaveFocus();
    await userEvent.tab();
    expect(canvas.getByRole("link", { name: cvData.email })).toHaveFocus();
  },
};

export const Empty: Story = {
  args: portfolioHeroEmptyArgs(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByRole("link", { name: "Phone not provided" }).focus();
    await userEvent.tab();
    expect(canvas.getByRole("link", { name: "Email not provided" })).toHaveFocus();
    await userEvent.tab();
    expect(canvas.getByRole("link", { name: /download cv/i })).toHaveFocus();
  },
};

export const LongContent: Story = {
  args: portfolioHeroLongContentArgs(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByRole("link", { name: cvData.phone }).focus();
    await userEvent.tab();
    expect(canvas.getByRole("link", { name: cvData.email })).toHaveFocus();
  },
};

export const NarrowViewport: Story = {
  args: portfolioHeroArgs(),
  ...narrowMobileStory,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    canvas.getByRole("link", { name: cvData.phone }).focus();
    await userEvent.tab();
    expect(canvas.getByRole("link", { name: cvData.email })).toHaveFocus();
  },
};
