import type {
  Category,
  RosterException,
  ShiftCompliance,
  Sop,
  TagOption,
} from "./types";

/**
 * SOP library for the Staff portal. `assigned: true` items form today's
 * priority queue on the Home dashboard, in `priority` order. The rest are
 * reachable only through the Directory grid.
 */
export const SOPS: Sop[] = [
  {
    id: "rooms-214",
    title: "Guest Room Reset",
    category: "rooms",
    location: "Room 214",
    checklist: [
      "Strip and remake the bed",
      "Wipe every surface, mirror to sink",
      "Restock towels and amenities",
      "Empty trash and vacuum the floor",
    ],
    verifyQuestion: "Is the room reset complete?",
    assigned: true,
    priority: 1,
    dueLabel: "Due by 2:00 PM",
  },
  {
    id: "food-12",
    title: "Room Service Delivery",
    category: "food",
    location: "Room 512",
    checklist: [
      "Confirm order matches the ticket",
      "Cover hot items, keep cold items chilled",
      "Knock, announce, and greet the guest",
      "Confirm signature and thank the guest",
    ],
    verifyQuestion: "Was the delivery confirmed by the guest?",
    assigned: true,
    priority: 2,
    dueLabel: "Due by 2:30 PM",
  },
  {
    id: "rooms-turndown",
    title: "Turndown Service",
    category: "rooms",
    location: "Any assigned room",
    checklist: [
      "Fold back the bedspread",
      "Close curtains and dim the lights",
      "Set out the evening amenity",
      "Tidy the bathroom once more",
    ],
    verifyQuestion: "Is turndown complete for this room?",
    assigned: false,
    priority: 9,
    dueLabel: "Evening",
  },
  {
    id: "food-table",
    title: "Table Reset & Setup",
    category: "food",
    location: "Restaurant floor",
    checklist: [
      "Clear and sanitize the table",
      "Set linens, flatware, and glassware",
      "Align chairs and check for wobble",
      "Place the reserved card if booked",
    ],
    verifyQuestion: "Is the table ready for the next guest?",
    assigned: false,
    priority: 9,
    dueLabel: "Anytime",
  },
  {
    id: "maint-ac",
    title: "AC Filter Check",
    category: "maintenance",
    location: "Guest rooms",
    checklist: [
      "Power down the unit",
      "Remove and inspect the filter",
      "Clean or replace as needed",
      "Power on and confirm airflow",
    ],
    verifyQuestion: "Is airflow confirmed normal?",
    assigned: false,
    priority: 9,
    dueLabel: "Anytime",
  },
  {
    id: "maint-faucet",
    title: "Leaky Faucet Fix",
    category: "maintenance",
    location: "As reported",
    checklist: [
      "Shut off the local water supply",
      "Inspect washer and O-ring",
      "Replace worn parts",
      "Run water and check for leaks",
    ],
    verifyQuestion: "Is the leak fully stopped?",
    assigned: false,
    priority: 9,
    dueLabel: "As reported",
  },
  {
    id: "guest-lost",
    title: "Lost & Found Handling",
    category: "guest",
    location: "Front desk",
    checklist: [
      "Tag the item with date and location found",
      "Log it in the lost & found register",
      "Store it in the secure cabinet",
      "Notify the guest if identifiable",
    ],
    verifyQuestion: "Is the item logged and stored?",
    assigned: false,
    priority: 9,
    dueLabel: "Anytime",
  },
  {
    id: "guest-welcome",
    title: "Welcome Greeting",
    category: "guest",
    location: "Lobby",
    checklist: [
      "Make eye contact and smile",
      "Greet the guest by name if known",
      "Offer help with bags or directions",
      "Thank them for choosing the property",
    ],
    verifyQuestion: "Was the guest greeted warmly?",
    assigned: false,
    priority: 9,
    dueLabel: "Anytime",
  },
];

export function getSop(id: string): Sop | undefined {
  return SOPS.find((sop) => sop.id === id);
}

export const CATEGORY_LABEL: Record<Category, string> = {
  rooms: "Rooms",
  food: "Food",
  maintenance: "Maintenance",
  guest: "Guest Service",
};

/** Manager portal — shift compliance rings. */
export const SHIFT_COMPLIANCE: ShiftCompliance[] = [
  { id: "morning", label: "Morning Shift", percent: 85 },
  { id: "evening", label: "Evening Shift", percent: 96 },
];

/** Manager portal — exclusively the staff who are non-compliant right now. */
export const ROSTER_EXCEPTIONS: RosterException[] = [
  {
    id: "1",
    name: "Ravi Kumar",
    initials: "RK",
    department: "Housekeeping",
    issue: "Missed verification: Guest Room Reset",
    since: "22 min overdue",
  },
  {
    id: "2",
    name: "Anita Silva",
    initials: "AS",
    department: "Food & Beverage",
    issue: "Task not started: Table Reset & Setup",
    since: "10 min overdue",
  },
  {
    id: "3",
    name: "Marco Fernandes",
    initials: "MF",
    department: "Maintenance",
    issue: "Missed verification: AC Filter Check",
    since: "1 hr overdue",
  },
];

/** Author portal — role-based tagging. */
export const DEPARTMENTS: TagOption[] = [
  { id: "housekeeping", label: "Housekeeping", count: 24 },
  { id: "fb", label: "Food & Beverage", count: 31 },
  { id: "maintenance", label: "Maintenance", count: 9 },
  { id: "front-desk", label: "Front Desk", count: 14 },
];

export const SHIFTS: TagOption[] = [
  { id: "morning", label: "Morning Shift", count: 34 },
  { id: "evening", label: "Evening Shift", count: 28 },
  { id: "night", label: "Night Shift", count: 11 },
  { id: "all", label: "All Shifts / Locations", count: 78 },
];

/** Rough intersection so the deploy preview reads like a real match count. */
export function matchingStaffCount(
  departmentId: string | null,
  shiftId: string | null,
): number {
  const dept = DEPARTMENTS.find((d) => d.id === departmentId);
  const shift = SHIFTS.find((s) => s.id === shiftId);
  if (!dept && !shift) return 0;
  if (dept && !shift) return dept.count;
  if (shift && !dept) return shift.count;
  if (dept && shift) {
    if (shift.id === "all") return dept.count;
    return Math.max(1, Math.round(dept.count * (shift.count / 78)));
  }
  return 0;
}
