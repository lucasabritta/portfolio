import { describe, expect, it } from "vitest";

import { PRESERVED_PARAMS_STORAGE_KEY } from "./query-params-storage-key";
import { queryParamsInlineBootstrapScript } from "./query-params-inline-script";

describe("queryParamsInlineBootstrapScript", () => {
  it("embeds the preserved params storage key", () => {
    expect(queryParamsInlineBootstrapScript()).toContain(PRESERVED_PARAMS_STORAGE_KEY);
  });

  it("persists only utm_* keys from the landing URL", () => {
    const script = queryParamsInlineBootstrapScript();
    const run = new Function(
      "location",
      "sessionStorage",
      `${script}; return sessionStorage.getItem(${JSON.stringify(PRESERVED_PARAMS_STORAGE_KEY)});`,
    ) as (
      location: { search: string },
      sessionStorage: {
        getItem: (k: string) => string | null;
        setItem: (k: string, v: string) => void;
      },
    ) => string | null;

    const store = new Map<string, string>();
    const sessionStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
    };

    const raw = run({ search: "?utm_source=test&utm_medium=email&foo=bar" }, sessionStorage);
    expect(JSON.parse(raw ?? "{}")).toEqual({
      utm_source: "test",
      utm_medium: "email",
    });
  });
});
