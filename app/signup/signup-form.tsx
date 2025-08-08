
"use client";

import { useState, useMemo, useEffect } from "react";
import React from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/lib/firebase";
import { checkRegistrationEligibility, createUserInAuth } from "@/actions/auth";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Helper function to determine password strength
const getPasswordStrength = (password: string) => {
  if (!password || password.length === 0) {
    return { value: 0, color: '', label: '' };
  }
  if (password.length < 8) {
    return { value: 33, color: '[&>div]:!bg-red-500', label: 'Zwak (minimaal 8 tekens)' };
  }
  const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  if (hasSpecialChars) {
    return { value: 100, color: '[&>div]:!bg-green-500', label: 'Sterk' };
  }
  return { value: 66, color: '[&>div]:!bg-yellow-500', label: 'Medium (voeg een leesteken toe)' };
};

export function SignupForm({ initialEmail }: { initialEmail: string }) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (initialEmail) {
      try {
        setEmail(decodeURIComponent(initialEmail));
      } catch (e) {
        console.error("Failed to decode email from query params", e);
      }
    }
  }, [initialEmail]);

  const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Wachtwoorden komen niet overeen.");
      return;
    }

    if (password.length < 8) {
      setError("Wachtwoord moet minimaal 8 tekens lang zijn.");
      return;
    }
    
    setLoading(true);

    try {
        const eligibility = await checkRegistrationEligibility(email);
        if (!eligibility.canRegister) {
            setError(eligibility.message);
            setLoading(false);
            return;
        }

        const creationResult = await createUserInAuth(email, password);
        if (!creationResult.success) {
            setError(creationResult.message);
            setLoading(false);
            return;
        }

        const auth = getAuth(app!);
        if (!auth) {
            setError("Client-side Firebase is niet correct geïnitialiseerd. Kan niet inloggen.");
            setLoading(false);
            return;
        }
        await signInWithEmailAndPassword(auth, email, password);
        
        router.push('/');
        
    } catch (err: any) {
        console.error("Signup flow error:", err);
        setError("Er is een onverwachte fout opgetreden tijdens het inloggen na registratie. Probeer handmatig in te loggen.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSignup}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Activeer uw Premium Account</CardTitle>
          <CardDescription>
            Maak een account met hetzelfde e-mailadres als bij uw aankoop om premium te activeren.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Registratie Mislukt</AlertTitle>
              <AlertDescription>
                <p>{error}</p>
                {error.includes("bestaat al") && (
                   <Button asChild variant="link" className="p-0 h-auto mt-2 font-bold">
                     <Link href="/login">
                      Ga naar de login pagina
                    </Link>
                  </Button>
                )}
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
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Wachtwoord</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Verberg wachtwoord" : "Toon wachtwoord"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
             {password.length > 0 && (
              <div className="mt-2 space-y-1">
                <Progress value={passwordStrength.value} className={cn("h-1.5", passwordStrength.color)} />
                <p className="text-xs text-muted-foreground">{passwordStrength.label}</p>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Bevestig Wachtwoord</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="pr-10"
              />
               <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Verberg wachtwoord" : "Toon wachtwoord"}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Activeer Account'}
          </Button>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p className="w-full">
            Heeft u al een account?{" "}
            <Link href="/login" className="underline hover:text-primary">
              Log hier in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
