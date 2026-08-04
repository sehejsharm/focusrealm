import Link from "next/link";
import { ChevronRight, Clock, Sparkles } from "lucide-react";
import FlagChips from "./FlagChips";
import { getSop } from "@/lib/data";
import { STATUS } from "@/lib/ui";
import type { ShiftTask } from "@/lib/types";

/** One timed room task in the duty plan. */
export default function ShiftTaskCard({ task }: { task: ShiftTask }) {
  const sop = getSop(task.sopId);
  const tone = STATUS[task.status];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className={`h-1.5 w-full ${tone.solid}`} aria-hidden />

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold tracking-wide text-stone-400 uppercase">
              Room
            </p>
            <p className="font-mono text-3xl leading-none font-black text-stone-900">
              {task.room}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${tone.tint} ${tone.text}`}
            >
              <span className={`size-1.5 rounded-full ${tone.solid}`} aria-hidden />
              {tone.label}
            </span>
            <p className="mt-1.5 flex items-center justify-end gap-1 text-xs font-bold text-stone-500">
              <Clock className="size-3.5" aria-hidden />
              {task.dueAt}
            </p>
          </div>
        </div>

        {sop && (
          <p className="text-sm leading-snug font-semibold text-stone-700">
            {sop.code} · {sop.title}
          </p>
        )}

        <FlagChips flags={task.flags} />

        <p className="flex items-start gap-2 rounded-xl bg-amber-50 p-2.5 text-xs leading-snug font-medium text-amber-900">
          <Sparkles className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>
            <span className="font-black">Five-star cue · </span>
            {task.fiveStarCue}
          </span>
        </p>

        {sop && (
          <Link
            href={`/sop/${sop.id}`}
            className="mt-auto flex min-h-14 items-center justify-between gap-2 rounded-xl bg-stone-900 px-4 text-sm font-bold text-white transition-colors hover:bg-stone-800 active:bg-stone-700"
          >
            Open SOP
            <ChevronRight className="size-5 shrink-0" aria-hidden />
          </Link>
        )}
      </div>
    </article>
  );
}
