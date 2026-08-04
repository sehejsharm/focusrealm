"use client";

import Link from "next/link";
import { ArrowRight, Clock, MessageSquareQuote, Play, Sparkles } from "lucide-react";
import Countdown from "@/components/Countdown";
import FlagChips from "@/components/FlagChips";
import PageHeader from "@/components/PageHeader";
import ProgressRing from "@/components/ProgressRing";
import ShiftTaskCard from "@/components/ShiftTaskCard";
import {
  ACTIVE_TASK,
  SHIFT_GLANCE,
  SHIFT_TASKS,
  STAFF,
  SUPERVISOR,
  SUPERVISOR_NOTE,
  getSop,
} from "@/lib/data";

/** My shift: the live task, the day's numbers, and every timed room task. */
export default function ShiftPage() {
  const activeSop = getSop(ACTIVE_TASK.sopId);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My shift"
        subtitle={`${STAFF.shiftDay} ${STAFF.shiftLabel} · ${STAFF.department} · ${STAFF.property}`}
        action={
          <Link
            href="/handover"
            className="flex min-h-14 items-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-stone-700 ring-1 ring-stone-200 hover:bg-stone-50"
          >
            Shift handover
            <ArrowRight className="size-5" aria-hidden />
          </Link>
        }
      />

      {/* Live task */}
      <section
        aria-labelledby="live-task"
        className="overflow-hidden rounded-2xl border border-amber-200 bg-white"
      >
        <div className="h-1.5 w-full bg-amber-500" aria-hidden />
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center lg:p-5">
          <ProgressRing
            percent={ACTIVE_TASK.percent ?? 0}
            sublabel="done"
            className="text-amber-500"
          />

          <div className="min-w-0 flex-1">
            <h2
              id="live-task"
              className="text-[11px] font-bold tracking-wide text-stone-400 uppercase"
            >
              Live now
            </h2>
            <p className="font-mono text-4xl leading-none font-black text-stone-900">
              {ACTIVE_TASK.room}
            </p>
            {activeSop && (
              <p className="mt-1.5 text-sm font-semibold text-stone-600">
                {activeSop.code} · {activeSop.title}
              </p>
            )}
            <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-stone-900">
              <Clock className="size-4 text-stone-400" aria-hidden />
              <Countdown seconds={ACTIVE_TASK.remainingSeconds ?? 0} />
              <span className="font-medium text-stone-400">
                left · due {ACTIVE_TASK.dueAt}
              </span>
            </p>
            <div className="mt-3">
              <FlagChips flags={ACTIVE_TASK.flags} size="md" />
            </div>
          </div>

          {activeSop && (
            <Link
              href={`/sop/${activeSop.id}/practice`}
              className="flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-xl bg-stone-900 px-5 text-sm font-bold text-white hover:bg-stone-800"
            >
              <Play className="size-5" aria-hidden />
              Continue
            </Link>
          )}
        </div>
      </section>

      {/* Glance */}
      <section
        aria-labelledby="glance"
        className="rounded-2xl border border-stone-200 bg-white p-4"
      >
        <h2 id="glance" className="mb-3 text-sm font-black text-stone-900">
          Shift at a glance
        </h2>
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-[11px] font-bold text-stone-400 uppercase">
              Rooms released
            </dt>
            <dd className="font-mono text-3xl font-black text-stone-900">
              {SHIFT_GLANCE.roomsReleased}
              <span className="text-base text-stone-400">
                /{SHIFT_GLANCE.roomsTotal}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-bold text-stone-400 uppercase">
              On-time pace
            </dt>
            <dd className="font-mono text-3xl font-black text-emerald-600">
              {SHIFT_GLANCE.onTimePace}%
            </dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-[11px] font-bold text-stone-400 uppercase">
              Arrival pressure
            </dt>
            <dd className="text-base leading-tight font-bold text-stone-900">
              {SHIFT_GLANCE.arrivalPressure}
            </dd>
          </div>
        </dl>
      </section>

      {/* Supervisor note */}
      <section
        aria-labelledby="note"
        className="rounded-2xl border border-stone-200 bg-stone-900 p-4 text-white"
      >
        <h2
          id="note"
          className="mb-2 flex items-center gap-2 text-[11px] font-bold tracking-wide text-white/50 uppercase"
        >
          <MessageSquareQuote className="size-4" aria-hidden />
          Note from {SUPERVISOR.name}
        </h2>
        <p className="text-sm leading-relaxed text-pretty text-white/90">
          {SUPERVISOR_NOTE}
        </p>
      </section>

      {/* Duty plan */}
      <section aria-labelledby="plan">
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <h2 id="plan" className="text-lg font-black text-stone-900">
            Duty plan
          </h2>
          <p className="flex items-center gap-1.5 text-xs font-bold text-stone-500">
            <Sparkles className="size-4 text-amber-500" aria-hidden />
            {SHIFT_TASKS.length} timed tasks
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SHIFT_TASKS.map((task) => (
            <li key={task.id} className="flex">
              <div className="w-full">
                <ShiftTaskCard task={task} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
