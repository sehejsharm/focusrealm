/**
 * Domain model for the Focus Realm Staff (Consumption) Portal.
 *
 * Scope is bounded by the Focus Realm system spec, Portal 2:
 * staff see their Priority Assigned SOPs and Tasks, review the module
 * (Title + Instructions + Media), answer a verification quiz if required,
 * and click Complete — which writes a timestamped Read Receipt.
 */

export type Department = "Housekeeping" | "F&B" | "Front Desk" | "Maintenance";

/** Media kinds an Author can attach in the Studio builder. */
export type MediaKind = "pdf" | "doc" | "video" | "form" | "link";

export type SopCategory =
  | "fire-safety"
  | "posh"
  | "fssai"
  | "housekeeping"
  | "service"
  | "front-desk"
  | "maintenance";

/**
 * The four-state colour system.
 * urgent = red, active = amber, completed = green, scheduled = blue.
 */
export type TaskStatus = "urgent" | "active" | "completed" | "scheduled";

export interface StaffMember {
  id: string;
  name: string;
  /** 4-digit quick-login PIN. No usernames, no passwords. */
  pin: string;
  department: Department;
  location: string;
  initials: string;
  /** Tailwind background class for the avatar chip. */
  avatarClass: string;
}

export interface SopMedia {
  kind: MediaKind;
  label: string;
  url: string;
}

export interface QuizOption {
  id: string;
  label: string;
  correct?: boolean;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export interface SopModule {
  id: string;
  /** Short code shown as the card's large, bold identifier. */
  code: string;
  title: string;
  category: SopCategory;
  /** Role-Based Tagging: [Location] + [Department]. */
  location: string;
  department: Department | "All";
  /** Departments this module routes to; "all" for org-wide compliance. */
  appliesTo: Department[] | "all";
  priority: "urgent" | "scheduled";
  dueLabel: string;
  instructions: string[];
  media: SopMedia;
  /** Present only when the module requires verification before completion. */
  quiz?: QuizQuestion[];
}

/** Timestamped proof of completion — the audit artefact the platform sells. */
export interface ReadReceipt {
  moduleId: string;
  staffId: string;
  completedAt: string;
}
