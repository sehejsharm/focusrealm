"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import {
  Button,
  Card,
  Field,
  Notice,
  SectionTitle,
  Wordmark,
  inputClass,
  inputStyle,
} from "@/components/onboarding/ui";

const STEPS = [
  "Submit your details and a copy of your Aadhaar card",
  "Read your company handbooks and watch the video briefings",
  "Pass the assessments — 75% on each",
  "Review and sign your internship agreement",
  "We verify the signed agreement",
  "Request your Focus Realm email and set it up",
];

/**
 * Front door of Focus Realm HR: employees sign in here, and new interns open
 * the invitation link they were sent.
 */
export default function HrHome() {
  const router = useRouter();

  // Already signed in on this device — go straight to their portal.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/onboarding/employee/session")
      .then(async (response) => {
        if (cancelled || !response.ok) return;
        const data = (await response.json()) as { portal: string | null };
        if (data.portal) router.replace(data.portal);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:py-16">
      <div className="mb-10">
        <Wordmark subtitle="HR portal" />
      </div>

      <SignIn onSignedIn={(portal) => router.push(portal)} />

      <Invitation onOpen={(token) => router.push(`/hr/${token}`)} />

      <p className="mb-4 text-center text-xs leading-relaxed" style={{ color: "var(--fr-muted)" }}>
        Before you submit anything, read the{" "}
        <Link href="/hr/privacy" className="font-bold underline" style={{ color: "var(--fr-gold-soft)" }}>
          privacy notice
        </Link>{" "}
        — what we collect, why, how long we keep it, and how to take it back.
      </p>

      <p className="text-center text-xs" style={{ color: "var(--fr-muted)" }}>
        Founders —{" "}
        <Link href="/hr/admin" className="font-bold underline">
          open the HR console
        </Link>
      </p>
    </div>
  );
}

function SignIn({ onSignedIn }: { onSignedIn: (portal: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);

    const response = await fetch("/api/onboarding/employee/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).catch(() => null);
    const data = response ? await response.json().catch(() => ({})) : {};
    setBusy(false);

    if (!response?.ok) {
      setMessage(data.error ?? "Could not sign you in.");
      return;
    }
    onSignedIn(data.portal as string);
  }

  return (
    <Card className="mb-5">
      <SectionTitle
        eyebrow="Focus Realm HR"
        title="Sign in"
        lead="For interns and employees. Your internship details, agreement, company email settings, and your completion certificate and recommendation letter once they are issued."
      />
      <form onSubmit={submit} className="space-y-4">
        <Field label="Email" hint="Your Focus Realm address, or the personal email you gave us.">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
            className={inputClass}
            style={inputStyle}
          />
        </Field>
        <Field label="Password">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className={inputClass}
            style={inputStyle}
          />
        </Field>

        {message && <Notice tone="bad">{message}</Notice>}

        <Button type="submit" disabled={busy || !email || !password}>
          <LogIn className="size-4" aria-hidden />
          {busy ? "Signing in…" : "Sign in"}
        </Button>

        <p className="text-xs leading-relaxed" style={{ color: "var(--fr-muted)" }}>
          No password yet? Open the personal link you were sent and choose one under &ldquo;Set up
          sign-in&rdquo;. Forgotten it? Ask the founders to reset your sign-in.
        </p>
      </form>
    </Card>
  );
}

function Invitation({ onOpen }: { onOpen: (token: string) => void }) {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  function open() {
    // Accept either the whole link or just the code at the end of it.
    const token = value.trim().replace(/\/+$/, "").split("/").pop();
    if (!token) {
      setMessage("Paste the link from your invitation.");
      return;
    }
    onOpen(token);
  }

  return (
    <Card className="mb-5">
      <SectionTitle
        title="New intern? Start your onboarding"
        lead="Everything between being offered a place and your first working day, in one link. It takes most people an afternoon."
      />

      <ol className="mb-6 space-y-2.5">
        {STEPS.map((step, index) => (
          <li key={step} className="flex items-start gap-3">
            <span
              className="flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-black"
              style={{ backgroundColor: "rgba(201,162,39,0.16)", color: "var(--fr-gold-soft)" }}
              aria-hidden
            >
              {index + 1}
            </span>
            <span className="text-sm leading-snug text-pretty">{step}</span>
          </li>
        ))}
      </ol>

      <div className="space-y-3">
        <label className="block">
          <span className="mb-2 block text-sm font-bold">Open your invitation</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && open()}
            placeholder="Paste the link from your invitation"
            className={inputClass}
            style={inputStyle}
          />
        </label>

        {message && <Notice tone="bad">{message}</Notice>}

        <Button variant="ghost" onClick={open}>
          Continue
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </Card>
  );
}
