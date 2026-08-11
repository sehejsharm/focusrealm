import type { Metadata } from "next";

import Reveal from "@/components/fx/Reveal";
import SpotlightCard from "@/components/fx/SpotlightCard";
import RoleShowcase from "@/components/home/RoleShowcase";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { BrowserFrame, PhoneFrame } from "@/components/ui/DeviceFrame";
import PageHero from "@/components/ui/PageHero";
import { Container, Eyebrow, Rule, SectionHeading } from "@/components/ui/Section";
import { mechanism, roles } from "@/lib/content";
import { breadcrumbSchema, jsonLdGraph, softwareSchema, webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Platform — three role interfaces, one service record";
const description =
  "Inside the Focus Realm service execution platform: a mobile-first staff interface built for a 340px viewport, a desktop-primary manager surface for the live service picture, and a desktop-only authoring workspace where hotel SOPs become timed tasks with mandatory photo evidence.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "hotel SOP software",
    "SOP management system for hotels",
    "hotel staff mobile app",
    "housekeeping checklist app with photo evidence",
    "hotel operations dashboard",
    "hotel standard authoring tool",
  ],
  alternates: { canonical: "/platform" },
  openGraph: { title: `${title} · ${site.shortName}`, description, url: "/platform", type: "website" },
};

const routeFor = { staff: "/staff/today", manager: "/manager/overview", author: "/author/create" } as const;

export default function PlatformPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            webPageSchema({ path: "/platform", name: title, description }),
            breadcrumbSchema([{ name: "Platform", path: "/platform" }]),
            softwareSchema,
          ),
        }}
      />

      <PageHero
        eyebrow="Product architecture"
        breadcrumb={[{ label: "Platform" }]}
        titleLines={[
          <>Three interfaces.</>,
          <>
            One <span className="text-gradient">service record.</span>
          </>,
        ]}
        lede="A room attendant, an operations manager and a standards author do not share a job, a device or a posture. So they do not share an interface. What they share is the evidence trail that runs underneath all three."
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/demo" size="lg">
            Book a walkthrough
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href={site.prototypeUrl} variant="outline" size="lg" external>
            Open the live prototype
          </ButtonLink>
        </div>
      </PageHero>

      <RoleShowcase withHeading={false} />

      <Rule />

      {/* Per-role deep dives with every screen */}
      {roles.map((role, roleIndex) => (
        <section key={role.id} id={role.id} className="relative overflow-hidden py-20 sm:py-28">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
              <div className="lg:sticky lg:top-28">
                <Reveal>
                  <Eyebrow>
                    Interface 0{roleIndex + 1} · {role.name}
                  </Eyebrow>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.05] font-semibold text-white">
                    {role.headline}
                    <span className="text-gradient"> {role.headlineAccent}</span>
                  </h2>
                </Reveal>
                <Reveal delay={140}>
                  <p className="mt-5 text-[0.98rem] leading-relaxed text-muted">{role.summary}</p>
                </Reveal>
                <Reveal delay={200}>
                  <dl className="mt-8 space-y-4">
                    {role.capabilities.map((capability) => (
                      <div key={capability.title} className="border-l border-line pl-5">
                        <dt className="text-[0.92rem] font-medium text-white">{capability.title}</dt>
                        <dd className="mt-1.5 text-[0.85rem] leading-relaxed text-faint">{capability.body}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
                <Reveal delay={260}>
                  <p className="mt-8 font-mono text-[0.6rem] tracking-[0.14em] text-brand-ice uppercase">
                    {role.deviceLabel}
                  </p>
                </Reveal>
              </div>

              <div
                className={
                  role.device === "phone"
                    ? "grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8"
                    : "grid gap-10 sm:gap-12"
                }
              >
                {role.screens.map((screen, index) => (
                  <Reveal key={screen.title} variant="scale" delay={index * 70}>
                    <figure>
                      {role.device === "phone" ? (
                        <PhoneFrame
                          src={screen.src}
                          alt={screen.alt}
                          glow={false}
                          sizes="(max-width: 640px) 42vw, 220px"
                        />
                      ) : (
                        <BrowserFrame
                          src={screen.src}
                          alt={screen.alt}
                          route={`focusrealm.app${routeFor[role.id]}`}
                          glow={false}
                          sizes="(max-width: 1024px) 90vw, 680px"
                        />
                      )}
                      <figcaption className="mt-4">
                        <p className="text-[0.88rem] font-medium text-white">{screen.title}</p>
                        <p className="mt-1 text-[0.78rem] leading-snug text-faint">{screen.caption}</p>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ))}

      <Rule />

      {/* The shared spine */}
      <section id="service-record" className="relative overflow-hidden py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="What runs underneath"
            title="Three interfaces, one"
            accent="evidence trail."
            body="The interfaces are separate on purpose. The record is shared on purpose. An author's decision about which step needs a photo becomes a hard gate on a phone, and a line in the manager's audit export — same day, no reconciliation."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {mechanism.map((stage, index) => (
              <Reveal key={stage.key} delay={index * 90}>
                <SpotlightCard className="panel flex h-full flex-col p-7">
                  <span className="font-mono text-[2.2rem] leading-none font-semibold text-white/12">
                    {stage.step}
                  </span>
                  <h3 className="mt-5 text-[1.1rem] leading-snug font-semibold text-white">{stage.label}</h3>
                  <p className="mt-3.5 text-[0.88rem] leading-relaxed text-muted">{stage.body}</p>
                  <p className="mt-auto pt-6 font-mono text-[0.58rem] tracking-[0.12em] text-faint uppercase">
                    {stage.detail}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140} className="mt-12">
            <div className="panel flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
              <div>
                <p className="text-[1.15rem] leading-snug font-semibold text-white">
                  Twenty-seven routes across the three interfaces are already live.
                </p>
                <p className="mt-2 text-[0.9rem] text-muted">
                  Walk them yourself, or let us walk you through the shift they were designed around.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <ButtonLink href={site.prototypeUrl} variant="outline" external>
                  Open prototype
                </ButtonLink>
                <ButtonLink href="/demo">
                  Book a demo
                  <ArrowRight />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
