
import { POLITIEK_BY_YEAR } from '@/data/politiek-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PolitiekPage() {
  const years = Object.keys(POLITIEK_BY_YEAR).map(Number).sort((a, b) => a - b);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Politieke Geschiedenis per Jaar</h1>
      <p className="mb-4">Een overzicht van belangrijke politieke gebeurtenissen in Nederland per jaar.</p>
      <div className="space-y-4">
        {years.map((year) => (
          <Card key={year}>
            <CardHeader>
              <CardTitle>{year}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{POLITIEK_BY_YEAR[year]}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

