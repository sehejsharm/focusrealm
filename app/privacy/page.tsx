import type { Metadata } from "next";
import Link from "next/link";

import LegalLayout, { type LegalSection } from "@/components/legal/LegalLayout";
import { breadcrumbSchema, jsonLdGraph, webPageSchema } from "@/lib/seo";
import { legal, site } from "@/lib/site";

const title = "Privacy Policy";
const description = `How ${site.name} collects, uses, stores and protects personal data across this website and the Focus Realm service execution platform, and the rights you have over that data.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { title: `${title} · ${site.shortName}`, description, url: "/privacy", type: "website" },
  robots: { index: true, follow: true },
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    body: (
      <>
        <p>
          {legal.entity} (&ldquo;Focus Realm&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this website
          and the Focus Realm service execution platform for hotel operations.
        </p>
        <p>
          For data submitted through this website — a demo request, a contact message — we are the{" "}
          <strong>data controller</strong>. For data processed inside a customer&rsquo;s platform tenant —
          staff records, task completions, photo evidence — the customer property or group is the controller
          and we act as a <strong>data processor</strong> on their documented instructions.
        </p>
        {legal.registeredAddress ? <p>{legal.registeredAddress}</p> : null}
        <p>
          Privacy questions: <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    heading: "What we collect",
    body: (
      <>
        <p>
          <strong>Information you give us.</strong> When you submit the demo or contact form we receive the
          fields you complete — typically your name, work email, role, property or company name, property
          size, timeline and whatever you write in the message box.
        </p>
        <p>
          <strong>Information sent automatically.</strong> Like any website, our hosting provider records
          standard technical data when a page is served: IP address, browser and device type, referring page,
          and the pages requested. This is used to keep the site available and secure.
        </p>
        <p>
          <strong>Platform data.</strong> Where a property uses the Focus Realm platform, the platform holds
          operational records — staff accounts, assigned standards, task completions, timestamps, photo
          evidence and supervisor sign-offs. That data belongs to the customer, and we process it only to
          deliver the service to them.
        </p>
        <p>
          We do not knowingly collect data from anyone under 16 through this website, and we do not buy
          personal data from third-party list vendors.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    heading: "How we use it, and on what basis",
    body: (
      <>
        <ul>
          <li>
            <strong>To answer you.</strong> Replying to a demo request or enquiry, and scheduling the call.
            Basis: steps taken at your request prior to entering a contract, and our legitimate interest in
            responding to business enquiries.
          </li>
          <li>
            <strong>To provide the platform.</strong> Operating a customer&rsquo;s tenant, supporting users,
            and maintaining security. Basis: performance of a contract.
          </li>
          <li>
            <strong>To keep the site working.</strong> Availability, abuse prevention, and aggregate
            understanding of which pages are useful. Basis: legitimate interests.
          </li>
          <li>
            <strong>To meet legal obligations.</strong> Tax, accounting and lawful requests. Basis: legal
            obligation.
          </li>
        </ul>
        <p>
          We do not sell personal data. We do not use the information you send through this website to build
          advertising profiles, and we do not share it with advertising networks.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    heading: "Cookies and tracking",
    body: (
      <>
        <p>
          This website is built to run without advertising or cross-site tracking cookies. Any cookies set are
          strictly necessary for the site to function, or are first-party measurement used in aggregate.
        </p>
        <p>
          Full detail, including how to refuse or delete cookies in your browser, is on the{" "}
          <Link href="/cookies">Cookie Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    heading: "Who we share data with",
    body: (
      <>
        <p>We share personal data only with parties that help us run the service, and only as far as needed:</p>
        <ul>
          <li>
            <strong>Infrastructure and hosting</strong> — Google Cloud and Firebase host the platform; the
            website is served by our hosting provider.
          </li>
          <li>
            <strong>Communication tools</strong> — the email provider that carries your message to us.
          </li>
          <li>
            <strong>Professional advisers</strong> — accountants and lawyers, where they need it.
          </li>
          <li>
            <strong>Authorities</strong> — where we are legally required to disclose.
          </li>
        </ul>
        <p>
          Each processor is bound by contract to protect the data and to use it only for the purpose we set.
          If Focus Realm is ever involved in a merger or acquisition, personal data may transfer as part of
          that transaction, and you will be told before it becomes subject to a different policy.
        </p>
      </>
    ),
  },
  {
    id: "transfers",
    heading: "International transfers",
    body: (
      <p>
        Our infrastructure providers operate globally, so personal data may be processed outside the country
        where it was collected. Where data leaves a jurisdiction that restricts transfers, we rely on the
        safeguards those providers offer — including standard contractual clauses — so that the protection
        travels with the data.
      </p>
    ),
  },
  {
    id: "retention",
    heading: "How long we keep it",
    body: (
      <>
        <p>
          Enquiry and demo-request data is kept for as long as the conversation is live, and for up to{" "}
          <strong>24 months</strong> afterwards so we can pick a thread back up — then deleted.
        </p>
        <p>
          Platform data is retained for the term of the customer&rsquo;s agreement and deleted or returned on
          termination, according to that agreement. Backups age out on their own schedule.
        </p>
        <p>You can ask us to delete your enquiry data sooner, and we will.</p>
      </>
    ),
  },
  {
    id: "security",
    heading: "Security",
    body: (
      <p>
        Data is encrypted in transit. Access to production systems is limited to the people who need it,
        authenticated individually, and reviewed. No system is perfectly secure, and we will not claim
        otherwise — but if a breach affects your personal data and the risk warrants it, we will notify you and
        the relevant authority within the timeframes the law sets.
      </p>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: (
      <>
        <p>
          Depending on where you live, you have rights under {legal.dataProtectionLaws}. These generally
          include the right to:
        </p>
        <ul>
          <li>access the personal data we hold about you, and get a copy;</li>
          <li>correct data that is wrong or incomplete;</li>
          <li>ask us to erase it, where there is no overriding reason to keep it;</li>
          <li>object to or restrict processing based on legitimate interests;</li>
          <li>receive your data in a portable format;</li>
          <li>withdraw consent at any time, where consent was the basis; and</li>
          <li>complain to your data protection authority.</li>
        </ul>
        <p>
          Write to <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a> and we will respond within
          30 days. If the data sits inside a customer&rsquo;s platform tenant, we will pass your request to
          that customer, since it is their record to act on.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <p>
        We update this policy when what we do changes. The effective date at the top always reflects the
        current version, and material changes will be signposted on this page before they take effect.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            webPageSchema({ path: "/privacy", name: title, description }),
            breadcrumbSchema([{ name: "Privacy Policy", path: "/privacy" }]),
          ),
        }}
      />
      <LegalLayout
        eyebrow="Legal"
        breadcrumbLabel="Privacy Policy"
        titleLines={[
          <>Privacy</>,
          <>
            <span className="text-gradient">Policy.</span>
          </>,
        ]}
        lede="What we collect, why we collect it, who touches it and how to make us delete it. Written in the same plain language we use everywhere else on this site."
        sections={sections}
      />
    </>
  );
}
