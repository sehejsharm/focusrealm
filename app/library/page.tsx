"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, ChevronRight, Search, Star, Timer, X } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { HASHTAGS, JOB_ROLE_LABEL, SOPS, STAFF, stepCount } from "@/lib/data";
import { JOB_ROLE_ICON } from "@/lib/ui";
import type { JobRole } from "@/lib/types";

const ROLES = Object.keys(JOB_ROLE_LABEL) as JobRole[];

/** The standards library: search, filter by job role or hashtag, open a SOP. */
export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<JobRole | "all">(STAFF.jobRole);
  const [tag, setTag] = useState<string | null>(null);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return SOPS.filter((sop) => {
      if (role !== "all" && sop.jobRole !== role) return false;
      if (tag && !sop.hashtags.includes(tag)) return false;
      if (!needle) return true;
      return (
        sop.title.toLowerCase().includes(needle) ||
        sop.code.toLowerCase().includes(needle) ||
        sop.summary.toLowerCase().includes(needle) ||
        sop.hashtags.some((h) => h.includes(needle))
      );
    });
  }, [query, role, tag]);

  const filtered = role !== "all" || tag !== null || query.trim() !== "";

  return (
    <div>
      <PageHeader
        title="SOPs"
        subtitle="The standards behind every task on your floor."
      />

      {/* Search */}
      <div className="relative mb-3">
        <Search
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-stone-400"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search standards"
          aria-label="Search standards"
          className="min-h-14 w-full rounded-xl border border-stone-200 bg-white pr-4 pl-12 text-base font-medium text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10 focus:outline-none"
        />
      </div>

      {/* Job role filter */}
      <div className="no-scrollbar -mx-4 mb-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
        <ul className="flex w-max gap-2">
          <li>
            <button
              type="button"
              onClick={() => setRole("all")}
              aria-pressed={role === "all"}
              className={`flex min-h-14 items-center rounded-xl px-4 text-sm font-bold whitespace-nowrap ${
                role === "all"
                  ? "bg-stone-900 text-white"
                  : "bg-white text-stone-600 ring-1 ring-stone-200"
              }`}
            >
              All roles
            </button>
          </li>
          {ROLES.map((key) => {
            const Icon = JOB_ROLE_ICON[key];
            const active = role === key;
            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => setRole(key)}
                  aria-pressed={active}
                  className={`flex min-h-14 items-center gap-2 rounded-xl px-4 text-sm font-bold whitespace-nowrap ${
                    active
                      ? "bg-stone-900 text-white"
                      : "bg-white text-stone-600 ring-1 ring-stone-200"
                  }`}
                >
                  <Icon className="size-4" aria-hidden />
                  {JOB_ROLE_LABEL[key]}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Hashtag filter */}
      <div className="no-scrollbar -mx-4 mb-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
        <ul className="flex w-max gap-2 py-1">
          {HASHTAGS.map((hashtag) => {
            const active = tag === hashtag;
            return (
              <li key={hashtag}>
                <button
                  type="button"
                  onClick={() => setTag(active ? null : hashtag)}
                  aria-pressed={active}
                  className={`flex min-h-14 items-center rounded-xl px-3.5 font-mono text-xs font-bold whitespace-nowrap ${
                    active
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-stone-500 ring-1 ring-stone-200"
                  }`}
                >
                  {hashtag}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-stone-500">
          {results.length} standard{results.length === 1 ? "" : "s"}
        </p>
        {filtered && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setRole("all");
              setTag(null);
            }}
            className="flex min-h-14 items-center gap-1.5 rounded-xl px-3 text-sm font-bold text-stone-500 hover:bg-stone-100"
          >
            <X className="size-4" aria-hidden />
            Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center">
          <p className="text-base font-bold text-stone-900">No standards match</p>
          <p className="mt-1 text-sm text-stone-500">
            Try a different role, tag, or search term.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((sop) => {
            const Icon = JOB_ROLE_ICON[sop.jobRole];
            return (
              <li key={sop.id} className="flex">
                <article className="flex w-full flex-col rounded-2xl border border-stone-200 bg-white p-4">
                  <div className="flex items-start gap-3">
                    <span
                      className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-700"
                      aria-hidden
                    >
                      <Icon className="size-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-sm font-black text-stone-900">
                        {sop.code}
                      </p>
                      <h2 className="text-base leading-snug font-bold text-balance text-stone-800">
                        {sop.title}
                      </h2>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-snug text-pretty text-stone-500">
                    {sop.summary}
                  </p>

                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {sop.hashtags.map((hashtag) => (
                      <li
                        key={hashtag}
                        className="rounded-md bg-stone-100 px-2 py-0.5 font-mono text-[11px] font-bold text-stone-500"
                      >
                        {hashtag}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-bold text-stone-500">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="size-4 text-stone-400" aria-hidden />
                      <dt className="sr-only">Read time</dt>
                      <dd>{sop.readMinutes} min read</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Timer className="size-4 text-stone-400" aria-hidden />
                      <dt className="sr-only">Target time</dt>
                      <dd>{sop.targetMinutes} min target</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="size-4 text-amber-500" aria-hidden />
                      <dt className="sr-only">Quality score</dt>
                      <dd>{sop.qualityScore}% quality</dd>
                    </div>
                    <div>
                      <dt className="sr-only">Times used</dt>
                      <dd>{sop.usageCount.toLocaleString()} runs</dd>
                    </div>
                  </dl>

                  <p className="mt-2 text-xs font-medium text-stone-400">
                    {stepCount(sop)} steps across 4 phases
                  </p>

                  <Link
                    href={`/sop/${sop.id}`}
                    className="mt-4 flex min-h-14 items-center justify-between gap-2 rounded-xl bg-stone-900 px-4 text-sm font-bold text-white hover:bg-stone-800"
                  >
                    Open SOP
                    <ChevronRight className="size-5 shrink-0" aria-hidden />
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
