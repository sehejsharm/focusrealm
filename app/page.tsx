"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  LifeBuoy,
  MessageCircle,
  Play,
  Sparkles,
} from "lucide-react";
import Countdown from "@/components/Countdown";
import FlagChips from "@/components/FlagChips";
import ProgressRing from "@/components/ProgressRing";
import {
  ACTIVE_TASK,
  SHIFT_GLANCE,
  SHIFT_RHYTHM,
  STAFF,
  SUPERVISOR,
  getSop,
} from "@/lib/data";
import { STATUS } from "@/lib/ui";
import type { Status } from "@/lib/types";

/** Checkpoints are moments in the day, so they read differently to rooms. */
const CHECKPOINT_LABEL: Record<Status, string> = {
  complete: "Done",
  active: "In progress",
  urgent: "Due now",
  scheduled: "Upcoming",
};

/** Today: what is happening right now, and what the day looks like around it. */
export default function TodayPage() {
  const sop = getSop(ACTIVE_TASK.sopId);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold text-stone-500">
          {STAFF.shiftDay} · {STAFF.shiftLabel}
        </p>
        <h1 className="mt-1 text-2xl leading-tight font-black tracking-tight text-stone-900 lg:text-3xl">
          Good morning, {STAFF.name.split(" ")[0]}
        </h1>
      </header>

      {/* Next timed task */}
      <section
        aria-labelledby="next-task"
        className="overflow-hidden rounded-2xl border border-stone-200 bg-white"
      >
        <div className={`h-1.5 w-full ${STATUS.active.solid}`} aria-hidden />

        <div className="p-4 lg:p-5">
          <div className="flex items-center justify-between gap-3">
            <h2
              id="next-task"
              className="text-[11px] font-bold tracking-wide text-stone-400 uppercase"
            >
              Happening now
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
              <span className="size-1.5 rounded-full bg-amber-500" aria-hidden />
              Due {ACTIVE_TASK.dueAt}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-5">
            <ProgressRing
              percent={ACTIVE_TASK.percent ?? 0}
              sublabel="done"
              className="text-amber-500"
            />

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold tracking-wide text-stone-400 uppercase">
                Room
              </p>
              <p className="font-mono text-4xl leading-none font-black text-stone-900">
                {ACTIVE_TASK.room}
              </p>
              {sop && (
                <p className="mt-2 text-sm leading-snug font-semibold text-stone-600">
                  {sop.code} · {sop.title}
                </p>
              )}
              <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-stone-900">
                <Clock className="size-4 text-stone-400" aria-hidden />
                <Countdown seconds={ACTIVE_TASK.remainingSeconds ?? 0} />
                <span className="font-medium text-stone-400">left on target</span>
              </p>
            </div>
          </div>

          <div className="mt-4">
            <FlagChips flags={ACTIVE_TASK.flags} size="md" />
          </div>

          <p className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs leading-snug font-medium text-amber-900">
            <Sparkles className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span>
              <span className="font-black">Five-star cue · </span>
              {ACTIVE_TASK.fiveStarCue}
            </span>
          </p>

          {sop && (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Link
                href={`/sop/${sop.id}/practice`}
                className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 text-sm font-bold text-white transition-colors hover:bg-stone-800"
              >
                <Play className="size-5" aria-hidden />
                Continue task
              </Link>
              <Link
                href="/shift"
                className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-stone-100 px-4 text-sm font-bold text-stone-700 transition-colors hover:bg-stone-200"
              >
                See full shift
                <ArrowRight className="size-5" aria-hidden />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Shift rhythm */}
      <section aria-labelledby="rhythm">
        <h2 id="rhythm" className="mb-3 text-lg font-black text-stone-900">
          Shift rhythm
        </h2>

        <ol className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
          {SHIFT_RHYTHM.map((checkpoint, index) => {
            const tone = STATUS[checkpoint.status];
            const last = index === SHIFT_RHYTHM.length - 1;

            return (
              <li
                key={checkpoint.id}
                className={`flex gap-3 p-4 ${last ? "" : "border-b border-stone-100"}`}
              >
                <div className="flex flex-col items-center">
                  <span
                    className={`size-4 shrink-0 rounded-full ring-4 ${tone.solid} ${tone.ring}`}
                    aria-hidden
                  />
                  {!last && (
                    <span className="mt-1 w-0.5 flex-1 bg-stone-200" aria-hidden />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <p className="font-mono text-sm font-black text-stone-900">
                      {checkpoint.at}
                    </p>
                    <p className="text-sm font-bold text-stone-900">
                      {checkpoint.label}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${tone.tint} ${tone.text}`}
                    >
                      {CHECKPOINT_LABEL[checkpoint.status]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-snug text-stone-500">
                    {checkpoint.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Glance + supervisor */}
      <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
        <section
          aria-labelledby="glance"
          className="rounded-2xl border border-stone-200 bg-white p-4"
        >
          <h2 id="glance" className="mb-3 text-sm font-black text-stone-900">
            Shift at a glance
          </h2>
          <dl className="grid grid-cols-3 gap-3">
            <div>
              <dt className="text-[11px] font-bold text-stone-400 uppercase">
                Released
              </dt>
              <dd className="font-mono text-2xl font-black text-stone-900">
                {SHIFT_GLANCE.roomsReleased}
                <span className="text-sm text-stone-400">
                  /{SHIFT_GLANCE.roomsTotal}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold text-stone-400 uppercase">
                On-time
              </dt>
              <dd className="font-mono text-2xl font-black text-emerald-600">
                {SHIFT_GLANCE.onTimePace}%
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold text-stone-400 uppercase">
                Arrivals
              </dt>
              <dd className="text-sm leading-tight font-bold text-stone-900">
                {SHIFT_GLANCE.arrivalPressure}
              </dd>
            </div>
          </dl>
        </section>

        <section
          aria-labelledby="supervisor"
          className="rounded-2xl border border-stone-200 bg-white p-4"
        >
          <h2 id="supervisor" className="mb-3 text-sm font-black text-stone-900">
            Your supervisor
          </h2>
          <div className="flex items-center gap-3">
            <span className="relative shrink-0">
              <span
                className="flex size-12 items-center justify-center rounded-full bg-stone-800 text-sm font-black text-white"
                aria-hidden
              >
                {SUPERVISOR.initials}
              </span>
              {SUPERVISOR.onShift && (
                <span
                  className="absolute -right-0.5 -bottom-0.5 size-4 rounded-full bg-emerald-500 ring-2 ring-white"
                  aria-label="On shift"
                />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-stone-900">
                {SUPERVISOR.name}
              </p>
              <p className="text-xs font-medium text-emerald-600">
                {SUPERVISOR.onShift ? "On shift now" : "Off shift"}
              </p>
            </div>
          </div>

          <div className="mt-3 grid gap-2">
            <Link
              href="/forums"
              className="flex min-h-14 items-center justify-between gap-2 rounded-xl bg-stone-100 px-4 text-sm font-bold text-stone-700 hover:bg-stone-200"
            >
              <span className="flex items-center gap-2">
                <MessageCircle className="size-5" aria-hidden />
                Ask about a standard
              </span>
              <ChevronRight className="size-5 shrink-0" aria-hidden />
            </Link>
            <Link
              href="/service-recovery"
              className="flex min-h-14 items-center justify-between gap-2 rounded-xl bg-rose-50 px-4 text-sm font-bold text-rose-700 hover:bg-rose-100"
            >
              <span className="flex items-center gap-2">
                <LifeBuoy className="size-5" aria-hidden />
                Guest issue right now
              </span>
              <ChevronRight className="size-5 shrink-0" aria-hidden />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
