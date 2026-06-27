import { renderedSections, displayName, type TemplateProps } from "./shared";
import { CornerFloral, OmMark, Sprig } from "./ornaments";

/**
 * Floral template — cream page with gold filigree corners, an Om motif, and a
 * photo beside the first section. Inspired by classic decorative biodatas.
 */
export default function FloralTemplate({ data }: TemplateProps) {
  const sections = renderedSections(data);

  return (
    <div className="a4 doc relative text-[#4a3b22]">
      {/* Decorative frame — repeats on every printed page */}
      <div className="bio-frame" style={{ background: "#fffdf6" }}>
        <div className="absolute inset-[8mm] border border-[#caa64a]/60" />
        <div className="absolute inset-[8mm] text-[#c79a3a]">
          <CornerFloral className="absolute -left-1 -top-1 h-16 w-16" />
          <CornerFloral className="absolute -right-1 -top-1 h-16 w-16 -scale-x-100" />
          <CornerFloral className="absolute -bottom-1 -left-1 h-16 w-16 -scale-y-100" />
          <CornerFloral className="absolute -bottom-1 -right-1 h-16 w-16 -scale-100" />
        </div>
      </div>

      <div className="relative px-[20mm] py-[18mm] print:!px-[20mm] print:!pt-[24mm] print:!pb-[20mm]">
          {/* Om + heading */}
          <div className="text-center">
            <OmMark className="text-[28px] text-[#b8893a]" />
            {data.header && (
              <p className="mt-1 flex items-center justify-center gap-2 text-[12px] uppercase tracking-[0.25em] text-[#b8893a]">
                <Sprig className="h-3 w-10" />
                {data.header}
                <Sprig className="h-3 w-10" flip />
              </p>
            )}
          </div>

          {/* Name + photo */}
          <div className="mt-6 flex items-start justify-between gap-6">
            <div className="flex-1">
              <h1 className="doc-display text-[30px] font-bold leading-tight text-[#8a2b2b]">
                {displayName(data)}
              </h1>
              <div className="mt-2 h-[2px] w-24 bg-[#c79a3a]" />
            </div>
            {data.photo && (
              <div className="shrink-0 border-2 border-[#c79a3a] p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.photo}
                  alt={displayName(data)}
                  className="h-[150px] w-[120px] object-cover"
                />
              </div>
            )}
          </div>

          {/* Sections */}
          <div className="mt-7 space-y-6">
            {sections.map((section) => (
              <section key={section.id}>
                <h2 className="doc-display mb-3 flex items-center gap-3 text-[15px] font-semibold uppercase tracking-wide text-[#8a2b2b]">
                  <span>{section.title}</span>
                  <span className="h-px flex-1 bg-[#c79a3a]/50" />
                </h2>
                <dl className="space-y-1.5">
                  {section.rows.map((row) => (
                    <div key={row.label} className="flex gap-3 text-[13px] leading-relaxed">
                      <dt className="w-[38%] shrink-0 font-semibold text-[#6b5836]">{row.label}</dt>
                      <dd className="flex-1">
                        <span className="mr-2 text-[#b8893a]">:</span>
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
  );
}
