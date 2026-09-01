import fs from "node:fs";
import path from "node:path";

/**
 * Server-only. Resolves founder portraits by scanning `public/team/` at build
 * time, so adding a photo is a file drop rather than a code change:
 *
 *   public/team/sehej-sharma.jpg
 *   public/team/ali-electricwala.jpg
 *   public/team/aditya-mishra.jpg
 *   public/advisors/parul-sharma.jpg
 *
 * Every page that uses these is statically generated, so the scan runs once
 * during `next build` and costs nothing at request time. When a file is
 * absent the avatar falls back to the monogram and the Person schema omits
 * `image` — a 404 in structured data is worse than no image at all.
 */

const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

function scan(folder: string): Record<string, string> {
  const dir = path.join(process.cwd(), "public", folder);
  const found: Record<string, string> = {};
  let entries: string[];

  try {
    entries = fs.readdirSync(dir);
  } catch {
    return found;
  }

  for (const entry of entries) {
    const ext = path.extname(entry).toLowerCase();
    if (!EXTENSIONS.includes(ext)) continue;
    found[path.basename(entry, ext)] = `/${folder}/${entry}`;
  }
  return found;
}

const teamPhotos = scan("team");
const advisorPhotos = scan("advisors");

/** Public path of a founder's portrait, or undefined if none has been added. */
export function teamPhoto(slug: string): string | undefined {
  return teamPhotos[slug];
}

/** Public path of an advisor's portrait, or undefined if none has been added. */
export function advisorPhoto(slug: string): string | undefined {
  return advisorPhotos[slug];
}
