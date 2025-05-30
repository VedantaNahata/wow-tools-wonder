
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Search, AlertTriangle, CheckCircle, ImageOff, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageResult {
  src: string;
  alt: string;
  status: 'good' | 'missing' | 'empty' | 'poor';
  reason?: string;
  suggestions?: string;
}

const AltTagChecker = () => {
  const [htmlCode, setHtmlCode] = useState("");
  const [results, setResults] = useState<ImageResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeAltTags = () => {
    if (!htmlCode.trim()) {
      toast({
        title: "Error",
        description: "Please paste some HTML code to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Parse HTML and extract img tags
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlCode, 'text/html');
      const images = doc.querySelectorAll('img');
      
      const imageResults: ImageResult[] = [];
      
      for (const img of Array.from(images)) {
        const src = img.getAttribute('src') || '';
        const alt = img.getAttribute('alt') || '';
        
        let status: 'good' | 'missing' | 'empty' | 'poor' = 'good';
        let reason = '';
        let suggestions = '';
        
        if (!img.hasAttribute('alt')) {
          status = 'missing';
          reason = 'No alt attribute found';
          suggestions = 'Add an alt attribute to describe the image content';
        } else if (alt === '') {
          status = 'empty';
          reason = 'Alt attribute is empty';
          suggestions = 'Add descriptive text or use alt="" for decorative images';
        } else if (alt.length < 3) {
          status = 'poor';
          reason = 'Alt text too short';
          suggestions = 'Provide more descriptive text (at least 3 characters)';
        } else if (alt.length > 125) {
          status = 'poor';
          reason = 'Alt text too long (over 125 characters)';
          suggestions = 'Keep alt text concise and under 125 characters';
        } else if (alt.toLowerCase().includes('image of') || alt.toLowerCase().includes('picture of')) {
          status = 'poor';
          reason = 'Redundant phrases detected';
          suggestions = 'Remove "image of" or "picture of" - screen readers already know it\'s an image';
        } else if (alt === src || alt.includes(src.split('/').pop()?.split('.')[0] || '')) {
          status = 'poor';
          reason = 'Alt text appears to be filename';
          suggestions = 'Use descriptive text instead of filename';
        } else {
          status = 'good';
          reason = 'Alt text looks good';
        }
        
        imageResults.push({
          src: src || '(no src)',
          alt: alt,
          status,
          reason,
          suggestions
        });
      }
      
      setResults(imageResults);
      
      const missingCount = imageResults.filter(r => r.status === 'missing').length;
      const emptyCount = imageResults.filter(r => r.status === 'empty').length;
      const poorCount = imageResults.filter(r => r.status === 'poor').length;
      
      toast({
        title: "Analysis Complete!",
        description: `Found ${imageResults.length} images. ${missingCount + emptyCount + poorCount} need attention.`,
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to parse HTML. Please check your code syntax.",
        variant: "destructive",
      });
    }
    
    setIsAnalyzing(false);
  };

  const copyResults = () => {
    const report = results.map(result => 
      `${result.status.toUpperCase()}: ${result.src}\nAlt: "${result.alt}"\nReason: ${result.reason}\nSuggestion: ${result.suggestions}\n`
    ).join('\n');
    
    navigator.clipboard.writeText(report);
    toast({
      title: "Copied!",
      description: "Alt tag analysis report copied to clipboard.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'missing': return 'bg-red-100 text-red-800 border-red-200';
      case 'empty': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'poor': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'missing':
      case 'empty':
      case 'poor':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const faqs = [
    {
      question: "What is alt text and why is it important?",
      answer: "Alt text (alternative text) describes images for screen readers and appears when images fail to load. It's crucial for web accessibility and SEO."
    },
    {
      question: "What makes good alt text?",
      answer: "Good alt text is descriptive, concise (under 125 characters), avoids redundant phrases like 'image of', and accurately describes the image content and context."
    },
    {
      question: "Should decorative images have alt text?",
      answer: "Decorative images that don't add information should have empty alt attributes (alt=\"\") to tell screen readers to skip them."
    },
    {
      question: "Does this tool check image accessibility?",
      answer: "This tool focuses on alt attribute analysis. It checks for missing, empty, or poorly written alt text but doesn't verify other accessibility aspects."
    },
    {
      question: "Can I use this for any website?",
      answer: "This tool analyzes HTML code you paste in. To check a live website, you'd need to view the page source and copy the relevant HTML sections."
    }
  ];

  return (
    <SEOWrapper
      title="Alt Tag Checker - Image Accessibility Validator"
      description="Check for missing or empty alt attributes in HTML image tags for better SEO and accessibility."
      keywords="alt tag checker, image alt text, accessibility checker, SEO image optimization"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Alt Tag Checker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check for missing or empty alt attributes in HTML image tags. Improve 
            accessibility and SEO with proper image descriptions.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>HTML Image Alt Tag Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your HTML code here..."
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  className="min-h-32 font-mono text-sm"
                />
                
                <Button 
                  onClick={analyzeAltTags} 
                  disabled={!htmlCode.trim() || isAnalyzing}
                  className="w-full"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {isAnalyzing ? "Analyzing..." : "Check Alt Tags"}
                </Button>

                {results.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <h3 className="font-semibold">Analysis Results</h3>
                        <div className="flex gap-2">
                          <Badge variant="secondary">
                            {results.length} images
                          </Badge>
                          <Badge className="bg-red-100 text-red-800">
                            {results.filter(r => r.status === 'missing').length} missing
                          </Badge>
                          <Badge className="bg-orange-100 text-orange-800">
                            {results.filter(r => r.status === 'empty').length} empty
                          </Badge>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            {results.filter(r => r.status === 'poor').length} poor
                          </Badge>
                          <Badge className="bg-green-100 text-green-800">
                            {results.filter(r => r.status === 'good').length} good
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={copyResults}>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy Report
                      </Button>
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {results.map((result, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-2">
                          <div className="flex items-start gap-3">
                            <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(result.status)}`}>
                              {getStatusIcon(result.status)}
                              {result.status}
                            </div>
                            <div className="flex-1 min-w-0">
                              <code className="text-sm bg-muted px-1 rounded block truncate">
                                {result.src}
                              </code>
                            </div>
                          </div>
                          
                          <div className="pl-6 space-y-1">
                            <div>
                              <span className="text-sm font-medium">Alt text: </span>
                              <span className="text-sm">
                                {result.alt ? `"${result.alt}"` : '(none)'}
                              </span>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Issue: </span>
                              <span className="text-sm text-muted-foreground">{result.reason}</span>
                            </div>
                            {result.suggestions && (
                              <div>
                                <span className="text-sm font-medium">Suggestion: </span>
                                <span className="text-sm text-blue-600">{result.suggestions}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <ToolFAQ toolName="Alt Tag Checker" faqs={faqs} />
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Alt Text Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                    <div>
                      <div className="font-medium">Good Alt Text</div>
                      <div className="text-muted-foreground">Descriptive, concise, contextual</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-500" />
                    <div>
                      <div className="font-medium">Avoid</div>
                      <div className="text-muted-foreground">"Image of", filenames, too long/short</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ImageOff className="h-4 w-4 mt-0.5 text-blue-500" />
                    <div>
                      <div className="font-medium">Decorative Images</div>
                      <div className="text-muted-foreground">Use empty alt="" attribute</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default AltTagChecker;
