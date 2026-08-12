"use client";

import { useState } from "react";

import { pains } from "@/lib/content";

/**
 * The six pains as a chain you can walk, rather than six cards of prose.
 * Selecting a link shows two lines: what it costs, and what closes it.
 * Replaces roughly seven hundred words with a diagram and forty.
 */
export default function PainChain() {
  const [active, setActive] = useState(0);
  const pain = pains[active];

  return (
    <div>
      {/* The chain */}
      <ol className="relative flex gap-1.5 overflow-x-auto pb-2 no-scrollbar sm:gap-2">
        {pains.map((entry, index) => {
          const isActive = index === active;
          const reached = index <= active;
          return (
            <li key={entry.id} className="flex min-w-0 flex-1 items-center">
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-current={isActive}
                className="group relative flex min-h-11 w-full min-w-[104px] flex-col items-start gap-2 rounded-lg px-1 py-2 text-left transition-colors duration-300 sm:min-w-0"
              >
                <span className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/[0.07]">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out-expo"
                    style={{
                      width: reached ? "100%" : "0%",
                      background: isActive
                        ? "linear-gradient(90deg,#2a947a,#a8ecd4)"
                        : "color-mix(in oklab, #2a947a 60%, transparent)",
                      transitionDelay: `${index * 40}ms`,
                    }}
                  />
                </span>
                <span className="flex items-baseline gap-2">
                  <span
                    className="font-mono text-[0.55rem] tabular-nums transition-colors duration-300"
                    style={{ color: isActive ? "#a8ecd4" : "var(--color-faint)" }}
                  >
                    {entry.index}
                  </span>
                  <span
                    className="truncate text-[0.76rem] leading-tight transition-colors duration-300 sm:text-[0.8rem]"
                    style={{ color: isActive ? "#ffffff" : "var(--color-muted)" }}
                  >
                    {entry.name}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* The one selected link */}
      <div
        key={pain.id}
        className="mt-8 grid gap-8 border-t border-line pt-8 lg:grid-cols-2 lg:gap-14"
        style={{ animation: "rise-in 0.5s var(--ease-out-expo) both" }}
      >
        <div>
          <p className="font-mono text-[0.55rem] tracking-[0.16em] uppercase text-[#ff9b9b]">Costs you</p>
          <p className="mt-3 text-[clamp(1.2rem,2.4vw,1.7rem)] leading-snug font-medium text-white">
            {pain.wound}
          </p>
        </div>
        <div>
          <p className="font-mono text-[0.55rem] tracking-[0.16em] text-brand-cyan uppercase">Closed by</p>
          <p className="mt-3 text-[1rem] leading-relaxed text-muted">{pain.answer}</p>
        </div>
      </div>
    </div>
  );
}
