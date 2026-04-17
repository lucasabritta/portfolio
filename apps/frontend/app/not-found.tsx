import Link from "next/link";

import { StatusPageView } from "@portfolio/storybook";

export const metadata = {
  title: "Page not found",
  description: "The requested page could not be found on this portfolio.",
};

export default function NotFound() {
  return (
    <StatusPageView
      heading="Page not found"
      body="The page you are looking for does not exist or has been moved. Try the homepage or projects."
      actions={[
        { kind: "link", label: "Back to home", href: "/" },
        { kind: "link", label: "View projects", href: "/projects" },
      ]}
      linkComponent={Link}
    />
  );
}
