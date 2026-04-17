"use client";

import { useEffect } from "react";
import Link from "next/link";

import styles from "./status.module.css";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error("App segment error boundary caught", error);
  }, [error]);

  return (
    <main id="main" tabIndex={-1} className={styles.status}>
      <h1 className={styles.heading}>Something went wrong</h1>
      <p className={styles.body}>
        An unexpected error interrupted this page. Try again, or return home.
      </p>
      <div className={styles.actions}>
        <button type="button" onClick={reset} className={styles.action}>
          Try again
        </button>
        <Link href="/" className={styles.action}>
          Back to home
        </Link>
      </div>
    </main>
  );
}
