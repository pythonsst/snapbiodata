"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { SUPPORT } from "@/config";

const UPI_ID = SUPPORT.upiId;
const AMOUNTS = SUPPORT.amounts;

function upiLink(amount: number) {
  const p = new URLSearchParams({
    pa: SUPPORT.upiId,
    pn: SUPPORT.payeeName,
    cu: "INR",
    tn: `Support ${SUPPORT.payeeName}`,
  });
  if (amount) p.set("am", String(amount));
  return `upi://pay?${p.toString()}`;
}

export default function SupportDialog({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState<number>(49);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-maroon/10 text-2xl">💛</div>
          <h2 className="mt-3 text-lg font-bold text-ink">Help keep sharing free</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            Downloading your biodata as a <strong className="text-ink">PDF is always free</strong>.
            Shareable links (<span className="whitespace-nowrap">snapbiodata.com/your-name</span>) run on a
            small paid server — a tiny contribution helps me keep it online for everyone. 🙏
          </p>
        </div>

        {/* Suggested amounts */}
        <div className="mt-5 flex justify-center gap-2">
          {AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                amount === a ? "border-maroon bg-maroon/10 text-maroon" : "border-line text-ink hover:border-maroon/40"
              }`}
            >
              ₹{a}
            </button>
          ))}
        </div>

        {/* QR for scan-to-pay */}
        <div className="mt-5 flex flex-col items-center">
          <div className="rounded-xl border border-line bg-white p-3">
            <QRCodeSVG value={upiLink(amount)} size={148} fgColor="#2a2025" />
          </div>
          <p className="mt-2 text-xs text-muted">Scan with any UPI app (PhonePe, GPay, Paytm…)</p>
        </div>

        {/* Pay button (mobile) */}
        <a
          href={upiLink(amount)}
          className="mt-4 block w-full rounded-xl bg-maroon py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-maroon-dark"
        >
          Pay ₹{amount} with a UPI app
        </a>

        {/* UPI id + copy */}
        <div className="mt-3 flex items-center justify-center gap-2 text-sm">
          <span className="text-muted">UPI:</span>
          <span className="font-semibold text-ink">{UPI_ID}</span>
          <button onClick={copy} className="rounded-md border border-line px-2 py-0.5 text-xs font-medium hover:border-maroon hover:text-maroon">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <button onClick={onClose} className="mt-5 w-full text-center text-sm font-medium text-muted hover:text-ink">
          Maybe later — just download the PDF
        </button>
      </div>
    </div>
  );
}
