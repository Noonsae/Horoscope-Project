/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qxytgvrleqpskxcfuvja.supabase.co',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // 타입 에러 무시
  },
};

export default nextConfig;
