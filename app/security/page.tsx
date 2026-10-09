import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/fx/Reveal";
import { ButtonLink, ArrowRight } from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { breadcrumbSchema, jsonLdGraph, organizationSchema, webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Security and Trust";
const description =
  "How Focus Realm protects institutional data across Focus Realm Education and Mise: encryption, access control, activity records, data protection and responsible disclosure.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/security" },
  openGraph: { title: `${title} · ${site.shortName}`, description, url: "/security", type: "website" },
  twitter: { card: "summary_large_image", description },
};

/**
 * Trust centre. Every statement here describes a practice in place today;
 * nothing claims a certification the company does not hold.
 */
const sections = [
  {
    title: "Infrastructure",
    items: [
      ["Cloud hosting", "Our products are built on Google Cloud and Firebase, on managed infrastructure maintained by Google."],
      ["Encryption in transit", "All traffic is served over HTTPS. This site sends HSTS on every response, so browsers never fall back to plain HTTP."],
      ["Encryption at rest", "Data stored in Google Cloud and Firebase is encrypted at rest by the platform by default."],
    ],
  },
  {
    title: "Access and accountability",
    items: [
      ["Role-based access", "Each user sees what their role needs: staff, managers and administrators in Mise; students, teachers and administrators in education."],
      ["Activity record", "Work done in the products is timestamped and attributed to a person, so an institution can review what happened and when."],
      ["Least privilege internally", "Production access is limited to the engineers who need it to run the service."],
    ],
  },
  {
    title: "Data protection",
    items: [
      ["DPDP Act, 2023", "Personal data is handled in line with India's Digital Personal Data Protection Act, and with UK and EU GDPR where they apply."],
      ["Your data stays yours", "We process institutional data to run the service, not to sell it or to train third-party models."],
      ["Retention and deletion", "Data can be exported or deleted at the end of an engagement, on request from the institution."],
    ],
  },
  {
    title: "Application security",
    items: [
      ["Hardened headers", "HSTS, nosniff, frame denial, a strict referrer policy and a locked-down permissions policy on every response."],
      ["Abuse protection", "Public endpoints validate input, cap payload size and are rate limited."],
      ["Dependency hygiene", "Dependencies are kept current, and security updates are applied promptly."],
    ],
  },
] as const;

export default function SecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            webPageSchema({ path: "/security", name: title, description }),
            breadcrumbSchema([{ name: "Security", path: "/security" }]),
            organizationSchema,
          ),
        }}
      />

      <PageHero
        eyebrow="Trust centre"
        breadcrumb={[{ label: "Security" }]}
        titleLines={[<>Security and trust,</>, <span key="b" className="text-gradient">stated plainly.</span>]}
        lede="Schools, universities and hotel groups trust us with their people's data. This page sets out how we protect it, and what to ask us if you need more."
      />

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="space-y-14">
            {sections.map((section) => (
              <div key={section.title} className="grid gap-6 border-t border-line pt-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
                <Reveal>
                  <h2 className="text-[1.4rem] font-semibold tracking-[-0.02em] text-paper">{section.title}</h2>
                </Reveal>
                <ul className="grid gap-6 sm:grid-cols-3">
                  {section.items.map(([t, b], i) => (
                    <Reveal as="li" key={t} delay={i * 60}>
                      <p className="text-[1rem] font-semibold text-paper">{t}</p>
                      <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{b}</p>
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-20 grid gap-5 md:grid-cols-2">
            <div className="panel p-7 sm:p-8">
              <h2 className="text-[1.2rem] font-semibold text-paper">Security reviews and questionnaires</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                Procurement or IT review on your side? We complete vendor security questionnaires and data
                processing agreements as part of onboarding.
              </p>
              <ButtonLink href="/contact" className="mt-6">
                Request a review
                <ArrowRight />
              </ButtonLink>
            </div>
            <div className="panel p-7 sm:p-8">
              <h2 className="text-[1.2rem] font-semibold text-paper">Report a vulnerability</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                Found something? Email{" "}
                <a href={`mailto:${site.email}?subject=Security%20report`} className="font-medium text-brand underline underline-offset-4">
                  {site.email}
                </a>{" "}
                with &ldquo;Security&rdquo; in the subject. We acknowledge reports within two working days. Our
                contact is also published at{" "}
                <a href="/.well-known/security.txt" className="font-medium text-brand underline underline-offset-4">
                  security.txt
                </a>
                .
              </p>
              <p className="mt-4 text-[0.9rem] text-faint">
                See also our <Link href="/privacy" className="underline underline-offset-4">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
