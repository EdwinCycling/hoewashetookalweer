
'use server';

import { WK_EK_VOETBAL_RAW_DATA, type WKEKVoetbalData } from '@/data/wk-ek-voetbal-data';

export type { WKEKVoetbalData };

export interface FetchWKEKVoetbalResult {
  data: WKEKVoetbalData | null;
  error?: string | null;
}

const MIN_WK_EK_YEAR_DATA = 1930; // Data available from this year

export async function fetchWKEKVoetbalDataByYear(
  year: number
): Promise<FetchWKEKVoetbalResult> {
  console.log(`[fetchWKEKVoetbalDataByYear] Called for year: ${year}`);

  if (year < MIN_WK_EK_YEAR_DATA) {
    const errorMsg = `WK/EK voetbaldata is alleen beschikbaar vanaf ${MIN_WK_EK_YEAR_DATA}. Gekozen jaar: ${year}.`;
    return { data: null, error: errorMsg };
  }

  const rawDataString = WK_EK_VOETBAL_RAW_DATA[year];

  if (!rawDataString) {
    console.log(`[fetchWKEKVoetbalDataByYear] No specific WK/EK data found for year ${year}, but it's a valid year range.`);
    return { data: null, error: null };
  }

  try {
    const parts = rawDataString.split('|').map(part => part.trim());
    // Expected 9 parts: Type, WinnerCountry, Score, FinalistCountry, Stadium, City, StadiumCountry, MOTM, MOTMCountry
    if (parts.length !== 9) {
      const errorMsg = `Ongeldig dataformaat voor WK/EK voetbaljaar ${year}. Verwachtte 9 delen, kreeg ${parts.length}. Data: ${rawDataString}`;
      console.error(`[ERROR WKEKVoetbal] ${errorMsg}`);
      return { data: null, error: errorMsg };
    }

    const [
      typeStr,
      winnerCountry,
      score,
      finalistCountry,
      stadium,
      city,
      stadiumCountry,
      manOfTheMatch,
      manOfTheMatchCountry,
    ] = parts;

    if (typeStr !== 'WK' && typeStr !== 'EK') {
        const errorMsg = `Ongeldig type toernooi "${typeStr}" voor jaar ${year}. Moet 'WK' of 'EK' zijn.`;
        console.error(`[ERROR WKEKVoetbal] ${errorMsg}`);
        return { data: null, error: errorMsg };
    }

    const futbolData: WKEKVoetbalData = {
      year,
      type: typeStr as 'WK' | 'EK',
      winnerCountry,
      score,
      finalistCountry,
      stadium,
      city,
      stadiumCountry,
      manOfTheMatch: manOfTheMatch === "Geen uitreiking" || !manOfTheMatch ? undefined : manOfTheMatch,
      manOfTheMatchCountry: manOfTheMatchCountry || undefined,
    };

    console.log(`[fetchWKEKVoetbalDataByYear] Successfully parsed data for year ${year}.`);
    return { data: futbolData, error: null };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij verwerken WK/EK voetbaldata voor ${year}: ${error.message || 'Onbekend'}`;
    console.error(`[ERROR WKEKVoetbal] ${errorMsg}`, { error });
    return { data: null, error: errorMsg };
  }
}
