
'use server';

import { SPORTER_VAN_HET_JAAR_RAW_DATA } from '@/data/sporter-van-het-jaar-data';

export interface SporterVanHetJaarData {
  year: number;
  inleiding: string;
  sportman: string;
  sportvrouw: string;
  sportploeg: string;
  talent: string;
  coach: string;
  paralympier: string;
}

export interface FetchSporterVanHetJaarResult {
  data: SporterVanHetJaarData | null;
  error?: string | null;
}

const MIN_SPORTER_YEAR = 1959;
const MAX_SPORTER_YEAR = 2024; // Update if more recent data is added

export async function fetchSporterVanHetJaarByYear(
  year: number
): Promise<FetchSporterVanHetJaarResult> {
  console.log(`[fetchSporterVanHetJaarByYear] Called for year: ${year}`);

  if (year < MIN_SPORTER_YEAR || year > MAX_SPORTER_YEAR) {
    const errorMsg = `Sporter van het Jaar data is alleen beschikbaar van ${MIN_SPORTER_YEAR} tot en met ${MAX_SPORTER_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN SporterVanHetJaar] ${errorMsg}`);
    return { data: null, error: errorMsg };
  }

  const rawDataString = SPORTER_VAN_HET_JAAR_RAW_DATA[year];

  if (!rawDataString) {
    const errorMsg = `Geen Sporter van het Jaar data gevonden voor het jaar ${year}.`;
    console.warn(`[WARN SporterVanHetJaar] ${errorMsg}`);
    return { data: null, error: errorMsg };
  }

  try {
    const parts = rawDataString.split('|');
    if (parts.length !== 7) {
      const errorMsg = `Ongeldig dataformaat voor Sporter van het Jaar ${year}. Verwachtte 7 delen, kreeg ${parts.length}.`;
      console.error(`[ERROR SporterVanHetJaar] ${errorMsg} Raw data: ${rawDataString}`);
      return { data: null, error: errorMsg };
    }

    const [inleiding, sportman, sportvrouw, sportploeg, talent, coach, paralympier] = parts.map(part => part.trim());
    
    const sporterData: SporterVanHetJaarData = {
      year,
      inleiding,
      sportman,
      sportvrouw,
      sportploeg,
      talent,
      coach,
      paralympier,
    };

    console.log(`[fetchSporterVanHetJaarByYear] Successfully parsed data for year ${year}.`);
    return { data: sporterData, error: null };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij verwerken Sporter van het Jaar data voor ${year}: ${error.message || 'Onbekend'}`;
    console.error(`[ERROR SporterVanHetJaar] ${errorMsg}`, { error });
    return { data: null, error: errorMsg };
  }
}
