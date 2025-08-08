
// Data for Dutch Olympic Gold Medals by year.
// Each year maps to an array of strings.
// Each string format: "sporter|spelenLocatie|onderdeel|extraInfo"

export interface OlympischeMedailleData {
  year: number;
  sporter: string;
  spelenLocatie: string; // e.g., "Amsterdam 1928"
  onderdeel: string;
  extraInfo: string;
}

export interface FetchOlympischeMedaillesResult {
  medailles: OlympischeMedailleData[] | null;
  error?: string | null;
}

export const OLYMPISCHE_MEDAILLES_RAW_DATA: Record<number, string[]> = {
  1928: [
    "Ruiterequipe|Amsterdam 1928|Paardensport|Samengestelde Wedstrijd: Adolf van der Voort van Zijp, Gerard Pieter de Kruijff, Charles Pahud de Mortanges",
    "Charles Pahud de Mortanges|Amsterdam 1928|Paardensport|Samengestelde Wedstrijd Individueel",
    "Polyphemus (zeilen)|Amsterdam 1928|Zeilen|8-meter klasse",
    "Bernard Leene en Daan van Dijk|Amsterdam 1928|Wielrennen|Tandem",
    "Marie Baron en Mietje Baron|Amsterdam 1928|Zwemmen|200m schoolslag (Marie Braun)", // Assuming Mietje Baron is a typo for Marie Braun based on records
    "Koos van der Bemden|Amsterdam 1928|Boksen|Vedergewicht (-57,2 kg)"
  ],
  1932: [
    "Charles Pahud de Mortanges|Los Angeles 1932|Paardensport|Samengestelde Wedstrijd Individueel",
    "Jacques van Egmond|Los Angeles 1932|Baanwielrennen|1.000m Sprint"
  ],
  1936: [
    "Rie Mastenbroek|Berlijn 1936|Zwemmen|400m Vrije Slag",
    "Vrouwen Zwemteam|Berlijn 1936|Zwemmen|4x100m Vrije Slag: Willy den Ouden, Rie Mastenbroek, Jopie Selbach, Tini Wagner",
    "Nida Senff|Berlijn 1936|Zwemmen|100m Rugslag",
    "Rie Mastenbroek|Berlijn 1936|Zwemmen|100m Vrije Slag",
    "Daan Kagchelland|Berlijn 1936|Zeilen|Olympiajollen",
    "Arie van Vliet|Berlijn 1936|Baanwielrennen|1.000m Tijdrit"
  ],
  1948: [
    "Atletiek Estafetteteam|Londen 1948|Atletiek|4x100m: Fanny Blankers-Koen, Xenia Stad-de Jong, Gerda van der Kade-Koudijs, Nettie Witziers-Timmer",
    "Fanny Blankers-Koen|Londen 1948|Atletiek|200m",
    "Fanny Blankers-Koen|Londen 1948|Atletiek|80m Horden",
    "Nel van Vliet|Londen 1948|Zwemmen|200m Schoolslag",
    "Fanny Blankers-Koen|Londen 1948|Atletiek|100m"
  ],
  1964: [
    "Anton Geesink|Tokio 1964|Judo|Open Klasse",
    "Wielrenteam|Tokio 1964|Wielrennen|Ploegentijdrit: Bart Zoet, Jan Pieterse, Eef Dolman, Gerben Karstens",
    "Sjoukje Dijkstra|Innsbruck 1964|Kunstschaatsen|Individueel"
  ],
  1968: [
    "Ada Kok|Mexico City 1968|Zwemmen|200m Vlinderslag",
    "Jan Wienese|Mexico City 1968|Roeien|Skiff",
    "Wielrenteam|Mexico City 1968|Wielrennen|Ploegentijdrit: Joop Zoetemelk, Jan Krekels, Fedor den Hertog, René Pijnen",
    "Kees Verkerk|Grenoble 1968|Schaatsen|1.500m",
    "Ans Schut|Grenoble 1968|Schaatsen|3.000m",
    "Carry Geijssen|Grenoble 1968|Schaatsen|1.000m"
  ],
  1972: [
    "Wim Ruska|München 1972|Judo|Open Klasse",
    "Hennie Kuiper|München 1972|Wielrennen|Wegwedstrijd",
    "Wim Ruska|München 1972|Judo|+93kg",
    "Stien Baas-Kaiser|Sapporo 1972|Schaatsen|3.000m",
    "Ard Schenk|Sapporo 1972|Schaatsen|10.000m",
    "Ard Schenk|Sapporo 1972|Schaatsen|1.500m",
    "Ard Schenk|Sapporo 1972|Schaatsen|5.000m"
  ],
  1976: [
    "Piet Kleine|Innsbruck 1976|Schaatsen|10.000m"
  ],
  1980: [
    "Annie Borckink|Lake Placid 1980|Schaatsen|1.500m"
  ],
  1984: [
    "Ria Stalman|Los Angeles 1984|Atletiek|Discuswerpen",
    "Vrouwen Hockeyteam|Los Angeles 1984|Hockey|Carina Benninga, Det de Beus, Fieke Boekhorst, Marjolein Eijsvogel, Marieke van Doorn, Irene Hendriks, Elsemiek Hillen, Aletta van Manen, Anneloes Nieuwenhuizen, Martine Ohr, Sandra Le Poole, Alette Pos, Lisette Sevens, Sophie von Weiler, Laurien Willemse, Margriet Zegers",
    "Stephan van den Berg|Los Angeles 1984|Zeilen|Windsurfen",
    "Jolanda de Rover|Los Angeles 1984|Zwemmen|200m Rugslag",
    "Petra van Staveren|Los Angeles 1984|Zwemmen|100m Schoolslag"
  ],
  1988: [
    "Monique Knol|Seoul 1988|Wielrennen|Wegwedstrijd",
    "Nico Rienks, Ronald Florijn|Seoul 1988|Roeien|Dubbeltwee",
    "Yvonne van Gennip|Calgary 1988|Schaatsen|5.000m",
    "Yvonne van Gennip|Calgary 1988|Schaatsen|1.500m",
    "Yvonne van Gennip|Calgary 1988|Schaatsen|3.000m"
  ],
  1992: [
    "Paardensport Springteam|Barcelona 1992|Paardensport|Jos Lansink, Piet Raijmakers, Jan Tops",
    "Ellen van Langen|Barcelona 1992|Atletiek|800m",
    "Bart Veldkamp|Albertville 1992|Schaatsen|10.000m"
  ],
  1996: [
    "Mannen Volleybalteam|Atlanta 1996|Volleybal|Peter Blangé, Bas van de Goor, Mike van de Goor, Rob Grabert, Henk-Jan Held, Guido Görtzen, Misha Latuhihin, Olof van der Meulen, Jan Posthuma, Brecht Rodenburg, Richard Schuil, Ron Zwerver",
    "Mannen Hockeyteam|Atlanta 1996|Hockey|Jacques Brinkman, Floris Jan Bovelander, Maurits Crucq, Marc Delissen, Jeroen Delmee, Taco van den Honert, Erik Jazet, Ronald Jansen, Leo Klein Gebbink, Bram Lomans, Teun de Nooijer, Wouter van Pelt, Stephan Veen, Guus Vogels, Tycho van Meer, Remco van Wijk",
    "Bart Brentjens|Atlanta 1996|Mountainbiken|Cross-Country",
    "Roeiteam Holland Acht|Atlanta 1996|Roeien|Michiel Bartman, Jeroen Duyster (stuurman), Ronald Florijn, Koos Maasdijk, Nico Rienks, Diederik Simon, Niels van Steenis, Niels van der Zwan, Henk Jan Zwolle"
  ],
  1998: [
    "Marianne Timmer|Nagano 1998|Schaatsen|1.000m",
    "Gianni Romme|Nagano 1998|Schaatsen|10.000m",
    "Marianne Timmer|Nagano 1998|Schaatsen|1.500m",
    "Ids Postma|Nagano 1998|Schaatsen|1.000m",
    "Gianni Romme|Nagano 1998|Schaatsen|5.000m"
  ],
  2000: [
    "Jeroen Dubbeldam|Sydney 2000|Paardensport|Springen",
    "Mannen Hockeyteam|Sydney 2000|Hockey|Jacques Brinkman, Jeroen Delmee, Jaap Derk Buma, Marten Eikelboom, Piet Hein Geeris, Erik Jazet, Ronald Jansen, Bram Lomans, Teun de Nooijer, Wouter van Pelt, Stephan Veen, Guus Vogels, Peter Wind, Diederik van Weel, Sander van der Weide, Remco van Wijk",
    "Anky van Grunsven|Sydney 2000|Paardensport|Individuele Dressuur",
    "Leontien Zijlaard-van Moorsel|Sydney 2000|Wielrennen|Individuele Tijdrit",
    "Leontien Zijlaard-van Moorsel|Sydney 2000|Wielrennen|Wegwedstrijd",
    "Inge de Bruijn|Sydney 2000|Zwemmen|50m Vrije Slag",
    "Inge de Bruijn|Sydney 2000|Zwemmen|100m Vrije Slag",
    "Pieter van den Hoogenband|Sydney 2000|Zwemmen|100m Vrije Slag",
    "Mark Huizinga|Sydney 2000|Judo|-90 kg",
    "Pieter van den Hoogenband|Sydney 2000|Zwemmen|200m Vrije Slag",
    "Leontien Zijlaard-van Moorsel|Sydney 2000|Baanwielrennen|Individuele Achtervolging",
    "Inge de Bruijn|Sydney 2000|Zwemmen|100m Vlinderslag"
  ],
  2002: [
    "Jochem Uytdehaage|Salt Lake City 2002|Schaatsen|10.000m",
    "Gerard van Velde|Salt Lake City 2002|Schaatsen|1.000m",
    "Jochem Uytdehaage|Salt Lake City 2002|Schaatsen|5.000m"
  ],
  2004: [
    "Anky van Grunsven|Athene 2004|Paardensport|Individuele Dressuur",
    "Inge de Bruijn|Athene 2004|Zwemmen|50m Vrije Slag",
    "Pieter van den Hoogenband|Athene 2004|Zwemmen|100m Vrije Slag",
    "Leontien Zijlaard-van Moorsel|Athene 2004|Wielrennen|Individuele Tijdrit"
  ],
  2006: [
    "Bob de Jong|Turijn 2006|Schaatsen|10.000m",
    "Marianne Timmer|Turijn 2006|Schaatsen|1.000m",
    "Ireen Wüst|Turijn 2006|Schaatsen|3.000m"
  ],
  2008: [
    "Vrouwen Hockeyteam|Beijing 2008|Hockey|Marilyn Agliotti, Naomi van As, Minke Booij, Wieke Dijkstra, Miek van Geenhuizen, Maartje Goderie, Eva de Goede, Ellen Hoog, Fatima Moreira de Melo, Eefke Mulder, Maartje Paumen, Sophie Polkamp, Lisanne de Roever, Janneke Schopman, Minke Smabers, Lidewij Welten",
    "Vrouwen Waterpoloteam|Beijing 2008|Waterpolo|Iefke van Belkum, Gillian van den Berg, Daniëlle de Bruijn, Mieke Cabout, Rianne Guichelaar, Biurakn Hakhverdian, Marieke van den Ham, Noeki Klein, Simone Koot, Ilse van der Meijden, Meike de Nooij, Alette Sijbring, Yasemin Smit",
    "Maarten van der Weijden|Beijing 2008|Zwemmen|10 km Open Water",
    "Anky van Grunsven|Beijing 2008|Paardensport|Individuele Dressuur",
    "Marianne Vos|Beijing 2008|Baanwielrennen|Puntenkoers",
    "Marit van Eupen, Kirsten van der Kolk|Beijing 2008|Roeien|Lichte Dubbeltwee",
    "Vrouwen Zwemteam|Beijing 2008|Zwemmen|4x100m Vrije Slag: Inge Dekker, Ranomi Kromowidjojo, Femke Heemskerk, Marleen Veldhuis, Hinkelien Schreuder, Manon van Rooijen"
  ],
  2010: [
    "Nicolien Sauerbreij|Vancouver 2010|Snowboarden|Parallel Reuzenslalom",
    "Ireen Wüst|Vancouver 2010|Schaatsen|1.500m",
    "Mark Tuitert|Vancouver 2010|Schaatsen|1.500m",
    "Sven Kramer|Vancouver 2010|Schaatsen|5.000m"
  ],
  2012: [
    "Vrouwen Hockeyteam|Londen 2012|Hockey|Marilyn Agliotti, Naomi van As, Ellen Hoog, Sophie Polkamp, Maartje Paumen, Maartje Goderie, Lidewij Welten, Eva de Goede, Kitty van Male, Kim Lammers, Merel de Blaey, Margot van Geffen, Carlien Dirkse van den Heuvel, Kelly Jonker, Caia van Maasakker, Joyce Sombroek",
    "Epke Zonderland|Londen 2012|Turnen|Rekstok",
    "Dorian van Rijsselberghe|Londen 2012|Windsurfen|RS:X",
    "Ranomi Kromowidjojo|Londen 2012|Zwemmen|50m Vrije Slag",
    "Ranomi Kromowidjojo|Londen 2012|Zwemmen|100m Vrije Slag",
    "Marianne Vos|Londen 2012|Wielrennen|Wegwedstrijd"
  ],
  2014: [
    "Vrouwen Schaatsploeg|Sochi 2014|Schaatsen|Achtervolging: Ireen Wüst, Jorien ter Mors, Marrit Leenstra, Lotte van Beek",
    "Mannen Schaatsploeg|Sochi 2014|Schaatsen|Achtervolging: Sven Kramer, Jan Blokhuijsen, Koen Verweij",
    "Jorrit Bergsma|Sochi 2014|Schaatsen|10.000m",
    "Jorien ter Mors|Sochi 2014|Schaatsen|1.500m",
    "Stefan Groothuis|Sochi 2014|Schaatsen|1.000m",
    "Michel Mulder|Sochi 2014|Schaatsen|500m",
    "Ireen Wüst|Sochi 2014|Schaatsen|3.000m",
    "Sven Kramer|Sochi 2014|Schaatsen|5.000m"
  ],
  2016: [
    "Marit Bouwmeester|Rio 2016|Zeilen|Laser Radial",
    "Ferry Weertman|Rio 2016|Zwemmen|10 km Open Water",
    "Sanne Wevers|Rio 2016|Turnen|Balk",
    "Sharon van Rouwendaal|Rio 2016|Zwemmen|10 km Open Water",
    "Dorian van Rijsselberghe|Rio 2016|Windsurfen|RS:X",
    "Elis Ligtlee|Rio 2016|Baanwielrennen|Keirin",
    "Maaike Head, Ilse Paulis|Rio 2016|Roeien|Lichte Dubbeltwee",
    "Anna van der Breggen|Rio 2016|Wielrennen|Wegwedstrijd"
  ],
  2018: [
    "Kjeld Nuis|PyeongChang 2018|Schaatsen|1.000m",
    "Suzanne Schulting|PyeongChang 2018|Shorttrack|1.000m",
    "Esmee Visser|PyeongChang 2018|Schaatsen|5.000m",
    "Jorien ter Mors|PyeongChang 2018|Schaatsen|1.000m",
    "Kjeld Nuis|PyeongChang 2018|Schaatsen|1.500m",
    "Ireen Wüst|PyeongChang 2018|Schaatsen|1.500m",
    "Sven Kramer|PyeongChang 2018|Schaatsen|5.000m",
    "Carlijn Achtereekte|PyeongChang 2018|Schaatsen|3.000m"
  ],
  2020: [
    "Sifan Hassan|Tokyo 2020|Atletiek|10.000m",
    "Vrouwen Hockeyteam|Tokyo 2020|Hockey|Sanne Koolen, Malou Pheninckx, Laurien Leurink, Xan de Waard, Marloes Keetels, Felice Albers, Maria Verschoor, Lidewij Welten, Caia van Maasakker, Frédérique Matla, Pien Sanders, Laura Nunnink, Lauren Stam, Josine Koning, Margot van Geffen, Eva de Goede",
    "Harrie Lavreysen|Tokyo 2020|Baanwielrennen|Sprint",
    "Shanne Braspennincx|Tokyo 2020|Baanwielrennen|Keirin",
    "Mannen Baanwielrenteam|Tokyo 2020|Baanwielrennen|Teamsprint: Matthijs Büchli, Roy van den Berg, Harrie Lavreysen, Jeffrey Hoogland",
    "Sifan Hassan|Tokyo 2020|Atletiek|5.000m",
    "Kiran Badloe|Tokyo 2020|Windsurfen|RS:X",
    "Niek Kimmann|Tokyo 2020|BMX|Cross",
    "Annemiek van Vleuten|Tokyo 2020|Wielrennen|Tijdrit",
    "Mannen Roeiteam|Tokyo 2020|Roeien|Dubbelvier: Dirk Uittenbogaard, Koen Metsemakers, Abe Wiersma, Tone Wieten"
  ],
  2022: [
    "Irene Schouten|Beijing 2022|Schaatsen|Massastart",
    "Thomas Krol|Beijing 2022|Schaatsen|1.500m",
    "Vrouwen Shorttrackteam|Beijing 2022|Shorttrack|Estafette: Selma Poutsma, Suzanne Schulting, Xandra Velzeboer, Yara van Kerkhof",
    "Suzanne Schulting|Beijing 2022|Shorttrack|1.000m",
    "Irene Schouten|Beijing 2022|Schaatsen|5.000m",
    "Kjeld Nuis|Beijing 2022|Schaatsen|1.500m",
    "Ireen Wüst|Beijing 2022|Schaatsen|1.500m",
    "Irene Schouten|Beijing 2022|Schaatsen|3.000m"
  ],
  2024: [
    "Harrie Lavreysen|Parijs 2024|Baanwielrennen|Keirin",
    "Sifan Hassan|Parijs 2024|Atletiek|Marathon",
    "Vrouwen Hockeyteam|Parijs 2024|Hockey|Felice Albers, Joosje Burg, Pien Dicke, Luna Fokke, Yibbi Jansen, Marleen Jochems, Sanne Koolen, Renée van Laarhoven, Frédérique Matla, Freeke Moes, Laura Nunnink, Lisa Post, Pien Sanders, Marijn Veen, Anne Veenendaal, Maria Verschoor, Xan de Waard",
    "Harrie Lavreysen|Parijs 2024|Baanwielrennen|Sprint",
    "Mannen Hockeyteam|Parijs 2024|Hockey|Seve van Ass, Lars Balk, Koen Bijen, Pirmin Blaak, Justen Blok, Thierry Brinkman, Jorrit Croon, Thijs van Dam, Jonas de Geus, Steijn van Heijningen, Tjep Hoedemakers, Jip Janssen, Floris Middendorp, Joep de Mol, Tijmen Reyenga, Duco Telgenkamp, Derck de Vilder, Floris Wortelboer",
    "Sharon van Rouwendaal|Parijs 2024|Zwemmen|10 km Open Water",
    "Marit Bouwmeester|Parijs 2024|Zeilen|ILCA 6",
    "Mannen Baanwielrenteam|Parijs 2024|Baanwielrennen|Teamsprint: Roy van den Berg, Harrie Lavreysen, Jeffrey Hoogland",
    "Mannen 3x3 Basketbalteam|Parijs 2024|Basketbal|Worthy de Jong, Dimeo van der Horst, Jan Driessen, Arvin Slagter",
    "Gemengd 4x400m Estafetteteam|Parijs 2024|Atletiek|Eugene Omalla, Lieke Klaver, Isaya Klein Ikkink, Femke Bol, Cathelijn Peeters",
    "Karolien Florijn|Parijs 2024|Roeien|Skiff",
    "Odile van Aanholt, Annette Duetz|Parijs 2024|Zeilen|49erFX",
    "Ymkje Clevering, Veronique Meester|Parijs 2024|Roeien|Twee-zonder",
    "Vrouwen Roeiteam|Parijs 2024|Roeien|Vier-zonder: Benthe Boonstra, Hermijntje Drenth, Marloes Oldenburg, Tinka Offereins",
    "Mannen Roeiteam|Parijs 2024|Roeien|Dubbelvier: Lennart van Lierop, Finn Florijn, Koen Metsemakers, Tone Wieten"
  ]
};

    
