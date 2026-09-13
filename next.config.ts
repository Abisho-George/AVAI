import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // This site has no server needs. Everything renders at build time.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
