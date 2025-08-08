
'use server';

import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

// Interface for the structured return data
export interface WikipediaYearEventsData {
  events: string[] | null;
  born: string[] | null;
  overleden: string[] | null; // Added field for deaths
  error?: string | null;
  pageTitle?: string; // Add page title for context
  // Removed debug fields for production safety
  // debugInfo?: {
  //   url: string;
  //   headers: Record<string, string>;
  //   status?: number;
  //   statusText?: string;
  //   rawWikitext?: string; // Add raw wikitext for debugging
  // };
}

/**
 * Fetches events, births, and deaths for a specific date and year from the Dutch Wikipedia page,
 * extracting items listed under the "Gebeurtenissen", "Geboren", and "Overleden" sections that match the given year.
 * Uses the MediaWiki Action API to get wikitext.
 *
 * @param day The day of the month (1-31).
 * @param month The month of the year (1-12).
 * @param year The specific year to filter items by.
 * @returns An object containing arrays of events, births, and deaths for the date and year, an error message, or null if no data found.
 */
export async function fetchWikipediaEventsForDate(
  day: number,
  month: number,
  year: number
): Promise<WikipediaYearEventsData> {
  const tempDateForMonthFormat = new Date(Date.UTC(2000, month - 1, 1)); // Use UTC to avoid timezone issues
  const monthName = format(tempDateForMonthFormat, 'MMMM', { locale: nl });
  const formattedDayMonthForTitle = `${day} ${monthName}`; // e.g., "5 mei"
  const wikiTitle = `${day}_${monthName}`; // Format for API: e.g., "5_mei"

  // Construct the URL for the MediaWiki Action API to get the full page's wikitext
  const url = `https://nl.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(wikiTitle)}&prop=wikitext&format=json&redirects=true`; // Added redirects=true

  const headers = {
    // Set a descriptive User-Agent as required by Wikimedia API policy
    'User-Agent': 'HoeWasHetOokAlWeerApp/1.0 (Development Build; contact: dev@example.com; info: https://example.com/hoewashetookalweer)',
    'Accept': 'application/json', // Standard JSON accept header for Action API
  };

  // Internal debug info, not returned
  const debugInfo: { url: string, headers: Record<string, string>, status?: number, statusText?: string, rawWikitext?: string } = { url, headers };

  try {
    const response = await fetch(url, {
      headers: headers,
      cache: 'no-store', // Use no-store to ensure fresh data
    });

    debugInfo.status = response.status;
    debugInfo.statusText = response.statusText;

    if (!response.ok) {
      let errorMsg = `Fout bij het ophalen van gegevens van Wikipedia API (${response.status}). Probeer het later opnieuw.`;
      if (response.status === 404) {
        errorMsg = `Wikipedia-pagina voor ${formattedDayMonthForTitle} niet gevonden via API.`;
      } else if (response.status === 403) {
        errorMsg = `Toegang tot Wikipedia API geweigerd (403 Forbidden). Controleer de User-Agent of API-beleid.`;
        // Include response text for more details on errors in server logs (if needed)
        try {
            const errorText = await response.text();
            debugInfo.statusText = debugInfo.statusText ? `${debugInfo.statusText} - ${errorText.substring(0, 200)}` : errorText.substring(0, 200);
        } catch (e) { /* Could not read error response body */ }
      }
      console.error(`Wikipedia Fetch Error: ${errorMsg}`, process.env.NODE_ENV !== 'production' ? debugInfo : {});
      return { events: null, born: null, overleden: null, error: errorMsg };
    }

    const data = await response.json();

    // Check if the 'parse' object and 'wikitext' property exist
    if (!data?.parse?.wikitext?.['*']) {
        if (data?.error?.code === 'missingtitle') {
            console.warn(`Wikipedia page not found: ${formattedDayMonthForTitle}`, process.env.NODE_ENV !== 'production' ? debugInfo : {});
            return { events: null, born: null, overleden: null, error: `Wikipedia-pagina voor ${formattedDayMonthForTitle} niet gevonden.`, pageTitle: formattedDayMonthForTitle };
        }
        console.error(`Could not find wikitext in Wikipedia API response for ${formattedDayMonthForTitle}.`, process.env.NODE_ENV !== 'production' ? { data, debugInfo } : {});
        return { events: null, born: null, overleden: null, error: `Kon wikitext niet vinden in het antwoord van de Wikipedia API voor ${formattedDayMonthForTitle}.`, pageTitle: formattedDayMonthForTitle };
    }

    const wikitext = data.parse.wikitext['*'];
    const actualPageTitle = data.parse.title || formattedDayMonthForTitle; // Use title from API if available
    if (process.env.NODE_ENV !== 'production') {
        debugInfo.rawWikitext = wikitext; // Store for potential server-side logging
    }


    const lines = wikitext.split('\n');
    // Regex to match the year link format * [[YYYY]] - or * [[YYYY]] –
    const yearLinkRegex = new RegExp(`^\\*\\s*\\[\\[${year}\\]\\]\\s*(?:-|–)\\s*(.*)`);
    // Regex to match the simple year format * YYYY - or * YYYY –
    const simpleYearRegex = new RegExp(`^\\*\\s*${year}\\s*(?:-|–)\\s*(.*)`);
    // Regex for event items ** [[YYYY]] - or ** [[YYYY]] –
    const eventYearLinkRegex = new RegExp(`^\\*\\*\\s*\\[\\[${year}\\]\\]\\s*(?:-|–)\\s*(.*)`);
    // Regex for event items ** YYYY - or ** YYYY –
    const eventSimpleYearRegex = new RegExp(`^\\*\\*\\s*${year}\\s*(?:-|–)\\s*(.*)`);

    // --- Extract Events ---
    let events: string[] = [];
    let inEventsSection = false;
    let currentEventCategory = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        // Detect start of "Gebeurtenissen" section
        if (trimmedLine.toLowerCase().startsWith('== gebeurtenissen ==')) {
            inEventsSection = true;
            currentEventCategory = ''; // Reset category when entering the section
            continue; // Move to the next line
        }

        // Detect end of "Gebeurtenissen" section (start of another main section)
        if (inEventsSection && trimmedLine.startsWith('==') && !trimmedLine.toLowerCase().startsWith('== gebeurtenissen ==')) {
            inEventsSection = false;
            break; // Stop processing lines for events
        }

        if (inEventsSection) {
             // Check for Category Header line (starts with '*' followed by {{Kopje dag ...}} or bold text)
             const categoryLineMatch = trimmedLine.match(/^\*\s*(?:\{\{Kopje dag\s+([^|}]+?)\s*(?:\|.*)?\}\}|'''([^']+)''')/i);

             if (categoryLineMatch) {
                  let categoryName = categoryLineMatch[1] || categoryLineMatch[2];
                  if (categoryName) {
                    categoryName = categoryName.trim();
                    const linkMatch = categoryName.match(/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/);
                    if(linkMatch && linkMatch[1]){
                        categoryName = linkMatch[1].trim();
                    }
                    currentEventCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
                  } else {
                       const templateEndIndex = trimmedLine.lastIndexOf('}}');
                       if (templateEndIndex !== -1) {
                           const potentialName = trimmedLine.substring(templateEndIndex + 2).replace(/^[*\'\s]*/, '').trim();
                           if (potentialName.length > 0 && !potentialName.startsWith('[[')) {
                               currentEventCategory = potentialName.charAt(0).toUpperCase() + potentialName.slice(1);
                           } else {
                                currentEventCategory = '';
                           }
                       } else {
                           currentEventCategory = '';
                       }
                  }
                  continue;
            }


            // Check for Event Item (starts with '**')
            if (trimmedLine.startsWith('**')) {
                const eventYearLinkMatch = trimmedLine.match(eventYearLinkRegex);
                const eventSimpleYearMatch = trimmedLine.match(eventSimpleYearRegex);

                let eventTextAfterYear: string | null = null;

                if (eventYearLinkMatch && eventYearLinkMatch[1]) {
                    eventTextAfterYear = eventYearLinkMatch[1].trim();
                } else if (eventSimpleYearMatch && eventSimpleYearMatch[1]) {
                    eventTextAfterYear = eventSimpleYearMatch[1].trim();
                }

                if (eventTextAfterYear !== null) {
                    let eventTextClean = stripWikitextFormatting(eventTextAfterYear);
                    if (eventTextClean.length > 0 && !trimmedLine.startsWith('** {{')) {
                        const formattedEvent = currentEventCategory ? `${currentEventCategory} - ${eventTextClean}` : eventTextClean;
                        events.push(formattedEvent);
                    }
                }
            }
        }
    }


    // --- Extract Births ---
    let births: string[] = [];
    let inBornSection = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        // Detect start of "Geboren" section
        if (trimmedLine.toLowerCase().startsWith('== geboren ==')) {
            inBornSection = true;
            continue;
        }

        // Detect end of "Geboren" section
        if (inBornSection && trimmedLine.startsWith('==') && !trimmedLine.toLowerCase().startsWith('== geboren ==')) {
            inBornSection = false;
            break;
        }

        if (inBornSection) {
             // Check for Birth Item (starts with '*', not '**')
            if (trimmedLine.startsWith('*') && !trimmedLine.startsWith('**')) {
                 const birthYearMatch = trimmedLine.match(yearLinkRegex);
                 const simpleBirthYearMatch = trimmedLine.match(simpleYearRegex);

                 let birthTextAfterYear: string | null = null;

                 if (birthYearMatch && birthYearMatch[1]) {
                     birthTextAfterYear = birthYearMatch[1].trim();
                 } else if (simpleBirthYearMatch && simpleBirthYearMatch[1]) {
                      birthTextAfterYear = simpleBirthYearMatch[1].trim();
                 }

                 if (birthTextAfterYear !== null) {
                     let birthTextClean = stripWikitextFormatting(birthTextAfterYear);
                     if (birthTextClean.length > 0 && !trimmedLine.startsWith('* {{')) {
                         births.push(birthTextClean);
                     }
                 }
            }
        }
    }

    // --- Extract Deaths ---
    let overleden: string[] = [];
    let inOverledenSection = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        // Detect start of "Overleden" section
        if (trimmedLine.toLowerCase().startsWith('== overleden ==')) {
            inOverledenSection = true;
            continue;
        }

        // Detect end of "Overleden" section
        if (inOverledenSection && trimmedLine.startsWith('==') && !trimmedLine.toLowerCase().startsWith('== overleden ==')) {
            inOverledenSection = false;
            break;
        }

        if (inOverledenSection) {
             // Check for Death Item (starts with '*', not '**')
            if (trimmedLine.startsWith('*') && !trimmedLine.startsWith('**')) {
                 const deathYearMatch = trimmedLine.match(yearLinkRegex);
                 const simpleDeathYearMatch = trimmedLine.match(simpleYearRegex);

                 let deathTextAfterYear: string | null = null;

                 if (deathYearMatch && deathYearMatch[1]) {
                     deathTextAfterYear = deathYearMatch[1].trim();
                 } else if (simpleDeathYearMatch && simpleDeathYearMatch[1]) {
                      deathTextAfterYear = simpleDeathYearMatch[1].trim();
                 }

                 if (deathTextAfterYear !== null) {
                     let deathTextClean = stripWikitextFormatting(deathTextAfterYear);
                     if (deathTextClean.length > 0 && !trimmedLine.startsWith('* {{')) {
                         overleden.push(deathTextClean);
                     }
                 }
            }
        }
    }


    if (events.length === 0 && births.length === 0 && overleden.length === 0) {
      console.log(`No relevant data found for year ${year} on page ${actualPageTitle}.`, process.env.NODE_ENV !== 'production' ? debugInfo : {});
      // Return null for all if no section yields results for the year
      return { events: null, born: null, overleden: null, error: null, pageTitle: actualPageTitle };
    }

    return {
        events: events.length > 0 ? events : null,
        born: births.length > 0 ? births : null,
        overleden: overleden.length > 0 ? overleden : null,
        error: null,
        pageTitle: actualPageTitle,
        // debugInfo: null // Not returned
    };

  } catch (error: any) {
    debugInfo.statusText = (debugInfo.statusText || '') + ` Client-side Error: ${(error.message || 'Unknown fetch error')}`;
    console.error(`Wikipedia Fetch Exception: ${error.message || 'Unknown'}`, process.env.NODE_ENV !== 'production' ? debugInfo : {});
    return { events: null, born: null, overleden: null, error: `Er is een onverwachte fout opgetreden bij het verwerken van Wikipedia-gegevens. (${error.message || 'Unknown'})` };
  }
}

