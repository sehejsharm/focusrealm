"use client";

import { useEffect, useRef, useState } from "react";
import { Delete } from "lucide-react";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const LENGTH = 4;

interface Props {
  /** Returns true when the PIN is accepted. */
  onSubmit: (pin: string) => boolean;
}

export default function PinPad({ onSubmit }: Props) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const press = (key: string) => {
    if (pin.length >= LENGTH) return;
    const next = pin + key;
    setError(false);
    setPin(next);
    if (next.length < LENGTH) return;

    if (onSubmit(next)) return;
    setError(true);
    resetTimer.current = window.setTimeout(() => {
      setPin("");
      setError(false);
    }, 600);
  };

  const backspace = () => {
    setError(false);
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <div className="w-full">
      <div
        className={`mb-7 flex items-center justify-center gap-4 ${error ? "fr-shake" : ""}`}
        role="status"
        aria-label={`${pin.length} of ${LENGTH} digits entered`}
      >
        {Array.from({ length: LENGTH }).map((_, index) => (
          <span
            key={index}
            className={`size-5 rounded-full transition-colors ${
              error
                ? "bg-rose-500"
                : index < pin.length
                  ? "bg-slate-900"
                  : "bg-slate-300"
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {KEYS.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => press(key)}
            className="flex min-h-16 items-center justify-center rounded-2xl bg-white text-3xl font-black text-slate-900 shadow-sm ring-1 ring-slate-200 active:bg-slate-100"
          >
            {key}
          </button>
        ))}

        <span aria-hidden />

        <button
          type="button"
          onClick={() => press("0")}
          className="flex min-h-16 items-center justify-center rounded-2xl bg-white text-3xl font-black text-slate-900 shadow-sm ring-1 ring-slate-200 active:bg-slate-100"
        >
          0
        </button>

        <button
          type="button"
          onClick={backspace}
          aria-label="Delete last digit"
          className="flex min-h-16 items-center justify-center rounded-2xl bg-slate-200 text-slate-700 active:bg-slate-300"
        >
          <Delete className="size-8" aria-hidden />
        </button>
      </div>
    </div>
  );
}
