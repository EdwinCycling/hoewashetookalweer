
'use server';

import { OSCARS_RAW_DATA } from '@/data/oscars-data';

export interface OscarsYearData {
  year: number;
  inleiding: string;
  besteFilm: string;
  beschrijvingBesteFilm: string;
}

export interface FetchOscarsResult {
  data: OscarsYearData | null;
  error?: string | null;
}

const MIN_OSCARS_YEAR = 1934;
const MAX_OSCARS_YEAR = 2024; 

export async function fetchOscarsByYear(
  year: number
): Promise<FetchOscarsResult> {
  console.log(`[fetchOscarsByYear] Called for year: ${year}`);

  if (year < MIN_OSCARS_YEAR || year > MAX_OSCARS_YEAR) {
    const errorMsg = `Oscars data is alleen beschikbaar van ${MIN_OSCARS_YEAR} tot en met ${MAX_OSCARS_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN Oscars] ${errorMsg}`);
    return { data: null, error: errorMsg };
  }

  const rawDataString = OSCARS_RAW_DATA[year];

  if (!rawDataString) {
    const errorMsg = `Geen Oscars data gevonden voor het jaar ${year}.`;
    console.warn(`[WARN Oscars] ${errorMsg}`);
    return { data: null, error: errorMsg };
  }

  try {
    const parts = rawDataString.split('|');
    if (parts.length !== 3) {
      const errorMsg = `Ongeldig dataformaat voor Oscars jaar ${year}. Verwachtte 3 delen, kreeg ${parts.length}.`;
      console.error(`[ERROR Oscars] ${errorMsg} Raw data: ${rawDataString}`);
      return { data: null, error: errorMsg };
    }

    const [inleiding, besteFilm, beschrijvingBesteFilm] = parts.map(part => part.trim());
    
    const oscarsData: OscarsYearData = {
      year,
      inleiding,
      besteFilm,
      beschrijvingBesteFilm,
    };

    console.log(`[fetchOscarsByYear] Successfully parsed data for year ${year}.`);
    return { data: oscarsData, error: null };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij verwerken Oscars data voor ${year}: ${error.message || 'Onbekend'}`;
    console.error(`[ERROR Oscars] ${errorMsg}`, { error });
    return { data: null, error: errorMsg };
  }
}
