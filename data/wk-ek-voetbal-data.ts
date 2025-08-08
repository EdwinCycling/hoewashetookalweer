
// Data for World Cup and European Championship Football by year.
// Format for each year's string:
// "Type|WinnaarLand|Score|FinalistLand|Stadion|Plaats|LandStadion|ManVanDeWedstrijd|ManVanDeWedstrijdLand"
// Use "N/A" or leave empty if a field is not applicable.

export interface WKEKVoetbalData {
  year: number;
  type: 'WK' | 'EK';
  winnerCountry: string;
  score: string;
  finalistCountry: string;
  stadium: string;
  city: string;
  stadiumCountry: string;
  manOfTheMatch?: string;
  manOfTheMatchCountry?: string;
}

export const WK_EK_VOETBAL_RAW_DATA: Record<number, string> = {
  1930: "WK|Uruguay|4 – 2|Argentinië|Estadio Centenario|Montevideo|Uruguay|Geen uitreiking|",
  1934: "WK|Italië|2 – 1 n.v.|Tsjecho-Slowakije|Stadio Nazionale PNF|Rome|Italië|Geen uitreiking|",
  1938: "WK|Italië|4 – 2|Hongarije|Stade olympique Yves-du-Manoir|Parijs|Frankrijk|Geen uitreiking|",
  1950: "WK|Uruguay|2 – 1|Brazilië|Maracanã|Rio de Janeiro|Brazilië|Geen uitreiking|",
  1954: "WK|West-Duitsland|3 – 2|Hongarije|Stade de Suisse|Bern|Zwitserland|Geen uitreiking|",
  1958: "WK|Brazilië|5 – 2|Zweden|Råsundastadion|Solna|Zweden|Geen uitreiking|",
  1960: "EK|Sovjet-Unie|2–1 n.v.|Joegoslavië|Parc des Princes|Parijs|Frankrijk|Geen uitreiking|",
  1962: "WK|Brazilië|3 – 1|Tsjecho-Slowakije|Estadio Nacional|Santiago|Chili|Geen uitreiking|",
  1964: "EK|Spanje|2–1|Sovjet-Unie|Santiago Bernabéu|Madrid|Spanje|Geen uitreiking|",
  1966: "WK|Engeland|4 – 2 n.v.|West-Duitsland|Wembley Stadium|Londen|Engeland|Geen uitreiking|",
  1968: "EK|Italië|2–0 replay|Joegoslavië|Stadio Olimpico|Rome|Italië|Geen uitreiking|",
  1970: "WK|Brazilië|4 – 1|Italië|Aztekenstadion|Mexico-Stad|Mexico|Geen uitreiking|",
  1972: "EK|West-Duitsland|3–0|Sovjet-Unie|Heizelstadion|Brussel|België|Geen uitreiking|",
  1974: "WK|West-Duitsland|2 – 1|Nederland|Olympiastadion|München|Duitsland|Geen uitreiking|",
  1976: "EK|Tsjecho-Slowakije|2–2 n.v. (5–3 p)|West-Duitsland|Rode Sterstadion|Belgrado|Joegoslavië|Geen uitreiking|",
  1978: "WK|Argentinië|3 – 1 n.v.|Nederland|Estadio Monumental Antonio Vespucio Liberti|Buenos Aires|Argentinië|Geen uitreiking|",
  1980: "EK|West-Duitsland|2–1|België|Stadio Olimpico|Rome|Italië|Geen uitreiking|",
  1982: "WK|Italië|3 – 1|West-Duitsland|Santiago Bernabéu|Madrid|Spanje|Geen uitreiking|",
  1984: "EK|Frankrijk|2–0|Spanje|Parc des Princes|Parijs|Frankrijk|Geen uitreiking|",
  1986: "WK|Argentinië|3 – 2|West-Duitsland|Aztekenstadion|Mexico-Stad|Mexico|Geen uitreiking|",
  1988: "EK|Nederland|2–0|Sovjet-Unie|Olympiastadion|München|West-Duitsland|Geen uitreiking|",
  1990: "WK|West-Duitsland|1 – 0|Argentinië|Stadio Olimpico|Rome|Italië|Geen uitreiking|",
  1992: "EK|Denemarken|2–0|Duitsland|Ullevi Stadion|Göteborg|Zweden|Geen uitreiking|",
  1994: "WK|Brazilië|0 – 0 n.v. (3 – 2 n.s.)|Italië|Rose Bowl|Pasadena|Verenigde Staten|Geen uitreiking|",
  1996: "EK|Duitsland|2–1 g.g.|Tsjechië|Wembley Stadium|Londen|Engeland|Geen uitreiking|",
  1998: "WK|Frankrijk|3 – 0|Brazilië|Stade de France|Saint-Denis|Frankrijk|Zinédine Zidane|Frankrijk",
  2000: "EK|Frankrijk|2–1 g.g.|Italië|De Kuip|Rotterdam|Nederland|Geen uitreiking|",
  2002: "WK|Brazilië|2 – 0|Duitsland|Nissanstadion|Yokohama|Japan|Ronaldo|Brazilië",
  2004: "EK|Griekenland|1–0|Portugal|Estádio da Luz|Lissabon|Portugal|Geen uitreiking|",
  2006: "WK|Italië|1 – 1 n.v. (5 – 3 n.s.)|Frankrijk|Olympiastadion|Berlijn|Duitsland|Andrea Pirlo|Italië",
  2008: "EK|Spanje|1–0|Duitsland|Ernst Happelstadion|Wenen|Oostenrijk|Geen uitreiking|",
  2010: "WK|Spanje|1 – 0 n.v.|Nederland|Soccer City|Johannesburg|Zuid-Afrika|Andrés Iniesta|Spanje",
  2012: "EK|Spanje|4–0|Italië|NSK Olimpiejsky|Kiev|Oekraïne|Geen uitreiking|",
  2014: "WK|Duitsland|1 – 0 n.v.|Argentinië|Maracanã|Rio de Janeiro|Brazilië|Mario Götze|Duitsland",
  2016: "EK|Portugal|1–0 n.v.|Frankrijk|Stade de France|Saint-Denis|Frankrijk|Geen uitreiking|",
  2018: "WK|Frankrijk|4 – 2|Kroatië|Olympisch Stadion Loezjniki|Moskou|Rusland|Antoine Griezmann|Frankrijk",
  2020: "EK|Italië|1–1 n.v. (3–2 p)|Engeland|Wembley Stadium|Londen|Engeland|Geen uitreiking|",
  2022: "WK|Argentinië|3 – 3 n.v. (4 – 2 n.s.)|Frankrijk|Lusailstadion|Lusail|Qatar|Lionel Messi|Argentinië",
  2024: "EK|Spanje|2–1|Engeland|Olympiastadion|Berlijn|Duitsland|Geen uitreiking|",
};
