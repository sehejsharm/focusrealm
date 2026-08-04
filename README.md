# Focus Realm · Staff Portal

Mobile-first UI for **Portal 2 (Staff / Consumption)** of the Focus Realm SOP
Execution Platform. Built for deskless hospitality staff with minimal English
literacy: icon-led, high contrast, and every interactive element at least
56 × 56 px.

## Scope

The interface is bounded by the Focus Realm system specification, which defines
the Staff Portal as follows:

> The staff member logs in on their mobile phone. They are not presented with a
> course catalog or search menus. Instead, their dashboard displays their
> **Priority Assigned SOPs and Tasks**. They review the module, follow the
> steps, answer a quick verification quiz if required, and click "Complete."
> This instantly generates a timestamped **"Read Receipt"** and clears their
> queue so they can return to floor work.

That yields exactly five staff-level capabilities, and the app implements those
and nothing else:

| # | Capability | Where |
|---|---|---|
| 1 | Quick mobile login — avatar tap + 4-digit PIN, no text fields | `/login` |
| 2 | Priority-assigned queue, routed by Role-Based Tagging (Location + Department) | `/staff/tasks` |
| 3 | Module review — Title, Instructions, Media (PDF / Doc / Video / Google Form / Link) | `/staff/tasks/[id]` |
| 4 | Verification quiz, where the module requires one | `/staff/tasks/[id]` |
| 5 | Complete → timestamped Read Receipt, cleared from the queue | `/staff/done` |

### Deliberately excluded

Anything the spec does not grant the Staff Portal is absent by design — no
course catalog, no search, no authoring, no manager dashboards or compliance
reporting (those are Portals 1 and 3), and no photo issue reporting or camera
capture, which the platform does not have. Staff consume SOPs; they do not file
new records.

## Responsive behaviour

| Breakpoint | Layout | Navigation |
|---|---|---|
| Mobile (< 640 px) | 1-column card stack | Fixed bottom bar |
| Tablet (640–1024 px) | 2-column grid | Fixed bottom bar |
| Desktop (> 1024 px) | 3-column grid, `max-w-6xl` centred | Top tab bar |

## Status colour system

| Colour | Class | Meaning |
|---|---|---|
| 🔴 Red | `bg-rose-500` | Urgent — due today or flagged high priority |
| 🟡 Amber | `bg-amber-500` | In Progress — module opened, not yet completed |
| 🟢 Green | `bg-emerald-500` | Completed — Read Receipt written |
| 🔵 Blue | `bg-sky-500` | Assigned — scheduled, not yet started |

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>; `/` redirects to `/login`.

Demo profiles (the PIN is shown on the PIN screen):

| Staff | Department | PIN |
|---|---|---|
| Anita Verma | Housekeeping | 1234 |
| Ravi Kumar | F&B | 2345 |
| Priya Singh | Front Desk | 3456 |
| Mohan Lal | Maintenance | 4567 |

Each profile sees a different queue, because modules route by department —
compliance modules (Fire Safety, POSH) go to everyone; operational SOPs go only
to their tagged department.

## Structure

```
app/
  login/page.tsx              Avatar picker → PIN pad
  staff/layout.tsx            Session guard, header, bottom nav
  staff/tasks/page.tsx        Assigned queue
  staff/tasks/[id]/page.tsx   Module viewer, quiz, complete
  staff/done/page.tsx         Read receipts
components/
  StaffHeader.tsx             Logo, avatar + name, red help button
  ResponsiveNav.tsx           TopNav (desktop) + BottomNav (mobile/tablet)
  TaskCard.tsx                Visual SOP card
  SwipeToComplete.tsx         Drag-to-confirm slider
  VerificationQuiz.tsx        Quick check
  MediaTile.tsx               Author-attached material
  PinPad.tsx                  4-digit entry
  HelpSheet.tsx               Call supervisor / sign out
  SuccessOverlay.tsx          Green checkmark confirmation
lib/
  types.ts  data.ts  store.tsx  status.ts  icons.ts
```

## Notes

- **No backend.** Session state and Read Receipts persist to `localStorage` via
  `useSyncExternalStore`, so server and client renders agree. Swapping
  `lib/store.tsx` for a real API is the only change needed to make receipts
  durable.
- **Completion requires review.** Swipe-to-complete only unlocks once a module
  has been opened, and stays disabled until any required quiz is passed — a Read
  Receipt should never be produced by an accidental tap on the queue.
- **Light theme only**, deliberately: staff use this outdoors and in bright
  service areas.
- Secondary Hindi labels sit under the primary actions and navigation, for the
  low-literacy audience the spec calls out.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · lucide-react.
Standard Vercel-compatible layout; `npm run build` is clean with zero lint errors.
