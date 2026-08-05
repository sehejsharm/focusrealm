"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PenSquare, ShieldCheck, Users } from "lucide-react";
import type { Portal } from "@/lib/types";

const PORTALS: { key: Portal; href: string; label: string; Icon: typeof Users }[] = [
  { key: "staff", href: "/staff", label: "Staff", Icon: Users },
  { key: "manager", href: "/manager", label: "Manager", Icon: ShieldCheck },
  { key: "author", href: "/author", label: "Author", Icon: PenSquare },
];

/** Switches between the three isolated portals. Nothing else lives here. */
export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Portals"
      className="sticky bottom-0 z-40 border-t border-stone-200 bg-white/95 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex">
        {PORTALS.map((portal) => {
          const active = pathname.startsWith(portal.href);
          return (
            <li key={portal.key} className="flex-1">
              <Link
                href={portal.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-16 flex-col items-center justify-center gap-1 ${
                  active ? "text-emerald-600" : "text-stone-400"
                }`}
              >
                <portal.Icon
                  className="size-7"
                  strokeWidth={active ? 2.6 : 2}
                  aria-hidden
                />
                <span className="text-[11px] font-bold">{portal.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
