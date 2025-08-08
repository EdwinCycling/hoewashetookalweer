
// Data for Formule 1 World Champions by year.
// Format for each year's string:
// "coureur|team|motorleverancier|banden|aantal_overwinningen|aantal_races|punten|beslissende_race|marge|constructeur"

export interface Formule1YearData {
  year: number;
  coureur: string;
  team: string;
  motorleverancier: string;
  banden: string;
  aantal_overwinningen: string; // Stored as string from split, can be parsed to number if needed
  aantal_races: string;         // Stored as string
  punten: string;               // Stored as string
  beslissende_race: string;
  marge: string;                // Stored as string
  constructeur: string;
}

export const FORMULE1_RAW_DATA: Record<number, string> = {
  1950: "Nino Farina|Alfa Romeo|Alfa Romeo|P|3|7|30|GP van Italië|3|Geen constructeurskampioenschap",
  1951: "Juan Manuel Fangio|Alfa Romeo|Alfa Romeo|P|3|8|31|GP van Spanje|6|Geen constructeurskampioenschap",
  1952: "Alberto Ascari|Ferrari|Ferrari|F/P|6|8|36|GP van Duitsland|12|Geen constructeurskampioenschap",
  1953: "Alberto Ascari|Ferrari|Ferrari|P|5|9|34.5|GP van Zwitserland|6.5|Geen constructeurskampioenschap",
  1954: "Juan Manuel Fangio|Maserati/Mercedes|Maserati/Mercedes-Benz|P/C|6|9|42|GP van Zwitserland|16.857|Geen constructeurskampioenschap",
  1955: "Juan Manuel Fangio|Mercedes|Mercedes-Benz|C|4|7|40|GP van Groot-Brittannië|17|Geen constructeurskampioenschap",
  1956: "Juan Manuel Fangio|Ferrari|Ferrari|E|3|8|30|GP van Italië|3|Geen constructeurskampioenschap",
  1957: "Juan Manuel Fangio|Maserati|Maserati|P|4|8|40|GP van Duitsland|15|Geen constructeurskampioenschap",
  1958: "Mike Hawthorn|Ferrari|Ferrari|E|1|11|42|GP van Marokko|1|Vanwall",
  1959: "Jack Brabham|Cooper|Coventry Climax|D|2|9|31|GP van de VS|4|Cooper-Climax",
  1960: "Jack Brabham|Cooper|Coventry Climax|D|5|10|43|GP van Italië|9|Cooper-Climax",
  1961: "Phil Hill|Ferrari|Ferrari|D|2|8|34|GP van Italië|1|Ferrari",
  1962: "Graham Hill|BRM|BRM|D|4|9|42|GP van Zuid-Afrika|12|BRM",
  1963: "Jim Clark|Lotus|Coventry Climax|D|7|10|54|GP van Italië|21|Lotus-Climax",
  1964: "John Surtees|Ferrari|Ferrari|D|2|10|40|GP van Mexico|1|Ferrari",
  1965: "Jim Clark|Lotus|Coventry Climax|D|6|10|54|GP van Duitsland|14|Lotus-Climax",
  1966: "Jack Brabham|Brabham|Repco|G|4|9|42|GP van Italië|14|Brabham-Repco",
  1967: "Denny Hulme|Brabham|Repco|G|2|11|51|GP van Mexico|5|Brabham-Repco",
  1968: "Graham Hill|Lotus|Ford|F|3|12|48|GP van Mexico|12|Lotus-Ford",
  1969: "Jackie Stewart|Matra|Ford|D|6|11|63|GP van Italië|26|Matra-Ford",
  1970: "Jochen Rindt|Lotus|Ford|F|5|13|45|GP van de VS|5|Lotus-Ford",
  1971: "Jackie Stewart|Tyrrell|Ford|G|6|11|62|GP van Oostenrijk|29|Tyrrell-Ford",
  1972: "Emerson Fittipaldi|Lotus|Ford|F|5|12|61|GP van Italië|16|Lotus-Ford",
  1973: "Jackie Stewart|Tyrrell|Ford|G|5|15|63|GP van Italië|16|Lotus-Ford",
  1974: "Emerson Fittipaldi|McLaren|Ford|G|3|15|55|GP van de VS|3|McLaren-Ford",
  1975: "Niki Lauda|Ferrari|Ferrari|G|5|14|64.5|GP van Italië|19.5|Ferrari",
  1976: "James Hunt|McLaren|Ford|G|6|16|69|GP van Japan|1|Ferrari",
  1977: "Niki Lauda|Ferrari|Ferrari|G|3|17|72|GP van de VS|17|Ferrari",
  1978: "Mario Andretti|Lotus|Ford|G|6|16|64|GP van Italië|13|Lotus-Ford",
  1979: "Jody Scheckter|Ferrari|Ferrari|M|3|15|51|GP van Italië|4|Ferrari",
  1980: "Alan Jones|Williams|Ford|G|5|14|67|GP van Canada|13|Williams-Ford",
  1981: "Nelson Piquet|Brabham|Ford|M/G|3|15|50|GP van Las Vegas|1|Williams-Ford",
  1982: "Keke Rosberg|Williams|Ford|G|1|16|44|GP van Las Vegas|5|Ferrari",
  1983: "Nelson Piquet|Brabham|BMW|M|3|15|59|GP van Zuid-Afrika|2|Ferrari",
  1984: "Niki Lauda|McLaren|TAG|M|5|16|72|GP van Portugal|0.5|McLaren-TAG",
  1985: "Alain Prost|McLaren|TAG|G|5|16|73|GP van Europa|20|McLaren-TAG",
  1986: "Alain Prost|McLaren|TAG|G|4|16|72|GP van Australië|2|Williams-Honda",
  1987: "Nelson Piquet|Williams|Honda|G|3|16|73|GP van Japan|12|Williams-Honda",
  1988: "Ayrton Senna|McLaren|Honda|G|8|16|90|GP van Japan|3|McLaren-Honda",
  1989: "Alain Prost|McLaren|Honda|G|4|16|76|GP van Japan|16|McLaren-Honda",
  1990: "Ayrton Senna|McLaren|Honda|G|6|16|78|GP van Japan|7|McLaren-Honda",
  1991: "Ayrton Senna|McLaren|Honda|G|7|16|96|GP van Japan|24|McLaren-Honda",
  1992: "Nigel Mansell|Williams|Renault|G|9|16|108|GP van Hongarije|52|Williams-Renault",
  1993: "Alain Prost|Williams|Renault|G|7|16|99|GP van Portugal|26|Williams-Renault",
  1994: "Michael Schumacher|Benetton|Ford|G|8|16|92|GP van Australië|1|Williams-Renault",
  1995: "Michael Schumacher|Benetton|Renault|G|9|17|102|GP van de Pacific|33|Benetton-Renault",
  1996: "Damon Hill|Williams|Renault|G|8|16|97|GP van Japan|19|Williams-Renault",
  1997: "Jacques Villeneuve|Williams|Renault|G|7|17|81|GP van Europa|39|Williams-Renault",
  1998: "Mika Häkkinen|McLaren|Mercedes-Benz|B|8|16|100|GP van Japan|14|McLaren-Mercedes",
  1999: "Mika Häkkinen|McLaren|Mercedes-Benz|B|5|16|76|GP van Japan|2|Ferrari",
  2000: "Michael Schumacher|Ferrari|Ferrari|B|9|17|108|GP van Japan|19|Ferrari",
  2001: "Michael Schumacher|Ferrari|Ferrari|B|9|17|123|GP van Hongarije|58|Ferrari",
  2002: "Michael Schumacher|Ferrari|Ferrari|B|11|17|144|GP van Frankrijk|67|Ferrari",
  2003: "Michael Schumacher|Ferrari|Ferrari|B|6|17|93|GP van Japan|2|Ferrari",
  2004: "Michael Schumacher|Ferrari|Ferrari|B|13|18|148|GP van België|34|Ferrari",
  2005: "Fernando Alonso|Renault F1 Team|Renault|M|7|19|133|GP van Brazilië|21|Renault F1 Team",
  2006: "Fernando Alonso|Renault F1 Team|Renault|M|7|18|134|GP van Brazilië|13|Renault F1 Team",
  2007: "Kimi Räikkönen|Ferrari|Ferrari|B|6|17|110|GP van Brazilië|1|Ferrari",
  2008: "Lewis Hamilton|McLaren|Mercedes-Benz|B|5|18|98|GP van Brazilië|1|Ferrari",
  2009: "Jenson Button|Brawn GP|Mercedes-Benz|B|6|17|95|GP van Brazilië|11|Brawn-Mercedes",
  2010: "Sebastian Vettel|Red Bull Racing|Renault|B|5|19|256|GP van Abu Dhabi|4|Red Bull Racing-Renault",
  2011: "Sebastian Vettel|Red Bull Racing|Renault|P|11|19|392|GP van Japan|122|Red Bull Racing-Renault",
  2012: "Sebastian Vettel|Red Bull Racing|Renault|P|5|20|281|GP van Brazilië|3|Red Bull Racing-Renault",
  2013: "Sebastian Vettel|Red Bull Racing|Renault|P|13|19|397|GP van India|155|Red Bull Racing-Renault",
  2014: "Lewis Hamilton|Mercedes|Mercedes-Benz|P|11|19|384|GP van Abu Dhabi|67|Mercedes",
  2015: "Lewis Hamilton|Mercedes|Mercedes-Benz|P|10|19|381|GP van de VS|59|Mercedes",
  2016: "Nico Rosberg|Mercedes|Mercedes-Benz|P|9|21|385|GP van Abu Dhabi|5|Mercedes",
  2017: "Lewis Hamilton|Mercedes|Mercedes-Benz|P|9|20|363|GP van Mexico|46|Mercedes",
  2018: "Lewis Hamilton|Mercedes|Mercedes-Benz|P|11|21|408|GP van Mexico|88|Mercedes",
  2019: "Lewis Hamilton|Mercedes|Mercedes-Benz|P|11|21|413|GP van de VS|87|Mercedes",
  2020: "Lewis Hamilton|Mercedes|Mercedes-Benz|P|11|17|347|GP van Turkije|124|Mercedes",
  2021: "Max Verstappen|Red Bull Racing|Honda|P|10|22|395.5|GP van Abu Dhabi|8|Mercedes",
  2022: "Max Verstappen|Red Bull Racing|Red Bull Powertrains|P|15|22|454|GP van Japan|146|Red Bull Racing-RBPT",
  2023: "Max Verstappen|Red Bull Racing|Honda RBPT|P|19|22|575|GP van Qatar|276|Red Bull Racing-Honda RBPT",
  2024: "Max Verstappen|Red Bull Racing|Honda RBPT|P|9|24|437|GP van Las Vegas|63|McLaren-Mercedes-Benz"
};


    
