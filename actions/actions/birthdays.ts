
'use server';

import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

export interface BirthdayPerson {
  name: string;
  birthYear: string;
}

export interface FetchBirthdaysResult {
  birthdays: BirthdayPerson[] | null;
  error?: string | null;
  debugInfo?: any;
}

// Helper function to decode HTML entities
function decodeHtmlEntities(text: string): string {
    if (typeof text !== 'string') return text;
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'");
}


/**
 * Fetches birthdays for a specific date from defeestkamer.nl.
 *
 * @param date The date to fetch birthdays for.
 * @returns An object containing an array of people celebrating their birthday or an error message.
 */
export async function fetchBirthdaysOnDate(
  date: Date
): Promise<FetchBirthdaysResult> {
  // Format date as DDMMYYYY for the URL
  const formattedDateUrl = format(date, 'ddMMyyyy', { locale: nl });
  const url = `https://defeestkamer.nl/datum/${formattedDateUrl}`;

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7',
  };
  
  const internalDebugInfo: any = { url, dateUsed: formattedDateUrl };

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
      if (response.status === 404) {
        errorMsg = `Pagina voor verjaardagen niet gevonden voor ${format(date, 'd MMMM yyyy', { locale: nl })} (${url}).`;
      } else if (response.status === 403) {
        errorMsg = `Toegang tot ${url} geweigerd (403).`;
      }
      internalDebugInfo.errorDetails = errorMsg;
      return { birthdays: null, error: errorMsg, debugInfo: internalDebugInfo };
    }

    const birthdays: BirthdayPerson[] = [];
    const sectionStartMarker = '<div class="article"><h2>Ook jarig</h2>';
    let startIndex = htmlContent.indexOf(sectionStartMarker);

    if (startIndex === -1) {
      return { birthdays: [], error: null, debugInfo: { ...internalDebugInfo, warning: 'Sectie "Ook jarig" niet gevonden.'} }; // Return empty list if section not found
    }
    
    // Narrow down to the <ul> within the "Ook jarig" section
    startIndex = htmlContent.indexOf('<ul>', startIndex);
    if (startIndex === -1) {
        return { birthdays: [], error: null, debugInfo: { ...internalDebugInfo, warning: '<ul> niet gevonden na sectie "Ook jarig".'} };
    }

    const endIndex = htmlContent.indexOf('</ul>', startIndex);
    if (endIndex === -1) {
        return { birthdays: [], error: null, debugInfo: { ...internalDebugInfo, warning: '</ul> niet gevonden na sectie "Ook jarig".'} };
    }

    const ulContent = htmlContent.substring(startIndex + '<ul>'.length, endIndex);

    // Regex to capture name and year from list items
    const itemRegex = /<li><a href="betekenis\/[^"]+">([^<]+)<\/a>\s*([^,(]+?)(?:,\s*[^<]*)?\s*\((?:<a href="[^"]+">)?(\d{4})(?:<\/a>)?\)<\/li>/gs;


    let match;
    while ((match = itemRegex.exec(ulContent)) !== null) {
        const firstPartName = decodeHtmlEntities(match[1].trim());
        const secondPartName = decodeHtmlEntities(match[2].trim());
        const birthYear = match[3].trim();
        
        let fullName = firstPartName;
        if (secondPartName && secondPartName.toLowerCase() !== firstPartName.toLowerCase()) { // Avoid duplicates if second part is same as first (rare)
            fullName += ` ${secondPartName}`;
        }
        
        fullName = fullName.replace(/,$/, '').trim();

        if (fullName && birthYear) {
             birthdays.push({ name: fullName, birthYear });
        }
    }
    
    internalDebugInfo.parsedItemsCount = birthdays.length;

    if (birthdays.length === 0 && ulContent.includes('<li>')) {
        const infoMsg = `Geen verjaardagen geparsed uit "Ook jarig" sectie voor ${formattedDateUrl}, hoewel lijstitems aanwezig lijken. Controleer regex en HTML structuur.`;
        internalDebugInfo.errorDetails = (internalDebugInfo.errorDetails ? internalDebugInfo.errorDetails + "; " : "") + infoMsg;
    }

    return { birthdays, error: null, debugInfo: internalDebugInfo };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij ophalen verjaardagen: ${error.message || 'Onbekend'}`;
    internalDebugInfo.errorDetails = errorMsg;
    return { birthdays: null, error: errorMsg, debugInfo: { ...internalDebugInfo, error } };
  }
}
