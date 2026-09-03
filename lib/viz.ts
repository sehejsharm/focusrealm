/**
 * Chart tokens and the synthetic operating data the graphics render.
 *
 * Palette decisions, validated against the dark chart surface (#0b2126) with
 * the dataviz validator:
 *
 * - Magnitude uses ONE sequential emerald ramp, monotone in lightness
 *   (OKLCH L 0.332 → 0.891). Adjacent steps clear ΔE 13.1 under protanopia and
 *   deuteranopia. The two darkest steps sit below 3:1 on the surface, so every
 *   chart that uses them ships the relief the rule requires: a numeric legend
 *   and a hover read-out.
 * - State uses a small reserved status scale. Emerald and rose collapse under
 *   protanopia (ΔE 2.9), so status is NEVER colour alone — every status mark
 *   carries a glyph and a label.
 */

export const ramp = ["#0f3f34", "#1a6957", "#2a947a", "#4ec4a1", "#a8ecd4"] as const;

export const status = {
  released: { color: "#4ec4a1", glyph: "check", label: "Released" },
  running: { color: "#dbbc5f", glyph: "clock", label: "In progress" },
  blocked: { color: "#ff9b9b", glyph: "cross", label: "Blocked" },
  queued: { color: "#5f7d78", glyph: "dot", label: "Queued" },
} as const;

export type StatusKey = keyof typeof status;

export const surface = "#0b2126";
export const gridInk = "rgba(148,212,193,0.13)";
export const axisInk = "#9ab5b1";

/** Maps 0–1 to a ramp step. */
export function rampStep(t: number) {
  const index = Math.min(ramp.length - 1, Math.max(0, Math.round(t * (ramp.length - 1))));
  return ramp[index];
}

/* ------------------------------------------------------------------ *
 * Synthetic property data. Deterministic — the same numbers every
 * render, so a screenshot in a deck matches the live site.
 * ------------------------------------------------------------------ */

/** Mulberry32: seeded so server and client agree and hydration is stable. */
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Room = { floor: number; index: number; state: StatusKey; minutes: number };

/**
 * 14 guest floors × 20 rooms. Weighted so the picture reads like a real
 * morning: the top floors are largely released, the low floors still queued.
 */
export function buildFloors(): Room[][] {
  const rand = seeded(20260812);
  return Array.from({ length: 14 }, (_, row) => {
    const done = 1 - row / 14.5;
    return Array.from({ length: 20 }, (_, index) => {
      const r = rand();
      let state: StatusKey = "queued";
      if (r < done * 0.92) state = "released";
      else if (r < done * 0.92 + 0.16) state = "running";
      else if (r < done * 0.92 + 0.19) state = "blocked";
      return { floor: 14 - row, index, state, minutes: 18 + Math.round(rand() * 14) };
    });
  });
}

/** Cumulative evidence over a 30-day pilot: the "compounds" claim, drawn. */
export function buildEvidence() {
  const rand = seeded(88213);
  let photos = 0;
  let signoffs = 0;
  return Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const ramping = Math.min(1, day / 9);
    photos += Math.round((26 + rand() * 12) * ramping);
    signoffs += Math.round((13 + rand() * 7) * ramping);
    return { day, photos, signoffs };
  });
}

/** Readiness by department — sequential magnitude, one hue. */
export const readiness = [
  { dept: "Housekeeping", value: 92, staff: 18 },
  { dept: "Front office", value: 84, staff: 9 },
  { dept: "F&B service", value: 71, staff: 8 },
  { dept: "Engineering", value: 63, staff: 4 },
  { dept: "Spa", value: 48, staff: 3 },
] as const;

/** The four phases of a timed task. Ordered, so it takes the one-hue ramp. */
export const phases = [
  { key: "prepare", label: "Prepare", share: 0.18 },
  { key: "perform", label: "Perform", share: 0.46 },
  { key: "verify", label: "Verify", share: 0.24 },
  { key: "release", label: "Release", share: 0.12 },
] as const;
