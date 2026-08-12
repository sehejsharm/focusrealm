import type { Metadata } from "next";

import Reveal from "@/components/fx/Reveal";
import LeadForm, { type FieldSpec } from "@/components/forms/LeadForm";
import { PhoneFrame } from "@/components/ui/DeviceFrame";
import PageHero from "@/components/ui/PageHero";
import { Container, Eyebrow, Rule } from "@/components/ui/Section";
import staffToday from "@/assets/platform/staff-today.jpg";
import { property, roles } from "@/lib/content";
import { breadcrumbSchema, jsonLdGraph, webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Book a 15-minute demo";
const description =
  "See the Focus Realm platform on one real hotel shift in 15 minutes — staff, manager and author interfaces — then a pilot scoped to your own standards.";
const ogDescription =
  "Book a 15-minute walkthrough of the Focus Realm service execution platform: the staff mobile interface, the manager service picture and the author workspace, run live against a real shift — then a pilot scoped to your own standards.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "book a hotel SOP software demo",
    "hotel operations software demo",
    "Focus Realm demo",
    "hotel SOP pilot",
  ],
  alternates: { canonical: "/demo" },
  openGraph: { title: `${title} · ${site.shortName}`, description: ogDescription, url: "/demo", type: "website" },
  twitter: { card: "summary_large_image", description: ogDescription },
};

const fields: FieldSpec[] = [
  { kind: "text", name: "name", label: "Your name", placeholder: "Full name", required: true, half: true, autoComplete: "name" },
  { kind: "text", name: "email", label: "Work email", type: "email", placeholder: "you@property.com", required: true, half: true, autoComplete: "email" },
  { kind: "text", name: "role", label: "Your role", placeholder: "General Manager, HR Director, Head of L&D…", half: true, autoComplete: "organization-title" },
  { kind: "text", name: "company", label: "Property or group", placeholder: "Hotel or group name", required: true, half: true, autoComplete: "organization" },
  { kind: "select", name: "size", label: "Property size", options: ["Under 100 rooms", "100–249 rooms", "250–499 rooms", "500+ rooms", "Multi-property group"], half: true },
  { kind: "select", name: "timeline", label: "Timeline", options: ["Exploring", "Next quarter", "This quarter", "Audit deadline coming"], half: true },
  {
    kind: "select",
    name: "priority",
    label: "Sharpest pain right now",
    options: [
      "Supervisor bottleneck",
      "Ghost SOP — the standard is not executed",
      "No visibility on who meets standard",
      "Turnover resetting service quality",
      "Guest rating capped by inconsistency",
      "Audit evidence we cannot produce",
    ],
  },
  {
    kind: "textarea",
    name: "context",
    label: "Anything we should know",
    placeholder: "Departments in scope, current tools, the shift that hurts most…",
  },
];

const agenda = [
  {
    step: "01",
    minutes: "0–3 min",
    title: "Your floor, not our slides",
    body: "Which of the six pains is loudest, which departments carry it, and what the current evidence trail actually looks like.",
  },
  {
    step: "02",
    minutes: "3–8 min",
    title: "Staff, live on a phone",
    body: `A timed task on ${roles[0].persona}'s shift at ${property.name} — countdown running, photo gate blocking the step, supervisor sign-off attaching.`,
  },
  {
    step: "03",
    minutes: "8–12 min",
    title: "Manager and Author",
    body: "The live service picture, assignment without chasing, and how a standard is written and published straight into tonight's shift.",
  },
  {
    step: "04",
    minutes: "12–15 min",
    title: "Pilot shape",
    body: "One property, your standards, thirty days, and the specific evidence you would be holding at the end of it.",
  },
];

export default function DemoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            webPageSchema({ path: "/demo", name: title, description }),
            breadcrumbSchema([{ name: "Demo", path: "/demo" }]),
          ),
        }}
      />

      <PageHero
        eyebrow="Walkthrough & pilot"
        breadcrumb={[{ label: "Demo" }]}
        titleLines={[
          <>Fifteen minutes.</>,
          <>
            One real <span className="text-gradient">shift.</span>
          </>,
        ]}
        lede="No feature tour. We take one shift on one floor and show you the standard going into the task, the evidence coming out of it, and the record it leaves behind — then we scope what that looks like on your property."
      />

      <section className="relative pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            {/* Form */}
            <Reveal>
              <LeadForm
                fields={fields}
                subject="Demo request — Focus Realm Hospitality"
                formId="demo"
                submitLabel="Request the walkthrough"
                successTitle="Request received."
                successBody="A founder reads every one of these. We will come back with two or three times for your 15-minute walkthrough, usually within one working day."
              />
            </Reveal>

            {/* Agenda */}
            <div id="what-you-see" className="scroll-mt-28">
              <Reveal>
                <Eyebrow>What the fifteen minutes covers</Eyebrow>
              </Reveal>

              {/* Reveal wraps the <li>, never sits between <ol> and <li>. */}
              <ol className="mt-8 space-y-1">
                {agenda.map((item, index) => (
                  <li
                    key={item.step}
                    className="group border-l-2 border-line py-5 pl-6 transition-colors duration-500 hover:border-brand-bright/60"
                  >
                    <Reveal delay={index * 60}>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[0.6rem] tracking-[0.16em] text-brand-ice">
                          {item.step}
                        </span>
                        <span className="font-mono text-[0.6rem] tracking-[0.1em] text-faint uppercase">
                          {item.minutes}
                        </span>
                      </div>
                      <h2 className="mt-3 text-[1.12rem] font-semibold text-white">{item.title}</h2>
                      <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{item.body}</p>
                    </Reveal>
                  </li>
                ))}
              </ol>

              <Reveal delay={200} className="mt-10">
                <div className="panel flex items-center gap-6 overflow-hidden p-6">
                  <div className="w-[112px] shrink-0">
                    <PhoneFrame
                      src={staffToday}
                      alt={roles[0].screens[0].alt}
                      glow={false}
                      sizes="112px"
                    />
                  </div>
                  <div>
                    <p className="font-mono text-[0.58rem] tracking-[0.14em] text-brand-ice uppercase">
                      Demo environment
                    </p>
                    <p className="mt-2.5 text-[0.98rem] font-medium text-white">{property.name}</p>
                    <p className="mt-1.5 text-[0.85rem] leading-relaxed text-faint">
                      {property.staff} staff · {property.floors} guest floors · one shift.
                      Fictional, and identical in every demo we run.
                    </p>
                  </div>
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
                title: "You do not need a systems project",
                body: "No PMS integration, no hardware, no IT lead time. Standard browsers on the phones your team already carries.",
              },
              {
                title: "Bring your worst standard",
                body: "The one nobody follows. We will author it live and put it on a phone before the call ends.",
              },
              {
                title: "One property first",
                body: "Pilots are deliberately narrow. Evidence should be accumulating inside the first thirty days or the pilot was scoped wrong.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <div>
                  <h2 className="text-[1.02rem] font-semibold text-white">{item.title}</h2>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
