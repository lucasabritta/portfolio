import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  captureEntryParams,
  getAnalyticsQueryProperties,
  getPreservedParams,
  isInternalNavigationHref,
  resetPreservedParamsForTests,
  shouldInterceptNavigationClick,
  withPreservedParams,
} from "./query-params";

const ORIGIN = "https://portfolio.example";

function mockAnchor(
  attrs: Record<string, string | null>,
): Pick<HTMLAnchorElement, "getAttribute" | "target" | "hasAttribute"> {
  return {
    getAttribute: (name: string) => attrs[name] ?? null,
    target: attrs.target ?? "",
    hasAttribute: (name: string) => name in attrs && attrs[name] !== null,
  };
}

function mockEvent(
  overrides: Partial<
    Pick<MouseEvent, "metaKey" | "ctrlKey" | "shiftKey" | "altKey" | "button" | "defaultPrevented">
  > = {},
): Pick<MouseEvent, "metaKey" | "ctrlKey" | "shiftKey" | "altKey" | "button" | "defaultPrevented"> {
  return {
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    button: 0,
    defaultPrevented: false,
    ...overrides,
  };
}

describe("isInternalNavigationHref", () => {
  it("accepts same-origin relative and absolute paths", () => {
    expect(isInternalNavigationHref("/projects", ORIGIN)).toBe(true);
    expect(isInternalNavigationHref("https://portfolio.example/projects", ORIGIN)).toBe(true);
  });

  it("rejects external, mailto, tel, and protocol-relative URLs", () => {
    expect(isInternalNavigationHref("https://github.com/foo", ORIGIN)).toBe(false);
    expect(isInternalNavigationHref("mailto:a@b.com", ORIGIN)).toBe(false);
    expect(isInternalNavigationHref("tel:+123", ORIGIN)).toBe(false);
    expect(isInternalNavigationHref("//evil.com/path", ORIGIN)).toBe(false);
  });
});

describe("withPreservedParams", () => {
  const preserved = { utm_source: "test", foo: "bar" };
  const homeBase = `${ORIGIN}/`;

  it("merges preserved params into internal hrefs", () => {
    expect(withPreservedParams("/projects", preserved, homeBase)).toBe(
      "/projects?utm_source=test&foo=bar",
    );
  });

  it("lets destination query params win", () => {
    expect(withPreservedParams("/projects?utm_source=override", preserved, homeBase)).toBe(
      "/projects?utm_source=override&foo=bar",
    );
  });

  it("preserves hash after query string", () => {
    expect(withPreservedParams("/#resume", preserved, homeBase)).toBe(
      "/?utm_source=test&foo=bar#resume",
    );
  });

  it("resolves fragment-only hrefs against the current page", () => {
    expect(withPreservedParams("#main", preserved, `${ORIGIN}/projects`)).toBe(
      "/projects?utm_source=test&foo=bar#main",
    );
  });

  it("leaves external and mailto hrefs unchanged", () => {
    expect(withPreservedParams("https://github.com/foo", preserved, homeBase)).toBe(
      "https://github.com/foo",
    );
    expect(withPreservedParams("mailto:a@b.com", preserved, homeBase)).toBe("mailto:a@b.com");
  });

  it("is a no-op when there are no preserved params", () => {
    expect(withPreservedParams("/projects", {}, homeBase)).toBe("/projects");
  });
});

describe("getPreservedParams and captureEntryParams", () => {
  beforeEach(() => {
    resetPreservedParamsForTests();
    vi.stubGlobal("window", {
      location: { search: "", href: `${ORIGIN}/`, origin: ORIGIN, pathname: "/" },
    });
  });

  afterEach(() => {
    resetPreservedParamsForTests();
    vi.unstubAllGlobals();
  });

  it("prefers current URL params over stored params", () => {
    sessionStorage.setItem("pf:params", JSON.stringify({ utm_source: "stored" }));
    vi.stubGlobal("window", {
      location: {
        search: "?utm_source=current",
        href: `${ORIGIN}/?utm_source=current`,
        origin: ORIGIN,
        pathname: "/",
      },
    });

    expect(getPreservedParams()).toEqual({ utm_source: "current" });
  });

  it("captures entry params into session storage", () => {
    vi.stubGlobal("window", {
      location: {
        search: "?utm_source=landing",
        href: `${ORIGIN}/?utm_source=landing`,
        origin: ORIGIN,
        pathname: "/",
      },
    });

    captureEntryParams();
    expect(sessionStorage.getItem("pf:params")).toContain("utm_source");
    expect(getPreservedParams()).toEqual({ utm_source: "landing" });
  });

  it("merges new params into stored params on capture", () => {
    sessionStorage.setItem("pf:params", JSON.stringify({ utm_source: "stored" }));
    vi.stubGlobal("window", {
      location: {
        search: "?foo=bar",
        href: `${ORIGIN}/?foo=bar`,
        origin: ORIGIN,
        pathname: "/",
      },
    });

    captureEntryParams();
    expect(getPreservedParams()).toEqual({ utm_source: "stored", foo: "bar" });
  });

  it("falls back to memory when sessionStorage is unavailable", () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    const getItem = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("quota");
    });

    vi.stubGlobal("window", {
      location: {
        search: "?utm_source=memory",
        href: `${ORIGIN}/?utm_source=memory`,
        origin: ORIGIN,
        pathname: "/",
      },
    });

    captureEntryParams();
    expect(getPreservedParams()).toEqual({ utm_source: "memory" });

    setItem.mockRestore();
    getItem.mockRestore();
  });
});

