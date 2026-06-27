import ErrorState from "@/components/ErrorState";

/** Friendly 404 — reuses the same calm screen. */
export default function NotFound() {
  return (
    <ErrorState
      title="Page not found"
      message="The page you’re looking for doesn’t exist or may have moved. Let’s get you back on track."
      secondary={{ label: "Go home", href: "/" }}
    />
  );
}
