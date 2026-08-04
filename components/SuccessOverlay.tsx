import { Check } from "lucide-react";

/**
 * Confirmation shown the moment a Read Receipt is written — the one signal
 * that matters to a staff member finishing a module.
 */
export default function SuccessOverlay({ open }: { open: boolean }) {
  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="assertive"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-emerald-500 px-6 text-white"
    >
      <span className="fr-pop flex size-32 items-center justify-center rounded-full bg-white">
        <Check className="size-20 text-emerald-500" strokeWidth={4} aria-hidden />
      </span>
      <p className="text-center text-2xl font-black">
        Done
        <span className="mt-1 block text-base font-semibold text-emerald-50">
          पूर्ण · Read receipt saved
        </span>
      </p>
    </div>
  );
}
