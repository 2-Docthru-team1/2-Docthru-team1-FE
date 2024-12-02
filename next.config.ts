import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: { domains: ['hancook-bucket.s3.ap-northeast-2.amazonaws.com'] },
  output: 'standalone'
};

module.exports = nextConfig;
