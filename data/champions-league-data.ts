
// Data for Champions League (voorheen Europa Cup 1) by year.
// Format for each year's string:
// "DatumFinale|WinnaarClub|WinnaarLand|Uitslag|FinalistClub|FinalistLand|Stadion|StadionPlaats|StadionLand|ManOfTheMatch|VerliezerHFWinnaarClub|VerliezerHFWinnaarLand|VerliezerHFFinalistClub|VerliezerHFFinalistLand"
// Use "N/A" or leave empty if a field is not applicable (e.g., ManOfTheMatch for older years).

export interface ChampionsLeagueYearData {
  year: number;
  finaleDatum: string;
  winnaarClub: string;
  winnaarLand: string;
  uitslag: string;
  finalistClub: string;
  finalistLand: string;
  stadion: string;
  stadionPlaats: string;
  stadionLand: string;
  manOfTheMatch?: string;
  verliezerHFWinnaarClub?: string;
  verliezerHFWinnaarLand?: string;
  verliezerHFFinalistClub?: string;
  verliezerHFFinalistLand?: string;
}

export const CHAMPIONS_LEAGUE_RAW_DATA: Record<number, string> = {
  1956: "13 juni 1956|Real Madrid|Spanje|4 – 3|Stade de Reims|Frankrijk|Parc des Princes|Parijs|Frankrijk|Geen uitreiking|AC Milan|Italië|Hibernian|Schotland",
  1957: "30 mei 1957|Real Madrid|Spanje|2 – 0|Fiorentina|Italië|Estadio Santiago Bernabéu|Madrid|Spanje|Geen uitreiking|Manchester United|Engeland|Rode Ster Belgrado|Joegoslavië",
  1958: "28 mei 1958|Real Madrid|Spanje|3 – 2 nv|AC Milan|Italië|Heizelstadion|Brussel|België|Geen uitreiking|Vasas SC|Hongarije|Manchester United|Engeland",
  1959: "3 juni 1959|Real Madrid|Spanje|2 – 0|Stade de Reims|Frankrijk|Neckarstadion|Stuttgart|West-Duitsland|Geen uitreiking|Atlético Madrid|Spanje|BSC Young Boys|Zwitserland",
  1960: "18 mei 1960|Real Madrid|Spanje|7 – 3|Eintracht Frankfurt|Duitsland|Hampden Park|Glasgow|Schotland|Geen uitreiking|Barcelona|Spanje|Rangers|Schotland",
  1961: "31 mei 1961|Benfica|Portugal|3 – 2|Barcelona|Spanje|Wankdorf Stadion|Bern|Zwitserland|Geen uitreiking|Rapid Wien|Oostenrijk|Hamburger SV|Duitsland",
  1962: "2 mei 1962|Benfica|Portugal|5 – 3|Real Madrid|Spanje|Olympisch Stadion|Amsterdam|Nederland|Geen uitreiking|Tottenham Hotspur|Engeland|Standard Luik|België",
  1963: "22 mei 1963|AC Milan|Italië|2 – 1|Benfica|Portugal|Wembley|Londen|Engeland|Geen uitreiking|Dundee|Schotland|Feyenoord|Nederland",
  1964: "27 mei 1964|Inter Milan|Italië|3 – 1|Real Madrid|Spanje|Prater Stadion|Wenen|Oostenrijk|Geen uitreiking|Borussia Dortmund|Duitsland|Zürich|Zwitserland",
  1965: "27 mei 1965|Inter Milan|Italië|1 – 0|Benfica|Portugal|San Siro|Milaan|Italië|Geen uitreiking|Liverpool|Engeland|Vasas ETO Győr|Hongarije",
  1966: "11 mei 1966|Real Madrid|Spanje|2 – 1|Partizan Belgrado|Joegoslavië|Heizelstadion|Brussel|België|Geen uitreiking|Inter Milan|Italië|Manchester United|Engeland",
  1967: "25 mei 1967|Celtic|Schotland|2 – 1|Inter Milan|Italië|Estádio Nacional|Lissabon|Portugal|Geen uitreiking|AS Dukla Praag|Tsjecho-Slowakije|CSKA Sofia|Bulgarije",
  1968: "29 mei 1968|Manchester United|Engeland|4 – 1 nv|Benfica|Portugal|Wembley|Londen|Engeland|Geen uitreiking|Real Madrid|Spanje|Juventus|Italië",
  1969: "28 mei 1969|AC Milan|Italië|4 – 1|Ajax|Nederland|Estadio Santiago Bernabéu|Madrid|Spanje|Geen uitreiking|Manchester United|Engeland|Spartak Trnava|Tsjecho-Slowakije",
  1970: "6 mei 1970|Feyenoord|Nederland|2 – 1 nv|Celtic|Schotland|San Siro|Milaan|Italië|Geen uitreiking|Legia Warschau|Polen|Leeds United|Engeland",
  1971: "2 juni 1971|Ajax|Nederland|2 – 0|Panathinaikos|Griekenland|Wembley|Londen|Engeland|Geen uitreiking|Atlético Madrid|Spanje|Rode Ster Belgrado|Joegoslavië",
  1972: "31 mei 1972|Ajax|Nederland|2 – 0|Inter Milan|Italië|De Kuip|Rotterdam|Nederland|Geen uitreiking|Benfica|Portugal|Celtic|Schotland",
  1973: "30 mei 1973|Ajax|Nederland|1 – 0|Juventus|Italië|Rode Sterstadion|Belgrado|Joegoslavië|Geen uitreiking|Real Madrid|Spanje|Derby County|Engeland",
  1974: "17 mei 1974|Bayern München|Duitsland|4 – 0|Atlético Madrid|Spanje|Heizelstadion|Brussel|België|Geen uitreiking|Újpest Dósza|Hongarije|Celtic|Schotland",
  1975: "28 mei 1975|Bayern München|Duitsland|2 – 0|Leeds United|Engeland|Parc des Princes|Parijs|Frankrijk|Geen uitreiking|Saint-Étienne|Frankrijk|Barcelona|Spanje",
  1976: "12 mei 1976|Bayern München|Duitsland|1 – 0|Saint-Étienne|Frankrijk|Hampden Park|Glasgow|Schotland|Geen uitreiking|Real Madrid|Spanje|PSV|Nederland",
  1977: "25 mei 1977|Liverpool|Engeland|3 – 1|Borussia Mönchengladbach|Duitsland|Stadio Olimpico|Rome|Italië|Geen uitreiking|Zürich|Zwitserland|Dynamo Kiev|Sovjet-Unie",
  1978: "10 mei 1978|Liverpool|Engeland|1 – 0|Club Brugge|België|Wembley|Londen|Engeland|Geen uitreiking|Borussia Mönchengladbach|Duitsland|Juventus|Italië",
  1979: "30 mei 1979|Nottingham Forest|Engeland|1 – 0|Malmö|Zweden|Olympiastadion|München|West-Duitsland|Geen uitreiking|Köln|Duitsland|Austria Wien|Oostenrijk",
  1980: "28 mei 1980|Nottingham Forest|Engeland|1 – 0|Hamburger SV|Duitsland|Estadio Santiago Bernabéu|Madrid|Spanje|Geen uitreiking|Ajax|Nederland|Real Madrid|Spanje",
  1981: "27 mei 1981|Liverpool|Engeland|1 – 0|Real Madrid|Spanje|Parc des Princes|Parijs|Frankrijk|Geen uitreiking|Bayern München|Duitsland|Inter Milan|Italië",
  1982: "26 mei 1982|Aston Villa|Engeland|1 – 0|Bayern München|Duitsland|De Kuip|Rotterdam|Nederland|Geen uitreiking|Anderlecht|België|CSKA Sofia|Bulgarije",
  1983: "25 mei 1983|Hamburger SV|Duitsland|1 – 0|Juventus|Italië|Olympisch Stadion Spyridon Louis|Athene|Griekenland|Geen uitreiking|Real Sociedad|Spanje|Widzew Łódź|Polen",
  1984: "30 mei 1984|Liverpool|Engeland|1 – 1 ns (4 – 2)|AS Roma|Italië|Stadio Olimpico|Rome|Italië|Geen uitreiking|Dinamo Boekarest|Roemenië|Dundee United|Schotland",
  1985: "29 mei 1985|Juventus|Italië|1 – 0|Liverpool|Engeland|Heizelstadion|Brussel|België|Geen uitreiking|Bordeaux|Frankrijk|Panathinaikos|Griekenland",
  1986: "7 mei 1986|Steaua Boekarest|Roemenië|0 – 0 ns (2 – 0)|Barcelona|Spanje|Ramón Sánchez Pizjuán|Sevilla|Spanje|Geen uitreiking|Anderlecht|België|Göteborg|Zweden",
  1987: "27 mei 1987|Porto|Portugal|2 – 1|Bayern München|Duitsland|Prater Stadion|Wenen|Oostenrijk|Geen uitreiking|Dynamo Kiev|Sovjet-Unie|Real Madrid|Spanje",
  1988: "25 mei 1988|PSV|Nederland|0 – 0 ns (6 – 5)|Benfica|Portugal|Neckarstadion|Stuttgart|West-Duitsland|Geen uitreiking|Real Madrid|Spanje|Steaua Boekarest|Roemenië",
  1989: "24 mei 1989|AC Milan|Italië|4 – 0|Steaua Boekarest|Roemenië|Camp Nou|Barcelona|Spanje|Geen uitreiking|Real Madrid|Spanje|Galatasaray|Turkije",
  1990: "23 mei 1990|AC Milan|Italië|1 – 0|Benfica|Portugal|Prater Stadion|Wenen|Oostenrijk|Geen uitreiking|Bayern München|Duitsland|Marseille|Frankrijk",
  1991: "29 mei 1991|Rode Ster Belgrado|Joegoslavië|0 – 0 ns (5 – 3)|Marseille|Frankrijk|Stadio San Nicola|Bari|Italië|Geen uitreiking|Bayern München|Duitsland|Spartak Moskou|Sovjet-Unie",
  1992: "20 mei 1992|Barcelona|Spanje|1 – 0 nv|Sampdoria|Italië|Wembley|Londen|Engeland|Geen uitreiking|Sparta Praag|Tsjecho-Slowakije|Rode Ster Belgrado|Joegoslavië",
  1993: "26 mei 1993|Marseille|Frankrijk|1 – 0|AC Milan|Italië|Olympiastadion|München|Duitsland|Geen uitreiking|Rangers|Schotland|Göteborg|Zweden",
  1994: "18 mei 1994|AC Milan|Italië|4 – 0|Barcelona|Spanje|Olympisch Stadion Spyridon Louis|Athene|Griekenland|Geen uitreiking|Monaco|Frankrijk|Porto|Portugal",
  1995: "24 mei 1995|Ajax|Nederland|1 – 0|AC Milan|Italië|Ernst Happelstadion|Wenen|Oostenrijk|Geen uitreiking|Bayern München|Germany|Paris Saint-Germain|France",
  1996: "22 mei 1996|Juventus|Italië|1 – 1 ns (4 – 2)|Ajax|Nederland|Stadio Olimpico|Rome|Italië|Geen uitreiking|Nantes|France|Panathinaikos|Greece",
  1997: "28 mei 1997|Borussia Dortmund|Germany|3 – 1|Juventus|Italië|Olympiastadion|München|Germany|Geen uitreiking|Manchester United|England|Ajax|Nederland",
  1998: "20 mei 1998|Real Madrid|Spain|1 – 0|Juventus|Italië|Amsterdam ArenA|Amsterdam|Nederland|Geen uitreiking|Borussia Dortmund|Germany|Monaco|France",
  1999: "26 mei 1999|Manchester United|England|2 – 1|Bayern München|Germany|Camp Nou|Barcelona|Spain|Mario Basler (Bayern München)|Juventus|Italy|Dynamo Kiev|Ukraine",
  2000: "24 mei 2000|Real Madrid|Spain|3 – 0|Valencia|Spain|Stade de France|Parijs|Frankrijk|Steve McManaman (Real Madrid)|Bayern München|Germany|Barcelona|Spain",
  2001: "23 mei 2001|Bayern München|Germany|1 – 1 ns (5 – 4)|Valencia|Spain|San Siro|Milaan|Italië|Oliver Kahn (Bayern München)|Real Madrid|Spain|Leeds United|England",
  2002: "15 mei 2002|Real Madrid|Spain|2 – 1|Bayer Leverkusen|Germany|Hampden Park|Glasgow|Schotland|Zinédine Zidane (Real Madrid)|Barcelona|Spain|Manchester United|England",
  2003: "28 mei 2003|AC Milan|Italy|0 – 0 ns (3 – 2)|Juventus|Italy|Old Trafford|Manchester|Engeland|Paolo Maldini (AC Milan)|Inter Milan|Italy|Real Madrid|Spain",
  2004: "26 mei 2004|Porto|Portugal|3 – 0|Monaco|France|Arena AufSchalke|Gelsenkirchen|Duitsland|Deco (Porto)|Deportivo La Coruña|Spain|Chelsea|England",
  2005: "25 mei 2005|Liverpool|England|3 – 3 ns (3 – 2)|AC Milan|Italy|Atatürk Olympisch Stadion|Istanbul|Turkije|Steven Gerrard (Liverpool)|Chelsea|England|PSV|Nederland",
  2006: "17 mei 2006|Barcelona|Spain|2 – 1|Arsenal|England|Stade de France|Parijs|Frankrijk|Samuel Eto'o (Barcelona)|AC Milan|Italy|Villarreal|Spain",
  2007: "23 mei 2007|AC Milan|Italy|2 – 1|Liverpool|England|Olympisch Stadion Spyridon Louis|Athene|Griekenland|Filippo Inzaghi (AC Milan)|Manchester United|England|Chelsea|England",
  2008: "21 mei 2008|Manchester United|England|1 – 1 ns (6 – 5)|Chelsea|England|Luzhniki Stadion|Moskou|Rusland|Edwin van der Sar (Manchester United)|Barcelona|Spain|Liverpool|England",
  2009: "27 mei 2009|Barcelona|Spain|2 – 0|Manchester United|England|Stadio Olimpico|Rome|Italië|Xavi (Barcelona)|Chelsea|England|Arsenal|England",
  2010: "22 mei 2010|Inter Milan|Italy|2 – 0|Bayern München|Germany|Estadio Santiago Bernabéu|Madrid|Spanje|Diego Milito (Inter Milan)|Barcelona|Spain|Olympique Lyon|France",
  2011: "28 mei 2011|Barcelona|Spain|3 – 1|Manchester United|England|Wembley|Londen|Engeland|Lionel Messi (Barcelona)|Real Madrid|Spain|Schalke 04|Germany",
  2012: "19 mei 2012|Chelsea|England|1 – 1 ns (5 – 4)|Bayern München|Germany|Allianz Arena|München|Duitsland|Didier Drogba (Chelsea)|Barcelona|Spain|Real Madrid|Spain",
  2013: "25 mei 2013|Bayern München|Germany|2 – 1|Borussia Dortmund|Germany|Wembley|Londen|Engeland|Arjen Robben (Bayern München)|Barcelona|Spain|Real Madrid|Spain",
  2014: "24 mei 2014|Real Madrid|Spain|4 – 1 nv|Atlético Madrid|Spain|Estádio da Luz|Lissabon|Portugal|Ángel Di María (Real Madrid)|Bayern München|Germany|Chelsea|England",
  2015: "6 juni 2015|Barcelona|Spain|3 – 1|Juventus|Italy|Olympiastadion|Berlijn|Duitsland|Andrés Iniesta (Barcelona)|Bayern München|Germany|Real Madrid|Spain",
  2016: "28 mei 2016|Real Madrid|Spain|1 – 1 ns (5 – 3)|Atlético Madrid|Spain|San Siro|Milaan|Italië|Sergio Ramos (Real Madrid)|Manchester City|England|Bayern München|Germany",
  2017: "3 juni 2017|Real Madrid|Spain|4 – 1|Juventus|Italy|Millennium Stadium|Cardiff|Wales|Cristiano Ronaldo (Real Madrid)|Atlético Madrid|Spain|Monaco|France",
  2018: "26 mei 2018|Real Madrid|Spain|3 – 1|Liverpool|England|NSK Olimpiejsky|Kiev|Oekraïne|Gareth Bale (Real Madrid)|Bayern München|Germany|AS Roma|Italy",
  2019: "1 juni 2019|Liverpool|England|2 – 0|Tottenham Hotspur|England|Estádio Metropolitano|Madrid|Spanje|Virgil van Dijk (Liverpool)|Barcelona|Spain|Ajax|Nederland",
  2020: "23 augustus 2020|Bayern München|Germany|1 – 0|Paris Saint-Germain|France|Estádio da Luz|Lissabon|Portugal|Kingsley Coman (Bayern München)|Olympique Lyon|France|Leipzig|Germany",
  2021: "29 mei 2021|Chelsea|England|1 – 0|Manchester City|England|Estádio do Dragão|Porto|Portugal|N'Golo Kanté (Chelsea)|Real Madrid|Spain|Paris Saint-Germain|France",
  2022: "28 mei 2022|Real Madrid|Spain|1 – 0|Liverpool|England|Stade de France|Parijs|Frankrijk|Thibaut Courtois (Real Madrid)|Manchester City|England|Villarreal|Spain",
  2023: "10 juni 2023|Manchester City|Engeland|1 – 0|Inter Milan|Italië|Atatürk Olympisch Stadion|Istanbul|Turkije|Rodri (Manchester City)|Real Madrid|Spanje|AC Milan|Italië",
  2024: "1 juni 2024|Real Madrid|Spanje|2 – 0|Borussia Dortmund|Duitsland|Wembley Stadium|Londen|Engeland|Dani Carvajal (Real Madrid)|Bayern München|Duitsland|Paris Saint-Germain|Frankrijk",
};

    
