
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
  lastSignInTime: string;
}

export interface UserStatusLists {
  allPremiumUsers: PremiumUserStatus[];
  activatedUsers: ActivatedUserStatus[];
  pendingActivationUsers: PremiumUserStatus[];
}

export interface UsageAnalytics {
  tabClickCounts: Record<string, number>;
  monthlyUsage: Record<string, number>;
  newspaperGenerationsThisMonth: number;
  weeklyTabClicks: Record<string, number>; // Week keys like "2024-W01"
}

/**
 * Check if a user has admin privileges
 * @param uid The user's UID from Firebase Auth
 * @returns boolean indicating if user is admin
 */
export async function checkAdminPrivileges(uid: string): Promise<boolean> {
  if (!adminDb) {
    console.error('[Admin Action] Firebase Admin SDK is not initialized.');
    return false;
  }

  try {
    const user = await getAuth().getUser(uid);
    const email = user.email;

    if (!email) {
      return false;
    }

    // List of admin email addresses - you can modify this list
    const adminEmails = [
      'admin@example.com', // Test account
      // Add your actual admin email addresses here
      'edwin@editsolutions.nl',
    ];

    return adminEmails.includes(email.toLowerCase());
  } catch (error) {
    console.error(`[Admin Action] Error checking admin privileges for UID ${uid}:`, error);
    return false;
  }
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

  // Get weekly tab click data for the last 26 weeks
  let weeklyTabClicks: Record<string, number> = {};
  const weeklyClicksDoc = await adminDb.collection('analytics').doc('weekly_tab_clicks').get();
  if (weeklyClicksDoc.exists) {
    weeklyTabClicks = weeklyClicksDoc.data() || {};
  }

  return {
    newspaperGenerationsThisMonth,
    tabClickCounts,
    monthlyUsage: {}, // Initialize empty for now
    weeklyTabClicks,
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
    // Track total tab clicks
    const analyticsRef = adminDb.collection('analytics').doc('tab_clicks');
    await analyticsRef.set({
      [tabId]: FieldValue.increment(1)
    }, { merge: true });

    // Track weekly tab clicks
    const now = new Date();
    const weekKey = format(now, 'yyyy-\'W\'II', { weekStartsOn: 1 }); // ISO week format
    
    const weeklyAnalyticsRef = adminDb.collection('analytics').doc('weekly_tab_clicks');
    await weeklyAnalyticsRef.set({
      [weekKey]: FieldValue.increment(1)
    }, { merge: true });
  } catch (error) {
    console.error(`[Analytics] Failed to track click for tab "${tabId}":`, error);
  }
}
