import Script from "next/script";

import { isUnindexableHost } from "@/lib/site";

/**
 * Google Analytics 4 and Google Tag Manager.
 *
 * Both containers are installed as issued by Google. GA4 runs directly via
 * gtag.js rather than through a GTM tag — if a GA4 Configuration tag is ever
 * added inside container GTM-N7L25365, every pageview is counted twice. Fire
 * one or the other, never both.
 *
 * Only loads on the production host: preview deployments and local
 * development would otherwise report as real traffic in the property, and a
 * new property has no history to make that noise obvious.
 */
const GA_MEASUREMENT_ID = "G-X8HT0D7TPW";
const GTM_CONTAINER_ID = "GTM-N7L25365";

export const analyticsEnabled = process.env.NODE_ENV === "production" && !isUnindexableHost;

export function AnalyticsScripts() {
  if (!analyticsEnabled) return null;

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>

      {/* Google Tag Manager */}
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`}
      </Script>
    </>
  );
}

/** Google Tag Manager (noscript). Belongs immediately after the opening body tag. */
export function AnalyticsNoScript() {
  if (!analyticsEnabled) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
