import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/netlify/',
          '/checkout/',
          '/premium/cancel',
          '/premium/success',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/netlify/',
          '/checkout/',
          '/premium/cancel',
          '/premium/success',
        ],
      },
    ],
    sitemap: 'https://hoewashetookalweer.nl/sitemap.xml',
    host: 'https://hoewashetookalweer.nl',
  }
}
