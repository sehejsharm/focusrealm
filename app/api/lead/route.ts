import { NextResponse } from "next/server";

import { legal, site } from "@/lib/site";

export const runtime = "nodejs";
/** Never cached — every POST is a distinct submission. */
export const dynamic = "force-dynamic";

type LeadPayload = {
  formId?: string;
  subject?: string;
  fields?: Record<string, string>;
  /** Honeypot. Real users never see it, so any value means a bot. */
  website?: string;
  /** Milliseconds between form mount and submit. */
  elapsedMs?: number;
};

const MAX_FIELD_LENGTH = 4000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Best-effort in-memory throttle. Serverless instances are short-lived and
 * not shared, so this stops naive floods rather than a determined attacker —
 * the honeypot and the timing check carry the rest.
 */
const recent = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 500) {
    for (const [key, times] of recent) {
      if (times.every((t) => now - t >= WINDOW_MS)) recent.delete(key);
    }
  }
  return hits.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}

/** Sends through Resend when configured; otherwise reports "not configured". */
async function sendEmail(payload: { to: string; subject: string; html: string; replyTo?: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL ?? `Focus Realm <onboarding@resend.dev>`;
  if (!apiKey) return { sent: false as const, reason: "RESEND_API_KEY not set" };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
      ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
    }),
  });

  if (!response.ok) {
    return { sent: false as const, reason: `Resend ${response.status}: ${await response.text()}` };
  }
  return { sent: true as const };
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  // Honeypot: a filled hidden field, or a submit under 1.5s, is a bot.
  // Both answer 200 so the bot does not learn it was caught.
  if (body.website || (typeof body.elapsedMs === "number" && body.elapsedMs < 1500)) {
    return NextResponse.json({ ok: true, id: "accepted" });
  }

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Try again in a minute." },
      { status: 429 },
    );
  }

  const fields = body.fields ?? {};
  const errors: Record<string, string> = {};

  const name = (fields.name ?? "").trim();
  const email = (fields.email ?? "").trim();

  if (!name) errors.name = "This one we do need.";
  if (!email) errors.email = "This one we do need.";
  else if (!EMAIL.test(email)) errors.email = "That email does not look right.";

  for (const [key, value] of Object.entries(fields)) {
    if (typeof value !== "string") {
      errors[key] = "Unexpected value.";
    } else if (value.length > MAX_FIELD_LENGTH) {
      errors[key] = "That is longer than we can accept.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const submittedAt = new Date().toISOString();
  const reference = `FR-${Date.now().toString(36).toUpperCase()}`;
  const subject = body.subject ?? "Website enquiry — Focus Realm Hospitality";

  const rows = Object.entries(fields)
    .filter(([, value]) => value.trim())
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#6b7f7c;font:12px/1.5 -apple-system,Segoe UI,sans-serif;text-transform:uppercase;letter-spacing:.08em;vertical-align:top">${escapeHtml(key)}</td><td style="padding:6px 0;color:#0e2322;font:15px/1.55 -apple-system,Segoe UI,sans-serif">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");

  const internalHtml = `
    <div style="background:#f6f7f1;padding:28px">
      <div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #dfe6e2;border-radius:14px;padding:28px">
        <p style="margin:0 0 4px;font:12px/1.4 -apple-system,Segoe UI,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#33927b">New lead · ${escapeHtml(reference)}</p>
        <h1 style="margin:0 0 20px;font:600 22px/1.3 -apple-system,Segoe UI,sans-serif;color:#0e2322">${escapeHtml(subject)}</h1>
        <table style="border-collapse:collapse;width:100%">${rows}</table>
        <p style="margin:22px 0 0;font:12px/1.6 -apple-system,Segoe UI,sans-serif;color:#6b7f7c">
          ${escapeHtml(submittedAt)} · IP ${escapeHtml(ip)}
        </p>
      </div>
    </div>`;

  const autoresponderHtml = `
    <div style="background:#f6f7f1;padding:28px">
      <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #dfe6e2;border-radius:14px;padding:32px">
        <p style="margin:0 0 6px;font:12px/1.4 -apple-system,Segoe UI,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#33927b">Focus Realm Hospitality</p>
        <h1 style="margin:0 0 16px;font:600 24px/1.25 -apple-system,Segoe UI,sans-serif;color:#0e2322">Thanks ${escapeHtml(name.split(" ")[0])} — we have this.</h1>
        <p style="margin:0 0 14px;font:15px/1.6 -apple-system,Segoe UI,sans-serif;color:#25403c">
          A founder reads every one of these, usually within one working day. We will come back with two or
          three times for a 15-minute walkthrough on a real shift — no feature tour.
        </p>
        <p style="margin:0 0 14px;font:15px/1.6 -apple-system,Segoe UI,sans-serif;color:#25403c">
          If it is useful before then, the live prototype is open at
          <a href="${site.prototypeUrl}" style="color:#1f6d5b">${site.prototypeUrl}</a>.
        </p>
        <p style="margin:24px 0 0;font:13px/1.6 -apple-system,Segoe UI,sans-serif;color:#6b7f7c">
          Reference ${escapeHtml(reference)} · Reply to this email to add anything.<br>
          ${escapeHtml(legal.entity)}
        </p>
      </div>
    </div>`;

  // Always emit a structured log line. On Vercel this is the durable record
  // if the mail provider is unreachable, so a lead is never silently lost.
  console.log(
    JSON.stringify({ type: "lead", reference, formId: body.formId, submittedAt, ip, fields }),
  );

  const [internal, auto] = await Promise.all([
    sendEmail({
      to: process.env.LEAD_NOTIFY_EMAIL ?? site.email,
      subject: `${subject} — ${name}`,
      html: internalHtml,
      replyTo: email,
    }),
    sendEmail({
      to: email,
      subject: "We have your Focus Realm request",
      html: autoresponderHtml,
    }),
  ]);

  if (!internal.sent) {
    console.warn(JSON.stringify({ type: "lead_delivery_failed", reference, reason: internal.reason }));
  }
  if (!auto.sent) {
    console.warn(JSON.stringify({ type: "autoresponder_failed", reference, reason: auto.reason }));
  }

  // The lead is captured in the log even when mail is unconfigured, so the
  // submission is a success from the visitor's point of view either way.
  return NextResponse.json({ ok: true, reference, notified: internal.sent });
}
