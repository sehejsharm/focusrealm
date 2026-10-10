"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/components/fx/motion";

/**
 * Presents the hero console: it starts tipped back in perspective and rises
 * flat as the visitor scrolls, with a light beam tracing its edge and live
 * notifications surfacing from both products. Decorative wrapper.
 */
const toasts = [
  { side: "left", product: "Mise", title: "Room 214 verified", meta: "Photo · 6:42 · on time" },
  { side: "right", product: "Education", title: "3 students need support", meta: "AI insight · Physics 10-B" },
  { side: "left", product: "Education", title: "Attendance synced", meta: "32 of 34 · Grade 10" },
  { side: "right", product: "Mise", title: "Breakfast reset signed off", meta: "Supervisor · F&B" },
] as const;

export default function ConsoleStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [progress, setP] = useState(0);
  const [toast, setToast] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the stage top is at the bottom of the viewport, 1 when it reaches 25% from the top.
      const next = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.75)));
      setP(Math.round(next * 200) / 200);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setToast((t) => t + 1), 3200);
    return () => window.clearInterval(id);
  }, [reduced]);

  const p = reduced ? 1 : progress;
  const eased = 1 - Math.pow(1 - p, 3);
  const current = toasts[toast % toasts.length];

  return (
    <div ref={ref} className="relative [perspective:1800px]">
      {/* Glow under the console */}
      <div
        aria-hidden
        className="absolute inset-x-[10%] -bottom-10 h-40 rounded-full bg-[#2a5bd7]/40 blur-[90px]"
        style={{ opacity: 0.4 + eased * 0.6 }}
      />
      <div
        className="relative origin-top transition-transform duration-75 will-change-transform"
        style={{
          transform: `rotateX(${(1 - eased) * 24}deg) scale(${0.92 + eased * 0.08}) translateY(${(1 - eased) * 30}px)`,
        }}
      >
        {/* Beam tracing the edge */}
        <div aria-hidden className="beam-border pointer-events-none absolute -inset-px rounded-xl" />
        {children}
      </div>

      {/* Live notification */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <div
          key={toast}
          className={`toast-in absolute top-[38%] w-64 rounded-xl border border-white/12 bg-[#101b3d]/95 p-3.5 text-white shadow-2xl backdrop-blur ${
            current.side === "left" ? "-left-14" : "-right-14"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-md bg-[#2a5bd7] text-[11px]">✓</span>
            <span className="text-[10.5px] font-semibold text-[#a9c1ff]">{current.product}</span>
            <span className="ml-auto text-[10px] text-white/60">now</span>
          </div>
          <p className="mt-2 text-[13px] font-semibold">{current.title}</p>
          <p className="mt-0.5 text-[11px] text-white/70">{current.meta}</p>
        </div>
      </div>
    </div>
  );
}
