import { NextResponse, type NextRequest } from "next/server";

const POSTHOG_PROXY_PREFIX = "/ingest";
const POSTHOG_API_HOST = "eu.i.posthog.com";
const POSTHOG_ASSET_HOST = "eu-assets.i.posthog.com";

function posthogHostname(pathname: string): string {
  if (
    pathname.startsWith(`${POSTHOG_PROXY_PREFIX}/static/`) ||
    pathname.startsWith(`${POSTHOG_PROXY_PREFIX}/array/`)
  ) {
    return POSTHOG_ASSET_HOST;
  }

  return POSTHOG_API_HOST;
}

export function proxy(request: NextRequest): NextResponse {
  const url = request.nextUrl.clone();
  const hostname = posthogHostname(url.pathname);
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("host", hostname);
  url.protocol = "https";
  url.hostname = hostname;
  url.port = "443";
  url.pathname = url.pathname.replace(POSTHOG_PROXY_PREFIX, "") || "/";

  return NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/ingest/:path*",
};
