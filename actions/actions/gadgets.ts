
'use server';

export interface GadgetData {
  year: number;
  description: string;
}

export interface FetchGadgetsResult {
  gadgets: GadgetData[] | null; // Array to hold one or more gadget entries for the year
  error?: string | null;
  debugInfo?: any;
}

// Data for gadgets by year.
// Add more years and descriptions here in the format:
// year: "Description for gadgets in that year."
const GADGETS_BY_YEAR_DATA: { [year: number]: string } = {
  1950: "Zenith Electronics introduceerde de eerste afstandsbedieningen, die met draden aan televisietoestellen waren verbonden",
1951: "Charles Ginsburg, een onderzoeker bij Ampex Corporation, vond de videorecorder uit, aldus Smithsonian",
1954: "De eerste transistorradio werd gemaakt door Texas Instruments en heette de Regency TR-1",
1955: "Tappan bracht de eerste magnetronoven uit die voor consumenten was ontworpen. Het maakte koken sneller en gemakkelijker dan ooit",
1956: "IBM bracht de eerste computerharde schijf uit die commercieel werd verkocht. Harde schijven slaan digitale gegevens op zoals documenten, computerprogramma's en applicaties",
1957: "De eerste op batterijen werkende, draagbare pacemaker werd aan consumenten verkocht. Het gebruikte een elektrische stroom om hartproblemen te helpen reguleren",
1958: "De eerste modem, een machine die gegevens kan vertalen, werd uitgebracht. Het bracht een revolutie teweeg in de communicatie en maakte de weg vrij voor het internet",
1959: "Interne pacemakers kwamen beschikbaar. Ze kunnen ernstigere hartaandoeningen behandelen dan externe pacemakers",
1960: "De draagbare televisie werd op de markt gebracht, waarmee kijkers overal televisie konden kijken. Ook populair was de Etch A Sketch, een eenvoudig tekenspeelgoed met een door een stylus te bekrassen aluminiumpoederlaag die met schudden te resetten was.",
1961: "Eerste accuboormachine - van Black & Decker, aangedreven door nikkel-cadmiumcellen, maakte het mogelijk overal te boren en doe-het-zelven gemakkelijker",
1962: "De eerste audiocassettebandjes (Philips) werden uitgebracht. Door hun kleine formaat waren ze een handige manier om naar vooraf opgenomen muziek te luisteren",
1963: "Easy-Bake Oven - een klassiek speelgoedoventje waarmee kinderen spelenderwijs konden leren bakken",
1964: "Bell Telephone's Picturephone werd tentoongesteld, waarmee men kon videobellen. Daarnaast werd de eerste computermuis (Douglas Engelbart) geïntroduceerd, met een houten omhulsel, die een primaire interface voor computers werd.",
1965: "Op batterijen werkende rookmelders (Pearsall & Peterson) werden uitgevonden voor eenvoudige installatie. Tevens werd de Polaroid Swinger, een populaire en betaalbare instantcamera, gelanceerd.",
1966: "Philips draagbare radio/cassetterecorder - de eerste combinatie van een draagbare radio en cassetterecorder, uitgebracht door Philips, en werd zeer populair",
1967: "Texas Instruments bracht de handrekenmachine uit die in een broekzak paste. Ook introduceerde Sony de ICR-100, een zeer kleine draagbare radio met IC en oplaadbare batterij.",
1968: "Random-access memory (RAM) werd uitgevonden, een belangrijke vooruitgang in computertechnologie. Daarnaast lanceerde Sony de populaire Trinitron TV-reeks met superieure beeldkwaliteit.",
1969: "De microcassette werd ontwikkeld door Olympus Corporation. Tevens werd de Motorola HT220, een populaire en draagbare walkie talkie, geïntroduceerd.",
1970: "De floppydisk werd gecrediteerd aan Yoshiro Nakamatsu (Dr. NakaMats). Daarnaast kwam de Canon Pocketronic zakrekenmachine op de markt, wat de weg baande voor bredere acceptatie.",
1971: "De keukenmachine werd uitgevonden door Pierre Verdon in Parijs. Ook kwamen de eerste draagbare cassettedecks op de markt, wat de populariteit van cassettes vergrootte.",
1972: "Videogame-ontwikkelaar Allan Alcorn creëerde Pong, dat werd uitgebracht door Atari en de basis legde voor de videogame-industrie",
1973: "Motorola bracht de eerste (zeer logge) mobiele telefoon uit. Dit was ook het jaar waarin de populariteit van digitale polshorloges begon.",
1974: "De barcodescanner werd voor het eerst gebruikt, wat wachttijden bij kassa's verkortte. Tevens groeide de populariteit van videocassetterecorders (VCR) door dalende prijzen en de opkomst van Betamax/VHS.",
1975: "Steven Sasson (Kodak) vond digitale fotografie uit en maakte de eerste digitale camera. Daarnaast werd de Altair 8800, gezien als de eerste thuiscomputer, gelanceerd.",
1976: "VHS (Video Home System) werd ontwikkeld door JVC, waardoor films thuis breed beschikbaar werden. Ook werd de magnetronoven betaalbaarder en populairder.",
1977: "Steve Wozniak en Steve Jobs vonden de Apple II uit, een vroege thuiscomputer. Ook werd de Atari 2600 gelanceerd, een iconische gameconsole die gaming populair maakte.",
1978: "LaserDisc werd gelanceerd als concurrent voor VHS en DVD. Tevens werd CB-Radio (27MC) enorm populair voor communicatie.",
1979: "De Walkman cassettespeler (Sony), gelanceerd in 1979 en uitgevonden door ontwerper Norio Ohga, was de eerste manier om onderweg privé naar muziek te luisteren",
1980: "Nintendo's Gunpei Yokoi ontwikkelde de Game & Watch handhelds. Daarnaast maakte de Epson MX-80 Dot Matrix printer precisieprinten toegankelijk voor de massa.",
1981: "De IBM Personal Computer zette een standaard voor pc's. Ook werd de Sinclair TV80, 's werelds eerste handheld tv, geïntroduceerd.",
1982: "De eerste CD-speler (Sony) kwam op de markt en veranderde de manier waarop mensen naar muziek luisterden, het begin van het einde voor cassettebandjes",
1983: "De Betamovie werd een van de eerste consumentencamcorders. Daarnaast kwam de Motorola DynaTAC 8000X, de eerste commerciële mobiele telefoon, op de markt.",
1984: "De Macintosh, ontwikkeld door Apple, werd gelanceerd als concurrentie voor de IBM Personal Computer, met een revolutionaire grafische interface",
1985: "Nintendo betrad de markt met het Nintendo Entertainment System (NES). Tevens lanceerde Microsoft Windows 1.0, een grafische interface voor pc's.",
1986: "De eerste wegwerpcamera werd geïntroduceerd in Japan. Ook werden pagers (semafoons) enorm populair voor het ontvangen van berichten.",
1987: "De eerste LCD-projector werd ontwikkeld. Daarnaast lanceerde Sony de populaire Sony Discman, een draagbare cd-speler.",
1988: "De Sega Genesis (Mega Drive) werd gelanceerd, wat de consoleoorlog intensiveerde. Tevens zette de populariteit van VHS-cassettes en videotheken exponentieel door.",
1989: "Nintendo ontwikkelde en bracht een van de bestverkochte videospelsystemen aller tijden uit: de Game Boy, die handheld gaming transformeerde",
1990: "De eerste commerciële versie van Adobe Photoshop revolutioneerde fotobewerking. Eind 1990 legden Tim Berners-Lee en collega's de basis voor het World Wide Web.",
1991: "De webcam werd per ongeluk ontwikkeld aan de Universiteit van Cambridge. Ook werd HP's ScanJet IIC kleurenscanner gelanceerd, die scannen op 800 dpi mogelijk maakte.",
1992: "De Philips Sonicare elektrische tandenborstel innoveerde mondverzorging. Daarnaast bracht de IBM ThinkPad laptop mobiel computergebruik naar de mainstream.",
1993: "De Apple Newton MessagePad, een vroege PDA (Personal Digital Assistant), ging in de verkoop en probeerde handschriftherkenning te populariseren",
1994: "De IBM Simon, vaak gezien als de eerste smartphone, werd uitgebracht. Tevens wonnen webcams aan populariteit en werden een standaard laptopfunctie.",
1995: "Nintendo's Virtual Boy was een vroege, onsuccesvolle VR-poging. Sony's PlayStation daarentegen, een 32-bit console, werd een gamechanger.",
1996: "De dvd-speler betrad de markt als uitdager van VHS. Ook de Motorola StarTAC fliptelefoon kreeg brede consumentenacceptatie.",
1997: "De Tamagotchi, een virtueel huisdier op een sleutelhanger gemaakt door Bandai, werd een wereldwijde rage",
1998: "De eerste MP3-spelers (zoals Diamond Rio PMP300) verschenen. Tegelijkertijd brak de dvd-speler definitief door, wat het einde van VHS inluidde.",
1999: "TiVo lanceerde zijn digitale videorecorder (DVR). Ook verscheen de eerste BlackBerry, aanvankelijk een pager met e-mail, die uitgroeide tot een populaire zakelijke smartphone.",
2000: "De eerste cameratelefoons verschenen op de markt. Daarnaast werden speciale GPS-navigatiesystemen voor consumenten populair.",
2001: "De eerste Apple iPod werd uitgebracht, een draagbare MP3-speler die de muziekconsumptie revolutioneerde met zijn opslagcapaciteit en gebruiksgemak",
2002: "De iRobot Roomba robotstofzuiger maakte zijn debuut. Ondertussen domineerde Microsoft's Internet Explorer de browsermarkt.",
2003: "VideoNow, een draagbare videospeler voor kinderen, werd gelanceerd. Ook won Apple's iTunes digitale muziekwinkel snel aan populariteit.",
2004: "Nintendo lanceerde de succesvolle Nintendo DS handheld. Tevens brak de Apple iPod definitief door naar het grote publiek.",
2005: "Microsoft's Xbox 360 kwam uit als populaire gameconsole. Ondertussen was Myspace de meest bezochte sociale netwerksite.",
2006: "De Nintendo Wii introduceerde bewegingsgevoelige besturing aan een breed publiek. Ook werd de eerste tweet verzonden en begon Twitter aan zijn opmars.",
2007: "De Apple iPhone werd geïntroduceerd, wat een revolutie teweegbracht in de mobiele telefoonindustrie met zijn touchscreen en app-ecosysteem",
2008: "De Apple App Store en iPhone 3G stimuleerden de populariteit van mobiele apps. Tevens markeerde de HTC Dream (T-Mobile G1) het begin van Android-smartphones.",
2009: "De Motorola Droid bood een sterk Android-alternatief voor de iPhone. Tegelijkertijd werd Facebook het nummer één sociale netwerk in de VS en introduceerde de 'like'-knop.",
2010: "De Apple iPad werd geïntroduceerd, waarmee de markt voor tabletcomputers werd gecreëerd en gepopulariseerd",
2011: "De vernieuwde MacBook Air zette de standaard voor ultradunne laptops. Ook begon de uitrol van 4G-netwerken voor sneller mobiel internet.",
2012: "De Raspberry Pi, een betaalbare minicomputer, werd gelanceerd. Instagram breidde uit naar Android, groeide enorm en werd overgenomen door Facebook.",
2013: "Google Chromecast bood een eenvoudige manier om media naar tv's te streamen. Daarnaast begon Google met de uitrol van supersnel Google Fiber-internet in de VS.",
2014: "Smartwatches, waaronder de eerste Android Wear-modellen en de Samsung Galaxy Gear, begonnen mainstream populariteit te winnen als verlengstuk van de smartphone.",
2015: "De Apple Watch werd gelanceerd en domineerde snel de smartwatchmarkt. Ook groeide de interesse in 3D-printen sterk door dalende prijzen en meer toegankelijkheid.",
2016: "Consumenten Virtual Reality-headsets (Oculus Rift, HTC Vive) kwamen op de markt, en slimme speakers zoals Amazon Echo (met Alexa) werden internationaal gelanceerd en steeds populairder.",
2017: "De Nintendo Switch, een succesvolle hybride gameconsole, werd gelanceerd. Tegelijkertijd werden VR-apparaten toegankelijker door dalende prijzen.",
2018: "Slimme speakers met schermen (zoals Google Home Hub) werden populairder. Ook werd de Huawei P20 Pro geprezen als een topcameratelefoon.",
2019: "De eerste opvouwbare smartphones (Samsung Galaxy Fold, Huawei Mate X) werden getoond. Daarnaast was de Nissan Leaf e+ een populaire elektrische auto.",
2020: "De Apple MacBook Air met M1-chip bracht significante prestatieverbeteringen. Ook nam door lockdowns de populariteit van thuisfitnessapparatuur, zoals Peloton, enorm toe.",
2021: "De opkomst van meer geavanceerde en toegankelijke tracking-gadgets zoals de Apple AirTag, die helpen bij het terugvinden van persoonlijke bezittingen",
2022: "De Apple Watch Ultra werd geïntroduceerd, een robuuste en geavanceerde smartwatch gericht op extreme sporten en outdooractiviteiten",
2023: "AI-gestuurde gadgets en software werden steeds prominenter, waaronder geavanceerde AI-thuisrobots en ultra-responsieve slimme brillen (AR-brillen) die meer immersieve ervaringen bieden",
2024: "De Apple Vision Pro werd gelanceerd (in de VS), een geavanceerde mixed reality-headset die de grenzen tussen de fysieke en digitale wereld verder vervaagt, en een blik werpt op de toekomst van 'spatial computing'",
};


