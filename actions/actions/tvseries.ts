
'use server';

export interface TVSeriesData {
  rank: string;
  title: string;
  genre?: string;
  network?: string;
  rating?: string;
}

export interface FetchTVSeriesResult {
  series: TVSeriesData[] | null;
  error?: string | null;
  debugInfo?: any;
}

const MIN_TVSERIES_YEAR = 1982; 

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
 * Fetches top TV series for a specific year from moviemeter.nl.
 *
 * @param year The year to fetch TV series data for.
 * @returns An object containing an array of top TV series or an error message.
 */
export async function fetchTopTVSeriesByYear(
  year: number
): Promise<FetchTVSeriesResult> {
  const YEAR_TO_ID_MAP_TVSERIES: { [year: number]: number } = {
    1982: 9850, 1983: 7058, 1984: 2, 1985: 8344, 1986: 8345, 1987: 3, 1988: 4, 1989: 5,
    1990: 6, 1991: 7, 1992: 8, 1993: 9, 1994: 10, 1995: 11, 1996: 12, 1997: 13, 1998: 14, 1999: 15,
    2000: 17, 2001: 18, 2002: 19, 2003: 20, 2004: 21, 2005: 23, 2006: 28, 2007: 30, 2008: 32, 2009: 33,
    2010: 38, 2011: 45, 2012: 52, 2013: 59, 2014: 67, 2015: 75, 2016: 89, 2017: 100, 2018: 117, 2019: 127,
    2020: 133, 2021: 7755, 2022: 9368, 2023: 11338, 2024: 12914, 2025: 15437,
  };

  const currentYear = new Date().getFullYear();
  if (year < MIN_TVSERIES_YEAR || year > currentYear) {
    const errorMsg = `TV series data is alleen beschikbaar van ${MIN_TVSERIES_YEAR} tot en met ${currentYear}. Gekozen jaar: ${year}.`;
    return { series: null, error: errorMsg };
  }

  const seriesIdForYear = YEAR_TO_ID_MAP_TVSERIES[year];
  if (seriesIdForYear === undefined) {
    const errorMsg = `Geen ID configuratie gevonden voor TV series jaar ${year}. Kan data niet ophalen.`;
    return { series: null, error: errorMsg, debugInfo: { error: errorMsg } };
  }
  
  const url = `https://www.moviemeter.nl/toplijst/serie/${seriesIdForYear}/top-10-beste-series-uit-${year}`;
  
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7',
  };

  const internalDebugInfo: any = { requestedUrl: url, yearParameter: year, seriesIdUsed: seriesIdForYear };

  try {
    const response = await fetch(url, { headers, cache: 'no-store' });
    internalDebugInfo.finalUrl = response.url;
    internalDebugInfo.status = response.status;
    internalDebugInfo.statusText = response.statusText;

    const htmlContent = await response.text();
    if (process.env.NODE_ENV !== 'production') {
        internalDebugInfo.rawHtmlExcerpt = htmlContent.substring(0, 20000); 
    }
    
    if (!response.ok) {
      let errorMsg = `Fout bij ophalen van ${internalDebugInfo.finalUrl} (oorspronkelijk ${url}) (${response.status}).`;
      if (response.status === 404) { errorMsg = `Pagina voor TV series data niet gevonden voor ${year} (URL: ${internalDebugInfo.finalUrl}).`; }
      else if (response.status === 403) { errorMsg = `Toegang tot ${internalDebugInfo.finalUrl} geweigerd (403).`; }
      internalDebugInfo.errorDetails = errorMsg;
      return { series: null, error: errorMsg, debugInfo: internalDebugInfo };
    }

    const seriesList: TVSeriesData[] = [];
    const rowRegex = /<tr>(.*?)<\/tr>/gs;
    let tableBodyContent = '';

    const tbodyRegex = /<tbody>([\s\S]*?)<\/tbody>/gs;
    let tbodyMatch;
    let allTbodyContent = "";
    while ((tbodyMatch = tbodyRegex.exec(htmlContent)) !== null) {
        allTbodyContent += tbodyMatch[1];
    }

    if (!allTbodyContent) {
        return { series: [], error: null, debugInfo: {...internalDebugInfo, warning: 'No <tbody> content found.'} };
    }
    tableBodyContent = allTbodyContent;

    let rowMatch;
    let seriesCount = 0;
    
    while ((rowMatch = rowRegex.exec(tableBodyContent)) !== null && seriesCount < 10) {
        const rowHtml = rowMatch[1];

        const rankRegex = /<td><a href="\/series\/show\/\d+"><span>(\d+)<\/span><\/a><\/td>/s;
        const titleDetailsBlockRegex = /<h4><a.*?href="\/series\/show\/\d+".*?>(.*?)<\/a><\/h4>([\s\S]*?)(?:<div\s+class="mm_star[^"]*"|<div\s+class="slCommentsReviews">|<\/td>)/s;
        
        const rankMatch = rowHtml.match(rankRegex);
        const titleDetailsBlockMatch = rowHtml.match(titleDetailsBlockRegex);

        const rank = rankMatch ? rankMatch[1].trim() : "";
        let title = "";
        let detailsHtmlBlock = ""; 

        if (titleDetailsBlockMatch) {
            title = decodeHtmlEntities(titleDetailsBlockMatch[1].trim());
            detailsHtmlBlock = titleDetailsBlockMatch[2];
        } else { continue; }
        
        let genre: string | undefined = undefined;
        let network: string | undefined = undefined;
        
        const subDivRegexGeneral = /<div class="sub(?:[^"]*)?">([\s\S]*?)<\/div>/gs;
        let currentSubDivMatch;
        const potentialSubDetails: string[] = [];
        while((currentSubDivMatch = subDivRegexGeneral.exec(detailsHtmlBlock)) !== null) {
            potentialSubDetails.push(decodeHtmlEntities(currentSubDivMatch[1].trim()));
        }
        
        for (const detail of potentialSubDetails) {
            if (detail.includes('minuten')) continue;
            if (!genre && detail && !detail.match(/^\d+$/)) { genre = detail; } 
            else if (!network && detail && detail !== genre && !detail.match(/^\d+$/)) { network = detail; }
        }
        if (genre === network && network) { network = undefined; }

        let rating: string | undefined = undefined;
        const ratingStrongRegex = /<div class="mm_star[^"]*">\s*<strong>([^<]+)<\/strong>/s;
        const ratingSpanRegex = /<div class="mm_star[^"]*">\s*([0-9,.]+)(?:<span>.*<\/span>)?/s;

        let ratingMatch = rowHtml.match(ratingStrongRegex);
        if (ratingMatch && ratingMatch[1]) { rating = ratingMatch[1].trim(); } 
        else {
            ratingMatch = rowHtml.match(ratingSpanRegex);
            if (ratingMatch && ratingMatch[1]) { rating = ratingMatch[1].trim(); }
        }
        
        if (title) {
            title = title.replace(/\s*\(\d{4}-\d{4}\)$/, '').replace(/\s*\(\d{4}\)$/, '').trim(); 
        }

        if (rank && title) {
            seriesList.push({ rank, title, genre, network, rating });
            seriesCount++;
        }
    }
    
    internalDebugInfo.parsedItemsCount = seriesList.length;
    if (seriesList.length === 0 && tableBodyContent.includes('<tr>')) {
        internalDebugInfo.warning = `No TV series parsed for ${year}, though table rows were found. Check regex and HTML structure.`;
    }

    return { series: seriesList, error: null, debugInfo: internalDebugInfo };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij ophalen TV series data: ${error.message || 'Onbekend'}`;
    internalDebugInfo.errorDetails = errorMsg;
    return { series: null, error: errorMsg, debugInfo: { ...internalDebugInfo, error } };
  }
}
