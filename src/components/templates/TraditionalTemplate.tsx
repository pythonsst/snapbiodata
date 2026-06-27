import { renderedSections, displayName, type TemplateProps } from "./shared";

/**
 * Traditional template — classic maroon & gold framed biodata with a centered
 * invocation, photo, and label/value detail rows grouped by section.
 */
export default function TraditionalTemplate({ data }: TemplateProps) {
  const sections = renderedSections(data);

  return (
    <div className="a4 doc text-ink">
      {/* Decorative double frame */}
      <div className="h-full min-h-[297mm] p-[10mm]">
        <div className="h-full min-h-[277mm] border-2 border-maroon p-[3mm]">
          <div className="h-full min-h-[271mm] border border-gold px-[10mm] py-[9mm]">
            {/* Header invocation */}
            {data.header && (
              <p className="doc-display text-center text-[15px] tracking-wide text-gold">
                <Flourish /> <span className="text-maroon">{data.header}</span> <Flourish />
              </p>
            )}

            {/* Name + photo */}
            <div className="mt-5 flex items-start justify-between gap-6">
              <div className="flex-1">
                <h1 className="doc-display text-[34px] font-bold leading-tight text-maroon">
                  {displayName(data)}
                </h1>
                <div className="mt-2 h-[2px] w-24 bg-gold" />
              </div>
              {data.photo && (
                <div className="shrink-0 rounded-sm border-2 border-gold p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.photo}
                    alt={displayName(data)}
                    className="h-[150px] w-[120px] rounded-sm object-cover"
                  />
                </div>
              )}
            </div>

            {/* Sections */}
            <div className="mt-7 space-y-6">
              {sections.map((section) => (
                <section key={section.id}>
                  <h2 className="doc-display mb-3 flex items-center gap-3 text-[16px] font-semibold uppercase tracking-wide text-maroon">
                    <span>{section.title}</span>
                    <span className="h-px flex-1 bg-gold/60" />
                  </h2>
                  <dl className="space-y-1.5">
                    {section.rows.map((row) => (
                      <div key={row.label} className="flex gap-3 text-[13.5px] leading-relaxed">
                        <dt className="w-[38%] shrink-0 font-semibold text-ink/80">{row.label}</dt>
                        <dd className="flex-1 text-ink">
                          <span className="mr-2 text-muted">:</span>
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Flourish() {
  return <span className="text-gold">❁</span>;
}
