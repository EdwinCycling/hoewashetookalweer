
'use server';

import { TELEVIZIER_RING_RAW_DATA } from '@/data/televizier-ring-data';

export interface TelevizierRingYearData {
  year: number;
  uitzending: string;
  detailInfo: string;
}

export interface FetchTelevizierRingResult {
  data: TelevizierRingYearData | null;
  error?: string | null;
}

const MIN_TELEVIZIER_RING_YEAR = 1964;
const MAX_TELEVIZIER_RING_YEAR = 2024; 

export async function fetchTelevizierRingByYear(
  year: number
): Promise<FetchTelevizierRingResult> {
  console.log(`[fetchTelevizierRingByYear] Called for year: ${year}`);

  if (year < MIN_TELEVIZIER_RING_YEAR || year > MAX_TELEVIZIER_RING_YEAR) {
    const errorMsg = `Televizier Ring data is alleen beschikbaar van ${MIN_TELEVIZIER_RING_YEAR} tot en met ${MAX_TELEVIZIER_RING_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN TelevizierRing] ${errorMsg}`);
    return { data: null, error: errorMsg };
  }

  const rawDataString = TELEVIZIER_RING_RAW_DATA[year];

  if (!rawDataString) {
    const errorMsg = `Geen Televizier Ring data gevonden voor het jaar ${year}.`;
    console.warn(`[WARN TelevizierRing] ${errorMsg}`);
    return { data: null, error: errorMsg };
  }

  try {
    const parts = rawDataString.split('|');
    if (parts.length !== 2) {
      const errorMsg = `Ongeldig dataformaat voor Televizier Ring jaar ${year}. Verwachtte 2 delen, kreeg ${parts.length}.`;
      console.error(`[ERROR TelevizierRing] ${errorMsg} Raw data: ${rawDataString}`);
      return { data: null, error: errorMsg };
    }

    const [uitzending, detailInfo] = parts.map(part => part.trim());
    
    const televizierRingData: TelevizierRingYearData = {
      year,
      uitzending,
      detailInfo,
    };

    console.log(`[fetchTelevizierRingByYear] Successfully parsed data for year ${year}.`);
    return { data: televizierRingData, error: null };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij verwerken Televizier Ring data voor ${year}: ${error.message || 'Onbekend'}`;
    console.error(`[ERROR TelevizierRing] ${errorMsg}`, { error });
    return { data: null, error: errorMsg };
  }
}
