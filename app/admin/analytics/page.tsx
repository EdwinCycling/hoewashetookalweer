"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, Eye, Calendar, TrendingUp, Activity, Globe, Clock, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import Link from "next/link";
import { getAuth, type User } from 'firebase/auth';
import { app } from '@/lib/firebase';

// Mock data - in een echte app zou dit uit een database komen
const mockAnalyticsData = {
  pageViews: {
    total: 15420,
    change: 12.5,
    trend: 'up',
    daily: [120, 145, 132, 167, 189, 201, 178, 156, 143, 167, 189, 201, 178, 156, 143, 167, 189, 201, 178, 156, 143, 167, 189, 201, 178, 156, 143, 167, 189, 201]
  },
  uniqueVisitors: {
    total: 3247,
    change: 8.2,
    trend: 'up',
    daily: [45, 52, 48, 61, 67, 73, 68, 59, 54, 61, 67, 73, 68, 59, 54, 61, 67, 73, 68, 59, 54, 61, 67, 73, 68, 59, 54, 61, 67, 73]
  },
  popularPages: [
    { name: 'Homepage', views: 5234, change: 15.2 },
    { name: 'Premium', views: 1892, change: 8.7 },
    { name: 'Contact', views: 1247, change: -2.1 },
    { name: 'FAQ', views: 987, change: 12.3 },
    { name: 'Cookies', views: 456, change: 5.8 }
  ],
  topSearches: [
    { term: '1980', count: 234, change: 18.5 },
    { term: '1990', count: 189, change: 12.3 },
    { term: '2000', count: 167, change: 8.9 },
    { term: '2010', count: 145, change: 15.7 },
    { term: '2020', count: 123, change: 22.1 }
  ],
  userEngagement: {
    averageSessionDuration: '4m 32s',
    bounceRate: '23.4%',
    pagesPerSession: 3.2,
    returnVisitors: '34.2%'
  },
  deviceUsage: [
    { device: 'Desktop', percentage: 58.3, change: 2.1 },
    { device: 'Mobile', percentage: 38.7, change: -1.8 },
    { device: 'Tablet', percentage: 3.0, change: -0.3 }
  ],
  geographicData: [
    { country: 'Nederland', percentage: 89.2, change: 1.2 },
    { country: 'België', percentage: 6.8, change: 0.8 },
    { country: 'Duitsland', percentage: 2.1, change: 0.3 },
    { country: 'Overig', percentage: 1.9, change: -0.2 }
  ]
};

const StatCard = ({ title, value, change, trend, icon: Icon }: { 
  title: string; 
  value: string | number; 
  change: number; 
  trend: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'down':
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getChangeColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <Card className="bg-card border-2 border-border shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs mt-1">
          {getTrendIcon()}
          <span className={`ml-1 ${getChangeColor()}`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
          <span className="text-muted-foreground ml-1">van vorige maand</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default function AnalyticsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (app) {
      const auth = getAuth(app);
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
        if (user && ['admin@example.com', 'edwin@editsolutions.nl'].includes(user.email?.toLowerCase() || '')) {
          setIsAdmin(true);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Toegang Geweigerd</CardTitle>
            <CardDescription>
              U heeft geen toegang tot deze pagina. Alleen beheerders kunnen de analytics bekijken.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild className="w-full">
              <Link href="/">Terug naar Home</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col p-4 sm:p-6 md:p-8 lg:p-10 bg-background">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              App Analytics
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Overzicht van app gebruik, bezoekers en prestaties
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Paginaweergaven"
            value={mockAnalyticsData.pageViews.total.toLocaleString()}
            change={mockAnalyticsData.pageViews.change}
            trend="up"
            icon={Eye}
          />
          <StatCard
            title="Unieke Bezoekers"
            value={mockAnalyticsData.uniqueVisitors.total.toLocaleString()}
            change={mockAnalyticsData.uniqueVisitors.change}
            trend="up"
            icon={Users}
          />
          <StatCard
            title="Gemiddelde Sessieduur"
            value={mockAnalyticsData.userEngagement.averageSessionDuration}
            change={5.2}
            trend="up"
            icon={Clock}
          />
          <StatCard
            title="Bounce Rate"
            value={mockAnalyticsData.userEngagement.bounceRate}
            change={-2.1}
            trend="down"
            icon={Activity}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overzicht</TabsTrigger>
            <TabsTrigger value="traffic">Verkeer</TabsTrigger>
            <TabsTrigger value="users">Gebruikers</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Popular Pages */}
              <Card className="bg-card border-2 border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Populairste Pagina's
                  </CardTitle>
                  <CardDescription>Pagina's met de meeste bezoeken</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAnalyticsData.popularPages.map((page, index) => (
                      <div key={page.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                            {index + 1}
                          </span>
                          <span className="font-medium">{page.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{page.views.toLocaleString()}</div>
                          <div className={`text-xs ${page.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {page.change > 0 ? '+' : ''}{page.change}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Searches */}
              <Card className="bg-card border-2 border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="mr-2 h-5 w-5" />
                    Populairste Zoektermen
                  </CardTitle>
                  <CardDescription>Meest gezochte jaartallen</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAnalyticsData.topSearches.map((search, index) => (
                      <div key={search.term} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                            {index + 1}
                          </span>
                          <span className="font-medium">{search.term}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{search.count}</div>
                          <div className="text-xs text-green-600">+{search.change}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Device Usage */}
              <Card className="bg-card border-2 border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    Apparaat Gebruik
                  </CardTitle>
                  <CardDescription>Verdeling van bezoekers per apparaat</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalyticsData.deviceUsage.map((device) => (
                      <div key={device.device} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{device.device}</span>
                          <span className="font-medium">{device.percentage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${device.percentage}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {device.change > 0 ? '+' : ''}{device.change}% van vorige maand
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Geographic Data */}
              <Card className="bg-card border-2 border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="mr-2 h-5 w-5" />
                    Geografische Verdeling
                  </CardTitle>
                  <CardDescription>Bezoekers per land</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalyticsData.geographicData.map((geo) => (
                      <div key={geo.country} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{geo.country}</span>
                          <span className="font-medium">{geo.percentage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${geo.percentage}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {geo.change > 0 ? '+' : ''}{geo.change}% van vorige maand
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-card border-2 border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Gebruikers Engagement
                </CardTitle>
                <CardDescription>Gedetailleerde gebruikersstatistieken</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{mockAnalyticsData.userEngagement.averageSessionDuration}</div>
                    <div className="text-sm text-muted-foreground">Gemiddelde Sessieduur</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{mockAnalyticsData.userEngagement.bounceRate}</div>
                    <div className="text-sm text-muted-foreground">Bounce Rate</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{mockAnalyticsData.userEngagement.pagesPerSession}</div>
                    <div className="text-sm text-muted-foreground">Pagina's per Sessie</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{mockAnalyticsData.userEngagement.returnVisitors}</div>
                    <div className="text-sm text-muted-foreground">Terugkerende Bezoekers</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card className="bg-card border-2 border-border shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Content Prestaties
                </CardTitle>
                <CardDescription>Hoe goed verschillende content secties presteren</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Content analytics worden binnenkort toegevoegd.</p>
                  <p className="text-sm">Hier komt gedetailleerde informatie over welke tabbladen het populairst zijn.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Terug naar Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
