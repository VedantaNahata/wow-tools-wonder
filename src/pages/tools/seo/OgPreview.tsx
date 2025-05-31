
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import AdSenseBox from "@/components/AdSenseBox";
import { Share2, ExternalLink } from "lucide-react";

const OgPreview = () => {
  const [formData, setFormData] = useState({
    title: "Your Page Title",
    description: "This is a description of your page that will appear when shared on social media platforms.",
    image: "https://via.placeholder.com/1200x630/3b82f6/ffffff?text=Your+Image",
    url: "https://yourwebsite.com/page",
    siteName: "Your Website"
  });

  const faqData = [
    {
      question: "What are Open Graph tags?",
      answer: "Open Graph tags are HTML meta tags that control how your content appears when shared on social media platforms like Facebook, Twitter, and LinkedIn."
    },
    {
      question: "What's the ideal image size for Open Graph?",
      answer: "The recommended size is 1200x630 pixels (1.91:1 ratio). This ensures your image displays properly across all platforms."
    },
    {
      question: "How do I add Open Graph tags to my website?",
      answer: "Add the meta tags with property attributes starting with 'og:' in the <head> section of your HTML. Use our Meta Tag Generator for complete code."
    },
    {
      question: "Why isn't my preview updating when I share?",
      answer: "Social platforms cache Open Graph data. Use Facebook's Sharing Debugger or LinkedIn's Post Inspector to refresh the cache."
    }
  ];

  return (
    <SEOWrapper
      title="Open Graph Preview Tool - Social Media Link Preview"
      description="Preview how your link will look when shared on social media platforms with Open Graph meta tags."
      keywords="open graph preview, social media preview, OG tags, link preview, Facebook preview"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Share2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Open Graph Preview Tool
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Preview how your link will look when shared on social media platforms.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Open Graph Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      value={formData.url}
                      onChange={(e) => setFormData({...formData, url: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={formData.siteName}
                      onChange={(e) => setFormData({...formData, siteName: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {/* Facebook Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-600">Facebook Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/400x200/e5e7eb/6b7280?text=Image+Not+Found";
                        }}
                      />
                      <div className="p-4">
                        <div className="text-xs text-gray-500 uppercase mb-1">
                          {new URL(formData.url).hostname}
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                          {formData.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {formData.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Twitter Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-400">Twitter Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/400x200/e5e7eb/6b7280?text=Image+Not+Found";
                        }}
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                          {formData.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {formData.description}
                        </p>
                        <div className="flex items-center text-gray-500 text-sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          {new URL(formData.url).hostname}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* LinkedIn Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-700">LinkedIn Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/400x200/e5e7eb/6b7280?text=Image+Not+Found";
                        }}
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                          {formData.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                          {formData.description}
                        </p>
                        <div className="text-gray-500 text-xs">
                          {formData.siteName} • {new URL(formData.url).hostname}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          <div>
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
          </div>
        </div>

        <ToolFAQ toolName="Open Graph Preview FAQ" faqs={faqData} />
      </div>
    </SEOWrapper>
  );
};

export default OgPreview;
