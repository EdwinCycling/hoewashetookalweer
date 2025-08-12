import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'App Analytics - HoeWasHetOokAlweer.nl',
  description: 'Beheer dashboard met gedetailleerde analytics over app gebruik, bezoekers en prestaties. Alleen toegankelijk voor beheerders.',
  keywords: [
    'analytics',
    'beheer dashboard',
    'app statistieken',
    'bezoekers data',
    'gebruik analytics',
    'prestatie monitoring',
    'admin dashboard'
  ],
  robots: {
    index: false,
    follow: false,
  }
}

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
