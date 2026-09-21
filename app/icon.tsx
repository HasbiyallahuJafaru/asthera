import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/**
 * Generated mark: the A of ASTHERA on deep space ground. Replace this file with
 * a static icon.png once the supplied logo is in /public/brand.
 */
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
          // Brand navy ground with the wordmark initial. The full mark is a dish,
          // orbit and leaf, none of which read at 16px.
          background: "#133458",
          color: "#ffffff",
          fontSize: 320,
          fontWeight: 600,
          letterSpacing: -12,
        }}
      >
        A
      </div>
    ),
    size,
  );
}
