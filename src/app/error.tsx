"use client";

import { useEffect } from "react";
import ErrorState from "@/components/ErrorState";

/** Route-level error boundary — catches render errors in any page. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surface to the console (and any future error reporter) without crashing.
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      action={{ label: "Try again", onClick: reset }}
      secondary={{ label: "Go home", href: "/" }}
    />
  );
}
