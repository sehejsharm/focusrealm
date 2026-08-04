"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { ReadReceipt, SopModule, TaskStatus } from "./types";

/**
 * Client-side persistence for the staff session and its Read Receipts.
 * No backend is in scope for this portal, so state lives in localStorage and is
 * exposed through useSyncExternalStore so server and client renders agree.
 */

const KEY = "focusrealm.staff.v1";

interface Persisted {
  staffId: string | null;
  receipts: ReadReceipt[];
  /** Modules the staff member has opened — drives the amber "In Progress" state. */
  opened: Record<string, string>;
  /** Verification quizzes cleared, keyed by module id. */
  quizPassed: Record<string, boolean>;
}

interface Snapshot extends Persisted {
  /** False during SSR and hydration, so we never redirect off a wrong first paint. */
  ready: boolean;
}

const EMPTY: Persisted = {
  staffId: null,
  receipts: [],
  opened: {},
  quizPassed: {},
};

const SERVER_SNAPSHOT: Snapshot = { ...EMPTY, ready: false };

let clientSnapshot: Snapshot | null = null;
const listeners = new Set<() => void>();

function readStorage(): Persisted {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    return { ...EMPTY, ...(JSON.parse(raw) as Partial<Persisted>) };
  } catch {
    return EMPTY;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Snapshot {
  clientSnapshot ??= { ...readStorage(), ready: true };
  return clientSnapshot;
}

function getServerSnapshot(): Snapshot {
  return SERVER_SNAPSHOT;
}

function update(mutate: (state: Snapshot) => Persisted | null) {
  const current = getSnapshot();
  const next = mutate(current);
  if (!next) return;

  clientSnapshot = { ...next, ready: true };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage full or blocked — the session still works for this page view.
  }
  listeners.forEach((listener) => listener());
}

export function useStore() {
  const state = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const signIn = useCallback((staffId: string) => {
    update((prev) => ({ ...prev, staffId }));
  }, []);

  const signOut = useCallback(() => {
    update(() => ({ ...EMPTY }));
  }, []);

  const markOpened = useCallback((moduleId: string) => {
    update((prev) =>
      prev.opened[moduleId]
        ? null
        : {
            ...prev,
            opened: { ...prev.opened, [moduleId]: new Date().toISOString() },
          },
    );
  }, []);

  const markQuizPassed = useCallback((moduleId: string) => {
    update((prev) => ({
      ...prev,
      quizPassed: { ...prev.quizPassed, [moduleId]: true },
    }));
  }, []);

  const complete = useCallback((moduleId: string) => {
    update((prev) => {
      if (!prev.staffId) return null;
      if (prev.receipts.some((r) => r.moduleId === moduleId)) return null;
      const receipt: ReadReceipt = {
        moduleId,
        staffId: prev.staffId,
        completedAt: new Date().toISOString(),
      };
      return { ...prev, receipts: [receipt, ...prev.receipts] };
    });
  }, []);

  const receiptFor = useCallback(
    (moduleId: string) => state.receipts.find((r) => r.moduleId === moduleId),
    [state.receipts],
  );

  const statusOf = useCallback(
    (module: SopModule): TaskStatus => {
      if (state.receipts.some((r) => r.moduleId === module.id)) {
        return "completed";
      }
      if (state.opened[module.id]) return "active";
      return module.priority === "urgent" ? "urgent" : "scheduled";
    },
    [state.receipts, state.opened],
  );

  return useMemo(
    () => ({
      ...state,
      signIn,
      signOut,
      markOpened,
      markQuizPassed,
      complete,
      receiptFor,
      statusOf,
    }),
    [
      state,
      signIn,
      signOut,
      markOpened,
      markQuizPassed,
      complete,
      receiptFor,
      statusOf,
    ],
  );
}
