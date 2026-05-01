import { ImageResponse } from "next/og";

// Dynamic Open Graph image (1200x630) — used as social share preview
// for the home page. Service pages can override by exporting their
// own opengraph-image.tsx in their slug folder if desired.

export const runtime = "edge";
export const alt =
  "JM Barone Enterprises — DFW Cleaning, Restoration & Make-Ready";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background:
            "linear-gradient(135deg, #0a1428 0%, #13223e 45%, #1d325a 100%)",
          fontFamily: "Inter, system-ui, sans-serif",
          color: "white",
          position: "relative",
        }}
      >
        {/* decorative blobs */}
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(58,134,186,0.55) 0%, transparent 70%)",
            top: -120,
            left: -120,
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 480,
            height: 480,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(90,163,207,0.45) 0%, transparent 70%)",
            bottom: -160,
            right: -100,
            filter: "blur(40px)",
          }}
        />

        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#bcdcef",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          <span
            style={{
              padding: "8px 16px",
              borderRadius: 9999,
              border: "1px solid rgba(141,195,226,0.4)",
              background: "rgba(58,134,186,0.18)",
              fontSize: 18,
            }}
          >
            Serving DFW since 2003
          </span>
        </div>

        {/* main */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1,
              maxWidth: 1040,
            }}
          >
            JM Barone Enterprises
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: "#dbecf6",
              maxWidth: 1000,
              lineHeight: 1.3,
            }}
          >
            Cleaning · Restoration · Resurfacing · Painting · Make-Ready
          </div>
        </div>

        {/* footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 18,
              alignItems: "center",
              color: "#cfd4da",
              fontSize: 22,
              fontWeight: 500,
            }}
          >
            <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
              ✓ Fully insured
            </span>
            <span>·</span>
            <span>100% satisfaction</span>
            <span>·</span>
            <span>24/7 emergency</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 28,
              fontWeight: 700,
              color: "white",
              padding: "16px 28px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.16)",
            }}
          >
            jmbaroneinc.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
