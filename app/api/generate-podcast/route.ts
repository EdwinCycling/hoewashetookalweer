import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Check if Gemini API key is available
if (!process.env.GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY not found in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { date, event, name, historicalData, userId, userEmail } = await request.json();

    if (!date || !event || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: date, event, name' },
        { status: 400 }
      );
    }

    // Check if Gemini API key is available
    const hasValidApiKey = process.env.GEMINI_API_KEY && 
                          process.env.GEMINI_API_KEY.trim() !== '' && 
                          process.env.GEMINI_API_KEY.trim() !== 'undefined';
    
    if (!hasValidApiKey) {
      console.warn('GEMINI_API_KEY not found, empty, or undefined in environment variables');
      
      // For development, return a mock response instead of an error
      if (process.env.NODE_ENV === 'development') {
        const mockScript = `Op ${date} was het een prachtige dag met een aangename temperatuur van 22 graden en een heldere hemel. De zon scheen volop met een UV-index van 6, en er stond een lichte wind van Beaufort 2. De luchtvochtigheid was 65% en de luchtdruk was 1015 hPa - perfect weer voor ${name} om ${event} te vieren! Een moment om nooit te vergeten. Maar wat maakte deze dag ook historisch interessant? In de wereld van entertainment waren er tal van ontwikkelingen. Populaire films draaiden in de bioscoop, bekende TV series waren op televisie te zien, en er waren interessante nieuwsberichten. In de muziekwereld waren er nieuwe releases, en in de literatuur verschenen er bestsellers. Sportevenementen vonden plaats, wetenschappelijke ontdekkingen werden gedaan, en er waren zakelijke en politieke ontwikkelingen. Het is fascinerend om te bedenken dat terwijl ${name} deze speciale ${event} vierde, de wereld om ons heen ook vol leven en verhalen was. Een perfecte combinatie van persoonlijke vreugde en uitgebreide historische context.`;

        return NextResponse.json({
          success: true,
          script: mockScript,
          message: 'Podcast script succesvol gegenereerd (demo modus - geen API key)',
          audioUrl: null,
          debug: {
            exists: !!process.env.GEMINI_API_KEY,
            length: process.env.GEMINI_API_KEY?.length || 0,
            value: process.env.GEMINI_API_KEY || 'undefined'
          }
        });
      }
      
      return NextResponse.json(
        { error: 'Gemini API key niet geconfigureerd. Neem contact op met de beheerder.' },
        { status: 500 }
      );
    }

    // Check if user has already generated a podcast today (only for non-admin users)
    const today = new Date().toISOString().split('T')[0];
    const isAdmin = await checkIfUserIsAdmin(userId, userEmail);
    
    if (!isAdmin) {
      const existingPodcast = await checkUserDailyPodcast(userId, today);
      
      if (existingPodcast) {
        return NextResponse.json(
          { error: 'Je hebt vandaag al een podcast gegenereerd. Probeer het morgen opnieuw.' },
          { status: 429 }
        );
      }
    }

    // Prepare data summary for the podcast
    const dataSummary = prepareDataForPodcast(historicalData);
    
    // Generate script with Gemini 2.0 Flash
    let script: string;
    try {
      script = await generateScriptWithGemini(date, event, name, dataSummary);
    } catch (error) {
      console.error('Error generating script with Gemini:', error);
      
      // For development, return a mock response if Gemini fails
      if (process.env.NODE_ENV === 'development') {
        const mockScript = `Op ${date} was het een prachtige dag met een aangename temperatuur van 22 graden en een heldere hemel. De zon scheen volop met een UV-index van 6, en er stond een lichte wind van Beaufort 2. De luchtvochtigheid was 65% en de luchtdruk was 1015 hPa - perfect weer voor ${name} om ${event} te vieren! Een moment om nooit te vergeten. Maar wat maakte deze dag ook historisch interessant? In de wereld van entertainment waren er tal van ontwikkelingen. Populaire films draaiden in de bioscoop, bekende TV series waren op televisie te zien, en er waren interessante nieuwsberichten. In de muziekwereld waren er nieuwe releases, en in de literatuur verschenen er bestsellers. Sportevenementen vonden plaats, wetenschappelijke ontdekkingen werden gedaan, en er waren zakelijke en politieke ontwikkelingen. Het is fascinerend om te bedenken dat terwijl ${name} deze speciale ${event} vierde, de wereld om ons heen ook vol leven en verhalen was. Een perfecte combinatie van persoonlijke vreugde en uitgebreide historische context.`;

        return NextResponse.json({
          success: true,
          script: mockScript,
          message: 'Podcast script succesvol gegenereerd (demo modus - Gemini API fout)',
          audioUrl: null
        });
      }
      
      throw error; // Re-throw for production
    }

    // Generate audio with Gemini 2.5 TTS
    let audioUrl: string | null = null;
    try {
      audioUrl = await generateAudioWithGeminiTTS(script);
    } catch (error) {
      console.error('Error generating audio with Gemini TTS:', error);
      // Continue without audio - user can still use text-to-speech
      audioUrl = null;
    }
    
    // Log the podcast generation (mock implementation)
    await logPodcastGeneration(userId, date, event);

    return NextResponse.json({
      success: true,
      script,
      message: 'Podcast script succesvol gegenereerd!',
      audioUrl
    });

  } catch (error) {
    console.error('Error generating podcast:', error);
    
    // For development, provide more detailed error information
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json(
        {
          error: 'Er is een fout opgetreden bij het genereren van de podcast.',
          details: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      {
        error: 'Er is een fout opgetreden bij het genereren van de podcast.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function generateScriptWithGemini(date: string, event: string, name: string, dataSummary: string): Promise<string> {
  try {
    // Check if Gemini API key is available
    const hasValidApiKey = process.env.GEMINI_API_KEY && 
                          process.env.GEMINI_API_KEY.trim() !== '' && 
                          process.env.GEMINI_API_KEY.trim() !== 'undefined';
    
    if (!hasValidApiKey) {
      throw new Error('Gemini API key niet geconfigureerd');
    }
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `Je bent een professionele podcast schrijver die een dialoog script schrijft voor een Nederlandse podcast met 2 karakters.

Je taak is om een boeiend podcast dialoog script te maken gebaseerd op de volgende details:

GEBEURTENIS: ${event}
NAAM: ${name}
DATUM: ${date}
HISTORISCHE CONTEXT: ${dataSummary}

Richtlijnen voor het script:
- Schrijf in natuurlijke, conversatie-achtige Nederlandse podcast stijl
- Maak een dialoog tussen 2 karakters: "Marieke" (enthousiast en vrolijk) en "Thomas" (moe en verveeld)
- De output moet een dialoog zijn met duidelijke spreker labels: "Marieke:" en "Thomas:"
- Creëer een warm, persoonlijk verhaal dat voelt alsof twee vrienden een verhaal delen
- **MOET specifieke historische feiten integreren uit de verstrekte data**
- Maak het langer en rijker (4-6 minuten wanneer gesproken) - voeg VEEL feiten en details toe
- Weef meerdere historische draden samen om een uitgebreid beeld te creëren

**KRITIEKE INSTRUCTIES:**
- **GEEN** Markdown formatting gebruiken
- **GEEN** conversatie vulstof zoals "Welkom bij deze podcast..."
- **GEEN** aankondiging van wat je doet. Geef gewoon het verhaal direct
- Schrijf in het Nederlands, gebruik natuurlijke Nederlandse uitdrukkingen en flow
- Maak het persoonlijk en emotioneel, alsof twee vrienden een verhaal delen
- **START met gedetailleerde weersbeschrijving - maak het zeer kleurrijk en sfeervol**
- **MOET VEEL specifieke feiten vermelden uit ALLE beschikbare datacategorieën**
- **Inclusief weersdetails, films, TV shows, nieuws, gebeurtenissen, muziek, boeken, sport, wetenschap, zaken, politiek, technologie**
- **NIET te veel focussen op de persoonlijke gebeurtenis - balans met uitgebreide historische context**
- **NOOIT vermelden "er gebeurde die dag geen wereldgebeurtenissen" of vergelijkbare negatieve uitspraken**
- Structuur: Start met gedetailleerd weer, dan persoonlijke gebeurtenis, dan weef door ALLE historische feiten, eindig met persoonlijke touch
- Maak verbindingen tussen verschillende historische gebeurtenissen wanneer mogelijk
- Gebruik overgangszinnen om soepel tussen verschillende onderwerpen te bewegen

Karakter persoonlijkheden:
- **Marieke**: Enthousiast, vrolijk, nieuwsgierig, stelt veel vragen, vindt alles interessant
- **Thomas**: Moe, verveeld, sceptisch, maar wordt langzaam enthousiaster door Marieke's enthousiasme

Voorbeeld structuur:
"Marieke: Hé Thomas, weet je nog die dag van ${date}? Het was zo'n prachtige dag! [Gedetailleerde weersbeschrijving met Beaufort schaal, regen, druk, etc.]
Thomas: Ja, ja... [moe] Wat was er zo bijzonder aan dan?
Marieke: [enthousiast] Nou, het was perfect weer voor ${name} om ${event} te vieren! [Persoonlijke touch]. Maar wat maakte deze dag ook historisch interessant? [Gedetailleerde film/TV feiten met genres en ratings] [Uitgebreide nieuwscoverage] [Historische gebeurtenissen met locaties] [Populaire muziek en boeken] [Sportprestaties] [Wetenschappelijke ontdekkingen] [Zakelijke ontwikkelingen] [Politieke gebeurtenissen] [Technologische innovaties] [Persoonlijke verbinding met al deze geschiedenis]"

Focus op het creëren van een rijk, uitgebreid verhaal dat de persoonlijke betekenis van deze ${event} voor ${name} balanceert met de uitgebreide historische context van ${date}, beginnend met een zeer gedetailleerde weersbeschrijving en inclusief zoveel mogelijk feiten uit alle beschikbare databronnen.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error('Gemini API error:', error);
    
    // For development, provide more detailed error information
    if (process.env.NODE_ENV === 'development') {
      if (error instanceof Error) {
        throw new Error(`Gemini API fout: ${error.message}`);
      } else {
        throw new Error(`Gemini API fout: ${String(error)}`);
      }
    }
    
    throw new Error('Fout bij het genereren van het script met Gemini API');
  }
}

async function generateAudioWithGeminiTTS(script: string): Promise<string | null> {
  try {
    // Check if Gemini API key is available
    const hasValidApiKey = process.env.GEMINI_API_KEY && 
                          process.env.GEMINI_API_KEY.trim() !== '' && 
                          process.env.GEMINI_API_KEY.trim() !== 'undefined';
    
    if (!hasValidApiKey) {
      throw new Error('Gemini API key niet geconfigureerd');
    }

    // TODO: Gemini TTS API is not yet available in the official @google/generative-ai package
    // When it becomes available, we can use the following structure:
    /*
    const response = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: script }] }],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          multiSpeakerVoiceConfig: {
            speakerVoiceConfigs: [
              {
                speaker: 'Marieke',
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Sulafat' }
                }
              },
              {
                speaker: 'Thomas', 
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Umbriel' }
                }
              }
            ]
          }
        }
      }
    });
    */

    console.log('Gemini TTS API not yet available in official package - using fallback to browser TTS');
    console.log('To use TTS, you need to use the experimental Google GenAI package or wait for official support');
    
    // For now, return null to use browser text-to-speech as fallback
    return null;
    
  } catch (error) {
    console.error('Gemini TTS API error:', error);
    
    // For development, provide more detailed error information
    if (process.env.NODE_ENV === 'development') {
      if (error instanceof Error) {
        throw new Error(`Gemini TTS API fout: ${error.message}`);
      } else {
        throw new Error(`Gemini TTS API fout: ${String(error)}`);
      }
    }
    
    throw new Error('Fout bij het genereren van audio met Gemini TTS API');
  }
}

function prepareDataForPodcast(historicalData: any): string {
  if (!historicalData || typeof historicalData !== 'object') {
    return 'Geen specifieke historische data beschikbaar voor deze datum.';
  }

  try {
    const summary = [];
    
    // Extract key data points with much more specific details
    if (historicalData.weather) {
      const temp = historicalData.weather.temperature;
      const condition = historicalData.weather.condition || historicalData.weather.description || 'onbekend';
      const humidity = historicalData.weather.humidity;
      const windSpeed = historicalData.weather.wind_speed || historicalData.weather.windSpeed;
      const pressure = historicalData.weather.pressure;
      const rain = historicalData.weather.rain || historicalData.weather.precipitation;
      const visibility = historicalData.weather.visibility;
      const uvIndex = historicalData.weather.uv_index || historicalData.weather.uvIndex;
      
      let weatherDesc = '';
      if (temp) {
        weatherDesc = `De temperatuur was ${temp} graden`;
        if (temp < 0) weatherDesc += ' - een koude winterdag met mogelijk ijsvorming';
        else if (temp < 5) weatherDesc += ' - fris en winters';
        else if (temp < 10) weatherDesc += ' - koud maar aangenaam voor een winterwandeling';
        else if (temp < 15) weatherDesc += ' - een frisse lente- of herfstdag';
        else if (temp < 20) weatherDesc += ' - een heerlijke, milde dag';
        else if (temp < 25) weatherDesc += ' - warm en zonnig, perfect voor buitenactiviteiten';
        else if (temp < 30) weatherDesc += ' - een hete zomerdag';
        else weatherDesc += ' - een extreem hete dag';
      }
      
      if (condition && condition !== 'onbekend') {
        weatherDesc += ` met ${condition}`;
        if (condition.toLowerCase().includes('regen')) {
          weatherDesc += ' - een natte dag';
        } else if (condition.toLowerCase().includes('zon')) {
          weatherDesc += ' - een zonnige dag';
        } else if (condition.toLowerCase().includes('bewolkt')) {
          weatherDesc += ' - een bewolkte dag';
        }
      }
      
      if (humidity) {
        weatherDesc += `. De luchtvochtigheid was ${humidity}%`;
        if (humidity > 80) weatherDesc += ' - zeer vochtig';
        else if (humidity > 60) weatherDesc += ' - vochtig';
        else if (humidity < 30) weatherDesc += ' - droog';
      }
      
      if (windSpeed) {
        // Convert to Beaufort scale
        let beaufort = 0;
        let windDesc = '';
        if (windSpeed < 1) { beaufort = 0; windDesc = 'windstil'; }
        else if (windSpeed < 6) { beaufort = 1; windDesc = 'zwakke wind (Beaufort 1)'; }
        else if (windSpeed < 12) { beaufort = 2; windDesc = 'zwakke wind (Beaufort 2)'; }
        else if (windSpeed < 19) { beaufort = 3; windDesc = 'matige wind (Beaufort 3)'; }
        else if (windSpeed < 28) { beaufort = 4; windDesc = 'matige wind (Beaufort 4)'; }
        else if (windSpeed < 39) { beaufort = 5; windDesc = 'vrij krachtige wind (Beaufort 5)'; }
        else if (windSpeed < 50) { beaufort = 6; windDesc = 'krachtige wind (Beaufort 6)'; }
        else if (windSpeed < 62) { beaufort = 7; windDesc = 'harde wind (Beaufort 7)'; }
        else if (windSpeed < 75) { beaufort = 8; windDesc = 'stormachtige wind (Beaufort 8)'; }
        else { beaufort = 9; windDesc = 'storm (Beaufort 9+)'; }
        
        weatherDesc += `. Er stond een ${windDesc}`;
      }
      
      if (rain) {
        weatherDesc += `. Er viel ${rain}mm regen`;
        if (rain < 1) weatherDesc += ' - lichte regen';
        else if (rain < 5) weatherDesc += ' - matige regen';
        else if (rain < 10) weatherDesc += ' - stevige regen';
        else weatherDesc += ' - zware regen';
      }
      
      if (pressure) {
        weatherDesc += `. De luchtdruk was ${pressure} hPa`;
        if (pressure > 1020) weatherDesc += ' - hoge druk, meestal goed weer';
        else if (pressure < 1000) weatherDesc += ' - lage druk, mogelijk slecht weer';
      }
      
      if (visibility) {
        weatherDesc += `. Het zicht was ${visibility}km`;
        if (visibility < 1) weatherDesc += ' - zeer slecht zicht';
        else if (visibility < 5) weatherDesc += ' - slecht zicht';
        else if (visibility > 10) weatherDesc += ' - uitstekend zicht';
      }
      
      if (uvIndex) {
        weatherDesc += `. De UV-index was ${uvIndex}`;
        if (uvIndex < 3) weatherDesc += ' - laag, veilig voor de huid';
        else if (uvIndex < 6) weatherDesc += ' - matig, bescherming aanbevolen';
        else if (uvIndex < 8) weatherDesc += ' - hoog, extra bescherming nodig';
        else weatherDesc += ' - zeer hoog, vermijd de zon';
      }
      
      summary.push(weatherDesc);
    }
    
    if (historicalData.films && historicalData.films.length > 0) {
      const films = historicalData.films.slice(0, 5);
      const filmDetails = films.map((f: any) => {
        const title = f.title || f.name || 'Onbekende film';
        const year = f.year || f.release_date ? new Date(f.release_date).getFullYear() : '';
        const genre = f.genre || f.genres?.[0] || '';
        const rating = f.rating || f.vote_average || '';
        let filmInfo = title;
        if (year) filmInfo += ` (${year})`;
        if (genre) filmInfo += ` - ${genre}`;
        if (rating) filmInfo += ` - ${rating}/10`;
        return filmInfo;
      }).join(', ');
      summary.push(`Populaire films in de bioscoop waren: ${filmDetails}`);
    }
    
    if (historicalData.tv_series && historicalData.tv_series.length > 0) {
      const series = historicalData.tv_series.slice(0, 5);
      const seriesDetails = series.map((s: any) => {
        const title = s.title || s.name || 'Onbekende serie';
        const year = s.year || s.first_air_date ? new Date(s.first_air_date).getFullYear() : '';
        const genre = s.genre || s.genres?.[0] || '';
        const rating = s.rating || s.vote_average || '';
        let seriesInfo = title;
        if (year) seriesInfo += ` (${year})`;
        if (genre) seriesInfo += ` - ${genre}`;
        if (rating) seriesInfo += ` - ${rating}/10`;
        return seriesInfo;
      }).join(', ');
      summary.push(`Bekende TV series op televisie waren: ${seriesDetails}`);
    }
    
    if (historicalData.news && historicalData.news.length > 0) {
      const newsCount = historicalData.news.length;
      const newsSample = historicalData.news.slice(0, 4).map((n: any) => {
        const title = n.title || n.headline || 'nieuwsbericht';
        const category = n.category || n.section || '';
        let newsInfo = title;
        if (category) newsInfo += ` (${category})`;
        return newsInfo;
      }).join(', ');
      if (newsSample) {
        summary.push(`In het nieuws: ${newsSample} en nog ${newsCount - 4} andere berichten`);
      } else {
        summary.push(`${newsCount} nieuwsberichten geregistreerd op deze dag`);
      }
    }
    
    if (historicalData.events && historicalData.events.length > 0) {
      const events = historicalData.events.slice(0, 5);
      const eventDetails = events.map((e: any) => {
        const title = e.title || e.description || 'belangrijke gebeurtenis';
        const year = e.year || e.date ? new Date(e.date).getFullYear() : '';
        const location = e.location || e.place || '';
        let eventInfo = title;
        if (year) eventInfo += ` (${year})`;
        if (location) eventInfo += ` in ${location}`;
        return eventInfo;
      }).join(', ');
      summary.push(`Belangrijke historische gebeurtenissen: ${eventDetails}`);
    }
    
    if (historicalData.music && historicalData.music.length > 0) {
      const music = historicalData.music.slice(0, 4);
      const musicDetails = music.map((m: any) => {
        const title = m.title || m.name || 'nummer';
        const artist = m.artist || m.artist_name || 'onbekende artiest';
        const album = m.album || '';
        const year = m.year || m.release_date ? new Date(m.release_date).getFullYear() : '';
        let musicInfo = `${title} van ${artist}`;
        if (album) musicInfo += ` (album: ${album})`;
        if (year) musicInfo += ` (${year})`;
        return musicInfo;
      }).join(', ');
      summary.push(`Populaire muziek: ${musicDetails}`);
    }
    
    if (historicalData.books && historicalData.books.length > 0) {
      const books = historicalData.books.slice(0, 4);
      const bookDetails = books.map((b: any) => {
        const title = b.title || b.name || 'boek';
        const author = b.author || b.author_name || 'onbekende auteur';
        const genre = b.genre || b.categories?.[0] || '';
        const year = b.year || b.published_date ? new Date(b.published_date).getFullYear() : '';
        let bookInfo = `${title} van ${author}`;
        if (genre) bookInfo += ` (${genre})`;
        if (year) bookInfo += ` (${year})`;
        return bookInfo;
      }).join(', ');
      summary.push(`Bestsellers: ${bookDetails}`);
    }
    
    // Add more data sources
    if (historicalData.sports && historicalData.sports.length > 0) {
      const sports = historicalData.sports.slice(0, 3);
      const sportsDetails = sports.map((s: any) => {
        const event = s.event || s.title || 'sportevenement';
        const winner = s.winner || s.champion || '';
        const sport = s.sport || '';
        let sportsInfo = event;
        if (sport) sportsInfo += ` (${sport})`;
        if (winner) sportsInfo += ` - winnaar: ${winner}`;
        return sportsInfo;
      }).join(', ');
      summary.push(`Sportevenementen: ${sportsDetails}`);
    }
    
    if (historicalData.science && historicalData.science.length > 0) {
      const science = historicalData.science.slice(0, 3);
      const scienceDetails = science.map((s: any) => {
        const discovery = s.discovery || s.title || 'wetenschappelijke ontdekking';
        const scientist = s.scientist || s.researcher || '';
        const field = s.field || s.category || '';
        let scienceInfo = discovery;
        if (field) scienceInfo += ` (${field})`;
        if (scientist) scienceInfo += ` door ${scientist}`;
        return scienceInfo;
      }).join(', ');
      summary.push(`Wetenschappelijke ontwikkelingen: ${scienceDetails}`);
    }
    
    if (historicalData.business && historicalData.business.length > 0) {
      const business = historicalData.business.slice(0, 3);
      const businessDetails = business.map((b: any) => {
        const event = b.event || b.title || 'zakelijke gebeurtenis';
        const company = b.company || b.organization || '';
        const industry = b.industry || b.sector || '';
        let businessInfo = event;
        if (company) businessInfo += ` bij ${company}`;
        if (industry) businessInfo += ` (${industry})`;
        return businessInfo;
      }).join(', ');
      summary.push(`Zakelijke ontwikkelingen: ${businessDetails}`);
    }
    
    if (historicalData.politics && historicalData.politics.length > 0) {
      const politics = historicalData.politics.slice(0, 3);
      const politicsDetails = politics.map((p: any) => {
        const event = p.event || p.title || 'politieke gebeurtenis';
        const politician = p.politician || p.leader || '';
        const country = p.country || p.nation || '';
        let politicsInfo = event;
        if (politician) politicsInfo += ` door ${politician}`;
        if (country) politicsInfo += ` in ${country}`;
        return politicsInfo;
      }).join(', ');
      summary.push(`Politieke gebeurtenissen: ${politicsDetails}`);
    }
    
    if (historicalData.technology && historicalData.technology.length > 0) {
      const tech = historicalData.technology.slice(0, 3);
      const techDetails = tech.map((t: any) => {
        const innovation = t.innovation || t.title || 'technologische innovatie';
        const company = t.company || t.developer || '';
        const category = t.category || t.type || '';
        let techInfo = innovation;
        if (company) techInfo += ` door ${company}`;
        if (category) techInfo += ` (${category})`;
        return techInfo;
      }).join(', ');
      summary.push(`Technologische ontwikkelingen: ${techDetails}`);
    }
    
    if (summary.length === 0) {
      return 'Geen specifieke historische data beschikbaar voor deze datum, maar het was een dag vol veranderingen en ontwikkelingen.';
    }
    
    return summary.join('. ') + '.';
    
  } catch (error) {
    console.error('Error preparing data for podcast:', error);
    return 'Interessante historische data uit verschillende bronnen, waaronder populaire cultuur, nieuws en gebeurtenissen.';
  }
}

async function checkUserDailyPodcast(userId: string, date: string): Promise<boolean> {
  // Mock implementation - in production this would check a database
  // For now, always return false to allow podcast generation
  return false;
}

async function checkIfUserIsAdmin(userId: string, userEmail?: string): Promise<boolean> {
  // Mock implementation - in production this would check a database
  // For now, we'll need to pass the user email from the frontend
  // For development, allow all users to be admin for testing
  
  if (process.env.NODE_ENV === 'development') {
    return true; // Allow all users to be admin in development
  }
  
  // In production, check against known admin user IDs or emails
  const adminUserIds = ['admin_user_id_1', 'admin_user_id_2']; // Replace with actual admin user IDs
  const adminEmails = ['admin@example.com', 'beheerder@example.com']; // Replace with actual admin emails
  
  return adminUserIds.includes(userId) || (userEmail && adminEmails.includes(userEmail));
}

async function logPodcastGeneration(userId: string, date: string, event: string): Promise<void> {
  // Mock implementation - in production this would log to a database
  console.log(`Podcast generated for user ${userId} on ${date} for event: ${event}`);
}
