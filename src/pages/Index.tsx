
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";
import { 
  Text, 
  Image, 
  Search, 
  Code, 
  Book,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const toolCategories = [
    {
      name: "Text Tools",
      description: "Transform and analyze text with powerful utilities",
      icon: Text,
      color: "from-blue-500 to-cyan-500",
      tools: [
        { name: "Case Converter", path: "/tools/text/case-converter", desc: "Convert text case instantly" },
        { name: "Word Counter", path: "/tools/text/word-counter", desc: "Count words, characters, and paragraphs" },
        { name: "Lorem Generator", path: "/tools/text/lorem-generator", desc: "Generate placeholder text" },
      ]
    },
    {
      name: "Image Tools",
      description: "Process and convert images effortlessly",
      icon: Image,
      color: "from-purple-500 to-pink-500",
      tools: [
        { name: "Base64 Converter", path: "/tools/image/base64-converter", desc: "Convert images to Base64" },
        { name: "Image Compressor", path: "/tools/image/image-compressor", desc: "Compress images for web" },
      ]
    },
    {
      name: "Web & SEO Tools",
      description: "Optimize your website for search engines",
      icon: Search,
      color: "from-green-500 to-emerald-500",
      tools: [
        { name: "Meta Tag Generator", path: "/tools/seo/meta-tag-generator", desc: "Generate SEO meta tags" },
        { name: "Robots.txt Tester", path: "/tools/seo/robots-tester", desc: "Validate robots.txt files" },
      ]
    },
    {
      name: "Code Tools",
      description: "Format, minify, and validate your code",
      icon: Code,
      color: "from-orange-500 to-red-500",
      tools: [
        { name: "JSON Formatter", path: "/tools/code/json-formatter", desc: "Format and validate JSON" },
        { name: "CSS Beautifier", path: "/tools/code/css-beautifier", desc: "Format and beautify CSS" },
      ]
    },
    {
      name: "Math & Conversion",
      description: "Calculate and convert units with precision",
      icon: Book,
      color: "from-indigo-500 to-purple-500",
      tools: [
        { name: "Unit Converter", path: "/tools/math/unit-converter", desc: "Convert between units" },
        { name: "Age Calculator", path: "/tools/math/age-calculator", desc: "Calculate age precisely" },
      ]
    },
    {
      name: "Color Tools",
      description: "Work with colors and create palettes",
      icon: Book,
      color: "from-pink-500 to-rose-500",
      tools: [
        { name: "Color Picker", path: "/tools/color/color-picker", desc: "Pick and explore colors" },
        { name: "Hex Converter", path: "/tools/color/hex-converter", desc: "Convert color formats" },
      ]
    }
  ];

  return (
    <SEOWrapper 
      title="Free Online Tools for Developers & Designers"
      description="WowsomeTools offers 20+ free online tools for developers, designers, and digital professionals. Text tools, image converters, SEO utilities, code formatters, and more."
      keywords="online tools, developer tools, text converter, image tools, SEO tools, code formatter, color picker, free utilities"
    >
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                WowsomeTools
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Your ultimate collection of free online tools for developers, designers, 
                and digital professionals. All tools work directly in your browser.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="#tools">
                    Explore Tools <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <AdSenseBox format="horizontal" slot="hero-banner" className="mb-8" />
          </div>
        </section>

        {/* Tools Categories */}
        <section id="tools" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Choose Your Tool Category
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover powerful utilities organized by category. Each tool is optimized 
                for performance and works entirely in your browser.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {toolCategories.map((category) => (
                <Card key={category.name} className="category-card group">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mb-4`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <div className="space-y-2">
                      {category.tools.map((tool) => (
                        <Link
                          key={tool.path}
                          to={tool.path}
                          className="block p-2 rounded hover:bg-muted/50 transition-colors"
                        >
                          <div className="font-medium text-sm">{tool.name}</div>
                          <div className="text-xs text-muted-foreground">{tool.desc}</div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <AdSenseBox format="rectangle" slot="category-sidebar" />
              <div className="lg:col-span-2">
                <Card className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    All Tools Are Free Forever
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    No registration required. No hidden fees. All tools work directly 
                    in your browser without uploading data to our servers.
                  </p>
                  <Button size="lg" asChild>
                    <Link to="/tools/text/case-converter">
                      Try Our Most Popular Tool
                    </Link>
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SEOWrapper>
  );
};

export default Index;
