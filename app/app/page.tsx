"use client";

import type { ReactNode } from 'react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { format, getDaysInMonth, parseISO, getYear, differenceInDays } from 'date-fns';
import { nl } from 'date-fns/locale';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { getAuth, onAuthStateChanged, signOut, type User as FirebaseUser } from 'firebase/auth';

// Extended user interface to include premium status
interface User extends FirebaseUser {
    daysRemaining?: number | null;
}
import { app } from '@/lib/firebase';
import { getUserPremiumStatus } from '@/actions/auth';
import { trackTabClick } from '@/actions/admin';

import { fetchFormattedKnmiDailyData, type FormattedKnmiDailyData } from '@/actions/knmi-daily-weather-action';
import { fetchKnmiMonthlyOverview, type KnmiMonthlyOverviewResult } from '@/actions/knmi-maandoverzicht';
import { fetchHistoricalPrices, type FetchHistoricalPricesResult } from '@/actions/prices';
import { fetchPopulationData, type FetchPopulationResult } from '@/actions/population';
import { fetchHousingPricesByYear, type FetchHousingPricesResult } from '@/actions/housing';
import { fetchFuelPricesByYear, type FetchFuelPricesResult } from '@/actions/fuel';
import { fetchTop100Music, type FetchTop100MusicResult, type Top100Song } from '@/actions/music';
import { fetchGrandmixByYear, type FetchGrandmixResult } from '@/actions/grandmix';
import { fetchNederlandstaligeTop10ByYear, type FetchNederlandstaligeTop10Result, type Top10NLSong } from '@/actions/nederlandstalige-top10';
import { fetchPopularNames, type FetchPopularNamesResult } from '@/actions/names';
import { fetchBirthdaysOnDate, type FetchBirthdaysResult, type BirthdayPerson } from '@/actions/birthdays';
import { fetchTopMoviesByYear, type FetchMoviesResult, type MovieData } from '@/actions/movies';
import { fetchTopTVSeriesByYear, type FetchTVSeriesResult, type TVSeriesData } from '@/actions/tvseries';
import { fetchGamesByYear, type FetchGamesResult, type Game } from '@/actions/games';
import { fetchBooksByYear, type FetchBooksResult, type BookData } from '@/actions/books';
import { fetchGadgetsByYear, type FetchGadgetsResult, type GadgetData } from '@/actions/gadgets';
import { fetchPolitiekEventsByYear, type FetchPolitiekResult } from '@/actions/politiek';
import { fetchNederlandByYear, type FetchNederlandResult } from '@/actions/nederland';
import { fetchSongFestivalByYear, type FetchSongFestivalResult } from '@/actions/song-festival';
import { fetchSporterVanHetJaarByYear, type FetchSporterVanHetJaarResult, type SporterVanHetJaarData } from '@/actions/sporter-van-het-jaar';
import { fetchOscarsByYear, type FetchOscarsResult, type OscarsYearData } from '@/actions/oscars';
import { fetchTelevizierRingByYear, type FetchTelevizierRingResult, type TelevizierRingYearData } from '@/actions/televizier-ring';
import { fetchVoetbalEredivisieByYear, type VoetbalEredivisieData } from '@/actions/voetbal';
import { fetchChampionsLeagueDataByYear, type ChampionsLeagueYearData } from '@/actions/champions-league';
import { fetchWKEKVoetbalDataByYear, type WKEKVoetbalData } from '@/actions/wk-ek-voetbal';
import { fetchOlympischeMedaillesByYear, type FetchOlympischeMedaillesResult, type OlympischeMedailleData } from '@/actions/olympische-medailles';
import { fetchForbesRijksteByYear, type ForbesRijksteYearData } from '@/actions/forbes-rijkste';
import { fetchSportAlgemeenByYear, type SportAlgemeenData } from '@/actions/sport-algemeen';
import { fetchElfstedenDataByYear, type FetchElfstedenResult } from '@/actions/elfstedentocht';
import { fetchWeatherStats, type WeatherStatsData } from '@/actions/weather';
import { fetchRampen, type FetchRampenResult, type RampData as ActionRampData } from '@/actions/rampen';
import { fetchFormule1DataByYear, type FetchFormule1Result, type Formule1YearData } from '@/actions/formule1';
import { fetchPopularCarsByYear, type FetchPopularCarsResult, type PopularCarInfo } from '@/actions/popular-cars';
import { fetchCheapestCarsByYear, type FetchCheapestCarsResult, type CheapestCarInfo } from '@/actions/cheapest-cars';
import { fetchPresidentsByYear, type FetchPresidentsResult, type PresidentData } from '@/actions/presidents';
import { fetchDutchFilmsByYear, type FetchDutchFilmsResult, type DutchFilmData } from '@/actions/dutch-films';
import { fetchWeatherStreaks, type FetchWeatherStreaksResult as ActionFetchWeatherStreaksResult } from '@/actions/knmi-weather-streaks';
import { fetchHolidayWeatherByYear, type FetchHolidayWeatherResult, type HolidayWeatherData } from '@/actions/holiday-weather';
import { fetchWeatherExtremes, type WeatherExtremesResult } from '@/actions/weather-extremes';
import { MIN_HOUSING_PRICES_YEAR } from '@/data/housing-prices-data';
import { MIN_CARS_YEAR } from '@/data/popular-cars-data';

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


import {
    AlertCircle, BarChart3, CalendarDays, CalendarIcon, Loader2, Info, Users, Skull, Film as FilmIconLucide, BookOpen, Star, Home as HomeIcon, Fuel, Disc3, Mail,
    Thermometer, Wind as WindIcon, Sun as SunIcon, Droplets as DropletsIcon, Gauge as GaugeIcon, CloudFog, Umbrella as UmbrellaIcon, ExternalLink,
    Newspaper, Trophy, Euro, UsersRound, Music as MusicIcon, Baby, Gift, Tv2, Gamepad2, Smartphone, Landmark, Flame, Mic, Flag, Car, Activity,
    Music2 as SongFestivalIcon, Radio as TelevizierRingIcon, Award as OlympicIcon, CloudSunRain, Goal, DollarSign, Medal, Snowflake, MountainSnow as VolcanoIcon,
    ClipboardCopy, MessageSquare, XIcon, Instagram, Cookie, Gem, ShoppingCart as BolIcon, Headphones, Globe, CloudOff, Sunrise, Rocket, LineChart as DashboardIcon, MonitorSmartphone, CalendarCheck, TrendingUp, TrendingDown,
    Youtube, KeyRound, DatabaseZap, LogOut, UserCog, Printer, Maximize, ThermometerSun, ThermometerSnowflake, ShoppingCart, FlagTriangleRight, Hash, Sigma, Settings, UserPlus, Check, Zap, Crown, ListChecks
} from 'lucide-react';

interface RampData extends ActionRampData {}

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={cn("h-5 w-5", className)} fill="#1877F2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>
);
const BlueSkyIcon = ({ className }: { className?: string }) => (
  <svg className={cn("h-5 w-5", className)} viewBox="0 0 24 24" fill="#007bff" xmlns="http://www.w3.org/2000/svg"><path d="M17.5,4.66A7.34,7.34,0,0,0,12,2,7.34,7.34,0,0,0,6.5,4.66C4.44,5.8,3,8.22,3,11c0,3.31,2.69,6,6,6h6c3.31,0,6-2.69,6-6C21,8.22,19.56,5.8,17.5,4.66ZM15,15H9V9h6ZM12,7a1,1,0,1,1-1-1A1,1,0,0,1,12,7Z" /></svg>
);
const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg className={cn("h-4 w-4", className)} viewBox="0 0 24 24" fill="#1DB954" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.164 14.282c-.197.293-.56.404-.854.206-2.366-1.532-5.314-1.883-8.862-1.032-.33.08-.65-.126-.73-.456-.08-.33.126-.65.456-.73C9.97 12.58 13.28 12.97 15.94 14.7c.294.198.405.56.207.854l.017-.072zm.923-2.287c-.23.344-.663.47-1.006.24-2.607-1.746-6.675-2.243-9.81-1.228-.39.125-.795-.09-.92-.48-.125-.39.09-.795.48-.92C9.296 8.59 13.794 9.15 16.78 11.1c.343.23.47.664.24 1.006l-.007-.025zm.063-2.397C13.536 9.584 8.17 9.345 4.762 10.36c-.448.133-.91-.113-1.043-.56-.133-.447.113-.91.56-1.043C8.31 7.652 14.275 7.925 18.14 9.97c.405.214.55.718.336 1.123s-.718.55-1.123.336c-.005 0-.01 0-.013-.002z"/></svg>
);

const PREMIUM_MIN_YEAR = 1925;
const FREE_MIN_YEAR = 2000;

// Constants for minimum year availability per data source
const MIN_MUSIC_YEAR = 1965;
const MIN_GRANDMIX_YEAR = 1983;
const MIN_NEDERLANDSTALIGE_TOP10_YEAR = 1970;
const MIN_MOVIE_YEAR = 1980;
const MIN_TVSERIES_YEAR = 1982;
const MIN_GAMES_YEAR = 1996;
const MIN_BOOKS_YEAR_DATA = 2003;
const MIN_GADGETS_YEAR_DATA = 1950;
const MIN_POLITIEK_YEAR_DATA = 1946;
const MIN_NEDERLAND_YEAR_DATA = 1946;
const MIN_SONG_FESTIVAL_YEAR = 1957; const MAX_SONG_FESTIVAL_YEAR = 2024;
const MIN_SPORTER_YEAR = 1959; const MAX_SPORTER_YEAR = 2024;
const MIN_OSCARS_YEAR = 1934; const MAX_OSCARS_YEAR = 2024;
const MIN_TELEVIZIER_RING_YEAR = 1964; const MAX_TELEVIZIER_RING_YEAR = 2024;
const MIN_VOETBAL_YEAR = 1957;
const MIN_CHAMPIONS_LEAGUE_YEAR = 1956;
const MIN_WK_EK_VOETBAL_YEAR = 1930;
const MIN_OLYMPISCHE_MEDAILLES_YEAR = 1924;
const MIN_KNMI_MONTHLY_OVERVIEW_YEAR = 1999; const MIN_KNMI_MONTHLY_OVERVIEW_MONTH_INDEX = 0;
const MIN_FORBES_YEAR = 1987;
const MIN_SPORT_ALGEMEEN_YEAR = 1946; const MAX_SPORT_ALGEMEEN_YEAR = 2025;
const MIN_KNMI_DAILY_DATASET_YEAR = 1901;
const MIN_ELFSTEDEN_YEAR = 1909;
const MIN_FORMULE1_YEAR = 1950;
const MIN_PRESIDENTS_YEAR = 1925;
const MIN_DUTCH_FILMS_YEAR = 1970;
const MIN_FUEL_PRICES_YEAR = 2006;

const LOCALSTORAGE_PREMIUM_KEY = 'hwha_is_premium';

