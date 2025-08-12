"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, Headphones, Play, Download, Calendar, User, Sparkles, Clock, Volume2, FileAudio, CheckCircle, AlertCircle, Square } from "lucide-react";
import Link from "next/link";
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { useToast } from "@/hooks/use-toast";
import { getAuth, onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { app } from '@/lib/firebase';

interface PodcastData {
  date: string;
  event: string;
  name: string;
  historicalData: any;
}

interface PodcastScript {
  content: string;
  duration: string;
  cost?: number; // Optional since we're not showing costs anymore
  audioUrl?: string | null; // New field for Gemini TTS audio
}

const EVENT_OPTIONS = [
  { value: "verjaardag", label: "🎂 Verjaardag" },
  { value: "geboorte", label: "👶 Geboorte" },
  { value: "verloving", label: "💍 Verloving" },
  { value: "trouwerij", label: "💒 Trouwerij" },
  { value: "diploma", label: "🎓 Diploma behaald" },
  { value: "eerste_baan", label: "💼 Eerste baan" },
  { value: "verhuizing", label: "🏠 Verhuizing" },
  { value: "vakantie", label: "✈️ Onvergetelijke vakantie" },
  { value: "ontmoeting", label: "🤝 Belangrijke ontmoeting" },
  { value: "prestatie", label: "🏆 Sportieve of artistieke prestatie" },
  { value: "overig", label: "✨ Andere speciale gebeurtenis" }
];

export default function PodcastGeneratorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
  // Check API key status
  const [apiKeyStatus, setApiKeyStatus] = useState<{hasKey: boolean, message: string} | null>(null);
  
  useEffect(() => {
    const checkApiKeyStatus = async () => {
      try {
        const response = await fetch('/api/check-gemini-key');
        const data = await response.json();
        setApiKeyStatus(data);
      } catch (error) {
        console.error('Error checking API key status:', error);
        setApiKeyStatus({ hasKey: false, message: 'Kon API key status niet controleren' });
      }
    };
    
    checkApiKeyStatus();
  }, []);
  
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState(true);
  
  const [podcastData, setPodcastData] = useState<PodcastData | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [customEvent, setCustomEvent] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<PodcastScript | null>(null);
  const [userStats, setUserStats] = useState({ totalPodcasts: 0, thisMonth: 0, thisWeek: 0, today: 0 });

  useEffect(() => {
    if (!app) {
      setAuthLoading(false);
      return;
    }
    
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Check premium and admin status
        const testAccounts = ['admin@example.com', 'premium@example.com', 'user@example.com'];
        const adminAccounts = ['admin@example.com', 'beheerder@example.com'];
        
        if (testAccounts.includes(currentUser.email ?? '')) {
          setIsPremium(true);
        } else {
          // Check localStorage for now
          const isPremiumUser = localStorage.getItem('hwha_is_premium') === 'true';
          setIsPremium(true); // Temporarily allow all users for testing
        }
        
        // Check if user is admin
        if (adminAccounts.includes(currentUser.email ?? '')) {
          setIsAdmin(true);
          console.log('🔑 User is admin:', currentUser.email);
        } else if (process.env.NODE_ENV === 'development') {
          // In development, allow all users to be admin for testing
          setIsAdmin(true);
          console.log('🔑 Development mode: User is admin for testing');
        } else {
          setIsAdmin(false);
          console.log('👤 User is not admin:', currentUser.email);
        }
        
        // Load user podcast stats
        await loadUserStats(currentUser.uid);
      } else {
        setUser(null);
        setIsPremium(false);
        setIsAdmin(false);
      }
      setAuthLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Get data from URL parameters
    const dateParam = searchParams.get('date');
    const dataParam = searchParams.get('data');
    const useStorage = searchParams.get('useStorage') === 'true';
    
    if (!dateParam) {
      toast({
        title: "Geen datum geselecteerd",
        description: "Ga terug en selecteer een datum om een podcast te maken.",
        variant: "destructive"
      });
      return;
    }

    try {
      let selectedData = null;
      
             if (useStorage) {
         try {
           const storedData = localStorage.getItem('postcardData');
           if (storedData) {
             try {
               selectedData = JSON.parse(storedData);
               localStorage.removeItem('postcardData');
             } catch (parseError) {
               console.error('Error parsing stored data:', parseError);
               console.log('Raw stored data:', storedData);
               selectedData = {};
             }
           }
         } catch (storageError) {
           console.error('Error reading from localStorage:', storageError);
           selectedData = {};
         }
       } else if (dataParam) {
         try {
           // First try to decode the URI component safely
           let decodedParam;
           try {
             decodedParam = decodeURIComponent(dataParam);
           } catch (decodeError) {
             console.warn('URI decode failed, trying raw parameter:', decodeError);
             decodedParam = dataParam;
           }
           
           // Then try to parse the JSON
           selectedData = JSON.parse(decodedParam);
         } catch (parseError) {
           console.error('Error parsing data parameter:', parseError);
           console.log('Raw dataParam:', dataParam);
           selectedData = {};
         }
       }
      
      setPodcastData({
        date: dateParam,
        event: '',
        name: '',
        historicalData: selectedData || {}
      });
    } catch (error) {
      console.error('Error setting up podcast data:', error);
      setPodcastData({
        date: dateParam,
        event: '',
        name: '',
        historicalData: {}
      });
    }
  }, [searchParams, toast]);

  const loadUserStats = async (userId: string) => {
    // In a real implementation, this would call an API
    // For now, use mock data
    setUserStats({
      totalPodcasts: 0,
      thisMonth: 0,
      thisWeek: 0,
      today: 0
    });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'd MMMM yyyy', { locale: nl });
    } catch {
      return dateString;
    }
  };

  const handleEventChange = (value: string) => {
    setSelectedEvent(value);
    if (value !== 'overig') {
      setCustomEvent('');
    }
  };

  const handleGeneratePodcast = async () => {
    if (!podcastData || !user) return;
    
    const eventText = selectedEvent === 'overig' ? customEvent : selectedEvent;
    
    if (!eventText.trim()) {
      toast({
        title: "Gebeurtenis ontbreekt",
        description: "Selecteer een gebeurtenis of vul een eigen gebeurtenis in.",
        variant: "destructive"
      });
      return;
    }
    
    if (!name.trim()) {
      toast({
        title: "Naam ontbreekt",
        description: "Vul de naam in van de persoon voor wie de podcast is.",
        variant: "destructive"
      });
      return;
    }

    setGenerating(true);
    
    try {
      // Call Netlify function to generate podcast
      // Use local API route for development, Netlify function for production
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? '/api/generate-podcast' 
        : '/.netlify/functions/generate-podcast';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: podcastData.date,
          event: eventText,
          name: name,
          historicalData: podcastData.historicalData,
          userId: user.uid,
          userEmail: user.email // Add email for admin check
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fout bij genereren van podcast');
      }

      const result = await response.json();
      
      if (result.success) {
        const generatedScript: PodcastScript = {
          content: result.script,
          duration: "4-6 minuten",
          cost: 0, // Kosten worden niet meer getoond
          audioUrl: result.audioUrl || null // New Gemini TTS audio URL
        };
      
        setGeneratedScript(generatedScript);
        
        toast({
          title: "🎧 Podcast gegenereerd!",
          description: result.message || "Je persoonlijke podcast is klaar om te beluisteren.",
        });
      } else {
        throw new Error(result.error || 'Onbekende fout opgetreden');
      }
      
    } catch (error) {
      console.error('Error generating podcast:', error);
      toast({
        title: "Fout bij genereren",
        description: error instanceof Error ? error.message : "Er is een fout opgetreden bij het genereren van de podcast.",
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlayPodcast = () => {
    if (!generatedScript) return;
    
    // If we have Gemini TTS audio, play that instead of text-to-speech
    if (generatedScript.audioUrl) {
      const audio = new Audio(generatedScript.audioUrl);
      audio.play();
      setIsPlaying(true);
      
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);
      
      toast({
        title: "🔊 Gemini TTS Podcast afspelen",
        description: "Je AI-gegenereerde podcast wordt nu afgespeeld met 2 Nederlandse stemmen!",
      });
      return;
    }
    
    // Fallback to browser text-to-speech
    const utterance = new SpeechSynthesisUtterance(generatedScript.content);
    utterance.lang = 'nl-NL';
    utterance.rate = 0.9;
    utterance.pitch = 1.1; // Slightly higher pitch for female voice
    
    // Try to use a Dutch female voice if available
    const voices = speechSynthesis.getVoices();
    const dutchFemaleVoice = voices.find(voice => 
      voice.lang.includes('nl') && voice.name.toLowerCase().includes('female')
    );
    const dutchVoice = voices.find(voice => voice.lang.includes('nl'));
    
    if (dutchFemaleVoice) {
      utterance.voice = dutchFemaleVoice;
    } else if (dutchVoice) {
      utterance.voice = dutchVoice;
    }
    
    // Set up event handlers
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    // Play the audio
    speechSynthesis.speak(utterance);
    
    toast({
      title: "🔊 Browser TTS Podcast afspelen",
      description: "Je podcast wordt nu afgespeeld met browser text-to-speech.",
    });
  };
  
  const handleStopPodcast = () => {
    // Stop both Gemini TTS and browser TTS
    speechSynthesis.cancel();
    setIsPlaying(false);
    
    toast({
      title: "⏹️ Podcast gestopt",
      description: "Het afspelen van je podcast is gestopt.",
    });
  };

  const handleDownloadPodcast = async () => {
    if (!generatedScript) return;
    
    try {
      // If we have Gemini TTS audio, download that
      if (generatedScript.audioUrl) {
        // Convert base64 data URL to blob and download
        const response = await fetch(generatedScript.audioUrl);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `podcast-${podcastData?.date || 'audio'}.wav`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        
        toast({
          title: "📥 Gemini TTS Audio gedownload!",
          description: "Je AI-gegenereerde podcast audio is gedownload als WAV bestand!",
        });
        return;
      }
      
      // Fallback to text download
      const utterance = new SpeechSynthesisUtterance(generatedScript.content);
      utterance.lang = 'nl-NL';
      utterance.rate = 0.9;
      utterance.pitch = 1.1; // Slightly higher pitch for female voice
      
      // Try to use a Dutch female voice if available
      const voices = speechSynthesis.getVoices();
      const dutchFemaleVoice = voices.find(voice => 
        voice.lang.includes('nl') && voice.name.toLowerCase().includes('female')
      );
      const dutchVoice = voices.find(voice => voice.lang.includes('nl'));
      
      if (dutchFemaleVoice) {
        utterance.voice = dutchFemaleVoice;
      } else if (dutchVoice) {
        utterance.voice = dutchVoice;
      }
      
      // For now, we'll download the script as text since audio recording is complex
      // In the future, we can implement proper audio recording with Web Audio API
      const textBlob = new Blob([generatedScript.content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(textBlob);
      
      // Create download link for text file
      const a = document.createElement('a');
      a.href = url;
      a.download = `podcast-${podcastData?.date || 'script'}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Cleanup
      URL.revokeObjectURL(url);
      
      toast({
        title: "📥 Script gedownload!",
        description: "Je podcast script is gedownload als tekstbestand!",
      });
      
      // Note: Audio download requires more complex implementation
      // We'll implement this in a future update with proper Web Audio API
      
    } catch (error) {
      console.error('Error downloading podcast:', error);
      
      toast({
        title: "❌ Download mislukt",
        description: "Er is een fout opgetreden bij het downloaden van je podcast script.",
        variant: "destructive"
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Laden...</h1>
        </div>
      </div>
    );
  }

  if (!isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <Headphones className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Premium Functionaliteit</h2>
            <p className="text-muted-foreground mb-6">
              Podcast generatie is alleen beschikbaar voor premium gebruikers.
            </p>
            <Button asChild>
              <Link href="/premium">
                Upgrade naar Premium
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if user is admin - only admins can access the current podcast functionality
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
        <div className="max-w-4xl mx-auto p-4 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 pt-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Button variant="outline" size="sm" asChild className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-primary/20 hover:border-primary/40">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Terug naar Hoofdpagina
                </Link>
              </Button>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                🎧 Podcast Generator
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Komt binnenkort beschikbaar voor premium gebruikers!
              </p>
            </div>
          </div>

          {/* Coming Soon Card */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <div className="relative">
                  <Headphones className="h-20 w-20 text-primary mx-auto" />
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                    SOON
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl text-center">
                🚀 Revolutionaire AI Podcast Generator
              </CardTitle>
              <CardDescription className="text-center text-lg">
                We werken hard aan iets geweldigs voor je!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Features Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 text-lg">🎭</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-700 dark:text-blue-300">2 Nederlandse Stemmen</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Marieke & Thomas in natuurlijke dialoog</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 text-lg">🎯</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-700 dark:text-green-300">Persoonlijke Verhalen</h3>
                      <p className="text-sm text-green-600 dark:text-green-400">Gebaseerd op jouw speciale momenten</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400 text-lg">📚</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-700 dark:text-purple-300">Historische Context</h3>
                      <p className="text-sm text-purple-600 dark:text-purple-400">Rijke achtergrondinformatie van jouw datum</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 dark:text-orange-400 text-lg">🎵</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-orange-700 dark:text-orange-300">AI-Gegenereerde Audio</h3>
                      <p className="text-sm text-orange-600 dark:text-orange-400">Professionele kwaliteit met Gemini TTS</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ontwikkeling</span>
                  <span className="text-primary font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-primary to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  We zijn bijna klaar! Nog even geduld...
                </p>
              </div>

              {/* Call to Action */}
              <div className="text-center space-y-4">
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/50 dark:to-orange-950/50 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
                    🎁 Exclusief voor Premium Gebruikers
                  </h3>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400 mb-3">
                    Wees een van de eersten die deze revolutionaire podcast technologie ervaart!
                  </p>
                  <Button asChild className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                    <Link href="/premium">
                      Upgrade Nu & Krijg Toegang
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Info */}
          <div className="text-center text-muted-foreground text-sm">
            <p>🎧 De toekomst van persoonlijke podcasts komt eraan</p>
            <p className="mt-1">Word premium lid en krijg als eerste toegang tot deze exclusieve functionaliteit!</p>
          </div>
        </div>
      </div>
    );
  }

  if (!podcastData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Podcast wordt voorbereid...</h2>
            <p className="text-muted-foreground">Even geduld terwijl we je persoonlijke podcast maken</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
      <div className="max-w-4xl mx-auto p-4 space-y-8">


        {/* API Status Warning */}
        {process.env.NODE_ENV === 'development' && apiKeyStatus && (
          <Alert className="max-w-2xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Ontwikkelomgeving:</strong> Je werkt lokaal. 
              <span className="block mt-1">
                {apiKeyStatus.hasKey ? 
                  '✅ Gemini API key gevonden - echte AI gegenereerde podcasts beschikbaar!' :
                  '⚠️ Gemini API key niet geconfigureerd - podcasts worden gegenereerd in demo modus.'
                }
              </span>
              {apiKeyStatus.message && (
                <span className="block mt-1 text-sm text-muted-foreground">
                  {apiKeyStatus.message}
                </span>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Admin Only Warning */}
        {isAdmin && (
          <Alert className="max-w-2xl mx-auto border-yellow-200 bg-yellow-50 dark:bg-yellow-950/50 dark:border-yellow-800">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800 dark:text-yellow-200">
              <strong>👑 Admin Toegang:</strong> Je test momenteel de experimentele podcast functionaliteit.
              <span className="block mt-1">
                ⚠️ Deze feature is nog in ontwikkeling en niet beschikbaar voor reguliere gebruikers.
              </span>
              <span className="block mt-1">
                💡 Gebruik deze tijd om bugs te vinden en feedback te geven!
              </span>
            </AlertDescription>
          </Alert>
        )}

        {/* Header */}
        <div className="text-center space-y-4 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Button variant="outline" size="sm" asChild className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-primary/20 hover:border-primary/40">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar Hoofdpagina
              </Link>
            </Button>
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
            <div className="flex items-center gap-2 text-primary">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">{formatDate(podcastData.date)}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              🎧 Podcast Generator
              {isAdmin && (
                <span className="text-2xl md:text-3xl ml-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  👑 Admin Modus
                </span>
              )}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isAdmin ? (
                <>
                  Je hebt toegang tot de experimentele podcast functionaliteit!
                  <span className="block mt-2 text-lg text-yellow-600 dark:text-yellow-400">
                    🚀 Test de huidige implementatie en help met ontwikkeling
                  </span>
                </>
              ) : (
                'Komt binnenkort beschikbaar voor premium gebruikers!'
              )}
            </p>
          </div>
        </div>

        {/* User Stats */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Je Podcast Statistieken
              {isAdmin && (
                <span className="text-xs bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                  👑 Admin
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userStats.totalPodcasts}</div>
                <div className="text-sm text-muted-foreground">Totaal</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userStats.thisMonth}</div>
                <div className="text-sm text-muted-foreground">Deze maand</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userStats.thisWeek}</div>
                <div className="text-sm text-muted-foreground">Deze week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{userStats.today}</div>
                <div className="text-sm text-muted-foreground">Vandaag</div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {isAdmin ? (
                  '👑 Als admin heb je geen dagelijkse limiet voor podcasts!'
                ) : (
                  '💡 Je kunt 1 podcast per dag genereren. Gebruik je dagelijkse podcast slim!'
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Podcast Form */}
        {!generatedScript && (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Maak je Podcast
                {isAdmin && (
                  <span className="text-xs bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                    👑 Admin
                  </span>
                )}
              </CardTitle>
              <CardDescription>
                Vul de details in om je persoonlijke podcast te genereren
                {isAdmin && (
                  <span className="block mt-1 text-yellow-600 dark:text-yellow-400">
                    👑 Als admin kun je onbeperkt podcasts genereren
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Event Selection */}
              <div className="space-y-2">
                <Label htmlFor="event">Gebeurtenis</Label>
                <Select value={selectedEvent} onValueChange={handleEventChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer een gebeurtenis" />
                  </SelectTrigger>
                  <SelectContent>
                    {EVENT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedEvent === 'overig' && (
                  <Input
                    placeholder="Beschrijf je eigen gebeurtenis..."
                    value={customEvent}
                    onChange={(e) => setCustomEvent(e.target.value)}
                    className="mt-2"
                  />
                )}
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <Label htmlFor="name">Naam</Label>
                <Input
                  id="name"
                  placeholder="Voor wie is deze podcast?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Historical Data Info - Hidden for Surprise */}
              <div className="space-y-2">
                <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                      Historische data wordt automatisch verwerkt voor je podcast
                    </span>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGeneratePodcast}
                disabled={generating || !selectedEvent || !name.trim()}
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white"
              >
                {generating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    {isAdmin ? '👑 Podcast Genereren... (Admin)' : 'Podcast Genereren...'}
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    {isAdmin ? '👑 Genereer Podcast (Admin)' : 'Genereer Podcast'}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Generated Podcast */}
        {generatedScript && (
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Podcast Gereed!
                {isAdmin && (
                  <span className="text-xs bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                    👑 Admin
                  </span>
                )}
              </CardTitle>
              <CardDescription>
                Je persoonlijke podcast is succesvol gegenereerd met 2 Nederlandse stemmen!
                {isAdmin && (
                  <span className="block mt-1 text-yellow-600 dark:text-yellow-400">
                    👑 Admin: Je kunt direct een nieuwe podcast genereren
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Script Display */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileAudio className="h-5 w-5 text-primary" />
                  <span className="font-medium">Podcast Script (Dialoog)</span>
                  <span className="text-sm text-muted-foreground">({generatedScript.duration})</span>
                </div>
                
                {/* Show the actual script content since it's now a dialogue */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-lg border border-blue-200 dark:border-blue-800 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-blue-700 dark:text-blue-300 font-mono">
                    {generatedScript.content}
                  </pre>
                </div>
                
                {/* Gemini TTS Status */}
                {generatedScript.audioUrl ? (
                  <div className="p-3 bg-green-50 dark:bg-green-950/50 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-700 dark:text-green-300">
                        <strong>✅ Gemini TTS Audio beschikbaar!</strong> Je podcast is gegenereerd met 2 Nederlandse stemmen (Marieke & Thomas).
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-700 dark:text-blue-300">
                        <strong>💡 Browser Text-to-Speech:</strong> Gebruik de "Luister naar Podcast" knop om je script voor te laten lezen door een Nederlandse stem!
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {!isPlaying ? (
                  <Button
                    onClick={handlePlayPodcast}
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    {generatedScript.audioUrl ? 'Luister naar Gemini TTS Podcast' : 'Luister naar Podcast (Browser TTS)'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleStopPodcast}
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white"
                  >
                    <Square className="h-5 w-5 mr-2" />
                    Stop Podcast
                  </Button>
                )}
                
                <Button
                  onClick={handleDownloadPodcast}
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary/20 hover:border-primary/40"
                >
                  <Download className="h-5 w-5 mr-2" />
                  {generatedScript.audioUrl ? 'Download Gemini TTS Audio' : 'Download Script'}
                </Button>
              </div>

              {/* Generate New Button */}
              <div className="pt-4 border-t">
                <Button
                  onClick={() => {
                    setGeneratedScript(null);
                    setSelectedEvent('');
                    setCustomEvent('');
                    setName('');
                  }}
                  variant="outline"
                  className="w-full"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isAdmin ? '👑 Nieuwe Podcast Maken (Admin)' : 'Nieuwe Podcast Maken'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer Info */}
        <div className="text-center text-muted-foreground text-sm">
          <p>🎧 Genereer unieke, persoonlijke podcasts met AI en 2 Nederlandse stemmen</p>
          <p className="mt-1">Elke podcast is een dialoog tussen Marieke (enthousiast) en Thomas (moe) - laat je verrassen!</p>
          {isAdmin && (
            <p className="mt-2 text-yellow-600 dark:text-yellow-400 font-medium">
              👑 Admin: Geen dagelijkse limiet - geniet van onbeperkte podcast creatie!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
