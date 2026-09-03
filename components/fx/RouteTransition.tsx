"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/components/fx/motion";

/**
 * A short wipe on route change.
 *
 * React's <ViewTransition> is only in the canary React that Next bundles at
 * runtime — the installed types do not declare it — so this does the same job
 * with a plain overlay: a mint sweep across, then the new page lifts in. No
 * unstable API, works in every browser, and it is the moment that tells a
 * visitor the site was built rather than assembled.
 */
export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [sweeping, setSweeping] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduced) return;
    // Deferred a frame so the state change is not synchronous in the effect.
    const on = requestAnimationFrame(() => setSweeping(true));
    const off = setTimeout(() => setSweeping(false), 620);
    return () => {
      cancelAnimationFrame(on);
      clearTimeout(off);
    };
  }, [pathname, reduced]);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-90"
        style={{ opacity: sweeping ? 1 : 0, transition: "opacity 200ms linear 420ms" }}
      >
        {sweeping ? (
          <span
            className="absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-brand-cyan/22 to-transparent"
            style={{ animation: "route-sweep 620ms cubic-bezier(0.16,1,0.3,1) both" }}
          />
        ) : null}
      </div>
      <div key={pathname} style={reduced ? undefined : { animation: "route-in 520ms cubic-bezier(0.16,1,0.3,1) both" }}>
        {children}
      </div>
    </>
  );
}
