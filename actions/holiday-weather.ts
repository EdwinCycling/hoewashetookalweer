
'use server';

import type { KnmiDailyRecord } from '@/data/knmi-daily-weather-data';
import knmiJsonData from '@/data/knmi_daily_weather_full.json';
import { format as formatDateFns, parseISO, addDays, getYear, subDays } from 'date-fns';
import { nl } from 'date-fns/locale';

export interface HolidayWeatherData {
  name: string;
  date: string;
  dayOfWeek: string;
  maxTemp: string | null;
  minTemp: string | null;
}

export interface FetchHolidayWeatherResult {
  holidays: HolidayWeatherData[] | null;
  error?: string | null;
}

const MIN_YEAR = 1901; // Based on KNMI data availability

// Gauss's algorithm for calculating Easter Sunday
function getEasterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
}

function formatTemp(temp: number | null | undefined): string | null {
  if (temp === null || typeof temp === 'undefined' || temp === -9999) return null; // -9999 is sometimes used for missing data
  return `${(temp / 10).toFixed(1)}°C`;
}

// Helper to parse the Dutch date string back to a Date object for sorting
const dateParseForSort = (dateString: string): number => {
    const parts = dateString.split(' ');
    const day = parts[0];
    const monthStr = parts[1];
    const year = parts[2];
    const monthIndex = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'].indexOf(monthStr.toLowerCase());
    return new Date(Date.UTC(parseInt(year), monthIndex, parseInt(day))).getTime();
};

