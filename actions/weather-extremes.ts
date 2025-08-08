'use server';

import type { KnmiDailyRecord } from '@/data/knmi-daily-weather-data';
import knmiJsonData from '@/data/knmi_daily_weather_full.json';
import { getYear, getMonth, getDate, parseISO, isValid } from 'date-fns';

export interface WeatherExtreme {
    value: string;
    year: number;
}

export interface WeatherExtremesResult {
    warmest: WeatherExtreme | null;
    coldest: WeatherExtreme | null;
    windiest: WeatherExtreme | null;
    wettest: WeatherExtreme | null;
    sunniest: WeatherExtreme | null;
    error?: string | null;
    debugInfo?: any;
}

const MIN_YEAR = 1901;

// Helper to format values
function formatTemp(value: number): string {
    return `${(value / 10).toFixed(1)}°C`;
}

function formatWind(value: number): string {
    const ms = value / 10;
    if (ms < 0) return 'N/A';
    let beaufort = '0 Bft (Stil)';
    if (ms >= 32.7) beaufort = '12 Bft (Orkaan)';
    else if (ms >= 28.5) beaufort = '11 Bft (Zeer zware storm)';
    else if (ms >= 24.5) beaufort = '10 Bft (Zware storm)';
    else if (ms >= 20.8) beaufort = '9 Bft (Storm)';
    else if (ms >= 17.2) beaufort = '8 Bft (Stormachtige wind)';
    else if (ms >= 13.9) beaufort = '7 Bft (Harde wind)';
    else if (ms >= 10.8) beaufort = '6 Bft (Krachtige wind)';
    else if (ms >= 8.0) beaufort = '5 Bft (Vrij krachtige wind)';
    else if (ms >= 5.5) beaufort = '4 Bft (Matige wind)';
    else if (ms >= 3.4) beaufort = '3 Bft (Matige wind)';
    else if (ms >= 1.6) beaufort = '2 Bft (Zwakke wind)';
    else if (ms >= 0.3) beaufort = '1 Bft (Zwakke wind)';
    const kmh = (ms * 3.6).toFixed(1);
    return `${beaufort} (${kmh} km/u)`;
}

function formatRain(value: number): string {
    if (value === -1) return "0.0 mm";
    return `${(value / 10).toFixed(1)} mm`;
}

function formatSun(value: number): string {
    if (value === -1) return "0.0 uur";
    return `${(value / 10).toFixed(1)} uur`;
}


export async function fetchWeatherExtremes(
    selectedDate: Date
): Promise<WeatherExtremesResult> {
    const debugInfo: any = {
        selectedDate: selectedDate.toISOString(),
        log: [],
    };

    if (!isValid(selectedDate)) {
        const errorMsg = "Ongeldige datum ontvangen.";
        debugInfo.log.push(`[ERROR] ${errorMsg}`);
        return { warmest: null, coldest: null, windiest: null, wettest: null, sunniest: null, error: errorMsg, debugInfo };
    }

    const startYear = getYear(selectedDate);
    const targetMonth = getMonth(selectedDate); // 0-indexed
    const targetDay = getDate(selectedDate);

    if (startYear < MIN_YEAR) {
        const errorMsg = `Data is pas beschikbaar vanaf ${MIN_YEAR}.`;
        debugInfo.log.push(`[WARN] ${errorMsg}`);
        return { warmest: null, coldest: null, windiest: null, wettest: null, sunniest: null, error: errorMsg, debugInfo };
    }
    
    debugInfo.log.push(`[INFO] Filtering for ${targetDay}-${targetMonth+1} from year ${startYear} to present.`);

    const allRecords: KnmiDailyRecord[] = knmiJsonData as KnmiDailyRecord[];
    
    const relevantRecords = allRecords.filter(record => {
        if (record.station_code !== 260 || !record.date) return false;
        try {
            const recordDate = parseISO(record.date);
            const recordYear = getYear(recordDate);
            return (
                recordYear >= startYear &&
                getMonth(recordDate) === targetMonth &&
                getDate(recordDate) === targetDay
            );
        } catch (e) {
            debugInfo.log.push(`[WARN] Skipping record with invalid date: ${record.date}`);
            return false;
        }
    });
    
    debugInfo.log.push(`[INFO] Found ${relevantRecords.length} relevant records.`);

    if (relevantRecords.length === 0) {
        return { warmest: null, coldest: null, windiest: null, wettest: null, sunniest: null, error: null, debugInfo };
    }

    let warmest: { value: number, year: number } | null = null;
    let coldest: { value: number, year: number } | null = null;
    let windiest: { value: number, year: number } | null = null;
    let wettest: { value: number, year: number } | null = null;
    let sunniest: { value: number, year: number } | null = null;

    relevantRecords.forEach(record => {
        const recordYear = getYear(parseISO(record.date));

        // Warmest
        if (typeof record.TX === 'number') {
            if (!warmest || record.TX > warmest.value) {
                warmest = { value: record.TX, year: recordYear };
            }
        }
        // Coldest
        if (typeof record.TN === 'number') {
            if (!coldest || record.TN < coldest.value) {
                coldest = { value: record.TN, year: recordYear };
            }
        }
        // Windiest
        if (typeof record.FHX === 'number' && record.FHX >= 0) {
            if (!windiest || record.FHX > windiest.value) {
                windiest = { value: record.FHX, year: recordYear };
            }
        }
        // Wettest
        if (typeof record.RH === 'number' && record.RH >= 0) {
            if (!wettest || record.RH > wettest.value) {
                wettest = { value: record.RH, year: recordYear };
            }
        }
        // Sunniest
        if (typeof record.SQ === 'number' && record.SQ >= 0) {
            if (!sunniest || record.SQ > sunniest.value) {
                sunniest = { value: record.SQ, year: recordYear };
            }
        }
    });

    debugInfo.results = { warmest, coldest, windiest, wettest, sunniest };
    
    const result: WeatherExtremesResult = {
        warmest: null,
        coldest: null,
        windiest: null,
        wettest: null,
        sunniest: null,
        error: null,
        debugInfo
    };

    if (warmest) {
        result.warmest = { value: formatTemp(warmest.value), year: warmest.year };
    }
    if (coldest) {
        result.coldest = { value: formatTemp(coldest.value), year: coldest.year };
    }
    if (windiest) {
        result.windiest = { value: formatWind(windiest.value), year: windiest.year };
    }
    if (wettest) {
        result.wettest = { value: formatRain(wettest.value), year: wettest.year };
    }
    if (sunniest) {
        result.sunniest = { value: formatSun(sunniest.value), year: sunniest.year };
    }

    return result;
}
