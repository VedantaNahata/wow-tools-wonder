
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, Search } from "lucide-react";
import AdSenseBox from "@/components/AdSenseBox";

interface MetaTag {
  name: string;
  content: string;
  type: 'meta' | 'title' | 'og' | 'twitter' | 'other';
  status: 'good' | 'warning' | 'error';
  recommendation?: string;
}

const MetaTagAnalyzer = () => {
  const [htmlInput, setHtmlInput] = useState("");
  const [metaTags, setMetaTags] = useState<MetaTag[]>([]);
  const [analyzed, setAnalyzed] = useState(false);

  const analyzeMetaTags = () => {
    if (!htmlInput.trim()) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlInput, 'text/html');
    const tags: MetaTag[] = [];

    // Analyze title tag
    const titleElement = doc.querySelector('title');
    if (titleElement) {
      const titleLength = titleElement.textContent?.length || 0;
      tags.push({
        name: 'Title',
        content: titleElement.textContent || '',
        type: 'title',
        status: titleLength >= 30 && titleLength <= 60 ? 'good' : 'warning',
        recommendation: titleLength < 30 ? 'Title is too short (recommended: 30-60 characters)' 
                      : titleLength > 60 ? 'Title is too long (recommended: 30-60 characters)' 
                      : undefined
      });
    } else {
      tags.push({
        name: 'Title',
        content: 'Missing',
        type: 'title',
        status: 'error',
        recommendation: 'Add a title tag for SEO'
      });
    }

    // Analyze meta description
    const descriptionElement = doc.querySelector('meta[name="description"]');
    if (descriptionElement) {
      const descContent = descriptionElement.getAttribute('content') || '';
      const descLength = descContent.length;
      tags.push({
        name: 'Meta Description',
        content: descContent,
        type: 'meta',
        status: descLength >= 120 && descLength <= 160 ? 'good' : 'warning',
        recommendation: descLength < 120 ? 'Description is too short (recommended: 120-160 characters)' 
                       : descLength > 160 ? 'Description is too long (recommended: 120-160 characters)' 
                       : undefined
      });
    } else {
      tags.push({
        name: 'Meta Description',
        content: 'Missing',
        type: 'meta',
        status: 'error',
        recommendation: 'Add a meta description for better search results'
      });
    }

    // Analyze other meta tags
    const metaElements = doc.querySelectorAll('meta[name], meta[property]');
    metaElements.forEach(meta => {
      const name = meta.getAttribute('name') || meta.getAttribute('property') || '';
      const content = meta.getAttribute('content') || '';
      
      if (name === 'description') return; // Already handled above
      
      let type: MetaTag['type'] = 'other';
      if (name.startsWith('og:')) type = 'og';
      else if (name.startsWith('twitter:')) type = 'twitter';
      else if (['keywords', 'author', 'robots', 'viewport'].includes(name)) type = 'meta';
      
      tags.push({
        name: name,
        content: content,
        type: type,
        status: content ? 'good' : 'warning',
        recommendation: !content ? 'This meta tag has no content' : undefined
      });
    });

    // Check for essential Open Graph tags
    const essentialOgTags = ['og:title', 'og:description', 'og:image', 'og:url'];
    essentialOgTags.forEach(tagName => {
      if (!tags.find(tag => tag.name === tagName)) {
        tags.push({
          name: tagName,
          content: 'Missing',
          type: 'og',
          status: 'warning',
          recommendation: 'Consider adding this Open Graph tag for better social media sharing'
        });
      }
    });

    setMetaTags(tags);
    setAnalyzed(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'title':
        return 'bg-purple-500';
      case 'meta':
        return 'bg-blue-500';
      case 'og':
        return 'bg-green-500';
      case 'twitter':
        return 'bg-cyan-500';
      default:
        return 'bg-gray-500';
    }
  };

  const stats = {
    total: metaTags.length,
    good: metaTags.filter(tag => tag.status === 'good').length,
    warning: metaTags.filter(tag => tag.status === 'warning').length,
    error: metaTags.filter(tag => tag.status === 'error').length
  };

  return (
    <SEOWrapper
      title="HTML Meta Tag Analyzer - SEO Meta Tag Checker"
      description="Analyze HTML code to extract and evaluate SEO-relevant meta tags. Check Open Graph, Twitter Cards, and standard meta tags."
      keywords="meta tag analyzer, SEO checker, HTML analyzer, Open Graph checker, Twitter Cards validator"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            HTML Meta Tag Analyzer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Analyze pasted HTML code and extract all SEO-relevant meta tags with recommendations.
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
                <Textarea
                  value={htmlInput}
                  onChange={(e) => setHtmlInput(e.target.value)}
                  placeholder="Paste your HTML code here..."
                  rows={12}
                  className="font-mono text-sm"
                />
                <Button onClick={analyzeMetaTags} disabled={!htmlInput.trim()} className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Analyze Meta Tags
                </Button>
              </CardContent>
            </Card>

            {analyzed && (
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                  <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Good: {stats.good}
                    </span>
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      Warning: {stats.warning}
                    </span>
                    <span className="flex items-center gap-1">
                      <XCircle className="h-4 w-4 text-red-500" />
                      Error: {stats.error}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metaTags.map((tag, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(tag.status)}
                            <span className="font-medium">{tag.name}</span>
                            <Badge className={`${getTypeColor(tag.type)} text-white`}>
                              {tag.type.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          <strong>Content:</strong> {tag.content || 'Empty'}
                        </div>
                        {tag.recommendation && (
                          <div className="text-sm text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded">
                            <strong>Recommendation:</strong> {tag.recommendation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
            
            <Card>
              <CardHeader>
                <CardTitle>SEO Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>Title Tag:</strong> Keep it 30-60 characters, include target keywords, and make it compelling.
                </div>
                <div>
                  <strong>Meta Description:</strong> Write 120-160 characters that summarize the page content.
                </div>
                <div>
                  <strong>Open Graph:</strong> Essential for social media sharing - include og:title, og:description, og:image, and og:url.
                </div>
                <div>
                  <strong>Twitter Cards:</strong> Use twitter:card, twitter:title, twitter:description for better Twitter sharing.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default MetaTagAnalyzer;
