import { ChevronRight } from "lucide-react";
import type { SopMedia } from "@/lib/types";
import { MEDIA_ICON } from "@/lib/icons";

/** The single attachment an Author added in the Studio builder. */
export default function MediaTile({ media }: { media: SopMedia }) {
  const Icon = MEDIA_ICON[media.kind];

  return (
    <a
      href={media.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-16 items-center gap-4 rounded-2xl bg-slate-900 px-4 py-3 text-white active:bg-slate-800"
    >
      <span
        className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white/10"
        aria-hidden
      >
        <Icon className="size-8" strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1 text-base leading-tight font-bold">
        Open material
        <span className="block truncate text-xs font-medium text-slate-300">
          {media.label}
        </span>
      </span>
      <ChevronRight className="size-6 shrink-0" aria-hidden />
    </a>
  );
}
