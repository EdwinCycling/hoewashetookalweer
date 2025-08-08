
'use server';

import { NEDERLANDSTALIGE_TOP10_BY_YEAR, MIN_NEDERLANDSTALIGE_TOP10_YEAR, type Top10NLSong } from '@/data/nederlandstalige-top10-data';

export type { Top10NLSong };

export interface FetchNederlandstaligeTop10Result {
  songs: Top10NLSong[] | null;
  error?: string | null;
}

/**
 * Fetches Nederlandstalige Top 10 for a specific year.
 *
 * @param year The year to fetch data for.
 * @returns An object containing an array of top songs or an error message.
 */
export async function fetchNederlandstaligeTop10ByYear(
  year: number
): Promise<FetchNederlandstaligeTop10Result> {
  console.log(`[fetchNederlandstaligeTop10ByYear] Called for year: ${year}`);

  if (year < MIN_NEDERLANDSTALIGE_TOP10_YEAR) {
    const errorMsg = `Nederlandstalige Top 10 data is alleen beschikbaar vanaf ${MIN_NEDERLANDSTALIGE_TOP10_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN NederlandstaligeTop10] ${errorMsg}`);
    return { songs: null, error: errorMsg };
  }

  const songsForYear = NEDERLANDSTALIGE_TOP10_BY_YEAR[year];

  if (songsForYear && songsForYear.length > 0) {
    // Sorteer op positie voor de zekerheid, mocht de data niet gesorteerd zijn
    const sortedSongs = [...songsForYear].sort((a, b) => parseInt(a.position) - parseInt(b.position));
    console.log(`[fetchNederlandstaligeTop10ByYear] Found ${sortedSongs.length} songs for year ${year}.`);
    return { songs: sortedSongs, error: null };
  } else {
    const errorMsg = `Geen Nederlandstalige Top 10 data gevonden voor het jaar ${year} in de huidige datalijst.`;
    console.warn(`[WARN NederlandstaligeTop10] ${errorMsg}`);
    return { 
      songs: null, 
      error: errorMsg,
    };
  }
}
