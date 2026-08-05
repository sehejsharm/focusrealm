# Focus Realm

A mobile-first SOP execution app for the deskless hospitality workforce —
housekeeping, F&B, and maintenance staff working on the floor, plus the
managers and authors who support them. Built around **strategic
minimalism**: this is not a course catalog or an LMS, it's a single-task
tool that asks nothing of the person holding the phone.

The prototype is constrained to a phone-width frame (`max-w-md`) at every
breakpoint, since every screen here is designed for a device in one hand.

## Three isolated portals

A bottom navigation bar switches between three self-contained portals —
they don't share data or state.

### Staff — `/staff`

- **Home** — the One-Task Dashboard. One massive card, the priority task
  for the shift, nothing else. When the queue is empty: "You're all caught
  up!"
- **Directory** — `/staff/directory`, a 2×2 "ATM grid" of color-coded
  category tiles (Rooms, Food, Maintenance, Guest Service) for browsing
  without a search bar, plus a floating microphone button for voice search.
- **Execution loop** — `/staff/sop/[id]`: tap the task → checklist with a
  video placeholder → one Yes/No verification question → **swipe right to
  complete** (a phone-call-style slider, not a checkbox) → success state →
  back to Home.

### Manager — `/manager`

Exception-based auditing. Apple-style progress rings show overall shift
compliance at the top; below, a roster that shows *only* the staff who are
non-compliant — nothing else. Each row has a one-tap WhatsApp-style nudge
button that fires a toast ("Automated reminder sent to [Name]."). If there
are no exceptions, the screen shows a success graphic and "All systems
optimal. No exceptions."

### Author — `/author`

The Studio: a linear 1-2-3 wizard that can't be overcomplicated.

1. **Upload Media** — a large drag/tap-to-upload zone (video or PDF).
2. **Details** — Title and Brief Instructions.
3. **Deploy** — `[Select Department]` / `[Select Shift or Location]`
   dropdowns (never a name picker), with a live "This SOP will be deployed
   to N matching staff members" readout, and a full-width **Publish &
   Deploy** button that opens a confirmation modal.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · lucide-react.

```bash
npm install
npm run dev
```

Open <http://localhost:3000> — it redirects straight to the Staff portal.

## Structure

```
app/
  page.tsx                    Redirects to /staff
  staff/page.tsx               Home — the One-Task Dashboard
  staff/directory/page.tsx     ATM grid + voice search FAB
  staff/sop/[id]/page.tsx      Checklist → verify → swipe to complete
  manager/page.tsx             Exception-based compliance dashboard
  author/page.tsx              Linear SOP builder
components/
  BottomNav.tsx        Staff / Manager / Author switcher
  StaffTabs.tsx         Home / Directory switch inside the Staff portal
  SwipeToComplete.tsx   The swipe-to-complete slider
lib/
  types.ts  data.ts  store.tsx  ui.ts
```

## Notes

- **No backend.** Staff task completion persists to `localStorage` via
  `useSyncExternalStore` (`lib/store.tsx`) so it survives a refresh; a
  "Reset demo tasks" link appears once something's been completed, purely
  for re-running the prototype. Manager and Author state is in-memory only,
  since they're demo dashboards with no shared source of truth here.
- **Portals are isolated by design** — matching the brief, none of the
  three reads another's state.
