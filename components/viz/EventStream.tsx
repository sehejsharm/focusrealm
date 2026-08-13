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
    const id = setInterval(() => {
      setEvents((current) => [make(next.current++), ...current].slice(0, 5));
    }, 2400);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 bg-linear-to-t from-ink to-transparent"
      />
      <ul
        aria-live="off"
        className="space-y-px font-mono text-[0.68rem]"
      >
        {events.map((event, index) => {
          const s = status[event.state];
          return (
            <li
              key={event.id}
              className="flex items-center gap-3 border-b border-line/60 py-2.5 last:border-b-0"
              style={{
                animation: index === 0 ? "rise-in 0.5s var(--ease-out-expo) both" : undefined,
                opacity: 1 - index * 0.16,
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
