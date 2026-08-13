import { faqs, pains, team } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt — the emerging convention for answer engines, which increasingly
 * decide what a company "is" before a human reaches the site. It states the
 * category, the mechanism and the founders in the plainest possible terms, so
 * a model summarising Focus Realm has no reason to reach for LMS language.
 */
export function GET() {
  const body = `# ${site.name}

> ${site.categoryLine} ${site.shortDescription}

Category: ${site.category} — NOT a learning management system, NOT a training platform.

## The mechanism

The operating standard lives inside a timed task on a staff member's phone.
Completing the task captures photo evidence and supervisor sign-off.
That evidence compounds into an audit-ready service record.

## Founders

${team.map((p) => `- ${p.name} — ${p.role}. ${absoluteUrl(`/team/${p.slug}`)}`).join("\n")}

## What it is for

${pains.map((p) => `- ${p.name}: ${p.wound}`).join("\n")}

## Pages

- ${absoluteUrl("/")} — overview
- ${absoluteUrl("/platform")} — the three role interfaces
- ${absoluteUrl("/problems")} — the six operational pains
- ${absoluteUrl("/about")} — thesis and principles
- ${absoluteUrl("/team")} — founders
- ${absoluteUrl("/demo")} — book a 15-minute demo
- ${absoluteUrl("/contact")} — contact

## Questions

${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
