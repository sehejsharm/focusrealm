"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Camera,
  ChevronRight,
  GraduationCap,
  Info,
  MessageSquare,
  Play,
  PlayCircle,
  Star,
  Timer,
} from "lucide-react";
import { FORUM_THREADS, getCourseForSop, getSop, stepCount } from "@/lib/data";
import { JOB_ROLE_ICON, PHASE_LABEL, PHASE_ORDER } from "@/lib/ui";
import { JOB_ROLE_LABEL } from "@/lib/data";

/** Review details for one standard, before running it on the floor. */
export default function SopPage() {
  const params = useParams<{ id: string }>();
  const sop = getSop(params.id);

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

  const Icon = JOB_ROLE_ICON[sop.jobRole];
  const course = getCourseForSop(sop.id);
  const threads = FORUM_THREADS.filter((t) => t.sopId === sop.id);

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/library"
        className="mb-4 inline-flex min-h-14 items-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-stone-700 ring-1 ring-stone-200 hover:bg-stone-50"
      >
        <ArrowLeft className="size-5" aria-hidden />
        SOPs
      </Link>

      <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        <header className="flex items-start gap-4 p-5">
          <span
            className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-stone-100 text-stone-700"
            aria-hidden
          >
            <Icon className="size-9" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-base font-black text-stone-900">
              {sop.code}
            </p>
            <h1 className="mt-0.5 text-2xl leading-tight font-black text-balance text-stone-900">
              {sop.title}
            </h1>
            <p className="mt-1 text-sm font-semibold text-stone-500">
              {JOB_ROLE_LABEL[sop.jobRole]}
            </p>
          </div>
        </header>

        <p className="px-5 text-base leading-relaxed text-pretty text-stone-600">
          {sop.summary}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-px border-y border-stone-100 bg-stone-100 sm:grid-cols-4">
          <div className="bg-white p-4">
            <dt className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400 uppercase">
              <Timer className="size-3.5" aria-hidden />
              Target
            </dt>
            <dd className="mt-1 font-mono text-xl font-black text-stone-900">
              {sop.targetMinutes} min
            </dd>
          </div>
          <div className="bg-white p-4">
            <dt className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400 uppercase">
              <BookOpen className="size-3.5" aria-hidden />
              Read
            </dt>
            <dd className="mt-1 font-mono text-xl font-black text-stone-900">
              {sop.readMinutes} min
            </dd>
          </div>
          <div className="bg-white p-4">
            <dt className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400 uppercase">
              <Star className="size-3.5 text-amber-500" aria-hidden />
              Quality
            </dt>
            <dd className="mt-1 font-mono text-xl font-black text-emerald-600">
              {sop.qualityScore}%
            </dd>
          </div>
          <div className="bg-white p-4">
            <dt className="text-[11px] font-bold text-stone-400 uppercase">Steps</dt>
            <dd className="mt-1 font-mono text-xl font-black text-stone-900">
              {stepCount(sop)}
            </dd>
          </div>
        </dl>

        <div className="space-y-6 p-5">
          {PHASE_ORDER.map((phaseKey, phaseIndex) => {
            const phase = sop.phases.find((p) => p.key === phaseKey);
            if (!phase) return null;

            return (
              <section key={phaseKey}>
                <h2 className="mb-3 flex items-center gap-2.5">
                  <span
                    className="flex size-7 items-center justify-center rounded-lg bg-stone-900 font-mono text-xs font-black text-white"
                    aria-hidden
                  >
                    {phaseIndex + 1}
                  </span>
                  <span className="text-sm font-black tracking-wide text-stone-900 uppercase">
                    {PHASE_LABEL[phaseKey]}
                  </span>
                  <span className="text-xs font-bold text-stone-400">
                    {phase.steps.length} steps
                  </span>
                </h2>

                <ol className="space-y-2.5 border-l-2 border-stone-100 pl-4">
                  {phase.steps.map((step) => (
                    <li key={step.id}>
                      <p className="text-sm leading-snug font-semibold text-pretty text-stone-800">
                        {step.text}
                      </p>

                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {step.clip && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-bold text-stone-600">
                            <PlayCircle className="size-3.5" aria-hidden />
                            {step.clip}
                          </span>
                        )}
                        {step.photo && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-sky-100 px-2 py-0.5 text-[11px] font-bold text-sky-800">
                            <Camera className="size-3.5" aria-hidden />
                            Photo evidence
                          </span>
                        )}
                      </div>

                      {step.why && (
                        <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-snug text-pretty text-stone-500">
                          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                          <span>
                            <span className="font-bold">Why it matters · </span>
                            {step.why}
                          </span>
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
        </div>

        <div className="grid gap-2 border-t border-stone-100 p-4 sm:grid-cols-2">
          <Link
            href={`/sop/${sop.id}/practice`}
            className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 text-sm font-bold text-white hover:bg-stone-800"
          >
            <Play className="size-5" aria-hidden />
            Start task runner
          </Link>
          {course && (
            <Link
              href="/courses"
              className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-stone-100 px-4 text-sm font-bold text-stone-700 hover:bg-stone-200"
            >
              <GraduationCap className="size-5" aria-hidden />
              Open the brief
            </Link>
          )}
        </div>
      </article>

      {threads.length > 0 && (
        <section aria-labelledby="questions" className="mt-6">
          <h2 id="questions" className="mb-3 text-lg font-black text-stone-900">
            Questions on this standard
          </h2>
          <ul className="space-y-2">
            {threads.map((thread) => (
              <li key={thread.id}>
                <Link
                  href="/forums"
                  className="flex min-h-14 items-center gap-3 rounded-xl border border-stone-200 bg-white p-4 hover:bg-stone-50"
                >
                  <MessageSquare className="size-5 shrink-0 text-stone-400" aria-hidden />
                  <span className="min-w-0 flex-1 text-sm leading-snug font-semibold text-pretty text-stone-800">
                    {thread.question}
                    <span className="mt-0.5 block text-xs font-medium text-stone-400">
                      {thread.posts.length} replies
                    </span>
                  </span>
                  <ChevronRight className="size-5 shrink-0 text-stone-400" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
