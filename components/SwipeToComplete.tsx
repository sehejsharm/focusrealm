"use client";

import { useRef, useState } from "react";
import { Check, ChevronsRight } from "lucide-react";

const THUMB = 60;

/** Phone-call-style swipe slider — the only way to finish a task. */
export default function SwipeToComplete({
  label = "Swipe right to complete",
  onComplete,
}: {
  label?: string;
  onComplete: () => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [maxX, setMaxX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [done, setDone] = useState(false);

  const clamp = (value: number, max: number) => Math.min(Math.max(value, 0), max);

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (done) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setMaxX((trackRef.current?.clientWidth ?? 0) - THUMB - 8);
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging || done) return;
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    setX(clamp(e.clientX - rect.left - THUMB / 2 - 4, maxX));
  };

  const finish = () => {
    setDragging(false);
    if (maxX > 0 && x / maxX > 0.7) {
      setX(maxX);
      setDone(true);
      window.setTimeout(onComplete, 300);
    } else {
      setX(0);
    }
  };

  const progress = maxX > 0 ? x / maxX : 0;

  return (
    <div
      ref={trackRef}
      className="relative h-16 w-full touch-none overflow-hidden rounded-full bg-stone-900 select-none"
    >
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-emerald-500"
        style={{
          width: `${x + THUMB + 8}px`,
          transitionProperty: dragging ? "none" : "width",
          transitionDuration: "200ms",
        }}
        aria-hidden
      />
      <p
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-bold tracking-wide text-white/70"
        style={{ opacity: Math.max(0, 1 - progress * 1.6) }}
      >
        {label}
      </p>
      <button
        type="button"
        aria-label={label}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finish}
        onPointerCancel={finish}
        className="absolute top-1 left-1 flex size-14 items-center justify-center rounded-full bg-white text-stone-900 shadow-lg"
        style={{
          transform: `translateX(${x}px)`,
          transitionProperty: dragging ? "none" : "transform",
          transitionDuration: "200ms",
        }}
      >
        {done ? (
          <Check className="size-7 text-emerald-600" aria-hidden />
        ) : (
          <ChevronsRight className="size-7" aria-hidden />
        )}
      </button>
    </div>
  );
}
