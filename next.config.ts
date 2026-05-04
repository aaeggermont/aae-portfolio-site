import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Expose silent-refresh interval to the client bundle without requiring NEXT_PUBLIC_ */
  env: {
    SESSION_SILENT_REFRESH_INTERVAL_MS:
      process.env.SESSION_SILENT_REFRESH_INTERVAL_MS ?? "",
  },
  /* config options here */
  sassOptions: {
    additionalData: `
      @use "@/styles/variables" as *;
      @use "@/styles/colors" as *;
      @use "@/styles/mixins" as *;
    `,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
