
'use server';

import { FORBES_RIJKSTE_RAW_DATA, type ForbesRijksteYearData } from '@/data/forbes-rijkste-data';

export type { ForbesRijksteYearData };

export interface FetchForbesRijksteResult {
  data: ForbesRijksteYearData | null;
  error?: string | null;
}

const MIN_FORBES_YEAR = 1987;

export async function fetchForbesRijksteByYear(
  year: number
): Promise<FetchForbesRijksteResult> {
  console.log(`[fetchForbesRijksteByYear] Called for year: ${year}`);

  if (year < MIN_FORBES_YEAR) {
    const errorMsg = `Forbes data is momenteel alleen beschikbaar vanaf ${MIN_FORBES_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN ForbesRijkste] ${errorMsg}`);
    return { data: null, error: errorMsg };
  }

  const rawDataString = FORBES_RIJKSTE_RAW_DATA[year];

  if (!rawDataString) {
    // Data might not exist for this specific year, even if it's within range
    const infoMsg = `Geen Forbes data gevonden voor het jaar ${year}.`;
    console.log(`[INFO ForbesRijkste] ${infoMsg}`);
    return { data: null, error: null }; // Return null, not error string
  }

  try {
    const parts = rawDataString.split('|');
    if (parts.length < 7) {
      const errorMsg = `Ongeldig dataformaat voor Forbes Rijkste jaar ${year}. Verwachtte minimaal 7 delen, kreeg ${parts.length}.`;
      console.error(`[ERROR ForbesRijkste] ${errorMsg} Raw data: ${rawDataString}`);
      return { data: null, error: errorMsg };
    }

    const [
      nr1Name,
      nr1Vermogen,
      nr1Leeftijd,
      nr1Nationaliteit,
      nr1Source,
      nr1Extra,
      top10,
    ] = parts.map(part => part.trim());
    
    const forbesData: ForbesRijksteYearData = {
      year,
      nr1Name,
      nr1Vermogen,
      nr1Leeftijd,
      nr1Nationaliteit,
      nr1Source,
      nr1Extra,
      top10,
    };

    console.log(`[fetchForbesRijksteByYear] Successfully parsed data for year ${year}.`);
    return { data: forbesData, error: null };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij verwerken Forbes Rijkste data voor ${year}: ${error.message || 'Onbekend'}`;
    console.error(`[ERROR ForbesRijkste] ${errorMsg}`, { error });
    return { data: null, error: errorMsg };
  }
}
