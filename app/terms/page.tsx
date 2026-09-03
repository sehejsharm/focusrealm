import type { Metadata } from "next";
import Link from "next/link";

import LegalLayout, { type LegalSection } from "@/components/legal/LegalLayout";
import { breadcrumbSchema, jsonLdGraph, webPageSchema } from "@/lib/seo";
import { legal, site } from "@/lib/site";

const title = "Terms of Service";
const description = `The terms on which ${site.name} provides this website, demonstrations, pilots and the Focus Realm service execution platform.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  openGraph: { title: `${title} · ${site.shortName}`, description, url: "/terms", type: "website" },
};

const sections: LegalSection[] = [
  {
    id: "agreement",
    heading: "This agreement",
    body: (
      <>
        <p>
          These Terms of Service govern your use of this website and of any demonstration, trial or pilot of
          the Focus Realm platform provided by {legal.entity} (&ldquo;Focus Realm&rdquo;, &ldquo;we&rdquo;).
          By using the site you accept them.
        </p>
        <p>
          Paid or production use of the platform is governed by a separate written agreement — a pilot
          agreement, order form or master services agreement. Where that agreement and these terms conflict,{" "}
          <strong>that agreement wins</strong>.
        </p>
      </>
    ),
  },
  {
    id: "use-of-site",
    heading: "Use of this website",
    body: (
      <>
        <p>You may read, share and quote this site. You may not:</p>
        <ul>
          <li>use it in a way that damages, disables or overloads it;</li>
          <li>attempt to gain unauthorised access to any part of it or its infrastructure;</li>
          <li>scrape it to build a competing product or to train a model for commercial resale; or</li>
          <li>submit false information, or someone else&rsquo;s contact details, through our forms.</li>
        </ul>
      </>
    ),
  },
  {
    id: "demos-and-pilots",
    heading: "Demonstrations and pilots",
    body: (
      <>
        <p>
          Demonstrations run against a fictional property environment. Any figures shown in a demonstration are
          illustrative of how the product works — they are not a forecast of results at your property.
        </p>
        <p>
          A pilot is scoped in writing before it starts: the property, the departments, the standards, the
          duration and what will be delivered at the end. Nothing on this website constitutes an offer capable
          of acceptance, a quotation, or a commitment to a price. Any commercial proposal issued before the
          date of these terms is superseded by a current written proposal.
        </p>
      </>
    ),
  },
  {
    id: "customer-content",
    heading: "Your content and data",
    body: (
      <>
        <p>
          Standards you author, records your staff generate, photo evidence and supervisor sign-offs remain{" "}
          <strong>yours</strong>. We claim no ownership of them.
        </p>
        <p>
          You grant us a limited licence to host, process and display that content strictly to operate the
          service for you, to support you, and to keep it secure. We handle it as described in the{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <p>
          You are responsible for having a lawful basis to put your staff&rsquo;s data into the platform, and
          for telling them it is there. Where the platform captures photographic evidence, you are responsible
          for ensuring capture is limited to the operational subject — a room, a setup, a fault — and not to
          people who have not been informed.
        </p>
      </>
    ),
  },
  {
    id: "our-ip",
    heading: "Our intellectual property",
    body: (
      <p>
        The platform, this website, the Focus Realm name and mark, and all software, design and written
        material we produce remain our property. Using the service does not transfer any of it. Feedback you
        send us may be used to improve the product without obligation to you, but we will not publish your
        name alongside it without asking.
      </p>
    ),
  },
  {
    id: "availability",
    heading: "Availability",
    body: (
      <p>
        We work to keep the platform available and will give notice of planned maintenance where we can. This
        website and any free trial or pilot environment are provided on an &ldquo;as is&rdquo; basis without
        warranty. Availability commitments, if any, live in your written agreement.
      </p>
    ),
  },
  {
    id: "liability",
    heading: "Liability",
    body: (
      <>
        <p>
          Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud
          or fraudulent misrepresentation, or for anything else that cannot lawfully be limited.
        </p>
        <p>
          Subject to that: we are not liable for indirect or consequential loss, loss of profit, loss of
          business, or loss of anticipated savings arising from use of this website or a free pilot
          environment; and our total liability in connection with them is limited to any amount you have paid
          us in the twelve months before the claim, or ₹10,000 where you have paid nothing.
        </p>
        <p>
          Focus Realm records that work was executed. It does not certify compliance with any brand standard,
          statutory code or inspection regime. Responsibility for meeting those obligations stays with the
          property.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    heading: "Suspension and termination",
    body: (
      <p>
        We may suspend or withdraw access to this website or a pilot environment where use breaches these
        terms or threatens the service for others. You may stop using the site at any time. Termination of a
        paid engagement is governed by your written agreement, including how your data is returned or deleted.
      </p>
    ),
  },
  {
    id: "governing-law",
    heading: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of {legal.jurisdiction}, and the courts of {legal.courts} have
        exclusive jurisdiction over any dispute arising from them.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact",
    body: (
      <p>
        Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>. Or use the{" "}
        <Link href="/contact">contact page</Link> and a founder will pick it up.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            webPageSchema({ path: "/terms", name: title, description }),
            breadcrumbSchema([{ name: "Terms of Service", path: "/terms" }]),
          ),
        }}
      />
      <LegalLayout
        eyebrow="Legal"
        breadcrumbLabel="Terms of Service"
        titleLines={[
          <>Terms of</>,
          <>
            <span className="text-gradient">Service.</span>
          </>,
        ]}
        lede="The rules for using this site, our demonstrations and our pilots — and where your written agreement takes over from them."
        sections={sections}
      />
    </>
  );
}
