
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Tags, Share2, Link as LinkIcon, Image, FileText, Globe, Eye } from "lucide-react";
import AdSenseBox from "@/components/AdSenseBox";

const SeoTools = () => {
  const tools = [
    {
      title: "Meta Tag Generator",
      description: "Create SEO-optimized meta tags for titles, descriptions, Open Graph, and Twitter Cards",
      icon: Tags,
      path: "/seo/meta-tag-generator",
      category: "Meta Tags"
    },
    {
      title: "Meta Tag Analyzer",
      description: "Analyze HTML code to extract and evaluate SEO-relevant meta tags",
      icon: Search,
      path: "/seo/meta-tag-analyzer",
      category: "Meta Tags"
    },
    {
      title: "Open Graph Preview",
      description: "Preview how your link will look when shared on social media platforms",
      icon: Share2,
      path: "/seo/og-preview",
      category: "Social Media"
    },
    {
      title: "Alt Tag Checker",
      description: "Check for missing or empty alt attributes in pasted image HTML code",
      icon: Image,
      path: "/seo/alt-tag-checker",
      category: "Content Analysis"
    },
    {
      title: "Robots.txt Generator",
      description: "Generate robots.txt files to control search engine crawling",
      icon: FileText,
      path: "/seo/robots-generator",
      category: "Technical SEO"
    },
    {
      title: "Robots.txt Tester",
      description: "Test and validate your robots.txt file for proper syntax",
      icon: FileText,
      path: "/seo/robots-tester",
      category: "Technical SEO"
    },
    {
      title: "Sitemap Generator",
      description: "Generate XML sitemaps for better search engine indexing",
      icon: Globe,
      path: "/seo/sitemap-generator",
      category: "Technical SEO"
    },
    {
      title: "URL Redirect Checker",
      description: "Check the redirect path of any URL (301, 302, etc.) and analyze redirect chains",
      icon: LinkIcon,
      path: "/seo/redirect-checker",
      category: "Technical SEO"
    },
    {
      title: "SERP Snippet Preview",
      description: "Simulate how your page title & meta description will appear in search results",
      icon: Eye,
      path: "/seo/serp-preview",
      category: "Search Results"
    },
    {
      title: "Page Size Checker",
      description: "Calculate the size of a given URL's content and resource weight analysis",
      icon: Globe,
      path: "/seo/page-size-checker",
      category: "Performance"
    },
    {
      title: "Broken Link Checker",
      description: "Scan pasted HTML code for broken anchor tags and invalid links",
      icon: LinkIcon,
      path: "/seo/broken-link-checker",
      category: "Content Analysis"
    }
  ];

  const categories = Array.from(new Set(tools.map(tool => tool.category)));

  return (
    <SEOWrapper
      title="SEO Tools - Free Search Engine Optimization Utilities"
      description="Free SEO tools for website optimization including meta tag generators, robots.txt tools, sitemap generators, and link checkers. Improve your search rankings."
      keywords="seo tools, meta tags, robots.txt, sitemap generator, open graph, broken link checker, redirect checker"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            SEO Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive SEO tools to optimize your website for search engines.
            Generate meta tags, check links, analyze content, and improve your search rankings.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="category-header" className="mb-12" />

        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-2xl font-semibold text-foreground mb-6 border-b pb-2">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools
                  .filter(tool => tool.category === category)
                  .map((tool) => (
                    <Card key={tool.path} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <tool.icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{tool.title}</CardTitle>
                        </div>
                        <CardDescription className="text-sm leading-relaxed">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button asChild className="w-full">
                          <Link to={tool.path}>
                            Use Tool
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <AdSenseBox format="horizontal" slot="category-footer" />
        </div>
      </div>
    </SEOWrapper>
  );
};

export default SeoTools;
