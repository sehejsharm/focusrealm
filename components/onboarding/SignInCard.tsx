"use client";

import { useState } from "react";
import { KeyRound } from "lucide-react";
import type { CandidateView } from "@/lib/onboarding/types";
import { Button, Card, Field, Notice, SectionTitle, inputClass, inputStyle } from "./ui";

const MIN_LENGTH = 10;

/**
 * Lets an employee choose a password, so they can sign in at /hr with their
 * email instead of keeping their personal link.
 */
export default function SignInCard({
  token,
  candidate,
  onSaved,
}: {
  token: string;
  candidate: CandidateView;
  onSaved: (next: CandidateView) => void;
}) {
  const { enabled, emails } = candidate.signIn;
  const [open, setOpen] = useState(!enabled);
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "good" | "bad"; text: string } | null>(null);

  const mismatch = confirm.length > 0 && confirm !== password;
  const ready =
    password.length >= MIN_LENGTH && password === confirm && (!enabled || current.length > 0) && !busy;

  async function save() {
    setBusy(true);
    setMessage(null);

    const response = await fetch(`/api/onboarding/session/${token}/sign-in`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password, currentPassword: enabled ? current : undefined }),
    });
    const data = await response.json();
    setBusy(false);

    if (!response.ok) {
      setMessage({ tone: "bad", text: data.error ?? "Could not save your password." });
      return;
    }
    setCurrent("");
    setPassword("");
    setConfirm("");
    setOpen(false);
    setMessage({ tone: "good", text: enabled ? "Password changed." : "Sign-in is set up." });
    onSaved(data as CandidateView);
  }

  const where = typeof window === "undefined" ? "/hr" : `${window.location.host}/hr`;

  return (
    <Card>
      <SectionTitle
        title={enabled ? "Signing in" : "Set up sign-in"}
        lead={
          enabled
            ? `Sign in at ${where} with ${emails.join(" or ")} and your password.`
            : `Choose a password to sign in at ${where} with ${emails.join(" or ")} — so you do not need to keep this link.`
        }
      />

      {message && (
        <div className="mb-4">
          <Notice tone={message.tone}>{message.text}</Notice>
        </div>
      )}

      {!open ? (
        <Button variant="ghost" onClick={() => setOpen(true)}>
          <KeyRound className="size-4" aria-hidden />
          Change password
        </Button>
      ) : (
        <div className="space-y-4">
          {enabled && (
            <Field label="Current password">
              <input
                type="password"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                autoComplete="current-password"
                className={inputClass}
                style={inputStyle}
              />
            </Field>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={enabled ? "New password" : "Password"} hint={`At least ${MIN_LENGTH} characters.`}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                className={inputClass}
                style={inputStyle}
              />
            </Field>
            <Field label="Type it again">
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && ready && save()}
                autoComplete="new-password"
                className={inputClass}
                style={inputStyle}
              />
            </Field>
          </div>
          {mismatch && <Notice tone="bad">The two passwords do not match.</Notice>}
          <div className="flex flex-wrap gap-3">
            <Button disabled={!ready} onClick={save}>
              <KeyRound className="size-4" aria-hidden />
              {busy ? "Saving…" : enabled ? "Change password" : "Set password"}
            </Button>
            {enabled && (
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
