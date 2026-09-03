"use client";

import { useState } from "react";

import { useInView } from "@/components/fx/useInView";
import { ramp, readiness } from "@/lib/viz";

/**
 * Readiness by department. Nominal categories with a magnitude to compare, so
 * it is a bar chart on ONE sequential hue — colouring each department its own
 * colour would spend the identity channel re-encoding what bar length shows.
 *
 * The two darkest ramp steps fall below 3:1 on the surface, so every bar
 * carries a visible value label — the relief the contrast rule requires.
 */
export default function ReadinessBars() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const [hover, setHover] = useState<number | null>(null);

  return (
    <figure ref={ref}>
      <figcaption className="mb-5 flex items-baseline justify-between gap-4">
        <span className="font-mono text-[0.74rem] tracking-[0.16em] text-brand-cyan uppercase">
          Cleared to standard, by department
        </span>
        <span className="font-mono text-[0.76rem] tabular-nums text-faint">
          {hover === null ? "42 staff" : `${readiness[hover].staff} staff`}
        </span>
      </figcaption>

      <ul className="space-y-2.5">
        {readiness.map((row, index) => {
          const t = index / (readiness.length - 1);
          const color = ramp[Math.max(1, ramp.length - 1 - Math.round(t * (ramp.length - 2)))];
          const lit = hover === null || hover === index;
          return (
            <li
              key={row.dept}
              onPointerEnter={() => setHover(index)}
              onPointerLeave={() => setHover(null)}
              className="grid grid-cols-[minmax(84px,0.34fr)_1fr_auto] items-center gap-3 transition-opacity duration-300 sm:grid-cols-[132px_1fr_auto] sm:gap-4"
              style={{ opacity: lit ? 1 : 0.45 }}
            >
              <span className="truncate text-[0.82rem] text-muted">{row.dept}</span>
              <span className="relative h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                <span
                  className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-[900ms] ease-out-expo"
                  style={{
                    width: inView ? `${row.value}%` : "0%",
                    background: color,
                    transitionDelay: `${index * 70}ms`,
                  }}
                />
              </span>
              <span className="w-10 text-right font-mono text-[0.78rem] tabular-nums text-white">
                {row.value}%
              </span>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}
