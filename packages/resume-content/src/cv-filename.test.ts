import { describe, expect, it } from "vitest";

import { CV_FILENAME_PATTERN, buildCvFilename } from "./cv-filename";

describe("buildCvFilename", () => {
  it("always produces a filename matching CV_FILENAME_PATTERN", () => {
    const samples = [
      "Lucas Abritta",
      "Ana María O'Neill-Jr.",
      "  Spaced Name  ",
      "!!!",
      "",
      "Ω 42 ✨ test",
    ];
    for (const name of samples) {
      expect(buildCvFilename(name)).toMatch(CV_FILENAME_PATTERN);
    }
  });


  it("slugifies a simple name", () => {
    expect(buildCvFilename("Lucas Abritta")).toBe("Lucas_Abritta_CV.pdf");
  });

  it("collapses punctuation and repeated separators", () => {
    expect(buildCvFilename("Ana  María O'Neill-Jr.")).toBe("Ana_Mar_a_O_Neill_Jr_CV.pdf");
  });

  it("trims leading and trailing underscores", () => {
    expect(buildCvFilename("  Spaced Name  ")).toBe("Spaced_Name_CV.pdf");
  });

  it("falls back to 'resume' when the name slugifies to an empty string", () => {
    expect(buildCvFilename("!!!")).toBe("resume_CV.pdf");
    expect(buildCvFilename("")).toBe("resume_CV.pdf");
  });
});
