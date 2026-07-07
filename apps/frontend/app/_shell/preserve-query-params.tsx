"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { captureEntryParams, syncPreservedParamsToCurrentUrl } from "@/lib/analytics/query-params";

export function PreserveQueryParams(): ReactNode {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    captureEntryParams();
    const synced = syncPreservedParamsToCurrentUrl();
    if (synced) {
      router.replace(synced, { scroll: false });
    }
  }, [pathname, router]);

  useEffect(() => {
    captureEntryParams();
  }, []);

  return null;
}
