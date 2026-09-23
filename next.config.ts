import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/programmes", destination: "/work", permanent: true },
      {
        source: "/programmes/astronomy-education",
        destination: "/work/stem-space-education",
        permanent: true,
      },
      {
        source: "/programmes/stem-outreach",
        destination: "/work/stem-space-education",
        permanent: true,
      },
      {
        source: "/programmes/applied-space-technology",
        destination: "/work/space-intelligence",
        permanent: true,
      },
      { source: "/programmes/:slug", destination: "/work/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
