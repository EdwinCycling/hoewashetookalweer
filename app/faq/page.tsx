
import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'Veelgestelde Vragen (FAQ)',
  description: 'Vind antwoorden op veelgestelde vragen over de HoeWasHetOokAlweer.nl applicatie.',
  robots: {
    index: true,
    follow: true,
  }
};

const faqItems = [
  {
    question: "Wat is HoeWasHetOokAlWeer.nl?",
    answer:
      "HoeWasHetOokAlWeer.nl is een webapplicatie waarmee je historische gegevens, nieuws, muziek, film, sportuitslagen en nog veel meer kunt ontdekken voor een specifieke dag in het verleden. Het is een leuke manier om te zien \"hoe het ook alweer was\" op een bepaalde datum.",
  },
  {
    question: "Hoe selecteer ik een datum?",
    answer:
      "Gebruik de drie sliders (dag, maand, jaar) bovenaan de pagina om de gewenste datum in te stellen. Klik vervolgens op de \"Ophalen\" knop om de informatie voor die dag te laden.",
  },
  {
    question: "Welke informatie kan ik vinden?",
    answer:
      "HoeWasHetOokAlWeer.nl biedt een breed scala aan informatie, waaronder: weergegevens (KNMI), historische prijzen, bevolkingscijfers, huizenprijzen, benzineprijzen, top 100 muziek, Grandmixen, populaire namen, verjaardagen van bekende personen, film- en tv-serie top lijsten, game releases, belangrijke boeken, gadgets van het jaar, politieke gebeurtenissen, nieuws over Nederland, Songfestival-resultaten, Sporters van het Jaar, Oscarwinnaars, Televizier-Ring winnaars, sportuitslagen (voetbal, Formule 1, etc.), Olympische medailles, en meer.",
  },
  {
    question: "Waar komt de data vandaan?",
    answer:
      "De data is afkomstig van diverse openbare bronnen en websites. Per informatie-onderdeel wordt de bron specifiek vermeld, vaak met een directe link naar de originele website (bijvoorbeeld KNMI, Top40.nl, Moviemeter.nl, Wikipedia, CBS StatLine). Raadpleeg de disclaimer voor meer informatie.",
  },
  {
    question: "Hoe kan ik de informatie van een specifieke dag delen?",
    answer:
      "Onder de informatie-tabs vind je een rij met deelknoppen. Hiermee kun je de geselecteerde datum en een link naar HoeWasHetOokAlWeer.nl eenvoudig delen via Facebook, X (Twitter), BlueSky, WhatsApp, Instagram (tekst kopie), e-mail, of door de link te kopiëren.",
  },
  {
    question: "Hoe wijzig ik het thema (licht/donker)?",
    answer:
      "Rechtsboven op de hoofdpagina vind je een knop met een maan- of zon-icoon. Klik hierop om te wisselen tussen het lichte en donkere thema.",
  },
  {
    question: "Is de getoonde informatie altijd 100% accuraat en actueel?",
    answer:
      "Hoewel we ons uiterste best doen om correcte en actuele informatie te presenteren, kan HoeWasHetOokAlweer.nl geen absolute garantie geven. De data is afhankelijk van de nauwkeurigheid en beschikbaarheid van de externe bronnen. Voor kritische toepassingen raden we altijd aan de originele bron te consulteren.",
  },
  {
    question: "Zijn er kosten verbonden aan het gebruik van HoeWasHetOokAlweer.nl?",
    answer: "Nee, HoeWasHetOokAlweer.nl is momenteel gratis te gebruiken.",
  },
   {
    question: "Werkt HoeWasHetOokAlWeer.nl goed op mobiele apparaten?",
    answer: "Ja, HoeWasHetOokAlWeer.nl is ontworpen om responsief te zijn en zou goed moeten werken op de meeste moderne smartphones en tablets.",
  },
  {
    question: "Hoe kan ik contact opnemen of feedback geven?",
    answer: (
      <>
        Voor vragen, suggesties, of zakelijke verzoeken kunt u een e-mail sturen naar{' '}
        <a href="mailto:info@HoeWasHetOokAlWeer.nl" className="text-primary underline hover:text-primary/80">
          info@HoeWasHetOokAlWeer.nl
        </a>. U kunt ook onze <Link href="/contact" className="text-primary underline hover:text-primary/80">contactpagina</Link> bezoeken.
        We stellen feedback zeer op prijs!
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 max-w-3xl mx-auto bg-background">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground text-center">
        Veelgestelde Vragen (FAQ)
      </h1>
      <Card className="w-full bg-card shadow-lg rounded-lg mb-8">
        <CardHeader>
          <CardTitle className="text-card-foreground">Antwoorden op uw vragen</CardTitle>
          <CardDescription className="text-muted-foreground">
            Hieronder vindt u antwoorden op enkele veelgestelde vragen over HoeWasHetOokAlWeer.nl.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-card-foreground">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {typeof item.answer === 'string' ? (
                    <p>{item.answer}</p>
                  ) : (
                    item.answer
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      <div className="w-full flex justify-center mt-8">
        <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/">
            Terug naar HoeWasHetOokAlWeer.nl
          </Link>
        </Button>
      </div>
    </main>
  );
}
