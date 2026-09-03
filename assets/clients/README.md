# Client logos

Drop logo files here, then import them in `lib/content.ts` and set each one as
that client's `logo`.

| Suggested file | Client | Segment |
|---|---|---|
| `clarks-amer.png` | Clarks Amer — Hotel & Brij Convention Centre | Hotel chains |
| `renu-mehra.png` | Renu Mehra's 'ALL' of finesse | Corporate trainers |
| `dav-jaipur.png` | D.A.V. Sr. Secondary School, Jaipur | Reputed schools |
| `recharga.png` | Recharga | Fast-growing startups |
| `twokey.png` | TwoKey | Premium SaaS teams |
| `the-hosteller.png` | The Hosteller | Distributed properties |

```ts
// lib/content.ts
import clarksAmer from "@/assets/clients/clarks-amer.png";

{ name: "Clarks Amer", segment: "Hotel chains", note: "Hotel & Brij Convention Centre", logo: clarksAmer },
```

**Specs:** transparent PNG or SVG, roughly 400px on the long edge, and light or
white marks — the strip sits on a near-black background, so a logo locked to a
white rectangle will show as a bright block. If only a dark-on-white version
exists, ask the client for a reversed/mono version, or the wordmark fallback
below usually looks better than a boxed logo.

Until a file is added, `components/home/TrustedBy.tsx` renders the client's name
as a wordmark tile. That still carries the name in the HTML for crawlers, so
this is a design upgrade rather than a missing feature.
