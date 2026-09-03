# Focus Realm Hospitality — marketing site

The public site for **Focus Realm Hospitality**, the service execution platform
for hotel operations. Tagline: _Every shift, five-star._

This repository contains the marketing site only. The product prototype lives
separately at <https://fr2-b6s.pages.dev/>.

## Positioning discipline

This is **not** an LMS and not a training platform. The category is
**Service Execution Platform** — "the operating system for hotel service
standards".

| Use | Avoid |
|---|---|
| standards, operating briefs, timed tasks, evidence, service record, readiness | course, module, learner, training platform, LMS |

`Courses` / `Modules` are acceptable as in-product screen labels only, never at
the category or positioning level. Any copy change that reintroduces LMS
language is a regression — the wording lives in `lib/content.ts` and
`lib/site.ts`, so it is reviewable in one place.

## Routes

| Route | Purpose |
|---|---|
| `/` | The mechanism, three interfaces, six pains, positioning, demo property, buyers, team, FAQ |
| `/platform` | Deep dive on Staff, Manager and Author interfaces with every product screen |
| `/problems` | The six pains in full — Status Quo → Impact Chain → The Wound → The Answer |
| `/about` | The thesis, why this is not an LMS, the four build principles |
| `/team` | Founding team |
| `/team/[slug]` | Individual profiles — `sehej-sharma`, `ali-electricwala`, `aditya-mishra` |
| `/demo` | Book a 15-minute walkthrough (form) |
| `/contact` | Contact the founders (form) |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/cookies` | Cookie Policy |

Generated automatically: `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`,
`/icon`, `/apple-icon`, `/opengraph-image`, and a per-person OG card at
`/team/[slug]/opengraph-image`.

## Set this before launch

**`NEXT_PUBLIC_SITE_URL`** — the production origin. Every canonical tag,
sitemap URL, Open Graph URL and JSON-LD `@id` derives from it (`lib/site.ts`).
Without it the site falls back to `https://focusrealm.org`, the deployed apex
domain. If this variable is set anywhere in hosting it **must** be the apex —
setting it to the `www.` host republishes every canonical and every `@id` on a
second origin, which splits the site into two entities in Google's index.

It is baked in **at build time**, not read at runtime — this is a static
export. A normal production build needs nothing set. If the site is ever served
from another origin, rebuild with that value or every canonical and Open Graph
URL will point at the wrong host.

Any host matching `*.web.app`, `*.firebaseapp.com`, `*.vercel.app` or
`*.netlify.app` is served `noindex`, so a preview link never competes with the
production domain.

### Confirm before launch — legal

`lib/site.ts` exports a `legal` object whose strings appear **verbatim** in the
Privacy Policy and Terms of Service. Have these confirmed by counsel:

| Field | Current value | Why it matters |
|---|---|---|
| `entity` | Focus Realm Hospitality | Named as the controller and as the contracting party |
| `jurisdiction` | India | Governing law clause in the Terms |
| `courts` | Jaipur, Rajasthan, India | Exclusive jurisdiction clause |
| `registeredAddress` | *(empty)* | Only rendered when set. A registered address is expected in a privacy policy |
| `effectiveDate` | 11 August 2026 | Shown at the top of every policy — bump it when you change a policy |

The liability cap in the Terms names a figure in ₹; change the currency if the
contracting entity is not Indian.

### Images to add

Two directories carry drop-in slots with their own instructions:

- `assets/team/` — founder portraits. Adding one also populates the `image`
  field in that founder's `Person` structured data.
- `assets/clients/` — client logos for the trusted-by strip.

Both render a designed fallback until a file exists, so nothing is broken
without them.

## SEO

On-page:

- Unique `title` + `description` + self-referencing canonical on every route.
- `title.template` in the root layout so every page reads `Page · Focus Realm Hospitality`.
- Keyword sets per route targeting `service execution platform`,
  `SOP management system for hotels`, `hotel SOP software`,
  `SOP development system`, plus founder-name queries.
- Semantic heading order, one `h1` per page, descriptive `alt` text on all
  product screenshots, breadcrumb navigation on inner pages.
- Every reveal animation degrades to visible content — a `<noscript>` style
  block in the root layout unhides everything if JS fails, so crawlers and
  no-JS clients always get the copy.

Structured data (`lib/seo.ts`), emitted as one `@graph` per page:

- `Organization` + `WebSite` + `SoftwareApplication` site-wide, with
  `founder` / `employee` edges pointing at the person nodes.
- `Person` on each `/team/[slug]`, wrapped in `ProfilePage`, with `worksFor`,
  `memberOf` and `affiliation` back-referencing the organisation. This is what
  earns a "X is the Co-Founder & CEO of Focus Realm Hospitality" style answer.
- **All three founders are also declared on the home page**, so a founder-name
  query can resolve to `/` as well as to the profile. Each profile page's
  meta description opens with the literal sentence
  "<Name> is the <Role> of Focus Realm Hospitality" — written to be the snippet.
- `FAQPage` on the home page, `ItemList` for the six pains on `/problems` and
  for the founders on `/team`, `Review` nodes for the client testimonials,
  `ContactPage` + `ContactPoint` on `/contact`, `BreadcrumbList` on inner pages.

