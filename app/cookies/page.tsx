import type { Metadata } from "next";
import Link from "next/link";

import LegalLayout, { type LegalSection } from "@/components/legal/LegalLayout";
import { breadcrumbSchema, jsonLdGraph, webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Cookie Policy";
const description = `Which cookies ${site.name} sets on this website, why they exist, and how to refuse or remove them.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cookies" },
  openGraph: { title: `${title} · ${site.shortName}`, description, url: "/cookies", type: "website" },
};

const sections: LegalSection[] = [
  {
    id: "position",
    heading: "Our position on cookies",
    body: (
      <>
        <p>
          This website is deliberately light. It carries no advertising pixels and no retargeting or
          ad-personalisation tags. Nothing on this site follows you around the web to sell you something.
        </p>
        <p>
          It does measure its own audience. We use Google Analytics and Google Tag Manager to understand
          which pages are useful and where visitors arrive from. That is the only third-party tag on the
          site, and it is named below rather than buried.
        </p>
        <p>
          Keeping the list that short is a design decision, not a legal formality — the same
          subtraction-first thinking we apply to the product applies here.
        </p>
      </>
    ),
  },
  {
    id: "what-we-set",
    heading: "What is actually set",
    body: (
      <>
        <ul>
          <li>
            <strong>Strictly necessary.</strong> Cookies or equivalent local storage required to serve pages,
            balance load and protect against abuse. The site cannot function without these, and they carry no
            marketing identifier.
          </li>
          <li>
            <strong>Analytics.</strong> Google Analytics 4, loaded through Google Tag Manager&rsquo;s
            infrastructure, sets cookies in the <code>_ga</code> family to tell one visit from another. We
            read the result in aggregate — page counts, referrers, countries and broad device types, not
            individual profiles. We do not enable Google Signals, ad personalisation or the advertising
            features that would share this data with Google&rsquo;s ad products.
          </li>
          <li>
            <strong>Your answer to this banner.</strong> When you accept or decline, we keep that
            choice in your browser&rsquo;s local storage under{" "}
            <code>fr-analytics-consent</code> so you are not asked again on every page. It holds one
            word — <code>granted</code> or <code>denied</code> — it never leaves your device, and
            clearing your browser data removes it.
          </li>
        </ul>
        <p>
          Signing in to the Focus Realm platform is separate from this website and uses a session cookie to
          keep you authenticated. That is covered by your platform agreement.
        </p>
      </>
    ),
  },
  {
    id: "controlling",
    heading: "Controlling cookies",
    body: (
      <>
        <p>
          Every major browser lets you block or delete cookies, usually under Settings → Privacy. Blocking
          strictly necessary cookies may break parts of the site; blocking everything else will not.
        </p>
        <p>
          Browsers also offer a &ldquo;Do Not Track&rdquo; or global privacy control signal. We do not
          advertise or retarget, so there is nothing of that kind for it to switch off here.
        </p>
        <p>
          Visitors in the EEA, the UK and Switzerland are asked before any analytics cookie is set. Until
          that question is answered the analytics tag runs in a consent-denied state and stores nothing.
          You can change your answer at any time from the{" "}
          <a href="#cookie-preferences">Cookie preferences</a> link in the footer.
        </p>
        <p>
          To opt out of Google Analytics specifically, install Google&rsquo;s{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            browser opt-out add-on
          </a>
          , or block analytics cookies in your browser. The site works exactly the same either way.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    heading: "Changes",
    body: (
      <p>
        If we ever add a category of cookie beyond those above, this page is updated before it goes live, and
        a consent mechanism is added where the law requires one. See the{" "}
        <Link href="/privacy">Privacy Policy</Link> for how personal data is handled more broadly, or write to{" "}
        <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            webPageSchema({ path: "/cookies", name: title, description }),
            breadcrumbSchema([{ name: "Cookie Policy", path: "/cookies" }]),
          ),
        }}
      />
      <LegalLayout
        eyebrow="Legal"
        breadcrumbLabel="Cookie Policy"
        titleLines={[
          <>Cookie</>,
          <>
            <span className="text-gradient">Policy.</span>
          </>,
        ]}
        lede="Short, because there is not much to declare. No advertising pixels, no cross-site trackers, nothing that follows you off this domain."
        sections={sections}
      />
    </>
  );
}
