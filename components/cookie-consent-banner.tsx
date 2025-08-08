
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie } from 'lucide-react';
import Link from 'next/link';

const COOKIE_CONSENT_KEY = 'hwha_cookie_consent';

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consentGiven) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4 bg-background/80 backdrop-blur-sm">
      <Card className="max-w-3xl mx-auto shadow-2xl border-border">
        <div className="flex flex-col sm:flex-row items-center p-3 sm:p-4 gap-3 sm:gap-4">
          <div className="flex-shrink-0">
            <Cookie className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-grow text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              Wij gebruiken cookies om uw ervaring te verbeteren. Door verder te gaan, stemt u in met ons{' '}
              <Link href="/cookies" className="underline hover:text-primary">
                cookiebeleid
              </Link>.
            </p>
          </div>
          <div className="flex-shrink-0 w-full sm:w-auto">
             <Button onClick={handleAccept} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              Accepteren
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
