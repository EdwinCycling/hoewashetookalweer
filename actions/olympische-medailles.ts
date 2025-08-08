
'use server';

import { OLYMPISCHE_MEDAILLES_RAW_DATA, type OlympischeMedailleData, type FetchOlympischeMedaillesResult } from '@/data/olympische-medailles-data';

export type { FetchOlympischeMedaillesResult, OlympischeMedailleData };

const MIN_OLYMPISCHE_MEDAILLES_YEAR = 1924; // Data available from this year

export async function fetchOlympischeMedaillesByYear(
  year: number
): Promise<FetchOlympischeMedaillesResult> {
  console.log(`[fetchOlympischeMedaillesByYear] Called for year: ${year}`);

  if (year < MIN_OLYMPISCHE_MEDAILLES_YEAR) {
    const errorMsg = `Olympische medaille data is momenteel alleen beschikbaar vanaf ${MIN_OLYMPISCHE_MEDAILLES_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN OlympischeMedailles] ${errorMsg}`);
    return { medailles: null, error: errorMsg };
  }

  const rawMedalStrings = OLYMPISCHE_MEDAILLES_RAW_DATA[year];

  if (!rawMedalStrings || rawMedalStrings.length === 0) {
    // It's a valid year for Olympics, but no data means no gold medals or data not entered yet
    // For years where Olympics didn't happen (e.g. war years), this will also be the case if not explicitly in data.
    console.log(`[fetchOlympischeMedaillesByYear] No medal data found for year ${year}, returning empty array indication.`);
    return { medailles: [], error: null }; // Indicate no medals found for this year or data needs to be added
  }

  try {
    const medailles: OlympischeMedailleData[] = rawMedalStrings.map(medalString => {
      const parts = medalString.split('|');
      if (parts.length !== 4) {
        console.error(`[ERROR OlympischeMedailles] Invalid data format for year ${year}, medal string: "${medalString}". Expected 4 parts, got ${parts.length}.`);
        // Skip this malformed entry or throw an error
        return null; 
      }
      const [sporter, spelenLocatie, onderdeel, extraInfo] = parts;
      return {
        year,
        sporter: sporter.trim(),
        spelenLocatie: spelenLocatie.trim(),
        onderdeel: onderdeel.trim(),
        extraInfo: extraInfo.trim(),
      };
    }).filter(medal => medal !== null) as OlympischeMedailleData[]; // Filter out any nulls from parsing errors

    console.log(`[fetchOlympischeMedaillesByYear] Successfully parsed ${medailles.length} medals for year ${year}.`);
    return { medailles, error: null };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij verwerken Olympische medaille data voor ${year}: ${error.message || 'Onbekend'}`;
    console.error(`[ERROR OlympischeMedailles] ${errorMsg}`, { error });
    return { medailles: null, error: errorMsg };
  }
}
