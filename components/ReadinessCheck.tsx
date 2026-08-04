"use client";

import { useMemo, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import type { QuizQuestion } from "@/lib/types";

interface Props {
  questions: QuizQuestion[];
  passed: boolean;
  onPass: () => void;
}

/** The inline multiple-choice check that closes an operating brief. */
export default function ReadinessCheck({ questions, passed, onPass }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const allAnswered = questions.every((q) => answers[q.id]);
  const wrong = useMemo(
    () =>
      questions.filter(
        (q) => !q.options.find((o) => o.id === answers[q.id])?.correct,
      ),
    [questions, answers],
  );

  if (passed) {
    return (
      <div className="flex min-h-14 items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 ring-1 ring-emerald-200">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="size-5" strokeWidth={3} aria-hidden />
        </span>
        <p className="text-sm font-bold text-emerald-900">Readiness check passed</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question, index) => {
        const chosen = answers[question.id];
        const isWrong = checked && wrong.some((q) => q.id === question.id);

        return (
          <fieldset key={question.id} className="space-y-2">
            <legend className="mb-2 flex items-start gap-2.5 text-sm font-bold text-stone-900">
              <span
                className="mt-px flex size-6 shrink-0 items-center justify-center rounded-md bg-stone-900 font-mono text-xs text-white"
                aria-hidden
              >
                {index + 1}
              </span>
              <span className="text-pretty">{question.prompt}</span>
            </legend>

            {question.options.map((option) => {
              const selected = chosen === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setChecked(false);
                    setAnswers((prev) => ({ ...prev, [question.id]: option.id }));
                  }}
                  className={`flex min-h-14 w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold transition-colors ${
                    selected
                      ? isWrong
                        ? "bg-rose-50 text-rose-900 ring-2 ring-rose-400"
                        : "bg-stone-900 text-white"
                      : "bg-white text-stone-700 ring-1 ring-stone-200 hover:bg-stone-50"
                  }`}
                >
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
                      selected
                        ? isWrong
                          ? "bg-rose-500 text-white"
                          : "bg-white text-stone-900"
                        : "ring-2 ring-stone-300"
                    }`}
                    aria-hidden
                  >
                    {selected &&
                      (isWrong ? (
                        <X className="size-3.5" strokeWidth={3} />
                      ) : (
                        <Check className="size-3.5" strokeWidth={3} />
                      ))}
                  </span>
                  <span className="text-pretty">{option.label}</span>
                </button>
              );
            })}
          </fieldset>
        );
      })}

      {checked && wrong.length > 0 ? (
        <button
          type="button"
          onClick={() => {
            setAnswers({});
            setChecked(false);
          }}
          className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-rose-500 text-sm font-bold text-white active:bg-rose-600"
        >
          <RotateCcw className="size-5" aria-hidden />
          {wrong.length} to review — try again
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            setChecked(true);
            if (wrong.length === 0) onPass();
          }}
          disabled={!allAnswered}
          className="flex min-h-14 w-full items-center justify-center rounded-xl bg-stone-900 text-sm font-bold text-white disabled:bg-stone-200 disabled:text-stone-400"
        >
          Submit readiness check
        </button>
      )}
    </div>
  );
}
