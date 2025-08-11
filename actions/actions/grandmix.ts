
'use server';

import { GRANDMIX_RAW_DATA, MIN_GRANDMIX_YEAR, type GrandmixData } from '@/data/grandmix-data';

export type { GrandmixData };

export interface FetchGrandmixResult {
  data: GrandmixData | null;
  error?: string | null;
}

/**
 * Fetches Grandmix data for a specific year.
 *
 * @param year The year to fetch Grandmix data for.
 * @returns An object containing the Grandmix data or an error message.
 */
export async function fetchGrandmixByYear(
  year: number
): Promise<FetchGrandmixResult> {
  console.log(`[fetchGrandmixByYear] Called for year: ${year}`);

  if (year < MIN_GRANDMIX_YEAR) {
    const errorMsg = `Grandmix data is alleen beschikbaar vanaf ${MIN_GRANDMIX_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN Grandmix] ${errorMsg}`);
    return { data: null, error: errorMsg };
  }

  const iframeHtml = GRANDMIX_RAW_DATA[year];

  if (iframeHtml) {
    console.log(`[fetchGrandmixByYear] Found Grandmix data for year ${year}.`);
    return { data: { year, iframeHtml }, error: null };
  } else {
    const errorMsg = `Geen Grandmix data gevonden voor het jaar ${year}.`;
    console.warn(`[WARN Grandmix] ${errorMsg}`);
    // Retourneer geen harde error als het binnen de range is maar gewoon geen data heeft, de UI vangt dit op.
    return { data: null, error: null }; 
  }
}
