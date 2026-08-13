"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

import { useReducedMotion, useScene, usePointer } from "@/components/fx/motion";

/* ------------------------------------------------------------------ *
 * Parallax — depth as you scroll.
 * ------------------------------------------------------------------ */

export function Parallax({
  children,
  /** Pixels of travel across a full pass. Negative moves against the scroll. */
  distance = 60,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useScene<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={className}
      style={
        {
          transform: `translate3d(0, calc(var(--thru, 0) * ${distance}px), 0)`,
          willChange: "transform",
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ *
 * Tilt — the surface leans toward the cursor.
 * ------------------------------------------------------------------ */

export function Tilt({
  children,
  className = "",
  max = 6,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = usePointer();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative [perspective:1400px] ${className}`}
      style={{ "--px": 0, "--py": 0 } as CSSProperties}
    >
      <div
        className="relative transition-transform duration-100 ease-linear [transform-style:preserve-3d]"
        style={{
          transform: `rotateY(calc(var(--px, 0) * ${max}deg)) rotateX(calc(var(--py, 0) * ${-max}deg))`,
        }}
      >
        {children}
        {glare ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-70"
            style={{
              background:
                "radial-gradient(600px circle at calc(50% + var(--px, 0) * 40%) calc(50% + var(--py, 0) * 40%), color-mix(in oklab, #a8ecd4 12%, transparent), transparent 55%)",
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Magnetic — the control reaches for the cursor.
 * ------------------------------------------------------------------ */

export function Magnetic({
  children,
  className = "",
  strength = 14,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    function onMove(event: PointerEvent) {
      const rect = node!.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      const near = Math.hypot(x, y) < 2.2;
      node!.style.transform = near
        ? `translate3d(${(x * strength).toFixed(1)}px, ${(y * strength * 0.6).toFixed(1)}px, 0)`
        : "translate3d(0,0,0)";
    }
    function reset() {
      node!.style.transform = "translate3d(0,0,0)";
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", reset);
    };
  }, [reduced, strength]);

  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-500 ease-out-expo ${className}`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Scramble — figures decode on arrival.
 * ------------------------------------------------------------------ */

const GLYPHS = "0123456789#%·/\\";

export function Scramble({
  text,
  className = "",
  duration = 900,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;

    let frame = 0;
    let start = 0;
    let observer: IntersectionObserver | null = null;

    function step(now: number) {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      const settled = Math.floor(t * text.length);
      setOut(
        text
          .split("")
          .map((c, i) =>
            i < settled || c === " " || c === "," ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          )
          .join(""),
      );
      if (t < 1) frame = requestAnimationFrame(step);
      else setOut(text);
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer?.disconnect();
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );
    observer.observe(node);

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [text, duration, reduced]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {out}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Signal divider — a pulse that runs the width as you reach it.
 * ------------------------------------------------------------------ */

export function SignalDivider({ className = "" }: { className?: string }) {
  const ref = useScene<HTMLDivElement>();
  return (
    <div ref={ref} aria-hidden className={`relative h-px w-full overflow-hidden ${className}`}>
      <span className="absolute inset-0 bg-line" />
      <span
        className="absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-brand-cyan to-transparent"
        style={{ transform: "translate3d(calc(var(--enter, 0) * 320% - 110%), 0, 0)" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Kinetic heading — words rise on a stagger, and lean with scroll speed.
 * ------------------------------------------------------------------ */

export function KineticHeading({
  text,
  className = "",
  as: Tag = "h2",
  accentFrom,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  /** Word index from which the accent gradient starts. */
  accentFrom?: number;
}) {
  const ref = useScene<HTMLHeadingElement>(0.6);
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span
            className={`inline-block ${accentFrom !== undefined && index >= accentFrom ? "text-gradient" : ""}`}
            style={{
              transform:
                "translate3d(0, calc((1 - var(--enter, 1)) * 0.9em), 0) skewY(calc(var(--vel, 0) * -1.2deg))",
              opacity: "calc(var(--enter, 1) * 1.6)",
              transition: "transform 120ms linear, opacity 120ms linear",
              transitionDelay: `${index * 24}ms`,
            }}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ *
 * Magnetic link wrapper for CTAs.
 * ------------------------------------------------------------------ */

export function MagneticLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Magnetic>
      <Link href={href} className={className}>
        {children}
      </Link>
    </Magnetic>
  );
}
