
'use server';

import { EREDIVISIE_STANDINGS_BY_YEAR } from '@/data/voetbal-eredivisie-data';

export interface VoetbalEredivisieData {
  year: number;
  clubs: string[];
}

export interface FetchVoetbalEredivisieResult {
  data: VoetbalEredivisieData | null;
  error?: string | null;
}

const MIN_VOETBAL_YEAR_DATA = 1957; // Or the earliest year in your data file

export async function fetchVoetbalEredivisieByYear(
  year: number
): Promise<FetchVoetbalEredivisieResult> {
  console.log(`[fetchVoetbalEredivisieByYear] Called for year: ${year}`);

  if (year < MIN_VOETBAL_YEAR_DATA) {
    const errorMsg = `Eredivisie data is momenteel alleen beschikbaar vanaf ${MIN_VOETBAL_YEAR_DATA}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN Voetbal] ${errorMsg}`);
    return { data: null, error: errorMsg };
  }

  const clubsForYear = EREDIVISIE_STANDINGS_BY_YEAR[year];

  if (clubsForYear && clubsForYear.length > 0) {
    console.log(`[fetchVoetbalEredivisieByYear] Found Eredivisie data for year ${year}.`);
    return { data: { year, clubs: clubsForYear }, error: null };
  } else {
    const errorMsg = `Geen Eredivisie data gevonden voor het jaar ${year} in de huidige datalijst.`;
    console.warn(`[WARN Voetbal] ${errorMsg}`);
    return { 
      data: null, 
      error: errorMsg,
    };
  }
}
