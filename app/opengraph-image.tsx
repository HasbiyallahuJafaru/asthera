import fs from "node:fs";
import path from "node:path";

import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = "ASTHERA. Using space data to solve Earth problems.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The lockup is inlined as a data URI because the renderer has no origin to
 * fetch a relative asset from at build time.
 */
function logoDataUri() {
  try {
    const file = path.join(process.cwd(), "public", "brand", "asthera-logo.png");
    return `data:image/png;base64,${fs.readFileSync(file).toString("base64")}`;
  } catch {
    return null;
  }
}

export default function OpengraphImage() {
  const logo = logoDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(58,114,48,0.14) 0%, rgba(255,255,255,0) 68%)",
            display: "flex",
          }}
        />

        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt="" width={300} height={167} />
        ) : (
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 10, color: "#133458" }}>
            ASTHERA
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              lineHeight: 1.08,
              color: "#101c2e",
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            {site.tagline}
          </div>

          <div style={{ display: "flex", fontSize: 26, color: "#545e66", maxWidth: 860 }}>
            Astronomy education, STEM outreach and applied satellite technology across Africa.
          </div>
        </div>

        <div
          style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 21, color: "#3a7230" }}
        >
          <div style={{ display: "flex", width: 40, height: 3, background: "#3a7230" }} />
          astheraspace.com
        </div>
      </div>
    ),
    size,
  );
}
