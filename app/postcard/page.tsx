"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function PostcardRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Redirect to the new postcard-simple page with all query parameters
    const params = new URLSearchParams(searchParams.toString());
    router.replace(`/postcard-simple?${params.toString()}`);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Doorverwijzen...</h1>
        <p className="text-muted-foreground">Je wordt doorgestuurd naar de nieuwe postcard maker.</p>
      </div>
    </div>
  );
}

export default function PostcardRedirectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Laden...</h1>
        </div>
      </div>
    }>
      <PostcardRedirectContent />
    </Suspense>
  );
}
