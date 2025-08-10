
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { ThemeProvider } from '@/context/theme-context';
import { Toaster } from '@/components/ui/toaster';
import { CookieConsentBanner } from '@/components/cookie-consent-banner';
// import { FirebaseAppCheckProvider } from '@/components/firebase-app-check-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const APP_NAME = 'HoeWasHetOokAlWeer.nl';
const APP_DESCRIPTION = 'Ontdek historische gegevens, nieuws, muziek, weer, sport en meer voor elke dag in het verleden. Duik in de geschiedenis met HoeWasHetOokAlWeer.nl - Hoe was het ook al weer?';
const APP_URL = 'https://hoewashetookalweer.nl';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  applicationName: APP_NAME,
  title: {
    default: `${APP_NAME} - Hoe was het ook al weer?`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    'geschiedenis', 'vandaag in de geschiedenis', 'nostalgie', 'wat gebeurde er op', 
    'dagelijkse feiten', 'historische data', 'muziek geschiedenis', 'filmgeschiedenis', 
    'sportgeschiedenis', 'weer van toen', 'nieuws van toen', 'historische gebeurtenissen',
    'kalender geschiedenis', 'op deze dag', 'historische weetjes', 'vroeger', 'retro',
    'muziek van vroeger', 'films van vroeger', 'sport van vroeger', 'weer geschiedenis',
    'klimaat geschiedenis', 'politiek geschiedenis', 'economie geschiedenis', 'auto geschiedenis',
    'technologie geschiedenis', 'nederland geschiedenis', 'europese geschiedenis'
  ],
  authors: [{ name: 'HoeWasHetOokAlWeer.nl Team' }],
  creator: 'HoeWasHetOokAlWeer.nl',
  publisher: 'HoeWasHetOokAlWeer.nl',
  category: 'History & Reference',
  classification: 'Educational',
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
  alternates: {
    canonical: APP_URL,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
        default: `${APP_NAME} - Hoe was het ook al weer?`,
        template: `%s | ${APP_NAME}`,
    },
    description: APP_DESCRIPTION,
    url: APP_URL,
    locale: 'nl_NL',
    images: [
      {
        url: `${APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Logo van ${APP_NAME} - Duik in de geschiedenis`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
        default: `${APP_NAME} - Hoe was het ook al weer?`,
        template: `%s | ${APP_NAME}`,
    },
    description: APP_DESCRIPTION,
    images: [`${APP_URL}/twitter-image.png`],
    creator: '@hoewashetookalweer',
    site: '@hoewashetookalweer',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for AI SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": APP_NAME,
    "description": APP_DESCRIPTION,
    "url": APP_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${APP_URL}?date={search_date_string}`
      },
      "query-input": "required name=search_date_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": APP_NAME,
      "url": APP_URL
    },
    "inLanguage": "nl",
    "isAccessibleForFree": true
  };

  return (
    <html lang="nl" suppressHydrationWarning={true}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          {children}
          <CookieConsentBanner />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
