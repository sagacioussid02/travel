import type {NextConfig} from 'next';

const basePath = '/travel';

const nextConfig: NextConfig = {
  /* config options here */
  basePath,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  publicRuntimeConfig: {
    basePath,
  },
};

export default nextConfig;
