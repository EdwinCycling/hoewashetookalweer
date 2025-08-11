
'use server';

import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

// Simplified interface for this focused fetch
export interface WeatherStatsData {
  day: number;
  month: number;
  year: number;
  avgTemp?: string | null;
  maxTemp?: string | null;
  minTemp?: string | null;
  histMaxHigh?: string | null;
  histMaxLow?: string | null;
  histMinLow?: string | null;
  histMinHigh?: string | null;
  histAvgLow?: string | null;
  histAvgHigh?: string | null;
  error?: string | null;
  debugInfo?: {
    url: string;
    requestedDay: number;
    requestedMonth: number;
    requestedYear: number;
    status?: number;
    statusText?: string;
    htmlLength?: number;
    rawHtmlExcerpt?: string | null;
    tbodyHtmlExcerpt?: string | null;
    foundRowForDay?: number | null;
    targetRowHtmlExcerpt?: string | null;
    extractedCellsCount?: number;
    extractedCellsSample?: string[];
    log?: string[];
    errorContext?: string;
  };
}

export async function fetchWeatherStats(
  day: number,
  month: number,
  year: number
): Promise<WeatherStatsData> {
  const tempDateForMonthFormat = new Date(Date.UTC(year, month - 1, 1));
  const monthNameDutch = format(tempDateForMonthFormat, 'MMMM', { locale: nl }).toLowerCase();
  const formattedDayMonthYear = format(new Date(Date.UTC(year, month -1, day)), 'd MMMM yyyy', { locale: nl});

  const url = `https://weerstatistieken.nl/de-bilt/${year}/${monthNameDutch}`;

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9,nl;q=0.8',
  };

  const internalDebugInfo: NonNullable<WeatherStatsData['debugInfo']> = {
    url,
    requestedDay: day,
    requestedMonth: month,
    requestedYear: year,
    log: []
  };
  internalDebugInfo.log?.push(`[WeatherStats DEBUG] Fetching URL: ${url}`);

  try {
    const response = await fetch(url, {
      headers: headers,
      cache: 'no-store',
    });

    internalDebugInfo.status = response.status;
    internalDebugInfo.statusText = response.statusText;
    internalDebugInfo.log?.push(`[WeatherStats DEBUG] Response Status: ${response.status} ${response.statusText}`);
    const htmlContent = await response.text();

    internalDebugInfo.htmlLength = htmlContent.length;
    if (process.env.NODE_ENV !== 'production') {
        internalDebugInfo.rawHtmlExcerpt = htmlContent.substring(0, 3000);
    }


    if (!response.ok) {
        let errorMsg = `Fout bij ophalen van ${url} (${response.status} ${response.statusText}).`;
        if (response.status === 404) {
            errorMsg = `Weerstatistieken pagina niet gevonden voor ${monthNameDutch} ${year} (${url}).`;
        } else if (response.status === 403) {
             errorMsg = `Toegang tot ${url} geweigerd (403).`;
        } else if (response.status === 500) {
             errorMsg = `Interne serverfout (${response.status}) bij weerstatistieken.nl voor ${monthNameDutch} ${year} (${url}). Probeer later opnieuw.`;
             internalDebugInfo.log?.push(`[WeatherStats ERROR HTML Excerpt (Status 500)]: ${htmlContent.substring(0, 1000)}`);
        }
        internalDebugInfo.log?.push(`[WeatherStats ERROR] Fetch Error: ${errorMsg}`);
        return { day, month, year, error: errorMsg, debugInfo: internalDebugInfo };
    }

    const tableStartMarker = '<table id="lopendemaandTable">';
    const tbodyStartMarker = '<tbody>';
    const tbodyEndMarker = '</tbody>';

    const tableStartIndex = htmlContent.indexOf(tableStartMarker);
    if (tableStartIndex === -1) {
      const errorMsg = `Kon de weer tabel (lopendemaandTable) niet vinden op de pagina (${formattedDayMonthYear}).`;
      internalDebugInfo.log?.push(`[WeatherStats ERROR] ${errorMsg}`);
      return { day, month, year, error: errorMsg, debugInfo: internalDebugInfo };
    }

    const tbodyStartIndex = htmlContent.indexOf(tbodyStartMarker, tableStartIndex);
    const tbodyEndIndex = htmlContent.indexOf(tbodyEndMarker, tbodyStartIndex);

    if (tbodyStartIndex === -1 || tbodyEndIndex === -1) {
         const errorMsg = `Kon tabel inhoud (tbody) niet vinden.`;
          internalDebugInfo.log?.push(`[WeatherStats ERROR] ${errorMsg}`);
         return { day, month, year, error: errorMsg, debugInfo: internalDebugInfo };
    }
    const tbodyHtml = htmlContent.substring(tbodyStartIndex + tbodyStartMarker.length, tbodyEndIndex);
    if (process.env.NODE_ENV !== 'production') {
        internalDebugInfo.tbodyHtmlExcerpt = tbodyHtml.substring(0, 500);
    }


    const rows = tbodyHtml.split('<tr>').slice(1);
    let targetRowHtml: string | null = null;

    const dayNumber = Number(day);
    // Regex to find the start of the link for the specific day, allowing for variations in attributes
    const dayLinkPatternRegex = new RegExp(`<td><a href="/de-bilt/${year}/${monthNameDutch.toLowerCase()}/${dayNumber}"[^>]*>${dayNumber}</a></td>`);
    internalDebugInfo.log?.push(`[WeatherStats DEBUG] Day link regex: ${dayLinkPatternRegex.source}`);
    internalDebugInfo.log?.push(`[WeatherStats DEBUG] Number of rows found in tbody: ${rows.length}`);


    for (const row of rows) {
        if (dayLinkPatternRegex.test(row)) {
             targetRowHtml = row;
             internalDebugInfo.foundRowForDay = dayNumber;
             if (process.env.NODE_ENV !== 'production') {
                internalDebugInfo.targetRowHtmlExcerpt = `<tr>${row.substring(0, 300)}...</tr>`;
             }
             internalDebugInfo.log?.push(`[WeatherStats DEBUG] Target row found for day ${dayNumber}.`);
             break;
        }
    }

    if (!targetRowHtml) {
       const specificDayString = `${dayNumber} ${monthNameDutch} ${year}`;
       const errorMsg = `Kon de rij voor dag ${specificDayString} niet vinden in de tabel. URL: ${url}.`;
       internalDebugInfo.log?.push(`[WeatherStats ERROR] ${errorMsg}. Regex used: ${dayLinkPatternRegex.source}`);
       return { day, month, year, error: errorMsg, debugInfo: internalDebugInfo };
    }

    const cells = targetRowHtml.split(/<td[^>]*>/).slice(1).map(cell => {
        const endTdIndex = cell.indexOf('</td>');
        return endTdIndex !== -1
            ? cell.substring(0, endTdIndex)
                  .replace(/<a[^>]*>|<\/a>/g, '') 
                  .replace(/<[^>]+>/g, '') 
                  .trim()
            : '';
    });

    internalDebugInfo.extractedCellsCount = cells.length;
    if (process.env.NODE_ENV !== 'production') {
        internalDebugInfo.extractedCellsSample = cells.slice(0, 10);
    }
    internalDebugInfo.log?.push(`[WeatherStats DEBUG] Extracted ${cells.length} cells. Sample: ${JSON.stringify(cells.slice(0,10))}`);

    if (cells.length < 10) { 
        const errorMsg = `Onverwacht aantal kolommen (${cells.length}) gevonden voor dag ${dayNumber}. Minimaal 10 verwacht. URL: ${url}`;
        internalDebugInfo.log?.push(`[WeatherStats ERROR] ${errorMsg}`);
        return { day, month, year, error: errorMsg, debugInfo: internalDebugInfo };
    }

    internalDebugInfo.log?.push(`[WeatherStats DEBUG] Successfully parsed data for ${formattedDayMonthYear}.`);

    return {
        day,
        month,
        year,
        avgTemp: cells[1] || null,
        maxTemp: cells[2] || null,
        minTemp: cells[3] || null,
        histMaxHigh: cells[4] || null,
        histMaxLow: cells[5] || null,
        histMinLow: cells[6] || null,
        histMinHigh: cells[7] || null,
        histAvgLow: cells[8] || null,
        histAvgHigh: cells[9] || null,
        error: null,
        debugInfo: internalDebugInfo
    };

  } catch (error: any) {
    const finalDebugInfo = { ...internalDebugInfo, errorContext: 'Outer catch block' };
    finalDebugInfo.statusText = (finalDebugInfo.statusText || '') + ` Exception: ${(error.message || 'Unknown fetch error')}`;
    finalDebugInfo.log?.push(`[WeatherStats FATAL ERROR] Onverwachte fout: ${error.message || 'Onbekend'}`);
    return { day, month, year, error: `Onverwachte fout bij ophalen weerstatistieken: ${error.message || 'Onbekend'}`, debugInfo: finalDebugInfo };
  }
}
