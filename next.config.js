/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable fast refresh
  webpack: (config, { dev, isServer }) => {
    // Optimize hot reloading
    if (dev && !isServer) {
      config.optimization.moduleIds = 'named'
    }
    return config
  },
  // Improve development experience
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig 