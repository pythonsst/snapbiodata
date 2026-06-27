import FramedDoc from "./FramedDoc";
import { displayName, type RenderedSection, type TemplateProps } from "./shared";
import { GoldLeafCorner } from "./leaves";

const GOLD_LINE = "#d9a93a";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="doc-display mb-3 inline-block rounded-md bg-gradient-to-r from-[#f8d57e] to-[#efbd49] px-4 py-1.5 text-[17px] font-bold text-[#3a2a12] shadow-sm">
      {children}
    </h2>
  );
}

/**
 * Garland — golden leafy corner garlands, peach section banners, bold gold
 * labels and a photo at the top-right. Multi-page safe via FramedDoc.
 */
export default function GarlandTemplate({ data }: TemplateProps) {
  const frame = (pi: number) => (
    <div className="bio-frame" style={{ background: "#fffdf6" }}>
      <div className="absolute inset-[7mm] border" style={{ borderColor: GOLD_LINE }} />
      <div className="absolute inset-[8.5mm] border" style={{ borderColor: GOLD_LINE }} />
      <GoldLeafCorner id={`glc-tl-${pi}`} className="absolute left-[2mm] top-[2mm] h-[30mm] w-[30mm]" />
      <GoldLeafCorner id={`glc-tr-${pi}`} className="absolute right-[2mm] top-[2mm] h-[30mm] w-[30mm] -scale-x-100" />
      <GoldLeafCorner id={`glc-bl-${pi}`} className="absolute bottom-[2mm] left-[2mm] h-[30mm] w-[30mm] -scale-y-100" />
      <GoldLeafCorner id={`glc-br-${pi}`} className="absolute bottom-[2mm] right-[2mm] h-[30mm] w-[30mm] -scale-100" />
      <div className="absolute inset-x-0 bottom-[11mm] text-center text-[12px]" style={{ color: "#a05bd6" }}>
        snapbiodata.com
      </div>
    </div>
  );

  const header = (
    <div className="flex items-start justify-between gap-6">
      <div className="min-w-0 flex-1">
        {data.header && (
          <p className="doc-display text-[14px] tracking-wide text-[#b8893a]">{data.header}</p>
        )}
        <h1 className="doc-display mt-1 text-[30px] font-bold leading-tight text-[#8a2b2b]">
          {displayName(data)}
        </h1>
        <div className="mt-2 h-[2px] w-24" style={{ background: GOLD_LINE }} />
      </div>
      {data.photo && (
        <div className="shrink-0 rounded-sm border-2 p-1" style={{ borderColor: GOLD_LINE }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.photo} alt={displayName(data)} className="h-[165px] w-[135px] rounded-sm object-cover" />
        </div>
      )}
    </div>
  );

  const renderSection = (section: RenderedSection) => (
    <section>
      <Chip>{section.title}</Chip>
      <dl className="space-y-1.5">
        {section.rows.map((r) => (
          <div key={r.label} className="flex gap-4 text-[13px] leading-relaxed">
            <dt className="w-[42%] shrink-0 font-bold text-[#a9741a]">{r.label}</dt>
            <dd className="flex-1 text-[#2a2025]">{r.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );

  return (
    <FramedDoc
      data={data}
      bg="#fffdf6"
      padX={18}
      padTop={22}
      padBottom={22}
      frame={frame}
      header={header}
      renderSection={renderSection}
    />
  );
}
