
'use server';

import { GAMES_BY_YEAR, MIN_GAMES_YEAR, type Game } from '@/data/games-data';

export type { Game };

export interface FetchGamesResult {
  games: Game[] | null;
  error?: string | null;
}

export async function fetchGamesByYear(year: number): Promise<FetchGamesResult> {
  console.log(`[fetchGamesByYear] Called for year: ${year}`);

  if (year < MIN_GAMES_YEAR) {
    const errorMsg = `Game data is alleen beschikbaar vanaf ${MIN_GAMES_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN Games] ${errorMsg}`);
    return { games: null, error: errorMsg };
  }

  const gamesForYear = GAMES_BY_YEAR[year];

  if (gamesForYear && gamesForYear.length > 0) {
    console.log(`[fetchGamesByYear] Found ${gamesForYear.length} games for year ${year}.`);
    return { games: gamesForYear, error: null };
  } else {
    // Data not yet added for this year
    const infoMsg = `Geen game data gevonden voor het jaar ${year} in de huidige datalijst.`;
    console.log(`[INFO Games] ${infoMsg}`);
    return { 
      games: [], // Return empty array to indicate no data, not an error
      error: null,
    };
  }
}
