
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { FileText, AlertCircle, CheckCircle } from "lucide-react";

const PageSizeChecker = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    totalSize: number;
    resources: Array<{
      type: string;
      size: number;
      count: number;
      percentage: number;
    }>;
    recommendations: Array<{
      type: "warning" | "success" | "info";
      message: string;
    }>;
  } | null>(null);

  const checkPageSize = async () => {
    setLoading(true);
    
    // Simulate analysis (in real implementation, this would use a backend service)
    setTimeout(() => {
      const mockResults = {
        totalSize: 2.4 * 1024 * 1024, // 2.4MB
        resources: [
          { type: "HTML", size: 45000, count: 1, percentage: 1.8 },
          { type: "CSS", size: 320000, count: 3, percentage: 12.8 },
          { type: "JavaScript", size: 890000, count: 8, percentage: 35.4 },
          { type: "Images", size: 1200000, count: 15, percentage: 47.8 },
          { type: "Fonts", size: 58000, count: 2, percentage: 2.2 }
        ],
        recommendations: [
          { type: "warning" as const, message: "Page size is above 2MB - consider optimization" },
          { type: "warning" as const, message: "Large JavaScript files detected - consider code splitting" },
          { type: "success" as const, message: "Good compression ratio for text resources" },
          { type: "info" as const, message: "Consider using next-gen image formats like WebP" }
        ]
      };
      
      setResults(mockResults);
      setLoading(false);
    }, 2000);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const faqData = [
    {
      question: "What is considered a good page size?",
      answer: "For optimal performance, pages should be under 2MB total. Most successful websites keep their pages between 500KB-1.5MB including all resources."
    },
    {
      question: "Why does page size matter for SEO?",
      answer: "Page size directly affects loading speed, which is a Google ranking factor. Smaller pages load faster, improving user experience and search rankings."
    },
    {
      question: "What resources contribute most to page size?",
      answer: "Typically images (40-60%), JavaScript (20-30%), CSS (5-10%), and HTML (1-5%). Optimizing images usually provides the biggest size reduction."
    },
    {
      question: "How can I reduce my page size?",
      answer: "Compress images, minify CSS/JS, use modern image formats (WebP), enable gzip compression, and remove unused code. Consider lazy loading for images."
    }
  ];

  return (
    <SEOWrapper
      title="Page Size Checker - Website Performance Analyzer"
      description="Calculate the size of a given URL's content and analyze resource weight for better performance."
      keywords="page size checker, website performance, page weight analyzer, site speed test"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Page Size Checker
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate the size and weight of your website pages for better performance.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Enter URL to Analyze</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="url">Website URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={checkPageSize} 
                  disabled={!url || loading}
                  className="w-full"
                >
                  {loading ? "Analyzing..." : "Check Page Size"}
                </Button>
              </CardContent>
            </Card>

            {loading && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Analyzing page resources...</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {results && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Page Size Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-primary mb-2">
                        {formatSize(results.totalSize)}
                      </div>
                      <p className="text-muted-foreground">Total Page Size</p>
                    </div>

                    <div className="space-y-4">
                      {results.resources.map((resource, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{resource.type}</span>
                            <span>{formatSize(resource.size)} ({resource.count} files)</span>
                          </div>
                          <Progress value={resource.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Optimization Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {results.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          {rec.type === "warning" && <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />}
                          {rec.type === "success" && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />}
                          {rec.type === "info" && <FileText className="h-5 w-5 text-blue-500 mt-0.5" />}
                          <p className="text-sm">{rec.message}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">&lt; 1MB</div>
                        <div className="text-sm text-green-700">Excellent</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">1-2MB</div>
                        <div className="text-sm text-yellow-700">Good</div>
                      </div>
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">&gt; 2MB</div>
                        <div className="text-sm text-red-700">Needs Optimization</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          
          <div>
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
          </div>
        </div>

        <ToolFAQ toolName="Page Size Checker FAQ" faqs={faqData} />
      </div>
    </SEOWrapper>
  );
};

export default PageSizeChecker;
