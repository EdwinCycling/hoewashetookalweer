
"use client";

import { Suspense, useState, useEffect } from 'react';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, Home, LineChart, Sun, Umbrella, Thermometer, Calendar, Wind, CloudSun, Gauge, Droplets, Info, Trophy, TrendingUp, TrendingDown, Maximize, CloudOff, Sunrise, ThermometerSun, ThermometerSnowflake, Activity, CloudSunRain, User, Flame, Snowflake, Printer } from 'lucide-react';
import { fetchWeatherStreaks, type FetchWeatherStreaksResult, type SelectedDayWeatherDetails } from '@/actions/knmi-weather-streaks';
import Link from 'next/link';
import { Bar, BarChart, CartesianGrid, Label, Line, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { format as formatDateFns, isValid, parseISO } from 'date-fns';
import { nl } from 'date-fns/locale';

// Weather Details Display
const SelectedWeatherDetailsCard = ({ details }: { details: SelectedDayWeatherDetails }) => {
  if (!details) return null;
  const detailItems = [
    { label: "Gemiddelde Temp.", value: details.gemiddeldeTemp, icon: Thermometer },
    { label: "Maximum Temp.", value: details.maxTemp, icon: ThermometerSun },
    { label: "Minimum Temp.", value: details.minTemp, icon: ThermometerSnowflake },
    { label: "Gevoelstemperatuur", value: details.gevoelstemperatuur, icon: User },
    { label: "Hitte-Index", value: details.hitteIndex, icon: Flame },
    { label: "Windrichting", value: details.windRichting, icon: Wind },
    { label: "Gem. Windsnelheid", value: details.windSnelheidGemiddeld, icon: Wind },
    { label: "Max. Uurgem. Wind", value: details.windSnelheidMaxUur, icon: Wind },
    { label: "Max. Windstoot", value: details.maxWindstoot, icon: Wind },
    { label: "Zonneschijn (duur)", value: details.zonneschijnDuur, icon: Sun },
    { label: "Zonneschijn (%)", value: details.zonneschijnPercentage, icon: Sun },
    { label: "Bewolking", value: details.bewolkingOmschrijving, icon: CloudSun },
    { label: "Neerslag", value: details.neerslagHoeveelheid, icon: Umbrella },
    { label: "Duur Neerslag", value: details.neerslagDuur, icon: Umbrella },
    { label: "Luchtdruk", value: details.luchtdruk, icon: Gauge },
    { label: "Vochtigheid", value: details.luchtvochtigheid, icon: Droplets },
  ].filter(item => item.value);

  return (
    <Card className="print-avoid-break">
      <CardHeader>
        <CardTitle>Weerdetails van de Dag</CardTitle>
        <CardDescription>Een gedetailleerd overzicht van de metingen op deze dag.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {detailItems.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
            <Icon className="h-6 w-6 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-sm font-semibold">{value}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// Historical Records Display
const HistoricalRecordsCard = ({ stats, date }: { stats: FetchWeatherStreaksResult['historicalWeatherStats'], date: string | null }) => {
  if (!stats || !date) return null;
  const formattedDayMonth = formatDateFns(new Date(date), 'd MMMM', { locale: nl });
  const today = new Date();

  const RecordItem = ({ icon: Icon, label, value, year, yearsAgo }: { icon: React.ElementType, label: string, value: string | null | undefined, year?: string | number | null, yearsAgo?: number | null }) => {
    if (!value) return null;
    const displayValue = value.replace(/\s*\([^)]+\)/, '').trim();
    return (
      <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50">
        <div className="flex items-center gap-4">
          <Icon className="h-7 w-7 text-primary flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">{label}</span>
            <span className="text-sm text-muted-foreground">{displayValue}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="font-mono font-semibold bg-primary/10 text-primary px-2.5 py-1.5 rounded-md">{year}</span>
          {yearsAgo !== null && <p className="text-xs text-muted-foreground mt-1">({yearsAgo} jaar geleden)</p>}
        </div>
      </div>
    );
  };
  return (
    <Card className="print-avoid-break">
      <CardHeader>
        <CardTitle className="flex items-center"><Trophy className="mr-2"/>Historische Records voor {formattedDayMonth}</CardTitle>
        <CardDescription>De meest extreme metingen voor deze specifieke dag door de jaren heen.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RecordItem icon={TrendingUp} label="Hoogste Max. Temp." value={stats.histMaxHigh ? `${stats.histMaxHigh}°C` : null} year={stats.histMaxHigh?.match(/\(([^)]+)\)/)?.[1]} yearsAgo={stats.histMaxHigh ? today.getFullYear() - parseInt(stats.histMaxHigh.match(/\(([^)]+)\)/)?.[1] || '0') : null} />
        <RecordItem icon={TrendingDown} label="Laagste Max. Temp." value={stats.histMaxLow ? `${stats.histMaxLow}°C` : null} year={stats.histMaxLow?.match(/\(([^)]+)\)/)?.[1]} yearsAgo={stats.histMaxLow ? today.getFullYear() - parseInt(stats.histMaxLow.match(/\(([^)]+)\)/)?.[1] || '0') : null} />
        <RecordItem icon={TrendingUp} label="Hoogste Min. Temp." value={stats.histMinHigh ? `${stats.histMinHigh}°C` : null} year={stats.histMinHigh?.match(/\(([^)]+)\)/)?.[1]} yearsAgo={stats.histMinHigh ? today.getFullYear() - parseInt(stats.histMinHigh.match(/\(([^)]+)\)/)?.[1] || '0') : null} />
        <RecordItem icon={TrendingDown} label="Laagste Min. Temp." value={stats.histMinLow ? `${stats.histMinLow}°C` : null} year={stats.histMinLow?.match(/\(([^)]+)\)/)?.[1]} yearsAgo={stats.histMinLow ? today.getFullYear() - parseInt(stats.histMinLow.match(/\(([^)]+)\)/)?.[1] || '0') : null} />
      </CardContent>
    </Card>
  );
};

