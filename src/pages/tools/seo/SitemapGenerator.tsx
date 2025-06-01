
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Download, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AdSenseBox from "@/components/AdSenseBox";

interface SitemapUrl {
  url: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

const SitemapGenerator = () => {
  const [urls, setUrls] = useState<SitemapUrl[]>([
    { url: "", lastmod: new Date().toISOString().split('T')[0], changefreq: "weekly", priority: "1.0" }
  ]);
  const [bulkUrls, setBulkUrls] = useState("");

  const addUrl = () => {
    setUrls([...urls, { 
      url: "", 
      lastmod: new Date().toISOString().split('T')[0], 
      changefreq: "weekly", 
      priority: "0.5" 
    }]);
  };

  const removeUrl = (index: number) => {
    if (urls.length > 1) {
      setUrls(urls.filter((_, i) => i !== index));
    }
  };

  const updateUrl = (index: number, field: keyof SitemapUrl, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = { ...newUrls[index], [field]: value };
    setUrls(newUrls);
  };

  const processBulkUrls = () => {
    const urlList = bulkUrls.split('\n').filter(url => url.trim());
    const newUrls = urlList.map(url => ({
      url: url.trim(),
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: "weekly",
      priority: "0.5"
    }));
    setUrls(newUrls);
    setBulkUrls("");
    toast.success(`Added ${newUrls.length} URLs to sitemap!`);
  };

  const generateSitemap = () => {
    const validUrls = urls.filter(url => url.url.trim());
    
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    validUrls.forEach(url => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${url.url}</loc>\n`;
      if (url.lastmod) {
        sitemap += `    <lastmod>${url.lastmod}</lastmod>\n`;
      }
      sitemap += `    <changefreq>${url.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${url.priority}</priority>\n`;
      sitemap += '  </url>\n';
    });
    
    sitemap += '</urlset>';
    return sitemap;
  };

  const copyToClipboard = () => {
    const sitemap = generateSitemap();
    navigator.clipboard.writeText(sitemap);
    toast.success("Sitemap copied to clipboard!");
  };

  const downloadFile = () => {
    const sitemap = generateSitemap();
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Sitemap file downloaded!");
  };

  return (
    <SEOWrapper
      title="XML Sitemap Generator - Create SEO Sitemaps"
      description="Generate XML sitemaps for better search engine indexing. Add URLs with custom priority, change frequency, and last modified dates."
      keywords="sitemap generator, XML sitemap, SEO tools, search engine optimization, website indexing"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            XML Sitemap Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create XML sitemaps to help search engines discover and index your website pages more efficiently.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bulk URL Import</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Label>Paste URLs (one per line)</Label>
                <Textarea
                  value={bulkUrls}
                  onChange={(e) => setBulkUrls(e.target.value)}
                  placeholder="https://example.com/
https://example.com/about/
https://example.com/contact/"
                  rows={6}
                />
                <Button onClick={processBulkUrls} disabled={!bulkUrls.trim()}>
                  Import URLs
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  URL Configuration
                  <Button onClick={addUrl} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add URL
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {urls.map((url, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>URL {index + 1}</Label>
                      {urls.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeUrl(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <Input
                      value={url.url}
                      onChange={(e) => updateUrl(index, 'url', e.target.value)}
                      placeholder="https://example.com/page"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Last Modified</Label>
                        <Input
                          type="date"
                          value={url.lastmod}
                          onChange={(e) => updateUrl(index, 'lastmod', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Priority</Label>
                        <Select
                          value={url.priority}
                          onValueChange={(value) => updateUrl(index, 'priority', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1.0">1.0 (Highest)</SelectItem>
                            <SelectItem value="0.9">0.9</SelectItem>
                            <SelectItem value="0.8">0.8</SelectItem>
                            <SelectItem value="0.7">0.7</SelectItem>
                            <SelectItem value="0.6">0.6</SelectItem>
                            <SelectItem value="0.5">0.5 (Medium)</SelectItem>
                            <SelectItem value="0.4">0.4</SelectItem>
                            <SelectItem value="0.3">0.3</SelectItem>
                            <SelectItem value="0.2">0.2</SelectItem>
                            <SelectItem value="0.1">0.1 (Lowest)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Change Frequency</Label>
                      <Select
                        value={url.changefreq}
                        onValueChange={(value) => updateUrl(index, 'changefreq', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="always">Always</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generated Sitemap</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generateSitemap()}
                  readOnly
                  rows={20}
                  className="font-mono text-sm"
                />
                <div className="flex gap-2 mt-4">
                  <Button onClick={copyToClipboard} className="flex-1">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={downloadFile} variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>

            <AdSenseBox format="rectangle" slot="tool-sidebar" />
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default SitemapGenerator;
