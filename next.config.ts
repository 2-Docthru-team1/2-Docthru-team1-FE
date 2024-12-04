import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: { domains: ['hancook-bucket.s3.ap-northeast-2.amazonaws.com'] },
  formats: ['image/avif', 'image/webp'],
  output: 'standalone'
};

module.exports = nextConfig;
