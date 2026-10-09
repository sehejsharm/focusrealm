"use client";

import { useEffect, useState } from "react";

import { useReducedMotion } from "@/components/fx/motion";
import { LogoMark } from "@/components/site/Logo";

/**
 * Hero visual: an organisation-level console across both product lines —
 * KPIs, a trend chart that draws in, and an activity log that streams.
 * Illustrative interface with sample data. Decorative.
 */
const events = [
  { t: "09:41", product: "Mise", text: "Room 214 turndown verified", meta: "Photo · supervisor" },
  { t: "09:40", product: "Education", text: "Class 10-B attendance synced", meta: "32 of 34 present" },
  { t: "09:38", product: "Mise", text: "Breakfast reset signed off", meta: "On time · F&B" },
  { t: "09:36", product: "Education", text: "3 students flagged for support", meta: "AI insight · Physics" },
  { t: "09:33", product: "Mise", text: "Lobby opening check complete", meta: "Front office" },
  { t: "09:31", product: "Education", text: "Assignment graded and returned", meta: "Grade 9 · English" },
];

const nav = ["Overview", "Education", "Mise", "Analytics", "Audit log", "Access"];

const kpis = [
  { label: "Attendance today", value: "93.8%", delta: "+1.2" },
  { label: "Tasks on time", value: "96.4%", delta: "+0.8" },
  { label: "Open alerts", value: "3", delta: "−2" },
  { label: "Audit coverage", value: "100%", delta: "0.0" },
];

export default function PlatformConsole() {
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setOffset((o) => o + 1), 2600);
    return () => window.clearInterval(id);
  }, [reduced]);

  const rows = Array.from({ length: 4 }, (_, i) => events[(offset + i) % events.length]);

  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0c1530] text-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] select-none"
    >
      {/* Window bar */}
      <div className="flex items-center gap-3 border-b border-white/8 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <span className="mx-auto rounded-md bg-white/6 px-3 py-0.5 font-mono text-[10.5px] text-white/65">
          Focus Realm · Console
        </span>
      </div>

      <div className="grid grid-cols-[150px_1fr] max-sm:grid-cols-1">
        {/* Sidebar */}
        <div className="border-r border-white/8 p-3 max-sm:hidden">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <LogoMark className="size-6" decorative />
            <span className="text-[11.5px] font-semibold">Focus Realm</span>
          </div>
          <ul className="mt-3 space-y-0.5">
            {nav.map((item, i) => (
              <li
                key={item}
                className={`rounded-md px-2.5 py-1.5 text-[11.5px] ${i === 0 ? "bg-white/10 font-semibold text-white" : "text-white/65"}`}
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-lg border border-white/8 p-2.5">
            <p className="text-[10px] text-white/65">Environment</p>
            <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium">
              <span className="size-1.5 rounded-full bg-[#3ddc97]" /> Production
            </p>
          </div>
        </div>

        {/* Main */}
        <div className="p-4 sm:p-5">
          <div className="flex items-baseline justify-between">
            <p className="text-[13px] font-semibold">Organisation overview</p>
            <p className="font-mono text-[10.5px] text-white/65">Last 30 days</p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2.5">
                <p className="text-[10px] text-white/65">{k.label}</p>
                <p className="mt-1 text-[16px] font-semibold tabular-nums">{k.value}</p>
                <p className="font-mono text-[9.5px] text-[#7fa6ff]">{k.delta}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="mt-3 rounded-lg border border-white/8 bg-white/[0.02] p-3">
            <div className="flex gap-4 text-[10px] text-white/65">
              <span className="flex items-center gap-1.5">
                <span className="h-0.5 w-3 bg-[#5b8cff]" /> Education engagement
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-0.5 w-3 bg-[#9ec5ff]" /> Mise on-time rate
              </span>
            </div>
            <svg viewBox="0 0 400 110" className="mt-2 h-24 w-full sm:h-28" preserveAspectRatio="none">
              {[22, 50, 78].map((y) => (
                <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" />
              ))}
              <defs>
                <linearGradient id="pc-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#5b8cff" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#5b8cff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 84 C40 80 60 70 100 66 S170 58 200 50 S270 46 300 36 S370 26 400 20 L400 110 L0 110 Z"
                fill="url(#pc-fill)"
              />
              <path
                d="M0 84 C40 80 60 70 100 66 S170 58 200 50 S270 46 300 36 S370 26 400 20"
                fill="none"
                stroke="#5b8cff"
                strokeWidth="2"
                pathLength="1"
                className="anim-draw"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M0 60 C40 58 70 62 100 54 S170 50 200 44 S270 42 300 38 S370 34 400 30"
                fill="none"
                stroke="#9ec5ff"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* Activity */}
          <div className="mt-3 rounded-lg border border-white/8">
            <div className="flex items-center justify-between border-b border-white/8 px-3 py-2">
              <p className="text-[11px] font-semibold">Activity</p>
              <p className="flex items-center gap-1.5 text-[10px] text-white/65">
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 rounded-full bg-[#3ddc97] anim-ping" />
                  <span className="relative size-1.5 rounded-full bg-[#3ddc97]" />
                </span>
                Live
              </p>
            </div>
            <ul>
              {rows.map((e, i) => (
                <li
                  key={`${offset}-${i}`}
                  className={`flex items-center gap-3 border-b border-white/6 px-3 py-2 last:border-0 ${i === 0 && !reduced ? "anim-row" : ""}`}
                >
                  <span className="font-mono text-[10px] text-white/65 tabular-nums">{e.t}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9.5px] font-semibold ${
                      e.product === "Mise" ? "bg-[#9ec5ff]/15 text-[#bcd6ff]" : "bg-[#5b8cff]/20 text-[#a9c1ff]"
                    }`}
                  >
                    {e.product}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[11.5px]">{e.text}</span>
                  <span className="hidden text-[10px] text-white/65 sm:inline">{e.meta}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
