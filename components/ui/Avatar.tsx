import Image from "next/image";

import type { Person } from "@/lib/content";
import { teamPhoto } from "@/lib/team-photos";

/**
 * Founder portrait. Renders the photo when one exists at
 * `public/team/<slug>.<ext>`, and a monogram plate until then — the layout is
 * identical either way, so dropping a file in is the only change needed.
 */
export default function Avatar({
  person,
  className = "size-14",
  rounded = "rounded-2xl",
  sizes = "112px",
  priority = false,
}: {
  person: Person;
  className?: string;
  rounded?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const src = person.photo?.src ?? teamPhoto(person.slug);

  if (src) {
    return (
      <span
        className={`relative block shrink-0 overflow-hidden border border-brand-bright/25 bg-ink ${rounded} ${className}`}
      >
        <Image
          src={src}
          alt={`${person.name} — ${person.shortRole}, Focus Realm Hospitality`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
        {/* Ties any lighting to the page's teal without touching the face. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-brand-navy/40 via-transparent to-transparent mix-blend-multiply"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center border border-brand-bright/25 bg-linear-to-br from-brand/30 to-brand-deep/20 font-mono text-white ${rounded} ${className}`}
    >
      {person.initials}
    </span>
  );
}
