
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from 'lucide-react';
import Link from "next/link";
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Premium Aankoop - HoeWasHetOokAlWeer.nl',
  description: 'Rond uw premium aankoop af voor HoeWasHetOokAlWeer.nl via Donorbox.',
  robots: {
    index: false, // Voorkom indexering van de checkout pagina
    follow: false,
  }
};

export default function CheckoutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 bg-background">
      <div className="w-full max-w-xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <CreditCard className="h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-center">
            Rond uw Premium Aankoop af
          </h1>
          <p className="mt-2 text-md text-muted-foreground text-center">
            Selecteer hieronder uw gewenste premium pakket en voltooi de betaling via Donorbox.
          </p>
        </div>

        <Card className="w-full bg-card shadow-lg rounded-lg mb-8">
          <CardHeader>
            <CardTitle className="text-card-foreground">Veilig Betalen met Donorbox</CardTitle>
            <CardDescription className="text-muted-foreground">
              Na een succesvolle betaling ontvangt u zo spoedig mogelijk uw premium code en instructies per e-mail.
              Controleer ook uw spamfolder.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Donorbox Embed Code */}
            <Script src="https://donorbox.org/widget.js" strategy="lazyOnload" />
            <iframe
              src="https://donorbox.org/embed/hoe-was-het-ook-al-weer?"
              name="donorbox"
              seamless={true}
              frameBorder="0"
              scrolling="no"
              height="900px"
              width="100%"
              style={{ maxWidth: '500px', minWidth: '250px', maxHeight: 'none' }}
              allow="payment"
              title="Donorbox-donatieformulier"
            ></iframe>
            {/* End Donorbox Embed Code */}
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground mb-8">
          <p>Problemen met betalen of geen e-mail ontvangen? Neem <Link href="/contact" className="underline hover:text-primary">contact</Link> met ons op.</p>
        </div>

        <div className="w-full flex justify-center mt-10">
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Link href="/premium">
              Terug naar Premium Overzicht
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
