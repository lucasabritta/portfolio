/**
 * @vitest-environment node
 */
import { afterAll, afterEach, describe, expect, it, vi } from "vitest";

const { createCvPdfDownloadResponseMock } = vi.hoisted(() => ({
  createCvPdfDownloadResponseMock: vi.fn(),
}));

vi.mock("@/lib/cv-pdf-download-response", () => ({
  createCvPdfDownloadResponse: createCvPdfDownloadResponseMock,
}));

import { GET } from "./route";

const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

afterEach(() => {
  createCvPdfDownloadResponseMock.mockReset();
  consoleErrorMock.mockClear();
});

afterAll(() => {
  consoleErrorMock.mockRestore();
});

describe("GET /api/cv route", () => {
  it("returns local cv generation response", async () => {
    createCvPdfDownloadResponseMock.mockResolvedValue(
      new Response(Uint8Array.from([9, 8, 7]), {
        status: 206,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="sample.pdf"',
          "Cache-Control": "private, max-age=0, must-revalidate",
        },
      }),
    );

    const response = await GET();

    expect(createCvPdfDownloadResponseMock).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(206);
    expect(Array.from(new Uint8Array(await response.arrayBuffer()))).toEqual([9, 8, 7]);
    expect(response.headers.get("content-type")).toBe("application/pdf");
    expect(response.headers.get("content-disposition")).toBe('attachment; filename="sample.pdf"');
    expect(response.headers.get("cache-control")).toBe("private, max-age=0, must-revalidate");
  });

  it("returns 502 when local generation fails", async () => {
    createCvPdfDownloadResponseMock.mockRejectedValue(new Error("boom"));

    const response = await GET();

    expect(response.status).toBe(502);
    await expect(response.text()).resolves.toContain("temporarily unavailable");
  });
});
