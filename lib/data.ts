import type { SopModule, StaffMember } from "./types";

/**
 * Seed roster and SOP library. The Author portal produces this content and the
 * system routes it by Role-Based Tagging; the Staff portal only consumes it.
 */

export const STAFF: StaffMember[] = [
  {
    id: "anita",
    name: "Anita Verma",
    pin: "1234",
    department: "Housekeeping",
    location: "Clarks Jaipur",
    initials: "AV",
    avatarClass: "bg-violet-600",
  },
  {
    id: "ravi",
    name: "Ravi Kumar",
    pin: "2345",
    department: "F&B",
    location: "Clarks Jaipur",
    initials: "RK",
    avatarClass: "bg-teal-600",
  },
  {
    id: "priya",
    name: "Priya Singh",
    pin: "3456",
    department: "Front Desk",
    location: "Clarks Jaipur",
    initials: "PS",
    avatarClass: "bg-indigo-600",
  },
  {
    id: "mohan",
    name: "Mohan Lal",
    pin: "4567",
    department: "Maintenance",
    location: "Clarks Jaipur",
    initials: "ML",
    avatarClass: "bg-orange-600",
  },
];

export const SOP_MODULES: SopModule[] = [
  {
    id: "fs-01",
    code: "FS 01",
    title: "Fire Evacuation Drill",
    category: "fire-safety",
    location: "Clarks Jaipur",
    department: "All",
    appliesTo: "all",
    priority: "urgent",
    dueLabel: "Due today",
    instructions: [
      "Watch the full drill video before your shift starts.",
      "Find the two nearest fire exits on your floor.",
      "Locate the fire extinguisher closest to your work station.",
      "Walk the escape route once, end to end.",
      "Assembly point is the front lawn, near the flagpole.",
    ],
    media: {
      kind: "video",
      label: "Evacuation drill video · 4 min",
      url: "https://www.youtube.com/results?search_query=hotel+fire+evacuation+drill",
    },
    quiz: [
      {
        id: "fs-01-q1",
        prompt: "Where do you go after leaving the building?",
        options: [
          { id: "a", label: "Front lawn, near the flagpole", correct: true },
          { id: "b", label: "Back to your work station" },
          { id: "c", label: "The staff canteen" },
        ],
      },
      {
        id: "fs-01-q2",
        prompt: "During a fire alarm, do you use the lift?",
        options: [
          { id: "a", label: "No — use the stairs", correct: true },
          { id: "b", label: "Yes, it is faster" },
        ],
      },
    ],
  },
  {
    id: "po-02",
    code: "PO 02",
    title: "POSH · Respect at Work",
    category: "posh",
    location: "Clarks Jaipur",
    department: "All",
    appliesTo: "all",
    priority: "scheduled",
    dueLabel: "Due in 3 days",
    instructions: [
      "Read the policy document end to end.",
      "Note the name and phone number of the committee head.",
      "Any complaint can be raised without telling your supervisor first.",
      "Complaints are confidential and cannot be held against you.",
    ],
    media: {
      kind: "pdf",
      label: "POSH policy · PDF",
      url: "https://www.indiacode.nic.in/handle/123456789/2104",
    },
    quiz: [
      {
        id: "po-02-q1",
        prompt: "Can you raise a complaint directly to the committee?",
        options: [
          { id: "a", label: "Yes, directly", correct: true },
          { id: "b", label: "Only through your supervisor" },
        ],
      },
    ],
  },
  {
    id: "fss-03",
    code: "FS 03",
    title: "FSSAI Kitchen Hygiene Check",
    category: "fssai",
    location: "Clarks Jaipur",
    department: "F&B",
    appliesTo: ["F&B"],
    priority: "urgent",
    dueLabel: "Due today",
    instructions: [
      "Wash hands for 20 seconds before entering the kitchen.",
      "Check the cold storage temperature is below 5°C.",
      "Check hot holding is above 60°C.",
      "Label every prepared item with the date.",
      "Record both temperatures in the kitchen log.",
    ],
    media: {
      kind: "doc",
      label: "FSSAI hygiene checklist · Doc",
      url: "https://www.fssai.gov.in/",
    },
    quiz: [
      {
        id: "fss-03-q1",
        prompt: "What is the safe cold storage temperature?",
        options: [
          { id: "a", label: "Below 5°C", correct: true },
          { id: "b", label: "Below 15°C" },
          { id: "c", label: "Room temperature" },
        ],
      },
    ],
  },
  {
    id: "hk-04",
    code: "HK 04",
    title: "Guest Room Turnover",
    category: "housekeeping",
    location: "Clarks Jaipur",
    department: "Housekeeping",
    appliesTo: ["Housekeeping"],
    priority: "scheduled",
    dueLabel: "Due this week",
    instructions: [
      "Knock twice and announce yourself before entering.",
      "Strip all linen and bag it before you start cleaning.",
      "Clean top to bottom, dry areas before wet areas.",
      "Restock amenities to the standard tray layout.",
      "Final check: smell, mirror, remote, and door lock.",
    ],
    media: {
      kind: "video",
      label: "Room turnover walkthrough · 6 min",
      url: "https://www.youtube.com/results?search_query=hotel+housekeeping+room+turnover",
    },
  },
  {
    id: "fb-05",
    code: "FB 05",
    title: "Breakfast Buffet Setup",
    category: "service",
    location: "Clarks Jaipur",
    department: "F&B",
    appliesTo: ["F&B"],
    priority: "scheduled",
    dueLabel: "Due tomorrow",
    instructions: [
      "Buffet must be fully set by 06:45.",
      "Chafing dishes on first, water filled, flame lit.",
      "Place allergen cards in front of every dish.",
      "Juice and milk go out last, straight from cold storage.",
      "Submit the readiness form once the line is set.",
    ],
    media: {
      kind: "form",
      label: "Buffet readiness form",
      url: "https://docs.google.com/forms/",
    },
  },
  {
    id: "fd-06",
    code: "FD 06",
    title: "Guest Check-In Script",
    category: "front-desk",
    location: "Clarks Jaipur",
    department: "Front Desk",
    appliesTo: ["Front Desk"],
    priority: "scheduled",
    dueLabel: "Due this week",
    instructions: [
      "Greet within 10 seconds of the guest reaching the desk.",
      "Confirm the booking name and photo ID.",
      "Explain breakfast timing and Wi-Fi in one sentence each.",
      "Hand over the key card with both hands.",
      "Offer luggage assistance before the guest walks away.",
    ],
    media: {
      kind: "link",
      label: "Front desk script · Web page",
      url: "https://www.hospitalitynet.org/",
    },
  },
  {
    id: "mt-07",
    code: "MT 07",
    title: "Water Heater Daily Check",
    category: "maintenance",
    location: "Clarks Jaipur",
    department: "Maintenance",
    appliesTo: ["Maintenance"],
    priority: "urgent",
    dueLabel: "Due today",
    instructions: [
      "Check the boiler pressure gauge is in the green band.",
      "Confirm outlet temperature is between 50°C and 60°C.",
      "Look for leaks at every visible joint.",
      "Log the reading and initial the sheet.",
      "Call the supervisor immediately if pressure is in the red.",
    ],
    media: {
      kind: "pdf",
      label: "Boiler daily check sheet · PDF",
      url: "https://www.osha.gov/",
    },
  },
];

export function getStaff(id: string | null): StaffMember | undefined {
  if (!id) return undefined;
  return STAFF.find((s) => s.id === id);
}

export function getModule(id: string): SopModule | undefined {
  return SOP_MODULES.find((m) => m.id === id);
}

/** The system routes modules by Role-Based Tagging — staff never search. */
export function modulesForStaff(staff: StaffMember): SopModule[] {
  return SOP_MODULES.filter(
    (m) =>
      m.location === staff.location &&
      (m.appliesTo === "all" || m.appliesTo.includes(staff.department)),
  );
}
