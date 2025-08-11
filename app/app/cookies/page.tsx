
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cookie } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookiebeleid',
  description: 'Informatie over het gebruik van cookies op HoeWasHetOokAlweer.nl.',
  robots: {
    index: true,
    follow: true,
  }
};

export default function CookiesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 max-w-3xl mx-auto bg-background">
      <Cookie className="h-16 w-16 text-primary mb-6" />
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground text-center">
        Cookiebeleid
      </h1>
      <Card className="w-full bg-card shadow-lg rounded-lg mb-8">
        <CardHeader>
          <CardTitle className="text-card-foreground">Informatie over ons cookiegebruik</CardTitle>
          <CardDescription className="text-muted-foreground">
            HoeWasHetOokAlweer.nl hecht waarde aan uw privacy. Hieronder leggen we uit hoe we cookies gebruiken.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-card-foreground space-y-4">
          <h2 className="font-semibold text-lg">Wat zijn cookies?</h2>
          <p>
            Cookies zijn kleine tekstbestanden die door een website op uw computer, tablet of mobiele telefoon worden geplaatst wanneer u de website bezoekt. Deze cookies slaan informatie op over uw websitebezoek.
          </p>

          <h2 className="font-semibold text-lg">Welke cookies gebruikt HoeWasHetOokAlWeer.nl?</h2>
          <p>
            Momenteel gebruikt HoeWasHetOokAlWeer.nl cookies of vergelijkbare technologieën (zoals localStorage) voor de volgende doeleinden:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>
              <strong>Functionele cookies:</strong> Deze zijn noodzakelijk om de website goed te laten functioneren. Bijvoorbeeld, we gebruiken localStorage om uw themavoorkeur (licht/donker) te onthouden, zodat u dit niet bij elk bezoek opnieuw hoeft in te stellen.
            </li>
            <li>
              <strong>Cookie consent:</strong> Om uw toestemming voor het plaatsen van cookies te onthouden.
            </li>
          </ul>

          <h2 className="font-semibold text-lg">Toekomstig cookiegebruik</h2>
          <p>
            In de toekomst is het mogelijk dat we aanvullende cookies gaan gebruiken, bijvoorbeeld voor:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-4">
            <li>
              <strong>Analytische cookies:</strong> Om anoniem statistieken te verzamelen over het gebruik van onze website, zodat we deze kunnen verbeteren.
            </li>
            <li>
              <strong>Advertentiecookies (van derden):</strong> Indien we advertenties (zoals Google AdSense) gaan tonen, kunnen deze partijen cookies plaatsen om advertenties relevanter te maken en het aantal keren dat u een advertentie ziet te beperken. Wij hebben geen controle over de cookies die door derde partijen worden geplaatst. Raadpleeg het privacy- en cookiebeleid van deze partijen voor meer informatie.
            </li>
          </ul>
          <p>
            Voordat we niet-functionele cookies plaatsen die invloed hebben op uw privacy, zullen we altijd om uw expliciete toestemming vragen.
          </p>

          <h2 className="font-semibold text-lg">Cookies beheren en verwijderen</h2>
          <p>
            U kunt cookies meestal beheren, blokkeren of verwijderen via de instellingen van uw webbrowser. Hoe dit werkt, verschilt per browser. Raadpleeg de helpfunctie van uw browser of bezoek websites zoals die van de Consumentenbond voor meer informatie.
          </p>
          <p>
            Houd er rekening mee dat het uitschakelen van cookies de functionaliteit van onze website kan beïnvloeden.
          </p>

          <h2 className="font-semibold text-lg">Wijzigingen in het cookiebeleid</h2>
          <p>
            Dit cookiebeleid kan van tijd tot tijd worden gewijzigd. Wij adviseren u om deze pagina regelmatig te raadplegen om op de hoogte te blijven van eventuele wijzigingen.
          </p>

          <h2 className="font-semibold text-lg">Vragen?</h2>
          <p>
            Als u vragen heeft over ons cookiebeleid, neem dan contact met ons op via{' '}
            <Link href="mailto:hwhoaw@gmail.com" className="text-primary underline hover:text-primary/80">
              hwhoaw@gmail.com
            </Link>.
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
