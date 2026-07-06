import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  captureEntryParams,
  getAnalyticsQueryProperties,
  getPreservedParams,
  isInternalNavigationHref,
  isPreservedQueryParam,
  resetPreservedParamsForTests,
  shouldInterceptNavigationClick,
  syncPreservedParamsToCurrentUrl,
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

describe("isPreservedQueryParam", () => {
  it("accepts utm_* keys only", () => {
    expect(isPreservedQueryParam("utm_source")).toBe(true);
    expect(isPreservedQueryParam("utm_medium")).toBe(true);
    expect(isPreservedQueryParam("foo")).toBe(false);
    expect(isPreservedQueryParam("ref")).toBe(false);
  });
});

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
  const preserved = { utm_source: "test", utm_medium: "email" };
  const homeBase = `${ORIGIN}/`;

  it("merges preserved params into internal hrefs", () => {
    expect(withPreservedParams("/projects", preserved, homeBase)).toBe(
      "/projects?utm_source=test&utm_medium=email",
    );
  });

  it("lets destination query params win", () => {
    expect(withPreservedParams("/projects?utm_source=override", preserved, homeBase)).toBe(
      "/projects?utm_source=override&utm_medium=email",
    );
  });

  it("preserves hash after query string", () => {
    expect(withPreservedParams("/#resume", preserved, homeBase)).toBe(
      "/?utm_source=test&utm_medium=email#resume",
    );
  });

  it("resolves fragment-only hrefs against the current page", () => {
    expect(withPreservedParams("#main", preserved, `${ORIGIN}/projects`)).toBe(
      "/projects?utm_source=test&utm_medium=email#main",
    );
  });

  it("ignores non-utm keys in the preserved map", () => {
    expect(withPreservedParams("/projects", { utm_source: "test", foo: "bar" }, homeBase)).toBe(
      "/projects?utm_source=test",
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

  it("ignores non-utm params on capture", () => {
    sessionStorage.setItem("pf:params", JSON.stringify({ utm_source: "stored" }));
    vi.stubGlobal("window", {
      location: {
        search: "?foo=bar&utm_medium=email",
        href: `${ORIGIN}/?foo=bar&utm_medium=email`,
        origin: ORIGIN,
        pathname: "/",
      },
    });

    captureEntryParams();
    expect(getPreservedParams()).toEqual({ utm_source: "stored", utm_medium: "email" });
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
        search: "?utm_source=test&utm_medium=email&foo=bar",
        href: `${ORIGIN}/?utm_source=test&utm_medium=email&foo=bar`,
        origin: ORIGIN,
        pathname: "/",
      },
    });
  });

  afterEach(() => {
    resetPreservedParamsForTests();
    vi.unstubAllGlobals();
  });

  it("includes utm_* params and entry_query", () => {
    expect(getAnalyticsQueryProperties()).toEqual({
      utm_source: "test",
      utm_medium: "email",
      entry_query: "utm_source=test&utm_medium=email",
    });
  });
});

describe("syncPreservedParamsToCurrentUrl", () => {
  beforeEach(() => {
    resetPreservedParamsForTests();
  });

  afterEach(() => {
    resetPreservedParamsForTests();
    vi.unstubAllGlobals();
  });

  it("returns merged href when utm params are missing from the current URL", () => {
    sessionStorage.setItem(
      "pf:params",
      JSON.stringify({ utm_source: "test", utm_medium: "email" }),
    );
    vi.stubGlobal("window", {
      location: {
        search: "",
        href: `${ORIGIN}/projects`,
        origin: ORIGIN,
        pathname: "/projects",
        hash: "",
      },
    });

    expect(syncPreservedParamsToCurrentUrl(`${ORIGIN}/projects`)).toBe(
      "/projects?utm_source=test&utm_medium=email",
    );
  });

  it("returns null when the current URL already has preserved params", () => {
    vi.stubGlobal("window", {
      location: {
        search: "?utm_source=test",
        href: `${ORIGIN}/projects?utm_source=test`,
        origin: ORIGIN,
        pathname: "/projects",
        hash: "",
      },
    });
    sessionStorage.setItem("pf:params", JSON.stringify({ utm_source: "test" }));

    expect(syncPreservedParamsToCurrentUrl(`${ORIGIN}/projects?utm_source=test`)).toBeNull();
  });

  it("returns null when there are no preserved params", () => {
    vi.stubGlobal("window", {
      location: {
        search: "",
        href: `${ORIGIN}/projects`,
        origin: ORIGIN,
        pathname: "/projects",
        hash: "",
      },
    });

    expect(syncPreservedParamsToCurrentUrl(`${ORIGIN}/projects`)).toBeNull();
  });

  it("merges missing utm params when the URL is only partially attributed", () => {
    sessionStorage.setItem(
      "pf:params",
      JSON.stringify({ utm_source: "test", utm_medium: "email" }),
    );
    vi.stubGlobal("window", {
      location: {
        search: "?utm_source=test",
        href: `${ORIGIN}/projects?utm_source=test`,
        origin: ORIGIN,
        pathname: "/projects",
        hash: "",
      },
    });

    expect(syncPreservedParamsToCurrentUrl(`${ORIGIN}/projects?utm_source=test`)).toBe(
      "/projects?utm_source=test&utm_medium=email",
    );
  });

  it("preserves hash when syncing params onto the current URL", () => {
    sessionStorage.setItem("pf:params", JSON.stringify({ utm_source: "test" }));
    vi.stubGlobal("window", {
      location: {
        search: "",
        href: `${ORIGIN}/#contact-heading`,
        origin: ORIGIN,
        pathname: "/",
        hash: "#contact-heading",
      },
    });

    expect(syncPreservedParamsToCurrentUrl(`${ORIGIN}/#contact-heading`)).toBe(
      "/?utm_source=test#contact-heading",
    );
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
