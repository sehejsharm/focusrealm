import {
  BedDouble,
  BookOpenCheck,
  ClipboardList,
  FileText,
  GraduationCap,
  Layers,
  LifeBuoy,
  MessageSquare,
  Presentation,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type {
  BriefAssetKind,
  JobRole,
  PhaseKey,
  Status,
  TaskFlag,
} from "./types";

/**
 * The four-state colour system. Classes are written out in full so Tailwind's
 * scanner keeps them.
 */
export const STATUS: Record<
  Status,
  { solid: string; tint: string; text: string; ring: string; label: string }
> = {
  urgent: {
    solid: "bg-rose-500",
    tint: "bg-rose-50",
    text: "text-rose-700",
    ring: "ring-rose-200",
    label: "Due next",
  },
  active: {
    solid: "bg-amber-500",
    tint: "bg-amber-50",
    text: "text-amber-700",
    ring: "ring-amber-200",
    label: "In progress",
  },
  complete: {
    solid: "bg-emerald-500",
    tint: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
    label: "Released",
  },
  scheduled: {
    solid: "bg-sky-500",
    tint: "bg-sky-50",
    text: "text-sky-700",
    ring: "ring-sky-200",
    label: "Scheduled",
  },
};

export const PHASE_LABEL: Record<PhaseKey, string> = {
  prepare: "Prepare",
  perform: "Perform",
  verify: "Verify",
  release: "Release",
};

export const PHASE_ORDER: PhaseKey[] = ["prepare", "perform", "verify", "release"];

/** Guest and service conditions, worn as chips on the task card. */
export const FLAG: Record<TaskFlag, { label: string; className: string }> = {
  vip: { label: "VIP", className: "bg-violet-100 text-violet-800" },
  "family-arrival": { label: "Family arrival", className: "bg-sky-100 text-sky-800" },
  "late-arrival": { label: "Late arrival", className: "bg-indigo-100 text-indigo-800" },
  "early-arrival": { label: "Early arrival", className: "bg-teal-100 text-teal-800" },
  "do-not-enter": { label: "Do not enter", className: "bg-rose-100 text-rose-800" },
  allergy: { label: "Allergy", className: "bg-amber-100 text-amber-900" },
};

export const JOB_ROLE_ICON: Record<JobRole, LucideIcon> = {
  "room-attendant": BedDouble,
  "front-office": ClipboardList,
  "food-beverage": UtensilsCrossed,
  engineering: Wrench,
  security: ShieldCheck,
};

export const ASSET_ICON: Record<BriefAssetKind, LucideIcon> = {
  pdf: FileText,
  video: Presentation,
  deck: Layers,
};

export const SECTION_ICON = {
  courses: GraduationCap,
  paths: BookOpenCheck,
  forums: MessageSquare,
  feedback: Send,
  notifications: Sparkles,
  recovery: LifeBuoy,
  star: Star,
} satisfies Record<string, LucideIcon>;
