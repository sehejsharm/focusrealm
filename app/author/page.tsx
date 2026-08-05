"use client";

import { useRef, useState } from "react";
import { CheckCircle2, ChevronLeft, FileUp, Rocket, X } from "lucide-react";
import { DEPARTMENTS, matchingStaffCount, SHIFTS } from "@/lib/data";

const STEPS = ["Upload Media", "Details", "Deploy"];

/** The Linear Builder — a restrictive 1-2-3 wizard, nothing more. */
export default function AuthorStudioPage() {
  const [step, setStep] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [departmentId, setDepartmentId] = useState<string | null>(null);
  const [shiftId, setShiftId] = useState<string | null>(null);
  const [published, setPublished] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const canAdvance =
    step === 0 ? true : step === 1 ? title.trim().length > 0 : true;

  const matches = matchingStaffCount(departmentId, shiftId);

  const reset = () => {
    setStep(0);
    setFileName(null);
    setTitle("");
    setInstructions("");
    setDepartmentId(null);
    setShiftId(null);
    setPublished(false);
  };

  return (
    <div className="relative flex min-h-full flex-col gap-6 p-4 pb-8">
      <header>
        <p className="text-sm font-semibold text-stone-500">Studio</p>
        <h1 className="text-2xl font-black tracking-tight text-stone-900">
          {STEPS[step]}
        </h1>
      </header>

      <ol className="flex items-center gap-2">
        {STEPS.map((label, index) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                index <= step
                  ? "bg-stone-900 text-white"
                  : "bg-stone-200 text-stone-500"
              }`}
            >
              {index + 1}
            </span>
            {index < STEPS.length - 1 && (
              <span
                className={`h-1 flex-1 rounded-full ${
                  index < step ? "bg-stone-900" : "bg-stone-200"
                }`}
              />
            )}
          </li>
        ))}
      </ol>

      <div className="flex-1 space-y-5">
        {step === 0 && (
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="flex min-h-64 w-full flex-col items-center justify-center gap-3 rounded-3xl border-4 border-dashed border-stone-300 bg-white text-center"
          >
            <FileUp className="size-14 text-stone-400" aria-hidden />
            <p className="text-lg font-black text-stone-900">
              {fileName ?? "Drop a video or PDF here"}
            </p>
            <p className="text-sm font-medium text-stone-500">
              or tap to browse your files
            </p>
            <input
              ref={fileInput}
              type="file"
              accept="video/*,application/pdf"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
            />
          </button>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-stone-700">
                Title
              </span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Guest Room Reset"
                className="min-h-14 w-full rounded-2xl border border-stone-300 bg-white px-4 text-base font-semibold text-stone-900 outline-none focus:border-stone-900"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-stone-700">
                Brief Instructions
              </span>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                rows={5}
                placeholder="What should staff do, in plain language?"
                className="w-full rounded-2xl border border-stone-300 bg-white p-4 text-base font-medium text-stone-900 outline-none focus:border-stone-900"
              />
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-stone-700">
                Select Department
              </span>
              <select
                value={departmentId ?? ""}
                onChange={(e) => setDepartmentId(e.target.value || null)}
                className="min-h-14 w-full rounded-2xl border border-stone-300 bg-white px-4 text-base font-semibold text-stone-900 outline-none focus:border-stone-900"
              >
                <option value="">Select Department</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-bold text-stone-700">
                Select Shift / Location
              </span>
              <select
                value={shiftId ?? ""}
                onChange={(e) => setShiftId(e.target.value || null)}
                className="min-h-14 w-full rounded-2xl border border-stone-300 bg-white px-4 text-base font-semibold text-stone-900 outline-none focus:border-stone-900"
              >
                <option value="">Select Shift / Location</option>
                {SHIFTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            <p className="rounded-2xl bg-emerald-50 p-4 text-center text-sm font-bold text-emerald-800">
              This SOP will be deployed to {matches} matching staff members.
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="flex min-h-16 items-center justify-center gap-1 rounded-full bg-stone-100 px-5 font-bold text-stone-700"
          >
            <ChevronLeft className="size-5" aria-hidden />
            Back
          </button>
        )}

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            disabled={!canAdvance}
            onClick={() => setStep((s) => s + 1)}
            className="flex min-h-16 flex-1 items-center justify-center rounded-full bg-stone-900 text-lg font-black text-white disabled:opacity-40"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setPublished(true)}
            className="flex min-h-16 flex-1 items-center justify-center gap-2 rounded-full bg-emerald-500 text-lg font-black text-white"
          >
            <Rocket className="size-6" aria-hidden />
            Publish &amp; Deploy
          </button>
        )}
      </div>

      {published && (
        <div className="absolute inset-0 z-40 flex items-end justify-center bg-black/40 p-4 sm:items-center">
          <div className="mise-pop w-full max-w-sm space-y-4 rounded-3xl bg-white p-6 text-center">
            <button
              type="button"
              onClick={reset}
              aria-label="Close"
              className="ml-auto flex size-9 items-center justify-center rounded-full text-stone-400 hover:bg-stone-100"
            >
              <X className="size-5" aria-hidden />
            </button>
            <CheckCircle2 className="mx-auto size-16 text-emerald-500" aria-hidden />
            <h2 className="text-xl font-black text-stone-900">
              SOP published &amp; deployed
            </h2>
            <p className="text-sm font-medium text-stone-500">
              &quot;{title || "Untitled SOP"}&quot; was routed to {matches}{" "}
              matching staff members.
            </p>
            <button
              type="button"
              onClick={reset}
              className="flex min-h-14 w-full items-center justify-center rounded-full bg-stone-900 font-bold text-white"
            >
              Create another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
