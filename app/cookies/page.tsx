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
          This website is deliberately light. It carries no advertising pixels, no cross-site trackers and no
          third-party marketing tags. Nothing on this site follows you to another one.
        </p>
        <p>
          That is a design decision, not a legal formality — the same subtraction-first thinking we apply to
          the product applies here.
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
            <strong>Aggregate measurement.</strong> Where we measure which pages are useful, it is first-party
            and reported in aggregate — page counts and referrers, not individual profiles.
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
          Browsers also offer a &ldquo;Do Not Track&rdquo; or global privacy control signal. We do not perform
          cross-site tracking, so there is nothing for that signal to switch off here.
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
