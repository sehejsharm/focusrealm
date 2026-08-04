"use client";

import { useMemo, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import type { QuizQuestion } from "@/lib/types";

interface Props {
  questions: QuizQuestion[];
  passed: boolean;
  onPass: () => void;
}

/** The quick verification quiz the spec requires before some modules complete. */
export default function VerificationQuiz({ questions, passed, onPass }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const allAnswered = questions.every((q) => answers[q.id]);
  const wrong = useMemo(
    () =>
      questions.filter((q) => {
        const chosen = q.options.find((o) => o.id === answers[q.id]);
        return !chosen?.correct;
      }),
    [questions, answers],
  );

  const submit = () => {
    setChecked(true);
    if (wrong.length === 0) onPass();
  };

  const retry = () => {
    setAnswers({});
    setChecked(false);
  };

  if (passed) {
    return (
      <div className="flex min-h-16 items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 ring-1 ring-emerald-200">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="size-6" strokeWidth={3} aria-hidden />
        </span>
        <p className="text-base leading-tight font-bold text-emerald-900">
          Quiz passed
          <span className="block text-xs font-medium text-emerald-700">
            आप पास हुए
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {questions.map((question, index) => {
        const chosenId = answers[question.id];
        const isWrong = checked && wrong.some((q) => q.id === question.id);

        return (
          <fieldset key={question.id} className="space-y-2">
            <legend className="mb-2 flex items-start gap-2.5 text-base font-bold text-slate-900">
              <span
                className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-900 font-mono text-sm text-white"
                aria-hidden
              >
                {index + 1}
              </span>
              <span className="text-pretty">{question.prompt}</span>
            </legend>

            {question.options.map((option) => {
              const selected = chosenId === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setChecked(false);
                    setAnswers((prev) => ({
                      ...prev,
                      [question.id]: option.id,
                    }));
                  }}
                  className={`flex min-h-14 w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-base font-semibold transition-colors ${
                    selected
                      ? isWrong
                        ? "bg-rose-50 text-rose-900 ring-2 ring-rose-400"
                        : "bg-slate-900 text-white"
                      : "bg-white text-slate-700 ring-1 ring-slate-200 active:bg-slate-50"
                  }`}
                >
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full ${
                      selected
                        ? isWrong
                          ? "bg-rose-500 text-white"
                          : "bg-white text-slate-900"
                        : "ring-2 ring-slate-300"
                    }`}
                    aria-hidden
                  >
                    {selected &&
                      (isWrong ? (
                        <X className="size-4" strokeWidth={3} />
                      ) : (
                        <Check className="size-4" strokeWidth={3} />
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
          onClick={retry}
          className="flex min-h-16 w-full items-center justify-center gap-2.5 rounded-2xl bg-rose-500 text-lg font-bold text-white active:bg-rose-600"
        >
          <RotateCcw className="size-6" aria-hidden />
          <span>
            Try again
            <span className="block text-xs font-medium text-rose-100">
              फिर से देखें
            </span>
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={submit}
          disabled={!allAnswered}
          className="flex min-h-16 w-full items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white disabled:bg-slate-200 disabled:text-slate-400"
        >
          <span>
            Check answers
            <span className="block text-xs font-medium opacity-70">
              उत्तर जाँचें
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
