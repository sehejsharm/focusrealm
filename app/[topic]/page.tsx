import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import { Container, Eyebrow, Rule } from "@/components/ui/Section";
import { breadcrumbSchema, jsonLdGraph, pageMetadata, softwareSchema, webPageSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { topicBySlug, topics } from "@/lib/topics";

/**
 * One page per search intent from the SEO + GEO keyword master list.
 *
 * Everything is server-rendered and visible — the direct answer, every
 * question as an H2 with its answer, and the phrases the page targets. The
 * same Q&A is mirrored into FAQPage JSON-LD and /llms-full.txt so search and
 * answer engines read one version of the truth.
 */

// Only the slugs in lib/topics.ts exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return topics.map((topic) => ({ topic: topic.slug }));
}

type Props = { params: Promise<{ topic: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = topicBySlug[slug];
  if (!topic) return {};
  return pageMetadata({
    title: topic.title,
    description: topic.description,
    path: `/${topic.slug}`,
    keywords: topic.keywords,
  });
}

export default async function TopicPage({ params }: Props) {
  const { topic: slug } = await params;
  const topic = topicBySlug[slug];
  if (!topic) notFound();

  const path = `/${topic.slug}`;
  const related = topic.related.map((s) => topicBySlug[s]).filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            {
              ...webPageSchema({ path, name: topic.h1, description: topic.description }),
              keywords: topic.keywords.join(", "),
              mainEntity: { "@id": `${absoluteUrl(path)}#faq` },
            },
            breadcrumbSchema([
              { name: "Guides", path: "/guides" },
              { name: topic.title, path },
            ]),
            {
              "@type": "FAQPage",
              "@id": `${absoluteUrl(path)}#faq`,
              mainEntity: [
                {
                  "@type": "Question",
                  name: topic.h1,
                  acceptedAnswer: { "@type": "Answer", text: topic.answer },
                },
                ...topic.qa.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              ],
            },
            softwareSchema,
          ),
        }}
      />

      <PageHero
        eyebrow={`Guide · ${topic.cluster}`}
        breadcrumb={[{ label: "Guides", href: "/guides" }, { label: topic.cluster }]}
        titleLines={[topic.h1]}
        lede={topic.answer}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/demo" size="lg">
            Book a 15-min demo
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/platform" variant="outline" size="lg">
            See the platform
          </ButtonLink>
        </div>
      </PageHero>

      <Container className="pb-16 sm:pb-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          {/* Questions, answered in full */}
          <div className="max-w-3xl space-y-10">
            {topic.qa.map((item) => (
              <section key={item.q} className="border-t border-line pt-7">
                <h2 className="text-[1.2rem] leading-snug font-semibold text-white sm:text-[1.35rem]">
                  {item.q}
                </h2>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{item.a}</p>
              </section>
            ))}
          </div>

          {/* The phrases this page answers, visible — not hidden text */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-[0.74rem] tracking-[0.16em] text-brand-cyan uppercase">
              What this page covers
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {topic.keywords.map((keyword) => (
                <li
                  key={keyword}
                  className="rounded-full border border-line px-2.5 py-1 text-[0.78rem] text-faint"
                >
                  {keyword}
                </li>
              ))}
            </ul>

            {related.length ? (
              <>
                <p className="mt-10 font-mono text-[0.74rem] tracking-[0.16em] text-brand-cyan uppercase">
                  Related guides
                </p>
                <ul className="mt-4 space-y-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/${r.slug}`}
                        className="text-[0.9rem] leading-snug text-paper underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-bright"
                      >
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <p className="mt-10">
              <Link
                href="/guides"
                className="text-[0.88rem] text-brand-cyan underline decoration-brand/40 underline-offset-4"
              >
                All hotel operations guides
              </Link>
            </p>
          </aside>
        </div>
      </Container>

      <Rule />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="panel flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
            <div>
              <Eyebrow>Start with one property</Eyebrow>
              <p className="mt-4 text-[clamp(1.2rem,2.4vw,1.6rem)] leading-snug font-semibold text-white">
                See it on a real shift, in fifteen minutes.
              </p>
            </div>
            <ButtonLink href="/demo" size="lg">
              Book a 15-min demo
              <ArrowRight />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
