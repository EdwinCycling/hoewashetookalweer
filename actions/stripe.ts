
'use server';

import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("Stripe is NOT configured. STRIPE_SECRET_KEY is missing from .env. The checkout will not work.");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
  typescript: true,
});

export async function createCheckoutSession(priceId: string, email?: string | null): Promise<{ url: string | null; error: string | null; }> {
  if (!process.env.STRIPE_SECRET_KEY) {
    return { url: null, error: 'De betalingsverwerker is niet geconfigureerd. Neem contact op met de beheerder.' };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) {
    return { url: null, error: 'Applicatie URL is niet geconfigureerd. Voeg NEXT_PUBLIC_APP_URL toe aan uw .env bestand.' };
  }

  const successUrl = `${appUrl}/premium/success?session_id={CHECKOUT_SESSION_ID}${email ? `&email=${encodeURIComponent(email)}` : ''}`;
  const cancelUrl = `${appUrl}/premium/cancel`;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'ideal'],
      customer_email: email || undefined,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    if (session.url) {
        return { url: session.url, error: null };
    } else {
        return { url: null, error: 'Kon geen Stripe checkout URL aanmaken.' };
    }

  } catch (error: any) {
    console.error("Stripe Error in createCheckoutSession:", error);
    return { url: null, error: `Fout bij communicatie met de betalingsprovider: ${error.message}` };
  }
}
