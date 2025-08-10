"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Target, 
  Lightbulb, 
  BarChart3, 
  Hash, 
  Share2,
  Copy,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ContentAnalyzer, type ContentAnalysisResult } from '@/ai/content-analyzer';
import { SEOContentGenerator, type SEOContentData } from '@/ai/seo-content-generator';

interface SEODashboardProps {
  currentDate: Date;
  allData: any;
  isVisible?: boolean;
}

export function SEODashboard({ currentDate, allData, isVisible = false }: SEODashboardProps) {
  const [analysisResult, setAnalysisResult] = useState<ContentAnalysisResult | null>(null);
  const [seoContent, setSeoContent] = useState<any>(null);
  const [copiedText, setCopiedText] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (currentDate && allData && isVisible) {
      analyzeContent();
      generateSEOContent();
    }
  }, [currentDate, allData, isVisible]);

  const analyzeContent = () => {
    try {
      const result = ContentAnalyzer.analyzeContent(allData, currentDate);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing content:', error);
    }
  };

  const generateSEOContent = () => {
    try {
      const year = currentDate.getFullYear();
      const currentYear = new Date().getFullYear();
      const yearsAgo = currentYear - year;
      
      const seoData: SEOContentData = {
        date: currentDate.toLocaleDateString('nl-NL', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        }),
        year,
        yearsAgo,
        musicData: allData.music?.data,
        movieData: allData.movies?.data,
        sportData: allData.sport?.data || allData.voetbal?.data,
        weatherData: allData.weer?.data,
        politicalData: allData.politiek?.data,
        otherHistoricalData: allData.birthdays?.data || allData.names?.data,
      };

      const content = SEOContentGenerator.generateContent(seoData);
      setSeoContent(content);
    } catch (error) {
      console.error('Error generating SEO content:', error);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(type);
      toast({
        title: "Gekopieerd!",
        description: `${type} is naar je klembord gekopieerd.`,
      });
      
      setTimeout(() => setCopiedText(''), 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Kopiëren mislukt",
        description: "Er is een fout opgetreden bij het kopiëren.",
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  if (!isVisible || !analysisResult || !seoContent) {
    return null;
  }

  return (
    <Card className="w-full bg-card shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          <BarChart3 className="h-5 w-5 text-primary" />
          SEO Dashboard
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* SEO Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-muted/30">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium">Content Kwaliteit</span>
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(analysisResult.contentQuality)}`}>
                {analysisResult.contentQuality}%
              </div>
              <Progress value={analysisResult.contentQuality} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium">SEO Score</span>
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(analysisResult.seoScore)}`}>
                {analysisResult.seoScore}%
              </div>
              <Progress value={analysisResult.seoScore} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Share2 className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-medium">Engagement</span>
              </div>
              <div className={`text-2xl font-bold ${getScoreColor(analysisResult.engagementPotential)}`}>
                {analysisResult.engagementPotential}%
              </div>
              <Progress value={analysisResult.engagementPotential} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="recommendations" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="recommendations">Aanbevelingen</TabsTrigger>
            <TabsTrigger value="content">SEO Content</TabsTrigger>
            <TabsTrigger value="insights">Inzichten</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  SEO Aanbevelingen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysisResult.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Hash className="h-5 w-5 text-primary" />
                  Meta Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                    {seoContent.metaDescription}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(seoContent.metaDescription, 'Meta description')}
                    >
                      {copiedText === 'Meta description' ? (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      Kopieer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Structured Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Schema.org</Badge>
                    <Badge variant="outline">Article</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automatisch gegenereerde structured data voor zoekmachines
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trending Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.trendingTopics.map((topic, index) => (
                      <Badge key={index} variant="secondary">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Content Gaps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analysisResult.contentGaps.map((gap, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">{gap}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Keyword Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.keywordOpportunities.map((keyword, index) => (
                    <Badge key={index} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Social Media Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Facebook</h4>
                  <div className="bg-muted/30 p-3 rounded-lg mb-2">
                    <p className="text-sm">{seoContent.socialMediaDescription}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(seoContent.socialMediaDescription, 'Facebook content')}
                  >
                    {copiedText === 'Facebook content' ? (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    Kopieer Facebook
                  </Button>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Twitter</h4>
                  <div className="bg-muted/30 p-3 rounded-lg mb-2">
                    <p className="text-sm">{seoContent.socialMediaDescription}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(seoContent.socialMediaDescription, 'Twitter content')}
                  >
                    {copiedText === 'Twitter content' ? (
                      <CheckCircle className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    Kopieer Twitter
                  </Button>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Hashtags</h4>
                  <div className="flex flex-wrap gap-2">
                    {seoContent.hashtags.map((hashtag, index) => (
                      <Badge key={index} variant="outline">
                        {hashtag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
