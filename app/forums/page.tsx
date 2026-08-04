import Link from "next/link";
import { ChevronRight, MessageSquare } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SubNav from "@/components/SubNav";
import { FORUM_THREADS, getSop } from "@/lib/data";

/** Per-SOP Q&A: shift-specific questions tied back to a standard. */
export default function ForumsPage() {
  return (
    <div>
      <PageHeader
        title="Forums"
        subtitle="Questions about a standard, answered by your supervisor."
      />
      <SubNav />

      <ul className="space-y-4">
        {FORUM_THREADS.map((thread) => {
          const sop = getSop(thread.sopId);

          return (
            <li key={thread.id}>
              <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
                <header className="border-b border-stone-100 p-4">
                  {sop && (
                    <Link
                      href={`/sop/${sop.id}`}
                      className="-mx-2 inline-flex min-h-14 items-center gap-1 rounded-lg px-2 font-mono text-xs font-bold text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                    >
                      {sop.code} · {sop.title}
                      <ChevronRight className="size-3.5" aria-hidden />
                    </Link>
                  )}
                  <h2 className="mt-1.5 flex items-start gap-2 text-base leading-snug font-bold text-balance text-stone-900">
                    <MessageSquare
                      className="mt-0.5 size-5 shrink-0 text-stone-400"
                      aria-hidden
                    />
                    {thread.question}
                  </h2>
                </header>

                <ul className="divide-y divide-stone-100">
                  {thread.posts.map((post) => (
                    <li key={post.id} className="flex gap-3 p-4">
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${
                          post.role === "Supervisor"
                            ? "bg-stone-800"
                            : "bg-emerald-600"
                        }`}
                        aria-hidden
                      >
                        {post.initials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                          <span className="text-sm font-bold text-stone-900">
                            {post.author}
                          </span>
                          <span
                            className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                              post.role === "Supervisor"
                                ? "bg-stone-900 text-white"
                                : "bg-stone-100 text-stone-500"
                            }`}
                          >
                            {post.role}
                          </span>
                          <span className="text-xs font-medium text-stone-400">
                            {post.at}
                          </span>
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-pretty text-stone-600">
                          {post.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