// Weather Streaks Display
const WeatherStreaksCard = ({ data }: { data: FetchWeatherStreaksResult }) => {
  const streakMessagesConfig: { [key: string]: { icon: React.ElementType, variant: 'default' | 'destructive' | 'warning' | 'info' | 'success', title: string } } = {
    maxTempStreak: { icon: ThermometerSun, variant: 'destructive', title: "Warmte Reeks" },
    minTempStreak: { icon: ThermometerSnowflake, variant: 'info', title: "Koude Reeks" },
    summerDaysMessage: { icon: Sun, variant: 'warning', title: "Zomerse Dag" },
    frostDaysMessage: { icon: Snowflake, variant: 'info', title: "Vorstdag" },
    amplitudeStreakMessage: { icon: Maximize, variant: 'default', title: "Temperatuurverschil" },
    maxWindSpeedStreakMessage: { icon: Wind, variant: 'default', title: "Windrecord" },
    dryDayStreakMessage: { icon: CloudOff, variant: 'success', title: "Droogterecord" },
  };
  const orderedStreakKeys = ["maxTempStreak", "minTempStreak", "summerDaysMessage", "frostDaysMessage", "dryDayStreakMessage", "amplitudeStreakMessage", "maxWindSpeedStreakMessage"];
  const streaksToShow = orderedStreakKeys.map(key => ({ key, value: (data as any)[key] })).filter(item => item.value);

  return (
    <Card className="print-avoid-break">
      <CardHeader>
        <CardTitle className="flex items-center"><Activity className="mr-2"/>Weerreeksen</CardTitle>
        <CardDescription>Hoe verhoudt het weer op deze dag zich tot het verleden?</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {streaksToShow.length > 0 ? (
          streaksToShow.map(({ key, value }) => {
            const config = streakMessagesConfig[key];
            if (!config) return null;
            const Icon = config.icon;
            return (
              <Alert key={key} variant={config.variant}>
                <Icon className="h-4 w-4" />
                <AlertTitle>{config.title}</AlertTitle>
                <AlertDescription>{value as string}</AlertDescription>
              </Alert>
            );
          })
        ) : (
          <p className="text-sm text-muted-foreground">Geen opvallende weerreeksen gevonden voor deze dag.</p>
        )}
      </CardContent>
    </Card>
  );
};


