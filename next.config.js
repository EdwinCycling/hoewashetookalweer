/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // Netlify specific settings
  trailingSlash: false,
  // Ensure static export works properly
  output: 'standalone',
}

module.exports = nextConfig
