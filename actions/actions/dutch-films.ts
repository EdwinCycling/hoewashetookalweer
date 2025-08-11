
'use server';

import { DUTCH_FILMS_BY_YEAR, MIN_DUTCH_FILMS_YEAR, type DutchFilmData } from '@/data/dutch-films-data';

export type { DutchFilmData };

export interface FetchDutchFilmsResult {
  films: DutchFilmData[] | null;
  error?: string | null;
}

export async function fetchDutchFilmsByYear(year: number): Promise<FetchDutchFilmsResult> {
  console.log(`[fetchDutchFilmsByYear] Called for year: ${year}`);

  if (year < MIN_DUTCH_FILMS_YEAR) {
    const errorMsg = `Nederlandse filmdata is alleen beschikbaar vanaf ${MIN_DUTCH_FILMS_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN DutchFilms] ${errorMsg}`);
    return { films: null, error: errorMsg };
  }

  const filmsForYear = DUTCH_FILMS_BY_YEAR[year];

  if (filmsForYear) { // Kan een lege array zijn als er geen films zijn voor dat jaar
    console.log(`[fetchDutchFilmsByYear] Found ${filmsForYear.length} Dutch films for year ${year}.`);
    return { films: filmsForYear, error: null };
  } else {
    // Als het jaar wel binnen de range is, maar er geen entry is (nog niet toegevoegd), of geen films.
    const infoMsg = `Geen Nederlandse filmdata (of nog niet toegevoegd) gevonden voor het jaar ${year} in de huidige datalijst.`;
    console.log(`[INFO DutchFilms] ${infoMsg}`);
    return { films: [], error: null }; // Geef een lege array terug ipv null om onderscheid te maken met een harde fout
  }
}
