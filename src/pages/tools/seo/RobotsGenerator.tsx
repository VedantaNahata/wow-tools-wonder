
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Download, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AdSenseBox from "@/components/AdSenseBox";

interface RobotRule {
  userAgent: string;
  allow: string[];
  disallow: string[];
}

const RobotsGenerator = () => {
  const [rules, setRules] = useState<RobotRule[]>([
    { userAgent: "*", allow: [], disallow: [] }
  ]);
  const [sitemap, setSitemap] = useState("");
  const [crawlDelay, setCrawlDelay] = useState("");
  const [host, setHost] = useState("");

  const addRule = () => {
    setRules([...rules, { userAgent: "", allow: [], disallow: [] }]);
  };

  const removeRule = (index: number) => {
    if (rules.length > 1) {
      setRules(rules.filter((_, i) => i !== index));
    }
  };

  const updateRule = (index: number, field: keyof RobotRule, value: any) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], [field]: value };
    setRules(newRules);
  };

  const addPath = (ruleIndex: number, type: 'allow' | 'disallow', path: string) => {
    if (path.trim()) {
      const newRules = [...rules];
      newRules[ruleIndex][type] = [...newRules[ruleIndex][type], path.trim()];
      setRules(newRules);
    }
  };

  const removePath = (ruleIndex: number, type: 'allow' | 'disallow', pathIndex: number) => {
    const newRules = [...rules];
    newRules[ruleIndex][type] = newRules[ruleIndex][type].filter((_, i) => i !== pathIndex);
    setRules(newRules);
  };

  const generateRobotsTxt = () => {
    let robotsTxt = "";

    rules.forEach(rule => {
      robotsTxt += `User-agent: ${rule.userAgent}\n`;
      
      rule.disallow.forEach(path => {
        robotsTxt += `Disallow: ${path}\n`;
      });
      
      rule.allow.forEach(path => {
        robotsTxt += `Allow: ${path}\n`;
      });
      
      if (crawlDelay) {
        robotsTxt += `Crawl-delay: ${crawlDelay}\n`;
      }
      
      robotsTxt += "\n";
    });

    if (sitemap) {
      robotsTxt += `Sitemap: ${sitemap}\n`;
    }

    if (host) {
      robotsTxt += `Host: ${host}\n`;
    }

    return robotsTxt.trim();
  };

  const copyToClipboard = () => {
    const robotsTxt = generateRobotsTxt();
    navigator.clipboard.writeText(robotsTxt);
    toast.success("Robots.txt copied to clipboard!");
  };

  const downloadFile = () => {
    const robotsTxt = generateRobotsTxt();
    const blob = new Blob([robotsTxt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Robots.txt file downloaded!");
  };

  return (
    <SEOWrapper
      title="Robots.txt Generator - Create Custom Robots.txt Files"
      description="Generate customizable robots.txt files to control search engine crawlers. Add user agents, allow/disallow rules, sitemap URLs, and more."
      keywords="robots.txt generator, robots.txt creator, SEO tools, search engine optimization, web crawlers"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Robots.txt Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate customizable robots.txt files to control how search engine crawlers access your website.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Crawler Rules
                  <Button onClick={addRule} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Rule
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {rules.map((rule, ruleIndex) => (
                  <div key={ruleIndex} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>User Agent</Label>
                      {rules.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeRule(ruleIndex)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <Input
                      value={rule.userAgent}
                      onChange={(e) => updateRule(ruleIndex, 'userAgent', e.target.value)}
                      placeholder="* or specific bot name"
                    />
                    
                    <div>
                      <Label>Disallow Paths</Label>
                      <div className="space-y-2 mt-2">
                        {rule.disallow.map((path, pathIndex) => (
                          <div key={pathIndex} className="flex gap-2">
                            <Input value={path} readOnly />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removePath(ruleIndex, 'disallow', pathIndex)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <div className="flex gap-2">
                          <Input
                            placeholder="/admin/"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addPath(ruleIndex, 'disallow', (e.target as HTMLInputElement).value);
                                (e.target as HTMLInputElement).value = '';
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Allow Paths</Label>
                      <div className="space-y-2 mt-2">
                        {rule.allow.map((path, pathIndex) => (
                          <div key={pathIndex} className="flex gap-2">
                            <Input value={path} readOnly />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removePath(ruleIndex, 'allow', pathIndex)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <div className="flex gap-2">
                          <Input
                            placeholder="/public/"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                addPath(ruleIndex, 'allow', (e.target as HTMLInputElement).value);
                                (e.target as HTMLInputElement).value = '';
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sitemap">Sitemap URL</Label>
                  <Input
                    id="sitemap"
                    value={sitemap}
                    onChange={(e) => setSitemap(e.target.value)}
                    placeholder="https://example.com/sitemap.xml"
                  />
                </div>
                <div>
                  <Label htmlFor="crawlDelay">Crawl Delay (seconds)</Label>
                  <Input
                    id="crawlDelay"
                    type="number"
                    value={crawlDelay}
                    onChange={(e) => setCrawlDelay(e.target.value)}
                    placeholder="10"
                  />
                </div>
                <div>
                  <Label htmlFor="host">Preferred Host</Label>
                  <Input
                    id="host"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generated Robots.txt</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={generateRobotsTxt()}
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

export default RobotsGenerator;
