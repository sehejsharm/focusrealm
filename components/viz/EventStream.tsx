"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/components/fx/motion";
import { status, type StatusKey } from "@/lib/viz";

type Event = { id: number; time: string; room: string; text: string; state: StatusKey };

const templates: { text: string; state: StatusKey }[] = [
  { text: "Guest-ready reset released", state: "released" },
  { text: "Photo evidence attached · step 4", state: "released" },
  { text: "Supervisor sign-off · E. Rossi", state: "released" },
  { text: "Turndown started", state: "running" },
  { text: "Blocked · maintenance flag raised", state: "blocked" },
  { text: "Bathroom reset verified", state: "released" },
  { text: "Assigned · rooms division", state: "queued" },
  { text: "Fault first response logged", state: "running" },
];

function make(id: number): Event {
  const t = templates[id % templates.length];
  const minute = (36 + id * 3) % 60;
  const hour = 8 + Math.floor((36 + id * 3) / 60);
  return {
    id,
    time: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    room: String(201 + ((id * 7) % 96)),
    text: t.text,
    state: t.state,
  };
}

/**
 * A live ledger, streaming. The point of the product is that work writes
 * itself down as it happens; this is that, running, rather than a sentence
 * claiming it.
 */
export default function EventStream() {
  const [events, setEvents] = useState<Event[]>(() => [0, 1, 2, 3, 4].map(make));
  const next = useRef(5);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    /*
     * Held back until the page has settled.
     *
     * Every new row is a fresh paint, and a row wide enough to beat the hero
     * text becomes the Largest Contentful Paint — so a ticker starting
     * immediately kept moving LCP later with each tick (measured at 2.8s,
     * against 1.0s for the hero itself). Five rows are already on screen from
     * the server render; nothing is missing during the delay.
     */
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => {
        setEvents((current) => [make(next.current++), ...current].slice(0, 5));
      }, 2400);
    }, 3200);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [reduced]);

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 bg-linear-to-t from-ink to-transparent"
      />
      {/* Decorative. These are synthetic rows from the demo property that
          rewrite themselves every couple of seconds; announcing them would
          interrupt a screen-reader user continuously to read out data that
          carries no information about this page. The same claim is made in
          prose in the surrounding copy. */}
      <ul
        aria-hidden
        className="space-y-px font-mono text-[0.78rem]"
      >
        {events.map((event, index) => {
          const s = status[event.state];
          return (
            <li
              key={event.id}
              className="flex items-center gap-3 border-b border-line/60 py-2.5 last:border-b-0"
              style={{
                animation: index === 0 ? "rise-in 0.5s var(--ease-out-expo) both" : undefined,
                // Shallow ramp on purpose: at 0.16 a step the last rows landed
                // at 3.0:1 and 2.1:1 against the panel, well under AA. The
                // scrim below carries the "fading into history" read instead.
                opacity: 1 - index * 0.06,
              }}
            >
              <span className="tabular-nums text-faint">{event.time}</span>
              <span className="size-1.5 shrink-0 rounded-full" style={{ background: s.color }} />
              <span className="shrink-0 text-brand-cyan">{event.room}</span>
              <span className="truncate text-muted">{event.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
