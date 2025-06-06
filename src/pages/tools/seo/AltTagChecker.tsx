
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

interface ImageInfo {
  src: string;
  alt: string;
  status: 'good' | 'missing' | 'empty';
  line: number;
}

const AltTagChecker = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<ImageInfo[]>([]);
  const [summary, setSummary] = useState({
    total: 0,
    good: 0,
    missing: 0,
    empty: 0
  });

  const checkAltTags = () => {
    if (!input.trim()) {
      toast.error("Please enter HTML code to check");
      return;
    }

    try {
      const lines = input.split('\n');
      const images: ImageInfo[] = [];
      
      // Regular expression to find img tags
      const imgRegex = /<img[^>]*>/gi;
      const srcRegex = /src\s*=\s*["']([^"']*)["']/i;
      const altRegex = /alt\s*=\s*["']([^"']*)["']/i;

      lines.forEach((line, index) => {
        const imgMatches = line.match(imgRegex);
        
        if (imgMatches) {
          imgMatches.forEach(imgTag => {
            const srcMatch = imgTag.match(srcRegex);
            const altMatch = imgTag.match(altRegex);
            
            const src = srcMatch ? srcMatch[1] : 'Unknown';
            let alt = '';
            let status: 'good' | 'missing' | 'empty' = 'missing';

            if (altMatch) {
              alt = altMatch[1];
              status = alt.trim() ? 'good' : 'empty';
            }

            images.push({
              src,
              alt,
              status,
              line: index + 1
            });
          });
        }
      });

      setResults(images);
      
      const newSummary = {
        total: images.length,
        good: images.filter(img => img.status === 'good').length,
        missing: images.filter(img => img.status === 'missing').length,
        empty: images.filter(img => img.status === 'empty').length
      };
      
      setSummary(newSummary);
      
      if (images.length === 0) {
        toast.info("No image tags found in the HTML");
      } else {
        toast.success(`Found ${images.length} image(s). Check results below.`);
      }
    } catch (error) {
      toast.error("Error analyzing HTML code");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'missing':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'empty':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good':
        return <Badge className="bg-green-100 text-green-800">Good</Badge>;
      case 'missing':
        return <Badge className="bg-red-100 text-red-800">Missing</Badge>;
      case 'empty':
        return <Badge className="bg-yellow-100 text-yellow-800">Empty</Badge>;
      default:
        return null;
    }
  };

  const clearAll = () => {
    setInput("");
    setResults([]);
    setSummary({ total: 0, good: 0, missing: 0, empty: 0 });
  };

  const loadSample = () => {
    const sampleHtml = `<!DOCTYPE html>
<html>
<head>
    <title>Sample Page</title>
</head>
<body>
    <h1>Welcome to Our Site</h1>
    
    <!-- Good alt text -->
    <img src="logo.png" alt="Company Logo">
    
    <!-- Missing alt attribute -->
    <img src="banner.jpg">
    
    <!-- Empty alt text -->
    <img src="decorative.png" alt="">
    
    <!-- Good descriptive alt text -->
    <img src="chart.png" alt="Sales data showing 25% increase from Q1 to Q2">
    
    <!-- Another missing alt -->
    <img src="photo.jpg" class="featured">
    
</body>
</html>`;
    setInput(sampleHtml);
  };

  const faqs = [
    {
      question: "What makes a good alt text?",
      answer: "Good alt text is descriptive, concise (under 125 characters), and provides meaningful information about the image. It should describe the content and function of the image."
    },
    {
      question: "When should alt text be empty?",
      answer: "Alt text should be empty (alt='') for decorative images that don't add informational value, like ornamental graphics or spacers."
    },
    {
      question: "How does this affect SEO and accessibility?",
      answer: "Proper alt text improves accessibility for screen readers and helps search engines understand your images, potentially improving your SEO rankings."
    }
  ];

  return (
    <SEOWrapper
      title="Alt Tag Checker - Image Accessibility Validator"
      description="Check for missing or empty alt attributes in HTML image tags. Improve your website's accessibility and SEO with proper alt text validation."
      keywords="alt tag checker, image alt text, accessibility checker, SEO image optimization, html validator"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Alt Tag Checker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check for missing or empty alt attributes in HTML image tags for better accessibility and SEO.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Alt Tag Checker</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="input">HTML Code</Label>
                    <Button onClick={loadSample} variant="outline" size="sm">
                      Load Sample
                    </Button>
                  </div>
                  <Textarea
                    id="input"
                    placeholder="Paste your HTML code here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[200px] font-mono"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={checkAltTags} className="flex-1">
                    Check Alt Tags
                  </Button>
                  <Button onClick={clearAll} variant="outline">
                    Clear All
                  </Button>
                </div>

                {summary.total > 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-center">
                        <h3 className="font-semibold text-blue-700 dark:text-blue-300">Total Images</h3>
                        <p className="text-2xl font-bold">{summary.total}</p>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg text-center">
                        <h3 className="font-semibold text-green-700 dark:text-green-300">Good Alt Text</h3>
                        <p className="text-2xl font-bold">{summary.good}</p>
                      </div>
                      <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg text-center">
                        <h3 className="font-semibold text-red-700 dark:text-red-300">Missing Alt</h3>
                        <p className="text-2xl font-bold">{summary.missing}</p>
                      </div>
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg text-center">
                        <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Empty Alt</h3>
                        <p className="text-2xl font-bold">{summary.empty}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Image Analysis Results</Label>
                      <div className="border rounded-md p-4 max-h-[400px] overflow-auto">
                        <div className="space-y-3">
                          {results.map((image, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 border rounded-md">
                              <div className="flex-shrink-0 mt-1">
                                {getStatusIcon(image.status)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm text-muted-foreground">Line {image.line}</span>
                                  {getStatusBadge(image.status)}
                                </div>
                                <div className="font-mono text-sm break-all">
                                  <strong>Source:</strong> {image.src}
                                </div>
                                <div className="font-mono text-sm">
                                  <strong>Alt text:</strong> {image.alt || <span className="text-red-500">(missing)</span>}
                                </div>
                                {image.status === 'missing' && (
                                  <div className="text-sm text-red-600 mt-1">
                                    ⚠️ Missing alt attribute - add alt text for accessibility
                                  </div>
                                )}
                                {image.status === 'empty' && (
                                  <div className="text-sm text-yellow-600 mt-1">
                                    ⚠️ Empty alt text - ensure this is decorative only
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="Alt Tag Checker" faqs={faqs} />
            </div>
          </div>
          <div>
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default AltTagChecker;
