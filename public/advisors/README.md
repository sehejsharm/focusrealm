# Advisor portraits — drop files here

No code change needed. Name each file after the advisor's slug:

| File | Person |
|---|---|
| `parul-sharma.jpg` | Parul Sharma — Hospitality Training Consultant |
| `renu-mehra.jpg` | Renu Mehra — Luxury & Celebrity Image Consultant |

`.jpg`, `.jpeg`, `.png`, `.webp` and `.avif` all work. `lib/team-photos.ts`
scans this directory during `next build`; anything it finds is used
automatically on the advisor cards on `/team` and is added as the `image`
field in that advisor's `Person` structured data.

**Specs:** square (1:1), 800×800 or larger. Rendered with
`object-cover object-top`, so headroom above the face is fine but a tight crop
under the chin is not. Until a file exists the monogram plate renders instead
and the layout is unchanged.

The portraits supplied for both advisors are head-and-shoulders shots on a
light background; crop them square around the face before dropping them in.
