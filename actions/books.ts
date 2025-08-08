
'use server';

export interface BookData {
  title: string;
  author: string;
  year: string; 
}

export interface FetchBooksResult {
  books: BookData[] | null;
  error?: string | null;
  debugInfo?: any; 
}

const allBooks: BookData[] = [
  { year: "2003", title: "De Da Vinci code", author: "Dan Brown" },
  { year: "2003", title: "De verbouwing", author: "Saskia Noort" },
  { year: "2003", title: "Bereik je ideale gewicht!", author: "Sonja Bakker" },
  { year: "2004", title: "De Da Vinci code", author: "Dan Brown" },
  { year: "2004", title: "Bereik je ideale gewicht!", author: "Sonja Bakker" },
  { year: "2004", title: "De vliegeraar", author: "Khaled Hosseini" },
  { year: "2004", title: "De verbouwing", author: "Saskia Noort" },
  { year: "2005", title: "De vliegeraar", author: "Khaled Hosseini" },
  { year: "2005", title: "Het diner", author: "Herman Koch" },
  { year: "2005", title: "De eetclub", author: "Saskia Noort" },
  { year: "2005", title: "Bereik én behoud je ideale gewicht!", author: "Sonja Bakker" },
  { year: "2006", title: "De eetclub", author: "Saskia Noort" },
  { year: "2006", title: "De zevende zoon", author: "J.K. Rowling" },
  { year: "2006", title: "Het aanzien van 2005", author: "Han van Bree" },
  { year: "2006", title: "Nieuwe buren", author: "Saskia Noort" },
  { year: "2007", title: "Eten, bidden, beminnen", author: "Elizabeth Gilbert" },
  { year: "2007", title: "Harry Potter en de Relieken van de Dood", author: "J.K. Rowling" },
  { year: "2007", title: "De gelukkige huisvrouw", author: "Heleen van Royen" },
  { year: "2007", title: "Het aanzien van 2006", author: "Han van Bree" },
  { year: "2007", title: "Duizend schitterende zonnen", author: "Khaled Hosseini" },
  { year: "2008", title: "Mannen die vrouwen haten", author: "Stieg Larsson" },
  { year: "2008", title: "De gelukkige huisvrouw", author: "Heleen van Royen" },
  { year: "2008", title: "Komt een vrouw bij de dokter", author: "Kluun" },
  { year: "2008", title: "Het aanzien van 2007", author: "Han van Bree" },
  { year: "2009", title: "Het verloren symbool", author: "Dan Brown" },
  { year: "2009", title: "Mannen die vrouwen haten", author: "Stieg Larsson" },
  { year: "2009", title: "Haar naam was Sarah", author: "Tatiana de Rosnay" },
  { year: "2009", title: "Het aanzien van 2008", author: "Han van Bree" },
  { year: "2010", title: "Haar naam was Sarah", author: "Tatiana de Rosnay" },
  { year: "2010", title: "De kraamhulp", author: "Esther Verhoef" },
  { year: "2010", title: "De overgave", author: "Arthur Japin" },
  { year: "2010", title: "Het aanzien van 2009", author: "Han van Bree" },
  { year: "2011", title: "De kraamhulp", author: "Esther Verhoef" },
  { year: "2011", title: "Zwaar verliefd!", author: "Chantal van Gastel" },
  { year: "2011", title: "De jongen in de gestreepte pyjama", author: "John Boyne" },
  { year: "2011", title: "Het aanzien van 2010", author: "Han van Bree" },
  { year: "2012", title: "Vijftig tinten grijs", author: "E.L. James" },
  { year: "2012", title: "De verbouwing", author: "Saskia Noort" },
  { year: "2012", title: "Het familieportret", author: "Jenna Blum" },
  { year: "2012", title: "Het aanzien van 2011", author: "Han van Bree" },
  { year: "2013", title: "Inferno", author: "Dan Brown" },
  { year: "2013", title: "De voedselzandloper", author: "Kris Verburgh" },
  { year: "2013", title: "Toen ik je zag", author: "Isa Hoes" },
  { year: "2013", title: "Het aanzien van 2012", author: "Han van Bree" },
  { year: "2014", title: "De voedselzandloper", author: "Kris Verburgh" },
  { year: "2014", title: "De kraamhulp", author: "Esther Verhoef" },
  { year: "2014", title: "Het Rosie project", author: "Graeme Simsion" },
  { year: "2014", title: "Het aanzien van 2013", author: "Han van Bree" },
  { year: "2015", title: "De kraamhulp", author: "Esther Verhoef" },
  { year: "2015", title: "Pogingen iets van het leven te maken", author: "Hendrik Groen" },
  { year: "2015", title: "Vijftig tinten grijs", author: "E.L. James" },
  { year: "2015", title: "Het aanzien van 2014", author: "Han van Bree" },
  { year: "2016", title: "Judas - Een familiekroniek", author: "Astrid Holleeder" },
  { year: "2016", title: "Harry Potter en het Vervloekte Kind", author: "J.K. Rowling" },
  { year: "2016", title: "De waanzinnige boomhut van 52 verdiepingen", author: "Andy Griffiths & Terry Denton" },
  { year: "2016", title: "Het aanzien van 2015", author: "Han van Bree" },
  { year: "2017", title: "Oorsprong", author: "Dan Brown" },
  { year: "2017", title: "De waanzinnige boomhut van 65 verdiepingen", author: "Andy Griffiths & Terry Denton" },
  { year: "2017", title: "Zolang er leven is", author: "Hendrik Groen" },
  { year: "2017", title: "Het aanzien van 2016", author: "Han van Bree" },
  { year: "2018", title: "De zeven zussen", author: "Lucinda Riley" },
  { year: "2018", title: "De jongen, de mol, de vos en het paard", author: "Charlie Mackesy" },
  { year: "2018", title: "De waanzinnige boomhut van 78 verdiepingen", author: "Andy Griffiths & Terry Denton" },
  { year: "2018", title: "Het aanzien van 2017", author: "Han van Bree" },
  { year: "2019", title: "De jongen, de mol, de vos en het paard", author: "Charlie Mackesy" },
  { year: "2019", title: "De meeste mensen deugen", author: "Rutger Bregman" },
  { year: "2019", title: "De waanzinnige boomhut van 91 verdiepingen", author: "Andy Griffiths & Terry Denton" },
  { year: "2019", title: "Het aanzien van 2018", author: "Han van Bree" },
  { year: "2020", title: "De jongen, de mol, de vos en het paard", author: "Charlie Mackesy" },
  { year: "2020", title: "De meeste mensen deugen", author: "Rutger Bregman" },
  { year: "2020", title: "De waanzinnige boomhut van 104 verdiepingen", author: "Andy Griffiths & Terry Denton" },
  { year: "2020", title: "Het aanzien van 2019", author: "Lukas Spee" },
  { year: "2021", title: "De waanzinnige boomhut van 117 verdiepingen", author: "Andy Griffiths & Terry Denton" },
  { year: "2021", title: "De meeste mensen deugen", author: "Rutger Bregman" },
  { year: "2021", title: "De zilveren lepel", author: "Khaled Hosseini" },
  { year: "2021", title: "Het aanzien van 2020", author: "Lukas Spee" },
  { year: "2022", title: "De kracht van keuze", author: "Kelly Weekers" },
  { year: "2022", title: "De geheimen van de kostschool", author: "Lucinda Riley" },
  { year: "2022", title: "Gewetenloos", author: "Karin Slaughter" },
  { year: "2022", title: "Overprikkeld brein", author: "Charlotte Labee" },
  { year: "2022", title: "Daar waar de rivierkreeften zingen", author: "Delia Owens" },
  { year: "2022", title: "De Tijdmachine", author: "Rutger Vink en Thomas van Grinsven" },
  { year: "2022", title: "Egalus", author: "Marije Tolman" },
  { year: "2022", title: "Wij waren, ik ben", author: "Israel van Dorsten" },
  { year: "2022", title: "De Gorgels en de laatste kans", author: "Jochem Myjer" },
  { year: "2022", title: "Help, ik heb een puber!", author: "Kluun" },
  { year: "2023", title: "Vertroostingen", author: "Dirk De Wachter" },
  { year: "2023", title: "Voeding & gezond gewicht", author: "Marjolein Dubbers" },
  { year: "2023", title: "Reserve", author: "Prins Harry" },
  { year: "2023", title: "Maximiliaan Modderman geeft een feestje", author: "Joukje Akveld en Jan Jutte" },
  { year: "2023", title: "Sander en de brug", author: "Sander Schimmelpenninck" },
  { year: "2023", title: "De Gideonsbende", author: "Thierry Baudet" },
  { year: "2023", title: "Lichtpunt", author: "Corina Bomann" },
  { year: "2023", title: "De Zoete Zusjes moppenboek 2", author: "Hanneke de Zoete" },
  { year: "2023", title: "Karsu's Kitchen", author: "Karsu Dönmez" },
  { year: "2023", title: "Bota Banja", author: "Raoul de Jong" },
  { year: "2023", title: "De stikstoffuik", author: "Arnout Jaspers" },
  { year: "2023", title: "Strandfeest", author: "Suzanne Vermeer" },
  { year: "2023", title: "De zeven zussen. Atlas - Het verhaal van Pa Salt", author: "Lucinda Riley" },
  { year: "2023", title: "Jouw krachtige brein", author: "Charlotte Labee" },
  { year: "2023", title: "Na die nacht", author: "Karin Slaughter" },
  { year: "2023", title: "De vallei", author: "Suzanne Vermeer" },
  { year: "2023", title: "Baantjer. De Cock en het kind van de rekening.", author: "Peter Römer" },
  { year: "2023", title: "Oog om oog", author: "M.J. Arlidge" },
  { year: "2023", title: "Een nieuw sociaal contract", author: "Pieter Omtzigt" },
  { year: "2023", title: "Komt goed", author: "Annemarie Geerts" },
  { year: "2023", title: "Holly", author: "Stephen King" },
  { year: "2023", title: "Hoe overleef ik alles wat ik niemand vertel?", author: "Francine Oomen" },
  { year: "2023", title: "Sinterklaas", author: "Charlotte Dematons" },
  { year: "2023", title: "Choosing me", author: "Kelly Weekers" },
  { year: "2023", title: "De Camino", author: "Anya Niewierra" },
  { year: "2023", title: "Ik beloof je dat ik honderd word", author: "Peter R. de Vries en Royce de Vries" },
  { year: "2024", title: "Get Fit", author: "Frederique Ypenburg en Wendy de Vries" },
  { year: "2024", title: "Het aanzien van 2023", author: "Lukas Spee" },
  { year: "2024", title: "Help! Een verrassing!", author: "Miriam Bos" },
  { year: "2024", title: "Het moppenboek van Rutger, Thomas en Paco", author: "Rutger Vink en Thomas van Grinsven" },
  { year: "2024", title: "Design Your Own Life", author: "Michael Pilarczyk" },
  { year: "2024", title: "Een ijzeren vlam", author: "Rebbeca Yarros" },
  { year: "2024", title: "Ochtendgloren", author: "Corina Bomann" },
  { year: "2024", title: "Morele ambitie", author: "Rutger Bregman" },
  { year: "2024", title: "De Zoete Zusjes logeren bij tante Taart", author: "Hanneke de Zoete" },
  { year: "2024", title: "Afvallen zonder bullshit", author: "Lot Beukers" },
  { year: "2024", title: "Het geluid van de stilte", author: "Inez Weski" },
  { year: "2024", title: "Bloemeneiland", author: "Suzanne Vermeer" },
  { year: "2024", title: "Ik kom hier nog op terug", author: "Rob van Essen" },
  { year: "2024", title: "Ik ben vrij", author: "Lale Gül" },
  { year: "2024", title: "De nomade", author: "Anya Niewierra" },
  { year: "2024", title: "Waarom we logen", author: "Karin Slaughter" },
  { year: "2024", title: "Onrustige darmen, overprikkeld brein", author: "Charlotte Labee" },
  { year: "2024", title: "No Guts, No Gold", author: "Anne Vedder en Esther Vedder" },
  { year: "2024", title: "Leef je nog?", author: "M.J. Arlidge" },
  { year: "2024", title: "Mama huilt harder", author: "Leslie Keijzer" },
  { year: "2024", title: "Meneer Putmans ziet het licht", author: "Hendrik Groen" },
  { year: "2024", title: "It Ends with Us", author: "Colleen Hoover" },
  { year: "2024", title: "Baantjer. De Cock en de moord op afspraak.", author: "Peter Römer" },
  { year: "2024", title: "De safari", author: "Rutger Vink en Thomas van Grinsven" },
  { year: "2024", title: "De verborgen belofte", author: "Lucinda Riley" },
  { year: "2024", title: "Veggilaine", author: "Ghislaine Voogd" },
  { year: "2024", title: "Co-intelligentie", author: "Ethan Mollick en Alexander Klöpping" },
  { year: "2024", title: "De tweede helft van je leven", author: "Susan Smit" },
  { year: "2024", title: "Patriot", author: "Aleksej Navalny" },
  { year: "2024", title: "De domheid regeert", author: "Sander Schimmelpenninck" },
  { year: "2024", title: "Wie praat, die gaat", author: "Astrid Holleeder" },
  { year: "2024", title: "Komt een land bij de dokter", author: "Michelle van Tongerloo" },
  { year: "2024", title: "Longeneeslijk", author: "Eva Hermans-Kroot" },
  { year: "2025", title: "Het aanzien van 2024", author: "Lukas Spee" },
  { year: "2025", title: "Door duisternis gesmeed", author: "Rebecca Yarros" },
  { year: "2025", title: "Rinus", author: "Ingrid en Dieter Schubert" },
  { year: "2025", title: "De verloren dochters 5. De Franse dochter", author: "Soraya Lane" },
  { year: "2025", title: "Voor altijd jong", author: "Jade Kops" },
  { year: "2025", title: "The Let Them Theory", author: "Mel Robbins" },
  { year: "2025", title: "Al het blauw van de hemel", author: "Mélissa Da Costa" },
  { year: "2025", title: "Beladen huis", author: "Christien Brinkgreve" },
  { year: "2025", title: "Hè hè", author: "Paulien Cornelisse" },
  { year: "2025", title: "Gezond(er) met dokter Elise", author: "Elise Janssen" },
  { year: "2025", title: "Optimisme zonder hoop", author: "Tommy Wieringa" },
  { year: "2025", title: "Het huis met de palm", author: "Esther Verhoef" },
  { year: "2025", title: "Wisselwachter", author: "Geert Mak" },
  { year: "2025", title: "Dummy Book 1", author: "AI Author" },
  { year: "2025", title: "Dummy Book 2", author: "Gemini Coder" }
];

