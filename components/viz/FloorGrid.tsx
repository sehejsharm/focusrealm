"use client";

import { useMemo, useState } from "react";

import { buildFloors, status, type Room, type StatusKey } from "@/lib/viz";

const order: StatusKey[] = ["released", "running", "blocked", "queued"];

function Glyph({ kind, className = "size-2.5" }: { kind: string; className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" aria-hidden>
      {kind === "check" ? (
        <path d="M2 6.4 4.8 9.2 10 3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      ) : null}
      {kind === "clock" ? (
        <>
          <circle cx="6" cy="6" r="4.2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M6 3.6V6l1.8 1.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </>
      ) : null}
      {kind === "cross" ? (
        <path d="M3.2 3.2 8.8 8.8M8.8 3.2 3.2 8.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      ) : null}
      {kind === "dot" ? <circle cx="6" cy="6" r="2.2" fill="currentColor" /> : null}
    </svg>
  );
}

/**
 * The property, one square per room, fourteen floors deep.
 *
 * Status is a reserved scale that collapses under protanopia, so every cell
 * carries its glyph as well as its colour, and hovering reads the exact state
 * out in text.
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
        <span className="font-mono text-[0.58rem] tracking-[0.16em] text-brand-cyan uppercase">
          Live floor state · 08:36
        </span>
        <span className="font-mono text-[0.62rem] tabular-nums text-faint">
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
              className={`flex min-h-11 items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[0.58rem] tracking-[0.1em] uppercase transition-colors duration-300 ${
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

      <div className="space-y-[3px]" onMouseLeave={() => setHover(null)}>
        {floors.map((floor) => (
          <div key={floor[0].floor} className="flex items-center gap-2.5">
            <span className="w-5 shrink-0 text-right font-mono text-[0.5rem] tabular-nums text-faint">
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
                    className="h-3.5 rounded-[2px] transition-all duration-200 sm:h-4"
                    style={{
                      background: `color-mix(in oklab, ${s.color} ${dim ? 10 : on ? 66 : 34}%, transparent)`,
                      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${s.color} ${dim ? 16 : 60}%, transparent)`,
                      opacity: dim ? 0.3 : 1,
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 font-mono text-[0.55rem] tracking-[0.12em] text-faint uppercase">
        Floor · 20 rooms each · top floor first
      </p>
    </figure>
  );
}
