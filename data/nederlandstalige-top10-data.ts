
export interface Top10NLSong {
  position: string;
  artist: string;
  title: string;
}

// This interface was originally for Top10NLYearEntry,
// but since NEDERLANDSTALIGE_TOP10_BY_YEAR is a Record<number, Top10NLSong[]>,
// this specific interface might not be directly used for the main data structure,
// but it's good for defining the shape if you were to pass a single year's data around.
export interface Top10NLYearData { // Changed from Top10NLYearEntry for clarity if used elsewhere
  year: number;
  songs: Top10NLSong[];
}

export const MIN_NEDERLANDSTALIGE_TOP10_YEAR = 1970;

// BELANGRIJK: Vul dit object aan met de data voor alle jaren vanaf 1970.
// Dit is slechts een voorbeeldstructuur gebaseerd op jouw input.
export const NEDERLANDSTALIGE_TOP10_BY_YEAR: Record<number, Top10NLSong[]> = {
  1970: [
    { position: "1", artist: "Corry en de Rekels", title: "Huilen is voor jou te laat" },
    { position: "2", artist: "D.C. Lewis", title: "Mijn gebed" },
    { position: "3", artist: "Jan Boezeroen", title: "De fles" },
    {
      "position": "4",
      "artist": "Gert Timmerman",
      "title": "Brandend zand"
    },
    {
      "position": "5",
      "artist": "Anja",
      "title": "Nemen en geven"
    },
    {
      "position": "6",
      "artist": "Wil de Bras",
      "title": "Die nacht"
    },
    {
      "position": "7",
      "artist": "Piet, Adèle & Leen",
      "title": "Het zal je kind maar wezen"
    },
    {
      "position": "8",
      "artist": "Wil de Bras",
      "title": "Mona"
    },
    {
      "position": "9",
      "artist": "Four Tak",
      "title": "Kus me voor de laatste keer"
    },
    {
      "position": "10",
      "artist": "Wilma",
      "title": "'n suikerspin"
    }
  ], // Comma to separate entries
  1971: [ // 1971 is now a key
    {
      "position": "1",
      "artist": "Mieke Telkamp",
      "title": "Waarheen, waarvoor"
    },
    {
      "position": "2",
      "artist": "Jacques Herb",
      "title": "Manuela"
    },
    {
      "position": "3",
      "artist": "Corry Konings",
      "title": "Rozen die bloeien"
    },
    {
      "position": "4",
      "artist": "Vader Abraham & Wilma",
      "title": "Zou het erg zijn lieve opa"
    },
    {
      "position": "5",
      "artist": "Cock van der Palm",
      "title": "Mira"
    },
    {
      "position": "6",
      "artist": "Zangeres Zonder Naam",
      "title": "Het soldaatje (De vier raadsels)"
    },
    {
      "position": "7",
      "artist": "Ronnie Tober",
      "title": "Rozen voor Sandra"
    },
    {
      "position": "8",
      "artist": "Zusjes De Roo",
      "title": "Blauwe korenbloemen"
    },
    {
      "position": "9",
      "artist": "Herman Lippinkhof",
      "title": "Karavaan"
    },
    {
      "position": "10",
      "artist": "Vader Abraham",
      "title": "Jij en ik blijven bestaan"
    }
  ],
  1972: [
    {
      "position": "1",
      "artist": "Arne Jansen",
      "title": "Meisjes met rode haren"
    },
    {
      "position": "2",
      "artist": "Jan Boezeroen",
      "title": "Oei oei"
    },
    {
      "position": "3",
      "artist": "Zangeres Zonder Naam",
      "title": "Mandolinen in Nicosia"
    },
    {
      "position": "4",
      "artist": "André van Duin",
      "title": "Angelique"
    },
    {
      "position": "5",
      "artist": "Hanny",
      "title": "Mario"
    },
    {
      "position": "6",
      "artist": "Makkers, De",
      "title": "Zomerzon"
    },
    {
      "position": "7",
      "artist": "Sandra & Andres",
      "title": "Als het om de liefde gaat"
    },
    {
      "position": "8",
      "artist": "Louis Neefs",
      "title": "Margrietje (De rozen zullen bloeien)"
    },
    {
      "position": "9",
      "artist": "Jacques Herb & Makkers, De & Vader Abraham",
      "title": "Veronica 538"
    },
    {
      "position": "10",
      "artist": "Vader Abraham",
      "title": "Zo is het leven"
    }
  ],
  1973: [
    {
      "position": "1",
      "artist": "Dimitri van Toren",
      "title": "Hé kom aan"
    },
    {
      "position": "2",
      "artist": "Gerard Cox",
      "title": "'t Is weer voorbij die mooie zomer"
    },
    {
      "position": "3",
      "artist": "Peter Koelewijn",
      "title": "Angeline (m'n blonde sexmachine)"
    },
    {
      "position": "4",
      "artist": "Rob de Nijs",
      "title": "Dag zuster Ursula"
    },
    {
      "position": "5",
      "artist": "Dimitri van Toren",
      "title": "Een lied voor kinderen"
    },
    {
      "position": "6",
      "artist": "Frank & Mirella",
      "title": "Cher ami"
    },
    {
      "position": "7",
      "artist": "Ria Valk",
      "title": "Moeder ik ben zo bang"
    },
    {
      "position": "8",
      "artist": "Boudewijn de Groot",
      "title": "Jimmy"
    },
    {
      "position": "9",
      "artist": "Gerrit Dekzeil",
      "title": "Ik ben Gerrit"
    },
    {
      "position": "10",
      "artist": "Vader Abraham",
      "title": "Bedankt lieve ouders"
    }
  ],
  1974: [
    {
      "position": "1",
      "artist": "Marc Winter",
      "title": "De heilsoldaat"
    },
    {
      "position": "2",
      "artist": "Mouth & MacNeal",
      "title": "Ik zie een ster"
    },
    {
      "position": "3",
      "artist": "Nico Haak",
      "title": "Honkie tonkie pianissie"
    },
    {
      "position": "4",
      "artist": "Ivan Heylen",
      "title": "De wilde boerndochtere"
    },
    {
      "position": "5",
      "artist": "Mieke",
      "title": "Een kind zonder moeder"
    },
    {
      "position": "6",
      "artist": "Peter Koelewijn",
      "title": "Veronica, sorry"
    },
    {
      "position": "7",
      "artist": "Liesbeth List",
      "title": "Te veel te vaak"
    },
    {
      "position": "8",
      "artist": "Conny Vandenbos",
      "title": "Een roosje, m'n roosje"
    },
    {
      "position": "9",
      "artist": "Vader Abraham & Boer Koekoek",
      "title": "Den Uyl is in den olie"
    },
    {
      "position": "10",
      "artist": "Jan Boezeroen",
      "title": "De dronkaard"
    }
  ],
  1975: [
    {
      "position": "1",
      "artist": "Peter Schaap",
      "title": "Adem mijn adem"
    },
    {
      "position": "2",
      "artist": "Imca Marina",
      "title": "Vino"
    },
    {
      "position": "3",
      "artist": "Nico Haak",
      "title": "Foxie Foxtrot"
    },
    {
      "position": "4",
      "artist": "Hydra",
      "title": "Marietje (want in het bos daar zijn de jagers)"
    },
    {
      "position": "5",
      "artist": "Arne Jansen",
      "title": "Mooie meisjes..."
    },
    {
      "position": "6",
      "artist": "Reinhard Mey",
      "title": "Als de dag van toen"
    },
    {
      "position": "7",
      "artist": "Zangeres Zonder Naam",
      "title": "Keetje tippel"
    },
    {
      "position": "8",
      "artist": "Joost Nuissl",
      "title": "Ik ben blij dat ik je niet vergeten ben"
    },
    {
      "position": "9",
      "artist": "Joe Harris",
      "title": "Drink rode wijn"
    },
    {
      "position": "10",
      "artist": "Alexander Curly",
      "title": "Guus"
    }
  ],
  1976: [
    {
      "position": "1",
      "artist": "Conny Vandenbos",
      "title": "Ome Arie"
    },
    {
      "position": "2",
      "artist": "Gerard de Vries",
      "title": "Teddybeer"
    },
    {
      "position": "3",
      "artist": "Vader Abraham",
      "title": "Als je wilt weten wie ik ben"
    },
    {
      "position": "4",
      "artist": "Dennie Christian",
      "title": "Besame mucho"
    },
    {
      "position": "5",
      "artist": "Cees & Marjan",
      "title": "Hoe lang zou 't duren"
    },
    {
      "position": "6",
      "artist": "André van Duin",
      "title": "Willempie"
    },
    {
      "position": "7",
      "artist": "Ron Brandsteder & Bonnie St. Claire",
      "title": "Dokter Bernhard"
    },
    {
      "position": "8",
      "artist": "Corry Konings",
      "title": "Ik krijg een heel apart gevoel van binnen"
    },
    {
      "position": "9",
      "artist": "André van Duin",
      "title": "Onzichtbare André"
    },
    {
      "position": "10",
      "artist": "Nico Haak",
      "title": "Moe zijn"
    }
  ],
  1977: [
    {
      "position": "1",
      "artist": "Sneeuwbal Trio, het",
      "title": "Adé m'n kleine paloma"
    },
    {
      "position": "2",
      "artist": "Normaal",
      "title": "Oerend hard"
    },
    {
      "position": "3",
      "artist": "Rita Hovink",
      "title": "Antonio"
    },
    {
      "position": "4",
      "artist": "Vader Abraham",
      "title": "'t Smurfenlied"
    },
    {
      "position": "5",
      "artist": "Normaal",
      "title": "Alie"
    },
    {
      "position": "6",
      "artist": "Migra's, De",
      "title": "In de vreemde (Verlaten)"
    },
    {
      "position": "7",
      "artist": "Rob de Nijs",
      "title": "Het werd zomer"
    },
    {
      "position": "8",
      "artist": "Havenzangers, De",
      "title": "Aan het strand stil en verlaten"
    },
    {
      "position": "9",
      "artist": "Mieke",
      "title": "Santa Maria"
    },
    {
      "position": "10",
      "artist": "André van Duin",
      "title": "Nee nou wordt-ie mooi!"
    }
  ],
  1978: [
    {
      "position": "1",
      "artist": "Theo Diepenbrock",
      "title": "Oh darling"
    },
    {
      "position": "2",
      "artist": "Henk Wijngaard",
      "title": "Met de vlam in de pijp"
    },
    {
      "position": "3",
      "artist": "Dennie Christian",
      "title": "Guust Flater en de Marsupilami (Wij zijn 2 vrienden)"
    },
    {
      "position": "4",
      "artist": "Arno & Gratje",
      "title": "Pappie, ik zie tranen in uw ogen"
    },
    {
      "position": "5",
      "artist": "Tol Hansse",
      "title": "Big city"
    },
    {
      "position": "6",
      "artist": "Migra's, De",
      "title": "Het stadje Kufstein (Daar heb ik het jodelen geleerd)"
    },
    {
      "position": "7",
      "artist": "Havenzangers, De",
      "title": "Oh heideroosje"
    },
    {
      "position": "8",
      "artist": "Wiko's, De",
      "title": "Ik zal geen traan meer om je laten"
    },
    {
      "position": "9",
      "artist": "Henk Wijngaard",
      "title": "Ik heb m'n wagen volgeladen"
    },
    {
      "position": "10",
      "artist": "Vader Abraham",
      "title": "Als je weggaat"
    }
  ],
  1979: [
    {
      "position": "1",
      "artist": "Willem Duyn",
      "title": "Willem"
    },
    {
      "position": "2",
      "artist": "Sandy",
      "title": "Ik ben verliefd op John Travolta"
    },
    {
      "position": "3",
      "artist": "Paul Boey",
      "title": "'k heb de mot in me lijf"
    },
    {
      "position": "4",
      "artist": "Sunstreams, the",
      "title": "Aan de grens van de Duitse heuvelen"
    },
    {
      "position": "5",
      "artist": "Sandy",
      "title": "Doe de hoela hoep"
    },
    {
      "position": "6",
      "artist": "Jan Boezeroen",
      "title": "Vondel was goed"
    },
    {
      "position": "7",
      "artist": "Jan & Zwaan",
      "title": "Ik zoek een meisje"
    },
    {
      "position": "8",
      "artist": "Sunstreams, the",
      "title": "Hoor je 't ruisen der golven"
    },
    {
      "position": "9",
      "artist": "Havenzangers, De",
      "title": "Greetje uit de polder"
    },
    {
      "position": "10",
      "artist": "Sandy",
      "title": "Tot ziens teddybeer"
    }
  ],
  1980: [
    {
      "position": "1",
      "artist": "Lenny Kuhr",
      "title": "Visite"
    },
    {
      "position": "2",
      "artist": "Benny Neyman",
      "title": "Ik weet niet hoe"
    },
    {
      "position": "3",
      "artist": "Bonnie St. Claire",
      "title": "Pierrot"
    },
    {
      "position": "4",
      "artist": "Henk Wijngaard",
      "title": "Container-song"
    },
    {
      "position": "5",
      "artist": "Arie Ribbens",
      "title": "Brabantse nachten zijn lang"
    },
    {
      "position": "6",
      "artist": "New Four",
      "title": "Meisje, ik ben een zeeman"
    },
    {
      "position": "7",
      "artist": "Bloem",
      "title": "Even aan mijn moeder vragen"
    },
    {
      "position": "8",
      "artist": "Bonnie St. Claire",
      "title": "Bonnie kom je buiten spelen"
    },
    {
      "position": "9",
      "artist": "Raymond van het Groenewoud",
      "title": "Je veux de l'amour"
    },
    {
      "position": "10",
      "artist": "Gerard Schoonebeek",
      "title": "De lafaard van de stad"
    }
  ],
  1981: [
    {
      "position": "1",
      "artist": "Frank & Mirella",
      "title": "De verzonken stad"
    },
    {
      "position": "2",
      "artist": "André Hazes",
      "title": "'n Beetje verliefd"
    },
    {
      "position": "3",
      "artist": "Peter Koelewijn",
      "title": "Klap maar in je handen (live)"
    },
    {
      "position": "4",
      "artist": "Henk Wijngaard",
      "title": "Ik heb 'n truck als m'n woning"
    },
    {
      "position": "5",
      "artist": "André van Duin",
      "title": "Er staat een paard in de gang / Flip Fluitketel"
    },
    {
      "position": "6",
      "artist": "Ron Brandsteder",
      "title": "Lieve Bella beer"
    },
    {
      "position": "7",
      "artist": "Kinderen Voor Kinderen",
      "title": "Ik heb zo waanzinnig gedroomd"
    },
    {
      "position": "8",
      "artist": "Rubberen Robbie",
      "title": "De Nederlandse sterre die strale overal!"
    },
    {
      "position": "9",
      "artist": "De Aal",
      "title": "Een barg die he un krul in de steert"
    },
    {
      "position": "10",
      "artist": "Will Tura",
      "title": "Hopeloos"
    }
  ],
  1982: [
    {
      "position": "1",
      "artist": "Doe Maar",
      "title": "Doris Day"
    },
    {
      "position": "2",
      "artist": "Nicole",
      "title": "Een beetje vrede"
    },
    {
      "position": "3",
      "artist": "Dutch Boys",
      "title": "Boer Harms"
    },
    {
      "position": "4",
      "artist": "Corry Konings",
      "title": "Adios amor"
    },
    {
      "position": "5",
      "artist": "André van Duin",
      "title": "Als je huilt / Bim bam"
    },
    {
      "position": "6",
      "artist": "Drukwerk",
      "title": "Je loog tegen mij"
    },
    {
      "position": "7",
      "artist": "Doe Maar",
      "title": "De bom"
    },
    {
      "position": "8",
      "artist": "Angelique",
      "title": "Een beetje geld voor een beetje liefde"
    },
    {
      "position": "9",
      "artist": "Drukwerk",
      "title": "Wat dom"
    },
    {
      "position": "10",
      "artist": "Doe Maar",
      "title": "Is dit alles"
    }
  ],
  1983: [
    {
      "position": "1",
      "artist": "Shorts, the",
      "title": "Comment ça va"
    },
    {
      "position": "2",
      "artist": "Hans de Booij",
      "title": "Annabel"
    },
    {
      "position": "3",
      "artist": "Doe Maar",
      "title": "Pa"
    },
    {
      "position": "4",
      "artist": "Canyon",
      "title": "Als ik maar bij jou ben"
    },
    {
      "position": "5",
      "artist": "Vulcano",
      "title": "Een beetje van dit"
    },
    {
      "position": "6",
      "artist": "André van Duin",
      "title": "De heidezangers"
    },
    {
      "position": "7",
      "artist": "Shorts, the",
      "title": "Je suis, tu es"
    },
    {
      "position": "8",
      "artist": "V.O.F. De Kunst",
      "title": "Suzanne"
    },
    {
      "position": "9",
      "artist": "Toontje Lager",
      "title": "Stiekem gedanst"
    },
    {
      "position": "10",
      "artist": "Havenzangers, De",
      "title": "'s Nachts na tweeën"
    }
  ],
  1984: [
    {
      "position": "1",
      "artist": "Danny de Munk",
      "title": "Ik voel me zo verdomd alleen"
    },
    {
      "position": "2",
      "artist": "Danny de Munk",
      "title": "Mijn stad"
    },
    {
      "position": "3",
      "artist": "Klein Orkest",
      "title": "Over de muur"
    },
    {
      "position": "4",
      "artist": "Herman van Veen",
      "title": "Hilversum III"
    },
    {
      "position": "5",
      "artist": "Lodewijck van Avezaath",
      "title": "Verrek! Zeg kerel, ben jij 't"
    },
    {
      "position": "6",
      "artist": "Frank Boeijen",
      "title": "Zwart-wit"
    },
    {
      "position": "7",
      "artist": "Normaal",
      "title": "Hiekikkowokan"
    },
    {
      "position": "8",
      "artist": "Toendra's, De",
      "title": "Ik wil weer naar huis"
    },
    {
      "position": "9",
      "artist": "Koos Alberts",
      "title": "Ik verscheurde je foto"
    },
    {
      "position": "10",
      "artist": "John Spencer",
      "title": "Een meisje voor altijd"
    }
  ],
  1985: [
    {
      "position": "1",
      "artist": "Benny Neyman",
      "title": "Waarom fluister ik je naam nog?"
    },
    {
      "position": "2",
      "artist": "André Hazes",
      "title": "Ik meen 't"
    },
    {
      "position": "3",
      "artist": "Jan Boezeroen",
      "title": "Toen ik eindelijk alles had"
    },
    {
      "position": "4",
      "artist": "Frank Boeijen",
      "title": "Kronenburg Park"
    },
    {
      "position": "5",
      "artist": "Dennie Christian & Mieke",
      "title": "Zaterdagavond"
    },
    {
      "position": "6",
      "artist": "Pisa",
      "title": "Popie Jopie"
    },
    {
      "position": "7",
      "artist": "André Hazes",
      "title": "Buona sera / Oh Marie"
    },
    {
      "position": "8",
      "artist": "Koos Alberts",
      "title": "Ik zal je nooit vergeten"
    },
    {
      "position": "9",
      "artist": "André van Duin",
      "title": "Een boutje en 'n moertje en 'n schroefje en 'n nippeltje / Daar ben ik niet blij mee"
    },
    {
      "position": "10",
      "artist": "Meneer Kaktus",
      "title": "Het grote Meneer Kaktus lied"
    }
  ],
  1986: [
    {
      "position": "1",
      "artist": "Robert Long",
      "title": "Iedereen doet 't"
    },
    {
      "position": "2",
      "artist": "Het Goede Doel",
      "title": "Alles geprobeerd"
    },
    {
      "position": "3",
      "artist": "Erik Mesie",
      "title": "Zonder jou"
    },
    {
      "position": "4",
      "artist": "Zangeres Zonder Naam",
      "title": "Mexico (live)"
    },
    {
      "position": "5",
      "artist": "Rob de Nijs",
      "title": "Alles wat ademt"
    },
    {
      "position": "6",
      "artist": "Jantje Koopmans",
      "title": "Ik wil een baan"
    },
    {
      "position": "7",
      "artist": "Koos Alberts & Corry Konings",
      "title": "Ik wil altijd bij jou zijn"
    },
    {
      "position": "8",
      "artist": "Danny de Munk",
      "title": "Ratsmodee"
    },
    {
      "position": "9",
      "artist": "Frank & Mirella",
      "title": "Nou en of love"
    },
    {
      "position": "10",
      "artist": "Koos Alberts",
      "title": "Ik slaap vannacht wel op de bank"
    }
  ],
  1987: [
    {
      "position": "1",
      "artist": "V.O.F. De Kunst",
      "title": "Eén kopje koffie"
    },
    {
      "position": "2",
      "artist": "Manke Nelis",
      "title": "Kleine jodeljongen"
    },
    {
      "position": "3",
      "artist": "Circus Custers",
      "title": "Monica"
    },
    {
      "position": "4",
      "artist": "Willy Alberti",
      "title": "Liefde"
    },
    {
      "position": "5",
      "artist": "Colinda",
      "title": "Let me in"
    },
    {
      "position": "6",
      "artist": "Deurzakkers, De",
      "title": "Geef ons de sleutel maar"
    },
    {
      "position": "7",
      "artist": "Gerard Cox",
      "title": "Die laaielichter"
    },
    {
      "position": "8",
      "artist": "De Dijk",
      "title": "Mag het licht uit"
    },
    {
      "position": "9",
      "artist": "Sunstreams, the",
      "title": "Zonder jou ben ik verloren"
    },
    {
      "position": "10",
      "artist": "Colinda",
      "title": "Kom dans met mij Colinda"
    }
  ],
  1988: [
    {
      "position": "1",
      "artist": "Renée de Haan",
      "title": "Vuile huichelaar"
    },
    {
      "position": "2",
      "artist": "André Hazes & Het Nederlands Elftal",
      "title": "Wij houden van Oranje"
    },
    {
      "position": "3",
      "artist": "Koos Alberts",
      "title": "Eenmaal kom jij terug"
    },
    {
      "position": "4",
      "artist": "Pisa",
      "title": "Tiet veur 'un pafke!"
    },
    {
      "position": "5",
      "artist": "Gerard Joling",
      "title": "Shangri-la"
    },
    {
      "position": "6",
      "artist": "Gerrit Uittenberg",
      "title": "Ik heb nooit 's mazzel"
    },
    {
      "position": "7",
      "artist": "Renée de Haan",
      "title": "Mannen (Steeds weer de verkeerde)"
    },
    {
      "position": "8",
      "artist": "Martine Bijl , Simone Kleinsma & Robert Long & Robert Paul",
      "title": "Vanmorgen vloog ze nog"
    },
    {
      "position": "9",
      "artist": "Hanny",
      "title": "Dit is 'n liedje over liefde"
    },
    {
      "position": "10",
      "artist": "Holland",
      "title": "Aanvallen!"
    }
  ],
  1989: [
    {
      "position": "1",
      "artist": "René Froger & Het Goede Doel",
      "title": "Alles kan een mens gelukkig maken"
    },
    {
      "position": "2",
      "artist": "Kadanz",
      "title": "De wind"
    },
    {
      "position": "3",
      "artist": "Kadanz",
      "title": "Dagen dat ik je vergeet"
    },
    {
      "position": "4",
      "artist": "De Dijk",
      "title": "Nergens goed voor"
    },
    {
      "position": "5",
      "artist": "Normaal",
      "title": "Rechttoe rechtan"
    },
    {
      "position": "6",
      "artist": "Henk Wijngaard",
      "title": "'n sneeuwwitte bruidsjurk"
    },
    {
      "position": "7",
      "artist": "Jan ten Hoopen",
      "title": "Je bent alles"
    },
    {
      "position": "8",
      "artist": "Hepie & Hepie",
      "title": "Ik lig op m'n kussen stil te dromen ('89 versie)"
    },
    {
      "position": "9",
      "artist": "Koos Alberts",
      "title": "Jij blijft bij mij"
    },
    {
      "position": "10",
      "artist": "Peter Koelewijn & MC Miker G & DJ Sven",
      "title": "Kom van dat dak af"
    }
  ],
  1990: [
    {
      "position": "1",
      "artist": "Corry Konings",
      "title": "Mooi was die tijd"
    },
    {
      "position": "2",
      "artist": "Clouseau",
      "title": "Daar gaat ze"
    },
    {
      "position": "3",
      "artist": "Clouseau",
      "title": "Louise"
    },
    {
      "position": "4",
      "artist": "Henk Wijngaard",
      "title": "Hé Suzie"
    },
    {
      "position": "5",
      "artist": "Clouseau",
      "title": "Wil niet dat je weggaat (live)"
    },
    {
      "position": "6",
      "artist": "Herman Finkers & Brigitte Kaandorp",
      "title": "Duet"
    },
    {
      "position": "7",
      "artist": "André Hazes",
      "title": "Oranje bovenaan"
    },
    {
      "position": "8",
      "artist": "André Hazes",
      "title": "Kleine jongen"
    },
    {
      "position": "9",
      "artist": "Henk Wijngaard",
      "title": "Die kleine deur naar 't paradijs"
    },
    {
      "position": "10",
      "artist": "Ron Brandsteder & Havenzangers, De",
      "title": "Hand in hand achter Oranje"
    }
  ],
  1991: [
    {
      "position": "1",
      "artist": "Mannenkoor Karrespoor",
      "title": "Mooi man"
    },
    {
      "position": "2",
      "artist": "Raymond van het Groenewoud",
      "title": "Liefde voor muziek"
    },
    {
      "position": "3",
      "artist": "Mannenkoor Karrespoor",
      "title": "Lekker op de trekker"
    },
    {
      "position": "4",
      "artist": "Pater Moeskroen",
      "title": "Roodkapje"
    },
    {
      "position": "5",
      "artist": "Hanny",
      "title": "Liefde is lekker maar lekker is niet altijd liefde"
    },
    {
      "position": "6",
      "artist": "André Hazes",
      "title": "Zomer"
    },
    {
      "position": "7",
      "artist": "Stef Bos",
      "title": "Papa"
    },
    {
      "position": "8",
      "artist": "Gordon",
      "title": "Kon ik maar even bij je zijn"
    },
    {
      "position": "9",
      "artist": "Doe Maar",
      "title": "32 jaar (sinds 1 dag of 2)"
    },
    {
      "position": "10",
      "artist": "Hanny",
      "title": "Maar vanavond heb ik hoofdpijn"
    }
  ],
  1992: [
    {
      "position": "1",
      "artist": "Marianne Weber",
      "title": "Ik weet dat er een ander is"
    },
    {
      "position": "2",
      "artist": "Arne Jansen",
      "title": "Zeg 'ns meisje"
    },
    {
      "position": "3",
      "artist": "Bertus Staigerpaip",
      "title": "Wij zijn de jongens van den bouw"
    },
    {
      "position": "4",
      "artist": "Booming Support",
      "title": "Rode schoentjes"
    },
    {
      "position": "5",
      "artist": "Rowwen Hèze",
      "title": "Bestel mar"
    },
    {
      "position": "6",
      "artist": "Benny Neyman",
      "title": "Liefde voor het leven"
    },
    {
      "position": "7",
      "artist": "Dingetje",
      "title": "Kaplaarzen"
    },
    {
      "position": "8",
      "artist": "Blunt Axe",
      "title": "Ben d'r helemaal klaar voor"
    },
    {
      "position": "9",
      "artist": "Saskia & Serge",
      "title": "Als je zachtjes zegt 'ik hou van jou'"
    },
    {
      "position": "10",
      "artist": "André Hazes",
      "title": "Samen kunnen we Europa aan"
    }
  ],
  1993: [
    {
      "position": "1",
      "artist": "Willeke Alberti",
      "title": "Ome Jan"
    },
    {
      "position": "2",
      "artist": "Jazzpolitie, de",
      "title": "Liefdesliedjes"
    },
    {
      "position": "3",
      "artist": "Vera Mann",
      "title": "Nog één kans"
    },
    {
      "position": "4",
      "artist": "Ruth Jacott & Paul de Leeuw",
      "title": "Blijf bij mij"
    },
    {
      "position": "5",
      "artist": "Gordon",
      "title": "'t Is zo weer voorbij"
    },
    {
      "position": "6",
      "artist": "Normaal",
      "title": "Doe niet zo moeilijk"
    },
    {
      "position": "7",
      "artist": "Ruth Jacott",
      "title": "Vrede"
    },
    {
      "position": "8",
      "artist": "Ajax-selectie, de",
      "title": "Ajax is okay!"
    },
    {
      "position": "9",
      "artist": "Jazzpolitie, de",
      "title": "Ze zijn terug"
    },
    {
      "position": "10",
      "artist": "Ronald",
      "title": "Transsexueel"
    }
  ],
  1994: [
    {
      "position": "1",
      "artist": "Marco Borsato",
      "title": "Dromen zijn bedrog"
    },
    {
      "position": "2",
      "artist": "Paul de Leeuw",
      "title": "Ik wil niet dat je liegt / Waarheen waarvoor"
    },
    {
      "position": "3",
      "artist": "Van Dik Hout",
      "title": "Stil in mij"
    },
    {
      "position": "4",
      "artist": "Ruth Jacott",
      "title": "Ik kan echt zonder jou / Buseruka"
    },
    {
      "position": "5",
      "artist": "De Dijk",
      "title": "Als ze er niet is"
    },
    {
      "position": "6",
      "artist": "Nico Landers",
      "title": "Liefde in de nacht"
    },
    {
      "position": "7",
      "artist": "Frans Bauer",
      "title": "Als sterren aan de hemel staan"
    },
    {
      "position": "8",
      "artist": "Paul de Leeuw",
      "title": "Voorbij / Ik ben zo blij dat ik een vrouw ben"
    },
    {
      "position": "9",
      "artist": "Dikke Lul Band, de",
      "title": "Dikke lul"
    },
    {
      "position": "10",
      "artist": "Johan & De Groothandel",
      "title": "As Dick me hullep nodig heb"
    }
  ],
  1995: [
    {
      "position": "1",
      "artist": "Guus Meeuwis & Vagant",
      "title": "Het is een nacht (levensecht)"
    },
    {
      "position": "2",
      "artist": "Nachraove, De",
      "title": "Sjeng aon de geng"
    },
    {
      "position": "3",
      "artist": "Clouseau",
      "title": "Laat me nu toch niet alleen"
    },
    {
      "position": "4",
      "artist": "Clouseau",
      "title": "Passie"
    },
    {
      "position": "5",
      "artist": "Gordon",
      "title": "Omdat ik zo van je hou"
    },
    {
      "position": "6",
      "artist": "Danny Lukassen",
      "title": "Ajax is kampioen"
    },
    {
      "position": "7",
      "artist": "Irene Moors & Smurfen, De",
      "title": "No limit"
    },
    {
      "position": "8",
      "artist": "Marco Borsato",
      "title": "Dromen zijn bedrog"
    },
    {
      "position": "9",
      "artist": "Marco Borsato",
      "title": "Waarom nou jij"
    },
    {
      "position": "10",
      "artist": "Höllenboer",
      "title": "Het busje komt zo"
    }
  ],
  1996: [
    {
      "position": "1",
      "artist": "Rob de Nijs",
      "title": "Banger hart"
    },
    {
      "position": "2",
      "artist": "Guus Meeuwis",
      "title": "Per spoor (kedeng kedeng)"
    },
    {
      "position": "3",
      "artist": "Marco Borsato",
      "title": "Margherita / Vrij zijn"
    },
    {
      "position": "4",
      "artist": "Simone Kleinsma & Paul de Leeuw",
      "title": "Zonder jou"
    },
    {
      "position": "5",
      "artist": "Demis",
      "title": "Ga dan"
    },
    {
      "position": "6",
      "artist": "Guus Meeuwis",
      "title": "Zo ver weg"
    },
    {
      "position": "7",
      "artist": "Fluitsma & Van Tijn",
      "title": "15 miljoen mensen"
    },
    {
      "position": "8",
      "artist": "Jiskefet",
      "title": "Lullo, heb je nog geneukt / Peter"
    },
    {
      "position": "9",
      "artist": "One Two Trio",
      "title": "Juffrouw Toos"
    },
    {
      "position": "10",
      "artist": "Linda, Roos & Jessica",
      "title": "Ademnood"
    }
  ],
  1997: [
    {
      "position": "1",
      "artist": "Marco Borsato & Trijntje Oosterhuis",
      "title": "Wereld zonder jou"
    },
    {
      "position": "2",
      "artist": "Hero",
      "title": "Toen ik je zag"
    },
    {
      "position": "3",
      "artist": "Freek de Jonge",
      "title": "Leven na de dood"
    },
    {
      "position": "4",
      "artist": "De Kast",
      "title": "In nije dei (live)"
    },
    {
      "position": "5",
      "artist": "DJ Madman",
      "title": "Meisje (zo lelijk als de nacht)"
    },
    {
      "position": "6",
      "artist": "Jan Smit",
      "title": "Ik zing dit lied voor jou alleen"
    },
    {
      "position": "7",
      "artist": "Paul de Leeuw",
      "title": "'k heb je lief"
    },
    {
      "position": "8",
      "artist": "Frans Bauer & Marianne Weber",
      "title": "De regenboog"
    },
    {
      "position": "9",
      "artist": "Is Ook Schitterend!",
      "title": "Voltooid verleden tijd"
    },
    {
      "position": "10",
      "artist": "BN'ers voor BNN",
      "title": "Hij gaat voor C!"
    }
  ],
  1998: [
    {
      "position": "1",
      "artist": "Acda en De Munnik",
      "title": "Niet of nooit geweest"
    },
    {
      "position": "2",
      "artist": "Henk Westbroek",
      "title": "Zelfs je naam is mooi"
    },
    {
      "position": "3",
      "artist": "Volumia!",
      "title": "Afscheid"
    },
    {
      "position": "4",
      "artist": "Marco Borsato",
      "title": "De bestemming"
    },
    {
      "position": "5",
      "artist": "Bløf",
      "title": "Aan de kust (live)"
    },
    {
      "position": "6",
      "artist": "Volumia!",
      "title": "Hou me vast"
    },
    {
      "position": "7",
      "artist": "De Kast",
      "title": "Woorden zonder woorden"
    },
    {
      "position": "8",
      "artist": "Titt'n",
      "title": "Ben je geil of wil je een koekje?"
    },
    {
      "position": "9",
      "artist": "Bløf",
      "title": "Liefs uit Londen"
    },
    {
      "position": "10",
      "artist": "De Kast",
      "title": "Eltse grins foarby"
    }
  ],
  1999: [
    {
      "position": "1",
      "artist": "Gordon & Re-Play",
      "title": "Never nooit meer"
    },
    {
      "position": "2",
      "artist": "Boswachters, de",
      "title": "Het bananenlied"
    },
    {
      "position": "3",
      "artist": "De Kast",
      "title": "In de wolken"
    },
    {
      "position": "4",
      "artist": "Poema's, de",
      "title": "Mijn houten hart"
    },
    {
      "position": "5",
      "artist": "Marco Borsato",
      "title": "Het water/Speeltuin"
    },
    {
      "position": "6",
      "artist": "Bløf",
      "title": "Harder dan ik hebben kan"
    },
    {
      "position": "7",
      "artist": "Ome Henk",
      "title": "Mambo nr. 6"
    },
    {
      "position": "8",
      "artist": "One Two Trio",
      "title": "Tien klein tuinkabouters"
    },
    {
      "position": "9",
      "artist": "Ruth Jacott",
      "title": "Leun op mij"
    },
    {
      "position": "10",
      "artist": "Trijntje Oosterhuis",
      "title": "Vlieg met me mee (Het avontuur)"
    }
  ],
  2000: [
    {
      "position": "1",
      "artist": "Alex",
      "title": "Een bossie rooie rozen"
    },
    {
      "position": "2",
      "artist": "Twarres",
      "title": "Wer bisto"
    },
    {
      "position": "3",
      "artist": "Jop",
      "title": "Jij bent de zon"
    },
    {
      "position": "4",
      "artist": "Abel",
      "title": "Onderweg"
    },
    {
      "position": "5",
      "artist": "Bløf",
      "title": "Dansen aan zee"
    },
    {
      "position": "6",
      "artist": "Osdorp Posse",
      "title": "Origineel Amsterdams"
    },
    {
      "position": "7",
      "artist": "Def Rhymz & Postmen",
      "title": "De bom"
    },
    {
      "position": "8",
      "artist": "Wolter Kroes",
      "title": "Jij bent alles voor mij"
    },
    {
      "position": "9",
      "artist": "Paul de Leeuw",
      "title": "Je bent m'n maatje / Ik heb je nodig"
    },
    {
      "position": "10",
      "artist": "De Kast",
      "title": "Hart van mijn gevoel"
    }
  ],
  2001: [
    {
      "position": "1",
      "artist": "Kabouter Plop",
      "title": "Kabouterdans"
    },
    {
      "position": "2",
      "artist": "Cooldown Café ft. DJ Stefan",
      "title": "Hey baby (uhh, ahh)"
    },
    {
      "position": "3",
      "artist": "Def Rhymz",
      "title": "Puf/Schudden"
    },
    {
      "position": "4",
      "artist": "Def Rhymz & Lloyd",
      "title": "Ze zitten me achterna"
    },
    {
      "position": "5",
      "artist": "K3",
      "title": "Blub ik ben een vis / Oma's aan de top"
    },
    {
      "position": "6",
      "artist": "Poema's, de",
      "title": "Zij maakt het verschil"
    },
    {
      "position": "7",
      "artist": "Volumia!",
      "title": "Eeuwig zou te kort zijn"
    },
    {
      "position": "8",
      "artist": "Slimme Schemer ft. Tido",
      "title": "Jelle"
    },
    {
      "position": "9",
      "artist": "K3",
      "title": "Alle kleuren"
    },
    {
      "position": "10",
      "artist": "De Kast",
      "title": "Zonder reden"
    }
  ],
  2002: [
    {
      "position": "1",
      "artist": "Marco Borsato & Sita",
      "title": "Lopen op het water"
    },
    {
      "position": "2",
      "artist": "Marco Borsato",
      "title": "Zij"
    },
    {
      "position": "3",
      "artist": "K3",
      "title": "Toveren"
    },
    {
      "position": "4",
      "artist": "Brainpower",
      "title": "Dansplaat"
    },
    {
      "position": "5",
      "artist": "Def Rhymz",
      "title": "Ik ben niet te stoppe"
    },
    {
      "position": "6",
      "artist": "Gordon & Re-Play",
      "title": "Weet dat ik van je hou"
    },
    {
      "position": "7",
      "artist": "Bløf",
      "title": "Mooie dag"
    },
    {
      "position": "8",
      "artist": "K3",
      "title": "Feest"
    },
    {
      "position": "9",
      "artist": "Re-Play",
      "title": "Niemand"
    },
    {
      "position": "10",
      "artist": "Def P",
      "title": "Bubbelbad"
    }
  ],
  2003: [
    {
      "position": "1",
      "artist": "Veldhuis & Kemper",
      "title": "Ik wou dat ik jou was"
    },
    {
      "position": "2",
      "artist": "K3",
      "title": "Oya lélé"
    },
    {
      "position": "3",
      "artist": "Gebroeders Ko",
      "title": "Ik heb 'n toeter op m'n waterscooter"
    },
    {
      "position": "4",
      "artist": "Tooske Breugem & Bastiaan Ragas",
      "title": "Alles"
    },
    {
      "position": "5",
      "artist": "K3",
      "title": "De 3 biggetjes"
    },
    {
      "position": "6",
      "artist": "Gebroeders Ko",
      "title": "Tuut, tuut , tuut, wij springen parachute!"
    },
    {
      "position": "7",
      "artist": "Frans Bauer",
      "title": "'n Ons geluk"
    },
    {
      "position": "8",
      "artist": "Bløf",
      "title": "Omarm"
    },
    {
      "position": "9",
      "artist": "M-Kids",
      "title": "Indianendans"
    },
    {
      "position": "10",
      "artist": "Guus Meeuwis",
      "title": "Ik wil je"
    }
  ],
  2004: [
    {
      "position": "1",
      "artist": "Frans Bauer",
      "title": "Heb je even voor mij"
    },
    {
      "position": "2",
      "artist": "Marco Borsato",
      "title": "Afscheid nemen bestaat niet"
    },
    {
      "position": "3",
      "artist": "Marco Borsato & Do",
      "title": "Voorbij"
    },
    {
      "position": "4",
      "artist": "Ali B & Brace",
      "title": "Ik ben je zat"
    },
    {
      "position": "5",
      "artist": "K3",
      "title": "Liefdeskapitein"
    },
    {
      "position": "6",
      "artist": "Rob de Nijs",
      "title": "Deze zee"
    },
    {
      "position": "7",
      "artist": "Brace & Lange Frans & Baas B",
      "title": "Moppie"
    },
    {
      "position": "8",
      "artist": "Ali B & Marco Borsato",
      "title": "Wat zou je doen"
    },
    {
      "position": "9",
      "artist": "Gebroeders Ko",
      "title": "Tringeling"
    },
    {
      "position": "10",
      "artist": "Gebroeders Ko",
      "title": "Zonnebril/Muggen"
    }
  ],
  2005: [
    {
      "position": "1",
      "artist": "Jan Smit",
      "title": "Vrienden voor het leven"
    },
    {
      "position": "2",
      "artist": "Guus Meeuwis",
      "title": "Geef mij je angst"
    },
    {
      "position": "3",
      "artist": "Ali B & Brace & Yes-R",
      "title": "Leipe Mocro flavour"
    },
    {
      "position": "4",
      "artist": "K3",
      "title": "Kuma he"
    },
    {
      "position": "5",
      "artist": "De Jeugd Van Tegenwoordig",
      "title": "Watskeburt?!"
    },
    {
      "position": "6",
      "artist": "Kus",
      "title": "Lekker ding"
    },
    {
      "position": "7",
      "artist": "Jan Smit",
      "title": "Laura"
    },
    {
      "position": "8",
      "artist": "Snappie",
      "title": "De kleine krokodil"
    },
    {
      "position": "9",
      "artist": "Artiesten Voor Azië",
      "title": "Als je iets kan doen"
    },
    {
      "position": "10",
      "artist": "Lange Frans & Baas B",
      "title": "Het land van..."
    }
  ],
  2006: [
    {
      "position": "1",
      "artist": "Marco Borsato",
      "title": "Rood"
    },
    {
      "position": "2",
      "artist": "Jan Smit",
      "title": "Als de morgen is gekomen"
    },
    {
      "position": "3",
      "artist": "Gebroeders Ko",
      "title": "Boten Anna"
    },
    {
      "position": "4",
      "artist": "Henkie",
      "title": "Lief klein konijntje"
    },
    {
      "position": "5",
      "artist": "Guillermo & Tropical Danny",
      "title": "Toppertje!"
    },
    {
      "position": "6",
      "artist": "Jan Smit",
      "title": "Laura"
    },
    {
      "position": "7",
      "artist": "Ali B & Partysquad, the & Yes-R",
      "title": "Rampeneren"
    },
    {
      "position": "8",
      "artist": "Stef Ekkel",
      "title": "De woonboot"
    },
    {
      "position": "9",
      "artist": "Bløf",
      "title": "Aanzoek zonder ringen"
    },
    {
      "position": "10",
      "artist": "Bløf",
      "title": "Hemingway"
    }
  ],
  2007: [
    {
      "position": "1",
      "artist": "Jeroen van der Boom",
      "title": "Jij bent zo"
    },
    {
      "position": "2",
      "artist": "André Hazes & Gerard Joling",
      "title": "Blijf bij mij"
    },
    {
      "position": "3",
      "artist": "Gerard Joling",
      "title": "Maak me gek"
    },
    {
      "position": "4",
      "artist": "Guus Meeuwis",
      "title": "Tranen gelachen"
    },
    {
      "position": "5",
      "artist": "Jan Smit",
      "title": "Cupido"
    },
    {
      "position": "6",
      "artist": "Nienke",
      "title": "Het huis Anubis"
    },
    {
      "position": "7",
      "artist": "Monique Smit",
      "title": "Wild"
    },
    {
      "position": "8",
      "artist": "René Froger",
      "title": "Doe maar gewoon"
    },
    {
      "position": "9",
      "artist": "Nick & Simon",
      "title": "Kijk omhoog"
    },
    {
      "position": "10",
      "artist": "Bløf",
      "title": "Alles is liefde"
    }
  ],
  2008: [
    {
      "position": "1",
      "artist": "Nick & Simon",
      "title": "Rosanne"
    },
    {
      "position": "2",
      "artist": "Jeroen van der Boom",
      "title": "Betekenis"
    },
    {
      "position": "3",
      "artist": "Jan Smit",
      "title": "Stilte in de storm"
    },
    {
      "position": "4",
      "artist": "Bløf",
      "title": "Alles is liefde"
    },
    {
      "position": "5",
      "artist": "Nick & Simon",
      "title": "Hoe lang?"
    },
    {
      "position": "6",
      "artist": "Gerard Joling",
      "title": "Ik hou d'r zo van"
    },
    {
      "position": "7",
      "artist": "Wolter Kroes",
      "title": "Viva Hollandia"
    },
    {
      "position": "8",
      "artist": "Gerard Joling",
      "title": "24 uur verliefd"
    },
    {
      "position": "9",
      "artist": "Frans Bauer & Marianne Weber",
      "title": "Als ik met jou op wolken zweef"
    },
    {
      "position": "10",
      "artist": "Gebroeders Ko",
      "title": "Schatje, mag ik je foto?"
    }
  ],
  2009: [
    {
      "position": "1",
      "artist": "Marco Borsato",
      "title": "Dochters"
    },
    {
      "position": "2",
      "artist": "Damaru & Jan Smit",
      "title": "Mi rowsu (tuintje in mijn hart)"
    },
    {
      "position": "3",
      "artist": "Jordy van Loon",
      "title": "Verliefdheid"
    },
    {
      "position": "4",
      "artist": "Diggy Dex & Eva de Roovere",
      "title": "Slaap lekker (fantastig toch)"
    },
    {
      "position": "5",
      "artist": "Thomas Berge",
      "title": "Ieder moment"
    },
    {
      "position": "6",
      "artist": "K3",
      "title": "MaMaSé!"
    },
    {
      "position": "7",
      "artist": "Guus Meeuwis",
      "title": "Dat komt door jou"
    },
    {
      "position": "8",
      "artist": "Jordy van Loon",
      "title": "Een kusje voor jou"
    },
    {
      "position": "9",
      "artist": "Rachid",
      "title": "Ik ben Rachid"
    },
    {
      "position": "10",
      "artist": "Jim Bakkum",
      "title": "Door jou"
    }
  ],
  2010: [
    {
      "position": "1",
      "artist": "Marco Borsato & Guus Meeuwis",
      "title": "Schouder aan schouder"
    },
    {
      "position": "2",
      "artist": "Jan Smit",
      "title": "Leef nu het kan"
    },
    {
      "position": "3",
      "artist": "Sieneke",
      "title": "Ik ben verliefd (Sha-la-lie)"
    },
    {
      "position": "4",
      "artist": "Gebroeders Ko",
      "title": "Helikopter"
    },
    {
      "position": "5",
      "artist": "Frans Duijts",
      "title": "Ik mis je"
    },
    {
      "position": "6",
      "artist": "3JS & Ellen ten Damme",
      "title": "Wat is dromen"
    },
    {
      "position": "7",
      "artist": "Acda en De Munnik",
      "title": "Eva"
    },
    {
      "position": "8",
      "artist": "Tony Junior & Nicolas Nox",
      "title": "Loesje"
    },
    {
      "position": "9",
      "artist": "Willem Barth",
      "title": "Bella bella signorina"
    },
    {
      "position": "10",
      "artist": "Gerard Joling",
      "title": "Ik leef mijn droom"
    }
  ],
  2011: [
    {
      "position": "1",
      "artist": "Glennis Grace",
      "title": "Afscheid"
    },
    {
      "position": "2",
      "artist": "Gerard Joling",
      "title": "Er hangt liefde in de lucht"
    },
    {
      "position": "3",
      "artist": "Thomas Berge",
      "title": "Mijn woord"
    },
    {
      "position": "4",
      "artist": "Stef Ekkel",
      "title": "Waarheen, waarvoor"
    },
    {
      "position": "5",
      "artist": "René Froger",
      "title": "Ogen weer geopend"
    },
    {
      "position": "6",
      "artist": "3JS",
      "title": "Je vecht nooit alleen"
    },
    {
      "position": "7",
      "artist": "Gebroeders Ko",
      "title": "Alleen maar schoenen aan"
    },
    {
      "position": "8",
      "artist": "Thomas Berge",
      "title": "Niets is onmogelijk"
    },
    {
      "position": "9",
      "artist": "Frans Bauer",
      "title": "Mijn hart gaat zo tekeer"
    },
    {
      "position": "10",
      "artist": "Jeroen van der Boom & Leonie Meijer",
      "title": "Los van de grond"
    }
  ],
  2012: [
    {
      "position": "1",
      "artist": "Django Wagner",
      "title": "Als jij niet kiezen kan"
    },
    {
      "position": "2",
      "artist": "Gerard Joling & Jan Smit",
      "title": "Echte vrienden"
    },
    {
      "position": "3",
      "artist": "Nielson",
      "title": "Beauty & de brains"
    },
    {
      "position": "4",
      "artist": "Matthijs Koning",
      "title": "Deze avond"
    },
    {
      "position": "5",
      "artist": "Danny Froger",
      "title": "Harder"
    },
    {
      "position": "6",
      "artist": "René Froger",
      "title": "Het verleden kruist het heden"
    },
    {
      "position": "7",
      "artist": "Jeroen van der Boom",
      "title": "Kom maar op"
    },
    {
      "position": "8",
      "artist": "Henk Dissel",
      "title": "Lange nacht"
    },
    {
      "position": "9",
      "artist": "Danny Froger",
      "title": "Vandaag"
    },
    {
      "position": "10",
      "artist": "Sieneke",
      "title": "Hé lekker ding!"
    }
  ],
  2013: [
    {
      "position": "1",
      "artist": "Maaike Ouboter",
      "title": "Dat ik je mis"
    },
    {
      "position": "2",
      "artist": "Miss Montreal & Nielson",
      "title": "Hoe"
    },
    {
      "position": "3",
      "artist": "Gordon",
      "title": "Kom eens dichterbij"
    },
    {
      "position": "4",
      "artist": "Jandino & Gerard Joling",
      "title": "Mijn liefde"
    },
    {
      "position": "5",
      "artist": "René Froger",
      "title": "Daar sta je dan 2013 (Waar zijn al je vrienden)"
    },
    {
      "position": "6",
      "artist": "Frans Duijts",
      "title": "Blijf vannacht bij mij"
    },
    {
      "position": "7",
      "artist": "Henk Dissel",
      "title": "Rood fruit"
    },
    {
      "position": "8",
      "artist": "Django Wagner",
      "title": "Dat ene moment"
    },
    {
      "position": "9",
      "artist": "Henk Bernard",
      "title": "Hou me nog 'n keertje vast (Geniet van het leven)"
    },
    {
      "position": "10",
      "artist": "Jaman",
      "title": "Waarom?"
    }
  ],
  2014: [
    {
      "position": "1",
      "artist": "Nielson",
      "title": "Sexy als ik dans"
    },
    {
      "position": "2",
      "artist": "Snollebollekes",
      "title": "Vrouwkes"
    },
    {
      "position": "3",
      "artist": "Jayh",
      "title": "Mooie dag"
    },
    {
      "position": "4",
      "artist": "Antje Monteiro & Django Wagner",
      "title": "Vlinders"
    },
    {
      "position": "5",
      "artist": "Jan Smit",
      "title": "Jij & ik"
    },
    {
      "position": "6",
      "artist": "Jada Borsato  Marco Borsato & Lange Frans & John Ewbank & Willem Frederiks",
      "title": "Samen voor altijd"
    },
    {
      "position": "7",
      "artist": "Peter Beense & Django Wagner",
      "title": "Vanaf vandaag"
    },
    {
      "position": "8",
      "artist": "Marianne Weber",
      "title": "Reuzenrad"
    },
    {
      "position": "9",
      "artist": "Jaman",
      "title": "Samen dansen op de reggaebeat"
    },
    {
      "position": "10",
      "artist": "Danny Froger & Wesley Klein & Danny Nicolay",
      "title": "Dans en zing"
    }
  ],
  2015: [
    {
      "position": "1",
      "artist": "Kenny B.",
      "title": "Parijs"
    },
    {
      "position": "2",
      "artist": "Jeroen van der Boom",
      "title": "Mag ik dan bij jou (Live in de ArenA)"
    },
    {
      "position": "3",
      "artist": "André Hazes jr.",
      "title": "Leef"
    },
    {
      "position": "4",
      "artist": "Django Wagner",
      "title": "Ik hou nog steeds van jou"
    },
    {
      "position": "5",
      "artist": "Frans Duijts",
      "title": "Ik laat je nooit meer gaan"
    },
    {
      "position": "6",
      "artist": "Jeffrey Heesen",
      "title": "De wereld is van ons"
    },
    {
      "position": "7",
      "artist": "Jeffrey Heesen",
      "title": "Mag ik de zon laten schijnen"
    },
    {
      "position": "8",
      "artist": "John de Bever & Marianne Weber",
      "title": "Denk nog een keer aan mij"
    },
    {
      "position": "9",
      "artist": "Nick & Simon",
      "title": "Open je hart"
    },
    {
      "position": "10",
      "artist": "Henk Bernard",
      "title": "Een hart om van te houden"
    }
  ],
  2016: [
    {
      "position": "1",
      "artist": "Stef Ekkel  René Karst",
      "title": "Liever te dik in de kist …"
    },
    {
      "position": "2",
      "artist": "André Hazes jr.",
      "title": "Hé ouwe"
    },
    {
      "position": "3",
      "artist": "André Hazes jr.",
      "title": "Wat is de waarheid"
    },
    {
      "position": "4",
      "artist": "Jeffrey Heesen",
      "title": "Zijn we uitgepraat"
    },
    {
      "position": "5",
      "artist": "Lange Frans  John West",
      "title": "Lekkerding"
    },
    {
      "position": "6",
      "artist": "Diggy Dex ft. JW Roy",
      "title": "Treur niet (Ode aan het leven)"
    },
    {
      "position": "7",
      "artist": "Wesley Klein",
      "title": "Waarom dans je niet met mij"
    },
    {
      "position": "8",
      "artist": "André Hazes",
      "title": "Op de schoorsteen staat een foto"
    },
    {
      "position": "9",
      "artist": "Nielson & Jiggy Djé",
      "title": "Hotelsuite"
    },
    {
      "position": "10",
      "artist": "Danny de Munk & Django Wagner",
      "title": "Wij met z'n twee"
    }
  ],
  2017: [
    {
      "position": "1",
      "artist": "André Hazes jr.",
      "title": "Ik haal alles uit het leven"
    },
    {
      "position": "2",
      "artist": "Henk Dissel & Tim Douwsma",
      "title": "Het gevoel"
    },
    {
      "position": "3",
      "artist": "André Hazes jr.",
      "title": "Wie kan mij vertellen…"
    },
    {
      "position": "4",
      "artist": "Roxeanne Hazes",
      "title": "Ik was toch je meisje"
    },
    {
      "position": "5",
      "artist": "John West",
      "title": "Wit zwart (live)"
    },
    {
      "position": "6",
      "artist": "Klubbb3",
      "title": "Het leven danst sirtaki"
    },
    {
      "position": "7",
      "artist": "Jannes",
      "title": "Huilen doe ik wel alleen"
    },
    {
      "position": "8",
      "artist": "Jeffrey Heesen",
      "title": "M'n engel"
    },
    {
      "position": "9",
      "artist": "Jeffrey Heesen",
      "title": "Jij"
    },
    {
      "position": "10",
      "artist": "Mart Hoogkamer",
      "title": "Lekker leven"
    }
  ],
  2018: [
    {
      "position": "1",
      "artist": "Bløf ft. Geike Arnaert",
      "title": "Zoutelande"
    },
    {
      "position": "2",
      "artist": "Wesly Bronkhorst",
      "title": "Trots op jou"
    },
    {
      "position": "3",
      "artist": "Nielson",
      "title": "Diamant"
    },
    {
      "position": "4",
      "artist": "Wesley Klein & Monique Smit",
      "title": "Mooier dan mooi"
    },
    {
      "position": "5",
      "artist": "Alain Clark  Jan Smit & Glen Faria",
      "title": "Ik wil slapen"
    },
    {
      "position": "6",
      "artist": "André Hazes jr.",
      "title": "Later komt de spijt"
    },
    {
      "position": "7",
      "artist": "Henk Dissel",
      "title": "Het cafeetje"
    },
    {
      "position": "8",
      "artist": "André Hazes jr.",
      "title": "Anders"
    },
    {
      "position": "9",
      "artist": "John West",
      "title": "Jij laat me leven"
    },
    {
      "position": "10",
      "artist": "Jan Smit",
      "title": "Ik zie"
    }
  ],
  2019: [
    {
      "position": "1",
      "artist": "Tino Martin",
      "title": "Zij weet het"
    },
    {
      "position": "2",
      "artist": "Suzan & Freek",
      "title": "Als het avond is"
    },
    {
      "position": "3",
      "artist": "Marco Borsato  Davina Michelle & Armin van Buuren",
      "title": "Hoe het danst"
    },
    {
      "position": "4",
      "artist": "Suzan & Freek",
      "title": "Blauwe dag"
    },
    {
      "position": "5",
      "artist": "Davina Michelle",
      "title": "Duurt te lang"
    },
    {
      "position": "6",
      "artist": "René Karst",
      "title": "Atje voor de sfeer"
    },
    {
      "position": "7",
      "artist": "Nielson",
      "title": "IJskoud"
    },
    {
      "position": "8",
      "artist": "Maan",
      "title": "Zo kan het dus ook"
    },
    {
      "position": "9",
      "artist": "Marco Borsato  Snelle & John Ewbank",
      "title": "Lippenstift"
    },
    {
      "position": "10",
      "artist": "Guus Meeuwis",
      "title": "Kom we gaan"
    }
  ],
  2020: [
    {
      "position": "1",
      "artist": "Racoon",
      "title": "Het is al laat toch"
    },
    {
      "position": "2",
      "artist": "Suzan & Freek, Snelle",
      "title": "De overkant"
    },
    {
      "position": "3",
      "artist": "Suzan & Freek",
      "title": "Weg van jou"
    },
    {
      "position": "4",
      "artist": "Suzan & Freek",
      "title": "Deze is voor mij"
    },
    {
      "position": "5",
      "artist": "Jeffrey Heesen & Brace",
      "title": "Van mij alleen"
    },
    {
      "position": "6",
      "artist": "Emma Heesters",
      "title": "Waar ga je heen"
    },
    {
      "position": "7",
      "artist": "Maan",
      "title": "Ze huilt maar ze lacht"
    },
    {
      "position": "8",
      "artist": "Kris Kross Amsterdam, Tino Martin & Emma Heesters",
      "title": "Loop niet weg"
    },
    {
      "position": "9",
      "artist": "Davina Michelle & Snelle",
      "title": "17 Miljoen mensen"
    },
    {
      "position": "10",
      "artist": "Miss Montreal",
      "title": "Door de wind"
    }
  ],
  2021: [
    {
      "position": "1",
      "artist": "Snelle & Maan",
      "title": "Blijven slapen"
    },
    {
      "position": "2",
      "artist": "Mart Hoogkamer",
      "title": "Ik ga zwemmen"
    },
    {
      "position": "3",
      "artist": "Donnie & Frans Duijts",
      "title": "Frans Duits"
    },
    {
      "position": "4",
      "artist": "Suzan & Freek",
      "title": "Goud"
    },
    {
      "position": "5",
      "artist": "Donnie & René Froger",
      "title": "Bon gepakt"
    },
    {
      "position": "6",
      "artist": "Suzan & Freek",
      "title": "Onderweg naar later"
    },
    {
      "position": "7",
      "artist": "Miss Montreal",
      "title": "Door de wind"
    },
    {
      "position": "8",
      "artist": "Thomas Acda, Paul de Munnik, Maan & Typhoon",
      "title": "Als ik je weer zie"
    },
    {
      "position": "9",
      "artist": "Jaap Reesema  & Pommelien Thijs",
      "title": "Nu wij niet meer praten"
    },
    {
      "position": "10",
      "artist": "Stef Ekkel",
      "title": "Jammer dan"
    }
  ],
  2022: [
    {
      "position": "1",
      "artist": "Flemming",
      "title": "Automatisch"
    },
    {
      "position": "2",
      "artist": "Suzan & Freek",
      "title": "Honderd keer"
    },
    {
      "position": "3",
      "artist": "Willem & Jan",
      "title": "Tussen jou en mij"
    },
    {
      "position": "4",
      "artist": "Meau",
      "title": "Dat heb jij gedaan"
    },
    {
      "position": "5",
      "artist": "Suzan & Freek",
      "title": "Kwijt"
    },
    {
      "position": "6",
      "artist": "Flemming",
      "title": "Zij wil mij"
    },
    {
      "position": "7",
      "artist": "Kris Kross Amsterdam, Donnie & Tino Martin",
      "title": "Vanavond (uit m'n bol)"
    },
    {
      "position": "8",
      "artist": "Antoon",
      "title": "Hallo"
    },
    {
      "position": "9",
      "artist": "Jaap Reesema",
      "title": "Grijs"
    },
    {
      "position": "10",
      "artist": "Mart Hoogkamer",
      "title": "Diamant"
    }
  ],
  2023: [
    {
      "position": "1",
      "artist": "Marco Schuitmaker",
      "title": "Engelbewaarder"
    },
    {
      "position": "2",
      "artist": "Acda en De Munnik",
      "title": "Morgen wordt fantastisch"
    },
    {
      "position": "3",
      "artist": "Jan Smit & Marco Schuitmaker",
      "title": "Van Goes tot Purmerend"
    },
    {
      "position": "4",
      "artist": "Mart Hoogkamer",
      "title": "In Spanje"
    },
    {
      "position": "5",
      "artist": "Claude",
      "title": "Ladada (Mon dernier mot)"
    },
    {
      "position": "6",
      "artist": "Flemming",
      "title": "Paracetamollen"
    },
    {
      "position": "7",
      "artist": "Maan & Goldband",
      "title": "Stiekem"
    },
    {
      "position": "8",
      "artist": "Suzan & Freek ft. Claude",
      "title": "Vas-y (Ga maar)"
    },
    {
      "position": "9",
      "artist": "Suzan & Freek",
      "title": "Nooit meer regen"
    },
    {
      "position": "10",
      "artist": "Suzan & Freek",
      "title": "Slapeloosheid"
    }
  ],
  2024: [
    {
      "position": "1",
      "artist": "Yves Berendse",
      "title": "Terug in de tijd"
    },
    {
      "position": "2",
      "artist": "Joost",
      "title": "Europapa"
    },
    {
      "position": "3",
      "artist": "Marco Schuitmaker",
      "title": "Engelbewaarder"
    },
    {
      "position": "4",
      "artist": "Tino Martin & Anouk",
      "title": "Voor je 't weet"
    },
    {
      "position": "5",
      "artist": "Meau",
      "title": "Stukje van mij"
    },
    {
      "position": "6",
      "artist": "Jan Smit & 3JS",
      "title": "(Die man is) Verliefd"
    },
    {
      "position": "7",
      "artist": "Kafke & Frans Bauer",
      "title": "Van Brabant naar Bordeaux"
    },
    {
      "position": "8",
      "artist": "André Hazes jr. & Mart Hoogkamer",
      "title": "Zij is van mij"
    },
    {
      "position": "9",
      "artist": "Gerard Joling",
      "title": "Twee motten"
    },
    {
      "position": "10",
      "artist": "Yves Berendse & Emma Heesters",
      "title": "Alleen met jou"
    }
  ]
  // Voeg hier de rest van de jaren toe
};
