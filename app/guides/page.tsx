import type { Metadata } from "next";
import Link from "next/link";

import PageHero from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Section";
import { breadcrumbSchema, jsonLdGraph, pageMetadata, webPageSchema } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { topicClusters, topics } from "@/lib/topics";

const title = "Hotel SOP & Operations Guides";
const description =
  "Guides to hotel SOP software, digital SOPs, housekeeping, audit readiness, compliance and service execution — answers for hotel operations teams.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/guides",
  keywords: ["hotel SOP guides", "hotel operations guides", ...topics.map((t) => t.keywords[0])],
});

/**
 * The index of every topic page. Each guide is listed with the search phrases
 * it answers, each phrase linking to the page that answers it — so every term
 * in the keyword master list is on the site, visible and internally linked.
 */
export default function GuidesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph(
            { ...webPageSchema({ path: "/guides", name: title, description }), "@type": "CollectionPage" },
            breadcrumbSchema([{ name: "Guides", path: "/guides" }]),
            {
              "@type": "ItemList",
              name: title,
              itemListElement: topics.map((topic, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: topic.title,
                url: absoluteUrl(`/${topic.slug}`),
              })),
            },
          ),
        }}
      />

      <PageHero
        eyebrow="Guides"
        breadcrumb={[{ label: "Guides" }]}
        titleLines={["Hotel SOP and", <span key="a" className="text-gradient">operations guides.</span>]}
        lede="Straight answers to the questions hotel operations teams ask about SOPs, evidence, audits and service execution."
      />

      <Container className="pb-20 sm:pb-28">
        <div className="space-y-14">
          {topicClusters.map((cluster) => (
            <section key={cluster}>
              <h2 className="font-mono text-[0.78rem] tracking-[0.16em] text-brand-cyan uppercase">{cluster}</h2>
              <ul className="mt-6 grid gap-x-10 gap-y-9 md:grid-cols-2">
                {topics
                  .filter((t) => t.cluster === cluster)
                  .map((topic) => (
                    <li key={topic.slug} className="border-t border-line pt-5">
                      <h3>
                        <Link
                          href={`/${topic.slug}`}
                          className="text-[1.1rem] leading-snug font-semibold text-white transition-colors hover:text-brand-cyan"
                        >
                          {topic.h1}
                        </Link>
                      </h3>
                      <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">{topic.description}</p>
                      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                        {topic.keywords.map((keyword) => (
                          <li key={keyword}>
                            <Link
                              href={`/${topic.slug}`}
                              className="text-[0.78rem] text-faint underline decoration-line underline-offset-4 hover:text-paper"
                            >
                              {keyword}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
