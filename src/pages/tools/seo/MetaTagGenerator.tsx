
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const MetaTagGenerator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [robots, setRobots] = useState("index, follow");
  const [viewport, setViewport] = useState("width=device-width, initial-scale=1");
  const [canonical, setCanonical] = useState("");
  
  // Open Graph
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [ogUrl, setOgUrl] = useState("");
  const [ogType, setOgType] = useState("website");
  const [ogSiteName, setOgSiteName] = useState("");
  
  // Twitter Cards
  const [twitterCard, setTwitterCard] = useState("summary");
  const [twitterSite, setTwitterSite] = useState("");
  const [twitterCreator, setTwitterCreator] = useState("");
  
  // Options
  const [includeBasic, setIncludeBasic] = useState(true);
  const [includeOG, setIncludeOG] = useState(true);
  const [includeTwitter, setIncludeTwitter] = useState(true);
  const [includeSchema, setIncludeSchema] = useState(false);
  
  const [output, setOutput] = useState("");

  const generateMetaTags = () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    let html = "<!-- Basic Meta Tags -->\n";
    
    if (includeBasic) {
      html += `<title>${title}</title>\n`;
      if (description) html += `<meta name="description" content="${description}">\n`;
      if (keywords) html += `<meta name="keywords" content="${keywords}">\n`;
      if (author) html += `<meta name="author" content="${author}">\n`;
      html += `<meta name="robots" content="${robots}">\n`;
      html += `<meta name="viewport" content="${viewport}">\n`;
      if (canonical) html += `<link rel="canonical" href="${canonical}">\n`;
      html += `<meta charset="UTF-8">\n`;
      html += "\n";
    }

    if (includeOG) {
      html += "<!-- Open Graph Meta Tags -->\n";
      html += `<meta property="og:title" content="${ogTitle || title}">\n`;
      html += `<meta property="og:description" content="${ogDescription || description}">\n`;
      html += `<meta property="og:type" content="${ogType}">\n`;
      if (ogUrl) html += `<meta property="og:url" content="${ogUrl}">\n`;
      if (ogImage) html += `<meta property="og:image" content="${ogImage}">\n`;
      if (ogSiteName) html += `<meta property="og:site_name" content="${ogSiteName}">\n`;
      html += "\n";
    }

    if (includeTwitter) {
      html += "<!-- Twitter Card Meta Tags -->\n";
      html += `<meta name="twitter:card" content="${twitterCard}">\n`;
      html += `<meta name="twitter:title" content="${ogTitle || title}">\n`;
      html += `<meta name="twitter:description" content="${ogDescription || description}">\n`;
      if (ogImage) html += `<meta name="twitter:image" content="${ogImage}">\n`;
      if (twitterSite) html += `<meta name="twitter:site" content="${twitterSite}">\n`;
      if (twitterCreator) html += `<meta name="twitter:creator" content="${twitterCreator}">\n`;
      html += "\n";
    }

    if (includeSchema) {
      html += "<!-- JSON-LD Schema Markup -->\n";
      html += '<script type="application/ld+json">\n';
      html += JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": ogUrl || canonical,
        "author": author ? { "@type": "Person", "name": author } : undefined
      }, null, 2);
      html += '\n</script>\n';
    }

    setOutput(html);
    toast.success("Meta tags generated successfully!");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success("Meta tags copied to clipboard!");
  };

  const clearAll = () => {
    setTitle("");
    setDescription("");
    setKeywords("");
    setAuthor("");
    setCanonical("");
    setOgTitle("");
    setOgDescription("");
    setOgImage("");
    setOgUrl("");
    setOgSiteName("");
    setTwitterSite("");
    setTwitterCreator("");
    setOutput("");
  };

  const loadSample = () => {
    setTitle("Amazing Web Development Tools | YourSite");
    setDescription("Discover powerful web development tools and resources to boost your productivity. Free online tools for developers and designers.");
    setKeywords("web development, tools, resources, HTML, CSS, JavaScript");
    setAuthor("Your Name");
    setCanonical("https://yoursite.com/tools");
    setOgTitle("Amazing Web Development Tools");
    setOgDescription("Discover powerful web development tools and resources to boost your productivity.");
    setOgImage("https://yoursite.com/images/tools-preview.jpg");
    setOgUrl("https://yoursite.com/tools");
    setOgSiteName("YourSite");
    setTwitterSite("@yoursite");
    setTwitterCreator("@yourname");
  };

  const faqs = [
    {
      question: "What are meta tags and why are they important?",
      answer: "Meta tags provide information about your webpage to search engines and social media platforms. They help improve SEO rankings and control how your content appears when shared."
    },
    {
      question: "What's the difference between Open Graph and Twitter Cards?",
      answer: "Open Graph is used by Facebook, LinkedIn, and other platforms, while Twitter Cards are specific to Twitter. Both control how your content appears when shared on social media."
    },
    {
      question: "Should I include Schema markup?",
      answer: "Schema markup helps search engines understand your content better and can lead to rich snippets in search results. It's recommended for better SEO."
    }
  ];

  return (
    <SEOWrapper
      title="Meta Tag Generator - Create SEO & Social Media Tags"
      description="Generate SEO-optimized meta tags, Open Graph tags, Twitter Cards, and Schema markup. Improve your website's search engine visibility and social media presence."
      keywords="meta tag generator, SEO tags, open graph, twitter cards, schema markup, meta description"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meta Tag Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate SEO-optimized meta tags including Open Graph, Twitter Cards, and Schema markup.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Meta Tags</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Page Title *</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Your page title (50-60 characters)"
                        maxLength={60}
                      />
                      <div className="text-sm text-muted-foreground">{title.length}/60 characters</div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Author name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Meta Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description of your page (150-160 characters)"
                      maxLength={160}
                      rows={3}
                    />
                    <div className="text-sm text-muted-foreground">{description.length}/160 characters</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords</Label>
                      <Input
                        id="keywords"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="robots">Robots</Label>
                      <Select value={robots} onValueChange={setRobots}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="index, follow">Index, Follow</SelectItem>
                          <SelectItem value="noindex, follow">No Index, Follow</SelectItem>
                          <SelectItem value="index, nofollow">Index, No Follow</SelectItem>
                          <SelectItem value="noindex, nofollow">No Index, No Follow</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="canonical">Canonical URL</Label>
                    <Input
                      id="canonical"
                      value={canonical}
                      onChange={(e) => setCanonical(e.target.value)}
                      placeholder="https://yoursite.com/page"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Open Graph Tags</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ogTitle">OG Title</Label>
                      <Input
                        id="ogTitle"
                        value={ogTitle}
                        onChange={(e) => setOgTitle(e.target.value)}
                        placeholder="Leave empty to use page title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ogType">OG Type</Label>
                      <Select value={ogType} onValueChange={setOgType}>
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

                  <div className="space-y-2">
                    <Label htmlFor="ogDescription">OG Description</Label>
                    <Textarea
                      id="ogDescription"
                      value={ogDescription}
                      onChange={(e) => setOgDescription(e.target.value)}
                      placeholder="Leave empty to use meta description"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ogImage">OG Image URL</Label>
                      <Input
                        id="ogImage"
                        value={ogImage}
                        onChange={(e) => setOgImage(e.target.value)}
                        placeholder="https://yoursite.com/image.jpg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ogUrl">OG URL</Label>
                      <Input
                        id="ogUrl"
                        value={ogUrl}
                        onChange={(e) => setOgUrl(e.target.value)}
                        placeholder="https://yoursite.com/page"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ogSiteName">Site Name</Label>
                    <Input
                      id="ogSiteName"
                      value={ogSiteName}
                      onChange={(e) => setOgSiteName(e.target.value)}
                      placeholder="Your Site Name"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Twitter Cards</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="twitterCard">Card Type</Label>
                      <Select value={twitterCard} onValueChange={setTwitterCard}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="summary">Summary</SelectItem>
                          <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                          <SelectItem value="app">App</SelectItem>
                          <SelectItem value="player">Player</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitterSite">Twitter Site</Label>
                      <Input
                        id="twitterSite"
                        value={twitterSite}
                        onChange={(e) => setTwitterSite(e.target.value)}
                        placeholder="@yoursite"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitterCreator">Twitter Creator</Label>
                      <Input
                        id="twitterCreator"
                        value={twitterCreator}
                        onChange={(e) => setTwitterCreator(e.target.value)}
                        placeholder="@yourname"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Options & Output</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeBasic"
                        checked={includeBasic}
                        onCheckedChange={(checked) => setIncludeBasic(checked === true)}
                      />
                      <Label htmlFor="includeBasic">Basic Tags</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeOG"
                        checked={includeOG}
                        onCheckedChange={(checked) => setIncludeOG(checked === true)}
                      />
                      <Label htmlFor="includeOG">Open Graph</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeTwitter"
                        checked={includeTwitter}
                        onCheckedChange={(checked) => setIncludeTwitter(checked === true)}
                      />
                      <Label htmlFor="includeTwitter">Twitter Cards</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeSchema"
                        checked={includeSchema}
                        onCheckedChange={(checked) => setIncludeSchema(checked === true)}
                      />
                      <Label htmlFor="includeSchema">Schema Markup</Label>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={generateMetaTags} className="flex-1">
                      Generate Meta Tags
                    </Button>
                    <Button onClick={loadSample} variant="outline">
                      Load Sample
                    </Button>
                    <Button onClick={clearAll} variant="outline">
                      Clear All
                    </Button>
                  </div>

                  {output && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="output">Generated Meta Tags</Label>
                        <Button onClick={copyToClipboard} variant="outline" size="sm">
                          Copy Tags
                        </Button>
                      </div>
                      <Textarea
                        id="output"
                        value={output}
                        readOnly
                        className="min-h-[300px] font-mono bg-muted"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <ToolFAQ toolName="Meta Tag Generator" faqs={faqs} />
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

export default MetaTagGenerator;
