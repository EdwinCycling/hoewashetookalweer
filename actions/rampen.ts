
'use server';

import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

export interface RampData {
  datum: string;
  beschrijving: string;
}

export interface FetchRampenResult {
  rampenOpDatum: RampData[];
  rampenInMaand: RampData[];
  error?: string | null;
  debugInfo?: any;
}

// Helper function to clean text from HTML
function cleanText(text: string): string {
  return text.replace(/<[^>]+>/g, '').trim();
}

/**
 * Fetches disasters and accidents for a specific date from historisch-archief.nl.
 *
 * @param date The date to fetch disaster data for.
 * @returns An object containing arrays of disasters or an error message.
 */
export async function fetchRampen(
  date: Date
): Promise<FetchRampenResult> {
  const dayNameDutch = format(date, 'EEEE', { locale: nl }).toLowerCase();
  const day = date.getDate();
  const monthNameDutch = format(date, 'MMMM', { locale: nl }).toLowerCase();
  const year = date.getFullYear();

  const url = `https://historisch-archief.nl/wat-gebeurde-er-op-${dayNameDutch}-${day}-${monthNameDutch}-${year}`;

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7',
  };
  
  const internalDebugInfo: any = { url, year };

  try {
    const response = await fetch(url, { headers, cache: 'no-store' });
    internalDebugInfo.status = response.status;
    internalDebugInfo.statusText = response.statusText;

    const htmlContent = await response.text();
    if (process.env.NODE_ENV !== 'production') {
        internalDebugInfo.rawHtmlExcerpt = htmlContent.substring(0, 5000);
    }

    if (!response.ok) {
      let errorMsg = `Fout bij ophalen van ${url} (${response.status}).`;
      return { rampenOpDatum: [], rampenInMaand: [], error: errorMsg, debugInfo: internalDebugInfo };
    }

    const rampenOpDatum: RampData[] = [];
    const rampenInMaand: RampData[] = [];

    // Function to extract events under a specific header
    const extractEventsFromSection = (headerText: string): RampData[] => {
      const results: RampData[] = [];
      const sectionStartRegex = new RegExp(`<h4 class="mt-6 mb-4 font-main font-bold">${headerText}<\/h4>`);
      const sectionMatch = htmlContent.match(sectionStartRegex);
      
      if (sectionMatch && typeof sectionMatch.index === 'number') {
        let startIndex = sectionMatch.index + sectionMatch[0].length;
        const searchArea = htmlContent.substring(startIndex);
        const nextHeaderIndex = searchArea.search(/<h[34] class="/);
        const sectionContent = nextHeaderIndex !== -1 ? searchArea.substring(0, nextHeaderIndex) : searchArea;

        const eventRegex = /<div class="grow font-bold"[^>]*>([^<]+)<\/div>\s*<div[^>]*>([^<]+)<\/div>/g;
        let match;
        while ((match = eventRegex.exec(sectionContent)) !== null) {
          const datum = cleanText(match[1]);
          const beschrijving = cleanText(match[2]);
          if (datum && beschrijving) {
            results.push({ datum, beschrijving });
          }
        }
      }
      return results;
    };

    const rampenOpDatumData = extractEventsFromSection(`Rampen en Ongevallen op ${day} ${monthNameDutch}`);
    const rampenInMaandData = extractEventsFromSection(`Rampen en Ongevallen in ${monthNameDutch}`);

    return {
      rampenOpDatum: rampenOpDatumData,
      rampenInMaand: rampenInMaandData,
      error: null,
      debugInfo: internalDebugInfo,
    };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij ophalen rampen: ${error.message || 'Onbekend'}`;
    internalDebugInfo.errorDetails = errorMsg;
    return { rampenOpDatum: [], rampenInMaand: [], error: errorMsg, debugInfo: { ...internalDebugInfo, error } };
  }
}
