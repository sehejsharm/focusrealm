import { ImageResponse } from "next/og";

export const alt = "Focus Realm Hospitality — the operating system for hotel service standards";
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
          background: "#061417",
          color: "#f2f6f3",
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
            background: "radial-gradient(circle, rgba(51,146,123,0.55) 0%, rgba(6,20,23,0) 70%)",
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
            background: "radial-gradient(circle, rgba(148,212,193,0.24) 0%, rgba(6,20,23,0) 70%)",
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
              border: "3px solid #dbbc5f",
              background: "linear-gradient(145deg, #1d4044 0%, #0b2126 100%)",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            <span>F</span>
            <span style={{ color: "#dbbc5f" }}>R</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 600 }}>Focus Realm Hospitality</div>
            <div style={{ fontSize: 15, letterSpacing: 3, color: "#a8c4c0", textTransform: "uppercase" }}>
              Service execution platform
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2.4 }}>
            The operating system for
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: -2.4,
              color: "#dbbc5f",
            }}
          >
            hotel service standards.
          </div>
          <div style={{ marginTop: 26, fontSize: 25, color: "#a8c4c0", lineHeight: 1.4, maxWidth: 860 }}>
            The standard lives inside the timed task. The task produces the evidence. The evidence becomes an
            audit-ready service record.
          </div>
        </div>

        {/* Chain */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 17, letterSpacing: 2 }}>
          {["STANDARD", "TIMED TASK", "PHOTO EVIDENCE", "SERVICE RECORD"].map((step, index) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(148,212,193,0.28)",
                  background: index === 3 ? "rgba(51,146,123,0.22)" : "rgba(255,255,255,0.04)",
                  color: index === 3 ? "#ffffff" : "#b9e6d8",
                }}
              >
                {step}
              </div>
              {index < 3 ? <div style={{ display: "flex", color: "#dbbc5f" }}>→</div> : null}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

// Required by `output: "export"` — this route is generated at build time.
export const dynamic = "force-static";
