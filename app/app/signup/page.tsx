import { Suspense } from "react";
import React from 'react';
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Home } from "lucide-react";
import { SignupForm } from "./signup-form"; // Import the new client component

// This is now a Server Component
export default function SignupPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const email = searchParams.email || '';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <Suspense fallback={
        <Card className="w-full max-w-sm mx-auto flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin" />
        </Card>
      }>
        <SignupForm initialEmail={typeof email === 'string' ? email : ''} />
      </Suspense>
      <div className="mt-6 text-center">
          <Button variant="link" asChild>
              <Link href="/" className="text-muted-foreground hover:text-primary">
                  <Home className="mr-2 h-4 w-4" />
                  Terug naar startscherm
              </Link>
          </Button>
      </div>
    </main>
  );
}
