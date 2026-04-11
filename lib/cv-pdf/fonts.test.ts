import path from "node:path";

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

  it("registers bundled TTFs under public/cv-fonts (Word/Lato+Raleway parity)", async () => {
    await import("@/lib/cv-pdf/fonts");

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
    expect(fontSources.every((src) => src.endsWith(".ttf"))).toBe(true);
    expect(fontSources.every((src) => src.includes(`${path.sep}public${path.sep}cv-fonts${path.sep}`))).toBe(
      true,
    );
  });
});
