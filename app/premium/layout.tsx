import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium Toegang - HoeWasHetOokAlweer.nl',
  description: 'Upgrade naar premium en krijg toegang tot exclusieve historische data, advertentievrije ervaring en content tot wel 100 jaar terug. Ontdek meer unieke features!',
  keywords: [
    'premium toegang',
    'historische data',
    'advertentievrij',
    'exclusieve content',
    'upgrade',
    'abonnement',
    'geschiedenis premium',
    'historische feiten premium'
  ],
  openGraph: {
    title: 'Premium Toegang - HoeWasHetOokAlweer.nl',
    description: 'Upgrade naar premium en krijg toegang tot exclusieve historische data, advertentievrije ervaring en content tot wel 100 jaar terug.',
    type: 'website',
    url: 'https://hoewashetookalweer.nl/premium',
  }
}

export default function PremiumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
