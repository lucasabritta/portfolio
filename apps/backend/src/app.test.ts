import { afterEach, describe, expect, it, vi } from "vitest";

import type { BinaryHttpPayload } from "./cv-pdf-download-response";

const createCvPdfDownloadPayloadMock = vi.hoisted(() => vi.fn<() => Promise<BinaryHttpPayload>>());

vi.mock("./cv-pdf-download-response", () => ({
  createCvPdfDownloadPayload: createCvPdfDownloadPayloadMock,
}));

import { buildBackendServer } from "./app";

afterEach(() => {
  createCvPdfDownloadPayloadMock.mockReset();
});

describe("backend Fastify app", () => {
  it("responds to health checks", async () => {
    const app = await buildBackendServer();
    const response = await app.inject({ method: "GET", url: "/api/health" });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ ok: true });

    await app.close();
  });

  it("serves cv payload with binary body and headers", async () => {
    createCvPdfDownloadPayloadMock.mockResolvedValue({
      body: Uint8Array.from([1, 2, 3]),
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="test.pdf"',
      },
      status: 202,
    });

    const app = await buildBackendServer();
    const response = await app.inject({ method: "GET", url: "/api/cv" });

    expect(response.statusCode).toBe(202);
    expect(response.headers["content-type"]).toContain("application/pdf");
    expect(response.headers["content-disposition"]).toBe('attachment; filename="test.pdf"');
    expect(response.rawPayload).toEqual(Buffer.from([1, 2, 3]));

    await app.close();
  });
});
