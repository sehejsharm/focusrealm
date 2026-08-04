import type { TaskStatus } from "./types";

/**
 * The mandated status colour system. Class names are written out in full so
 * Tailwind's scanner can see them.
 */
export const STATUS: Record<
  TaskStatus,
  {
    /** Solid fill for bars, dots and chips. */
    solid: string;
    /** Tinted surface for card accents. */
    tint: string;
    text: string;
    label: string;
    /** Secondary label for staff with minimal English literacy. */
    hindi: string;
  }
> = {
  urgent: {
    solid: "bg-rose-500",
    tint: "bg-rose-50",
    text: "text-rose-700",
    label: "Urgent",
    hindi: "ज़रूरी",
  },
  active: {
    solid: "bg-amber-500",
    tint: "bg-amber-50",
    text: "text-amber-700",
    label: "In Progress",
    hindi: "चालू",
  },
  completed: {
    solid: "bg-emerald-500",
    tint: "bg-emerald-50",
    text: "text-emerald-700",
    label: "Done",
    hindi: "पूर्ण",
  },
  scheduled: {
    solid: "bg-sky-500",
    tint: "bg-sky-50",
    text: "text-sky-700",
    label: "Assigned",
    hindi: "सौंपा गया",
  },
};

/** Queue order: urgent first, then in-progress, then scheduled, done last. */
export const STATUS_ORDER: Record<TaskStatus, number> = {
  urgent: 0,
  active: 1,
  scheduled: 2,
  completed: 3,
};
