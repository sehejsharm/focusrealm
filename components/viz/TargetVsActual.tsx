"use client";

import { useState } from "react";

import { useInView } from "@/components/fx/useInView";

/**
 * Target time against the median actual, per standard. Before → after per item
 * is the dumbbell form: two shades of one hue, connected, so the gap is the
 * thing you read. Values are direct-labelled, so the lighter end never has to
 * carry meaning on contrast alone.
 */
const rows = [
  { code: "HSK-101", name: "Guest room reset", target: 26, actual: 24 },
  { code: "HSK-113", name: "Evening turndown", target: 12, actual: 13 },
  { code: "FO-204", name: "Arrival to key", target: 6, actual: 5 },
  { code: "FB-330", name: "Restaurant reset", target: 18, actual: 21 },
  { code: "ENG-118", name: "Fault first response", target: 15, actual: 11 },
] as const;

const MAX = 30;

export default function TargetVsActual() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const [hover, setHover] = useState<number | null>(null);

  return (
    <figure ref={ref}>
      <figcaption className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <span className="font-mono text-[0.58rem] tracking-[0.16em] text-brand-cyan uppercase">
          Target vs median actual
        </span>
        <ul className="flex gap-4">
          <li className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#1a6957] ring-2 ring-[#0b2126]" />
            <span className="text-[0.72rem] text-muted">Target</span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#a8ecd4] ring-2 ring-[#0b2126]" />
            <span className="text-[0.72rem] text-muted">Actual</span>
          </li>
        </ul>
      </figcaption>

      <ul className="space-y-3.5">
        {rows.map((row, index) => {
          const lit = hover === null || hover === index;
          const tx = (row.target / MAX) * 100;
          const ax = (row.actual / MAX) * 100;
          const over = row.actual > row.target;
          return (
            <li
              key={row.code}
              onPointerEnter={() => setHover(index)}
              onPointerLeave={() => setHover(null)}
              className="transition-opacity duration-300"
              style={{ opacity: lit ? 1 : 0.45 }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate text-[0.8rem] text-muted">{row.name}</span>
                <span className="shrink-0 font-mono text-[0.68rem] tabular-nums text-faint">
                  {row.target}→{row.actual} min
                  <span className={over ? "ml-1.5 text-[#ff9b9b]" : "ml-1.5 text-brand-cyan"}>
                    {over ? "+" : "−"}
                    {Math.abs(row.actual - row.target)}
                  </span>
                </span>
              </div>
              <div className="relative mt-2 h-3">
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/[0.07]" />
                <span
                  className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full transition-all duration-700 ease-out-expo"
                  style={{
                    left: `${Math.min(tx, ax)}%`,
                    width: inView ? `${Math.abs(ax - tx)}%` : "0%",
                    background: over ? "#ff9b9b" : "#4ec4a1",
                    transitionDelay: `${index * 60}ms`,
                  }}
                />
                <span
                  className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1a6957] ring-2 ring-[#0b2126]"
                  style={{ left: `${tx}%` }}
                />
                <span
                  className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a8ecd4] ring-2 ring-[#0b2126] transition-[left] duration-700 ease-out-expo"
                  style={{ left: inView ? `${ax}%` : `${tx}%`, transitionDelay: `${index * 60}ms` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}
