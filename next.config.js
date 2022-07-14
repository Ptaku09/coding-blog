/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'pbs.twimg.com'],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
