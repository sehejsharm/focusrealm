import type { Metadata } from "next";

import Reveal from "@/components/fx/Reveal";
import RoleShowcase from "@/components/home/RoleShowcase";
import ArchitectureDiagram from "@/components/viz/ArchitectureDiagram";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { BrowserFrame, PhoneFrame } from "@/components/ui/DeviceFrame";
import PageHero from "@/components/ui/PageHero";
import { Container, Eyebrow, Rule } from "@/components/ui/Section";
import { roles } from "@/lib/content";
import { breadcrumbSchema, jsonLdGraph, softwareSchema, webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Hotel SOP platform — three interfaces";
const description =
  "Three interfaces on one evidence trail: a staff app on their own phone, a supervisor service picture, and a workspace where hotel SOPs become timed tasks.";
/** Social cards are not truncated at 155, so they keep the fuller pitch. */
const ogDescription =
  "Inside the Focus Realm service execution platform: a mobile-first interface for the people doing the work, a desktop surface for supervisors and heads of department, and a standards workspace where hotel SOPs become timed tasks with mandatory photo evidence.";
/** The <h1> and the JSON-LD name stay descriptive even though the tag is short. */
const pageName = "Platform — three role interfaces, one service record";

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
  openGraph: { title: `${pageName} · ${site.shortName}`, description: ogDescription, url: "/platform", type: "website" },
  twitter: { card: "summary_large_image", description: ogDescription },
};

const routeFor = { staff: "/staff/today", manager: "/manager/overview", author: "/author/create" } as const;

export default function PlatformPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            webPageSchema({ path: "/platform", name: pageName, description }),
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
        lede="Three jobs, three devices, three postures. One evidence trail underneath."
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/demo" size="lg">
            Book a 15-min demo
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href={site.prototypeUrl} variant="outline" size="lg" external>
            Open the live prototype
          </ButtonLink>
        </div>
      </PageHero>

      <Container className="pb-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-14">
          <Reveal>
            <ArchitectureDiagram />
          </Reveal>
          <Reveal delay={80} className="lg:max-w-[220px]">
            <p className="font-mono text-[0.74rem] tracking-[0.16em] text-brand-cyan uppercase">
              Shared substrate
            </p>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">
              Hover a layer to follow what it writes into the record.
            </p>
          </Reveal>
        </div>
      </Container>

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
                  <p className="mt-8 font-mono text-[0.76rem] tracking-[0.14em] text-brand-ice uppercase">
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
                      <figcaption className="mt-3 font-mono text-[0.74rem] tracking-[0.12em] text-faint uppercase">
                        {screen.title}
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

      <section id="service-record" className="relative overflow-hidden py-20 sm:py-24">
        <Container>
          <Reveal className="panel flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
            <div>
              <p className="text-[clamp(1.2rem,2.4vw,1.7rem)] leading-snug font-semibold text-white">
                Twenty-seven routes are live. Walk them yourself.
              </p>
              <p className="mt-2 text-[0.9rem] text-muted">Or let us walk you through one shift.</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <ButtonLink href={site.prototypeUrl} variant="outline" external>
                Open the live prototype
              </ButtonLink>
              <ButtonLink href="/demo">
                Book a 15-min demo
                <ArrowRight />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
