"use client";

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { app } from '@/lib/firebase';

// This provider handles the Firebase App Check initialization.
export function FirebaseAppCheckProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && app) {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

        if (!siteKey) {
            console.warn("App Check not initialized: NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set in the .env file. Please add it to enable App Check.");
            return;
        }

        try {
            initializeAppCheck(app, {
                provider: new ReCaptchaV3Provider(siteKey),
                isTokenAutoRefreshEnabled: true
            });
            console.log("Firebase App Check initialized successfully using ReCaptchaV3Provider.");
        } catch(e) {
            console.error("Firebase App Check initialization failed:", e);
        }
    }
  }, []);

  return <>{children}</>;
}
