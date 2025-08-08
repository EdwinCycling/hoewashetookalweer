
// Data for Oscars by year.
// Format: "inleiding|besteFilm|beschrijvingBesteFilm"
// Using | as a separator for easier parsing.

export const OSCARS_RAW_DATA: Record<number, string> = {
  1934: "De 6e Academy Awards, gehouden op 16 maart 1934 in de Fiesta Room van het Ambassador Hotel in Los Angeles, eerden films uitgebracht tussen 1 augustus 1932 en 31 december 1933. Will Rogers presenteerde de ceremonie, die nog kleinschalig was met een focus op de filmindustrie van die tijd.|It Happened One Night|Een romantische komedie geregisseerd door Frank Capra, met Clark Gable en Claudette Colbert. Het verhaal volgt een verwende erfgename die wegrent en een journalist ontmoet, wat leidt tot een reeks humoristische avonturen. De film won alle vijf grote Oscars (Beste Film, Regisseur, Acteur, Actrice, Scenario), een primeur in de geschiedenis.",
  1935: "De 7e Academy Awards vonden plaats op 27 februari 1935 in het Biltmore Hotel in Los Angeles, met Irvin S. Cobb als gastheer. De ceremonie introduceerde strengere stemregels na controverses in voorgaande jaren.|Mutiny on the Bounty|Een historisch drama geregisseerd door Frank Lloyd, met Charles Laughton en Clark Gable. Gebaseerd op de echte muiterij op de HMS Bounty in 1789, volgt de film de strijd tussen de wrede kapitein Bligh en luitenant Fletcher Christian. De film won alleen Beste Film, ondanks acht nominaties.",
  
1936: "De 8e Academy Awards, gehouden op 5 maart 1936 in het Biltmore Hotel, werden gepresenteerd door Frank Capra. De ceremonie erkende de groeiende invloed van Hollywood-films.|The Great Ziegfeld|Een biografische musical geregisseerd door Robert Z. Leonard, met William Powell en Luise Rainer. De film vertelt het leven van impresario Florenz Ziegfeld, bekend van de Ziegfeld Follies, met weelderige producties. Het won drie Oscars, waaronder Beste Film en Beste Actrice.",

1937: "De 9e Academy Awards vonden plaats op 4 maart 1937 in het Biltmore Hotel, met George Jessel als gastheer. De ceremonie introduceerde de categorie Beste Mannelijke Bijrol.|The Life of Emile Zola|Een biografisch drama geregisseerd door William Dieterle, met Paul Muni. De film volgt het leven van de Franse schrijver Émile Zola en zijn rol in de Dreyfus-affaire. Het won drie Oscars, waaronder Beste Film en Beste Scenario.",

1938: "De 10e Academy Awards, gehouden op 10 maart 1938 in het Biltmore Hotel, werden gepresenteerd door Bob Burns. De ceremonie zag een toename in publieke belangstelling.|You Can't Take It with You|Een komedie geregisseerd door Frank Capra, met Jean Arthur en James Stewart. Gebaseerd op het gelijknamige toneelstuk, volgt de film een excentrieke familie die botst met een rijke bankier. Het won twee Oscars, waaronder Beste Film en Beste Regisseur.",

1939: "De 11e Academy Awards vonden plaats op 23 februari 1939 in het Biltmore Hotel, zonder officiële gastheer. De Los Angeles Times lekte de winnaars, wat leidde tot strengere geheimhouding in latere jaren.|Gone with the Wind|Een episch romantisch drama geregisseerd door Victor Fleming, met Vivien Leigh en Clark Gable. Gebaseerd op Margaret Mitchells roman, volgt de film Scarlett O’Hara tijdens de Amerikaanse Burgeroorlog. Het won acht Oscars, waaronder Beste Film en Beste Actrice.",

1940: "De 12e Academy Awards, gehouden op 29 februari 1940 in het Coconut Grove van het Ambassador Hotel, werden gepresenteerd door Bob Hope, die later een iconische Oscar-gastheer werd.|Rebecca|Een psychologische thriller geregisseerd door Alfred Hitchcock, met Laurence Olivier en Joan Fontaine. Gebaseerd op Daphne du Mauriers roman, volgt de film een jonge vrouw die worstelt met de erfenis van haar mans eerste vrouw. Het won twee Oscars, waaronder Beste Film.",

1941: "De 13e Academy Awards vonden plaats op 27 februari 1941 in het Biltmore Hotel, met Walter Wanger als gastheer. De ceremonie weerspiegelde de spanningen van de Tweede Wereldoorlog.|How Green Was My Valley|Een drama geregisseerd door John Ford, met Walter Pidgeon en Maureen O’Hara. Gebaseerd op Richard Llewellyns roman, volgt de film een Welshe mijnwerkersfamilie. Het won vijf Oscars, waaronder Beste Film, en versloeg Citizen Kane.",

1942: "De 14e Academy Awards, gehouden op 26 februari 1942 in het Biltmore Hotel, werden gepresenteerd door Bob Hope. De ceremonie vond plaats kort na Pearl Harbor, met een sobere toon.|Mrs. Miniver|Een oorlogsdrama geregisseerd door William Wyler, met Greer Garson en Walter Pidgeon. De film volgt een Britse familie tijdens de vroege jaren van de Tweede Wereldoorlog. Het won zes Oscars, waaronder Beste Film en Beste Actrice.",

1943: "De 15e Academy Awards vonden plaats op 4 maart 1943 in het Coconut Grove, met Bob Hope als gastheer. De ceremonie steunde de oorlogsinspanningen.|Casablanca|Een romantisch drama geregisseerd door Michael Curtiz, met Humphrey Bogart en Ingrid Bergman. Gezet in Marokko tijdens de Tweede Wereldoorlog, volgt de film een Amerikaanse expatriate die een oude liefde tegenkomt. Het won drie Oscars, waaronder Beste Film.",

1944: "De 16e Academy Awards, gehouden op 2 maart 1944 in Grauman’s Chinese Theatre, werden gepresenteerd door Jack Benny. Het was de eerste ceremonie in een grote zaal.|Going My Way|Een muzikale komedie geregisseerd door Leo McCarey, met Bing Crosby. De film volgt een jonge priester die een parochie nieuw leven inblaast. Het won zeven Oscars, waaronder Beste Film en Beste Acteur.",

1945: "De 17e Academy Awards vonden plaats op 15 maart 1945 in Grauman’s Chinese Theatre, met Bob Hope en John Cromwell als gastheren. De ceremonie weerspiegelde het einde van de oorlog.|The Lost Weekend|Een drama geregisseerd door Billy Wilder, met Ray Milland. De film volgt een alcoholistische schrijver tijdens een destructief weekend. Het won vier Oscars, waaronder Beste Film en Beste Acteur.",

1946: "De 18e Academy Awards, gehouden op 7 maart 1946 in Grauman’s Chinese Theatre, werden gepresenteerd door Bob Hope en James Stewart. De ceremonie vierde de wederopbouw na de oorlog.|The Best Years of Our Lives|Een drama geregisseerd door William Wyler, met Fredric March en Dana Andrews. De film volgt drie veteranen die terugkeren naar het burgerleven na de Tweede Wereldoorlog. Het won zeven Oscars, waaronder Beste Film.",

1947: "De 19e Academy Awards vonden plaats op 20 maart 1947 in het Shrine Auditorium, met Jack Benny als gastheer. De ceremonie markeerde een verschuiving naar grotere locaties.|Gentleman's Agreement|Een drama geregisseerd door Elia Kazan, met Gregory Peck. De film onderzoekt antisemitisme in Amerika via een journalist die zich voordoet als Jood. Het won drie Oscars, waaronder Beste Film.",

1948: "De 20e Academy Awards, gehouden op 20 maart 1948 in het Shrine Auditorium, werden gepresenteerd door Agnes Moorehead en Dick Powell. De ceremonie zag technische verbeteringen.|Hamlet|Een Shakespeare-verfilming geregisseerd door en met Laurence Olivier. De film brengt het klassieke verhaal van de Deense prins Hamlet tot leven. Het won vier Oscars, waaronder Beste Film en Beste Acteur.",

1949: "De 21e Academy Awards vonden plaats op 24 maart 1949 in het Academy Award Theater, met Robert Montgomery als gastheer. De ceremonie was compacter.|All the King's Men|Een politiek drama geregisseerd door Robert Rossen, met Broderick Crawford. Gebaseerd op Robert Penn Warrens roman, volgt de film de opkomst van een corrupte politicus. Het won drie Oscars, waaronder Beste Film.",

1950: "De 22e Academy Awards, gehouden op 23 maart 1950 in het RKO Pantages Theatre, werden gepresenteerd door Paul Douglas. De ceremonie erkende de naoorlogse filmindustrie.|All About Eve|Een drama geregisseerd door Joseph L. Mankiewicz, met Bette Davis en Anne Baxter. De film volgt een ambitieuze actrice die een Broadway-ster manipuleert. Het won zes Oscars, waaronder Beste Film.",

1951: "De 23e Academy Awards vonden plaats op 29 maart 1951 in het RKO Pantages Theatre, met Fred Astaire als gastheer. De ceremonie werd live uitgezonden op radio.|An American in Paris|Een muzikale romantische film geregisseerd door Vincente Minnelli, met Gene Kelly. De film volgt een Amerikaanse kunstenaar in Parijs die verliefd wordt. Het won zes Oscars, waaronder Beste Film.",

1952: "De 24e Academy Awards, gehouden op 20 maart 1952 in het RKO Pantages Theatre, werden gepresenteerd door Danny Kaye. De ceremonie trok meer publiek door televisie-uitzendingen.|The Greatest Show on Earth|Een drama geregisseerd door Cecil B. DeMille, met Charlton Heston. De film volgt het leven achter de schermen van een circus. Het won twee Oscars, waaronder Beste Film.",

1953: "De 25e Academy Awards vonden plaats op 19 maart 1953, simultaan in het RKO Pantages Theatre en het NBC International Theatre in New York, met Bob Hope en Conrad Nagel als gastheren. Het was de eerste televisie-uitzending.|From Here to Eternity|Een romantisch oorlogsdrama geregisseerd door Fred Zinnemann, met Burt Lancaster en Deborah Kerr. Gebaseerd op James Jones’ roman, volgt de film soldaten op Hawaï voor Pearl Harbor. Het won acht Oscars, waaronder Beste Film.",

1954: "De 26e Academy Awards, gehouden op 25 maart 1954 in het RKO Pantages Theatre en het NBC Century Theatre, werden gepresenteerd door Donald O’Connor en Fredric March. Walt Disney won vier Oscars.|On the Waterfront|Een drama geregisseerd door Elia Kazan, met Marlon Brando. De film volgt een havenarbeider die corruptie in zijn vakbond aanpakt. Het won acht Oscars, waaronder Beste Film en Beste Acteur.",

1955: "De 27e Academy Awards vonden plaats op 30 maart 1955 in het RKO Pantages Theatre en het NBC Century Theatre, met Bob Hope en Thelma Ritter als gastheren. De ceremonie groeide in populariteit.|Marty|Een romantisch drama geregisseerd door Delbert Mann, met Ernest Borgnine. Gebaseerd op een tv-toneelstuk, volgt de film een eenzame slager die liefde vindt. Het won vier Oscars, waaronder Beste Film.",

1956: "De 28e Academy Awards, gehouden op 21 maart 1956 in het RKO Pantages Theatre en het NBC Century Theatre, werden gepresenteerd door Jerry Lewis en Claudette Colbert. De ceremonie was kleurrijker op tv.|Around the World in Eighty Days|Een avonturenfilm geregisseerd door Michael Anderson, met David Niven. Gebaseerd op Jules Vernes roman, volgt de film een weddenschap om de wereld rond te reizen. Het won vijf Oscars, waaronder Beste Film.",

1957: "De 29e Academy Awards vonden plaats op 27 maart 1957 in het RKO Pantages Theatre, met Jerry Lewis en Celeste Holm als gastheren. De ceremonie erkende epische films.|The Bridge on the River Kwai|Een oorlogsdrama geregisseerd door David Lean, met Alec Guinness. Gezet in een Japans krijgsgevangenenkamp, volgt de film de bouw van een brug. Het won zeven Oscars, waaronder Beste Film.",

1958: "De 30e Academy Awards, gehouden op 26 maart 1958 in het RKO Pantages Theatre, werden gepresenteerd door Bob Hope, Rosalind Russell en anderen. De ceremonie was bruisend.|Gigi|Een muzikale romantische komedie geregisseerd door Vincente Minnelli, met Leslie Caron. Gebaseerd op Colette’s novelle, volgt de film een jonge vrouw in Parijs. Het won negen Oscars, waaronder Beste Film.",

1959: "De 31e Academy Awards vonden plaats op 6 april 1959 in het RKO Pantages Theatre, met Jerry Lewis, Mort Sahl en anderen als gastheren. Ben-Hur domineerde de avond.|Ben-Hur|Een historisch epos geregisseerd door William Wyler, met Charlton Heston. Gebaseerd op Lew Wallaces roman, volgt de film een Joodse prins in het Romeinse Rijk. Het won elf Oscars, waaronder Beste Film.",

1960: "De 32e Academy Awards, gehouden op 4 april 1960 in het RKO Pantages Theatre, werden gepresenteerd door Bob Hope. De ceremonie weerspiegelde de jaren 60-stijl.|The Apartment|Een romantische komedie-drama geregisseerd door Billy Wilder, met Jack Lemmon en Shirley MacLaine. De film volgt een kantoormedewerker die zijn appartement uitleent voor affaires. Het won vijf Oscars, waaronder Beste Film.",

1961: "De 33e Academy Awards vonden plaats op 17 april 1961 in het Santa Monica Civic Auditorium, met Bob Hope als gastheer. Musicals waren prominent aanwezig.|West Side Story|Een muzikale romantische tragedie geregisseerd door Robert Wise en Jerome Robbins, met Natalie Wood. Gebaseerd op Shakespeare’s Romeo en Julia, volgt de film rivaliserende bendes in New York. Het won tien Oscars, waaronder Beste Film.",

1962: "De 34e Academy Awards, gehouden op 9 april 1962 in het Santa Monica Civic Auditorium, werden gepresenteerd door Bob Hope. Epische films kregen aandacht.|Lawrence of Arabia|Een historisch epos geregisseerd door David Lean, met Peter O’Toole. Gebaseerd op T.E. Lawrence’s leven, volgt de film zijn rol in de Arabische Opstand. Het won zeven Oscars, waaronder Beste Film.",

1963: "De 35e Academy Awards vonden plaats op 8 april 1963 in het Santa Monica Civic Auditorium, met Frank Sinatra als gastheer. De ceremonie was internationaal gericht.|Tom Jones|Een komische avonturenfilm geregisseerd door Tony Richardson, met Albert Finney. Gebaseerd op Henry Fieldings roman, volgt de film een charmante schurk in de 18e eeuw. Het won vier Oscars, waaronder Beste Film.",

1964: "De 36e Academy Awards, gehouden op 13 april 1964 in het Santa Monica Civic Auditorium, werden gepresenteerd door Jack Lemmon. Musicals domineerden opnieuw.|My Fair Lady|Een muzikale romantische komedie geregisseerd door George Cukor, met Audrey Hepburn en Rex Harrison. Gebaseerd op Pygmalion, volgt de film een bloemenmeisje dat wordt getransformeerd. Het won acht Oscars, waaronder Beste Film.",

1965: "De 37e Academy Awards vonden plaats op 5 april 1965 in het Santa Monica Civic Auditorium, met Bob Hope als gastheer. De ceremonie trok miljoenen tv-kijkers.|The Sound of Music|Een muzikale drama geregisseerd door Robert Wise, met Julie Andrews. Gebaseerd op het leven van de familie Von Trapp, volgt de film een gouvernante in Oostenrijk. Het won vijf Oscars, waaronder Beste Film.",

1966: "De 38e Academy Awards, gehouden op 18 april 1966 in het Santa Monica Civic Auditorium, werden gepresenteerd door Bob Hope. Historische drama’s waren prominent.|A Man for All Seasons|Een historisch drama geregisseerd door Fred Zinnemann, met Paul Scofield. Gebaseerd op Robert Bolts toneelstuk, volgt de film Thomas More’s verzet tegen Hendrik VIII. Het won zes Oscars, waaronder Beste Film.",

1967: "De 39e Academy Awards vonden plaats op 10 april 1967 in het Santa Monica Civic Auditorium, met Bob Hope als gastheer. Sociale kwesties stonden centraal.|In the Heat of the Night|Een misdaaddrama geregisseerd door Norman Jewison, met Sidney Poitier en Rod Steiger. De film volgt een zwarte rechercheur die racisme trotseert in het Zuiden. Het won vijf Oscars, waaronder Beste Film.",

1968: "De 40e Academy Awards, gehouden op 10 april 1968 in het Santa Monica Civic Auditorium, werden gepresenteerd door Bob Hope. De ceremonie werd uitgesteld vanwege de moord op Martin Luther King Jr.|Oliver!|Een muzikale drama geregisseerd door Carol Reed, met Mark Lester. Gebaseerd op Dickens’ Oliver Twist, volgt de film een weesjongen in Londen. Het won vijf Oscars, waaronder Beste Film.",

1969: "De 41e Academy Awards vonden plaats op 14 april 1969 in het Dorothy Chandler Pavilion, met een groep presentatoren. De ceremonie weerspiegelde de culturele veranderingen van de jaren 60.|Midnight Cowboy|Een drama geregisseerd door John Schlesinger, met Dustin Hoffman en Jon Voight. De film volgt een naïeve hustler in New York. Het won drie Oscars, waaronder Beste Film, en was de eerste X-rated winnaar.",

1970: "De 42e Academy Awards, gehouden op 7 april 1970 in het Dorothy Chandler Pavilion, werden gepresenteerd door een groep sterren. Oorlogsfilms waren prominent.|Patton|Een biografisch oorlogsdrama geregisseerd door Franklin J. Schaffner, met George C. Scott. De film volgt generaal George S. Patton tijdens de Tweede Wereldoorlog. Het won zeven Oscars, waaronder Beste Film.",

1971: "De 43e Academy Awards vonden plaats op 15 april 1971 in het Dorothy Chandler Pavilion, met Bob Hope als gastheer. Misdaadfilms kregen aandacht.|The French Connection|Een misdaadthriller geregisseerd door William Friedkin, met Gene Hackman. De film volgt twee agenten die een drugsnetwerk ontmantelen. Het won vijf Oscars, waaronder Beste Film.",

1972: "De 44e Academy Awards, gehouden op 10 april 1972 in het Dorothy Chandler Pavilion, werden gepresenteerd door Helen Hayes en anderen. De ceremonie vierde epische verhalen.|The Godfather|Een misdaadepos geregisseerd door Francis Ford Coppola, met Marlon Brando en Al Pacino. Gebaseerd op Mario Puzo’s roman, volgt de film de maffiafamilie Corleone. Het won drie Oscars, waaronder Beste Film.",

1973: "De 45e Academy Awards vonden plaats op 27 maart 1973 in het Dorothy Chandler Pavilion, met Carol Burnett en anderen als gastheren. De ceremonie was politiek geladen.|The Sting|Een misdaadkomedie geregisseerd door George Roy Hill, met Paul Newman en Robert Redford. De film volgt twee oplichters in een ingewikkelde zwendel. Het won zeven Oscars, waaronder Beste Film.",

1974: "De 46e Academy Awards, gehouden op 2 april 1974 in het Dorothy Chandler Pavilion, werden gepresenteerd door John Huston en anderen. Sequels kregen erkenning.|The Godfather Part II|Een misdaadepos geregisseerd door Francis Ford Coppola, met Al Pacino en Robert De Niro. Het vervolg volgt de opkomst van Michael Corleone en Vito’s vroege leven. Het won zes Oscars, waaronder Beste Film.",

1975: "De 47e Academy Awards vonden plaats op 8 april 1975 in het Dorothy Chandler Pavilion, met Bob Hope en anderen als gastheren. De ceremonie vierde krachtige verhalen.|One Flew Over the Cuckoo's Nest|Een drama geregisseerd door Miloš Forman, met Jack Nicholson. Gebaseerd op Ken Kesey’s roman, volgt de film een rebel in een psychiatrische inrichting. Het won vijf Oscars, waaronder Beste Film.",

1976: "De 48e Academy Awards, gehouden op 29 maart 1976 in het Dorothy Chandler Pavilion, werden gepresenteerd door Walter Matthau en anderen. Sportfilms waren prominent.|Rocky|Een sportdrama geregisseerd door John G. Avildsen, met Sylvester Stallone. De film volgt een underdog-bokser die een kans krijgt op de wereldtitel. Het won drie Oscars, waaronder Beste Film.",

1977: "De 49e Academy Awards vonden plaats op 28 maart 1977 in het Dorothy Chandler Pavilion, met Richard Pryor en anderen als gastheren. Komedies kregen aandacht.|Annie Hall|Een romantische komedie geregisseerd door Woody Allen, met Woody Allen en Diane Keaton. De film volgt een neurotische komiek en zijn relatie. Het won vier Oscars, waaronder Beste Film.",

1978: "De 50e Academy Awards, gehouden op 3 april 1978 in het Dorothy Chandler Pavilion, werden gepresenteerd door Bob Hope. Oorlogsfilms waren prominent.|The Deer Hunter|Een oorlogsdrama geregisseerd door Michael Cimino, met Robert De Niro en Christopher Walken. De film volgt vrienden die worden getekend door de Vietnamoorlog. Het won vijf Oscars, waaronder Beste Film.",

1979: "De 51e Academy Awards vonden plaats op 9 april 1979 in het Dorothy Chandler Pavilion, met Johnny Carson als gastheer. Familiedrama’s stonden centraal.|Kramer vs. Kramer|Een drama geregisseerd door Robert Benton, met Dustin Hoffman en Meryl Streep. De film volgt een echtpaar in een scheiding en voogdijstrijd. Het won vijf Oscars, waaronder Beste Film.",

1980: "De 52e Academy Awards, gehouden op 14 april 1980 in het Dorothy Chandler Pavilion, werden gepresenteerd door Johnny Carson. Intieme drama’s kregen erkenning.|Ordinary People|Een drama geregisseerd door Robert Redford, met Donald Sutherland en Mary Tyler Moore. De film volgt een gezin dat worstelt met verdriet en trauma. Het won vier Oscars, waaronder Beste Film.",

1981: "De 53e Academy Awards vonden plaats op 31 maart 1981 in het Dorothy Chandler Pavilion, met Johnny Carson als gastheer. Historische drama’s waren prominent.|Chariots of Fire|Een historisch drama geregisseerd door Hugh Hudson, met Ben Cross en Ian Charleson. De film volgt twee Britse atleten op de Olympische Spelen van 1924. Het won vier Oscars, waaronder Beste Film.",

1982: "De 54e Academy Awards, gehouden op 29 maart 1982 in het Dorothy Chandler Pavilion, werden gepresenteerd door Johnny Carson. Epische verhalen domineerden.|Gandhi|Een biografisch drama geregisseerd door Richard Attenborough, met Ben Kingsley. De film volgt Mahatma Gandhi’s leven en strijd voor Indiase onafhankelijkheid. Het won acht Oscars, waaronder Beste Film.",

1983: "De 55e Academy Awards vonden plaats op 11 april 1983 in het Dorothy Chandler Pavilion, met Liza Minnelli en anderen als gastheren. Familiedrama’s kregen aandacht.|Terms of Endearment|Een drama geregisseerd door James L. Brooks, met Shirley MacLaine en Debra Winger. De film volgt de band tussen een moeder en dochter. Het won vijf Oscars, waaronder Beste Film.",

1984: "De 56e Academy Awards, gehouden op 9 april 1984 in het Dorothy Chandler Pavilion, werden gepresenteerd door Johnny Carson. Historische drama’s waren prominent.|Amadeus|Een biografisch drama geregisseerd door Miloš Forman, met F. Murray Abraham en Tom Hulce. De film volgt de rivaliteit tussen Mozart en Salieri. Het won acht Oscars, waaronder Beste Film.",

1985: "De 57e Academy Awards vonden plaats op 25 maart 1985 in het Dorothy Chandler Pavilion, met Jack Lemmon als gastheer. Romantische epen kregen erkenning.|Out of Africa|Een romantisch drama geregisseerd door Sydney Pollack, met Meryl Streep en Robert Redford. Gebaseerd op Isak Dinesens memoires, volgt de film een Deense barones in Kenia. Het won zeven Oscars, waaronder Beste Film.",

1986: "De 58e Academy Awards, gehouden op 24 maart 1986 in het Dorothy Chandler Pavilion, werden gepresenteerd door Alan Alda en anderen. Oorlogsfilms domineerden.|Platoon|Een oorlogsdrama geregisseerd door Oliver Stone, met Charlie Sheen en Willem Dafoe. De film volgt een jonge soldaat in de Vietnamoorlog. Het won vier Oscars, waaronder Beste Film.",

1987: "De 59e Academy Awards vonden plaats op 30 maart 1987 in het Dorothy Chandler Pavilion, met Chevy Chase en anderen als gastheren. Epische verhalen waren prominent.|The Last Emperor|Een biografisch drama geregisseerd door Bernardo Bertolucci, met John Lone. De film volgt het leven van Pu Yi, de laatste keizer van China. Het won negen Oscars, waaronder Beste Film.",

1988: "De 60e Academy Awards, gehouden op 11 april 1988 in het Shrine Auditorium, werden gepresenteerd door Chevy Chase. Drama’s met sociale thema’s kregen aandacht.|Rain Man|Een drama geregisseerd door Barry Levinson, met Dustin Hoffman en Tom Cruise. De film volgt een egoïstische man en zijn autistische broer op een roadtrip. Het won vier Oscars, waaronder Beste Film.",

1989: "De 61e Academy Awards vonden plaats op 29 maart 1989 in het Shrine Auditorium, zonder officiële gastheer na een controversiële opening. Intieme drama’s waren prominent.|Driving Miss Daisy|Een drama geregisseerd door Bruce Beresford, met Jessica Tandy en Morgan Freeman. De film volgt de vriendschap tussen een oudere vrouw en haar chauffeur. Het won vier Oscars, waaronder Beste Film.",

1990: "De 62e Academy Awards, gehouden op 26 maart 1990 in het Dorothy Chandler Pavilion, werden gepresenteerd door Billy Crystal. Epische westerns kregen erkenning.|Dances with Wolves|Een western-epos geregisseerd door Kevin Costner, met Kevin Costner en Mary McDonnell. De film volgt een soldaat die bevriend raakt met een Lakota-stam. Het won zeven Oscars, waaronder Beste Film.",

1991: "De 63e Academy Awards vonden plaats op 25 maart 1991 in het Shrine Auditorium, met Billy Crystal als gastheer. Thrillers domineerden de avond.|The Silence of the Lambs|Een psychologische thriller geregisseerd door Jonathan Demme, met Jodie Foster en Anthony Hopkins. De film volgt een FBI-agente die een seriemoordenaar opspoort. Het won vijf Oscars, waaronder Beste Film.",

1992: "De 64e Academy Awards, gehouden op 30 maart 1992 in het Dorothy Chandler Pavilion, werden gepresenteerd door Billy Crystal. Westerns maakten een comeback.|Unforgiven|Een revisionistische western geregisseerd door Clint Eastwood, met Clint Eastwood en Gene Hackman. De film volgt een gepensioneerde revolverheld die een laatste klus aanneemt. Het won vier Oscars, waaronder Beste Film.",

1993: "De 65e Academy Awards vonden plaats op 29 maart 1993 in het Dorothy Chandler Pavilion, met Billy Crystal als gastheer. Historische drama’s waren prominent.|Schindler's List|Een historisch drama geregisseerd door Steven Spielberg, met Liam Neeson en Ralph Fiennes. De film volgt Oskar Schindler, die Joden redt tijdens de Holocaust. Het won zeven Oscars, waaronder Beste Film.",

1994: "De 66e Academy Awards, gehouden op 21 maart 1994 in het Dorothy Chandler Pavilion, werden gepresenteerd door Whoopi Goldberg. Feelgood-verhalen domineerden.|Forrest Gump|Een romantisch drama geregisseerd door Robert Zemeckis, met Tom Hanks. De film volgt het bijzondere leven van een man met een lage intelligentie. Het won zes Oscars, waaronder Beste Film.",

1995: "De 67e Academy Awards vonden plaats op 27 maart 1995 in het Shrine Auditorium, met David Letterman als gastheer. Epische verhalen kregen aandacht.|Braveheart|Een historisch epos geregisseerd door Mel Gibson, met Mel Gibson. De film volgt William Wallace’s strijd voor Schotse vrijheid. Het won vijf Oscars, waaronder Beste Film.",

1996: "De 68e Academy Awards, gehouden op 25 maart 1996 in het Dorothy Chandler Pavilion, werden gepresenteerd door Whoopi Goldberg. Romantische epen waren prominent.|The English Patient|Een romantisch drama geregisseerd door Anthony Minghella, met Ralph Fiennes en Juliette Binoche. Gezet tijdens de Tweede Wereldoorlog, volgt de film een gewonde piloot. Het won negen Oscars, waaronder Beste Film.",

1997: "De 69e Academy Awards vonden plaats op 24 maart 1997 in het Shrine Auditorium, met Billy Crystal als gastheer. Blockbusters domineerden de avond.|Titanic|Een romantisch epos geregisseerd door James Cameron, met Leonardo DiCaprio en Kate Winslet. De film volgt een liefdesverhaal aan boord van de gedoemde Titanic. Het won elf Oscars, waaronder Beste Film.",

1998: "De 70e Academy Awards, gehouden op 23 maart 1998 in het Shrine Auditorium, werden gepresenteerd door Billy Crystal. Romantische drama’s waren prominent.|Shakespeare in Love|Een romantische komedie geregisseerd door John Madden, met Gwyneth Paltrow en Joseph Fiennes. De film volgt een fictieve romance met William Shakespeare. Het won zeven Oscars, waaronder Beste Film.",

1999: "De 71e Academy Awards vonden plaats op 21 maart 1999 in het Dorothy Chandler Pavilion, met Whoopi Goldberg als gastheer. Psychologische drama’s kregen aandacht.|American Beauty|Een drama geregisseerd door Sam Mendes, met Kevin Spacey en Annette Bening. De film volgt een man in een midlifecrisis in suburbia. Het won vijf Oscars, waaronder Beste Film.",

2000: "De 72e Academy Awards, gehouden op 26 maart 2000 in het Shrine Auditorium, werden gepresenteerd door Billy Crystal. Epische actiefilms domineerden.|Gladiator|Een historisch epos geregisseerd door Ridley Scott, met Russell Crowe. De film volgt een Romeinse generaal die wraak zoekt als gladiator. Het won vijf Oscars, waaronder Beste Film.",

2001: "De 73e Academy Awards vonden plaats op 25 maart 2001 in het Shrine Auditorium, met Steve Martin als gastheer. Biografische drama’s waren prominent.|A Beautiful Mind|Een biografisch drama geregisseerd door Ron Howard, met Russell Crowe. De film volgt wiskundige John Nash en zijn strijd met schizofrenie. Het won vier Oscars, waaronder Beste Film.",

2002: "De 74e Academy Awards, gehouden op 24 maart 2002 in het Kodak Theatre, werden gepresenteerd door Whoopi Goldberg. Musicals maakten een comeback.|Chicago|Een muzikale misdaadkomedie geregisseerd door Rob Marshall, met Renée Zellweger en Catherine Zeta-Jones. Gebaseerd op de gelijknamige musical, volgt de film showgirls in de jaren 20. Het won zes Oscars, waaronder Beste Film.",

2003: "De 75e Academy Awards vonden plaats op 23 maart 2003 in het Kodak Theatre, met Steve Martin als gastheer. Epische fantasy-films domineerden.|The Lord of the Rings: The Return of the King|Een fantasy-epos geregisseerd door Peter Jackson, met Elijah Wood en Ian McKellen. Het slot van de trilogie volgt de strijd tegen Sauron. Het won elf Oscars, waaronder Beste Film.",

2004: "De 76e Academy Awards, gehouden op 29 februari 2004 in het Kodak Theatre, werden gepresenteerd door Billy Crystal. Intieme drama’s kregen aandacht.|Million Dollar Baby|Een sportdrama geregisseerd door Clint Eastwood, met Hilary Swank en Morgan Freeman. De film volgt een vrouwelijke bokser en haar trainer. Het won vier Oscars, waaronder Beste Film.",

2005: "De 77e Academy Awards vonden plaats op 27 februari 2005 in het Kodak Theatre, met Chris Rock als gastheer. Sociale drama’s waren prominent.|Crash|Een drama geregisseerd door Paul Haggis, met Sandra Bullock en Don Cheadle. De film volgt botsende levens in het raciaal geladen Los Angeles. Het won drie Oscars, waaronder Beste Film.",

2006: "De 78e Academy Awards, gehouden op 5 maart 2006 in het Kodak Theatre, werden gepresenteerd door Jon Stewart. Misdaadfilms domineerden.|The Departed|Een misdaadthriller geregisseerd door Martin Scorsese, met Leonardo DiCaprio en Matt Damon. De film volgt een undercoveragent en een mol in Boston. Het won vier Oscars, waaronder Beste Film.",

2007: "De 79e Academy Awards vonden plaats op 25 februari 2007 in het Kodak Theatre, met Ellen DeGeneres als gastheer. Donkere drama’s waren prominent.|No Country for Old Men|Een misdaadthriller geregisseerd door de Coen Brothers, met Tommy Lee Jones en Javier Bardem. Gebaseerd op Cormac McCarthy’s roman, volgt de film een jacht op geld. Het won vier Oscars, waaronder Beste Film.",

2008: "De 80e Academy Awards, gehouden op 24 februari 2008 in het Kodak Theatre, werden gepresenteerd door Jon Stewart. Feelgood-verhalen kregen aandacht.|Slumdog Millionaire|Een drama geregisseerd door Danny Boyle, met Dev Patel. De film volgt een jongen uit de sloppen die meedoet aan een quizshow. Het won acht Oscars, waaronder Beste Film.",

2009: "De 81e Academy Awards vonden plaats op 22 februari 2009 in het Kodak Theatre, met Hugh Jackman als gastheer. Oorlogsdrama’s waren prominent.|The Hurt Locker|Een oorlogsdrama geregisseerd door Kathryn Bigelow, met Jeremy Renner. De film volgt een explosievenopruimingsteam in Irak. Het won zes Oscars, waaronder Beste Film.",

2010: "De 82e Academy Awards, gehouden op 7 maart 2010 in het Kodak Theatre, werden gepresenteerd door Steve Martin en Alec Baldwin. Historische drama’s domineerden.|The King's Speech|Een historisch drama geregisseerd door Tom Hooper, met Colin Firth. De film volgt koning George VI’s strijd met zijn stotteren. Het won vier Oscars, waaronder Beste Film.",

2011: "De 83e Academy Awards vonden plaats op 27 februari 2011 in het Kodak Theatre, met James Franco en Anne Hathaway als gastheren. Stomme films maakten een comeback.|The Artist|Een stomme romantische komedie geregisseerd door Michel Hazanavicius, met Jean Dujardin. De film volgt een acteur in de overgang naar geluidsfilms. Het won vijf Oscars, waaronder Beste Film.",

2012: "De 84e Academy Awards, gehouden op 26 februari 2012 in het Dolby Theatre, werden gepresenteerd door Billy Crystal. Politieke thrillers kregen aandacht.|Argo|Een politieke thriller geregisseerd door Ben Affleck, met Ben Affleck. Gebaseerd op een waargebeurd verhaal, volgt de film een CIA-operatie in Iran. Het won drie Oscars, waaronder Beste Film.",

2013: "De 85e Academy Awards vonden plaats op 24 februari 2013 in het Dolby Theatre, met Seth MacFarlane als gastheer. Historische drama’s waren prominent.|12 Years a Slave|Een historisch drama geregisseerd door Steve McQueen, met Chiwetel Ejiofor. Gebaseerd op Solomon Northup’s memoires, volgt de film een vrije man die wordt ontvoerd. Het won drie Oscars, waaronder Beste Film.",

2014: "De 86e Academy Awards, gehouden op 2 maart 2014 in het Dolby Theatre, werden gepresenteerd door Ellen DeGeneres. Experimentele films kregen erkenning.|Birdman|Een zwarte komedie geregisseerd door Alejandro G. Iñárritu, met Michael Keaton. De film volgt een acteur die een Broadway-comeback probeert. Het won vier Oscars, waaronder Beste Film.",

2015: "De 87e Academy Awards vonden plaats op 22 februari 2015 in het Dolby Theatre, met Neil Patrick Harris als gastheer. Journalistieke drama’s waren prominent.|Spotlight|Een drama geregisseerd door Tom McCarthy, met Mark Ruffalo en Rachel McAdams. De film volgt journalisten die misbruik in de kerk onderzoeken. Het won twee Oscars, waaronder Beste Film.",

2016: "De 88e Academy Awards, gehouden op 28 februari 2016 in het Dolby Theatre, werden gepresenteerd door Chris Rock. De ceremonie werd overschaduwd door #OscarsSoWhite.|Moonlight|Een drama geregisseerd door Barry Jenkins, met Mahershala Ali. De film volgt het leven van een jonge zwarte man in Miami. Het won drie Oscars, waaronder Beste Film, na een memorabele vergissing met La La Land.",

2017: "De 89e Academy Awards vonden plaats op 26 februari 2017 in het Dolby Theatre, met Jimmy Kimmel als gastheer. Fantasieverhalen domineerden.|The Shape of Water|Een romantische fantasy geregisseerd door Guillermo del Toro, met Sally Hawkins. De film volgt een stomme vrouw die verliefd wordt op een amfibisch wezen. Het won vier Oscars, waaronder Beste Film.",

2018: "De 90e Academy Awards, gehouden op 4 maart 2018 in het Dolby Theatre, werden gepresenteerd door Jimmy Kimmel. Drama’s met sociale thema’s waren prominent.|Green Book|Een biografisch drama geregisseerd door Peter Farrelly, met Viggo Mortensen en Mahershala Ali. De film volgt een pianist en zijn chauffeur in de jaren 60. Het won drie Oscars, waaronder Beste Film.",

2019: "De 91e Academy Awards vonden plaats op 24 februari 2019 in het Dolby Theatre, zonder officiële gastheer na controverse rond Kevin Hart. Internationale films kregen aandacht.|Parasite|Een zwarte komedie-thriller geregisseerd door Bong Joon-ho, met Song Kang-ho. De film volgt een arme familie die een rijke familie infiltreert. Het won vier Oscars, waaronder Beste Film, de eerste niet-Engelstalige winnaar.",

2020: "De 92e Academy Awards, gehouden op 9 februari 2020 in het Dolby Theatre, zonder officiële gastheer. De ceremonie werd beïnvloed door de vroege pandemie.|Nomadland|Een drama geregisseerd door Chloé Zhao, met Frances McDormand. De film volgt een vrouw die als nomade leeft na de economische crisis. Het won drie Oscars, waaronder Beste Film.",

2021: "De 93e Academy Awards, gehouden op 25 april 2021 in Union Station en het Dolby Theatre, zonder officiële gastheer vanwege de pandemie. De ceremonie was intiemer.|CODA|Een drama geregisseerd door Sian Heder, met Emilia Jones en Troy Kotsur. De film volgt een kind van dove ouders dat haar zangtalent ontdekt. Het won drie Oscars, waaronder Beste Film.",

2022: "De 94e Academy Awards vonden plaats op 27 maart 2022 in het Dolby Theatre, met Amy Schumer, Wanda Sykes en Regina Hall als gastheren. De ceremonie werd overschaduwd door de Will Smith-incident.|Everything Everywhere All at Once|Een sciencefiction-komedie geregisseerd door Daniel Kwan en Daniel Scheinert, met Michelle Yeoh. De film volgt een vrouw die het multiversum doorkruist. Het won zeven Oscars, waaronder Beste Film.",

2023: "De 95e Academy Awards, gehouden op 12 maart 2023 in het Dolby Theatre, werden gepresenteerd door Jimmy Kimmel. Wetenschappelijke drama’s waren prominent.|Oppenheimer|Een biografisch drama geregisseerd door Christopher Nolan, met Cillian Murphy. De film volgt J. Robert Oppenheimer en de ontwikkeling van de atoombom. Het won zeven Oscars, waaronder Beste Film.",

2024: "De 96e Academy Awards vonden plaats op 10 maart 2024 in het Dolby Theatre, met Jimmy Kimmel als gastheer. De ceremonie vierde een divers filmjaar.|Anora|Een komedie-drama geregisseerd door Sean Baker, met Mikey Madison. De film volgt een sekswerker in Brooklyn die trouwt met de zoon van een Russische oligarch. Het won vijf Oscars, waaronder Beste Film.",
  
  // Add more years here following the same format
  // Example:
  // 2023: "Inleiding voor Oscars 2023|Everything Everywhere All at Once|Beschrijving van Everything Everywhere All at Once..."
};

