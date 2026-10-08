import { team } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt — the plain-text brief answer engines read before a human reaches
 * the site. It states what Focus Realm is at the company level and points to
 * each product's own site, where the full product descriptions live.
 */
export function GET() {
  const body = `# ${site.name}

> ${site.description}

${site.name} is a software company. It is the parent of two product lines, each with its own site:

## Products

- Mise — the service execution platform for hotels. Hotel SOPs run as timed tasks on staff phones, with photo evidence, supervisor sign-off and an audit-ready service record. Mise is not a learning management system. https://misehotel.com
- Focus Realm Education — an AI-driven, gamified learning platform for schools, colleges and universities, built to work with interactive classroom boards. https://focus-realm.com

## How the company builds

Strategic minimalism: only what the institution or property actually uses, shaped around the person doing the work.

## Founders

${team.map((p) => `- ${p.name} — ${p.role}, ${site.name}. ${absoluteUrl(`/team/${p.slug}`)}`).join("\n")}

## Pages

- ${absoluteUrl("/")} — company overview
- ${absoluteUrl("/about")} — about Focus Realm
- ${absoluteUrl("/team")} — founders
- ${absoluteUrl("/contact")} — contact
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
