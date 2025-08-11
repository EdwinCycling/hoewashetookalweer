
'use server';

import { POLITIEK_BY_YEAR } from '@/data/politiek-data';

export interface FetchPolitiekResult {
  events: string[] | null;
  error?: string | null;
}

export async function fetchPolitiekEventsByYear(year: number): Promise<FetchPolitiekResult> {
  console.log(`[fetchPolitiekEventsByYear] Called for year: ${year}`);
  const eventString = POLITIEK_BY_YEAR[year];

  if (eventString) {
    console.log(`[fetchPolitiekEventsByYear] Found politiek data for year ${year}.`);
    return { events: [eventString], error: null };
  } else {
    const errorMsg = `Geen politieke gebeurtenissen gevonden voor het jaar ${year} in de huidige datalijst.`;
    console.warn(`[WARN Politiek] ${errorMsg}`);
    return { 
      events: null, 
      error: errorMsg,
    };
  }
}

