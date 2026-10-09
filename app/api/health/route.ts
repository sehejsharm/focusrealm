import { NextResponse } from "next/server";

/** Liveness probe for uptime monitoring. Reveals the build, nothing else. */
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      build: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local",
      region: process.env.VERCEL_REGION ?? null,
      time: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
