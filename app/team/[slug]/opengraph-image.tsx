import { ImageResponse } from "next/og";

import { team } from "@/lib/content";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return team.map((person) => ({ slug: person.slug }));
}

export const alt = `Focus Realm Hospitality founding team profile`;

/** Profile card — params is a Promise in Next 16. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = team.find((entry) => entry.slug === slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#04070f",
          color: "#eaf1fd",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -240,
            right: -60,
            width: 820,
            height: 600,
            background: "radial-gradient(circle, rgba(29,123,255,0.45) 0%, rgba(4,7,15,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 14,
              border: "3px solid #1d7bff",
              background: "linear-gradient(145deg, #0d2144 0%, #050b18 100%)",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            <span>F</span>
            <span style={{ color: "#4f9cff" }}>R</span>
          </div>
          <div style={{ display: "flex", fontSize: 21, letterSpacing: 2, color: "#8fa2c0" }}>
            {site.name.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 44 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 168,
              height: 168,
              borderRadius: 40,
              border: "2px solid rgba(79,156,255,0.4)",
              background: "linear-gradient(145deg, rgba(29,123,255,0.34) 0%, rgba(11,79,204,0.2) 100%)",
              fontSize: 62,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {person?.initials ?? "FR"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 800 }}>
            <div style={{ fontSize: 66, fontWeight: 700, letterSpacing: -2.4, lineHeight: 1.04 }}>
              {person?.name ?? site.name}
            </div>
            <div style={{ marginTop: 14, fontSize: 30, color: "#4f9cff", lineHeight: 1.2 }}>
              {person?.role ?? "Service execution platform for hotel operations"}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, fontSize: 17, letterSpacing: 1.4 }}>
          {(person?.focus ?? ["Service execution"]).slice(0, 4).map((focus) => (
            <div
              key={focus}
              style={{
                display: "flex",
                padding: "10px 18px",
                borderRadius: 999,
                border: "1px solid rgba(143,211,255,0.26)",
                color: "#a8d6ff",
              }}
            >
              {focus}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
