"use client";

import Link from "next/link";

import { decorateStatusPageActions } from "@/app/_shell/decorate-status-actions";
import { usePreservedHrefDecorator } from "@/lib/analytics/use-preserve-internal-href";
import { StatusPageView, type StatusPageAction } from "@portfolio/storybook/status-page";

const NOT_FOUND_ACTIONS: StatusPageAction[] = [
  { kind: "link", label: "Back to home", href: "/" },
  { kind: "link", label: "View projects", href: "/projects" },
  { kind: "link", label: "Site architecture", href: "/site-architecture" },
  { kind: "link", label: "Jump to resume", href: "/#resume" },
];

export function NotFoundViewClient() {
  const preserveHref = usePreservedHrefDecorator();

  return (
    <StatusPageView
      heading="Page not found"
      body="The page you are looking for does not exist or has been moved. Try the homepage or projects."
      actions={decorateStatusPageActions(NOT_FOUND_ACTIONS, preserveHref)}
      linkComponent={Link}
    />
  );
}
