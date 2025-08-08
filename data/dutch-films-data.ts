
export interface DutchFilmData {
  title: string;
  director: string;
  notes: string;
}

export const MIN_DUTCH_FILMS_YEAR = 1970;

// BELANGRIJK: Vul dit object aan met de data voor alle jaren vanaf 1970.
export const DUTCH_FILMS_BY_YEAR: Record<number, DutchFilmData[]> = {
  1970: [
    // Weinig grote Nederlandse bioscoophits dit jaar, of data nog niet toegevoegd.
  ],
  1971: [
    { title: "Blue Movie", director: "Wim Verstappen", notes: "Grote hit, Platina Film." },
    { title: "Wat Zien Ik!?", director: "Paul Verhoeven", notes: "Gebaseerd op de roman van Albert Mol, een komedie over de Amsterdamse prostitutie." }
  ],
  1972: [
    // Voeg hier films voor 1972 toe
  ],
  1973: [
    { "title": "Turks Fruit", "director": "Paul Verhoeven", "notes": "Enorme hit, Diamanten Film (meer dan 1 miljoen bezoekers)." }
  ],
  1974: [
    { "title": "Alicia", "director": "Wim Verstappen", "notes": "Platina Film." }
  ],
  1975: [
    { "title": "Keetje Tippel", "director": "Paul Verhoeven", "notes": "Platina Film." }
  ],
  1976: [
    { "title": "Max Havelaar", "director": "Fons Rademakers", "notes": "Platina Film." }
  ],
  1977: [
    { "title": "Soldaat van Oranje", "director": "Paul Verhoeven", "notes": "Platina Film." }
  ],
  1978: [
    { "title": "Pastorale 1943", "director": "Wim Verstappen", "notes": "Platina Film." }
  ],
  1979: [
    { "title": "Een Vrouw als Eva", "director": "Nouchka van Brakel", "notes": "Platina Film." }
  ],
  1980: [
    { "title": "Vergeef me", "director": "Wim Verstappen", "notes": "Platina Film." }
  ],
  1981: [
    { "title": "Hoge Hakken, Echte Liefde", "director": "Leon de Winter", "notes": "Platina Film." }
  ],
  1982: [
    { "title": "De Boezemvriend", "director": "Dimitri Frenkel Frank", "notes": "Platina Film." }
  ],
  1983: [
    { "title": "Flodder", "director": "Dick Maas", "notes": "Grote hit, Platina Film." }
  ],
  1984: [
    { "title": "Ciske de Rat", "director": "Guido Pieters", "notes": "Grote hit, Platina Film." }
  ],
  1985: [
    { "title": "De IJssalon", "director": "Rob van Eyck", "notes": "Platina Film." }
  ],
  1986: [
    { "title": "Abel", "director": "Alex van Warmerdam", "notes": "Gouden Film." }
  ],
  1987: [
    // Weinig grote Nederlandse bioscoophits dit jaar.
  ],
  1988: [
    { "title": "Amsterdamned", "director": "Dick Maas", "notes": "Platina Film." }
  ],
  1989: [
    // Weinig grote Nederlandse bioscoophits dit jaar.
  ],
  1990: [
    { "title": "De Avonden", "director": "Rudolf van den Berg", "notes": "Gouden Film." }
  ],
  1991: [
    // Weinig grote Nederlandse bioscoophits dit jaar.
  ],
  1992: [
    { "title": "Flodder in Amerika!", "director": "Dick Maas", "notes": "Grote hit, Platina Film." }
  ],
  1993: [
    // Weinig grote Nederlandse bioscoophits dit jaar.
  ],
  1994: [
    // Weinig grote Nederlandse bioscoophits dit jaar.
  ],
  1995: [
    { "title": "Flodder 3", "director": "Dick Maas", "notes": "Platina Film." }
  ],
  1996: [
    { "title": "De Eerste Kus", "director": "Ineke Smits", "notes": "Gouden Film." }
  ],
  1997: [
    // Weinig grote Nederlandse bioscoophits dit jaar.
  ],
  1998: [
    { "title": "Temmink: The Ultimate Fight", "director": "Boris Paval Conen", "notes": "Gouden Film." }
  ],
  1999: [
    { "title": "Kruimeltje", "director": "Maria Peters", "notes": "Platina Film." }
  ],
  2000: [
    // Weinig grote Nederlandse bioscoophits dit jaar.
  ],
  2001: [
    { "title": "Costa!", "director": "Johan Nijenhuis", "notes": "Platina Film." },
    { "title": "AmnesiA", "director": "Martin Koolhoven", "notes": "Gouden Film." }
  ],
  2002: [
    { "title": "Volle Maan", "director": "Johan Nijenhuis", "notes": "Platina Film." },
    { "title": "Pietje Bell", "director": "Maria Peters", "notes": "Platina Film." }
  ],
  2003: [
    { "title": "Van God Los", "director": "Pieter Kuijpers", "notes": "Gouden Film." },
    { "title": "Pietje Bell 2: De Jacht op de Tsarenkroon", "director": "Maria Peters", "notes": "Platina Film." }
  ],
  2004: [
    { "title": "Simon", "director": "Eddy Terstall", "notes": "Gouden Film." },
    { "title": "Erik of het klein insectenboek", "director": "Giel Gorissen", "notes": "Platina Film." }
  ],
  2005: [
    { "title": "Alles is Liefde", "director": "Joram Lürsen", "notes": "Enorme hit, Diamanten Film (grootste deel van bezoekers in 2005/2006)." },
    { "title": "Pluk van de Petteflet", "director": "Ben Sombogaart", "notes": "Platina Film." }
  ],
  2006: [
    { "title": "Zwartboek", "director": "Paul Verhoeven", "notes": "Platina Film." },
    { "title": "Afblijven", "director": "Maria Peters", "notes": "Platina Film." }
  ],
  2007: [
    { "title": "Moordwijven", "director": "Dick Maas", "notes": "Platina Film." }
  ],
  2008: [
    { "title": "Wit Licht", "director": "Jean van de Velde", "notes": "Platina Film." },
    { "title": "Oorlogswinter", "director": "Martin Koolhoven", "notes": "Platina Film." }
  ],
  2009: [
    { "title": "Komt een vrouw bij de dokter", "director": "Reinout Oerlemans", "notes": "Enorme hit, Diamanten Film." },
    { "title": "De Storm", "director": "Ben Sombogaart", "notes": "Platina Film." }
  ],
  2010: [
    { "title": "New Kids Turbo", "director": "Steffen Haars & Flip van der Kuil", "notes": "Enorme hit, Diamanten Film." },
    { "title": "De Eetclub", "director": "Robert Jan Westdijk", "notes": "Platina Film." }
  ],
  2011: [
    { "title": "Gooische Vrouwen", "director": "Will Koopman", "notes": "Enorme hit, Diamanten Film." },
    { "title": "New Kids Nitro", "director": "Steffen Haars & Flip van der Kuil", "notes": "Platina Film." }
  ],
  2012: [
    { "title": "De Heineken Ontvoering", "director": "Pieter Kuijpers", "notes": "Platina Film." },
    { "title": "Alles is Familie", "director": "Joram Lürsen", "notes": "Enorme hit, Diamanten Film." }
  ],
  2013: [
    { "title": "Soof", "director": "Antoinette Beumer", "notes": "Platina Film." },
    { "title": "Mees Kees op kamp", "director": "Barbara Bredero", "notes": "Platina Film." }
  ],
  2014: [
    { "title": "Gooische Vrouwen 2", "director": "Will Koopman", "notes": "Enorme hit, Diamanten Film." },
    { "title": "Mees Kees op de planken", "director": "Barbara Bredero", "notes": "Platina Film." }
  ],
  2015: [
    { "title": "Bon Bini Holland", "director": "Jelle de Jonge", "notes": "Platina Film." },
    { "title": "Michiel de Ruyter", "director": "Roel Reiné", "notes": "Platina Film." }
  ],
  2016: [
    { "title": "Soof 2", "director": "Esmé Lammers", "notes": "Platina Film." },
    { "title": "Mees Kees langs de lijn", "director": "Barbara Bredero", "notes": "Platina Film." }
  ],
  2017: [
    { "title": "Bon Bini Holland 2", "director": "Jelle de Jonge", "notes": "Platina Film." }
  ],
  2018: [
    { "title": "Bon Bini Holland 3: Seleccion", "director": "Jelle de Jonge", "notes": "Platina Film." },
    { "title": "Bankier van het Verzet", "director": "Joram Lürsen", "notes": "Platina Film." }
  ],
  2019: [
    { "title": "Bon Bini Holland 4: Bienvenido a Miami", "director": "Jelle de Jonge", "notes": "Platina Film." },
    { "title": "De Beentjes van Sint-Hildegard", "director": "Johan Nijenhuis", "notes": "Begon eind 2019, werd enorme hit in 2020, Diamanten Film." }
  ],
  2020: [
    { "title": "De Beentjes van Sint-Hildegard", "director": "Johan Nijenhuis", "notes": "Grootste hit dit jaar, Diamanten Film." },
    { "title": "Bon Bini: Judeska in da House", "director": "Jonathan Herman", "notes": "Platina Film." }
    // Bioscopen deels gesloten door COVID-19.
  ],
  2021: [
    { "title": "Bon Bini Holland 5: Casa Homie", "director": "Jon Karthaus", "notes": "Platina Film." },
    { "title": "De Slag om de Schelde", "director": "Matthijs van Heijningen Jr.", "notes": "Platina Film." }
    // Bioscopen deels gesloten door COVID-19.
  ],
  2022: [
    { "title": "Bon Bini Holland 6: Bangkok Nights", "director": "Jelle de Jonge", "notes": "Platina Film (groot deel bezoekers in 2023)." },
    { "title": "Soof 3", "director": "Anne de Clercq", "notes": "Platina Film." },
    { "title": "De Tatta's", "director": "Jamal Choliev", "notes": "Begon eind 2022, werd enorme hit in 2023, Diamanten Film." }
  ],
  2023: [
    { "title": "De Tatta's", "director": "Jamal Choliev", "notes": "Grootste hit begin 2023, Diamanten Film." },
    { "title": "De Tatta's 2", "director": "Jamal Choliev", "notes": "Grote hit eind 2023, Diamanten Film." },
    { "title": "Oei, ik groei!", "director": "Appie Boudellah & Aram van de Rest", "notes": "Platina Film." }
  ],
  2024: [
    { "title": "De Tatta's 2", "director": "Jamal Choliev", "notes": "Nog steeds populair begin 2024." },
    { "title": "Verliefd op Bali", "director": "Johan Nijenhuis", "notes": "Platina Film." }
    // Data voor heel 2024 is nog niet beschikbaar.
  ]
  // Voeg hier meer jaren toe...
};

    
