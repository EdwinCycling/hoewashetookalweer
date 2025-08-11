
'use server';

import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

export interface KnmiMonthlyOverviewResult {
  paragraphs: string[] | null;
  error?: string | null;
  debugInfo?: {
    url: string;
    status?: number;
    statusText?: string;
    htmlContentLength?: number;
    htmlExcerpt?: string;
    foundDivsCount?: number;
    parsedParagraphsCount?: number;
    log: string[];
  };
}

// Helper function to decode common HTML entities
function decodeSpecificHtmlEntities(text: string): string {
    if (!text) return text;
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&deg;/g, '°')
        .replace(/&nbsp;/g, ' ')
        .replace(/&eacute;/g, 'é')
        .replace(/&egrave;/g, 'è')
        .replace(/&ecirc;/g, 'ê')
        .replace(/&euml;/g, 'ë')
        .replace(/&aacute;/g, 'á')
        .replace(/&agrave;/g, 'à')
        .replace(/&acirc;/g, 'â')
        .replace(/&auml;/g, 'ä')
        .replace(/&iacute;/g, 'í')
        .replace(/&igrave;/g, 'ì')
        .replace(/&icirc;/g, 'î')
        .replace(/&iuml;/g, 'ï')
        .replace(/&oacute;/g, 'ó')
        .replace(/&ograve;/g, 'ò')
        .replace(/&ocirc;/g, 'ô')
        .replace(/&ouml;/g, 'ö')
        .replace(/&uacute;/g, 'ú')
        .replace(/&ugrave;/g, 'ù')
        .replace(/&ucirc;/g, 'û')
        .replace(/&uuml;/g, 'ü')
        .replace(/&ccedil;/g, 'ç');
}


function cleanText(text: string | null): string {
  if (!text) return '';
  let cleaned = text
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '') // Remove style tags and their content
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // Remove script tags and their content
    .replace(/<[^>]+>/g, ''); // Strip all other HTML tags first

  cleaned = decodeSpecificHtmlEntities(cleaned); // Then decode entities

  return cleaned
    .replace(/\s+/g, ' ')    // Normalize whitespace
    .trim();
}

