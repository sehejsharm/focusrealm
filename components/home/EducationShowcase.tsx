"use client";

import { useEffect, useState } from "react";

import { useInView } from "@/components/fx/useInView";
import { useReducedMotion } from "@/components/fx/motion";

/**
 * A live lesson on an interactive classroom board: a poll filling in, a
 * leaderboard ticking up and an AI insight arriving. Illustrative UI, built
 * in code so it stays sharp and on-brand. Decorative.
 */
const options = [
  { key: "A", label: "Magnetism", result: 9 },
  { key: "B", label: "Gravity", result: 74 },
  { key: "C", label: "Friction", result: 6 },
  { key: "D", label: "Air pressure", result: 11 },
];

const students = [
  { name: "Aarav", initials: "AK", base: 1240, tone: "#2a5bd7" },
  { name: "Meera", initials: "MS", base: 1185, tone: "#4d97d1" },
  { name: "Kabir", initials: "KR", base: 1120, tone: "#0b3a91" },
  { name: "Ananya", initials: "AJ", base: 1064, tone: "#8fb0ff" },
];

export default function EducationShowcase() {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false });
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 1400);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  // One loop is 6 ticks: poll fills (0-2), answer revealed (3-5), insight from 4.
  const phase = reduced ? 5 : tick % 6;
  const filled = phase >= 1;
  const revealed = phase >= 3;
  const insight = phase >= 4;
  const elapsed = 754 + (reduced ? 0 : tick);

  return (
    <div ref={ref} aria-hidden className="relative select-none">
      {/* Board */}
      <div className="rounded-[1.4rem] bg-[#0d1530] p-2.5 shadow-[0_50px_100px_-40px_rgba(11,27,63,0.65)] sm:p-3">
        <div className="relative overflow-hidden rounded-[0.9rem] bg-[#f7f8fc]">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-[#e6e9f3] bg-white px-4 py-2.5 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-[#e5484d] anim-ping" />
                <span className="relative size-2 rounded-full bg-[#e5484d]" />
              </span>
              <span className="text-[11px] font-semibold text-paper">Live lesson</span>
              <span className="hidden text-[11px] text-faint sm:inline">· Physics · Class 10-B</span>
            </div>
            <span className="font-mono text-[11px] text-faint tabular-nums">
              {String(Math.floor(elapsed / 60)).padStart(2, "0")}:{String(elapsed % 60).padStart(2, "0")}
            </span>
          </div>

          <div className="grid gap-3 p-3.5 sm:grid-cols-[1.45fr_1fr] sm:gap-4 sm:p-5">
            {/* Poll */}
            <div className="rounded-xl bg-white p-3.5 shadow-[0_1px_2px_rgba(15,18,34,0.06)] sm:p-4">
              <p className="text-[10px] font-semibold tracking-[0.08em] text-brand uppercase">Quick check · 32 answering</p>
              <p className="mt-1.5 text-[13px] leading-snug font-bold text-paper sm:text-[15px]">
                What keeps the Moon in orbit around the Earth?
              </p>
              <ul className="mt-3 space-y-1.5">
                {options.map((o) => {
                  const correct = o.key === "B";
                  const width = filled ? o.result : 0;
                  return (
                    <li key={o.key} className="relative overflow-hidden rounded-lg border border-[#e6e9f3]">
                      <span
                        className="absolute inset-y-0 left-0 transition-[width,background-color] duration-[1200ms] ease-out-expo"
                        style={{
                          width: `${width}%`,
                          backgroundColor: revealed && correct ? "#2a5bd7" : "#e3e9fb",
                        }}
                      />
                      <span className="relative flex items-center justify-between px-2.5 py-1.5 text-[11px] sm:text-[12px]">
                        <span className={`font-medium ${revealed && correct ? "text-white" : "text-paper"}`}>
                          {o.key}. {o.label}
                        </span>
                        <span className={`tabular-nums ${revealed && correct ? "text-white" : "text-faint"}`}>
                          {filled ? `${o.result}%` : ""}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Leaderboard */}
            <div className="hidden rounded-xl bg-white p-4 shadow-[0_1px_2px_rgba(15,18,34,0.06)] sm:block">
              <p className="text-[10px] font-semibold tracking-[0.08em] text-brand uppercase">House points</p>
              <ul className="mt-3 space-y-2.5">
                {students.map((s, i) => (
                  <li key={s.name} className="flex items-center gap-2.5">
                    <span className="w-3 text-[11px] font-semibold text-faint">{i + 1}</span>
                    <span
                      className="flex size-6 items-center justify-center rounded-full text-[9px] font-semibold text-white"
                      style={{ backgroundColor: s.tone }}
                    >
                      {s.initials}
                    </span>
                    <span className="text-[12px] font-medium text-paper">{s.name}</span>
                    <span className="ml-auto text-[11px] font-semibold text-paper tabular-nums">
                      {s.base + (reduced ? 0 : (tick * (4 - i) * 5) % 400)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-3.5 flex items-center gap-1.5 rounded-lg bg-[#fff6dc] px-2.5 py-1.5 text-[10.5px] font-medium text-[#7a5a00]">
                ★ Meera: 9-day streak
              </div>
            </div>
          </div>

          {/* AI insight */}
          <div
            className={`absolute right-3 bottom-3 left-3 flex items-center gap-2.5 rounded-xl bg-paper px-3.5 py-2.5 text-white shadow-xl transition-all duration-700 ease-out-expo sm:right-5 sm:bottom-5 sm:left-auto sm:max-w-[290px] ${
              insight ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-brand text-[11px]">✦</span>
            <span className="text-[11px] leading-snug">
              <b className="font-semibold">AI insight.</b> 3 students are stuck on orbital motion. Suggested: a 5-minute recap.
            </span>
          </div>
        </div>
      </div>
      {/* Stand */}
      <div className="mx-auto h-5 w-[22%] rounded-b-xl bg-linear-to-b from-[#1a2448] to-[#0d1530]" />
    </div>
  );
}
