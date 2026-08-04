"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COURSE_SUBNAV } from "@/lib/nav";

/** Sub-navigation for the Courses section. Scrolls horizontally on mobile. */
export default function SubNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Courses sections"
      className="-mx-4 mb-5 overflow-x-auto px-4 lg:mx-0 lg:px-0"
    >
      <ul className="flex w-max gap-2">
        {COURSE_SUBNAV.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-14 items-center rounded-xl px-4 text-sm font-bold whitespace-nowrap transition-colors ${
                  active
                    ? "bg-stone-900 text-white"
                    : "bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-stone-50"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
