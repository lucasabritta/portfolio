export const runtime = "nodejs";

const BACKEND_TIMEOUT_MS = 20_000;

function buildProxyHeaders(source: Headers): Headers {
  const headers = new Headers();

  for (const headerName of [
    "content-type",
    "content-disposition",
    "cache-control",
  ]) {
    const headerValue = source.get(headerName);

    if (headerValue) {
      headers.set(headerName, headerValue);
    }
  }

  return headers;
}

function getBackendCvUrl() {
  const backendOrigin = process.env.BACKEND_ORIGIN;

  if (!backendOrigin) {
    throw new Error("BACKEND_ORIGIN is required to proxy /api/cv requests.");
  }

  const parsedOrigin = new URL(backendOrigin);

  if (!["http:", "https:"].includes(parsedOrigin.protocol)) {
    throw new Error(`BACKEND_ORIGIN must use http or https, received: ${parsedOrigin.protocol}`);
  }

  return new URL("/api/cv", parsedOrigin);
}

export async function GET() {
  try {
    const response = await fetch(getBackendCvUrl(), {
      cache: "no-store",
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
    const contentType = response.headers.get("content-type");

    if (!response.ok || !contentType?.includes("application/pdf")) {
      throw new Error(
        `Unexpected backend response (status: ${response.status}, content-type: ${contentType ?? "missing"})`,
      );
    }

    const bytes = await response.arrayBuffer();

    return new Response(bytes, {
      headers: buildProxyHeaders(response.headers),
      status: response.status,
    });
  } catch (error) {
    console.error("Failed to proxy /api/cv request", error);

    return new Response("CV download is temporarily unavailable.", {
      status: 502,
    });
  }
}
