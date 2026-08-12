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
          background: "#061417",
          color: "#f2f6f3",
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
            background: "radial-gradient(circle, rgba(51,146,123,0.45) 0%, rgba(6,20,23,0) 70%)",
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
              border: "3px solid #dbbc5f",
              background: "linear-gradient(145deg, #1d4044 0%, #0b2126 100%)",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            <span>F</span>
            <span style={{ color: "#dbbc5f" }}>R</span>
          </div>
          <div style={{ display: "flex", fontSize: 21, letterSpacing: 2, color: "#a8c4c0" }}>
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
              border: "2px solid rgba(219,188,95,0.4)",
              background: "linear-gradient(145deg, rgba(51,146,123,0.34) 0%, rgba(31,109,91,0.25) 100%)",
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
            <div style={{ marginTop: 14, fontSize: 30, color: "#dbbc5f", lineHeight: 1.2 }}>
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
                border: "1px solid rgba(148,212,193,0.26)",
                color: "#b9e6d8",
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
