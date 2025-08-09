"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, Mail, Sparkles, FileText, Image as ImageIcon, Check, ChevronLeft, ChevronRight, RefreshCw, Heart, Eye, Copy, Download } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { useToast } from "@/hooks/use-toast";

interface PostcardData {
  date: string;
  selectedData: any;
  allData: any;
}

interface PostcardImage {
  filename: string;
  name: string;
  url: string;
}

function PostcardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [postcardData, setPostcardData] = useState<PostcardData | null>(null);
  const [senderName, setSenderName] = useState('');
  const [generatingContent, setGeneratingContent] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [availablePostcards, setAvailablePostcards] = useState<PostcardImage[]>([]);
  const [selectedPostcard, setSelectedPostcard] = useState<PostcardImage | null>(null);
  const [loadingPostcards, setLoadingPostcards] = useState(true);
  const [currentPostcardIndex, setCurrentPostcardIndex] = useState(0);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [pdfAction, setPdfAction] = useState<'print' | 'download' | 'preview' | null>(null);

  useEffect(() => {
    // Get data from URL parameters
    const dateParam = searchParams.get('date');
    const dataParam = searchParams.get('data');
    const useStorage = searchParams.get('useStorage') === 'true';
    
    if (!dateParam) {
      toast({
        title: "Geen datum gevonden",
        description: "Ga terug en selecteer een datum.",
        variant: "destructive"
      });
      return;
    }

    try {
      let selectedData = null;
      
      if (useStorage) {
        // Try to get data from localStorage
        try {
          const storedData = localStorage.getItem('postcardData');
          if (storedData) {
            selectedData = JSON.parse(storedData);
            // Clean up localStorage after use
            localStorage.removeItem('postcardData');
          }
        } catch (storageError) {
          console.error('Error reading from localStorage:', storageError);
        }
      } else if (dataParam) {
        // Try to get data from URL parameter
        try {
          selectedData = JSON.parse(decodeURIComponent(dataParam));
        } catch (parseError) {
          console.error('Error parsing data parameter:', parseError);
          // Continue without data instead of failing
          selectedData = {};
          toast({
            title: "Data waarschuwing",
            description: "Sommige data kon niet worden geladen, maar je kunt nog steeds een postcard maken.",
            variant: "default"
          });
        }
      }
      
      setPostcardData({
        date: dateParam,
        selectedData: selectedData || {},
        allData: selectedData || {} // Voor nu hetzelfde, later kunnen we meer data meegeven
      });
    } catch (error) {
      console.error('Error setting up postcard data:', error);
      // Fallback: continue with minimal data
      setPostcardData({
        date: dateParam,
        selectedData: {},
        allData: {}
      });
      toast({
        title: "Data waarschuwing",
        description: "Postcard kan worden gemaakt zonder historische data.",
        variant: "default"
      });
    }
  }, [searchParams, toast]);

  // Load available postcards
  const loadPostcards = async () => {
    setLoadingPostcards(true);
    try {
      const response = await fetch('/api/postcards');
      if (!response.ok) {
        throw new Error('Failed to load postcards');
      }
      const data = await response.json();
      setAvailablePostcards(data.postcards);
      if (data.postcards.length > 0) {
        setSelectedPostcard(data.postcards[0]); // Select first postcard by default
        setCurrentPostcardIndex(0);
        toast({
          title: "Postcards geladen!",
          description: `${data.postcards.length} postcards beschikbaar. Eerste is automatisch geselecteerd.`,
        });
      }
    } catch (error) {
      console.error('Error loading postcards:', error);
      toast({
        title: "Afbeeldingen laden mislukt",
        description: "Er zijn geen postcard afbeeldingen beschikbaar.",
        variant: "destructive"
      });
    } finally {
      setLoadingPostcards(false);
    }
  };

  useEffect(() => {
    loadPostcards();
  }, [toast]);

  // Auto-generate content when postcard data is available
  useEffect(() => {
    if (postcardData && !generatedContent) {
      generateContent();
    }
  }, [postcardData]);

  const generateContent = async () => {
    if (!postcardData) return;

    setGeneratingContent(true);
    try {
      const response = await fetch('/api/generate-postcard-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: postcardData.date,
          data: postcardData.selectedData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const result = await response.json();
      setGeneratedContent(result.summary);
    } catch (error) {
      console.error('Error generating content:', error);
      // Fallback content
      const dateFormatted = formatDate(postcardData.date);
      setGeneratedContent(`Op ${dateFormatted} was het een bijzondere dag!\n\nOntdek meer interessante feiten op HoeWasHetOokAlweer.nl`);
    } finally {
      setGeneratingContent(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'd MMMM yyyy', { locale: nl });
    } catch {
      return dateString;
    }
  };

  const navigatePostcard = (direction: 'prev' | 'next') => {
    if (availablePostcards.length === 0) return;
    
    let newIndex = currentPostcardIndex;
    if (direction === 'prev') {
      newIndex = currentPostcardIndex > 0 ? currentPostcardIndex - 1 : availablePostcards.length - 1;
    } else {
      newIndex = currentPostcardIndex < availablePostcards.length - 1 ? currentPostcardIndex + 1 : 0;
    }
    
    setCurrentPostcardIndex(newIndex);
    // Automatisch selecteren bij navigatie
    setSelectedPostcard(availablePostcards[newIndex]);
  };

  const selectCurrentPostcard = () => {
    if (availablePostcards[currentPostcardIndex]) {
      setSelectedPostcard(availablePostcards[currentPostcardIndex]);
      toast({
        title: "Postcard geselecteerd",
        description: `Je hebt "${availablePostcards[currentPostcardIndex].name}" geselecteerd.`,
      });
    }
  };

  const generateAISummary = async () => {
    if (!postcardData) return;

    setGeneratingAI(true);
    try {
      const response = await fetch('/api/generate-postcard-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: postcardData.date,
          data: postcardData.selectedData
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const result = await response.json();
      setAiSummary(result.summary);
    } catch (error) {
      console.error('Error generating AI summary:', error);
      toast({
        title: "AI fout",
        description: "Er is een fout opgetreden bij het genereren van de samenvatting.",
        variant: "destructive"
      });
    } finally {
      setGeneratingAI(false);
    }
  };

  const generatePdfContent = () => {
    if (!postcardData || !selectedPostcard) return null;

    const dateFormatted = formatDate(postcardData.date);
    const postcardImageUrl = `${window.location.origin}${selectedPostcard.url}`;
    
    // Format content with hyperlink and optional sender
    let content = generatedContent;
    if (content) {
      // Replace HoeWasHetOokAlweer.nl with hyperlink
      content = content.replace(/HoeWasHetOokAlweer\.nl/g, '<a href="https://hoewashetookalweer.nl" style="color: #2196f3; text-decoration: none;">HoeWasHetOokAlweer.nl</a>');
      
      // Add sender name if provided
      if (senderName.trim()) {
        content += `\n\nMet vriendelijke groetjes van ${senderName.trim()}`;
      }
    }
    
    // Create PDF HTML template
    const htmlBody = `<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Postcard ${dateFormatted}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #e3f2fd 0%, #fff3e0 100%); }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(45deg, #2196f3, #ff9800); color: white; padding: 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .header p { margin: 8px 0 0 0; opacity: 0.9; }
        .postcard-section { padding: 24px; text-align: center; background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%); }
        .postcard-image { max-width: 300px; width: 100%; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.15); margin: 16px 0; }
        .content-section { padding: 24px; }
        .content-text { line-height: 1.6; color: #444; font-size: 16px; margin: 16px 0; white-space: pre-line; }
        .footer { background: #f5f5f5; padding: 20px; text-align: center; color: #666; }
        .footer a { color: #2196f3; text-decoration: none; }
        .divider { height: 2px; background: linear-gradient(45deg, #2196f3, #ff9800); margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📮 HoeWasHetOokAlweer.nl</h1>
            <p>${dateFormatted}</p>
        </div>
        
        <div class="postcard-section">
            <img src="${postcardImageUrl}" alt="Postcard" class="postcard-image" />
        </div>
        
        <div class="content-section">
            <div class="divider"></div>
            <div class="content-text">${content}</div>
        </div>
    </div>
</body>
</html>`;

    return { htmlBody, postcardImageUrl, dateFormatted };
  };

  const copyHtmlToClipboard = async () => {
    const emailContent = generateEmailContent();
    if (!emailContent) return;

    try {
      await navigator.clipboard.writeText(emailContent.htmlBody);
      toast({
        title: "HTML gekopieerd!",
        description: "De HTML email code is gekopieerd naar je klembord.",
      });
    } catch (error) {
      toast({
        title: "Kopiëren mislukt",
        description: "Kon de HTML niet kopiëren naar het klembord.",
        variant: "destructive"
      });
    }
  };

  const handlePdfAction = async (action: 'print' | 'download' | 'preview') => {
    if (!postcardData || !selectedPostcard || !generatedContent) {
      toast({
        title: "Niet gereed",
        description: "Selecteer een postcard en wacht tot de content is geladen.",
        variant: "destructive"
      });
      return;
    }

    setPdfAction(action);
    setGeneratingPdf(true);
    
    try {
      // Dynamically import the libraries (for client-side only)
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;

      const pdfContent = generatePdfContent();
      if (!pdfContent) return;

      // Create a temporary div with the HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = pdfContent.htmlBody;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '800px';
      tempDiv.style.backgroundColor = 'white';
      document.body.appendChild(tempDiv);

      // Wait a bit for images to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Convert HTML to canvas
      const canvas = await html2canvas(tempDiv, {
        width: 800,
        height: 1000,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          // Ensure all images are visible in cloned document
          const images = clonedDoc.getElementsByTagName('img');
          for (let img of images) {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
          }
        }
      });

      // Remove temporary div
      document.body.removeChild(tempDiv);

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Generate filename with date
      const filename = `Postcard-${pdfContent.dateFormatted.replace(/\s+/g, '-')}.pdf`;
      
      // Handle different actions
      switch (action) {
        case 'download':
          pdf.save(filename);
          toast({
            title: "PDF gedownload! 📄",
            description: "De postcard PDF staat in je Downloads folder.",
          });
          break;
          
        case 'print':
          // Create blob URL and open print dialog
          const blob = pdf.output('blob');
          const url = URL.createObjectURL(blob);
          const printWindow = window.open(url);
          if (printWindow) {
            printWindow.onload = () => {
              printWindow.print();
              setTimeout(() => {
                printWindow.close();
                URL.revokeObjectURL(url);
              }, 1000);
            };
          }
          toast({
            title: "PDF print dialoog geopend! 🖨️",
            description: "Je kunt nu je postcard printen.",
          });
          break;
          
        case 'preview':
          // Create blob URL and show in new tab
          const previewBlob = pdf.output('blob');
          const previewUrl = URL.createObjectURL(previewBlob);
          window.open(previewUrl, '_blank');
          toast({
            title: "PDF preview geopend! 👀",
            description: "Bekijk je postcard in een nieuw tabblad.",
          });
          break;
      }

    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "PDF generatie mislukt",
        description: "Er is een fout opgetreden bij het maken van de PDF.",
        variant: "destructive"
      });
    } finally {
      setGeneratingPdf(false);
      setPdfAction(null);
    }
  };

  const createEmail = () => {
    if (!postcardData || !email) {
      toast({
        title: "Vereiste velden",
        description: "Vul een e-mailadres in.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedPostcard) {
      toast({
        title: "Geen postcard geselecteerd",
        description: "Selecteer eerst een postcard afbeelding.",
        variant: "destructive"
      });
      return;
    }

    const dateFormatted = formatDate(postcardData.date);
    const content = contentType === 'ai' ? aiSummary : customText;
    
    if (!content.trim()) {
      toast({
        title: "Geen inhoud",
        description: contentType === 'ai' ? "Genereer eerst een AI samenvatting." : "Voer tekst in.",
        variant: "destructive"
      });
      return;
    }

    // Create email with fixed title format
    const subject = `Hoe Was Het Ook Alweer . nl  ${dateFormatted}`;
    const postcardNumber = availablePostcards.findIndex(p => p.url === selectedPostcard.url) + 1;
    const postcardImageUrl = `${window.location.origin}${selectedPostcard.url}`;
    
    // Create HTML email template
    const htmlBody = `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Postcard van HoeWasHetOokAlweer.nl</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #e3f2fd 0%, #fff3e0 100%); }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(45deg, #2196f3, #ff9800); color: white; padding: 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .header p { margin: 8px 0 0 0; opacity: 0.9; }
        .postcard-section { padding: 24px; text-align: center; background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%); }
        .postcard-image { max-width: 300px; width: 100%; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.15); margin: 16px 0; }
        .postcard-title { font-size: 18px; font-weight: bold; color: #333; margin: 16px 0 8px 0; }
        .content-section { padding: 24px; }
        .content-text { line-height: 1.6; color: #444; font-size: 16px; margin: 16px 0; }
        .footer { background: #f5f5f5; padding: 20px; text-align: center; color: #666; }
        .footer a { color: #2196f3; text-decoration: none; }
        .divider { height: 2px; background: linear-gradient(45deg, #2196f3, #ff9800); margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📮 Postcard van HoeWasHetOokAlweer.nl</h1>
            <p>${dateFormatted}</p>
        </div>
        
        <div class="postcard-section">
            <div class="postcard-title">🎨 Postcard ${postcardNumber}</div>
            <img src="${postcardImageUrl}" alt="Postcard ${postcardNumber}" class="postcard-image" />
        </div>
        
        <div class="content-section">
            <div class="divider"></div>
            <div class="content-text">
                ${content.split('\n').map(line => `<p>${line || '<br/>'}</p>`).join('')}
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Met vriendelijke groet,</strong><br/>
            Het team van HoeWasHetOokAlweer.nl</p>
            <p><a href="https://hoewashetookalweer.nl">🔍 Ontdek meer historische data</a></p>
        </div>
    </div>
</body>
</html>`;

    // Create fallback plain text version
    const plainTextBody = `Hoi!

🖼️ Postcard ${postcardNumber}
Bekijk de afbeelding: ${postcardImageUrl}

${content}

---
Met vriendelijke groet,
HoeWasHetOokAlweer.nl

P.S. Ontdek meer over andere data op: https://hoewashetookalweer.nl`;

    const emailContent = generateEmailContent();
    if (!emailContent) return;

    // Create mailto link with plain text (most compatible)
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(emailContent.subject)}&body=${encodeURIComponent(emailContent.plainTextBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    toast({
      title: "E-mail geopend",
      description: "Voor HTML versie, gebruik de 'Kopieer HTML' knop hieronder.",
    });
  };

  if (!postcardData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Postkaart wordt voorbereid...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Terug
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Postkaart maken</h1>
            <p className="text-muted-foreground">Datum: {formatDate(postcardData.date)}</p>
          </div>
        </div>

        {/* Preview Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ImageIcon className="h-5 w-5 mr-2" />
              Postkaart voorbeeld
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-orange-50 dark:from-blue-950 dark:to-orange-950 p-6 rounded-lg border-2 border-dashed border-muted-foreground/20">
              <div className="text-center space-y-2">
                <h3 className="font-bold text-lg">Hoe was het ook alweer op</h3>
                <h2 className="text-2xl font-bold text-primary">{formatDate(postcardData.date)}</h2>
                {postcardData.selectedData && (
                  <div className="text-sm text-muted-foreground mt-4">
                    {Object.keys(postcardData.selectedData).length} categorie(ën) met data beschikbaar
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Postcard Image Selector */}
        <Card className="overflow-hidden border-2 border-gradient-to-r from-blue-200 to-orange-200 dark:from-blue-800 dark:to-orange-800">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-950 dark:to-orange-950">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <ImageIcon className="h-5 w-5 mr-2 text-primary" />
                🎨 Kies je postcard afbeelding
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={loadPostcards}
                disabled={loadingPostcards}
                className="border-primary/30 hover:border-primary/60"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loadingPostcards ? 'animate-spin' : ''}`} />
                Nieuwe selectie
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Kies uit 10 willekeurig geselecteerde postcard designs
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {loadingPostcards ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Afbeeldingen laden...</span>
              </div>
            ) : availablePostcards.length === 0 ? (
              <div className="text-center p-8 text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Geen postcard afbeeldingen beschikbaar</p>
                <p className="text-sm">Plaats afbeeldingen in de public/postcards folder</p>
              </div>
            ) : (
              <>
                {/* Image Carousel */}
                <div className="relative bg-gradient-to-br from-blue-50/50 to-orange-50/50 dark:from-blue-950/50 dark:to-orange-950/50 p-6 rounded-xl">
                  <div className="flex items-center justify-center space-x-6">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigatePostcard('prev')}
                      disabled={availablePostcards.length <= 1}
                      className="h-12 w-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 shadow-lg"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    
                    <div className="flex-1 max-w-md">
                      <div className="relative aspect-[3/4] bg-white dark:bg-gray-900 rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                        {availablePostcards[currentPostcardIndex] && (
                          <Image
                            src={availablePostcards[currentPostcardIndex].url}
                            alt={availablePostcards[currentPostcardIndex].name}
                            fill
                            className="object-cover transition-all duration-300 hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                        )}
                        {selectedPostcard?.url === availablePostcards[currentPostcardIndex]?.url && (
                          <div className="absolute top-3 right-3 bg-green-500 text-white p-2 rounded-full shadow-lg animate-pulse">
                            <Check className="h-5 w-5" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                      </div>
                      <div className="text-center mt-4 space-y-1">
                        <p className="font-semibold text-lg">Postcard {currentPostcardIndex + 1}</p>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="flex space-x-1">
                            {Array.from({ length: availablePostcards.length }, (_, i) => (
                              <div
                                key={i}
                                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                                  i === currentPostcardIndex 
                                    ? 'bg-primary scale-125' 
                                    : 'bg-muted-foreground/30'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground ml-2">
                            {currentPostcardIndex + 1} van {availablePostcards.length}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigatePostcard('next')}
                      disabled={availablePostcards.length <= 1}
                      className="h-12 w-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 shadow-lg"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Select Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={selectCurrentPostcard}
                    variant={selectedPostcard?.url === availablePostcards[currentPostcardIndex]?.url ? "default" : "outline"}
                    className={`min-w-40 h-12 rounded-full font-semibold transition-all duration-200 ${
                      selectedPostcard?.url === availablePostcards[currentPostcardIndex]?.url 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg scale-105' 
                        : 'border-primary/30 hover:border-primary/60 hover:bg-primary/5'
                    }`}
                  >
                    {selectedPostcard?.url === availablePostcards[currentPostcardIndex]?.url ? (
                      <>
                        <Heart className="h-4 w-4 mr-2 animate-pulse" />
                        Geselecteerd!
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Selecteer deze
                      </>
                    )}
                  </Button>
                </div>

                {/* Selected Postcard Preview */}
                {selectedPostcard && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-xl border-2 border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-2 mb-3">
                      <Heart className="h-5 w-5 text-green-600 animate-pulse" />
                      <h4 className="font-semibold text-green-700 dark:text-green-300">Jouw gekozen postcard:</h4>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="relative w-20 h-24 bg-white dark:bg-gray-900 rounded-lg overflow-hidden border-2 border-white dark:border-gray-800 shadow-lg">
                        <Image
                          src={selectedPostcard.url}
                          alt={selectedPostcard.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-green-800 dark:text-green-200">
                          Postcard {availablePostcards.findIndex(p => p.url === selectedPostcard.url) + 1}
                        </span>
                        <p className="text-sm text-green-600 dark:text-green-400">Deze prachtige postcard wordt toegevoegd aan je e-mail! ✨</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Email Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              E-mailadres
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="email">Naar welk e-mailadres wil je de postkaart sturen?</Label>
              <Input
                id="email"
                type="email"
                placeholder="bijvoorbeeld@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Content Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Postkaart inhoud</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={contentType} onValueChange={(value: 'ai' | 'custom') => setContentType(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ai" id="ai" />
                <Label htmlFor="ai" className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Door AI samengestelde samenvatting
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Eigen tekst
                </Label>
              </div>
            </RadioGroup>

            {contentType === 'ai' && (
              <div className="space-y-4">
                <Button 
                  onClick={generateAISummary} 
                  disabled={generatingAI}
                  className="w-full"
                >
                  {generatingAI ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      AI samenvatting genereren...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Genereer AI samenvatting
                    </>
                  )}
                </Button>
                
                {aiSummary && (
                  <div className="space-y-2">
                    <Label>Gegenereerde samenvatting:</Label>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm">{aiSummary}</pre>
                    </div>
                  </div>
                )}
              </div>
            )}

            {contentType === 'custom' && (
              <div className="space-y-2">
                <Label htmlFor="customText">Schrijf je eigen postkaart tekst:</Label>
                <Textarea
                  id="customText"
                  placeholder="Beste [naam],&#10;&#10;Wist je dat op deze dag...&#10;&#10;Groetjes!"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  rows={8}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-3">
              <div className="text-xs space-y-1">
                <p>Debug Info:</p>
                <p>Email: {email ? '✅' : '❌'} ({email})</p>
                <p>Selected Postcard: {selectedPostcard ? '✅' : '❌'} ({selectedPostcard?.name || 'none'})</p>
                <p>Content Type: {contentType}</p>
                <p>AI Summary: {aiSummary ? '✅' : '❌'} ({aiSummary?.length || 0} chars)</p>
                <p>Custom Text: {customText ? '✅' : '❌'} ({customText?.length || 0} chars)</p>
                <p>Available Postcards: {availablePostcards.length}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Main Send Button */}
          <div className="flex gap-4">
            <Button 
              onClick={createEmail}
              className="flex-1 h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              size="lg"
              disabled={!email || !selectedPostcard || (contentType === 'ai' ? !aiSummary : !customText.trim())}
            >
              <Mail className="h-5 w-5 mr-3" />
              📮 Postcard versturen!
            </Button>
          </div>

          {/* Additional Options */}
          <div className="grid grid-cols-3 gap-3">
            <Button 
              onClick={() => setShowEmailPreview(!showEmailPreview)}
              variant="outline"
              className="h-12 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
              disabled={!selectedPostcard || (contentType === 'ai' ? !aiSummary : !customText.trim())}
            >
              <Eye className="h-4 w-4 mr-2" />
              {showEmailPreview ? 'Verberg' : 'Preview'}
            </Button>

            <Button 
              onClick={copyHtmlToClipboard}
              variant="outline"
              className="h-12 border-green-200 hover:border-green-400 hover:bg-green-50"
              disabled={!selectedPostcard || (contentType === 'ai' ? !aiSummary : !customText.trim())}
            >
              <Copy className="h-4 w-4 mr-2" />
              HTML
            </Button>

            <Button 
              onClick={generatePDF}
              variant="outline"
              className="h-12 border-purple-200 hover:border-purple-400 hover:bg-purple-50"
              disabled={generatingPdf || !selectedPostcard || (contentType === 'ai' ? !aiSummary : !customText.trim())}
            >
              {generatingPdf ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  PDF...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  📄 PDF
                </>
              )}
            </Button>
          </div>

          {/* Missing Requirements Warning */}
          {(!email || !selectedPostcard || (contentType === 'ai' ? !aiSummary : !customText.trim())) && (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-4">
                <div className="text-sm text-amber-800">
                  <p className="font-semibold mb-2">⚠️ Vereist om te versturen:</p>
                  <ul className="space-y-1">
                    {!email && <li>• Vul een e-mailadres in</li>}
                    {!selectedPostcard && <li>• Selecteer een postcard afbeelding</li>}
                    {contentType === 'ai' && !aiSummary && <li>• Genereer een AI samenvatting</li>}
                    {contentType === 'custom' && !customText.trim() && <li>• Schrijf een persoonlijke tekst</li>}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Email Preview */}
        {showEmailPreview && generateEmailContent() && (
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Eye className="h-5 w-5 mr-2" />
                HTML Email Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: generateEmailContent()!.htmlBody }}
              />
              <p className="text-sm text-muted-foreground mt-4">
                💡 Tip: Kopieer de HTML en plak deze in je email client voor de mooiste weergave!
              </p>
            </CardContent>
          </Card>
        )}

        <Alert>
          <AlertDescription>
            <strong>💡 Drie manieren om je postcard te delen:</strong><br/>
            • <strong>📧 Email:</strong> E-mail client opent met tekst + afbeelding URL<br/>
            • <strong>🎨 HTML:</strong> Kopieer HTML code en plak in je email client voor embedded afbeelding<br/>
            • <strong>📄 PDF:</strong> Download PDF bestand om te printen, delen of bewaren<br/>
            <span className="text-muted-foreground">PDF is perfect voor printen! HTML toont de postcard direct in email!</span>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

export default function PostcardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Postcard wordt voorbereid...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <PostcardContent />
    </Suspense>
  );
}
