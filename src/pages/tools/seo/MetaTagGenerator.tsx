
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Copy, Tags } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const MetaTagGenerator = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    keywords: "",
    author: "",
    url: "",
    image: "",
    siteName: "",
    type: "website",
    twitterCard: "summary_large_image",
    robots: "index, follow"
  });

  const [generatedTags, setGeneratedTags] = useState("");
  const { toast } = useToast();

  const generateTags = () => {
    const tags = [];

    // Basic meta tags
    if (formData.title) {
      tags.push(`<title>${formData.title}</title>`);
      tags.push(`<meta name="title" content="${formData.title}" />`);
    }
    
    if (formData.description) {
      tags.push(`<meta name="description" content="${formData.description}" />`);
    }
    
    if (formData.keywords) {
      tags.push(`<meta name="keywords" content="${formData.keywords}" />`);
    }
    
    if (formData.author) {
      tags.push(`<meta name="author" content="${formData.author}" />`);
    }
    
    tags.push(`<meta name="robots" content="${formData.robots}" />`);

    // Open Graph tags
    if (formData.title) {
      tags.push(`<meta property="og:title" content="${formData.title}" />`);
    }
    
    if (formData.description) {
      tags.push(`<meta property="og:description" content="${formData.description}" />`);
    }
    
    tags.push(`<meta property="og:type" content="${formData.type}" />`);
    
    if (formData.url) {
      tags.push(`<meta property="og:url" content="${formData.url}" />`);
    }
    
    if (formData.image) {
      tags.push(`<meta property="og:image" content="${formData.image}" />`);
    }
    
    if (formData.siteName) {
      tags.push(`<meta property="og:site_name" content="${formData.siteName}" />`);
    }

    // Twitter Card tags
    tags.push(`<meta name="twitter:card" content="${formData.twitterCard}" />`);
    
    if (formData.title) {
      tags.push(`<meta name="twitter:title" content="${formData.title}" />`);
    }
    
    if (formData.description) {
      tags.push(`<meta name="twitter:description" content="${formData.description}" />`);
    }
    
    if (formData.image) {
      tags.push(`<meta name="twitter:image" content="${formData.image}" />`);
    }

    // Additional meta tags
    tags.push(`<meta charset="UTF-8" />`);
    tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`);

    setGeneratedTags(tags.join('\n'));
  };

  const copyTags = async () => {
    try {
      await navigator.clipboard.writeText(generatedTags);
      toast({
        title: "Copied!",
        description: "Meta tags copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy meta tags",
        variant: "destructive",
      });
    }
  };

  const faqData = [
    {
      question: "What are meta tags and why are they important?",
      answer: "Meta tags provide information about your webpage to search engines and social media platforms. They help improve SEO rankings and control how your content appears when shared."
    },
    {
      question: "What's the ideal length for title and description tags?",
      answer: "Title tags should be 50-60 characters, and meta descriptions should be 150-160 characters for optimal display in search results."
    },
    {
      question: "What are Open Graph tags?",
      answer: "Open Graph tags control how your content appears when shared on social media platforms like Facebook, Twitter, and LinkedIn."
    },
    {
      question: "Should I include keywords in meta tags?",
      answer: "While keyword meta tags have less SEO value today, they can still be useful for organization. Focus more on natural, descriptive titles and descriptions."
    }
  ];

  return (
    <SEOWrapper
      title="Meta Tag Generator - Generate SEO Meta Tags"
      description="Generate SEO-optimized meta tags for your website. Create title tags, meta descriptions, Open Graph tags, and Twitter cards."
      keywords="meta tag generator, SEO tags, open graph, twitter cards, meta description"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
              <Tags className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Meta Tag Generator
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate SEO-optimized meta tags for your website including Open Graph and Twitter cards.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Website Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Page Title</Label>
                    <Input
                      id="title"
                      placeholder="Your Page Title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="url">Page URL</Label>
                    <Input
                      id="url"
                      placeholder="https://example.com/page"
                      value={formData.url}
                      onChange={(e) => setFormData({...formData, url: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Meta Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of your page content"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      id="keywords"
                      placeholder="keyword1, keyword2, keyword3"
                      value={formData.keywords}
                      onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      placeholder="Author Name"
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      placeholder="Your Site Name"
                      value={formData.siteName}
                      onChange={(e) => setFormData({...formData, siteName: e.target.value})}
                    />
                  </div>
                </div>

                <Button onClick={generateTags} className="w-full">
                  Generate Meta Tags
                </Button>
              </CardContent>
            </Card>

            {generatedTags && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Generated Meta Tags</CardTitle>
                    <Button onClick={copyTags} size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{generatedTags}</code>
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div>
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
          </div>
        </div>

        <ToolFAQ toolName="Meta Tag Generator FAQ" faqs={faqData} />
      </div>
    </SEOWrapper>
  );
};

export default MetaTagGenerator;
