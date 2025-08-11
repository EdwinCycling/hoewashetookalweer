
'use server';

import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

export interface HistoricalPriceData {
  item: string;
  priceEuro: string;
  priceGulden: string;
}

export interface FetchHistoricalPricesResult {
  prices: HistoricalPriceData[] | null;
  error?: string | null;
  debugInfo?: any;
}

/**
 * Fetches historical prices for a specific date from historisch-archief.nl.
 *
 * @param date The date to fetch prices for.
 * @returns An object containing an array of historical prices or an error message.
 */
export async function fetchHistoricalPrices(
  date: Date
): Promise<FetchHistoricalPricesResult> {
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

  const internalDebugInfo: any = { url }; 

  try {
    const response = await fetch(url, { headers, cache: 'no-store' });
    internalDebugInfo.status = response.status;
    internalDebugInfo.statusText = response.statusText;

    const htmlContent = await response.text();
    if (process.env.NODE_ENV !== 'production') {
        internalDebugInfo.htmlExcerpt = htmlContent.substring(0, 5000);
    }

    if (!response.ok) {
      let errorMsg = `Fout bij ophalen van ${url} (${response.status}).`;
      if (response.status === 404) { errorMsg = `Pagina voor historische prijzen niet gevonden voor ${format(date, 'd MMMM yyyy', { locale: nl })} (${url}).`; } 
      else if (response.status === 403) { errorMsg = `Toegang tot ${url} geweigerd (403).`; }
      return { prices: null, error: errorMsg, debugInfo: internalDebugInfo };
    }

    const priceSectionStartMarker = '<h4 class="mt-6 mb-4 font-main font-bold">Wat kostte destijds... </h4>';
    const priceSectionEndMarkerCandidates = [
        '</aside>', '<h3 class="uppercase mb-4 text-xl font-heading font-bold">', '<h4 class="mt-6 mb-4 font-main font-bold">', '<div class="widget-wrapper">' 
    ];

    let startIndex = htmlContent.indexOf(priceSectionStartMarker);
    if (startIndex === -1) {
      return { prices: [], error: null, debugInfo: { ...internalDebugInfo, warning: 'Price section start marker not found.'} }; 
    }
    startIndex += priceSectionStartMarker.length;

    let endIndex = -1;
    for (const marker of priceSectionEndMarkerCandidates) {
        const potentialEndIndex = htmlContent.indexOf(marker, startIndex);
        if (potentialEndIndex !== -1) {
             if (marker === '<h4 class="mt-6 mb-4 font-main font-bold">' && potentialEndIndex === (startIndex - priceSectionStartMarker.length) ) { continue; }
            if (endIndex === -1 || potentialEndIndex < endIndex) { endIndex = potentialEndIndex; }
        }
    }

    if (endIndex === -1) { 
        const potentialEndArea = htmlContent.substring(startIndex);
        const nextDivStart = potentialEndArea.indexOf('<div class="'); 
        const nextAsideStart = potentialEndArea.indexOf('<aside');
        const nextFooterStart = potentialEndArea.indexOf('<footer');
        let structuralEnd = -1;
        if (nextDivStart !== -1) structuralEnd = nextDivStart;
        if (nextAsideStart !== -1 && (structuralEnd === -1 || nextAsideStart < structuralEnd)) structuralEnd = nextAsideStart;
        if (nextFooterStart !== -1 && (structuralEnd === -1 || nextFooterStart < structuralEnd)) structuralEnd = nextFooterStart;
        if (structuralEnd !== -1) { endIndex = startIndex + structuralEnd; } 
        else { endIndex = startIndex + 5000; }
    }

    const priceSectionHtml = htmlContent.substring(startIndex, endIndex);
    internalDebugInfo.priceSectionHtmlExcerpt = priceSectionHtml.substring(0,300);

    const prices: HistoricalPriceData[] = [];
    const itemRegex = /<div class="grow font-bold"[^>]*>([^<]+)<\/div>\s*<div class="p-0">\s*(?:&euro;|€)\s*([\d,.-]+)\s*\/\s*(?:&#131;|ƒ)\s*([\d,.-]+)\s*<\/div>/gs;

    let match;
    while ((match = itemRegex.exec(priceSectionHtml)) !== null) {
      const item = match[1].trim();
      const priceEuroRaw = match[2].trim().replace(/\./g, '').replace(',', '.');
      const priceGuldenRaw = match[3].trim().replace(/\./g, '').replace(',', '.');
      const priceEuro = `€ ${parseFloat(priceEuroRaw).toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      const priceGulden = `ƒ ${parseFloat(priceGuldenRaw).toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      prices.push({ item, priceEuro, priceGulden });
    }

    if (prices.length === 0 && priceSectionHtml.trim().length > 0) {
        internalDebugInfo.warning = 'No prices parsed from section, though section content was present.';
    }

    return { prices, error: null, debugInfo: internalDebugInfo };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij ophalen prijzen: ${error.message || 'Onbekend'}`;
    return { prices: null, error: errorMsg, debugInfo: { ...internalDebugInfo, error } };
  }
}
