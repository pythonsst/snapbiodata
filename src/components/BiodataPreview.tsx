"use client";

import { useEffect, useRef, useState } from "react";
import { getTemplate } from "./templates";
import type { Biodata } from "@/data/biodata";

// A4 in CSS pixels at 96 DPI.
const A4_W = 793.7;
const A4_H = 1122.5;

export default function BiodataPreview({ data, templateId }: { data: Biodata; templateId: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / A4_W));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { Component } = getTemplate(templateId);

  return (
    <div ref={wrapRef} className="w-full">
      <div style={{ width: A4_W * scale, height: A4_H * scale }} className="relative mx-auto">
        <div
          id="print-area"
          style={{
            width: A4_W,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          className="shadow-2xl ring-1 ring-black/5"
        >
          <Component data={data} />
        </div>
      </div>
    </div>
  );
}
