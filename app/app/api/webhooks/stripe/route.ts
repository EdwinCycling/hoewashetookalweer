
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { adminDb } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

async function grantPremiumAccess(email: string, priceId: string) {
    if (!adminDb) {
        console.error('[Webhook] Firebase Admin SDK is not initialized.');
        throw new Error('Server configuration error.');
    }

    const userRef = adminDb.collection('premium_users').doc(email);
    const now = new Date();
    let expiryDate: Date;
    let yearsToAdd: number;

    // Determine years to add based on Price ID.
    // These Price IDs MUST match the ones you create in your Stripe Dashboard.
    switch (priceId) {
        case process.env.STRIPE_PRICE_ID_JAAR:
            yearsToAdd = 1;
            break;
        case process.env.STRIPE_PRICE_ID_TWEEJAAR:
            yearsToAdd = 2;
            break;
        case process.env.STRIPE_PRICE_ID_EEUWIG:
            yearsToAdd = 10; // Represents 'unlimited' - 10 years
            break;
        default:
            console.warn(`[Webhook] Unrecognized Price ID: ${priceId} for user ${email}. Defaulting to 1 year.`);
            yearsToAdd = 1;
    }

    try {
        // Check if user already exists and has premium access
        const existingUser = await userRef.get();
        
        if (existingUser.exists) {
            const userData = existingUser.data();
            const existingExpiryDate = userData?.expiryDate?.toDate();
            
            if (existingExpiryDate && existingExpiryDate > now) {
                // User has existing premium access in the future, add years to that date
                expiryDate = new Date(existingExpiryDate);
                expiryDate.setFullYear(expiryDate.getFullYear() + yearsToAdd);
                console.log(`[Webhook] Extending existing premium access for ${email} from ${existingExpiryDate.toISOString()} to ${expiryDate.toISOString()}`);
            } else {
                // User has expired or no premium access, start from current date
                expiryDate = new Date(now);
                expiryDate.setFullYear(expiryDate.getFullYear() + yearsToAdd);
                console.log(`[Webhook] Starting new premium access for ${email} from ${now.toISOString()} until ${expiryDate.toISOString()}`);
            }
        } else {
            // New user, start from current date
            expiryDate = new Date(now);
            expiryDate.setFullYear(expiryDate.getFullYear() + yearsToAdd);
            console.log(`[Webhook] Creating new premium access for ${email} from ${now.toISOString()} until ${expiryDate.toISOString()}`);
        }

        await userRef.set({
            email: email,
            expiryDate: Timestamp.fromDate(expiryDate),
            updatedAt: Timestamp.now(),
            lastPurchasePriceId: priceId,
        }, { merge: true });

        console.log(`[Webhook] Premium access granted to ${email} until ${expiryDate.toISOString()}`);
    } catch (error) {
        console.error(`[Webhook] Error processing premium access for ${email}:`, error);
        throw error;
    }
}


export async function POST(request: Request) {
    if (!webhookSecret) {
        console.error("[Webhook Error] STRIPE_WEBHOOK_SECRET is not set.");
        return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
    }

    const body = await request.text();
    const sig = headers().get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        console.error(`[Webhook Error] Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.payment_status === 'paid') {
            const customerEmail = session.customer_details?.email;
            const priceId = session.line_items?.data[0]?.price?.id;

            if (!customerEmail) {
                console.error('[Webhook] No customer email found in checkout session.');
                return NextResponse.json({ error: 'Customer email missing' }, { status: 400 });
            }
             if (!priceId) {
                console.error('[Webhook] No price ID found in checkout session.');
                return NextResponse.json({ error: 'Price ID missing' }, { status: 400 });
            }

            try {
                await grantPremiumAccess(customerEmail, priceId);
            } catch (error: any) {
                console.error(`[Webhook] Failed to grant premium access for ${customerEmail}:`, error);
                return NextResponse.json({ error: 'Failed to update database' }, { status: 500 });
            }
        }
    }

    return NextResponse.json({ received: true });
}
