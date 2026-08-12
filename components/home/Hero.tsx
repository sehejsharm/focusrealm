"use client";

import { useEffect, useState } from "react";

import Aurora from "@/components/fx/Aurora";
import CountUp from "@/components/fx/CountUp";
import Reveal, { MaskedLines } from "@/components/fx/Reveal";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { PhoneFrame } from "@/components/ui/DeviceFrame";
import { Container, Eyebrow } from "@/components/ui/Section";
import staffToday from "@/assets/platform/staff-today.jpg";
import { property, roles } from "@/lib/content";

const chain = [
  "standard",
  "timed task",
  "photo evidence",
  "supervisor sign-off",
  "service record",
];

/** The mechanism as a running ticker — the thesis in five words. */
function ChainTicker() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % chain.length), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
      {chain.map((step, index) => (
        <span key={step} className="flex items-center gap-2.5">
          <span
            className={`transition-all duration-700 ease-out-expo ${
              index === active
                ? "text-brand-cyan [text-shadow:0_0_18px_color-mix(in_oklab,var(--color-brand-cyan)_60%,transparent)]"
                : "text-faint"
            }`}
          >
            {step}
          </span>
          {index < chain.length - 1 ? (
            <span aria-hidden className="text-brand/50">
              →
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

/** Countdown against a target time. Seeded so the first paint is stable. */
function LiveCountdown() {
  const [seconds, setSeconds] = useState(18 * 60);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s <= 1 ? 18 * 60 : s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <span className="font-mono tabular-nums">
      {mm}:{ss}
    </span>
  );
}

const stats = [
  { value: 3, label: "Role interfaces, built separately", suffix: "" },
  { value: property.routes, label: "Product routes live today", suffix: "" },
  { value: 15, label: "Minutes to see it on a real shift", suffix: " min" },
  { value: 100, label: "Evidence-gated steps, no exceptions", suffix: "%" },
];

export default function Hero() {
  const staff = roles[0];

  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <Aurora variant="hero" />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          {/* Copy */}
          <div className="relative">
            <Reveal>
              <Eyebrow>
                Service execution platform
                <span className="hidden sm:inline"> · Hotel operations</span>
              </Eyebrow>
            </Reveal>

            <h1 className="mt-7 text-[clamp(2.6rem,6.2vw,4.9rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-white">
              <MaskedLines
                lines={[
                  <>The operating system</>,
                  <>
                    for <span className="text-gradient">hotel service</span>
                  </>,
                  <span key="l3" className="text-gradient">
                    standards.
                  </span>,
                ]}
                stagger={80}
                immediate
              />
            </h1>

            <Reveal delay={420}>
              <p className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-muted sm:text-[1.14rem]">
                <strong className="font-medium text-paper">Focus Realm Hospitality</strong> puts the standard
                inside the timed task on your staff member&rsquo;s phone. Completing the task captures the photo
                and the supervisor sign-off. That evidence compounds into an audit-ready service record.
              </p>
            </Reveal>

            <Reveal delay={540}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/demo" size="lg">
                  Book a 15-min demo
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/platform" variant="outline" size="lg">
                  See the three interfaces
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={660}>
              <div className="mt-10 border-t border-line pt-6">
                <ChainTicker />
              </div>
            </Reveal>
          </div>

          {/* Device */}
          <Reveal variant="scale" delay={260} className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
            <div className="relative flex justify-center px-2 sm:px-8">
              <div className="animate-float relative w-full max-w-[320px] min-w-[220px]">
                <PhoneFrame
                  src={staffToday}
                  alt={staff.screens[0].alt}
                  priority
                  sizes="(max-width: 640px) 68vw, 320px"
                >
                  {/* Scanline sweep over the live screen */}
                  <div
                    aria-hidden
                    className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-transparent via-brand-cyan/22 to-transparent"
                  />
                </PhoneFrame>
              </div>

              {/* Floating chips from sm up; below 640px they would cover the
                  screen, so the same two facts move under the device. */}
              <div
                className="absolute top-[6%] left-0 z-20 hidden sm:block sm:-left-2 lg:-left-6"
                style={{ animation: "rise-in 0.9s var(--ease-out-expo) 900ms both" }}
              >
                <div className="panel flex items-center gap-2.5 px-3.5 py-2.5 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.9)]">
                  <span className="relative flex size-2">
                    <span className="animate-pulse-ring absolute inset-0 rounded-full bg-brand-cyan" />
                    <span className="relative size-2 rounded-full bg-brand-cyan" />
                  </span>
                  <span className="font-mono text-[0.6rem] tracking-[0.12em] text-paper uppercase">
                    On shift
                  </span>
                  <span className="text-[0.7rem] text-brand-ice">
                    <LiveCountdown />
                  </span>
                </div>
              </div>

              <div
                className="absolute right-0 bottom-[6%] z-20 hidden sm:block sm:-right-3 lg:-right-8"
                style={{ animation: "rise-in 0.9s var(--ease-out-expo) 1150ms both" }}
              >
                <div className="panel max-w-[196px] px-4 py-3.5 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.9)]">
                  <p className="flex items-center gap-2 font-mono text-[0.56rem] tracking-[0.14em] text-brand-cyan uppercase">
                    <svg viewBox="0 0 14 14" className="size-3" fill="none" aria-hidden>
                      <rect x="1.5" y="3.5" width="11" height="8" rx="1.6" stroke="currentColor" strokeWidth="1.3" />
                      <circle cx="7" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                    Evidence gate
                  </p>
                  <p className="mt-2 text-[0.76rem] leading-snug text-paper">
                    Step 4 will not tick until the photo exists.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile stand-in for the floating chips */}
            <div className="mt-6 flex gap-2.5 sm:hidden">
              <div className="panel flex flex-1 items-center gap-2 px-3 py-2.5">
                <span className="relative flex size-1.5">
                  <span className="animate-pulse-ring absolute inset-0 rounded-full bg-brand-cyan" />
                  <span className="relative size-1.5 rounded-full bg-brand-cyan" />
                </span>
                <span className="font-mono text-[0.55rem] tracking-[0.1em] text-paper uppercase">On shift</span>
                <span className="ml-auto text-[0.66rem] text-brand-ice">
                  <LiveCountdown />
                </span>
              </div>
              <div className="panel flex flex-1 items-center gap-2 px-3 py-2.5">
                <span className="font-mono text-[0.55rem] tracking-[0.1em] text-brand-cyan uppercase">
                  Photo gate
                </span>
                <span className="ml-auto text-[0.66rem] text-paper">Step 4</span>
              </div>
            </div>

            <p className="mt-6 text-center font-mono text-[0.58rem] tracking-[0.14em] text-faint uppercase">
              Staff interface · {property.name}
            </p>
          </Reveal>
        </div>

        {/* Stat strip */}
        <Reveal delay={200} className="mt-20 sm:mt-28">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-ink/80 px-5 py-6 backdrop-blur-sm sm:px-7 sm:py-8">
                <p className="text-[clamp(1.7rem,3.4vw,2.5rem)] leading-none font-semibold tracking-[-0.03em] text-white">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-[0.78rem] leading-snug text-faint">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
