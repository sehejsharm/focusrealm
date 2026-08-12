import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/fx/Reveal";
import LeadForm, { type FieldSpec } from "@/components/forms/LeadForm";
import SpotlightCard from "@/components/fx/SpotlightCard";
import PageHero from "@/components/ui/PageHero";
import { Container, Eyebrow, Rule } from "@/components/ui/Section";
import { team } from "@/lib/content";
import { breadcrumbSchema, jsonLdGraph, organizationSchema, webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Contact Focus Realm Hospitality";
const description =
  "Talk to the founders of Focus Realm Hospitality about hotel SOP execution, pilots, partnerships or press. One inbox, answered within a working day.";
const ogDescription =
  "Talk to the founding team at Focus Realm Hospitality about hotel SOP execution, pilots, partnerships or press. Early conversations go directly to Sehej Sharma, Ali Electricwala and Aditya Mishra.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["contact Focus Realm", "Focus Realm Hospitality contact", "hotel SOP software enquiry"],
  alternates: { canonical: "/contact" },
  openGraph: { title: `${title} · ${site.shortName}`, description: ogDescription, url: "/contact", type: "website" },
  twitter: { card: "summary_large_image", description: ogDescription },
};

const fields: FieldSpec[] = [
  { kind: "text", name: "name", label: "Your name", placeholder: "Full name", required: true, half: true, autoComplete: "name" },
  { kind: "text", name: "email", label: "Email", type: "email", placeholder: "you@company.com", required: true, half: true, autoComplete: "email" },
  { kind: "text", name: "company", label: "Company", placeholder: "Property, group or organisation", half: true, autoComplete: "organization" },
  {
    kind: "select",
    name: "topic",
    label: "What is this about",
    options: ["A pilot at our property", "Multi-property group", "Partnership", "Careers", "Press or research", "Something else"],
    half: true,
  },
  { kind: "textarea", name: "message", label: "Message", placeholder: "Tell us what you are trying to fix.", required: true },
];

// One address on purpose — a prospect should never have to pick an inbox.
const routes = [
  {
    label: "One inbox, read by the founders",
    value: site.email,
    note: "Demos, pilot scoping, commercials, partnerships, press and careers all land here.",
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            {
              ...webPageSchema({ path: "/contact", name: title, description }),
              "@type": "ContactPage",
            },
            breadcrumbSchema([{ name: "Contact", path: "/contact" }]),
            {
              ...organizationSchema,
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  email: site.email,
                  availableLanguage: ["English"],
                  areaServed: "Worldwide",
                },
              ],
            },
          ),
        }}
      />

      <PageHero
        eyebrow="Talk to us"
        breadcrumb={[{ label: "Contact" }]}
        titleLines={[
          <>Tell us which</>,
          <>
            shift <span className="text-gradient">hurts.</span>
          </>,
        ]}
        lede="We are early enough that the founders answer the inbox. Bring the specific problem — the floor, the department, the audit that went badly — and we will tell you honestly whether this is the right tool for it."
      />

      <section className="relative pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <Reveal>
              <LeadForm
                fields={fields}
                subject="Enquiry — Focus Realm Hospitality"
                formId="contact"
                to={site.email}
                submitLabel="Send message"
                successTitle="Message received."
                successBody="One of the founders will reply, usually within a working day. If it is urgent, the same inbox is listed below."
              />
            </Reveal>

            <div className="space-y-5">
              <Reveal>
                <Eyebrow>Direct lines</Eyebrow>
              </Reveal>

              {routes.map((route, index) => (
                <Reveal key={route.value} delay={index * 90}>
                  <SpotlightCard className="panel p-6">
                    <p className="font-mono text-[0.58rem] tracking-[0.14em] text-faint uppercase">
                      {route.label}
                    </p>
                    <a
                      href={`mailto:${route.value}`}
                      className="mt-3 block text-[1.05rem] font-medium text-white transition-colors hover:text-brand-ice"
                    >
                      {route.value}
                    </a>
                    <p className="mt-2 text-[0.85rem] text-faint">{route.note}</p>
                  </SpotlightCard>
                </Reveal>
              ))}

              <Reveal delay={180}>
                <div className="panel p-6">
                  <p className="font-mono text-[0.58rem] tracking-[0.14em] text-faint uppercase">
                    Who you will be talking to
                  </p>
                  <ul className="mt-4 space-y-3">
                    {team.map((person) => (
                      <li key={person.slug}>
                        <Link
                          href={`/team/${person.slug}`}
                          className="group flex items-center gap-3.5 rounded-xl border border-line bg-white/[0.02] px-3.5 py-3 transition-all duration-500 hover:border-brand-bright/40 hover:bg-brand/8"
                        >
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand/18 font-mono text-[0.62rem] text-brand-ice">
                            {person.initials}
                          </span>
                          <span className="flex flex-col leading-tight">
                            <span className="text-[0.88rem] font-medium text-white">{person.name}</span>
                            <span className="text-[0.75rem] text-faint">{person.shortRole}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={240}>
                <div className="panel p-6">
                  <p className="font-mono text-[0.58rem] tracking-[0.14em] text-faint uppercase">Based in</p>
                  <p className="mt-3 text-[0.95rem] text-paper">Remote-first · India</p>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-faint">
                    Priority markets are travel, hospitality and hotels across India, the wider Asia region and
                    the Middle East — but we take calls from wherever the shift is.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <Rule />

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                title: "If you are comparing us to an LMS",
                body: "Say so. The difference is execution and evidence, and we would rather draw it clearly than let you find out in month three.",
                href: "/about#not-an-lms",
                cta: "Why this is not an LMS",
              },
              {
                title: "If you want to see it first",
                body: "The prototype is open. Twenty-seven routes across all three interfaces, running against the demo property.",
                href: "/platform",
                cta: "See the platform",
              },
              {
                title: "If you already know the pain",
                body: "Skip the discovery call. Book the walkthrough and bring the standard nobody follows.",
                href: "/demo",
                cta: "Book a 15-min demo",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <div>
                  <h2 className="text-[1.02rem] font-semibold text-white">{item.title}</h2>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">{item.body}</p>
                  <Link
                    href={item.href}
                    className="mt-4 inline-block text-[0.85rem] text-brand-cyan underline decoration-brand/40 underline-offset-4 transition-colors hover:text-white"
                  >
                    {item.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
