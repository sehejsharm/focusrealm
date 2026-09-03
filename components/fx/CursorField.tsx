"use client";

import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/components/fx/motion";

/**
 * A soft light that trails the cursor across the whole page, plus a faint
 * grid that brightens under it. Desktop pointers only — it is the first thing
 * that tells a visitor the page is alive, and it costs one composited layer.
 */
export default function CursorField() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let x = targetX;
    let y = targetY;
    let frame = 0;
    let idle = true;

    function onMove(event: PointerEvent) {
      targetX = event.clientX;
      targetY = event.clientY;
      if (idle) {
        idle = false;
        node!.style.opacity = "1";
        frame = requestAnimationFrame(tick);
      }
    }

    function tick() {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      node!.style.setProperty("--cx", `${x.toFixed(1)}px`);
      node!.style.setProperty("--cy", `${y.toFixed(1)}px`);
      if (Math.abs(targetX - x) < 0.3 && Math.abs(targetY - y) < 0.3) {
        idle = true;
        return;
      }
      frame = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-700 max-md:hidden"
      style={{
        background:
          "radial-gradient(520px circle at var(--cx, 50%) var(--cy, 30%), color-mix(in oklab, #33927b 13%, transparent), transparent 70%)",
      }}
    />
  );
}
