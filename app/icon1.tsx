import { ImageResponse } from "next/og";

export const contentType = "image/png";

/**
 * PNG favicons at multiples of 48px, which is what Google Search requires
 * for the icon it shows beside results. The vector version is app/icon.svg.
 */
const SIZES = [48, 96, 192];

export function generateImageMetadata() {
  return SIZES.map((px) => ({ id: String(px), size: { width: px, height: px }, contentType }));
}

/** The FR mark as a favicon. Kept geometric so it survives 16px. */
export default async function Icon({ id }: { id: Promise<string | number> }) {
  const px = Number(await id);
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
          border: `${Math.max(1, Math.round(px / 32))}px solid #dfe3f0`,
          borderRadius: Math.round(px * 0.22),
          color: "#0b3a91",
          fontSize: Math.round(px * 0.52),
          fontWeight: 700,
          letterSpacing: -px * 0.02,
        }}
      >
        <span>F</span>
        <span style={{ color: "#4f9fd6", marginLeft: -Math.round(px * 0.09) }}>R</span>
      </div>
    ),
    { width: px, height: px },
  );
}
