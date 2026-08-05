"use client";

import { useState } from "react";
import { MessageCircle, PartyPopper } from "lucide-react";
import { ROSTER_EXCEPTIONS, SHIFT_COMPLIANCE } from "@/lib/data";

function ProgressRing({ percent }: { percent: number }) {
  const size = 92;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);
  const color =
    percent >= 90 ? "#10b981" : percent >= 75 ? "#f59e0b" : "#f43f5e";

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e7e5e4"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 500ms ease" }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`rotate(90 ${size / 2} ${size / 2})`}
        className="fill-stone-900 text-lg font-black"
      >
        {percent}%
      </text>
    </svg>
  );
}

/** Exception-based auditing: hide what's fine, surface only what's broken. */
export default function ManagerHomePage() {
  const [nudged, setNudged] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<string | null>(null);

  const nudge = (id: string, name: string) => {
    setNudged((prev) => ({ ...prev, [id]: true }));
    setToast(`Automated reminder sent to ${name}.`);
    window.setTimeout(() => setToast(null), 2600);
  };

  return (
    <div className="relative flex min-h-full flex-col gap-6 p-4 pb-8">
      <header>
        <p className="text-sm font-semibold text-stone-500">Front-of-house</p>
        <h1 className="text-2xl font-black tracking-tight text-stone-900">
          Compliance
        </h1>
      </header>

      <section
        aria-label="Shift compliance"
        className="flex justify-around rounded-3xl border border-stone-200 bg-white p-5"
      >
        {SHIFT_COMPLIANCE.map((shift) => (
          <div key={shift.id} className="flex flex-col items-center gap-2">
            <ProgressRing percent={shift.percent} />
            <p className="text-center text-xs font-bold text-stone-500">
              {shift.label}
            </p>
          </div>
        ))}
      </section>

      <section aria-label="Exceptions" className="flex-1 space-y-3">
        <h2 className="text-lg font-black text-stone-900">
          {ROSTER_EXCEPTIONS.length > 0
            ? `${ROSTER_EXCEPTIONS.length} needs attention`
            : "All clear"}
        </h2>

        {ROSTER_EXCEPTIONS.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-3xl border-4 border-dashed border-stone-200 py-16 text-center">
            <PartyPopper className="size-20 text-emerald-500" aria-hidden />
            <p className="text-xl font-black text-stone-900">
              All systems optimal.
            </p>
            <p className="text-sm font-medium text-stone-500">No exceptions.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {ROSTER_EXCEPTIONS.map((person) => (
              <li
                key={person.id}
                className="flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-rose-500 text-sm font-black text-white">
                  {person.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-stone-900">
                    {person.name}
                    <span className="ml-2 font-medium text-stone-500">
                      · {person.department}
                    </span>
                  </p>
                  <p className="truncate text-xs font-semibold text-rose-700">
                    {person.issue}
                  </p>
                  <p className="text-[11px] font-medium text-stone-400">
                    {person.since}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => nudge(person.id, person.name)}
                  disabled={nudged[person.id]}
                  aria-label={`Send WhatsApp reminder to ${person.name}`}
                  className={`flex size-12 shrink-0 items-center justify-center rounded-full text-white transition-colors ${
                    nudged[person.id] ? "bg-stone-300" : "bg-emerald-500 active:bg-emerald-600"
                  }`}
                >
                  <MessageCircle className="size-6" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {toast && (
        <div className="mise-pop pointer-events-none absolute inset-x-4 bottom-4 z-30 rounded-2xl bg-stone-900 px-4 py-3 text-center text-sm font-bold text-white shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}
