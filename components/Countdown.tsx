"use client";

import { useEffect, useState } from "react";

function format(totalSeconds: number) {
  const safe = Math.max(0, totalSeconds);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

/**
 * Ticks down from a fixed starting value. The first render is deterministic so
 * server and client agree; the clock only starts once mounted.
 */
export default function Countdown({
  seconds,
  className = "",
}: {
  seconds: number;
  className?: string;
}) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const over = remaining <= 0;

  return (
    <span
      className={`font-mono tabular-nums ${over ? "text-rose-600" : ""} ${className}`}
      aria-live="off"
    >
      {over ? "0:00" : format(remaining)}
    </span>
  );
}
