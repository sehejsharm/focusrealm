"use client";

import { useEffect, useState } from "react";

import Reveal from "@/components/fx/Reveal";
import { Container, Eyebrow } from "@/components/ui/Section";
import { vocabulary } from "@/lib/content";

/**
 * Positioning discipline, made visual. The retired LMS vocabulary is struck
 * out and replaced in front of the reader — one pair at a time.
 */
export default function NotAnLms() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % vocabulary.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="not-an-lms" className="relative overflow-hidden py-14 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,color-mix(in_oklab,var(--color-brand)_10%,transparent),transparent)]"
      />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Eyebrow className="justify-center">Positioning discipline</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-6 text-[clamp(2.1rem,5.4vw,4rem)] leading-[1.02] font-semibold text-white">
              This is not an LMS.
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-muted sm:text-[1.08rem]">
              A learning management system records that someone consumed a course. Focus Realm records that a
              specific standard was executed on room 208 at 08:36, with a photo attached and a supervisor name
              against it. Those are not the same product, and they are not the same category.
            </p>
          </Reveal>

          {/* Live word swap */}
          <Reveal delay={240} className="mt-14">
            <div className="flex min-h-[4.5rem] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[clamp(1.5rem,4.2vw,2.6rem)] font-semibold tracking-[-0.03em]">
              <span className="relative text-white/28">
                <span className="line-through decoration-[#ff9b9b]/70 decoration-[3px]">
                  {vocabulary[index].avoid}
                </span>
              </span>
              <span aria-hidden className="text-brand/60">
                →
              </span>
              <span key={vocabulary[index].use} className="text-gradient" style={{ animation: "rise-in 0.55s var(--ease-out-expo) both" }}>
                {vocabulary[index].use}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Full vocabulary */}
        <Reveal delay={120} className="mx-auto mt-16 max-w-4xl">
          <div className="panel overflow-hidden">
            <div className="grid grid-cols-2 border-b border-line">
              <p className="px-5 py-3.5 font-mono text-[0.74rem] tracking-[0.18em] uppercase text-[#ff9b9b]/80 sm:px-7">
                Retired
              </p>
              <p className="border-l border-line px-5 py-3.5 font-mono text-[0.74rem] tracking-[0.18em] text-brand-cyan uppercase sm:px-7">
                In use
              </p>
            </div>
            {vocabulary.map((pair, rowIndex) => (
              <div
                key={pair.avoid}
                className="grid grid-cols-2 border-b border-line/70 transition-colors duration-500 last:border-b-0"
                style={{
                  background:
                    rowIndex === index ? "color-mix(in oklab, var(--color-brand) 8%, transparent)" : "transparent",
                }}
              >
                <p className="px-5 py-4 text-[0.92rem] text-white/35 line-through decoration-white/25 sm:px-7">
                  {pair.avoid}
                </p>
                <p className="border-l border-line px-5 py-4 text-[0.92rem] text-white sm:px-7">{pair.use}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-[0.78rem] text-faint">
            Courses and Modules survive as in-product screen labels only — never at the category level.
          </p>
        </Reveal>

        {/* Category claim */}
        <Reveal delay={160} className="mx-auto mt-16 max-w-3xl">
          <div className="relative rounded-2xl border border-brand-bright/25 bg-brand/8 p-8 text-center sm:p-10">
            <span
              aria-hidden
              className="animate-sheen pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
            />
            <p className="font-mono text-[0.76rem] tracking-[0.18em] text-brand-cyan uppercase">Category</p>
            <p className="mt-4 text-[clamp(1.3rem,3vw,2rem)] leading-tight font-semibold text-white">
              Service Execution Platform
            </p>
            <p className="mt-3 text-[0.95rem] text-muted">The operating system for hotel service standards.</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
