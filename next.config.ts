import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    additionalData: `
      @import "@/styles/variables";
      @import "@/styles/colors";
      @import "@/styles/mixins";
    `,
  },
};

export default nextConfig;
