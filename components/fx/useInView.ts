"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Fraction of the element that must be visible. */
  threshold?: number;
  /** Shrinks the viewport so reveals fire slightly before the edge. */
  rootMargin?: string;
  /** Reveal once and stop observing — the default for scroll reveals. */
  once?: boolean;
};

/**
 * One observer per element. Cheap enough at this page count, and it keeps
 * every reveal self-contained instead of routed through a provider.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  // Fire as soon as any sliver of the element is near the viewport. Waiting
  // for 15% of a tall block meant headlines sat mid-reveal at rest.
  threshold = 0,
  rootMargin = "120px 0px 120px 0px",
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // IntersectionObserver delivers an initial observation on observe(), so
    // anything already on screen at mount reveals on the next frame.

    // No observer support: show the content rather than leave it hidden.
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setInView(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
