"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mic } from "lucide-react";
import StaffTabs from "@/components/StaffTabs";
import { CATEGORY_LABEL, SOPS } from "@/lib/data";
import { CATEGORY_STYLE } from "@/lib/ui";
import type { Category } from "@/lib/types";

const CATEGORIES: Category[] = ["rooms", "food", "maintenance", "guest"];

/** Low-friction discovery: a 2x2 grid of picture tiles instead of search. */
export default function DirectoryPage() {
  const [open, setOpen] = useState<Category | null>(null);
  const [listening, setListening] = useState(false);

  const sops = useMemo(
    () => (open ? SOPS.filter((sop) => sop.category === open) : []),
    [open],
  );

  return (
    <div className="relative flex min-h-full flex-col gap-5 p-4 pb-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-stone-500">Find a standard</p>
          <h1 className="text-2xl font-black tracking-tight text-stone-900">
            Directory
          </h1>
        </div>
        <StaffTabs />
      </div>

      {open ? (
        <section className="space-y-3">
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="flex min-h-12 items-center gap-2 text-sm font-bold text-stone-600"
          >
            <ArrowLeft className="size-5" aria-hidden />
            All categories
          </button>

          <h2 className="text-lg font-black text-stone-900">
            {CATEGORY_LABEL[open]}
          </h2>

          <ul className="space-y-3">
            {sops.map((sop) => {
              const { Icon, solid, tint, text } = CATEGORY_STYLE[sop.category];
              return (
                <li key={sop.id}>
                  <Link
                    href={`/staff/sop/${sop.id}`}
                    className="flex min-h-20 items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4 active:bg-stone-50"
                  >
                    <span
                      className={`flex size-14 shrink-0 items-center justify-center rounded-full ${solid}`}
                    >
                      <Icon className="size-7 text-white" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-base font-bold text-stone-900">
                        {sop.title}
                      </span>
                      <span
                        className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-bold ${tint} ${text}`}
                      >
                        {sop.location}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : (
        <div className="grid flex-1 grid-cols-2 gap-4">
          {CATEGORIES.map((category) => {
            const { Icon, solid } = CATEGORY_STYLE[category];
            return (
              <button
                key={category}
                type="button"
                onClick={() => setOpen(category)}
                className={`flex min-h-40 flex-col items-center justify-center gap-3 rounded-3xl ${solid} p-4 text-white active:opacity-90`}
              >
                <Icon className="size-12" aria-hidden />
                <span className="text-lg font-black">
                  {CATEGORY_LABEL[category]}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setListening(true);
          window.setTimeout(() => setListening(false), 1600);
        }}
        aria-label="Search by voice"
        className={`absolute right-6 bottom-6 z-30 flex size-16 items-center justify-center rounded-full shadow-xl transition-colors ${
          listening ? "bg-rose-500" : "bg-emerald-500"
        } text-white`}
      >
        <Mic className="size-7" aria-hidden />
        {listening && (
          <span className="absolute inset-0 animate-ping rounded-full bg-rose-400/60" />
        )}
      </button>
    </div>
  );
}
