
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Share2 } from "lucide-react";
import { toast } from "sonner";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const OgPreview = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [siteName, setSiteName] = useState("");
  const [type, setType] = useState("website");
  const [platform, setPlatform] = useState("facebook");

  const fetchMetaData = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      // Since we can't make actual HTTP requests due to CORS, we'll show a demo
      toast.info("Demo mode: Enter meta data manually to see preview");
    } catch (error) {
      toast.error("Unable to fetch meta data. Please enter manually.");
    }
  };

  const loadSample = () => {
    setUrl("https://example.com/article");
    setTitle("10 Amazing Web Development Tips That Will Boost Your Productivity");
    setDescription("Discover powerful techniques and tools that professional developers use to write better code faster. Learn industry best practices and modern workflows.");
    setImage("https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630");
    setSiteName("Dev Blog");
  };

  const copyMetaTags = () => {
    const metaTags = `<meta property="og:url" content="${url}">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">
<meta property="og:site_name" content="${siteName}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${url}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${image}">`;
    
    navigator.clipboard.writeText(metaTags);
    toast.success("Meta tags copied to clipboard!");
  };

  const clearAll = () => {
    setUrl("");
    setTitle("");
    setDescription("");
    setImage("");
    setSiteName("");
  };

  const FacebookPreview = () => (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="p-3 border-b bg-gray-50">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Globe className="w-4 h-4" />
          <span>facebook.com</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white font-semibold">U</span>
          </div>
          <div className="flex-1">
            <div className="text-sm">
              <span className="font-semibold">User Name</span>
              <span className="text-gray-500 ml-2">just now</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">Check out this link!</div>
          </div>
        </div>
        
        <div className="mt-3 border rounded-lg overflow-hidden">
          {image && (
            <img 
              src={image} 
              alt="Preview" 
              className="w-full h-48 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          )}
          <div className="p-3 bg-gray-50">
            <div className="text-xs text-gray-500 uppercase">{siteName || 'SITE NAME'}</div>
            <div className="font-semibold text-gray-900 mt-1">{title || 'Page Title'}</div>
            <div className="text-sm text-gray-600 mt-1">{description || 'Page description...'}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const TwitterPreview = () => (
    <div className="border rounded-xl overflow-hidden bg-white">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center">
            <span className="text-white font-semibold">U</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900">User Name</span>
              <span className="text-gray-500">@username</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500">now</span>
            </div>
            <div className="text-gray-900 mt-1">Check out this amazing article!</div>
          </div>
        </div>
        
        <div className="mt-3 border rounded-2xl overflow-hidden">
          {image && (
            <img 
              src={image} 
              alt="Preview" 
              className="w-full h-48 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          )}
          <div className="p-3">
            <div className="text-sm text-gray-500">{new URL(url || 'https://example.com').hostname}</div>
            <div className="font-semibold text-gray-900 mt-1">{title || 'Page Title'}</div>
            <div className="text-sm text-gray-600 mt-1">{description || 'Page description...'}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const LinkedInPreview = () => (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-semibold">UN</span>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">User Name</div>
            <div className="text-sm text-gray-500">Professional Title • 1st</div>
            <div className="text-xs text-gray-500">now</div>
          </div>
        </div>
        <div className="mt-3 text-gray-900">Sharing this great resource!</div>
        
        <div className="mt-3 border rounded-lg overflow-hidden">
          {image && (
            <img 
              src={image} 
              alt="Preview" 
              className="w-full h-48 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          )}
          <div className="p-4">
            <div className="font-semibold text-gray-900">{title || 'Page Title'}</div>
            <div className="text-sm text-gray-600 mt-1">{description || 'Page description...'}</div>
            <div className="text-xs text-gray-500 mt-2">{new URL(url || 'https://example.com').hostname}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const faqs = [
    {
      question: "What are Open Graph tags?",
      answer: "Open Graph tags are HTML meta tags that control how your content appears when shared on social media platforms like Facebook, LinkedIn, and others."
    },
    {
      question: "Why do my previews look different than this tool?",
      answer: "Social media platforms cache previews and may have different rendering. This tool shows how your content should appear based on your meta tags."
    },
    {
      question: "How do I update my preview on social media?",
      answer: "After updating your meta tags, you can use each platform's debugger tool (Facebook Debugger, Twitter Card Validator) to refresh the cache."
    }
  ];

  return (
    <SEOWrapper
      title="Open Graph Preview Tool - Social Media Link Preview"
      description="Preview how your link will look when shared on Facebook, Twitter, and LinkedIn. Test Open Graph meta tags and optimize social media appearance."
      keywords="open graph preview, social media preview, OG tags, link preview, Facebook preview, Twitter cards"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Open Graph Preview Tool
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Preview how your links will look when shared on social media platforms.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>URL & Meta Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter URL to fetch meta data"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={fetchMetaData} variant="outline">
                      <Globe className="w-4 h-4 mr-2" />
                      Fetch
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Page title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        placeholder="Your site name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Page description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Content Type</Label>
                      <Select value={type} onValueChange={setType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="article">Article</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="profile">Profile</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={loadSample} variant="outline">
                      Load Sample
                    </Button>
                    <Button onClick={copyMetaTags} variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Copy Meta Tags
                    </Button>
                    <Button onClick={clearAll} variant="outline">
                      Clear All
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Social Media Preview</CardTitle>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="max-w-lg mx-auto">
                    {platform === 'facebook' && <FacebookPreview />}
                    {platform === 'twitter' && <TwitterPreview />}
                    {platform === 'linkedin' && <LinkedInPreview />}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <ToolFAQ toolName="Open Graph Preview Tool" faqs={faqs} />
            </div>
          </div>
          <div>
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default OgPreview;
