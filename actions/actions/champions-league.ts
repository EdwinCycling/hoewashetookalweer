
'use server';

import { CHAMPIONS_LEAGUE_RAW_DATA, type ChampionsLeagueYearData } from '@/data/champions-league-data';

export type { ChampionsLeagueYearData };

export interface FetchChampionsLeagueResult {
  data: ChampionsLeagueYearData | null;
  error?: string | null;
}

const MIN_CHAMPIONS_LEAGUE_YEAR = 1956;
// const MAX_CHAMPIONS_LEAGUE_YEAR = new Date().getFullYear(); // Or a fixed year if data is not up-to-date

export async function fetchChampionsLeagueDataByYear(
  year: number
): Promise<FetchChampionsLeagueResult> {
  console.log(`[fetchChampionsLeagueDataByYear] Called for year: ${year}`);
  const currentMaxYear = Math.max(...Object.keys(CHAMPIONS_LEAGUE_RAW_DATA).map(Number));


  if (year < MIN_CHAMPIONS_LEAGUE_YEAR || year > currentMaxYear) {
    const errorMsg = `Champions League data is momenteel alleen beschikbaar van ${MIN_CHAMPIONS_LEAGUE_YEAR} tot en met ${currentMaxYear}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN ChampionsLeague] ${errorMsg}`);
    return { data: null, error: errorMsg };
  }

  const rawDataString = CHAMPIONS_LEAGUE_RAW_DATA[year];

  if (!rawDataString) {
    const errorMsg = `Geen Champions League data gevonden voor het jaar ${year}.`;
    console.warn(`[WARN ChampionsLeague] ${errorMsg}`);
    return { data: null, error: null }; // Return null to indicate no specific data
  }

  try {
    const parts = rawDataString.split('|').map(part => part.trim());
    if (parts.length < 9) { // Now requiring at least 9 parts up to stadionLand
      const errorMsg = `Ongeldig dataformaat voor Champions League jaar ${year}. Onvoldoende velden (${parts.length}). Data: ${rawDataString}`;
      console.error(`[ERROR ChampionsLeague] ${errorMsg}`);
      return { data: null, error: errorMsg };
    }

    const championsLeagueData: ChampionsLeagueYearData = {
      year,
      finaleDatum: parts[0] || 'N/A',
      winnaarClub: parts[1] || 'N/A',
      winnaarLand: parts[2] || 'N/A',
      uitslag: parts[3] || 'N/A',
      finalistClub: parts[4] || 'N/A',
      finalistLand: parts[5] || 'N/A',
      stadion: parts[6] || 'N/A',
      stadionPlaats: parts[7] || 'N/A',
      stadionLand: parts[8] || 'N/A',
      manOfTheMatch: parts[9]?.trim() || undefined,
      verliezerHFWinnaarClub: parts[10]?.trim() || undefined,
      verliezerHFWinnaarLand: parts[11]?.trim() || undefined,
      verliezerHFFinalistClub: parts[12]?.trim() || undefined,
      verliezerHFFinalistLand: parts[13]?.trim() || undefined,
    };

    console.log(`[fetchChampionsLeagueDataByYear] Successfully parsed data for year ${year}.`);
    return { data: championsLeagueData, error: null };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij verwerken Champions League data voor ${year}: ${error.message || 'Onbekend'}`;
    console.error(`[ERROR ChampionsLeague] ${errorMsg}`, { error });
    return { data: null, error: errorMsg };
  }
}
