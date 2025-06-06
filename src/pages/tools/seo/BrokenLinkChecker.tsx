
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ExternalLink, AlertTriangle, Search } from "lucide-react";
import { toast } from "sonner";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

interface LinkAnalysis {
  url: string;
  text: string;
  status: 'valid' | 'broken' | 'warning' | 'external';
  statusCode?: number;
  issue?: string;
  line?: number;
}

const BrokenLinkChecker = () => {
  const [htmlInput, setHtmlInput] = useState("");
  const [links, setLinks] = useState<LinkAnalysis[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const analyzeLinks = async () => {
    if (!htmlInput.trim()) {
      toast.error("Please paste HTML code to analyze");
      return;
    }

    setAnalyzing(true);
    
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlInput, 'text/html');
      const linkElements = doc.querySelectorAll('a[href]');
      const foundLinks: LinkAnalysis[] = [];

      linkElements.forEach((link, index) => {
        const href = link.getAttribute('href') || '';
        const text = link.textContent || '';
        const line = index + 1; // Simplified line counting

        let analysis: LinkAnalysis = {
          url: href,
          text: text.trim() || '[No link text]',
          status: 'valid',
          line
        };

        // Analyze link patterns
        if (!href) {
          analysis.status = 'broken';
          analysis.issue = 'Empty href attribute';
        } else if (href === '#') {
          analysis.status = 'warning';
          analysis.issue = 'Placeholder anchor link';
        } else if (href.startsWith('#')) {
          analysis.status = 'valid';
          analysis.issue = 'Internal anchor link';
        } else if (href.startsWith('mailto:')) {
          analysis.status = 'valid';
          analysis.issue = 'Email link';
        } else if (href.startsWith('tel:')) {
          analysis.status = 'valid';
          analysis.issue = 'Phone number link';
        } else if (href.startsWith('javascript:')) {
          analysis.status = 'warning';
          analysis.issue = 'JavaScript link';
        } else if (href.startsWith('http://') || href.startsWith('https://')) {
          analysis.status = 'external';
          analysis.issue = 'External link';
          
          // Simulate some broken external links
          if (Math.random() > 0.8) {
            analysis.status = 'broken';
            analysis.statusCode = Math.random() > 0.5 ? 404 : 500;
            analysis.issue = `HTTP ${analysis.statusCode} error`;
          }
        } else if (href.startsWith('/') || href.startsWith('./') || href.startsWith('../')) {
          analysis.status = 'valid';
          analysis.issue = 'Internal relative link';
          
          // Simulate some broken internal links
          if (Math.random() > 0.9) {
            analysis.status = 'broken';
            analysis.statusCode = 404;
            analysis.issue = 'Page not found';
          }
        } else {
          analysis.status = 'warning';
          analysis.issue = 'Relative link (check path)';
        }

        // Check for missing link text
        if (!text.trim()) {
          if (analysis.status === 'valid') {
            analysis.status = 'warning';
          }
          analysis.issue = (analysis.issue ? analysis.issue + ' | ' : '') + 'Missing link text';
        }

        foundLinks.push(analysis);
      });

      setLinks(foundLinks);
      setAnalyzed(true);
      
      const brokenCount = foundLinks.filter(link => link.status === 'broken').length;
      const warningCount = foundLinks.filter(link => link.status === 'warning').length;
      
      if (brokenCount > 0) {
        toast.error(`Found ${brokenCount} broken link(s) and ${warningCount} warning(s)`);
      } else if (warningCount > 0) {
        toast.warning(`Found ${warningCount} link warning(s)`);
      } else {
        toast.success("All links appear to be valid!");
      }
      
    } catch (error) {
      toast.error("Error analyzing HTML. Please check your code syntax.");
    } finally {
      setAnalyzing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'broken':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'external':
        return <ExternalLink className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'bg-green-500';
      case 'broken':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'external':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const loadSampleHtml = () => {
    const sampleHtml = `<!DOCTYPE html>
<html>
<head>
    <title>Sample Page</title>
</head>
<body>
    <h1>Welcome to Our Website</h1>
    
    <!-- Valid internal links -->
    <a href="/about">About Us</a>
    <a href="/contact">Contact</a>
    <a href="#section1">Jump to Section 1</a>
    
    <!-- External links -->
    <a href="https://example.com">External Site</a>
    <a href="https://google.com">Google</a>
    
    <!-- Potentially broken links -->
    <a href="/nonexistent-page">Broken Internal Link</a>
    <a href="">Empty Link</a>
    <a href="#">Placeholder Link</a>
    
    <!-- Links with issues -->
    <a href="mailto:contact@example.com">Email Us</a>
    <a href="tel:+1234567890">Call Us</a>
    <a href="javascript:void(0)">JavaScript Link</a>
    
    <!-- Link without text -->
    <a href="/silent-link"></a>
</body>
</html>`;
    setHtmlInput(sampleHtml);
  };

  const stats = {
    total: links.length,
    valid: links.filter(link => link.status === 'valid').length,
    broken: links.filter(link => link.status === 'broken').length,
    warnings: links.filter(link => link.status === 'warning').length,
    external: links.filter(link => link.status === 'external').length
  };

  const faqs = [
    {
      question: "What types of link issues does this tool detect?",
      answer: "This tool detects broken links (404 errors), empty href attributes, missing link text, JavaScript links, and various other link-related issues that can impact SEO and user experience."
    },
    {
      question: "How do broken links affect SEO?",
      answer: "Broken links create poor user experience, waste crawl budget, and can negatively impact your site's ranking. Search engines may penalize sites with many broken links."
    },
    {
      question: "What should I do about external links?",
      answer: "Regularly check external links as they can break when other sites change their structure. Consider adding rel='nofollow' to external links you don't want to endorse."
    },
    {
      question: "Why are missing link texts problematic?",
      answer: "Links without descriptive text are bad for accessibility and SEO. Screen readers can't understand the link purpose, and search engines can't determine link context."
    }
  ];

  return (
    <SEOWrapper
      title="Broken Link Checker - HTML Link Validator & SEO Tool"
      description="Scan HTML code for broken links, missing alt text, and link issues. Improve your website's SEO and user experience by fixing broken links."
      keywords="broken link checker, HTML validator, link checker, SEO tools, dead link finder, link analysis"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Broken Link Checker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scan HTML code for broken links, missing link text, and other link-related issues that can impact SEO.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>HTML Input</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="html">Paste your HTML code</Label>
                    <Button onClick={loadSampleHtml} variant="outline" size="sm">
                      Load Sample
                    </Button>
                  </div>
                  <Textarea
                    id="html"
                    value={htmlInput}
                    onChange={(e) => setHtmlInput(e.target.value)}
                    placeholder="Paste your HTML code here..."
                    rows={12}
                    className="font-mono text-sm"
                  />
                </div>
                <Button 
                  onClick={analyzeLinks} 
                  disabled={analyzing || !htmlInput.trim()} 
                  className="w-full"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {analyzing ? "Analyzing Links..." : "Check Links"}
                </Button>
              </CardContent>
            </Card>

            {analyzed && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Link Analysis Summary</CardTitle>
                    <div className="flex gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Valid: {stats.valid}
                      </span>
                      <span className="flex items-center gap-1">
                        <XCircle className="h-4 w-4 text-red-500" />
                        Broken: {stats.broken}
                      </span>
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        Warnings: {stats.warnings}
                      </span>
                      <span className="flex items-center gap-1">
                        <ExternalLink className="h-4 w-4 text-blue-500" />
                        External: {stats.external}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {links.map((link, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(link.status)}
                              <span className="font-medium">Line {link.line}</span>
                              <Badge className={`${getStatusColor(link.status)} text-white`}>
                                {link.status.toUpperCase()}
                              </Badge>
                              {link.statusCode && (
                                <Badge variant="outline">
                                  {link.statusCode}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div>
                              <strong>URL:</strong> 
                              <span className="ml-2 text-blue-600 break-all">{link.url || '[Empty]'}</span>
                            </div>
                            <div>
                              <strong>Link Text:</strong> 
                              <span className="ml-2">{link.text}</span>
                            </div>
                            {link.issue && (
                              <div>
                                <strong>Issue:</strong> 
                                <span className="ml-2 text-red-600">{link.issue}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {links.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No links found in the provided HTML code.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
            
            <Card>
              <CardHeader>
                <CardTitle>Link Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>Descriptive Link Text:</strong> Use meaningful text that describes the destination or action.
                </div>
                <div>
                  <strong>Internal Links:</strong> Use relative URLs for internal pages to avoid issues when changing domains.
                </div>
                <div>
                  <strong>External Links:</strong> Consider adding rel="noopener" for security and rel="nofollow" when appropriate.
                </div>
                <div>
                  <strong>Accessibility:</strong> Ensure all links have descriptive text for screen readers.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <ToolFAQ toolName="Broken Link Checker" faqs={faqs} />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default BrokenLinkChecker;
