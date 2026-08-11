# Founder portraits

Drop a square image here named after the person's slug, then import it in
`lib/content.ts` and set it as that person's `photo`.

| File | Person |
|---|---|
| `sehej-sharma.jpg` | Sehej Sharma — Co-Founder & CEO |
| `ali-electricwala.jpg` | Ali Electricwala — Co-Founder & COO |
| `aditya-mishra.jpg` | Aditya Mishra — Co-Founder & CTO |

```ts
// lib/content.ts
import sehejSharma from "@/assets/team/sehej-sharma.jpg";

// …inside that person's entry
photo: sehejSharma,
```

**Specs:** square (1:1), at least 800×800, JPG or PNG. They are rendered with
`object-cover object-top`, so headroom above the face is fine but a tight crop
under the chin is not.

Until a file is added, `components/ui/Avatar.tsx` renders the monogram plate —
the layout is identical either way, and adding the photo also populates the
`image` field in that founder's `Person` structured data, which is what puts a
face next to their name in search results.
