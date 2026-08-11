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
          background: "linear-gradient(145deg, #0d2144 0%, #050b18 100%)",
          border: "3px solid #1d7bff",
          borderRadius: 15,
          color: "#ffffff",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -1.5,
        }}
      >
        <span>F</span>
        <span style={{ color: "#4f9cff" }}>R</span>
      </div>
    ),
    size,
  );
}
