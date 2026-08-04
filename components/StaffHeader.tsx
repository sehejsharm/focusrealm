"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import type { StaffMember } from "@/lib/types";
import { useStore } from "@/lib/store";
import { TopNav } from "./ResponsiveNav";
import HelpSheet from "./HelpSheet";

export default function StaffHeader({ staff }: { staff: StaffMember }) {
  const [helpOpen, setHelpOpen] = useState(false);
  const { signOut } = useStore();
  const router = useRouter();

  const handleSignOut = () => {
    setHelpOpen(false);
    signOut();
    router.replace("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-slate-900 text-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link
            href="/staff/tasks"
            className="flex min-h-14 min-w-14 items-center justify-center gap-2.5 sm:justify-start"
            aria-label="Focus Realm — Tasks"
          >
            <span
              className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20"
              aria-hidden
            >
              <span className="block size-4 rounded-full bg-white ring-4 ring-white/30" />
            </span>
            <span className="hidden text-lg leading-tight font-black tracking-tight sm:block">
              Focus
              <span className="block text-xs font-semibold text-slate-400">
                Realm
              </span>
            </span>
          </Link>

          <div className="mx-auto hidden lg:block">
            <TopNav />
          </div>

          <div className="ml-auto flex min-w-0 items-center gap-2 lg:ml-0">
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-black ${staff.avatarClass}`}
                aria-hidden
              >
                {staff.initials}
              </span>
              <span className="min-w-0 text-sm leading-tight font-bold">
                <span className="block truncate">{staff.name}</span>
                <span className="block truncate text-xs font-medium text-slate-400">
                  {staff.department}
                </span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setHelpOpen(true)}
              className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-sm active:bg-rose-600"
              aria-label="Help"
            >
              <TriangleAlert className="size-7" strokeWidth={2.5} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <HelpSheet
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        onSignOut={handleSignOut}
      />
    </>
  );
}
