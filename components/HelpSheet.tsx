"use client";

import { LogOut, Phone, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

/** Minimal help surface: reach a human, or sign out. Nothing else. */
export default function HelpSheet({ open, onClose, onSignOut }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close help"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-title"
        className="fr-pop relative w-full max-w-md rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 id="help-title" className="text-xl font-black text-slate-900">
            Help
            <span className="block text-sm font-medium text-slate-500">
              मदद
            </span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-600"
          >
            <X className="size-6" aria-hidden />
          </button>
        </div>

        <a
          href="tel:+911412345678"
          className="flex min-h-16 items-center gap-3 rounded-2xl bg-rose-500 px-5 text-lg font-bold text-white active:bg-rose-600"
        >
          <Phone className="size-7 shrink-0" aria-hidden />
          <span>
            Call Supervisor
            <span className="block text-sm font-medium text-rose-100">
              सुपरवाइज़र को कॉल करें
            </span>
          </span>
        </a>

        <button
          type="button"
          onClick={onSignOut}
          className="mt-3 flex min-h-16 w-full items-center gap-3 rounded-2xl bg-slate-100 px-5 text-lg font-bold text-slate-700 active:bg-slate-200"
        >
          <LogOut className="size-7 shrink-0" aria-hidden />
          <span>
            Sign out
            <span className="block text-sm font-medium text-slate-500">
              साइन आउट
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
