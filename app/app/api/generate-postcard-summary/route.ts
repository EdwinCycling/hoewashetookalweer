import { NextRequest, NextResponse } from 'next/server';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

export async function POST(request: NextRequest) {
  try {
    const { date, data } = await request.json();

    if (!date) {
      return NextResponse.json(
        { error: 'Datum is vereist' },
        { status: 400 }
      );
    }

    // Format the date
    const formattedDate = format(new Date(date), 'd MMMM yyyy', { locale: nl });
    
    // Generate a summary based on available data
    let summary = `Op ${formattedDate} was het`;

    // Start with weather if available
    if (data && typeof data === 'object' && data?.knmi_daily_dataset) {
      const weather = data.knmi_daily_dataset;
      if (weather.maxTemp !== undefined) {
        summary += ` ${weather.maxTemp}°C`;
        if (weather.minTemp !== undefined) {
          summary += ` (min: ${weather.minTemp}°C)`;
        }
      }
      
      if (weather.sunshineHours !== undefined && weather.sunshineHours > 0) {
        summary += ` met ${weather.sunshineHours} uur zon`;
      }
      
      if (weather.precipitation !== undefined && weather.precipitation > 0) {
        summary += ` en ${weather.precipitation}mm regen`;
      }
      
      summary += '.\\n\\n';
    } else {
      summary += ' een interessante dag.\\n\\n';
    }

    // Add other interesting data points
    const dataPoints: string[] = [];

    // Only proceed if data is valid
    if (!data || typeof data !== 'object') {
      summary += ' een bijzondere dag.\n\nHelaas zijn er geen specifieke gegevens beschikbaar voor deze datum, maar elke dag heeft zijn eigen verhaal!\n\nMet deze postcard kun je toch een persoonlijke boodschap delen.';
      return NextResponse.json({ summary });
    }

    // Movies
    if (data?.dutch_films?.length > 0) {
      dataPoints.push(`🎬 Nederlandse films: ${data.dutch_films.map((film: any) => film.title).join(', ')}`);
    }
    if (data?.movies?.length > 0) {
      dataPoints.push(`🎭 Internationale films: ${data.movies.map((movie: any) => movie.title).join(', ')}`);
    }

    // Music
    if (data?.music?.length > 0) {
      const topSong = data.music[0];
      dataPoints.push(`🎵 #1 hit: "${topSong.title}" van ${topSong.artist}`);
    }

    // Sports
    if (data?.formule1?.length > 0) {
      const f1 = data.formule1[0];
      dataPoints.push(`🏎️ Formule 1: ${f1.race} - winnaar: ${f1.winner}`);
    }

    // Politics
    if (data?.politiek?.length > 0) {
      const politics = data.politiek[0];
      dataPoints.push(`🏛️ Premier: ${politics.premier} (${politics.partij})`);
    }

    // Prices
    if (data?.prices) {
      const prices = data.prices;
      if (prices.bread) {
        dataPoints.push(`💰 Brood kostte: €${prices.bread.toFixed(2)}`);
      }
      if (prices.gasoline) {
        dataPoints.push(`⛽ Benzine: €${prices.gasoline.toFixed(2)} per liter`);
      }
    }

    // TV Series
    if (data?.tvseries?.length > 0) {
      const show = data.tvseries[0];
      dataPoints.push(`📺 Populaire serie: ${show.title}`);
    }

    // Population
    if (data?.population) {
      dataPoints.push(`👥 Nederland had ${data.population.total.toLocaleString('nl-NL')} inwoners`);
    }

    // Champions League
    if (data?.champions_league?.length > 0) {
      const cl = data.champions_league[0];
      dataPoints.push(`⚽ Champions League winnaar: ${cl.winner}`);
    }

    // Add random selection of data points
    const selectedPoints = dataPoints.slice(0, 4); // Max 4 points to keep it readable

    if (selectedPoints.length > 0) {
      summary += selectedPoints.join('\\n') + '\\n\\n';
    }

    // Add a nice closing
    summary += `Wat een tijd om terug te denken! Ontdek meer interessante feiten op HoeWasHetOokAlweer.nl`;

    return NextResponse.json({ summary });

  } catch (error) {
    console.error('Error generating postcard summary:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het genereren van de samenvatting' },
      { status: 500 }
    );
  }
}