/**
 * Fetches gadget data for a specific year from a predefined list.
 *
 * @param year The year to fetch gadget data for.
 * @returns An object containing an array of gadget data or an error message.
 */
export async function fetchGadgetsByYear(
  year: number
): Promise<FetchGadgetsResult> {
  console.log(`[fetchGadgetsByYear] Called for year: ${year}`);
  const currentYear = new Date().getFullYear(); // Used for generic error messages if year is out of a very broad range

  const description = GADGETS_BY_YEAR_DATA[year];

  if (description) {
    const gadgetData: GadgetData[] = [{ year, description }];
    console.log(`[fetchGadgetsByYear] Found gadget data for year ${year}.`);
    return { gadgets: gadgetData, error: null };
  } else {
    // If no specific data is found for the year in our predefined list
    const errorMsg = `Geen gadgetinformatie beschikbaar voor het jaar ${year} in de huidige datalijst.`;
    console.warn(`[WARN Gadgets] ${errorMsg}`);
    
    // Optional: A more generic message if the year is far out of expected range, though primary check is the data map
    // This check can be removed if GADGETS_BY_YEAR_DATA is the sole source of truth for available years.
    if (year < 1900 || year > currentYear + 5) { // Allow a bit into future for pre-data entry
        const rangeErrorMsg = `Het gekozen jaar ${year} valt buiten het typische bereik voor gadgetdata.`;
        console.warn(`[WARN Gadgets] ${rangeErrorMsg}`);
        // Return the more specific "not in list" error, or combine/replace if preferred
    }
    
    return { 
      gadgets: null, 
      error: errorMsg,
      debugInfo: {
          yearRequested: year,
          status: "NotFoundInPredefinedList",
          message: "Gadget data for this year is not in the predefined list."
      }
    };
  }
}

