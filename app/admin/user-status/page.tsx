
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getUserStatusLists, getUsageAnalytics, type PremiumUserStatus, type UsageAnalytics } from "@/actions/admin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, UserPlus, Users, Newspaper, MousePointerClick, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ActivatedUsersCard } from './activated-users-card';

export const revalidate = 0; // Disable caching for this page

export default async function AdminUserStatusPage() {
  let allPremiumUsers: PremiumUserStatus[] = [];
  let activatedUsers: any[] = [];
  let pendingActivationUsers: PremiumUserStatus[] = [];
  let analytics: UsageAnalytics | null = null;
  let error: string | null = null;

  try {
    const [lists, analyticsData] = await Promise.all([
      getUserStatusLists(),
      getUsageAnalytics()
    ]);
    allPremiumUsers = lists.allPremiumUsers;
    activatedUsers = lists.activatedUsers;
    pendingActivationUsers = lists.pendingActivationUsers;
    analytics = analyticsData;
  } catch (e: any) {
    error = e.message || "An unknown error occurred while fetching user data.";
  }

  const sortedTabClicks = analytics 
    ? Object.entries(analytics.tabClickCounts).sort(([, a], [, b]) => b - a)
    : [];

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8 lg:p-10 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-6 max-w-6xl w-full">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Fout bij ophalen data</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Analytics Row */}
      <div className="w-full max-w-6xl mb-8">
        <h2 className="text-2xl font-semibold mb-4">Gebruiksstatistieken</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <MousePointerClick className="mr-2 h-5 w-5 text-primary" />
                        Populairste Tabbladen
                    </CardTitle>
                    <CardDescription>Totaal aantal kliks per tabblad (all-time).</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tabblad</TableHead>
                                <TableHead className="text-right">Aantal Kliks</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedTabClicks.length > 0 ? (
                                sortedTabClicks.map(([tabId, count]) => (
                                    <TableRow key={tabId}>
                                        <TableCell className="font-medium break-all">{tabId}</TableCell>
                                        <TableCell className="text-right font-mono">{count}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={2} className="text-center text-muted-foreground">Geen klikdata gevonden.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* 26 Weeks Chart */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                        Tab Kliks (26 Weken)
                    </CardTitle>
                    <CardDescription>Totaal aantal tab kliks per week over de afgelopen 26 weken.</CardDescription>
                </CardHeader>
                <CardContent>
                    {analytics?.weeklyTabClicks && Object.keys(analytics.weeklyTabClicks).length > 0 ? (
                        <div className="space-y-2">
                            {Object.entries(analytics.weeklyTabClicks)
                                .sort(([a], [b]) => a.localeCompare(b))
                                .slice(-26)
                                .map(([weekKey, count]) => (
                                    <div key={weekKey} className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{weekKey}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 bg-muted rounded-full h-2">
                                                <div 
                                                    className="bg-primary h-2 rounded-full transition-all duration-300"
                                                    style={{ 
                                                        width: `${Math.min(100, (count / Math.max(...Object.values(analytics.weeklyTabClicks))) * 100)}%` 
                                                    }}
                                                ></div>
                                            </div>
                                            <span className="text-sm font-mono min-w-[3rem] text-right">{count}</span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground py-8">
                            <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>Nog geen wekelijkse klikdata beschikbaar.</p>
                            <p className="text-xs">Data wordt verzameld zodra gebruikers tabbladen bezoeken.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>


      {/* User Status Row */}
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Gebruikersstatus</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Alle Premium Abonnementen
              </CardTitle>
              <CardDescription>Lijst van alle e-mails in de `premium_users` database.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>E-mail</TableHead>
                    <TableHead className="text-right">Dagen Resterend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allPremiumUsers.length > 0 ? (
                    allPremiumUsers.map(user => (
                      <TableRow key={user.email}>
                        <TableCell className="font-medium break-all">{user.email}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={user.isExpired ? "destructive" : "default"}>
                            {user.daysRemaining}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center text-muted-foreground">Geen gebruikers gevonden in Firestore.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <ActivatedUsersCard activatedUsers={activatedUsers} />

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="mr-2 h-5 w-5 text-yellow-500" />
                Wachtend op Activatie
              </CardTitle>
              <CardDescription>Actieve premium gebruikers die nog geen account hebben.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>E-mail</TableHead>
                    <TableHead className="text-right">Dagen Resterend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingActivationUsers.length > 0 ? (
                    pendingActivationUsers.map(user => (
                      <TableRow key={user.email}>
                        <TableCell className="font-medium break-all">{user.email}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant="default">
                            {user.daysRemaining}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center text-muted-foreground">Geen gebruikers wachtend op activatie.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="w-full flex justify-center mt-8">
        <Button asChild variant="default">
          <Link href="/">
            Terug naar Hoofdpagina
          </Link>
        </Button>
      </div>
    </main>
  );
}
