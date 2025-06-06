
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Eye, Smartphone, Monitor } from "lucide-react";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const SerpPreview = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const maxTitleLength = 60;
  const maxDescriptionLength = 160;
  const maxUrlLength = device === "desktop" ? 70 : 50;

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + "...";
  };

  const formatUrl = (url: string) => {
    if (!url) return "";
    let formatted = url.replace(/^https?:\/\//, "");
    if (formatted.endsWith("/")) {
      formatted = formatted.slice(0, -1);
    }
    return truncateText(formatted, maxUrlLength);
  };

  const getTitleColor = (length: number) => {
    if (length === 0) return "text-gray-400";
    if (length <= 30) return "text-red-500";
    if (length <= 60) return "text-green-500";
    return "text-red-500";
  };

  const getDescriptionColor = (length: number) => {
    if (length === 0) return "text-gray-400";
    if (length <= 120) return "text-red-500";
    if (length <= 160) return "text-green-500";
    return "text-red-500";
  };

  const loadSampleData = () => {
    setTitle("Best SEO Tools for Website Optimization | Free Online Tools");
    setUrl("https://example.com/seo-tools");
    setDescription("Discover powerful SEO tools to optimize your website for search engines. Free online utilities for meta tags, keyword analysis, and technical SEO improvements.");
  };

  const faqs = [
    {
      question: "What's the ideal title length for SEO?",
      answer: "Title tags should be 30-60 characters long. Google typically displays about 60 characters in search results, but this can vary based on the actual pixel width of characters."
    },
    {
      question: "How long should meta descriptions be?",
      answer: "Meta descriptions should be 120-160 characters. Google may show up to 160 characters, but shorter descriptions often perform better as they're less likely to be truncated."
    },
    {
      question: "Do SERP snippets look different on mobile?",
      answer: "Yes, mobile search results have less space, so titles and descriptions may be truncated earlier. URLs are also shorter on mobile devices."
    },
    {
      question: "How accurate is this preview?",
      answer: "This preview simulates how your page might appear in Google search results, but the actual appearance can vary based on search query, user location, and Google's algorithms."
    }
  ];

  return (
    <SEOWrapper
      title="Google SERP Snippet Preview - Search Result Preview Tool"
      description="Preview how your page title and meta description will appear in Google search results. Optimize your SERP snippets for better click-through rates."
      keywords="SERP preview, Google search preview, search snippet, title tag preview, meta description preview, CTR optimization"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Google SERP Snippet Preview
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Preview how your page will appear in Google search results and optimize for better click-through rates.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Enter Your Page Details</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={device === "desktop" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDevice("desktop")}
                  >
                    <Monitor className="h-4 w-4 mr-1" />
                    Desktop
                  </Button>
                  <Button
                    variant={device === "mobile" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDevice("mobile")}
                  >
                    <Smartphone className="h-4 w-4 mr-1" />
                    Mobile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadSampleData}
                  >
                    Load Sample
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="title">Page Title</Label>
                    <Badge variant={title.length <= maxTitleLength ? "default" : "destructive"}>
                      {title.length}/{maxTitleLength}
                    </Badge>
                  </div>
                  <Input
                    id="title"
                    placeholder="Enter your page title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={getTitleColor(title.length)}
                  />
                  {title.length > maxTitleLength && (
                    <p className="text-sm text-red-500">
                      Title is too long and may be truncated in search results
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">Page URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com/page"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="description">Meta Description</Label>
                    <Badge variant={description.length <= maxDescriptionLength ? "default" : "destructive"}>
                      {description.length}/{maxDescriptionLength}
                    </Badge>
                  </div>
                  <Textarea
                    id="description"
                    placeholder="Enter your meta description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className={getDescriptionColor(description.length)}
                  />
                  {description.length > maxDescriptionLength && (
                    <p className="text-sm text-red-500">
                      Description is too long and may be truncated in search results
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  {device === "desktop" ? "Desktop" : "Mobile"} SERP Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`border rounded-lg p-4 bg-white ${device === "mobile" ? "max-w-sm" : "max-w-2xl"}`}>
                  {/* Search result snippet */}
                  <div className="space-y-1">
                    {/* URL */}
                    <div className="text-sm text-green-700">
                      {formatUrl(url) || "example.com/page"}
                    </div>
                    
                    {/* Title */}
                    <div className="text-blue-600 text-lg leading-tight hover:underline cursor-pointer">
                      {truncateText(title || "Your Page Title Will Appear Here", 
                                   device === "desktop" ? maxTitleLength : 50)}
                    </div>
                    
                    {/* Description */}
                    <div className="text-gray-600 text-sm leading-relaxed">
                      {truncateText(description || "Your meta description will appear here. This text helps users understand what your page is about before they click.", 
                                   device === "desktop" ? maxDescriptionLength : 130)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
                  <strong>Preview Notes:</strong>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>• Title: {title.length > 0 ? `${title.length} characters` : "No title entered"}</li>
                    <li>• Description: {description.length > 0 ? `${description.length} characters` : "No description entered"}</li>
                    <li>• URL: {url ? "Valid URL format" : "No URL entered"}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
            
            <Card>
              <CardHeader>
                <CardTitle>SERP Optimization Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>Title Best Practices:</strong>
                  <ul className="mt-1 space-y-1 text-muted-foreground">
                    <li>• Include target keywords early</li>
                    <li>• Make it compelling and clickable</li>
                    <li>• Keep it under 60 characters</li>
                    <li>• Avoid keyword stuffing</li>
                  </ul>
                </div>
                <div>
                  <strong>Description Tips:</strong>
                  <ul className="mt-1 space-y-1 text-muted-foreground">
                    <li>• Summarize page content clearly</li>
                    <li>• Include a call-to-action</li>
                    <li>• Use 120-160 characters</li>
                    <li>• Match search intent</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <ToolFAQ toolName="SERP Snippet Preview" faqs={faqs} />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default SerpPreview;
