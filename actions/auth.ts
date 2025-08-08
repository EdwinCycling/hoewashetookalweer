
'use server';

import { adminDb } from '@/lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { differenceInDays } from 'date-fns';

/**
 * @fileOverview Server-side actions for authentication and user status checks.
 */

interface PremiumCheckResult {
  canRegister: boolean;
  message: string;
}

export interface PremiumStatusResult {
  isPremium: boolean;
  daysRemaining: number | null;
  error?: string;
}


/**
 * Checks if a user is eligible to register for an account.
 * This is a server-side action to securely check against the premium_users collection.
 * @param email The email address to check.
 * @returns An object indicating if registration is allowed and a corresponding message.
 */
export async function checkRegistrationEligibility(email: string): Promise<PremiumCheckResult> {
  // Special cases for test accounts to bypass Firestore check
  const testAccounts = ['admin@example.com', 'premium@example.com', 'user@example.com'];
  if (testAccounts.includes(email)) {
    try {
      await getAuth().getUserByEmail(email);
      return { canRegister: false, message: 'Test account bestaat al. Probeer in te loggen.' };
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        return { canRegister: true, message: `Test account registratie (${email}) toegestaan.` };
      }
      return { canRegister: false, message: 'Fout bij controleren status test account.' };
    }
  }
  
  if (!adminDb) {
    console.error('[Auth Action] Firebase Admin SDK not initialized.');
    return { canRegister: false, message: 'Server configuratiefout. Neem contact op met de beheerder.' };
  }

  try {
    // 1. Check if user already exists in Firebase Auth
    try {
      await getAuth().getUserByEmail(email);
      // If the above line does not throw an error, the user already exists.
      return { canRegister: false, message: 'Er bestaat al een account met dit e-mailadres. Probeer in te loggen.' };
    } catch (error: any) {
      if (error.code !== 'auth/user-not-found') {
        // An unexpected auth error occurred
        console.error('[Auth Action] Firebase Auth error:', error);
        return { canRegister: false, message: 'Er is een onverwachte fout opgetreden bij het controleren van uw account.' };
      }
      // If user is not found, we can proceed. This is the expected path.
    }

    // 2. Check the premium_users collection in Firestore by querying the email field.
    const premiumUsersQuery = adminDb.collection('premium_users').where('email', '==', email);
    const querySnapshot = await premiumUsersQuery.get();

    if (querySnapshot.empty) {
      return { canRegister: false, message: 'Dit e-mailadres is niet bekend als premium gebruiker. Koop eerst een premium pakket.' };
    }
    
    // Use the first document found. There should ideally only be one.
    const doc = querySnapshot.docs[0];
    const data = doc.data();

    if (!data || !data.expiryDate || !data.expiryDate.toDate) {
      return { canRegister: false, message: 'Geen geldige premium status gevonden voor dit account.' };
    }

    const expiryDate = data.expiryDate.toDate();
    if (expiryDate < new Date()) {
      return { canRegister: false, message: 'Uw premium toegang is verlopen. Verleng uw pakket om een account aan te maken.' };
    }

    // If all checks pass, the user is eligible to register.
    return { canRegister: true, message: 'Registratie toegestaan.' };

  } catch (error) {
    console.error('[Auth Action] Unexpected error in checkRegistrationEligibility:', error);
    return { canRegister: false, message: 'Er is een onbekende serverfout opgetreden.' };
  }
}

interface CreateUserResult {
  success: boolean;
  uid?: string;
  message: string;
}

export async function createUserInAuth(email: string, password: string): Promise<CreateUserResult> {
  try {
    const userRecord = await getAuth().createUser({
      email: email,
      password: password,
    });
    return { success: true, uid: userRecord.uid, message: 'User created successfully in Firebase Auth.' };
  } catch (error: any) {
    console.error('[Auth Action] Error creating user in Firebase Auth via Admin SDK:', error);
    let message = 'Er is een onbekende serverfout opgetreden bij het aanmaken van het account.';
    if (error.code === 'auth/email-already-exists') {
      message = 'Dit e-mailadres is al in gebruik door een ander account.';
    } else if (error.code === 'auth/invalid-password') {
        message = 'Het wachtwoord is ongeldig. Het moet minimaal 8 tekens lang zijn.';
    }
    return { success: false, message: message };
  }
}


/**
 * Checks the premium status of a currently authenticated user from the client-side.
 * This is called after login to update the UI, using the secure Admin SDK.
 * @param uid The user's UID from Firebase Auth.
 * @returns An object with premium status and remaining days.
 */
export async function getUserPremiumStatus(uid: string): Promise<PremiumStatusResult> {
    if (!adminDb) {
        console.error("[Auth Action] Admin SDK not initialized for getUserStatus.");
        return { isPremium: false, daysRemaining: null, error: "Server configuratiefout." };
    }

    try {
        const user = await getAuth().getUser(uid);
        const email = user.email;

        if (!email) {
            return { isPremium: false, daysRemaining: null, error: "Geen e-mailadres gekoppeld aan account." };
        }
        
        const premiumUsersQuery = adminDb.collection('premium_users').where('email', '==', email);
        const querySnapshot = await premiumUsersQuery.get();
        
        if (querySnapshot.empty) {
            return { isPremium: false, daysRemaining: null };
        }
        
        const doc = querySnapshot.docs[0];
        const data = doc.data();

        if (!data || !data.expiryDate || !data.expiryDate.toDate) {
            return { isPremium: false, daysRemaining: null };
        }
        
        const expiryDate = data.expiryDate.toDate();
        const daysRemaining = differenceInDays(expiryDate, new Date());
        
        if (daysRemaining >= 0) {
            return { isPremium: true, daysRemaining };
        } else {
            return { isPremium: false, daysRemaining };
        }

    } catch (error: any) {
        console.error(`[Auth Action] Error fetching premium status for UID ${uid}:`, error);
        return { isPremium: false, daysRemaining: null, error: "Kon premium status niet verifiëren." };
    }
}
