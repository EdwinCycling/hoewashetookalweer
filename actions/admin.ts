
'use server';

import { adminDb } from '@/lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { differenceInDays, format } from 'date-fns';
import { FieldValue } from 'firebase-admin/firestore';

export interface PremiumUserStatus {
  email: string;
  expiryDate: Date;
  daysRemaining: number;
  isExpired: boolean;
}

export interface ActivatedUserStatus extends PremiumUserStatus {
  uid: string;
  lastSignInTime?: string;
}

export interface UserStatusLists {
  allPremiumUsers: PremiumUserStatus[];
  activatedUsers: ActivatedUserStatus[];
  pendingActivationUsers: PremiumUserStatus[];
}

export interface UsageAnalytics {
  newspaperGenerationsThisMonth: number;
  tabClickCounts: Record<string, number>;
}

export async function getUserStatusLists(): Promise<UserStatusLists> {
  if (!adminDb) {
    throw new Error('Firebase Admin SDK is not initialized.');
  }

  // 1. Get all users from Firebase Authentication
  const listUsersResult = await getAuth().listUsers(1000); // Batch of 1000, assuming not more for this test
  const authUsersMap = new Map(listUsersResult.users.map(user => [user.email ?? 'no-email', user]));
  
  // 2. Get all users from Firestore 'premium_users' collection
  const premiumUsersSnapshot = await adminDb.collection('premium_users').get();
  const now = new Date();

  const allPremiumUsers: PremiumUserStatus[] = [];
  const activatedUsers: ActivatedUserStatus[] = [];
  const pendingActivationUsers: PremiumUserStatus[] = [];

  for (const doc of premiumUsersSnapshot.docs) {
    const data = doc.data();
    const email = data.email || doc.id;
    const expiryDate = data.expiryDate?.toDate();

    if (!email || !expiryDate) continue;
    
    const daysRemaining = differenceInDays(expiryDate, now);
    const isExpired = daysRemaining < 0;

    const premiumUser: PremiumUserStatus = {
      email,
      expiryDate,
      daysRemaining,
      isExpired,
    };
    
    allPremiumUsers.push(premiumUser);
    
    const authUser = authUsersMap.get(email);

    if (authUser) {
      activatedUsers.push({
        ...premiumUser,
        uid: authUser.uid,
        lastSignInTime: authUser.metadata.lastSignInTime,
      });
    } else {
      if (!isExpired) {
        pendingActivationUsers.push(premiumUser);
      }
    }
  }

  allPremiumUsers.sort((a, b) => b.daysRemaining - a.daysRemaining);
  activatedUsers.sort((a, b) => b.daysRemaining - a.daysRemaining);
  pendingActivationUsers.sort((a, b) => b.daysRemaining - a.daysRemaining);

  return { allPremiumUsers, activatedUsers, pendingActivationUsers };
}

export async function getUsageAnalytics(): Promise<UsageAnalytics> {
  if (!adminDb) {
    throw new Error('Firebase Admin SDK is not initialized.');
  }

  let newspaperGenerationsThisMonth = 0;
  const currentMonthKey = format(new Date(), 'yyyy-MM');
  
  // Calculate total newspaper generations for the current month
  const usageSnapshot = await adminDb.collection('user_usage').get();
  usageSnapshot.forEach(doc => {
    const data = doc.data();
    if (data.newspaper_generations && data.newspaper_generations[currentMonthKey]) {
      newspaperGenerationsThisMonth += data.newspaper_generations[currentMonthKey].length;
    }
  });

  // Get total tab click counts
  let tabClickCounts: Record<string, number> = {};
  const tabClicksDoc = await adminDb.collection('analytics').doc('tab_clicks').get();
  if (tabClicksDoc.exists) {
    tabClickCounts = tabClicksDoc.data() || {};
  }

  return {
    newspaperGenerationsThisMonth,
    tabClickCounts,
  };
}

/**
 * Tracks a click on a specific data tab for analytics.
 * This is a fire-and-forget action.
 * @param tabId The ID of the tab that was clicked (e.g., "krant_voorpagina").
 */
export async function trackTabClick(tabId: string): Promise<void> {
  if (!adminDb) {
    console.warn('[Analytics] Admin SDK not available, cannot track tab click.');
    return;
  }

  try {
    const analyticsRef = adminDb.collection('analytics').doc('tab_clicks');
    // Atomically increment the counter for the specific tab.
    await analyticsRef.set({
      [tabId]: FieldValue.increment(1)
    }, { merge: true });
  } catch (error) {
    console.error(`[Analytics] Failed to track click for tab "${tabId}":`, error);
  }
}
