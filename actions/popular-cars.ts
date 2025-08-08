
'use server';

import { POPULAR_CARS_BY_YEAR, MIN_CARS_YEAR, type PopularCarInfo } from '@/data/popular-cars-data';

export type { PopularCarInfo };

export interface FetchPopularCarsResult {
  cars: PopularCarInfo[] | null;
  error?: string | null;
}

export async function fetchPopularCarsByYear(year: number): Promise<FetchPopularCarsResult> {
  console.log(`[fetchPopularCarsByYear] Called for year: ${year}`);

  if (year < MIN_CARS_YEAR) {
    const errorMsg = `Populaire auto data is alleen beschikbaar vanaf ${MIN_CARS_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN PopularCars] ${errorMsg}`);
    return { cars: null, error: errorMsg };
  }

  const carsForYear = POPULAR_CARS_BY_YEAR[year];

  if (carsForYear && carsForYear.length > 0) {
    console.log(`[fetchPopularCarsByYear] Found ${carsForYear.length} popular cars for year ${year}.`);
    return { cars: carsForYear, error: null };
  } else {
    const errorMsg = `Geen populaire auto data gevonden voor het jaar ${year} in de huidige datalijst.`;
    console.warn(`[WARN PopularCars] ${errorMsg}`);
    return { 
      cars: null, 
      error: errorMsg,
    };
  }
}
