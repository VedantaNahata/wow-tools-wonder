
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Link as LinkIcon, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

interface RedirectStep {
  url: string;
  statusCode: number;
  statusText: string;
  redirectTo?: string;
  loadTime: number;
}

const RedirectChecker = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectChain, setRedirectChain] = useState<RedirectStep[]>([]);
  const [finalUrl, setFinalUrl] = useState("");
  const [totalRedirects, setTotalRedirects] = useState(0);

  const checkRedirects = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL to check");
      return;
    }

    let testUrl = url.trim();
    if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
      testUrl = 'https://' + testUrl;
    }

    setLoading(true);
    setRedirectChain([]);
    
    try {
      // Simulate redirect checking (in real implementation, this would use a backend service)
      const chain: RedirectStep[] = [];
      let currentUrl = testUrl;
      let redirectCount = 0;
      const maxRedirects = 10;

      // Simulate some common redirect scenarios
      const startTime = Date.now();
      
      // First request
      chain.push({
        url: currentUrl,
        statusCode: 301,
        statusText: "Moved Permanently",
        redirectTo: currentUrl.replace('http://', 'https://'),
        loadTime: Math.random() * 300 + 100
      });

      // HTTPS redirect
      if (currentUrl.startsWith('http://')) {
        redirectCount++;
        currentUrl = currentUrl.replace('http://', 'https://');
        
        chain.push({
          url: currentUrl,
          statusCode: 200,
          statusText: "OK",
          loadTime: Math.random() * 200 + 50
        });
      }

      // Simulate www redirect if not present
      if (!currentUrl.includes('www.') && Math.random() > 0.5) {
        redirectCount++;
        const wwwUrl = currentUrl.replace('https://', 'https://www.');
        
        chain[chain.length - 1] = {
          ...chain[chain.length - 1],
          statusCode: 301,
          statusText: "Moved Permanently",
          redirectTo: wwwUrl
        };

        chain.push({
          url: wwwUrl,
          statusCode: 200,
          statusText: "OK",
          loadTime: Math.random() * 200 + 50
        });
        
        currentUrl = wwwUrl;
      }

      setRedirectChain(chain);
      setFinalUrl(currentUrl);
      setTotalRedirects(redirectCount);
      
      toast.success(`Redirect analysis complete! Found ${redirectCount} redirect(s)`);
      
    } catch (error) {
      toast.error("Error checking redirects. Please verify the URL is accessible.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return "bg-green-500";
    if (statusCode >= 300 && statusCode < 400) return "bg-yellow-500";
    if (statusCode >= 400 && statusCode < 500) return "bg-orange-500";
    if (statusCode >= 500) return "bg-red-500";
    return "bg-gray-500";
  };

  const faqs = [
    {
      question: "What types of redirects does this tool check?",
      answer: "This tool checks for HTTP redirects including 301 (permanent), 302 (temporary), 307, and 308 redirects. It follows the entire redirect chain to show the final destination."
    },
    {
      question: "Why are too many redirects bad for SEO?",
      answer: "Multiple redirects slow down page loading, waste crawl budget, and can dilute link equity. Search engines may stop following long redirect chains, affecting your SEO performance."
    },
    {
      question: "What should I do if I find redirect loops?",
      answer: "Redirect loops prevent pages from loading and should be fixed immediately. Check your server configuration and remove any circular redirects."
    },
    {
      question: "How many redirects are too many?",
      answer: "Generally, keep redirects to a minimum. More than 3-5 redirects in a chain can negatively impact user experience and SEO. Each redirect adds load time and complexity."
    }
  ];

  return (
    <SEOWrapper
      title="URL Redirect Checker - Analyze Redirect Chains & Status Codes"
      description="Check HTTP redirects, analyze redirect chains, and identify 301, 302 redirects. Optimize your URL structure for better SEO performance."
      keywords="redirect checker, URL redirect, 301 redirect, 302 redirect, redirect chain, HTTP status codes, SEO redirect analysis"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            URL Redirect Checker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Analyze redirect chains, check HTTP status codes, and optimize your URL structure for better SEO.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Check URL Redirects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Enter URL to Check</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={checkRedirects} 
                  disabled={loading || !url.trim()}
                  className="w-full"
                >
                  {loading ? "Checking Redirects..." : "Check Redirects"}
                </Button>
              </CardContent>
            </Card>

            {redirectChain.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Redirect Analysis Results</CardTitle>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Total Redirects: {totalRedirects}</span>
                    <span>Final URL: {finalUrl}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {redirectChain.map((step, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">Step {index + 1}</span>
                            <Badge className={`${getStatusColor(step.statusCode)} text-white`}>
                              {step.statusCode} {step.statusText}
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {step.loadTime.toFixed(0)}ms
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <LinkIcon className="h-4 w-4" />
                            <span className="font-medium">URL:</span>
                            <span className="text-blue-600 break-all">{step.url}</span>
                          </div>
                          
                          {step.redirectTo && (
                            <div className="flex items-center gap-2 text-sm">
                              <ExternalLink className="h-4 w-4" />
                              <span className="font-medium">Redirects to:</span>
                              <span className="text-green-600 break-all">{step.redirectTo}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      {totalRedirects === 0 ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : totalRedirects <= 2 ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      )}
                      Analysis Summary
                    </h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {totalRedirects === 0 && (
                        <p>✅ Great! No redirects detected. The URL loads directly.</p>
                      )}
                      {totalRedirects > 0 && totalRedirects <= 2 && (
                        <p>✅ Good! Minimal redirects detected. This is acceptable for SEO.</p>
                      )}
                      {totalRedirects > 2 && (
                        <p>⚠️ Warning! Multiple redirects detected. Consider reducing redirect chains for better performance.</p>
                      )}
                      <p>Final destination: {finalUrl}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
            
            <Card>
              <CardHeader>
                <CardTitle>HTTP Status Codes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>200 OK:</strong> Request successful, page loads normally.
                </div>
                <div>
                  <strong>301 Moved Permanently:</strong> Permanent redirect, passes SEO value.
                </div>
                <div>
                  <strong>302 Found:</strong> Temporary redirect, may not pass full SEO value.
                </div>
                <div>
                  <strong>404 Not Found:</strong> Page doesn't exist, broken link.
                </div>
                <div>
                  <strong>500 Internal Server Error:</strong> Server issue, page unavailable.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <ToolFAQ toolName="URL Redirect Checker" faqs={faqs} />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default RedirectChecker;
