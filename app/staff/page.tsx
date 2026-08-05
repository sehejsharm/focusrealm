"use client";

import Link from "next/link";
import { CheckCircle2, MapPin, PlayCircle } from "lucide-react";
import StaffTabs from "@/components/StaffTabs";
import { SOPS } from "@/lib/data";
import { CATEGORY_STYLE } from "@/lib/ui";
import { useStaffProgress } from "@/lib/store";

/** The One-Task Dashboard: exactly one priority task, or nothing at all. */
export default function StaffHomePage() {
  const { completed, ready, reset } = useStaffProgress();

  const nextTask = SOPS.filter(
    (sop) => sop.assigned && !completed.includes(sop.id),
  ).sort((a, b) => a.priority - b.priority)[0];

  if (!ready) return null;

  return (
    <div className="flex min-h-full flex-col gap-5 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-stone-500">Good shift, Maya</p>
          <h1 className="text-2xl font-black tracking-tight text-stone-900">
            Today
          </h1>
        </div>
        <StaffTabs />
      </div>

      {nextTask ? (
        <Link
          href={`/staff/sop/${nextTask.id}`}
          className="flex min-h-[75vh] flex-1 flex-col justify-between overflow-hidden rounded-[2rem] bg-stone-900 p-6 text-white active:opacity-90"
        >
          <div>
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold tracking-wide uppercase">
              {nextTask.dueLabel}
            </span>

            <div className="mt-8 flex justify-center">
              {(() => {
                const { Icon, solid } = CATEGORY_STYLE[nextTask.category];
                return (
                  <span
                    className={`flex size-32 items-center justify-center rounded-full ${solid}`}
                  >
                    <Icon className="size-16 text-white" aria-hidden />
                  </span>
                );
              })()}
            </div>

            <h2 className="mt-8 text-center text-4xl leading-tight font-black">
              {nextTask.title}
            </h2>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-lg font-semibold text-white/70">
              <MapPin className="size-5 shrink-0" aria-hidden />
              {nextTask.location}
            </p>
          </div>

          <span className="flex min-h-16 items-center justify-center gap-2 rounded-full bg-emerald-500 text-lg font-black text-white">
            <PlayCircle className="size-7" aria-hidden />
            Start Task
          </span>
        </Link>
      ) : (
        <div className="flex min-h-[75vh] flex-1 flex-col items-center justify-center gap-4 rounded-[2rem] border-4 border-dashed border-stone-200 p-6 text-center">
          <CheckCircle2 className="size-24 text-emerald-500" aria-hidden />
          <h2 className="text-2xl font-black text-stone-900">
            You&apos;re all caught up!
          </h2>
          <p className="max-w-[24ch] text-sm font-medium text-stone-500">
            No priority tasks left this shift. Check the Directory if you need
            to look something up.
          </p>
          {completed.length > 0 && (
            <button
              type="button"
              onClick={reset}
              className="mt-2 text-xs font-bold text-stone-400 underline underline-offset-2"
            >
              Reset demo tasks
            </button>
          )}
        </div>
      )}
    </div>
  );
}
