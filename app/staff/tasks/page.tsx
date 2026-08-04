"use client";

import { useMemo, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import TaskCard from "@/components/TaskCard";
import SwipeToComplete from "@/components/SwipeToComplete";
import SuccessOverlay from "@/components/SuccessOverlay";
import { getStaff, modulesForStaff } from "@/lib/data";
import { useStore } from "@/lib/store";
import { STATUS_ORDER } from "@/lib/status";

/**
 * The staff dashboard: Priority Assigned SOPs and Tasks only.
 * No catalog, no search — completing a module clears it from this queue.
 */
export default function TasksPage() {
  const { staffId, statusOf, quizPassed, complete } = useStore();
  const [celebrating, setCelebrating] = useState(false);
  const staff = getStaff(staffId);

  const queue = useMemo(() => {
    if (!staff) return [];
    return modulesForStaff(staff)
      .filter((sop) => statusOf(sop) !== "completed")
      .sort(
        (a, b) => STATUS_ORDER[statusOf(a)] - STATUS_ORDER[statusOf(b)],
      );
  }, [staff, statusOf]);

  if (!staff) return null;

  const handleComplete = (moduleId: string) => {
    complete(moduleId);
    setCelebrating(true);
    window.setTimeout(() => setCelebrating(false), 1100);
  };

  return (
    <>
      <div className="mb-5 flex items-baseline justify-between gap-3">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Your tasks
          <span className="block text-sm font-medium text-slate-500">
            आपके कार्य
          </span>
        </h1>
        <span className="font-mono text-3xl font-black text-slate-900">
          {queue.length}
        </span>
      </div>

      {queue.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center">
          <span className="flex size-20 items-center justify-center rounded-full bg-emerald-50">
            <CircleCheckBig className="size-11 text-emerald-500" aria-hidden />
          </span>
          <p className="text-xl font-black text-slate-900">
            All clear
            <span className="mt-1 block text-sm font-medium text-slate-500">
              सब पूरा — अभी कोई कार्य नहीं
            </span>
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {queue.map((sop) => {
            const status = statusOf(sop);
            const needsQuiz = Boolean(sop.quiz) && !quizPassed[sop.id];
            const canSwipe = status === "active" && !needsQuiz;

            return (
              <li key={sop.id} className="flex">
                <div className="flex w-full">
                  <TaskCard
                    sop={sop}
                    status={status}
                    action={
                      canSwipe ? (
                        <SwipeToComplete
                          label="Swipe to complete"
                          hindi="पूरा करने के लिए स्वाइप करें"
                          onComplete={() => handleComplete(sop.id)}
                        />
                      ) : undefined
                    }
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <SuccessOverlay open={celebrating} />
    </>
  );
}
