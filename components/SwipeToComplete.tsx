"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ChevronsRight } from "lucide-react";

const KNOB = 56;
const PAD = 4;
/** Fraction of the track the knob must cross for the swipe to count. */
const THRESHOLD = 0.85;

interface Props {
  label: string;
  /** Secondary label for staff with minimal English literacy. */
  hindi?: string;
  disabled?: boolean;
  disabledLabel?: string;
  onComplete: () => void;
}

/**
 * Drag-to-confirm slider. Deliberate enough that a Read Receipt is never
 * written by an accidental tap, but needs no reading to understand.
 */
export default function SwipeToComplete({
  label,
  hindi,
  disabled = false,
  disabledLabel,
  onComplete,
}: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [max, setMax] = useState(0);
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () =>
      setMax(Math.max(0, el.clientWidth - KNOB - PAD * 2));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const finish = useCallback(() => {
    if (done || disabled) return;
    setDone(true);
    setX(max);
    onComplete();
  }, [done, disabled, max, onComplete]);

  const moveTo = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const next = clientX - rect.left - PAD - KNOB / 2;
      setX(Math.min(max, Math.max(0, next)));
    },
    [max],
  );

  const handleDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled || done) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    moveTo(event.clientX);
  };

  const handleMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging || disabled || done) return;
    moveTo(event.clientX);
  };

  const handleUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging) return;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (max > 0 && x >= max * THRESHOLD) finish();
    else setX(0);
  };

  const handleKey = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled || done) return;
    if (["ArrowRight", "End", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      finish();
    }
  };

  const progress = max > 0 ? x / max : 0;

  return (
    <div
      ref={trackRef}
      className={`relative h-16 w-full touch-none overflow-hidden rounded-2xl border-2 select-none ${
        disabled
          ? "border-slate-200 bg-slate-100"
          : "border-emerald-200 bg-emerald-50"
      }`}
    >
      {!disabled && (
        <div
          className="absolute inset-y-0 left-0 bg-emerald-500"
          style={{
            width: x + KNOB + PAD * 2,
            transition: dragging ? "none" : "width 250ms ease-out",
          }}
          aria-hidden
        />
      )}

      <span
        className={`pointer-events-none absolute inset-0 flex items-center justify-center gap-2 pl-14 text-center text-base font-bold ${
          disabled ? "text-slate-400" : "text-emerald-900"
        }`}
        style={{ opacity: done ? 0 : 1 - progress * 1.4 }}
      >
        <span>
          {disabled ? (disabledLabel ?? label) : label}
          {hindi && !disabled ? (
            <span className="block text-xs font-medium opacity-70">
              {hindi}
            </span>
          ) : null}
        </span>
        {!disabled && <ChevronsRight className="size-5 shrink-0" aria-hidden />}
      </span>

      {done && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-base font-bold text-white">
          {label}
        </span>
      )}

      <button
        type="button"
        role="slider"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-disabled={disabled}
        disabled={disabled}
        onPointerDown={handleDown}
        onPointerMove={handleMove}
        onPointerUp={handleUp}
        onPointerCancel={handleUp}
        onKeyDown={handleKey}
        style={{
          transform: `translateX(${x}px)`,
          transition: dragging ? "none" : "transform 250ms ease-out",
        }}
        className={`absolute top-1 left-1 flex size-14 items-center justify-center rounded-xl shadow-md ${
          disabled
            ? "cursor-not-allowed bg-slate-200 text-slate-400"
            : "cursor-grab bg-white text-emerald-600 active:cursor-grabbing"
        }`}
      >
        {done ? (
          <Check className="size-7" strokeWidth={3} aria-hidden />
        ) : (
          <ChevronsRight className="size-7" strokeWidth={2.5} aria-hidden />
        )}
      </button>
    </div>
  );
}
