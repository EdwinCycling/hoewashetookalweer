
'use server';

import { SONG_FESTIVAL_RAW_DATA } from '@/data/song-festival-data';

export interface SongFestivalEntry {
  country: string;
  song: string;
  artist: string;
  spotifyLink: string;
}

export interface SongFestivalYearData {
  year: number;
  description: string;
  winner: SongFestivalEntry;
  netherlandsEntry: SongFestivalEntry;
}

export interface FetchSongFestivalResult {
  data: SongFestivalYearData | null;
  error?: string | null;
}

const MIN_SONG_FESTIVAL_YEAR = 1957;
const MAX_SONG_FESTIVAL_YEAR = 2024; // As per user request

function parseEntryString(entryString: string, spotifyLink: string): SongFestivalEntry | null {
  // Regex to capture "Country, 'Song' by Artist" or "Country, Song by Artist" (single quotes optional)
  const entryRegex = /(.+?),\s*'?([^']+?)'?\s*door\s*(.+)/;
  const match = entryString.match(entryRegex);

  if (match && match.length === 4) {
    return {
      country: match[1].trim(),
      song: match[2].trim(),
      artist: match[3].trim(),
      spotifyLink: spotifyLink,
    };
  }
  console.warn(`[SongFestivalAction] Failed to parse entry string: "${entryString}"`);
  return null;
}

export async function fetchSongFestivalByYear(
  year: number
): Promise<FetchSongFestivalResult> {
  console.log(`[fetchSongFestivalByYear] Called for year: ${year}`);

  if (year < MIN_SONG_FESTIVAL_YEAR || year > MAX_SONG_FESTIVAL_YEAR) {
    const errorMsg = `Songfestivaldata is alleen beschikbaar van ${MIN_SONG_FESTIVAL_YEAR} tot en met ${MAX_SONG_FESTIVAL_YEAR}. Gekozen jaar: ${year}.`;
    console.warn(`[WARN SongFestival] ${errorMsg}`);
    return { data: null, error: errorMsg };
  }

  const rawDataString = SONG_FESTIVAL_RAW_DATA[year];

  if (!rawDataString) {
    const errorMsg = `Geen songfestivaldata gevonden voor het jaar ${year}.`;
    console.warn(`[WARN SongFestival] ${errorMsg}`);
    return { data: null, error: errorMsg };
  }

  try {
    const parts = rawDataString.split('|');
    if (parts.length !== 5) {
      const errorMsg = `Ongeldig dataformaat voor songfestivaljaar ${year}. Verwachtte 5 delen, kreeg ${parts.length}.`;
      console.error(`[ERROR SongFestival] ${errorMsg} Raw data: ${rawDataString}`);
      return { data: null, error: errorMsg };
    }

    const [description, winnerDetailsStr, winnerSpotifyLink, netherlandsDetailsStr, netherlandsSpotifyLink] = parts.map(part => part.trim());

    const winnerEntry = parseEntryString(winnerDetailsStr, winnerSpotifyLink);
    const netherlandsEntryParsed = parseEntryString(netherlandsDetailsStr, netherlandsSpotifyLink);

    if (!winnerEntry || !netherlandsEntryParsed) {
      const errorMsg = `Fout bij het parsen van songfestivaldata voor ${year}. Controleer de entry strings.`;
       console.error(`[ERROR SongFestival] ${errorMsg}. Winner string: "${winnerDetailsStr}", NL string: "${netherlandsDetailsStr}"`);
      return { data: null, error: errorMsg };
    }
    
    const songFestivalData: SongFestivalYearData = {
      year,
      description: description.trim(),
      winner: winnerEntry,
      netherlandsEntry: netherlandsEntryParsed,
    };

    console.log(`[fetchSongFestivalByYear] Successfully parsed data for year ${year}.`);
    return { data: songFestivalData, error: null };

  } catch (error: any) {
    const errorMsg = `Onverwachte fout bij verwerken songfestivaldata voor ${year}: ${error.message || 'Onbekend'}`;
    console.error(`[ERROR SongFestival] ${errorMsg}`, { error });
    return { data: null, error: errorMsg };
  }
}
