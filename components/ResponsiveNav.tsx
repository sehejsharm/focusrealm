"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleCheckBig, ListChecks, type LucideIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  hindi: string;
  Icon: LucideIcon;
}

/** Sections are limited to the two the staff portal actually has. */
const ITEMS: NavItem[] = [
  { href: "/staff/tasks", label: "Tasks", hindi: "कार्य", Icon: ListChecks },
  { href: "/staff/done", label: "Done", hindi: "पूर्ण", Icon: CircleCheckBig },
];

function useActive() {
  const pathname = usePathname();
  return (href: string) => pathname === href || pathname.startsWith(`${href}/`);
}

/** Top tab bar — desktop only (> 1024px). */
export function TopNav() {
  const isActive = useActive();

  return (
    <nav aria-label="Sections" className="hidden lg:flex lg:items-center lg:gap-2">
      {ITEMS.map(({ href, label, Icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-14 items-center gap-2 rounded-xl px-5 text-base font-bold transition-colors ${
              active
                ? "bg-white text-slate-900"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="size-5" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Fixed bottom bar — mobile and tablet (< 1024px). */
export function BottomNav() {
  const isActive = useActive();

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-2xl">
        {ITEMS.map(({ href, label, hindi, Icon }) => {
          const active = isActive(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-16 flex-col items-center justify-center gap-0.5 px-2 py-2 ${
                  active ? "text-slate-900" : "text-slate-400"
                }`}
              >
                <Icon
                  className="size-7"
                  strokeWidth={active ? 2.6 : 2}
                  aria-hidden
                />
                <span className="text-xs font-bold">{label}</span>
                <span className="text-[10px] leading-none font-medium opacity-70">
                  {hindi}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
