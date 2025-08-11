
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Belangrijke informatie en disclaimer voor het gebruik van de HoeWasHetOokAlweer.nl applicatie.',
  robots: { // Goed om disclaimer niet te prominent te indexeren, maar wel vindbaar
    index: true,
    follow: true,
  }
};

export default function DisclaimerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 max-w-3xl mx-auto bg-background">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground text-center">
        Disclaimer
      </h1>
      <Card className="w-full bg-card shadow-lg rounded-lg mb-8">
        <CardHeader>
          <CardTitle className="text-card-foreground">Belangrijke informatie</CardTitle>
        </CardHeader>
        <CardContent className="text-card-foreground space-y-4">
          <p>
            De inhoud van deze webpagina is samengesteld uit informatie van verschillende bronnen.
            Per onderdeel wordt de specifieke bron aangegeven inclusief link naar de betreffende website.
            De links naar externe bronnen vallen buiten onze verantwoordelijkheid.
          </p>
          <p>
            De teksten op deze website zijn beschikbaar onder de licentie <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.nl" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Creative Commons Naamsvermelding/Gelijk delen</a>, tenzij anders aangegeven bij de specifieke bron.
          </p>
          <p>
            Hoewel wij ons uiterste best doen om te zorgen dat de informatie op onze website correct is, kunt u aan de inhoud geen rechten ontlenen.
            Wij aanvaarden geen enkele aansprakelijkheid voor onjuistheden of onvolledigheden in de verstrekte informatie, noch voor enige schade die zou kunnen voortvloeien uit het gebruik van deze informatie.
          </p>
        </CardContent>
      </Card>
      <div className="w-full flex justify-center mt-8">
        <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/">
            Sluiten
          </Link>
        </Button>
      </div>
    </main>
  );
}
