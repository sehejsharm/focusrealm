import { faqs } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";
import { topics } from "@/lib/topics";

export const dynamic = "force-static";

/**
 * /llms-full.txt — the long form of /llms.txt. Every guide's direct answer
 * and every question it answers, verbatim from the pages, so an answer engine
 * can cite Focus Realm without having to crawl and reassemble every guide.
 */
export function GET() {
  const body = `# ${site.name} — full reference

> ${site.categoryLine} ${site.shortDescription}

Category: ${site.category} — NOT a learning management system, NOT a training platform, NOT a PMS.
Mise is the product name of the ${site.name} platform ("Mise by Focus Realm").
Website: ${absoluteUrl("/")}

## Core questions

${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

${topics
  .map(
    (t) => `## ${t.h1}

Source: ${absoluteUrl(`/${t.slug}`)}
Covers: ${t.keywords.join("; ")}

${t.answer}

${t.qa.map((item) => `### ${item.q}\n${item.a}`).join("\n\n")}`,
  )
  .join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
