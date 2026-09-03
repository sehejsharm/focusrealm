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

/**
 * Subscribers split their work into two phases. Every `read` in the frame runs
 * before any `write`, because interleaving them is what makes a page like this
 * crawl: a getBoundingClientRect after a style change forces the browser to
 * flush layout synchronously, so N animated elements cost N layouts per frame
 * instead of one.
 */
type Phase = { read: () => void; write: () => void };

const subscribers = new Set<Phase>();
let running = false;

function loop() {
  for (const s of subscribers) s.read();
  for (const s of subscribers) s.write();
  running = subscribers.size > 0;
  if (running) requestAnimationFrame(loop);
}

function subscribe(phase: Phase) {
  subscribers.add(phase);
  if (!running) {
    running = true;
    requestAnimationFrame(loop);
  }
  return () => {
    subscribers.delete(phase);
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

    const stop = subscribe({
      read: () => {
        x += (targetX - x) * 0.08;
        y += (targetY - y) * 0.08;
      },
      write: () => {
        node!.style.setProperty("--px", x.toFixed(4));
        node!.style.setProperty("--py", y.toFixed(4));
      },
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
    let thru = 0;

    /**
     * `enter` latches: it only ever increases. Content that has been revealed
     * stays revealed.
     *
     * Reveal used to be a pure function of scroll position, which meant any
     * element whose rect did not move the way the maths assumed — anything in
     * a sticky or pinned container, anything re-measured mid-transition — could
     * sit at a fraction of its reveal indefinitely, showing text dimmed and
     * clipped in half by the overflow-hidden mask. Latching removes that whole
     * class of failure: the worst case is now that something reveals early,
     * never that it stays invisible.
     */
    let enter = 0;

    // Bound to a const so the null-check above narrows inside the closure.
    const el = node;

    function measure() {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const target = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.42)));
      enter = Math.max(enter, target);
      return rect;
    }

    // Seed synchronously so anything already on screen at load is correct on
    // the first paint, and anything below it starts hidden rather than
    // flashing in and then popping out when the loop catches up.
    measure();
    node.style.setProperty("--enter", enter.toFixed(4));
    node.style.setProperty("--thru", "0");
    node.style.setProperty("--vel", "0");

    const phase: Phase = {
      read: () => {
        const rect = measure();
        const vh = window.innerHeight;

        const centre = rect.top + rect.height / 2;
        // Clamped: short elements would otherwise report values well past 1
        // and travel further than the layout allows for.
        const raw = ((vh / 2 - centre) / (vh / 2 + rect.height / 2)) * strength;
        thru = Math.max(-1, Math.min(1, raw));

        const dy = window.scrollY - lastY;
        lastY = window.scrollY;
        velocity += (Math.max(-60, Math.min(60, dy)) - velocity) * 0.15;
      },
      write: () => {
        el.style.setProperty("--thru", thru.toFixed(4));
        el.style.setProperty("--enter", enter.toFixed(4));
        el.style.setProperty("--vel", (velocity / 60).toFixed(4));
      },
    };

    /**
     * Only elements near the viewport are subscribed.
     *
     * Measuring every scene on the page each frame meant a long page paid for
     * one getBoundingClientRect per element per frame — around a second of
     * style-and-layout on a mid-range phone, most of it for content nobody
     * could see. The observer keeps the frame proportional to what is actually
     * on screen instead of to the length of the document.
     */
    let stop: (() => void) | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !stop) {
          stop = subscribe(phase);
        } else if (!entry.isIntersecting && stop) {
          stop();
          stop = undefined;
          // Park it at its latched value so it keeps whatever it revealed to.
          el.style.setProperty("--vel", "0");
          el.style.setProperty("--enter", enter.toFixed(4));
        }
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      stop?.();
    };
  }, [strength, reduced]);

  return ref;
}
