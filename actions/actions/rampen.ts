
'use server';

import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { RAMPEN_DATA, RampData as LocalRampData } from '@/data/rampen-data';

export interface RampData {
  datum: string;
  beschrijving: string;
  doden?: number;
  gewonden?: number;
  type?: string;
}

export interface FetchRampenResult {
  rampenOpDatum: RampData[];
  rampenInMaand: RampData[];
  error?: string | null;
  debugInfo?: any;
}

/**
 * Fetches disasters and accidents for a specific date from local data.
 *
 * @param date The date to fetch disaster data for.
 * @returns An object containing arrays of disasters or an error message.
 */
export async function fetchRampen(
  date: Date
): Promise<FetchRampenResult> {
  const day = date.getDate();
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const year = date.getFullYear();

  const internalDebugInfo: any = { 
    requestedDate: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
    year,
    month,
    day,
    totalRampenInData: RAMPEN_DATA.length
  };

  try {
    // Filter rampen op de exacte datum
    const rampenOpDatum = RAMPEN_DATA.filter(ramp => {
      const [rampYear, rampMonth, rampDay] = ramp.datum.split('-').map(Number);
      return rampYear === year && rampMonth === month && rampDay === day;
    });

    // Filter rampen in dezelfde maand van hetzelfde jaar
    const rampenInMaand = RAMPEN_DATA.filter(ramp => {
      const [rampYear, rampMonth] = ramp.datum.split('-').map(Number);
      return rampYear === year && rampMonth === month;
    });

    internalDebugInfo.rampenOpDatumCount = rampenOpDatum.length;
    internalDebugInfo.rampenInMaandCount = rampenInMaand.length;

    return {
      rampenOpDatum: rampenOpDatum,
      rampenInMaand: rampenInMaand,
      error: null,
      debugInfo: internalDebugInfo,
    };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij ophalen rampen: ${error.message || 'Onbekend'}`;
    internalDebugInfo.errorDetails = errorMsg;
    return { rampenOpDatum: [], rampenInMaand: [], error: errorMsg, debugInfo: { ...internalDebugInfo, error } };
  }
}
