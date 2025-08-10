import type { Metadata } from 'next';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

const APP_NAME = 'HoeWasHetOokAlWeer.nl';
const APP_URL = 'https://hoewashetookalweer.nl';

export function generateMetadata(date: Date): Metadata {
  const formattedDate = format(date, 'd MMMM yyyy', { locale: nl });
  const year = date.getFullYear();
  const currentYear = new Date().getFullYear();
  const yearsAgo = currentYear - year;

  // Dynamic title based on date
  const title = `${formattedDate} - Wat gebeurde er op deze dag? | ${APP_NAME}`;
  
  // Dynamic description with rich context
  const description = `Ontdek wat er gebeurde op ${formattedDate}! Bekijk historische gebeurtenissen, muziek hits, films, weer data, sport resultaten en meer uit ${year}. ${yearsAgo > 0 ? `${yearsAgo} jaar geleden` : 'Dit jaar'} - Duik in de geschiedenis met ${APP_NAME}.`;

  // Dynamic keywords based on the date
  const baseKeywords = [
    'geschiedenis', 'vandaag in de geschiedenis', 'nostalgie', 'wat gebeurde er op',
    'dagelijkse feiten', 'historische data', 'muziek geschiedenis', 'filmgeschiedenis',
    'sportgeschiedenis', 'weer van toen', 'nieuws van toen', 'historische gebeurtenissen',
    'kalender geschiedenis', 'op deze dag', 'historische weetjes', 'vroeger', 'retro'
  ];

  const dateSpecificKeywords = [
    `${formattedDate}`, `${year}`, `${yearsAgo} jaar geleden`,
    `geschiedenis ${year}`, `nieuws ${year}`, `muziek ${year}`,
    `films ${year}`, `sport ${year}`, `weer ${year}`
  ];

  const keywords = [...baseKeywords, ...dateSpecificKeywords];

  // Dynamic Open Graph data
  const openGraphTitle = `${formattedDate} - Wat gebeurde er op deze dag?`;
  const openGraphDescription = `Ontdek historische gebeurtenissen, muziek hits, films en meer uit ${year} op ${formattedDate}. ${yearsAgo > 0 ? `${yearsAgo} jaar geleden` : 'Dit jaar'}.`;

  return {
    metadataBase: new URL(APP_URL),
    title,
    description,
    keywords,
    authors: [{ name: 'HoeWasHetOokAlWeer.nl Team' }],
    creator: APP_NAME,
    publisher: APP_NAME,
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
      canonical: `${APP_URL}?date=${format(date, 'yyyy-MM-dd')}`,
    },
    openGraph: {
      type: 'website',
      siteName: APP_NAME,
      title: openGraphTitle,
      description: openGraphDescription,
      url: `${APP_URL}?date=${format(date, 'yyyy-MM-dd')}`,
      locale: 'nl_NL',
      images: [
        {
          url: `${APP_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `Historische data voor ${formattedDate} - ${APP_NAME}`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: openGraphTitle,
      description: openGraphDescription,
      images: [`${APP_URL}/og-image.png`],
    },
    other: {
      'article:published_time': date.toISOString(),
      'article:section': 'History',
      'article:tag': keywords.slice(0, 10), // First 10 keywords as tags
    },
  };
}
