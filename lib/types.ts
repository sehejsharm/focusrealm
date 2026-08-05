export type Portal = "staff" | "manager" | "author";

export type Category = "rooms" | "food" | "maintenance" | "guest";

export interface Sop {
  id: string;
  title: string;
  category: Category;
  location: string;
  checklist: string[];
  verifyQuestion: string;
  /** In today's assignment queue for the signed-in staff member. */
  assigned: boolean;
  /** Lower runs first. */
  priority: number;
  dueLabel: string;
}

export type ComplianceLevel = "compliant" | "exception";

export interface RosterException {
  id: string;
  name: string;
  initials: string;
  department: string;
  issue: string;
  since: string;
}

export interface ShiftCompliance {
  id: string;
  label: string;
  percent: number;
}

export interface TagOption {
  id: string;
  label: string;
  count: number;
}
