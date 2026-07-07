import { describe, expect, it } from "vitest";

import {
  countPostHogEvents,
  findPostHogEvent,
  parsePostHogEvents,
  type PostHogIngestPosts,
} from "./posthog-ingest-parse";

describe("parsePostHogEvents", () => {
  it("parses plain JSON event payloads", () => {
    const events = parsePostHogEvents({
      event: "page_viewed",
      properties: { route_name: "home" },
    });
    expect(events).toEqual([
      { event: "page_viewed", properties: { route_name: "home" } },
    ]);
  });

  it("parses base64 data field payloads", () => {
    const encoded = Buffer.from(
      JSON.stringify({ event: "nav_clicked", properties: { label: "Projects" } }),
      "utf8",
    ).toString("base64");
    const events = parsePostHogEvents({ data: encoded });
    expect(events[0]?.event).toBe("nav_clicked");
    expect(events[0]?.properties.label).toBe("Projects");
  });

  it("parses batch arrays and merges $set properties", () => {
    const events = parsePostHogEvents({
      batch: [
        {
          event: "page_viewed",
          properties: {
            $set: { utm_source: "e2e" },
            route_name: "projects",
          },
        },
      ],
    });
    expect(events[0]?.properties).toMatchObject({
      utm_source: "e2e",
      route_name: "projects",
    });
  });
});

describe("findPostHogEvent", () => {
  const state: PostHogIngestPosts = {
    posts: [
      {
        json: {
          batch: [
            { event: "page_viewed", properties: { route_name: "home" } },
            { event: "page_viewed", properties: { route_name: "projects" } },
          ],
        },
      },
    ],
  };

  it("returns the last matching event by default", () => {
    const match = findPostHogEvent(state, "page_viewed");
    expect(match?.properties.route_name).toBe("projects");
  });

  it("filters with a predicate", () => {
    const match = findPostHogEvent(
      state,
      "page_viewed",
      (properties) => properties.route_name === "home",
    );
    expect(match?.properties.route_name).toBe("home");
  });
});

describe("countPostHogEvents", () => {
  it("counts events with optional predicate", () => {
    const state: PostHogIngestPosts = {
      posts: [
        {
          json: {
            batch: [
              { event: "page_viewed", properties: { route_name: "home" } },
              { event: "page_viewed", properties: { route_name: "projects" } },
              { event: "nav_clicked", properties: { label: "Projects" } },
            ],
          },
        },
      ],
    };

    expect(countPostHogEvents(state, "page_viewed")).toBe(2);
    expect(
      countPostHogEvents(
        state,
        "page_viewed",
        (properties) => properties.route_name === "projects",
      ),
    ).toBe(1);
  });
});
