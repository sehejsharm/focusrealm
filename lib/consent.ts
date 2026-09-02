/**
 * Google Consent Mode v2 configuration.
 *
 * Two separate questions live here, and they fail in different directions on
 * purpose:
 *
 * 1. **What the tags are allowed to store.** Decided by `CONSENT_REGIONS`,
 *    which Google evaluates against the visitor's IP geolocation. This is the
 *    authoritative control — it holds whether or not the banner ever renders.
 * 2. **Whether to ask.** Decided in the browser by `consentLikelyRequired()`,
 *    which reads the timezone. It is a heuristic, and it is only ever used to
 *    decide whether to show a banner.
 *
 * A European visitor the heuristic misses is still not measured: their default
 * stays `denied` because Google matched their IP, they simply are not asked.
 * A non-European the heuristic over-matches sees a banner they did not need.
 * Both failure modes are safe, which is why a timezone guess is acceptable
 * here and would not be if it gated storage itself.
 */

/**
 * EEA + UK + Switzerland, as ISO 3166-1 alpha-2. Analytics storage defaults to
 * denied for these until the visitor opts in.
 */
export const CONSENT_REGIONS = [
  // European Economic Area
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "NL", "NO", "PL", "PT", "RO",
  "SK", "SI", "ES", "SE",
  // United Kingdom and Switzerland
  "GB", "CH",
] as const;

/** Where the visitor's answer is remembered. */
export const CONSENT_STORAGE_KEY = "fr-analytics-consent";

export type ConsentChoice = "granted" | "denied";

/** Anchor that reopens the banner, linked from the footer. */
export const CONSENT_REOPEN_HASH = "#cookie-preferences";

/**
 * IANA zones that put a visitor in, or near, the regions above. `Europe/*`
 * over-matches into Russia, Türkiye and Ukraine — harmless, since the cost is
 * an unnecessary banner. The Atlantic zones are the outlying territories of
 * Iceland, Spain and Portugal, which `Europe/*` would otherwise miss.
 */
const CONSENT_TIME_ZONES = [
  "Europe/",
  "Atlantic/Reykjavik",
  "Atlantic/Canary",
  "Atlantic/Madeira",
  "Atlantic/Azores",
  "Atlantic/Faeroe",
  "Atlantic/Faroe",
];

/** Whether to put the banner in front of this visitor. */
export function consentLikelyRequired(timeZone: string | undefined | null): boolean {
  if (!timeZone) return true; // Cannot tell — ask rather than assume.
  return CONSENT_TIME_ZONES.some((zone) =>
    zone.endsWith("/") ? timeZone.startsWith(zone) : timeZone === zone,
  );
}

/**
 * The `gtag('consent', 'default', …)` calls, serialised for the inline script
 * that must run before any Google tag loads.
 *
 * Advertising signals are denied everywhere and never asked about: the site
 * runs no ad products, and the Cookie Policy says so. That leaves the banner
 * governing exactly one thing — `analytics_storage`.
 */
export function consentDefaultsScript() {
  const worldwide = {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
    functionality_storage: "granted",
    security_storage: "granted",
  };

  const restricted = {
    ...worldwide,
    analytics_storage: "denied",
    // Hold the tags briefly so a returning visitor's stored "granted" is
    // applied before the first hit rather than after it.
    wait_for_update: 500,
    region: [...CONSENT_REGIONS],
  };

  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('consent','default',${JSON.stringify(worldwide)});
gtag('consent','default',${JSON.stringify(restricted)});`;
}
