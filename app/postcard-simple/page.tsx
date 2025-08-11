"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, Download, Eye, FileText, ImageIcon, Check, ChevronLeft, ChevronRight, RefreshCw, Heart, Printer } from "lucide-react";
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

function PostcardSimpleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const [postcardData, setPostcardData] = useState<PostcardData | null>(null);
  const [senderName, setSenderName] = useState('');
  const [generatingContent, setGeneratingContent] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [availablePostcards, setAvailablePostcards] = useState<PostcardImage[]>([]);
  const [selectedPostcard, setSelectedPostcard] = useState<PostcardImage | null>(null);
  const [loadingPostcards, setLoadingPostcards] = useState(true);
  const [currentPostcardIndex, setCurrentPostcardIndex] = useState(0);
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
        try {
          const storedData = localStorage.getItem('postcardData');
          if (storedData) {
            selectedData = JSON.parse(storedData);
            localStorage.removeItem('postcardData');
          }
        } catch (storageError) {
          console.error('Error reading from localStorage:', storageError);
        }
      } else if (dataParam) {
        try {
          selectedData = JSON.parse(decodeURIComponent(dataParam));
        } catch (parseError) {
          console.error('Error parsing data parameter:', parseError);
          selectedData = {};
        }
      }
      
      setPostcardData({
        date: dateParam,
        selectedData: selectedData || {},
        allData: selectedData || {}
      });
    } catch (error) {
      console.error('Error setting up postcard data:', error);
      setPostcardData({
        date: dateParam,
        selectedData: {},
        allData: {}
      });
    }
  }, [searchParams, toast]);

  // Load available postcards
  const loadPostcards = async () => {
    setLoadingPostcards(true);
    try {
      const response = await fetch('/.netlify/functions/postcards');
      if (!response.ok) {
        throw new Error('Failed to load postcards');
      }
      const data = await response.json();
      
      // Ensure postcards is an array and handle undefined/null cases
      const postcards = data?.postcards || [];
      setAvailablePostcards(postcards);
      
      if (postcards.length > 0) {
        setSelectedPostcard(postcards[0]);
        setCurrentPostcardIndex(0);
      } else {
        setSelectedPostcard(null);
        setCurrentPostcardIndex(0);
      }
    } catch (error) {
      console.error('Error loading postcards:', error);
      setAvailablePostcards([]);
      setSelectedPostcard(null);
      setCurrentPostcardIndex(0);
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
      const response = await fetch('/.netlify/functions/generate-postcard-summary', {
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
    if (!availablePostcards || availablePostcards.length === 0) return;
    
    let newIndex = currentPostcardIndex;
    if (direction === 'prev') {
      newIndex = currentPostcardIndex > 0 ? currentPostcardIndex - 1 : availablePostcards.length - 1;
    } else {
      newIndex = currentPostcardIndex < availablePostcards.length - 1 ? currentPostcardIndex + 1 : 0;
    }
    
    setCurrentPostcardIndex(newIndex);
    setSelectedPostcard(availablePostcards[newIndex]);
  };

  const generatePdfContent = () => {
    if (!postcardData || !selectedPostcard || !availablePostcards || availablePostcards.length === 0) return null;

    const dateFormatted = formatDate(postcardData.date);
    const postcardImageUrl = `${window.location.origin}${selectedPostcard.url}`;
    
    let content = generatedContent;
    if (content) {
      // Fix newlines and format content properly
      content = content.replace(/\\n/g, '\n'); // Convert escaped newlines to actual newlines
      content = content.replace(/HoeWasHetOokAlweer\.nl/g, '<a href="https://hoewashetookalweer.nl" style="color: #2196f3; text-decoration: none; font-weight: bold;">HoeWasHetOokAlweer.nl</a>');
      
      if (senderName.trim()) {
        content += `\n\nMet vriendelijke groetjes van ${senderName.trim()}`;
      }
      
      // Convert newlines to HTML line breaks for proper PDF rendering
      content = content.replace(/\n/g, '<br/>');
    }
    
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
        .postcard-section { padding: 24px; text-align: center; background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%); display: flex; justify-content: center; align-items: center; }
        .postcard-image { max-width: 400px; width: 80%; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.15); margin: 0 auto; display: block; }
        .content-section { padding: 24px; }
        .content-text { line-height: 1.8; color: #444; font-size: 16px; margin: 16px 0; text-align: left; }
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

  const handlePdfAction = async (action: 'print' | 'download' | 'preview') => {
    if (!postcardData || !selectedPostcard || !generatedContent || !availablePostcards || availablePostcards.length === 0) {
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
      const jsPDF = (await import('jspdf')).default;
      const html2canvas = (await import('html2canvas')).default;

      const pdfContent = generatePdfContent();
      if (!pdfContent) return;

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = pdfContent.htmlBody;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '800px';
      tempDiv.style.backgroundColor = 'white';
      document.body.appendChild(tempDiv);

      await new Promise(resolve => setTimeout(resolve, 1000));

      const canvas = await html2canvas(tempDiv, {
        width: 800,
        height: 1000,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 15000
      });

      document.body.removeChild(tempDiv);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      
      const filename = `Postcard-${pdfContent.dateFormatted.replace(/\s+/g, '-')}.pdf`;
      
      switch (action) {
        case 'download':
          pdf.save(filename);
          toast({
            title: "📄 PDF gedownload!",
            description: "De postcard PDF staat in je Downloads folder.",
          });
          break;
          
        case 'print':
          // Open print dialog directly without showing PDF first
          const blob = pdf.output('blob');
          const url = URL.createObjectURL(blob);
          const printWindow = window.open(url, '_blank', 'width=800,height=600');
          if (printWindow) {
            printWindow.onload = () => {
              // Auto-trigger print dialog
              setTimeout(() => {
                printWindow.print();
                // Close after printing (user can cancel if needed)
                printWindow.onafterprint = () => {
                  printWindow.close();
                  URL.revokeObjectURL(url);
                };
                // Fallback cleanup after 30 seconds
                setTimeout(() => {
                  if (!printWindow.closed) {
                    printWindow.close();
                    URL.revokeObjectURL(url);
                  }
                }, 30000);
              }, 500);
            };
          }
          toast({
            title: "🖨️ Print dialoog geopend!",
            description: "Je postcard wordt direct naar de printer gestuurd.",
          });
          break;
          
        case 'preview':
          // Just show PDF for viewing/sharing, no auto-print
          const previewBlob = pdf.output('blob');
          const previewUrl = URL.createObjectURL(previewBlob);
          const previewWindow = window.open(previewUrl, '_blank');
          toast({
            title: "👀 PDF preview geopend!",
            description: "Bekijk je postcard. Je kunt deze opslaan of handmatig printen.",
          });
          // Cleanup after some time (user might keep it open)
          setTimeout(() => {
            URL.revokeObjectURL(previewUrl);
          }, 300000); // 5 minutes
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

  if (!postcardData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Postcard wordt voorbereid...</p>
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
            <h1 className="text-2xl font-bold">📮 Postcard Maker</h1>
            <p className="text-muted-foreground">Datum: {formatDate(postcardData.date)}</p>
          </div>
        </div>

        {/* Postcard Image Selector */}
        <Card className="overflow-hidden border-2 border-gradient-to-r from-blue-200 to-orange-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-950 dark:to-orange-950">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <ImageIcon className="h-5 w-5 mr-2 text-primary" />
                🎨 Kies je postcard afbeelding
              </CardTitle>

            </div>
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
              </div>
            ) : (
              <>
                <div className="relative bg-gradient-to-br from-blue-50/50 to-orange-50/50 dark:from-blue-950/50 dark:to-orange-950/50 p-6 rounded-xl">
                  <div className="flex items-center justify-center space-x-6">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigatePostcard('prev')}
                      disabled={!availablePostcards || availablePostcards.length <= 1}
                      className="h-12 w-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 shadow-lg"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    
                    <div className="flex-1 max-w-md">
                      <div className="relative aspect-[3/4] bg-white dark:bg-gray-900 rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                        {availablePostcards && availablePostcards[currentPostcardIndex] && (
                          <Image
                            src={availablePostcards[currentPostcardIndex].url}
                            alt={availablePostcards[currentPostcardIndex].name}
                            fill
                            className="object-cover transition-all duration-300 hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 400px"
                          />
                        )}
                        {selectedPostcard?.url === availablePostcards?.[currentPostcardIndex]?.url && (
                          <div className="absolute top-3 right-3 bg-green-500 text-white p-2 rounded-full shadow-lg animate-pulse">
                            <Check className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      <div className="text-center mt-4 space-y-1">
                        <p className="font-semibold text-lg">Postcard {availablePostcards ? currentPostcardIndex + 1 : 0}</p>
                        <div className="flex items-center justify-center space-x-2">
                          <div className="flex space-x-1">
                            {availablePostcards && Array.from({ length: availablePostcards.length }, (_, i) => (
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
                            {availablePostcards ? currentPostcardIndex + 1 : 0} van {availablePostcards ? availablePostcards.length : 0}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigatePostcard('next')}
                      disabled={!availablePostcards || availablePostcards.length <= 1}
                      className="h-12 w-12 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 shadow-lg"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Sender Name Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Afzender (optioneel)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="senderName">Je naam voor in de groetjes (laat leeg voor geen persoonlijke groet)</Label>
              <Input
                id="senderName"
                type="text"
                placeholder="bijv. Jan, Familie de Vries, etc."
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Generated Content Preview */}
        {generatedContent && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                ✨ Postkaart inhoud
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <div className="whitespace-pre-line text-sm">
                  {generatedContent?.replace(/\\n/g, '\n')}
                  {senderName.trim() && (
                    <div className="mt-4 pt-4 border-t border-muted-foreground/20">
                      <em>Met vriendelijke groetjes van {senderName.trim()}</em>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {generatingContent && (
          <Card>
            <CardContent className="p-6 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Postkaart inhoud wordt gegenereerd...</p>
            </CardContent>
          </Card>
        )}

        {/* PDF Action Buttons */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Button 
              onClick={() => handlePdfAction('preview')}
              variant="outline"
              className="h-16 border-blue-200 hover:border-blue-400 hover:bg-blue-50 flex-col"
              disabled={generatingPdf || !selectedPostcard || !generatedContent || !availablePostcards || availablePostcards.length === 0}
            >
              {generatingPdf && pdfAction === 'preview' ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Eye className="h-5 w-5 mb-1" />
                  <span className="text-xs">Preview</span>
                </>
              )}
            </Button>

            <Button 
              onClick={() => handlePdfAction('download')}
              variant="outline"
              className="h-16 border-green-200 hover:border-green-400 hover:bg-green-50 flex-col"
              disabled={generatingPdf || !selectedPostcard || !generatedContent || !availablePostcards || availablePostcards.length === 0}
            >
              {generatingPdf && pdfAction === 'download' ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Download className="h-5 w-5 mb-1" />
                  <span className="text-xs">Download</span>
                </>
              )}
            </Button>

            <Button 
              onClick={() => handlePdfAction('print')}
              variant="outline"
              className="h-16 border-purple-200 hover:border-purple-400 hover:bg-purple-50 flex-col"
              disabled={generatingPdf || !selectedPostcard || !generatedContent || !availablePostcards || availablePostcards.length === 0}
            >
              {generatingPdf && pdfAction === 'print' ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Printer className="h-5 w-5 mb-1" />
                  <span className="text-xs">Print</span>
                </>
              )}
            </Button>
          </div>
        </div>

        <Alert>
          <AlertDescription>
            <strong>📄 PDF Opties:</strong><br/>
            • <strong>👀 Preview:</strong> Bekijk PDF in browser - kun je handmatig opslaan/printen<br/>
            • <strong>📥 Download:</strong> Download PDF direct naar je Downloads folder<br/>
            • <strong>🖨️ Print:</strong> Open print dialoog automatisch - klaar om te printen<br/>
            <span className="text-muted-foreground">
              <strong>Let op:</strong> URLs in de PDF zijn klikbaar! Perfect voor delen als digitale postcard.
            </span>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

export default function PostcardSimplePage() {
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
      <PostcardSimpleContent />
    </Suspense>
  );
}
