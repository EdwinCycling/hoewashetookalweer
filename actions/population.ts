
'use server';

import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

export interface PopulationData {
  item: string;
  value: string;
}

export interface FetchPopulationResult {
  population: PopulationData[] | null;
  error?: string | null;
  debugInfo?: {
    url: string;
    status?: number;
    statusText?: string;
    startMarkerUsed?: string;
    endMarkerSearch?: string;
    startIndexFound?: number;
    endIndexFound?: number;
    populationSectionHtmlExcerpt?: string | null;
    parsedItemsCount?: number;
    errorDetails?: string | null;
    rawHtmlExcerpt?: string | null; // For overall page HTML
  };
}

/**
 * Fetches population data for a specific date from historisch-archief.nl.
 *
 * @param date The date to fetch population data for.
 * @returns An object containing an array of population data or an error message, along with debug info.
 */
export async function fetchPopulationData(
  date: Date
): Promise<FetchPopulationResult> {
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

  const populationSectionStartMarker = `>Bevolkingscijfers`;
  
  const debugOutput: NonNullable<FetchPopulationResult['debugInfo']> = {
    url,
    startMarkerUsed: populationSectionStartMarker,
    endMarkerSearch: "Next h4 or structural break",
  };

  try {
    const response = await fetch(url, { headers, cache: 'no-store' });
    debugOutput.status = response.status;
    debugOutput.statusText = response.statusText;

    const htmlContent = await response.text();
    if (process.env.NODE_ENV !== 'production') {
        debugOutput.rawHtmlExcerpt = htmlContent.substring(0, 1000);
    }


    if (!response.ok) {
      let errorMsg = `Fout bij ophalen van ${url} (${response.status}).`;
      if (response.status === 404) {
        errorMsg = `Pagina voor bevolkingsdata niet gevonden voor ${format(date, 'd MMMM yyyy', { locale: nl })} (${url}).`;
      } else if (response.status === 403) {
        errorMsg = `Toegang tot ${url} geweigerd (403).`;
      }
      debugOutput.errorDetails = errorMsg;
      return { population: null, error: errorMsg, debugInfo: debugOutput };
    }

    let startIndex = htmlContent.indexOf(populationSectionStartMarker);
    debugOutput.startIndexFound = startIndex;

    if (startIndex === -1) {
      const errorMsg = `Kon bevolkingssectie startmarker "${populationSectionStartMarker}" niet vinden voor ${url}.`;
      debugOutput.errorDetails = errorMsg;
      // If specific marker not found, try the old one as a fallback.
      const fallbackMarker = `<h4 class="mt-6 mb-4 font-main font-bold">Bevolkingscijfers van ${year}</h4>`;
      startIndex = htmlContent.indexOf(fallbackMarker);
      debugOutput.startMarkerUsed = `${populationSectionStartMarker} (fallback: ${fallbackMarker})`;
      debugOutput.startIndexFound = startIndex;
      if (startIndex === -1) {
        const finalErrorMsg = `Kon bevolkingssectie startmarker ook niet vinden met fallback voor ${url}. Markers: "${populationSectionStartMarker}", "${fallbackMarker}"`;
        debugOutput.errorDetails = finalErrorMsg;
        return { population: [], error: null, debugInfo: debugOutput };
      }
    }
    
    const h4EndTagIndex = htmlContent.indexOf('</h4>', startIndex);
    if (h4EndTagIndex !== -1) {
        startIndex = h4EndTagIndex + '</h4>'.length;
    } else {
        // Fallback if </h4> not found directly after, advance by a reasonable amount based on likely marker length
        // This logic depends on whether startIndex was found from `populationSectionStartMarker` or the fallback
        if (debugOutput.startMarkerUsed?.includes(populationSectionStartMarker)) {
             startIndex += populationSectionStartMarker.length; // Approximate length of the marker itself
        } else {
            const fallbackMarker = `<h4 class="mt-6 mb-4 font-main font-bold">Bevolkingscijfers van ${year}</h4>`;
            startIndex += fallbackMarker.length;
        }
    }


    const populationSectionEndMarker = '<h4 class="mt-6 mb-4 font-main font-bold">'; // Next H4 marks the end
    let endIndex = htmlContent.indexOf(populationSectionEndMarker, startIndex);
    debugOutput.endIndexFound = endIndex;

    if (endIndex === -1) {
        const potentialEndArea = htmlContent.substring(startIndex);
        const nextMeaningfulDiv = potentialEndArea.search(/<div class="(widget-wrapper|md:w-8\/12|main-content)">/);

        if (nextMeaningfulDiv !== -1) {
            endIndex = startIndex + nextMeaningfulDiv;
            debugOutput.endMarkerSearch = "Found next structural div as end marker";
        } else {
            endIndex = htmlContent.length; // Fallback, take rest of content if no clear end marker
            debugOutput.endMarkerSearch = "Fallback: no specific end marker or structural break found, used end of content";
        }
        debugOutput.endIndexFound = endIndex;
    }

    const populationSectionHtml = htmlContent.substring(startIndex, endIndex);
    if (process.env.NODE_ENV !== 'production') {
      debugOutput.populationSectionHtmlExcerpt = populationSectionHtml.substring(0, 500);
    }

    const population: PopulationData[] = [];
    // Updated Regex to not require a specific class on the value div.
    const itemRegex = /<div class="grow font-bold"[^>]*>([^<]+)<\/div>\s*<div[^>]*>\s*([\d.,\s]+)\s*<\/div>/gs;

    let match;
    const seenItems = new Set<string>();

    while ((match = itemRegex.exec(populationSectionHtml)) !== null) {
      const item = match[1].trim();
      if(seenItems.has(item)) continue; // Skip if this item label has already been processed

      // Remove all non-digit characters to get a clean number string
      const value = match[2].trim().replace(/\D/g, ''); 

      if (item && value) { // Ensure both item and value are non-empty after cleaning
        population.push({ item, value });
        seenItems.add(item);
      }
    }
    debugOutput.parsedItemsCount = population.length;


    if (population.length === 0 && populationSectionHtml.trim().length > 0) {
        const infoMsg = `Geen bevolkingsdata geparsed uit sectie voor ${url}, hoewel sectie content aanwezig was. Controleer regex en HTML structuur.`;
        debugOutput.errorDetails = (debugOutput.errorDetails ? debugOutput.errorDetails + "; " : "") + infoMsg;
    }


    return { population, error: null, debugInfo: debugOutput };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij ophalen bevolkingsdata: ${error.message || 'Onbekend'}`;
    debugOutput.errorDetails = errorMsg;
    return { population: null, error: errorMsg, debugInfo: debugOutput };
  }
}
