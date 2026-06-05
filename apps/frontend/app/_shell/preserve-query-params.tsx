"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import {
  captureEntryParams,
  shouldInterceptNavigationClick,
} from "@/lib/analytics/query-params";

function handleDocumentClick(event: MouseEvent, push: (href: string) => void): void {
  if (!(event.target instanceof Element)) {
    return;
  }

  const anchor = event.target.closest("a");
  if (!anchor) {
    return;
  }

  const hrefWithParams = shouldInterceptNavigationClick({ anchor, event });
  if (!hrefWithParams) {
    return;
  }

  event.preventDefault();
  push(hrefWithParams);
}

export function PreserveQueryParams(): ReactNode {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureEntryParams();
  }, [pathname, searchParams]);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      handleDocumentClick(event, (href) => {
        router.push(href);
      });
    };

    document.addEventListener("click", listener, true);
    return () => document.removeEventListener("click", listener, true);
  }, [router]);

  return null;
}
