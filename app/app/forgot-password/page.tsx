
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Loader2, Eye, EyeOff, Home } from "lucide-react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "@/lib/firebase";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const auth = getAuth(app!);
    if (!auth) {
        setError("Firebase is niet correct geïnitialiseerd.");
        setLoading(false);
        return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Een e-mail met instructies om uw wachtwoord te herstellen is verzonden (als het account bestaat). Controleer uw inbox en spamfolder.");
      console.log(`[Password Reset] Request to Firebase successful for: ${email}`);
    } catch (err: any) {
      console.error("[Password Reset] Firebase Error:", err);
      if (err.code === 'auth/app-check-token-error' || (err.message && err.message.includes('appCheck/fetch-status-error'))) {
        setError("Verificatie van de app is mislukt. Dit is een configuratieprobleem (App Check). Controleer de browser console voor meer details of neem contact op met de beheerder.");
      } else if (err.code === 'auth/user-not-found') {
        setSuccess("Een e-mail met instructies om uw wachtwoord te herstellen is verzonden (als het account bestaat). Controleer uw inbox en spamfolder.");
        console.warn(`[Password Reset] User not found for: ${email}. Generic success message shown to user.`);
      } else {
        setError("Er is een onbekende fout opgetreden. Probeer het later opnieuw.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-sm mx-auto">
        <form onSubmit={handlePasswordReset}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Wachtwoord Vergeten</CardTitle>
            <CardDescription>
              Voer uw e-mailadres in om uw wachtwoord te herstellen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Fout</AlertTitle>
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}
             {success && !error && (
              <Alert variant="success">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Verzoek Verzonden</AlertTitle>
                <AlertDescription>
                  {success}
                </AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">E-mailadres</Label>
              <Input
                id="email"
                type="email"
                placeholder="naam@voorbeeld.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || !!success}
              />
            </div>
            {success ? (
              <Button onClick={() => router.push('/login')} className="w-full" type="button">
                Terug naar login scherm
              </Button>
            ) : (
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Verstuur Herstel E-mail'}
              </Button>
            )}
          </CardContent>
          <CardFooter className="text-center text-sm">
            <p className="w-full">
              Weet u het weer?{" "}
              <Link href="/login" className="underline hover:text-primary">
                Log hier in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
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
