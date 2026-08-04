"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Lock } from "lucide-react";
import type { RoleKey } from "@/lib/types";

const ROLES: { key: RoleKey; label: string; detail: string }[] = [
  { key: "staff", label: "Staff", detail: "Run the shift" },
  { key: "manager", label: "Manager", detail: "Track the floor" },
  { key: "author", label: "Author", detail: "Write the standards" },
];

/**
 * The role toggle that sits at the top of the sidebar. Only the Staff role is
 * built here; the other two are listed so the switch reads honestly.
 */
export default function RoleSwitcher({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex min-h-14 w-full items-center gap-2.5 rounded-xl px-3 text-left transition-colors ${
          dark
            ? "bg-white/10 text-white hover:bg-white/15"
            : "bg-stone-100 text-stone-900 hover:bg-stone-200"
        }`}
      >
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-sm font-black text-white"
          aria-hidden
        >
          M
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm leading-tight font-bold">Mise</span>
          <span
            className={`block truncate text-xs leading-tight font-medium ${
              dark ? "text-white/60" : "text-stone-500"
            }`}
          >
            Staff role
          </span>
        </span>
        <ChevronsUpDown className="size-4 shrink-0 opacity-60" aria-hidden />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close role menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <ul
            role="menu"
            className="absolute z-50 mt-2 w-full min-w-56 overflow-hidden rounded-2xl border border-stone-200 bg-white p-1.5 shadow-xl"
          >
            {ROLES.map((role) => {
              const current = role.key === "staff";
              return (
                <li key={role.key}>
                  <button
                    type="button"
                    role="menuitem"
                    disabled={!current}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-14 w-full items-center gap-3 rounded-xl px-3 text-left ${
                      current
                        ? "bg-stone-100 text-stone-900"
                        : "text-stone-400 cursor-not-allowed"
                    }`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold">{role.label}</span>
                      <span className="block text-xs font-medium opacity-70">
                        {current ? role.detail : "Not part of this build"}
                      </span>
                    </span>
                    {current ? (
                      <Check className="size-5 shrink-0 text-emerald-600" aria-hidden />
                    ) : (
                      <Lock className="size-4 shrink-0" aria-hidden />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
