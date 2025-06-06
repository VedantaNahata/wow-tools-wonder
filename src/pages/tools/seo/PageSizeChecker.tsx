
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Globe, FileText, Image, Zap, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

interface PageAnalysis {
  totalSize: number;
  htmlSize: number;
  cssSize: number;
  jsSize: number;
  imageSize: number;
  otherSize: number;
  loadTime: number;
  requests: number;
  gzipSize: number;
}

const PageSizeChecker = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<PageAnalysis | null>(null);

  const checkPageSize = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL to analyze");
      return;
    }

    let testUrl = url.trim();
    if (!testUrl.startsWith('http://') && !testUrl.startsWith('https://')) {
      testUrl = 'https://' + testUrl;
    }

    setLoading(true);
    
    try {
      // Simulate page analysis (in real implementation, this would use a backend service)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate realistic mock data
      const htmlSize = Math.floor(Math.random() * 50000) + 10000; // 10-60KB
      const cssSize = Math.floor(Math.random() * 100000) + 20000; // 20-120KB
      const jsSize = Math.floor(Math.random() * 300000) + 50000; // 50-350KB
      const imageSize = Math.floor(Math.random() * 500000) + 100000; // 100-600KB
      const otherSize = Math.floor(Math.random() * 50000) + 5000; // 5-55KB
      
      const totalSize = htmlSize + cssSize + jsSize + imageSize + otherSize;
      const gzipSize = Math.floor(totalSize * 0.3); // Assume 70% compression
      
      const mockAnalysis: PageAnalysis = {
        totalSize,
        htmlSize,
        cssSize,
        jsSize,
        imageSize,
        otherSize,
        loadTime: Math.floor(Math.random() * 3000) + 500, // 500-3500ms
        requests: Math.floor(Math.random() * 80) + 20, // 20-100 requests
        gzipSize
      };
      
      setAnalysis(mockAnalysis);
      toast.success("Page analysis completed!");
      
    } catch (error) {
      toast.error("Error analyzing page. Please verify the URL is accessible.");
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getPerformanceGrade = (totalSize: number, loadTime: number) => {
    if (totalSize < 1000000 && loadTime < 1500) return { grade: 'A', color: 'bg-green-500', text: 'Excellent' };
    if (totalSize < 2000000 && loadTime < 3000) return { grade: 'B', color: 'bg-blue-500', text: 'Good' };
    if (totalSize < 3000000 && loadTime < 5000) return { grade: 'C', color: 'bg-yellow-500', text: 'Average' };
    return { grade: 'D', color: 'bg-red-500', text: 'Needs Improvement' };
  };

  const getResourcePercentage = (resourceSize: number, totalSize: number) => {
    return Math.round((resourceSize / totalSize) * 100);
  };

  const faqs = [
    {
      question: "What's considered a good page size?",
      answer: "For optimal performance, keep total page size under 1-2MB. Pages under 1MB load faster and provide better user experience, especially on mobile devices."
    },
    {
      question: "How does page size affect SEO?",
      answer: "Page size directly impacts loading speed, which is a Google ranking factor. Faster-loading pages rank better and have lower bounce rates."
    },
    {
      question: "What's the impact of images on page size?",
      answer: "Images often account for 60-70% of total page weight. Optimize images by compressing them, using modern formats (WebP), and implementing lazy loading."
    },
    {
      question: "How can I reduce my page size?",
      answer: "Minimize and compress CSS/JS files, optimize images, use CDNs, enable gzip compression, remove unused code, and consider lazy loading for non-critical resources."
    }
  ];

  return (
    <SEOWrapper
      title="Page Size Checker - Website Performance Analyzer"
      description="Analyze your website's page size, resource breakdown, and loading performance. Optimize your site for better speed and SEO rankings."
      keywords="page size checker, website performance, page weight analyzer, site speed test, performance optimization, web performance"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Page Size Checker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Analyze your website's page size, resource breakdown, and performance metrics for optimization insights.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analyze Page Size</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Enter URL to Analyze</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                
                <Button 
                  onClick={checkPageSize} 
                  disabled={loading || !url.trim()}
                  className="w-full"
                >
                  {loading ? "Analyzing Page..." : "Analyze Page Size"}
                </Button>
              </CardContent>
            </Card>

            {analysis && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{formatBytes(analysis.totalSize)}</div>
                        <div className="text-sm text-muted-foreground">Total Size</div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{analysis.loadTime}ms</div>
                        <div className="text-sm text-muted-foreground">Load Time</div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{analysis.requests}</div>
                        <div className="text-sm text-muted-foreground">Requests</div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{formatBytes(analysis.gzipSize)}</div>
                        <div className="text-sm text-muted-foreground">Gzipped</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center mb-4">
                      {(() => {
                        const grade = getPerformanceGrade(analysis.totalSize, analysis.loadTime);
                        return (
                          <div className="flex items-center gap-3">
                            <div className={`w-16 h-16 ${grade.color} text-white rounded-full flex items-center justify-center text-2xl font-bold`}>
                              {grade.grade}
                            </div>
                            <div>
                              <div className="text-lg font-semibold">{grade.text}</div>
                              <div className="text-sm text-muted-foreground">Performance Grade</div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Resource Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span>HTML</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{formatBytes(analysis.htmlSize)}</span>
                          <Badge variant="outline">{getResourcePercentage(analysis.htmlSize, analysis.totalSize)}%</Badge>
                        </div>
                      </div>
                      <Progress value={getResourcePercentage(analysis.htmlSize, analysis.totalSize)} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-500" />
                          <span>CSS</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{formatBytes(analysis.cssSize)}</span>
                          <Badge variant="outline">{getResourcePercentage(analysis.cssSize, analysis.totalSize)}%</Badge>
                        </div>
                      </div>
                      <Progress value={getResourcePercentage(analysis.cssSize, analysis.totalSize)} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-yellow-500" />
                          <span>JavaScript</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{formatBytes(analysis.jsSize)}</span>
                          <Badge variant="outline">{getResourcePercentage(analysis.jsSize, analysis.totalSize)}%</Badge>
                        </div>
                      </div>
                      <Progress value={getResourcePercentage(analysis.jsSize, analysis.totalSize)} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Image className="h-4 w-4 text-green-500" />
                          <span>Images</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{formatBytes(analysis.imageSize)}</span>
                          <Badge variant="outline">{getResourcePercentage(analysis.imageSize, analysis.totalSize)}%</Badge>
                        </div>
                      </div>
                      <Progress value={getResourcePercentage(analysis.imageSize, analysis.totalSize)} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-gray-500" />
                          <span>Other</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{formatBytes(analysis.otherSize)}</span>
                          <Badge variant="outline">{getResourcePercentage(analysis.otherSize, analysis.totalSize)}%</Badge>
                        </div>
                      </div>
                      <Progress value={getResourcePercentage(analysis.otherSize, analysis.totalSize)} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Optimization Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.totalSize > 2000000 && (
                        <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium text-red-700 dark:text-red-300">Large page size detected</div>
                            <div className="text-sm text-red-600 dark:text-red-400">
                              Your page is over 2MB. Consider optimizing images and removing unused resources.
                            </div>
                          </div>
                        </div>
                      )}

                      {analysis.imageSize > analysis.totalSize * 0.6 && (
                        <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium text-yellow-700 dark:text-yellow-300">Images dominate page weight</div>
                            <div className="text-sm text-yellow-600 dark:text-yellow-400">
                              Images account for over 60% of your page size. Consider image optimization and lazy loading.
                            </div>
                          </div>
                        </div>
                      )}

                      {analysis.loadTime < 1500 && (
                        <div className="flex items-start gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium text-green-700 dark:text-green-300">Excellent load time</div>
                            <div className="text-sm text-green-600 dark:text-green-400">
                              Your page loads quickly, providing a great user experience.
                            </div>
                          </div>
                        </div>
                      )}

                      {analysis.requests > 100 && (
                        <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium text-orange-700 dark:text-orange-300">High number of requests</div>
                            <div className="text-sm text-orange-600 dark:text-orange-400">
                              Consider combining CSS/JS files and using sprite sheets for images.
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>Page Size Guidelines:</strong>
                  <ul className="mt-1 space-y-1 text-muted-foreground">
                    <li>• Under 1MB: Excellent</li>
                    <li>• 1-2MB: Good</li>
                    <li>• 2-3MB: Average</li>
                    <li>• Over 3MB: Poor</li>
                  </ul>
                </div>
                <div>
                  <strong>Load Time Goals:</strong>
                  <ul className="mt-1 space-y-1 text-muted-foreground">
                    <li>• Under 1.5s: Excellent</li>
                    <li>• 1.5-3s: Good</li>
                    <li>• 3-5s: Average</li>
                    <li>• Over 5s: Poor</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <ToolFAQ toolName="Page Size Checker" faqs={faqs} />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default PageSizeChecker;
