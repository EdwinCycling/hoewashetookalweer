
'use server';

export interface MovieData {
  rank: string;
  title: string;
  alternativeTitle?: string;
  genre: string;
  duration: string;
}

export interface FetchMoviesResult {
  movies: MovieData[] | null;
  error?: string | null;
  debugInfo?: any;
}

const MIN_MOVIE_YEAR = 1980;

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
 * Fetches top movies for a specific year from moviemeter.nl.
 *
 * @param year The year to fetch movie data for.
 * @returns An object containing an array of top movies or an error message.
 */
export async function fetchTopMoviesByYear(
  year: number
): Promise<FetchMoviesResult> {
  const YEAR_TO_ID_MAP: { [year: number]: number } = {
    1980: 2, 1981: 12, 1982: 27, 1983: 42, 1984: 55, 1985: 74, 1986: 92, 1987: 108, 1988: 130, 1989: 150,
    1990: 172, 1991: 191, 1992: 208, 1993: 227, 1994: 255, 1995: 280, 1996: 311, 1997: 337, 1998: 369, 1999: 404,
    2000: 443, 2001: 478, 2002: 521, 2003: 565, 2004: 616, 2005: 671, 2006: 726, 2007: 793, 2008: 856, 2009: 925,
    2010: 998, 2011: 1073, 2012: 1155, 2013: 1236, 2014: 1320, 2015: 1407, 2016: 1483, 2017: 1567, 2018: 1650, 2019: 1741,
    2020: 1830, 2021: 53408, 2022: 60733, 2023: 65108, 2024: 67503, 2025: 71137,
  };

  const currentYear = new Date().getFullYear();
  if (year < MIN_MOVIE_YEAR || year > currentYear + 1) { // Allow one year into the future for pre-data
    const errorMsg = `Filmdata is alleen beschikbaar van ${MIN_MOVIE_YEAR} tot en met ${currentYear + 1}. Gekozen jaar: ${year}.`;
    return { movies: null, error: errorMsg };
  }

  const movieIdForYear = YEAR_TO_ID_MAP[year];
  if (movieIdForYear === undefined) {
    const errorMsg = `Geen ID configuratie gevonden voor filmjaar ${year}. Kan filmdata niet ophalen.`;
    return { movies: null, error: errorMsg, debugInfo: { error: errorMsg } };
  }

  const url = `https://www.moviemeter.nl/toplijst/film/${movieIdForYear}/top-50-beste-films-uit-${year}`;
  
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7',
  };

  const internalDebugInfo: any = { requestedUrl: url, yearParameter: year, movieIdUsed: movieIdForYear };

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
      if (response.status === 404) { errorMsg = `Pagina voor filmdata niet gevonden voor ${year} (URL: ${internalDebugInfo.finalUrl}).`; }
      else if (response.status === 403) { errorMsg = `Toegang tot ${internalDebugInfo.finalUrl} geweigerd (403).`; }
      internalDebugInfo.errorDetails = errorMsg;
      return { movies: null, error: errorMsg, debugInfo: internalDebugInfo };
    }

    const movies: MovieData[] = [];
    const rowRegex = /<tr>(.*?)<\/tr>/gs;
    let tableBodyContent = '';

    const tbodyRegex = /<tbody>([\s\S]*?)<\/tbody>/gs;
    let tbodyMatch;
    let allTbodyContent = "";
    while ((tbodyMatch = tbodyRegex.exec(htmlContent)) !== null) {
        allTbodyContent += tbodyMatch[1];
    }

    if (!allTbodyContent) {
        return { movies: [], error: null, debugInfo: {...internalDebugInfo, warning: 'No <tbody> content found.'} };
    }
    tableBodyContent = allTbodyContent;

    let rowMatch;
    let movieCount = 0;
    
    while ((rowMatch = rowRegex.exec(tableBodyContent)) !== null && movieCount < 50) {
        const rowHtml = rowMatch[1];
        if (rowHtml.includes('mainpanel-bar') || rowHtml.includes('small-leaderboard')) { continue; }
        
        const rankRegex = /<td><a href="\/film\/\d+"><span>(\d+)<\/span><\/a><\/td>/s;
        const titleDetailsBlockRegex = /<h4><a.*?href="\/film\/\d+".*?>(.*?)<\/a><\/h4>([\s\S]*?)<div\s+class="mm_star[^"]*"/s;
        
        const rankMatch = rowHtml.match(rankRegex);
        const titleDetailsBlockMatch = rowHtml.match(titleDetailsBlockRegex);
        const rank = rankMatch ? rankMatch[1].trim() : "";
        let title = "";
        let detailsHtmlBlock = ""; 

        if (titleDetailsBlockMatch) {
            title = decodeHtmlEntities(titleDetailsBlockMatch[1].trim());
            detailsHtmlBlock = titleDetailsBlockMatch[2];
        } else { continue; }
        
        let alternativeTitle: string | undefined = undefined;
        const altTitleSpecificRegex = /<div class="sub altTitel">(.*?)<\/div>/s;
        const altTitleMatch = detailsHtmlBlock.match(altTitleSpecificRegex);
        if (altTitleMatch && altTitleMatch[1]) {
            alternativeTitle = decodeHtmlEntities(altTitleMatch[1].replace(/Alternatieve titel:/i, '').trim());
        }

        let genre = "";
        let duration = "";
        
        const subDivRegexGeneral = /<div class="sub(?: altTitel)?">([\s\S]*?)<\/div>/gs;
        let currentSubDivMatch;
        const potentialSubDetails = [];

        while((currentSubDivMatch = subDivRegexGeneral.exec(detailsHtmlBlock)) !== null) {
            const content = decodeHtmlEntities(currentSubDivMatch[1].trim());
            if (alternativeTitle && content.toLowerCase().replace('alternatieve titel:', '').trim() === alternativeTitle.toLowerCase()) { continue; }
            if (!alternativeTitle && content.toLowerCase().startsWith('alternatieve titel:')) {
                 alternativeTitle = content.replace(/Alternatieve titel:/i, '').trim();
                 continue;
            }
            potentialSubDetails.push(content);
        }
        
        for (const detail of potentialSubDetails) {
            if (detail.includes('minuten') && !duration) { duration = detail; } 
            else if (!genre && detail && !detail.match(/^\d+$/) && !detail.includes('minuten') && detail !== alternativeTitle) { genre = detail; }
        }
        
        if (genre === duration && duration) { 
            genre = ""; 
            for (const detail of potentialSubDetails) {
                 if (detail !== duration && !detail.match(/^\d+$/) && !genre && detail !== alternativeTitle) {
                    genre = detail;
                    break;
                 }
            }
        }
        
        if (rank && title && genre && duration) {
            title = title.replace(/\s*\(\d{4}\)$/, '').trim(); 
            movies.push({ rank, title, alternativeTitle, genre, duration });
            movieCount++;
        }
    }
    
    internalDebugInfo.parsedItemsCount = movies.length;
    if (movies.length === 0 && tableBodyContent.includes('<tr>')) {
        internalDebugInfo.warning = `No movies parsed for ${year}, though table rows were found. Check regex and HTML structure.`;
    }

    return { movies, error: null, debugInfo: internalDebugInfo };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij ophalen filmdata: ${error.message || 'Onbekend'}`;
    internalDebugInfo.errorDetails = errorMsg;
    return { movies: null, error: errorMsg, debugInfo: { ...internalDebugInfo, error } };
  }
}
