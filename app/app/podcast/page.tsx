
"use client";

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Headphones, Rocket, Gem, User, Loader2, CalendarIcon } from 'lucide-react';
import { getAuth, onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { app } from '@/lib/firebase';
import Image from 'next/image';

// export const metadata: Metadata = { // Metadata can't be exported from client components
//   title: 'Persoonlijke Podcast - HoeWasHetOokAlWeer.nl',
//   description: 'Genereer een unieke, persoonlijke podcast gebaseerd op een belangrijke datum in uw leven.',
// };

export default function PodcastLandingPage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isPremium, setIsPremium] = useState<boolean | undefined>(undefined);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (!app) {
      setAuthLoading(false);
      setIsPremium(false);
      return;
    }
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // This is a simplified check. A robust check would involve verifying against a backend.
        // For this example, we'll assume a local flag or a custom claim would be set.
        const premiumStatus = localStorage.getItem('hwha_is_premium') === 'true';
        setIsPremium(premiumStatus);
      } else {
        setIsPremium(false);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const renderContent = () => {
    if (authLoading) {
      return (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (isPremium) {
      return (
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Als premium gebruiker kunt u uw unieke, persoonlijke podcast genereren. Ga naar de hoofdpagina om een datum te selecteren.
          </p>
          <Button asChild size="lg">
            <Link href="/">
              <CalendarIcon className="mr-2 h-5 w-5" /> Naar de Hoofdpagina
            </Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="text-center">
        <p className="text-muted-foreground mb-6">
          Deze unieke feature is exclusief voor premium leden. Upgrade nu en maak uw eigen persoonlijke podcast!
        </p>
        <Button asChild size="lg" variant="default">
          <Link href="/premium">
            <Gem className="mr-2 h-5 w-5" /> Ontdek Premium
          </Link>
        </Button>
      </div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 max-w-4xl mx-auto bg-background">
      <div className="w-full">
        <div className="text-center mb-8">
          <Headphones className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Uw Persoonlijke Podcast van Toen
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Een unieke audio-ervaring, speciaal voor u gemaakt door AI.
          </p>
        </div>

        <Card className="w-full bg-card shadow-lg rounded-lg mb-8 overflow-hidden">
          <div className="relative h-60 w-full">
            <Image
              src="/krantenkop.png"
              alt="Vintage microfoon en koptelefoon"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
              <h2 className="text-3xl font-bold text-white text-center drop-shadow-lg">
                Herbeleef Uw Speciale Dag in Audio
              </h2>
            </div>
          </div>
          <CardContent className="p-6 text-card-foreground space-y-4">
            <p>
              Stel u voor: u luistert naar een podcast die niet alleen het nieuws en de sfeer van een specifieke dag uit het verleden tot leven brengt, maar ook uw eigen persoonlijke gebeurtenis daarin verwerkt. Of het nu een verjaardag, een jubileum of de dag dat u iemand ontmoette is, onze AI weeft uw verhaal naadloos in de geschiedenis.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-4">
              <li><strong>Hyper-persoonlijk:</strong> Voer uw gebeurtenis en een naam in, en onze AI doet de rest.</li>
              <li><strong>Twee Professionele Stemmen:</strong> Een mannelijke en vrouwelijke presentator bespreken het nieuws, de muziek en de sfeer van toen.</li>
              <li><strong>Direct Luisteren & Downloaden:</strong> Na het genereren kunt u de podcast direct afspelen en downloaden als aandenken.</li>
            </ul>
            <div className="pt-4">{renderContent()}</div>
          </CardContent>
        </Card>

        <div className="w-full flex justify-center mt-8">
          <Button asChild variant="outline">
            <Link href="/">Terug naar de hoofdpagina</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
