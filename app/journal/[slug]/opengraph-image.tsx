import { ImageResponse } from "next/og";

import { getPost } from "@/sanity/queries";

export const alt = "ASTHERA journal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function PostOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  const title = post?.title ?? "ASTHERA journal";

  const date = post?.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

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
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#545e66",
          }}
        >
          <span style={{ letterSpacing: 9, color: "#133458", fontWeight: 600 }}>ASTHERA</span>
          <span>{date}</span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 52 : 62,
            lineHeight: 1.12,
            color: "#101c2e",
            letterSpacing: -1.5,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 21, color: "#3a7230" }}>
          <div style={{ display: "flex", width: 40, height: 2, background: "#3a7230" }} />
          astheraspace.com/journal
        </div>
      </div>
    ),
    size,
  );
}
