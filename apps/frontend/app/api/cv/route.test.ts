/**
 * @vitest-environment node
 */
import { afterAll, afterEach, describe, expect, it, vi } from "vitest";

import { GET } from "./route";

const fetchMock = vi.fn<typeof fetch>();
const originalFetch = global.fetch;
const originalBackendOrigin = process.env.BACKEND_ORIGIN;
const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => {});

afterEach(() => {
  process.env.BACKEND_ORIGIN = originalBackendOrigin;
  fetchMock.mockReset();
  global.fetch = originalFetch;
  consoleErrorMock.mockClear();
});

afterAll(() => {
  consoleErrorMock.mockRestore();
});

describe("GET /api/cv route proxy", () => {
  it("returns 502 when BACKEND_ORIGIN is missing", async () => {
    delete process.env.BACKEND_ORIGIN;
    global.fetch = fetchMock;

    const response = await GET();

    expect(response.status).toBe(502);
    await expect(response.text()).resolves.toContain("temporarily unavailable");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("proxies backend response status, body and whitelisted headers", async () => {
    process.env.BACKEND_ORIGIN = "http://backend.test";
    fetchMock.mockResolvedValue(
      new Response(Uint8Array.from([9, 8, 7]), {
        status: 206,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="sample.pdf"',
          "Cache-Control": "private, max-age=0, must-revalidate",
          "X-Internal": "hidden",
        },
      }),
    );
    global.fetch = fetchMock;

    const response = await GET();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(new URL("/api/cv", "http://backend.test"));
    expect(response.status).toBe(206);
    expect(Array.from(new Uint8Array(await response.arrayBuffer()))).toEqual([9, 8, 7]);
    expect(response.headers.get("content-type")).toBe("application/pdf");
    expect(response.headers.get("content-disposition")).toBe('attachment; filename="sample.pdf"');
    expect(response.headers.get("cache-control")).toBe("private, max-age=0, must-revalidate");
    expect(response.headers.get("x-internal")).toBeNull();
  });

  it("returns 502 when backend response is not a pdf", async () => {
    process.env.BACKEND_ORIGIN = "http://backend.test";
    fetchMock.mockResolvedValue(
      new Response("not a pdf", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      }),
    );
    global.fetch = fetchMock;

    const response = await GET();

    expect(response.status).toBe(502);
  });
});
