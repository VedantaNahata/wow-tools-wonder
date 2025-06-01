
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Search, ExternalLink, AlertCircle, CheckCircle, ArrowRight, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RedirectStep {
  url: string;
  statusCode: number;
  statusText: string;
  redirectTo?: string;
}

const RedirectChecker = () => {
  const [url, setUrl] = useState("");
  const [redirectChain, setRedirectChain] = useState<RedirectStep[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const checkRedirects = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL to check.",
        variant: "destructive",
      });
      return;
    }

    // Validate URL format
    let checkUrl = url.trim();
    if (!checkUrl.startsWith('http://') && !checkUrl.startsWith('https://')) {
      checkUrl = 'https://' + checkUrl;
    }

    try {
      new URL(checkUrl);
    } catch {
      toast({
        title: "Error",
        description: "Please enter a valid URL.",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    setError("");
    setRedirectChain([]);

    try {
      // Note: Due to CORS restrictions, we can't actually fetch external URLs directly
      // This is a simulation showing how the tool would work
      const simulatedResults: RedirectStep[] = [
        {
          url: checkUrl,
          statusCode: 301,
          statusText: "Moved Permanently",
          redirectTo: checkUrl.replace('http://', 'https://')
        },
        {
          url: checkUrl.replace('http://', 'https://'),
          statusCode: 200,
          statusText: "OK"
        }
      ];

      // Simulate different scenarios based on URL
      if (checkUrl.includes('redirect-test')) {
        simulatedResults.push({
          url: checkUrl + '/final',
          statusCode: 200,
          statusText: "OK"
        });
      }

      setRedirectChain(simulatedResults);
      
      toast({
        title: "Check Complete!",
        description: `Found ${simulatedResults.length} steps in redirect chain.`,
      });

    } catch (error) {
      setError("Unable to check redirects. This may be due to CORS restrictions or network issues.");
      toast({
        title: "Error",
        description: "Failed to check redirects. Please try again.",
        variant: "destructive",
      });
    }

    setIsChecking(false);
  };

  const copyResults = () => {
    const report = redirectChain.map((step, index) => 
      `${index + 1}. ${step.statusCode} ${step.statusText} - ${step.url}${step.redirectTo ? ` → ${step.redirectTo}` : ''}`
    ).join('\n');
    
    navigator.clipboard.writeText(report);
    toast({
      title: "Copied!",
      description: "Redirect chain copied to clipboard.",
    });
  };

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return 'bg-green-100 text-green-800 border-green-200';
    if (statusCode >= 300 && statusCode < 400) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (statusCode >= 400 && statusCode < 500) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getStatusIcon = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return <CheckCircle className="h-4 w-4" />;
    if (statusCode >= 300 && statusCode < 400) return <ArrowRight className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  const faqs = [
    {
      question: "What is a URL redirect?",
      answer: "A URL redirect is when one URL automatically forwards visitors to a different URL. Common types include 301 (permanent) and 302 (temporary) redirects."
    },
    {
      question: "Why should I check redirect chains?",
      answer: "Long redirect chains can slow down page loading, hurt SEO rankings, and provide poor user experience. It's best to minimize redirects when possible."
    },
    {
      question: "What's the difference between 301 and 302 redirects?",
      answer: "301 redirects are permanent and pass SEO value to the target URL. 302 redirects are temporary and don't pass as much SEO value."
    },
    {
      question: "How many redirects are too many?",
      answer: "Generally, try to keep redirect chains under 3-5 hops. Search engines may stop following long chains, and each redirect adds loading time."
    },
    {
      question: "Why might this tool not work for some URLs?",
      answer: "Due to browser security restrictions (CORS), this tool may not be able to check all URLs. For comprehensive testing, use server-side tools."
    }
  ];

  return (
    <SEOWrapper
      title="URL Redirect Checker - Check Redirect Chains"
      description="Check the redirect path of any URL and analyze 301, 302 redirects and redirect chains."
      keywords="redirect checker, URL redirect, 301 redirect, 302 redirect, redirect chain analyzer"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            URL Redirect Checker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check the redirect path of any URL and analyze redirect chains. 
            Identify 301, 302 redirects and optimize your URL structure.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Check URL Redirects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter URL (e.g., example.com or https://example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && checkRedirects()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={checkRedirects} 
                    disabled={!url.trim() || isChecking}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    {isChecking ? "Checking..." : "Check"}
                  </Button>
                </div>

                {error && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Note: Due to browser security restrictions, this tool provides simulated results for demonstration. 
                    For production use, server-side redirect checking tools are recommended.
                  </AlertDescription>
                </Alert>

                {redirectChain.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Redirect Chain</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {redirectChain.length} steps
                        </Badge>
                        <Button size="sm" variant="outline" onClick={copyResults}>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {redirectChain.map((step, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {index + 1}.
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(step.statusCode)}>
                                {getStatusIcon(step.statusCode)}
                                {step.statusCode} {step.statusText}
                              </Badge>
                            </div>
                            <div className="text-sm">
                              <code className="bg-muted px-1 rounded text-xs break-all">
                                {step.url}
                              </code>
                            </div>
                            {step.redirectTo && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <ArrowRight className="h-4 w-4" />
                                <span>Redirects to:</span>
                                <code className="bg-muted px-1 rounded text-xs break-all">
                                  {step.redirectTo}
                                </code>
                              </div>
                            )}
                          </div>
                          <div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">Analysis Summary</h4>
                      <div className="text-sm space-y-1">
                        <p>• Total redirects: {redirectChain.length - 1}</p>
                        <p>• Final status: {redirectChain[redirectChain.length - 1]?.statusCode} {redirectChain[redirectChain.length - 1]?.statusText}</p>
                        {redirectChain.length > 3 && (
                          <p className="text-yellow-600">⚠️ Long redirect chain detected - consider optimizing</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <ToolFAQ toolName="URL Redirect Checker" faqs={faqs} />
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">HTTP Status Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-green-500" />
                    <div>
                      <div className="font-medium">200 OK</div>
                      <div className="text-muted-foreground">Success - page loaded</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-0.5 text-blue-500" />
                    <div>
                      <div className="font-medium">301 Moved</div>
                      <div className="text-muted-foreground">Permanent redirect</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-0.5 text-blue-500" />
                    <div>
                      <div className="font-medium">302 Found</div>
                      <div className="text-muted-foreground">Temporary redirect</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 text-red-500" />
                    <div>
                      <div className="font-medium">404 Not Found</div>
                      <div className="text-muted-foreground">Page doesn't exist</div>
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

export default RedirectChecker;
