import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { getAuth } from 'firebase-admin/auth';

export async function POST(request: NextRequest) {
  try {
    const { uid } = await request.json();

    if (!uid) {
      return NextResponse.json(
        { error: 'UID is required' },
        { status: 400 }
      );
    }

    if (!adminDb) {
      return NextResponse.json(
        { error: 'Firebase Admin SDK not initialized' },
        { status: 500 }
      );
    }

    // Get user info from Firebase Auth
    const userRecord = await getAuth().getUser(uid);
    const email = userRecord.email;

    if (!email) {
      return NextResponse.json(
        { error: 'User has no email address' },
        { status: 400 }
      );
    }

    // Check if user is admin by email
    const adminEmails = [
      'admin@example.com',
      'edwin@editsolutions.nl',
    ];

    const isAdmin = adminEmails.includes(email.toLowerCase());
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'User is not an admin' },
        { status: 403 }
      );
    }

    // Check if user already has premium access
    const existingPremiumQuery = adminDb.collection('premium_users').where('email', '==', email);
    const existingPremiumSnapshot = await existingPremiumQuery.get();

    if (!existingPremiumSnapshot.empty) {
      // User already has premium access, check if it's expired
      const doc = existingPremiumSnapshot.docs[0];
      const data = doc.data();
      
      if (data.expiryDate && data.expiryDate.toDate && data.expiryDate.toDate() > new Date()) {
        // User already has valid premium access
        return NextResponse.json({
          success: true,
          message: 'User already has valid premium access',
          existingExpiry: data.expiryDate.toDate().toISOString()
        });
      }
    }

    // Grant premium access for 10 years from now (admin privilege)
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 10);

    const premiumData = {
      email: email,
      uid: uid,
      expiryDate: expiryDate,
      grantedAt: new Date(),
      grantedBy: 'system',
      reason: 'admin_privilege',
      source: 'admin_auto_grant'
    };

    if (existingPremiumSnapshot.empty) {
      // Create new premium user document
      await adminDb.collection('premium_users').add(premiumData);
    } else {
      // Update existing document
      const doc = existingPremiumSnapshot.docs[0];
      await doc.ref.update({
        expiryDate: expiryDate,
        grantedAt: new Date(),
        grantedBy: 'system',
        reason: 'admin_privilege',
        source: 'admin_auto_grant'
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Premium access granted to admin user',
      expiryDate: expiryDate.toISOString()
    });

  } catch (error) {
    console.error('Error granting admin premium access:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
