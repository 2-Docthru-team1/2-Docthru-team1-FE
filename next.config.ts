import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: { domains: ['hancook-bucket.s3.ap-northeast-2.amazonaws.com'] } /* config options here */,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `https://15.165.57.191/:path*`
      }
    ];
  }
};
export default nextConfig;
