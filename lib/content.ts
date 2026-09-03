import type { StaticImageData } from "next/image";

import authorCreateStandard from "@/assets/platform/author-create-standard.jpg";
import authorFeedbackInbox from "@/assets/platform/author-feedback-inbox.jpg";
import authorPilotFoundation from "@/assets/platform/author-pilot-foundation.jpg";
import managerAssignments from "@/assets/platform/manager-assignments.jpg";
import managerOverview from "@/assets/platform/manager-overview.jpg";
import managerReadiness from "@/assets/platform/manager-readiness.jpg";
import managerStandardResults from "@/assets/platform/manager-standard-results.jpg";
import managerTeamProgress from "@/assets/platform/manager-team-progress.jpg";
import staffBriefs from "@/assets/platform/staff-briefs.jpg";
import staffInbox from "@/assets/platform/staff-inbox.jpg";
import staffSequence from "@/assets/platform/staff-sequence.jpg";
import staffServiceRecord from "@/assets/platform/staff-service-record.jpg";
import staffStandards from "@/assets/platform/staff-standards.jpg";
import staffToday from "@/assets/platform/staff-today.jpg";

/* ------------------------------------------------------------------ *
 * The mechanism — the one sentence everything else hangs off.
 * ------------------------------------------------------------------ */

export const mechanism = [
  {
    step: "01",
    key: "standard",
    label: "The standard lives inside the task",
    body: "The brief for room 208 is the screen the attendant is already looking at, on the clock.",
    detail: "Target time · fixed steps · Prepare, Perform, Verify, Release",
  },
  {
    step: "02",
    key: "evidence",
    label: "Doing the work produces the evidence",
    body: "A step marked for evidence will not tick without the photo. Proof is a gate, not a follow-up.",
    detail: "Photo capture · supervisor sign-off · timestamped, per step",
  },
  {
    step: "03",
    key: "record",
    label: "The evidence compounds into a service record",
    body: "Each task adds a line to a defensible history. The audit reads data you already hold.",
    detail: "Audit-ready · per person, per standard, per property",
  },
] as const;

/* ------------------------------------------------------------------ *
 * The six pains — GTM narrative spine.
 * Arc per pain: Status Quo → Impact Chain → The Wound.
 * ------------------------------------------------------------------ */

export type Pain = {
  id: string;
  index: string;
  name: string;
  statusQuo: string;
  impactChain: string;
  wound: string;
  answer: string;
  metric: string;
};

