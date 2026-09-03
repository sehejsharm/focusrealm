"use client";

import type { ComponentProps, ReactNode } from "react";

const control =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-[0.92rem] text-paper placeholder:text-faint/75 transition-all duration-300 outline-none focus:border-brand-bright/70 focus:bg-brand/10 focus:ring-2 focus:ring-brand/30 disabled:opacity-60 aria-[invalid=true]:border-[#ff9b9b]/70 aria-[invalid=true]:bg-[#ff9b9b]/[0.06]";

/** Screen readers get the hint and the error, in that order, if present. */
function describedBy(id: string, hint?: string, error?: string) {
  const ids = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

function Wrapper({
  label,
  htmlFor,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="flex items-baseline justify-between gap-3 font-mono text-[0.78rem] tracking-[0.14em] text-brand-cyan uppercase"
      >
        <span>
          {label}
          {required ? (
            <>
              <span aria-hidden> *</span>
              <span className="sr-only"> (required)</span>
            </>
          ) : null}
        </span>
        {hint ? (
          <span id={`${htmlFor}-hint`} className="normal-case tracking-normal text-faint">
            {hint}
          </span>
        ) : null}
      </label>
      <div className="mt-2.5">{children}</div>
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="mt-2 text-[0.78rem] text-[#ffb3b3]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  hint,
  error,
  id,
  ...rest
}: { label: string; hint?: string; error?: string; id: string } & ComponentProps<"input">) {
  return (
    <Wrapper label={label} htmlFor={id} hint={hint} error={error} required={rest.required}>
      <input
        id={id}
        className={control}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...rest}
      />
    </Wrapper>
  );
}

export function SelectField({
  label,
  hint,
  error,
  id,
  options,
  ...rest
}: {
  label: string;
  hint?: string;
  error?: string;
  id: string;
  options: string[];
} & ComponentProps<"select">) {
  return (
    <Wrapper label={label} htmlFor={id} hint={hint} error={error} required={rest.required}>
      <div className="relative">
        <select
          id={id}
          className={`${control} appearance-none pr-10`}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          {...rest}
        >
          {options.map((option) => (
            <option key={option} value={option} className="bg-ink text-paper">
              {option}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 12 12"
          className="pointer-events-none absolute top-1/2 right-4 size-3 -translate-y-1/2 text-brand-cyan"
          fill="none"
          aria-hidden
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
    </Wrapper>
  );
}

export function TextArea({
  label,
  hint,
  error,
  id,
  ...rest
}: { label: string; hint?: string; error?: string; id: string } & ComponentProps<"textarea">) {
  return (
    <Wrapper label={label} htmlFor={id} hint={hint} error={error} required={rest.required}>
      <textarea
        id={id}
        rows={4}
        className={`${control} resize-y`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        {...rest}
      />
    </Wrapper>
  );
}
