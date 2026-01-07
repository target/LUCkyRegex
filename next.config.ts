import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "docs",
  assetPrefix: "./",
};

export default nextConfig;