export const pains: Pain[] = [
  {
    id: "supervisor-bottleneck",
    index: "01",
    name: "Supervisor bottleneck",
    statusQuo:
      "One supervisor holds the standard in their head. Every question, every check, every exception routes through them — across fourteen floors, on foot, on a radio.",
    impactChain:
      "The queue forms behind them. Rooms wait on a walk-past. Judgement calls get made without them because waiting costs more than guessing.",
    wound:
      "Your best operator spends the shift being a lookup table instead of running the floor.",
    answer:
      "The standard is in the task, so the routine 90% never needs a human decision. The supervisor gets the exceptions and nothing else.",
    metric: "1 supervisor · 42 staff · 14 floors",
  },
  {
    id: "ghost-sop",
    index: "02",
    name: "Ghost SOP",
    statusQuo:
      "The SOP exists. It is beautifully written, signed off, filed, and printed in a binder near the linen store. Nobody executes it.",
    impactChain:
      "Two attendants reset the same room two different ways. The standard becomes whatever the last person did. Version 6 lives in a PDF nobody has opened since onboarding.",
    wound:
      "You are paying for a standard you cannot prove anyone follows.",
    answer:
      "A standard that isn't inside the timed task isn't a standard — it's a document. Publishing pushes it straight into today's shift.",
    metric: "Written once · executed every shift",
  },
  {
    id: "invisible-performance-gap",
    index: "03",
    name: "Invisible performance gap",
    statusQuo:
      "Ask who your strongest room attendant is and you get an opinion. Ask which of them is actually meeting standard and you get a spreadsheet from last quarter.",
    impactChain:
      "Coaching goes to whoever was seen most recently. Quiet high performers stay invisible; quiet drift stays uncorrected until a guest names it.",
    wound:
      "You cannot manage what you cannot see, so you manage by anecdote.",
    answer:
      "Every task carries a time, a completion state and evidence. Readiness per person and per standard is a live number, not a survey.",
    metric: "Readiness 77% · service health 84%",
  },
  {
    id: "attrition-bleed",
    index: "04",
    name: "Attrition bleed",
    statusQuo:
      "Hospitality turnover is structural. Good staff leave for a better shift pattern and take the institutional knowledge with them.",
    impactChain:
      "The replacement starts from zero with a two-week shadow and a binder. Standards regress to whatever the shadow taught them. The next audit finds the gap.",
    wound:
      "Every departure resets your service quality, and the reset is invisible until a guest pays for it.",
    answer:
      "Knowledge lives in the standards, not in the tenure. A new joiner is executing to spec on day one, with evidence to prove it.",
    metric: "Day-one execution · sequenced unlock",
  },
  {
    id: "star-rating-ceiling",
    index: "05",
    name: "Star rating ceiling",
    statusQuo:
      "Your best rooms are genuinely five-star. Your average room is not. Guests review the variance, not the ceiling.",
    impactChain:
      "Inconsistency caps the rating. The rating caps the rate. Marketing spend buys traffic that a 4.1 converts worse than a 4.6.",
    wound:
      "Inconsistency is a pricing problem wearing an operations costume.",
    answer:
      "The same standard, in the same task, at the same target time, for every room and every shift. Consistency is the product.",
    metric: "Guest signal 85% · variance closed",
  },
  {
    id: "audit-ambush",
    index: "06",
    name: "Audit ambush",
    statusQuo:
      "The brand audit, the health inspection or the franchise review lands with a week's notice. Three people stop operating and start assembling a folder.",
    impactChain:
      "Photos are pulled from WhatsApp. Sign-offs are re-created from memory. The evidence pack is a narrative, not a record — and everyone in the room knows it.",
    wound:
      "You have done the work. You just cannot prove it, which in an audit is the same thing.",
    answer:
      "The record was written while the work happened. The audit is a filter on data you already hold, not a fire drill.",
    metric: "Evidence per step · exportable history",
  },
];

/* ------------------------------------------------------------------ *
 * Three role interfaces.
 * ------------------------------------------------------------------ */

export type Screen = {
  src: StaticImageData;
  title: string;
  caption: string;
  alt: string;
};

export type Role = {
  id: "staff" | "manager" | "author";
  name: string;
  device: "phone" | "desktop";
  deviceLabel: string;
  /**
   * Who this actually is, in the job titles a hotel uses. The role names alone
   * ("Author") mean nothing to a buyer — they read it and guess, usually
   * "trainer" — so every interface says out loud whose hands it is in.
   */
  who: string;
  persona: string;
  personaRole: string;
  headline: string;
  headlineAccent: string;
  summary: string;
  capabilities: { title: string; body: string }[];
  screens: Screen[];
};

