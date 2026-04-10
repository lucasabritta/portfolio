import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PortfolioHero } from "./portfolio-hero";

describe("PortfolioHero", () => {
  it("renders name, role, and summary", () => {
    const { getByRole, getByText } = render(
      <PortfolioHero
        name="Alex Doe"
        role="Full-stack developer"
        summary="I build accessible web apps."
      />,
    );

    expect(getByRole("heading", { level: 1, name: "Alex Doe" })).toBeInTheDocument();
    expect(getByText("Full-stack developer")).toBeInTheDocument();
    expect(getByText("I build accessible web apps.")).toBeInTheDocument();
  });
});