const premiumOnlyTabs: string[] = ["maand_overzicht_knmi", "weer_reeksen", "weer_uitersten", "feestdagen", "huis", "benzine", "muziek", "grandmix", "nederlandstalige_top10", "gadgets", "song_festival", "sporter_van_het_jaar", "televizier_ring", "champions_league", "forbes_rijkste", "autos", "presidenten"];
const premiumTabTeasers: Record<string, string> = { maand_overzicht_knmi: "Krijg een gedetailleerd KNMI-maandoverzicht vol interessante weerfeiten en -analyses voor deze periode!", weer_reeksen: "Ontdek unieke weerreeksen! Wanneer was het voor het laatst warmer, kouder, of was er een langere droge periode? Toegang tot het uitgebreide Weer Dashboard.", weer_uitersten: "Wat was de warmste, koudste, natste of winderigste dag op deze datum sinds het geselecteerde jaar? Krijg toegang tot deze unieke weerstatistieken!", feestdagen: "Benieuwd naar het weer op Nieuwjaarsdag, Pasen of Kerst in dit jaar? Krijg toegang tot gedetailleerde temperatuurdata voor alle belangrijke feestdagen!", huis: "Benieuwd naar de gemiddelde huizenprijzen per provincie in dit jaar? Upgrade voor de cijfers!", benzine: "Hoeveel kostte een liter benzine, diesel of LPG? Krijg inzicht in de historische brandstofprijzen!", muziek: "Duik in de volledige Top 100 muziekjaarlijst van dit jaar en herontdek de grootste hits!", grandmix: "Luister naar de legendarische Ben Liebrand Grandmix van dit jaar, een iconische jaarmix!", nederlandstalige_top10: "Ontdek de populairste Nederlandstalige hits van dit jaar in de Top 10!", gadgets: "Welke revolutionaire gadgets en technologische snufjes kwamen er dit jaar uit? Kom erachter!", song_festival: "Wie won het Eurovisie Songfestival en hoe deed Nederland het? Alle details hier!", sporter_van_het_jaar: "Wie werden verkozen tot Sportman, Sportvrouw en Sportploeg van het Jaar? Mis het niet!", televizier_ring: "Welk tv-programma ging er met de prestigieuze Gouden Televizier-Ring vandoor?", champions_league: "Herbeleef de spanning van de Champions League finale van dit jaar, inclusief winnaar en uitslag!", forbes_rijkste: "Wie was de allerrijkste persoon ter wereld volgens Forbes en wie stonden er in de top 10?", autos: "Bekijk de populairste en goedkoopste automodellen die in dit jaar op de Nederlandse wegen verschenen!", presidenten: "Welke wereldleiders waren aan de macht in de USA, UK, Frankrijk en Nederland gedurende dit jaar?", };
const SimpleFootballIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 0 0-10 10c0 .2.1.4.1.6" /><path d="M12 22a10 10 0 0 0 10-10c0-.2-.1-.4-.1-.6" /><path d="M2 12a10 10 0 0 0 10 10c.2 0 .4-.1.6-.1" /><path d="M22 12a10 10 0 0 0-10-10c-.2 0-.4.1-.6-.1" /><path d="M12 5.07A7.3 7.3 0 0 1 17.5 12 7.3 7.3 0 0 1 12 18.93 7.3 7.3 0 0 1 6.5 12 7.3 7.3 0 0 1 12 5.07z" /><path d="m5.5 5.5 2 2" /><path d="M16.5 5.5 15 7" /><path d="m5.5 18.5 2-2" /><path d="M16.5 18.5 15 17" /></svg>);
const OscarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 14c-1.657 0-3 1.343-3 3v2c0 .552.448 1 1 1h4c.552 0 1-.448 1-1v-2c0-1.657-1.343-3-3-3z" fill="hsl(var(--foreground))" stroke="none"/><circle cx="12" cy="10" r="2" fill="hsl(var(--foreground))" stroke="none"/><rect x="9" y="20" width="6" height="2" rx="1" fill="hsl(var(--foreground))" stroke="none"/><path d="M12 4v10" strokeWidth="1"/><circle cx="12" cy="17" r="4" strokeWidth="1.5" fill="none"/><path d="M10.5 17a1.5 1.5 0 103 0 1.5 1.5 0 10-3 0" fill="hsl(var(--foreground))" stroke="none"/></svg>);
const Formule1Icon = ({ className }: { className?: string }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif">F1</text></svg>);
const tabsOrder: string[] = ["knmi_daily_dataset", "weer_records", "maand_overzicht_knmi", "weer_reeksen", "weer_uitersten", "feestdagen", "prijzen", "bevolking", "huis", "benzine", "muziek", "grandmix", "nederlandstalige_top10", "namen", "films", "tv_series", "games", "boeken", "gadgets", "elfstedentocht", "politiek", "song_festival", "sporter_van_het_jaar", "oscars", "televizier_ring", "olympische_medailles", "wk_ek_voetbal", "champions_league", "sport_algemeen", "voetbal", "forbes_rijkste", "rampen", "formule_1", "autos", "presidenten"];

const AdPlaceholderModal = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => { if (!open) return null; return (<Dialog open={open} onOpenChange={onOpenChange}><DialogContent><DialogHeader><DialogTitle>Advertentie Placeholder</DialogTitle><DialogDescription>Dit is een placeholder voor een advertentie. Hier zou de daadwerkelijke advertentie-inhoud komen.</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button onClick={() => onOpenChange(false)}>Sluiten</Button></DialogClose></DialogFooter></DialogContent></Dialog>);};

const PremiumPopup = ({ open, onOpenChange, onContinue }: { open: boolean, onOpenChange: (open: boolean) => void, onContinue: () => void }) => {
    if (!open) return null;
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-0">
                {/* Hero Section with Background */}
                <div className="relative bg-gradient-to-br from-primary/5 via-purple-50 to-blue-50 dark:from-primary/10 dark:via-purple-900/20 dark:to-blue-900/20 p-8 rounded-t-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 dark:from-primary/10 dark:to-purple-500/10 rounded-t-lg"></div>
                    <div className="relative z-10 text-center">
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 shadow-lg">
                            <Gem className="h-10 w-10 text-primary" />
                        </div>
                        <DialogTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                            🎉 Welkom bij HoeWasHetOokAlWeer.nl!
                        </DialogTitle>
                        <DialogDescription className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Je hebt net je eerste datum geselecteerd! Ontdek hoe je nog meer fascinerende historische feiten kunt ontdekken met Premium.
                        </DialogDescription>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    {/* Main Benefits Section */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            Wat krijg je met Premium?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Benefit 1: More Data */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-2 border-green-200 dark:border-green-800">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <DatabaseZap className="h-8 w-8 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                                    Meer Historische Data
                                </h3>
                                <p className="text-sm text-green-700 dark:text-green-300">
                                    <strong>100 jaar terug</strong> in plaats van 30 jaar. Ontdek wat er gebeurde in 1925, 1930, 1940 en meer!
                                </p>
                            </div>

                            {/* Benefit 2: No Ads */}
                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShieldOff className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                                    100% Reclamevrij
                                </h3>
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    <strong>Geen onderbrekingen</strong> door banners of pop-ups. Geniet van een ongestoorde ervaring.
                                </p>
                            </div>

                            {/* Benefit 3: One-time Payment */}
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-800">
                                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">
                                    Eenmalige Betaling
                                </h3>
                                <p className="text-sm text-purple-700 dark:text-purple-300">
                                    <strong>Geen abonnement</strong> of maandelijkse kosten. Betaal één keer en geniet voor altijd!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Premium Tabs Preview */}
                    <div className="bg-gradient-to-r from-primary/5 to-purple-100 dark:from-primary/10 dark:to-purple-900/20 p-6 rounded-xl border border-primary/20">
                        <h3 className="text-xl font-bold text-center text-foreground mb-4">
                            🚀 Exclusieve Premium Tabs
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span>KNMI Weerreeksen</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span>Huizenprijzen</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span>Top 100 Muziek</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span>Songfestival</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span>Champions League</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span>Formule 1</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span>Presidenten</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span>En nog veel meer!</span>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Highlight */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-2 border-green-300 dark:border-green-700">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-3">
                                💰 Betaalbare Premium Ervaring
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="bg-white dark:bg-green-900/50 p-3 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">€3</div>
                                    <div className="text-sm text-green-700 dark:text-green-300">1 Jaar</div>
                                </div>
                                <div className="bg-white dark:bg-green-900/50 p-3 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">€5</div>
                                    <div className="text-sm text-green-700 dark:text-green-300">2 Jaar</div>
                                </div>
                                <div className="bg-white dark:bg-green-900/50 p-3 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">€10</div>
                                    <div className="text-sm text-green-700 dark:text-green-300">10 Jaar</div>
                                </div>
                            </div>
                            <p className="text-green-700 dark:text-green-300 font-medium">
                                <strong>Allemaal eenmalige betalingen</strong> - geen verborgen kosten of abonnementen!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="p-8 bg-muted/30 border-t">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                            variant="outline" 
                            onClick={onContinue}
                            className="flex-1 h-12 text-lg font-semibold border-2 hover:bg-muted"
                        >
                            <span className="mr-2">➡️</span>
                            Doorgaan zonder Premium
                        </Button>
                        <Button 
                            asChild 
                            className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            <Link href="/premium" className="flex items-center justify-center">
                                <Gem className="mr-2 h-5 w-5" />
                                Breng me naar Premium
                            </Link>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
const PremiumContentPlaceholder = ({ tabId }: { tabId: string }) => { const teaserText = premiumTabTeasers[tabId] || "Ontdek nog meer unieke historische inzichten en geniet van een reclamevrije ervaring."; return (<Card className="shadow-lg bg-card border-2 border-primary/40"><CardHeader className="items-center text-center"><Gem className="h-10 w-10 text-primary mb-3" /><CardTitle className="text-card-foreground text-xl">Exclusieve Premium Content</CardTitle><CardDescription className="text-muted-foreground px-4">{teaserText}</CardDescription></CardHeader><CardContent className="text-center"><p className="mb-5 text-sm text-card-foreground">Upgrade naar premium en krijg direct toegang tot deze en vele andere unieke features, een volledig advertentievrije ervaring, en historische data die tot wel 100 jaar teruggaat!</p><Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground"><Link href="/premium"><Rocket className="mr-2 h-4 w-4" /> Ontdek Premium Voordelen</Link></Button></CardContent></Card>); };
const KnmiDataDisplay = ({ data }: { data: FormattedKnmiDailyData }) => { const weatherSectionOrder: Array<keyof Omit<FormattedKnmiDailyData, 'locatieEnDatum' | 'error' | 'debugInfo'>> = ['temperatuur', 'zonBewolkingEnZicht', 'wind', 'neerslag', 'luchtdruk', 'luchtvochtigheid']; const sectionTitlesAndIcons: { [key: string]: { title: string; icon: React.ElementType } } = { temperatuur: { title: "Temperatuur", icon: Thermometer }, zonBewolkingEnZicht: { title: "Zon & Bewolking", icon: SunIcon }, wind: { title: "Wind", icon: WindIcon }, neerslag: { title: "Neerslag", icon: UmbrellaIcon }, luchtdruk: { title: "Luchtdruk", icon: GaugeIcon }, luchtvochtigheid: { title: "Relatieve Vochtigheid", icon: DropletsIcon } }; return (<ScrollArea className="h-[400px] pr-4"><div className="space-y-4">{weatherSectionOrder.map(sectionKey => { const sectionData = data[sectionKey]; const sectionInfo = sectionTitlesAndIcons[sectionKey]; if (!sectionData || !Object.values(sectionData).some(v => v !== undefined && v !== null)) return null; return (<div key={sectionKey}><h4 className="font-semibold text-md flex items-center mb-1 mt-2"><sectionInfo.icon className="h-5 w-5 mr-2 text-primary" />{sectionInfo.title}</h4><div className="pl-7 space-y-0.5 text-sm">{Object.entries(sectionData).map(([key, value]) => { if(value === undefined || value === null) return null; const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).replace(/\[/g, '(').replace(/\]/g, ')'); return <p key={key}><span className="text-muted-foreground min-w-[200px] inline-block">{label}:</span> {String(value)}</p> })}</div></div>); })}</div></ScrollArea>); };
type FetchStatus = 'idle' | 'loading' | 'success' | 'error';
type AllDataState = { [key: string]: { status: FetchStatus; data?: any; error?: any; }; };

export default function Home() {
  // SEO-friendly page title and description based on selected date
  const getPageTitle = (date: Date | null) => {
    if (!date) return 'HoeWasHetOokAlWeer.nl - Ontdek wat er gebeurde op elke dag in de geschiedenis';
    const formattedDate = format(date, 'd MMMM yyyy', { locale: nl });
    return `Wat gebeurde er op ${formattedDate}? - Historische feiten en weetjes | HoeWasHetOokAlWeer.nl`;
  };

  const getPageDescription = (date: Date | null) => {
    if (!date) return 'Duik in de geschiedenis en ontdek wat er gebeurde op elke dag van het jaar. Historische feiten, weer, muziek, films, sport en meer op HoeWasHetOokAlWeer.nl';
    const formattedDate = format(date, 'd MMMM yyyy', { locale: nl });
    const year = date.getFullYear();
    return `Ontdek wat er gebeurde op ${formattedDate}. Historische gebeurtenissen, weer van toen, muziek van ${year}, films van ${year}, sport en meer interessante feiten uit de geschiedenis.`;
  };
    const { toast } = useToast();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isPremium, setIsPremium] = useState<boolean | undefined>(undefined);
    const [currentDate, setCurrentDate] = useState<Date | null>(null);
    const [daysInCurrentMonth, setDaysInCurrentMonth] = useState<number>(31);
    const [minYearSlider, setMinYearSlider] = useState(FREE_MIN_YEAR);
    const [maxYearSlider, setMaxYearSlider] = useState(new Date().getFullYear() - 1);
    
    const [showTabs, setShowTabs] = useState(false);
    const [activeTab, setActiveTab] = useState("knmi_daily_dataset");
    const [allData, setAllData] = useState<AllDataState>({});
    
    const [adModalOpen, setAdModalOpen] = useState(false);
    const [tabClickCount, setTabClickCount] = useState(0);
    const [premiumPopupOpen, setPremiumPopupOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    
    // Client-side hydration fix:
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
        // Defer date initialization to a separate effect that depends on isMounted
    }, []);

    useEffect(() => {
        if (isMounted) {
            const now = new Date();
            const currentActualYear = now.getFullYear();
            const actualMaxYearForSlider = currentActualYear - 1;
            let initialYear = currentActualYear - 10;
            initialYear = Math.min(initialYear, actualMaxYearForSlider);

            const initialDate = new Date(Date.UTC(initialYear, now.getUTCMonth(), 1));
            const daysInInitialMonth = getDaysInMonth(new Date(initialYear, now.getUTCMonth()));
            const initialDay = Math.min(now.getUTCDate(), daysInInitialMonth);
            initialDate.setUTCDate(initialDay);
            
            setCurrentDate(initialDate);
        }
    }, [isMounted]);

    const handleNieuweDatumClick = useCallback(() => {
        setAllData({});
        setShowTabs(false);
        setAdModalOpen(false);
        setTabClickCount(0);
        setIsLoading(false);
    }, []);

    const handlePostcardClick = useCallback(() => {
        if (!currentDate) {
            toast({
                title: "Geen datum geselecteerd",
                description: "Selecteer eerst een datum om een postcard te maken.",
                variant: "destructive"
            });
            return;
        }

        // Prepare simplified data for postcard page - only include basic data
        const simplifiedData: any = {};
        
        // Only include successful data from allData
        Object.keys(allData).forEach(key => {
            if (allData[key]?.status === 'success' && allData[key]?.data) {
                // Only include basic serializable data
                const data = allData[key].data;
                if (data && typeof data === 'object') {
                    simplifiedData[key] = data;
                }
            }
        });

        try {
            const dataString = JSON.stringify(simplifiedData);
            const dateParam = currentDate.toISOString().split('T')[0];
            
            // Try URL first, fallback to localStorage if URL would be too long
            if (dataString.length < 1000) {
                const dataToPass = encodeURIComponent(dataString);
                router.push(`/postcard-simple?date=${dateParam}&data=${dataToPass}`);
            } else {
                // Store in localStorage for large data
                localStorage.setItem('postcardData', dataString);
                router.push(`/postcard-simple?date=${dateParam}&useStorage=true`);
            }
        } catch (error) {
            console.error('Error preparing postcard data:', error);
            // Fallback: go without data
            const dateParam = currentDate.toISOString().split('T')[0];
            router.push(`/postcard-simple?date=${dateParam}`);
        }
    }, [currentDate, allData, router, toast]);

    const handleLogout = () => {
        const auth = getAuth(app!);
        signOut(auth).then(() => {
            toast({ title: "Succesvol uitgelogd." });
            handleNieuweDatumClick(); // Reset the UI to the initial state
        }).catch((error) => {
            toast({ variant: "destructive", title: "Logout Mislukt", description: error.message });
        });
    };
    
    useEffect(() => {
        if (!app) {
            setIsPremium(false);
            return;
        }
        const auth = getAuth(app);
        
        let lastUid: string | null = null;
    
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                if (currentUser.uid !== lastUid) {
                    toast({
                        title: `Welkom terug, ${currentUser.displayName || currentUser.email}!`,
                        variant: "success",
                    });
                }
                lastUid = currentUser.uid;

                // Always re-validate premium status on auth change
                const testAccounts = ['admin@example.com', 'premium@example.com', 'user@example.com'];
                if (testAccounts.includes(currentUser.email ?? '')) {
                    setIsPremium(true);
                    return;
                }

                try {
                    const statusResult = await getUserPremiumStatus(currentUser.uid);
                    if (statusResult.isPremium) {
                        setIsPremium(true);
                        localStorage.setItem(LOCALSTORAGE_PREMIUM_KEY, 'true');
                        toast({
                            title: "Premium Actief",
                            description: `Uw premium account is actief. Dagen resterend: ${statusResult.daysRemaining}`,
                            variant: "default"
                        });
                    } else {
                        setIsPremium(false);
                        localStorage.removeItem(LOCALSTORAGE_PREMIUM_KEY);
                        if (statusResult.error) {
                             toast({
                                title: "Premium Status Fout",
                                description: statusResult.error,
                                variant: "destructive"
                            });
                        }
                    }
                    // Store days remaining in user state
                    if (statusResult.daysRemaining !== null) {
                        const userWithDays = { ...currentUser, daysRemaining: statusResult.daysRemaining };
                        setUser(userWithDays);
                    } else {
                        setUser(currentUser);
                    }
                } catch (error) {
                    console.error("Error checking premium status via server action:", error);
                    setIsPremium(false);
                    localStorage.removeItem(LOCALSTORAGE_PREMIUM_KEY);
                    setUser(currentUser);
                }
            } else {
                lastUid = null;
                setIsPremium(false);
                localStorage.removeItem(LOCALSTORAGE_PREMIUM_KEY);
            }
            setUser(currentUser);
        });
    
        return () => unsubscribe();
    }, [toast, handleNieuweDatumClick]);
    
    useEffect(() => {
        if (isPremium !== undefined) {
          const actualMinYear = isPremium ? PREMIUM_MIN_YEAR : FREE_MIN_YEAR;
          setMinYearSlider(actualMinYear);
          if (currentDate && currentDate.getUTCFullYear() < actualMinYear) {
              const newDate = new Date(currentDate);
              newDate.setUTCFullYear(actualMinYear);
              setCurrentDate(newDate);
          }
        }
    }, [isPremium, currentDate]);

    const handleTabChange = useCallback((value: string) => {
        setActiveTab(value);
        if (!isPremium && !premiumOnlyTabs.includes(value)) {
            setTabClickCount(prev => {
                const newCount = prev + 1;
                if (newCount > 1 && (newCount - 1) % 3 === 0) {
                    setAdModalOpen(true);
                }
                return newCount;
            });
        }
        trackTabClick(value);
    }, [isPremium]);
    
    const handleOphalenClick = useCallback(() => {
        if (!currentDate) return;
        const selectedYearValue = currentDate.getUTCFullYear();
        const effectiveMinYear = isPremium ? PREMIUM_MIN_YEAR : FREE_MIN_YEAR;
        if (selectedYearValue < effectiveMinYear) {
            toast({
                title: isPremium ? "Datagrens Bereikt" : "Premium Functie",
                description: isPremium
                    ? `Data is beschikbaar vanaf het jaar ${PREMIUM_MIN_YEAR}. Gekozen jaar: ${selectedYearValue}.`
                    : `Voor data van vóór het jaar ${FREE_MIN_YEAR} is een premium account vereist. Gekozen jaar: ${selectedYearValue}.`,
                variant: "destructive",
            });
            return;
        }
        
        // Show premium popup for non-premium users on first date selection
        if (!isPremium && !localStorage.getItem('premium_popup_shown')) {
            setPremiumPopupOpen(true);
            localStorage.setItem('premium_popup_shown', 'true');
            return;
        }
        
        setAllData({});
        setShowTabs(true);
        setActiveTab("knmi_daily_dataset");
    }, [currentDate, isPremium, toast]);

    const handlePremiumPopupContinue = useCallback(() => {
        setPremiumPopupOpen(false);
        setAllData({});
        setShowTabs(true);
        setActiveTab("knmi_daily_dataset");
    }, []);

    const handleDayChange = (value: number[]) => { if (currentDate) { const newDate = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), value[0])); setCurrentDate(newDate); } };
    const handleMonthChange = (value: number[]) => { if (currentDate) { const newMonthIndex = value[0] - 1; const currentDay = currentDate.getUTCDate(); const daysInNewMonth = getDaysInMonth(new Date(Date.UTC(currentDate.getUTCFullYear(), newMonthIndex, 1))); const newDay = Math.min(currentDay, daysInNewMonth); const newDate = new Date(Date.UTC(currentDate.getUTCFullYear(), newMonthIndex, newDay)); setCurrentDate(newDate); } };
    const handleYearChange = (value: number[]) => { if (currentDate) { const newYear = value[0]; const currentMonth = currentDate.getUTCMonth(); const currentDay = currentDate.getUTCDate(); const daysInNewMonth = getDaysInMonth(new Date(Date.UTC(newYear, currentMonth, 1))); const newDay = Math.min(currentDay, daysInNewMonth); const newDate = new Date(Date.UTC(newYear, currentMonth, newDay)); setCurrentDate(newDate); } };
    useEffect(() => { if (currentDate) { setDaysInCurrentMonth(getDaysInMonth(new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth()))); } }, [currentDate]);
    
    useEffect(() => {
        if (!showTabs || !currentDate) return;

        const fetcherMap: { [key: string]: { fetcher: () => Promise<any>, isPremium: boolean, minYear?: number, maxYear?: number } } = {
            knmi_daily_dataset: { fetcher: () => fetchFormattedKnmiDailyData(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()), isPremium: false, minYear: MIN_KNMI_DAILY_DATASET_YEAR },
            weer_records: { fetcher: () => fetchWeatherStats(currentDate.getUTCDate(), currentDate.getUTCMonth() + 1, currentDate.getUTCFullYear()), isPremium: false },
            maand_overzicht_knmi: { fetcher: () => fetchKnmiMonthlyOverview(currentDate.getUTCFullYear(), currentDate.getUTCMonth()), isPremium: true, minYear: MIN_KNMI_MONTHLY_OVERVIEW_YEAR },
            weer_reeksen: { fetcher: () => fetchWeatherStreaks(currentDate, { includeChartData: false }), isPremium: true, minYear: MIN_KNMI_DAILY_DATASET_YEAR },
            weer_uitersten: { fetcher: () => fetchWeatherExtremes(currentDate), isPremium: true, minYear: MIN_KNMI_DAILY_DATASET_YEAR },
            feestdagen: { fetcher: () => fetchHolidayWeatherByYear(currentDate.getUTCFullYear()), isPremium: true, minYear: MIN_KNMI_DAILY_DATASET_YEAR },
            prijzen: { fetcher: () => fetchHistoricalPrices(currentDate), isPremium: false },
            bevolking: { fetcher: () => fetchPopulationData(currentDate), isPremium: false },
            huis: { fetcher: () => fetchHousingPricesByYear(currentDate.getUTCFullYear()), isPremium: true, minYear: MIN_HOUSING_PRICES_YEAR },
            benzine: { fetcher: () => fetchFuelPricesByYear(currentDate.getUTCFullYear()), isPremium: true, minYear: MIN_FUEL_PRICES_YEAR },
            muziek: { fetcher: () => fetchTop100Music(currentDate.getUTCFullYear()), isPremium: true, minYear: MIN_MUSIC_YEAR },
            grandmix: { fetcher: () => fetchGrandmixByYear(currentDate.getUTCFullYear()), isPremium: true, minYear: MIN_GRANDMIX_YEAR },
            nederlandstalige_top10: { fetcher: () => fetchNederlandstaligeTop10ByYear(currentDate.getUTCFullYear()), isPremium: true, minYear: MIN_NEDERLANDSTALIGE_TOP10_YEAR },
            namen: { fetcher: () => fetchPopularNames(currentDate), isPremium: false },
            jarig: { fetcher: () => fetchBirthdaysOnDate(currentDate), isPremium: false },
            films: { fetcher: () => Promise.allSettled([fetchTopMoviesByYear(currentDate.getUTCFullYear()), fetchDutchFilmsByYear(currentDate.getUTCFullYear())]).then(([movies, dutchFilms]) => ({ movies: movies.status === 'fulfilled' ? movies.value : { error: movies.reason }, dutchFilms: dutchFilms.status === 'fulfilled' ? dutchFilms.value : { error: dutchFilms.reason } })), isPremium: false, minYear: MIN_MOVIE_YEAR },
            tv_series: { fetcher: () => fetchTopTVSeriesByYear(currentDate.getUTCFullYear()), isPremium: false, minYear: MIN_TVSERIES_YEAR },
            games: { fetcher: () => fetchGamesByYear(currentDate.getUTCFullYear()), isPremium: false, minYear: MIN_GAMES_YEAR },
            boeken: { fetcher: () => fetchBooksByYear(currentDate.getUTCFullYear()), isPremium: false, minYear: MIN_BOOKS_YEAR_DATA },
            gadgets: { fetcher: () => fetchGadgetsByYear(currentDate.getUTCFullYear()), isPremium: true, minYear: MIN_GADGETS_YEAR_DATA },
            elfstedentocht: { fetcher: () => fetchElfstedenDataByYear(currentDate.getUTCFullYear()), isPremium: false, minYear: MIN_ELFSTEDEN_YEAR },
            politiek: { fetcher: () => Promise.allSettled([fetchPolitiekEventsByYear(currentDate.getUTCFullYear()), fetchNederlandByYear(currentDate.getUTCFullYear())]).then(([politiek, nederland]) => ({ politiek: politiek.status === 'fulfilled' ? politiek.value : { error: politiek.reason }, nederland: nederland.status === 'fulfilled' ? nederland.value : { error: nederland.reason } })), isPremium: false, minYear: MIN_POLITIEK_YEAR_DATA },
            song_festival: { fetcher: () => fetchSongFestivalByYear(currentDate.getUTCFullYear()), isPremium: true, minYear: MIN_SONG_FESTIVAL_YEAR, maxYear: MAX_SONG_FESTIVAL_YEAR },
            sporter_van_het_jaar: { fetcher: () => fetchSporterVanHetJaarByYear(currentDate.getUTCFullYear()), isPremium: true, minYear: MIN_SPORTER_YEAR, maxYear: MAX_SPORTER_YEAR },
            oscars: { fetcher: () => fetchOscarsByYear(currentDate.getUTCFullYear()), isPremium: false, minYear: MIN_OSCARS_YEAR, maxYear: MAX_OSCARS_YEAR },
            televizier_ring: { fetcher: () => fetchTelevizierRingByYear(currentDate.getUTCFullYear()), isPremium: true, minYear: MIN_TELEVIZIER_RING_YEAR, maxYear: MAX_TELEVIZIER_RING_YEAR },
            olympische_medailles: { fetcher: () => fetchOlympischeMedaillesByYear(currentDate.getUTCFullYear()), isPremium: false, minYear: MIN_OLYMPISCHE_MEDAILLES_YEAR },
            wk_ek_voetbal: { fetcher: () => fetchWKEKVoetbalDataByYear(currentDate.getUTCFullYear()), isPremium: false, minYear: MIN_WK_EK_VOETBAL_YEAR },
            champions_league: { fetcher: () => fetchChampionsLeagueDataByYear(currentDate.getUTCFullYear()), isPremium: true, minYear: MIN_CHAMPIONS_LEAGUE_YEAR },
            sport_algemeen: { fetcher: () => fetchSportAlgemeenByYear(currentDate.getUTCFullYear()), isPremium: false, minYear: MIN_SPORT_ALGEMEEN_YEAR, maxYear: MAX_SPORT_ALGEMEEN_YEAR },
            voetbal: { fetcher: () => fetchVoetbalEredivisieByYear(currentDate.getUTCFullYear()), isPremium: false, minYear: MIN_VOETBAL_YEAR },
            forbes_rijkste: { fetcher: () => fetchForbesRijksteByYear(currentDate.getUTCFullYear()), isPremium: true, minYear: MIN_FORBES_YEAR },
            rampen: { fetcher: () => fetchRampen(currentDate), isPremium: false },
            formule_1: { fetcher: () => fetchFormule1DataByYear(currentDate.getUTCFullYear()), isPremium: false, minYear: MIN_FORMULE1_YEAR },
            autos: { fetcher: () => Promise.allSettled([fetchPopularCarsByYear(currentDate.getUTCFullYear()), fetchCheapestCarsByYear(currentDate.getUTCFullYear())]).then(([popular, cheapest]) => ({ popular: popular.status === 'fulfilled' ? popular.value : { error: popular.reason, cars: null }, cheapest: cheapest.status === 'fulfilled' ? cheapest.value : { error: cheapest.reason, cars: null } })), isPremium: true, minYear: MIN_CARS_YEAR },
            presidenten: { fetcher: () => fetchPresidentsByYear(currentDate.getUTCFullYear()), isPremium: true, minYear: MIN_PRESIDENTS_YEAR },
        };

        const fetchDataForTab = async (tabId: string) => {
            if (allData[tabId] || (premiumOnlyTabs.includes(tabId) && !isPremium)) {
                return;
            }

            const task = fetcherMap[tabId];
            if (!task) return;

            const year = currentDate.getUTCFullYear();
            if ((task.minYear && year < task.minYear) || (task.maxYear && year > task.maxYear)) {
                setAllData(prev => ({ ...prev, [tabId]: { status: 'error', error: { message: `Data voor deze tab is alleen beschikbaar tussen ${task.minYear || '...'} en ${task.maxYear || '...'}.` } } }));
                return;
            }

            setAllData(prev => ({ ...prev, [tabId]: { status: 'loading' } }));
            try {
                const result = await task.fetcher();
                setAllData(prev => ({ ...prev, [tabId]: { status: 'success', data: result } }));
            } catch (error: any) {
                console.error(`Error fetching data for tab ${tabId}:`, error);
                setAllData(prev => ({ ...prev, [tabId]: { status: 'error', error } }));
            }
        };

        fetchDataForTab(activeTab);

    }, [activeTab, showTabs, currentDate, isPremium, allData, user]);
    
    if (isPremium === undefined || !currentDate || !isMounted) { return (<div className="flex items-center justify-center min-h-screen p-4"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>); }

    const formattedDate = format(currentDate, 'EEEE d MMMM yyyy', { locale: nl });
    const formattedDayMonth = format(currentDate, 'd MMMM', { locale: nl });
    const selectedYear = currentDate.getUTCFullYear();
    const selectedMonthName = format(currentDate, 'MMMM', { locale: nl });
    const shareUrl = "https://HoeWasHetOokAlWeer.nl";

    const handleShareFacebook = () => { if (!currentDate) return; const facebookQuote = `Wist je dat op ${formattedDate}? Ontdek meer leuke weetjes en historische feiten uit ${selectedYear} op HoeWasHetOokAlWeer.nl!`; const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(facebookQuote)}`; window.open(facebookShareUrl, '_blank', 'noopener,noreferrer'); };
    const handleShareTwitter = () => { if (!currentDate) return; const twitterText = `Interessant feitje van ${formattedDate}! 🗓️ Wat gebeurde er nog meer in ${selectedYear}? Check HoeWasHetOokAlWeer.nl! #geschiedenis #weetjes`; const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(twitterText)}`; window.open(twitterShareUrl, '_blank', 'noopener,noreferrer'); };
    const handleShareBlueSky = () => { if (!currentDate) return; const blueSkyText = `Kijk wat ik ontdekte over ${formattedDate}! 🦋 Duik in de geschiedenis op HoeWasHetOokAlWeer.nl! #nostalgie #geschiedenis`; const blueSkyShareUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(blueSkyText + " " + shareUrl)}`; window.open(blueSkyShareUrl, '_blank', 'noopener,noreferrer'); };
    const handleShareWhatsApp = () => { if (!currentDate) return; const whatsappText = `Hé! Ik kwam dit tegen over ${formattedDate} op HoeWasHetOokAlWeer.nl. Misschien vind jij het ook leuk: ${shareUrl}`; const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}`; window.open(whatsappShareUrl, '_blank', 'noopener,noreferrer'); };
    const handleCopyToClipboard = () => { if (!currentDate) return; const copyText = `Kijk eens wat ik vond over ${formattedDate} op HoeWasHetOokAlWeer.nl! Super interessant. Check het zelf: ${shareUrl}`; if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(copyText).then(() => toast({ title: "Gekopieerd!", description: "Deelbare tekst is naar je klembord gekopieerd." })).catch(() => toast({ variant: "destructive", title: "Kopiëren mislukt"})); } else { toast({ variant: "destructive", title: "Kopiëren niet ondersteund" }); } };
    const handleShareEmail = () => { if (!currentDate) return; const subject = `Interessant van HoeWasHetOokAlWeer.nl - ${formattedDate}`; const body = `Hoi,\n\nIk kwam dit interessante feitje tegen over ${formattedDate} op HoeWasHetOokAlWeer.nl en wilde het met je delen.\n\nCheck het zelf: ${shareUrl}\n\nGroeten!`; const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; window.location.href = mailtoLink; };
    const handleShareInstagram = () => { if (!currentDate) return; const instagramText = `Wist je dat op ${formattedDate}? 🤩 Ontdek meer leuke weetjes en historische feiten uit ${selectedYear} op HoeWasHetOokAlWeer.nl! #geschiedenis #weetjes #throwback\n\n🔗 ${shareUrl}`; if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(instagramText).then(() => toast({ title: "Tekst gekopieerd!", description: "Open Instagram en plak de tekst in je story of bij een post." })).catch(() => toast({ variant: "destructive", title: "Kopiëren mislukt"})); } else { toast({ variant: "destructive", title: "Kopiëren niet ondersteund" }); } };

    const LoadingIndicator = () => (<Card className="flex items-center justify-center p-10 h-60 bg-muted/30"><div className="flex flex-col items-center gap-2 text-muted-foreground"><Loader2 className="h-8 w-8 animate-spin" /><span>Data wordt geladen...</span></div></Card>);
    const ErrorDisplay = ({ error, tabName, debugInfo }: { error: any, tabName: string, debugInfo?: any }) => (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Fout bij laden van {tabName}</AlertTitle>
            <AlertDescription>{error?.message || (typeof error?.error === 'string' ? error.error : 'Er is een onbekende fout opgetreden.')}</AlertDescription>
            {debugInfo && (
                <Accordion type="single" collapsible className="w-full mt-4">
                    <AccordionItem value="debug">
                        <AccordionTrigger className="text-xs">Technische Details</AccordionTrigger>
                        <AccordionContent>
                            <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto">
                                {JSON.stringify(debugInfo, null, 2)}
                            </pre>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}
        </Alert>
    );
    const NoDataDisplay = ({ customText }: { customText?: string }) => (<Alert><Info className="h-4 w-4" /><AlertTitle>Geen Data</AlertTitle><AlertDescription>{customText || 'Geen data gevonden voor de geselecteerde datum of het geselecteerde jaar.'}</AlertDescription></Alert>);
    
    const DataRenderer = ({ tabId, children }: { tabId: string, children: (data: any) => ReactNode }) => {
        const state = allData[tabId];
        if (!state || state.status === 'loading') return <LoadingIndicator />;
        if (state.status === 'error') return <ErrorDisplay error={state.error} tabName={tabId} debugInfo={state.data?.debugInfo ?? state.error?.debugInfo} />;
        if (state.status === 'success') {
            const data = state.data;
            if (!data || data.error) return <ErrorDisplay error={data?.error || { message: "Data-object is leeg." }} tabName={tabId} debugInfo={data?.debugInfo ?? data?.error?.debugInfo} />;
            
            const hasContent = (d: any): boolean => {
                if (!d) return false;
                if (d.error) return false;
                if (d.data === null) return false;
                if (d.games?.length === 0) return false;
                if (d.medailles === null) return false; // Adjusted check for olympics
                if (d.medailles?.length === 0) return false;
                if (d.songs?.length === 0) return false;
                if (d.movies?.length === 0) return false;
                if (d.series?.length === 0) return false;
                if (d.paragraphs?.length === 0) return false;
                if (d.presidents?.length === 0) return false;
                if (tabId === 'autos') return (d.popular?.cars && d.popular.cars.length > 0) || (d.cheapest?.cars && d.cheapest.cars.length > 0);
                if (tabId === 'films') return (d.movies?.movies && d.movies.movies.length > 0) || (d.dutchFilms?.films && d.dutchFilms.films.length > 0);
                if (tabId === 'politiek') return (d.politiek?.events && d.politiek.events.length > 0) || (d.nederland?.data && d.nederland.data.length > 0);
                return true;
            };

            if (!hasContent(data) && !['elfstedentocht', 'olympische_medailles', 'wk_ek_voetbal'].includes(tabId)) {
                 return <NoDataDisplay />;
            }
            
            return <>{children(data)}</>;
        }
        return null;
    };
  
    return (
      <div className="flex flex-col min-h-screen">
        <div className="no-print">
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 max-w-[1920px] items-center px-4 md:px-8">
                    <Link href="/" className="flex items-center space-x-2 mr-6">
                        <HomeIcon className="h-6 w-6 text-primary" />
                        <span className="font-bold sm:inline-block">HoeWasHetOokAlWeer.nl</span>
                    </Link>
                    <div className="flex flex-1 items-center justify-end space-x-2">
                        {user ? (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
                            {isPremium && <Gem className="h-4 w-4 text-primary" />}
                            {/* Premium expired notification */}
                            {user && !isPremium && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border border-orange-200 dark:border-orange-800 rounded-full">
                                <span className="text-xs text-orange-700 dark:text-orange-300 font-medium">
                                  Premium verlopen
                                </span>
                                <span className="text-xs text-orange-600 dark:text-orange-400">
                                  {user.daysRemaining !== null && user.daysRemaining < 0 ? 
                                    `Verlopen op ${new Date(Date.now() + Math.abs(user.daysRemaining) * 24 * 60 * 60 * 1000)).toLocaleDateString('nl-NL')}` : 
                                    'Verlopen'
                                  }
                                </span>
                                <Button variant="ghost" size="sm" asChild className="h-6 px-2 text-xs bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/50 dark:hover:bg-orange-900/70 text-orange-700 dark:text-orange-300 border-0">
                                  <Link href="/premium">
                                    Verlengen
                                  </Link>
                                </Button>
                              </div>
                            )}
                            {/* Admin link for admin users */}
                            {user.email && ['admin@example.com', 'edwin@editsolutions.nl'].includes(user.email.toLowerCase()) && (
                              <Button variant="ghost" size="sm" asChild>
                                <Link href="/admin/user-status" className="text-primary hover:text-primary/80">
                                  Admin
                                </Link>
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Uitloggen">
                                <LogOut className="h-5 w-5" />
                            </Button>
                        </div>
                        ) : (
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                        </div>
                        )}
                        <ThemeToggleButton />
                    </div>
                </div>
            </header>
            <main className="flex-grow flex flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 max-w-[1920px] mx-auto bg-background w-full">
            <Card className="w-full max-w-xl bg-card shadow-lg rounded-lg mb-2">
            <CardContent className={cn("px-4 space-y-4 sm:space-y-5", showTabs ? "pt-2 pb-2" : "pt-6 pb-6")}>
                {!showTabs && (
                <>
                    {isMounted && currentDate ? (
                        <>
                            <div><Label htmlFor="day-slider" className="block text-sm font-medium text-muted-foreground">Dag: {currentDate.getUTCDate()}</Label><Slider id="day-slider" min={1} max={daysInCurrentMonth} step={1} value={[currentDate.getUTCDate()]} onValueChange={handleDayChange} disabled={isLoading} /></div>
                            <div><Label htmlFor="month-slider" className="block text-sm font-medium text-muted-foreground">Maand: {selectedMonthName}</Label><Slider id="month-slider" min={1} max={12} step={1} value={[currentDate.getUTCMonth() + 1]} onValueChange={handleMonthChange} disabled={isLoading}/></div>
                            <div><Label htmlFor="year-slider" className="block text-sm font-medium text-muted-foreground">Jaar: {selectedYear}</Label><Slider id="year-slider" min={minYearSlider} max={maxYearSlider} step={1} value={[selectedYear]} onValueChange={handleYearChange} disabled={isLoading}/></div>
                        </>
                    ) : (
                        <div className="space-y-4 sm:space-y-5">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-5 w-full" />
                        </div>
                    )}
                </>
                )}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground flex-grow text-center"><CalendarIcon className="inline-block h-6 w-6 mr-2 align-text-bottom"/> {currentDate ? formattedDate : <Skeleton className="h-8 w-64 inline-block"/>}</p>
                  {!showTabs && ( <Button onClick={handleOphalenClick} aria-label="Datum ophalen" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading || !currentDate}> {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Ophalen...</> : 'Ophalen'}</Button> )}
                </div>
                 {!showTabs && !user && (
                  <div className="text-center text-sm pt-2">
                    <Link href="/signup" className="text-primary underline hover:text-primary/80 font-semibold flex items-center justify-center">
                      <UserPlus className="h-4 w-4 mr-2"/>
                      Maak een account aan voor meer mogelijkheden!
                    </Link>
                  </div>
                )}
            </CardContent>
            </Card>
            
            {showTabs && !isPremium && (<div className="w-full max-w-3xl bg-muted/40 p-2 my-4 rounded-md text-center text-sm text-foreground mx-auto">Banner Advertentie Placeholder</div>)}

            {showTabs && (
            <div className="w-full max-w-4xl space-y-4 mt-2">
                {/* Postcard and Analytics Buttons */}
                <div className="flex justify-center gap-4">
                  <Button 
                    onClick={handlePostcardClick} 
                    variant="outline"
                    className="bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-950 dark:to-orange-950 border-primary/20 hover:border-primary/40"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    📮 Stuur Postcard
                  </Button>
                  
                  {/* Analytics Button for Admin Users */}
                  {user && user.email && ['admin@example.com', 'edwin@editsolutions.nl'].includes(user.email.toLowerCase()) && (
                    <Button 
                      variant="outline"
                      asChild
                      className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600"
                    >
                      <Link href="/admin/user-status">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        📊 Analytics
                      </Link>
                    </Button>
                  )}
                </div>

                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="grid grid-cols-responsive-tab-list gap-0 py-2 px-1 h-auto mb-4 bg-card border-2 border-border shadow-sm w-full rounded-md">
                    {tabsOrder.map(tabValue => {
                        let IconComponent: React.ElementType | null = null;
                        const isTabPremiumOnly = premiumOnlyTabs.includes(tabValue);
                        switch(tabValue) {
                            case "knmi_daily_dataset": IconComponent = SunIcon; break;
                            case "weer_records": IconComponent = Trophy; break;
                            case "maand_overzicht_knmi": IconComponent = CloudSunRain; break;
                            case "weer_reeksen": IconComponent = Activity; break;
                            case "weer_uitersten": IconComponent = TrendingUp; break;
                            case "feestdagen": IconComponent = CalendarCheck; break;
                            case "prijzen": IconComponent = Euro; break;
                            case "bevolking": IconComponent = UsersRound; break;
                            case "huis": IconComponent = HomeIcon; break;
                            case "benzine": IconComponent = Fuel; break;
                            case "muziek": IconComponent = MusicIcon; break;
                            case "grandmix": IconComponent = Disc3; break;
                            case "nederlandstalige_top10": IconComponent = Flag; break;
                            case "namen": IconComponent = Baby; break;
                            case "jarig": IconComponent = Gift; break;
                            case "films": IconComponent = FilmIconLucide; break;
                            case "tv_series": IconComponent = Tv2; break;
                            case "games": IconComponent = Gamepad2; break;
                            case "boeken": IconComponent = BookOpen; break;
                            case "gadgets": IconComponent = Smartphone; break;
                            case "elfstedentocht": IconComponent = Snowflake; break;
                            case "politiek": IconComponent = Landmark; break;
                            case "song_festival": IconComponent = SongFestivalIcon; break;
                            case "sporter_van_het_jaar": IconComponent = Medal; break;
                            case "oscars": IconComponent = OscarIcon; break;
                            case "televizier_ring": IconComponent = TelevizierRingIcon; break;
                            case "olympische_medailles": IconComponent = OlympicIcon; break;
                            case "wk_ek_voetbal": IconComponent = Goal; break;
                            case "champions_league": IconComponent = Star; break;
                            case "sport_algemeen": IconComponent = Trophy; break;
                            case "voetbal": IconComponent = SimpleFootballIcon; break;
                            case "forbes_rijkste": IconComponent = DollarSign; break;
                            case "formule_1": IconComponent = Formule1Icon; break;
                            case "rampen": IconComponent = VolcanoIcon; break;
                            case "autos": IconComponent = Car; break;
                            case "presidenten": IconComponent = Users; break;
                            default: return null;
                        }
                        if (!IconComponent) return null;
                        
                        return (
                          <TabsTrigger key={tabValue} value={tabValue} className="p-2 relative hover:bg-accent/80 border-0 rounded-md shadow-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200">
                            <div className="relative">
                              <IconComponent className="h-5 w-5"/>
                              {isTabPremiumOnly && !isPremium && <Gem className="h-3 w-3 absolute -top-1 -right-1 text-primary opacity-90" />}
                            </div>
                          </TabsTrigger>
                        );
                    })}
                    </TabsList>
                {tabsOrder.map(tabId => {
                    return (
                    <TabsContent key={tabId} value={tabId} className="mt-4">
                      {(isPremium === undefined && premiumOnlyTabs.includes(tabId)) ? (
                          <Card className="shadow-lg bg-card border-2 border-border"><CardHeader className="items-center text-center"><CardTitle className="text-card-foreground text-xl flex items-center"><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Status controleren...</CardTitle></CardHeader><CardContent><Skeleton className="h-48 w-full" /></CardContent></Card>
                      ) : (isPremium === false && premiumOnlyTabs.includes(tabId)) ? (
                          <PremiumContentPlaceholder tabId={tabId} />
                      ) : (
                          <DataRenderer tabId={tabId}>
                              {(data) => {
                                  switch(tabId) {
                                      case 'knmi_daily_dataset': return <KnmiDataDisplay data={data} />;
                                      case 'weer_records':
                                        const RecordItem = ({ icon: Icon, label, value, year, yearsAgo }: { icon: React.ElementType, label: string, value: string | null | undefined, year?: string | number | null, yearsAgo?: number | null }) => {
                                            if (!value) return null;
                                            const displayValue = value.replace(/\s*\([^)]+\)/, '').trim();
                                            return (<div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50"><div className="flex items-center gap-4"><Icon className="h-7 w-7 text-primary flex-shrink-0" /><div className="flex flex-col"><span className="font-semibold text-foreground">{label}</span><span className="text-sm text-muted-foreground">{displayValue}</span></div></div><div className="text-right"><span className="font-mono font-semibold bg-primary/10 text-primary px-2.5 py-1.5 rounded-md">{year}</span>{yearsAgo !== null && <p className="text-xs text-muted-foreground mt-1">({yearsAgo} jaar geleden)</p>}</div></div>);
                                        };
                                        const today = new Date();
                                        return <Card><CardHeader><CardTitle className="flex items-center"><Trophy className="mr-2"/>Historische Records voor {formattedDayMonth}</CardTitle><CardDescription>De meest extreme metingen voor deze specifieke dag door de jaren heen.</CardDescription></CardHeader><CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4"><RecordItem icon={TrendingUp} label="Hoogste Max. Temp." value={data.histMaxHigh ? `${data.histMaxHigh}°C` : null} year={data.histMaxHigh?.match(/\(([^)]+)\)/)?.[1]} yearsAgo={data.histMaxHigh ? today.getFullYear() - parseInt(data.histMaxHigh.match(/\(([^)]+)\)/)?.[1] || '0') : null} /><RecordItem icon={TrendingDown} label="Laagste Max. Temp." value={data.histMaxLow ? `${data.histMaxLow}°C` : null} year={data.histMaxLow?.match(/\(([^)]+)\)/)?.[1]} yearsAgo={data.histMaxLow ? today.getFullYear() - parseInt(data.histMaxLow.match(/\(([^)]+)\)/)?.[1] || '0') : null} /><RecordItem icon={TrendingUp} label="Hoogste Min. Temp." value={data.histMinHigh ? `${data.histMinHigh}°C` : null} year={data.histMinHigh?.match(/\(([^)]+)\)/)?.[1]} yearsAgo={data.histMinHigh ? today.getFullYear() - parseInt(data.histMinHigh.match(/\(([^)]+)\)/)?.[1] || '0') : null} /><RecordItem icon={TrendingDown} label="Laagste Min. Temp." value={data.histMinLow ? `${data.histMinLow}°C` : null} year={data.histMinLow?.match(/\(([^)]+)\)/)?.[1]} yearsAgo={data.histMinLow ? today.getFullYear() - parseInt(data.histMinLow.match(/\(([^)]+)\)/)?.[1] || '0') : null} /><RecordItem icon={TrendingUp} label="Hoogste Gem. Temp." value={data.histAvgHigh ? `${data.histAvgHigh}°C` : null} year={data.histAvgHigh?.match(/\(([^)]+)\)/)?.[1]} yearsAgo={data.histAvgHigh ? today.getFullYear() - parseInt(data.histAvgHigh.match(/\(([^)]+)\)/)?.[1] || '0') : null} /><RecordItem icon={TrendingDown} label="Laagste Gem. Temp." value={data.histAvgLow ? `${data.histAvgLow}°C` : null} year={data.histAvgLow?.match(/\(([^)]+)\)/)?.[1]} yearsAgo={data.histAvgLow ? today.getFullYear() - parseInt(data.histAvgLow.match(/\(([^)]+)\)/)?.[1] || '0') : null} /></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: <a href="https://weerstatistieken.nl/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">weerstatistieken.nl <ExternalLink className="inline h-3 w-3"/></a></div></CardFooter></Card>;
                                      case 'maand_overzicht_knmi': return <Card><CardHeader><CardTitle className="flex items-center"><CloudSunRain className="mr-2"/>KNMI Maandoverzicht</CardTitle></CardHeader><CardContent><ScrollArea className="h-72"><div className="space-y-2 text-sm pr-4">{data.paragraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}</div></ScrollArea></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: <a href="https://www.knmi.nl/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">KNMI <ExternalLink className="inline h-3 w-3"/></a></div></CardFooter></Card>;
                                      case 'weer_reeksen':
                                        const streakMessagesConfig: { [key: string]: { icon: React.ElementType, variant: 'default' | 'destructive' | 'warning' | 'info' | 'success', title: string } } = {
                                          maxTempStreak: { icon: ThermometerSun, variant: 'destructive', title: "Warmte Reeks" },
                                          minTempStreak: { icon: ThermometerSnowflake, variant: 'info', title: "Koude Reeks" },
                                          summerDaysMessage: { icon: SunIcon, variant: 'warning', title: "Zomerse Dag" },
                                          frostDaysMessage: { icon: Snowflake, variant: 'info', title: "Vorstdag" },
                                          amplitudeStreakMessage: { icon: Maximize, variant: 'default', title: "Temperatuurverschil" },
                                          maxWindSpeedStreakMessage: { icon: WindIcon, variant: 'default', title: "Windrecord" },
                                          dryDayStreakMessage: { icon: CloudOff, variant: 'success', title: "Droogterecord" },
                                          dryDaysInYearMessage: { icon: CloudOff, variant: 'success', title: "Droge Dagen (Jaar)" },
                                          sunnyDayMessage: { icon: Sunrise, variant: 'warning', title: "Zonnige Dag" },
                                        };
                                        const orderedStreakKeys = ["maxTempStreak", "minTempStreak", "summerDaysMessage", "frostDaysMessage", "dryDayStreakMessage", "sunnyDayMessage", "amplitudeStreakMessage", "maxWindSpeedStreakMessage", "dryDaysInYearMessage"];
                                        const streaksToShow = orderedStreakKeys.map(key => ({ key, value: (data as any)[key] })).filter(item => item.value);

                                        return <Card><CardHeader><CardTitle className="flex items-center"><Activity className="mr-2"/>Weerreeksen & Dashboard</CardTitle><CardDescription>Hoe verhoudt het weer op deze dag zich tot het verleden? Ontdek hier unieke weerreeksen.</CardDescription></CardHeader><CardContent>
                                          <div className="space-y-3">
                                            {streaksToShow.map(({ key, value }) => { const config = streakMessagesConfig[key]; if (!config) return null; const Icon = config.icon; return (<Alert key={key} variant={config.variant}><Icon className="h-4 w-4" /><AlertTitle>{config.title}</AlertTitle><AlertDescription>{value as string}</AlertDescription></Alert>);})}
                                          </div>
                                          <div className="flex items-center gap-4 mt-6">
                                            <Button asChild><Link href={`/weer-dashboard?date=${currentDate.toISOString().split('T')[0]}`} target="_blank"><DashboardIcon className="mr-2" /> Open Volledig Weer Dashboard</Link></Button>
                                            <p className="text-xs text-muted-foreground hidden sm:block">(beste ervaring op desktop)</p>
                                          </div>
                                          </CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: <a href="https://www.knmi.nl/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">KNMI <ExternalLink className="inline h-3 w-3"/></a></div></CardFooter></Card>;
                                      case 'weer_uitersten':
                                        const extremesConfig = { warmest: { label: 'Warmste Dag', icon: ThermometerSun, className: 'text-red-500' }, coldest: { label: 'Koudste Dag', icon: ThermometerSnowflake, className: 'text-blue-500' }, windiest: { label: 'Meeste Wind', icon: WindIcon, className: 'text-gray-500' }, wettest: { label: 'Natste Dag', icon: UmbrellaIcon, className: 'text-sky-600' }, sunniest: { label: 'Zonnigste Dag', icon: SunIcon, className: 'text-yellow-500' } };
                                        return <Card><CardHeader><CardTitle className="flex items-center"><TrendingUp className="mr-2"/>Dagrecords Sinds {selectedYear}</CardTitle><CardDescription>De meest extreme metingen voor {formattedDayMonth} in de periode {selectedYear} tot heden.</CardDescription></CardHeader><CardContent className="space-y-3">{Object.entries(extremesConfig).map(([key, config]) => { const record = data[key] as { value: string; year: number; } | undefined; if (!record) return null; const Icon = config.icon; return (<div key={key} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50"><div className="flex items-center gap-4"><Icon className={cn("h-7 w-7 flex-shrink-0", config.className)} /><div className="flex flex-col"><span className="font-semibold text-foreground">{config.label}</span><span className="text-sm text-muted-foreground">{record.value}</span></div></div><div className="text-right"><span className="font-mono font-semibold bg-primary/10 text-primary px-2.5 py-1.5 rounded-md">{record.year}</span></div></div>); })}</CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: <a href="https://www.knmi.nl/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">KNMI <ExternalLink className="inline h-3 w-3"/></a></div></CardFooter></Card>;
                                      case 'feestdagen': return <Card><CardHeader><CardTitle className="flex items-center"><CalendarCheck className="mr-2"/>Weer op Feestdagen in {selectedYear}</CardTitle><CardDescription>Een overzicht van het weer op de belangrijkste Nederlandse feestdagen.</CardDescription></CardHeader><CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{data.holidays.map((h: HolidayWeatherData) => <Card key={h.name} className="bg-gradient-to-br from-muted/30 to-muted/60 hover:from-muted/40 hover:to-muted/70 transition-all duration-200 border-l-4 border-l-primary/20"><CardHeader className="flex-row items-center justify-between p-3 pb-2"><div className="flex-grow"><CardTitle className="text-base font-medium">{h.name}</CardTitle><p className="text-xs text-muted-foreground">{h.date}</p></div><CalendarIcon className="h-4 w-4 text-muted-foreground"/></CardHeader><CardContent className="p-3 pt-0"><div className="flex justify-between items-center bg-background/50 rounded-lg p-2"><div className="flex items-center gap-2"><ThermometerSun className="h-4 w-4 text-red-500"/><span className="text-sm font-medium">{h.maxTemp ?? 'N/A'}</span></div><div className="flex items-center gap-2"><ThermometerSnowflake className="h-4 w-4 text-blue-500"/><span className="text-sm font-medium">{h.minTemp ?? 'N/A'}</span></div></div></CardContent></Card>)}</CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: <a href="https://www.knmi.nl/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">KNMI <ExternalLink className="inline h-3 w-3"/></a></div></CardFooter></Card>;
                                      case 'prijzen': return <Card><CardHeader><CardTitle className="flex items-center"><Euro className="mr-2"/>Historische Prijzen</CardTitle></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Product</TableHead><TableHead>Prijs (Euro)</TableHead><TableHead>Prijs (Gulden)</TableHead><TableHead className="text-right">Zoek</TableHead></TableRow></TableHeader><TableBody>{data.prices.map((p: any, i:number) => <TableRow key={i}><TableCell>{p.item}</TableCell><TableCell>{p.priceEuro}</TableCell><TableCell>{p.priceGulden}</TableCell><TableCell className="text-right"><Button asChild variant="ghost" size="icon"><a href={`https://www.ah.nl/zoeken?query=${encodeURIComponent(p.item.replace(/\s*\(.*\)\s*/, ''))}`} target="_blank" rel="noopener noreferrer" title={`Zoek ${p.item} op AH.nl`}><ShoppingCart className="h-4 w-4 text-blue-600"/></a></Button></TableCell></TableRow>)}</TableBody></Table></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: <a href="https://historisch-archief.nl" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">historisch-archief.nl <ExternalLink className="inline h-3 w-3"/></a></div></CardFooter></Card>;
                                      case 'bevolking': return <Card><CardHeader><CardTitle className="flex items-center"><UsersRound className="mr-2"/>Bevolkingscijfers</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm">{data.population.map((p: {item: string, value: string}, i: number) => <li key={`${p.item}-${i}`} className="flex justify-between"><span>{p.item}</span><span>{parseInt(p.value).toLocaleString('nl-NL')}</span></li>)}</ul></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: <a href="https://historisch-archief.nl" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">historisch-archief.nl <ExternalLink className="inline h-3 w-3"/></a></div></CardFooter></Card>;
                                      case 'huis': 
                                        const prices = Object.values(data.data.prices as { [key: string]: number });
                                        const maxPrice = Math.max(...prices.filter(p => typeof p === 'number'));
                                        const colorClasses = ['bg-gradient-to-r from-red-500 to-orange-500', 'bg-gradient-to-r from-orange-500 to-yellow-500', 'bg-gradient-to-r from-yellow-500 to-green-500', 'bg-gradient-to-r from-green-500 to-blue-500', 'bg-gradient-to-r from-blue-500 to-purple-500', 'bg-gradient-to-r from-purple-500 to-pink-500'];
                                        return <Card><CardHeader><CardTitle className="flex items-center"><HomeIcon className="mr-2"/>Gem. Huizenprijs in {data.data.year}</CardTitle></CardHeader><CardContent className="space-y-4">{Object.entries(data.data.prices as { [key: string]: number }).sort(([, a], [, b]) => b - a).map(([prov, price], index) => { const percentage = maxPrice > 0 ? (price / maxPrice) * 100 : 0; const colorClass = colorClasses[index % colorClasses.length]; return (<div key={prov} className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"><div className="flex justify-between items-center mb-2 text-sm"><span className="font-medium">{prov}</span><span className="font-semibold text-primary">€ {price.toLocaleString('nl-NL')}</span></div><div className="relative h-4 bg-muted rounded-full overflow-hidden"><div className={`h-full ${colorClass} rounded-full transition-all duration-500 ease-out`} style={{ width: `${percentage}%` }}></div><div className="absolute inset-0 flex items-center justify-center"><span className="text-xs font-medium text-white drop-shadow-sm">{percentage.toFixed(0)}%</span></div></div></div>);})}</CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: CBS StatLine</div></CardFooter></Card>;
                                      case 'benzine':
                                        const priceEntries = Object.entries(data.data.prices as { [key: string]: string });
                                        return <Card><CardHeader><CardTitle className="flex items-center"><Fuel className="mr-2"/>Gem. Brandstofprijzen in {data.data.year}</CardTitle><CardDescription>Adviesprijzen voor brandstof, uitgedrukt in Euro.</CardDescription></CardHeader><CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{priceEntries.map(([key, value]) => { return (<Card key={key} className="bg-muted/50"><CardHeader className="p-4"><CardTitle className="text-base">{key}</CardTitle></CardHeader><CardContent className="p-4 pt-0"><p className="text-2xl font-bold text-primary">{value}</p></CardContent></Card>);})}</CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: CBS StatLine</div></CardFooter></Card>;
                                      case 'muziek': return <Card><CardHeader><CardTitle className="flex items-center"><MusicIcon className="mr-2"/>Top 100 Muziek {selectedYear}</CardTitle></CardHeader><CardContent><ScrollArea className="h-72"><ul className="space-y-2 text-sm pr-4">{data.songs.map((s: Top100Song) => <li key={s.rank} className="flex justify-between items-center group"><span>{s.rank}. {s.title} - <i>{s.artist}</i></span><div className="flex items-center"><a href={`https://open.spotify.com/search/${encodeURIComponent(s.artist + ' ' + s.title)}`} target="_blank" rel="noopener noreferrer" className="p-1"><SpotifyIcon className="h-5 w-5"/></a><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(s.artist + ' ' + s.title)}`} target="_blank" rel="noopener noreferrer" className="p-1"><Youtube className="h-5 w-5 text-red-500"/></a></div></li>)}</ul></ScrollArea></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: <a href="https://www.top40.nl" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">top40.nl <ExternalLink className="inline h-3 w-3"/></a></div></CardFooter></Card>;
                                      case 'grandmix': return <Card><CardHeader><CardTitle className="flex items-center"><Disc3 className="mr-2"/>Grandmix {selectedYear}</CardTitle><CardDescription>{data.data?.iframeHtml ? 'Een iconische jaarmix door Ben Liebrand.' : `Geen Grandmix gevonden voor ${selectedYear}.`}</CardDescription></CardHeader><CardContent>{data.data?.iframeHtml ? <div className="aspect-video" dangerouslySetInnerHTML={{ __html: data.data.iframeHtml }}></div> : <Alert><Info className="h-4 w-4" /><AlertDescription>De Grandmix is niet voor elk jaar beschikbaar, met name voor 1982, 1990 en de periode 1993-1999.</AlertDescription></Alert>}</CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: <a href="https://www.liebrand.nl/grandmix/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">liebrand.nl <ExternalLink className="inline h-3 w-3"/></a></div></CardFooter></Card>;
                                      case 'nederlandstalige_top10': return <Card><CardHeader><CardTitle className="flex items-center"><Flag className="mr-2"/>Nederlandstalige Top 10 {selectedYear}</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm">{data.songs.map((s: Top10NLSong) => <li key={s.position} className="flex justify-between items-center"><span>{s.position}. {s.title} - <i>{s.artist}</i></span><a href={`https://open.spotify.com/search/${encodeURIComponent(s.artist + ' ' + s.title)}`} target="_blank" rel="noopener noreferrer" title={`Zoek op Spotify: ${s.title}`}><SpotifyIcon /></a></li>)}</ul></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Diverse Jaarlijsten</div></CardFooter></Card>;
                                      case 'namen': return <Card><CardHeader><CardTitle className="flex items-center"><Baby className="mr-2"/>Populaire Namen {selectedYear}</CardTitle></CardHeader><CardContent><div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4"><div className="boys"><h4 className="font-semibold text-lg border-b pb-1 mb-2">Jongens</h4><ul className="space-y-1 text-sm">{data.names.boys.map((name: string, i: number) => <li key={`boy-${i}`}>{name}</li>)}</ul></div><div className="girls"><h4 className="font-semibold text-lg border-b pb-1 mb-2">Meisjes</h4><ul className="space-y-1 text-sm">{data.names.girls.map((name: string, i: number) => <li key={`girl-${i}`}>{name}</li>)}</ul></div></div></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: <a href="https://historisch-archief.nl" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">historisch-archief.nl <ExternalLink className="inline h-3 w-3"/></a></div></CardFooter></Card>;

                                      case 'films': return <Card><CardHeader><CardTitle className="flex items-center"><FilmIconLucide className="mr-2"/>Films uit {selectedYear}</CardTitle><CardDescription>Populaire films die in dit jaar zijn uitgebracht.</CardDescription></CardHeader><CardContent><div className="space-y-1"><div><h3 className="font-semibold mb-2 text-lg flex items-center"><Flag className="mr-2 h-5 w-5" />Nederlandse Films</h3>{data.dutchFilms?.films && data.dutchFilms.films.length > 0 ? <ScrollArea className="h-48"><ul className="space-y-2 text-sm">{data.dutchFilms.films.map((f: DutchFilmData) => <li key={f.title} className="flex items-center justify-between"><span>{f.title}</span><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(f.title + ' ' + selectedYear + ' trailer')}`} target="_blank" rel="noopener noreferrer" title={`Zoek trailer voor ${f.title}`}><Youtube className="h-5 w-5 text-red-500 hover:text-red-700 transition-colors" /></a></li>)}</ul></ScrollArea> : <NoDataDisplay />}</div><div className="mt-1"><h3 className="font-semibold mb-2 text-lg flex items-center"><Globe className="mr-2 h-5 w-5" />Internationaal (Top 50)</h3>{data.movies?.movies && data.movies.movies.length > 0 ? <ScrollArea className="h-72"><ul className="space-y-2 text-sm">{data.movies.movies.map((m: MovieData) => <li key={m.rank} className="flex items-center justify-between"><span>{m.rank}. {m.title}</span><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(m.title + ' ' + selectedYear + ' trailer')}`} target="_blank" rel="noopener noreferrer" title={`Zoek trailer voor ${m.title}`}><Youtube className="h-5 w-5 text-red-500 hover:text-red-700 transition-colors" /></a></li>)}</ul></ScrollArea> : <NoDataDisplay />}</div></div></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: <a href="https://www.moviemeter.nl" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">moviemeter.nl <ExternalLink className="inline h-3 w-3"/></a></div></CardFooter></Card>;
                                      case 'tv_series': return <Card><CardHeader><CardTitle className="flex items-center"><Tv2 className="mr-2"/>Top TV Series uit {selectedYear}</CardTitle></CardHeader><CardContent><ScrollArea className="h-72"><ul className="space-y-2 text-sm pr-4">{data.series.map((s: TVSeriesData) => <li key={s.rank} className="flex items-center justify-between"><span>{s.rank}. {s.title} {s.network && `(${s.network})`}</span><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(s.title + ' ' + selectedYear + ' trailer')}`} target="_blank" rel="noopener noreferrer" title={`Zoek trailer voor ${s.title}`}><Youtube className="h-5 w-5 text-red-500 hover:text-red-700 transition-colors"/></a></li>)}</ul></ScrollArea></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: <a href="https://www.moviemeter.nl" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">moviemeter.nl <ExternalLink className="inline h-3 w-3"/></a></div></CardFooter></Card>;
                                      case 'games': return <Card><CardHeader><CardTitle className="flex items-center"><Gamepad2 className="mr-2"/>Populaire Games uit {selectedYear} (Top {data.games.length})</CardTitle><CardDescription>Een selectie van invloedrijke en populaire games van het jaar.</CardDescription></CardHeader><CardContent><Accordion type="single" collapsible className="w-full">{data.games.map((game: Game) => (<AccordionItem value={game.positie} key={game.positie}><AccordionTrigger><div className="flex justify-between w-full pr-2 items-center"><span className="text-left">{game.positie}. {game.titel}</span><div className="flex items-center gap-2"><span className="text-sm font-semibold text-primary">{game.score}</span><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(game.titel + ' ' + selectedYear + ' review')}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1 rounded-full hover:bg-muted"><Youtube className="h-5 w-5 text-red-500"/></a></div></div></AccordionTrigger><AccordionContent><p className="text-sm text-muted-foreground">{game.korte_omschrijving}</p><p className="text-xs text-muted-foreground mt-2">Uitgebracht: {game.datum_uitgifte}</p></AccordionContent></AccordionItem>))}</Accordion></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Metacritic & Gamefaqs</div></CardFooter></Card>;
                                      case 'boeken': return <Card><CardHeader><CardTitle className="flex items-center"><BookOpen className="mr-2"/>Populaire Boeken uit {selectedYear}</CardTitle></CardHeader><CardContent><ScrollArea className="h-72"><ul className="space-y-2 text-sm pr-4">{data.books.map((b: BookData, i: number) => <li key={`${b.title}-${i}`} className="flex items-center justify-between"><span>{b.title} - <em>{b.author}</em></span><a href={`https://www.bol.com/nl/nl/s/?searchtext=${encodeURIComponent(b.title + ' ' + b.author)}`} target="_blank" rel="noopener noreferrer" title={`Zoek op Bol.com: ${b.title}`}><BolIcon className="h-5 w-5 text-blue-600 hover:text-blue-800 transition-colors"/></a></li>)}</ul></ScrollArea></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Diverse Jaarlijsten</div></CardFooter></Card>;
                                      case 'gadgets': return <Card><CardHeader><CardTitle className="flex items-center"><Smartphone className="mr-2"/>Gadget van het Jaar</CardTitle></CardHeader><CardContent><p>{data.gadgets[0].description}</p><Button variant="link" asChild className="p-0 h-auto mt-2"><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(data.gadgets[0].year + " " + data.gadgets[0].description)}`} target="_blank" rel="noopener noreferrer">Zoek fragment op YouTube <ExternalLink className="inline h-3 w-3 ml-1"/></a></Button></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Diverse Tech Jaaroverzichten</div></CardFooter></Card>;
                                      case 'elfstedentocht': return (
                                          <Card>
                                              <CardHeader><CardTitle className="flex items-center"><Snowflake className="mr-2"/>Elfstedentocht</CardTitle></CardHeader>
                                              <CardContent>
                                                  {data.data ? (
                                                      <p className="text-sm">{data.data.description}</p>
                                                  ) : (
                                                      <Alert>
                                                          <Info className="h-4 w-4" />
                                                          <AlertTitle>Geen Tocht Gereden in {selectedYear}</AlertTitle>
                                                          <AlertDescription>De 'Tocht der Tochten' is zeldzaam en vond in dit jaar niet plaats. Deze werd voor het laatst in 1997 verreden. Pas bij extreem strenge en aanhoudende vorst kan de schaatsklassieker weer worden georganiseerd.</AlertDescription>
                                                      </Alert>
                                                  )}
                                              </CardContent>
                                              <CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Diverse Historische Archieven</div></CardFooter>
                                          </Card>
                                      );
                                      case 'politiek': return <Card><CardHeader><CardTitle className="flex items-center"><Landmark className="mr-2"/>Nieuws & Gebeurtenissen in {selectedYear}</CardTitle></CardHeader><CardContent><ScrollArea className="h-72 pr-4">{data.politiek?.events?.length > 0 && <div><h3 className="font-semibold mb-2 text-lg flex items-center"><Globe className="mr-2 h-5 w-5" />Politiek & Wereld</h3><ul className="space-y-2 text-sm list-disc list-inside">{data.politiek.events.map((e: string, i: number) => <li key={`pol-${i}`}>{e}</li>)}</ul></div>}{data.nederland?.data?.length > 0 && <div className="mt-4"><h3 className="font-semibold mb-2 text-lg flex items-center"><Flag className="mr-2 h-5 w-5" />In Nederland</h3><ul className="space-y-2 text-sm list-disc list-inside">{data.nederland.data.map((d: { description: string },i: number) => <li key={`ned-${i}`}>{d.description}</li>)}</ul></div>}{!data.politiek?.events?.length && !data.nederland?.data?.length && (<NoDataDisplay />)}<div className="mt-4"><Button variant="link" asChild className="p-0 h-auto"><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent("Nieuwsoverzicht Nederland " + selectedYear)}`} target="_blank" rel="noopener noreferrer">Zoek nieuwsoverzicht op YouTube <ExternalLink className="inline h-3 w-3 ml-1"/></a></Button></div></ScrollArea></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Diverse Historische Archieven</div></CardFooter></Card>;
                                      case 'song_festival': return <Card><CardHeader><CardTitle className="flex items-center"><SongFestivalIcon className="mr-2"/>Songfestival {data.data.year}</CardTitle><CardDescription>{data.data.description}</CardDescription></CardHeader><CardContent className="space-y-4"><div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950"><p className="text-sm font-semibold">🏆 Winnaar: {data.data.winner.country}</p><p className="text-lg font-bold text-green-700 dark:text-green-300">"{data.data.winner.song}"</p><p className="text-sm text-muted-foreground">door {data.data.winner.artist} <a href={data.data.winner.spotifyLink} target="_blank" rel="noopener noreferrer"><SpotifyIcon className="inline ml-1"/></a></p></div><div className="p-4 border rounded-lg bg-muted/50"><p className="text-sm font-semibold">🇳🇱 Nederland</p><p className="text-lg font-bold">"{data.data.netherlandsEntry.song}"</p><p className="text-sm text-muted-foreground">door {data.data.netherlandsEntry.artist} <a href={data.data.netherlandsEntry.spotifyLink} target="_blank" rel="noopener noreferrer"><SpotifyIcon className="inline ml-1"/></a></p></div></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Wikipedia</div></CardFooter></Card>;
                                      case 'sporter_van_het_jaar': return <Card><CardHeader><CardTitle className="flex items-center"><Medal className="mr-2"/>Sporter van het Jaar {data.data.year}</CardTitle><CardDescription>{data.data.inleiding}</CardDescription></CardHeader><CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">{Object.entries(data.data).filter(([key, value]) => key !== 'year' && key !== 'inleiding' && value !== 'N.v.t.').map(([key, value]) => (<div key={key} className="p-3 bg-muted/50 rounded-lg"><h4 className="font-semibold text-sm capitalize text-muted-foreground">{key.replace(/([A-Z])/g, ' $1')}</h4><p className="font-bold text-primary">{value as string}</p><Button variant="link" asChild className="p-0 h-auto mt-1 text-xs"><a href={`https://www.youtube.com/results?search_query=sportgala+${data.data.year}+${encodeURIComponent(value as string)}`} target="_blank" rel="noopener noreferrer">Zoek op YouTube <ExternalLink className="inline h-3 w-3 ml-1"/></a></Button></div>))}</CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Wikipedia</div></CardFooter></Card>;
                                      case 'oscars': return <Card><CardHeader><CardTitle className="flex items-center"><OscarIcon /> <span className="ml-2">Oscars {data.data.year}</span></CardTitle><CardDescription>{data.data.inleiding}</CardDescription></CardHeader><CardContent><p><strong>Beste Film:</strong> {data.data.besteFilm}</p><p>{data.data.beschrijvingBesteFilm}</p><Button variant="link" asChild className="p-0 h-auto mt-2"><a href={`https://www.youtube.com/results?search_query=Oscars+${data.data.year}+Best+Picture`} target="_blank" rel="noopener noreferrer">Zoek op YouTube <ExternalLink className="inline h-3 w-3 ml-1"/></a></Button></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Wikipedia</div></CardFooter></Card>;
                                      case 'televizier_ring': return <Card><CardHeader><CardTitle className="flex items-center"><TelevizierRingIcon className="mr-2"/>Gouden Televizier-Ring {data.data.year}</CardTitle></CardHeader><CardContent><p><strong>Winnaar:</strong> {data.data.uitzending}</p><p>{data.data.detailInfo}</p><Button variant="link" asChild className="p-0 h-auto mt-2"><a href={`https://www.youtube.com/results?search_query=Gouden+Televizier-Ring+${data.data.year}+${encodeURIComponent(data.data.uitzending)}`} target="_blank" rel="noopener noreferrer">Zoek fragment op YouTube <ExternalLink className="inline h-3 w-3 ml-1"/></a></Button></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Wikipedia</div></CardFooter></Card>;
                                      case 'olympische_medailles':
                                        return (
                                            <Card>
                                                <CardHeader><CardTitle className="flex items-center"><OlympicIcon className="mr-2" />Nederlandse Olympische Medailles (Goud)</CardTitle><CardDescription>Gouden medailles behaald door Nederlanders op de Olympische Spelen van {selectedYear}.</CardDescription></CardHeader>
                                                <CardContent>
                                                    {data.medailles && data.medailles.length > 0 ? (
                                                        <ScrollArea className="h-72"><div className="grid grid-cols-1 md:grid-cols-2 gap-4">{data.medailles.map((m: OlympischeMedailleData, i: number) => (<Card key={i} className="mb-2 bg-muted/50"><CardHeader className="flex-row items-center justify-between p-3 pb-2"><p className="font-semibold flex-grow">{m.sporter}</p><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${m.onderdeel} ${m.sporter} ${m.year} ${m.spelenLocatie}`)}`} target="_blank" rel="noopener noreferrer" title="Zoek op YouTube"><Youtube className="h-5 w-5 text-red-500 hover:text-red-700 transition-colors" /></a></CardHeader><CardContent className="p-3 pt-0"><p className="text-sm text-muted-foreground">{m.onderdeel}</p><p className="text-xs text-muted-foreground/80">{m.spelenLocatie}</p></CardContent></Card>))}</div></ScrollArea>
                                                    ) : (
                                                        <Alert>
                                                          <Info className="h-4 w-4" />
                                                          <AlertTitle>Geen Olympische Spelen of Medailles</AlertTitle>
                                                          <AlertDescription>In {selectedYear} vonden waarschijnlijk geen Olympische Spelen plaats, of er werden geen gouden medailles door Nederland gewonnen. Olympische Spelen vinden plaats in even jaren (zomer) en oneven jaren (winter).</AlertDescription>
                                                        </Alert>
                                                    )}
                                                </CardContent>
                                                <CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Wikipedia</div></CardFooter>
                                            </Card>
                                        );
                                      case 'wk_ek_voetbal':
                                        return (
                                          <Card>
                                              <CardHeader><CardTitle className="flex items-center"><Goal className="mr-2"/>WK/EK Voetbal {selectedYear}</CardTitle></CardHeader>
                                              <CardContent>
                                                  {!data.data ? (
                                                      <Alert>
                                                          <Info className="h-4 w-4" />
                                                          <AlertTitle>Geen WK of EK Voetbal</AlertTitle>
                                                          <AlertDescription>
                                                              Er werd waarschijnlijk geen WK of EK voetbaltoernooi gehouden in {selectedYear}. WK voetbal vindt plaats in jaren die deelbaar zijn door 4 (2022, 2026, etc.), EK voetbal in even jaren tussen WK's (2024, 2028, etc.).
                                                          </AlertDescription>
                                                      </Alert>
                                                  ) : (
                                                      <>
                                                          <p><strong>Winnaar:</strong> {data.data.winnerCountry}</p>
                                                          <p><strong>Uitslag:</strong> {data.data.score}</p>
                                                          <p><strong>Finalist:</strong> {data.data.finalistCountry}</p>
                                                          <Button variant="link" asChild className="p-0 h-auto mt-2">
                                                              <a href={`https://www.youtube.com/results?search_query=${data.data.type}+finale+${data.data.year}+samenvatting`} target="_blank" rel="noopener noreferrer">
                                                                  Zoek samenvatting op YouTube <ExternalLink className="inline h-3 w-3 ml-1"/>
                                                              </a>
                                                          </Button>
                                                      </>
                                                  )}
                                              </CardContent>
                                              <CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Wikipedia</div></CardFooter>
                                          </Card>
                                        );
                                      case 'champions_league': return <Card><CardHeader><CardTitle className="flex items-center"><Star className="mr-2"/>Champions League Finale {data.data.year}</CardTitle><CardDescription>Resultaten van de finale van de Europa Cup I / Champions League.</CardDescription></CardHeader><CardContent className="space-y-4"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><Card className="bg-muted/50 p-4"><p className="text-sm font-semibold">Winnaar</p><p className="text-lg font-bold text-primary">{data.data.winnaarClub}</p><p className="text-xs text-muted-foreground">{data.data.winnaarLand}</p></Card><Card className="bg-muted/50 p-4"><p className="text-sm font-semibold">Finalist</p><p className="text-lg font-bold">{data.data.finalistClub}</p><p className="text-xs text-muted-foreground">{data.data.finalistLand}</p></Card></div><div className="text-center font-bold text-2xl">{data.data.uitslag}</div><Separator /><div className="text-sm text-muted-foreground space-y-1"><p><strong>Datum:</strong> {data.data.finaleDatum}</p><p><strong>Locatie:</strong> {data.data.stadion}, {data.data.stadionPlaats} ({data.data.stadionLand})</p>{data.data.manOfTheMatch && <p><strong>Man of the Match:</strong> {data.data.manOfTheMatch}</p>}</div><Button variant="link" asChild className="p-0 h-auto mt-2"><a href={`https://www.youtube.com/results?search_query=champions+league+finale+${data.data.year}+samenvatting`} target="_blank" rel="noopener noreferrer">Zoek samenvatting op YouTube <ExternalLink className="inline h-3 w-3 ml-1"/></a></Button></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Wikipedia</div></CardFooter></Card>;
                                      case 'sport_algemeen': return <Card><CardHeader><CardTitle className="flex items-center"><Trophy className="mr-2"/>Sportprestaties in {data.data.year}</CardTitle><CardDescription>Een overzicht van enkele belangrijke winnaars in diverse sporten.</CardDescription></CardHeader><CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{Object.entries(data.data).filter(([key]) => key !== 'year').map(([key, value]) => { let title = key.replace(/([A-Z])/g, ' $1'); title = title.charAt(0).toUpperCase() + title.slice(1); let youtubeQuery = `${title} ${data.data.year} ${value}`; if (key === 'wkWielrennen') youtubeQuery = `WK Wielrennen ${data.data.year}`; return value !== 'N.v.t.' && (<Card key={key} className="bg-muted/50"><CardHeader className="pb-2"><CardTitle className="text-base">{title}</CardTitle></CardHeader><CardContent><p className="font-semibold text-primary">{value as string}</p><Button variant="link" asChild className="p-0 h-auto mt-1 text-xs"><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(youtubeQuery)}`} target="_blank" rel="noopener noreferrer">Zoek op YouTube <ExternalLink className="inline h-3 w-3 ml-1"/></a></Button></CardContent></Card>);})}</CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Wikipedia</div></CardFooter></Card>;
                                      case 'voetbal':
                                        const champion = data.data.clubs[0];
                                        return <Card><CardHeader><CardTitle className="flex items-center"><SimpleFootballIcon /> <span className="ml-2">Eredivisie Eindstand {data.data.year}</span></CardTitle><CardDescription>De volledige ranglijst van de Eredivisie voor het seizoen dat eindigde in {data.data.year}.</CardDescription></CardHeader><CardContent><ScrollArea className="h-72"><Table><TableHeader><TableRow><TableHead className="w-[50px]">Pos.</TableHead><TableHead>Club</TableHead></TableRow></TableHeader><TableBody>{data.data.clubs.map((club: string, i: number) => { const isChampion = i === 0; const isRelegated = i >= data.data.clubs.length - 2; return (<TableRow key={`${club}-${i}`} className={cn(isChampion && "bg-green-100/80 dark:bg-green-900/40 font-bold", isRelegated && "bg-red-100/60 dark:bg-red-900/30 opacity-80")}><TableCell className="text-center">{i + 1}</TableCell><TableCell>{club} {isChampion && '🏆'}</TableCell></TableRow>);})}</TableBody></Table></ScrollArea><div className="mt-4"><Button asChild variant="link" className="p-0 h-auto"><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent("Eredivisie " + data.data.year + " Overzicht " + champion)}`} target="_blank" rel="noopener noreferrer">Zoek seizoensoverzicht op YouTube <ExternalLink className="inline h-3 w-3 ml-1"/></a></Button></div></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Wikipedia</div></CardFooter></Card>;
                                      case 'forbes_rijkste': return <Card><CardHeader><CardTitle className="flex items-center"><DollarSign className="mr-2"/>Rijkste Persoon ter Wereld {data.data.year}</CardTitle><CardDescription>Volgens de jaarlijkse lijst van Forbes.</CardDescription></CardHeader><CardContent><div className="mb-4 p-4 border rounded-lg bg-muted/50"><p className="text-lg font-bold text-primary">{data.data.nr1Name}</p><p><strong>Vermogen:</strong> {data.data.nr1Vermogen}</p><p><strong>Leeftijd:</strong> {data.data.nr1Leeftijd}</p><p><strong>Nationaliteit:</strong> {data.data.nr1Nationaliteit}</p><p><strong>Bron van Vermogen:</strong> {data.data.nr1Source}</p></div><Button asChild variant="link" className="p-0 h-auto"><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(data.data.nr1Name + " " + data.data.year + " Forbes")}`} target="_blank" rel="noopener noreferrer">Zoek op YouTube <ExternalLink className="inline h-3 w-3 ml-1"/></a></Button><Separator className="my-4" /><div className="mt-4"> <h4 className="font-semibold mb-2">Top 10 (pos. 2-10):</h4> <ol start={2} className="list-decimal list-inside space-y-1 text-sm">{data.data.top10.split(',').slice(1).map((name: string, i: number) => <li key={i}>{name.trim()}</li>)}</ol></div></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: <a href="https://www.forbes.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Forbes.com <ExternalLink className="inline h-3 w-3"/></a></div></CardFooter></Card>;
                                      case 'rampen': 
                                        const hasRampenOpDatum = data.rampenOpDatum && data.rampenOpDatum.length > 0;
                                        const hasRampenInMaand = data.rampenInMaand && data.rampenInMaand.length > 0;
                                        
                                        if (!hasRampenOpDatum && !hasRampenInMaand) {
                                          return (
                                            <Card>
                                              <CardHeader>
                                                <CardTitle className="flex items-center">
                                                  <VolcanoIcon className="mr-2"/>
                                                  Rampen & Ongevallen
                                                </CardTitle>
                                              </CardHeader>
                                              <CardContent>
                                                <Alert>
                                                  <Info className="h-4 w-4" />
                                                  <AlertTitle>Geen Rampen Geregistreerd</AlertTitle>
                                                  <AlertDescription>
                                                    Voor {formattedDayMonth} {selectedYear} zijn geen specifieke rampen of ongevallen geregistreerd in onze historische database. Dit betekent niet dat er niets gebeurde, maar dat er geen grote rampen of ongevallen met Nederlandse betrokkenheid zijn gedocumenteerd voor deze datum.
                                                  </AlertDescription>
                                                </Alert>
                                              </CardContent>
                                              <CardFooter>
                                                <div className="text-xs text-muted-foreground text-right w-full">
                                                  Bron: Diverse Historische Archieven
                                                </div>
                                              </CardFooter>
                                            </Card>
                                          );
                                        }
                                        
                                        return (
                                          <Card>
                                            <CardHeader>
                                              <CardTitle className="flex items-center">
                                                <VolcanoIcon className="mr-2"/>
                                                Rampen & Ongevallen
                                              </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                              <div className="space-y-6">
                                                {hasRampenOpDatum && (
                                                  <section>
                                                    <h4 className="font-semibold text-lg mb-3 flex items-center">
                                                      <CalendarIcon className="mr-2 h-5 w-5 text-red-500"/>
                                                      Op {formattedDayMonth}:
                                                    </h4>
                                                    <div className="space-y-3">
                                                      {data.rampenOpDatum.map((r: RampData, index: number) => (
                                                        <Card key={`${r.datum}-${index}`} className="bg-red-50 dark:bg-red-950/30 border-l-4 border-l-red-500">
                                                          <CardContent className="p-3">
                                                            <p className="text-sm">{r.beschrijving}</p>
                                                          </CardContent>
                                                        </Card>
                                                      ))}
                                                    </div>
                                                  </section>
                                                )}
                                                
                                                {hasRampenInMaand && (
                                                  <section>
                                                    <h4 className="font-semibold text-lg mb-3 flex items-center">
                                                      <CalendarDays className="mr-2 h-5 w-5 text-orange-500"/>
                                                      In {selectedMonthName}:
                                                    </h4>
                                                    <div className="space-y-3">
                                                      {data.rampenInMaand.map((r: RampData, index: number) => (
                                                        <Card key={`${r.datum}-${index}`} className="bg-orange-50 dark:bg-orange-950/30 border-l-4 border-l-orange-500">
                                                          <CardContent className="p-3">
                                                            <div className="flex justify-between items-start mb-1">
                                                              <span className="text-xs font-medium text-muted-foreground">{r.datum}</span>
                                                            </div>
                                                            <p className="text-sm">{r.beschrijving}</p>
                                                          </CardContent>
                                                        </Card>
                                                      ))}
                                                    </div>
                                                  </section>
                                                )}
                                              </div>
                                            </CardContent>
                                            <CardFooter>
                                              <div className="text-xs text-muted-foreground text-right w-full">
                                                Bron: Diverse Historische Archieven
                                              </div>
                                            </CardFooter>
                                          </Card>
                                        );
                                      case 'formule_1': return <Card><CardHeader><CardTitle className="flex items-center"><Formule1Icon className="mr-2"/>Formule 1 Wereldkampioen {data.data.year}</CardTitle><CardDescription>Resultaten van het Formule 1 seizoen.</CardDescription></CardHeader><CardContent className="space-y-4"><div className="p-4 border rounded-lg bg-muted/50 space-y-1"><p className="text-lg font-bold text-primary">{data.data.coureur}</p><p><strong>Team:</strong> {data.data.team} ({data.data.constructeur})</p><p><strong>Motor:</strong> {data.data.motorleverancier} | <strong>Banden:</strong> {data.data.banden}</p></div><div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"><div className="bg-muted/30 p-2 rounded-md"><p className="text-xs text-muted-foreground">Overwinningen</p><p className="font-semibold text-lg">{data.data.aantal_overwinningen}</p></div><div className="bg-muted/30 p-2 rounded-md"><p className="text-xs text-muted-foreground">Races</p><p className="font-semibold text-lg">{data.data.aantal_races}</p></div><div className="bg-muted/30 p-2 rounded-md"><p className="text-xs text-muted-foreground">Punten</p><p className="font-semibold text-lg">{data.data.punten}</p></div><div className="bg-muted/30 p-2 rounded-md"><p className="text-xs text-muted-foreground">Marge</p><p className="font-semibold text-lg">{data.data.marge}</p></div></div><p className="text-sm text-center text-muted-foreground">Kampioenschap beslist in de <span className="font-semibold text-foreground">{data.data.beslissende_race}</span>.</p><Button variant="link" asChild className="p-0 h-auto"><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent("Formule 1 " + data.data.year + " " + data.data.coureur)}`} target="_blank" rel="noopener noreferrer">Zoek op YouTube <ExternalLink className="inline h-3 w-3 ml-1"/></a></Button></CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Wikipedia</div></CardFooter></Card>;
                                      case 'autos': return <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><Card><CardHeader><CardTitle className="flex items-center"><Car className="mr-2"/>Populairste Auto's</CardTitle><CardDescription>De meest verkochte automodellen in {selectedYear}.</CardDescription></CardHeader><CardContent>{(data.popular?.cars && data.popular.cars.length > 0) ? (<ol className="list-decimal list-inside space-y-2 text-sm">{data.popular.cars.map((car: PopularCarInfo, i: number) => <li key={i}><span className="font-semibold">{car.brand} {car.model}</span><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(car.brand + " " + car.model + " " + selectedYear + " Review Test")}`} target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center text-red-500 hover:text-red-700 transition-colors"><Youtube className="h-4 w-4"/></a><p className="text-xs text-muted-foreground pl-4">{car.description}</p></li>)}</ol>) : <NoDataDisplay />}</CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Autoweek</div></CardFooter></Card><Card><CardHeader><CardTitle className="flex items-center"><Euro className="mr-2"/>Goedkoopste Auto's</CardTitle><CardDescription>Enkele van de meest betaalbare nieuwe auto's in {selectedYear}.</CardDescription></CardHeader><CardContent>{(data.cheapest?.cars && data.cheapest.cars.length > 0) ? (<ol className="list-decimal list-inside space-y-2 text-sm">{data.cheapest.cars.map((car: CheapestCarInfo, i: number) => <li key={i}><span className="font-semibold">{car.brand} {car.model}</span><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(car.brand + " " + car.model + " " + selectedYear + " Review Test")}`} target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center text-red-500 hover:text-red-700 transition-colors"><Youtube className="h-4 w-4"/></a></li>)}</ol>) : <NoDataDisplay />}</CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Autoweek</div></CardFooter></Card></div>;
                                      case 'presidenten': return <Card><CardHeader><CardTitle className="flex items-center"><Users className="mr-2"/>Staatshoofden in {selectedYear}</CardTitle></CardHeader><CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">{data.presidents.map((p: PresidentData, i: number) => <Card key={i} className="bg-muted/50"><CardHeader className="flex-row items-center justify-between pb-2"><CardTitle className="text-base font-medium">{p.country}</CardTitle><a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(p.president)}`} target="_blank" rel="noopener noreferrer"><Youtube className="h-5 w-5 text-red-500"/></a></CardHeader><CardContent><p className="text-lg font-bold text-primary">{p.president}</p><p className="text-sm text-muted-foreground">{p.party}</p></CardContent></Card>)}</CardContent><CardFooter><div className="text-xs text-muted-foreground text-right w-full">Bron: Wikipedia</div></CardFooter></Card>;
                                      default: return <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>;
                                  }
                              }}
                          </DataRenderer>
                      )}
                    </TabsContent>
                )})}
            </Tabs>
            <div className="flex flex-col sm:flex-row items-center justify-center pt-4 gap-4">
              <Button onClick={handleNieuweDatumClick} variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">Nieuwe datum selecteren</Button>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <Button variant="outline" size="icon" onClick={handleShareFacebook} aria-label="Deel op Facebook" disabled={!currentDate}><FacebookIcon /></Button>
                <Button variant="outline" size="icon" onClick={handleShareTwitter} aria-label="Deel op X" disabled={!currentDate}><XIcon className="h-5 w-5" /></Button>
                <Button variant="outline" size="icon" onClick={handleShareBlueSky} aria-label="Deel op BlueSky" disabled={!currentDate}><BlueSkyIcon /></Button>
                <Button variant="outline" size="icon" onClick={handleShareWhatsApp} aria-label="Deel op WhatsApp" disabled={!currentDate}><MessageSquare className="h-5 w-5 text-green-500" /></Button>
                <Button variant="outline" size="icon" onClick={handleShareInstagram} aria-label="Deel op Instagram" disabled={!currentDate}><Instagram className="h-5 w-5" /></Button>
                <Button variant="outline" size="icon" onClick={handleShareEmail} aria-label="Deel via E-mail" disabled={!currentDate}><Mail className="h-5 w-5" /></Button>
                <Button variant="outline" size="icon" onClick={handleCopyToClipboard} aria-label="Kopieer link" disabled={!currentDate}><ClipboardCopy className="h-5 w-5" /></Button>
              </div>
            </div>
            </div>
            )}
            </main>
            <footer className="p-4 text-center text-sm text-muted-foreground flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
                <Link href="/contact" className="hover:text-primary underline">Contact</Link>
                <Link href="/faq" className="hover:text-primary underline">FAQ</Link>
                <Link href="/cookies" className="hover:text-primary underline">Cookies</Link>
                <Link href="/disclaimer" className="hover:text-primary underline">Disclaimer</Link>
                <Link href="/premium" className="hover:text-primary underline text-muted-foreground flex items-center"><Gem className="mr-1 h-3 w-3" />Premium</Link>
                {user && user.email === 'admin@example.com' && (<Link href="/admin/user-status" className="hover:text-primary underline flex items-center"><UserCog className="h-4 w-4 mr-1" /> Admin</Link>)}
                {!user && <Link href="/login" className="hover:text-primary underline">Login</Link>}
                {user && <span className="text-muted-foreground hidden sm:inline">|</span>}
                {user && <button onClick={handleLogout} className="hover:text-primary underline">Logout</button>}
                <span className="text-muted-foreground/80">v0.72</span>
            </footer>
        </div>
                                {!isPremium && <AdPlaceholderModal open={adModalOpen} onOpenChange={setAdModalOpen} /> }
                        <PremiumPopup 
                            open={premiumPopupOpen} 
                            onOpenChange={setPremiumPopupOpen} 
                            onContinue={handlePremiumPopupContinue} 
                        />
      </div>
  );
}
