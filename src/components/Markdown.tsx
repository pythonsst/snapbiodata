import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

// Renders Markdown to styled HTML at build time (server component → no client
// JS). We map each element to Tailwind classes instead of pulling in a
// typography plugin, keeping full control over the look. Internal links use
// next/link so navigation stays client-side.
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-ink/90">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="font-display mt-10 text-2xl font-bold text-ink">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 text-lg font-semibold text-ink">{children}</h3>
          ),
          p: ({ children }) => <p>{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc space-y-1.5 pl-5 marker:text-maroon">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-maroon">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ href, children }) => {
            const url = href ?? "#";
            const internal = url.startsWith("/");
            return internal ? (
              <Link href={url} className="font-medium text-maroon underline underline-offset-2 hover:text-maroon-dark">
                {children}
              </Link>
            ) : (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-maroon underline underline-offset-2 hover:text-maroon-dark"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
