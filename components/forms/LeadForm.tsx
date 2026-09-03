"use client";

import { useEffect, useRef, useState } from "react";

import { SelectField, TextArea, TextField } from "@/components/forms/Field";
import { ArrowRight, Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export type FieldSpec =
  | {
      kind: "text";
      name: string;
      label: string;
      placeholder?: string;
      required?: boolean;
      type?: string;
      half?: boolean;
      hint?: string;
      autoComplete?: string;
    }
  | {
      kind: "select";
      name: string;
      label: string;
      options: string[];
      required?: boolean;
      half?: boolean;
      hint?: string;
      autoComplete?: string;
    }
  | {
      kind: "textarea";
      name: string;
      label: string;
      placeholder?: string;
      required?: boolean;
      hint?: string;
      autoComplete?: string;
    };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * `handoff` is the mail client opening because that is how this form works on
 * the static build. `fallback` is the mail client opening because a POST
 * failed. They look the same to the browser and must not read the same to the
 * visitor — one is the design, the other is an apology.
 */
type Status = "idle" | "submitting" | "sent" | "handoff" | "fallback";

/** Fires a conversion event into whichever analytics layer is present. */
function trackConversion(formId: string, reference?: string) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: unknown) => void;
  };

  w.dataLayer?.push({ event: "generate_lead", form_id: formId, reference });
  w.gtag?.("event", "generate_lead", { form_id: formId, reference });
  w.plausible?.("Lead", { props: { form: formId } });
  // Always dispatch a DOM event so any later analytics tool can subscribe.
  window.dispatchEvent(new CustomEvent("focusrealm:lead", { detail: { formId, reference } }));
}

