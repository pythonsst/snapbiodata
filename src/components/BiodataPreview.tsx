"use client";

import { useEffect, useRef, useState } from "react";
import { getTemplate } from "./templates";
import { A4_W } from "@/lib/a4";
import type { Biodata } from "@/data/biodata";

export default function BiodataPreview({ data, templateId }: { data: Biodata; templateId: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [innerH, setInnerH] = useState(0);

  // Fit-to-width on screen.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / A4_W));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Track the (multi-page) document height so the scaled wrapper reserves space.
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const update = () => setInnerH(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [data, templateId]);

  const { Component } = getTemplate(templateId);

  return (
    <div ref={wrapRef} className="w-full print:!block">
      <div
        style={{ width: A4_W * scale, height: innerH * scale }}
        className="relative mx-auto print:!static print:!m-0 print:!h-auto print:!w-auto"
      >
        <div
          id="print-area"
          ref={innerRef}
          style={{
            width: A4_W,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Component data={data} />
        </div>
      </div>
    </div>
  );
}