/**
 * Fetches top books for a specific year from the predefined list.
 *
 * @param year The year to fetch book data for.
 * @returns An object containing an array of top books or an error message.
 */
export async function fetchBooksByYear(
  year: number
): Promise<FetchBooksResult> {
  console.log(`[fetchBooksByYear] Called for year: ${year}`);

  const yearString = year.toString();
  const booksForYear = allBooks.filter(book => book.year === yearString);

  if (booksForYear.length > 0) {
    return { books: booksForYear, error: null };
  } else {
    // Check if the year is outside the range of available data
    const uniqueYears = [...new Set(allBooks.map(book => parseInt(book.year)))];
    const minYear = Math.min(...uniqueYears);
    const maxYear = Math.max(...uniqueYears);

    if (year < minYear || year > maxYear) {
      const errorMsg = `Boekendata is momenteel alleen beschikbaar van ${minYear} tot en met ${maxYear}. Gekozen jaar: ${year}.`;
      console.warn(`[WARN Books] ${errorMsg}`);
      return { books: null, error: errorMsg };
    } else {
      // Year is within range but no books found for that specific year (should ideally not happen with current static list if year is in range)
      const infoMsg = `Geen boeken gevonden voor het jaar ${year}.`;
      console.log(`[INFO Books] ${infoMsg}`);
      return { books: [], error: null, debugInfo: { message: infoMsg }};
    }
  }
}
