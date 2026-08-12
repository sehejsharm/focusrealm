"use client";

import { useMemo, useRef, useState } from "react";

import { useInView } from "@/components/fx/useInView";
import { buildEvidence } from "@/lib/viz";

const W = 720;
const H = 260;
const PAD = { top: 18, right: 16, bottom: 30, left: 44 };

/**
 * Cumulative photo evidence and supervisor sign-offs across a thirty-day
 * pilot. Two series that stack rather than compete, so the reader sees one
 * total climbing — which is the whole "it compounds" claim, drawn instead of
 * asserted. Crosshair + tooltip per the interaction default for area charts.
 */
export default function EvidenceChart() {
  const data = useMemo(() => buildEvidence(), []);
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const svgRef = useRef<SVGSVGElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const max = Math.max(...data.map((d) => d.photos + d.signoffs));
  const x = (i: number) => PAD.left + (i / (data.length - 1)) * (W - PAD.left - PAD.right);
  const y = (v: number) => PAD.top + (1 - v / max) * (H - PAD.top - PAD.bottom);

  function area(pick: (d: (typeof data)[number]) => number, base: (d: (typeof data)[number]) => number) {
    const top = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(pick(d)).toFixed(1)}`).join(" ");
    const bottom = [...data]
      .reverse()
      .map((d, i) => `L${x(data.length - 1 - i).toFixed(1)},${y(base(d)).toFixed(1)}`)
      .join(" ");
    return `${top} ${bottom} Z`;
  }

  function line(pick: (d: (typeof data)[number]) => number) {
    return data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(pick(d)).toFixed(1)}`).join(" ");
  }

  function onMove(event: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * W;
    const t = (px - PAD.left) / (W - PAD.left - PAD.right);
    setIndex(Math.min(data.length - 1, Math.max(0, Math.round(t * (data.length - 1)))));
  }

  const active = index === null ? data[data.length - 1] : data[index];
  const activeX = x(index === null ? data.length - 1 : index);

  return (
    <figure ref={ref} className="relative">
      <figcaption className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[0.58rem] tracking-[0.16em] text-brand-cyan uppercase">
            Evidence held, day {active.day}
          </span>
          <p className="mt-2 text-[clamp(1.8rem,3.6vw,2.6rem)] leading-none font-semibold tabular-nums text-white">
            {(active.photos + active.signoffs).toLocaleString("en-US")}
          </p>
        </div>
        {/* Two series, so a legend is present and both are direct-labelled. */}
        <ul className="flex gap-5">
          {[
            { label: "Photos", value: active.photos, color: "#2a947a" },
            { label: "Sign-offs", value: active.signoffs, color: "#a8ecd4" },
          ].map((s) => (
            <li key={s.label} className="flex items-center gap-2">
              <span className="size-2.5 rounded-[3px]" style={{ background: s.color }} />
              <span className="text-[0.78rem] text-muted">{s.label}</span>
              <span className="font-mono text-[0.78rem] tabular-nums text-white">
                {s.value.toLocaleString("en-US")}
              </span>
            </li>
          ))}
        </ul>
      </figcaption>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full touch-none"
        role="img"
        aria-label={`Cumulative evidence over a thirty-day pilot, reaching ${data[data.length - 1].photos} photos and ${data[data.length - 1].signoffs} supervisor sign-offs by day 30.`}
        onPointerMove={onMove}
        onPointerLeave={() => setIndex(null)}
      >
        <defs>
          <linearGradient id="ev-photos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a947a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2a947a" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="ev-sign" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a8ecd4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a8ecd4" stopOpacity="0.05" />
          </linearGradient>
          <clipPath id="ev-reveal">
            <rect x="0" y="0" height={H} width={inView ? W : 0}>
              <animate attributeName="width" from="0" to={W} dur="1.1s" fill="freeze" begin={inView ? "0s" : "indefinite"} />
            </rect>
          </clipPath>
        </defs>

        {/* Recessive grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const v = max * t;
          return (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} stroke="rgba(148,212,193,0.13)" strokeWidth="1" />
              <text x={PAD.left - 10} y={y(v) + 4} textAnchor="end" fontSize="10" fill="#9ab5b1" fontFamily="ui-monospace, monospace">
                {Math.round(v)}
              </text>
            </g>
          );
        })}

        <g clipPath="url(#ev-reveal)">
          {/* Stacked: sign-offs sit on top of photos, 2px surface gap between */}
          <path d={area((d) => d.photos, () => 0)} fill="url(#ev-photos)" />
          <path d={area((d) => d.photos + d.signoffs, (d) => d.photos)} fill="url(#ev-sign)" />
          <path d={line((d) => d.photos)} fill="none" stroke="#2a947a" strokeWidth="2" />
          <path
            d={line((d) => d.photos + d.signoffs)}
            fill="none"
            stroke="#a8ecd4"
            strokeWidth="2"
            style={{ filter: "drop-shadow(0 0 6px rgba(168,236,212,0.35))" }}
          />
        </g>

        {/* Crosshair */}
        <line
          x1={activeX}
          x2={activeX}
          y1={PAD.top}
          y2={H - PAD.bottom}
          stroke="rgba(148,212,193,0.5)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <circle cx={activeX} cy={y(active.photos + active.signoffs)} r="4.5" fill="#a8ecd4" stroke={"#0b2126"} strokeWidth="2" />

        {[1, 10, 20, 30].map((d) => (
          <text
            key={d}
            x={x(d - 1)}
            y={H - 10}
            textAnchor="middle"
            fontSize="10"
            fill="#9ab5b1"
            fontFamily="ui-monospace, monospace"
          >
            Day {d}
          </text>
        ))}
      </svg>
    </figure>
  );
}
