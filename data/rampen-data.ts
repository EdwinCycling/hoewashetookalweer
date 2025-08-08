
export interface RampData {
  datum: string; // "YYYY-MM-DD"
  beschrijving: string;
  doden?: number;
  gewonden?: number;
  type: 'ramp_in_nederland' | 'ramp_met_nederlanders' | 'internationale_ramp';
}

// Voorbeelddata, later uitbreiden
export const RAMPEN_DATA: RampData[] = [
  {
    "datum": "1921-12-16",
    "beschrijving": "De IJM 339 wordt vermist na vertrek uit Grimsby. Alle 9 opvarenden moeten om het leven zijn gekomen. Dit schip was al vermist sinds 19-11-1918, de 'fictieve' overlijdensdatum van de bemanningsleden.[28]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1922-10-16",
    "beschrijving": "Ramp met de Cornelius in Zweden. 23 doden, onder wie 12 uit Terneuzen.[29]",
    "doden": 23,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1923-02-15",
    "beschrijving": "Het SS Lukkos van Scheepvaart Maatschappij Atlas onderweg naar Tanger wordt vermist. De 25 opvarenden zijn om het leven gekomen.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1923-09-01",
    "beschrijving": "Grote Kanto-aardbeving in Japan. Circa 105.000 doden, onder wie 7 Nederlanders.[30]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1923-09-08",
    "beschrijving": "Ernstig treinongeluk bij Hannover. 10 doden, onder wie 5 Nederlanders.[31]",
    "doden": 10,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1924-07-31",
    "beschrijving": "Het SS Sarie Borneo, vertrokken uit de haven van Banjarmasin en op weg naar Singapore kapseist en zinkt nabij Kualapembuang (Borneo, Nederlands-Indië). 67 doden, onder wie 10 Nederlandse officieren.[32]",
    "doden": 67,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1926-04-08",
    "beschrijving": "Scheepsramp SS Silvanus nabij New Orleans. 25 bemanningsleden en de loods komen om het leven.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1928-04-29",
    "beschrijving": "Het SS Callisto vergaat tijdens een zware storm bij Newfoundland. 23 doden.",
    "doden": 23,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1930-01-03",
    "beschrijving": "Het Nederlandse schip Hofplein loopt bij Ålesund op een rots en zinkt. 5 Nederlandse matrozen komen om het leven.[33]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1931-12-06",
    "beschrijving": "Ramp met KLM Fokker F.VII postvliegtuig De Ooievaar in Siam. 5 doden.",
    "doden": 5,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1933-02-04",
    "beschrijving": "Bomexplosie op de Zeven Provinciën, nabij Sumatra. 23 doden.",
    "doden": 23,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1934-12-20",
    "beschrijving": "Ramp met KLM Uiver in de Syrische Woestijn. 7 doden.",
    "doden": 7,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1935-04-06",
    "beschrijving": "Ramp met de KLM Fokker F.XII Leeuwerik nabij het Duitse Brilon. 7 doden.",
    "doden": 7,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1935-07-20",
    "beschrijving": "Ramp met de KLM Douglas DC-2 De ‘Gaai’ op weg van Milaan naar Frankfurt en Amsterdam kwam boven de Alpen in zwaar weer terecht en stortte neer bij de Pian San Giacomo pas bij San Bernardino (Zwitserland) . Alle 13 inzittenden kwamen om.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1936-12-09",
    "beschrijving": "Ramp met de KLM Douglas DC-2 de Lijster te Croydon nabij Londen, 15 doden, allen Nederlanders",
    "doden": 15,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1937-01-27",
    "beschrijving": "Het SS 'Jonge Jacobus' op weg van Antwerpen naar Alexandrië, vergaat tijdens een zware storm op 20 mijl van Berlengas. De bemanning, 22 man, komen om.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1937-07-28",
    "beschrijving": "Vliegtuigcrash van de Douglas DC-2 ‘Flamingo' nabij Halle in België, 15 doden onder wie 6 Nederlanders",
    "doden": 15,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1937-10-12",
    "beschrijving": "De Fokker T.IV a 'T-13' van de Marine Luchtvaartdienst, onderweg van Soerabaja naar Batavia, crasht in een hevige tropische regenbui, ter hoogte van Brodong (noordkust van Java) 9 man komen om, onder wie de commandant MLD, de kapitein-ter-zee de Bruyne. Na dit ongeval wordt de kapitein-ter-zee Karel Doorman benoemd tot commandant MLD in Nederlands-Indië.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1937-10-16",
    "beschrijving": "De Fokker T IV torpedobommenwerper 'T I' van de Marine Luchtvaartdienst verongelukt tijdens de start in Straat Lontor (Banda-eilanden). 5 doden.",
    "doden": 5,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1938-08-02",
    "beschrijving": "Het SS Van der Wijck kapseist in de Javazee vermoedelijk als gevolg van een schuivende lading. 51 doden.",
    "doden": 51,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1939-09-25",
    "beschrijving": "Het MS 'Tegri' op reis van Göthenburg naar Groningen wordt vermist. 7 doden",
    "doden": 7,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1939-10-07",
    "beschrijving": "Het MS Safe' vertrekt vanuit Antwerpen voor een reis naar Riga. Het is vermoedelijk op een zeemijn gelopen. 7 bemanningsleden worden vermist.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1939-11-16",
    "beschrijving": "De Sliedrecht wordt als neutraal Nederlands schip op de Atlantische Oceaan getorpedeerd. Hierbij komen 26 opvarenden om het leven.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1939-11-18",
    "beschrijving": "Het SS Simon Bolivar op weg naar Curaçao loopt in de Theems-monding op twee zeemijnen. 102 mensen vinden de dood, onder wie 24 Nederlanders.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1939-11-27",
    "beschrijving": "Het SS 'Spaarndam' van de Holland-Amerika Lijn, op weg van New Orleans via Londen naar Rotterdam, loopt in de Theemsmonding bij Knock Deep, op circa 2 mijl van het Tongue Lichtschip, op een mijn. 6 opvarenden komen hierbij om.(De resterende opvarenden worden gered door het SS 'Louis Sheid', dat nog diezelfde dag aan de grond loopt. Voor de geredde opvarende van de Tajandoen dus een tweede schipbreuk binnen een dag.)",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-01-18",
    "beschrijving": "De coaster MS Diana op weg van Newport naar Watchet, loopt op een zeemijn in het Kanaal van Bristol en zinkt. Vijf bemanningsleden komen om.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-02-15",
    "beschrijving": "De olietanker MS Den Haag, op weg van New York naar Rotterdam, wordt als neutraal Nederlands schip op de Atlantische Oceaan circa 150 mijl ten noorden van Quessant, door de Duitse onderzeeboot 'U 48' getorpedeerd. 26 opvarenden komen hierbij om.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-03-02",
    "beschrijving": "Het vrachtschip MS Rijnstroom op weg van de rede van Duins naar Amsterdam, wordt door de Duitse onderzeeboot 'U 17' getorpedeerd. Alle 12 bemanningsleden komen hierbij om.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-03-05",
    "beschrijving": "Het SS Grutto wordt als neutraal Nederlands schip op de Noordzee getorpedeerd door de Duitse onderzeeboot U 17. 18 doden.",
    "doden": 18,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-03-07",
    "beschrijving": "Het SS 'Vecht' op weg van Rotterdam naar West-Afrika, wordt op de Noordzee ter hoogte van de Steenbank, door de Duitse onderzeeboot 'U 14' getorpedeerd en tot zinken gebracht. Alle 22 opvarenden komen hierbij om.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-03-16",
    "beschrijving": "De coaster MS 'Saba' vertrokken uit Caen (Frankrijk) met bestemming IJmuiden, wordt sindsdien vermist en is vermoedelijk op een mijn gelopen. De bemanning bestaat uit 7 koppen.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-05-17",
    "beschrijving": "Bom op school in Sint-Niklaas met vluchtelingen uit Breda, 79 doden, onder wie 51 Nederlanders.",
    "doden": 79,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-05-18",
    "beschrijving": "Het SS Pia loopt om 13.45 uur op een mijn op weg van Duinkerke naar Boulogne. 10 doden.",
    "doden": 10,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-06-20",
    "beschrijving": "De Nederlandse onderzeeboot Hr.Ms. O 13 wordt als vermist opgegeven en is het laatst gesignaleerd in wat later een Duits mijnenveld bleek bij de ingang van het Skagerak. 31 doden.",
    "doden": 31,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-06-20",
    "beschrijving": "Het MS Moordrecht wordt op 200 mijl ten NW van Kaap Finisterre getorpedeerd door de Duitse onderzeeboot U 48. 25 van de 29 bemanningsleden vinden de dood.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-06-21",
    "beschrijving": "Het SS Berenice wordt op weg van Bordeaux naar Falmouth met onder meer vluchtelingen aan boord. ongeveer 40 mijl ten westen van de monding van de Loire, door de Duitse onderzeeboot U 65 getorpedeerd. 39 doden onder wie 21 vluchtelingen.",
    "doden": 39,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-07-04",
    "beschrijving": "Het SS Britsum op weg van Hull naar Fowey beschoten en gebombardeerd door vliegtuigen. 9 doden onder wie één Engelse koksmaat.",
    "doden": 9,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-09-07",
    "beschrijving": "Het SS Stad Alkmaar op weg van Methil naar Londen om 2.20 uur ten zuidoosten van Lowestoft door de Duitse motortorpedoboot S 33 getorpedeerd. 14 doden.",
    "doden": 14,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-09-08",
    "beschrijving": "Het SS Maas 150 mijl west van de Ierse kust door de Duitse onderzeeboot U28 getorpedeerd en binnen een minuut gezonken. Op twee na de gehele bemanning komt om. 20 doden onder wie 17 Nederlanders.",
    "doden": 20,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-09-16",
    "beschrijving": "Het SS Stad Schiedam op weg naar Halifax zinkt in vijf minuten na explosies in luik 3. 20 doden onder wie één Noorse matroos.",
    "doden": 20,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-09-20",
    "beschrijving": "Het SS Trinto op weg van Datmouth naar Southampton breekt in tweeën na explosies. 17 Nederlanders en 4 Engelse kanonniers komen om.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-10-03",
    "beschrijving": "De sleepboot Lauwerzee loopt waarschijnlijk op een mijn op weg naar Plymouth. Slechts één matroos overleeft, de overige twaalf bemanningsleden onder wie twee Engelse stokers, komen om.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-10-19",
    "beschrijving": "Het SS Soesterberg op weg van Chatham naar Kingston upon Hull wordt door de Duitse onderzeeboot U 101 op 50 mijl van Roackall Rock getorpedeerd. 6 doden onder wie de Engelse tremmer.",
    "doden": 6,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-11-24",
    "beschrijving": "Het SS Ootmarsum wordt op weg van Sydney, CB. (Canada) naar de Clyde (U.K.) door de Duitse onderzeeboot U 100 getorpedeerd. 21 Nederlandse en 5 Engelse doden.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-12-07",
    "beschrijving": "Het SS Stolwijk loopt tijdens stormweer op de rotsen van Innesdooey Island (Ierland) en gaat verloren. Hierbij komen 10 bemanningsleden om het leven. Diezelfde dag nog wordt het SS Farmsum op de Atlantische Oceaan getorpedeerd door de Duitse onderzeeboot U 99. 16 doden.",
    "doden": 16,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-12-11",
    "beschrijving": "Het SS Towa op weg van Montreal naar Oban in konvooi HX 92 getorpedeerd door de Duitse onderzeeboot U 96. 18 doden onder wie een Canadese tremmer.",
    "doden": 18,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1940-12-23",
    "beschrijving": "Het MS Tuva wordt gebombardeerd in de baai van Oban. Er zijn uiteindelijk 7 doden. Het schip zelf wordt hersteld en vergaat op 2 oktober 1941 tussen Reykjavik en Tampa. Daarbij komen geen mensen om.",
    "doden": 7,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-01-05",
    "beschrijving": "Het SS Soemba van de SMN, op weg van Halifax naar Engeland, kapseist tijdens stormweer nabij Newfoundland. 36 doden.",
    "doden": 36,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-01-18",
    "beschrijving": "Het MS Diana op weg van Newport naar Watchet. Na explosies op het achterschip zonk het schip in twee minuten. 6 doden onder wie de Engelse loods.",
    "doden": 6,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-01-20",
    "beschrijving": "Het SS Heemskerk zinkt na een bombardement door een Duits vliegtuig. 8 doden",
    "doden": 8,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-01-26",
    "beschrijving": "Het SS Beemsterdijk (van de Holland-Amerika Lijn) loopt in het Bristol Channel op een Britse mijn. Het schip zinkt binnen enkele minuten, de meeste opvarenden (39 man) met zich meenemend.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-02-25",
    "beschrijving": "Het SS Beursplein wordt ten zuidwesten van Ierland door Duitse luchtaanval tot zinken gebracht. Hierbij komen 22 opvarenden om het leven.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-02-28",
    "beschrijving": "Het SS Texelstroom wordt als vermist opgegeven. Alle opvarenden komen om, 25 man, onder wie een Griek, een Noor, een Chileen, een Portugees en een Canadees.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-03-05",
    "beschrijving": "Het SS Grootekerk vertrokken uit Swansea wordt als vermist opgegeven. 18 Nederlandse en 35 Chinese opvarende komen om.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-03-07",
    "beschrijving": "De SS Prins Frederik Hendrik wordt beschoten en gebombardeerd op weg van Cardiff naar Bathurst. 8 doden onder wie twee Engelse bemanningsleden.",
    "doden": 8,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-04-02",
    "beschrijving": "Het MS Celebes vertrekt op 30 maart Liverpool. Sinds die datum is niets meer vernomen van schip of bemanning. De Engelse admiraliteit neemt aan dat het schip op 2 april verloren is gegaan. 7 doden.",
    "doden": 7,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-04-07",
    "beschrijving": "Het SS Mangkai vergaat als gevolg van vijandelijke actie. Er komen 29 Chinezen, 6 Nederlanders en een Javaan om.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-04-27",
    "beschrijving": "Het SS Slamat van Rotterdamsche Lloyd wordt door Duitse Junkers bommenwerpers en Messerschmitt jachtvliegtuigen onder vuur genomen in de Egeïsche Zee.[34] Met 558 doden (onder wie 74 Nederlanders) is dit de grootste ramp uit de Nederlandse koopvaardijgeschiedenis.",
    "doden": 558,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-06-06",
    "beschrijving": "Het SS IJsselhaven wordt op weg van Liverpool naar de Sint-Laurens in Canada getorpedeerd. Hierbij komen 24 van de 34 bemanningsleden om het leven.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-06-20",
    "beschrijving": "Het SS Schieland wordt op weg van Blyth naar de Theems gebombardeerd. 17 doden onder wie twee Engelsen.",
    "doden": 17,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-06-25",
    "beschrijving": "Het SS Schie wordt varende naar Curaçao door de Duitse onderzeebootU 75 getorpedeerd. 29 doden.",
    "doden": 29,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-06-27",
    "beschrijving": "Het SS Oberon in konvooi SL-76 op weg van Freetown naar Engeland met een lading palmpitten wordt getorpedeerd door de onderzeeboot U 123. 6 doden",
    "doden": 6,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-09-10",
    "beschrijving": "Het SS Winterswijk wordt op weg naar Engeland getorpedeerd. 20 man komen om, onder wie zes Engelsen.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-10-27",
    "beschrijving": "Het SS Friesland wordt nabij Cromer aangevallen door Duitse duikbommenwerpers. 13 opvarenden komen hierbij om het leven, onder wie zes Nederlanders.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-10-31",
    "beschrijving": "Het SS Bennekom wordt getorpedeerd. Negen doden onder wie drie Engelse kanonniers.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-11-24",
    "beschrijving": "Het SS Groenlo loopt op weg van Hartlepool naar Londen achter op het konvooi en wordt getorpedeerd. 10 doden",
    "doden": 10,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-12-06",
    "beschrijving": "Het SS Stolwijk vergaat in zwaar weer bij het eiland Inishbofin. 10 doden onder wie één Engelse messroom bediende.",
    "doden": 10,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1941-12-19",
    "beschrijving": "(laatste contact) De Nederlandse onderzeeër Hr.Ms. K XVII raakt verstrikt in een Japans mijnenveld. De gehele bemanning komt om. 38 doden.",
    "doden": 38,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-01-02",
    "beschrijving": "Het SS Langkoeas wordt door de Japanse onderzeeboot 'I 58' tot zinken gebracht in de Oost-Indische wateren. Er zijn 91 doden onder wie 26 Nederlanders. De overige Chinees. Drie bemanningsleden overleven deze ramp.",
    "doden": 91,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-01-08",
    "beschrijving": "Het SS Van Riebeeck wordt ten zuidwesten van Java door de Japanse onderzeeboot I 56 tot zinken gebracht. 13 doden. Op dezelfde dag wordt ook het SS van Rees op weg van Emmahaven naar Tjilatjap getorpedeerd door de Japanse onderzeeboot I 56. 6 doden.",
    "doden": 13,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-01-16",
    "beschrijving": "De SS Senang loopt nabij Singapore op een Britse mijn en gaat verloren. 54 opvarenden komen om het leven. Diezelfde dag vertrekt het MS Gorecht uit de haven van Highbridge. Op drie mijl van Burnham Lighthouse op een mijn gelopen. 7 doden onder wie twee Engelse gunners.",
    "doden": 7,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-02-17",
    "beschrijving": "Het SS Sloet van der Beele wordt in de Javazee gebombardeerd en zonk. 5 doden",
    "doden": 5,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-02-26",
    "beschrijving": "Ondergang van de tanker Mamura op de Atlantische Oceaan. Deze zinkt binnen 10 minuten na een aanval van de Duitse onderzeeboot U 504, waarbij alle 49 opvarenden om het leven komen.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-02-27",
    "beschrijving": "Slag in de Javazee De totale slag kostte 2300 marinemannen het leven.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-03-01",
    "beschrijving": "Op deze dag worden zeven Nederlandse koopvaardijschepen tot zinken gebracht[35]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-03-04",
    "beschrijving": "Het SS Siantar wordt 300 mijl van de Australische kust getorpedeerd door de Japanse onderzeeboot I 1. 21 doden onder wie 7 Nederlanders. Waarschijnlijk is op deze dag ook het SS Le Maire vergaan, mogelijk door de Japanse onderzeeboot I-7. Onduidelijk is waar: volgens sommigen op 600 mijl ten zuiden van Tjilatjap, volgens Japanse bronnen (die geen scheepsnaam noemen) op 250 mijl ten noordnoordwesten van de Cocoseilanden. 9 doden.",
    "doden": 21,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-03-07",
    "beschrijving": "Het MS Poelau Bras wordt op weg naar Colombo aangevallen door Japanse vliegtuigen. Tussen de 240 en 300 doden.",
    "doden": 300,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-03-24",
    "beschrijving": "De tanker Ocana van Shell, op weg van Curaçao naar Halifax, wordt op de Atlantische Oceaan door de Duitse onderzeeboot U 522 getorpedeerd. 53 doden, onder wie 10 Nederlanders.",
    "doden": 53,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-04-04",
    "beschrijving": "Het SS Alphacca wordt op weg van Kaapstad naar Freetown wordt op 150 mijl ten zuiden van Kaap Palmas (West-Afrika) door de Duitse onderzeeboot U 505 getorpedeerd. 15 doden.",
    "doden": 15,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-04-06",
    "beschrijving": "Het SS Banjoewangi werd in de Golf van Bengalen bij Vizagapatam door een Japans eskader (voor de invasie op Ceylon) tot zinken gebracht. 13 doden.",
    "doden": 13,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-04-16",
    "beschrijving": "de tanker Amsterdam op weg van Smith's Bluff (Beaumont, Texas) naar Freetown wordt op 100 mijl ten noordwesten van Port of Spain door de Duitse onderzeeboot U 66 getorpedeerd en tot zinken gebracht. 5 doden.",
    "doden": 5,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-04-28",
    "beschrijving": "Het SS Arundo met aan boord onder andere legertrucks, auto-onderdelen, twee zware locomotieven en enkele duizenden liters Canadees bier, op weg van New York naar Alexandrië bij het lichtschip Ambrose, door de Duitse onderzeeboot U 136 getorpedeerd en gezonken. 6 doden.[36]",
    "doden": 6,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-05-03",
    "beschrijving": "Het SS Laertes van Stoomvaart Maatschappij Oceaan wordt voor de kust van Florida getorpedeerd vermoedelijk door de U 109. 18 doden.",
    "doden": 18,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-05-04",
    "beschrijving": "Het SS Amazone op weg van Curaçao naar New York wordt door de Duitse onderzeeboot U 333 getorpedeerd. 14 doden.",
    "doden": 14,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-05-12",
    "beschrijving": "Het SS Leto wordt in de Saint Lawrencebaai op 8 mijl van Cape Magdalena door de Duitse onderzeeboot U 553 getorpedeerd en zinkt. 12 doden.",
    "doden": 12,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-05-26",
    "beschrijving": "Het SS Polyphemus wordt op 468 mijl van New York getorpedeerd. Hierbij komen 15 opvarenden om het leven.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-06-01",
    "beschrijving": "Het SS Triton op reis van Port of Spain naar New York op de Atlantische Oceaan ten ZO van Bermuda door de Duitse onderzeeboot U 558 in brand geschoten en tot zinken gebracht. 6 doden.",
    "doden": 6,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-06-05",
    "beschrijving": "Het SS Poseidon op weg van Trinidad naar New York, wordt door een Duitse onderzeeboot getorpedeerd. 32 doden.",
    "doden": 32,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-06-14",
    "beschrijving": "Het SS Tanibar wordt op weg van Gourock naar Malta ten noorden van Philippeville en ten zuidwesten van Sardinië aangevallen door Italiaanse torpedovliegtuigen. 23 doden. Diezelfde dag wordt het MS Olivia op de Indische Oceaan door de Duitse hulpkruiser 'Thor' (Schiff 10) in brand geschoten. Uiteindelijk vonden 41 bemanningsleden de dood.",
    "doden": 23,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-06-24",
    "beschrijving": "Het MS Leny bij Anvil Point, Dorset op een trilmijn gelopen. Binnen twee minuten was het gezonken. 8 doden.",
    "doden": 8,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-07-01",
    "beschrijving": "SS De Weert wordt nabij Lourenço Marques aangevallen, waarbij 69 opvarenden komen om het leven. Enkele overlevenden worden opgepikt door het Britse SS Mundra, maar komen negen dagen later alsnog om het leven als ook dit schip tot zinken wordt gebracht.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-07-08",
    "beschrijving": "Het SS Alchiba wordt in de Straat Mozambique door de Japanse onderzeeboot 'I 10' getorpedeerd en met geschutsvuur tot zinken gebracht. 5 doden.",
    "doden": 5,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-07-14",
    "beschrijving": "De eerste Deportaties van Nederlandse Joden naar Polen. Circa 101.800 Nederlandse Joden (onder wie Anne Frank) komen in de vernietigingskampen om het leven.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-07-24",
    "beschrijving": "Het SS Telamon wordt op de Atlantische Oceaan ten oosten van Trinidad door de Duitse onderzeeboot U 160 getorpedeerd en binnen vier minuten tot zinken gebracht. 23 doden.",
    "doden": 23,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-07-31",
    "beschrijving": "Het SS Kentar wordt op de Atlantische Oceaan, 130 mijl ten zuidoosten van Barbados, door de Duitse onderzeeboot U 155 getorpedeerd en zinkt.17 doden.",
    "doden": 17,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-08-09",
    "beschrijving": "Het SS Mendanau wordt op de Atlantische Oceaan ter hoogte van Liberia door de Duitse onderzeeboot U 752 getorpedeerd en tot zinken gebracht. 65 doden.",
    "doden": 65,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-08-12",
    "beschrijving": "Het SS Medea wordt op weg van New York naar Venezuela getorpedeerd door de Duitse onderzeeboot U 658 in de Caribische zee bij Cape Maysi. 5 doden",
    "doden": 5,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-08-28",
    "beschrijving": "De tanker Rotterdam wordt op 120 mijl ten oosten van Kingston (Jamaica), getorpedeerd en tot zinken gebracht door de Duitse onderzeeboot U 511. 10 doden.",
    "doden": 10,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-09-14",
    "beschrijving": "Het SS Suriname wordt op 110 mijn ten noorden van Trinidad getorpedeerd door de Duitse onderzeeboot U 558. 13 doden.",
    "doden": 13,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-10-10",
    "beschrijving": "Het MS Atlas loopt bij Lundy in zwaar weer op de rotsen. 8 doden.",
    "doden": 8,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-11-02",
    "beschrijving": "Het MS Zaandam wordt op weg van Kaapstad naar New York, in de Zuid-Atlantische Oceaan ter hoogte van Recife door de Duitse onderzeeboot U174 getorpedeerd. 124 van de in totaal 299 opvarenden komen om het leven.[38]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-11-03",
    "beschrijving": "Het SS Hobbema wordt op de Atlantische Oceaan bij IJsland, getroffen door een torpedo, afgevuurd door de Duitse onderzeeboot U 132. 28 doden.",
    "doden": 28,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-11-21",
    "beschrijving": "Het SS Bintang wordt op 650 mijl ten oosten van Trinidad getorpedeerd door de Duitse onderzeeboot U 160. 22 doden onder wie 7 Nederlanders.",
    "doden": 22,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-11-28",
    "beschrijving": "Het SS Tjileboet wordt op ongeveer 600 mijl WZW van Freetown door de Duitse onderzeeboot U 161 getorpedeerd. 61 doden.",
    "doden": 61,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-12-06",
    "beschrijving": "Het SS Serooskerk wordt ten noordoosten van de Azoren door de Duitse onderzeeboot U 155 drie keer getorpedeerd Niemand van de 84 opvarenden onder wie 15 personen van de Nederlandse État-major en 69 Brits-Indiërs overleefde de ramp.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1942-12-14",
    "beschrijving": "Het SS Sawahloento wordt op 170 zeemijl van Beira door de Duitse onderzeeboot U 177 getorpedeerd en tot zinken gebracht. 53 doden onder wie 8 Nederlanders.",
    "doden": 53,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1943-02-23",
    "beschrijving": "Het MS Madoera wordt op de Atlantische Oceaan getorpedeerd door de Duitse onderzeeboot U 653. De bemanning wordt geëvacueerd op 10 man na. Die brengen het schip naar St. John's op Newfoundland. Meer dan 50 vermiste opvarenden.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1943-02-27",
    "beschrijving": "Het MS Colombia wordt op weg naar Simonstad ter hoogte van Simonstad door de Duitse onderzeeboot U 516 onder commando van Gerhard Wiebe.[39] getorpedeerd. Na appel bleken er acht opvarende vermist.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1943-03-13",
    "beschrijving": "Het SS Sembilangan wordt op 200 mijl West van Kaap Finisterre getorpedeerd door de Duitse onderzeeboot U 107. Op een na komt de gehele bemanning om: 86 doden.",
    "doden": 86,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1943-03-17",
    "beschrijving": "De geallieerde konvooien HX-229 en SC-122 komen op de Atlantische Oceaan samen en vormen zo één enorm konvooi van 87 schepen en 18 escorteschepen. Ze worden aangevallen door 41 Duitse onderzeeërs. In totaal worden op 17, 18 en 19 maart, 27 schepen aangevallen, onder wie de Nederlandse schepen, het SS Alderamin, het SS Terkoelei en het SS Zaanland. Er vallen 54 Nederlandse slachtoffers.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1943-03-26",
    "beschrijving": "Het SS Prins Willem III wordt na twee eerdere poging bij Gibraltar door Duitse vliegtuigen gebombardeerd. Daarbij komen uiteindelijk 8 man om.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1943-04-05",
    "beschrijving": "Het SS Blitar verlaat op weg van New York naar Liverpool in konvooi Hx.231 en wordt getorpedeerd door de Duitse onderzeeboot U.632. Bij deze ramp verliezen 26 van de opvarenden het leven.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1943-04-17",
    "beschrijving": "Het SS Sembilan wordt op 160 mijl zuidoost van Durban, door de Italiaanse onderzeeboot Leonardo da Vinci getorpedeerd. Slechts één Brits-Indisch bemanningslid overleefde de ramp, de overige 85 opvarenden kwamen om.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1943-04-27",
    "beschrijving": "Het SS Merope wordt in de Middellandse Zee door de Duitse onderzeeboot U 371 getorpedeerd. 10 doden.",
    "doden": 10,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1943-07-27",
    "beschrijving": "Het SS Rosalia op weg van Lagunillas naar Curacao wordt op 10 mijl ten zuiden van Willemstad bij de Bullenbaai door de Duitse onderzeeboot U 615 tot tweemaal toe getorpedeerd. 23 doden.",
    "doden": 23,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1943-08-01",
    "beschrijving": "De SS Mangkalihat wordt varende in konvooi BC 2 van Suez naar Engeland via Kaapstad, in Straat Mozambique ten oosten van Lorenço Marques getorpedeerd door de Duitse onderzeeboot U 198. Het schip zinkt drie dagen later op 4 augustus. 10 doden.",
    "doden": 10,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1943-11-29",
    "beschrijving": "Bij het afvoeren van 548 zieke krijgsgevangenen van Ambon naar Java bij Kangean, ten oosten van Madoera, werd het Japanse transportschip SS Suez Maru door de Amerikaanse onderzeeboot USS Bonefish getorpedeerd. Hierbij kwamen ongeveer de helft van de krijgsgevangenen om door verdrinking in de ruimen van het schip. De ca. 200 mannen die het schip wisten te verlaten werden allen door de Japanners gemitrailleerd. Er was geen enkele overlevende. 137 Nederlandse doden[40]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1943-12-03",
    "beschrijving": "De coaster MS Prinses Irene uit Groningen, zinkt na een aanvaring met het SS Leonidas Polk, een Amerikaans schip, in de Ierse Zee. 10 doden.",
    "doden": 10,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1944-04-14",
    "beschrijving": "In de haven van Bombay breekt brand uit op het Britse SS Fort Stikine. Bij de ontploffing die volgt worden de Nederlandse schepen het SS Gen.van Swieten, het SS Gen. v.d Heyden en het MS Tinombo zwaar getroffen. Er vallen ten minste vijf Nederlandse doden aan boord van deze schepen. In het totaal wordt het dodenaantal aan boord van verschillende schepen en op de wal geschat tussen 300 en 1500.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1944-04-24",
    "beschrijving": "De sleepboot Roode zee wordt tijdens het verslepen van Phoenix-caissons, (onderdelen van een kunstmatige haven voor de geallieerde invasie van juni 1944) nabij Dungeness Kent getorpedeerd door de Duitse Schnellboot S-100. Alle 15 opvarenden, inclusief de Britse loods, komen om het leven.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1944-06-19",
    "beschrijving": "Scheepsramp van het SS Garoet nabij Mauritius. 88 doden, onder wie 43 Nederlanders",
    "doden": 88,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1944-07-02",
    "beschrijving": "Het SS Bodegraven op weg van Beira en Durban naar Engeland wordt op de Atlantische Oceaan ten westen van Monrovia, door de Duitse onderzeeboot U 547 getorpedeerd en tot zinken gebracht. Zes passagiers en drie bemanningsleden vinden de dood.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1944-09-07",
    "beschrijving": "Bij Mossman in het Australische Queensland stort een Douglas C-47 Dakota van het KNIL neer op weg van Merauke naar Cairns. 20 doden.",
    "doden": 20,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1944-09-18",
    "beschrijving": "Het Japanse schip SS Junyo Maru wordt door de Britse onderzeeboot HMS Tradewind tot zinken gebracht. Aan boord bevinden zich 6400 krijgsgevangenen, onder wie 1377 Nederlanders. 5620 opvarenden komen hierbij om het leven, er zijn 723 overlevenden.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1944-09-21",
    "beschrijving": "Het Japanse schip Hofuku Maru zinkt voor de kust van Luzon. Aan boord bevinden zich 1289 Britse en Nederlandse krijgsgevangenen. 1047 mensen komen hierbij om het leven, onder wie 140 Nederlanders.[41]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1944-10-15",
    "beschrijving": "De watertanker Petronella loopt in de Griekse wateren bij Kaap Kalauri op een zeemijn. Verschillende schepen schieten te hulp, toch verdrinken er 24 opvarenden.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1945-01-16",
    "beschrijving": "Het MS Magdala op weg van Reykjavik naar Belfast in konvooi 150 komt in een zware storm terecht en wordt vermist Ook is mogelijk dat het schip werd getorpedeerd ter hoogte van de Faeröer. 35 bemanningsleden werden vermist.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1945-02-15",
    "beschrijving": "De tanker SS Liseta wordt bij Margate in de machinekamer getroffen door een torpedo van de Duitse dwergonderzeeboot 'U 5332' (type Seehund). Van de 46 bemanningsleden komen er 16 om het leven.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1945-03-17",
    "beschrijving": "Scheepsramp van SS Sibigo nabij Cairns tijdens een cycloon, 63 opvarenden komen hierbij om het leven.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1945-05-03",
    "beschrijving": "Scheepsramp van Cap Arcona, ca. 7.500 doden, onder wie 270 Nederlanders.",
    "doden": 500,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1945-08-09",
    "beschrijving": "Atoombom op Nagasaki. 39.000 doden, onder wie 5 Nederlanders.[42]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1947-01-21",
    "beschrijving": "Vliegtuigongeval op Biak, Nederlands-Nieuw-Guinea, waarbij 5 Nederlanders om het leven komen.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1947-01-26",
    "beschrijving": "Vliegtuigcrash te Kopenhagen met een KLM Dakota. 22 Doden, onder wie prins Gustav Adolf van Zweden, de destijds bekende Amerikaanse zangeres Grace Moore en 7 Nederlanders.",
    "doden": 22,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1948-07-21",
    "beschrijving": "Een North American B-25 Mitchell bommenwerper van de Marine Luchtvaartdienst vliegt tegen een berg in Schotland. 6 Nederlandse doden.[43]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1948-10-20",
    "beschrijving": "Vliegtuigcrash met de Constellation \"Nijmegen\" te Prestwick, Schotland, 40 doden, allen Nederlanders, onder wie gezagvoerder Parmentier, beroemd geworden door zijn succesvolle vlucht met de \"Uiver\" in 1934.",
    "doden": 40,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1949-06-23",
    "beschrijving": "Vliegtuigcrash met de Constellation \"Roermond\" te Bari, 33 doden, onder wie 27 Nederlanders. De omgekomen gezagvoerder was Hans Plesman, zoon van KLM directeur Albert Plesman.",
    "doden": 33,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1949-07-12",
    "beschrijving": "Vliegramp met de Constellation Franeker nabij Bombay. 45 doden, onder wie 18 Nederlanders.",
    "doden": 45,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1949-12-12",
    "beschrijving": "Het vrachtschip Doros van de KNSM op weg van New York naar Haïti zinkt na brand. Tijdens de bluspogingen komen 11 opvarenden om het leven, onder wie 9 Nederlanders.[44]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1950-02-02",
    "beschrijving": "Een Douglas DC-3 PH-TEU van de KLM crasht in de Noordzee nabij het lichtschip Goeree. 6 Nederlanders en een Brit komen om het leven.[45]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1950-08-05",
    "beschrijving": "Het vrachtschip MS 'Belanta' onderweg van Boeton naar Makassar tijdens een storm vergaan op 12 mijl oost van Saleier Eilanden. 21 doden onder wie vele Nederlanders.",
    "doden": 21,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1951-12-28",
    "beschrijving": "Tankschip Gemma op weg van Bilbao naar Londen, zinkt tijdens een zware storm in Golf van Biskaje. 7 doden.",
    "doden": 7,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1952-01-15",
    "beschrijving": "De trawler IJM 31 vergaat tijdens een zware storm in de buurt van Stavanger. De 13 opvarenden komen hierbij om het leven.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1952-03-22",
    "beschrijving": "Een KLM Douglas DC-6 PH-TPJ \"Koningin Juliana\" stort neer bij Frankfurt nadat de vlieger gedesoriënteerd raakt in de regen en de mist – 44 van de 47 inzittenden komen om.[46]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1952-08-23",
    "beschrijving": "KLM Douglas DC-6B \"Willem Bontekoe\" crasht tijdens KLM-vlucht 608 op weg van Shannon naar Schiphol in de Noordzee 20 km voor de kust van Bergen. De 21 inzittenden komen allen om.[47]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1953-01-30",
    "beschrijving": "Het MS 'Westland' op 29 januari vertrokken vanuit Wismar met bestemming King's Lynn, wordt vermist. Vermoedelijk moet het schip zijn vergaan tijdens een zware storm in de nacht van 29 op 30 januari. 7 bemanningsleden komen om het leven.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1953-01-31",
    "beschrijving": "het MS 'Salland', op 29 januari vertrokken uit Par met bestemming Stockholm geladen met porseleinaarde, vergaat op de Noordzee tijdens de storm die in Nederland de Watersnoodramp veroorzaakt. 9 doden.",
    "doden": 9,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1953-02-02",
    "beschrijving": "Het MS 'Lark' op weg van Heroya naar Stavanger met een lading salpeter, wordt vermist. 7 doden.",
    "doden": 7,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1953-05-24",
    "beschrijving": "Het MS 'Toos' geladen met cellulose, kapseist bij Grips Noorwegen als gevolg van een verkeerde belading. 5 bemanningsleden komen om.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1954-09-05",
    "beschrijving": "Vliegtuigcrash van de Constellation \"Triton\" (KLM-vlucht 633) bij Shannon Airport in Ierland. 28 doden, onder wie 12 Nederlanders.[48]",
    "doden": 28,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1954-11-27",
    "beschrijving": "Het vrachtschip Carpo van de Maatschappij 'Zeevaart' vergaat ten zuidwesten van Cornwall. 11 doden, allen Nederlander.[49]",
    "doden": 11,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1954-11-29",
    "beschrijving": "De Groningse coaster Westward vergaat op de Ierse Zee. 11 doden.",
    "doden": 11,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1955-02-25",
    "beschrijving": "Zes Nederlandse militairen komen om na ontploffing van een landmijn in het indianendorp Matta, ongeveer 65 kilometer ten zuiden van Paramaribo. Acht militairen raken gewond.[50]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1957-07-16",
    "beschrijving": "Vliegtuigcrash met de Constellation \"Neutron\" (KLM-vlucht 844) te Biak, Nederlands-Nieuw-Guinea, 58 doden, onder wie 55 Nederlanders.",
    "doden": 58,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1957-08-12",
    "beschrijving": "Marinevliegtuig stort neer bij Merauke in Nederlands-Nieuw-Guinea. 8 doden, allen Nederlander.[54]",
    "doden": 8,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1958-08-14",
    "beschrijving": "De Constellation Hugo de Groot\" KLM-vlucht 607-E van Amsterdam naar New York stort ten westen van Ierland in de Atlantische Oceaan. Alle 99 inzittenden komen om.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1958-09-10",
    "beschrijving": "In de vroege morgen is een Martin Mariner P 303 van de Marine Luchtvaartdienst kort nadat het vliegtuig van Abadan was opgestegen verongelukt. 10 doden.[55]",
    "doden": 10,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1959-06-10",
    "beschrijving": "Vliegramp vliegtuig MLD nabij Goa. Alle 8 inzittenden, allen Nederlander, zijn om het leven gekomen. Vliegtuig was onderweg van Nederlands-Nieuw-Guinea naar Nederland.[56][57]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1960-11-18",
    "beschrijving": "Scheepsramp met de cutterzuiger Lake Fithian op de rivier de Hooghly in India, 18 doden, allen Nederlander.",
    "doden": 18,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1961-01-02",
    "beschrijving": "Een Dakota R4D-1 (de marine uitvoering van de DC-3) van de Marine Luchtvaart Dienst stort tijdens een oefenvlucht met het uitwerpen van fakkels bij het eiland Biak, Nieuw-Guinea neer. De 5 inzittenden komen om.[58]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1961-05-30",
    "beschrijving": "De Fridtjof Nansen een Douglas DC-8 van KLM stort neer in zee, enkele minuten na vertrek uit Lissabon. De 61 inzittenden (allen Nederlanders) komen om het leven.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1961-06-12",
    "beschrijving": "Vliegtuigcrash van KLM-vlucht 823 de Sirius te Caïro, Egypte, 20 doden, allen Nederlander.",
    "doden": 20,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1964-02-01",
    "beschrijving": "De Groningse coaster Titan vergaat bij de zuidkust van Noorwegen. 9 doden, allen Nederlander.",
    "doden": 9,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1965-02-19",
    "beschrijving": "Het vrachtschip Sophocles vergaat op de Atlantische Oceaan na een ontploffing in een lading kunstmest. Drie personen, onder wie twee Nederlanders, komen om.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1967-10-17",
    "beschrijving": "De kotter UK 154 zinkt op de Noordzee, ten noorden van Borkum. De 5 opvarenden verdrinken.[59]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1967-11-06",
    "beschrijving": "Instorten van de Julianabrug te Willemstad op Curaçao. 15 doden, onder wie 6 Nederlanders.[60]",
    "doden": 15,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1968-10-31",
    "beschrijving": "De coaster Oostmeep uit Harlingen wordt vermist op de Middellandse Zee. Alle 9 opvarenden zijn waarschijnlijk om het leven gekomen.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1969-07-15",
    "beschrijving": "Autobus rijdt de Maas in te Dinant, België, 21 doden, allen Nederlander.",
    "doden": 21,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1969-10-07",
    "beschrijving": "6 Nederlanders komen om tijdens de scheepsramp met de Donau uit Delfzijl, wanneer dit schip tijdens dichte mist in aanvaring komt met een Duits vrachtschip in de Eemsmonding.[61]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1970-08-09",
    "beschrijving": "Autobus rijdt in een kanaal in Spanje, 9 doden, allen Nederlander.",
    "doden": 9,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1971-08-19",
    "beschrijving": "Sleephopperzuiger HAM-308 zinkt in de haven van Wilhelmshaven. 7 doden, onder wie 6 Nederlanders.",
    "doden": 7,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1974-02-03",
    "beschrijving": "Scheepsramp met het vrachtschip Francina bij de Balearen. 9 doden, onder wie 7 Nederlanders.",
    "doden": 9,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1974-06-20",
    "beschrijving": "7 Nederlanders komen in Joegoslavië (in het huidige Kroatië) om het leven bij een busongeval, waarbij in totaal 8 doden vallen.",
    "doden": 8,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1974-07-05",
    "beschrijving": "Bus botst op vrachtauto te Jyväskylä, Finland. 14 doden, onder wie 11 Nederlanders.",
    "doden": 14,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1974-12-04",
    "beschrijving": "Crash Martinair-vlucht 138 in Colombo, Sri Lanka. 191 doden, waarvan 9 Nederlanders.[62]",
    "doden": 191,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1975-04-19",
    "beschrijving": "Brand op het riviercruiseschip Prinses Irene, Keulen, Duitsland. 20 doden, allen Nederlander.[63]",
    "doden": 20,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1976-06-27",
    "beschrijving": "Ontsporing van de sneltrein Amsterdam – Parijs te Neufvilles. 11 doden, allen Nederlander.",
    "doden": 11,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1976-09-19",
    "beschrijving": "Boeing 727-200 vliegt tegen berg bij Isparta (Turkije). 164 doden, 9 Nederlanders.",
    "doden": 164,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1977-03-27",
    "beschrijving": "Vliegtuigramp Tenerife, Canarische Eilanden, 583 doden, onder wie 238 Nederlanders.",
    "doden": 583,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1978-04-30",
    "beschrijving": "6 Nederlanders komen om het leven bij een vliegtuigongeval in het graafschap Kent.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1978-07-11",
    "beschrijving": "Explosie te Los Alfaques, Spanje, 216 doden, onder wie 10 Nederlanders.",
    "doden": 216,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1982-03-19",
    "beschrijving": "Vliegtuigongeval nabij Beranti op Sumatra. Van de 25 doden komen er 5 uit Nederland.",
    "doden": 25,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1982-07-16",
    "beschrijving": "Bij een verkeersongeval nabij het Franse Limonest komen 5 Nederlanders om het leven.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1982-12-22",
    "beschrijving": "9 Nederlanders komen om het leven bij een vliegtuigongeval in het oosten van Frankrijk.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1986-06-18",
    "beschrijving": "Vliegtuigcrash in Grand Canyon, USA, 25 doden, onder wie 11 Nederlanders",
    "doden": 25,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1989-02-15",
    "beschrijving": "Scheepsramp van tanker Maassluis, Skikda, Algerije, 27 doden, allen Nederlander.",
    "doden": 27,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1989-06-07",
    "beschrijving": "Vliegtuigcrash op Zanderij, Paramaribo, Suriname, 175 doden, allen Surinamers en Nederlander.",
    "doden": 175,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1991-02-13",
    "beschrijving": "Lawine doodt 9 Nederlanders tijdens een trektocht nabij het Franse Briançon.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1992-09-28",
    "beschrijving": "Een Airbus A300 van Pakistan International Airlines onderweg van Karachi crasht vlak voor de landing bij Kathmandu. 167 doden, onder wie 14 Nederlanders.",
    "doden": 167,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1992-12-21",
    "beschrijving": "Vliegramp Faro, Portugal, 56 doden, allen Nederlander.",
    "doden": 56,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1993-09-08",
    "beschrijving": "Busongeval bij Lyon. 5 Nederlandse doden.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1994-12-08",
    "beschrijving": "Een touringcar met leden van zangkoor 'De Lofstem' uit Elburg botst bij Regensburg op een vrachtwagencombinatie geladen met boomstammen. Zes personen komen om het leven.[64]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1996-02-12",
    "beschrijving": "Bij het Duitse Winterberg komen 7 Nederlanders om het leven bij een busongeval.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1996-08-09",
    "beschrijving": "Bij een busongeluk in Zuid-Zweden komen zes leden van een Nederlandse scoutinggroep uit Tungelroy om het leven.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1996-10-10",
    "beschrijving": "Bij een busongeval nabij Antalya in Turkije komen 13 mensen om het leven, onder wie 6 Nederlanders.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1997-07-08",
    "beschrijving": "Bij een verkeersdrama in Egypte (Aswan), waarbij een bus betrokken is, komen 8 Nederlandse toeristen om het leven.[65]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "1999-08-17",
    "beschrijving": "Aardbeving Turkije in de omgeving van Izmit. 17.217 doden, onder wie 39 (Turkse) Nederlanders.",
    "doden": 217,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "2001-01-25",
    "beschrijving": "Een DC-3 van de Venezolaanse maatschappij Rutaca crasht op woonwijk in Ciudad Bolívar, Venezuela, 24 doden, onder wie 5 Nederlanders.",
    "doden": 24,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "2002-03-18",
    "beschrijving": "Busongeval nabij het Franse Metz, 7 Nederlandse doden.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "2004-12-26",
    "beschrijving": "Tsunami in Indische Oceaan, meer dan 289.000 doden, onder wie 36 Nederlanders.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "2009-07-30",
    "beschrijving": "Busongeluk te Sant Pol de Mar, Spanje, 6 doden, allen Nederlanders.",
    "doden": 6,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "2010-01-12",
    "beschrijving": "Aardbeving in Haïti, circa 316.000 doden, onder wie 7 Nederlanders.[66]",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "2010-05-12",
    "beschrijving": "Vliegtuigramp Tripoli, Libië, 103 doden, onder wie 70 Nederlanders.[67]",
    "doden": 103,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "2010-12-01",
    "beschrijving": "Busongeluk in Peru nabij het Titicacameer, 9 doden, onder wie 5 Nederlanders.",
    "doden": 9,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "2012-03-13",
    "beschrijving": "Busongeval Sierre in tunnel aan autosnelweg A9 nabij Sierre in Zwitserland, 28 doden, onder wie 22 schoolkinderen met inbegrip van 6 Nederlandse kinderen.[68]",
    "doden": 28,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "2014-07-17",
    "beschrijving": "Malaysia Airlines-vlucht 17 Vliegtuigramp in Oekraïne, neergeschoten. 298 passagiers en bemanning, onder wie 193 Nederlanders, kwamen om het leven.",
    "doden": 0,
    "gewonden": 0,
    "type": "ramp_met_nederlanders"
  },
  {
    "datum": "2015-05-03",
    "beschrijving": "Treinongeval bij Dalfsen waarbij een intercity botst met een vrachtwagen op een spoorwegovergang.",
    "doden": 1,
    "gewonden": 0,
    "type": "ramp_in_nederland"
  },
  {
    "datum": "2017-01-15",
    "beschrijving": "Busongeval bij Losser waarbij een touringcar met studenten van de weg raakt door gladheid.",
    "doden": 2,
    "gewonden": 0,
    "type": "ramp_in_nederland"
  },
  {
    "datum": "2018-01-10",
    "beschrijving": "Brand in een seniorenflat in Arnhem, waarbij meerdere bewoners omkomen door rookinhalatie.",
    "doden": 6,
    "gewonden": 0,
    "type": "ramp_in_nederland"
  },
  {
    "datum": "2021-07-28",
    "beschrijving": "Overstromingen in Limburg door extreme regenval, met enkele dodelijke slachtoffers.",
    "doden": 4,
    "gewonden": 0,
    "type": "ramp_in_nederland"
  }

  // Voeg hier meer rampendata toe
];
