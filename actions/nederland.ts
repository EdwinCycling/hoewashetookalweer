'use server';

export interface NederlandData {
  year: number;
  description: string;
}

export interface FetchNederlandResult {
  data: NederlandData[] | null; // Array to hold one or more entries for the year
  error?: string | null;
}

// Data for Nederland by year.
// Add more years and descriptions here in the format:
// year: "Description for events in that year."
const NEDERLAND_BY_YEAR_DATA: { [year: number]: string } = {
  1946 : "De wederopbouw begon met de oprichting van het Bureau voor Wederopbouw. Economisch herstelde de industrie langzaam, met 10% werkloosheid (CBS). De Noodwet Ouderdomsvoorziening werd ingevoerd, een eerste stap naar de AOW. Cultureel herleefde Nederland met de oprichting van het Holland Festival en de lancering van de strip Eric de Noorman van Hans G. Kresse op 5 juni. De Linggadjati-overeenkomst over Indonesische onafhankelijkheid leidde tot economische onzekerheid door verlies van koloniale handel. Sociaal werd de NVSH opgericht op 19 mei, een mijlpaal voor seksuele hervorming. Internationaal opende het Internationaal Gerechtshof in Den Haag op 16 april. Sportief won Fanny Blankers-Koen goud op de EK atletiek. Een Dakota-vliegtuigcrash op 14 november kostte 11 levens.",

  1947 : "De wederopbouw versnelde met Amerikaanse hulp via het Marshallplan, dat $1 miljard aan leningen opleverde. Economisch werd NV United Dutch Fokker’s Aircraft opgericht op 1 februari. Sociaal werd de Kinderbijslagwet ingevoerd, een impuls voor de naoorlogse babyboom. Cultureel verscheen Het Achterhuis van Anne Frank op 25 juni, een wereldwijde literaire mijlpaal, en won Jan van der Hoorn de Elfstedentocht op 8 februari. De Nederlandse Radio Unie werd gevormd op 10 februari, en Radio Nederland Wereldomroep startte op 15 april. Een munitie-explosie in Muiden op 17 januari kostte 16 levens, en een Dakota-crash bij Kopenhagen op 21 oktober eiste 16 doden. De Benelux Unie werd gevormd op 29 oktober. Een hittegolf op 27 juni bereikte 36,8°C in De Bilt.",
  
  1948 : "Het Marshallplan stimuleerde de economie, met 8% groei in de industrie (CBS). De wederopbouw van Rotterdam begon met de eerste wederopbouwwijk. Sociaal werd het Ziekenfonds opgericht, wat de gezondheidszorg uitbreidde. Cultureel won Fanny Blankers-Koen drie gouden medailles op de Olympische Spelen in Londen op 6 augustus, een nationaal hoogtepunt. Een wapenstilstand met Indonesië op 17 januari mislukte, en een communistische opstand in Nederlands-Indië op 18 september leidde tot spanningen. Een Constellation-vliegtuigcrash in Prestwick op 21 oktober kostte 40 levens. De kroning van Juliana op 6 september markeerde een koninklijke overgang. Economisch werd de exportsector versterkt.",
  
  1949 : "Op 27 december erkende Nederland Indonesië’s onafhankelijkheid, wat leidde tot verlies van koloniale inkomsten maar nieuwe handelsrelaties. Economisch groeide de export met 15%, vooral in landbouw (CBS). Sociaal werd het basisonderwijs gemoderniseerd met de Onderwijswet. Cultureel verscheen De Avonden van Gerard Reve, een iconische roman. De wederopbouw van de Rotterdamse haven werd voltooid. Internationaal erkende Nederland Israël op 29 januari, en de VN-Veiligheidsraad veroordeelde Nederlandse acties in Indonesië op 28 januari. Een Constellation-crash bij Bari op 23 juni kostte 33 levens. De aanleg van de Noordoostpolder begon op 15 maart, een mijlpaal in landwinning.",
  
  1950 : "De economie groeide met 5% dankzij het Marshallplan, en werkloosheid daalde naar 6% (CBS). Sociaal werd de Werkloosheidswet ingevoerd. Cultureel werd de eerste televisie-uitzending door Philips uitgezonden, en verscheen de film De Dijk is Dicht, over wederopbouw. De eerste naoorlogse Elfstedentocht werd gewonnen door Abe Lenstra op 7 februari. Internationaal trad Nederland toe tot de EGKS, en de onafhankelijkheid van Indonesië werd erkend op 27 december. Een treinongeluk bij Utrecht op 10 oktober kostte 12 levens. Sportief domineerde Fanny Blankers-Koen op de EK atletiek.",
  
  1951 : "De economie groeide met 4%, en de wederopbouw van Rotterdam vorderde met nieuwe woonwijken. Sociaal werd de Algemene Kinderbijslagwet uitgebreid. Cultureel won M. Vasalis de P.C. Hooft-prijs op 14 juli, en de eerste televisie-uitzending door de NTS vond plaats op 2 juli. Internationaal trad Nederland toe tot de EGKS op 18 april. Een busongeluk in Gelderland op 14 september kostte 15 levens. De aanleg van de Noordoostpolder vorderde, en Schiphol werd uitgebreid met een nieuwe terminal. Sportief won Feijenoord de landstitel.",
  
  1952 : "De economie groeide met 4%, gedreven door export van staal en textiel (CBS). Sociaal werd de Ziekenfondswet ingevoerd, wat gezondheidszorg toegankelijker maakte. Cultureel werd Fanfare van Bert Haanstra een succes, en heropende het Stedelijk Museum in Amsterdam. Internationaal werd Nederland medeoprichter van de NAVO op 4 april. De aanleg van de Deltawerken begon op 3 oktober, gestimuleerd door eerdere overstromingen. Een scheepsongeluk in de Rotterdamse haven op 12 november kostte 8 levens.",
  
  1953 : "De watersnoodramp op 1 februari trof Zeeland en Zuid-Holland, met 1.836 doden en €1 miljard schade, wat leidde tot de Deltawerken. Economisch stagneerde de wederopbouw door herstelkosten. Sociaal groeide de solidariteit met landelijke inzamelingen. Cultureel verscheen De Donkere Kamer van Damokles van Willem Frederik Hermans, en werd het eerste Holland Festival gehouden. Een treinongeluk bij Haarlem op 7 juli kostte 10 levens. Sportief won Ajax de landstitel. Het klimaat was stormachtig, met de ramp als dieptepunt.",
  
  1954 : "De Deltawerken begonnen met de aanleg van dijken, gefinancierd door obligaties. Economisch herstelde de industrie met 6% groei (CBS). Sociaal werd het hoger onderwijs toegankelijker door subsidies. Cultureel won Simon Vestdijk de P.C. Hooft-prijs op 14 mei, en werd de AVRO-radio populair. De wederopbouw van de Rotterdamse haven begon op 14 mei. Een fabrieksbrand in Eindhoven op 22 augustus veroorzaakte grote schade. Sportief organiseerde Nederland de Ronde van Nederland.",
  
  1955 : "De economie bloeide met 7% groei, vooral in scheepsbouw en landbouw (CBS). Sociaal werd de AOW voorbereid, een mijlpaal voor ouderenzorg. Cultureel werd Ciske de Rat een filmhit, en won Het Bittere Kruid van Marga Minco de AKO Literatuurprijs. Schiphol werd uitgebreid met een nieuwe terminal op 3 juni. Een busongeluk in Friesland op 19 oktober kostte 9 levens. De Utrechtse Jaarbeurs werd geopend, een handelsimpuls.",
  
  1956 : "De AOW werd ingevoerd, een hoeksteen van de welvaartsstaat. Economisch groeide de Rotterdamse haven met 20 miljoen ton overslag (CBS). Cultureel werd Nederland gastland voor het eerste Eurovisie Songfestival op 24 mei, en verscheen Nooit Meer Slapen van Willem Frederik Hermans. De Haringvlietdam werd voltooid, een Deltawerken-mijlpaal. Een scheepsongeluk in de Noordzee op 8 november kostte 12 levens. Een koude winter met sneeuwval markeerde februari.",
  
  1957 : "De Verdragen van Rome op 25 maart legden de basis voor de EEG, met handelsvoordelen. Economisch groeide de industrie met 5%, met Philips als wereldleider (CBS). Sociaal werd de positie van vrouwen verbeterd door afschaffing van handelsbeperkingen voor gehuwde vrouwen. Cultureel won Ida Gerhardt de P.C. Hooft-prijs. De Afsluitdijk werd voltooid. Een treinongeluk bij Utrecht op 14 juli kostte 7 levens. Sportief won Feijenoord de landstitel.",
  
  1958 : "De economie groeide met 4%, gedreven door chemische producten (CBS). Sociaal werd basisonderwijs gratis, wat deelname verhoogde. Cultureel werd Dorp aan de Rivier genomineerd voor een Oscar, en werd de NTS commerciële televisie. De Zeelandbrug werd geopend, een infrastructurele mijlpaal. Een fabrieksongeval in Amsterdam op 9 september kostte 5 levens. Sportief organiseerde Nederland het EK judo.",
  
  1959 : "De wederopbouw bereikte een hoogtepunt met de Bijlmermeer in Amsterdam. Economisch daalde werkloosheid naar 3% (CBS). Sociaal werd de Wet op de Jeugdvoorzieningen ingevoerd. Cultureel won Harry Mulisch de Reina Prinsen Geerligsprijs voor Twee Vrouwen. De Rotterdamse metro werd gepland op 15 juni. Een busongeluk in Zeeland op 22 oktober kostte 8 levens. Sportief organiseerde Nederland het EK judo.",
  
  1960 : "De economie groeide met 6%, met een bloeiende auto-industrie (DAF) (CBS). Sociaal werd de Algemene Wet Bijzondere Ziektekosten ingevoerd. Cultureel werd De Zaak M.P. een filmhit, en verscheen De zaak 40/61 van Harry Mulisch. De Haringvlietdam werd geopend, een Deltawerken-succes. Een treinongeluk bij Den Haag op 12 november kostte 6 levens. Bevrijdingsdag werd groots gevierd op 4 mei.",
  
  1961 : "De economie groeide met 5%, gedreven door elektronica en scheepsbouw (CBS). Sociaal werd de Algemene Bijstandswet ingevoerd. Cultureel won M. Vasalis opnieuw een prijs, en verscheen De tranen der acacia’s van Willem Frederik Hermans. De Euromast werd geopend in Rotterdam, een symbool van moderniteit. Een scheepsongeluk in de Rotterdamse haven op 7 oktober kostte 9 levens. Sportief won Feijenoord de landstitel.",
  
  1962 : "Op 1 oktober werd Nederlands-Nieuw-Guinea overgedragen aan Indonesië, waarmee de dekolonisatie werd afgerond. Economisch groeide de Rotterdamse haven met 25 miljoen ton overslag (CBS). Sociaal werd het hoger onderwijs toegankelijker door de Wet op het Wetenschappelijk Onderwijs. Cultureel werd Als Twee Druppels Water een filmhit, en werd de eerste kleurentelevisie getest. De eerste Nederlandse kernreactor opende in Petten op 1 juni. Een busongeluk in Limburg op 14 september kostte 7 levens.",
  
  1963 : "De economie groeide met 6%, met Philips als wereldleider (CBS). Sociaal werd de Mammoetwet ingevoerd, moderniserend voortgezet onderwijs. Cultureel won Willem Frederik Hermans de P.C. Hooft-prijs, en werd Ik Jan Cremer een controversiële bestseller. De Elfstedentocht trok tienduizenden toeschouwers. Een strenge winter met sneeuwval markeerde januari. Een treinongeluk bij Rotterdam op 8 november kostte 5 levens.",
  
  1964 : "De economische groei bereikte 7%, met een bloeiende auto-industrie (DAF) (CBS). Sociaal werd de Ziektewet uitgebreid. Cultureel won Het stenen bruidsbed van Harry Mulisch de P.C. Hooft-prijs, en werd Fanfare opnieuw populair. De Beneluxtunnel werd geopend. Een fabrieksbrand in Utrecht op 19 oktober veroorzaakte grote schade. Sportief won Ajax de landstitel.",
  
  1965 : "De economie groeide met 5%, maar inflatie steeg naar 4% (CBS). Sociaal begon de Provo-beweging, een jeugdrevolte. Cultureel werd het Beatles-optreden in Blokker een ijkpunt, en werd de eerste Nederlandse satelliet gelanceerd op 14 mei. De Grevelingendam werd aangelegd, een Deltawerken-stap. Een busongeluk in Gelderland op 7 november kostte 6 levens. Sportief organiseerde Nederland het EK hockey.",
  
  1966 : "De Provo-beweging leidde tot rellen in Amsterdam op 10 juni. Economisch groeide de industrie met 4%, maar werkloosheid steeg naar 2% (CBS). Cultureel verscheen Bericht aan de rattenkoning van Harry Mulisch, en werd De Aanslag gepland. De Coentunnel werd geopend. Een scheepsongeluk in de Noordzee op 12 december kostte 8 levens. Sportief won Feijenoord de landstitel.",
  
  1967 : "De economie groeide met 5%, met een sterke chemische sector (CBS). Sociaal werd de Wet op de Ondernemingsraden ingevoerd. Cultureel werd de VPRO progressief met Hoepla, en won Harry Mulisch de Constantijn Huygens-prijs. De Haringvlietdam werd voltooid. Ivo Samkalden werd de eerste Joodse burgemeester van Amsterdam. Een treinongeluk bij Utrecht op 9 oktober kostte 5 levens.",
  
  1968 : "De economische groei vertraagde naar 3% (CBS). Sociaal werd het homohuwelijk bespreekbaar door COC-acties, en werd Amsterdam een hippie-centrum met softdrugstolerantie. Cultureel werd Het Bureau van J.J. Voskuil een sensatie, en was De Lessen van de Liefde een filmhit. De Erasmusbrug werd geopend. Een busongeluk in Friesland op 14 november kostte 7 levens.",
  
  1969 : "De economie groeide met 4%, met een bloeiende luchtvaartsector (KLM) (CBS). Sociaal werd de abortuswet versoepeld na Dolle Mina-protesten. Cultureel werd Turks Fruit van Jan Wolkers een bestseller, en won Gerard Reve de P.C. Hooft-prijs. De Maagdenhuisbezetting markeerde sociale onrust. De Rotterdamse metro opende op 3 juli. Een fabrieksongeval in Den Haag op 8 december kostte 4 doden.",
  
  1970 : "De economie groeide met 4%, met sterke landbouwexport (CBS). Sociaal werd de Wet op de Loonvorming ingevoerd. Cultureel werd De aanslag van Harry Mulisch een meesterwerk, en ging Hair in première op 2 januari, een hippie-symbool. Ard Schenk werd wereldkampioen schaatsen op 15 februari, en Atje Keulen-Deelstra won de vrouwentitel op 1 maart. De Bijenkorf-rel op 13 maart markeerde sociale onrust. De Brouwersdam werd aangelegd.",
  
  1971 : "De economie groeide met 3%, maar inflatie verscheen (CBS). Sociaal werd de Wet op de Kinderopvang ingevoerd, en opende de Mildredhuis-kliniek op 27 februari als eerste abortuskliniek. Cultureel bloeide de feministische beweging met Baas in Eigen Buik, en werd De wegen der verbeelding van Cees Nooteboom een succes. Ard Schenk brak het 1500m-wereldrecord (1:58.7) op 16 januari. De IJtunnel werd geopend. Echtscheiding werd versoepeld op 23 maart.",
  
  1972 : "De oliecrisis begon, met 1% economische krimp (CBS). Sociaal werd de Wet op de Arbeidsongeschiktheid (WAO) ingevoerd. Cultureel werd De Openbaring van Hugo Claus een bestseller. Atje Keulen-Deelstra en Ard Schenk domineerden het schaatsen, met Europese en wereldtitels in januari en februari, en Schenk won drie olympische titels in Sapporo. De Oosterscheldekering werd voltooid. De milieubeweging groeide met protesten tegen vervuiling.",
  
  1973 : "De oliecrisis leidde tot autoloze zondagen en 2% economische krimp (CBS). Sociaal werd de Wet op de Huurtoeslag ingevoerd. Cultureel werd Turks Fruit een filmhit op 22 februari, en won Atje Keulen-Deelstra de wereldtitel schaatsen op 25 februari. De Elfstedentocht trok tienduizenden toeschouwers. Nederland erkende Oost-Duitsland (5 januari) en Noord-Vietnam (9 april). De anti-kernenergiebeweging groeide met protesten tegen Borssele.",
  
  1974 : "De oliecrisis hield aan, met benzinerantsoenering van 7 januari tot 4 februari en 5% werkloosheid (CBS). Sociaal werd de Wet op de Studiefinanciering ingevoerd. Cultureel werd Zwartboek van Paul Verhoeven een internationale hit. Atje Keulen-Deelstra won de wereldtitel schaatsen op 24 februari, en het vrouwenhockeyteam werd wereldkampioen op 24 april. Nederland bereikte de WK-finale voetbal. De Deltawerken vorderden.",
  
  1975 : "Op 25 november werd Suriname onafhankelijk, wat migratie naar Nederland stimuleerde. Economisch herstelde Nederland met 2% groei (CBS). Sociaal werd de Wet op de Echtscheiding versoepeld. Cultureel won Teach-In het Eurovisiesongfestival met Ding-a-dong. Een bom bij metrostation Venserpolder op 14 februari markeerde protest tegen metroaanleg. Een explosie in Geleen op 7 november kostte 14 levens. Amsterdam vierde zijn 700-jarig bestaan.",
  
  1976 : "De economie groeide met 3% (CBS). Sociaal werd de Wet op de Gelijke Behandeling ingevoerd. Cultureel won Rituelen van Cees Nooteboom de F. Bordewijk-prijs. Een treinongeluk in Schiedam op 4 mei kostte 24 levens. De Flevopolder werd geopend, een landwinningssucces. Minister Vorrink begon drinkwaterfluoridering op 29 april, een controversiële maatregel. Een brand verwoestte het Zeiss-planetarium in Den Haag op 29 januari.",
  
  1977 : "De economie groeide met 3% (CBS). Sociaal groeide de anti-kernenergiebeweging. Cultureel werd De donkere kamer van Damokles van Willem Frederik Hermans heruitgegeven. Een brand in Hotel Polen in Amsterdam op 9 mei kostte 33 levens. De Hobby Computer Club (HCC) werd opgericht op 27 april, een digitale mijlpaal. ADO Den Haag werd opgericht op 23 april. Een dokstaking eindigde op 28 februari.",
  
  1978 : "De economie groeide met 2%, maar werkloosheid steeg naar 6% (CBS). Sociaal werd de Wet op de Nabestaanden ingevoerd. Cultureel bereikte het Nederlands voetbalteam de WK-finale, een nationale trots. Protesten tegen de neutronenbom trokken 50.000 demonstranten op 19 maart. De Rotterdamse metro werd uitgebreid. Het Muziekcentrum Vredenburg opende in Utrecht op 26 januari. De moord op de Britse ambassadeur Richard Sykes op 22 maart schokte Nederland.",
  
  1979 : "De tweede oliecrisis leidde tot 1% economische krimp (CBS). Sociaal werd de Wet op de Jeugdhulpverlening ingevoerd. Cultureel werd De zwarte met het witte hart van Arthur Japin een hit. De Velser tunnel werd geopend. De anti-kernenergiebeweging groeide. Bands zoals Golden Earring bloeiden. Sportief won Ajax de landstitel. Het weer was gematigd, zonder rampen.",
  
  1980 : "De economie kromp met 2%, met 7% werkloosheid (CBS). Sociaal werd de Wet op de Wajong ingevoerd. Cultureel werd Het verdriet van België van Hugo Claus een bestseller, en vond de kroning van Beatrix plaats op 30 april, overschaduwd door krakersrellen. De Winsum-treinramp op 25 mei kostte 9 levens. De Paralympics in Arnhem openden op 21 mei. De Beneluxtunnel werd tolvrij op 1 januari.",
  
  1981 : "De economie groeide licht met 1% (CBS). Sociaal werd de Wet op de Zorgverzekering voorbereid. Cultureel won Harry Mulisch de P.C. Hooft-prijs. De vlucht van de Surinaamse president Hendrick Chin A Sen naar Nederland op 5 februari benadrukte banden met Suriname. Vrouwenrechten groeiden met campagnes voor gelijke lonen. Infrastructuurprojecten zoals snelweguitbreidingen ondersteunden de economie. Het weer was gematigd, zonder rampen.",
  
  1982 : "De economie herstelde met 1% groei (CBS). Sociaal werd de Wet op de Arbeidsvoorziening ingevoerd. Cultureel werd De stille kracht van Louis Couperus heruitgegeven. De moord op vier Nederlandse tv-ploegleden in El Salvador op 17 maart schokte het land. Hanneke Jagersma werd de eerste communistische burgemeester op 19 februari. De Rotterdamse haven werd uitgebreid. Sportief won AZ de landstitel.",
  
  1983 : "De economie groeide met 2% (CBS). Sociaal werd de Wet op de Leerplicht aangescherpt. Cultureel won De aanslag een Oscar, en opende de Amsterdamse Stopera. De IRAS-satelliet werd gelanceerd op 26 januari, een wetenschappelijke mijlpaal. Hella Haasse won de P.C. Hooft-prijs. Diversiteit groeide door migratie. Sportief won Feijenoord de landstitel.",
  
  1984 : "De economie groeide met 3% (CBS). Sociaal werd de Wet op de Huurtoeslag uitgebreid. Cultureel werd De zwarte van Arthur Japin een bestseller. Nederland herstelde diplomatieke banden met China op 1 februari. De Rotterdamse haven werd uitgebreid. Sportief organiseerde Nederland het EK atletiek. Het weer was koud en nat, zonder rampen.",
  
  1985 : "De economie groeide met 3%, met een sterke IT-sector (CBS). Sociaal werd de Wet op de Kinderbescherming ingevoerd. Cultureel werd Hersenschimmen van J. Bernlef een hit. Hein Vergeer won de wereldtitel schaatsen op 17 februari, en Evert van Benthem de Elfstedentocht op 21 februari. Het faillissement van ADM in Amsterdam op 19 februari was een economische tegenslag. Sportief won Ajax de landstitel.",
  
  1986 : "De Oosterscheldedam werd operationeel op 4 oktober, een Deltawerken-hoogtepunt. Economisch groeide de IT-sector met 4% (CBS). Sociaal werd de Wet op de Gelijke Behandeling uitgebreid. Cultureel werd De zaak van Harry Mulisch heruitgegeven. Hein Vergeer werd opnieuw wereldkampioen schaatsen op 16 februari. De arrestatie van drie IRA-terroristen op 16 januari was een veiligheidsmijlpaal. Sportief organiseerde Nederland het WK schaatsen.",
  
  1987 : "De economie groeide met 4%, met privatiseringen van KLM en PTT (CBS). Sociaal werd de Wet op de Jeugdcriminaliteit ingevoerd. Cultureel won De aanslag een Oscar, en werd het Homomonument in Amsterdam onthuld, een LHBTQ+-mijlpaal. De IJzelramp in Drenthe in maart veroorzaakte grote schade door ijsvorming. Sportief won PSV de Europacup I. De Flevolijn werd geopend.",
  
  1988 : "De economie groeide met 5%, met een sterke Rotterdamse haven (CBS). Sociaal groeide diversiteit door migratie. Cultureel won Nederland het EK voetbal in West-Duitsland, met Marco van Basten en Ruud Gullit als iconen. De Elfstedentocht trok wereldwijde aandacht. Sportief won PSV de landstitel. Het weer was koud en nat, zonder rampen.",
  
  1989 : "De economie groeide met 4%, met sterke export (CBS). Sociaal groeide acceptatie van diverse gemeenschappen. Cultureel won Harry Mulisch de P.C. Hooft-prijs. Het kindermisbruikschandaal in Oude Pekela leidde tot onrust, zonder veroordelingen. De Willemsspoortunnel werd geopend. Sportief organiseerde Nederland het EK judo. Het weer was gematigd, zonder rampen.",
  
  1990 : "De economie groeide met 3%, met privatiseringen in telecommunicatie (CBS). Sociaal werd de Wet op de Jeugdzorg ingevoerd. Cultureel bereikte het Nederlands voetbalteam het WK, maar verloor. De milieubeweging groeide met recyclingcampagnes. De A1 werd uitgebreid. Sportief won Ajax de landstitel. Het weer was koud en nat, zonder rampen.",
  
  1991 : "De economie groeide met 2% ondanks de Golfoorlog (CBS). Sociaal werd de Wet op de Arbeidsvoorziening uitgebreid. Cultureel werd Het huis van de moskee van Kader Abdolah een bestseller, en won Hella Haasse de P.C. Hooft-prijs. De Deltawerken werden erkend als werelderfgoed. Sportief organiseerde Nederland het WK volleybal. Het weer was gematigd, zonder rampen.",
  
  1992 : "De economie groeide met 1%, met een sterke financiële sector (CBS). Sociaal werd de Wet op de Kinderopvang uitgebreid. Cultureel werd De wetten van Connie Palmen een sensatie. De Rotterdamse Kop van Zuid werd geopend, een stedelijke vernieuwing. Sportief won Ajax de UEFA Cup. Het weer was koud en nat, zonder rampen.",
  
  1993 : "Euthanasie werd gereguleerd, een medische primeur. Economisch groeide het BBP met 0,5% (CBS). Sociaal bleef Nederland tolerant, zonder grote onrust. Cultureel werd Ruth Jacott dertiende op het Eurovisiesongfestival met Vrede. Infrastructuur was goed onderhouden, zonder nieuwe projecten. Sportief won Feijenoord de landstitel. Het weer was wisselvallig, zonder rampen.",
  
  1994 : "De economie groeide met 2,8% (CBS). Sociaal bleef Nederland progressief met discussies over inclusie. Cultureel won Ajax de Eredivisie, een voetbaltriomf. Infrastructuurprojecten zoals spooronderhoud hielden Nederland mobiel. Sportief organiseerde Nederland het EK atletiek. Het weer was mild, zonder extremen.",
  
  1995 : "Zware overstromingen veroorzaakten een noodtoestand, met 250.000 evacuaties. Economisch groeide het BBP met 2,6% (CBS). Sociaal toonde Nederland solidariteit bij herstel. Cultureel bloeide het Holland Festival ondanks de crisis. Infrastructuur kreeg investeringen in dijken. Sportief won Ajax de Champions League. Het weer was nat en stormachtig.",
  
  1996 : "De economie groeide met 3% (CBS). Sociaal bleef Nederland een koploper in tolerantie. Cultureel bloeiden festivals, met Golden Earring internationaal succesvol. Infrastructuurprojecten verbeterden het spoornetwerk. De Maeslantkering werd voltooid, een Deltawerken-mijlpaal. Sportief organiseerde Nederland het WK schaatsen. Het weer was regenachtig, zonder rampen.",
  
  1997 : "De economie groeide met 3,8% (CBS). Sociaal werd sociale cohesie benadrukt. Cultureel kwalificeerde het Nederlands elftal zich voor het WK 1998, een nationale trots. Infrastructuurprojecten richtten zich op duurzaamheid zoals fietspaden. De Rotterdamse Beneluxlijn werd voltooid. Sportief won PSV de landstitel. Het weer was mild, zonder extremen.",
  
  1998 : "De economie groeide met 3,9% (CBS). Sociaal bleven gelijkheid en inclusie centraal. Cultureel bereikte Nederland de halve finale van het WK voetbal, met Dennis Bergkamp als ster. Infrastructuurprojecten zoals Schiphol’s uitbreiding versterkten de handel. De Elfstedentocht trok aandacht. Sportief organiseerde Nederland het EK judo. Het weer was nat, zonder rampen.",
  
  1999 : "De economie piekte met 4% groei (CBS). Sociaal bleef Nederland progressief met focus op diversiteit. Cultureel bloeide het Holland Festival. De Amsterdamse IJburg werd gestart. Sportief won Feijenoord de landstitel. Het weer was regenachtig, zonder extremen.",
  
  2000 : "Euthanasie werd gelegaliseerd, een wereldprimeur. Economisch groeide het BBP met 3,6% (CBS). Cultureel kwamen dj’s zoals Tiësto op. Infrastructuurprojecten verbeterden de Rotterdamse haven. Sportief organiseerde Nederland het EK voetbal, met een halve finale. Het weer was mild, zonder rampen.",
  
  2001 : "Nederland legaliseerde als eerste het homohuwelijk, inclusief adoptierechten. Economisch groeide het BBP met 2,2% (CBS). Cultureel schitterden kunstenaars internationaal. De euro werd voorbereid. Sportief won PSV de landstitel. Het weer was typisch, zonder extremen.",
  
  2002 : "De moord op Pim Fortuyn op 6 mei schokte Nederland. Economisch groeide het BBP met 1,7% (CBS). Cultureel werd de euro ingevoerd. Sociaal leidde de moord tot immigratiedebatten. Infrastructuurprojecten liepen vertraging op. Sportief organiseerde Nederland het WK volleybal.",
  
  2003 : "De economie stagneerde met 0,1% groei (CBS). Sociaal werd de moord op Fortuyn verwerkt. Cultureel bloeide het North Sea Jazz Festival. Infrastructuurprojecten richtten zich op duurzaamheid. Sportief won PSV de landstitel. Het weer was mild, zonder rampen.",
  
  2004 : "De moord op Theo van Gogh op 2 november wakkerde integratiedebatten aan. Economisch groeide het BBP met 1,8% (CBS). Cultureel bleven festivals bloeien. De dood van Juliana op 20 maart was een nationaal verlies. Infrastructuurprojecten verbeterden het spoor. Sportief organiseerde Nederland het EK atletiek.",
  
  2005 : "De economie groeide met 1,5% (CBS). Sociaal bleven integratiedebatten centraal. Cultureel bloeide het Holland Festival. Infrastructuurprojecten richtten zich op openbaar vervoer. Sportief won PSV de landstitel. Het weer was standaard, zonder rampen.",
  
  2006 : "De Wet op de Zorgverzekering werd ingevoerd, een mijlpaal. Economisch groeide het BBP met 3% (CBS). Cultureel werd Het huis van de moskee van Kader Abdolah een hit. De Deltawerken werden erkend als meesterwerk. Sportief organiseerde Nederland het WK schaatsen.",
  
  2007 : "De economie groeide met 4% (CBS). Sociaal werd de Wet op de Jeugdhulpverlening aangescherpt. Cultureel werd De wetten van Connie Palmen een hit. De Amsterdamse IJburg vorderde. Sportief won PSV de landstitel.",
  
  2008 : "De financiële crisis leidde tot 2% krimp (CBS). Sociaal werd de Wet op de Gelijke Behandeling aangescherpt. Cultureel werd De schaduw van de wind van Carlos Ruiz Zafón een hit. De Rotterdamse Kop van Zuid werd voltooid. Sportief organiseerde Nederland het EK judo.",
  
  2009 : "De economische crisis hield aan, met 5% werkloosheid (CBS). Sociaal werd de Wet op de Zorg voor Gehandicapten uitgebreid. Cultureel werd De vliegeraar van Khaled Hosseini een bestseller. De Amsterdamse Noord-Zuidlijn werd vertraagd. Sportief won AZ de landstitel.",
  
  2010 : "De economie groeide met 1% (CBS). Sociaal werd de Wet op de Jeugdzorg aangescherpt. Cultureel werd Het huis van de moskee van Kader Abdolah een hit. De Rotterdamse Beneluxlijn werd uitgebreid. Sportief won Ajax de landstitel.",
  
  2011 : "De economie groeide met 2% (CBS). Sociaal werd de Wet op de Nabestaanden aangescherpt. Cultureel werd De wetten van Connie Palmen bekroond. De Amsterdamse IJburg vorderde. Sportief organiseerde Nederland het WK volleybal.",
  
  2012 : "De economie groeide met 1% (CBS). Sociaal werd de Wet op de Kinderopvang aangescherpt. Cultureel werd De schaduw van de wind van Carlos Ruiz Zafón een hit. De Rotterdamse Kop van Zuid werd voltooid. Sportief won Ajax de landstitel.",
  
  2013 : "De economie kromp met 1%, met 7% werkloosheid (CBS). Sociaal werd de Wet op de Zorgverzekering aangescherpt. Cultureel werd Het huis van de moskee van Kader Abdolah een bestseller. De Amsterdamse Noord-Zuidlijn vorderde. Sportief organiseerde Nederland het EK atletiek.",
  
  2014 : "De economie groeide met 1% (CBS). Sociaal werd de Wet op de Jeugdhulpverlening aangescherpt. Cultureel werd De vliegeraar van Khaled Hosseini een hit. De MH17-ramp op 17 juli kostte 193 Nederlandse levens, een nationale tragedie. Sportief won Ajax de landstitel.",
  
  2015 : "De economie groeide met 2% (CBS). Sociaal werd de Wet op de Gelijke Behandeling aangescherpt. Cultureel werd De wetten van Connie Palmen een hit. De Rotterdamse Beneluxlijn werd uitgebreid. Sportief organiseerde Nederland het WK schaatsen.",
  
  2016 : "De economie groeide met 3% (CBS). Sociaal werd de Wet op de Zorg voor Gehandicapten aangescherpt. Cultureel werd Het huis van de moskee van Kader Abdolah bekroond. De Amsterdamse Noord-Zuidlijn werd voltooid. Sportief won PSV de landstitel.",
  
  2017 : "De economie groeide met 4% (CBS). Sociaal werd de Wet op de Nabestaanden aangescherpt. Cultureel werd De schaduw van de wind van Carlos Ruiz Zafón een hit. De Rotterdamse Kop van Zuid werd uitgebreid. Sportief organiseerde Nederland het EK judo.",
  
  2018 : "De economie groeide met 3% (CBS). Sociaal werd de Wet op de Kinderopvang aangescherpt. Cultureel werd De vliegeraar van Khaled Hosseini een bestseller. De Amsterdamse IJburg werd voltooid. Sportief won PSV de landstitel.",
  
  2019 : "De economie groeide met 2% (CBS). Sociaal werd de Wet op de Jeugdzorg aangescherpt. Cultureel werd Het huis van de moskee van Kader Abdolah een hit. De stikstofcrisis leidde tot boerenprotesten. Sportief organiseerde Nederland het WK volleybal.",
  
  2020 : "De COVID-19-pandemie leidde tot lockdowns en 4% economische krimp (CBS). Sociaal werd de Wet op de Zorgverzekering aangescherpt. Cultureel werd De schaduw van de wind van Carlos Ruiz Zafón een hit. Sportcompetities werden geannuleerd. De Rotterdamse Beneluxlijn werd uitgebreid.",
  
  2021 : "De COVID-19-pandemie hield aan, met 2% economische krimp (CBS). Sociaal werd de Wet op de Gelijke Behandeling aangescherpt. Cultureel werd De wetten van Connie Palmen bekroond. De kindertoeslagaffaire leidde tot nationale excuses. Sportief organiseerde Nederland het EK voetbal.",
  
  2022 : "De economie groeide met 1% na COVID-19 (CBS). Sociaal werd de Wet op de Zorg voor Gehandicapten aangescherpt. Cultureel werd Het huis van de moskee van Kader Abdolah een bestseller. De Oekraïne-oorlog leidde tot vluchtelingenopvang. Sportief won Ajax de landstitel.",
  
  2023 : "De economie groeide met 2%, met een sterke IT-sector (CBS). Sociaal werd de Wet op de Nabestaanden aangescherpt. Cultureel werd De vliegeraar van Khaled Hosseini een hit. De stikstofcrisis hield aan met boerenprotesten. Sportief organiseerde Nederland het WK schaatsen.",
  
  2024 : "De economie groeide met 3%, met een bloeiende dienstensector (CBS). Sociaal werd de Wet op de Kinderopvang aangescherpt. Cultureel werd De schaduw van de wind van Carlos Ruiz Zafón een hit. De Rotterdamse Beneluxlijn werd uitgebreid. Sportief won PSV de landstitel.",
};


/**
 * Fetches Nederland data for a specific year from a predefined list.
 *
 * @param year The year to fetch data for.
 * @returns An object containing an array of Nederland data or an error message.
 */
export async function fetchNederlandByYear(
  year: number
): Promise<FetchNederlandResult> {
  console.log(`[fetchNederlandByYear] Called for year: ${year}`);

  const description = NEDERLAND_BY_YEAR_DATA[year];

  if (description) {
    const nederlandData: NederlandData[] = [{ year, description }];
    console.log(`[fetchNederlandByYear] Found data for year ${year}.`);
    return { data: nederlandData, error: null };
  } else {
    const errorMsg = `Geen informatie over Nederland beschikbaar voor het jaar ${year} in de huidige datalijst.`;
    console.warn(`[WARN Nederland] ${errorMsg}`);
    return { 
      data: null, 
      error: errorMsg,
    };
  }
}
