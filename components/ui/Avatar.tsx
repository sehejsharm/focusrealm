import Image from "next/image";
import type { StaticImageData } from "next/image";

import { teamPhoto } from "@/lib/team-photos";

/** The minimum an Avatar needs. Both `Person` and `Advisor` satisfy it. */
type AvatarSubject = {
  slug: string;
  name: string;
  initials: string;
  shortRole?: string;
  photo?: StaticImageData;
};

/**
 * Portrait plate. Renders the photo when one exists and a monogram until then
 * — the layout is identical either way, so dropping a file in is the only
 * change needed.
 *
 * Founders resolve their own file from `public/team/<slug>.<ext>`. Anyone who
 * is not on staff passes `src` and `alt` explicitly, because the default alt
 * text names them as Focus Realm leadership and that is only true of founders.
 */
export default function Avatar({
  person,
  src: srcOverride,
  alt,
  className = "size-14",
  rounded = "rounded-2xl",
  sizes = "112px",
  priority = false,
}: {
  person: AvatarSubject;
  src?: string;
  alt?: string;
  className?: string;
  rounded?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const src = srcOverride ?? person.photo?.src ?? teamPhoto(person.slug);

  if (src) {
    return (
      <span
        className={`relative block shrink-0 overflow-hidden border border-brand-bright/25 bg-ink ${rounded} ${className}`}
      >
        <Image
          src={src}
          alt={alt ?? `${person.name} — ${person.shortRole}, Focus Realm Hospitality`}
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
