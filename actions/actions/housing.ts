
'use server';

import { HOUSING_PRICES_BY_YEAR, MIN_HOUSING_PRICES_YEAR, type HousingPricesYearData, type ProvincePriceData } from '@/data/housing-prices-data';

export type { ProvincePriceData };

export interface FetchHousingPricesResult {
  data: HousingPricesYearData | null;
  error?: string | null;
}

export async function fetchHousingPricesByYear(
  year: number
): Promise<FetchHousingPricesResult> {
  console.log(`[fetchHousingPricesByYear] Called for year: ${year}`);

  if (year < MIN_HOUSING_PRICES_YEAR) {
    const errorMsg = `Huizenprijsdata is alleen beschikbaar vanaf ${MIN_HOUSING_PRICES_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN HousingPrices] ${errorMsg}`);
    return { data: null, error: errorMsg };
  }

  const pricesForYear = HOUSING_PRICES_BY_YEAR[year];

  if (pricesForYear) {
    console.log(`[fetchHousingPricesByYear] Found housing price data for year ${year}.`);
    return { data: { year, prices: pricesForYear }, error: null };
  } else {
    const errorMsg = `Geen huizenprijsdata gevonden voor het jaar ${year} in de huidige datalijst.`;
    console.warn(`[WARN HousingPrices] ${errorMsg}`);
    return { 
      data: null, 
      error: errorMsg,
    };
  }
}