// KNMI Monthly Overview Display
const KnmiMonthlyOverviewCard = ({ overview }: { overview: FetchWeatherStreaksResult['knmiMonthlyOverview'] }) => {
  if (!overview || (!overview.paragraphs && !overview.error)) return null;

  return (
    <Card className="print-avoid-break">
      <CardHeader>
        <CardTitle className="flex items-center"><CloudSunRain className="mr-2"/>KNMI Maandoverzicht</CardTitle>
        <CardDescription>Het officiële, uitgeschreven weeroverzicht van het KNMI voor deze maand.</CardDescription>
      </CardHeader>
      <CardContent>
        {overview.error ? (
          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Overzicht niet beschikbaar</AlertTitle>
            <AlertDescription>{overview.error}</AlertDescription>
          </Alert>
        ) : overview.paragraphs && overview.paragraphs.length > 0 ? (
          <ScrollArea className="h-72">
            <div className="space-y-2 text-sm pr-4">
              {overview.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-sm text-muted-foreground">Geen maandoverzicht gevonden.</p>
        )}
      </CardContent>
    </Card>
  );
};

const PageHeader = ({ dateParam }: { dateParam: string | null }) => {
  const handlePrint = () => {
    window.print();
  };

  const formattedTitleDate = dateParam && isValid(parseISO(dateParam)) 
    ? formatDateFns(parseISO(dateParam), 'd MMMM yyyy', { locale: nl }) 
    : 'uw geselecteerde dag';

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 no-print">
      <div className="text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Weer Dashboard
        </h1>
        <p className="mt-2 text-md text-muted-foreground">
          Een diepere duik in de weerdata voor {formattedTitleDate}.
        </p>
      </div>
      <Button onClick={handlePrint} className="mt-4 md:mt-0 self-center md:self-auto">
        <Printer className="mr-2 h-5 w-5" />
        Print Dashboard
      </Button>
    </div>
  );
};


