"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Progress of an element through the viewport, 0 → 1.
 *
 * 0 when the element's top hits the top of the viewport, 1 when its bottom
 * reaches the viewport bottom. Used to drive pinned sections, so it reads
 * scroll position on rAF rather than on every scroll event.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let last = -1;

    const measure = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) {
        if (last !== 0) {
          last = 0;
          setProgress(0);
        }
        return;
      }
      const next = Math.min(1, Math.max(0, -rect.top / scrollable));
      // Quantising avoids re-rendering on sub-pixel scroll noise.
      const rounded = Math.round(next * 1000) / 1000;
      if (rounded !== last) {
        last = rounded;
        setProgress(rounded);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { ref, progress };
}

/**
 * Page-level scroll progress, 0 → 1, published as a CSS custom property.
 *
 * Deliberately returns nothing. The previous version held progress in React
 * state, and because the value changes on essentially every frame of every
 * scroll, it re-rendered its consumer — the whole Header tree, logo SVG, nav
 * list, mobile sheet and CTAs — roughly sixty times a second on all 24 routes,
 * to move a one-pixel bar. Writing a custom property keeps that entirely off
 * the React render path: the compositor reads the variable, nothing reconciles.
 *
 * Read it with `transform: scaleX(var(--page-progress, 0))`.
 */
export function usePageProgressVar(varName = "--page-progress") {
  useEffect(() => {
    let frame = 0;
    let last = -1;
    const root = document.documentElement;

    const measure = () => {
      frame = 0;
      const scrollable = root.scrollHeight - window.innerHeight;
      const next =
        scrollable <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / scrollable));
      // Quantised so a sub-pixel scroll does not touch the DOM at all.
      const rounded = Math.round(next * 1000) / 1000;
      if (rounded === last) return;
      last = rounded;
      root.style.setProperty(varName, String(rounded));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.style.removeProperty(varName);
    };
  }, [varName]);
}
