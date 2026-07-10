import { describe, expect, it } from "vitest";

import { PENDING_CLICK_INTENT_STORAGE_KEY } from "./pending-click-intent";
import { PRESERVED_PARAMS_STORAGE_KEY } from "./query-params-storage-key";
import { queryParamsInlineBootstrapScript } from "./query-params-inline-script";

type TestLocation = {
  href: string;
  origin: string;
  pathname: string;
  search: string;
  hash: string;
  assign: (url: string) => void;
};

type TestSessionStorage = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
};

type TestAnchor = {
  getAttribute: (name: string) => string | null;
  target: string;
  hasAttribute: (name: string) => boolean;
  textContent: string;
  closest: (selector: string) => TestAnchor | { id: string } | null;
};

type ClickCaptureEvent = {
  target: {
    closest: (selector: string) => TestAnchor | null;
  };
  button: number;
  defaultPrevented: boolean;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  preventDefault: () => void;
  stopImmediatePropagation: () => void;
};

type TestDocument = {
  addEventListener: (_type: string, listener: (event: ClickCaptureEvent) => void) => void;
};

describe("queryParamsInlineBootstrapScript", () => {
  it("embeds the analytics storage keys", () => {
    expect(queryParamsInlineBootstrapScript()).toContain(PRESERVED_PARAMS_STORAGE_KEY);
    expect(queryParamsInlineBootstrapScript()).toContain(PENDING_CLICK_INTENT_STORAGE_KEY);
  });

  it("persists only utm_* keys from the landing URL", () => {
    const script = queryParamsInlineBootstrapScript();
    const run = new Function(
      "location",
      "sessionStorage",
      "document",
      `${script}; return sessionStorage.getItem(${JSON.stringify(PRESERVED_PARAMS_STORAGE_KEY)});`,
    ) as (
      location: { search: string },
      sessionStorage: {
        getItem: (k: string) => string | null;
        setItem: (k: string, v: string) => void;
      },
      document: { addEventListener: () => void },
    ) => string | null;

    const store = new Map<string, string>();
    const sessionStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
    };

    const raw = run({ search: "?utm_source=test&utm_medium=email&foo=bar" }, sessionStorage, {
      addEventListener: () => {},
    });
    expect(JSON.parse(raw ?? "{}")).toEqual({
      utm_source: "test",
      utm_medium: "email",
    });
  });

  it("intercepts internal navigation before React hydrates", () => {
    const script = queryParamsInlineBootstrapScript();
    const store = new Map<string, string>([
      [PRESERVED_PARAMS_STORAGE_KEY, JSON.stringify({ utm_source: "e2e", utm_medium: "test" })],
    ]);
    const sessionStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
    };

    let assigned: string | null = null;
    const location: TestLocation = {
      href: "http://localhost:3000/?utm_source=e2e&utm_medium=test",
      origin: "http://localhost:3000",
      pathname: "/",
      search: "?utm_source=e2e&utm_medium=test",
      hash: "",
      assign: (url: string) => {
        assigned = url;
      },
    };

    const listeners: Array<(event: ClickCaptureEvent) => void> = [];

    const document: TestDocument = {
      addEventListener: (_type: string, listener: (event: ClickCaptureEvent) => void) => {
        listeners.push(listener);
      },
    };

    const run = new Function("location", "sessionStorage", "document", script) as (
      location: TestLocation,
      sessionStorage: TestSessionStorage,
      document: TestDocument,
    ) => void;

    run(location, sessionStorage, document);

    const hero = { id: "home-hero" };
    const anchor: TestAnchor = {
      getAttribute: (name: string) =>
        name === "href" ? "/projects" : name === "rel" ? null : null,
      target: "",
      hasAttribute: () => false,
      textContent: "View Projects",
      closest: (selector: string) => (selector === "#home-hero" ? hero : null),
    };
    const target = {
      closest: (selector: string) => (selector === "a" ? anchor : null),
    };

    let prevented = false;
    listeners[0]?.({
      target,
      button: 0,
      defaultPrevented: false,
      metaKey: false,
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      preventDefault: () => {
        prevented = true;
      },
      stopImmediatePropagation: () => {},
    });

    expect(prevented).toBe(true);
    expect(assigned).toBe("/projects?utm_source=e2e&utm_medium=test");
    expect(JSON.parse(store.get(PENDING_CLICK_INTENT_STORAGE_KEY) ?? "{}")).toEqual({
      event: "cta_clicked",
      properties: {
        label: "View Projects",
        link_kind: "internal",
        location: "home_hero",
        source: "pre_hydration",
        source_pathname: "/",
        target: "/projects",
      },
      created_at: expect.any(Number),
    });
  });
});
