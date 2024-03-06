/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  env: {
    LIVEBLOCK_PUBLIC_KEY: process.env.LIVEBLOCK_PUBLIC_KEY,
    LIVEBLOCK_SECRET_KEY: process.env.LIVEBLOCK_SECRET_KEY
  }
};

export default nextConfig;