export async function fetchHolidayWeatherByYear(
  year: number
): Promise<FetchHolidayWeatherResult> {
  if (year < MIN_YEAR || year > getYear(new Date())) {
    return { holidays: null, error: `Weerdata voor feestdagen is alleen beschikbaar van ${MIN_YEAR} tot en met het huidige jaar.` };
  }

  const allRecords: KnmiDailyRecord[] = knmiJsonData as KnmiDailyRecord[];
  const recordsMap = new Map<string, KnmiDailyRecord>();

  // FIX: Populate the map using 'YYYY-MM-DD' as the key.
  allRecords.forEach(record => {
      if (record.station_code === 260 && record.date) {
        const dateKey = record.date.substring(0, 10);
        recordsMap.set(dateKey, record);
      }
  });

  const getWeatherDataForDate = (date: Date): { maxTemp: string | null; minTemp: string | null } => {
    const dateString = formatDateFns(date, 'yyyy-MM-dd');
    const record = recordsMap.get(dateString);
    if (!record) {
      return { maxTemp: null, minTemp: null };
    }
    return {
      maxTemp: formatTemp(record.TX),
      minTemp: formatTemp(record.TN),
    };
  };

  const holidays: HolidayWeatherData[] = [];
  
  // Nieuwjaarsdag
  const nieuwjaarsdag = new Date(Date.UTC(year, 0, 1));
  holidays.push({
    name: 'Nieuwjaarsdag',
    date: formatDateFns(nieuwjaarsdag, 'd MMMM yyyy', { locale: nl }),
    dayOfWeek: formatDateFns(nieuwjaarsdag, 'EEEE', { locale: nl }),
    ...getWeatherDataForDate(nieuwjaarsdag),
  });

  // Easter and related holidays
  const easterSunday = getEasterSunday(year);
  const carnavalSunday = subDays(easterSunday, 49);
  const easterMonday = addDays(easterSunday, 1);
  const ascensionDay = addDays(easterSunday, 39);
  const whitSunday = addDays(easterSunday, 49);
  const whitMonday = addDays(easterSunday, 50);

  holidays.push({
    name: 'Carnavalszondag',
    date: formatDateFns(carnavalSunday, 'd MMMM yyyy', { locale: nl }),
    dayOfWeek: formatDateFns(carnavalSunday, 'EEEE', { locale: nl }),
    ...getWeatherDataForDate(carnavalSunday),
  });

  holidays.push({
    name: '1e Paasdag',
    date: formatDateFns(easterSunday, 'd MMMM yyyy', { locale: nl }),
    dayOfWeek: formatDateFns(easterSunday, 'EEEE', { locale: nl }),
    ...getWeatherDataForDate(easterSunday),
  });

  holidays.push({
    name: '2e Paasdag',
    date: formatDateFns(easterMonday, 'd MMMM yyyy', { locale: nl }),
    dayOfWeek: formatDateFns(easterMonday, 'EEEE', { locale: nl }),
    ...getWeatherDataForDate(easterMonday),
  });

  // Koning(inne)dag
  if (year >= 1891 && year <= 2013) {
    let koninginnedagDate: Date;
    if (year < 1949) {
      koninginnedagDate = new Date(Date.UTC(year, 7, 31)); // 31 Augustus
    } else {
      koninginnedagDate = new Date(Date.UTC(year, 3, 30)); // 30 April
    }
    // Correct for Sunday
    if (koninginnedagDate.getUTCDay() === 0) {
      if (year < 1980 && year >= 1949) { // Juliana, if Sunday -> Monday May 1st
        koninginnedagDate = addDays(koninginnedagDate, 1);
      } else { // Wilhelmina (before 1949) and Beatrix (from 1980), if Sunday -> Saturday
        koninginnedagDate = addDays(koninginnedagDate, -1);
      }
    }
     holidays.push({
      name: 'Koninginnedag',
      date: formatDateFns(koninginnedagDate, 'd MMMM yyyy', { locale: nl }),
      dayOfWeek: formatDateFns(koninginnedagDate, 'EEEE', { locale: nl }),
      ...getWeatherDataForDate(koninginnedagDate),
    });
  } else if (year >= 2014) {
    let koningsdag = new Date(Date.UTC(year, 3, 27));
    if (koningsdag.getUTCDay() === 0) {
      koningsdag = new Date(Date.UTC(year, 3, 26));
    }
     holidays.push({
      name: 'Koningsdag',
      date: formatDateFns(koningsdag, 'd MMMM yyyy', { locale: nl }),
      dayOfWeek: formatDateFns(koningsdag, 'EEEE', { locale: nl }),
      ...getWeatherDataForDate(koningsdag),
    });
  }
  
  // Bevrijdingsdag
  const bevrijdingsdag = new Date(Date.UTC(year, 4, 5)); // Mei = 4
  holidays.push({
    name: 'Bevrijdingsdag',
    date: formatDateFns(bevrijdingsdag, 'd MMMM yyyy', { locale: nl }),
    dayOfWeek: formatDateFns(bevrijdingsdag, 'EEEE', { locale: nl }),
    ...getWeatherDataForDate(bevrijdingsdag),
  });

  const midzomer = new Date(Date.UTC(year, 5, 21)); // June = 5
  holidays.push({
    name: 'Midzomerfeest',
    date: formatDateFns(midzomer, 'd MMMM yyyy', { locale: nl }),
    dayOfWeek: formatDateFns(midzomer, 'EEEE', { locale: nl }),
    ...getWeatherDataForDate(midzomer),
  });

  holidays.push({
    name: 'Hemelvaartsdag',
    date: formatDateFns(ascensionDay, 'd MMMM yyyy', { locale: nl }),
    dayOfWeek: formatDateFns(ascensionDay, 'EEEE', { locale: nl }),
    ...getWeatherDataForDate(ascensionDay),
  });
  
  holidays.push({
    name: '1e Pinksterdag',
    date: formatDateFns(whitSunday, 'd MMMM yyyy', { locale: nl }),
    dayOfWeek: formatDateFns(whitSunday, 'EEEE', { locale: nl }),
    ...getWeatherDataForDate(whitSunday),
  });

  holidays.push({
    name: '2e Pinksterdag',
    date: formatDateFns(whitMonday, 'd MMMM yyyy', { locale: nl }),
    dayOfWeek: formatDateFns(whitMonday, 'EEEE', { locale: nl }),
    ...getWeatherDataForDate(whitMonday),
  });

  const stMaarten = new Date(Date.UTC(year, 10, 11)); // November = 10
  holidays.push({
    name: 'Sint-Maarten',
    date: formatDateFns(stMaarten, 'd MMMM yyyy', { locale: nl }),
    dayOfWeek: formatDateFns(stMaarten, 'EEEE', { locale: nl }),
    ...getWeatherDataForDate(stMaarten),
  });

  // Sinterklaas
  const sinterklaas = new Date(Date.UTC(year, 11, 5)); // December = 11
  holidays.push({
    name: 'Sinterklaas',
    date: formatDateFns(sinterklaas, 'd MMMM yyyy', { locale: nl }),
    dayOfWeek: formatDateFns(sinterklaas, 'EEEE', { locale: nl }),
    ...getWeatherDataForDate(sinterklaas),
  });

  // Christmas
  const firstChristmasDay = new Date(Date.UTC(year, 11, 25));
  holidays.push({
    name: '1e Kerstdag',
    date: formatDateFns(firstChristmasDay, 'd MMMM yyyy', { locale: nl }),
    dayOfWeek: formatDateFns(firstChristmasDay, 'EEEE', { locale: nl }),
    ...getWeatherDataForDate(firstChristmasDay),
  });

  const secondChristmasDay = new Date(Date.UTC(year, 11, 26));
  holidays.push({
    name: '2e Kerstdag',
    date: formatDateFns(secondChristmasDay, 'd MMMM yyyy', { locale: nl }),
    dayOfWeek: formatDateFns(secondChristmasDay, 'EEEE', { locale: nl }),
    ...getWeatherDataForDate(secondChristmasDay),
  });

  // Sort holidays chronologically
  holidays.sort((a, b) => dateParseForSort(a.date) - dateParseForSort(b.date));

  return { holidays, error: null };
}
