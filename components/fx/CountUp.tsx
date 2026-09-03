"use client";

import { useEffect, useRef, useState } from "react";

import { useInView } from "@/components/fx/useInView";

/** Counts to `value` once the number scrolls into view. */
export default function CountUp({
  value,
  /** Short enough that the number is never mid-count while being read. */
  duration = 700,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.2 });
  // Start partway up rather than from zero: the eye reads a settling number,
  // not a slot machine, and the distance left to travel is short.
  const [display, setDisplay] = useState(() => Math.round(value * 0.82));
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    // Reduced motion lands on the final value on the very first frame.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = Math.round(value * 0.82);
    const start = performance.now();
    let frame = requestAnimationFrame(step);

    function step(now: number) {
      const t = reduced ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      // Land exactly on `value` — never a rounding artefact one below it.
      setDisplay(t === 1 ? value : from + Math.round((value - from) * eased));
      if (t < 1) frame = requestAnimationFrame(step);
    }

    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
