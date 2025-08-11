
"use client";

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, PartyPopper, Loader2 } from 'lucide-react';
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

// This component actually uses the hook and must be inside Suspense
function SuccessContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  return <SuccessUI email={email} />;
}

// This component just displays the UI and receives data via props
function SuccessUI({ email }: { email: string | null }) {
  const router = useRouter();
  const { toast } = useToast();

  React.useEffect(() => {
    toast({
      title: "Betaling Succesvol!",
      description: "Uw premium toegang is geactiveerd.",
      variant: "success",
    });
  }, [toast]);

  const handleGoToSignup = () => {
    const signupUrl = email ? `/signup?email=${encodeURIComponent(email)}` : '/signup';
    router.push(signupUrl);
  };
  
  return (
      <Card className="w-full max-w-lg mx-auto text-center">
        <CardHeader>
          <PartyPopper className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Aankoop Geslaagd!</CardTitle>
          <CardDescription>
            Bedankt voor uw aankoop! Uw premium toegang is nu actief.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-left">
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-800 dark:text-green-200 flex items-center mb-2">
                <CheckCircle className="h-5 w-5 mr-2"/>Volgende Stappen
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-green-700 dark:text-green-300">
                <li>
                    <strong>Activeer uw account:</strong> Maak een account aan met hetzelfde e-mailadres dat u voor de betaling heeft gebruikt. Dit activeert uw premium status.
                </li>
                 <li>
                    <strong>Inloggen:</strong> Als u al een account heeft met dit e-mailadres, hoeft u alleen maar in te loggen. Uw premium status wordt automatisch herkend.
                </li>
                <li>
                    <strong>Geniet!</strong> U heeft nu toegang tot alle premium functies.
                </li>
            </ol>
          </div>
           {email && (
            <p className="text-sm text-center text-muted-foreground pt-2">
              Uw aankoop is gekoppeld aan: <strong>{email}</strong>.
            </p>
          )}
        </CardContent>
        <CardFooter className="flex-col sm:flex-row justify-center gap-2">
          <Button onClick={handleGoToSignup}>
            Account Activeren / Inloggen
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              Later Activeren
            </Link>
          </Button>
        </CardFooter>
      </Card>
  );
}

// This is the main page component that wraps the logic in a Suspense boundary.
export default function CheckoutSuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary"/>
            <p className="text-muted-foreground">Succes pagina laden...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
