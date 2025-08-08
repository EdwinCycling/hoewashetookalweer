
'use server';

import type { KnmiDailyRecord } from '@/data/knmi-daily-weather-data';
import { isValid, parseISO, differenceInDays, getYear as getYearFns, addDays, subDays, startOfYear, format as formatDateFns } from 'date-fns';
import { nl } from 'date-fns/locale';
import { fetchWeatherStats, type WeatherStatsData } from '@/actions/weather';
import { fetchKnmiMonthlyOverview, type KnmiMonthlyOverviewResult } from '@/actions/knmi-maandoverzicht';
import knmiJsonDataForStreaks from '@/data/knmi_daily_weather_full.json';

const MIN_KNMI_DATA_YEAR = 1901;
const MIN_KNMI_MONTHLY_OVERVIEW_YEAR = 1999;
const MIN_KNMI_MONTHLY_OVERVIEW_MONTH_INDEX = 0;


export interface ChartDataItem {
  date: string; // Formatted as 'dd-MM' for display
  fullDate: string; // ISO date string for sorting/reference
  maxTemp: number | null;
  minTemp: number | null;
  precipitation: number | null;
  sunshineHours: number | null;
}

export interface YearlyTempDataItem {
  year: number;
  displayYear: string; // e.g., "'24"
  maxTemp: number | null;
  minTemp: number | null;
}

export interface SelectedDayWeatherDetails {
  gemiddeldeTemp?: string | null;
  maxTemp?: string | null;
  minTemp?: string | null;
  gevoelstemperatuur?: string | null;
  hitteIndex?: string | null;
  windRichting?: string | null;
  windSnelheidGemiddeld?: string | null;
  windSnelheidMaxUur?: string | null;
  maxWindstoot?: string | null;
  zonneschijnDuur?: string | null;
  zonneschijnPercentage?: string | null;
  bewolkingOmschrijving?: string | null;
  neerslagHoeveelheid?: string | null;
  neerslagDuur?: string | null;
  luchtdruk?: string | null;
  luchtvochtigheid?: string | null;
}

export interface FetchWeatherStreaksOptions {
  includeChartData?: boolean;
  isMobileChart?: boolean;
  includeYearlyChartData?: boolean;
  includeKnmiMonthlyOverview?: boolean;
}

export interface FetchWeatherStreaksResult {
  maxTempStreak: string | null;
  minTempStreak: string | null;
  summerDaysMessage?: string | null;
  frostDaysMessage?: string | null;
  amplitudeStreakMessage?: string | null;
  maxWindSpeedStreakMessage?: string | null;
  dryDayStreakMessage?: string | null;
  dryDaysInYearMessage?: string | null;
  sunnyDayMessage?: string | null;
  weatherChartData?: ChartDataItem[] | null;
  yearlyTemperatureData?: YearlyTempDataItem[] | null;
  averageYearlyMaxTemp?: number | null;
  averageYearlyMinTemp?: number | null;
  selectedDayWeatherDetails?: SelectedDayWeatherDetails | null;
  historicalWeatherStats?: WeatherStatsData | null;
  knmiMonthlyOverview?: KnmiMonthlyOverviewResult | null;
  error?: string | null;
  debugInfo: {
    selectedDateISO?: string;
    selectedDateTX?: number | null;
    selectedDateTN?: number | null;
    selectedDateRH?: number | null;
    selectedDateSP?: number | null;
    selectedDateSQ?: number | null;
    selectedDateAmplitude?: number | null;
    selectedDateFHX_ms?: number | null;
    currentDayRecordRaw?: KnmiDailyRecord | null;
    foundWarmerDate?: string | null;
    foundWarmerTX?: number | null;
    daysSinceWarmer?: number | null;
    foundColderDate?: string | null;
    foundColderTN?: number | null;
    daysSinceColder?: number | null;
    summerDaysCountInYear?: number | null;
    frostDaysCountInYear?: number | null;
    foundGreaterAmplitudeDate?: string | null;
    foundGreaterAmplitudeValue?: number | null;
    foundGreaterAmplitudeTX?: number | null;
    foundGreaterAmplitudeTN?: number | null;
    daysSinceGreaterAmplitude?: number | null;
    foundHigherFHXDate?: string | null;
    foundHigherFHX_ms?: number | null;
    daysSinceHigherFHX?: number | null;
    lastNonDryDayDate?: string | null;
    consecutiveDryDays?: number | null;
    dryDaysCountInYear?: number | null;
    totalDaysInYearSoFar?: number | null;
    percentageDryDaysInYear?: string | null;
    sunnyDaysCountInYear?: number | null;
    datasetStartDate?: string | null;
    chartDataWindowStart?: string;
    chartDataWindowEnd?: string;
    chartDataPointsCount?: number;
    chartDataSample?: ChartDataItem[];
    optionsUsed?: FetchWeatherStreaksOptions;
    totalDaysInChart?: number;
    yearlyChartDataRange?: { start: number; end: number };
    yearlyChartDataPointsCount?: number;
    yearlyChartDataSample?: YearlyTempDataItem[];
    averageYearlyMaxTemp?: number | null;
    averageYearlyMinTemp?: number | null;
    historicalWeatherStatsDebug?: any;
    knmiMonthlyOverviewDebug?: any;
    log: string[];
  };
}

// Helper functies voor formattering (geïnspireerd/vereenvoudigd uit knmi-daily-weather-action)
function formatValue(value: number | null | undefined, divisor: number = 1, unit: string = '', specialNegOne?: string, precision: number = 1): string | undefined {
  if (value === null || typeof value === 'undefined') return undefined;
  if (value === -1 && specialNegOne) return specialNegOne;
  if (value === -1) return `0${unit.trim()}`;
  const num = value / divisor;
  return `${num.toLocaleString('nl-NL', { minimumFractionDigits: precision, maximumFractionDigits: precision })}${unit}`;
}

