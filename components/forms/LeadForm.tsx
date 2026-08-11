"use client";

import { useState } from "react";

import { SelectField, TextArea, TextField } from "@/components/forms/Field";
import { ArrowRight, Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export type FieldSpec =
  | { kind: "text"; name: string; label: string; placeholder?: string; required?: boolean; type?: string; half?: boolean; hint?: string }
  | { kind: "select"; name: string; label: string; options: string[]; required?: boolean; half?: boolean; hint?: string }
  | { kind: "textarea"; name: string; label: string; placeholder?: string; required?: boolean; hint?: string };

/**
 * There is no backend on this site yet, so the form validates in the browser
 * and hands off to the user's mail client with a structured body. Swap
 * `handoff` for a POST to a route handler when an inbox integration lands.
 */
export default function LeadForm({
  fields,
  subject,
  to = site.demoEmail,
  submitLabel = "Send request",
  successTitle = "Request ready to send.",
  successBody = "Your mail client should have opened with everything filled in. If it did not, use the address below and we will pick it up the same way.",
}: {
  fields: FieldSpec[];
  subject: string;
  to?: string;
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function set(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => (current[name] ? { ...current, [name]: "" } : current));
  }

  function validate() {
    const next: Record<string, string> = {};
    for (const field of fields) {
      const value = (values[field.name] ?? "").trim();
      if (field.required && !value) {
        next[field.name] = "This one we do need.";
        continue;
      }
      if (field.kind === "text" && field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        next[field.name] = "That email does not look right.";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    const body = fields
      .map((field) => `${field.label}: ${values[field.name] ?? ""}`)
      .join("\n")
      .concat(`\n\nSent from ${site.name.toLowerCase().replace(/\s/g, "")}.com`);

    const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="panel p-8 sm:p-10" role="status">
        <span className="flex size-12 items-center justify-center rounded-2xl border border-brand-bright/40 bg-brand/18 text-brand-cyan">
          <svg viewBox="0 0 18 18" className="size-5" fill="none" aria-hidden>
            <path
              d="M3 9.6 7 13.5 15 4.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="mt-6 text-[1.4rem] font-semibold text-white">{successTitle}</h3>
        <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">{successBody}</p>
        <a
          href={`mailto:${to}`}
          className="mt-6 inline-block font-mono text-[0.8rem] tracking-[0.06em] text-brand-cyan underline decoration-brand/40 underline-offset-4"
        >
          {to}
        </a>
        <div className="mt-8">
          <Button type="button" variant="outline" onClick={() => setSent(false)}>
            Edit the details
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="panel p-7 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const half = "half" in field ? field.half : false;
          const className = field.kind === "textarea" || !half ? "sm:col-span-2" : "";
          const id = `field-${field.name}`;

          return (
            <div key={field.name} className={className}>
              {field.kind === "text" ? (
                <TextField
                  id={id}
                  label={field.label}
                  hint={field.hint}
                  type={field.type ?? "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={values[field.name] ?? ""}
                  onChange={(event) => set(field.name, event.target.value)}
                  error={errors[field.name]}
                  autoComplete={field.type === "email" ? "email" : "off"}
                />
              ) : null}

              {field.kind === "select" ? (
                <SelectField
                  id={id}
                  label={field.label}
                  hint={field.hint}
                  name={field.name}
                  options={field.options}
                  required={field.required}
                  value={values[field.name] ?? field.options[0]}
                  onChange={(event) => set(field.name, event.target.value)}
                  error={errors[field.name]}
                />
              ) : null}

              {field.kind === "textarea" ? (
                <TextArea
                  id={id}
                  label={field.label}
                  hint={field.hint}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={values[field.name] ?? ""}
                  onChange={(event) => set(field.name, event.target.value)}
                  error={errors[field.name]}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg">
          {submitLabel}
          <ArrowRight />
        </Button>
        <p className="text-[0.76rem] leading-relaxed text-faint sm:max-w-xs sm:text-right">
          We reply from a real address, usually within one working day. No sequences, no drip.
        </p>
      </div>
    </form>
  );
}
