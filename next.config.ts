import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['hancook-bucket.s3.ap-northeast-2.amazonaws.com']
  }
};

export default nextConfig;
