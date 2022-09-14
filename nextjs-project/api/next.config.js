/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: "/nextjs-api",
  basePath: "/nextjs-api",
  async rewrites() {
    return [
      {
        source: "/nextjs-api/api/:path*",
        destination: "/api/:path*",
      },
      {
        source: "/nextjs-api/images/:query*",
        destination: '/_next/images/:query*'
      },
      {
        source: "/nextjs-api/_next/:path*",
        destination: "/_next/:path*",
      }
    ]
  }
}

module.exports = nextConfig
