import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Legacy dead-end booking form (non-functional, never wired to a
        // backend) superseded by /book-online — redirect instead of
        // leaving two pages competing for the same "book a taxi" intent.
        source: "/booking",
        destination: "/book-online",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
