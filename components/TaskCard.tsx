"use client";

import Link from "next/link";
import { Check, ChevronRight, ClipboardCheck, Clock, MapPin } from "lucide-react";
import type { SopModule, TaskStatus } from "@/lib/types";
import { CATEGORY_ICON, CATEGORY_TINT } from "@/lib/icons";
import { STATUS } from "@/lib/status";

interface Props {
  sop: SopModule;
  status: TaskStatus;
  completedAt?: string;
  /** Rendered as the card's primary action for modules already opened. */
  action?: React.ReactNode;
}

function formatStamp(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TaskCard({
  sop,
  status,
  completedAt,
  action,
}: Props) {
  const Icon = CATEGORY_ICON[sop.category];
  const tone = STATUS[status];
  const href = `/staff/tasks/${sop.id}`;

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className={`h-2 w-full ${tone.solid}`} aria-hidden />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-start gap-4">
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
          </div>

          <span
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${tone.tint} ${tone.text}`}
          >
            <span className={`size-2 rounded-full ${tone.solid}`} aria-hidden />
            {tone.label}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1">
            <MapPin className="size-3.5" aria-hidden />
            {sop.location}
          </span>
          <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1">
            {sop.department}
          </span>
          {sop.quiz && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1">
              <ClipboardCheck className="size-3.5" aria-hidden />
              Quiz
            </span>
          )}
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

        <div className="mt-auto pt-1">
          {status === "completed" && completedAt ? (
            <div className="flex min-h-14 items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check className="size-5" strokeWidth={3} aria-hidden />
              </span>
              <span className="text-sm leading-tight font-semibold text-emerald-900">
                Read receipt
                <span className="block text-xs font-medium text-emerald-700">
                  {formatStamp(completedAt)}
                </span>
              </span>
            </div>
          ) : (
            (action ?? (
              <Link
                href={href}
                className="flex min-h-14 w-full items-center justify-between gap-2 rounded-2xl bg-slate-900 px-5 text-base font-bold text-white transition-colors hover:bg-slate-800 active:bg-slate-700"
              >
                <span>
                  Open
                  <span className="block text-xs font-medium text-slate-300">
                    खोलें
                  </span>
                </span>
                <ChevronRight className="size-6 shrink-0" aria-hidden />
              </Link>
            ))
          )}
        </div>
      </div>
    </article>
  );
}
