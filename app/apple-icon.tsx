import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #1d4044 0%, #061417 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: -4 }}>
          <span>F</span>
          <span style={{ color: "#dbbc5f" }}>R</span>
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 13,
            letterSpacing: 3,
            color: "#b9e6d8",
            textTransform: "uppercase",
          }}
        >
          Focus Realm
        </div>
      </div>
    ),
    size,
  );
}