/**
 * Basic wikitext formatting stripper. Removes common markup like links, italics, bold, refs, templates, comments.
 * More specific than the previous version to avoid removing valid text.
 */
function stripWikitextFormatting(wikitext: string): string {
  if (!wikitext) return '';
  let text = wikitext;

  // Remove internal links: [[Page|Display]] or [[Page]] -> Display or Page
  text = text.replace(/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g, '$1');
  // Remove external links: [http://... Display] -> Display or [http://...] -> ''
  text = text.replace(/\[https?:\/\/[^ ]+ ([^\]]+)\]/g, '$1');
  text = text.replace(/\[https?:\/\/[^ ]+\]/g, '');
  // Remove bold/italics: '''bold''' -> bold or ''italics'' -> italics
  text = text.replace(/'''([^']+)'''/g, '$1');
  text = text.replace(/''([^']+)''/g, '$1');
  // Remove simple templates like {{doden}}, {{Citeer web ...}}, {{Gebu}} (basic, non-greedy)
  // Avoid removing {{Kopje dag...}} as it's handled earlier, but target others
  text = text.replace(/\{\{(?!Kopje dag\s)(?:[^{}]|\{\{[^{}]*\}\})*?\}\}/g, '');
  // Remove HTML comments
  text = text.replace(/<!--.*?-->/gs, '');
  // Remove <ref> tags and their content (including self-closing)
  text = text.replace(/<ref[^>]*>.*?<\/ref>/gs, '');
  text = text.replace(/<ref[^>]*?\/>/gs, '');
   // Remove other simple HTML tags (like <sup>, <sub>, <span> - basic cleanup)
  text = text.replace(/<\/?(sup|sub|span|small|nowiki|br|ref|references)[^>]*>/gi, ''); // Added ref, br, references, case-insensitive
  // Decode common HTML entities
  text = decodeHtmlEntities(text);
  // Normalize whitespace (multiple spaces to one, trim start/end)
  text = text.replace(/\s+/g, ' ').trim();
   // Remove trailing punctuation often left after removing refs/templates
  text = text.replace(/[.,;:]\s*$/, '').trim();
   // Remove specific unwanted prefixes/suffixes like "(overleden YYYY)", "(YY jaar)", "(circa YY)"
  text = text.replace(/\(overleden\s+\d{4}\)/gi, '').trim(); // Case insensitive
  text = text.replace(/\(\d+\s*(?:jaar)?\)/g, '').trim(); // Remove age indicators like (XX) or (XX jaar)
  text = text.replace(/\(circa\s+\d+\)/gi, '').trim(); // Remove (circa YY)
  text = text.replace(/\(ca\.\s+\d+\)/gi, '').trim(); // Remove (ca. YY)

  // Remove leading/trailing commas or hyphens that might be left
  text = text.replace(/^[,\s-]+|[-\s,]+$/g, '').trim();

  return text;
}


/**
 * Decodes common HTML entities.
 */
function decodeHtmlEntities(text: string): string {
    return text
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&ndash;/g, '–') // en dash
        .replace(/&mdash;/g, '—'); // em dash
        // Add more if needed
}
