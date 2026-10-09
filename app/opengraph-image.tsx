import { ImageResponse } from "next/og";

export const alt = "Focus Realm — software for education and hospitality";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide social card. Nested routes inherit this unless they export their
 * own, which keeps the shared look consistent across link previews.
 */
export default function OpengraphImage() {
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
          background: "#f4f5fb",
          color: "#0f1222",
          position: "relative",
        }}
      >
        {/* Brand bloom */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 200,
            width: 900,
            height: 620,
            background: "radial-gradient(circle, rgba(42,91,215,0.55) 0%, rgba(244,245,251,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            right: -120,
            width: 700,
            height: 520,
            background: "radial-gradient(circle, rgba(42,91,215,0.24) 0%, rgba(244,245,251,0) 70%)",
            display: "flex",
          }}
        />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderRadius: 16,
              border: "3px solid #2a5bd7",
              background: "#ffffff",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            <span>F</span>
            <span style={{ color: "#2a5bd7" }}>R</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 600 }}>Focus Realm</div>
            <div style={{ fontSize: 15, letterSpacing: 3, color: "#3d4256", textTransform: "uppercase" }}>
              Software company
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2.4 }}>
            Software for the work
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -2.4,
              color: "#2a5bd7",
            }}
          >
            that has to go right.
          </div>
          <div style={{ marginTop: 26, fontSize: 25, color: "#3d4256", lineHeight: 1.4, maxWidth: 860 }}>
            Learning and operations platforms. Two product lines: Mise for hotels, and an AI-driven learning
            platform for schools, colleges and universities.
          </div>
        </div>

        {/* Chain */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 17, letterSpacing: 2 }}>
          {["EDUCATION", "HOSPITALITY · MISE"].map((step, index) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(42,91,215,0.28)",
                  background: index === 1 ? "#2a5bd7" : "#ffffff",
                  color: index === 1 ? "#ffffff" : "#1e47b8",
                }}
              >
                {step}
              </div>
              {index < 3 ? <div style={{ display: "flex", color: "#2a5bd7" }}>→</div> : null}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
