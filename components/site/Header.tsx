"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { usePageProgressVar } from "@/components/fx/useScrollProgress";
import Logo from "@/components/site/Logo";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { nav } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  // Publishes --page-progress to :root; nothing re-renders as you scroll.
  usePageProgressVar();
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setCondensed(y > 24);
      // Reveal on scroll up, retreat on scroll down — but never near the top.
      setHidden(y > 420 && y > lastY.current + 4);
      lastY.current = y;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-brand-deep focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header
        data-condensed={condensed}
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-expo ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className={`transition-all duration-500 ease-out-expo ${
            condensed
              ? "border-b border-line bg-void/72 backdrop-blur-xl backdrop-saturate-150"
              : "border-b border-transparent"
          }`}
        >
          <div className="mx-auto flex h-18 w-full max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8">
            <Link href="/" className="flex min-h-11 shrink-0 items-center">
              <Logo markClassName="size-9" />
            </Link>

            <nav aria-label="Primary" className="hidden items-center lg:flex">
              <ul className="flex items-center gap-1 rounded-full border border-line bg-white/[0.03] p-1 backdrop-blur-md">
                {nav.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`relative block rounded-full px-4 py-2 text-[0.85rem] tracking-[-0.01em] transition-colors duration-300 ${
                          active ? "text-white" : "text-muted hover:text-white"
                        }`}
                      >
                        {active ? (
                          <span
                            aria-hidden
                            className="absolute inset-0 rounded-full border border-brand-bright/30 bg-brand/16"
                          />
                        ) : null}
                        <span className="relative">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2.5">
              {/* Wrapper, not a `hidden` class on the button: the button's own
                  `inline-flex` would win the display cascade. */}
              <span className="hidden sm:block">
                <ButtonLink href="/demo" size="md">
                  Book a 15-min demo
                  <ArrowRight />
                </ButtonLink>
              </span>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                className="flex size-11 items-center justify-center rounded-full border border-line bg-white/[0.03] lg:hidden"
              >
                <span className="relative block h-3 w-4.5">
                  <span
                    className={`absolute inset-x-0 h-px bg-paper transition-all duration-400 ease-out-expo ${
                      open ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute inset-x-0 h-px bg-paper transition-all duration-400 ease-out-expo ${
                      open ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Reading progress */}
        <div
          aria-hidden
          className="h-px origin-left bg-linear-to-r from-brand via-brand-bright to-brand-cyan transition-opacity duration-500"
          style={{ transform: "scaleX(var(--page-progress, 0))", opacity: condensed ? 1 : 0 }}
        />
      </header>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-0 z-40 lg:hidden"
        onClick={() => setOpen(false)}
      >
        <div className="absolute inset-0 bg-void/92 backdrop-blur-2xl" />
        {/*
          `justify-center` on a sheet taller than the viewport pushes the first
          and last items off both edges, and with body scroll locked they were
          unreachable in landscape. `justify-start` from a short viewport plus
          its own scroll container keeps every item reachable; it still centres
          when there is room to spare.
        */}
        <nav
          aria-label="Mobile"
          className="relative flex h-full flex-col justify-start overflow-y-auto overscroll-contain px-6 pt-20 pb-10 [@media(min-height:600px)]:justify-center"
        >
          <ul className="space-y-1">
            {nav.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-baseline justify-between gap-4 border-b border-line py-5"
                  style={{ animation: `rise-in 0.6s var(--ease-out-expo) ${index * 60}ms both` }}
                >
                  <span className="text-[1.7rem] leading-none font-semibold tracking-[-0.03em] text-white">
                    {item.label}
                  </span>
                  <span className="font-mono text-[0.76rem] tracking-[0.14em] text-faint uppercase">
                    0{index + 1}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3">
            <ButtonLink href="/demo" size="lg" className="w-full">
              Book a 15-min demo
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/platform" variant="outline" size="lg" className="w-full">
              See the platform
            </ButtonLink>
          </div>
        </nav>
      </div>
    </>
  );
}
