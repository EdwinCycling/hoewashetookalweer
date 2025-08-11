
'use server';

import type { KnmiDailyRecord } from '@/data/knmi-daily-weather-data';
import { isValid, parseISO, format as formatDateFns } from 'date-fns';
import { nl } from 'date-fns/locale';
import knmiJsonData from '@/data/knmi_daily_weather_full.json'; // GEWIJZIGD: Importeer JSON direct

export interface FormattedKnmiDailyData {
  locatieEnDatum?: string;
  temperatuur?: {
    gemiddelde?: string;        // Van TG
    maximum?: string;           // Van TX
    minimum?: string;           // Van TN
    'Min.temp. klomphoogte'?: string; // Van T10N (was minimum10cm)
    gevoelstemperatuur?: string; // Berekend if TX < 15 (using TG for calc)
    hitteIndex?: string;        // Berekend if TX >= 27
  };
  zonBewolkingEnZicht?: {
    'Duur zonneschijn'?: string; // Van SQ
    'Rel. zonneschijnduur'?: string; // Van SP
    'Bedekkingsgraad'?: string; // Van NG (numeriek + omschrijving)
    'BedekkingsgraadOmschrijving'?: string; // Extra veld voor de tekstuele omschrijving
    'Minimaal zicht'?: string; // Placeholder, niet direct in dataset
  };
  luchtvochtigheid?: {
    Gemiddelde?: string; // Van UG
  };
  neerslag?: {
    Hoeveelheid?: string; // Van RH
    Duur?: string; // Van DR
  };
  wind?: {
    'Overheersende windrichting'?: string; // Van DDVEC
    'Gemiddelde snelheid'?: string; // Beaufort en km/h (van FG)
    'Max. uurgem. snelheid'?: string; // Beaufort en km/h (van FHX) (was Maximale uurgemiddelde snelheid)
    'Maximale stoot'?: string; // Alleen km/h (van FXX)
  };
  luchtdruk?: {
    'Gemiddelde luchtdruk'?: string; // Van PG
  };
  error?: string | null;
  debugInfo?: {
    dataSize?: number;
    filterTargetDate?: string;
    foundRecordDate?: string;
    errorDetails?: string;
    parsedData?: any;
    parsedItemsCount?: number;
    dataMap?: { [key: string]: string };
    log?: string[];
  }
}

