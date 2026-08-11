"use client";

import Aurora from "@/components/fx/Aurora";
import Reveal from "@/components/fx/Reveal";
import { useScrollProgress } from "@/components/fx/useScrollProgress";
import { Container, Eyebrow } from "@/components/ui/Section";
import { mechanism } from "@/lib/content";

/* ---------------------------------------------------------------- *
 * Three stage visuals, built in markup rather than screenshotted so
 * they can animate against scroll.
 * ---------------------------------------------------------------- */

function StandardCard() {
  return (
    <div className="panel w-full max-w-[440px] p-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.6rem] tracking-[0.16em] text-brand-ice uppercase">
          HSK-101 · v6
        </span>
        <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.1em] text-faint">
          TARGET 26:00
        </span>
      </div>
      <h3 className="mt-4 text-[1.35rem] leading-tight font-semibold text-white">
        Guest room reset &amp; release
      </h3>
      <div className="mt-5 space-y-2.5">
        {[92, 78, 86, 64].map((w, i) => (
          <div key={i} className="h-2 rounded-full bg-white/8" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {["Prepare", "Perform", "Verify", "Release"].map((phase) => (
          <span
            key={phase}
            className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-[0.7rem] text-muted"
          >
            {phase}
          </span>
        ))}
      </div>
      <p className="mt-6 border-t border-line pt-4 text-[0.78rem] text-faint">
        Written once in the Author workspace. Published straight into tonight&rsquo;s shift.
      </p>
    </div>
  );
}

function TaskCard({ progress }: { progress: number }) {
  const steps = [
    { label: "Strip linen, check for damage", done: true, photo: false },
    { label: "Bathroom reset to spec", done: true, photo: false },
    { label: "Bed dressed · hospital corners", done: progress > 0.35, photo: false },
    { label: "Final finish — photo required", done: false, photo: true },
  ];
  const ring = 0.28 + progress * 0.52;
  const circumference = 2 * Math.PI * 26;

  return (
    <div className="panel w-full max-w-[440px] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-[0.6rem] tracking-[0.16em] text-brand-cyan uppercase">
            Live timed task
          </span>
          <h3 className="mt-2 text-[1.25rem] leading-tight font-semibold text-white">
            Room 208 · guest-ready reset
          </h3>
        </div>
        <div className="relative shrink-0">
          <svg viewBox="0 0 60 60" className="size-14 -rotate-90">
            <circle cx="30" cy="30" r="26" stroke="rgba(255,255,255,0.09)" strokeWidth="4" fill="none" />
            <circle
              cx="30"
              cy="30"
              r="26"
              stroke="url(#ring-grad)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - ring)}
              style={{ transition: "stroke-dashoffset 0.5s linear" }}
            />
            <defs>
              <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#56e0ff" />
                <stop offset="100%" stopColor="#1d7bff" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[0.6rem] tabular-nums text-white">
            {Math.round(ring * 100)}%
          </span>
        </div>
      </div>

      <ul className="mt-5 space-y-2">
        {steps.map((step) => (
          <li
            key={step.label}
            className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-all duration-500 ${
              step.photo
                ? "border-brand-bright/45 bg-brand/12"
                : step.done
                  ? "border-line bg-white/[0.04]"
                  : "border-line/60 bg-transparent"
            }`}
          >
            <span
              className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                step.done ? "border-brand-cyan bg-brand-cyan/20 text-brand-cyan" : "border-white/20 text-transparent"
              }`}
            >
              <svg viewBox="0 0 14 14" className="size-2.5" fill="none" aria-hidden>
                <path d="M2 7.4 5.4 11 12 3.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <span className={`text-[0.82rem] ${step.done ? "text-paper" : "text-muted"}`}>{step.label}</span>
            {step.photo ? (
              <span className="ml-auto flex items-center gap-1.5 rounded-full bg-brand/25 px-2 py-1 font-mono text-[0.55rem] tracking-[0.1em] text-white uppercase">
                <svg viewBox="0 0 14 14" className="size-2.5" fill="none" aria-hidden>
                  <rect x="1.5" y="3.5" width="11" height="8" rx="1.6" stroke="currentColor" strokeWidth="1.3" />
                  <circle cx="7" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.3" />
                </svg>
                Gate
              </span>
            ) : null}
          </li>
        ))}
      </ul>

      <p className="mt-5 border-t border-line pt-4 text-[0.78rem] text-faint">
        The photo is not paperwork. It is the only way the step closes.
      </p>
    </div>
  );
}

function RecordCard({ progress }: { progress: number }) {
  const rows = [
    { room: "204", time: "07:41", ready: true },
    { room: "206", time: "08:09", ready: true },
    { room: "208", time: "08:36", ready: true },
    { room: "210", time: "09:02", ready: progress > 0.55 },
  ];

  return (
    <div className="panel w-full max-w-[440px] p-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[0.6rem] tracking-[0.16em] text-brand-ice uppercase">
          Service record · Maya Fernando
        </span>
        <span className="rounded-full border border-brand-bright/40 bg-brand/15 px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.1em] text-white">
          READY 92%
        </span>
      </div>

      <div className="mt-5 space-y-2">
        {rows.map((row, index) => (
          <div
            key={row.room}
            className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.03] px-3.5 py-3 transition-all duration-700"
            style={{
              opacity: row.ready ? 1 : 0.32,
              transform: row.ready ? "none" : "translateY(6px)",
              transitionDelay: `${index * 60}ms`,
            }}
          >
            <span className="font-mono text-[0.72rem] tabular-nums text-white">{row.room}</span>
            <span className="font-mono text-[0.66rem] text-faint">{row.time}</span>
            <span className="ml-auto flex items-center gap-1.5">
              {[0, 1].map((n) => (
                <span
                  key={n}
                  className="size-5 rounded-[5px] border border-brand-bright/30 bg-linear-to-br from-brand/45 to-brand-deep/45"
                />
              ))}
              <span className="ml-1 flex size-5 items-center justify-center rounded-full bg-white/10 font-mono text-[0.52rem] text-brand-ice">
                ER
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
        {[
          { k: "Steps", v: "1,284" },
          { k: "Photos", v: "612" },
          { k: "Sign-offs", v: "318" },
        ].map((cell) => (
          <div key={cell.k} className="bg-ink/70 px-3 py-3">
            <p className="font-mono text-[0.55rem] tracking-[0.12em] text-faint uppercase">{cell.k}</p>
            <p className="mt-1 text-[0.95rem] font-semibold text-white">{cell.v}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 border-t border-line pt-4 text-[0.78rem] text-faint">
        The audit is a filter on data you already hold.
      </p>
    </div>
  );
}

export default function Mechanism() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  // Three equal stages across the pinned scroll distance.
  const raw = progress * mechanism.length;
  const active = Math.min(mechanism.length - 1, Math.max(0, Math.floor(raw)));
  const stageProgress = Math.min(1, Math.max(0, raw - active));

  const visuals = [
    <StandardCard key="standard" />,
    <TaskCard key="task" progress={stageProgress} />,
    <RecordCard key="record" progress={stageProgress} />,
  ];

  return (
    <section id="mechanism" className="relative">
      <Aurora variant="section" />

      <Container className="pt-24 sm:pt-32">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>The mechanism</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.02] font-semibold text-white">
              One sentence holds the whole product
              <span className="text-gradient"> together.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-muted sm:text-[1.08rem]">
              The standard lives inside the timed task. Completing the task generates photo and supervisor
              evidence. That evidence compounds into an audit-ready service record. Everything else on this
              site is a consequence of those three lines.
            </p>
          </Reveal>
        </div>
      </Container>

      {/* Pinned three-stage sequence */}
      <div ref={ref} className="relative mt-16 h-[280vh] lg:h-[300vh]">
        <div className="sticky top-0 flex h-dvh items-center overflow-hidden">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
              {/* Stage copy */}
              <div className="order-2 lg:order-1">
                <ol className="space-y-1">
                  {mechanism.map((stage, index) => {
                    const isActive = index === active;
                    return (
                      <li
                        key={stage.key}
                        className="relative border-l-2 py-5 pl-6 transition-all duration-700 ease-out-expo sm:pl-8"
                        style={{
                          borderColor: isActive
                            ? "var(--color-brand-bright)"
                            : "color-mix(in oklab, #8fd3ff 12%, transparent)",
                          opacity: isActive ? 1 : 0.34,
                          filter: isActive ? "none" : "blur(0.6px)",
                        }}
                      >
                        {isActive ? (
                          <span
                            aria-hidden
                            className="absolute top-0 -left-[5px] h-full w-2 rounded-full bg-brand-bright/40 blur-[6px]"
                          />
                        ) : null}
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[0.62rem] tracking-[0.18em] text-brand-ice">
                            {stage.step}
                          </span>
                          <span className="hairline hidden w-12 sm:block" />
                        </div>
                        <h3 className="mt-3 text-[clamp(1.25rem,2.4vw,1.9rem)] leading-tight font-semibold text-white">
                          {stage.label}
                        </h3>
                        <p
                          className="grid overflow-hidden text-[0.95rem] leading-relaxed text-muted transition-all duration-700 ease-out-expo"
                          style={{
                            gridTemplateRows: isActive ? "1fr" : "0fr",
                            marginTop: isActive ? "0.75rem" : 0,
                          }}
                        >
                          <span className="min-h-0">{stage.body}</span>
                        </p>
                        <p className="mt-3 font-mono text-[0.6rem] tracking-[0.12em] text-faint uppercase">
                          {stage.detail}
                        </p>
                      </li>
                    );
                  })}
                </ol>

                {/* Stage rail */}
                <div className="mt-8 flex items-center gap-2">
                  {mechanism.map((stage, index) => (
                    <span
                      key={stage.key}
                      className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/10"
                      aria-hidden
                    >
                      <span
                        className="block h-full rounded-full bg-linear-to-r from-brand to-brand-cyan transition-transform duration-300 ease-linear"
                        style={{
                          transform: `scaleX(${index < active ? 1 : index === active ? stageProgress : 0})`,
                          transformOrigin: "left",
                        }}
                      />
                    </span>
                  ))}
                </div>
              </div>

              {/* Stage visual */}
              <div className="relative order-1 flex min-h-[420px] items-center justify-center lg:order-2 lg:min-h-[540px]">
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-[40px] bg-brand/10 blur-[70px] transition-opacity duration-700"
                />
                {visuals.map((visual, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out-expo"
                    style={{
                      opacity: index === active ? 1 : 0,
                      transform:
                        index === active
                          ? "scale(1) translateY(0)"
                          : index < active
                            ? "scale(0.93) translateY(-22px)"
                            : "scale(0.93) translateY(22px)",
                      pointerEvents: index === active ? "auto" : "none",
                      filter: index === active ? "none" : "blur(8px)",
                    }}
                    aria-hidden={index !== active}
                  >
                    {visual}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
