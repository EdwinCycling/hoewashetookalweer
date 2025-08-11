
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gem, ShieldOff, Clock, CalendarDays, ListChecks, AlertCircle, Calendar, CalendarClock, InfinityIcon, Rocket, KeyRound, Loader2, DatabaseZap, CheckCircle } from 'lucide-react';
import Link from "next/link";
import { getAuth, type User } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { createCheckoutSession } from '@/actions/stripe';
import { useToast } from '@/hooks/use-toast';

const premiumFeatures = [
  {
    icon: ShieldOff,
    title: "Advertentievrij Genieten",
    description: "Ervaar de applicatie volledig zonder storende banners of pop-up advertenties.",
  },
  {
    icon: Clock,
    title: "Geen Onderbrekingen",
    description: "Direct toegang tot alle data zonder verificatievragen, hoe vaak u ook zoekt.",
  },
  {
    icon: CalendarDays,
    title: "Uitgebreid Jaartalbereik",
    description: (
      <>
        Toegang tot data terug tot het jaar <strong>1925</strong> (afhankelijk van de beschikbaarheid per databron).
      </>
    ),
  },
  {
    icon: ListChecks,
    title: "Toegang tot Alle Data-Tabbladen",
    description: "Ontgrendel alle exclusieve premium informatie-tabbladen:",
    subItems: [
      "KNMI Maandoverzicht & Weerreeksen",
      "Weer op Feestdagen & Weer Uitersten",
      "Huizen- en Benzineprijzen",
      "Volledige Top 100 & Grandmixen",
      "Gadgets & Nederlandstalige Top 10",
      "Songfestival & Sporter v/h Jaar",
      "Televizier-Ring & Champions League",
      "Forbes Rijkste Personen Lijst",
      "Populaire & Goedkoopste Auto's",
      "Presidenten & Wereldleiders",
    ],
  },
];

const freeFeatures = [
  {
    icon: ShieldOff,
    title: "Advertenties",
    description: "De gratis versie bevat advertenties (banners en pop-ups na een aantal tab-kliks).",
  },
  {
    icon: AlertCircle,
    title: "Periodieke Verificatie",
    description: "Bij intensief gebruik kunnen verificatievragen verschijnen.",
  },
  {
    icon: CalendarDays,
    title: "Beperkt Jaartalbereik",
    description: (
      <>
        Toegang tot data vanaf het jaar <strong>2000</strong>.
      </>
    ),
  },
  {
    icon: DatabaseZap,
    title: "Beperkte Data-Tabbladen",
    description: "Toegang tot een selectie van onze data-tabbladen:",
    subItems: [
      "Basis Weer & Records",
      "Historische Prijzen & Bevolking",
      "Populaire Namen & Verjaardagen",
      "Film-, TV-, Game- & Boekenlijsten",
      "Politiek & Nederland-nieuws",
      "Olympische Medailles & WK/EK Voetbal",
      "Sport & Eredivisie",
      "Elfstedentocht & Rampen",
    ],
  },
];

interface PremiumTier {
  icon: React.ElementType;
  title: string;
  price: string;
  priceId: string | undefined;
  duration: string;
  description: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  buttonText: string;
}

const premiumTiers: PremiumTier[] = [
  {
    icon: Calendar,
    title: "Jaarpas",
    price: "€3",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_JAAR || "price_jaarpas_placeholder",
    duration: "1 Jaar Premium Toegang",
    description: "Perfect om een heel jaar lang ongestoord door de geschiedenis te reizen. Eenmalige betaling.",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    buttonText: "Kies Jaarpas",
  },
  {
    icon: CalendarClock,
    title: "Tweejaarpas",
    price: "€5",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_TWEEJAAR || "price_tweejaarpas_placeholder",
    duration: "2 Jaar Premium Toegang",
    description: "Dubbel zo lang genieten van alle premium voordelen, voor de echte geschiedenisliefhebber. Profiteer van 17% korting! Eenmalige betaling.",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    buttonText: "Kies Tweejaarpas",
  },
  {
    icon: InfinityIcon,
    title: "Eeuwige Toegang",
    price: "€10",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_EEUWIG || "price_eeuwig_placeholder",
    duration: "10 Jaar Premium",
    description: "De ultieme ervaring! 10 jaar onbeperkt toegang tot alle huidige en toekomstige premium features. Eenmalige betaling, tijdelijke aanbieding!",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700",
    buttonText: "Kies Eeuwige Toegang",
  },
];


