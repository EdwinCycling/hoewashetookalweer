
'use server';

import { FUEL_PRICES_BY_YEAR_RAW, MIN_FUEL_PRICES_YEAR, type RawFuelPriceDetails } from '@/data/fuel-prices-data';

export type { RawFuelPriceDetails };

export interface FormattedFuelPriceDetails {
  [key: string]: string;
}

export interface FuelPricesYearData {
  year: number;
  prices: FormattedFuelPriceDetails;
}

export interface FetchFuelPricesResult {
  data: FuelPricesYearData | null;
  error?: string | null;
}

const formatPrice = (price?: number): string => {
  if (price === undefined || price === null || price < 0) return 'N/A';
  // Afronden op 3 decimalen, wat standaard is voor brandstofprijzen.
  const roundedPrice = Math.round(price * 1000) / 1000;
  return `€ ${roundedPrice.toFixed(3)}`;
};

/**
 * Fetches formatted fuel prices for a specific year.
 *
 * @param year The year to fetch fuel price data for.
 * @returns An object containing formatted fuel prices or an error message.
 */
export async function fetchFuelPricesByYear(
  year: number
): Promise<FetchFuelPricesResult> {
  console.log(`[fetchFuelPricesByYear] Called for year: ${year}`);

  if (year < MIN_FUEL_PRICES_YEAR) {
    const errorMsg = `Brandstofprijzen data is alleen beschikbaar vanaf ${MIN_FUEL_PRICES_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN FuelPrices] ${errorMsg}`);
    return { data: null, error: errorMsg };
  }

  const rawPrices = FUEL_PRICES_BY_YEAR_RAW[year];

  if (!rawPrices) {
    const errorMsg = `Geen brandstofprijzen data gevonden voor het jaar ${year}.`;
    console.warn(`[WARN FuelPrices] ${errorMsg}`);
    // Return null for data, but error message will be displayed in UI if year is valid but no data
    return { data: null, error: errorMsg };
  }

  try {
    const formattedPrices: FormattedFuelPriceDetails = {
      'Gemiddeld Euro 95': formatPrice(rawPrices.price_1),
      'Gemiddeld Diesel': formatPrice(rawPrices.price_2),
      'Gemiddeld LPG': formatPrice(rawPrices.price_3),
      'Snelweg (Bemand) Euro 95': formatPrice(rawPrices.price_4),
      'Snelweg (Bemand) Diesel': formatPrice(rawPrices.price_5),
      'Snelweg (Bemand) LPG': formatPrice(rawPrices.price_6),
      'Lokaal (Bemand) Euro 95': formatPrice(rawPrices.price_7),
      'Lokaal (Bemand) Diesel': formatPrice(rawPrices.price_8),
      'Lokaal (Bemand) LPG': formatPrice(rawPrices.price_9),
      'Lokaal (Onbemand) Euro 95': formatPrice(rawPrices.price_10),
      'Lokaal (Onbemand) Diesel': formatPrice(rawPrices.price_11),
    };

    console.log(`[fetchFuelPricesByYear] Successfully parsed and formatted data for year ${year}.`);
    return { data: { year, prices: formattedPrices }, error: null };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij verwerken brandstofprijzen data voor ${year}: ${error.message || 'Onbekend'}`;
    console.error(`[ERROR FuelPrices] ${errorMsg}`, { error });
    return { data: null, error: errorMsg };
  }
}
