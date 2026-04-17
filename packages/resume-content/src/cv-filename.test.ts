import { describe, expect, it } from "vitest";

import { buildCvFilename } from "./cv-filename";

describe("buildCvFilename", () => {
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
