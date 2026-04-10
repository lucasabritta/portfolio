import { beforeEach, describe, expect, it, vi } from "vitest";

const registerMock = vi.fn();
const registerHyphenationCallbackMock = vi.fn();

vi.mock("@react-pdf/renderer", () => ({
  Font: {
    register: registerMock,
    registerHyphenationCallback: registerHyphenationCallbackMock,
  },
}));

describe("cv pdf font registration", () => {
  beforeEach(() => {
    registerMock.mockClear();
    registerHyphenationCallbackMock.mockClear();
  });

  it("registers only web font sources to stay platform-agnostic", async () => {
    await import("@/components/cv-pdf/fonts");

    const fontSources = registerMock.mock.calls.flatMap(([definition]) => {
      if (Array.isArray(definition.fonts)) {
        return definition.fonts.map((font: { src: string }) => font.src);
      }

      if (typeof definition.src === "string") {
        return [definition.src];
      }

      return [];
    });

    expect(fontSources.length).toBeGreaterThan(0);
    expect(fontSources.every((src) => /^https?:\/\//.test(src))).toBe(true);
  });
});
