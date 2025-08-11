"use client";

import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function TestPostcardPage() {
  const testDate = "2023-06-15";
  const testData = {
    knmi_daily_dataset: {
      maxTemp: 25,
      minTemp: 15,
      sunshineHours: 8,
      precipitation: 0
    },
    movies: [
      { title: "Test Movie", year: 2023 }
    ]
  };

  const dataParam = encodeURIComponent(JSON.stringify(testData));
  const postcardUrl = `/postcard-simple?date=${testDate}&data=${dataParam}`;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">🧪 Postcard Tester</h1>
        
        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Test Scenario:</h2>
          <p><strong>Datum:</strong> 15 juni 2023</p>
          <p><strong>Weer:</strong> 25°C, 8 uur zon</p>
          <p><strong>Film:</strong> Test Movie (2023)</p>
        </div>

        <div className="flex flex-col gap-4">
          <Button asChild className="h-12 text-lg">
            <Link href={postcardUrl}>
              📮 Test Postcard Functionaliteit
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/">
              ← Terug naar Homepage
            </Link>
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Test Checklist:</h3>
          <ul className="space-y-1 text-sm">
            <li>✅ Postcard pagina laadt</li>
            <li>✅ 10 random postcards worden getoond</li>
            <li>✅ Carousel navigatie werkt</li>
            <li>✅ Postcard selectie werkt</li>
            <li>✅ Email generatie werkt</li>
            <li>✅ AI samenvatting werkt</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
