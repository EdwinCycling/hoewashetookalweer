
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe, Link as LinkIcon, Server } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Domein Koppelen - Instructies',
  description: 'Stappenplan voor het koppelen van uw eigen domeinnaam aan uw applicatie via Firebase Hosting.',
  robots: {
    index: false, // This is an instructional page, no need to index
    follow: false,
  }
};

export default function DomeinPage() {
  const firebaseConsoleUrl = "https://console.firebase.google.com/";

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 max-w-3xl mx-auto bg-background">
      <div className="flex flex-col items-center mb-8">
        <Globe className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center">
          Uw Domein Koppelen
        </h1>
        <p className="mt-2 text-lg text-muted-foreground text-center">
          Volg deze stappen om uw domeinnaam te koppelen via Firebase Hosting.
        </p>
      </div>

      <Card className="w-full bg-card shadow-lg rounded-lg mb-8">
        <CardHeader>
          <CardTitle className="text-card-foreground">Stappenplan</CardTitle>
          <CardDescription className="text-muted-foreground">
            Het koppelen van een domein gebeurt volledig in de Firebase Console.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-card-foreground space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center mr-3">1</span>
              Ga naar de Firebase Console
            </h3>
            <p className="text-muted-foreground pl-9">
              Open uw project in de Firebase Console. Navigeer in het linkermenu naar <strong>Build &gt; Hosting</strong>.
            </p>
            <div className="pl-9 mt-3">
              <Button asChild>
                <a href={firebaseConsoleUrl} target="_blank" rel="noopener noreferrer">
                  <LinkIcon className="mr-2 h-4 w-4" /> Open Firebase Console
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center mr-3">2</span>
              Voeg een aangepast domein toe
            </h3>
            <p className="text-muted-foreground pl-9">
              Klik op de knop <strong>"Aangepast domein toevoegen"</strong>. Voer uw domeinnaam in (bijv. `www.uwdomein.nl` of `uwdomein.nl`) en volg de instructies.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center mr-3">3</span>
              Verifieer uw domeineigendom
            </h3>
            <p className="text-muted-foreground pl-9">
              Firebase zal u vragen om een <strong>TXT-record</strong> toe te voegen aan de DNS-instellingen van uw domein. Dit is om te bewijzen dat u de eigenaar bent. U vindt de DNS-instellingen bij de provider waar u uw domein heeft gekocht (bijv. TransIP, Strato, GoDaddy).
            </p>
             <p className="text-muted-foreground pl-9 mt-2">
              Het kan even duren (van enkele minuten tot een uur) voordat Firebase de verificatie heeft voltooid.
            </p>
          </div>

           <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center mr-3">4</span>
              Voeg A-records toe
            </h3>
            <p className="text-muted-foreground pl-9">
              Nadat de verificatie is gelukt, toont Firebase u een of twee <strong>A-records</strong> (IP-adressen). Voeg deze ook toe aan uw DNS-instellingen. Hiermee wordt uw domein daadwerkelijk naar uw applicatie op Firebase verwezen.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center mr-3">5</span>
              Wacht op propagatie
            </h3>
            <p className="text-muted-foreground pl-9">
              Het kan <strong>tot 24 uur</strong> duren voordat de DNS-wijzigingen wereldwijd zijn doorgevoerd en uw website op uw nieuwe domein bereikbaar is. Firebase zal ook automatisch een SSL-certificaat voor u aanmaken, wat ook even kan duren.
            </p>
             <p className="text-muted-foreground pl-9 mt-2">
              Zodra in de Firebase Console de status op "Verbonden" staat, is het proces voltooid!
            </p>
          </div>

        </CardContent>
      </Card>

      <div className="w-full flex justify-center mt-8">
        <Button asChild variant="outline">
          <Link href="/">
            Terug naar de hoofdpagina
          </Link>
        </Button>
      </div>
    </main>
  );
}
