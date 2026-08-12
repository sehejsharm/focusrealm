"use client";

import { useEffect, useRef, useState } from "react";

import Aurora from "@/components/fx/Aurora";
import Reveal from "@/components/fx/Reveal";
import SpotlightCard from "@/components/fx/SpotlightCard";
import { useScrollProgress } from "@/components/fx/useScrollProgress";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { pains } from "@/lib/content";

/**
 * The GTM spine. Six pains that chain into each other, walked as one
 * compounding snowball: pinned horizontal travel on desktop, a snap rail on
 * mobile. Same content, same order, either way.
 */
export default function PainSnowball() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [maxShift, setMaxShift] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // ResizeObserver rather than a resize listener: the track's width also
  // changes when the cards reflow, not only when the window does.
  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const observer = new ResizeObserver(() => {
      setMaxShift(isDesktop ? Math.max(0, track.scrollWidth - viewport.clientWidth) : 0);
    });
    observer.observe(track);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [isDesktop]);

  // Dwell on the first and last card rather than moving from frame zero.
  const travel = Math.min(1, Math.max(0, (progress - 0.04) / 0.9));
  const shift = isDesktop ? travel * maxShift : 0;
  const activeIndex = Math.min(pains.length - 1, Math.round(travel * (pains.length - 1)));

  return (
    <section id="problems" className="relative">
      <Aurora variant="section" />

      <Container className="pt-24 sm:pt-32">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <Reveal>
              <Eyebrow>The six pains</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.02] font-semibold text-white">
                None of these is a training problem.
                <span className="text-gradient"> Every one of them compounds.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <p className="text-[1rem] leading-relaxed text-muted">
              This is the arc we walk with every operator: where it starts, what it sets off, and the wound it
              leaves. Six pains, in the order they actually chain — and one mechanism that answers all six.
            </p>
          </Reveal>
        </div>
      </Container>

      {/* Chain rail */}
      <Container className="mt-12">
        <Reveal>
          <ol className="hidden items-center gap-2 lg:flex">
            {pains.map((pain, index) => {
              const reached = index <= activeIndex;
              return (
                <li key={pain.id} className="flex flex-1 items-center gap-2">
                  <span className="flex flex-col gap-2">
                    <span
                      className="flex size-7 items-center justify-center rounded-full border font-mono text-[0.58rem] transition-all duration-500"
                      style={{
                        borderColor: reached
                          ? "color-mix(in oklab, var(--color-brand-bright) 60%, transparent)"
                          : "var(--color-line)",
                        background: reached ? "color-mix(in oklab, var(--color-brand) 22%, transparent)" : "transparent",
                        color: reached ? "#fff" : "var(--color-faint)",
                      }}
                    >
                      {pain.index}
                    </span>
                  </span>
                  <span
                    className="hidden truncate text-[0.72rem] transition-colors duration-500 xl:block"
                    style={{ color: reached ? "var(--color-paper)" : "var(--color-faint)" }}
                  >
                    {pain.name}
                  </span>
                  {index < pains.length - 1 ? (
                    <span className="h-px flex-1 overflow-hidden bg-white/10">
                      <span
                        className="block h-full bg-linear-to-r from-brand to-brand-cyan transition-transform duration-500"
                        style={{ transform: `scaleX(${index < activeIndex ? 1 : 0})`, transformOrigin: "left" }}
                      />
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </Reveal>
      </Container>

      {/* Pinned travel */}
      <div ref={ref} className="relative mt-10 lg:h-[300vh]">
        <div className="lg:sticky lg:top-0 lg:flex lg:min-h-dvh lg:items-center lg:py-24">
          <div ref={viewportRef} className="w-full overflow-hidden">
            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 no-scrollbar sm:px-8 lg:snap-none lg:overflow-visible lg:px-8 lg:pb-0"
              style={
                isDesktop
                  ? { transform: `translate3d(${-shift}px, 0, 0)`, transition: "transform 120ms linear" }
                  : undefined
              }
            >
              {pains.map((pain, index) => {
                const active = isDesktop ? index === activeIndex : true;
                return (
                  <SpotlightCard
                    key={pain.id}
                    as="article"
                    className="panel relative flex w-[84vw] shrink-0 snap-center flex-col overflow-hidden p-6 transition-all duration-700 ease-out-expo sm:w-[62vw] sm:p-8 lg:w-[420px] xl:w-[460px]"
                    style={{
                      opacity: active ? 1 : 0.42,
                      transform: active ? "scale(1)" : "scale(0.965)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-bright/60 to-transparent transition-opacity duration-700"
                      style={{ opacity: active ? 1 : 0 }}
                    />

                    <div className="flex items-start justify-between gap-4">
                      <span aria-hidden className="font-mono text-[2.6rem] leading-none font-semibold text-white/40">
                        {pain.index}
                      </span>
                      <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.1em] text-brand-ice uppercase">
                        {pain.metric}
                      </span>
                    </div>

                    <h3 className="mt-4 text-[clamp(1.4rem,2.4vw,1.85rem)] leading-tight font-semibold text-white">
                      {pain.name}
                    </h3>

                    <dl className="mt-6 space-y-5">
                      <div>
                        <dt className="font-mono text-[0.55rem] tracking-[0.16em] text-faint uppercase">
                          Status quo
                        </dt>
                        <dd className="mt-2 text-[0.88rem] leading-relaxed text-muted">{pain.statusQuo}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[0.55rem] tracking-[0.16em] text-faint uppercase">
                          Impact chain
                        </dt>
                        <dd className="mt-2 text-[0.88rem] leading-relaxed text-muted">{pain.impactChain}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[0.55rem] tracking-[0.16em] uppercase text-[#ff9b9b]">
                          The wound
                        </dt>
                        <dd className="mt-2 text-[0.98rem] leading-snug font-medium text-white">{pain.wound}</dd>
                      </div>
                    </dl>

                    <div className="mt-auto pt-6">
                      <div className="rounded-xl border border-brand-bright/25 bg-brand/10 px-4 py-3.5">
                        <p className="font-mono text-[0.55rem] tracking-[0.16em] text-brand-cyan uppercase">
                          The answer
                        </p>
                        <p className="mt-2 text-[0.85rem] leading-relaxed text-paper">{pain.answer}</p>
                      </div>
                    </div>
                  </SpotlightCard>
                );
              })}

              {/* Closing card */}
              <div className="panel flex w-[84vw] shrink-0 snap-center flex-col justify-center overflow-hidden p-8 sm:w-[62vw] lg:w-[420px] xl:w-[460px]">
                <Eyebrow>One mechanism</Eyebrow>
                <p className="mt-5 text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-semibold text-white">
                  Six pains. One answer:
                  <span className="text-gradient"> standard inside task → automatic evidence → service record.</span>
                </p>
                <p className="mt-5 text-[0.9rem] leading-relaxed text-muted">
                  We do not sell six features. We install one mechanism, and the six pains stop compounding in
                  the same order they started.
                </p>
                <div className="mt-7">
                  <ButtonLink href="/problems" variant="outline">
                    Read the full case
                    <ArrowRight />
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Container className="mt-4 lg:hidden">
        <p className="font-mono text-[0.6rem] tracking-[0.14em] text-faint uppercase">Swipe to follow the chain →</p>
      </Container>
    </section>
  );
}
