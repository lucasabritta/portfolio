import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PortfolioHero } from "./portfolio-hero";

describe("PortfolioHero", () => {
  it("renders core profile details and actions", () => {
    const { getByRole, getByText } = render(
      <PortfolioHero
        name="Alex Doe"
        role="Full-stack developer"
        summary="I build accessible web apps."
        location="Berlin, Germany"
        phone="+49 123 456 789"
        email="alex@example.com"
        downloadHref="/api/cv"
        links={[{ label: "LinkedIn", href: "https://linkedin.com/in/alex" }]}
      />,
    );

    expect(getByRole("heading", { level: 1, name: "Alex Doe" })).toBeInTheDocument();
    expect(getByText("Full-stack developer")).toBeInTheDocument();
    expect(getByText("I build accessible web apps.")).toBeInTheDocument();
    expect(getByText("Berlin, Germany")).toBeInTheDocument();
    expect(getByRole("link", { name: "Download CV" })).toHaveAttribute("href", "/api/cv");
    expect(getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/alex",
    );
  });
});
