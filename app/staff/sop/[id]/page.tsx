"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, PlayCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import SwipeToComplete from "@/components/SwipeToComplete";
import { getSop } from "@/lib/data";
import { CATEGORY_STYLE } from "@/lib/ui";
import { useStaffProgress } from "@/lib/store";

type Stage = "watch" | "verify" | "done";

export default function SopExecutionPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const sop = getSop(params.id);
  const { complete } = useStaffProgress();
  const [stage, setStage] = useState<Stage>("watch");
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);

  if (!sop) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-lg font-bold text-stone-900">Task not found</p>
        <Link
          href="/staff"
          className="flex min-h-14 items-center rounded-xl bg-stone-900 px-5 font-bold text-white"
        >
          Back to Today
        </Link>
      </div>
    );
  }

  const { Icon, solid } = CATEGORY_STYLE[sop.category];

  const handleFinish = () => {
    complete(sop.id);
    setStage("done");
    window.setTimeout(() => router.push("/staff"), 1400);
  };

  return (
    <div className="flex min-h-full flex-col gap-5 p-4 pb-8">
      <button
        type="button"
        onClick={() => router.push("/staff")}
        className="flex min-h-12 items-center gap-2 text-sm font-bold text-stone-600"
      >
        <ArrowLeft className="size-5" aria-hidden />
        Back
      </button>

      {stage === "done" ? (
        <div className="mise-pop flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
          <CheckCircle2 className="size-28 text-emerald-500" aria-hidden />
          <h1 className="text-2xl font-black text-stone-900">Nice work!</h1>
          <p className="text-sm font-medium text-stone-500">
            {sop.title} logged as complete.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <span
              className={`flex size-16 shrink-0 items-center justify-center rounded-full ${solid}`}
            >
              <Icon className="size-8 text-white" aria-hidden />
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl leading-tight font-black text-stone-900">
                {sop.title}
              </h1>
              <p className="text-sm font-semibold text-stone-500">
                {sop.location}
              </p>
            </div>
          </div>

          {stage === "watch" && (
            <>
              <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-stone-900 text-white">
                <PlayCircle className="size-16" aria-hidden />
              </div>

              <ul className="space-y-3">
                {sop.checklist.map((step, index) => (
                  <li
                    key={step}
                    className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-4"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm font-black text-white">
                      {index + 1}
                    </span>
                    <span className="text-lg leading-snug font-bold text-stone-900">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setStage("verify")}
                className="mt-auto flex min-h-16 items-center justify-center rounded-full bg-stone-900 text-lg font-black text-white"
              >
                I&apos;m done — verify
              </button>
            </>
          )}

          {stage === "verify" && (
            <div className="flex flex-1 flex-col gap-6">
              <p className="text-center text-2xl leading-snug font-black text-stone-900">
                {sop.verifyQuestion}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAnswer("yes")}
                  className={`flex min-h-32 flex-col items-center justify-center gap-2 rounded-3xl border-4 text-xl font-black transition-colors ${
                    answer === "yes"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-stone-200 bg-white text-stone-700"
                  }`}
                >
                  <ThumbsUp className="size-10" aria-hidden />
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setAnswer("no")}
                  className={`flex min-h-32 flex-col items-center justify-center gap-2 rounded-3xl border-4 text-xl font-black transition-colors ${
                    answer === "no"
                      ? "border-rose-500 bg-rose-50 text-rose-700"
                      : "border-stone-200 bg-white text-stone-700"
                  }`}
                >
                  <ThumbsDown className="size-10" aria-hidden />
                  No
                </button>
              </div>

              {answer === "no" && (
                <p className="rounded-xl bg-amber-50 p-3 text-center text-sm font-bold text-amber-800">
                  Finish the checklist above before you swipe to complete.
                </p>
              )}

              <div className="mt-auto">
                <SwipeToComplete
                  label="Swipe right to complete"
                  onComplete={handleFinish}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
