import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: process.env.MOUNT_PATH || "",
};

export default nextConfig;