function degreesToCardinal(degrees: number | null | undefined): string | undefined {
  if (degrees === null || typeof degrees === 'undefined') return undefined;
  if (degrees === 0 && (typeof degrees !== 'undefined' && degrees !== null)) return 'Windstil / Variabel';
  if (degrees > 360 || degrees < 0) return undefined;
  const val = Math.floor((degrees / 22.5) + 0.5);
  const arr = ["N", "NNO", "NO", "ONO", "O", "OZO", "ZO", "ZZO", "Z", "ZZW", "ZW", "WZW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

function msToBftKmH(ms: number | null | undefined): string | undefined {
  if (ms === null || typeof ms === 'undefined' || ms < 0) return undefined;
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

function getCloudCoverageDescription(ng?: number | null): string | undefined {
  if (ng === null || typeof ng === 'undefined') return undefined;
  switch (ng) {
      case 0: return "Onbewolkt / Helder (0/8)";
      case 1: return "Vrijwel onbewolkt (1/8)";
      case 2: return "Licht bewolkt (2/8)";
      case 3: return "Gedeeltelijk bewolkt (3/8)";
      case 4: return "Half bewolkt (4/8)";
      case 5: return "Overwegend bewolkt (5/8)";
      case 6: return "Zwaar bewolkt (6/8)";
      case 7: return "Vrijwel geheel bewolkt (7/8)";
      case 8: return "Geheel bewolkt / Betrokken (8/8)";
      case 9: return "Bovenlucht onzichtbaar (9/8)";
      default: return `${ng}/8 (Omschrijving onbekend)`;
  }
}

function calculateWindChill(tempCelsius: number, windSpeedMs: number): number | null {
    if (tempCelsius > 10 || windSpeedMs < 1.3) return null;
    const windSpeedKmh = windSpeedMs * 3.6;
    if (windSpeedKmh < 5) return tempCelsius;

    const T_wc = 13.12 + (0.6215 * tempCelsius) - (11.37 * Math.pow(windSpeedKmh, 0.16)) + (0.3965 * tempCelsius * Math.pow(windSpeedKmh, 0.16));
    return T_wc;
}

function calculateHeatIndex(tempCelsius: number, relativeHumidityPercent: number): number | null {
  if (tempCelsius < 26.7 || relativeHumidityPercent < 40) return null;

  const T = tempCelsius;
  const R = relativeHumidityPercent;
  let HI = -8.78469475556 + 1.61139411 * T + 2.33854883889 * R - 0.14611605 * T * R - 0.012308094 * Math.pow(R, 2) - 0.0164248277778 * Math.pow(T, 2) + 0.002211732 * Math.pow(T, 2) * R + 0.00072546 * T * Math.pow(R, 2) - 0.000003582 * Math.pow(T, 2) * Math.pow(R, 2);

  if (R < 13 && T >= 26.7 && T <= 44.4) {
    const adjustment = ((13 - R) / 4) * Math.sqrt((17 - Math.abs(T - 35.0)) / 17);
    HI -= adjustment;
  } else if (R > 85 && T >= 26.7 && T <= 30.5) {
    const adjustment = ((R - 85) / 10) * ((30.5 - T) / 2.8);
    HI += adjustment;
  }
  return Math.max(T, HI);
}

function formatTemp(temp: number | null | undefined): string {
  if (temp === null || typeof temp === 'undefined') return 'N/A';
  return `${(temp / 10).toFixed(1)}°C`;
}

function formatWindspeed(fhx_raw: number | null | undefined): string {
    if (fhx_raw === null || typeof fhx_raw === 'undefined' || fhx_raw < 0) return 'N/A';
    const fhx_ms = fhx_raw / 10;
    return msToBftKmH(fhx_ms) ?? 'N/A';
}

function formatSunshineDuration(sq_raw: number | null | undefined): string {
    if (sq_raw === null || typeof sq_raw === 'undefined') return 'N/A';
    if (sq_raw === -1) return '<0.05 uur';
    return `${(sq_raw / 10).toFixed(1)} uur`;
}

function isDayDry(record: KnmiDailyRecord | undefined | null): boolean {
    if (!record || record.RH === null || typeof record.RH === 'undefined') return false;
    return record.RH === 0 || record.RH === -1; // -1 means <0.05mm
}

function isDaySunny(record: KnmiDailyRecord | undefined | null): boolean {
    if (!record || record.SP === null || typeof record.SP === 'undefined') return false;
    return record.SP > 60;
}


export async function fetchWeatherStreaks(
  selectedDate: Date,
  options?: FetchWeatherStreaksOptions
): Promise<FetchWeatherStreaksResult> {
  const defaultOptions: FetchWeatherStreaksOptions = {
    includeChartData: false,
    isMobileChart: false,
    includeYearlyChartData: false,
    includeKnmiMonthlyOverview: false,
  };
  const currentOptions = { ...defaultOptions, ...options };

  const debug: NonNullable<FetchWeatherStreaksResult['debugInfo']> = { log: [], optionsUsed: currentOptions };
  const resultShell: FetchWeatherStreaksResult = {
    maxTempStreak: null,
    minTempStreak: null,
    summerDaysMessage: null,
    frostDaysMessage: null,
    amplitudeStreakMessage: null,
    maxWindSpeedStreakMessage: null,
    dryDayStreakMessage: null,
    dryDaysInYearMessage: null,
    sunnyDayMessage: null,
    weatherChartData: null,
    yearlyTemperatureData: null,
    averageYearlyMaxTemp: null,
    averageYearlyMinTemp: null,
    selectedDayWeatherDetails: null,
    historicalWeatherStats: null,
    knmiMonthlyOverview: null,
    error: null,
    debugInfo: debug,
  };

  const formattedSelectedDateForLog = isValid(selectedDate) ? formatDateFns(selectedDate, 'yyyy-MM-dd', { locale: nl }) : "INVALID_DATE_INPUT";
  debug.log.push(`[WeatherStreaks ACTION_INIT] Action initialized. Options: ${JSON.stringify(currentOptions)}`);


  if (!selectedDate || !isValid(selectedDate)) {
    debug.log.push('[WeatherStreaks ERROR_INVALID_DATE] Invalid selectedDate received.');
    resultShell.error = 'Ongeldige geselecteerde datum ontvangen door de server.';
    return resultShell;
  }
  debug.selectedDateISO = selectedDate.toISOString();
  debug.log.push(`[WeatherStreaks ACTION_START] Action started for date: ${formattedSelectedDateForLog}. Options: ${JSON.stringify(currentOptions)}`);


  const targetYear = selectedDate.getUTCFullYear();
  if (targetYear < MIN_KNMI_DATA_YEAR) {
     const errorMsg = `Weerreeksen data is pas beschikbaar vanaf ${MIN_KNMI_DATA_YEAR}. Gekozen jaar: ${targetYear}.`;
     debug.log.push(`[WeatherStreaks WARN_YEAR_RANGE] ${errorMsg}`);
     resultShell.error = errorMsg;
     return resultShell;
  }

  let allRecords: KnmiDailyRecord[] = [];
  try {
    allRecords = knmiJsonDataForStreaks as KnmiDailyRecord[];
    debug.log.push(`[WeatherStreaks INFO_KNMI_DATA_LOAD] Successfully loaded ${allRecords.length} KNMI records from direct import.`);

    if (allRecords.length === 0) {
      debug.log.push('[WeatherStreaks ERROR_EMPTY_DATASET] KNMI dataset is leeg.');
      resultShell.error = 'KNMI dataset is leeg.';
      return resultShell;
    }

    const station260Records = allRecords
      .filter(r => r.station_code === 260 && r.date && isValid(parseISO(r.date)))
      .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime());

    if (station260Records.length > 0) {
        debug.datasetStartDate = station260Records[station260Records.length - 1].date;
        debug.log.push(`[WeatherStreaks INFO_DATASET_RANGE] Dataset (station 260) startdatum: ${debug.datasetStartDate}`);
    } else {
        debug.log.push('[WeatherStreaks ERROR_NO_VALID_RECORDS_STATION_260] Geen geldige records gevonden voor station De Bilt.');
        resultShell.error = 'Geen geldige KNMI records gevonden in de dataset voor station De Bilt.';
        return resultShell;
    }
    const streakRecords = station260Records;


  const selectedDateStringForCompare = formatDateFns(selectedDate, 'yyyy-MM-dd');
  const currentDayRecord = streakRecords.find(r => r.date.startsWith(selectedDateStringForCompare));
  debug.currentDayRecordRaw = currentDayRecord ?? null;


  if (!currentDayRecord) {
    const errorMsg = `Geen KNMI data gevonden voor de geselecteerde datum: ${selectedDateStringForCompare}.`;
    debug.log.push(`[WeatherStreaks WARN_NO_RECORD_FOR_DATE] ${errorMsg}`);
    resultShell.error = errorMsg;
    return resultShell;
  }

  // Fetch historical weather stats
  try {
      debug.log.push(`[WeatherStreaks INFO_HIST_STATS_FETCH_START] Fetching historical weather stats for ${formattedSelectedDateForLog}`);
      const historicalStats = await fetchWeatherStats(
          selectedDate.getUTCDate(),
          selectedDate.getUTCMonth() + 1,
          selectedDate.getUTCFullYear()
      );
      resultShell.historicalWeatherStats = historicalStats;
      debug.historicalWeatherStatsDebug = historicalStats.debugInfo;
      if (historicalStats.error) {
          debug.log.push(`[WeatherStreaks WARN_HIST_STATS_FETCH_ERROR] Error fetching historical stats: ${historicalStats.error}`);
      } else {
          debug.log.push(`[WeatherStreaks INFO_HIST_STATS_FETCH_SUCCESS] Successfully fetched historical weather stats.`);
      }
  } catch (histStatError: any) {
      const errorMsg = `Kon historische weer records niet ophalen: ${histStatError.message || 'Onbekende fout'}`;
      debug.log.push(`[WeatherStreaks ERROR_HIST_STATS_FETCH_EXCEPTION] ${errorMsg}`);
      resultShell.historicalWeatherStats = {
          day: selectedDate.getUTCDate(),
          month: selectedDate.getUTCMonth()+1,
          year: selectedDate.getUTCFullYear(),
          error: errorMsg,
          debugInfo: { url: '', requestedDay: selectedDate.getUTCDate(), requestedMonth: selectedDate.getUTCMonth()+1, requestedYear: selectedDate.getUTCFullYear(), log: [errorMsg] }
      };
  }

  // Fetch KNMI Monthly Overview if requested and applicable
  if (currentOptions.includeKnmiMonthlyOverview) {
    const selectedMonthIndex = selectedDate.getUTCMonth();
    const isKnmiMonthlyDateValid =
        targetYear > MIN_KNMI_MONTHLY_OVERVIEW_YEAR ||
        (targetYear === MIN_KNMI_MONTHLY_OVERVIEW_YEAR && selectedMonthIndex >= MIN_KNMI_MONTHLY_OVERVIEW_MONTH_INDEX);

    if (isKnmiMonthlyDateValid) {
      debug.log.push(`[WeatherStreaks INFO_MONTHLY_OVERVIEW_FETCH_START] Fetching KNMI Monthly Overview for ${targetYear}-${selectedMonthIndex + 1}`);
      try {
        const monthlyOverview = await fetchKnmiMonthlyOverview(targetYear, selectedMonthIndex);
        resultShell.knmiMonthlyOverview = monthlyOverview;
        if(monthlyOverview.debugInfo) debug.knmiMonthlyOverviewDebug = monthlyOverview.debugInfo;
        if (monthlyOverview.error) {
          debug.log.push(`[WeatherStreaks WARN_MONTHLY_OVERVIEW_FETCH_ERROR] Error fetching monthly overview: ${monthlyOverview.error}`);
        } else {
          debug.log.push(`[WeatherStreaks INFO_MONTHLY_OVERVIEW_FETCH_SUCCESS] Successfully fetched KNMI Monthly Overview.`);
        }
      } catch (monthlyError: any) {
        const errorMsg = `Kon KNMI Maandoverzicht niet ophalen (exception): ${monthlyError.message || 'Onbekende fout'}`;
        debug.log.push(`[WeatherStreaks ERROR_MONTHLY_OVERVIEW_FETCH_EXCEPTION] ${errorMsg}`);
        resultShell.knmiMonthlyOverview = { paragraphs: null, error: errorMsg, debugInfo: {url:'', log: [errorMsg]} };
      }
    } else {
      const errorMsg = `KNMI Maandoverzicht is pas beschikbaar vanaf ${formatDateFns(new Date(Date.UTC(MIN_KNMI_MONTHLY_OVERVIEW_YEAR, MIN_KNMI_MONTHLY_OVERVIEW_MONTH_INDEX, 1)), 'MMMM yyyy', {locale: nl})}. Gekozen: ${selectedDate ? formatDateFns(selectedDate, 'MMMM yyyy', {locale: nl}) : 'onbekende datum'}.`;
      debug.log.push(`[WeatherStreaks WARN_MONTHLY_OVERVIEW_DATE_INVALID] ${errorMsg}`);
      resultShell.knmiMonthlyOverview = { paragraphs: null, error: errorMsg, debugInfo: {url:'', log: [errorMsg]} };
    }
  } else {
      resultShell.knmiMonthlyOverview = null;
      debug.log.push(`[WeatherStreaks INFO_MONTHLY_OVERVIEW_SKIP] includeKnmiMonthlyOverview is false, skipping.`);
  }


  debug.selectedDateTX = currentDayRecord.TX ?? null;
  debug.selectedDateTN = currentDayRecord.TN ?? null;
  debug.selectedDateRH = currentDayRecord.RH ?? null;
  debug.selectedDateSP = currentDayRecord.SP ?? null;
  debug.selectedDateSQ = currentDayRecord.SQ ?? null;
  debug.selectedDateFHX_ms = (typeof currentDayRecord.FHX === 'number' && currentDayRecord.FHX >= 0) ? currentDayRecord.FHX / 10 : null;
  if (typeof currentDayRecord.TX === 'number' && typeof currentDayRecord.TN === 'number') {
    debug.selectedDateAmplitude = (currentDayRecord.TX - currentDayRecord.TN) / 10;
  } else {
    debug.selectedDateAmplitude = null;
  }
  debug.log.push(`[WeatherStreaks INFO_SELECTED_DAY_DATA] Geselecteerde dag (${selectedDateStringForCompare}): TX=${formatTemp(debug.selectedDateTX)}, TN=${formatTemp(debug.selectedDateTN)}, RH=${debug.selectedDateRH}, SP=${debug.selectedDateSP}%, SQ=${debug.selectedDateSQ}, Amplitude=${debug.selectedDateAmplitude?.toFixed(1) ?? 'N/A'}°C, FHX_ms=${debug.selectedDateFHX_ms?.toFixed(1) ?? 'N/A'} m/s`);


  const details: SelectedDayWeatherDetails = {};
  const tgCelsius = typeof currentDayRecord.TG === 'number' ? currentDayRecord.TG / 10 : undefined;
  const txCelsius = typeof currentDayRecord.TX === 'number' ? currentDayRecord.TX / 10 : undefined;
  const fgMs = typeof currentDayRecord.FG === 'number' ? currentDayRecord.FG / 10 : undefined;
  const ugPercent = typeof currentDayRecord.UG === 'number' ? currentDayRecord.UG : undefined;

  details.gemiddeldeTemp = formatValue(currentDayRecord.TG, 10, '°C', undefined, 1);
  details.maxTemp = formatValue(currentDayRecord.TX, 10, '°C', undefined, 1);
  details.minTemp = formatValue(currentDayRecord.TN, 10, '°C', undefined, 1);

  if (txCelsius !== undefined && txCelsius < 15 && tgCelsius !== undefined && fgMs !== undefined) {
    const wc = calculateWindChill(tgCelsius, fgMs);
    if (wc !== null) details.gevoelstemperatuur = `${wc.toFixed(1)}°C`;
  }
  if (txCelsius !== undefined && txCelsius >= 27 && tgCelsius !== undefined && ugPercent !== undefined) {
    const hi = calculateHeatIndex(tgCelsius, ugPercent);
    if (hi !== null) details.hitteIndex = `${hi.toFixed(1)}°C`;
  }

  details.windRichting = degreesToCardinal(currentDayRecord.DDVEC);
  details.windSnelheidGemiddeld = msToBftKmH(fgMs);
  details.windSnelheidMaxUur = msToBftKmH(debug.selectedDateFHX_ms);
  details.maxWindstoot = msToBftKmH(typeof currentDayRecord.FXX === 'number' && currentDayRecord.FXX !== -1 ? currentDayRecord.FXX / 10 : undefined);
  details.zonneschijnDuur = formatValue(currentDayRecord.SQ, 10, ' uur', '<0.05 uur', 1);
  details.zonneschijnPercentage = formatValue(currentDayRecord.SP, 1, '%', undefined, 0);
  details.bewolkingOmschrijving = getCloudCoverageDescription(currentDayRecord.NG);
  details.neerslagHoeveelheid = formatValue(currentDayRecord.RH, 10, ' mm', '<0.05 mm', 1);
  details.neerslagDuur = formatValue(currentDayRecord.DR, 10, ' uur', '<0.05 uur', 1);
  details.luchtdruk = formatValue(currentDayRecord.PG, 10, ' hPa', undefined, 0);
  details.luchtvochtigheid = formatValue(currentDayRecord.UG, 1, '%', undefined, 0);

  resultShell.selectedDayWeatherDetails = details;


  const formattedSelectedDateForMessage = formatDateFns(selectedDate, 'EEEE d MMMM yyyy', { locale: nl });
  const dayNameSelectedDate = formatDateFns(selectedDate, 'EEEE', { locale: nl });

  if (typeof currentDayRecord.TX === 'number') {
    let daysSinceWarmer = 0;
    let foundWarmerDayRecord: KnmiDailyRecord | null = null;
    let hasSearchedAll = true;
    for (const record of streakRecords) {
      const recordDate = parseISO(record.date);
      if (recordDate.getTime() >= selectedDate.getTime()) continue;
      daysSinceWarmer++;
      if (typeof record.TX === 'number' && record.TX > currentDayRecord.TX) {
        foundWarmerDayRecord = record;
        hasSearchedAll = false;
        break;
      }
    }
    debug.daysSinceWarmer = daysSinceWarmer > 0 ? daysSinceWarmer : null;
    debug.foundWarmerDate = foundWarmerDayRecord?.date ?? null;
    debug.foundWarmerTX = foundWarmerDayRecord?.TX ?? null;

    if (foundWarmerDayRecord) {
      const warmerDateFormatted = formatDateFns(parseISO(foundWarmerDayRecord.date), 'd MMMM yyyy', { locale: nl });
      const dayNameWarmerDate = formatDateFns(parseISO(foundWarmerDayRecord.date), 'EEEE', { locale: nl});
      resultShell.maxTempStreak = `Het was op ${dayNameSelectedDate} ${formattedSelectedDateForMessage.replace(dayNameSelectedDate + ' ', '')} maximaal ${formatTemp(currentDayRecord.TX)}. De laatste keer warmer was ${daysSinceWarmer} dag${daysSinceWarmer > 1 ? 'en' : ''} eerder op ${dayNameWarmerDate} ${warmerDateFormatted.replace(dayNameWarmerDate + ' ', '')}, toen het ${formatTemp(foundWarmerDayRecord.TX)} werd.`;
    } else if (hasSearchedAll && debug.datasetStartDate) {
      const daysSinceStart = differenceInDays(selectedDate, parseISO(debug.datasetStartDate));
       resultShell.maxTempStreak = `Op ${dayNameSelectedDate} ${formattedSelectedDateForMessage.replace(dayNameSelectedDate + ' ', '')} was het maximaal ${formatTemp(currentDayRecord.TX)}. Sinds het begin van deze dataset op ${formatDateFns(parseISO(debug.datasetStartDate), 'd MMMM yyyy', { locale: nl })} (${daysSinceStart} dagen) was het niet warmer.`;
    } else {
        debug.log.push(`[WeatherStreaks MAX_TEMP_NO_PREVIOUS_DAYS_OR_NO_VALID_TX] Geen eerdere dagen met valide TX of onverwachte situatie.`);
        resultShell.maxTempStreak = `Maximumtemperatuur ${formatTemp(currentDayRecord.TX)} op ${formattedSelectedDateForMessage}. Geen vergelijkingsdata gevonden.`;
    }
  } else {
    debug.log.push(`[WeatherStreaks MAX_TEMP_SKIP] Geen TX data voor ${selectedDateStringForCompare}.`);
    resultShell.maxTempStreak = `Geen maximumtemperatuur data beschikbaar voor ${selectedDateStringForCompare}.`;
  }

  if (typeof currentDayRecord.TN === 'number') {
    let daysSinceColder = 0;
    let foundColderDayRecord: KnmiDailyRecord | null = null;
    let hasSearchedAll = true;
    for (const record of streakRecords) {
      const recordDate = parseISO(record.date);
      if (recordDate.getTime() >= selectedDate.getTime()) continue;
      daysSinceColder++;
      if (typeof record.TN === 'number' && record.TN < currentDayRecord.TN) {
        foundColderDayRecord = record;
        hasSearchedAll = false;
        break;
      }
    }
    debug.daysSinceColder = daysSinceColder > 0 ? daysSinceColder : null;
    debug.foundColderDate = foundColderDayRecord?.date ?? null;
    debug.foundColderTN = foundColderDayRecord?.TN ?? null;

    if (foundColderDayRecord) {
      const colderDateFormatted = formatDateFns(parseISO(foundColderDayRecord.date), 'd MMMM yyyy', { locale: nl });
      const dayNameColderDate = formatDateFns(parseISO(foundColderDayRecord.date), 'EEEE', { locale: nl});
      resultShell.minTempStreak = `Het was op ${dayNameSelectedDate} ${formattedSelectedDateForMessage.replace(dayNameSelectedDate + ' ', '')} minimaal ${formatTemp(currentDayRecord.TN)}. De laatste keer kouder was ${daysSinceColder} dag${daysSinceColder > 1 ? 'en' : ''} eerder op ${dayNameColderDate} ${colderDateFormatted.replace(dayNameColderDate + ' ', '')}, toen het ${formatTemp(foundColderDayRecord.TN)} werd.`;
    } else if (hasSearchedAll && debug.datasetStartDate) {
      const daysSinceStart = differenceInDays(selectedDate, parseISO(debug.datasetStartDate));
      resultShell.minTempStreak = `Op ${dayNameSelectedDate} ${formattedSelectedDateForMessage.replace(dayNameSelectedDate + ' ', '')} was het minimaal ${formatTemp(currentDayRecord.TN)}. Sinds het begin van deze dataset op ${formatDateFns(parseISO(debug.datasetStartDate), 'd MMMM yyyy', { locale: nl })} (${daysSinceStart} dagen) was het niet kouder.`;
    } else {
        debug.log.push(`[WeatherStreaks MIN_TEMP_NO_PREVIOUS_DAYS_OR_NO_VALID_TN] Geen eerdere dagen met valide TN of onverwachte situatie.`);
        resultShell.minTempStreak = `Minimumtemperatuur ${formatTemp(currentDayRecord.TN)} op ${formattedSelectedDateForMessage}. Geen vergelijkingsdata gevonden.`;
    }
  } else {
    debug.log.push(`[WeatherStreaks MIN_TEMP_SKIP] Geen TN data voor ${selectedDateStringForCompare}.`);
    resultShell.minTempStreak = `Geen minimumtemperatuur data beschikbaar voor ${selectedDateStringForCompare}.`;
  }

  const recordsInSelectedYearUpToSelectedDate = streakRecords.filter(r => {
      try {
          const recordDate = parseISO(r.date);
          return getYearFns(recordDate) === targetYear && recordDate.getTime() <= selectedDate.getTime();
      } catch (e) {
          debug.log.push(`[WeatherStreaks_COUNT_FILTER_ERROR] Kon datum niet parsen voor record: ${r.date}.`);
          return false;
      }
  });

  const txSelectedDayCelsiusCheck = currentDayRecord.TX !== null && typeof currentDayRecord.TX !== 'undefined' ? currentDayRecord.TX / 10 : null;
  if (txSelectedDayCelsiusCheck !== null && txSelectedDayCelsiusCheck >= 25.0) {
      const summerDaysCount = recordsInSelectedYearUpToSelectedDate.filter(r => r.TX !== null && typeof r.TX !== 'undefined' && (r.TX / 10) >= 25.0).length;
      debug.summerDaysCountInYear = summerDaysCount;
      if (summerDaysCount > 0) {
          resultShell.summerDaysMessage = `De temperatuur op ${dayNameSelectedDate} ${formattedSelectedDateForMessage.replace(dayNameSelectedDate + ' ', '')} had een zomerse waarde van ${formatTemp(currentDayRecord.TX)}. Dit is nu de ${summerDaysCount}e zomerse dag van dit kalenderjaar.`;
      }
  }

  const tnSelectedDayCelsiusCheck = currentDayRecord.TN !== null && typeof currentDayRecord.TN !== 'undefined' ? currentDayRecord.TN / 10 : null;
  if (tnSelectedDayCelsiusCheck !== null && tnSelectedDayCelsiusCheck < 0.0) {
      const frostDaysCount = recordsInSelectedYearUpToSelectedDate.filter(r => r.TN !== null && typeof r.TN !== 'undefined' && (r.TN / 10) < 0.0).length;
      debug.frostDaysCountInYear = frostDaysCount;
      if (frostDaysCount > 0) {
         resultShell.frostDaysMessage = `De temperatuur op ${dayNameSelectedDate} ${formattedSelectedDateForMessage.replace(dayNameSelectedDate + ' ', '')} lag onder nul (${formatTemp(currentDayRecord.TN)}). Dit is nu de ${frostDaysCount}e vorstdag van dit kalenderjaar.`;
      }
  }

  if (typeof currentDayRecord.TX === 'number' && typeof currentDayRecord.TN === 'number') {
    const currentAmplitude = (currentDayRecord.TX - currentDayRecord.TN) / 10;
    debug.selectedDateAmplitude = currentAmplitude;
    let daysSinceGreaterAmplitude = 0;
    let foundGreaterAmplitudeRecord: KnmiDailyRecord | null = null;
    let hasSearchedAll = true;
    for (const record of streakRecords) {
      const recordDate = parseISO(record.date);
      if (recordDate.getTime() >= selectedDate.getTime()) continue;
      daysSinceGreaterAmplitude++;
      if (typeof record.TX === 'number' && typeof record.TN === 'number') {
        const recordAmplitude = (record.TX - record.TN) / 10;
        if (recordAmplitude > currentAmplitude) {
          foundGreaterAmplitudeRecord = record;
          hasSearchedAll = false;
          break;
        }
      }
    }
    debug.daysSinceGreaterAmplitude = daysSinceGreaterAmplitude > 0 ? daysSinceGreaterAmplitude : null;
    debug.foundGreaterAmplitudeDate = foundGreaterAmplitudeRecord?.date ?? null;
    if (foundGreaterAmplitudeRecord && typeof foundGreaterAmplitudeRecord.TX === 'number' && typeof foundGreaterAmplitudeRecord.TN === 'number') {
        debug.foundGreaterAmplitudeValue = (foundGreaterAmplitudeRecord.TX - foundGreaterAmplitudeRecord.TN) / 10;
        debug.foundGreaterAmplitudeTX = foundGreaterAmplitudeRecord.TX;
        debug.foundGreaterAmplitudeTN = foundGreaterAmplitudeRecord.TN;
    }

    if (foundGreaterAmplitudeRecord && debug.daysSinceGreaterAmplitude && debug.foundGreaterAmplitudeValue !== null && debug.foundGreaterAmplitudeValue !== undefined) {
      const greaterAmpDateFormatted = formatDateFns(parseISO(foundGreaterAmplitudeRecord.date), 'd MMMM yyyy', { locale: nl });
      const dayNameGreaterAmpDate = formatDateFns(parseISO(foundGreaterAmplitudeRecord.date), 'EEEE', { locale: nl});
      resultShell.amplitudeStreakMessage = `De temperatuuramplitude (verschil Max/Min) voor ${dayNameSelectedDate} ${formattedSelectedDateForMessage.replace(dayNameSelectedDate + ' ', '')} was ${currentAmplitude.toFixed(1)}°C. De laatste keer dat de amplitude groter was, was ${debug.daysSinceGreaterAmplitude} dag${debug.daysSinceGreaterAmplitude > 1 ? 'en' : ''} eerder op ${dayNameGreaterAmpDate} ${greaterAmpDateFormatted.replace(dayNameGreaterAmpDate + ' ', '')} met ${debug.foundGreaterAmplitudeValue.toFixed(1)}°C (Max: ${formatTemp(foundGreaterAmplitudeRecord.TX)}, Min: ${formatTemp(foundGreaterAmplitudeRecord.TN)}).`;
    } else if (hasSearchedAll && debug.datasetStartDate) {
        const daysSinceStart = differenceInDays(selectedDate, parseISO(debug.datasetStartDate));
        resultShell.amplitudeStreakMessage = `De temperatuuramplitude voor ${dayNameSelectedDate} ${formattedSelectedDateForMessage.replace(dayNameSelectedDate + ' ', '')} was ${currentAmplitude.toFixed(1)}°C. Sinds het begin van deze dataset op ${formatDateFns(parseISO(debug.datasetStartDate), 'd MMMM yyyy', { locale: nl })} (${daysSinceStart} dagen) was de amplitude niet groter.`;
    } else {
        resultShell.amplitudeStreakMessage = `Temperatuuramplitude ${currentAmplitude.toFixed(1)}°C op ${formattedSelectedDateForMessage}. Geen vergelijkingsdata gevonden.`;
    }
  } else {
    debug.log.push(`[WeatherStreaks AMPLITUDE_SKIP] Geen TX of TN data voor ${selectedDateStringForCompare}.`);
    resultShell.amplitudeStreakMessage = `Geen data voor temperatuuramplitude beschikbaar voor ${selectedDateStringForCompare}.`;
  }

  if (typeof currentDayRecord.FHX === 'number' && currentDayRecord.FHX >=0) {
    const currentFHX_ms = currentDayRecord.FHX / 10;
    debug.selectedDateFHX_ms = currentFHX_ms;
    let daysSinceHigherFHX = 0;
    let foundHigherFHXRecord: KnmiDailyRecord | null = null;
    let hasSearchedAll = true;

    for (const record of streakRecords) {
      const recordDate = parseISO(record.date);
      if (recordDate.getTime() >= selectedDate.getTime()) continue;
      daysSinceHigherFHX++;
      if (typeof record.FHX === 'number' && record.FHX >=0) {
        const recordFHX_ms = record.FHX / 10;
        if (recordFHX_ms > currentFHX_ms) {
          foundHigherFHXRecord = record;
          hasSearchedAll = false;
          break;
        }
      }
    }
    debug.daysSinceHigherFHX = daysSinceHigherFHX > 0 ? daysSinceHigherFHX : null;
    debug.foundHigherFHXDate = foundHigherFHXRecord?.date ?? null;
    debug.foundHigherFHX_ms = (typeof foundHigherFHXRecord?.FHX === 'number' && foundHigherFHXRecord.FHX >=0) ? foundHigherFHXRecord.FHX / 10 : null;

    const currentWindFormatted = formatWindspeed(currentDayRecord.FHX);
    if (foundHigherFHXRecord && debug.daysSinceHigherFHX && debug.foundHigherFHX_ms !== null) {
      const higherFHXDateFormatted = formatDateFns(parseISO(foundHigherFHXRecord.date), 'd MMMM yyyy', { locale: nl });
      const dayNameHigherFHXDate = formatDateFns(parseISO(foundHigherFHXRecord.date), 'EEEE', { locale: nl});
      const higherWindFormatted = formatWindspeed(foundHigherFHXRecord.FHX);
      resultShell.maxWindSpeedStreakMessage = `De maximale uurgemiddelde windsnelheid voor ${dayNameSelectedDate} ${formattedSelectedDateForMessage.replace(dayNameSelectedDate + ' ', '')} was ${currentWindFormatted}. De laatste keer dat deze hoger was, was ${debug.daysSinceHigherFHX} dag${debug.daysSinceHigherFHX > 1 ? 'en' : ''} eerder op ${dayNameHigherFHXDate} ${higherFHXDateFormatted.replace(dayNameHigherFHXDate + ' ', '')} met ${higherWindFormatted}.`;
    } else if (hasSearchedAll && debug.datasetStartDate) {
        const daysSinceStart = differenceInDays(selectedDate, parseISO(debug.datasetStartDate));
        resultShell.maxWindSpeedStreakMessage = `De maximale uurgemiddelde windsnelheid voor ${dayNameSelectedDate} ${formattedSelectedDateForMessage.replace(dayNameSelectedDate + ' ', '')} was ${currentWindFormatted}. Sinds het begin van deze dataset op ${formatDateFns(parseISO(debug.datasetStartDate), 'd MMMM yyyy', { locale: nl })} (${daysSinceStart} dagen) was deze niet hoger.`;
    } else {
        resultShell.maxWindSpeedStreakMessage = `Maximale uurgemiddelde windsnelheid ${currentWindFormatted} op ${formattedSelectedDateForMessage}. Geen vergelijkingsdata gevonden.`;
    }
  } else {
    debug.log.push(`[WeatherStreaks FHX_SKIP] Geen valide FHX data voor ${selectedDateStringForCompare} (FHX: ${currentDayRecord.FHX}).`);
     resultShell.maxWindSpeedStreakMessage = `Geen data voor maximale uurgemiddelde windsnelheid beschikbaar voor ${selectedDateStringForCompare}.`;
  }

  const formattedSelectedDateShort = formatDateFns(selectedDate, 'd MMMM yyyy', { locale: nl });
  const isSelectedDayDryCheck = isDayDry(currentDayRecord);
  debug.log.push(`[WeatherStreaks DRY_DAY_CHECK_SELECTED] Geselecteerde dag is ${isSelectedDayDryCheck ? 'droog' : 'niet droog'} (RH: ${currentDayRecord.RH}).`);

  if (isSelectedDayDryCheck) {
    let consecutiveDryDays = 0;
    let lastNonDryDayRecord: KnmiDailyRecord | null = null;
    const selectedDateIndex = streakRecords.findIndex(r => r.date.startsWith(selectedDateStringForCompare));

    if (selectedDateIndex !== -1) {
        if (isDayDry(streakRecords[selectedDateIndex])) {
            consecutiveDryDays = 1;
            for (let i = selectedDateIndex + 1; i < streakRecords.length; i++) {
                const prevRecord = streakRecords[i];
                if (isDayDry(prevRecord)) {
                    consecutiveDryDays++;
                } else {
                    lastNonDryDayRecord = prevRecord;
                    break;
                }
            }
        } else {
            consecutiveDryDays = 0;
        }
    }


    debug.consecutiveDryDays = consecutiveDryDays;
    debug.lastNonDryDayDate = lastNonDryDayRecord?.date ?? null;

    if (lastNonDryDayRecord) {
        const lastNonDryDayFormatted = formatDateFns(parseISO(lastNonDryDayRecord.date), 'd MMMM yyyy', { locale: nl });
        const daysSinceLastRain = differenceInDays(selectedDate, parseISO(lastNonDryDayRecord.date));
        resultShell.dryDayStreakMessage = `${formattedSelectedDateShort} was een droge dag. De laatste keer dat er meetbare neerslag viel was op ${lastNonDryDayFormatted}, ${daysSinceLastRain} dag${daysSinceLastRain > 1 ? 'en' : ''} eerder. Dit is de ${consecutiveDryDays}e opeenvolgende droge dag.`;
    } else if (consecutiveDryDays > 0 && debug.datasetStartDate) {
        const daysSinceDatasetStart = differenceInDays(selectedDate, parseISO(debug.datasetStartDate)) + 1;
        if (daysSinceDatasetStart === consecutiveDryDays) {
             resultShell.dryDayStreakMessage = `${formattedSelectedDateShort} was een droge dag. Sinds het begin van deze dataset op ${formatDateFns(parseISO(debug.datasetStartDate), 'd MMMM yyyy', { locale: nl })} (${daysSinceDatasetStart} dagen geleden) is er geen meetbare neerslag geregistreerd. Dit is de ${consecutiveDryDays}e opeenvolgende droge dag.`;
        } else {
            resultShell.dryDayStreakMessage = `${formattedSelectedDateShort} was een droge dag. Dit is de ${consecutiveDryDays}e opeenvolgende droge dag. De laatste niet-droge dag kon niet worden vastgesteld binnen de beschikbare data voorafgaand aan de start van de huidige droge periode.`;
        }
    } else if (consecutiveDryDays === 1 && debug.datasetStartDate === currentDayRecord.date) {
        resultShell.dryDayStreakMessage = `${formattedSelectedDateShort} was een droge dag. Dit is de eerste dag in de dataset.`;
    } else if (consecutiveDryDays > 0) {
       resultShell.dryDayStreakMessage = `${formattedSelectedDateShort} was een droge dag. Dit is de ${consecutiveDryDays}e opeenvolgende droge dag. Verdere historische data niet beschikbaar om de start van deze droge periode te bepalen.`;
    }


    const dryDaysInYearCount = recordsInSelectedYearUpToSelectedDate.filter(r => isDayDry(r)).length;
    debug.dryDaysCountInYear = dryDaysInYearCount;
    if (dryDaysInYearCount > 0) {
        const startOfYearDate = startOfYear(selectedDate);
        const totalDaysInYearSoFar = differenceInDays(selectedDate, startOfYearDate) + 1;
        debug.totalDaysInYearSoFar = totalDaysInYearSoFar;
        let percentageDryDaysString = "N/A";
        if (totalDaysInYearSoFar > 0) {
            const percentageDryDays = (dryDaysInYearCount / totalDaysInYearSoFar) * 100;
            percentageDryDaysString = percentageDryDays.toFixed(1);
            debug.percentageDryDaysInYear = percentageDryDaysString;
        }
        resultShell.dryDaysInYearMessage = `Het was op ${formattedSelectedDateShort} de ${dryDaysInYearCount}e droge dag van dit kalenderjaar (${percentageDryDaysString}% van de dagen tot nu toe).`;
    } else {
        resultShell.dryDaysInYearMessage = null;
    }

  } else {
    debug.log.push(`[WeatherStreaks DRY_DAY_SKIP] Geselecteerde dag niet droog, geen droge-dag reeksen berekend.`);
    resultShell.dryDayStreakMessage = null;
    resultShell.dryDaysInYearMessage = null;
    debug.consecutiveDryDays = 0;
    debug.lastNonDryDayDate = selectedDateStringForCompare;
  }


  const isSelectedDaySunnyCheck = isDaySunny(currentDayRecord);
  debug.log.push(`[WeatherStreaks SUNNY_DAY_CHECK_SELECTED] Geselecteerde dag is ${isSelectedDaySunnyCheck ? 'zonnig' : 'niet zonnig'} (SP: ${currentDayRecord.SP}%).`);
  if (isSelectedDaySunnyCheck && typeof currentDayRecord.SP === 'number') {
      const sunshineHoursVal = formatSunshineDuration(currentDayRecord.SQ);
      const sunnyDaysInYearCount = recordsInSelectedYearUpToSelectedDate.filter(r => isDaySunny(r)).length;
      debug.sunnyDaysCountInYear = sunnyDaysInYearCount;

      if (sunnyDaysInYearCount > 0) {
          resultShell.sunnyDayMessage = `${formattedSelectedDateShort} was een zonnige dag met ${sunshineHoursVal} zonneschijn (${currentDayRecord.SP}%). Dat is de ${sunnyDaysInYearCount}e zonnige dag van dit kalenderjaar.`;
      }
  } else if (currentDayRecord.SP === null || typeof currentDayRecord.SP === 'undefined') {
      debug.log.push(`[WeatherStreaks SUNNY_DAY_SKIP] Geen SP data voor geselecteerde dag.`);
      resultShell.sunnyDayMessage = null;
  } else {
      debug.log.push(`[WeatherStreaks SUNNY_DAY_SKIP] Geselecteerde dag niet zonnig, geen zonnige-dag bericht berekend.`);
       resultShell.sunnyDayMessage = null;
  }


  if (currentOptions.includeChartData) {
      const chartDataForReturn: ChartDataItem[] = [];
      try {
        const daysBefore = currentOptions.isMobileChart ? 2 : 7;
        const daysAfter = currentOptions.isMobileChart ? 2 : 7;
        const totalDaysInChart = daysBefore + 1 + daysAfter;
        debug.totalDaysInChart = totalDaysInChart;

        const startDateChart = subDays(selectedDate, daysBefore);
        const endDateChart = addDays(selectedDate, daysAfter);
        debug.chartDataWindowStart = startDateChart.toISOString();
        debug.chartDataWindowEnd = endDateChart.toISOString();

        const recordsForChartPeriod = allRecords
            .filter(r => {
                if (r.station_code !== 260 || !r.date) return false;
                try {
                    const recordDate = parseISO(r.date);
                    return recordDate.getTime() >= startDateChart.getTime() && recordDate.getTime() <= endDateChart.getTime();
                } catch (e) {
                    debug.log.push(`[WeatherStreaks CHART_PARSE_ERROR] Kon datum niet parsen voor grafiekrecord: ${r.date}`);
                    return false;
                }
            })
            .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

        debug.log.push(`[WeatherStreaks CHART_DATA_FILTER] Found ${recordsForChartPeriod.length} records (station 260) for chart period ${formatDateFns(startDateChart, 'yyyy-MM-dd')} to ${formatDateFns(endDateChart, 'yyyy-MM-dd')} (${totalDaysInChart} days).`);

        for (let i = 0; i < totalDaysInChart; i++) {
            const dayInInterval = addDays(startDateChart, i);
            const dayInIntervalString = formatDateFns(dayInInterval, 'yyyy-MM-dd');
            const recordForDay = recordsForChartPeriod.find(r => r.date.startsWith(dayInIntervalString));

            chartDataForReturn.push({
                date: formatDateFns(dayInInterval, 'dd-MM'),
                fullDate: dayInInterval.toISOString(),
                maxTemp: recordForDay && typeof recordForDay.TX === 'number' ? recordForDay.TX / 10 : null,
                minTemp: recordForDay && typeof recordForDay.TN === 'number' ? recordForDay.TN / 10 : null,
                precipitation: recordForDay && typeof recordForDay.RH === 'number' ? (recordForDay.RH === -1 ? 0 : recordForDay.RH / 10) : null,
                sunshineHours: recordForDay && typeof recordForDay.SQ === 'number' ? (recordForDay.SQ === -1 ? 0 : recordForDay.SQ / 10) : null,
            });
        }

        debug.chartDataPointsCount = chartDataForReturn.length;
        if (chartDataForReturn.length > 0) {
            resultShell.weatherChartData = chartDataForReturn;
            debug.chartDataSample = chartDataForReturn.slice(0, 3);
        } else {
            resultShell.weatherChartData = null;
            debug.log.push(`[WeatherStreaks CHART_DATA_WARN] No chart data points generated for the ${totalDaysInChart}-day period.`);
        }
      } catch (chartError: any) {
        debug.log.push(`[WeatherStreaks CHART_DATA_ERROR] Error preparing chart data: ${chartError.message}`);
        resultShell.weatherChartData = null;
      }
  } else {
      debug.log.push('[WeatherStreaks CHART_DATA_SKIP] includeChartData is false, skipping chart data preparation.');
      resultShell.weatherChartData = null;
  }

  if (currentOptions.includeYearlyChartData) {
    debug.log.push(`[WeatherStreaks YEARLY_CHART_START] Preparing yearly temperature data.`);
    const yearlyChartDataForReturn: YearlyTempDataItem[] = [];
    try {
      const selectedDayOfMonth = selectedDate.getUTCDate();
      const selectedMonthIndex = selectedDate.getUTCMonth();
      const currentSelectedYear = selectedDate.getUTCFullYear();

      const startYearRange = Math.max(MIN_KNMI_DATA_YEAR, currentSelectedYear - 7);
      const endYearRange = Math.min(new Date().getUTCFullYear(), currentSelectedYear + 7);

      debug.yearlyChartDataRange = { start: startYearRange, end: endYearRange };
      debug.log.push(`[WeatherStreaks YEARLY_CHART_RANGE] Yearly chart range for day ${selectedDayOfMonth}/${selectedMonthIndex+1}: ${startYearRange} - ${endYearRange}`);

      for (let yearToFind = startYearRange; yearToFind <= endYearRange; yearToFind++) {
        const recordForYearAndDay = station260Records.find(r => {
            try {
                const recordDate = parseISO(r.date);
                return recordDate.getUTCFullYear() === yearToFind &&
                       recordDate.getUTCMonth() === selectedMonthIndex &&
                       recordDate.getUTCDate() === selectedDayOfMonth;
            } catch (e) {
                debug.log.push(`[WeatherStreaks YEARLY_CHART_PARSE_ERROR] Kon datum niet parsen voor record in yearly loop: ${r.date}`);
                return false;
            }
        });

        yearlyChartDataForReturn.push({
          year: yearToFind,
          displayYear: `'${yearToFind.toString().substring(2)}`,
          maxTemp: recordForYearAndDay && typeof recordForYearAndDay.TX === 'number' ? recordForYearAndDay.TX / 10 : null,
          minTemp: recordForYearAndDay && typeof recordForYearAndDay.TN === 'number' ? recordForYearAndDay.TN / 10 : null,
        });
      }

      yearlyChartDataForReturn.sort((a,b) => a.year - b.year);

      let sumMaxTemp = 0;
      let countMaxTemp = 0;
      let sumMinTemp = 0;
      let countMinTemp = 0;

      yearlyChartDataForReturn.forEach(item => {
        if (item.maxTemp !== null) {
          sumMaxTemp += item.maxTemp;
          countMaxTemp++;
        }
        if (item.minTemp !== null) {
          sumMinTemp += item.minTemp;
          countMinTemp++;
        }
      });

      resultShell.averageYearlyMaxTemp = countMaxTemp > 0 ? parseFloat((sumMaxTemp / countMaxTemp).toFixed(1)) : null;
      resultShell.averageYearlyMinTemp = countMinTemp > 0 ? parseFloat((sumMinTemp / countMinTemp).toFixed(1)) : null;
      debug.averageYearlyMaxTemp = resultShell.averageYearlyMaxTemp;
      debug.averageYearlyMinTemp = resultShell.averageYearlyMinTemp;


      debug.yearlyChartDataPointsCount = yearlyChartDataForReturn.length;
      if (yearlyChartDataForReturn.length > 0) {
        resultShell.yearlyTemperatureData = yearlyChartDataForReturn;
        debug.yearlyChartDataSample = yearlyChartDataForReturn.slice(0, 3);
        debug.log.push(`[WeatherStreaks YEARLY_CHART_SUCCESS] Generated ${yearlyChartDataForReturn.length} data points for yearly chart. AvgMax: ${resultShell.averageYearlyMaxTemp}, AvgMin: ${resultShell.averageYearlyMinTemp}`);
      } else {
        resultShell.yearlyTemperatureData = null;
        debug.log.push(`[WeatherStreaks YEARLY_CHART_WARN] No data points generated for yearly chart (day ${selectedDayOfMonth}/${selectedMonthIndex+1}).`);
      }

    } catch (yearlyChartError: any) {
      debug.log.push(`[WeatherStreaks YEARLY_CHART_ERROR] Error preparing yearly chart data: ${yearlyChartError.message}`);
      resultShell.yearlyTemperatureData = null;
    }
  } else {
    debug.log.push('[WeatherStreaks YEARLY_CHART_SKIP] includeYearlyChartData is false, skipping yearly chart data preparation.');
    resultShell.yearlyTemperatureData = null;
  }

  const hasCriticalData =
    !!resultShell.selectedDayWeatherDetails ||
    (!!resultShell.historicalWeatherStats && !resultShell.historicalWeatherStats.error);

  if (!hasCriticalData && !resultShell.error) {
    resultShell.error = `Geen kritieke weerdata gevonden voor ${formattedSelectedDateForMessage}. Controleer de beschikbaarheid van KNMI dagdata.`;
    debug.log.push(`[WeatherStreaks FINAL_NO_CRITICAL_DATA] No critical weather data could be generated for ${selectedDateStringForCompare}. Main error set.`);
  } else if (resultShell.error && (resultShell.error.startsWith("Geen KNMI data gevonden voor") || resultShell.error.startsWith("Geen kritieke weerdata gevonden"))) {
    if (hasCriticalData) {
        resultShell.error = null;
        debug.log.push(`[WeatherStreaks INFO_GENERIC_ERROR_CLEARED] Generic 'no critical data' error cleared because other critical data was found.`);
    }
  }

  const knmiMonthlyOverviewErrorOrNoData = resultShell.knmiMonthlyOverview?.error || (!resultShell.knmiMonthlyOverview?.paragraphs || resultShell.knmiMonthlyOverview.paragraphs.length === 0);

  debug.log.push(`[WeatherStreaks ACTION_END] Resultaat hoofd error: ${resultShell.error || 'null'}. MaxT: ${!!resultShell.maxTempStreak}, MinT: ${!!resultShell.minTempStreak}, Zomer: ${!!resultShell.summerDaysMessage}, Vorst: ${!!resultShell.frostDaysMessage}, Ampl: ${!!resultShell.amplitudeStreakMessage}, Wind: ${!!resultShell.maxWindSpeedStreakMessage}, DroogReeks: ${!!resultShell.dryDayStreakMessage}, DroogJaar: ${!!resultShell.dryDaysInYearMessage}, Zonnig: ${!!resultShell.sunnyDayMessage}, Chart15d: ${resultShell.weatherChartData?.length ?? 0}p, ChartYearly: ${resultShell.yearlyTemperatureData?.length ?? 0}p, Details: ${!!resultShell.selectedDayWeatherDetails}, HistStats: ${!!resultShell.historicalWeatherStats && !resultShell.historicalWeatherStats.error}, Maandoverzicht (heeft data/error): ${!!resultShell.knmiMonthlyOverview}, Maandoverzicht Error/GeenData: ${knmiMonthlyOverviewErrorOrNoData}`);
  return resultShell;


} catch (error: any) {
    const errorMsg = `Fout bij het laden of verwerken van KNMI data: ${error.message || 'Onbekende fout'}`;
    debug.log.push(`[WeatherStreaks ERROR_KNMI_DATA_EXCEPTION] ${errorMsg}`);
    resultShell.error = errorMsg;
    return resultShell;
  }
}
