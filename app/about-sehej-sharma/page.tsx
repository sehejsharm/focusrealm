import type { Metadata } from "next";
import Link from "next/link";

import Aurora from "@/components/fx/Aurora";
import Reveal from "@/components/fx/Reveal";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Eyebrow, Rule } from "@/components/ui/Section";
import { personBySlug } from "@/lib/content";
import { sehejGallery } from "@/lib/gallery";
import { breadcrumbSchema, jsonLdGraph, sehejGallerySchema, webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Sehej Sharma — Photos";
const description =
  "Photo gallery of Sehej Sharma — Co-Founder & CEO, Focus Realm. Speaking, pitching, and equestrian sport (polo, show jumping, dressage).";

export const metadata: Metadata = {
  // Absolute: the page title is a fixed string, not a slot in the site template.
  title: { absolute: title },
  description,
  keywords: [
    "Sehej Sharma",
    "Sehej Sharma photos",
    "Sehej Sharma Focus Realm",
    "Sehej Sharma CEO",
    "Sehej Sharma polo",
  ],
  alternates: { canonical: "/about-sehej-sharma" },
  openGraph: { images: ["/team/sehej-sharma/opengraph-image"],
    type: "profile",
    title,
    description,
    url: "/about-sehej-sharma",
  },
  twitter: { card: "summary_large_image", images: ["/team/sehej-sharma/opengraph-image"], title, description },
};

export default function SehejPhotosPage() {
  const person = personBySlug("sehej-sharma");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            {
              ...webPageSchema({ path: "/about-sehej-sharma", name: title, description }),
              "@type": "ProfilePage",
              mainEntity: { "@id": sehejGallerySchema()?.["@id"] },
            },
            sehejGallerySchema(),
            breadcrumbSchema([
              { name: "Team", path: "/team" },
              { name: "Sehej Sharma", path: "/team/sehej-sharma" },
              { name: "Photos", path: "/about-sehej-sharma" },
            ]),
          ),
        }}
      />

      <section className="relative isolate overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
        <Aurora variant="hero" />
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.76rem] tracking-[0.14em] uppercase">
              <li>
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center text-faint transition-colors hover:text-brand-ice"
                >
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-brand/50">
                  /
                </span>
                <Link
                  href="/team/sehej-sharma"
                  className="inline-flex min-h-11 items-center text-faint transition-colors hover:text-brand-ice"
                >
                  Sehej Sharma
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden className="text-brand/50">
                  /
                </span>
                <span className="inline-flex min-h-11 items-center text-paper">Photos</span>
              </li>
            </ol>
          </nav>

          <Reveal>
            <Eyebrow>Photos</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 text-[clamp(2.1rem,4.6vw,3.2rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-white">
              Sehej Sharma
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-[1.02rem] text-brand-ice">
              Co-Founder &amp; CEO, {site.shortName} &middot; Jaipur, India
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-muted">
              Speaking, pitching and equestrian sport. Read the full profile on the{" "}
              <Link
                href="/team/sehej-sharma"
                className="text-brand-cyan underline decoration-brand/40 underline-offset-4 transition-colors hover:text-white"
              >
                Sehej Sharma
              </Link>{" "}
              page.
            </p>
          </Reveal>
        </Container>
      </section>

      {sehejGallery.map((section, sectionIndex) => (
        <section key={section.heading} className="relative overflow-hidden pb-12 sm:pb-16">
          <Container>
            <Reveal>
              <h2 className="font-mono text-[0.76rem] tracking-[0.16em] text-faint uppercase">
                {section.heading}
              </h2>
            </Reveal>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.photos.map((photo, index) => (
                <Reveal key={photo.contentUrl} delay={Math.min(index, 5) * 70} className="h-full">
                  <figure className="panel h-full overflow-hidden">
                    {/*
                      Plain <img>: these are remote Commons files that redirect to
                      upload.wikimedia.org, and proxying them through the image
                      optimizer buys nothing while adding a remote-pattern config
                      and a rewritten URL in the markup.
                    */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.contentUrl}
                      alt={photo.alt}
                      loading={sectionIndex === 0 && index === 0 ? "eager" : "lazy"}
                      width={400}
                      height={400}
                      className="block h-56 w-full bg-white/[0.03] object-cover"
                    />
                    <figcaption className="px-4 py-3 text-[0.86rem] text-muted">
                      {photo.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <Rule />

      <section className="relative overflow-hidden py-12 sm:py-20">
        <Container>
          <Reveal>
            <div className="panel p-7 sm:p-9">
              <p className="font-mono text-[0.74rem] tracking-[0.16em] text-brand-ice uppercase">
                On the company
              </p>
              <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-muted">
                {person?.name} is the {person?.role} of {site.name}, the service execution platform for hotel
                operations.
              </p>
              <div className="mt-6">
                <ButtonLink href="/team/sehej-sharma" variant="outline">
                  Full profile
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