function degreesToCardinal(degrees: number | null | undefined): string | undefined {
  if (degrees === null || typeof degrees === 'undefined') return undefined;
  if (degrees === 0 && (typeof degrees !== 'undefined' && degrees !== null)) return 'Windstil / Variabel';
  if (degrees > 360 || degrees < 0) return undefined;
  const val = Math.floor((degrees / 22.5) + 0.5);
  const arr = ["N", "NNO", "NO", "ONO", "O", "OZO", "ZO", "ZZO", "Z", "ZZW", "ZW", "WZW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

function msToBeaufort(ms: number | null | undefined): string | undefined {
  if (ms === null || typeof ms === 'undefined' || ms < 0) return undefined;
  if (ms < 0.3) return '0 Bft (Stil)';
  if (ms < 1.6) return '1 Bft (Zwakke wind)';
  if (ms < 3.4) return '2 Bft (Zwakke wind)';
  if (ms < 5.5) return '3 Bft (Matige wind)';
  if (ms < 8.0) return '4 Bft (Matige wind)';
  if (ms < 10.8) return '5 Bft (Vrij krachtige wind)';
  if (ms < 13.9) return '6 Bft (Krachtige wind)';
  if (ms < 17.2) return '7 Bft (Harde wind)';
  if (ms < 20.8) return '8 Bft (Stormachtige wind)';
  if (ms < 24.5) return '9 Bft (Storm)';
  if (ms < 28.5) return '10 Bft (Zware storm)';
  if (ms < 32.7) return '11 Bft (Zeer zware storm)';
  return '12 Bft (Orkaan)';
}

function formatValue(value: number | null | undefined, divisor: number = 1, unit: string = '', specialNegOne?: string, precision: number = 1): string | undefined {
  if (value === null || typeof value === 'undefined') return undefined;

  if (value === -1) {
    if (specialNegOne) {
      return specialNegOne;
    }
    if (unit === ' mm' && divisor === 10) return '<0.05 mm';
    if (unit === ' uur' && divisor === 10) return '<0.05 uur';
    return `0${unit.trim()}`;
  }

  const num = value / divisor;
  const minFractionDigits = (num % 1 === 0 && precision === 0) ? 0 : precision;
  const maxFractionDigits = precision;

  return `${num.toLocaleString('nl-NL', { minimumFractionDigits: minFractionDigits, maximumFractionDigits: maxFractionDigits })}${unit}`;
}


function getCloudCoverageDescription(ng?: number | null): string | undefined {
    if (ng === null || typeof ng === 'undefined') return undefined;
    switch (ng) {
        case 0: return "0/8 (Onbewolkt / Helder)";
        case 1: return "1/8 (Vrijwel onbewolkt / Nauwelijks bewolkt)";
        case 2: return "2/8 (Licht bewolkt)";
        case 3: return "3/8 (Gedeeltelijk bewolkt)";
        case 4: return "4/8 (Half bewolkt)";
        case 5: return "5/8 (Overwegend bewolkt)";
        case 6: return "6/8 (Zwaar bewolkt)";
        case 7: return "7/8 (Vrijwel geheel bewolkt)";
        case 8: return "8/8 (Geheel bewolkt / Betrokken)";
        case 9: return "Bovenlucht onzichtbaar (9/8)";
        default: return `${ng}/8 (Omschrijving onbekend)`;
    }
}

function calculateHeatIndex(temperatureC: number, relativeHumidityPercent: number ): number | null {
  if (typeof temperatureC !== 'number' || typeof relativeHumidityPercent !== 'number') {
    return null;
  }
  const T = temperatureC;
  const R = relativeHumidityPercent;

  // NWS main formula (HI_raw)
  let HI_raw = -8.78469475556 + 1.61139411 * T + 2.33854883889 * R - 0.14611605 * T * R - 0.012308094 * Math.pow(R, 2) -
                 0.01642482778 * Math.pow(T, 2) + 0.002211732 * Math.pow(T, 2) * R + 0.00072546 * Math.pow(R, 2) * T -
                 0.000003582 * Math.pow(T, 2) * Math.pow(R, 2);

  let HI_final_adjusted = HI_raw;

  // NWS Adjustments (Steadman & Rothfusz)
  if (R < 13 && T >= 26.7 && T <= 44.4) {
    const adjustment = ((13 - R) / 4) * Math.sqrt((17 - Math.abs(T - 35.0)) / 17);
    HI_final_adjusted -= adjustment;
  } else if (R > 85 && T >= 26.7 && T <= 30.5) {
    const adjustment = ((R - 85) / 10) * ((30.5 - T) / 2.8);
    HI_final_adjusted += adjustment;
  }

  // Final check: HI should not be less than T (the air temperature used for calculation)
  return Math.max(T, HI_final_adjusted);
}


export async function fetchFormattedKnmiDailyData(
  year: number,
  month: number, // 0-indexed month
  day: number
): Promise<FormattedKnmiDailyData> {
  const debugInfo: NonNullable<FormattedKnmiDailyData['debugInfo']> = { log: [] };
  const resultShell: FormattedKnmiDailyData = {
    temperatuur: {},
    zonBewolkingEnZicht: {},
    luchtvochtigheid: {},
    neerslag: {},
    wind: {},
    luchtdruk: {},
    debugInfo
  };

  const targetYear = year;
  const targetMonth = month;
  const targetDay = day;

  const filterTargetDateObject = new Date(Date.UTC(targetYear, targetMonth, targetDay));
   if (!isValid(filterTargetDateObject)) {
    resultShell.error = `Ongeldige datum componenten (${targetYear}-${targetMonth+1}-${targetDay}) meegegeven aan actie.`;
    debugInfo.log?.push(`[KNMI_ACTION_ERROR] ${resultShell.error}`);
    return resultShell;
  }
  debugInfo.filterTargetDate = formatDateFns(filterTargetDateObject, "yyyy-MM-dd");
  debugInfo.log?.push(`[KNMI_ACTION_INFO] Fetching for date: ${debugInfo.filterTargetDate}`);


  let allRecords: KnmiDailyRecord[] = [];

  try {
    allRecords = knmiJsonData as KnmiDailyRecord[];
    debugInfo.log?.push(`[KNMI_ACTION_INFO] KNMI data JSON direct geladen. Aantal records: ${allRecords.length}`);
    debugInfo.dataSize = allRecords.length;

  } catch (error: any) {
    const errorMsg = `Fout bij het verwerken van de direct geladen KNMI data JSON: ${error.message || 'Onbekende fout'}`;
    resultShell.error = errorMsg;
    debugInfo.log?.push(`[KNMI_ACTION_ERROR] JSON verwerkingsfout: ${errorMsg}`);
    return resultShell;
  }

  const record = allRecords.find((r: KnmiDailyRecord) => {
    if (r.station_code === 260 && r.date) {
      try {
        const recordDate = parseISO(r.date); // KNMI dates are already UTC
        return recordDate.getUTCFullYear() === targetYear &&
               recordDate.getUTCMonth() === targetMonth &&
               recordDate.getUTCDate() === targetDay;
      } catch (e) {
        debugInfo.log?.push(`[KNMI_ACTION_WARN] Invalid date format for record: ${r.date}. Skipping.`);
        return false;
      }
    }
    return false;
  });

  debugInfo.foundRecordDate = record ? record.date : "Niet gevonden";
  debugInfo.log?.push(`[KNMI_ACTION_INFO] Record found for target date: ${debugInfo.foundRecordDate}`);

  if (!record) {
    const targetDateString = formatDateFns(filterTargetDateObject, "d MMMM yyyy", { locale: nl });
    resultShell.error = `Geen KNMI dataset gevonden voor ${targetDateString}. Data beschikbaar vanaf ${formatDateFns(new Date(Date.UTC(1945,0,1)), "d MMMM yyyy", { locale: nl })}.`;
    debugInfo.log?.push(`[KNMI_ACTION_WARN] ${resultShell.error}`);
    return resultShell;
  }

  const txCelsius = typeof record.TX === 'number' ? record.TX / 10 : undefined;
  const tgCelsius = typeof record.TG === 'number' ? record.TG / 10 : undefined;
  const ugPercent = typeof record.UG === 'number' ? record.UG : undefined;

  const temperatuurDetails: NonNullable<FormattedKnmiDailyData['temperatuur']> = {
    gemiddelde: formatValue(record.TG, 10, ' °C'),
    minimum: formatValue(record.TN, 10, ' °C'),
    maximum: formatValue(record.TX, 10, ' °C'),
    'Min.temp. klomphoogte': formatValue(record.T10N, 10, ' °C'),
  };

  // Gevoelstemperatuur
  if (txCelsius !== undefined && txCelsius < 15) {
    if (tgCelsius !== undefined && typeof record.FG === 'number' && record.FG >= 0) {
      const T_air_C_for_windchill = tgCelsius;
      const V_ms_for_windchill = record.FG / 10;
      const V_kmh_for_windchill = V_ms_for_windchill * 3.6;
      if (V_kmh_for_windchill >= 5) {
        const T_wc = 13.12 + (0.6215 * T_air_C_for_windchill) - (11.37 * Math.pow(V_kmh_for_windchill, 0.16)) + (0.3965 * T_air_C_for_windchill * Math.pow(V_kmh_for_windchill, 0.16));
        temperatuurDetails.gevoelstemperatuur = `${T_wc.toFixed(1)} °C`;
        debugInfo.log?.push(`[KNMI GT_CALC] TX < 15. Gevoelstemperatuur calculated: ${T_wc.toFixed(1)} °C using TG=${T_air_C_for_windchill}°C, FG=${V_ms_for_windchill}m/s.`);
      } else {
         debugInfo.log?.push(`[KNMI GT_SKIP] TX < 15 but wind speed < 5 km/h. Gevoelstemperatuur not calculated.`);
      }
    } else {
         debugInfo.log?.push(`[KNMI GT_SKIP] TX < 15 but TG or FG missing for Gevoelstemperatuur.`);
    }
  } else if (txCelsius !== undefined) {
     debugInfo.log?.push(`[KNMI GT_SKIP] TX (${txCelsius}°C) is not less than 15°C. Gevoelstemperatuur not calculated.`);
  }


  // Hitte-index
  let calculatedHeatIndexValue: number | null = null;
  if (txCelsius !== undefined && txCelsius >= 27) {
      debugInfo.log?.push(`[KNMI HI_CONDITION_MET] TX (${txCelsius}°C) is >= 27°C. Proceeding with HI calculation.`);
      if (ugPercent !== undefined && tgCelsius !== undefined) {
          if (ugPercent < 40) {
              calculatedHeatIndexValue = txCelsius; // HI = TX (max temp for the day) if RH < 40%
              debugInfo.log?.push(`[KNMI HI_SET_TO_TX_LOW_RH] RH < 40% (${ugPercent}%), Hitte-index set to TX (${txCelsius}°C).`);
          } else {
              let hiFromFormula = calculateHeatIndex(tgCelsius, ugPercent); // Use TG (average temp) for formula
              if (hiFromFormula !== null) {
                  // Ensure HI is not less than TX (max temp for the day)
                  calculatedHeatIndexValue = Math.max(txCelsius, hiFromFormula);
                  debugInfo.log?.push(`[KNMI HI_CALCULATED] RH >= 40%. HI from formula (using TG=${tgCelsius}, UG=${ugPercent}): ${hiFromFormula.toFixed(1)}°C. Final HI (clamped with TX=${txCelsius}): ${calculatedHeatIndexValue.toFixed(1)}°C.`);
              } else {
                  debugInfo.log?.push(`[KNMI HI_WARN_NULL_FROM_FORMULA] calculateHeatIndex returned null for TG=${tgCelsius}, UG=${ugPercent}.`);
              }
          }
          if (calculatedHeatIndexValue !== null) {
              temperatuurDetails.hitteIndex = `${calculatedHeatIndexValue.toFixed(1)} °C`;
          }
      } else {
          debugInfo.log?.push(`[KNMI HI_SKIP_INSUFFICIENT_DATA_FOR_CALC] TX condition met, but TG or UG missing for Hitte-index calculation (TG: ${tgCelsius}, UG: ${ugPercent}).`);
      }
  } else if (txCelsius !== undefined && txCelsius < 27) {
      debugInfo.log?.push(`[KNMI HI_SKIP_LOW_TX] TX (${txCelsius}°C) is less than 27°C. Hitte-index not calculated.`);
  } else {
      debugInfo.log?.push(`[KNMI HI_SKIP_TX_UNDEFINED] TX is undefined. Hitte-index not calculated.`);
  }

  const fg_ms = typeof record.FG === 'number' && record.FG >= 0 ? record.FG / 10 : undefined;
  const fhx_ms = typeof record.FHX === 'number' && record.FHX >= 0 ? record.FHX / 10 : undefined;
  const fxx_raw_ms = typeof record.FXX === 'number' && record.FXX !== -1 ? record.FXX / 10 : (record.FXX === -1 ? 0 : undefined);
  const fxx_kmh = typeof fxx_raw_ms !== 'undefined' ? `${(fxx_raw_ms * 3.6).toFixed(1)} km/u` : undefined;

  resultShell.locatieEnDatum = formatDateFns(parseISO(record.date), "EEEE d MMMM yyyy 'in De Bilt'", { locale: nl });
  resultShell.temperatuur = temperatuurDetails;

  if (record.SQ !== null || record.SP !== null || record.NG !== null) {
    resultShell.zonBewolkingEnZicht = {
      'Duur zonneschijn': formatValue(record.SQ, 10, ' uur', '<0.05 uur'),
      'Rel. zonneschijnduur': formatValue(record.SP, 1, '%', undefined, 0),
      'Bedekkingsgraad': getCloudCoverageDescription(record.NG),
      'Minimaal zicht': undefined,
    };
  } else {
     resultShell.zonBewolkingEnZicht = undefined;
  }

  if (record.RH !== null || record.DR !== null) {
    resultShell.neerslag = {
      Hoeveelheid: formatValue(record.RH, 10, ' mm', '<0.05 mm'),
      Duur: formatValue(record.DR, 10, ' uur', '<0.05 uur'),
    };
  } else {
    resultShell.neerslag = undefined;
  }

  if (record.DDVEC !== null || fg_ms !== undefined || fhx_ms !== undefined || fxx_kmh !== undefined) {
    resultShell.wind = {
      'Overheersende windrichting': degreesToCardinal(record.DDVEC),
      'Gemiddelde snelheid': typeof fg_ms !== 'undefined' ? `${msToBeaufort(fg_ms)} (${(fg_ms * 3.6).toFixed(1)} km/u)` : undefined,
      'Max. uurgem. snelheid': typeof fhx_ms !== 'undefined' ? `${msToBeaufort(fhx_ms)} (${(fhx_ms * 3.6).toFixed(1)} km/u)` : undefined,
      'Maximale stoot': fxx_kmh,
    };
  } else {
    resultShell.wind = undefined;
  }

  if (record.PG !== null && record.PG !== undefined) {
    resultShell.luchtdruk = {
      'Gemiddelde luchtdruk': formatValue(record.PG, 10, ' hPa', undefined, 0),
    };
  } else {
    resultShell.luchtdruk = undefined;
  }

  if (record.UG !== null && record.UG !== undefined) {
    resultShell.luchtvochtigheid = {
      Gemiddelde: formatValue(record.UG, 1, '%', undefined, 0),
    };
  } else {
    resultShell.luchtvochtigheid = undefined;
  }

  debugInfo.parsedData = { ...resultShell };
  delete debugInfo.parsedData.debugInfo;

  let hasMeaningfulTempData = false;
  if (resultShell.temperatuur) {
    const { gevoelstemperatuur, hitteIndex, ...otherTempProps } = resultShell.temperatuur;
    const hasBaseTempData = Object.values(otherTempProps).some(val => val !== undefined && val !== null && val !== '');
    hasMeaningfulTempData = hasBaseTempData || (gevoelstemperatuur !== undefined && gevoelstemperatuur !== null && gevoelstemperatuur !== '') || (hitteIndex !== undefined && hitteIndex !== null && hitteIndex !== '');
  }

  const dataKeysApartFromTemp = Object.keys(resultShell).filter(k =>
    k !== 'locatieEnDatum' &&
    k !== 'error' &&
    k !== 'debugInfo' &&
    k !== 'temperatuur'
  );

  const hasOtherSectionData = dataKeysApartFromTemp.some(key => {
    const section = resultShell[key as keyof Omit<FormattedKnmiDailyData, 'locatieEnDatum' | 'error' | 'debugInfo' | 'temperatuur'>];
    return section && typeof section === 'object' && Object.values(section).some(val => val !== undefined && val !== null && val !== '');
  });

  if (!hasMeaningfulTempData && !hasOtherSectionData && !resultShell.error) {
      resultShell.error = `Geen data beschikbaar in de dataset voor de geselecteerde datum (${debugInfo.filterTargetDate}) (na formattering).`;
      debugInfo.log?.push(`[KNMI_ACTION_WARN] No data found after formatting for ${debugInfo.filterTargetDate}`);
  } else if (resultShell.error && resultShell.error.includes("Geen KNMI dataset gevonden voor")) {
    // Keep the more specific "not found" error if it was already set
  } else {
    resultShell.error = null; // Clear generic error if specific data was found
  }

  return resultShell;
}
