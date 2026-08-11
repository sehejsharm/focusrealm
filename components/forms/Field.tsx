"use client";

import type { ComponentProps, ReactNode } from "react";

const control =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-[0.92rem] text-paper placeholder:text-faint/70 transition-all duration-300 outline-none focus:border-brand-bright/70 focus:bg-brand/8 focus:ring-2 focus:ring-brand/25";

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
        className="flex items-baseline justify-between gap-3 font-mono text-[0.6rem] tracking-[0.14em] text-brand-ice uppercase"
      >
        <span>
          {label}
          {required ? <span className="text-brand-cyan"> *</span> : null}
        </span>
        {hint ? <span className="normal-case tracking-normal text-faint">{hint}</span> : null}
      </label>
      <div className="mt-2.5">{children}</div>
      {error ? <p className="mt-2 text-[0.76rem] text-[#ff9b9b]">{error}</p> : null}
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
        aria-describedby={error ? `${id}-error` : undefined}
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
        <select id={id} className={`${control} appearance-none pr-10`} {...rest}>
          {options.map((option) => (
            <option key={option} value={option} className="bg-ink text-paper">
              {option}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 12 12"
          className="pointer-events-none absolute top-1/2 right-4 size-3 -translate-y-1/2 text-brand-ice"
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
      <textarea id={id} rows={4} className={`${control} resize-y`} {...rest} />
    </Wrapper>
  );
}
