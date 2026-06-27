import { renderedSections, displayName, type TemplateProps } from "./shared";
import { GoldLeafCorner } from "./leaves";

const GOLD_LINE = "#d9a93a";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="doc-display mb-3 inline-block rounded-md bg-gradient-to-r from-[#f8d57e] to-[#efbd49] px-4 py-1.5 text-[17px] font-bold text-[#3a2a12] shadow-sm">
      {children}
    </h2>
  );
}

function Rows({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="space-y-1.5">
      {rows.map((r) => (
        <div key={r.label} className="flex gap-4 text-[13px] leading-relaxed">
          <dt className="w-[42%] shrink-0 font-bold text-[#a9741a]">{r.label}</dt>
          <dd className="flex-1 text-[#2a2025]">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Garland — golden leafy corner garlands, peach section banners, bold gold
 * labels and a photo at the top-right. Inspired by classic weddingbiodata style.
 */
export default function GarlandTemplate({ data }: TemplateProps) {
  const sections = renderedSections(data);
  const [first, ...rest] = sections;

  return (
    <div className="a4 doc relative text-[#2a2025]">
      {/* Decorative frame — repeats on every printed page */}
      <div className="bio-frame" style={{ background: "#fffdf6" }}>
        <div className="absolute inset-[7mm] border" style={{ borderColor: GOLD_LINE }} />
        <div className="absolute inset-[8.5mm] border" style={{ borderColor: GOLD_LINE }} />
        <GoldLeafCorner id="glc-tl" className="absolute left-[2mm] top-[2mm] h-[30mm] w-[30mm]" />
        <GoldLeafCorner id="glc-tr" className="absolute right-[2mm] top-[2mm] h-[30mm] w-[30mm] -scale-x-100" />
        <GoldLeafCorner id="glc-bl" className="absolute bottom-[2mm] left-[2mm] h-[30mm] w-[30mm] -scale-y-100" />
        <GoldLeafCorner id="glc-br" className="absolute bottom-[2mm] right-[2mm] h-[30mm] w-[30mm] -scale-100" />
        <div className="absolute inset-x-0 bottom-[11mm] text-center text-[12px]" style={{ color: "#a05bd6" }}>
          snapbiodata.com
        </div>
      </div>

      {/* Content */}
      <div className="relative px-[18mm] py-[22mm] print:!px-[20mm] print:!pt-[26mm] print:!pb-[22mm]">
        {data.header && (
          <p className="doc-display mb-5 text-center text-[14px] tracking-wide text-[#b8893a]">{data.header}</p>
        )}

        {first && (
          <section className="mb-7">
            <div className="flex items-start gap-6">
              <div className="min-w-0 flex-1">
                <Chip>{first.title}</Chip>
                <Rows rows={first.rows} />
              </div>
              {data.photo && (
                <div className="shrink-0 rounded-sm border-2 p-1" style={{ borderColor: GOLD_LINE }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.photo}
                    alt={displayName(data)}
                    className="h-[165px] w-[135px] rounded-sm object-cover"
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {rest.map((section) => (
          <section key={section.id} className="mb-7">
            <Chip>{section.title}</Chip>
            <Rows rows={section.rows} />
          </section>
        ))}
      </div>
    </div>
  );
}
