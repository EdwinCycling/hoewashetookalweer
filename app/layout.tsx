
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
const APP_DESCRIPTION = 'Ontdek historische gegevens, nieuws, muziek en meer voor elke dag in het verleden met HoeWasHetOokAlWeer.nl. Hoe was het ook al weer?';
const APP_URL = 'https://HoeWasHetOokAlWeer.nl';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: `${APP_NAME} - Hoe was het ook al weer?`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: ['geschiedenis', 'vandaag in de geschiedenis', 'nostalgie', 'wat gebeurde er op', 'dagelijkse feiten', 'historische data', 'muziek geschiedenis', 'filmgeschiedenis', 'sportgeschiedenis', 'weer van toen', 'nieuws van toen'],
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
    images: [
      {
        url: `${APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Logo van ${APP_NAME}`,
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning={true}>
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
