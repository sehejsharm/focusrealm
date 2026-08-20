"use client";

import { useState } from "react";

import { pains } from "@/lib/content";

/**
 * The six pains as a chain that compounds.
 *
 * This used to be a tab strip with a text panel underneath, which restated
 * words the cards already carry. Now it draws the one thing the cards cannot:
 * that these are not six independent problems. Hovering a link lights it and
 * everything downstream of it, because that is what actually happens on a
 * floor — a supervisor bottleneck makes the ghost SOP worse, which makes the
 * performance gap worse, and the audit is where all of it lands.
 */
export default function PainChain() {
  const [from, setFrom] = useState<number | null>(null);

  return (
    <div>
      <ol
        className="relative flex gap-1.5 overflow-x-auto pb-2 no-scrollbar sm:gap-2"
        onMouseLeave={() => setFrom(null)}
      >
        {pains.map((entry, index) => {
          // Downstream of whatever is hovered — the cascade, not just the link.
          const lit = from !== null && index >= from;
          const origin = from === index;
          return (
            <li key={entry.id} className="flex min-w-0 flex-1 items-center">
              <button
                type="button"
                onMouseEnter={() => setFrom(index)}
                onFocus={() => setFrom(index)}
                onBlur={() => setFrom(null)}
                aria-describedby="pain-chain-hint"
                className="group relative flex min-h-11 w-full min-w-[104px] flex-col items-start gap-2 rounded-lg px-1 py-2 text-left transition-colors duration-300 sm:min-w-0"
              >
                <span className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/[0.07]">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out-expo"
                    style={{
                      width: lit ? "100%" : "0%",
                      background: origin
                        ? "linear-gradient(90deg,#2a947a,#a8ecd4)"
                        : "color-mix(in oklab, #2a947a 55%, transparent)",
                      // Ripples outward from the link you are on.
                      transitionDelay: from !== null ? `${(index - from) * 70}ms` : "0ms",
                    }}
                  />
                </span>
                <span className="flex items-baseline gap-2">
                  <span
                    className="font-mono text-[0.72rem] tabular-nums transition-colors duration-300"
                    style={{ color: origin ? "#a8ecd4" : "var(--color-faint)" }}
                  >
                    {entry.index}
                  </span>
                  <span
                    className="truncate text-[0.76rem] leading-tight transition-colors duration-300 sm:text-[0.8rem]"
                    style={{ color: lit ? "#ffffff" : "var(--color-muted)" }}
                  >
                    {entry.name}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <p id="pain-chain-hint" className="mt-3 text-[0.84rem] text-faint">
        Each one makes the next worse. Take any link and watch what it drags
        along behind it.
      </p>
    </div>
  );
}