describe("getAnalyticsQueryProperties", () => {
  beforeEach(() => {
    resetPreservedParamsForTests();
    vi.stubGlobal("window", {
      location: {
        search: "?utm_source=test&foo=bar",
        href: `${ORIGIN}/?utm_source=test&foo=bar`,
        origin: ORIGIN,
        pathname: "/",
      },
    });
  });

  afterEach(() => {
    resetPreservedParamsForTests();
    vi.unstubAllGlobals();
  });

  it("includes every param and entry_query", () => {
    expect(getAnalyticsQueryProperties()).toEqual({
      utm_source: "test",
      foo: "bar",
      entry_query: "utm_source=test&foo=bar",
    });
  });
});

describe("shouldInterceptNavigationClick", () => {
  const preserved = { utm_source: "test" };

  it("returns merged href for internal navigation with preserved params", () => {
    expect(
      shouldInterceptNavigationClick({
        anchor: mockAnchor({ href: "/projects" }),
        event: mockEvent(),
        locationHref: `${ORIGIN}/?utm_source=test`,
        preserved,
      }),
    ).toBe("/projects?utm_source=test");
  });

  it("merges params for cross-route hash links", () => {
    expect(
      shouldInterceptNavigationClick({
        anchor: mockAnchor({ href: "/#resume" }),
        event: mockEvent(),
        locationHref: `${ORIGIN}/missing-page?utm_source=test`,
        preserved,
      }),
    ).toBe("/?utm_source=test#resume");
  });

  it("skips same-page hash-only navigation on home", () => {
    expect(
      shouldInterceptNavigationClick({
        anchor: mockAnchor({ href: "#main" }),
        event: mockEvent(),
        locationHref: `${ORIGIN}/?utm_source=test`,
        preserved,
      }),
    ).toBeNull();
  });

  it("skips same-page hash-only navigation on inner routes", () => {
    expect(
      shouldInterceptNavigationClick({
        anchor: mockAnchor({ href: "#main" }),
        event: mockEvent(),
        locationHref: `${ORIGIN}/projects?utm_source=test`,
        preserved,
      }),
    ).toBeNull();
  });

  it("skips external, blank, download, modifier, and defaultPrevented clicks", () => {
    const base = {
      locationHref: `${ORIGIN}/?utm_source=test`,
      preserved,
    };

    expect(
      shouldInterceptNavigationClick({
        anchor: mockAnchor({ href: "https://github.com/foo" }),
        event: mockEvent(),
        ...base,
      }),
    ).toBeNull();

    expect(
      shouldInterceptNavigationClick({
        anchor: mockAnchor({ href: "/projects", rel: "external" }),
        event: mockEvent(),
        ...base,
      }),
    ).toBeNull();

    expect(
      shouldInterceptNavigationClick({
        anchor: mockAnchor({ href: "/projects", target: "_blank" }),
        event: mockEvent(),
        ...base,
      }),
    ).toBeNull();

    expect(
      shouldInterceptNavigationClick({
        anchor: mockAnchor({ href: "/projects", download: "" }),
        event: mockEvent(),
        ...base,
      }),
    ).toBeNull();

    expect(
      shouldInterceptNavigationClick({
        anchor: mockAnchor({ href: "/projects" }),
        event: mockEvent({ metaKey: true }),
        ...base,
      }),
    ).toBeNull();

    expect(
      shouldInterceptNavigationClick({
        anchor: mockAnchor({ href: "/projects" }),
        event: mockEvent({ button: 1 }),
        ...base,
      }),
    ).toBeNull();

    expect(
      shouldInterceptNavigationClick({
        anchor: mockAnchor({ href: "/projects" }),
        event: mockEvent({ defaultPrevented: true }),
        ...base,
      }),
    ).toBeNull();
  });

  it("returns null when there are no preserved params", () => {
    expect(
      shouldInterceptNavigationClick({
        anchor: mockAnchor({ href: "/projects" }),
        event: mockEvent(),
        locationHref: `${ORIGIN}/`,
        preserved: {},
      }),
    ).toBeNull();
  });
});
