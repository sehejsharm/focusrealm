"use client";

import { useState } from "react";

import { KineticHeading } from "@/components/fx/Kinetics";
import Reveal from "@/components/fx/Reveal";
import { Container, Eyebrow } from "@/components/ui/Section";
import { convergence } from "@/lib/content";

/**
 * Five scattered jobs collapsing into one platform.
 *
 * Replaces the old three-column comparison table. Two reasons: a column headed
 * "a generic LMS" next to ours asked the reader to weigh what they already own
 * against us, which reads as "you already have this"; and on a phone the table
 * degraded into eighteen separate blocks of text, which nobody finishes. Here
 * the argument is carried by the shape — many lines in, one line out — so the
 * reading load is five short rows either way.
 */
export default function Convergence() {
  const [active, setActive] = useState<number | null>(null);
  const jobs = convergence.jobs;

  return (
    <section id="one-platform" className="relative overflow-hidden py-24 sm:py-28">
      <Container>
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>What it replaces</Eyebrow>
          </Reveal>
          <KineticHeading
            text="Five places. One hotel operations platform."
            variant="drift"
            accentFrom={2}
            className="mt-5 text-[clamp(1.9rem,4vw,3rem)] leading-[1.04] font-semibold text-white"
          />
          <Reveal delay={80}>
            <p className="mt-5 text-[0.98rem] leading-relaxed text-muted">
              Every property already does these five things. They just live in
              five different places, and only the last one is ever asked for.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_100px_minmax(0,340px)] lg:items-stretch lg:gap-0">
          {/* The five jobs as they run today */}
          <ol className="space-y-px lg:max-w-[560px]">
            {jobs.map((item, index) => {
              const on = active === index;
              return (
                <li key={item.job}>
                  <Reveal delay={index * 45}>
                    <div
                      onMouseEnter={() => setActive(index)}
                      onMouseLeave={() => setActive(null)}
                      className={`flex items-baseline gap-4 border-l-2 py-3.5 pl-5 transition-colors duration-300 ${
                        on ? "border-brand-bright bg-brand/8" : "border-line"
                      }`}
                    >
                      <span className="font-mono text-[0.72rem] text-faint tabular-nums">
                        0{index + 1}
                      </span>
                      {/* One node, repositioned rather than duplicated: the
                          cost is the argument, so it has to survive on a
                          phone, where it drops under the line instead of
                          sitting out to the right. */}
                      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                        <div className="min-w-0 flex-1">
                          <p className="text-[0.95rem] font-medium text-white">{item.job}</p>
                          <p className="mt-1 text-[0.84rem] leading-relaxed text-faint">
                            {item.today}
                          </p>
                          <p className="mt-1 text-[0.8rem] leading-relaxed text-faint/80">
                            {item.where}
                          </p>
                        </div>
                        <span className="shrink-0 font-mono text-[0.72rem] text-brand-cyan/80">
                          {item.cost}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          {/* Desktop: five wires converging to one. Decorative — the list and
              the panel either side already carry the meaning. */}
          {/* Stretched to the list's own height and sliced into five equal
              bands, so each wire leaves from its row rather than from a fixed
              300px box that never matched. */}
          <svg
            aria-hidden
            viewBox="0 0 100 500"
            preserveAspectRatio="none"
            className="hidden h-full w-[100px] self-stretch lg:block"
          >
            {jobs.map((_, index) => {
              const y = 50 + index * 100;
              const on = active === index;
              return (
                <path
                  key={index}
                  d={`M0 ${y} C 55 ${y}, 45 250, 100 250`}
                  fill="none"
                  stroke={on ? "var(--color-brand-bright)" : "var(--color-line)"}
                  strokeWidth={on ? 2 : 1}
                  className="transition-all duration-300"
                />
              );
            })}
            <circle cx="100" cy="250" r="5" fill="var(--color-brand-bright)" />
          </svg>

          {/* Mobile: one arrow, not five */}
          <div aria-hidden className="flex items-center gap-3 lg:hidden">
            <span className="h-px flex-1 bg-linear-to-r from-transparent to-brand-bright/60" />
            <svg viewBox="0 0 14 14" className="size-4 text-brand-bright" fill="none">
              <path
                d="M7 1v12M2.5 8.5 7 13l4.5-4.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="h-px flex-1 bg-linear-to-l from-transparent to-brand-bright/60" />
          </div>

          {/* The one thing it becomes */}
          <Reveal delay={140} variant="scale" className="lg:h-full">
            {/* h-full so the card matches the list it sits beside, instead of
                floating centred against it with both edges out of line. */}
            <div className="panel flex h-full flex-col justify-center p-7">
              <p className="font-mono text-[0.72rem] tracking-[0.16em] text-brand-cyan uppercase">
                {convergence.outcome.label}
              </p>
              <p className="mt-4 text-[1.25rem] leading-snug font-semibold text-white">
                {convergence.outcome.title}
              </p>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">
                {convergence.outcome.body}
              </p>
              <p className="mt-6 border-t border-line pt-4 font-mono text-[0.72rem] text-faint">
                {convergence.outcome.proof}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