export async function fetchKnmiMonthlyOverview(
  year: number,
  monthIndex: number // 0-11 for Date object
): Promise<KnmiMonthlyOverviewResult> {
  const dateForMonthName = new Date(year, monthIndex);
  const monthNameDutch = format(dateForMonthName, 'MMMM', { locale: nl }).toLowerCase();
  const url = `https://www.knmi.nl/nederland-nu/klimatologie/maand-en-seizoensoverzichten/${year}/${monthNameDutch}`;

  const debugInfo: NonNullable<KnmiMonthlyOverviewResult['debugInfo']> = {
    url,
    log: [`[KNMI_MONTHLY_DEBUG] Fetching URL: ${url} (Year: ${year}, MonthName: ${monthNameDutch})`],
  };

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'HoeWasHetOokAlWeerApp/1.0 (KNMI Monthly Fetch)',
      },
      cache: 'no-store',
    });

    debugInfo.status = response.status;
    debugInfo.statusText = response.statusText;
    debugInfo.log.push(`[KNMI_MONTHLY_DEBUG] Response Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorMsg = `Fout bij ophalen KNMI maandoverzicht (${response.status} ${response.statusText}). URL: ${url}`;
      debugInfo.log.push(`[KNMI_MONTHLY_ERROR] Fetch Error: ${errorMsg}`);
      return { paragraphs: null, error: errorMsg, debugInfo };
    }

    const htmlContent = await response.text();
    debugInfo.htmlContentLength = htmlContent.length;
    if (process.env.NODE_ENV !== 'production') {
        debugInfo.htmlExcerpt = htmlContent.substring(0, 10000);
    }
    debugInfo.log.push(`[KNMI_MONTHLY_DEBUG] HTML content received. Length: ${htmlContent.length}`);

    const paragraphs: string[] = [];
    const divBlockRegex = /<div\s+(?=[^>]*?\bcol-sm-8\b)(?=[^>]*?\bcol-sm-offset-2\b)(?=[^>]*?\bcol-lg-8\b)(?=[^>]*?\bcol-lg-offset-2\b)(?=[^>]*?\beditable\b)(?=[^>]*?\beditable-table\b)(?=[^>]*?\bserif\b)[^>]*>([\s\S]*?)<\/div>/g;

    debugInfo.log.push(`[KNMI_MONTHLY_DEBUG] Regex for main div blocks: ${divBlockRegex.source}`);

    let divMatch;
    let foundDivsCount = 0;
    while ((divMatch = divBlockRegex.exec(htmlContent)) !== null) {
      foundDivsCount++;
      const divContent = divMatch[1];
      debugInfo.log.push(`[KNMI_MONTHLY_DEBUG] Found div block ${foundDivsCount}. Content length: ${divContent.length}. Preview (first 300 chars): ${divContent.substring(0,300).replace(/</g, '&lt;')}`);

      const pTagRegex = /<p(?:>|\s+[^>]*>)([\s\S]*?)<\/p>/g;
      let pMatch;
      let pTagsInDivCount = 0;
      while ((pMatch = pTagRegex.exec(divContent)) !== null) {
        pTagsInDivCount++;
        const cleanedP = cleanText(pMatch[1]);
        if (cleanedP) {
          paragraphs.push(cleanedP);
          debugInfo.log.push(`[KNMI_MONTHLY_DEBUG] Div ${foundDivsCount}, P ${pTagsInDivCount}: Extracted and cleaned paragraph. Length: ${cleanedP.length}. Text: "${cleanedP.substring(0,100)}..."`);
        } else {
          debugInfo.log.push(`[KNMI_MONTHLY_DEBUG] Div ${foundDivsCount}, P ${pTagsInDivCount}: Paragraph was empty after cleaning.`);
        }
      }
      if (pTagsInDivCount === 0) {
        debugInfo.log.push(`[KNMI_MONTHLY_DEBUG] Div ${foundDivsCount}: No <p> tags found within this div block.`);
      }
    }
    debugInfo.foundDivsCount = foundDivsCount;
    debugInfo.parsedParagraphsCount = paragraphs.length;

    if (foundDivsCount === 0) {
        debugInfo.log.push(`[KNMI_MONTHLY_WARN] No div blocks matching class "col-sm-8 col-sm-offset-2 col-lg-8 col-lg-offset-2 editable editable-table serif" were found.`);
    }
    debugInfo.log.push(`[KNMI_MONTHLY_DEBUG] Total div blocks matched: ${foundDivsCount}. Total paragraphs extracted: ${paragraphs.length}`);

    // Refined logic for truncation
    if (paragraphs.length > 0) {
        let textToTruncate = paragraphs[paragraphs.length - 1];
        let foundTruncation = false;

        // 1. First, search for "Vorig jaar"
        const vorigJaarIndex = textToTruncate.toLowerCase().indexOf("vorig jaar");
        if (vorigJaarIndex !== -1) {
            debugInfo.log.push(`[KNMI_MONTHLY_DEBUG] Found 'Vorig jaar' pattern in last paragraph at index ${vorigJaarIndex}.`);
            textToTruncate = textToTruncate.substring(0, vorigJaarIndex).trim();
            foundTruncation = true;
        }

        // 2. If "Vorig jaar" not found, try the "Normaal=" logic
        if (!foundTruncation) {
            const lowerLastParagraph = textToTruncate.toLowerCase();
            const normaalEqIndex = lowerLastParagraph.indexOf("normaal=");
            const normaalColonIndex = lowerLastParagraph.indexOf("normaal:");
            const normaalIsIndex = lowerLastParagraph.indexOf("normaal =");
            let foundPatternIndex = -1;

            if (normaalIsIndex !== -1) { foundPatternIndex = normaalIsIndex; } 
            else if (normaalEqIndex !== -1) { foundPatternIndex = normaalEqIndex; } 
            else if (normaalColonIndex !== -1) { foundPatternIndex = normaalColonIndex; }

            if (foundPatternIndex !== -1) {
                debugInfo.log.push(`[KNMI_MONTHLY_DEBUG] Found 'Normaal=' pattern in last paragraph at index ${foundPatternIndex}.`);
                textToTruncate = textToTruncate.substring(0, foundPatternIndex).trim();
                foundTruncation = true;
            } else {
                const startsWithNormaalSummary = /^(normaal|normale waarde|gemiddelde temperatuur normaal)/i.test(lowerLastParagraph) && textToTruncate.length < 150;
                if (startsWithNormaalSummary) {
                    debugInfo.log.push(`[KNMI_MONTHLY_DEBUG] Last paragraph starts with 'normaal' (no specific '=' or ':') and looks like a summary, removing it.`);
                    textToTruncate = ""; // Mark for removal
                    foundTruncation = true;
                }
            }
        }
        
        // Apply the truncation result
        if (foundTruncation) {
             if (textToTruncate) {
                paragraphs[paragraphs.length - 1] = textToTruncate;
                debugInfo.log.push(`[KNMI_MONTHLY_DEBUG] Truncated last paragraph. New content: "${textToTruncate.substring(0,100)}..."`);
            } else {
                paragraphs.pop();
                debugInfo.log.push(`[KNMI_MONTHLY_DEBUG] Last paragraph became empty after truncation, removed it.`);
            }
        }
    }


    if (paragraphs.length === 0) {
      const noDataMsg = `Geen paragraafdata gevonden in de specifieke div-blokken op ${url}. ${foundDivsCount > 0 ? 'Wel div-blokken gevonden, maar geen paragrafen daarin.' : 'Geen overeenkomende div-blokken gevonden.'}`;
      debugInfo.log.push(`[KNMI_MONTHLY_WARN] ${noDataMsg}`);
      return { paragraphs: null, error: noDataMsg, debugInfo };
    }

    return { paragraphs, error: null, debugInfo };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij ophalen/parsen KNMI maandoverzicht: ${error.message || 'Onbekend'}`;
    debugInfo.log.push(`[KNMI_MONTHLY_FATAL_ERROR_OUTER_CATCH] ${errorMsg}`);
    console.error(`[KNMI_MONTHLY_FATAL_ERROR_OUTER_CATCH] ${errorMsg}`, error);
    return { paragraphs: null, error: errorMsg, debugInfo };
  }
}
