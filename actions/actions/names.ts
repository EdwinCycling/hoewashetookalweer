
'use server';

import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

export interface PopularNamesData {
  boys: string[];
  girls: string[];
}

export interface FetchPopularNamesResult {
  names: PopularNamesData | null;
  error?: string | null;
  debugInfo?: any;
}

/**
 * Fetches popular names for a specific date from historisch-archief.nl.
 *
 * @param date The date to fetch popular names for.
 * @returns An object containing arrays of popular boy and girl names or an error message.
 */
export async function fetchPopularNames(
  date: Date
): Promise<FetchPopularNamesResult> {
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
      if (response.status === 404) { errorMsg = `Pagina voor populaire namen niet gevonden voor ${format(date, 'd MMMM yyyy', { locale: nl })} (${url}).`; }
      else if (response.status === 403) { errorMsg = `Toegang tot ${url} geweigerd (403).`; }
      internalDebugInfo.errorDetails = errorMsg;
      return { names: null, error: errorMsg, debugInfo: internalDebugInfo };
    }

    const names: PopularNamesData = { boys: [], girls: [] };

    const extractNamesFromSection = (sectionTitle: 'Meisjesnamen' | 'Jongensnamen'): string[] => {
      const list: string[] = [];
      const sectionStartMarker = `<div class="grow font-bold" uk-leader>\n                                        ${sectionTitle}\n                                    </div>`;
      let startIndex = htmlContent.indexOf(sectionStartMarker);

      if (startIndex === -1) { return []; }
      
      startIndex = htmlContent.indexOf('<ol>', startIndex);
      if (startIndex === -1) { return []; }

      const endIndex = htmlContent.indexOf('</ol>', startIndex);
      if (endIndex === -1) { return []; }

      const olContent = htmlContent.substring(startIndex + '<ol>'.length, endIndex);
      const liRegex = /<li>([^<]+)<\/li>/gs;
      let match;
      while ((match = liRegex.exec(olContent)) !== null) {
        list.push(match[1].trim());
      }
      return list;
    };

    names.girls = extractNamesFromSection('Meisjesnamen');
    names.boys = extractNamesFromSection('Jongensnamen');
    
    internalDebugInfo.parsedGirlsCount = names.girls.length;
    internalDebugInfo.parsedBoysCount = names.boys.length;

    if (names.boys.length === 0 && names.girls.length === 0) {
        internalDebugInfo.warning = `Geen populaire namen gevonden voor ${year} op ${url}.`;
    }

    return { names, error: null, debugInfo: internalDebugInfo };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij ophalen populaire namen: ${error.message || 'Onbekend'}`;
    internalDebugInfo.errorDetails = errorMsg;
    return { names: null, error: errorMsg, debugInfo: { ...internalDebugInfo, error } };
  }
}
