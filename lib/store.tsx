"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Client-side progress for the Staff portal only — the three portals are
 * isolated, so Manager and Author never read this. Persists to localStorage
 * through useSyncExternalStore so server and client renders agree.
 */

const KEY = "focusrealm.staff.v1";

interface Persisted {
  completed: string[];
}

interface Snapshot extends Persisted {
  ready: boolean;
}

const EMPTY: Persisted = { completed: [] };
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

function update(mutate: (state: Snapshot) => Persisted) {
  const next = mutate(getSnapshot());
  clientSnapshot = { ...next, ready: true };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage blocked or full — state still holds for this page view.
  }
  listeners.forEach((listener) => listener());
}

export function useStaffProgress() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const complete = useCallback((id: string) => {
    update((prev) =>
      prev.completed.includes(id)
        ? prev
        : { completed: [...prev.completed, id] },
    );
  }, []);

  const reset = useCallback(() => {
    update(() => ({ completed: [] }));
  }, []);

  return { ...state, complete, reset };
}
