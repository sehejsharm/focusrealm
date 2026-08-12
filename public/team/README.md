# Founder portraits — drop files here

No code change needed. Name each file after the person's slug:

| File | Person |
|---|---|
| `sehej-sharma.jpg` | Sehej Sharma — Co-Founder & CEO |
| `ali-electricwala.jpg` | Ali Electricwala — Co-Founder & COO |
| `aditya-mishra.jpg` | Aditya Mishra — Co-Founder & CTO |

`.jpg`, `.jpeg`, `.png`, `.webp` and `.avif` all work. `lib/team-photos.ts`
scans this directory during `next build`; anything it finds is used
automatically on the team cards, the profile pages and the contact page, and
is added as the `image` field in that founder's `Person` structured data —
which is what puts a face beside their name in search results.

**Specs:** square (1:1), 800×800 or larger. Rendered with
`object-cover object-top`, so headroom above the face is fine but a tight crop
under the chin is not. Until a file exists the monogram plate renders instead
and the layout is unchanged.
