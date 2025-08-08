
'use server';

import { FORMULE1_RAW_DATA, type Formule1YearData } from '@/data/formule1-data';

export type { Formule1YearData };

export interface FetchFormule1Result {
  data: Formule1YearData | null;
  error?: string | null;
}

const MIN_FORMULE1_YEAR = 1950;

export async function fetchFormule1DataByYear(
  year: number
): Promise<FetchFormule1Result> {
  console.log(`[fetchFormule1DataByYear] Called for year: ${year}`);

  if (year < MIN_FORMULE1_YEAR) {
    const errorMsg = `Formule 1 data is momenteel alleen beschikbaar vanaf ${MIN_FORMULE1_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN Formule1] ${errorMsg}`);
    return { data: null, error: errorMsg };
  }

  const rawDataString = FORMULE1_RAW_DATA[year];

  if (!rawDataString) {
    console.log(`[INFO Formule1] Geen Formule 1 data gevonden voor het jaar ${year}, maar het valt binnen het geldige bereik.`);
    return { data: null, error: null }; // Indicate no specific data, frontend will handle message
  }

  try {
    const parts = rawDataString.split('|').map(part => part.trim());
    // Expected 10 parts: coureur|team|motorleverancier|banden|aantal_overwinningen|aantal_races|punten|beslissende_race|marge|constructeur
    if (parts.length !== 10) {
      const errorMsg = `Ongeldig dataformaat voor Formule 1 jaar ${year}. Verwachtte 10 delen, kreeg ${parts.length}. Data: ${rawDataString}`;
      console.error(`[ERROR Formule1] ${errorMsg}`);
      return { data: null, error: errorMsg };
    }

    const [
      coureur,
      team,
      motorleverancier,
      banden,
      aantal_overwinningen,
      aantal_races,
      punten,
      beslissende_race,
      marge,
      constructeur,
    ] = parts;
    
    const formule1Data: Formule1YearData = {
      year,
      coureur,
      team,
      motorleverancier,
      banden,
      aantal_overwinningen,
      aantal_races,
      punten,
      beslissende_race,
      marge,
      constructeur,
    };

    console.log(`[fetchFormule1DataByYear] Successfully parsed data for year ${year}.`);
    return { data: formule1Data, error: null };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij verwerken Formule 1 data voor ${year}: ${error.message || 'Onbekend'}`;
    console.error(`[ERROR Formule1] ${errorMsg}`, { error });
    return { data: null, error: errorMsg };
  }
}
