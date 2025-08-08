
'use server';

import { SPORT_ALGEMEEN_RAW_DATA, type SportAlgemeenData } from '@/data/sport-algemeen-data';

export type { SportAlgemeenData };

export interface FetchSportAlgemeenResult {
  data: SportAlgemeenData | null;
  error?: string | null;
}

const MIN_SPORT_ALGEMEEN_YEAR = 1946;
const MAX_SPORT_ALGEMEEN_YEAR = 2025;

export async function fetchSportAlgemeenByYear(
  year: number
): Promise<FetchSportAlgemeenResult> {
  console.log(`[fetchSportAlgemeenByYear] Called for year: ${year}`);

  if (year < MIN_SPORT_ALGEMEEN_YEAR || year > MAX_SPORT_ALGEMEEN_YEAR) {
    const errorMsg = `Sport Algemeen data is alleen beschikbaar van ${MIN_SPORT_ALGEMEEN_YEAR} tot en met ${MAX_SPORT_ALGEMEEN_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN SportAlgemeen] ${errorMsg}`);
    return { data: null, error: errorMsg };
  }

  const rawDataString = SPORT_ALGEMEEN_RAW_DATA[year];

  if (!rawDataString) {
    // Data might not exist for this specific year, even if it's within range (e.g., no events held)
    // Or data simply not entered yet for this year
    console.log(`[INFO SportAlgemeen] Geen Sport Algemeen data gevonden voor het jaar ${year}.`);
    return { data: null, error: null }; // Indicate no specific data, frontend will handle message
  }

  try {
    const parts = rawDataString.split('|').map(part => part.trim());
    if (parts.length !== 6) {
      const errorMsg = `Ongeldig dataformaat voor Sport Algemeen jaar ${year}. Verwachtte 6 delen, kreeg ${parts.length}. Data: ${rawDataString}`;
      console.error(`[ERROR SportAlgemeen] ${errorMsg}`);
      return { data: null, error: errorMsg };
    }

    const [
      schaatsenAllround,
      schaatsenSprint,
      tourDeFrance,
      wkWielrennen,
      veldrijden,
      tennisNr1,
    ] = parts;
    
    const sportData: SportAlgemeenData = {
      year,
      schaatsenAllround: schaatsenAllround || "N.v.t.",
      schaatsenSprint: schaatsenSprint || "N.v.t.",
      tourDeFrance: tourDeFrance || "N.v.t.",
      wkWielrennen: wkWielrennen || "N.v.t.",
      veldrijden: veldrijden || "N.v.t.",
      tennisNr1: tennisNr1 || "N.v.t.",
    };

    console.log(`[fetchSportAlgemeenByYear] Successfully parsed data for year ${year}.`);
    return { data: sportData, error: null };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij verwerken Sport Algemeen data voor ${year}: ${error.message || 'Onbekend'}`;
    console.error(`[ERROR SportAlgemeen] ${errorMsg}`, { error });
    return { data: null, error: errorMsg };
  }
}
