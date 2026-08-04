"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import MediaTile from "@/components/MediaTile";
import SuccessOverlay from "@/components/SuccessOverlay";
import SwipeToComplete from "@/components/SwipeToComplete";
import VerificationQuiz from "@/components/VerificationQuiz";
import { getModule } from "@/lib/data";
import { CATEGORY_ICON, CATEGORY_TINT } from "@/lib/icons";
import { STATUS } from "@/lib/status";
import { useStore } from "@/lib/store";

/**
 * Module viewer: Title, Instructions and Media, an optional verification quiz,
 * then Complete — which writes the timestamped Read Receipt.
 */
export default function ModulePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { ready, markOpened, markQuizPassed, quizPassed, complete, receiptFor, statusOf } =
    useStore();
  const [celebrating, setCelebrating] = useState(false);

  const sop = getModule(params.id);

  useEffect(() => {
    if (ready && sop) markOpened(sop.id);
  }, [ready, sop, markOpened]);

  if (!sop) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-lg font-bold text-slate-900">Task not found</p>
        <Link
          href="/staff/tasks"
          className="mt-5 inline-flex min-h-14 items-center rounded-2xl bg-slate-900 px-6 font-bold text-white"
        >
          Back to tasks
        </Link>
      </div>
    );
  }

  const Icon = CATEGORY_ICON[sop.category];
  const status = statusOf(sop);
  const tone = STATUS[status];
  const receipt = receiptFor(sop.id);
  const needsQuiz = Boolean(sop.quiz) && !quizPassed[sop.id];

  const handleComplete = () => {
    complete(sop.id);
    setCelebrating(true);
    window.setTimeout(() => router.push("/staff/tasks"), 1100);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/staff/tasks"
        className="mb-4 inline-flex min-h-14 items-center gap-2 rounded-2xl bg-white px-4 text-base font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 active:bg-slate-50"
      >
        <ArrowLeft className="size-6" aria-hidden />
        Back
      </Link>

      <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className={`h-2 w-full ${tone.solid}`} aria-hidden />

        <header className="flex items-start gap-4 p-5">
          <div
            className={`flex size-20 shrink-0 items-center justify-center rounded-2xl ${CATEGORY_TINT[sop.category]}`}
            aria-hidden
          >
            <Icon className="size-11" strokeWidth={2} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-mono text-4xl leading-none font-black tracking-tight text-slate-900">
              {sop.code}
            </p>
            <h1 className="mt-2 text-xl leading-snug font-bold text-balance text-slate-800">
              {sop.title}
            </h1>
          </div>
        </header>

        <div className="flex flex-wrap items-center gap-1.5 px-5 pb-5 text-xs font-medium text-slate-500">
          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1">
            <MapPin className="size-3.5" aria-hidden />
            {sop.location}
          </span>
          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1">
            {sop.department}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 ${
              status === "urgent"
                ? "bg-rose-50 text-rose-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            <Clock className="size-3.5" aria-hidden />
            {sop.dueLabel}
          </span>
        </div>

        <div className="space-y-6 border-t border-slate-100 p-5">
          <section>
            <h2 className="mb-3 text-sm font-black tracking-wide text-slate-400 uppercase">
              Steps · चरण
            </h2>
            <ol className="space-y-3">
              {sop.instructions.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 font-mono text-base font-black text-white"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <span className="pt-1 text-base leading-snug font-medium text-pretty text-slate-700">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-black tracking-wide text-slate-400 uppercase">
              Material · सामग्री
            </h2>
            <MediaTile media={sop.media} />
          </section>

          {sop.quiz && (
            <section>
              <h2 className="mb-3 text-sm font-black tracking-wide text-slate-400 uppercase">
                Quick check · जाँच
              </h2>
              <VerificationQuiz
                questions={sop.quiz}
                passed={Boolean(quizPassed[sop.id])}
                onPass={() => markQuizPassed(sop.id)}
              />
            </section>
          )}
        </div>

        <div
          className="sticky bottom-0 border-t border-slate-100 bg-white/95 p-4 backdrop-blur"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          {receipt ? (
            <p className="flex min-h-16 items-center justify-center rounded-2xl bg-emerald-50 px-4 text-center text-base font-bold text-emerald-800">
              Completed ·{" "}
              {new Date(receipt.completedAt).toLocaleString(undefined, {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          ) : (
            <SwipeToComplete
              label="Swipe to complete"
              hindi="पूरा करने के लिए स्वाइप करें"
              disabled={needsQuiz}
              disabledLabel="Answer the quick check first"
              onComplete={handleComplete}
            />
          )}
        </div>
      </article>

      <SuccessOverlay open={celebrating} />
    </div>
  );
}
