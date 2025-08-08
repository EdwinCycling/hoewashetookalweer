export interface PopularCarInfo {
  brand: string;
  model: string;
  description: string;
}

export const MIN_CARS_YEAR = 1960;

export const POPULAR_CARS_BY_YEAR: { [year: number]: PopularCarInfo[] } = {
  1960: [
    { brand: "Volkswagen", model: "Kever", description: "Zeer gangbaar en populair." },
    { brand: "Renault", model: "Dauphine", description: "Populair in de vroege jaren '60." },
    { brand: "Opel", model: "Kadett", description: "Populair gezinsauto." },
    { brand: "Ford", model: "Anglia", description: "Gangbaar model." }
  ],
  1961: [
    { brand: "Volkswagen", model: "Kever", description: "Blijvend populair." },
    { brand: "Renault", model: "R4", description: "Geïntroduceerd, werd snel populair." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." }
  ],
  1962: [
    { brand: "Volkswagen", model: "Kever", description: "Nog steeds een bestseller." },
    { brand: "Renault", model: "R4", description: "Werd steeds populairder." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Ford", model: "Cortina", description: "Geïntroduceerd, werd populair." }
  ],
  1963: [
    { brand: "Volkswagen", model: "Kever", description: "Dominant." },
    { brand: "Renault", model: "R4", description: "Zeer gangbaar." },
    { brand: "Opel", model: "Kadett", description: "Populair." },
    { brand: "Ford", model: "Cortina", description: "Gangbaar." }
  ],
  1964: [
    { brand: "Volkswagen", model: "Kever", description: "Onverminderd populair." },
    { brand: "Renault", model: "R4", description: "Zeer gangbaar." },
    { brand: "Opel", model: "Kadett", description: "Populair." },
    { brand: "Ford", model: "Cortina", description: "Gangbaar." }
  ],
  1965: [
    { brand: "Volkswagen", model: "Kever", description: "Blijft de top." },
    { brand: "Renault", model: "R4", description: "Zeer gangbaar." },
    { brand: "Opel", model: "Kadett", description: "Populair." },
    { brand: "Ford", model: "Cortina", description: "Gangbaar." },
    { brand: "Simca", model: "1000", description: "Populair." }
  ],
  1966: [
    { brand: "Volkswagen", model: "Kever", description: "Nog steeds dominant." },
    { brand: "Renault", model: "R4", description: "Zeer gangbaar." },
    { brand: "Opel", model: "Kadett", description: "Populair." },
    { brand: "Ford", model: "Cortina", description: "Gangbaar." },
    { brand: "Simca", model: "1000", description: "Populair." }
  ],
  1967: [
    { brand: "Volkswagen", model: "Kever", description: "Blijft de top." },
    { brand: "Renault", model: "R4", description: "Zeer gangbaar." },
    { brand: "Opel", model: "Kadett", description: "Populair." },
    { brand: "Ford", model: "Cortina", description: "Gangbaar." },
    { brand: "Simca", model: "1000", description: "Populair." }
  ],
  1968: [
    { brand: "Volkswagen", model: "Kever", description: "Nog steeds dominant." },
    { brand: "Renault", model: "R4", description: "Zeer gangbaar." },
    { brand: "Opel", model: "Kadett", description: "Populair." },
    { brand: "Ford", model: "Escort", description: "Geïntroduceerd, werd snel populair." },
    { brand: "Simca", model: "1000", description: "Populair." }
  ],
  1969: [
    { brand: "Volkswagen", model: "Kever", description: "Blijft de top." },
    { brand: "Renault", model: "R4", description: "Zeer gangbaar." },
    { brand: "Opel", model: "Kadett", description: "Populair." },
    { brand: "Ford", model: "Escort", description: "Werd steeds populairder." },
    { brand: "Simca", model: "1000", description: "Populair." }
  ],
  1970: [
    { brand: "Volkswagen", model: "Kever", description: "Nog steeds een bestseller." },
    { brand: "Ford", model: "Escort", description: "Zeer populair." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Renault", model: "R4", description: "Gangbaar." },
    { brand: "Simca", model: "1100", description: "Populair." }
  ],
  1971: [
    { brand: "Volkswagen", model: "Kever", description: "Blijft populair." },
    { brand: "Ford", model: "Escort", description: "Zeer populair." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Renault", model: "R5", description: "Geïntroduceerd, werd snel populair." },
    { brand: "Simca", model: "1100", description: "Populair." }
  ],
  1972: [
    { brand: "Volkswagen", model: "Kever", description: "Nog steeds hoog in de verkoop." },
    { brand: "Ford", model: "Escort", description: "Zeer populair." },
    { brand: "Renault", model: "R5", description: "Werd een bestseller." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Fiat", model: "127", description: "Populair." }
  ],
  1973: [
    { brand: "Renault", model: "R5", description: "Een van de bestsellers." },
    { brand: "Ford", model: "Escort", description: "Zeer populair." },
    { brand: "Volkswagen", model: "Kever", description: "Verkoop begon iets af te nemen, maar nog steeds gangbaar." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Fiat", model: "127", description: "Populair." }
  ],
  1974: [
    { brand: "Renault", model: "R5", description: "Blijft een bestseller." },
    { brand: "Ford", model: "Escort", description: "Zeer populair." },
    { brand: "Volkswagen", model: "Golf", description: "Geïntroduceerd, werd snel een hit." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Fiat", model: "127", description: "Populair." }
  ],
  1975: [
    { brand: "Volkswagen", model: "Golf", description: "Werd snel de nieuwe bestseller." },
    { brand: "Renault", model: "R5", description: "Nog steeds zeer populair." },
    { brand: "Ford", model: "Escort", description: "Gangbaar." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Fiat", model: "127", description: "Populair." }
  ],
  1976: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant in de verkoop." },
    { brand: "Renault", model: "R5", description: "Zeer populair." },
    { brand: "Ford", model: "Escort", description: "Gangbaar." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Datsun", model: "Cherry", description: "Japanse auto's werden populairder." }
  ],
  1977: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Renault", model: "R5", description: "Zeer populair." },
    { brand: "Ford", model: "Escort", description: "Gangbaar." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Datsun", model: "Cherry", description: "Populair." }
  ],
  1978: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant." },
    { brand: "Renault", model: "R5", description: "Zeer populair." },
    { brand: "Ford", model: "Escort", description: "Gangbaar." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Simca", model: "Horizon", description: "Geïntroduceerd, werd populair." }
  ],
  1979: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Renault", model: "R5", description: "Zeer populair." },
    { brand: "Ford", model: "Escort", description: "Gangbaar." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Simca", model: "Horizon", description: "Populair." }
  ],
  1980: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant." },
    { brand: "Ford", model: "Escort", description: "Nieuwe generatie, zeer populair." },
    { brand: "Renault", model: "R5", description: "Zeer populair." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Fiat", model: "Uno", description: "Geïntroduceerd, werd snel populair." }
  ],
  1981: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Ford", model: "Escort", description: "Zeer populair." },
    { brand: "Renault", model: "R5", description: "Zeer populair." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Fiat", model: "Uno", description: "Populair." }
  ],
  1982: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant." },
    { brand: "Ford", model: "Escort", description: "Zeer populair." },
    { brand: "Renault", model: "R5", description: "Zeer populair." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Fiat", model: "Uno", description: "Populair." }
  ],
  1983: [
    { brand: "Volkswagen", model: "Golf", description: "Nieuwe generatie (Golf II), blijft bestseller." },
    { brand: "Ford", model: "Escort", description: "Zeer populair." },
    { brand: "Renault", model: "R5", description: "Zeer populair." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Fiat", model: "Uno", description: "Populair." }
  ],
  1984: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant." },
    { brand: "Ford", model: "Escort", description: "Zeer populair." },
    { brand: "Renault", model: "R5", description: "Zeer populair." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Fiat", model: "Uno", description: "Populair." }
  ],
  1985: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Ford", model: "Escort", description: "Zeer populair." },
    { brand: "Renault", model: "R5", description: "Zeer populair." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Fiat", model: "Uno", description: "Populair." }
  ],
  1986: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant." },
    { brand: "Ford", model: "Escort", description: "Zeer populair." },
    { brand: "Renault", model: "R5", description: "Zeer populair." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Peugeot", model: "205", description: "Werd populair." }
  ],
  1987: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Ford", model: "Escort", description: "Zeer populair." },
    { brand: "Renault", model: "R5", description: "Zeer populair." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Peugeot", model: "205", description: "Populair." }
  ],
  1988: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant." },
    { brand: "Ford", model: "Escort", description: "Zeer populair." },
    { brand: "Renault", model: "R5", description: "Zeer populair." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Peugeot", model: "205", description: "Populair." }
  ],
  1989: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Ford", model: "Escort", description: "Zeer populair." },
    { brand: "Renault", model: "R19", description: "Geïntroduceerd, werd populair." },
    { brand: "Opel", model: "Kadett", description: "Gangbaar." },
    { brand: "Peugeot", model: "205", description: "Populair." }
  ],
  1990: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant." },
    { brand: "Ford", model: "Escort", description: "Zeer populair." },
    { brand: "Renault", model: "R19", description: "Populair." },
    { brand: "Opel", model: "Astra", description: "Nieuwe naam voor Kadett, populair." },
    { brand: "Peugeot", model: "205", description: "Populair." }
  ],
  1991: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Ford", model: "Escort", description: "Zeer populair." },
    { brand: "Renault", model: "Clio", description: "Geïntroduceerd, werd snel populair." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "205", description: "Populair." }
  ],
  1992: [
    { brand: "Volkswagen", model: "Golf", description: "Nieuwe generatie (Golf III), blijft bestseller." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Escort", description: "Gangbaar." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "306", description: "Geïntroduceerd, werd populair." }
  ],
  1993: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Escort", description: "Gangbaar." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "306", description: "Populair." }
  ],
  1994: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Escort", description: "Gangbaar." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "306", description: "Populair." },
    { brand: "Volvo", model: "850", description: "Populair in het zakelijke segment." }
  ],
  1995: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Escort", description: "Gangbaar." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "306", description: "Populair." },
    { brand: "Volvo", model: "850", description: "Populair." }
  ],
  1996: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Escort", description: "Gangbaar." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "306", description: "Populair." },
    { brand: "Volvo", model: "S70/V70", description: "Opvolger 850, populair." }
  ],
  1997: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "306", description: "Populair." },
    { brand: "Volvo", model: "S70/V70", description: "Populair." }
  ],
  1998: [
    { brand: "Volkswagen", model: "Golf", description: "Nieuwe generatie (Golf IV), blijft bestseller." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "206", description: "Geïntroduceerd, werd snel populair." },
    { brand: "Ford", model: "Focus", description: "Geïntroduceerd, werd snel populair." }
  ],
  1999: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "206", description: "Populair." }
  ],
  2000: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant in de verkoop." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "206", description: "Populair." }
  ],
  2001: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "206", description: "Populair." }
  ],
  2002: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "206", description: "Populair." }
  ],
  2003: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "206", description: "Populair." }
  ],
  2004: [
    { brand: "Volkswagen", model: "Golf", description: "Nieuwe generatie (Golf V), blijft bestseller." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "206", description: "Populair." }
  ],
  2005: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "207", description: "Geïntroduceerd, werd populair." }
  ],
  2006: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "207", description: "Populair." }
  ],
  2007: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "207", description: "Populair." }
  ],
  2008: [
    { brand: "Volkswagen", model: "Golf", description: "Nieuwe generatie (Golf VI), blijft bestseller." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "207", description: "Populair." }
  ],
  2009: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Peugeot", model: "207", description: "Populair." }
  ],
  2010: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Kia", model: "Ceed", description: "Werd populair." }
  ],
  2011: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Kia", model: "Ceed", description: "Populair." }
  ],
  2012: [
    { brand: "Volkswagen", model: "Golf", description: "Nieuwe generatie (Golf VII), blijft bestseller." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Opel", model: "Astra", description: "Populair." },
    { brand: "Kia", model: "Picanto", description: "Populair stadsauto." }
  ],
  2013: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Volvo", model: "V40", description: "Populair in lease." },
    { brand: "Kia", model: "Picanto", description: "Populair." }
  ],
  2014: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Volvo", model: "V40", description: "Populair in lease." },
    { brand: "Kia", model: "Picanto", description: "Populair." }
  ],
  2015: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Volvo", model: "V40", description: "Populair in lease." },
    { brand: "Kia", model: "Picanto", description: "Populair." }
  ],
  2016: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Volvo", model: "V40", description: "Populair in lease." },
    { brand: "Kia", model: "Picanto", description: "Populair." }
  ],
  2017: [
    { brand: "Volkswagen", model: "Golf", description: "Dominant." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Volvo", model: "V40", description: "Populair in lease." },
    { brand: "Kia", model: "Picanto", description: "Populair." }
  ],
  2018: [
    { brand: "Volkswagen", model: "Golf", description: "Blijft de bestseller." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Volvo", model: "XC40", description: "Geïntroduceerd, werd snel populair (ook als EV)." },
    { brand: "Kia", model: "Picanto", description: "Populair." }
  ],
  2019: [
    { brand: "Volkswagen", model: "Golf", description: "Nog steeds hoog in de verkoop." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Volvo", model: "XC40", description: "Populair." },
    { brand: "Tesla", model: "Model 3", description: "Grote doorbraak EV, topverkoper in december." }
  ],
  2020: [
    { brand: "Volkswagen", model: "Golf", description: "Nieuwe generatie (Golf VIII), nog steeds populair." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Ford", model: "Focus", description: "Zeer populair." },
    { brand: "Volvo", model: "XC40", description: "Populair (ook als EV)." },
    { brand: "Kia", model: "Picanto", description: "Populair." }
  ],
  2021: [
    { brand: "Volkswagen", model: "Golf", description: "Nog steeds populair, maar concurrentie neemt toe." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Kia", model: "Picanto", description: "Vaak hoog in de verkooplijsten." },
    { brand: "Volvo", model: "XC40", description: "Populair (ook als EV)." },
    { brand: "Tesla", model: "Model Y", description: "Werd populair." }
  ],
  2022: [
    { brand: "Kia", model: "Picanto", description: "Vaak de best verkochte auto." },
    { brand: "Volkswagen", model: "Polo", description: "Populair." },
    { brand: "Renault", model: "Clio", description: "Zeer populair." },
    { brand: "Volvo", model: "XC40", description: "Populair (ook als EV)." },
    { brand: "Tesla", model: "Model Y", description: "Populair EV." }
  ],
  2023: [
    { brand: "Tesla", model: "Model Y", description: "De best verkochte auto van het jaar (vooral lease)." },
    { brand: "Kia", model: "Picanto", description: "Zeer populair bij particulieren." },
    { brand: "Volkswagen", model: "Polo", description: "Populair." },
    { brand: "Kia", model: "Ceed", description: "Populair." },
    { brand: "Volvo", model: "XC40", description: "Populair (ook als EV)." }
  ],
  2024: [
    { brand: "Tesla", model: "Model Y", description: "Nog steeds hoog in de verkoop (begin 2024)." },
    { brand: "Kia", model: "Picanto", description: "Nog steeds populair (begin 2024)." },
    { brand: "Volkswagen", model: "Polo", description: "Nog steeds populair (begin 2024)." },
    { brand: "Kia", model: "Ceed", description: "Nog steeds populair (begin 2024)." },
    { brand: "Volvo", model: "EX30", description: "Nieuw model, werd snel populair (EV)." }
  ]
};
