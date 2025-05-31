
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Search, Star } from "lucide-react";

const SerpPreview = () => {
  const [formData, setFormData] = useState({
    title: "Your Page Title - Brand Name",
    description: "This is your meta description that will appear in Google search results. It should be compelling and descriptive.",
    url: "https://yourwebsite.com/page-url"
  });

  const formatUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return `${urlObj.hostname}${urlObj.pathname}`;
    } catch {
      return url;
    }
  };

  const faqData = [
    {
      question: "What is a SERP snippet?",
      answer: "A SERP (Search Engine Results Page) snippet is how your webpage appears in Google search results, consisting of a title, URL, and description."
    },
    {
      question: "What's the ideal length for title tags?",
      answer: "Title tags should be 50-60 characters to avoid truncation in search results. Google typically displays about 600 pixels worth of text."
    },
    {
      question: "How long should meta descriptions be?",
      answer: "Meta descriptions should be 150-160 characters. Google may show longer descriptions for some queries, but this range works well for most cases."
    },
    {
      question: "Can I control how my snippet appears?",
      answer: "You can influence it with title tags and meta descriptions, but Google may choose different text from your page content if it better matches the search query."
    }
  ];

  return (
    <SEOWrapper
      title="Google SERP Snippet Preview - Search Result Preview Tool"
      description="Simulate how your page title and meta description will appear in Google search results."
      keywords="SERP preview, Google search preview, search snippet, title tag preview, meta description preview"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Google SERP Snippet Preview
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simulate how your page will appear in Google search results.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Page Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title Tag</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      maxLength={60}
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {formData.title.length}/60 characters
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Meta Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      maxLength={160}
                      rows={4}
                    />
                    <div className="text-sm text-muted-foreground mt-1">
                      {formData.description.length}/160 characters
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="url">Page URL</Label>
                    <Input
                      id="url"
                      value={formData.url}
                      onChange={(e) => setFormData({...formData, url: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Google Search Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border rounded-lg p-6">
                    {/* Search bar mockup */}
                    <div className="flex items-center space-x-3 mb-6 pb-4 border-b">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">G</span>
                      </div>
                      <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-gray-600">
                        your search query
                      </div>
                    </div>

                    {/* SERP snippet */}
                    <div className="space-y-1">
                      <div className="text-sm text-green-700">
                        {formatUrl(formData.url)}
                      </div>
                      <h3 className="text-xl text-blue-600 hover:underline cursor-pointer line-clamp-2">
                        {formData.title || "Your Page Title"}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {formData.description || "Your meta description will appear here..."}
                      </p>
                    </div>

                    {/* Additional features mockup */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <Star className="h-3 w-3 fill-gray-300 text-gray-300" />
                        </div>
                        <span>Rating: 4.2 · ‎Review by 234 users</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Price range: $$ · Fast delivery
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Tips for Better Results:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Keep titles under 60 characters</li>
                      <li>• Write compelling meta descriptions</li>
                      <li>• Include your target keywords naturally</li>
                      <li>• Make titles unique for each page</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
          </div>
        </div>

        <ToolFAQ toolName="SERP Preview FAQ" faqs={faqData} />
      </div>
    </SEOWrapper>
  );
};

export default SerpPreview;
