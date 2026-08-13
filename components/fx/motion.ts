"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One rAF loop for the whole page.
 *
 * Every motion effect on the site subscribes here rather than starting its own
 * loop, so a page with a dozen parallax layers, a tilt card and a cursor light
 * still costs exactly one animation frame callback. Subscribers write CSS
 * custom properties; the compositor does the rest.
 */

type Frame = (time: number) => void;

const subscribers = new Set<Frame>();
let running = false;

function loop(time: number) {
  for (const fn of subscribers) fn(time);
  running = subscribers.size > 0;
  if (running) requestAnimationFrame(loop);
}

function subscribe(fn: Frame) {
  subscribers.add(fn);
  if (!running) {
    running = true;
    requestAnimationFrame(loop);
  }
  return () => {
    subscribers.delete(fn);
  };
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return reduced;
}

/** Pointer position, normalised to -1…1 from the viewport centre, eased. */
export function usePointer(enabled = true) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || !enabled) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    function onMove(event: PointerEvent) {
      const rect = node!.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    }
    function onLeave() {
      targetX = 0;
      targetY = 0;
    }

    const stop = subscribe(() => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      node!.style.setProperty("--px", x.toFixed(4));
      node!.style.setProperty("--py", y.toFixed(4));
    });

    window.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", onLeave);
    return () => {
      stop();
      window.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced, enabled]);

  return ref;
}

/**
 * Publishes the element's journey through the viewport as CSS variables:
 *   --enter  0 → 1 as it rises into view
 *   --thru  -1 → 1 across the whole pass
 *   --vel    scroll velocity, clamped, for skew and drag effects
 */
export function useScene<T extends HTMLElement = HTMLDivElement>(strength = 1) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduced) {
      node.style.setProperty("--enter", "1");
      node.style.setProperty("--thru", "0");
      node.style.setProperty("--vel", "0");
      return;
    }

    let lastY = window.scrollY;
    let velocity = 0;

    return subscribe(() => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;

      // Skip work entirely when the element is nowhere near the viewport.
      if (rect.bottom < -vh || rect.top > vh * 2) return;

      const centre = rect.top + rect.height / 2;
      // Clamped: short elements would otherwise report values well past 1
      // and travel further than the layout allows for.
      const raw = ((vh / 2 - centre) / (vh / 2 + rect.height / 2)) * strength;
      const thru = Math.max(-1, Math.min(1, raw));
      const enter = Math.min(1, Math.max(0, 1 - rect.top / vh));

      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      velocity += (Math.max(-60, Math.min(60, dy)) - velocity) * 0.15;

      node.style.setProperty("--thru", thru.toFixed(4));
      node.style.setProperty("--enter", enter.toFixed(4));
      node.style.setProperty("--vel", (velocity / 60).toFixed(4));
    });
  }, [strength, reduced]);

  return ref;
}
