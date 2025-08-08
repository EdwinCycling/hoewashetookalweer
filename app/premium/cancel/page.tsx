
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from 'lucide-react';
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Betaling Geannuleerd - HoeWasHetOokAlWeer.nl',
  description: 'Uw aankoop is geannuleerd.',
  robots: {
    index: false,
    follow: false,
  }
};

export default function CheckoutCancelPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-lg mx-auto text-center">
        <CardHeader>
          <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <CardTitle className="text-2xl">Betaling Geannuleerd</CardTitle>
          <CardDescription>
            Het lijkt erop dat u de betaling heeft geannuleerd.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Geen zorgen, er is niets in rekening gebracht. U kunt altijd terugkeren om uw aankoop alsnog af te ronden.
          </p>
        </CardContent>
        <CardFooter className="flex-col sm:flex-row justify-center gap-2">
           <Button asChild>
            <Link href="/premium">
              Bekijk Premium Opties Opnieuw
            </Link>
          </Button>
           <Button asChild variant="outline">
            <Link href="/">
              Terug naar Hoofdpagina
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
