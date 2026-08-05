"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/staff", label: "Home" },
  { href: "/staff/directory", label: "Directory" },
];

/** Secondary switch inside the Staff portal — Home vs. the SOP directory. */
export default function StaffTabs() {
  const pathname = usePathname();

  return (
    <div className="flex gap-1 rounded-full bg-stone-200 p-1">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`flex-1 rounded-full py-2.5 text-center text-sm font-bold transition-colors ${
              active ? "bg-white text-stone-900 shadow" : "text-stone-500"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
