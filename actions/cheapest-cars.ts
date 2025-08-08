
'use server';

import { CHEAPEST_CARS_BY_YEAR, MIN_CARS_YEAR, type CheapestCarInfo } from '@/data/cheapest-cars-data';

export type { CheapestCarInfo };

export interface FetchCheapestCarsResult {
  cars: CheapestCarInfo[] | null;
  error?: string | null;
}

export async function fetchCheapestCarsByYear(year: number): Promise<FetchCheapestCarsResult> {
  console.log(`[fetchCheapestCarsByYear] Called for year: ${year}`);

  if (year < MIN_CARS_YEAR) {
    const errorMsg = `Goedkoopste auto data is alleen beschikbaar vanaf ${MIN_CARS_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN CheapestCars] ${errorMsg}`);
    return { cars: null, error: errorMsg };
  }

  const carsForYear = CHEAPEST_CARS_BY_YEAR[year];

  if (carsForYear && carsForYear.length > 0) {
    console.log(`[fetchCheapestCarsByYear] Found ${carsForYear.length} cheapest cars for year ${year}.`);
    return { cars: carsForYear, error: null };
  } else {
    const errorMsg = `Geen data voor goedkoopste auto's gevonden voor het jaar ${year} in de huidige datalijst.`;
    console.warn(`[WARN CheapestCars] ${errorMsg}`);
    return { 
      cars: null, 
      error: errorMsg,
    };
  }
}
