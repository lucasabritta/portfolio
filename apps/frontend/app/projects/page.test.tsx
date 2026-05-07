/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import ProjectsPage from "./page";

afterEach(() => {
  cleanup();
});

describe("Projects page", () => {
  it("renders flagship game narrative and pinned repos", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Echoes of the missing cat" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Hardest problem" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pinned GitHub repositories" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Google Play/i })).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.echoes.missingcat",
    );
    expect(screen.getByRole("link", { name: /Medium article/i })).toHaveAttribute(
      "href",
      "https://medium.com/@lucasabritta_93729/what-i-learned-building-an-android-game-with-ai-agents-5f64d23024fe",
    );
  });
});
