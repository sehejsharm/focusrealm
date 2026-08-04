"use client";

import Link from "next/link";
import {
  ChevronRight,
  GraduationCap,
  Mail,
  MessageCircle,
  MessageSquareQuote,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SubNav from "@/components/SubNav";
import { NOTIFICATIONS } from "@/lib/data";
import { useStaffState } from "@/lib/store";
import type { NotificationChannel, NotificationKind } from "@/lib/types";

const KIND: Record<
  NotificationKind,
  { label: string; className: string; Icon: LucideIcon }
> = {
  assignment: {
    label: "Assignment",
    className: "bg-sky-100 text-sky-800",
    Icon: GraduationCap,
  },
  feedback: {
    label: "Feedback",
    className: "bg-violet-100 text-violet-800",
    Icon: MessageSquareQuote,
  },
  reminder: {
    label: "Reminder",
    className: "bg-amber-100 text-amber-900",
    Icon: MessageCircle,
  },
};

const CHANNEL: Record<NotificationChannel, { label: string; Icon: LucideIcon }> = {
  "in-app": { label: "In platform", Icon: Smartphone },
  email: { label: "Email", Icon: Mail },
  whatsapp: { label: "WhatsApp", Icon: MessageCircle },
};

/** Assignments, supervisor feedback and reminders, across every channel. */
export default function NotificationsPage() {
  const { readNotifications, markNotificationRead, markAllNotificationsRead } =
    useStaffState();
  const unread = NOTIFICATIONS.filter((n) => !readNotifications.includes(n.id));

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle="Delivered in platform, by email and over WhatsApp."
        action={
          unread.length > 0 ? (
            <button
              type="button"
              onClick={() =>
                markAllNotificationsRead(NOTIFICATIONS.map((n) => n.id))
              }
              className="flex min-h-14 items-center rounded-xl bg-white px-4 text-sm font-bold text-stone-700 ring-1 ring-stone-200 hover:bg-stone-50"
            >
              Mark all read
            </button>
          ) : undefined
        }
      />
      <SubNav />

      <ul className="space-y-3">
        {NOTIFICATIONS.map((notification) => {
          const read = readNotifications.includes(notification.id);
          const kind = KIND[notification.kind];

          return (
            <li key={notification.id}>
              <Link
                href={notification.href ?? "/notifications"}
                onClick={() => markNotificationRead(notification.id)}
                className={`flex gap-3 rounded-2xl border p-4 transition-colors ${
                  read
                    ? "border-stone-200 bg-white/60"
                    : "border-stone-300 bg-white"
                }`}
              >
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${kind.className}`}
                  aria-hidden
                >
                  <kind.Icon className="size-6" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${kind.className}`}
                    >
                      {kind.label}
                    </span>
                    {!read && (
                      <span className="size-2 rounded-full bg-rose-500" aria-label="Unread" />
                    )}
                    <span className="text-xs font-medium text-stone-400">
                      {notification.at}
                    </span>
                  </div>

                  <p
                    className={`mt-1 text-sm leading-snug text-balance ${
                      read ? "font-semibold text-stone-600" : "font-bold text-stone-900"
                    }`}
                  >
                    {notification.title}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-pretty text-stone-500">
                    {notification.body}
                  </p>

                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {notification.channels.map((channel) => {
                      const meta = CHANNEL[channel];
                      return (
                        <li
                          key={channel}
                          className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-bold text-stone-500"
                        >
                          <meta.Icon className="size-3.5" aria-hidden />
                          {meta.label}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <ChevronRight
                  className="size-5 shrink-0 self-center text-stone-300"
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
