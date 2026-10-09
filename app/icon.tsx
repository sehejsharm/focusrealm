import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** The FR mark as a favicon. Kept geometric so it survives 16px. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          border: "3px solid #dfe3f0",
          borderRadius: 15,
          color: "#0b3a91",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -1.5,
        }}
      >
        <span>F</span>
        <span style={{ color: "#4f9fd6", marginLeft: -6 }}>R</span>
      </div>
    ),
    size,
  );
}
