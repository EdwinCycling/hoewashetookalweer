import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Podcast Generator - Maak je eigen historische podcast | HoeWasHetOokAlweer.nl',
  description: 'Genereer unieke, persoonlijke podcasts met AI gebaseerd op historische data en belangrijke gebeurtenissen. Alleen voor premium gebruikers.',
  keywords: [
    'podcast generator',
    'historische podcast',
    'persoonlijke podcast',
    'AI podcast',
    'historische data',
    'herinneringen',
    'nostalgie',
    'verjaardag podcast',
    'geboorte podcast',
    'trouwerij podcast',
    'verloving podcast',
    'diploma podcast',
    'eerste baan podcast',
    'verhuizing podcast',
    'vakantie podcast',
    'ontmoeting podcast',
    'prestatie podcast'
  ],
  authors: [{ name: 'HoeWasHetOokAlweer.nl' }],
  creator: 'HoeWasHetOokAlweer.nl',
  publisher: 'HoeWasHetOokAlweer.nl',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hoewashetookalweer.nl'),
  alternates: {
    canonical: '/podcast-generator',
  },
  openGraph: {
    title: 'Podcast Generator - Maak je eigen historische podcast',
    description: 'Genereer unieke, persoonlijke podcasts met AI gebaseerd op historische data en belangrijke gebeurtenissen.',
    url: 'https://hoewashetookalweer.nl/podcast-generator',
    siteName: 'HoeWasHetOokAlweer.nl',
    images: [
      {
        url: '/og-podcast-generator.jpg',
        width: 1200,
        height: 630,
        alt: 'Podcast Generator - Maak je eigen historische podcast',
      },
    ],
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Podcast Generator - Maak je eigen historische podcast',
    description: 'Genereer unieke, persoonlijke podcasts met AI gebaseerd op historische data.',
    images: ['/og-podcast-generator.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function PodcastGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="podcast-generator-layout">
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold mb-4">Podcast Generator laden...</h1>
            <p className="text-muted-foreground">Even geduld terwijl we de pagina voorbereiden</p>
          </div>
        </div>
      }>
        {children}
      </Suspense>
    </div>
  );
}