export const roles: Role[] = [
  {
    id: "staff",
    name: "Staff",
    device: "phone",
    deviceLabel: "Mobile-first · built for the phone already in their pocket",
    who: "Room attendants, F&B and front office — whoever does the work",
    persona: "Maya Fernando",
    personaRole: "Room attendant · Housekeeping",
    headline: "The whole standard,",
    headlineAccent: "on the clock, in one hand.",
    summary:
      "One thumb, one shift, bright daylight, cheap Android. The timed task is the interface.",
    capabilities: [
      {
        title: "The timed task",
        body: "Target time, live countdown, four phases.",
      },
      {
        title: "Evidence as a gate",
        body: "A step needing proof will not tick without it.",
      },
      {
        title: "Sequenced readiness",
        body: "Briefs unlock in the order the work happens.",
      },
      {
        title: "A record they own",
        body: "Verified standards and readiness, theirs to carry.",
      },
    ],
    screens: [
      {
        src: staffToday,
        title: "Today",
        caption: "Next timed task, live countdown, shift rhythm",
        alt: "Focus Realm staff mobile screen showing the next timed task for room 208 with a live countdown and shift timeline",
      },
      {
        src: staffSequence,
        title: "Sequence",
        caption: "Briefs unlock in the order the work happens",
        alt: "Focus Realm staff mobile screen showing a role sequence of operating briefs unlocking in order for the rooms division",
      },
      {
        src: staffStandards,
        title: "Standards",
        caption: "Every operating standard, searchable by role",
        alt: "Focus Realm staff mobile screen showing a searchable library of operating standards filtered by job role",
      },
      {
        src: staffServiceRecord,
        title: "Service record",
        caption: "Readiness, phase breakdown, verified credentials",
        alt: "Focus Realm staff mobile screen showing a five-star readiness score with a phase-by-phase service record breakdown",
      },
      {
        src: staffBriefs,
        title: "Briefs",
        caption: "Operating briefs with an inline readiness check",
        alt: "Focus Realm staff mobile screen showing operating briefs with an inline readiness check",
      },
      {
        src: staffInbox,
        title: "Inbox",
        caption: "Assignments and supervisor feedback in one line",
        alt: "Focus Realm staff mobile screen showing assignments, supervisor feedback and reminders in one inbox",
      },
    ],
  },
  {
    id: "manager",
    name: "Manager",
    device: "desktop",
    deviceLabel: "Desktop-primary · the live service picture",
    who: "Supervisors, duty managers and heads of department",
    persona: "Elena Rossi",
    personaRole: "Operations manager",
    headline: "Put attention",
    headlineAccent: "where service needs it.",
    summary:
      "Who needs a decision right now, and which standards are moving. One screen, fed by the floor.",
    capabilities: [
      {
        title: "The live service picture",
        body: "Readiness, service health and guest signal, together.",
      },
      {
        title: "Assignment, not chasing",
        body: "Push a standard to a role, floor or person.",
      },
      {
        title: "Exception handling",
        body: "Routine clears itself. Blocked rooms surface.",
      },
      {
        title: "Standard-level results",
        body: "Which standards lift performance, and which get worked around.",
      },
    ],
    screens: [
      {
        src: managerOverview,
        title: "Overview",
        caption: "One hotel, every promise visible",
        alt: "Focus Realm manager desktop overview showing readiness, service health and guest signal for Aurora Grand Colombo",
      },
      {
        src: managerAssignments,
        title: "Assignments",
        caption: "Push a standard to a role, floor or person",
        alt: "Focus Realm manager desktop assignments screen for pushing operating standards to roles and people",
      },
      {
        src: managerReadiness,
        title: "Readiness status",
        caption: "Who is cleared for which standard",
        alt: "Focus Realm manager desktop screen showing staff readiness status against operating standards",
      },
      {
        src: managerTeamProgress,
        title: "Team progress",
        caption: "Performance made visible, per person",
        alt: "Focus Realm manager desktop team progress screen showing per-person performance against standards",
      },
      {
        src: managerStandardResults,
        title: "Standard results",
        caption: "Which standards actually move the needle",
        alt: "Focus Realm manager desktop screen showing results per operating standard",
      },
    ],
  },
  {
    id: "author",
    // Display name only. The in-product screens still read "Author"; on the
    // marketing site that word tests badly, so the buyer-facing label is the
    // job, not the abstraction.
    name: "Standards",
    device: "desktop",
    deviceLabel: "Desktop · where the standard gets written",
    who: "Your training lead, quality manager or the HOD who owns the standard",
    persona: "Amina Rahman",
    personaRole: "Head of Training & Standards",
    headline: "Turn the standard into",
    headlineAccent: "a clear shift sequence.",
    summary:
      "Write it, mark which steps need proof, publish. It is in tonight's shift.",
    capabilities: [
      {
        title: "Subtraction-first authoring",
        body: "A form, not a page builder. Everything else removed.",
      },
      {
        title: "Evidence by design",
        body: "You decide where proof is mandatory. It becomes a gate.",
      },
      {
        title: "Publish straight to the shift",
        body: "One action puts it in the library and on the desk.",
      },
      {
        title: "The loop closes",
        body: "Floor feedback routes back, with the version attached.",
      },
    ],
    screens: [
      {
        src: authorCreateStandard,
        title: "Create standard",
        caption: "Instruction, reference photo, final checklist",
        alt: "Focus Realm author desktop screen for creating an operating standard with identity, department and audience role",
      },
      {
        src: authorFeedbackInbox,
        title: "Feedback inbox",
        caption: "The floor answers back, per standard",
        alt: "Focus Realm author desktop feedback inbox showing responses from staff per operating standard",
      },
      {
        src: authorPilotFoundation,
        title: "Pilot foundation",
        caption: "One property, one pilot, thirty days",
        alt: "Focus Realm author desktop pilot foundation screen configuring a single-property pilot",
      },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Positioning discipline — this is not an LMS.
 * ------------------------------------------------------------------ */

export const vocabulary = [
  { avoid: "course", use: "operating brief" },
  { avoid: "module", use: "timed task" },
  { avoid: "learner", use: "staff on shift" },
  { avoid: "completion", use: "evidence" },
  { avoid: "training platform", use: "service execution platform" },
  { avoid: "LMS", use: "service record" },
] as const;

/* ------------------------------------------------------------------ *
 * Demo environment — one fictional property, always.
 * ------------------------------------------------------------------ */

export const property = {
  name: "Aurora Grand Colombo",
  location: "Colombo, Sri Lanka",
  staff: 42,
  floors: 14,
  routes: 27,
} as const;

export const personas = [
  { name: "Maya Fernando", role: "Room attendant", role_interface: "Staff", initials: "MF" },
  { name: "Elena Rossi", role: "Operations manager", role_interface: "Manager", initials: "ER" },
  { name: "Amina Rahman", role: "Head of Training & Standards", role_interface: "Standards", initials: "AR" },
  { name: "Arjun Rao", role: "Duty manager", role_interface: "Manager", initials: "AR" },
  { name: "Jonas Lee", role: "Incoming shift", role_interface: "Staff", initials: "JL" },
] as const;

/* ------------------------------------------------------------------ *
 * Team.
 * ------------------------------------------------------------------ */

export type Person = {
  slug: string;
  name: string;
  role: string;
  shortRole: string;
  initials: string;
  /**
   * Drop a square portrait at assets/team/<slug>.jpg and import it here.
   * Until one exists the monogram avatar renders instead.
   */
  photo?: StaticImageData;
  headline: string;
  bio: string[];
  focus: string[];
  traits: { title: string; body: string }[];
  quote: string;
  /** Public profiles. Emitted as schema.org sameAs — the strongest signal
   *  tying a founder's name query to this site. Add the real URLs. */
  sameAs?: string[];
};

/**
 * Canonical order — Sehej first. This is the order used on /team and /about.
 * The home page uses `teamHomeOrder` so the CEO sits centre of the three-up.
 */
export const team: Person[] = [
  {
    slug: "sehej-sharma",
    name: "Sehej Sharma",
    role: "Co-Founder & Chief Executive Officer",
    shortRole: "Co-Founder & CEO",
    initials: "SS",
    headline: "The trailblazer who decided the standard belongs inside the shift.",
    bio: [
      "Sehej Sharma is the Co-Founder and Chief Executive Officer of Focus Realm Hospitality, the service execution platform for hotel operations. He sets the company's direction, owns its positioning, and leads it from the front of the room — in front of general managers, HR directors and heads of learning who have heard every training pitch there is.",
      "He is the author of the thesis the entire platform is built on: a standard that does not live inside the timed task is not a standard, it is a document. That idea was not a refinement of an existing category — it was a rejection of one. Under his direction Focus Realm retired its training-platform framing completely and rebuilt around service execution and evidence, a call that cost the company an easier story and bought it a defensible one.",
      "That is the pattern in how he leads. He is execution-first: an opinion that has not been shipped, sold or survived contact with a real floor does not count. He would rather take a decision on Monday and be corrected by Thursday than hold a committee until the quarter closes. It makes him a fast, deliberate risk-taker — the kind who moves a whole company off a comfortable category because the uncomfortable one is true.",
      "He is also, unusually for a founder at this stage, disciplined about language. He polices the vocabulary of the company personally, because he understands that positioning is not marketing decoration — it is the constraint that decides what gets built. Every word on this site passed through that filter.",
      "He works property by property, floor by floor, with the operators who carry the consequence: the general manager whose rating is capped by inconsistency, the HR director watching institutional knowledge walk out the door, the L&D head whose sessions have attendance sheets and no execution signal. The six pains Focus Realm sells against were not workshopped. He collected them one conversation at a time.",
      "The ambition is not a better tool for hotels. It is the operating layer that hotel service standards run on — a category Focus Realm intends to define and then own.",
    ],
    traits: [
      {
        title: "Trailblazer",
        body: "Named and built a category rather than competing inside one that already had incumbents and rules he did not agree with.",
      },
      {
        title: "Execution first",
        body: "Ideas are cheap and he treats them that way. What counts is shipped, on a floor, with evidence attached.",
      },
      {
        title: "Deliberate risk-taker",
        body: "Retired a working, sellable framing mid-flight because the honest one would compound and the comfortable one would not.",
      },
      {
        title: "Visionary operator",
        body: "Holds the ten-year picture — standards as infrastructure — and the Tuesday-morning decision in the same head.",
      },
    ],
    focus: ["Category & positioning", "Product thesis", "Go-to-market", "Hospitality partnerships", "Founder-led sales"],
    quote:
      "Standards stop being a document nobody reads the moment they become the unit of work a staff member is doing right now.",
  },
  {
    slug: "ali-electricwala",
    name: "Ali Electricwala",
    role: "Co-Founder & Chief Operating Officer",
    shortRole: "Co-Founder & COO",
    initials: "AE",
    headline: "The operator who makes a standard survive week three.",
    bio: [
      "Ali Electricwala is the Co-Founder and Chief Operating Officer of Focus Realm Hospitality. He owns how the platform actually lands inside a working hotel — pilot design, rollout, and the operating discipline that keeps a standard alive after the launch enthusiasm wears off.",
      "His work starts where most operations software stops: the floor. Shift patterns, supervisor load, the realities of a large property running on staff-owned phones and mobile data. Every pilot Focus Realm runs is scoped so that a property sees evidence accumulating inside the first thirty days — not a rollout plan, actual timestamped proof.",
      "He leads commercial operations and customer success, and he is the route by which the floor's reality gets back into the roadmap. When a standard is being worked around rather than worked, he is usually the first person in the company to know.",
    ],
    traits: [
      {
        title: "Rollout discipline",
        body: "Designs pilots backwards from the evidence a property must be holding on day thirty.",
      },
      {
        title: "Floor-level realism",
        body: "Scopes to the shift that exists, not the org chart that describes it.",
      },
      {
        title: "Customer proximity",
        body: "Stays close enough to the property to hear a standard failing before a report does.",
      },
    ],
    focus: ["Pilot design & rollout", "Customer success", "Commercial operations", "Property onboarding"],
    quote: "A standard that survives week three is an operating decision, not a document decision.",
  },
  {
    slug: "aditya-mishra",
    name: "Aditya Mishra",
    role: "Co-Founder & Chief Technology Officer",
    shortRole: "Co-Founder & CTO",
    initials: "AM",
    headline: "The architect who removes things until the task is all that is left.",
    bio: [
      "Aditya Mishra is the Co-Founder and Chief Technology Officer of Focus Realm Hospitality. He drives the platform's subtraction-first design principle: every screen earns its place, and anything that does not help a staff member finish the task in front of them gets removed before it ships.",
      "He architected Focus Realm as three deliberately separate role interfaces — a mobile-first staff experience built for a 340px viewport, a desktop-primary manager surface, and a desktop-only authoring workspace — rather than one responsive layout that would have been cheaper to build and worse in all three postures.",
      "The platform runs on Google Cloud and Firebase: web-based, on standard browsers over mobile data, with no high-end hardware and no PMS integration required at this stage. That is a deliberate constraint, not a gap. The product has to work on the phone a room attendant already owns, in daylight, on hotel wifi — and if it does not work there, it does not work.",
    ],
    traits: [
      {
        title: "Subtraction first",
        body: "Measures a release by what came out of it as much as what went in.",
      },
      {
        title: "Constraint-led architecture",
        body: "Three interfaces instead of one compromise, because the postures have nothing in common.",
      },
      {
        title: "Built for the worst device",
        body: "Targets the cheapest phone on the weakest network, so everything above it is free.",
      },
    ],
    focus: ["Subtraction-first design", "Platform architecture", "Google Cloud & Firebase", "Mobile performance"],
    quote:
      "The hardest engineering problem here is a 340px screen held in one hand, in daylight, on hotel wifi.",
  },
];

/** Home-page order: the CEO sits in the centre of the three-up. */
export const teamHomeOrder: Person[] = [team[1], team[0], team[2]];

export function personBySlug(slug: string) {
  return team.find((entry) => entry.slug === slug);
}

/* ------------------------------------------------------------------ *
 * Market & references.
 * ------------------------------------------------------------------ */

export const buyers = [
  {
    title: "General Managers",
    pain: "Inconsistency caps the property's rating, and the rating caps the rate.",
    win: "One live service picture, and a defensible record behind every promise.",
  },
  {
    title: "HR Directors",
    pain: "Turnover resets service quality, and onboarding is a two-week shadow.",
    win: "Day-one execution to spec, with readiness visible per person.",
  },
  {
    title: "Heads of Learning & Development",
    pain: "Spray-and-pray sessions with attendance sheets and no execution signal.",
    win: "Standards that execute on the floor and report back what worked.",
  },
] as const;

/**
 * Trusted-by strip. Add a logo at assets/clients/<file>.png and import it as
 * `logo` — the wordmark tile renders until one exists.
 */
export type Client = {
  name: string;
  segment: string;
  logo?: StaticImageData;
  note?: string;
};

export const clients: Client[] = [
  {
    name: "Clarks Amer",
    segment: "Hotel chains",
    note: "Hotel & Brij Convention Centre",
  },
  { name: "Renu Mehra's", segment: "Corporate trainers", note: "'ALL' of finesse" },
  { name: "D.A.V. Sr. Sec. School", segment: "Reputed schools", note: "Jaipur" },
  { name: "Recharga", segment: "Fast-growing startups" },
  { name: "TwoKey", segment: "Premium SaaS teams" },
  { name: "The Hosteller", segment: "Distributed properties" },
];

/**
 * Client words, quoted as given. The Clarks quote predates the repositioning
 * and uses the retired category noun — it is left verbatim because a
 * testimonial is attributed speech, not our own positioning.
 */
/**
 * Early-deployment quotes.
 *
 * Both predate the repositioning and use "LMS" and "training" language that
 * now contradicts the rest of the site. They are real quotes from real
 * customers, so they are not being reworded — instead the section states when
 * they were given, and each carries the deployment it describes. Replace them
 * as soon as either account signs off on a current one.
 */
export const testimonials = [
  {
    quote:
      "Focus Realm provided a flexible LMS solution that improved staff training, automated compliance tracking, and enhanced reporting efficiency across multiple hotel properties.",
    author: "Clarks Hotels & Resorts",
    role: "Multi-property hotel group",
    tag: "Multi-property operations",
    context: "Compliance tracking across four properties",
  },
  {
    quote:
      "Focus Realm helped us implement outcome-driven AI training programs, significantly improving employee efficiency, engagement, and real-world AI adoption.",
    author: "TwoKey",
    role: "SaaS product team",
    tag: "Capability & upskilling",
    context: "Team execution and performance measurement",
  },
] as const;

/** Stated above the quotes, so the older vocabulary reads as history. */
export const testimonialsNote =
  "From our earliest deployments, given while the platform was still finding its category. The language is theirs and we have left it alone.";

/* ------------------------------------------------------------------ *
 * Sales material: what changes, and what we are not.
 * ------------------------------------------------------------------ */

export const outcomes = [
  {
    stat: "3",
    label: "Role interfaces",
    body: "Staff on mobile, manager and author on desktop. Built separately.",
  },
  {
    stat: "27",
    label: "Routes live",
    body: "The prototype is open. Walk it before you talk to us.",
  },
  {
    stat: "0",
    label: "Integrations required",
    body: "No PMS, no hardware. A browser on the phones you already have.",
  },
  {
    stat: "1",
    label: "Property per pilot",
    body: "Scoped narrow on purpose, so the evidence is real.",
  },
] as const;

/**
 * The question a property cannot answer quickly, and the two ways it goes.
 *
 * The record shown is the shape of a real service record, taken from the demo
 * environment — deliberately not dressed up as a customer result, because we
 * have one property per pilot and no aggregate outcomes to quote yet.
 */
export const fiveSeconds = {
  question:
    "Was room 208 reset to standard this morning, and can you prove it?",
  today: {
    label: "Today, in most properties",
    chain: [
      "Call the floor supervisor, who was not on that corridor.",
      "The supervisor calls the room attendant, who is mid-shift.",
      "The attendant thinks they took a photo.",
      "The photo is in their personal camera roll, on their own phone.",
      "It never reaches the audit file, because nothing routes it there.",
    ],
    verdict: "Elapsed: the rest of the morning. Proof: still none.",
  },
  withUs: {
    label: "With Focus Realm",
    record: [
      { k: "Room", v: "208 · Floor 2" },
      { k: "Standard", v: "HSK-101 Guest-ready reset" },
      { k: "Completed", v: "08:39 · 24 min against a 26 min target" },
      { k: "Evidence", v: "Photo attached at step 4, gated" },
      { k: "Sign-off", v: "E. Rossi · 08:42" },
    ],
    verdict: "Elapsed: one filter on the service record.",
  },
} as const;

/**
 * The five jobs a property already does, and where each one currently lives.
 *
 * This replaced a three-column comparison against paper and a generic LMS.
 * Putting our column next to what a buyer already owns invites them to defend
 * it — "we have that already, why replace it" — which is the opposite of the
 * intended effect. Framing the same facts as five scattered jobs collapsing
 * into one platform keeps the argument on consolidation, where it belongs, and
 * never asks the reader to run the comparison themselves.
 */
export const convergence = {
  jobs: [
    {
      job: "Write the standard",
      today: "A binder, or last year's deck",
      // The parenthetical is what a buyer would actually search for.
      where: "Your hotel SOP document library — Drive, SharePoint, a shelf",
      cost: "Rewritten every audit",
    },
    {
      job: "Get it onto the floor",
      today: "Shift briefing, then the group chat",
      where: "The WhatsApp group that is your shift briefing",
      cost: "Repeated every shift",
    },
    {
      job: "Run it to standard",
      today: "Memory, and whoever is senior today",
      where: "No hotel task management system, no tracking",
      cost: "Varies by person",
    },
    {
      job: "Prove it happened",
      today: "A photo in someone's camera roll",
      where: "No central hotel evidence capture",
      cost: "Mostly unprovable",
    },
    {
      job: "Produce it for the audit",
      today: "Collating sign-in sheets and screenshots",
      where: "A week of hotel audit preparation, by hand",
      cost: "About a week",
    },
  ],
  outcome: {
    label: "One platform",
    title: "All five, on the same shift.",
    body: "The standard goes into the timed task, the task captures the evidence, and the evidence is already the audit file. Nothing to chase, collate or rebuild.",
    proof: "One record · per step, per person, per property",
  },
} as const;

/** Objection handling — the four things buyers actually push back on. */
export const objections = [
  {
    q: "“Our staff will not use another app.”",
    a: "They are not adopting an app, they are opening the task they were already assigned. One screen, one thumb, the timer already running. If it needs training to use, we built it wrong.",
  },
  {
    q: "“We already have an LMS.”",
    a: "Keep it. An LMS records that someone consumed a course. Focus Realm records that room 208 was reset to standard at 08:36 with a photo attached. Those answer different questions, and only one of them survives an audit.",
  },
  {
    q: "“IT will take six months to approve this.”",
    a: "There is nothing to approve. No PMS integration, no server, no hardware — a browser on the phones your team already owns. Pilots start on a property, not on a roadmap.",
  },
  {
    q: "“Our standards are not written down properly yet.”",
    a: "That is the normal starting point. Bring the standard nobody follows and we will author it live on the call — instruction, reference photo, checklist, evidence gates — and put it on a phone before we hang up.",
  },
] as const;

export const faqs = [
  {
    q: "What is Focus Realm Hospitality?",
    a: "Focus Realm Hospitality is a service execution platform for hotels. It turns your standard operating procedures into timed tasks that run on staff phones during the shift. Every step captures timestamped evidence — photos, supervisor sign-offs, completion times — so the audit record writes itself while the work happens. It is not a hotel LMS, not a document management system, and not a checklist app. It is where the standard and the shift become the same thing.",
  },
  {
    q: "Is Focus Realm a hotel LMS or a training platform?",
    a: "No. An LMS teaches people what to do. Focus Realm makes sure it gets done, on time, to standard, with evidence. Training shows a video of how to reset a guest room; Focus Realm puts the timed task on the attendant's phone, gates the step until the photo exists, and writes a service record the moment they finish. Compared against a hospitality LMS the difference is the output: they produce a completion certificate, we produce an audit-ready service record.",
  },
  {
    q: "How does Focus Realm handle SOP management for hotels?",
    a: "Traditional hotel SOP management means a document — a binder, a PDF, a shared drive folder — that staff are supposed to read and follow. Focus Realm replaces the document with a timed task. The SOP becomes the unit of work: sequenced steps, a target time, photo gates, and supervisor sign-off built into the flow. When the task completes, the SOP has been executed rather than read, and the service record proves it. Digitising hotel SOPs this way means the standard reaches the floor on the next shift, not the next training cycle.",
  },
  {
    q: "What evidence does the platform capture?",
    a: "Photos, supervisor sign-offs, step completion timestamps and task duration — captured as the work happens, not reconstructed afterwards. A step that requires photo evidence will not close until the photo exists, so the evidence trail is a gate rather than an afterthought. Every item is tied to a specific room, a specific staff member, a specific shift and a specific standard, which is what makes hotel inspection readiness a filter rather than a fire drill.",
  },
  {
    q: "Does Focus Realm need a PMS integration?",
    a: "No. Focus Realm runs in any browser, on any phone, over mobile data. No PMS integration, no special hardware, no IT deployment project. Staff use the phones they already carry. This is deliberate: the platform should work on day one of a pilot, not after a six-week integration.",
  },
  {
    q: "Who are the three role interfaces for?",
    a: "Three people, three jobs, three interfaces. The people doing the work — room attendants, F&B, front office — get a mobile-first timed task built for one thumb in bright daylight on a cheap Android. Supervisors and heads of department get a desktop view of live floor state, blocked rooms and department performance. Whoever owns the standard at your property, usually the training lead or quality manager, gets a desktop workspace where it is written once and published straight into the shift. Not one responsive compromise — three purpose-built tools sharing one service record.",
  },
  {
    q: "How does a Focus Realm pilot work?",
    a: "One property. Your floors, your standards, your shift patterns. We scope narrow on purpose so the evidence is real. A 15-minute demo walks the three interfaces against a live environment; then we deploy to a single property, typically starting with housekeeping, and the service record builds itself over the first thirty days. Pilots are scoped per property, so pricing comes out of that call rather than a rate card.",
  },
  {
    q: "Who founded Focus Realm Hospitality?",
    a: "Three co-founders. Sehej Sharma is Co-Founder and CEO, responsible for category, positioning and go-to-market. Ali Electricwala is Co-Founder and COO, responsible for pilot design, customer success and commercial operations. Aditya Mishra is Co-Founder and CTO, responsible for platform architecture and subtraction-first design on Google Cloud and Firebase. The founding discipline: remove it unless it helps the shift.",
  },
] as const;
