export interface Game {
  positie: string;
  titel: string;
  datum_uitgifte: string;
  korte_omschrijving: string;
  score: string;
}

export const MIN_GAMES_YEAR = 1996;

export const GAMES_BY_YEAR: { [year: number]: Game[] } = {
  1996: [
    {
      positie: "1",
      titel: "Sid Meier's Civilization II",
      datum_uitgifte: "Feb 29, 1996",
      korte_omschrijving: "An empire-building turn-based strategy game. The game starts at the Old Stone Age in 4000 BC. Your tribe begins with a Settlers unit and has no knowledge about the surrounding area. As you found new cities and explore the surroundings, you may find hostile barbarians, villages, and other competing cultures. [Civ Fantatics' Center]",
      score: "94"
    },
    {
      positie: "2",
      titel: "Quake",
      datum_uitgifte: "Jun 22, 1996",
      korte_omschrijving: "Rage through 32 single player levels and 6 deathmatch levels of sheer terror and fully immersive sound and lighting. Arm yourself against the cannibalistic Ogre, fiendish Vore and indestructible Schambler using letal nails, fierce Thunderbolts and abominable Rocket and Grenade Launchers. [id Software]",
      score: "94"
    },
    {
      positie: "3",
      titel: "Diablo",
      datum_uitgifte: "Dec 31, 1996",
      korte_omschrijving: "The kingdom of Khandaras has fallen into chaos. An unknown force of evil has swept across the land. Plunging it nto civil war and terrorizing the populace. A mad king, his missing son, and a mysterious archbishop are all pieces to the puzzle that faces you. You have journeyed to the source of the evil. The town of Tristram. Now inhabited by only a handful of survivors. The catherdal there is buildt over the ruins of an ancient monastary, and now eerie lights and sounds are heard echoing through its abandoned halls. Perhaps the answer lies withing the remains of a forgotten past... Diablo invites you to enter a world of dark gothic fantasy. Play as a brave warrior, cunning rogue or mysterious sorceror. As you venture deeper into the labyrinth, you'll discover weapons, armor, and magical treasures, and develop your character's skills and abilities. [Blizzard]",
      score: "94"
    },
    {
      positie: "4",
      titel: "Wipeout XL",
      datum_uitgifte: "Sep 30, 1996",
      korte_omschrijving: "The game moves incredibly well, and looks fantastic in the process.",
      score: "93"
    },
    {
      positie: "5",
      titel: "Wave Race 64",
      datum_uitgifte: "Nov 1, 1996",
      korte_omschrijving: "Wave Race 64 is sure to provide some of the most exciting racing you've ever experienced. Feel the pounding and crashing of the waves as you accelerate into straight-aways, whip around the marker buoys and go airborne on the jump ramps. Don't race alone - challenge a friend! Take control in three different modes of play - Championship, Time Trials and Stunt Mode. Nine challenging courses set in exotic locales - race conditions change and the wave action responds to the way both you and your opponents race!",
      score: "92"
    },
    {
      positie: "6",
      titel: "Tomb Raider (1996)",
      datum_uitgifte: "Nov 15, 1996",
      korte_omschrijving: "Climb, swim, and backflip your way through a maze of cryptic deathtraps so realistic you can practically smell the decaying flesh. Unload an arsenal of lethal firepower on any wild-dog, giant lizard or blood-thirsty mercenary that gets in your way.\nYour mission is the deadliest one to date -- the recovery of the fabled Scion, an incredible treasure reputed to give its possessor vast power. Get ready to cross the globe to take on impossible odds while exploring Incan ruins, Ancient Rome, Egyptian Pyramids, and the Lost City of Atlantis...",
      score: "91"
    },
    {
      positie: "7",
      titel: "Resident Evil",
      datum_uitgifte: "Mar 30, 1996",
      korte_omschrijving: "Raccoon City has been completely overrun by mutant beasts and bloodthirsty zombies. You are a member of S.T.A.R.S.--a rescue squad sent into the community to investigate the ominous mansion at the core of the disaster. Take the role of operative Jill Valentine or Chris Redfield and uncover the secrets behind a radical, genetic research facility. With an array of weapons to master and horrors around every corner, the ultimate test may be just to make it out alive.",
      score: "91"
    },
    {
      positie: "8",
      titel: "Command & Conquer: Red Alert",
      datum_uitgifte: "Nov 22, 1996",
      korte_omschrijving: "Surrender is not an option. Dark experiments have permanently altered time. Or have they? Now, Soviet tanks crush city after city while Allied cruisers shell bases. Spies lurk, land mines wait, and strange new technologies aid both sides in their struggle for ultimate control.Command & Conquer: Red Alert gives you the opportunity to be more devious, cunning and ruthless than ever before. Easy to play and highly addictive, Red Alert puts the fate of the world in your hands! [Westwood]",
      score: "90"
    },
    {
      positie: "9",
      titel: "Tekken 2",
      datum_uitgifte: "Aug 25, 1996",
      korte_omschrijving: "More than a sequel. The undisputed #1 fighting game on the planet.",
      score: "89"
    },
    {
      positie: "10",
      titel: "Master of Orion II: Battle at Antares",
      datum_uitgifte: "Nov 22, 1996",
      korte_omschrijving: "Master the unknown before it masters you. The need for galactic expansion is critical. You must conquer alien star systems to secure the resources that will guarantee your supremacy. The ultimate goal is to defeat the evil Antarans.",
      score: "84"
    },
    {
      positie: "11",
      titel: "Pilotwings 64",
      datum_uitgifte: "Sep 29, 1996",
      korte_omschrijving: "Forget about those other flying games. This is the ultimate flight experience! Pilotwings 64 carries you off into a vast three-dimensional environment. Pilot several different vehicles and take in breathtaking sights! Successfully complete flight tests to earn your flight badge. Get a high enough score and you'll get a chance at bonus games such as Cannonball and Sky Diving! Soar into the wild blue yonder with Pilotwings 64!",
      score: "80"
    },
    {
      positie: "12",
      titel: "Time Commando",
      datum_uitgifte: "Jul 31, 1996",
      korte_omschrijving: "A deadly virus has invaded the military's top secret super computer. Its catastrophic time-warping effects now threaten to overtake the computer systems of the world. If you cannot restore core memory in time, the growing virus will cause the world's collapse. You must journey through the corridors of history to stop this technological demon. But vicious warriors await with lethal purpose. Instinct will be your only ally. All-out combat, your only choice. [Activision]",
      score: "80"
    },
    {
      positie: "13",
      titel: "Bad Mojo",
      datum_uitgifte: "Feb 29, 1996",
      korte_omschrijving: "Roger was about to do something bad. Unfortunately, he can't remember what it was because he has been transformed into a cockroach. In this Kafkaesque graphic adventure game, Roger (you) must scurry through the walls of a run down San Fransisco bar trying to restore his memory and his human form while avoiding spiders, a roach eating cat, and other creatures that live in the bar.",
      score: "74"
    },
    {
      positie: "14",
      titel: "Harvester",
      datum_uitgifte: "Oct 1, 1996",
      korte_omschrijving: "You wake up one morning to a town full of strangers and inexplicable sights. You share your home with your not so perfect family and your supposed fiance lives next door. The you are plunged into a nightmare. Your fiancee is missing and you find a hideous bloody skull and spinal chord drapped across her bed! Is it hers? What is going on? The only clue left behind is an engraved MOON\", a mysterious organisation that controls the town in ways you don't (or can't) understand. Is the order behind this gruesome execution? What invitation to enter, \"THE ORDER OF THE HARVEST are their motives? One thing is certain. You're going to get to the bottom of this killing or die trying. [Merit]",
      score: "53"
    }
  ],
  1997: [
    {
      positie: "1",
      titel: "GoldenEye 007",
      datum_uitgifte: "Aug 25, 1997",
      korte_omschrijving: "You are Bond. James Bond. You are assigned covert operations connected with the GoldenEye weapons satellite. M will brief you on your mission and objectives from London. Q Branch will support your efforts with a plentiful supply of weapons and gadgets. Moneypenny offers you light-hearted best wishes and you're off! Your mission begins in the heavily guarded chemical warfare facility at the Byelomorye Dam in the USSR. Look and shoot in any direction as you navigate 12 interactive 3-D environments. Use stealth and force as you see fit in matters of international security. Consider the military personnel expendable. You are licensed to kill!",
      score: "96"
    },
    {
      positie: "2",
      titel: "Sid Meier's Gettysburg!",
      datum_uitgifte: "Sep 30, 1997",
      korte_omschrijving: "Experience victory in Sid Meier's Gettysburg! It's the most engrossing and sophisticated real-time strategy game ever. In a stunning 3D battlefield, you plan the tactics, lead the troops, and take history into your own hands. Attack from the trees to protect your brigade,rally around a General for a quicker recovery, entrench your troops as your cannons blast the hillside, and much, much more with just a click of the mouse! Complete multiplayer support via internet, LAN, modem and serial link. [Firaxis]",
      score: "92"
    },
    {
      positie: "3",
      titel: "Final Fantasy VII",
      datum_uitgifte: "Sep 7, 1997",
      korte_omschrijving: "An evil and powerful corporation is slowly draining life from the planet in an effort to control the universe. However, a small rebellion, known as AVALANCHE, has vowed to put an end to this destructive plan.\n\nYou take on the role of Cloud Strife, an ex-soldier of the evil Shinra corporation, who joins AVALANCHE as a selfish mercenary, but becomes much more involved in this mysterious epic of friendship, love, and the battle between good and evil.",
      score: "92"
    },
    {
      positie: "4",
      titel: "Myth: The Fallen Lords",
      datum_uitgifte: "Oct 31, 1997",
      korte_omschrijving: "Myth is arguably the first real-time strategy game to put the player in a true 3D landscape, with an emphasis on tactical battlefield action rather than base construction. Myth also happens to be one of Bungie's most successful pre-Halo releases, and shows off the company's range and ability in genres outside of first-person shooters. A single player mode features an engrossing and enjoyable plot, with you battling the evil and eponymous Fallen Lords, their evil leader, Balor and all manner of undead creatures, but Myth's multiplayer is where it really stands out. Bungie.net's game-matching technology has been much-emulated since, and at Myth's release, was something truly special. Multiple game modes including King of the Hill, Steal the Bacon and even co-op added huge variety to what was an outstanding and standard-setting game - and it still is. If ever an older game deserved another visit, it's Myth, with a huge, loyal and highly motivated following. [Bungie]",
      score: "91"
    },
    {
      positie: "5",
      titel: "Colony Wars",
      datum_uitgifte: "Nov 4, 1997",
      korte_omschrijving: "Delivers the real experience with its spectacular cinematic graphics.",
      score: "91"
    },
    {
      positie: "6",
      titel: "Star Wars Jedi Knight: Dark Forces II",
      datum_uitgifte: "Oct 9, 1997",
      korte_omschrijving: "In Dark Forces, Kyle Katarn, a young mercenary successfully infiltrated the Empire. Jedi Knight continues the story of Katarn as he embarks on a quest into his past and learns the mysterious ways of the Jedi. With this knowledge, he must stop seven Dark Jedi from unlocking the powers of a hidden Jedi burial ground. This task forces Katarn to decide his destiny. If he chooses the Dark side, he will come into enormous power. If he chooses the Light side, he faces seemingly insurmountable evil. Whatever path Katarn chooses will change the face of the galaxy forever. [LucasArts]",
      score: "91"
    },
    {
      positie: "7",
      titel: "Blast Corps",
      datum_uitgifte: "Feb 28, 1997",
      korte_omschrijving: "A pair of defective nuclear missiles, en route to a safe detonation site, has begun to leak. Badly damaged, the carrier automatically locks onto the most direct route. Clear a path to help the carrier arrive safely. Tons of vehicles are at your disposal. Leave nothing standing or the adventure will end in an earth-shattering explosion! Find the hidden technicians to ensure a safe detonation. Strap on your seat belt, it's going to be a bumpy ride.",
      score: "90"
    },
    {
      positie: "8",
      titel: "Fallout",
      datum_uitgifte: "Oct 9, 1997",
      korte_omschrijving: "Set in the aftermath of a world-wide nuclear war, Fallout will challenge you to survive in an unknown and dangerous world. You will take the role of a Vault-dweller, a person who has grown up in a secluded, underground survival Vault. Circumstances arise that force you to go Outside -- to a strange world 80 years after the end of the modern civilization. A world of mutants, radiation, gangs and violence. Your immediate task is to find a replacement for the broken water purification controller chip. Without that chip, your fellow Vault dwellers are doomed to dehydration or be forced to leave the safety of the Vault for the Outside. [Interplay]",
      score: "89"
    },
    {
      positie: "9",
      titel: "The Curse of Monkey Island",
      datum_uitgifte: "Oct 31, 1997",
      korte_omschrijving: "Quick - what has dozens of monkeys, ghost pirates galore and more insults than a cranky parrot? Why, The Curse of Monkey Island, of course! In this highly anticipated third installment to LucasArts' popular Monkey Island series of graphic adventures, Guybrush Threepwood once again takes up dull blade and rapier wit against the nefarious demon-pirate LeChuck. In Curse, Guybrush must save his one true love, Elaine Marley, from being turned into the evil pirate's zombie bride. But, hoping to marry Elaine himself, Guybrush unknowingly slips a cursed ring onto her finger that transforms her into a gold statue. He must then find a way to change Elaine back to her beautiful self and stop LeChuck from carrying out his sinister plans. Aye, 'tis a rollicking piratey adventure that's sure to challenge the mind and shiver a few timbers! [LucasArts]",
      score: "89"
    },
    {
      positie: "10",
      titel: "Soul Edge",
      datum_uitgifte: "Jan 15, 1997",
      korte_omschrijving: "What's next in fighting? How about a game that melds 3D movement, polygon characters, razor sharp graphics, awe-inspiring moves and a one-of-a-kind combat system? Or, in short, Soul Blade - arguably the most innovative fighting game on the planet. It's the 15th century and ten warriors from around the world, each wielding their weapon of choice, are in bloody pursuit of Soul Edge - the ultimate weapon. Sure, only one will find it. But it looks like the critics already have found it. Game Players magazine voted Soul Blade &quot;Best Game of Show&quot; at AMMO, and NEXT Generation calls Soul Blade &quot;the most complete fighting game to date.&quot; Obviously, a cut above.",
      score: "89"
    },
    {
      positie: "11",
      titel: "Star Fox 64",
      datum_uitgifte: "Jul 1, 1997",
      korte_omschrijving: "The Lylat system has been invaded! Join Fox McCloud and his Star Fox team as they fight to save the galaxy from the clutches of the evil Andross. Travel to many different 3-D worlds. Battle the enemy in the air and on the ground and listen in as Fox McCloud interacts with a cast of characters.",
      score: "88"
    },
    {
      positie: "12",
      titel: "Diddy Kong Racing",
      datum_uitgifte: "Nov 24, 1997",
      korte_omschrijving: "Timber the Tiger's parents picked a fine time to go on vacation. When they come back, they're going to be faced with an island trashed by the spiteful space bully Wizpig - unless the local animals can do something about it! So join Diddy Kong as he teams up with Timber the Tiger, Pipsy the Mouse and Taj the Genie in an epic racing adventure unlike anything you've ever experienced before!",
      score: "88"
    },
    {
      positie: "13",
      titel: "Total Annihilation",
      datum_uitgifte: "Sep 27, 1997",
      korte_omschrijving: "Long ago, the galaxy had known peace. Paradise was ruled with the hand of science, and the hand was that of the galactic governing body known as the Core. Ironically, it was the Core's ultimate victory, the victory over death itself, that brought about the downfall of its paradise and started the war that would decimate a million worlds. The immortality process, known as \"patterning,\" involved the electronic duplication of brain matrices, allowing the transfer of consciousness into durable machines. Effectively it meant immortality, and the Core decreed the process mandatory for all citizens in order to ensure their safety. However, there were many citizens unwilling to toss aside their bodies so casually, many indeed who regarded patterning as an atrocity. They fled to the outer edges of the galaxy, forming a resistance movement that became known as the Arm. War began, though it was never officially declared by either side. The Arm developed high-powered combat suits for its armies, while the Core transferred the minds of its soldiers directly into similarly deadly machines. The Core duplicated its finest warriors thousands of times over. The Arm countered with a massive cloning program. The war raged on for more than 4,000 years, consuming the resources of an entire galaxy and leaving it a scorched wasteland. [Cavedog Entertainment]",
      score: "86"
    },
    {
      positie: "14",
      titel: "Oddworld: Abe's Oddysee",
      datum_uitgifte: "Sep 18, 1997",
      korte_omschrijving: "Selected by the fickle finger of fate, Abe&trade;, floor-waxer first class for RuptureFarms, was catapulted into a life of adventure when he overheard plans by his boss, Molluck the Glukkon&trade;, to turn Abe and his fellow Mudokons into Tasty Treats as part of a last-ditch effort to rescue Molluck's failing meat-packing empire.\nDuring his escape from RuptureFarms, Abe received a vision from the mysterious Big Face, showing Abe that he must not only rescue his fellow Mudokons, but also protect all of Oddworld's creatures from the predatory Magog Cartel.\nAfter completing arduous Temple trials, and journeying across a wasteland with his friend Elum, Abe was granted the awesome power of the Shrykull. Returning to RuptureFarms, Abe destroyed the foul slaughterhouse, rescued his buddies, and brought down some righteous lightning on top of Molluck's pointy head.",
      score: "85"
    },
    {
      positie: "15",
      titel: "Tomb Raider II",
      datum_uitgifte: "Nov 21, 1997",
      korte_omschrijving: "The unstoppable Lara Croft is back in TRII, complete with the classic gameplay that made Tomb Raider the game of the year!\nJoin Lara in her quest for the Dagger of Xian, reputed to possess the power of the dragon. But beware, Lara is not the only one in search of danger! Warrior Monks and crazed cult members plot against you as you travel from the remote mountain peaks of Tibet, the canals of Venice and even to the bottom of the sea.",
      score: "85"
    },
    {
      positie: "16",
      titel: "Turok: Dinosaur Hunter",
      datum_uitgifte: "Mar 4, 1997",
      korte_omschrijving: "Playing this violent masterpiece - with its flashy arsenal of weapons and lifelike cretins - is a technically arresting adventure.",
      score: "85"
    },
    {
      positie: "17",
      titel: "Obsidian",
      datum_uitgifte: "Jan 10, 1997",
      korte_omschrijving: "You, as biochemical engineer Lilah Kerlin, and your partner Max Powers, an environmental engineer, have created the Ceres Project -- an orbiting satellite that releases nanobots into the atmosphere designed to restore the ozone layer and eliminate atmospheric pollution, which has reached a crisis point in the year 2066. After successfully engineering and launching Ceres, the project is left to operate under its own control. With the job complete Lilah and Max decide to go on a long overdue vacation. However, while vacationing they discover a strange black, crystalline growth that is becoming larger every day ? and somehow it seems to be eerily linked to the Ceres Project. [AdventureGamers.com]",
      score: "85"
    },
    {
      positie: "18",
      titel: "Bushido Blade",
      datum_uitgifte: "Sep 30, 1997",
      korte_omschrijving: "&quot;Bushido&quot; is the soul of Japan - an ancient honor code deeply followed by samurai warriors for centuries.\nPlunge into real world battles across vast 3D environments that you can run, slice and tear through.\nSword matches become unbelievably real where one critical blow is the mean difference between death and victory.",
      score: "83"
    },
    {
      positie: "19",
      titel: "Riven: The Sequel to Myst",
      datum_uitgifte: "Oct 31, 1997",
      korte_omschrijving: "Enter a deceptively beautiful world torn apart by age-old conflicts...where secrets lie hidden at every turn...and nothing is as it seems. You must search. You must explore. You must summon every spark of intellect and intuition. Only then will you learn the truth and this troubled land and its inhabitants. You must let Riven become your world - before an entire world is lost. [Red Orb]",
      score: "83"
    },
    {
      positie: "20",
      titel: "Age of Empires",
      datum_uitgifte: "Sep 30, 1997",
      korte_omschrijving: "Age of Empires is an epic real-time strategy game spanning 10,000 years, in which players are the guiding spirit in the evolution of small stone age tribes. Starting with minimal resources, players are challenged to build their tribes into great civilizations. Gamers can choose from one of several ways to win the game, including: world domination by conquering enemy civilizations, exploration of the known world and economic victory through the accumulation of wealth. Age of Empires was developed by Ensemble Studios and features the expertise of Bruce Shelley, co-designer of the hit strategy game \"Civilization.\" [Microsoft]",
      score: "83"
    },
    {
      positie: "21",
      titel: "Ace Combat 2",
      datum_uitgifte: "Jul 31, 1997",
      korte_omschrijving: "We've devised a weapon that's deadlier than a smart bomb. It's called a smart pilot. Now, Ace Combat 2 pits you against a whole squadron of them - 3-D polygonal jet jocks that maneuver like the real deal, turning every scorching sortie and dogfight into a kill-or-be-killed situation. With nearly double the missions of its predecessor, you'll double your chances of taking out the enemy. (Or taking a heat-seeker up the exhaust.)",
      score: "83"
    },
    {
      positie: "22",
      titel: "Mario Kart 64",
      datum_uitgifte: "Feb 10, 1997",
      korte_omschrijving: "Three... Two... One... GO! The signal light changes and you drop the pedal to the metal. Take on up to three friends in the split-screen VS games, or race solo in the Mario GP. Tell your friends to bring it on in the highly competitive Battle mode. Advanced features allow you to race with your &quot;Ghost&quot;. The driving data from your best run appears as a transparent character on the screen. No longer must you simply race against the clock - you can actually race against yourself!",
      score: "83"
    },
    {
      positie: "23",
      titel: "Extreme-G",
      datum_uitgifte: "Sep 30, 1997",
      korte_omschrijving: "Pit yourself against 12 laser-blasting speedfreaks across 12 looping, coiling, corkscrewing rollercoaster racetracks. If you've never seen a cyber-cycle take a stinger missile up the tailpipe during a blistering halfpipe you're about to get a rush of adrenaline. Racing to the Nth degree through gravitational extremes. Surfing the knife edge between G-force and burning wreckage! If gravity's a law, then this is a felony.",
      score: "82"
    },
    {
      positie: "24",
      titel: "Blood (1997)",
      datum_uitgifte: "Mar 7, 1997",
      korte_omschrijving: "You'll battle cultists, gargoyles, zombies, hellhounds, and an unholy host of other terrors in your quest to stop Tchernobog. You must not only defeat the Cabal--you must scour its dread name from human memory. If that means eradicating everyone and everything the Cabal has ever tainted, so be it. Of course, you'll first have to make your way through fortresses, castles, mines, mansions, and estates guarded and kept by Tchernobog's malevolent servants. Fortunately, it is wits that make the hero, and although you're in serious danger of losing yours, you've got enough left to improvise some pretty effective tools of destruction. Aerosol hairspray can be frightening enough on its own, but apply it to a lighter flame and you've got an instant flamethrower (kids, don't try this at home!). Likewise, a flare gun can brighten your prospects considerably against even the grimmest odds, which is to say nothing for shotguns, Tommy guns, and dynamite. Who knows, you may even find that there are some spirits on your side when you find yourself clutching a voodoo doll. [Monolith]",
      score: "82"
    }
  ],
  1998: [
    {
      positie: "1",
      titel: "The Legend of Zelda: Ocarina of Time",
      datum_uitgifte: "Nov 23, 1998",
      korte_omschrijving: "As a young boy, Link is tricked by Ganondorf, the King of the Gerudo Thieves. The evil human uses Link to gain access to the Sacred Realm, where he places his tainted hands on Triforce and transforms the beautiful Hyrulean landscape into a barren wasteland. Link is determined to fix the problems he helped to create, so with the help of Rauru he travels through time gathering the powers of the Seven Sages.",
      score: "99"
    },
    {
      positie: "2",
      titel: "Tekken 3",
      datum_uitgifte: "Apr 29, 1998",
      korte_omschrijving: "An ancient evil force has reawakened, attacking in secret and feeding on the souls of mighty warriors. To lure it out of hiding will take the greatest fighting contest the world has ever seen...Tekken 3. Some are fighting for revenge, some for honor, Ultimately, all are fighting for their lives and the fate of all mankind.",
      score: "96"
    },
    {
      positie: "3",
      titel: "Half-Life",
      datum_uitgifte: "Nov 19, 1998",
      korte_omschrijving: "Half-Life combines great storytelling in the tradition of Stephen King with intense action and advanced technology to create a frighteningly realistic world where players need to think smart to survive. Half-Life has won more than 50 Game of the Year awards from publications around the world, and was named 'Best PC Game Ever' in PC Gamer's November 1999 issue. [Sierra]",
      score: "96"
    },
    {
      positie: "4",
      titel: "Gran Turismo",
      datum_uitgifte: "May 12, 1998",
      korte_omschrijving: "With authentic cars, courses, and car physics, Gran Turismo 4 adds an even more realistic racing simulation to the series. The characteristics of each car take into account weight, speed, friction, and more to deliver realistic handling. Test-drive new vehicles in courses located in various sites, such as Nurburgring Nordschleife, New York City, the Grand Canyon, and Tsukuba Circuit. The PSP version of Gran Turismo 4 lets you race against your friends via wireless network.",
      score: "96"
    },
    {
      positie: "5",
      titel: "Grim Fandango",
      datum_uitgifte: "Oct 14, 1998",
      korte_omschrijving: "Something's rotten in the Land of Dead and you're being played for a sucker.  Meet Manny Calavera, travel agent at the Department of Death. He sells luxury packages to souls on their four-year journey to eternal rest. But there's trouble in paradise.  Help Manny untangle himself from a conspiracy that threatens his very salvation. [LucasArts]",
      score: "94"
    },
    {
      positie: "6",
      titel: "Metal Gear Solid",
      datum_uitgifte: "Oct 21, 1998",
      korte_omschrijving: "You are Snake, a government agent on a mission to regain control of a secret nuclear weapons base from terrorist hands. Lightly armed and facing an army of foes, Snake must avoid firefights in order to survive. If Snake can locate them he can utilize advanced hardware, ranging from silenced pistols to ground-to-air missiles. Enemies react to sight and sound - so stay quiet and stay in the shadows. State-of-the-art graphics: textures, transparencies, models and explosions. Taut, gripping story with multiple endings - a truly cinematic experience.",
      score: "94"
    },
    {
      positie: "7",
      titel: "Banjo-Kazooie",
      datum_uitgifte: "Jun 29, 1998",
      korte_omschrijving: "[Xbox Live Arcade]  The classic Nintendo platformer stars a big, goofy honey bear named Banjo who wears tight yellow shorts and carries around a raucous, red-crested breegull named Tooie in his backpack. The bear-and-bird duo must use constant teamwork to rescue Banjo's sister from the evil Gruntilda who wants to steal her beauty.",
      score: "92"
    },
    {
      positie: "8",
      titel: "Thief: The Dark Project",
      datum_uitgifte: "Nov 30, 1998",
      korte_omschrijving: "Sneak through the shadows of 12 treacherous missions including haunted cathedrals, subterranean ruins, and forbidding prisons, in a dark and sinister city. Stalk your prey on the quest for stolen goods with your blackjack, sword and an assortment of unique arrows. Steal for money and uncover the hidden agendas of your allies and enemies as you play through an unravelling story of deception and revenge. Survive in a world where shadows are your only ally, trust is not an option, and confrontation results in death! [Eidos Interactive]",
      score: "92"
    },
    {
      positie: "9",
      titel: "Baldur's Gate",
      datum_uitgifte: "Dec 21, 1998",
      korte_omschrijving: "Baldur's Gate takes you back to the Forgotten Realms on a visually dazzling role-playing adventure, one that brings to life the grand tradition of Advanced Dungeons & Dragons through cutting edge art and technology. Immerse yourself in this quintessential medieval fantasy world, where entire nations hang in the balance of your actions, dark prophecies test your resolve, and heroic dreams can be fulfilled at last. [Interplay]",
      score: "91"
    },
    {
      positie: "10",
      titel: "Crash Bandicoot: Warped",
      datum_uitgifte: "Nov 3, 1998",
      korte_omschrijving: "This time the game takes place across a great expanse of time and space, making for greatly diverse level designs, which in turn keep the game fresh.",
      score: "91"
    },
    {
      positie: "11",
      titel: "Einhander",
      datum_uitgifte: "May 5, 1998",
      korte_omschrijving: "Pilot the most technologically advanced shooter ever created. You're a suicide pilot up against Earth's final assault. Cut through hordes of enemy fighters and battle the most monstrous bosses ever designed. Pilot fully loaded tactical fighters. Modify speed and agility on the fly. Single, double, and triple gunpod designs. Extendible claw for stealing enemy weapons. Armed for gatling guns, homing missiles, cannons, and more. Two bonus fighters earned through meritorious battle.",
      score: "89"
    },
    {
      positie: "12",
      titel: "Railroad Tycoon II",
      datum_uitgifte: "Nov 2, 1998",
      korte_omschrijving: "Ride the Iron Horse. It can take you from New York to South Africa. It can take you from the year 1804 to the year 2000. It can take you from penniless manual laborer to powerful multi-millionaire. It can take you from a normal, well-adjusted, well-rounded person to an obsessed, singled-minded, one-tracked trainhead. This is a real railroad game, not just a strategy game that happens to involve railroads. If you want to hop on a plane, car or ship, hop on another game. This game is about trains for people who love trains. Everything about the game is centered around an authentic look and feeling of the railways. Period video and pictures are interlaced with the game. The design and interface are true to the character of the fabled late 1800's railroads. A.I. opponents are based on real people. And all maps are real (based on satellite photography from US Geological Service and other sources). [Gathering of Developers]",
      score: "89"
    },
    {
      positie: "13",
      titel: "Starcraft",
      datum_uitgifte: "Mar 31, 1998",
      korte_omschrijving: "In the distant future a small group of human exiles have been doomed to fight for survival on the edge of the galaxy. Through military strength, espionage and deceit, a unified Terran government has maintained an uneasy peace. As resources run short, however, these Confederate nations find themselves looking towards the rich worlds of their alien neighbors, the enigmatic Protoss. To further complicate matters, it seems that a previously unknown and deadly species known only as the Zerg has entered Protoss space and is destroying everything in its path. The time for war has come... As the military leader for your species, you must gather the resources you need to train and expand your forces and lead them to victory. 30 unique missions will challenge you across three different campaigns as you control the fate of the galaxy.",
      score: "88"
    },
    {
      positie: "14",
      titel: "Myth II: Soulblighter",
      datum_uitgifte: "Nov 30, 1998",
      korte_omschrijving: "Building on the excellent plot and gameplay featured in Myth: The Fallen Lords, Myth II: Soulblighter also upped the ante by incorporating destructible environments as well as new game modes. The near-infinite gameplay permutations that ensued, ensured that Myth fans had lots of new toys to play with in the game world. Myth II also enjoyed a comprehensive update in the shape of the the Myth II expansion pack: Chimera. [Bungie Studios]",
      score: "88"
    },
    {
      positie: "15",
      titel: "Shogo: Mobile Armor Division",
      datum_uitgifte: "Sep 30, 1998",
      korte_omschrijving: "Choose from four ultra powerful transforming Mobile Combat Armor suits, each with its own advantages and strengths. Find tons of powerups and enhancements to improve your MCA's performance. In addition to piloting your MCA through deadly outdoor, underground, and city missions, you will be able to dock in certain areas and strike out on foot to complete objectives. There may even be a surprise or two in store... Shogo: Mobile Armor Division uses Monolith?s LithTech - one of the most advanced next-generation 3D engines in gaming. [Monolilth]",
      score: "88"
    },
    {
      positie: "16",
      titel: "Oddworld: Abe's Exoddus",
      datum_uitgifte: "Oct 31, 1998",
      korte_omschrijving: "Abe's peaceful retirement was shattered when visited by a vision from the Mudokon Spirit Guides. Abe&trade; learned the Magog Cartel was mining Necrum, the sacred Mudokon city of the dead, to collect bones to make super-addictive SoulStorm Brew.\nAfter freeing the Mudokon spirits imprisoned in the Mudanchee and Mudomo Vaults, Abe gained scary powers from the Spirit Guides, including the ability to heal his Mudokon friends of Soul-Storm addiction, and the power to turn invisible. Infiltrating the transportation hub of FeeCo Depot, and using explosive farts to survive adventures at the Slig Barracks and Bonewerks, Abe broke into SoulStorm Brewery.\nThere Abe learned the truth behind the secret ingredient of SoulStorm Brew . . . just before blasting the place to atoms with the combined power of the sobered-up Mudokon he'd rescued. Then Abe joined his brew-addled pals at Alf's Rehab &amp; Tea to take the cure - the journey of a lifetime starts with one step. Or is it twelve?",
      score: "88"
    },
    {
      positie: "17",
      titel: "Need for Speed III: Hot Pursuit",
      datum_uitgifte: "Mar 25, 1998",
      korte_omschrijving: "Need for Speed returns with all the exotic supercars, tracks, and race modes you've come to expect--but reengineered for higher performance, stunning realism, and fierce competition.  With Hot Pursuit mode, you can race on both sides of the law: as a cop using radar, dispatchers, and roadblocks to track down speeders; or as a racer, trying to outrun the law.  Real-world environments feature details such as blowing leaves, rain, lightning, mud splashes, and smoke from burning rubber and they will put your driving skills to the ultimate test.",
      score: "88"
    },
    {
      positie: "18",
      titel: "Tenchu: Stealth Assassins",
      datum_uitgifte: "Aug 31, 1998",
      korte_omschrijving: "Prowl and strike with lethal precision as ninja assassins Rikimaru or Ayame in the shadowy world of feudal Japan. Armed with mystical weapons and sheer cunning, you must shed blood with discretion and move without detection. For only the unseen survive. Master dozens of motion-captured ninja moves as you disembowel fearsome samurai, wild beasts, and evil demons. Wield 20 stunning death-dealing devices, including throwing stars, grappling hooks, caltrops and more. Stalk the towns, temples, forests, caves and dungeons of 16th century Japan in 10 deadly missions.",
      score: "87"
    },
    {
      positie: "19",
      titel: "Fallout 2",
      datum_uitgifte: "Oct 29, 1998",
      korte_omschrijving: "It's been 80 long years since your ancestor trod across the wastelands. As you search for the Garden of Eden Creation Kit to save your primitive village, your path is strewn with crippling radiation, megalomaniac mutants, and a relentless stream of lies, deceit, and treachery. You begin to wonder if anyone really stands to gain anything from this brave new world. [Interplay]",
      score: "86"
    },
    {
      positie: "20",
      titel: "Alundra",
      datum_uitgifte: "Jan 8, 1998",
      korte_omschrijving: "Plagued by strange visions, the Dreamwalker Alundra is summoned to a troubled village where great evil lies in wait. Explore huge dungeons, find deadly weapons, solve challenging puzzles and fight the cast of foul creatures out to stop you in your tracks. This vast, enthralling adventure will keep you wide awake to the very end.",
      score: "86"
    },
    {
      positie: "21",
      titel: "Turok 2: Seeds of Evil",
      datum_uitgifte: "Dec 10, 1998",
      korte_omschrijving: "Turok 2 starts out poorly, but it does have some redeeming qualities.",
      score: "86"
    },
    {
      positie: "22",
      titel: "Tom Clancy's Rainbow Six",
      datum_uitgifte: "Aug 21, 1998",
      korte_omschrijving: "The most revolutionary action/strategy game of its kind. Nothing comes closer to offering an exciting combination of strategy, team-building, realistic three-dimensional graphics and true-to-life special forces action. The ultimate goal is to save yourself and the world from deadly terrorists. You must successfully complete 17 unique missions. If you die, the game isn't over. The World is. [Red Storm Entertainment]",
      score: "85"
    },
    {
      positie: "23",
      titel: "Falcon 4.0",
      datum_uitgifte: "Nov 30, 1998",
      korte_omschrijving: "Falcon 4.0 is an extremely detailed Simulation integrating a fully dynamic, realtime Air, land, and sea war in which you take part as an F-16 pilot. Running on any OS platform capable of supporting Directx 5.0 and above. Falcon 4.0 not only simulates a fantastic and versatile fighter, but also a very versatile product. With 4 years of hard work behind it, it is the ultimate Simulation experience for all enthusiasts. [Falcon 4.0 HQ]",
      score: "85"
    },
    {
      positie: "24",
      titel: "F-Zero X",
      datum_uitgifte: "Sep 30, 1998",
      korte_omschrijving: "It's you against 29 other machines competing for the title of F-Zero X Champion. You're racing at speeds of over 1,000 km/h high above the atmosphere. Your competition comes from every corner of the galaxy and won't shed a tear at the thought of smashing you off the track. With four-player simultaneous gameplay and the Rumble Pak accessory, you have the fastest racing game on the N64 system!",
      score: "85"
    }
  ],
  1999: [
    {
      positie: "1",
      titel: "SoulCalibur",
      datum_uitgifte: "Sep 8, 1999",
      korte_omschrijving: "This is a tale of souls and swords, transcending the world and all its history, told for all eternity... The greatest weapons-based fighter returns, this time on Sega Dreamcast. Soul Calibur unleashes incredible graphics, fantastic fighters, and combos so amazing they'll make your head spin!",
      score: "98"
    },
    {
      positie: "2",
      titel: "Gran Turismo 2",
      datum_uitgifte: "Dec 23, 1999",
      korte_omschrijving: "The world's most advanced racing game returns with thunderous new features.\n\nOver 500 racing machines from world-class manufacturers.\n\n- All vehicles are designed according to their exact specifications and are fully customizable.\n- Insane Arcade mode with power slides, burnouts, jumps and excessive speeds\n- Killer soundtrack from star-studded bands\n- Benchmark 3D graphics\n- Intense two player racing",
      score: "93"
    },
    {
      positie: "3",
      titel: "Homeworld",
      datum_uitgifte: "Aug 31, 1999",
      korte_omschrijving: "Deported to a harsh desert world, exiles have struggled for three thousand years to regain the stars. Now it's up to you to guide them home through a brutal empire bent on annihilation. Homeworld boasts amazing ship graphics and gorgeous deep-space vistas, a unique command and navigation interface and white-knuckle real-time strategy. [Sierra]",
      score: "93"
    },
    {
      positie: "4",
      titel: "System Shock 2",
      datum_uitgifte: "Aug 11, 1999",
      korte_omschrijving: "Like System Shock 1, there will be persistent levels (i.e., drop an item on one level, and you could go back later to retrieve it), gameplay elements like logs, inventory, skills, persistent world, leaning, hacking, rpg elements, multiple weapons and enemies, and a compelling storyline. Unlike most other first person shooters, the purpose of System Shock was not to kill everything in sight; nor was it a \"find the key to move onto the next level\" game. The plot was always present, but not so confining as in traditional shooters - there was almost always more than one task to accomplish. Levels were realistically designed and had logical reasons behind them. It is the principle of System Shock 2 to continue this game design. [sshock2.com]",
      score: "92"
    },
    {
      positie: "5",
      titel: "Tony Hawk's Pro Skater",
      datum_uitgifte: "Sep 29, 1999",
      korte_omschrijving: "Skate as legendary Tony Hawk, or as one of nine top pros. Work your way up the ranks by landing suicidal tricks in brutal competitions to become the highest-ranked skate champ.",
      score: "92"
    },
    {
      positie: "6",
      titel: "Age of Empires II: The Age of Kings",
      datum_uitgifte: "Sep 30, 1999",
      korte_omschrijving: "Age of Empires II: The Age of Kings is the sequel to the award-winning, best-selling real-time strategy game \"Age of Empires.\" Age of Empires II spans a thousand years, from the fall of Rome through the Middle Ages in which players lead one of 13 civilizations into greatness. The game keeps the epic scope of Age of Empires' game play while evolving the combat and economic features. [Microsoft]",
      score: "92"
    },
    {
      positie: "7",
      titel: "Sid Meier's Alpha Centauri",
      datum_uitgifte: "Feb 12, 1999",
      korte_omschrijving: "Legendary designer Sid Meier presents the next evolution in strategy games, with the most addictive, compelling gameplay yet. Explore the alien planet that is your new home and uncover its myriad mysteries. Discover over 75 extraordinary technologies. Build over 60 base upgrades and large-scale secret projects for your empire. Conquer your enemies with a war machine that you design from over 32,000 possible unit types. [Firaxis]",
      score: "92"
    },
    {
      positie: "8",
      titel: "Medal of Honor (1999)",
      datum_uitgifte: "Oct 31, 1999",
      korte_omschrijving: "Tomorrow is D-Day. Tonight you land behind enemy lines. The tide of the way is in your hands. You are an elite Special Forces agent sent to execute covert operations, search and rescue missions, and commando raids. Fight to win the medal of Honor in the only game that lets you take on Nazis in WWII.",
      score: "92"
    },
    {
      positie: "9",
      titel: "FreeSpace 2",
      datum_uitgifte: "Sep 30, 1999",
      korte_omschrijving: "The year is 2367. Thirty-two years have passed since the Great War. As Terrans and Vasudans struggle to rebuild their civilizations, civil war erupts in the Polaris system. A rogue Terran admiral declares war against the Vasudans, threatening the stability of the Alliance. Without warning, the Shivans return, and Terrans and Vasudans face annihilation at the hands of their Great War nemesis. [Interplay]",
      score: "91"
    },
    {
      positie: "10",
      titel: "Resident Evil 3: Nemesis",
      datum_uitgifte: "Nov 11, 1999",
      korte_omschrijving: "A month and a half have passed since the mansion lab incident and now the secrets come back to haunt you in Resident Evil 3: Nemesis. Join Jill Valentine in her attempt to escape a nightmarish city in ruins. Around every corner lurk hordes of flesh-eating zombies, hideous mutants, and a relentless new nemesis. You'll soon rely on cunning and brute force to stay alive. The Resident Evil series has taken a horrifying turn, unveiling new layers in the Umbrella Corporation's devious activities.",
      score: "91"
    },
    {
      positie: "11",
      titel: "Planescape: Torment",
      datum_uitgifte: "Dec 14, 1999",
      korte_omschrijving: "Welcome to Sigil, the \"City of Doors\", a place with gates that lead anywhere in existence, provided you have the proper key. It is a neutral ground and watering hole for races across the multiverse, all under the watchful shadow of the Lady of Pain, the enigmatic ruler of the city. It is a place where the word is mightier than the sword, where thought defines reality, where belief has the power to reshape worlds and change the laws of physics. [Interplay]",
      score: "91"
    },
    {
      positie: "12",
      titel: "Legacy of Kain: Soul Reaver",
      datum_uitgifte: "Aug 13, 1999",
      korte_omschrijving: "Cast down to the material world, the mysterious entity 'Raziel' seeks vengeance for betrayal by his master: Kain. Cursed to stalk the dark realms of Nosgoth, he must slay his undead brethren; only then can he absorb their souls for the energy he craves. Moving between the spectral and material plane, Raziel must negotiate puzzles, overcome traps and defy blood-chilling enemies to reach his goal - the final battle with Kain!",
      score: "91"
    },
    {
      positie: "13",
      titel: "Mario Golf",
      datum_uitgifte: "Jun 30, 1999",
      korte_omschrijving: "Forget buying expensive golf gear--Mario brings the game to you. \n\nMario Golf features four complete 18-hole courses, 11 golfers, and precise play control.\n\nCreate your own golfer and build up his or her experience and skill levels by competing in various tournaments and head-to-head matches. The more you play, the stronger and more accurate your golfer becomes. \n\nThere are many different modes of play in Mario Golf, including a wide variety of minigames designed to challenge even the most level-headed swingers.",
      score: "91"
    },
    {
      positie: "14",
      titel: "Ape Escape",
      datum_uitgifte: "Jun 23, 1999",
      korte_omschrijving: "A boisterous band of baboons carry out a daring zoo escape. It's ape anarchy and it's up to you to stop the chimps before they make chumps out of the human race! Use both analog sticks to operate great gadgets including a Tank, a Remote Control Car, a Stun Club, and a Time Net in your quest to hunt down over 200 apes!",
      score: "90"
    },
    {
      positie: "15",
      titel: "Syphon Filter",
      datum_uitgifte: "Feb 17, 1999",
      korte_omschrijving: "While it may not be an original concept, the game is truly greater than the sum of its many parts.",
      score: "90"
    },
    {
      positie: "16",
      titel: "Donkey Kong 64",
      datum_uitgifte: "Nov 24, 1999",
      korte_omschrijving: "K. Rool has kidnapped the Kongs! Can Donkey Kong rescue his friends, reclaim the Golden Bananas and save his homeland from certain doom? Take out some Kremlings with Chunky's Pineapple Launcher or Lanky's Trombone. Float through the air using Tiny's Ponytail Twirl. Even rocket to the sky with Diddy's Jetbarrel!",
      score: "90"
    },
    {
      positie: "17",
      titel: "Final Fantasy VIII",
      datum_uitgifte: "Sep 7, 1999",
      korte_omschrijving: "Experience A Massive New World On Your PC. A member of an elite military team, Squall is forced into a conflict beyond imagination. To survive, he must contend with a desperate rival, a powerful sorceress, and his own mysterious dreams. Realistic, detailed characters and background graphics enhanced by a breathtaking musical score. An epic story based on the theme of love, set in massive new world.",
      score: "89"
    }
  ],
  

  2000: [
    {
      positie: "1",
      titel: "Tony Hawk's Pro Skater 2",
      datum_uitgifte: "Sep 20, 2000",
      korte_omschrijving: "Hawk's back - with new technology, new pros and new tricks! THPS2, the legend rides on! Skate as legendary Tony Hawk or any one of 12 other pro skaters. Create your own custom skaters. Multiple skate park editor. Improved skate physics and animations. 13 all-new levels with new gaps and hidden tricks. Trick point system lets you rack up points and purchase new equipment and levels.",
      score: "98"
    },
    {
      positie: "2",
      titel: "The Legend of Zelda: Majora's Mask",
      datum_uitgifte: "Oct 25, 2000",
      korte_omschrijving: "Thrown into a parallel world by the mischievous actions of a possessed Skull Kid, Link finds a land in grave danger. The dark power of a relic called Majora's Mask has wreaked havoc on the citizens of Termina, but their most urgent problem is a suicidal moon crashing toward the world. Link has only 72 hours to find a way to stop its descent.",
      score: "95"
    },
    {
      positie: "3",
      titel: "Baldur's Gate II: Shadows of Amn",
      datum_uitgifte: "Sep 21, 2000",
      korte_omschrijving: "An epic continuation of the story that began in Baldur's Gate, this RPG is set along the southern portion of the Sword Coast, a detailed and rich area of the Forgotten Realms called Amn. It features 300 spells and 130-plus monster types compared to only 130 spells and 60 monster types in Baldur's Gate. [Interplay]",
      score: "95"
    },
    {
      positie: "4",
      titel: "Diablo II",
      datum_uitgifte: "Jun 29, 2000",
      korte_omschrijving: "In Diablo II, return to a world of dark fantasy. As one of five distinct character types, explore the world of Diablo II -- journey across distant lands, fight new villains, discover new treasures, and uncover ancient mysteries, all in the quest to stop the Lord of Terror, once and for all. [Blizzard Entertainment]",
      score: "94"
    },
    {
      positie: "5",
      titel: "Perfect Dark",
      datum_uitgifte: "May 22, 2000",
      korte_omschrijving: "Step into the Dark... As Joanna Dark, a futuristic secret agent armed with an arsenal of high-tech gadgetry, you'll infiltrate the dark corridors of the mysterious dataDyne Corporation to uncover a sinister conspiracy. Battle your way through 17 action-packed missions, from the deepest underground levels to the streets of a futuristic Chicago. Use futuristic weapons and gadgets, including night vision, x-ray scanners, and rocket launchers. Experience intense multiplayer action for up to four players with a cadre of intelligent simulants that learn and adapt. [Rare Ltd.]",
      score: "94"
    },
    {
      positie: "6",
      titel: "Deus Ex",
      datum_uitgifte: "Jun 26, 2000",
      korte_omschrijving: "A philosophical first-person action RPG where every choice matters. You play as JC Denton, a nanotechnologically augmented agent in a dystopian future. Uncover conspiracies, make decisions that shape the world, and engage in a mix of stealth, combat, and dialogue-driven gameplay to thwart a global threat. [Ion Storm]",
      score: "94"
    },
    {
      positie: "7",
      titel: "NFL 2K1",
      datum_uitgifte: "Sep 7, 2000",
      korte_omschrijving: "The ultimate in football gaming is back with more of what made it great. Play an entire season with your favorite NFL team, or go head-to-head with up to three friends. New player models and animations make every hit, catch, and run look and feel as real as the NFL. [Visual Concepts]",
      score: "93"
    },
    {
      positie: "8",
      titel: "Chrono Cross",
      datum_uitgifte: "Aug 15, 2000",
      korte_omschrijving: "Featuring a storyline developed by the creator of Chrono Trigger and Xenogears, Chrono Cross has been christened the \"Best RPG of the Year\" by several GameFan and GameSpot reviewers. Over 40 playable characters, each with their own back-story and unique abilities, await in a world that spans two discs and over 60 hours of gameplay. [SquareSoft]",
      score: "92"
    },
    {
      positie: "9",
      titel: "The Sims",
      datum_uitgifte: "Feb 4, 2000",
      korte_omschrijving: "Create simulated people and build their homes, then help your Sims pursue careers, earn money, make friends, and find romance--or totally mess up their lives. Test your \"people skills\" as you deal with family, friends, careers, and the trials of everyday life. Will your Sims thrive in the neighborhood or become lonely outcasts? [Maxis]",
      score: "92"
    },
    {
      positie: "10",
      titel: "Jet Set Radio",
      datum_uitgifte: "Jun 29, 2000",
      korte_omschrijving: "Join a rollerblading graffiti artist crew in the streets of a futuristic Tokyo. Tag walls, billboards, and rival gang members with your spray paint while evading the police. Perform tricks, grind rails, and rack up points in this vibrant, cel-shaded action game with a killer soundtrack. [Smilebit]",
      score: "92"
    }
  ],
  2001: [
    {
      positie: "1",
      titel: "Halo: Combat Evolved",
      datum_uitgifte: "Nov 15, 2001",
      korte_omschrijving: "As Master Chief, a cybernetically enhanced super-soldier, you crash-land on a mysterious ringworld. Fight through alien Covenant forces and the parasitic Flood to uncover the secrets of Halo. With groundbreaking AI, immersive storytelling, and intense first-person combat, this sci-fi shooter redefined the genre. [Bungie]",
      score: "97"
    },
    {
      positie: "2",
      titel: "Gran Turismo 3: A-Spec",
      datum_uitgifte: "Jul 10, 2001",
      korte_omschrijving: "With over 150 authentic vehicles and realistic physics, Gran Turismo 3: A-Spec pushes the boundaries of racing simulation. Compete on meticulously designed tracks, fine-tune your cars, and master driving techniques to dominate the competition. [Polyphony Digital]",
      score: "95"
    },
    {
      positie: "3",
      titel: "Metal Gear Solid 2: Sons of Liberty",
      datum_uitgifte: "Nov 13, 2001",
      korte_omschrijving: "Solid Snake returns in a stealth-action masterpiece. Infiltrate a tanker and a massive offshore facility to stop a terrorist threat. With advanced AI, cinematic storytelling, and innovative gameplay, MGS2 delivers a gripping narrative about war, technology, and truth. [Konami]",
      score: "95"
    },
    {
      positie: "4",
      titel: "Tony Hawk's Pro Skater 3",
      datum_uitgifte: "Oct 28, 2001",
      korte_omschrijving: "Shred through expansive levels with improved controls and the revolutionary revert mechanic. Skate as Tony Hawk or create your own pro, chaining massive combos across urban environments. New multiplayer modes and a killer soundtrack keep the adrenaline pumping. [Neversoft]",
      score: "94"
    },
    {
      positie: "5",
      titel: "Final Fantasy X",
      datum_uitgifte: "Dec 17, 2001",
      korte_omschrijving: "Embark on a pilgrimage with Tidus and Yuna in the world of Spira to defeat the monstrous Sin. This visually stunning RPG introduces voice acting and a dynamic combat system, blending a heartfelt story with strategic turn-based battles. [SquareSoft]",
      score: "92"
    },
    {
      positie: "6",
      titel: "Super Smash Bros. Melee",
      datum_uitgifte: "Dec 3, 2001",
      korte_omschrijving: "Nintendo’s iconic characters collide in this fast-paced fighting game. Choose from Mario, Link, Pikachu, and more, battling across dynamic stages. With refined mechanics, new characters, and competitive multiplayer, Melee became a legendary esports title. [HAL Laboratory]",
      score: "92"
    },
    {
      positie: "7",
      titel: "Grand Theft Auto III",
      datum_uitgifte: "Oct 22, 2001",
      korte_omschrijving: "Step into the open-world of Liberty City as a small-time criminal. Engage in missions, explore a living city, and build your criminal empire. GTA III revolutionized gaming with its freedom, immersive 3D world, and gritty narrative. [Rockstar North]",
      score: "92"
    },
    {
      positie: "8",
      titel: "Madden NFL 2002",
      datum_uitgifte: "Aug 19, 2001",
      korte_omschrijving: "Experience authentic NFL action with improved AI and realistic animations. Lead your team through a full season, make strategic plays, and dominate the field. Enhanced graphics and new modes make this a touchdown for football fans. [EA Tiburon]",
      score: "91"
    },
    {
      positie: "9",
      titel: "Ico",
      datum_uitgifte: "Sep 24, 2001",
      korte_omschrijving: "Guide Ico, a boy with horns, and Princess Yorda through a hauntingly beautiful castle to escape a dark fate. This atmospheric puzzle-platformer emphasizes emotional storytelling, minimalist design, and cooperative mechanics. [Team Ico]",
      score: "90"
    },
    {
      positie: "10",
      titel: "Advance Wars",
      datum_uitgifte: "Sep 10, 2001",
      korte_omschrijving: "Command armies in this turn-based strategy gem. Lead the Orange Star nation through tactical battles, managing units and terrain to outsmart enemies. With colorful visuals and deep gameplay, Advance Wars is a portable masterpiece. [Intelligent Systems]",
      score: "89"
    }
  ],
  2002: [
    {
      positie: "1",
      titel: "Metroid Prime",
      datum_uitgifte: "Nov 17, 2002",
      korte_omschrijving: "Samus Aran returns in a groundbreaking first-person adventure. Explore the alien planet Tallon IV, uncover Chozo lore, and battle Space Pirates. With immersive exploration, visceral combat, and stunning visuals, Metroid Prime redefined the series. [Retro Studios]",
      score: "97"
    },
    {
      positie: "2",
      titel: "Grand Theft Auto: Vice City",
      datum_uitgifte: "Oct 29, 2002",
      korte_omschrijving: "Welcome to 1980s Vice City, a neon-soaked open world of crime. As Tommy Vercetti, rise through the criminal underworld with missions, heists, and a vibrant soundtrack. Improved mechanics and a colorful setting make this GTA iconic. [Rockstar North]",
      score: "95"
    },
    {
      positie: "3",
      titel: "The Legend of Zelda: The Wind Waker",
      datum_uitgifte: "Dec 13, 2002",
      korte_omschrijving: "Sail the Great Sea as Link in a cel-shaded adventure. Rescue your sister, explore islands, and confront Ganondorf. With a charming art style, open-world exploration, and epic quests, Wind Waker is a timeless classic. [Nintendo]",
      score: "94"
    },
    {
      positie: "4",
      titel: "Tony Hawk's Pro Skater 4",
      datum_uitgifte: "Oct 23, 2002",
      korte_omschrijving: "Skate through open-ended levels with new goals and improved controls. Chain combos, explore diverse environments, and master new tricks. Enhanced multiplayer and a robust create-a-park mode keep the series fresh and addictive. [Neversoft]",
      score: "94"
    },
    {
      positie: "5",
      titel: "Madden NFL 2003",
      datum_uitgifte: "Aug 12, 2002",
      korte_omschrijving: "Dominate the gridiron with refined gameplay and realistic AI. New features like Mini-Camp mode and deeper franchise options elevate the NFL experience. Lead your team to Super Bowl glory with improved graphics and controls. [EA Tiburon]",
      score: "92"
    },
    {
      positie: "6",
      titel: "Splinter Cell",
      datum_uitgifte: "Nov 17, 2002",
      korte_omschrijving: "As Sam Fisher, a covert operative, infiltrate high-security environments using stealth and gadgets. With cutting-edge visuals, dynamic lighting, and tense gameplay, Splinter Cell redefined stealth-action gaming. [Ubisoft Montreal]",
      score: "91"
    },
    {
      positie: "7",
      titel: "Resident Evil (2002)",
      datum_uitgifte: "Mar 22, 2002",
      korte_omschrijving: "A stunning remake of the survival horror classic. Explore the Spencer Mansion as Chris or Jill, facing zombies and puzzles. Enhanced visuals, updated controls, and new content make this a terrifying masterpiece. [Capcom]",
      score: "91"
    },
    {
      positie: "8",
      titel: "Battlefield 1942",
      datum_uitgifte: "Sep 10, 2002",
      korte_omschrijving: "Fight in massive WWII battles across land, sea, and air. Drive tanks, pilot planes, and engage in large-scale multiplayer warfare. With dynamic maps and team-based gameplay, Battlefield 1942 set the standard for online shooters. [DICE]",
      score: "89"
    },
    {
      positie: "9",
      titel: "Animal Crossing",
      datum_uitgifte: "Sep 16, 2002",
      korte_omschrijving: "Move to a charming village and live alongside quirky animal neighbors. Fish, decorate your home, and build relationships in this relaxing life sim. With real-time events and endless charm, Animal Crossing is endlessly replayable. [Nintendo]",
      score: "87"
    },
    {
      positie: "10",
      titel: "Warcraft III: Reign of Chaos",
      datum_uitgifte: "Jul 3, 2002",
      korte_omschrijving: "Command armies in the fantasy world of Azeroth. Lead humans, orcs, undead, or night elves through epic campaigns. With deep strategy, hero units, and a robust multiplayer scene, Warcraft III shaped the RTS genre. [Blizzard Entertainment]",
      score: "86"
    }
  ],
  2003: [
    {
      positie: "1",
      titel: "The Legend of Zelda: The Wind Waker",
      datum_uitgifte: "Mar 24, 2003",
      korte_omschrijving: "Sail the Great Sea in this cel-shaded masterpiece. As Link, explore islands, solve puzzles, and battle Ganondorf to save your sister. With timeless art and open-world exploration, Wind Waker remains a beloved classic. [Nintendo]",
      score: "96"
    },
    {
      positie: "2",
      titel: "Star Wars: Knights of the Old Republic",
      datum_uitgifte: "Jul 15, 2003",
      korte_omschrijving: "Set thousands of years before the Star Wars films, forge your path as a Jedi or Sith in this epic RPG. Make moral choices, wield lightsabers, and shape the galaxy’s fate in a rich, story-driven adventure. [BioWare]",
      score: "94"
    },
    {
      positie: "3",
      titel: "Madden NFL 2004",
      datum_uitgifte: "Aug 12, 2003",
      korte_omschrijving: "Take the field with enhanced gameplay and deeper franchise mode. New play-calling mechanics and improved AI make every match intense. Build your dynasty and dominate the NFL with realistic graphics and controls. [EA Tiburon]",
      score: "94"
    },
    {
      positie: "4",
      titel: "Prince of Persia: The Sands of Time",
      datum_uitgifte: "Nov 6, 2003",
      korte_omschrijving: "As the Prince, wield the Dagger of Time to rewind mistakes and manipulate fate. Navigate traps, fight enemies, and solve puzzles in this acrobatic action-adventure with a gripping story and innovative mechanics. [Ubisoft Montreal]",
      score: "92"
    },
    {
      positie: "5",
      titel: "F-Zero GX",
      datum_uitgifte: "Aug 25, 2003",
      korte_omschrijving: "Race at breakneck speeds in this high-octane futuristic racer. Pilot agile hovercrafts through twisting tracks, mastering tight controls and intense competition. With stunning visuals and a steep challenge, F-Zero GX thrills. [Amusement Vision]",
      score: "92"
    },
    {
      positie: "6",
      titel: "Max Payne 2: The Fall of Max Payne",
      datum_uitgifte: "Oct 14, 2003",
      korte_omschrijving: "Dive back into Max Payne’s noir world as he unravels a conspiracy. Enhanced bullet-time mechanics, gritty storytelling, and cinematic gunplay deliver a thrilling action experience with a tragic love story at its core. [Remedy Entertainment]",
      score: "89"
    },
    {
      positie: "7",
      titel: "Beyond Good & Evil",
      datum_uitgifte: "Nov 11, 2003",
      korte_omschrijving: "As Jade, a photojournalist, uncover a planetary conspiracy through stealth, combat, and photography. This cult classic blends action-adventure with a heartfelt story, vibrant world, and memorable characters. [Ubisoft]",
      score: "87"
    },
    {
      positie: "8",
      titel: "Call of Duty",
      datum_uitgifte: "Oct 29, 2003",
      korte_omschrijving: "Experience WWII through intense first-person combat. Fight across European theaters as American, British, and Soviet soldiers. With cinematic battles and authentic weapons, Call of Duty launched a legendary FPS franchise. [Infinity Ward]",
      score: "87"
    },
    {
      positie: "9",
      titel: "Fire Emblem",
      datum_uitgifte: "Nov 3, 2003",
      korte_omschrijving: "Lead a band of heroes in tactical RPG battles. Manage units, forge relationships, and strategize to save the continent of Elibe. With deep gameplay and a compelling story, Fire Emblem brought the series to the West. [Intelligent Systems]",
      score: "86"
    },
    {
      positie: "10",
      titel: "Mario Kart: Double Dash!!",
      datum_uitgifte: "Nov 17, 2003",
      korte_omschrijving: "Race with a partner in this chaotic kart racer. Swap between driver and item-thrower, speeding through vibrant tracks with iconic Mario characters. Cooperative gameplay and tight controls make Double Dash a fan favorite. [Nintendo]",
      score: "86"
    }
  ],
  2004: [
    {
      positie: "1",
      titel: "Halo 2",
      datum_uitgifte: "Nov 9, 2004",
      korte_omschrijving: "Master Chief returns to battle the Covenant and a new threat, the Flood. With an epic campaign, refined multiplayer, and Xbox Live integration, Halo 2 revolutionized online gaming and storytelling in FPS titles. [Bungie]",
      score: "95"
    },
    {
      positie: "2",
      titel: "Half-Life 2",
      datum_uitgifte: "Nov 16, 2004",
      korte_omschrijving: "As Gordon Freeman, fight an alien-controlled dystopian Earth. With groundbreaking physics, immersive storytelling, and the iconic Gravity Gun, Half-Life 2 set a new standard for FPS games with its cinematic depth. [Valve]",
      score: "95"
    },
    {
      positie: "3",
      titel: "Grand Theft Auto: San Andreas",
      datum_uitgifte: "Oct 26, 2004",
      korte_omschrijving: "Explore the massive state of San Andreas as CJ, a gang member seeking redemption. With a sprawling open world, deep customization, and a gripping story, San Andreas pushed the boundaries of the GTA series. [Rockstar North]",
      score: "94"
    },
    {
      positie: "4",
      titel: "Metroid Prime 2: Echoes",
      datum_uitgifte: "Nov 15, 2004",
      korte_omschrijving: "Samus explores the war-torn planet Aether, split between light and dark dimensions. With new beam weapons, multiplayer modes, and challenging exploration, Echoes expands the Metroid Prime formula with darker themes. [Retro Studios]",
      score: "92"
    },
    {
      positie: "5",
      titel: "Ninja Gaiden",
      datum_uitgifte: "Mar 2, 2004",
      korte_omschrijving: "As Ryu Hayabusa, wield ninja skills in a brutally challenging action game. Face relentless enemies, master precise combat, and navigate intricate levels. Ninja Gaiden’s difficulty and depth earned it legendary status. [Team Ninja]",
      score: "91"
    },
    {
      positie: "6",
      titel: "Burnout 3: Takedown",
      datum_uitgifte: "Sep 8, 2004",
      korte_omschrijving: "Race and crash in this adrenaline-fueled arcade racer. Cause spectacular takedowns, boost through traffic, and dominate online races. With intense speed and chaotic fun, Burnout 3 redefined arcade racing. [Criterion Games]",
      score: "90"
    },
    {
      positie: "7",
      titel: "World Soccer Winning Eleven 7 International",
      datum_uitgifte: "Feb 17, 2004",
      korte_omschrijving: "Experience authentic soccer with realistic gameplay and deep mechanics. Control every pass, shot, and tackle with precision. With licensed teams and fluid animations, Winning Eleven 7 set a high bar for sports games. [Konami]",
      score: "90"
    },
    {
      positie: "8",
      titel: "Metal Gear Solid 3: Snake Eater",
      datum_uitgifte: "Nov 17, 2004",
      korte_omschrijving: "As Naked Snake, infiltrate a 1960s jungle to stop a Cold War threat. With survival mechanics, camouflage, and a cinematic story, Snake Eater blends stealth and action in a gripping prequel. [Konami]",
      score: "89"
    },
    {
      positie: "9",
      titel: "Katamari Damacy",
      datum_uitgifte: "Sep 21, 2004",
      korte_omschrijving: "Roll a sticky ball to collect objects, growing from tiny items to massive structures. This quirky, charming game with a whimsical soundtrack and unique gameplay became a cult classic. [Namco]",
      score: "86"
    },
    {
      positie: "10",
      titel: "The Chronicles of Riddick: Escape from Butcher Bay",
      datum_uitgifte: "Jun 1, 2004",
      korte_omschrijving: "Play as Riddick, a convict escaping a brutal prison. Blend stealth, melee combat, and shooting in a gritty sci-fi world. With cinematic visuals and immersive storytelling, this game outshines its film roots. [Starbreeze Studios]",
      score: "85"
    }
  ],
  2005: [
    {
      positie: "1",
      titel: "Ninja Gaiden Black",
      datum_uitgifte: "Sep 20, 2005",
      korte_omschrijving: "An enhanced version of Ninja Gaiden, Ryu Hayabusa faces tougher challenges and new content. With refined combat, additional missions, and brutal difficulty, Ninja Gaiden Black is a masterclass in action gaming. [Team Ninja]",
      score: "94"
    },
    {
      positie: "2",
      titel: "Battlefield 2",
      datum_uitgifte: "Jun 21, 2005",
      korte_omschrijving: "Fight in large-scale modern warfare with tanks, helicopters, and squad-based tactics. With dynamic maps, robust online multiplayer, and commander roles, Battlefield 2 delivers intense, strategic FPS action. [DICE]",
      score: "91"
    },
    {
      positie: "3",
      titel: "Forza Motorsport",
      datum_uitgifte: "May 3, 2005",
      korte_omschrijving: "Race over 200 cars on detailed tracks with realistic physics. Customize vehicles, compete in career mode, and challenge online opponents. Forza Motorsport set a new standard for racing simulations. [Turn 10 Studios]",
      score: "91"
    },
    {
      positie: "4",
      titel: "Resident Evil 4",
      datum_uitgifte: "Jan 11, 2005",
      korte_omschrijving: "Leon S. Kennedy battles a cult in a remote village to rescue the president’s daughter. With over-the-shoulder aiming, intense action, and survival horror, Resident Evil 4 revolutionized the genre. [Capcom]",
      score: "91"
    },
    {
      positie: "5",
      titel: "Splinter Cell: Chaos Theory",
      datum_uitgifte: "Mar 21, 2005",
      korte_omschrijving: "Sam Fisher returns in the pinnacle of stealth gaming. With refined mechanics, open-ended missions, and cutting-edge visuals, Chaos Theory offers tense stealth-action and a gripping spy thriller story. [Ubisoft Montreal]",
      score: "90"
    },
    {
      positie: "6",
      titel: "Shadow of the Colossus",
      datum_uitgifte: "Oct 18, 2005",
      korte_omschrijving: "As Wander, slay 16 massive colossi to save a loved one. This minimalist action-adventure blends epic boss battles, exploration, and emotional storytelling in a haunting, beautiful world. [Team Ico]",
      score: "89"
    },
    {
      positie: "7",
      titel: "God of War",
      datum_uitgifte: "Mar 22, 2005",
      korte_omschrijving: "Kratos, a Spartan warrior, seeks vengeance against the gods. With brutal combat, epic boss fights, and mythological storytelling, God of War delivers a cinematic action experience. [Santa Monica Studio]",
      score: "88"
    },
    {
      positie: "8",
      titel: "World Soccer Winning Eleven 8 International",
      datum_uitgifte: "Feb 1, 2005",
      korte_omschrijving: "Master the pitch with improved AI and realistic soccer mechanics. New modes, licensed teams, and refined controls make Winning Eleven 8 a standout sports title. [Konami]",
      score: "88"
    },
    {
      positie: "9",
      titel: "Guild Wars",
      datum_uitgifte: "Apr 28, 2005",
      korte_omschrijving: "Explore a fantasy MMO without subscription fees. Engage in cooperative quests, PvP battles, and build your character with strategic skills. Guild Wars offers a rich world and innovative gameplay. [ArenaNet]",
      score: "87"
    },
    {
      positie: "10",
      titel: "F.E.A.R.",
      datum_uitgifte: "Oct 18, 2005",
      korte_omschrijving: "As a member of the F.E.A.R. team, face supernatural horrors and intense firefights. With advanced AI, slow-motion combat, and a creepy atmosphere, this FPS blends action and horror masterfully. [Monolith Productions]",
      score: "86"
    }
  ],
  2006: [
    {
      positie: "1",
      titel: "The Legend of Zelda: Twilight Princess",
      datum_uitgifte: "Nov 19, 2006",
      korte_omschrijving: "Link transforms into a wolf to save Hyrule in this epic adventure. Explore a dark, vast world, solve puzzles, and battle enemies with innovative motion controls. Twilight Princess is a Zelda masterpiece. [Nintendo]",
      score: "95"
    },
    {
      positie: "2",
      titel: "Gears of War",
      datum_uitgifte: "Nov 7, 2006",
      korte_omschrijving: "As Marcus Fenix, fight Locust hordes in a gritty third-person shooter. With cover-based combat, co-op gameplay, and cinematic storytelling, Gears of War defined a generation of action games. [Epic Games]",
      score: "94"
    },
    {
      positie: "3",
      titel: "The Elder Scrolls IV: Oblivion",
      datum_uitgifte: "Mar 20, 2006",
      korte_omschrijving: "Explore the open world of Cyrodiil in this epic RPG. Join guilds, battle demons, and shape your destiny through quests and character progression. Oblivion’s depth and freedom are unmatched. [Bethesda Game Studios]",
      score: "94"
    },
    {
      positie: "4",
      titel: "Okami",
      datum_uitgifte: "Sep 19, 2006",
      korte_omschrijving: "As Amaterasu, a sun goddess wolf, restore a vibrant world using celestial brush techniques. This artistic action-adventure blends mythology, puzzles, and stunning visuals in a unique masterpiece. [Clover Studio]",
      score: "93"
    },
    {
      positie: "5",
      titel: "Final Fantasy XII",
      datum_uitgifte: "Oct 31, 2006",
      korte_omschrijving: "Explore Ivalice as Vaan in a political epic. With an open world, active-time battle system, and a gambit system for AI control, Final Fantasy XII redefined the series’ RPG formula. [Square Enix]",
      score: "92"
    },
    {
      positie: "6",
      titel: "Wii Sports",
      datum_uitgifte: "Nov 19, 2006",
      korte_omschrijving: "Play tennis, bowling, golf, baseball, and boxing with intuitive motion controls. This accessible sports game brought families together and showcased the Wii’s revolutionary gameplay. [Nintendo]",
      score: "89"
    },
    {
      positie: "7",
      titel: "Dead Rising",
      datum_uitgifte: "Aug 8, 2006",
      korte_omschrijving: "As photojournalist Frank West, survive a zombie-infested mall for 72 hours. Use anything as a weapon, from bats to lawnmowers, in this chaotic, open-ended action game. [Capcom]",
      score: "88"
    },
    {
      positie: "8",
      titel: "Bully",
      datum_uitgifte: "Oct 17, 2006",
      korte_omschrijving: "As Jimmy Hopkins, navigate the social hierarchy of a boarding school. Engage in pranks, fights, and classes in this open-world adventure with Rockstar’s signature humor and storytelling. [Rockstar Vancouver]",
      score: "87"
    },
    {
      positie: "9",
      titel: "Company of Heroes",
      datum_uitgifte: "Sep 12, 2006",
      korte_omschrijving: "Command WWII troops in this tactical RTS. Control resources, build bases, and lead squads through dynamic battlefields. With intense campaigns and multiplayer, it’s a strategy classic. [Relic Entertainment]",
      score: "87"
    },
    {
      positie: "10",
      titel: "Viva Piñata",
      datum_uitgifte: "Nov 9, 2006",
      korte_omschrijving: "Create a vibrant garden to attract and manage colorful piñata creatures. This charming sim blends creativity, strategy, and whimsy in a unique life-management experience. [Rare Ltd.]",
      score: "85"
    }
  ],
  2007: [
    {
      positie: "1",
      titel: "BioShock",
      datum_uitgifte: "Aug 21, 2007",
      korte_omschrijving: "Explore the underwater city of Rapture as Jack, uncovering its dark secrets. With plasmids, weapons, and moral choices, BioShock blends FPS action with a gripping narrative and art deco atmosphere. [2K Boston]",
      score: "96"
    },
    {
      positie: "2",
      titel: "Super Mario Galaxy",
      datum_uitgifte: "Nov 12, 2007",
      korte_omschrijving: "Mario soars through space, exploring planetoids with unique gravity mechanics. With stunning visuals, creative levels, and tight platforming, Galaxy redefined 3D Mario adventures. [Nintendo]",
      score: "95"
    },
    {
      positie: "3",
      titel: "Call of Duty 4: Modern Warfare",
      datum_uitgifte: "Nov 5, 2007",
      korte_omschrijving: "Fight in modern battlefields with intense FPS action. The gripping campaign and addictive multiplayer, with perks and killstreaks, made Modern Warfare a genre-defining blockbuster. [Infinity Ward]",
      score: "94"
    },
    {
      positie: "4",
      titel: "The Orange Box",
      datum_uitgifte: "Oct 10, 2007",
      korte_omschrijving: "A legendary bundle featuring Half-Life 2, its episodes, Portal, and Team Fortress 2. From physics-based puzzles to innovative multiplayer, The Orange Box is a landmark in gaming. [Valve]",
      score: "94"
    },
    {
      positie: "5",
      titel: "Mass Effect",
      datum_uitgifte: "Nov 20, 2007",
      korte_omschrijving: "As Commander Shepard, explore a vast sci-fi universe, making choices that shape the galaxy. With deep RPG mechanics, rich dialogue, and epic storytelling, Mass Effect launched a beloved trilogy. [BioWare]",
      score: "91"
    },
    {
      positie: "6",
      titel: "Rock Band",
      datum_uitgifte: "Nov 20, 2007",
      korte_omschrijving: "Form a band and play guitar, drums, or sing in this rhythm game. With a massive song library and multiplayer fun, Rock Band brought music gaming to new heights. [Harmonix]",
      score: "90"
    },
    {
      positie: "7",
      titel: "Uncharted: Drake’s Fortune",
      datum_uitgifte: "Nov 19, 2007",
      korte_omschrijving: "As Nathan Drake, hunt for treasure in a cinematic action-adventure. With fluid platforming, shooting, and a charismatic story, Uncharted launched a blockbuster franchise. [Naughty Dog]",
      score: "89"
    },
    {
      positie: "8",
      titel: "Crysis",
      datum_uitgifte: "Nov 13, 2007",
      korte_omschrijving: "Wield a nanosuit with superhuman abilities in this visually stunning FPS. Fight aliens and soldiers in an open jungle environment, pushing PC hardware to its limits. [Crytek]",
      score: "88"
    },
    {
      positie: "9",
      titel: "World in Conflict",
      datum_uitgifte: "Sep 18, 2007",
      korte_omschrijving: "Lead forces in an alternate Cold War RTS where the USSR invades the West. With tactical depth, destructible environments, and intense multiplayer, it’s a strategy standout. [Massive Entertainment]",
      score: "87"
    },
    {
      positie: "10",
      titel: "Forza Motorsport 2",
      datum_uitgifte: "May 29, 2007",
      korte_omschrijving: "Race with realistic physics and over 300 cars on iconic tracks. With deep customization, online racing, and stunning visuals, Forza 2 solidified the series’ reputation. [Turn 10 Studios]",
      score: "86"
    }
  ],
  2008: [
    {
      positie: "1",
      titel: "Grand Theft Auto IV",
      datum_uitgifte: "Apr 29, 2008",
      korte_omschrijving: "As Niko Bellic, chase the American Dream in Liberty City. With a massive open world, gripping story, and robust multiplayer, GTA IV pushed storytelling and freedom to new heights. [Rockstar North]",
      score: "98"
    },
    {
      positie: "2",
      titel: "Metal Gear Solid 4: Guns of the Patriots",
      datum_uitgifte: "Jun 12, 2008",
      korte_omschrijving: "Solid Snake’s final mission delivers a cinematic stealth epic. With advanced stealth mechanics, emotional storytelling, and cutting-edge visuals, MGS4 concludes the saga masterfully. [Konami]",
      score: "94"
    },
    {
      positie: "3",
      titel: "Fallout 3",
      datum_uitgifte: "Oct 28, 2008",
      korte_omschrijving: "Explore a post-apocalyptic Washington, D.C., in this open-world RPG. Make choices that shape the wasteland, engage in FPS/RPG combat, and uncover a rich, immersive story. [Bethesda Game Studios]",
      score: "93"
    },
    {
      positie: "4",
      titel: "Braid",
      datum_uitgifte: "Aug 6, 2008",
      korte_omschrijving: "Manipulate time to solve puzzles in this indie platformer. With painterly visuals and a heartfelt story, Braid’s innovative mechanics and emotional depth made it a landmark title. [Number None]",
      score: "93"
    },
    {
      positie: "5",
      titel: "Left 4 Dead",
      datum_uitgifte: "Nov 18, 2008",
      korte_omschrijving: "Team up to survive zombie hordes in this co-op FPS. With dynamic AI Director and intense multiplayer, Left 4 Dead delivers relentless, replayable chaos. [Valve]",
      score: "89"
    },
    {
      positie: "6",
      titel: "Dead Space",
      datum_uitgifte: "Oct 13, 2008",
      korte_omschrijving: "As engineer Isaac Clarke, survive a necromorph-infested spaceship. With strategic dismemberment combat and a chilling atmosphere, Dead Space redefined sci-fi horror. [EA Redwood Shores]",
      score: "89"
    },
    {
      positie: "7",
      titel: "Gears of War 2",
      datum_uitgifte: "Nov 7, 2008",
      korte_omschrijving: "Marcus Fenix battles deeper into the Locust war. With improved cover mechanics, larger battles, and emotional storytelling, Gears 2 amplifies the series’ intensity. [Epic Games]",
      score: "88"
    },
    {
      positie: "8",
      titel: "LittleBigPlanet",
      datum_uitgifte: "Oct 27, 2008",
      korte_omschrijving: "Create and share levels in this charming platformer. As Sackboy, navigate imaginative worlds and use intuitive tools to craft your own. LittleBigPlanet sparked a creative revolution. [Media Molecule]",
      score: "88"
    },
    {
      positie: "9",
      titel: "Burnout Paradise",
      datum_uitgifte: "Jan 22, 2008",
      korte_omschrijving: "Race and crash in the open world of Paradise City. With seamless online integration, spectacular takedowns, and endless events, Burnout Paradise is arcade racing perfection. [Criterion Games]",
      score: "87"
    },
    {
      positie: "10",
      titel: "Persona 4",
      datum_uitgifte: "Jul 10, 2008",
      korte_omschrijving: "Investigate murders in a rural town as a high schooler. Blend dungeon-crawling RPG mechanics with social sim elements, forging bonds to unlock powers. Persona 4’s story captivates. [Atlus]",
      score: "86"
    }
  ],
  2009: [
    {
      positie: "1",
      titel: "Uncharted 2: Among Thieves",
      datum_uitgifte: "Oct 13, 2009",
      korte_omschrijving: "Nathan Drake hunts for Marco Polo’s lost treasure in this cinematic action-adventure. With breathtaking set pieces, tight gunplay, and multiplayer, Uncharted 2 set a new bar for storytelling. [Naughty Dog]",
      score: "96"
    },
    {
      positie: "2",
      titel: "Batman: Arkham Asylum",
      datum_uitgifte: "Aug 25, 2009",
      korte_omschrijving: "As Batman, explore Arkham Asylum to stop the Joker’s chaos. With stealth, combat, and detective mechanics, this superhero game delivers a gripping, immersive experience. [Rocksteady Studios]",
      score: "92"
    },
    {
      positie: "3",
      titel: "Call of Duty: Modern Warfare 2",
      datum_uitgifte: "Nov 10, 2009",
      korte_omschrijving: "Fight global threats in an explosive campaign and refined multiplayer. With iconic missions, new perks, and intense action, Modern Warfare 2 cemented Call of Duty’s dominance. [Infinity Ward]",
      score: "92"
    },
    {
      positie: "4",
      titel: "Assassin’s Creed II",
      datum_uitgifte: "Nov 17, 2009",
      korte_omschrijving: "As Ezio Auditore, explore Renaissance Italy in this open-world adventure. With improved stealth, parkour, and a rich story of revenge, Assassin’s Creed II redefined the series. [Ubisoft Montreal]",
      score: "91"
    },
    {
      positie: "5",
      titel: "Dragon Age: Origins",
      datum_uitgifte: "Nov 3, 2009",
      korte_omschrijving: "In a dark fantasy world, lead a party to stop a demonic Blight. With deep RPG mechanics, moral choices, and epic storytelling, Dragon Age: Origins is a BioWare classic. [BioWare]",
      score: "91"
    },
    {
      positie: "6",
      titel: "Left 4 Dead 2",
      datum_uitgifte: "Nov 17, 2009",
      korte_omschrijving: "Survive new zombie campaigns with enhanced weapons and melee combat. The AI Director keeps co-op chaos fresh, making Left 4 Dead 2 a thrilling multiplayer experience. [Valve]",
      score: "89"
    },
    {
      positie: "7",
      titel: "Demon’s Souls",
      datum_uitgifte: "Feb 5, 2009",
      korte_omschrijving: "Explore Boletaria in this punishing action RPG. With brutal difficulty, deep combat, and interconnected worlds, Demon’s Souls pioneered the Soulslike genre with its haunting atmosphere. [FromSoftware]",
      score: "89"
    },
    {
      positie: "8",
      titel: "Borderlands",
      datum_uitgifte: "Oct 20, 2009",
      korte_omschrijving: "Loot and shoot on the planet Pandora in this co-op FPS/RPG hybrid. With billions of guns, vibrant visuals, and chaotic multiplayer, Borderlands kicked off a beloved series. [Gearbox Software]",
      score: "88"
    },
    {
      positie: "9",
      titel: "Forza Motorsport 3",
      datum_uitgifte: "Oct 27, 2009",
      korte_omschrijving: "Race over 400 cars on iconic tracks with stunning realism. With improved physics, extensive customization, and online racing, Forza 3 is a pinnacle of racing simulation. [Turn 10 Studios]",
      score: "87"
    },
    {
      positie: "10",
      titel: "New Super Mario Bros. Wii",
      datum_uitgifte: "Nov 15, 2009",
      korte_omschrijving: "Mario returns to 2D platforming with co-op chaos for up to four players. Navigate classic levels, collect power-ups, and tackle Bowser in this accessible, fun adventure. [Nintendo]",
      score: "87"
 
    }
  ],


  2010: [
    {
      positie: "1",
      titel: "Super Mario Galaxy 2",
      datum_uitgifte: "May 23, 2010",
      korte_omschrijving: "Mario embarks on another cosmic adventure, exploring inventive planetoids with new power-ups like the Cloud Suit. With tighter controls, creative levels, and Yoshi as a companion, Galaxy 2 refines its predecessor’s 3D platforming brilliance. [Nintendo]",
      score: "97"
    },
    {
      positie: "2",
      titel: "Mass Effect 2",
      datum_uitgifte: "Jan 26, 2010",
      korte_omschrijving: "Commander Shepard unites a diverse team to stop the Collectors in this sci-fi RPG epic. With refined combat, deep character relationships, and impactful choices, Mass Effect 2 elevates storytelling in games. [BioWare]",
      score: "96"
    },
    {
      positie: "3",
      titel: "Red Dead Redemption",
      datum_uitgifte: "May 18, 2010",
      korte_omschrijving: "As John Marston, a former outlaw, hunt down your old gang in a sprawling Wild West open world. With a cinematic story, immersive exploration, and multiplayer, Red Dead Redemption is a Western masterpiece. [Rockstar San Diego]",
      score: "95"
    },
    {
      positie: "4",
      titel: "Rock Band 3",
      datum_uitgifte: "Oct 26, 2010",
      korte_omschrijving: "Jam with new instruments like keyboards and pro-mode guitar in this rhythm game. With an expansive song library and refined multiplayer, Rock Band 3 perfects the band experience. [Harmonix]",
      score: "93"
    },
    {
      positie: "5",
      titel: "God of War III",
      datum_uitgifte: "Mar 16, 2010",
      korte_omschrijving: "Kratos seeks vengeance against the gods of Olympus in this epic action game. With brutal combat, massive boss battles, and stunning visuals, God of War III concludes the trilogy with grandeur. [Santa Monica Studio]",
      score: "92"
    },
    {
      positie: "6",
      titel: "Xenoblade Chronicles",
      datum_uitgifte: "Jun 10, 2010",
      korte_omschrijving: "Explore a vast world on the backs of two titans in this ambitious JRPG. With a real-time combat system, deep story, and sprawling environments, Xenoblade Chronicles is a genre standout. [Monolith Soft]",
      score: "92"
    },
    {
      positie: "7",
      titel: "Civilization V",
      datum_uitgifte: "Sep 21, 2010",
      korte_omschrijving: "Lead a civilization from the Stone Age to the future in this turn-based strategy epic. With new hex-based maps, streamlined mechanics, and deep diplomacy, Civ V redefines empire-building. [Firaxis Games]",
      score: "90"
    },
    {
      positie: "8",
      titel: "StarCraft II: Wings of Liberty",
      datum_uitgifte: "Jul 27, 2010",
      korte_omschrijving: "Command Terrans, Zerg, or Protoss in this sci-fi RTS masterpiece. With a gripping campaign, competitive multiplayer, and refined mechanics, StarCraft II became an esports legend. [Blizzard Entertainment]",
      score: "90"
    },
    {
      positie: "9",
      titel: "Limbo",
      datum_uitgifte: "Jul 21, 2010",
      korte_omschrijving: "Navigate a haunting monochrome world as a boy searching for his sister. This indie platformer blends eerie atmosphere, clever puzzles, and minimalist storytelling into a gripping experience. [Playdead]",
      score: "88"
    },
    {
      positie: "10",
      titel: "Fallout: New Vegas",
      datum_uitgifte: "Oct 19, 2010",
      korte_omschrijving: "Explore a post-apocalyptic Mojave Desert in this open-world RPG. With branching quests, faction dynamics, and deep role-playing, New Vegas delivers a rich, player-driven story. [Obsidian Entertainment]",
      score: "87"
    }
  ],
  2011: [
    {
      positie: "1",
      titel: "The Elder Scrolls V: Skyrim",
      datum_uitgifte: "Nov 11, 2011",
      korte_omschrijving: "As the Dragonborn, explore the vast world of Skyrim in this epic RPG. Battle dragons, join factions, and shape your destiny in a boundless open world filled with quests and secrets. [Bethesda Game Studios]",
      score: "96"
    },
    {
      positie: "2",
      titel: "Batman: Arkham City",
      datum_uitgifte: "Oct 18, 2011",
      korte_omschrijving: "Batman navigates the sprawling Arkham City to stop villains like the Joker. With expanded stealth, combat, and exploration, this superhero sequel delivers a darker, richer experience. [Rocksteady Studios]",
      score: "94"
    },
    {
      positie: "3",
      titel: "Portal 2",
      datum_uitgifte: "Apr 19, 2011",
      korte_omschrijving: "Solve mind-bending puzzles with the portal gun in Aperture Science’s labs. With witty writing, co-op gameplay, and innovative mechanics, Portal 2 is a puzzle masterpiece. [Valve]",
      score: "94"
    },
    {
      positie: "4",
      titel: "The Legend of Zelda: Skyward Sword",
      datum_uitgifte: "Nov 20, 2011",
      korte_omschrijving: "As Link, soar through the skies and explore ancient lands to save Zelda. With motion-based swordplay and a heartfelt story, Skyward Sword redefines Zelda’s origins. [Nintendo]",
      score: "93"
    },
    {
      positie: "5",
      titel: "Uncharted 3: Drake’s Deception",
      datum_uitgifte: "Nov 1, 2011",
      korte_omschrijving: "Nathan Drake searches for a lost city in this cinematic action-adventure. With thrilling set pieces, refined combat, and multiplayer, Uncharted 3 pushes the series’ spectacle further. [Naughty Dog]",
      score: "92"
    },
    {
      positie: "6",
      titel: "Dark Souls",
      datum_uitgifte: "Sep 22, 2011",
      korte_omschrijving: "Explore a punishing, interconnected world in this action RPG. With brutal difficulty, deep lore, and rewarding combat, Dark Souls redefined challenge and storytelling in games. [FromSoftware]",
      score: "89"
    },
    {
      positie: "7",
      titel: "Deus Ex: Human Revolution",
      datum_uitgifte: "Aug 23, 2011",
      korte_omschrijving: "As Adam Jensen, navigate a cyberpunk world with stealth, combat, and choices. This RPG blends deep storytelling and player freedom, reviving the Deus Ex legacy. [Eidos Montreal]",
      score: "89"
    },
    {
      positie: "8",
      titel: "L.A. Noire",
      datum_uitgifte: "May 17, 2011",
      korte_omschrijving: "As detective Cole Phelps, solve crimes in 1940s Los Angeles. With groundbreaking facial animations, interrogation mechanics, and an open-world, L.A. Noire blends noir storytelling with investigation. [Team Bondi]",
      score: "89"
    },
    {
      positie: "9",
      titel: "Forza Motorsport 4",
      datum_uitgifte: "Oct 11, 2011",
      korte_omschrijving: "Race over 500 cars with stunning realism and Kinect support. With expansive tracks, deep customization, and robust online, Forza 4 is a pinnacle of racing simulation. [Turn 10 Studios]",
      score: "88"
    },
    {
      positie: "10",
      titel: "Gears of War 3",
      datum_uitgifte: "Sep 20, 2011",
      korte_omschrijving: "Marcus Fenix battles to save humanity in this epic conclusion. With refined cover-based combat, emotional storytelling, and expanded multiplayer, Gears 3 delivers a thrilling finale. [Epic Games]",
      score: "88"
    }
  ],
  2012: [
    {
      positie: "1",
      titel: "Journey",
      datum_uitgifte: "Mar 13, 2012",
      korte_omschrijving: "Glide through a mystical desert as a robed figure in this indie masterpiece. With minimalist storytelling, emotional multiplayer, and stunning visuals, Journey is a transcendent experience. [Thatgamecompany]",
      score: "92"
    },
    {
      positie: "2",
      titel: "The Walking Dead",
      datum_uitgifte: "Apr 24, 2012",
      korte_omschrijving: "Follow Lee and Clementine in this emotional narrative-driven adventure. With tough choices, deep characters, and a gripping story, The Walking Dead redefined episodic gaming. [Telltale Games]",
      score: "92"
    },
    {
      positie: "3",
      titel: "Mass Effect 3",
      datum_uitgifte: "Mar 6, 2012",
      korte_omschrijving: "Commander Shepard unites the galaxy against Reapers in this sci-fi RPG finale. With refined combat, deep choices, and multiplayer, Mass Effect 3 delivers an epic conclusion. [BioWare]",
      score: "91"
    },
    {
      positie: "4",
      titel: "Borderlands 2",
      datum_uitgifte: "Sep 18, 2012",
      korte_omschrijving: "Return to Pandora for chaotic co-op looting and shooting. With new vault hunters, billions of guns, and a witty villain, Borderlands 2 amplifies the series’ addictive chaos. [Gearbox Software]",
      score: "91"
    },
    {
      positie: "5",
      titel: "Far Cry 3",
      datum_uitgifte: "Dec 4, 2012",
      korte_omschrijving: "As Jason Brody, survive a tropical island ruled by a psychotic warlord. With open-world exploration, stealth, and intense combat, Far Cry 3 redefined the series’ action formula. [Ubisoft Montreal]",
      score: "90"
    },
    {
      positie: "6",
      titel: "Dishonored",
      datum_uitgifte: "Oct 9, 2012",
      korte_omschrijving: "As Corvo, a supernatural assassin, seek revenge in a steampunk city. With flexible stealth, combat, and powers, Dishonored offers unparalleled player choice and immersive world-building. [Arkane Studios]",
      score: "89"
    },
    {
      positie: "7",
      titel: "XCOM: Enemy Unknown",
      datum_uitgifte: "Oct 9, 2012",
      korte_omschrijving: "Lead a squad against an alien invasion in this turn-based strategy revival. With base management, permadeath, and tactical combat, XCOM delivers intense, strategic thrills. [Firaxis Games]",
      score: "89"
    },
    {
      positie: "8",
      titel: "Mark of the Ninja",
      datum_uitgifte: "Sep 7, 2012",
      korte_omschrijving: "Sneak through shadows as a ninja in this indie stealth gem. With tight mechanics, stylish visuals, and player-driven stealth, Mark of the Ninja is a 2D masterpiece. [Klei Entertainment]",
      score: "88"
    },
    {
      positie: "9",
      titel: "Halo 4",
      datum_uitgifte: "Nov 6, 2012",
      korte_omschrijving: "Master Chief faces a new threat on the planet Requiem. With a darker story, refined multiplayer, and stunning visuals, Halo 4 marks a bold new chapter for the series. [343 Industries]",
      score: "87"
    },
    {
      positie: "10",
      titel: "Assassin’s Creed III",
      datum_uitgifte: "Oct 30, 2012",
      korte_omschrijving: "As Connor, fight in the American Revolution in this open-world adventure. With naval combat, parkour, and a sprawling story, Assassin’s Creed III expands the series’ scope. [Ubisoft Montreal]",
      score: "86"
    }
  ],
  2013: [
    {
      positie: "1",
      titel: "The Last of Us",
      datum_uitgifte: "Jun 14, 2013",
      korte_omschrijving: "Join Joel and Ellie in a post-apocalyptic journey across America. With emotional storytelling, intense stealth-action, and deep characters, The Last of Us is a narrative masterpiece. [Naughty Dog]",
      score: "95"
    },
    {
      positie: "2",
      titel: "Grand Theft Auto V",
      datum_uitgifte: "Sep 17, 2013",
      korte_omschrijving: "Switch between three protagonists in Los Santos for heists and chaos. With a massive open world, gripping story, and robust online mode, GTA V redefined open-world gaming. [Rockstar North]",
      score: "95"
    },
    {
      positie: "3",
      titel: "BioShock Infinite",
      datum_uitgifte: "Mar 26, 2013",
      korte_omschrijving: "As Booker DeWitt, rescue Elizabeth from the floating city of Columbia. With mind-bending storytelling, vibrant combat, and a rich world, BioShock Infinite is a narrative triumph. [Irrational Games]",
      score: "94"
    },
    {
      positie: "4",
      titel: "Super Mario 3D World",
      datum_uitgifte: "Nov 22, 2013",
      korte_omschrijving: "Mario and friends explore vibrant 3D levels with new power-ups like the Cat Suit. With co-op gameplay, creative stages, and tight platforming, 3D World is a joyous adventure. [Nintendo]",
      score: "93"
    },
    {
      positie: "5",
      titel: "The Legend of Zelda: A Link Between Worlds",
      datum_uitgifte: "Nov 22, 2013",
      korte_omschrijving: "Link explores Hyrule and Lorule with a new wall-merging ability. This top-down Zelda blends classic gameplay with fresh mechanics and a nostalgic world. [Nintendo]",
      score: "91"
    },
    {
      positie: "6",
      titel: "Tomb Raider",
      datum_uitgifte: "Mar 5, 2013",
      korte_omschrijving: "Follow Lara Croft’s origin as she survives a hostile island. With cinematic action, exploration, and a gripping story, this reboot revitalizes the Tomb Raider franchise. [Crystal Dynamics]",
      score: "87"
    },
    {
      positie: "7",
      titel: "Assassin’s Creed IV: Black Flag",
      datum_uitgifte: "Oct 29, 2013",
      korte_omschrijving: "As pirate Edward Kenway, sail the Caribbean in this open-world adventure. With naval combat, exploration, and stealth, Black Flag delivers a swashbuckling high point for the series. [Ubisoft Montreal]",
      score: "87"
    },
    {
      positie: "8",
      titel: "Brothers: A Tale of Two Sons",
      datum_uitgifte: "Aug 7, 2013",
      korte_omschrijving: "Control two brothers simultaneously in this emotional adventure. With unique co-op mechanics, heartfelt storytelling, and a beautiful world, Brothers is an indie gem. [Starbreeze Studios]",
      score: "86"
    },
    {
      positie: "9",
      titel: "Metro: Last Light",
      datum_uitgifte: "May 14, 2013",
      korte_omschrijving: "As Artyom, survive a post-apocalyptic Moscow in this atmospheric FPS. With stealth, combat, and a gripping story, Metro: Last Light blends horror and action masterfully. [4A Games]",
      score: "85"
    },
    {
      positie: "10",
      titel: "Fire Emblem: Awakening",
      datum_uitgifte: "Feb 4, 2013",
      korte_omschrijving: "Lead Chrom and the Shepherds in tactical RPG battles. With deep strategy, character relationships, and a compelling story, Awakening revitalized the Fire Emblem series. [Intelligent Systems]",
      score: "85"
    }
  ],
  2014: [
    {
      positie: "1",
      titel: "Super Smash Bros. for Wii U",
      datum_uitgifte: "Nov 21, 2014",
      korte_omschrijving: "Nintendo’s iconic characters battle in this chaotic fighting game. With a huge roster, polished mechanics, and online play, Smash Bros. for Wii U is a multiplayer masterpiece. [Bandai Namco]",
      score: "92"
    },
    {
      positie: "2",
      titel: "Dragon Age: Inquisition",
      datum_uitgifte: "Nov 18, 2014",
      korte_omschrijving: "As the Inquisitor, unite Thedas against a demonic threat in this epic RPG. With a vast open world, deep combat, and impactful choices, Inquisition is a BioWare triumph. [BioWare]",
      score: "89"
    },
    {
      positie: "3",
      titel: "Bayonetta 2",
      datum_uitgifte: "Oct 24, 2014",
      korte_omschrijving: "Witch Bayonetta battles angels with stylish, fast-paced combat. With new weapons, co-op modes, and stunning visuals, Bayonetta 2 is an action game masterpiece. [PlatinumGames]",
      score: "89"
    },
    {
      positie: "4",
      titel: "Dark Souls II",
      datum_uitgifte: "Mar 11, 2014",
      korte_omschrijving: "Explore Drangleic in this punishing action RPG sequel. With refined combat, vast interconnected worlds, and brutal difficulty, Dark Souls II expands the Soulslike formula. [FromSoftware]",
      score: "88"
    },
    {
      positie: "5",
      titel: "Mario Kart 8",
      datum_uitgifte: "May 30, 2014",
      korte_omschrijving: "Race through gravity-defying tracks with Mario and friends. With stunning visuals, tight controls, and robust online play, Mario Kart 8 is a kart racing pinnacle. [Nintendo]",
      score: "88"
    },
    {
      positie: "6",
      titel: "Middle-earth: Shadow of Mordor",
      datum_uitgifte: "Sep 30, 2014",
      korte_omschrijving: "As ranger Talion, battle orcs in Mordor with the innovative Nemesis System. With fluid combat, stealth, and a dynamic world, Shadow of Mordor is a Tolkien triumph. [Monolith Productions]",
      score: "87"
    },
    {
      positie: "7",
      titel: "Hearthstone",
      datum_uitgifte: "Mar 11, 2014",
      korte_omschrijving: "Build decks and battle opponents in this digital card game set in the Warcraft universe. With strategic depth, accessibility, and constant updates, Hearthstone became a global phenomenon. [Blizzard Entertainment]",
      score: "86"
    },
    {
      positie: "8",
      titel: "Destiny",
      datum_uitgifte: "Sep 9, 2014",
      korte_omschrijving: "As a Guardian, defend Earth in this shared-world FPS. With loot-driven gameplay, raids, and multiplayer, Destiny blends shooting and MMO elements in a sci-fi epic. [Bungie]",
      score: "86"
    },
    {
      positie: "9",
      titel: "Alien: Isolation",
      datum_uitgifte: "Oct 7, 2014",
      korte_omschrijving: "As Amanda Ripley, survive a xenomorph on a derelict space station. With tense stealth, immersive atmosphere, and unpredictable AI, Alien: Isolation is a horror masterpiece. [Creative Assembly]",
      score: "85"
    },
    {
      positie: "10",
      titel: "Shovel Knight",
      datum_uitgifte: "Jun 26, 2014",
      korte_omschrijving: "Wield a shovel in this retro-inspired platformer. With tight controls, charming pixel art, and challenging levels, Shovel Knight is a love letter to classic 8-bit games. [Yacht Club Games]",
      score: "85"
    }
  ],
  2015: [
    {
      positie: "1",
      titel: "The Witcher 3: Wild Hunt",
      datum_uitgifte: "May 19, 2015",
      korte_omschrijving: "As Geralt of Rivia, hunt monsters in a vast, war-torn open world. With deep RPG mechanics, rich storytelling, and breathtaking visuals, The Witcher 3 is a genre-defining epic. [CD Projekt Red]",
      score: "94"
    },
    {
      positie: "2",
      titel: "Bloodborne",
      datum_uitgifte: "Mar 24, 2015",
      korte_omschrijving: "Hunt beasts in the gothic city of Yharnam in this action RPG. With fast-paced combat, haunting atmosphere, and brutal difficulty, Bloodborne is a Soulslike masterpiece. [FromSoftware]",
      score: "92"
    },
    {
      positie: "3",
      titel: "Metal Gear Solid V: The Phantom Pain",
      datum_uitgifte: "Sep 1, 2015",
      korte_omschrijving: "As Big Boss, build a mercenary army in an open-world stealth epic. With unparalleled freedom, dynamic missions, and deep mechanics, Phantom Pain redefines stealth-action. [Kojima Productions]",
      score: "91"
    },
    {
      positie: "4",
      titel: "Fallout 4",
      datum_uitgifte: "Nov 10, 2015",
      korte_omschrijving: "Explore a post-apocalyptic Boston in this open-world RPG. With crafting, base-building, and a vast world, Fallout 4 blends exploration and combat in a rich wasteland. [Bethesda Game Studios]",
      score: "89"
    },
    {
      positie: "5",
      titel: "Rocket League",
      datum_uitgifte: "Jul 7, 2015",
      korte_omschrijving: "Play soccer with rocket-powered cars in this addictive multiplayer game. With tight controls, fast-paced matches, and esports appeal, Rocket League is a unique sports phenomenon. [Psyonix]",
      score: "88"
    },
    {
      positie: "6",
      titel: "Undertale",
      datum_uitgifte: "Sep 15, 2015",
      korte_omschrijving: "Explore an underground world of monsters in this indie RPG. With choices to fight or befriend, witty writing, and a memorable soundtrack, Undertale is a heartfelt gem. [Toby Fox]",
      score: "88"
    },
    {
      positie: "7",
      titel: "Batman: Arkham Knight",
      datum_uitgifte: "Jun 23, 2015",
      korte_omschrijving: "Batman faces the Scarecrow and the mysterious Arkham Knight in Gotham. With the Batmobile, expansive combat, and a dark story, Arkham Knight concludes the trilogy. [Rocksteady Studios]",
      score: "87"
    },
    {
      positie: "8",
      titel: "Ori and the Blind Forest",
      datum_uitgifte: "Mar 11, 2015",
      korte_omschrijving: "Guide Ori through a stunning forest in this metroidvania platformer. With fluid movement, emotional storytelling, and gorgeous visuals, Ori is an indie masterpiece. [Moon Studios]",
      score: "86"
    },
    {
      positie: "9",
      titel: "Splatoon",
      datum_uitgifte: "May 29, 2015",
      korte_omschrijving: "Splat ink and battle in this colorful multiplayer shooter. With unique mechanics, vibrant style, and team-based chaos, Splatoon reinvents the shooter genre. [Nintendo]",
      score: "86"
    },
    {
      positie: "10",
      titel: "Until Dawn",
      datum_uitgifte: "Aug 25, 2015",
      korte_omschrijving: "Make life-or-death choices in this interactive horror adventure. With a branching narrative, cinematic presentation, and tense atmosphere, Until Dawn is a gripping thriller. [Supermassive Games]",
      score: "85"
    }
  ],
  2016: [
    {
      positie: "1",
      titel: "Uncharted 4: A Thief’s End",
      datum_uitgifte: "May 10, 2016",
      korte_omschrijving: "Nathan Drake’s final adventure takes him on a global treasure hunt. With cinematic storytelling, breathtaking visuals, and refined gameplay, Uncharted 4 is a fitting finale. [Naughty Dog]",
      score: "93"
    },
    {
      positie: "2",
      titel: "Overwatch",
      datum_uitgifte: "May 24, 2016",
      korte_omschrijving: "Join a diverse roster of heroes in this team-based FPS. With vibrant characters, strategic gameplay, and polished multiplayer, Overwatch became an esports sensation. [Blizzard Entertainment]",
      score: "91"
    },
    {
      positie: "3",
      titel: "Dark Souls III",
      datum_uitgifte: "Mar 24, 2016",
      korte_omschrijving: "Return to Lothric in this brutal action RPG. With refined combat, interconnected worlds, and haunting atmosphere, Dark Souls III perfects the Soulslike formula. [FromSoftware]",
      score: "90"
    },
    {
      positie: "4",
      titel: "The Witness",
      datum_uitgifte: "Jan 26, 2016",
      korte_omschrijving: "Explore a mysterious island filled with intricate puzzles. With a beautiful open world and layered challenges, The Witness is a cerebral adventure from Jonathan Blow. [Thekla, Inc.]",
      score: "89"
    },
    {
      positie: "5",
      titel: "DOOM",
      datum_uitgifte: "May 13, 2016",
      korte_omschrijving: "Rip and tear demons as the Doom Slayer in this fast-paced FPS. With brutal combat, heavy metal vibes, and polished gameplay, DOOM reboots the classic with ferocity. [id Software]",
      score: "88"
    },
    {
      positie: "6",
      titel: "Titanfall 2",
      datum_uitgifte: "Oct 28, 2016",
      korte_omschrijving: "Pilot mechs and fight as a soldier in this fast-paced FPS. With a stellar campaign, fluid movement, and robust multiplayer, Titanfall 2 is an underrated gem. [Respawn Entertainment]",
      score: "88"
    },
    {
      positie: "7",
      titel: "Inside",
      datum_uitgifte: "Jun 29, 2016",
      korte_omschrijving: "Navigate a dystopian world as a boy in this haunting indie platformer. With minimalist storytelling, eerie atmosphere, and clever puzzles, Inside is a gripping experience. [Playdead]",
      score: "87"
    },
    {
      positie: "8",
      titel: "Dishonored 2",
      datum_uitgifte: "Nov 11, 2016",
      korte_omschrijving: "Play as Corvo or Emily in this stealth-action sequel. With expansive levels, creative powers, and player-driven choices, Dishonored 2 offers unmatched freedom. [Arkane Studios]",
      score: "87"
    },
    {
      positie: "9",
      titel: "Firewatch",
      datum_uitgifte: "Feb 9, 2016",
      korte_omschrijving: "As a fire lookout in Wyoming’s wilderness, uncover a mystery through radio conversations. With rich storytelling and a vibrant world, Firewatch is an intimate adventure. [Campo Santo]",
      score: "86"
    },
    {
      positie: "10",
      titel: "Final Fantasy XV",
      datum_uitgifte: "Nov 29, 2016",
      korte_omschrijving: "Join Noctis and his friends on a road trip across a vast open world. With real-time combat, a heartfelt story, and stunning visuals, Final Fantasy XV modernizes the series. [Square Enix]",
      score: "85"
    }
  ],
  2017: [
    {
      positie: "1",
      titel: "The Legend of Zelda: Breath of the Wild",
      datum_uitgifte: "Mar 3, 2017",
      korte_omschrijving: "Explore a vast, open-world Hyrule as Link in this revolutionary adventure. With dynamic systems, freedom of exploration, and stunning design, Breath of the Wild redefined open-world games. [Nintendo]",
      score: "97"
    },
    {
      positie: "2",
      titel: "Super Mario Odyssey",
      datum_uitgifte: "Oct 27, 2017",
      korte_omschrijving: "Mario explores vibrant kingdoms with Cappy, a sentient hat, in this 3D platformer. With creative levels, fluid mechanics, and boundless charm, Odyssey is a Mario masterpiece. [Nintendo]",
      score: "97"
    },
    {
      positie: "3",
      titel: "Persona 5",
      datum_uitgifte: "Apr 4, 2017",
      korte_omschrijving: "As a Phantom Thief, balance high school life and supernatural heists in Tokyo. With stylish visuals, deep RPG mechanics, and a gripping story, Persona 5 is a JRPG triumph. [Atlus]",
      score: "93"
    },
    {
      positie: "4",
      titel: "Horizon Zero Dawn",
      datum_uitgifte: "Feb 28, 2017",
      korte_omschrijving: "As Aloy, hunt robotic creatures in a lush, post-apocalyptic world. With a rich story, stunning visuals, and dynamic combat, Horizon Zero Dawn is an action-RPG standout. [Guerrilla Games]",
      score: "89"
    },
    {
      positie: "5",
      titel: "Divinity: Original Sin 2",
      datum_uitgifte: "Sep 14, 2017",
      korte_omschrijving: "Lead a party in a deep RPG with turn-based combat and player-driven choices. With co-op, rich storytelling, and flexible systems, Divinity: Original Sin 2 is a CRPG masterpiece. [Larian Studios]",
      score: "89"
    },
    {
      positie: "6",
      titel: "Cuphead",
      datum_uitgifte: "Sep 29, 2017",
      korte_omschrijving: "Battle cartoonish bosses in this run-and-gun indie game. With 1930s art, brutal difficulty, and tight mechanics, Cuphead is a visually stunning, challenging triumph. [Studio MDHR]",
      score: "88"
    },
    {
      positie: "7",
      titel: "What Remains of Edith Finch",
      datum_uitgifte: "Apr 25, 2017",
      korte_omschrijving: "Explore the tragic stories of the Finch family in this narrative adventure. With creative vignettes and emotional storytelling, Edith Finch is an indie storytelling gem. [Giant Sparrow]",
      score: "88"
    },
    {
      positie: "8",
      titel: "Nier: Automata",
      datum_uitgifte: "Mar 7, 2017",
      korte_omschrijving: "As androids 2B and 9S, fight machines in a philosophical action RPG. With fluid combat, a haunting story, and multiple endings, Nier: Automata is a unique masterpiece. [PlatinumGames]",
      score: "88"
    },
    {
      positie: "9",
      titel: "Resident Evil 7: Biohazard",
      datum_uitgifte: "Jan 24, 2017",
      korte_omschrijving: "Survive a creepy plantation as Ethan Winters in this first-person horror revival. With immersive atmosphere and intense scares, Resident Evil 7 reinvents the series. [Capcom]",
      score: "86"
    },
    {
      positie: "10",
      titel: "Splatoon 2",
      datum_uitgifte: "Jul 21, 2017",
      korte_omschrijving: "Splat ink in vibrant multiplayer battles with new weapons and modes. With fresh style, tight shooter mechanics, and online play, Splatoon 2 expands the inky chaos. [Nintendo]",
      score: "85"
    }
  ],
  2018: [
    {
      positie: "1",
      titel: "God of War",
      datum_uitgifte: "Apr 20, 2018",
      korte_omschrijving: "Kratos and his son Atreus journey through Norse mythology in this action epic. With emotional storytelling, breathtaking combat, and a rich world, God of War redefines the series. [Santa Monica Studio]",
      score: "94"
    },
    {
      positie: "2",
      titel: "Red Dead Redemption 2",
      datum_uitgifte: "Oct 26, 2018",
      korte_omschrijving: "As Arthur Morgan, live as an outlaw in a stunning open-world Wild West. With a gripping story, immersive exploration, and unparalleled detail, Red Dead Redemption 2 is a masterpiece. [Rockstar Games]",
      score: "94"
    },
    {
      positie: "3",
      titel: "Marvel’s Spider-Man",
      datum_uitgifte: "Sep 7, 2018",
      korte_omschrijving: "Swing through New York as Spider-Man in this open-world action game. With fluid combat, web-slinging, and a heartfelt story, Spider-Man captures the hero’s essence. [Insomniac Games]",
      score: "88"
    },
    {
      positie: "4",
      titel: "Celeste",
      datum_uitgifte: "Jan 25, 2018",
      korte_omschrijving: "Climb a mountain as Madeline in this indie platformer. With tight controls, heartfelt storytelling, and challenging levels, Celeste is a deeply moving experience. [Matt Makes Games]",
      score: "88"
    },
    {
      positie: "5",
      titel: "Monster Hunter: World",
      datum_uitgifte: "Jan 26, 2018",
      korte_omschrijving: "Hunt massive beasts in a vibrant open world with co-op gameplay. With deep combat, crafting, and a living ecosystem, Monster Hunter: World is a thrilling action RPG. [Capcom]",
      score: "87"
    },
    {
      positie: "6",
      titel: "Super Smash Bros. Ultimate",
      datum_uitgifte: "Dec 7, 2018",
      korte_omschrijving: "Every Smash character returns in this massive fighting game. With a huge roster, refined mechanics, and endless content, Ultimate is the definitive Smash experience. [Bandai Namco]",
      score: "87"
    },
    {
      positie: "7",
      titel: "Into the Breach",
      datum_uitgifte: "Feb 27, 2018",
      korte_omschrijving: "Command mechs in a turn-based strategy game to save Earth from aliens. With tight mechanics, time-travel twists, and replayability, Into the Breach is a tactical gem. [Subset Games]",
      score: "86"
    },
    {
      positie: "8",
      titel: "Dead Cells",
      datum_uitgifte: "Aug 7, 2018",
      korte_omschrijving: "Explore a roguelike-metroidvania castle with fluid combat and permadeath. With procedurally generated levels and tight mechanics, Dead Cells is an indie action standout. [Motion Twin]",
      score: "86"
    },
    {
      positie: "9",
      titel: "Assassin’s Creed Odyssey",
      datum_uitgifte: "Oct 5, 2018",
      korte_omschrijving: "Explore ancient Greece as a mercenary in this open-world RPG. With deep customization, branching choices, and epic battles, Odyssey expands the Assassin’s Creed formula. [Ubisoft Quebec]",
      score: "85"
    },
    {
      positie: "10",
      titel: "Return of the Obra Dinn",
      datum_uitgifte: "Oct 18, 2018",
      korte_omschrijving: "Investigate a ghost ship’s fate using a time-rewinding watch in this mystery game. With unique monochrome art and deductive puzzles, Obra Dinn is an indie masterpiece. [Lucas Pope]",
      score: "85"
    }
  ],
  2019: [
    {
      positie: "1",
      titel: "Sekiro: Shadows Die Twice",
      datum_uitgifte: "Mar 22, 2019",
      korte_omschrijving: "As a shinobi, seek revenge in feudal Japan in this action-adventure. With precise combat, stealth, and brutal difficulty, Sekiro refines the Soulslike formula with intensity. [FromSoftware]",
      score: "90"
    },
    {
      positie: "2",
      titel: "Resident Evil 2",
      datum_uitgifte: "Jan 25, 2019",
      korte_omschrijving: "Survive Raccoon City as Leon or Claire in this survival horror remake. With modern visuals, tense gameplay, and a gripping story, Resident Evil 2 redefines the classic. [Capcom]",
      score: "89"
    },
    {
      positie: "3",
      titel: "Disco Elysium",
      datum_uitgifte: "Oct 15, 2019",
      korte_omschrijving: "As a detective, solve a murder in a rich, narrative-driven RPG. With deep dialogue, player-driven choices, and a unique skill system, Disco Elysium is a storytelling triumph. [ZA/UM]",
      score: "89"
    },
    {
      positie: "4",
      titel: "The Legend of Zelda: Link’s Awakening",
      datum_uitgifte: "Sep 20, 2019",
      korte_omschrijving: "Explore Koholint Island in this charming remake of the classic Zelda. With updated visuals, dungeon creator, and classic gameplay, Link’s Awakening is a nostalgic gem. [Nintendo]",
      score: "88"
    },
    {
      positie: "5",
      titel: "Control",
      datum_uitgifte: "Aug 27, 2019",
      korte_omschrijving: "As Jesse Faden, explore a shifting supernatural building in this action-adventure. With telekinetic powers, a surreal world, and tight combat, Control is a mind-bending thriller. [Remedy Entertainment]",
      score: "87"
    },
    {
      positie: "6",
      titel: "Fire Emblem: Three Houses",
      datum_uitgifte: "Jul 26, 2019",
      korte_omschrijving: "Lead students in a tactical RPG with branching paths and deep relationships. With strategic combat and a rich story, Three Houses is a Fire Emblem standout. [Intelligent Systems]",
      score: "87"
    },
    {
      positie: "7",
      titel: "Outer Wilds",
      datum_uitgifte: "May 28, 2019",
      korte_omschrijving: "Explore a solar system trapped in a time loop in this open-world adventure. With clever puzzles, exploration, and a heartfelt story, Outer Wilds is an indie gem. [Mobius Digital]",
      score: "86"
    },
    {
      positie: "8",
      titel: "Apex Legends",
      datum_uitgifte: "Feb 4, 2019",
      korte_omschrijving: "Join squads in this fast-paced battle royale shooter. With unique legends, tight gunplay, and innovative respawn mechanics, Apex Legends redefined the genre. [Respawn Entertainment]",
      score: "86"
    },
    {
      positie: "9",
      titel: "Slay the Spire",
      datum_uitgifte: "Jan 23, 2019",
      korte_omschrijving: "Build a deck and battle through a roguelike tower in this card-based game. With strategic depth and replayability, Slay the Spire is an indie strategy classic. [MegaCrit]",
      score: "85"
    },
    {
      positie: "10",
      titel: "Death Stranding",
      datum_uitgifte: "Nov 8, 2019",
      korte_omschrijving: "As Sam Bridges, reconnect a fractured world by delivering cargo. With a unique traversal-based gameplay, cinematic story, and online elements, Death Stranding is a bold experiment. [Kojima Productions]",
      score: "85"
    }
  ],
  2020: [
    {
      positie: "1",
      titel: "The Last of Us Part II",
      datum_uitgifte: "Jun 19, 2020",
      korte_omschrijving: "Follow Ellie in a brutal, emotional post-apocalyptic journey. With intense combat, deep storytelling, and stunning visuals, The Last of Us Part II pushes narrative boundaries. [Naughty Dog]",
      score: "93"
    },
    {
      positie: "2",
      titel: "Hades",
      datum_uitgifte: "Sep 17, 2020",
      korte_omschrijving: "As Zagreus, escape the Underworld in this roguelike action game. With tight combat, dynamic runs, and a mythic story, Hades is an indie masterpiece with endless replayability. [Supergiant Games]",
      score: "93"
    },
    {
      positie: "3",
      titel: "Ghost of Tsushima",
      datum_uitgifte: "Jul 17, 2020",
      korte_omschrijving: "As Jin Sakai, defend Tsushima from Mongol invaders in this open-world samurai epic. With stunning visuals, fluid combat, and a rich story, Ghost of Tsushima captivates. [Sucker Punch Productions]",
      score: "88"
    },
    {
      positie: "4",
      titel: "Final Fantasy VII Remake",
      datum_uitgifte: "Apr 10, 2020",
      korte_omschrijving: "Revisit Midgar in this stunning remake of the classic RPG. With modern combat, expanded storytelling, and breathtaking visuals, FFVII Remake reimagines a beloved tale. [Square Enix]",
      score: "87"
    },
    {
      positie: "5",
      titel: "Animal Crossing: New Horizons",
      datum_uitgifte: "Mar 20, 2020",
      korte_omschrijving: "Build your island paradise in this relaxing life sim. With crafting, customization, and charming villagers, New Horizons became a global phenomenon during a challenging year. [Nintendo]",
      score: "87"
    },
    {
      positie: "6",
      titel: "DOOM Eternal",
      datum_uitgifte: "Mar 20, 2020",
      korte_omschrijving: "As the Doom Slayer, rip through demons in this fast-paced FPS sequel. With intense combat, platforming, and a metal soundtrack, DOOM Eternal amplifies the series’ chaos. [id Software]",
      score: "87"
    },
    {
      positie: "7",
      titel: "Ori and the Will of the Wisps",
      datum_uitgifte: "Mar 11, 2020",
      korte_omschrijving: "Guide Ori through a breathtaking metroidvania world. With fluid platforming, emotional storytelling, and stunning visuals, Will of the Wisps is a sequel done right. [Moon Studios]",
      score: "86"
    },
    {
      positie: "8",
      titel: "Yakuza: Like a Dragon",
      datum_uitgifte: "Nov 10, 2020",
      korte_omschrijving: "As Ichiban Kasuga, lead a new crew in a turn-based RPG. With a heartfelt story, vibrant Yokohama, and quirky combat, Like a Dragon reinvents the Yakuza series. [Ryu Ga Gotoku Studio]",
      score: "86"
    },
    {
      positie: "9",
      titel: "Spelunky 2",
      datum_uitgifte: "Sep 15, 2020",
      korte_omschrijving: "Explore procedurally generated caves in this punishing roguelike platformer. With deeper mechanics, new items, and brutal difficulty, Spelunky 2 builds on its indie legacy. [Mossmouth]",
      score: "85"
    },
    {
      positie: "10",
      titel: "Cyberpunk 2077",
      datum_uitgifte: "Dec 10, 2020",
      korte_omschrijving: "Explore Night City as V in this open-world RPG. With deep customization, branching choices, and a cyberpunk story, Cyberpunk 2077 offers a flawed but ambitious experience. [CD Projekt Red]",
      score: "85"
    }
  ],
  2021: [
    {
      positie: "1",
      titel: "It Takes Two",
      datum_uitgifte: "Mar 26, 2021",
      korte_omschrijving: "Play as a couple turned into dolls in this co-op action-adventure. With creative gameplay, heartfelt storytelling, and diverse challenges, It Takes Two is a cooperative masterpiece. [Hazelight Studios]",
      score: "89"
    },
    {
      positie: "2",
      titel: "Metroid Dread",
      datum_uitgifte: "Oct 8, 2021",
      korte_omschrijving: "Samus explores planet ZDR, hunted by deadly E.M.M.I. robots. With tight 2D gameplay, exploration, and modern visuals, Metroid Dread is a triumphant return for the series. [MercurySteam]",
      score: "88"
    },
    {
      positie: "3",
      titel: "Forza Horizon 5",
      datum_uitgifte: "Nov 9, 2021",
      korte_omschrijving: "Race through a vibrant open-world Mexico in this arcade racer. With stunning visuals, diverse biomes, and endless events, Forza Horizon 5 is a racing masterpiece. [Playground Games]",
      score: "88"
    },
    {
      positie: "4",
      titel: "Resident Evil Village",
      datum_uitgifte: "May 7, 2021",
      korte_omschrijving: "As Ethan Winters, face horrors in a creepy European village. With first-person action, varied enemies, and a gripping story, Village blends horror and action. [Capcom]",
      score: "87"
    },
    {
      positie: "5",
      titel: "Halo Infinite",
      datum_uitgifte: "Dec 8, 2021",
      korte_omschrijving: "Master Chief battles on Zeta Halo in this open-world FPS. With fluid combat, grappling hook traversal, and multiplayer, Halo Infinite revitalizes the franchise. [343 Industries]",
      score: "87"
    },
    {
      positie: "6",
      titel: "Ratchet & Clank: Rift Apart",
      datum_uitgifte: "Jun 11, 2021",
      korte_omschrijving: "Jump between dimensions with Ratchet and Rivet in this action-platformer. With stunning visuals, creative weapons, and fast-paced gameplay, Rift Apart showcases next-gen potential. [Insomniac Games]",
      score: "86"
    },
    {
      positie: "7",
      titel: "Deathloop",
      datum_uitgifte: "Sep 14, 2021",
      korte_omschrijving: "As Colt, break a time loop on Blackreef island in this stylish FPS. With creative powers, stealth, and dynamic gameplay, Deathloop is an innovative shooter. [Arkane Studios]",
      score: "86"
    },
    {
      positie: "8",
      titel: "Returnal",
      datum_uitgifte: "Apr 30, 2021",
      korte_omschrijving: "As Selene, survive a hostile alien planet in this roguelike shooter. With fast-paced combat, procedurally generated levels, and a mysterious story, Returnal is a thrilling challenge. [Housemarque]",
      score: "86"
    },
    {
      positie: "9",
      titel: "Psychonauts 2",
      datum_uitgifte: "Aug 25, 2021",
      korte_omschrijving: "As Raz, explore minds in this quirky platformer sequel. With creative levels, witty writing, and varied gameplay, Psychonauts 2 delivers a long-awaited triumph. [Double Fine Productions]",
      score: "85"
    },
    {
      positie: "10",
      titel: "Monster Hunter Rise",
      datum_uitgifte: "Mar 26, 2021",
      korte_omschrijving: "Hunt monsters in a vibrant world with new wirebug mechanics. With fluid combat, co-op gameplay, and portable design, Monster Hunter Rise refines the series’ formula. [Capcom]",
      score: "85"
    }
  ],
  2022: [
    {
      positie: "1",
      titel: "Elden Ring",
      datum_uitgifte: "Feb 25, 2022",
      korte_omschrijving: "Explore the Lands Between in this open-world action RPG. With FromSoftware’s signature difficulty, vast exploration, and deep lore, Elden Ring is a genre-defining masterpiece. [FromSoftware]",
      score: "96"
    },
    {
      positie: "2",
      titel: "God of War Ragnarök",
      datum_uitgifte: "Nov 9, 2022",
      korte_omschrijving: "Kratos and Atreus face Norse gods in this epic sequel. With emotional storytelling, refined combat, and a vast world, Ragnarök concludes the saga with grandeur. [Santa Monica Studio]",
      score: "94"
    },
    {
      positie: "3",
      titel: "Horizon Forbidden West",
      datum_uitgifte: "Feb 18, 2022",
      korte_omschrijving: "Aloy explores a vibrant, post-apocalyptic West in this action RPG. With stunning visuals, deep combat, and a rich story, Forbidden West expands Horizon’s world. [Guerrilla Games]",
      score: "89"
    },
    {
      positie: "4",
      titel: "Stray",
      datum_uitgifte: "Jul 19, 2022",
      korte_omschrijving: "Play as a cat in a neon-lit cybercity in this indie adventure. With charming exploration, puzzles, and a unique perspective, Stray is a heartfelt gem. [BlueTwelve Studio]",
      score: "88"
    },
    {
      positie: "5",
      titel: "A Plague Tale: Requiem",
      datum_uitgifte: "Oct 18, 2022",
      korte_omschrijving: "Amicia and Hugo flee plague-ridden France in this stealth-action sequel. With emotional storytelling, stunning visuals, and intense gameplay, Requiem is a gripping journey. [Asobo Studio]",
      score: "87"
    },
    {
      positie: "6",
      titel: "Tunic",
      datum_uitgifte: "Mar 16, 2022",
      korte_omschrijving: "As a fox, explore a mysterious world in this isometric action-adventure. With Zelda-like gameplay, clever puzzles, and a charming aesthetic, Tunic is an indie standout. [Andrew Shouldice]",
      score: "87"
    },
    {
      positie: "7",
      titel: "Immortality",
      datum_uitgifte: "Aug 30, 2022",
      korte_omschrijving: "Uncover a mystery through interactive film clips in this narrative game. With innovative storytelling and a cinematic approach, Immortality redefines interactive media. [Half Mermaid]",
      score: "86"
    },
    {
      positie: "8",
      titel: "Sifu",
      datum_uitgifte: "Feb 8, 2022",
      korte_omschrijving: "Master kung fu in this brutal action game with an aging mechanic. With tight combat, stylish visuals, and high difficulty, Sifu is a unique beat-’em-up. [Sloclap]",
      score: "86"
    },
    {
      positie: "9",
      titel: "Vampire Survivors",
      datum_uitgifte: "Oct 20, 2022",
      korte_omschrijving: "Survive waves of enemies in this addictive roguelike. With simple mechanics, endless upgrades, and chaotic gameplay, Vampire Survivors became an indie sensation. [Poncle]",
      score: "85"
    },
    {
      positie: "10",
      titel: "Marvel’s Spider-Man: Miles Morales",
      datum_uitgifte: "Nov 12, 2020",
      korte_omschrijving: "As Miles Morales, swing through New York with new powers. With a heartfelt story, stunning visuals, and fluid combat, Miles Morales is a stellar Spider-Man spin-off. [Insomniac Games]",
      score: "85"
    }
  ],




   2023: [
    {
      positie: "1",
      titel: "Baldur's Gate 3",
      datum_uitgifte: "Aug 3, 2023",
      korte_omschrijving: "An ancient evil has returned to Baldur's Gate, intent on devouring it from the inside out. The fate of Faerun lies in your hands. Alone, you may resist. But together, you can overcome. Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power. Mysterious abilities are awakening inside you, drawn from a mind flayer parasite planted in your brain. Resist, and turn darkness against itself. Or embrace corruption, and become ultimate evil.",
      score: "96"
    },
    {
      positie: "2",
      titel: "The Legend of Zelda: Tears of the Kingdom",
      datum_uitgifte: "May 12, 2023",
      korte_omschrijving: "An epic adventure across the land and skies of Hyrule awaits in The Legend of Zelda™: Tears of the Kingdom for Nintendo Switch™. The adventure is yours to create in a world fueled by your imagination. In this sequel to The Legend of Zelda: Breath of the Wild, you’ll decide your own path through the sprawling landscapes of Hyrule and the mysterious islands floating in the vast skies above. Can you harness the power of Link’s new abilities to fight back against the malevolent forces that threaten the kingdom?",
      score: "96"
    },
    {
      positie: "3",
      titel: "Alan Wake II",
      datum_uitgifte: "Oct 27, 2023",
      korte_omschrijving: "A string of ritualistic murders threatens Bright Falls, a small-town community surrounded by Pacific Northwest wilderness. Saga Anderson, an accomplished FBI agent with a reputation for solving impossible cases, arrives to investigate. Meanwhile, Alan Wake, a writer trapped in a nightmare dimension, writes a dark story to shape reality in a desperate bid to escape. Anderson and Wake, two heroes on different journeys, are connected in ways neither can understand, their actions echoing across realities to confront a malevolent supernatural darkness.",
      score: "94"
    },
    {
      positie: "4",
      titel: "Super Mario Bros. Wonder",
      datum_uitgifte: "Oct 20, 2023",
      korte_omschrijving: "Find wonder in the next evolution of Mario fun. Classic Mario side-scrolling gameplay is turned on its head with the addition of Wonder Flowers. These game-changing items trigger spectacular moments you have to see to believe…Witness pipes coming alive, wreak havoc as a giant spiky ball, and see even more unexpected events called Wonder Effects. Choose from iconic characters like Mario, Luigi, Peach, Daisy, Yoshi, and Toad. Transform into Elephant Mario to use your trunk to trounce enemies with a surprising new power!",
      score: "92"
    },
    {
      positie: "5",
      titel: "Marvel's Spider-Man 2",
      datum_uitgifte: "Oct 20, 2023",
      korte_omschrijving: "Spider-Men, Peter Parker and Miles Morales, return for an exciting new adventure in the critically acclaimed Marvel’s Spider-Man franchise for the PS5 console. Swing, jump, and utilize the new Web Wings to travel around New York, quickly switching between Peter Parker and Miles Morales to experience different stories and epic new powers, as the iconic villain Venom threatens to destroy their lives, their city, and the ones they love.",
      score: "91"
    },
    {
      positie: "6",
      titel: "Resident Evil 4 (2023)",
      datum_uitgifte: "Mar 24, 2023",
      korte_omschrijving: "Resident Evil 4 joins Leon S. Kennedy six years after his hellish experiences in the biological disaster of Raccoon City. His unmatched resolve caused him to be recruited as an agent reporting directly to the president of the United States. With the experience of multiple missions on his back, Leon is dispatched to rescue the president’s recently kidnapped daughter. Leon tracks her to a secluded European village, however after making first contact he discovers a fervor beyond reason grips the local populace.",
      score: "91"
    },
    {
      positie: "7",
      titel: "Cocoon",
      datum_uitgifte: "Sep 29, 2023",
      korte_omschrijving: "From Jeppe Carlsen, the lead gameplay designer of LIMBO and INSIDE — COCOON takes you on an adventure across worlds within worlds. Master world-leaping mechanics to unravel a cosmic mystery. Uncover a universe of possibilities as you leap between beautifully crafted worlds — each contained within an orb you carry on your back — solving intricate puzzles and navigating breathtaking alien landscapes.",
      score: "90"
    },
    {
      positie: "8",
      titel: "Starfield",
      datum_uitgifte: "Sep 6, 2023",
      korte_omschrijving: "Starfield is the first new universe in over 25 years from Bethesda Game Studios, the award-winning creators of The Elder Scrolls V: Skyrim and Fallout 4. In this next generation role-playing game set amongst the stars, create any character you want and explore with unparalleled freedom as you embark on an epic journey to answer humanity’s greatest mystery. In the year 2330, humanity has ventured beyond our solar system, settling new planets, and living as a spacefaring people.",
      score: "86"
    },
    {
      positie: "9",
      titel: "Lies of P",
      datum_uitgifte: "Sep 19, 2023",
      korte_omschrijving: "You are a puppet created by Geppetto, who’s caught in a web of lies with unimaginable monsters and untrustworthy figures standing between you and the events that have befallen the world of Lies of P. You are awakened by a mysterious voice that guides you through the plagued city of Krat – a once lively place that has been poisoned by madness and bloodlust. In our soulslike, you must adapt yourself and your weapons to face untold horrors, untangle the unfathomable secrets of the city’s elites, and choose whether to confront predicaments with truth or lies.",
      score: "85"
    },
    {
      positie: "10",
      titel: "Sea of Stars",
      datum_uitgifte: "Aug 29, 2023",
      korte_omschrijving: "Sea of Stars is a turn-based RPG inspired by the classics. It tells the story of two Children of the Solstice who will combine the powers of the sun and moon to perform Eclipse Magic, the only force capable of fending off the monstrous creations of the evil alchemist known as The Fleshmancer.",
      score: "85"
    },
    {
      positie: "11",
      titel: "Street Fighter 6",
      datum_uitgifte: "Jun 2, 2023",
      korte_omschrijving: "Here comes Capcom’s newest challenger! Street Fighter™ 6 launches worldwide and represents the next evolution of the Street Fighter™ series! Powered by Capcom’s proprietary RE Engine, the Street Fighter 6 experience spans across three distinct game modes featuring: World Tour - an immersive single-player story experience, Battle Hub - an interactive hub to meet other players, and Fighting Ground - a new take on the classic fighting experience with new gameplay innovations and modernized control mechanics for players of all skill levels.",
      score: "85"
    },
    {
      positie: "12",
      titel: "Final Fantasy XVI",
      datum_uitgifte: "Jun 22, 2023",
      korte_omschrijving: "The 16th standalone entry in the legendary Final Fantasy series marks a darker turn for the RPG franchise, with a complex tale of revenge, power struggles and unavoidable tragedy. Final Fantasy XVI reimagines the series' iconic summons as Eikons. These deadly creatures are housed within Dominants, men and women who inherit their immense power at birth – some revered, some feared, but all inevitably swept up into the great tragedies of the realm.",
      score: "85"
    },
    {
      positie: "13",
      titel: "Dead Space (2023)",
      datum_uitgifte: "Jan 27, 2023",
      korte_omschrijving: "The sci-fi survival horror classic Dead Space returns, completely rebuilt from the ground up to offer a deeper and more immersive experience. This remake brings jaw-dropping visual fidelity, suspenseful atmospheric audio, and improvements to gameplay while staying faithful to the original game’s thrilling vision. Isaac Clarke is an everyman engineer on a mission to repair a vast mining ship, the USG Ishimura, only to discover something has gone horribly wrong. The ship's crew has been slaughtered and Isaac’s beloved partner, Nicole, is lost somewhere on board.",
      score: "85"
    },
    {
      positie: "14",
      titel: "Dave The Diver",
      datum_uitgifte: "Jun 28, 2023",
      korte_omschrijving: "DAVE THE DIVER is a casual, singleplayer adventure RPG featuring deep-sea exploration and fishing during the day and sushi restaurant management at night. Join Dave and his quirky friends as they seek to uncover the secrets of the mysterious Blue Hole.",
      score: "85"
    },
    {
      positie: "15",
      titel: "Dredge",
      datum_uitgifte: "Mar 30, 2023",
      korte_omschrijving: "DREDGE is a single-player fishing adventure with a sinister undercurrent. Sell your catch, upgrade your boat, and dredge the depths for long-buried secrets in a mysterious archipelago. Explore the islands and discover why some things are best left forgotten.",
      score: "84"
    },
    {
      positie: "16",
      titel: "Amnesia: The Bunker",
      datum_uitgifte: "Jun 6, 2023",
      korte_omschrijving: "Amnesia: The Bunker is a first-person horror game set in a desolate WW1 Bunker. Face the oppressive terrors stalking the dark corridors. Search for and use the tools and weapons at your disposal, while keeping the lights on at all costs. Overcome fear, persevere, and make your way out alive.",
      score: "84"
    },
    {
      positie: "17",
      titel: "Jusant",
      datum_uitgifte: "Oct 31, 2023",
      korte_omschrijving: "Enjoy meditative vibes in Jusant, an action-puzzle climbing game. Scale an immeasurably tall tower and ascend to new heights alongside your watery companion. Master your climbing tools, find your way up through diverse biomes, and piece together the tower’s past.",
      score: "83"
    },
    {
      positie: "18",
      titel: "Octopath Traveler II",
      datum_uitgifte: "Feb 24, 2023",
      korte_omschrijving: "This game is a brand-new entry in the OCTOPATH TRAVELER series, the first installment of which was initially released in 2018 and sold over 3 million copies worldwide. It takes the series’ HD-2D graphics, a fusion of retro pixel art and 3DCG, to even greater heights. In the world of Solistia, eight new travelers venture forth into an exciting new era. Where will you go? What will you do? Whose tale will you bring to life? Every path is yours to take.",
      score: "83"
    },
    {
      positie: "19",
      titel: "Hogwarts Legacy",
      datum_uitgifte: "Feb 10, 2023",
      korte_omschrijving: "Hogwarts Legacy is an open-world action RPG set in the world first introduced in the Harry Potter books. Embark on a journey through familiar and new locations as you explore and discover magical beasts, customize your character and craft potions, master spell casting, upgrade talents and become the wizard you want to be. Experience Hogwarts in the 1800s. Your character is a student who holds the key to an ancient secret that threatens to tear the wizarding world apart.",
      score: "83"
    },
    {
      positie: "20",
      titel: "Pikmin 4",
      datum_uitgifte: "Jul 21, 2023",
      korte_omschrijving: "Guide pint-sized creatures in a grand, green adventure! Meet the Pikmin – small, plantlike creatures you can grow, pluck, command, and overpower your enemies with! These curious helpers come in different types – fire-resistant Red Pikmin, electrified Yellow Pikmin, and more. You’ll need to collect and command Pikmin to overcome the many obstacles and hostile creatures in this uncharted environment.",
      score: "83"
    },
    {
      positie: "21",
      titel: "Fire Emblem Engage",
      datum_uitgifte: "Jan 20, 2023",
      korte_omschrijving: "In a war against the Fell Dragon, four kingdoms worked together with heroes from other worlds to seal away this great evil. One-thousand years later, this seal has weakened and the Fell Dragon is about to reawaken. As a Divine Dragon, use rich strategies and robust customization to meet your destiny—to collect Emblem Rings and bring peace back to the Continent of Elyos.",
      score: "81"
    },
    {
      positie: "22",
      titel: "Metroid Prime Remastered",
      datum_uitgifte: "Feb 8, 2023",
      korte_omschrijving: "Get behind the visor of intergalactic bounty hunter Samus Aran in her critically-acclaimed first-person adventure. Step into her boots as you navigate the winding paths and interconnected environments of an alluring-but-dangerous alien planet. Use powers like the iconic Morph Ball, Missiles, and an arsenal of beams to take down fearsome fauna, battle alien forces, and uncover the secrets of the mysterious Tallon IV.",
      score: "81"
    },
    {
      positie: "23",
      titel: "Fuga: Melodies of Steel 2",
      datum_uitgifte: "May 11, 2023",
      korte_omschrijving: "A year has passed since the events of Fuga: Melodies of Steel. The war was fought and won. All should have been well... But a mysterious event causes the children to once again board the mighty tank, Taranis. A new adventure begins as they face a wicked new enemy, and the choices they make will send them down paths of ruin or redemption.",
      score: "81"
    },
    {
      positie: "24",
      titel: "Hi-Fi Rush",
      datum_uitgifte: "Jan 25, 2023",
      korte_omschrijving: "Feel the beat as wannabe rockstar Chai and his ragtag team of friends take on an evil tech megacorp with raucous rhythm combat! From Tango Gameworks comes Hi-Fi RUSH, an all-new action game where the world syncs to the music.",
      score: "81"
    }
  ],
  2024: [
    {
      positie: "1",
      titel: "Final Fantasy VII Rebirth",
      datum_uitgifte: "Feb 29, 2024",
      korte_omschrijving: "FINAL FANTASY VII REBIRTH is the second entry in the FINAL FANTASY VII remake project, which retells the story of the genre-redefining RPG across three games. Iconic heroes Cloud, Barret, Tifa, Aerith, and Red XIII have escaped the dystopian city Midgar and are now in pursuit of Sephiroth, the vengeful swordsman from Cloud’s past who was thought long dead. Players will explore a vibrant and vast world, all brought to life with a new level of graphical fidelity, developed specifically to leverage the power of the PS5 console.",
      score: "92"
    },
    {
      positie: "2",
      titel: "Balatro",
      datum_uitgifte: "Feb 20, 2024",
      korte_omschrijving: "Balatro is a poker-inspired roguelike deck builder all about creating powerful synergies and winning big. Combine valid poker hands with unique Joker cards in order to create varied synergies and builds. Earn enough chips to beat devious blinds, all while uncovering hidden bonus hands and decks as you progress.",
      score: "90"
    },
    {
      positie: "3",
      titel: "Tekken 8",
      datum_uitgifte: "Jan 26, 2024",
      korte_omschrijving: "Get ready for the next chapter in the legendary fighting game series, TEKKEN 8. 32 fighters with next-gen visuals will collide in Tekken 8! The title introduces brand-new mechanics like the “Heat” system, making aggressive attacks more strategic and dynamic than ever. Enjoy high-fidelity graphics, developed for the new generation of consoles and PCs, showcasing battles in highly detailed environments.",
      score: "90"
    },
    {
      positie: "4",
      titel: "Like a Dragon: Infinite Wealth",
      datum_uitgifte: "Jan 26, 2024",
      korte_omschrijving: "Two larger-than-life heroes, Ichiban Kasuga and Kazuma Kiryu, are brought together by the hand of fate, or perhaps something more sinister… Live it up in Japan and explore all that Hawaii has to offer in an RPG adventure so big it spans the Pacific. Experience unique combat with dynamic, fast-paced RPG battles where the battlefield becomes your weapon, and anything goes.",
      score: "89"
    },
    {
      positie: "5",
      titel: "Prince of Persia: The Lost Crown",
      datum_uitgifte: "Jan 18, 2024",
      korte_omschrijving: "Dash into a stylish and thrilling action-adventure platformer set in a mythological Persian world where the boundaries of time and space are yours to manipulate. Play as Sargon and evolve from sword-wielding prodigy to extraordinary legend as you master acrobatic combat and unlock new Time Powers and unique super abilities.",
      score: "86"
    },
    {
      positie: "6",
      titel: "Unicorn Overlord",
      datum_uitgifte: "Mar 8, 2024",
      korte_omschrijving: "From the masterminds that brought 13 Sentinels: Aegis Rim and Odin Sphere, ATLUS x Vanillaware presents Unicorn Overlord, a fresh fantasy tactical RPG. Fight against fate and embark on a royal adventure to regain your reign alongside your trusted allies. Cultivate a grand army with over 60 unique characters, from humans and elves to massive beasts and heavenly angels.",
      score: "86"
    },
    {
      positie: "7",
      titel: "Helldivers 2",
      datum_uitgifte: "Feb 8, 2024",
      korte_omschrijving: "The Galaxy’s Last Line of Offence. Enlist in the Helldivers and join the fight for freedom across a hostile galaxy in a fast, frantic, and ferocious third-person shooter. Call in support with Stratagems, make a difference with your squad, and spread Managed Democracy in this co-op shooter extravaganza!",
      score: "83"
    }
  ]
};
