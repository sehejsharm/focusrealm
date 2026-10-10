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

${site.name} is a software company founded in ${site.founded} in India. It is the parent of two product lines, each with its own site.

## Key facts

- Type: software company (learning and operations platforms)
- Founded: ${site.founded}, India
- Verticals: education and hospitality
- Markets: India, the wider Asia region and the Middle East
- Founders: Sehej Sharma (Founder & CEO), Ali Electricwala (Founder & COO), Aditya Mishra (Founder & CTO)
- Infrastructure: Google Cloud and Firebase; web, mobile and interactive classroom boards
- Contact: ${site.email}

## Products

- Mise — the service execution platform for hotels. Hotel SOPs run as timed tasks on staff phones, with photo evidence, supervisor sign-off and an audit-ready service record. Mise is not a learning management system. https://misehotel.com
- Focus Realm Education — an AI-driven, gamified learning platform for schools, colleges and universities, built to work with interactive classroom boards. Three layers: a core academic hub (courses, assignments, grading, attendance, notices); optional modules (AI analytics, gamification, parent portal, faculty development, timetabling); and an employability layer (certification courses, a skills-led digital résumé). https://focus-realm.com

## How the company builds

Strategic minimalism: only what the institution or property actually uses, shaped around the person doing the work.

## Security and data protection

Encryption in transit and at rest, role-based access, a timestamped activity record, and personal data handled under India's DPDP Act, 2023. Full detail: ${absoluteUrl("/security")}

## Frequently asked

- Is Mise a learning management system? No. An LMS records that training was completed; Mise makes sure the work gets done on time and to standard, with evidence.
- Who founded Focus Realm? Sehej Sharma, Ali Electricwala and Aditya Mishra.

## Founders

${team.map((p) => `- ${p.name} — ${p.role}, ${site.name}. ${absoluteUrl(`/team/${p.slug}`)}`).join("\n")}

## Pages

- ${absoluteUrl("/")} — company overview
- ${absoluteUrl("/about")} — about Focus Realm
- ${absoluteUrl("/team")} — founders
- ${absoluteUrl("/security")} — security and trust centre
- ${absoluteUrl("/contact")} — contact
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
