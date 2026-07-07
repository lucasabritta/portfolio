import { NotFoundAnalytics } from "@/app/_shell/not-found-analytics";
import { NotFoundViewClient } from "@/app/_shell/not-found-view-client";

export const metadata = {
  title: "Page not found",
  description: "The requested page could not be found on this portfolio.",
};

export default function NotFound() {
  return (
    <>
      <NotFoundAnalytics />
      <NotFoundViewClient />
    </>
  );
}
