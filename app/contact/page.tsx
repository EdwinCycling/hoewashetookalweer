
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Neem contact op met HoeWasHetOokAlweer.nl voor vragen of zakelijke verzoeken.',
  robots: {
    index: true,
    follow: true,
  }
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 max-w-3xl mx-auto bg-background">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground text-center">
        Contact
      </h1>
      <Card className="w-full bg-card shadow-lg rounded-lg mb-8">
        <CardHeader>
          <CardTitle className="text-card-foreground">Neem contact op</CardTitle>
          <CardDescription className="text-muted-foreground">
            Heeft u vragen, opmerkingen of zakelijke verzoeken met betrekking tot HoeWasHetOokAlweer.nl?
          </CardDescription>
        </CardHeader>
        <CardContent className="text-card-foreground space-y-4">
          <p>
            Voor alle vragen, suggesties, zakelijke verzoeken of andere opmerkingen met betrekking tot de HoeWasHetOokAlweer.nl applicatie, kunt u contact met ons opnemen via het onderstaande e-mailadres:
          </p>
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-primary" />
            <a href="mailto:hwhoaw@gmail.com" className="text-primary underline hover:text-primary/80">
              hwhoaw@gmail.com
            </a>
          </div>
          <p>
            We streven ernaar om zo spoedig mogelijk op uw bericht te reageren.
          </p>
          <p>
            Voor veelgestelde vragen kunt u ook onze <Link href="/faq" className="text-primary underline hover:text-primary/80">FAQ-pagina</Link> raadplegen.
          </p>
        </CardContent>
      </Card>
      <div className="w-full flex justify-center mt-8">
        <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/">
            Terug naar HoeWasHetOokAlweer.nl
          </Link>
        </Button>
      </div>
    </main>
  );
}
