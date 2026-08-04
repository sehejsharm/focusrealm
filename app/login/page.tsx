"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PinPad from "@/components/PinPad";
import { STAFF } from "@/lib/data";
import { useStore } from "@/lib/store";
import type { StaffMember } from "@/lib/types";

/** Quick login: tap your face, enter 4 digits. No usernames, no passwords. */
export default function LoginPage() {
  const router = useRouter();
  const { ready, staffId, signIn } = useStore();
  const [selected, setSelected] = useState<StaffMember | null>(null);

  useEffect(() => {
    if (ready && staffId) router.replace("/staff/tasks");
  }, [ready, staffId, router]);

  const handlePin = useCallback(
    (pin: string) => {
      if (!selected || pin !== selected.pin) return false;
      signIn(selected.id);
      router.replace("/staff/tasks");
      return true;
    },
    [selected, signIn, router],
  );

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <span
            className="flex size-16 items-center justify-center rounded-2xl bg-slate-900"
            aria-hidden
          >
            <span className="block size-6 rounded-full bg-white ring-6 ring-white/25" />
          </span>
          <h1 className="text-center text-2xl font-black tracking-tight text-slate-900">
            Focus Realm
          </h1>
        </div>

        {!selected ? (
          <>
            <p className="mb-4 text-center text-base font-bold text-slate-600">
              Tap your photo
              <span className="block text-sm font-medium text-slate-400">
                अपनी फ़ोटो दबाएँ
              </span>
            </p>

            <ul className="grid grid-cols-2 gap-3">
              {STAFF.map((member) => (
                <li key={member.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(member)}
                    className="flex min-h-16 w-full flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 active:bg-slate-50"
                  >
                    <span
                      className={`flex size-16 items-center justify-center rounded-full text-xl font-black text-white ${member.avatarClass}`}
                      aria-hidden
                    >
                      {member.initials}
                    </span>
                    <span className="text-sm leading-tight font-bold text-slate-900">
                      {member.name}
                      <span className="block text-xs font-medium text-slate-500">
                        {member.department}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Back to profiles"
                className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 active:bg-slate-50"
              >
                <ArrowLeft className="size-7" aria-hidden />
              </button>

              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  className={`flex size-12 shrink-0 items-center justify-center rounded-full text-base font-black text-white ${selected.avatarClass}`}
                  aria-hidden
                >
                  {selected.initials}
                </span>
                <span className="min-w-0 text-base leading-tight font-bold text-slate-900">
                  {selected.name}
                  <span className="block text-xs font-medium text-slate-500">
                    PIN डालें
                  </span>
                </span>
              </div>
            </div>

            <PinPad onSubmit={handlePin} />

            <p className="mt-6 text-center text-xs font-medium text-slate-400">
              Demo PIN · {selected.pin}
            </p>
          </>
        )}
      </div>
    </main>
  );
}
