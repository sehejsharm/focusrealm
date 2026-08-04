import {
  BedDouble,
  BellRing,
  ClipboardList,
  ConciergeBell,
  FileText,
  FileType2,
  Flame,
  Link2,
  PlayCircle,
  ShieldCheck,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { MediaKind, SopCategory } from "./types";

/** One high-visibility icon per SOP category — the card's primary visual cue. */
export const CATEGORY_ICON: Record<SopCategory, LucideIcon> = {
  "fire-safety": Flame,
  posh: ShieldCheck,
  fssai: UtensilsCrossed,
  housekeeping: BedDouble,
  service: ConciergeBell,
  "front-desk": BellRing,
  maintenance: Wrench,
};

export const CATEGORY_TINT: Record<SopCategory, string> = {
  "fire-safety": "bg-rose-100 text-rose-700",
  posh: "bg-violet-100 text-violet-700",
  fssai: "bg-teal-100 text-teal-700",
  housekeeping: "bg-indigo-100 text-indigo-700",
  service: "bg-amber-100 text-amber-700",
  "front-desk": "bg-sky-100 text-sky-700",
  maintenance: "bg-orange-100 text-orange-700",
};

export const MEDIA_ICON: Record<MediaKind, LucideIcon> = {
  pdf: FileText,
  doc: FileType2,
  video: PlayCircle,
  form: ClipboardList,
  link: Link2,
};
