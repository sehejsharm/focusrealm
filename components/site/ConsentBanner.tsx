"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/Button";
import {
  CONSENT_REOPEN_HASH,
  CONSENT_STORAGE_KEY,
  consentLikelyRequired,
  type ConsentChoice,
} from "@/lib/consent";

/**
 * Analytics consent, asked once and remembered.
 *
 * Whether to show the banner is not React state — it is a read of three things
 * the browser owns: the stored answer, the timezone, and the location hash.
 * So it is modelled as an external store. Visibility is derived during render
 * from `shouldShow()`, and only events (a click, a hash change) move it, which
 * keeps the initial decision out of an effect where it would flash the banner
 * in and then out again for a visitor who already answered.
 */

/** Set when the visitor answers, so the banner closes without a re-read. */
let answered = false;
/** Set by the footer link, which reopens the banner after it was answered. */
let reopened = false;

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function readStoredChoice(): ConsentChoice | null {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    // Private mode, or storage blocked. Treat as unanswered.
    return null;
  }
}

function currentTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return undefined;
  }
}

/** Pure read of browser state — no side effects, safe to call during render. */
function shouldShow(): boolean {
  if (reopened) return true;
  if (answered) return false;
  if (readStoredChoice()) return false;
  return consentLikelyRequired(currentTimeZone());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  function onHashChange() {
    if (window.location.hash !== CONSENT_REOPEN_HASH) return;
    reopened = true;
    // Cleared so the same footer link works a second time.
    history.replaceState(null, "", window.location.pathname + window.location.search);
    emit();
  }

  window.addEventListener("hashchange", onHashChange);
  onHashChange();

  return () => {
    listeners.delete(listener);
    window.removeEventListener("hashchange", onHashChange);
  };
}

/** The server has no localStorage and no timezone, so it renders nothing. */
function getServerSnapshot() {
  return false;
}

/**
 * Re-applies an answer to the tag. The stored choice has to be replayed on
 * every page load, not only the load it was given on: `analytics_storage`
 * defaults to denied in the restricted regions, so a visitor who accepted last
 * week arrives denied again until this tells the tag otherwise.
 */
function updateConsent(choice: ConsentChoice) {
  const w = window as typeof window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };

  // gtag dispatches a consent command only from an *Arguments* object. Pushing
  // a plain Array — `dataLayer.push(["consent","update",…])` — looks like an
  // unrelated dotted-path call, is swallowed, and made both Accept and Decline
  // silent no-ops. `gtag()` is the shim the inline defaults script defines
  // (lib/consent.ts), and it pushes `arguments` correctly; it exists before
  // gtag.js loads and writes to the same queue, so this works either way.
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", { analytics_storage: choice });
  }
  // No gtag means analytics is disabled for this build (preview host or
  // development), so there is no tag whose consent state could need updating.
}

export default function ConsentBanner() {
  const open = useSyncExternalStore(subscribe, shouldShow, getServerSnapshot);
  const panelRef = useRef<HTMLDivElement>(null);

  // A role="dialog" that never takes focus is announced to nobody: a screen
  // reader carries on reading the page and the banner is just a thing at the
  // bottom. Move focus in when it opens, and let Escape dismiss it the way any
  // dialog should — declining, since refusing must be at least as easy as
  // accepting.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
  }, [open]);

  // Side effect only — replaying a previous answer, never setting state.
  useEffect(() => {
    const stored = readStoredChoice();
    if (stored) updateConsent(stored);
  }, []);

  const answer = useCallback((choice: ConsentChoice) => {
    updateConsent(choice);
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {
      // Nothing stored means they are asked again next visit, which is the
      // correct behaviour when a preference cannot be recorded.
    }
    answered = true;
    reopened = false;
    emit();
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") answer("denied");
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, answer]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="panel mx-auto flex max-w-3xl flex-col gap-5 p-6 backdrop-blur-xl outline-none sm:flex-row sm:items-center sm:gap-8"
      >
        <div>
          <p id="consent-title" className="text-[0.95rem] font-semibold text-white">
            Analytics cookies
          </p>
          <p className="mt-2 text-[0.86rem] leading-relaxed text-muted">
            We use Google Analytics to see which pages are useful. No advertising, no cross-site tracking.
            Decline and the site works exactly the same.{" "}
            <a
              href="/cookies"
              className="text-brand-cyan underline decoration-brand/40 underline-offset-4 transition-colors hover:text-white"
            >
              Cookie Policy
            </a>
          </p>
        </div>

        <div className="flex shrink-0 gap-3">
          <Button type="button" variant="outline" onClick={() => answer("denied")}>
            Decline
          </Button>
          <Button type="button" onClick={() => answer("granted")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
