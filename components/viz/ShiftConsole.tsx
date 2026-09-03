"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import staffToday from "@/assets/platform/staff-today.jpg";
import { phases, ramp } from "@/lib/viz";

function Ring({ value }: { value: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 64 64" className="size-16 -rotate-90" aria-hidden>
      <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(148,212,193,0.14)" strokeWidth="4" />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="#4ec4a1"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value)}
        style={{ transition: "stroke-dashoffset 700ms cubic-bezier(0.16,1,0.3,1)" }}
      />
    </svg>
  );
}

/**
 * The hero visual: a compact operations console rather than a floating phone.
 * A live countdown, the four phases of the running task as an ordinal ramp,
 * and the staff screen inset at the size it is actually used at.
 */
export default function ShiftConsole() {
  // Seeded mid-task: a ring at 0% reads as broken, not as live.
  const [seconds, setSeconds] = useState(7 * 60 + 12);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setSeconds((s) => (s <= 1 ? 18 * 60 : s - 1));
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const progress = 1 - seconds / (18 * 60);
  const cursor = (Math.floor(tick / 3) % 40) / 40;

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-[48px] bg-brand/16 blur-[70px] sm:-inset-12 sm:blur-[90px]"
      />

      <div className="overflow-hidden rounded-2xl border border-line bg-ink/85 shadow-[0_50px_120px_-52px_rgba(0,0,0,0.95)]">
        {/* Console bar */}
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
          <span className="flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.14em] text-faint uppercase">
            <span className="relative flex size-1.5">
              <span className="animate-pulse-ring absolute inset-0 rounded-full bg-brand-cyan" />
              <span className="relative size-1.5 rounded-full bg-brand-cyan" />
            </span>
            Morning shift · rooms division
          </span>
          <span className="font-mono text-[0.76rem] tabular-nums text-brand-cyan">
            {mm}:{ss}
          </span>
        </div>

        <div className="grid gap-0 sm:grid-cols-[1fr_auto]">
          {/* Left: the running task */}
          <div className="border-b border-line p-5 sm:border-r sm:border-b-0 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.72rem] tracking-[0.14em] text-faint uppercase">
                  Room 208 · HSK-101
                </p>
                <p className="mt-2 text-[1.05rem] leading-tight font-semibold text-white">
                  Guest-ready reset
                </p>
              </div>
              <div className="relative shrink-0">
                <Ring value={progress} />
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[0.76rem] tabular-nums text-white">
                  {Math.round(progress * 100)}%
                </span>
              </div>
            </div>

            {/* Four ordered phases — one hue, monotone steps */}
            <div className="mt-6">
              <div className="flex gap-[2px] overflow-hidden rounded-full">
                {phases.map((phase, i) => (
                  <span
                    key={phase.key}
                    className="h-2 transition-opacity duration-500"
                    style={{
                      width: `${phase.share * 100}%`,
                      background: ramp[i + 1],
                      opacity: progress * 4 > i ? 1 : 0.25,
                    }}
                  />
                ))}
              </div>
              <ul className="mt-3 flex justify-between">
                {phases.map((phase, i) => (
                  <li
                    key={phase.key}
                    className="font-mono text-[0.72rem] tracking-[0.1em] uppercase transition-colors duration-500"
                    style={{ color: progress * 4 > i ? "#a8ecd4" : "var(--color-faint)" }}
                  >
                    {phase.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Evidence gate */}
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-brand-bright/30 bg-brand/10 px-3.5 py-3">
              <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-brand-cyan" fill="none" aria-hidden>
                <rect x="1.8" y="4" width="12.4" height="9" rx="1.8" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="8" cy="8.5" r="2.4" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              <span className="text-[0.78rem] leading-snug text-paper">
                Step 4 will not close until the photo exists.
              </span>
            </div>

            {/* Signal strip */}
            <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {[
                { k: "Ready", v: "77%" },
                { k: "Service health", v: "84%" },
                { k: "Guest signal", v: "85%" },
              ].map((cell) => (
                <div key={cell.k} className="bg-ink px-3 py-2.5">
                  <p className="font-mono text-[0.72rem] tracking-[0.1em] text-faint uppercase">{cell.k}</p>
                  <p className="mt-1 font-mono text-[0.95rem] tabular-nums text-white">{cell.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: the screen at hand-held size */}
          <div className="relative flex items-center justify-center p-5 sm:w-[196px] sm:p-6">
            <div className="relative w-[150px] overflow-hidden rounded-[1.4rem] border border-white/12 bg-ink ring-1 ring-black/50 sm:w-full">
              <Image
                src={staffToday}
                alt="The Focus Realm staff interface showing the next timed task on a room attendant's phone"
                priority
                placeholder="blur"
                sizes="196px"
                className="block h-auto w-full"
                style={{ transform: "translateY(-9%)", marginBottom: "-9%" }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 h-16 bg-linear-to-b from-transparent via-brand-cyan/25 to-transparent transition-transform duration-1000 ease-linear"
                style={{ transform: `translateY(${cursor * 340}px)` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
