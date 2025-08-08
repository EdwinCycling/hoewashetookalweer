
'use server';

import { ALL_PRESIDENTS_DATA, MIN_PRESIDENTS_YEAR, type PresidentData } from '@/data/presidents-data';

export type { PresidentData };

export interface FetchPresidentsResult {
  presidents: PresidentData[] | null;
  error?: string | null;
}

export async function fetchPresidentsByYear(year: number): Promise<FetchPresidentsResult> {
  console.log(`[fetchPresidentsByYear] Called for year: ${year}`);

  if (year < MIN_PRESIDENTS_YEAR) {
    const errorMsg = `Presidenten data is alleen beschikbaar vanaf ${MIN_PRESIDENTS_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN Presidents] ${errorMsg}`);
    return { presidents: null, error: errorMsg };
  }

  // Find the most recent year's data that is less than or equal to the requested year.
  const availableYears = [...new Set(ALL_PRESIDENTS_DATA.map(p => p.year))].sort((a, b) => b - a);
  let yearToUse = availableYears.find(y => y <= year);

  if (!yearToUse) {
    // If no data is available before or on the selected year (unlikely given MIN_PRESIDENTS_YEAR check but safe).
    const errorMsg = `Geen presidenten data beschikbaar voor of voor het jaar ${year}.`;
    console.warn(`[WARN Presidents] ${errorMsg}`);
    return { presidents: null, error: errorMsg };
  }
  
  console.log(`[fetchPresidentsByYear] No specific data for ${year}. Using data from the most recent available year: ${yearToUse}.`);
  const presidentsForYear = ALL_PRESIDENTS_DATA.filter(p => p.year === yearToUse);

  if (presidentsForYear.length > 0) {
    console.log(`[fetchPresidentsByYear] Found ${presidentsForYear.length} president entries for effective year ${yearToUse}.`);
    return { presidents: presidentsForYear, error: null };
  } else {
    // This case should not be reached if yearToUse is valid, but as a fallback.
    const errorMsg = `Geen presidenten data gevonden voor het effectieve jaar ${yearToUse}.`;
    console.warn(`[WARN Presidents] ${errorMsg}`);
    return { 
      presidents: null,
      error: errorMsg,
    };
  }
}