export default function PremiumPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PremiumTier | null>(null);
  const [emailForCheckout, setEmailForCheckout] = useState('');

  // Check if Stripe is properly configured
  const isStripeConfigured = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && 
    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_JAAR && 
    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_TWEEJAAR && 
    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_EEUWIG;

  useEffect(() => {
    if (app) {
      const auth = getAuth(app);
      const unsubscribe = auth.onAuthStateChanged(setUser);
      return () => unsubscribe();
    }
  }, []);

  const handleCheckout = async (priceId: string | undefined, email: string | null | undefined) => {
    // Check if Stripe is properly configured
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      toast({
        title: "Stripe Niet Geconfigureerd",
        description: "De betalingsverwerker is niet geconfigureerd. Neem contact op met de beheerder.",
        variant: "destructive",
      });
      return;
    }

    // Check if price ID is valid (not a placeholder)
    if (!priceId || priceId.includes('placeholder')) {
      toast({
        title: "Prijs Niet Geconfigureerd",
        description: "De prijs voor dit product is niet correct geconfigureerd. Neem contact op met de beheerder.",
        variant: "destructive",
      });
      return;
    }

    setLoadingPriceId(priceId);
    
    const result = await createCheckoutSession(priceId, email);

    if (result.url) {
      // Redirect on the client side
      window.location.href = result.url;
    } else {
      // Show an error toast if something went wrong
      toast({
        title: "Checkout Mislukt",
        description: result.error || "Kon de checkout sessie niet starten. Probeer het later opnieuw.",
        variant: "destructive",
      });
      setLoadingPriceId(null);
    }
  };

  const handleChoosePlanClick = (tier: PremiumTier) => {
    if (user) {
      handleCheckout(tier.priceId, user.email);
    } else {
      setSelectedTier(tier);
      setIsDialogOpen(true);
    }
  };

  const handleDialogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTier && emailForCheckout) {
      handleCheckout(selectedTier.priceId, emailForCheckout);
      setIsDialogOpen(false);
    } else {
      toast({ title: 'E-mailadres vereist', description: 'Voer een geldig e-mailadres in.', variant: 'destructive' });
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 bg-background">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <Gem className="h-16 w-16 text-primary mb-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-center">
              HoeWasHetOokAlWeer.nl Premium
            </h1>
            <p className="mt-2 text-lg text-muted-foreground text-center">
              Ontgrendel de volledige ervaring en duik dieper in het verleden!
            </p>
          </div>

          {/* Stripe Configuration Warning */}
          {!isStripeConfigured && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-yellow-900/20 dark:border-yellow-800">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <div className="text-left">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                    Betalingen Nog Niet Beschikbaar
                  </h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Stripe is nog niet geconfigureerd. Neem contact op met de beheerder om betalingen in te schakelen.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <Card className="bg-card shadow-lg rounded-lg flex flex-col">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center">
                  <ShieldOff className="h-6 w-6 mr-2 text-muted-foreground" />
                  Gratis Account
                </CardTitle>
                <CardDescription className="text-muted-foreground">Basis toegang tot historische data.</CardDescription>
              </CardHeader>
              <CardContent className="text-card-foreground space-y-4 text-sm flex-grow">
                {freeFeatures.map((feature, index) => (
                  <div key={`free-${index}`} className="flex items-start space-x-3">
                    <feature.icon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.description}</p>
                       {feature.subItems && (
                        <ul className="list-disc list-inside pl-4 text-xs text-muted-foreground/80 mt-1 space-y-0.5">
                          {feature.subItems.map((subItem, subIndex) => (
                            <li key={`free-sub-${subIndex}`}>{subItem}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-primary/10 border-primary shadow-xl rounded-lg flex flex-col">
              <CardHeader>
                <CardTitle className="text-primary flex items-center">
                  <Gem className="h-6 w-6 mr-2" />
                  Premium Account Voordelen
                </CardTitle>
                <CardDescription className="text-primary/80">De ultieme nostalgische ervaring.</CardDescription>
              </CardHeader>
              <CardContent className="text-card-foreground space-y-4 text-sm flex-grow">
                {premiumFeatures.map((feature, index) => (
                  <div key={`premium-${index}`} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.description}</p>
                      {feature.subItems && (
                        <ul className="list-disc list-inside pl-4 text-xs text-muted-foreground/80 mt-1 space-y-0.5">
                          {feature.subItems.map((subItem, subIndex) => (
                            <li key={`premium-sub-${subIndex}`}>{subItem}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-6">
              Kies Uw Premium Ervaring
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {premiumTiers.map((tier, index) => (
                <Card key={index} className={`shadow-lg rounded-lg flex flex-col border-2 ${tier.borderColor} dark:${tier.bgColor.replace('bg-','bg-opacity-20 dark:bg-')} ${tier.bgColor}`}>
                  <CardHeader className="items-center text-center pb-3">
                    <tier.icon className={`h-12 w-12 mb-3 ${tier.textColor}`} />
                    <CardTitle className={`text-xl font-semibold ${tier.textColor}`}>{tier.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-card-foreground flex-grow space-y-2">
                    <p className="text-3xl font-bold">{tier.price}</p>
                    <p className="text-sm font-medium text-muted-foreground">{tier.duration}</p>
                    <p className="text-xs text-muted-foreground/80 pt-1">{tier.description}</p>
                    <p className="text-xs font-semibold text-muted-foreground/90 pt-1">Eenmalige betaling, geen abonnement.</p>
                  </CardContent>
                  <CardFooter className="pt-4">
                     <Button
                        variant="default"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => handleChoosePlanClick(tier)}
                        disabled={loadingPriceId === tier.priceId || !isStripeConfigured}
                      >
                        {loadingPriceId === tier.priceId ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : !isStripeConfigured ? (
                          <AlertCircle className="mr-2 h-4 w-4" />
                        ) : (
                          <Rocket className="mr-2 h-4 w-4" />
                        )}
                        {!isStripeConfigured ? "Niet Beschikbaar" : tier.buttonText}
                      </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Admin Configuration Instructions */}
          {!isStripeConfigured && (
            <Card className="w-full bg-blue-50 border-2 border-blue-200 shadow-lg rounded-lg mb-8 dark:bg-blue-900/20 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-800 dark:text-blue-200 flex items-center">
                  <KeyRound className="h-5 w-5 mr-2" />
                  Beheerder Instructies
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-700 dark:text-blue-300 space-y-3">
                <p className="text-sm">
                  Om betalingen in te schakelen, moet u de volgende stappen uitvoeren:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-sm pl-4">
                  <li>Maak een Stripe account aan op <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="underline">stripe.com</a></li>
                  <li>Maak drie producten aan met de volgende prijzen: €3 (1 jaar), €5 (2 jaar), €10 (10 jaar)</li>
                  <li>Kopieer de Price IDs van elk product</li>
                  <li>Voeg de volgende variabelen toe aan uw <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">.env.local</code> bestand:</li>
                </ol>
                <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded text-xs font-mono">
                  <div>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...</div>
                  <div>NEXT_PUBLIC_STRIPE_PRICE_ID_JAAR=price_...</div>
                  <div>NEXT_PUBLIC_STRIPE_PRICE_ID_TWEEJAAR=price_...</div>
                  <div>NEXT_PUBLIC_STRIPE_PRICE_ID_EEUWIG=price_...</div>
                  <div>STRIPE_SECRET_KEY=sk_test_...</div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="w-full bg-card shadow-lg rounded-lg mb-8">
            <CardHeader>
              <CardTitle className="text-card-foreground">Heeft u al betaald?</CardTitle>
            </CardHeader>
            <CardContent className="text-card-foreground space-y-4">
              <p>
                  Na uw aankoop is uw premium status gekoppeld aan uw e-mailadres. U kunt uw premium account activeren door
                  een account aan te maken met hetzelfde e-mailadres op de{' '}
                  <Link href="/signup" className="text-primary underline hover:text-primary/80">registratiepagina</Link>.
              </p>
               <p>
                Heeft u al een account? Log dan simpelweg in. Uw premium status wordt automatisch herkend.
              </p>
            </CardContent>
          </Card>

          <div className="w-full flex justify-center mt-10">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/">
                Terug naar HoeWasHetOokAlWeer.nl
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleDialogSubmit}>
            <DialogHeader>
              <DialogTitle>E-mailadres Invoeren</DialogTitle>
              <DialogDescription>
                Voer uw e-mailadres in om verder te gaan met de aankoop. We koppelen uw premium toegang aan dit adres.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={emailForCheckout}
                  onChange={(e) => setEmailForCheckout(e.target.value)}
                  className="col-span-3"
                  placeholder="uwnaam@voorbeeld.com"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loadingPriceId !== null}>
                 {loadingPriceId !== null ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Doorgaan naar Betaling
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
