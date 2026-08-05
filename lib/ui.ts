import {
  BedDouble,
  ConciergeBell,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "./types";

export const CATEGORY_STYLE: Record<
  Category,
  { Icon: LucideIcon; solid: string; tint: string; text: string }
> = {
  rooms: {
    Icon: BedDouble,
    solid: "bg-sky-500",
    tint: "bg-sky-50",
    text: "text-sky-700",
  },
  food: {
    Icon: UtensilsCrossed,
    solid: "bg-amber-500",
    tint: "bg-amber-50",
    text: "text-amber-700",
  },
  maintenance: {
    Icon: Wrench,
    solid: "bg-orange-600",
    tint: "bg-orange-50",
    text: "text-orange-700",
  },
  guest: {
    Icon: ConciergeBell,
    solid: "bg-violet-500",
    tint: "bg-violet-50",
    text: "text-violet-700",
  },
};
