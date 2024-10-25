/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports but allow dynamic routes
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com']
  },
};

module.exports = nextConfig;