function WeatherDashboardContent() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');
  const [data, setData] = useState<FetchWeatherStreaksResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dateParam) {
      setError("Geen datum geselecteerd. Ga terug en selecteer een datum.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchWeatherStreaks(new Date(dateParam), {
          includeChartData: true,
          includeYearlyChartData: true,
          includeKnmiMonthlyOverview: true,
        });
        if (result.error) {
          setError(result.error);
        }
        setData(result);
      } catch (err: any) {
        setError(err.message || "Er is een onbekende fout opgetreden.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateParam]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Dashboard wordt geladen...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Fout</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
           <div className="mt-4">
              <Button asChild variant="outline"><Link href="/">Terug naar Home</Link></Button>
            </div>
        </Alert>
      </div>
    );
  }

  if (!data) {
    return (
       <div className="flex items-center justify-center min-h-screen p-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Geen Data</AlertTitle>
          <AlertDescription>Kon de dashboard data niet laden voor de geselecteerde datum.</AlertDescription>
           <div className="mt-4">
              <Button asChild variant="outline"><Link href="/">Terug naar Home</Link></Button>
            </div>
        </Alert>
      </div>
    );
  }

  const { weatherChartData, yearlyTemperatureData, averageYearlyMaxTemp, averageYearlyMinTemp, selectedDayWeatherDetails, historicalWeatherStats, knmiMonthlyOverview } = data;

  const fifteenDayChartConfig = {
    maxTemp: { label: "Max Temp (°C)", color: "hsl(var(--destructive))" },
    minTemp: { label: "Min Temp (°C)", color: "hsl(var(--chart-2))" },
    precipitation: { label: "Neerslag (mm)", color: "hsl(var(--chart-3))" },
    sunshineHours: { label: "Zonuren", color: "hsl(var(--chart-4))" },
  };
  
  const yearlyChartConfig = {
    maxTemp: { label: "Max Temp (°C)", color: "hsl(var(--destructive))" },
    minTemp: { label: "Min Temp (°C)", color: "hsl(var(--chart-2))" },
    avgMaxTemp: { label: "Gem. Max", color: "hsla(var(--destructive), 0.5)" },
    avgMinTemp: { label: "Gem. Min", color: "hsla(var(--chart-2), 0.5)" },
  };

  return (
    <>
        <PageHeader dateParam={dateParam} />
        {selectedDayWeatherDetails && <SelectedWeatherDetailsCard details={selectedDayWeatherDetails} />}
        {historicalWeatherStats && <HistoricalRecordsCard stats={historicalWeatherStats} date={dateParam} />}
        <WeatherStreaksCard data={data} />
        {weatherChartData && (
            <Card className="print-avoid-break">
                <CardHeader>
                    <CardTitle className="flex items-center"><LineChart className="mr-2"/>15-Daags Weeroverzicht</CardTitle>
                    <CardDescription>Weerontwikkeling rondom {data.debugInfo.selectedDateISO?.split('T')[0]}.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={fifteenDayChartConfig} className="h-[400px] w-full">
                        <ComposedChart data={weatherChartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis yAxisId="temp" orientation="left" stroke="#ef4444" label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
                            <YAxis yAxisId="precip" orientation="right" stroke="#0ea5e9" label={{ value: 'mm / uur', angle: -90, position: 'insideRight' }} />
                            <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                            <Legend />
                            <Bar dataKey="precipitation" yAxisId="precip" name="Neerslag" fill="var(--color-precipitation)" radius={4} />
                            <Line type="monotone" dataKey="maxTemp" yAxisId="temp" name="Max Temp" stroke="var(--color-maxTemp)" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="minTemp" yAxisId="temp" name="Min Temp" stroke="var(--color-minTemp)" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="sunshineHours" yAxisId="precip" name="Zonuren" stroke="var(--color-sunshineHours)" strokeWidth={2} dot={false} />
                        </ComposedChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        )}
        
        {yearlyTemperatureData && (
            <Card className="print-avoid-break">
                <CardHeader>
                    <CardTitle className="flex items-center"><Calendar className="mr-2"/>Jaarlijkse Temperatuurvergelijking</CardTitle>
                    <CardDescription>Hoe verhoudt de temperatuur op deze dag zich tot de omliggende jaren?</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={yearlyChartConfig} className="h-[400px] w-full">
                        <BarChart data={yearlyTemperatureData}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="displayYear" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis label={{ value: '°C', angle: -90, position: 'insideLeft' }}/>
                            <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                            <Legend />
                            <Bar dataKey="maxTemp" name="Max Temp" fill="var(--color-maxTemp)" radius={4} />
                            <Bar dataKey="minTemp" name="Min Temp" fill="var(--color-minTemp)" radius={4} />
                             {averageYearlyMaxTemp !== null && <Line dataKey={() => averageYearlyMaxTemp} name="Gem. Max" stroke="var(--color-avgMaxTemp)" strokeDasharray="3 3" dot={false} />}
                             {averageYearlyMinTemp !== null && <Line dataKey={() => averageYearlyMinTemp} name="Gem. Min" stroke="var(--color-avgMinTemp)" strokeDasharray="3 3" dot={false} />}
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        )}

        {knmiMonthlyOverview && <KnmiMonthlyOverviewCard overview={knmiMonthlyOverview} />}
         <div className="w-full flex justify-center mt-10 no-print">
          <Button variant="outline" onClick={() => window.close()}>
            <Home className="mr-2" /> Venster Sluiten
          </Button>
        </div>
    </>
  );
}


export default function WeatherDashboardPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 bg-background">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-primary"/>
                <p className="mt-4 text-muted-foreground">Dashboard wordt geladen...</p>
            </div>
        }>
            <WeatherDashboardContent />
        </Suspense>
      </div>
    </main>
  );
}
