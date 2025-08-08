
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { adminDb } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

const requestSchema = z.object({
  email: z.string().email({ message: "Ongeldig e-mailadres" }),
  expiryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Ongeldige datum-string. Gebruik ISO 8601 formaat.",
  }),
});

export async function POST(request: Request) {
  // 1. Beveilig de API-route met een geheime sleutel
  const apiKey = request.headers.get('X-API-KEY');
  if (apiKey !== process.env.ADMIN_API_KEY) {
    console.warn(`[API] Unauthorized attempt to access add-premium-user with key: ${apiKey}`);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Valideer de body van het verzoek
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request body', details: parsed.error.flatten() }, { status: 400 });
  }

  const { email, expiryDate } = parsed.data;

  // 3. Controleer of de Firebase Admin SDK is geïnitialiseerd
  if (!adminDb) {
     console.error("[API] Firebase Admin SDK is not initialized. Check server environment variables.");
     return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    // 4. Voeg de gebruiker toe aan Firestore
    // We gebruiken het e-mailadres als het document-ID voor eenvoudige opzoekingen.
    const userRef = adminDb.collection('premium_users').doc(email);
    
    await userRef.set({
      email: email,
      expiryDate: Timestamp.fromDate(new Date(expiryDate)),
      updatedAt: Timestamp.now(),
    }, { merge: true }); // 'merge: true' voegt velden toe of werkt ze bij zonder het hele document te overschrijven

    console.log(`[API] Successfully added/updated premium user: ${email}`);
    return NextResponse.json({ success: true, message: `User ${email} added/updated.` });

  } catch (error: any) {
    console.error(`[API] Error while writing to Firestore for user ${email}:`, error);
    return NextResponse.json({ error: 'Failed to write to database', details: error.message }, { status: 500 });
  }
}
