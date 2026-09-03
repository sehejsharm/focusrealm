"use client";

import { useMemo, useState } from "react";

import { buildFloors, status, type Room, type StatusKey } from "@/lib/viz";

const order: StatusKey[] = ["released", "running", "blocked", "queued"];

/**
 * `dense` thickens every stroke for the in-cell copies, which render at roughly
 * 9px. The shapes are deliberately the same ones the legend uses — a key that
 * does not match the marks it explains is worse than no key.
 */
function Glyph({
  kind,
  className = "size-2.5",
  dense = false,
}: {
  kind: string;
  className?: string;
  dense?: boolean;
}) {
  const w = dense ? 2.4 : 1.8;
  const thin = dense ? 2 : 1.4;
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" aria-hidden>
      {kind === "check" ? (
        <path d="M2 6.4 4.8 9.2 10 3.4" stroke="currentColor" strokeWidth={w} strokeLinecap="round" />
      ) : null}
      {kind === "clock" ? (
        <>
          <circle cx="6" cy="6" r="4.2" stroke="currentColor" strokeWidth={thin} />
          <path d="M6 3.6V6l1.8 1.2" stroke="currentColor" strokeWidth={thin} strokeLinecap="round" />
        </>
      ) : null}
      {kind === "cross" ? (
        <path d="M3.2 3.2 8.8 8.8M8.8 3.2 3.2 8.8" stroke="currentColor" strokeWidth={w} strokeLinecap="round" />
      ) : null}
      {kind === "dot" ? <circle cx="6" cy="6" r={dense ? 2.6 : 2.2} fill="currentColor" /> : null}
    </svg>
  );
}

/**
 * The property, one square per room, fourteen floors deep.
 *
 * Status is a reserved scale that collapses under protanopia, so every cell
 * carries its glyph as well as its colour — the same four marks the legend
 * uses — and hovering reads the exact state out in text.
 *
 * The grid itself is `aria-hidden`. 280 focusable squares would be a hostile
 * tab order, and the information is not per-room: what the picture says is
 * "the top floors are done, the low floors are not". That sentence, plus the
 * per-floor counts, is given to assistive tech as text in `FloorSummary`.
 */
export default function FloorGrid() {
  const floors = useMemo(() => buildFloors(), []);
  const [hover, setHover] = useState<Room | null>(null);
  const [filter, setFilter] = useState<StatusKey | null>(null);

  const counts = useMemo(() => {
    const c: Record<StatusKey, number> = { released: 0, running: 0, blocked: 0, queued: 0 };
    for (const floor of floors) for (const room of floor) c[room.state] += 1;
    return c;
  }, [floors]);

  const total = floors.length * floors[0].length;
  const shown = hover ?? null;

  return (
    <figure className="relative">
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <span className="font-mono text-[0.74rem] tracking-[0.16em] text-brand-cyan uppercase">
          Demo floor state · 08:36
        </span>
        <span className="font-mono text-[0.76rem] tabular-nums text-faint">
          {shown ? `Floor ${shown.floor} · room ${String(shown.index + 1).padStart(2, "0")} · ${status[shown.state].label} · ${shown.minutes} min target` : `${total} rooms tracked`}
        </span>
      </figcaption>

      {/* Filter row, above the chart */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {order.map((key) => {
          const active = filter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(active ? null : key)}
              aria-pressed={active}
              className={`flex min-h-11 items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.74rem] tracking-[0.1em] uppercase transition-colors duration-300 ${
                active ? "border-brand-bright/60 bg-brand/15 text-white" : "border-line text-muted hover:text-white"
              }`}
            >
              <span style={{ color: status[key].color }}>
                <Glyph kind={status[key].glyph} />
              </span>
              {status[key].label}
              <span className="tabular-nums text-faint">{counts[key]}</span>
            </button>
          );
        })}
      </div>

      {/*
        The text alternative. Visually hidden, but it carries everything the
        picture carries: the headline reading, the totals, and each floor's
        breakdown. A screen-reader user gets the chart's meaning as a sentence
        instead of "280 rooms tracked" beside 280 unlabelled squares.
      */}
      <div className="sr-only">
        <p>
          Demo floor state at 08:36 across {floors.length} guest floors,{" "}
          {floors[0].length} rooms each, {total} rooms in total:{" "}
          {order.map((key) => `${counts[key]} ${status[key].label.toLowerCase()}`).join(", ")}.
          Work runs top down — the upper floors are largely released, the lower floors are still
          queued.
        </p>
        <ul>
          {floors.map((floor) => {
            const c: Record<StatusKey, number> = {
              released: 0,
              running: 0,
              blocked: 0,
              queued: 0,
            };
            for (const room of floor) c[room.state] += 1;
            return (
              <li key={floor[0].floor}>
                Floor {floor[0].floor}:{" "}
                {order
                  .filter((key) => c[key] > 0)
                  .map((key) => `${c[key]} ${status[key].label.toLowerCase()}`)
                  .join(", ")}
                .
              </li>
            );
          })}
        </ul>
      </div>

      <div className="space-y-[3px]" aria-hidden onMouseLeave={() => setHover(null)}>
        {/* Fourteen floors of squares is 600px of scroll on a phone for a
            picture whose point lands in six. The upper floors stay on the page
            for the counts and for anything wider than a phone. */}
        {floors.map((floor, floorIndex) => (
          <div
            key={floor[0].floor}
            className={`flex items-center gap-2.5 ${floorIndex >= 6 ? "max-sm:hidden" : ""}`}
          >
            <span className="w-5 shrink-0 text-right font-mono text-[0.72rem] tabular-nums text-faint">
              {floor[0].floor}
            </span>
            <div className="grid flex-1 gap-[3px]" style={{ gridTemplateColumns: `repeat(${floor.length}, minmax(0, 1fr))` }}>
              {floor.map((room) => {
                const dim = filter !== null && room.state !== filter;
                const s = status[room.state];
                const on = hover === room;
                return (
                  <div
                    key={room.index}
                    onMouseEnter={() => setHover(room)}
                    className="flex h-4 items-center justify-center rounded-[2px] transition-all duration-200 sm:h-5"
                    style={{
                      background: `color-mix(in oklab, ${s.color} ${dim ? 10 : on ? 66 : 34}%, transparent)`,
                      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${s.color} ${dim ? 16 : 60}%, transparent)`,
                      opacity: dim ? 0.3 : 1,
                      // The mark is a bright tint of the state's own hue: it
                      // keeps the colour association for people who can use it
                      // and still reads as a shape for people who cannot.
                      color: `color-mix(in oklab, ${s.color} 30%, white)`,
                    }}
                  >
                    <Glyph kind={s.glyph} dense className="size-[9px] sm:size-[11px]" />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 font-mono text-[0.72rem] tracking-[0.12em] text-faint uppercase">
        Floor · 20 rooms each · top floor first
      </p>
    </figure>
  );
}
