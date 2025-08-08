
'use server';

import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

export interface Top100Song {
  rank: string;
  title: string;
  artist: string;
}

export interface FetchTop100MusicResult {
  songs: Top100Song[] | null;
  error?: string | null;
  debugInfo?: any;
}

const MIN_YEAR_MUSIC = 1965;

// Helper function to decode HTML entities
function decodeHtmlEntities(text: string): string {
    if (typeof text !== 'string') return text;
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'") // Handles single quote
        .replace(/&#39;/g, "'") // Handles single quote (alternative form)
        .replace(/&apos;/g, "'"); // Handles apostrophe
}


/**
 * Fetches Top 100 music data for a specific year from top40.nl.
 *
 * @param year The year to fetch music data for.
 * @returns An object containing an array of Top 100 songs or an error message.
 */
export async function fetchTop100Music(
  year: number
): Promise<FetchTop100MusicResult> {
  const currentYear = new Date().getFullYear();
  if (year < MIN_YEAR_MUSIC || year > currentYear) {
    const errorMsg = `Muziekdata is alleen beschikbaar van ${MIN_YEAR_MUSIC} tot en met ${currentYear}. Gekozen jaar: ${year}.`;
    return { songs: null, error: errorMsg };
  }

  const url = `https://www.top40.nl/bijzondere-lijsten/top-100-jaaroverzichten/${year}`;

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
      if (response.status === 404) { errorMsg = `Pagina voor Top 100 muziek niet gevonden voor ${year} (${url}).`; }
      else if (response.status === 403) { errorMsg = `Toegang tot ${url} geweigerd (403).`; }
      internalDebugInfo.errorDetails = errorMsg;
      return { songs: null, error: errorMsg, debugInfo: internalDebugInfo };
    }

    const songs: Top100Song[] = [];
    const songItemRegex = /<div class="top40-list__item.*?data-video=.*?>(.*?)<\/div>\s*<\/div>\s*<\/div>/gs;
    const detailsRegex = /<div class="number-block.*?"><h4>\s*(\d+)\s*<\/h4>.*?<a.*?class="h3.*?">(.*?)<\/a>.*?<a.*?class="p lead lowercase.*?">(.*?)<\/a>/s;

    let match;
    while ((match = songItemRegex.exec(htmlContent)) !== null) {
        const itemHtml = match[1]; 
        const detailsMatch = itemHtml.match(detailsRegex);

        if (detailsMatch) {
            const rank = detailsMatch[1].trim();
            const title = decodeHtmlEntities(detailsMatch[2].trim().replace(/<[^>]+>/g, ''));
            const artist = decodeHtmlEntities(detailsMatch[3].trim().replace(/<[^>]+>/g, ''));
            songs.push({ rank, title, artist });
        }
    }
    
    internalDebugInfo.parsedItemsCount = songs.length;
    if (songs.length === 0 && htmlContent.includes('top40-list__item')) {
        internalDebugInfo.warning = `Geen nummers geparsed uit Top 100 voor ${year}, hoewel lijstitems aanwezig lijken.`;
    }

    return { songs, error: null, debugInfo: internalDebugInfo };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij ophalen Top 100 muziekdata: ${error.message || 'Onbekend'}`;
    internalDebugInfo.errorDetails = errorMsg;
    return { songs: null, error: errorMsg, debugInfo: { ...internalDebugInfo, error } };
  }
}
