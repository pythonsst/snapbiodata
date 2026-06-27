"use client";

import { useEffect } from "react";
import ErrorState from "@/components/ErrorState";

/**
 * Root error boundary — replaces the whole document when the root layout itself
 * throws. Must render its own <html>/<body>.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <ErrorState
          action={{ label: "Try again", onClick: reset }}
          secondary={{ label: "Go home", href: "/" }}
        />
      </body>
    </html>
  );
}
