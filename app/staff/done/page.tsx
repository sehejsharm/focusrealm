"use client";

import { useMemo } from "react";
import { Check, Clock } from "lucide-react";
import { getModule, getStaff } from "@/lib/data";
import { CATEGORY_ICON, CATEGORY_TINT } from "@/lib/icons";
import { useStore } from "@/lib/store";

function formatStamp(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Timestamped Read Receipts — the staff-side view of the audit trail. */
export default function DonePage() {
  const { staffId, receipts } = useStore();
  const staff = getStaff(staffId);

  const rows = useMemo(
    () =>
      receipts
        .filter((receipt) => receipt.staffId === staffId)
        .flatMap((receipt) => {
          const sop = getModule(receipt.moduleId);
          return sop ? [{ receipt, sop }] : [];
        }),
    [receipts, staffId],
  );

  if (!staff) return null;

  return (
    <>
      <div className="mb-5 flex items-baseline justify-between gap-3">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Completed
          <span className="block text-sm font-medium text-slate-500">
            पूर्ण
          </span>
        </h1>
        <span className="font-mono text-3xl font-black text-slate-900">
          {rows.length}
        </span>
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center">
          <span className="flex size-20 items-center justify-center rounded-full bg-slate-100">
            <Clock className="size-11 text-slate-400" aria-hidden />
          </span>
          <p className="text-xl font-black text-slate-900">
            Nothing yet
            <span className="mt-1 block text-sm font-medium text-slate-500">
              अभी कुछ नहीं
            </span>
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map(({ receipt, sop }) => {
            const Icon = CATEGORY_ICON[sop.category];
            return (
              <li key={receipt.moduleId}>
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <div className="h-2 w-full bg-emerald-500" aria-hidden />

                  <div className="flex flex-1 items-start gap-4 p-4">
                    <div
                      className={`flex size-16 shrink-0 items-center justify-center rounded-2xl ${CATEGORY_TINT[sop.category]}`}
                      aria-hidden
                    >
                      <Icon className="size-9" strokeWidth={2} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-3xl leading-none font-black tracking-tight text-slate-900">
                        {sop.code}
                      </p>
                      <h2 className="mt-1.5 text-base leading-snug font-semibold text-balance text-slate-700">
                        {sop.title}
                      </h2>
                      <p className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-800">
                        <Check className="size-4" strokeWidth={3} aria-hidden />
                        {formatStamp(receipt.completedAt)}
                      </p>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
