"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ArrowRight, ButtonLink } from "@/components/ui/Button";

/**
 * Mobile conversion bar. Appears once the reader is past the hero and hides
 * on the pages that are already a form, so it never competes with itself.
 */
const suppressedOn = ["/demo", "/contact", "/privacy", "/terms", "/cookies"];

export default function StickyCta() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShown(window.scrollY > 700);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (suppressedOn.includes(pathname)) return null;

  return (
    <div
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-void/85 px-4 py-3 backdrop-blur-xl transition-transform duration-500 ease-out-expo sm:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-3">
        <p className="min-w-0 flex-1 text-[0.78rem] leading-tight text-muted">
          <span className="block font-medium text-white">See it on a real shift.</span>
          15 minutes, no feature tour.
        </p>
        <ButtonLink href="/demo" size="md" className="shrink-0" tabIndex={shown ? undefined : -1}>
          Book demo
          <ArrowRight />
        </ButtonLink>
      </div>
    </div>
  );
}
