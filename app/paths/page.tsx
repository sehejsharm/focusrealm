import Link from "next/link";
import { Check, ChevronRight, Lock, Play } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SubNav from "@/components/SubNav";
import { JOB_ROLE_LABEL, PATH, getSop } from "@/lib/data";

/** A locked, sequential curriculum unlocked step by step by supervisor sign-off. */
export default function PathsPage() {
  const verified = PATH.steps.filter((s) => s.state === "verified").length;

  return (
    <div>
      <PageHeader
        title="Paths"
        subtitle={`${JOB_ROLE_LABEL[PATH.jobRole]} · unlocked step by step by your supervisor.`}
      />
      <SubNav />

      <section className="mb-5 rounded-2xl border border-stone-200 bg-white p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-lg font-black text-stone-900">{PATH.title}</h2>
          <p className="font-mono text-sm font-black text-stone-900">
            {verified}
            <span className="text-stone-400">/{PATH.steps.length}</span>
          </p>
        </div>
        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-stone-200"
          role="img"
          aria-label={`${verified} of ${PATH.steps.length} steps verified`}
        >
          <div
            className="h-full rounded-full bg-emerald-500 transition-[width] duration-500"
            style={{ width: `${(verified / PATH.steps.length) * 100}%` }}
          />
        </div>
      </section>

      <ol className="space-y-3">
        {PATH.steps.map((step, index) => {
          const sop = getSop(step.sopId);
          const locked = step.state === "locked";
          const done = step.state === "verified";

          return (
            <li key={step.id}>
              <article
                className={`overflow-hidden rounded-2xl border ${
                  locked
                    ? "border-stone-200 bg-stone-50"
                    : "border-stone-200 bg-white"
                }`}
              >
                <div className="flex items-start gap-3 p-4">
                  <span
                    className={`flex size-11 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-black ${
                      done
                        ? "bg-emerald-500 text-white"
                        : locked
                          ? "bg-stone-200 text-stone-400"
                          : "bg-amber-500 text-white"
                    }`}
                    aria-hidden
                  >
                    {done ? (
                      <Check className="size-5" strokeWidth={3} />
                    ) : locked ? (
                      <Lock className="size-4" />
                    ) : (
                      index + 1
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h2
                      className={`text-base leading-snug font-bold text-balance ${
                        locked ? "text-stone-400" : "text-stone-900"
                      }`}
                    >
                      {step.title}
                    </h2>
                    {sop && (
                      <p className="mt-0.5 font-mono text-xs font-bold text-stone-400">
                        {sop.code}
                      </p>
                    )}

                    {done && step.signedOffBy && (
                      <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
                        Signed off by {step.signedOffBy} · {step.signedOffAt}
                      </p>
                    )}
                    {step.state === "active" && (
                      <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">
                        Open now — awaiting your run
                      </p>
                    )}
                    {locked && (
                      <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-stone-100 px-2.5 py-1 text-[11px] font-bold text-stone-500">
                        <Lock className="size-3" aria-hidden />
                        Unlocks after the previous step is signed off
                      </p>
                    )}
                  </div>
                </div>

                {!locked && sop && (
                  <div className="border-t border-stone-100 p-3">
                    <Link
                      href={done ? `/sop/${sop.id}` : `/sop/${sop.id}/practice`}
                      className={`flex min-h-14 items-center justify-between gap-2 rounded-xl px-4 text-sm font-bold ${
                        done
                          ? "bg-stone-100 text-stone-700 hover:bg-stone-200"
                          : "bg-stone-900 text-white hover:bg-stone-800"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {!done && <Play className="size-5" aria-hidden />}
                        {done ? "Review standard" : "Start this step"}
                      </span>
                      <ChevronRight className="size-5 shrink-0" aria-hidden />
                    </Link>
                  </div>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
