'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { getUserPremiumStatus } from '@/actions/auth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        
        try {
          // Check if user has admin privileges by email
          const adminEmails = [
            'admin@example.com', // Test account
            // Add your actual admin email addresses 
            'edwin@editsolutions.nl',
          ];
          
          const isUserAdmin = adminEmails.includes(user.email?.toLowerCase() || '');
          setIsAdmin(isUserAdmin);
          
          if (isUserAdmin) {
            // Admin users should always be premium - check and ensure premium status
            try {
              const premiumStatus = await getUserPremiumStatus(user.uid);
              setIsPremium(premiumStatus.isPremium);
              
              // If admin is not premium, we need to make them premium
              if (!premiumStatus.isPremium) {
                console.log(`Admin user ${user.email} is not premium, ensuring premium access...`);
                
                try {
                  // Call API to grant premium access to admin user
                  const response = await fetch('/api/grant-admin-premium', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uid: user.uid }),
                  });
                  
                  if (response.ok) {
                    const result = await response.json();
                    console.log('Premium access granted:', result);
                    setIsPremium(true);
                  } else {
                    console.error('Failed to grant premium access:', response.statusText);
                    // Admin users should always be premium, so set to true even if API call fails
                    setIsPremium(true);
                  }
                } catch (apiError) {
                  console.error('Error calling premium grant API:', apiError);
                  // Admin users should always be premium, so set to true even if API call fails
                  setIsPremium(true);
                }
              }
            } catch (error) {
              console.error('Error checking premium status for admin:', error);
              // Admin users should always be premium, so set to true even if check fails
              setIsPremium(true);
            }
          } else {
            console.log(`User ${user.email} is not an admin`);
            setIsPremium(false);
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
          setIsPremium(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        setIsPremium(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && (!isAdmin || !isPremium)) {
      // Redirect non-admin or non-premium users to home page
      router.push('/');
    }
  }, [loading, isAdmin, isPremium, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Laden...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Controleer bevoegdheden...
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user || !isAdmin || !isPremium) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Toegang Geweigerd</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Geen Toegang</AlertTitle>
              <AlertDescription>
                Je hebt geen bevoegdheid om deze pagina te bekijken. 
                Alleen admin gebruikers met premium toegang hebben toegang tot het admin dashboard.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
            <span className="text-sm text-muted-foreground">
              Welkom, {user.email} (Admin + Premium)
            </span>
          </div>
        </div>
      </div>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
