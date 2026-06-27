import { SITE } from "@/config";
import { AlertIcon } from "@/components/ui/icons";

export interface ErrorStateProps {
  /** Big reassuring headline. */
  title?: string;
  /** One or two calm sentences explaining what happened. */
  message?: string;
  /** Primary action (e.g. "Try again"). */
  action?: { label: string; onClick: () => void };
  /** Secondary link (e.g. back to home). */
  secondary?: { label: string; href: string };
}

/**
 * A calm, on-brand "something went wrong" screen. Inline styles only (no theme
 * tokens) so it still renders correctly even if global CSS failed to load — the
 * exact situation where an error screen matters most.
 */
export default function ErrorState({
  title = "Something went wrong",
  message = "Sorry about that — a hiccup on our end, not yours. Your details are saved in your browser, so nothing is lost. Please try again.",
  action,
  secondary,
}: ErrorStateProps) {
  const mailto = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(`${SITE.name} — something went wrong`)}`;
  return (
    <div
      role="alert"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 24,
        textAlign: "center",
        background: "#faf6f2",
        color: "#2a2025",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <span
        style={{
          display: "grid",
          placeItems: "center",
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "#9b1c3a",
          color: "#fff",
        }}
      >
        <AlertIcon />
      </span>
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{title}</h1>
      <p style={{ maxWidth: 440, lineHeight: 1.6, color: "#6b5e63", margin: 0 }}>{message}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 8 }}>
        {action && (
          <button
            onClick={action.onClick}
            style={{
              padding: "10px 20px",
              borderRadius: 10,
              background: "#9b1c3a",
              color: "#fff",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            {action.label}
          </button>
        )}
        {secondary && (
          <a
            href={secondary.href}
            style={{
              padding: "10px 20px",
              borderRadius: 10,
              border: "1px solid #ece3da",
              background: "#fff",
              color: "#2a2025",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {secondary.label}
          </a>
        )}
      </div>

      <p style={{ fontSize: 13, color: "#6b5e63", marginTop: 12 }}>
        Still stuck? Email{" "}
        <a href={mailto} style={{ color: "#9b1c3a", fontWeight: 600 }}>
          {SITE.contactEmail}
        </a>{" "}
        and we&apos;ll help.
      </p>
    </div>
  );
}
