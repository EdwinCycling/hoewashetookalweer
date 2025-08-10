'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
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
            // Add your actual admin email addresses here
            edwin@editsolutions.nl,
          ];
          
          const isUserAdmin = adminEmails.includes(user.email?.toLowerCase() || '');
          setIsAdmin(isUserAdmin);
          
          if (!isUserAdmin) {
            console.log(`User ${user.email} is not an admin`);
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !isAdmin) {
      // Redirect non-admin users to home page
      router.push('/');
    }
  }, [loading, isAdmin, router]);

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

  if (!user || !isAdmin) {
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
                Alleen admin gebruikers hebben toegang tot het admin dashboard.
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
              Welkom, {user.email}
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
