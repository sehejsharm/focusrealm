import { site, siteUrl } from "@/lib/site";

/** RFC 9116 security contact. Expiry rolls forward a year from each build. */
export const dynamic = "force-static";

export function GET() {
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
  const body = [
    `Contact: mailto:${site.email}`,
    `Expires: ${expires}`,
    "Preferred-Languages: en",
    `Canonical: ${siteUrl}/.well-known/security.txt`,
    `Policy: ${siteUrl}/security`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
