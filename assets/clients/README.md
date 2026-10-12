# Client logos

Logos for the trusted-by strip on the home page
(`components/home/TrustedBy.tsx`). Each file is imported in `lib/content.ts`
and set as that client's `logo`.

| File | Client | Segment |
|---|---|---|
| `clarks.png` | Clarks Amer — Hotel & Brij Convention Centre | Hotel chains |
| `renu-mehra.png` | Renu Mehra's 'ALL' of finesse | Corporate trainers |
| `dav-jaipur.png` | D.A.V. Sr. Secondary School, Jaipur | Reputed schools |
| `recharga.png` | Recharga | Fast-growing startups |
| `twokey.png` | TwoKey | Premium SaaS teams |

To add a client:

```ts
// lib/content.ts
import newClientLogo from "@/assets/clients/new-client.png";

{ name: "New Client", segment: "Segment", logo: newClientLogo },
```

**Specs:** transparent PNG or SVG, trimmed to the mark with no outer margin.
The strip is white and shows each logo at up to 64px tall, so full-colour
logos work. A client without a `logo` renders as its name alone.
