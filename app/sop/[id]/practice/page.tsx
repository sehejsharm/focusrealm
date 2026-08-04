"use client";

import { useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Check,
  CheckCheck,
  Info,
  MessageCircle,
  PlayCircle,
  RotateCcw,
  Timer,
  TriangleAlert,
} from "lucide-react";
import Countdown from "@/components/Countdown";
import ProgressRing from "@/components/ProgressRing";
import { ACTIVE_TASK, SUPERVISOR, getSop, stepCount } from "@/lib/data";
import { PHASE_LABEL, PHASE_ORDER } from "@/lib/ui";
import { useStaffState } from "@/lib/store";

/**
 * The live task runner: countdown, phase-by-phase checklist, demo clips,
 * why-it-matters callouts, photo evidence, and a line to the supervisor.
 */
export default function PracticePage() {
  const params = useParams<{ id: string }>();
  const sop = getSop(params.id);
  const { steps, photos, toggleStep, capturePhoto, resetRun } = useStaffState();
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  const allStepIds = useMemo(
    () => sop?.phases.flatMap((phase) => phase.steps.map((s) => s.id)) ?? [],
    [sop],
  );

  if (!sop) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center">
        <p className="text-lg font-bold text-stone-900">Standard not found</p>
        <Link
          href="/library"
          className="mt-4 inline-flex min-h-14 items-center rounded-xl bg-stone-900 px-5 font-bold text-white"
        >
          Back to SOPs
        </Link>
      </div>
    );
  }

  const total = stepCount(sop);
  const done = allStepIds.filter((id) => steps[id]).length;
  const percent = total === 0 ? 0 : (done / total) * 100;
  const onThisRoom = ACTIVE_TASK.sopId === sop.id;

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href={`/sop/${sop.id}`}
        className="mb-4 inline-flex min-h-14 items-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-stone-700 ring-1 ring-stone-200 hover:bg-stone-50"
      >
        <ArrowLeft className="size-5" aria-hidden />
        Standard
      </Link>

      {/* Run header */}
      <section
        aria-labelledby="run"
        className="z-20 mb-5 overflow-hidden rounded-2xl border border-stone-200 bg-white lg:sticky lg:top-0"
      >
        <div className="h-1.5 w-full bg-amber-500" aria-hidden />
        <div className="flex items-center gap-4 p-4">
          <ProgressRing percent={percent} size={76} stroke={8} sublabel="steps" />

          <div className="min-w-0 flex-1">
            <h1 id="run" className="font-mono text-sm font-black text-stone-900">
              {sop.code}
              {onThisRoom && (
                <span className="ml-2 rounded-md bg-stone-900 px-1.5 py-0.5 text-[11px] text-white">
                  Room {ACTIVE_TASK.room}
                </span>
              )}
            </h1>
            <p className="text-base leading-snug font-bold text-balance text-stone-800">
              {sop.title}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-stone-900">
              <Timer className="size-4 text-stone-400" aria-hidden />
              <Countdown
                seconds={
                  onThisRoom
                    ? (ACTIVE_TASK.remainingSeconds ?? 0)
                    : sop.targetMinutes * 60
                }
              />
              <span className="font-medium text-stone-400">
                of {sop.targetMinutes} min
              </span>
            </p>
          </div>

          <p className="shrink-0 text-right font-mono text-sm font-black text-stone-900">
            {done}
            <span className="text-stone-400">/{total}</span>
          </p>
        </div>
      </section>

      {/* Phases */}
      <div className="space-y-5">
        {PHASE_ORDER.map((phaseKey, phaseIndex) => {
          const phase = sop.phases.find((p) => p.key === phaseKey);
          if (!phase) return null;

          const phaseDone = phase.steps.filter((s) => steps[s.id]).length;
          const phaseComplete = phaseDone === phase.steps.length;

          return (
            <section
              key={phaseKey}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white"
            >
              <header className="flex items-center gap-2.5 border-b border-stone-100 p-4">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-black ${
                    phaseComplete
                      ? "bg-emerald-500 text-white"
                      : "bg-stone-900 text-white"
                  }`}
                  aria-hidden
                >
                  {phaseComplete ? <Check className="size-4" strokeWidth={3} /> : phaseIndex + 1}
                </span>
                <h2 className="flex-1 text-sm font-black tracking-wide text-stone-900 uppercase">
                  {PHASE_LABEL[phaseKey]}
                </h2>
                <span className="font-mono text-xs font-bold text-stone-400">
                  {phaseDone}/{phase.steps.length}
                </span>
              </header>

              <ul className="divide-y divide-stone-100">
                {phase.steps.map((step) => {
                  const checked = Boolean(steps[step.id]);
                  const hasPhoto = Boolean(photos[step.id]);
                  const photoBlocking = step.photo && !hasPhoto;

                  return (
                    <li key={step.id} className="p-4">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={checked}
                        disabled={photoBlocking && !checked}
                        onClick={() => toggleStep(step.id)}
                        className="flex min-h-14 w-full items-start gap-3 text-left disabled:opacity-60"
                      >
                        <span
                          className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            checked
                              ? "bg-emerald-500 text-white"
                              : "ring-2 ring-stone-300"
                          }`}
                          aria-hidden
                        >
                          {checked && <Check className="size-4" strokeWidth={3} />}
                        </span>
                        <span
                          className={`flex-1 text-sm leading-snug font-semibold text-pretty ${
                            checked
                              ? "text-stone-400 line-through"
                              : "text-stone-800"
                          }`}
                        >
                          {step.text}
                        </span>
                      </button>

                      {(step.clip || step.why || step.photo) && (
                        <div className="mt-2 space-y-2 pl-10">
                          {step.clip && (
                            <p className="inline-flex items-center gap-1.5 rounded-lg bg-stone-100 px-2.5 py-1.5 text-xs font-bold text-stone-600">
                              <PlayCircle className="size-4" aria-hidden />
                              {step.clip}
                            </p>
                          )}

                          {step.why && (
                            <p className="flex items-start gap-1.5 rounded-lg bg-stone-50 p-2.5 text-xs leading-snug text-pretty text-stone-600">
                              <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                              <span>
                                <span className="font-black">Why it matters · </span>
                                {step.why}
                              </span>
                            </p>
                          )}

                          {step.photo && (
                            <div>
                              <input
                                ref={(node) => {
                                  fileInputs.current[step.id] = node;
                                }}
                                type="file"
                                accept="image/*"
                                capture="environment"
                                className="sr-only"
                                aria-label="Capture photo evidence"
                                onChange={() => capturePhoto(step.id)}
                              />
                              <button
                                type="button"
                                onClick={() => fileInputs.current[step.id]?.click()}
                                className={`flex min-h-14 w-full items-center gap-2.5 rounded-xl px-4 text-sm font-bold ${
                                  hasPhoto
                                    ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                                    : "bg-sky-500 text-white active:bg-sky-600"
                                }`}
                              >
                                {hasPhoto ? (
                                  <>
                                    <CheckCheck className="size-5" aria-hidden />
                                    Photo evidence captured
                                  </>
                                ) : (
                                  <>
                                    <Camera className="size-5" aria-hidden />
                                    Capture photo evidence
                                  </>
                                )}
                              </button>
                              {photoBlocking && !checked && (
                                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-stone-400">
                                  <TriangleAlert className="size-3.5" aria-hidden />
                                  Photo required before this step can be ticked
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      {/* Run footer */}
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <Link
          href="/forums"
          className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 text-sm font-bold text-white hover:bg-stone-800"
        >
          <MessageCircle className="size-5" aria-hidden />
          Ask {SUPERVISOR.name.split(" ")[0]}
        </Link>
        <button
          type="button"
          onClick={() => resetRun(allStepIds)}
          className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-stone-100 px-4 text-sm font-bold text-stone-600 hover:bg-stone-200"
        >
          <RotateCcw className="size-5" aria-hidden />
          Reset run
        </button>
      </div>

      {done === total && total > 0 && (
        <p className="mise-pop mt-4 flex min-h-14 items-center justify-center gap-2.5 rounded-xl bg-emerald-500 px-4 text-base font-black text-white">
          <Check className="size-6" strokeWidth={3} aria-hidden />
          All {total} steps done — room ready to release
        </p>
      )}
    </div>
  );
}