export default function LeadForm({
  fields,
  subject,
  formId = "lead",
  to = site.email,
  submitLabel = "Send request",
  successTitle = "Request received.",
  successBody = "A founder reads every one of these, usually within one working day. We will come back with two or three times for a 15-minute walkthrough.",
}: {
  fields: FieldSpec[];
  subject: string;
  formId?: string;
  to?: string;
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
}) {
  // Seeded from the specs so a <select> the visitor never touches still submits
  // the option they can see. Starting from {} meant untouched selects sent "",
  // which the payload builder and the mail body both dropped silently.
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      fields.map((field) => [field.name, field.kind === "select" ? field.options[0] : ""]),
    ),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [reference, setReference] = useState<string>();
  // Set on mount, not during render — Date.now() is impure.
  const mountedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // Move focus to the confirmation so screen-reader users are told it worked.
  useEffect(() => {
    if (status === "sent" || status === "fallback" || status === "handoff") successRef.current?.focus();
  }, [status]);

  function set(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => (current[name] ? { ...current, [name]: "" } : current));
    setFormError("");
  }

  function validateField(field: FieldSpec, raw?: string): string {
    const value = (raw ?? values[field.name] ?? "").trim();
    if (field.required && !value) return `${field.label} is required.`;
    if (field.kind === "text" && field.type === "email" && value && !EMAIL.test(value)) {
      return "Enter a valid email, like you@property.com.";
    }
    return "";
  }

  function onBlur(field: FieldSpec) {
    const message = validateField(field);
    setErrors((current) => ({ ...current, [field.name]: message }));
  }

  function validateAll() {
    const next: Record<string, string> = {};
    for (const field of fields) {
      const message = validateField(field);
      if (message) next[field.name] = message;
    }
    setErrors(next);
    return next;
  }

  function mailtoHref() {
    const body = fields
      .map((field) => `${field.label}: ${values[field.name] ?? ""}`)
      .join("\n");
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const invalid = validateAll();
    if (Object.keys(invalid).length > 0) {
      const first = fields.find((field) => invalid[field.name]);
      if (first) document.getElementById(`field-${first.name}`)?.focus();
      return;
    }

    setStatus("submitting");
    setFormError("");

    // On the static export there is no /api/lead route to post to, so hand the
    // visitor straight to their mail client. Posting first would guarantee a
    // 404 round-trip and a misleading "submitting" flicker before the same
    // fallback ran. Set NEXT_PUBLIC_LEAD_API=1 when a server runtime exists.
    if (process.env.NEXT_PUBLIC_LEAD_API !== "1") {
      setStatus("handoff");
      window.location.href = mailtoHref();
      return;
    }

    const payload = {
      formId,
      subject,
      fields: Object.fromEntries(fields.map((f) => [f.name, (values[f.name] ?? "").trim()])),
      website: honeypot.current?.value ?? "",
      elapsedMs: mountedAt.current ? Date.now() - mountedAt.current : 9999,
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: Record<string, string>;
        error?: string;
        reference?: string;
      };

      if (response.ok && data.ok) {
        setReference(data.reference);
        setStatus("sent");
        trackConversion(formId, data.reference);
        return;
      }

      if (response.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }

      throw new Error(data.error ?? `Request failed (${response.status})`);
    } catch {
      // Network or server failure — hand the visitor their mail client rather
      // than dropping the lead, and tell them plainly that is what happened.
      setStatus("fallback");
      setFormError("");
      window.location.href = mailtoHref();
    }
  }

  if (status === "sent" || status === "fallback" || status === "handoff") {
    const fell = status === "fallback";
    const handed = status === "handoff";
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="panel p-8 sm:p-10"
      >
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
        <h3 className="mt-6 text-[1.4rem] font-semibold text-white">
          {fell
            ? "Our form is having a moment."
            : handed
              ? "Your email is ready to send."
              : successTitle}
        </h3>
        <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">
          {fell
            ? "We could not reach our server, so we have opened your mail client with everything filled in. Send that and it reaches the same inbox."
            : handed
              ? "We have opened your mail client with everything you entered already filled in. Send it and a founder picks it up — usually within one working day. If nothing opened, the address is below."
              : successBody}
        </p>
        {reference ? (
          <p className="mt-4 font-mono text-[0.72rem] tracking-[0.1em] text-faint uppercase">
            Reference {reference}
          </p>
        ) : null}
        <a
          href={`mailto:${to}`}
          className="mt-6 inline-block font-mono text-[0.8rem] tracking-[0.06em] text-brand-cyan underline decoration-brand/50 underline-offset-4"
        >
          {to}
        </a>
        <div className="mt-8">
          <Button type="button" variant="outline" onClick={() => setStatus("idle")}>
            Send another
          </Button>
        </div>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="panel p-7 sm:p-9">
      {/* Honeypot. Hidden from sight and from assistive tech, but a bot that
          fills every input will trip it. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-website`}>Leave this field empty</label>
        <input
          ref={honeypot}
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
          style={{ width: 1, height: 1 }}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const half = "half" in field ? field.half : false;
          const className = field.kind === "textarea" || !half ? "sm:col-span-2" : "";
          const id = `field-${field.name}`;
          const shared = {
            id,
            label: field.label,
            hint: field.hint,
            name: field.name,
            required: field.required,
            error: errors[field.name],
            disabled: busy,
            onBlur: () => onBlur(field),
          };

          return (
            <div key={field.name} className={className}>
              {field.kind === "text" ? (
                <TextField
                  {...shared}
                  type={field.type ?? "text"}
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(event) => set(field.name, event.target.value)}
                  autoComplete={field.autoComplete ?? "on"}
                />
              ) : null}

              {field.kind === "select" ? (
                <SelectField
                  {...shared}
                  options={field.options}
                  value={values[field.name] ?? field.options[0]}
                  onChange={(event) => set(field.name, event.target.value)}
                  autoComplete={field.autoComplete}
                />
              ) : null}

              {field.kind === "textarea" ? (
                <TextArea
                  {...shared}
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(event) => set(field.name, event.target.value)}
                />
              ) : null}
            </div>
          );
        })}
      </div>

      {formError ? (
        <p role="alert" className="mt-6 rounded-xl border border-[#ff9b9b]/40 bg-[#ff9b9b]/10 px-4 py-3 text-[0.85rem] text-[#ffc4c4]">
          {formError}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={busy} aria-busy={busy}>
          {busy ? "Sending…" : submitLabel}
          {busy ? null : <ArrowRight />}
        </Button>
        <p className="text-[0.76rem] leading-relaxed text-faint sm:max-w-xs sm:text-right">
          We reply from a real address, usually within one working day. No sequences, no drip.
        </p>
      </div>
    </form>
  );
}
