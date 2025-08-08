/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // Netlify specific settings
  trailingSlash: false,
}

module.exports = nextConfig
