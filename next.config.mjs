const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qxytgvrleqpskxcfuvja.supabase.co',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
