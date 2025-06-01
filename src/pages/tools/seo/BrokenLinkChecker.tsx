
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Search, AlertTriangle, CheckCircle, ExternalLink, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LinkResult {
  url: string;
  text: string;
  status: 'valid' | 'broken' | 'suspicious';
  reason?: string;
}

const BrokenLinkChecker = () => {
  const [htmlCode, setHtmlCode] = useState("");
  const [results, setResults] = useState<LinkResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeLinks = async () => {
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
      // Parse HTML and extract anchor tags
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlCode, 'text/html');
      const links = doc.querySelectorAll('a[href]');
      
      const linkResults: LinkResult[] = [];
      
      for (const link of Array.from(links)) {
        const href = link.getAttribute('href') || '';
        const text = link.textContent || '';
        
        let status: 'valid' | 'broken' | 'suspicious' = 'valid';
        let reason = '';
        
        // Check for common issues
        if (!href) {
          status = 'broken';
          reason = 'Missing href attribute';
        } else if (href === '#' || href === '') {
          status = 'suspicious';
          reason = 'Empty or placeholder link';
        } else if (href.startsWith('javascript:')) {
          status = 'suspicious';
          reason = 'JavaScript link';
        } else if (href.includes('{{') || href.includes('${')) {
          status = 'broken';
          reason = 'Template variable not replaced';
        } else if (href.startsWith('http://') && !href.includes('localhost')) {
          status = 'suspicious';
          reason = 'Non-secure HTTP link';
        } else if (href.includes(' ') || href.includes('\n')) {
          status = 'broken';
          reason = 'Contains whitespace';
        } else if (href.startsWith('mailto:') && !href.includes('@')) {
          status = 'broken';
          reason = 'Invalid email format';
        }
        
        linkResults.push({
          url: href,
          text: text.trim() || '(no text)',
          status,
          reason
        });
      }
      
      setResults(linkResults);
      
      const brokenCount = linkResults.filter(r => r.status === 'broken').length;
      const suspiciousCount = linkResults.filter(r => r.status === 'suspicious').length;
      
      toast({
        title: "Analysis Complete!",
        description: `Found ${linkResults.length} links. ${brokenCount} broken, ${suspiciousCount} suspicious.`,
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
      `${result.status.toUpperCase()}: ${result.url} - "${result.text}" ${result.reason ? `(${result.reason})` : ''}`
    ).join('\n');
    
    navigator.clipboard.writeText(report);
    toast({
      title: "Copied!",
      description: "Link analysis report copied to clipboard.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'broken': return 'bg-red-100 text-red-800 border-red-200';
      case 'suspicious': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'broken': return <AlertTriangle className="h-4 w-4" />;
      case 'suspicious': return <AlertTriangle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const faqs = [
    {
      question: "How does the broken link checker work?",
      answer: "This tool parses your HTML code and analyzes anchor tags for common issues like missing href attributes, empty links, template variables, and formatting problems."
    },
    {
      question: "Does it actually test if URLs are accessible?",
      answer: "No, this tool performs static analysis only. It checks for obvious formatting issues and suspicious patterns without making actual HTTP requests."
    },
    {
      question: "What types of issues does it detect?",
      answer: "It detects missing href attributes, empty links, JavaScript links, template variables, non-secure HTTP links, whitespace issues, and invalid email formats."
    },
    {
      question: "Is my HTML code stored or shared?",
      answer: "No, all analysis happens entirely in your browser. Your HTML code is never sent to our servers or stored anywhere."
    },
    {
      question: "Can I check external website links?",
      answer: "This tool is designed for HTML code analysis only. For checking live website links, you would need a different tool that can make HTTP requests."
    }
  ];

  return (
    <SEOWrapper
      title="Broken Link Checker - HTML Link Validator"
      description="Scan pasted HTML code for broken anchor tags and invalid links to improve SEO."
      keywords="broken link checker, HTML validator, link checker, SEO tools, dead link finder"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Broken Link Checker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scan HTML code for broken anchor tags and invalid links. Perfect for 
            catching link issues before publishing.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>HTML Link Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your HTML code here..."
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  className="min-h-32 font-mono text-sm"
                />
                
                <Button 
                  onClick={analyzeLinks} 
                  disabled={!htmlCode.trim() || isAnalyzing}
                  className="w-full"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {isAnalyzing ? "Analyzing..." : "Check Links"}
                </Button>

                {results.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <h3 className="font-semibold">Analysis Results</h3>
                        <div className="flex gap-2">
                          <Badge variant="secondary">
                            {results.length} total links
                          </Badge>
                          <Badge className="bg-red-100 text-red-800">
                            {results.filter(r => r.status === 'broken').length} broken
                          </Badge>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            {results.filter(r => r.status === 'suspicious').length} suspicious
                          </Badge>
                          <Badge className="bg-green-100 text-green-800">
                            {results.filter(r => r.status === 'valid').length} valid
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={copyResults}>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy Report
                      </Button>
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {results.map((result, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(result.status)}`}>
                            {getStatusIcon(result.status)}
                            {result.status}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <code className="text-sm bg-muted px-1 rounded truncate">
                                {result.url}
                              </code>
                              {result.url.startsWith('http') && (
                                <ExternalLink className="h-3 w-3 text-muted-foreground" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              "{result.text}"
                            </p>
                            {result.reason && (
                              <p className="text-xs text-red-600 mt-1">
                                {result.reason}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <ToolFAQ toolName="Broken Link Checker" faqs={faqs} />
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What It Checks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-red-500" />
                    <div>
                      <div className="font-medium">Broken Links</div>
                      <div className="text-muted-foreground">Missing href, template variables, whitespace</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-500" />
                    <div>
                      <div className="font-medium">Suspicious Links</div>
                      <div className="text-muted-foreground">Empty anchors, HTTP links, JavaScript</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                    <div>
                      <div className="font-medium">Valid Links</div>
                      <div className="text-muted-foreground">Properly formatted URLs</div>
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

export default BrokenLinkChecker;
