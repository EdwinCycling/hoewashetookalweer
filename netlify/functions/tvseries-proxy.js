const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    if (event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

    const { year } = event.queryStringParameters || {};
    
    if (!year) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Year parameter is required' })
      };
    }

    // TV Series ID mapping (same as in the TypeScript file)
    const YEAR_TO_ID_MAP_TVSERIES = {
      1990: 1, 1991: 2, 1992: 3, 1993: 4, 1994: 5, 1995: 6, 1996: 7, 1997: 8, 1998: 9, 1999: 10,
      2000: 11, 2001: 12, 2002: 13, 2003: 14, 2004: 15, 2005: 16, 2006: 17, 2007: 18, 2008: 19, 2009: 20,
      2010: 21, 2011: 22, 2012: 23, 2013: 24, 2014: 25, 2015: 75, 2016: 76, 2017: 77, 2018: 78, 2019: 79,
      2020: 80, 2021: 81, 2022: 82, 2023: 83, 2024: 84
    };

    const seriesId = YEAR_TO_ID_MAP_TVSERIES[parseInt(year)];
    if (!seriesId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: `No ID configuration found for TV series year ${year}` })
      };
    }

    const url = `https://www.moviemeter.nl/toplijst/serie/${seriesId}/top-10-beste-series-uit-${year}`;
    
    console.log(`TV Series Proxy: Fetching data for year ${year} from ${url}`);
    
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 second timeout
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'nl-NL,nl;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`TV Series Proxy: HTTP ${response.status} for year ${year}`);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: `Failed to fetch from moviemeter.nl: ${response.status} ${response.statusText}`,
          url: url,
          status: response.status,
          year: year
        })
      };
    }

    const htmlContent = await response.text();
    
    // Validate that we got actual HTML content
    if (!htmlContent || htmlContent.length < 100) {
      console.error(`TV Series Proxy: Insufficient content for year ${year}, length: ${htmlContent?.length || 0}`);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Insufficient HTML content received',
          year: year,
          contentLength: htmlContent?.length || 0
        })
      };
    }
    
    console.log(`TV Series Proxy: Successfully fetched ${htmlContent.length} characters for year ${year}`);
    
    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'text/html'
      },
      body: htmlContent
    };

  } catch (error) {
    console.error('Error in tvseries-proxy:', error);
    
    let errorMessage = 'Internal server error';
    let statusCode = 500;
    
    if (error.name === 'AbortError') {
      errorMessage = 'Request timeout - server took too long to respond';
      statusCode = 408;
    } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
      errorMessage = 'Network error - unable to reach external server';
      statusCode = 502;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return {
      statusCode: statusCode,
      headers,
      body: JSON.stringify({ 
        error: errorMessage,
        message: error.message,
        name: error.name,
        year: event.queryStringParameters?.year
      })
    };
  }
};
