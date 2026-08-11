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
          background: "#04070f",
          color: "#eaf1fd",
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
            background: "radial-gradient(circle, rgba(29,123,255,0.55) 0%, rgba(4,7,15,0) 70%)",
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
            background: "radial-gradient(circle, rgba(86,224,255,0.24) 0%, rgba(4,7,15,0) 70%)",
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
              border: "3px solid #1d7bff",
              background: "linear-gradient(145deg, #0d2144 0%, #050b18 100%)",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            <span>F</span>
            <span style={{ color: "#4f9cff" }}>R</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 600 }}>Focus Realm Hospitality</div>
            <div style={{ fontSize: 15, letterSpacing: 3, color: "#8fa2c0", textTransform: "uppercase" }}>
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
              color: "#4f9cff",
            }}
          >
            hotel service standards.
          </div>
          <div style={{ marginTop: 26, fontSize: 25, color: "#8fa2c0", lineHeight: 1.4, maxWidth: 860 }}>
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
                  border: "1px solid rgba(143,211,255,0.28)",
                  background: index === 3 ? "rgba(29,123,255,0.22)" : "rgba(255,255,255,0.03)",
                  color: index === 3 ? "#ffffff" : "#a8d6ff",
                }}
              >
                {step}
              </div>
              {index < 3 ? <div style={{ display: "flex", color: "#1d7bff" }}>→</div> : null}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
