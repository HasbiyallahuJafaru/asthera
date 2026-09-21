import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} | Space science built in Africa, for Africa`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#e9edec",
    theme_color: "#e9edec",
    icons: [{ src: "/icon", sizes: "512x512", type: "image/png" }],
  };
}
