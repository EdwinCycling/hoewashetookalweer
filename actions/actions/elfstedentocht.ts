
'use server';

import { ELFSTEDENTOCHT_DATA, type ElfstedenData, type FetchElfstedenResult } from '@/data/elfstedentocht-data';

export type { FetchElfstedenResult };

const MIN_ELFSTEDEN_YEAR = 1909; // First official Elfstedentocht

export async function fetchElfstedenDataByYear(
  year: number
): Promise<FetchElfstedenResult> {
  console.log(`[fetchElfstedenDataByYear] Called for year: ${year}`);

  if (year < MIN_ELFSTEDEN_YEAR) {
    const errorMsg = `Elfstedentocht data is pas beschikbaar vanaf ${MIN_ELFSTEDEN_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN Elfstedentocht] ${errorMsg}`);
    return { data: null, error: errorMsg };
  }

  const description = ELFSTEDENTOCHT_DATA[year];

  if (description) {
    console.log(`[fetchElfstedenDataByYear] Found Elfstedentocht data for year ${year}.`);
    return { data: { year, description }, error: null };
  } else {
    // Year is within valid range, but no specific data for this year (e.g., no tocht held)
    console.log(`[INFO Elfstedentocht] Geen specifieke Elfstedentocht data gevonden voor het jaar ${year}.`);
    return { data: null, error: null }; // Indicate no data for this specific year
  }
}