Off-page work the site cannot do for itself — do these after the domain is live:

1. Verify the property in Google Search Console and Bing Webmaster Tools, then
   submit `/sitemap.xml`. Add the verification token to `metadata.verification`
   in `app/layout.tsx`.
2. Claim the Google Business Profile and the LinkedIn company page, then add
   every profile URL to `site.sameAs` in `lib/site.ts` — `sameAs` is how the
   entity graph gets corroborated.
3. **Add each founder's LinkedIn (and X, GitHub, personal site) to the
   `sameAs` array on their entry in `lib/content.ts`.** This is the single
   highest-leverage step for the "search a founder's name and this site comes
   up" goal: the profile page already claims the relationship, and `sameAs`
   is what lets Google confirm it against a profile it already trusts. Then
   make each founder's LinkedIn headline read
   "Co-Founder & CEO at Focus Realm Hospitality" and link the website field
   back to their `/team/<slug>` page, so the corroboration runs both ways.
4. Add `focusrealm.org` as a custom domain on the `fr-main-landing` Firebase
   Hosting site and point DNS at it, with `www` → apex as a permanent redirect
   so link equity lands on one hostname. The apex is what `lib/site.ts` bakes
   into every canonical and `@id`.
5. Get the founders' names onto third-party pages that already rank — podcast
   guest bios, conference speaker pages, press mentions, Crunchbase — each
   linking to `/team/<slug>`. Structured data states the fact; external links
   are what make Google believe it.

## Design system

Dark base, brand blues taken from the FR mark. Tokens live in `app/globals.css`
under `@theme`; nothing hardcodes a hex outside that file except two intentional
uses of `#ff9b9b` for "the wound" copy.

Motion is CSS-driven with `IntersectionObserver` triggers and one
`requestAnimationFrame` scroll-progress hook — no animation library. Every
animation is disabled under `prefers-reduced-motion: reduce`.

```
app/                  routes + metadata files
components/fx/        Reveal, Aurora, SpotlightCard, CountUp, scroll hooks
components/home/      Hero, Mechanism, RoleShowcase, PainSnowball, NotAnLms, …
components/site/      Header, Footer, Logo
components/ui/        Button, Section, DeviceFrame, PageHero
components/forms/     LeadForm + field primitives
lib/site.ts           URLs, brand strings, navigation
lib/content.ts        pains, roles, screens, team, personas, FAQs
lib/seo.ts            metadata helper + JSON-LD builders
assets/platform/      product screenshots (statically imported by next/image)
```

## Forms

`/demo` and `/contact` validate in the browser and hand off to the visitor's
mail client with a structured body — there is no backend yet. To wire a real
inbox, replace the `handoff` block in `components/forms/LeadForm.tsx` with a
`POST` to a route handler; the field specs already describe the payload.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4.
Every route prerenders — there is no server runtime.

## Deploy

Firebase Hosting, as a static export. Firebase's framework-aware Hosting is
permanently closed to new Next.js projects, so this ships as plain files on the
CDN: `next.config.ts` sets `output: "export"`, there is no `app/api/`, and the
lead forms hand off to the visitor's mail client.

| | |
|---|---|
| Firebase project | `focus-realm-1` |
| Hosting site | `fr-main-landing` → https://fr-main-landing.web.app |
| Publish directory | `out/` |

```bash
npm ci && npm run build          # writes ./out
firebase emulators:start --only hosting   # preview at 127.0.0.1:5000
firebase deploy --only hosting
```

That project holds several sites, so the `site` key in `firebase.json` is what
keeps a deploy off `focus-realm-1`, `fr-hotels` and the rest.

`firebase.json` also states `Content-Type: image/png` for `/icon`,
`/apple-icon`, `/opengraph-image` and `/team/*/opengraph-image`. Next's metadata
routes export those **without a file extension**, so Firebase cannot infer a
type, and with `nosniff` set an unlabelled image will not render in a social
card. The emulator does not apply the `headers` block at all — headers can only
be confirmed against a real deploy.

### Deploy-ready branch convention

**Every deployable state is committed to its own branch before it goes live**,
named:

```
deploy_ready_fb_<YYYY-MM-DD>            e.g. deploy_ready_fb_2026-09-03
deploy_ready_fb_<YYYY-MM-DD>_<HHMM>     when there is more than one that day
```

`fb` is the host — Firebase. A different host takes a different token, so the
branch says where the snapshot was destined.

Why: the deploy layer (static-export config, `firebase.json`, the removed API
route, the mail-handoff form) does not live on `main`. Without a snapshot,
pulling `main` silently discards it, and there is no way to answer "what exactly
is live right now?" These branches are the answer, and they are what you roll
back to.

The loop is:

1. `git checkout main && git pull` — take the latest application code.
2. Re-apply the deploy layer on top.
3. Build, lint, and walk the site in the emulator.
4. Commit to a new `deploy_ready_fb_<date>` branch. `main` stays untouched.
5. Deploy from that branch.

`main` is never modified by a deploy. It stays a clean mirror of the
application code.
