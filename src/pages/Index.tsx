
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEOWrapper from "@/components/SEOWrapper";
import { 
  Text, 
  Image, 
  Search, 
  Code, 
  Book,
  ArrowRight,
  Palette
} from "lucide-react";

const Index = () => {
  const toolCategories = [
    {
      name: "Text Tools",
      description: "Transform and analyze text with powerful utilities",
      icon: Text,
      color: "from-blue-500 to-cyan-500",
      count: "11+ tools",
      route: "/tools/text/case-converter",
      featured: [
        "Case Converter", "Word Counter", "Text Reverser", "Find & Replace", "Text Encryptor", "Binary Converter"
      ]
    },
    {
      name: "Image Tools",
      description: "Process and convert images effortlessly",
      icon: Image,
      color: "from-purple-500 to-pink-500",
      count: "2+ tools",
      route: "/tools/image/base64-converter",
      featured: [
        "Base64 Converter", "Image Compressor"
      ]
    },
    {
      name: "Web & SEO Tools",
      description: "Optimize your website for search engines",
      icon: Search,
      color: "from-green-500 to-emerald-500",
      count: "2+ tools",
      route: "/tools/seo/meta-tag-generator",
      featured: [
        "Meta Tag Generator", "Robots.txt Tester"
      ]
    },
    {
      name: "Code Tools",
      description: "Format, minify, and validate your code",
      icon: Code,
      color: "from-orange-500 to-red-500",
      count: "2+ tools",
      route: "/tools/code/json-formatter",
      featured: [
        "JSON Formatter", "CSS Beautifier"
      ]
    },
    {
      name: "Math & Conversion",
      description: "Calculate and convert units with precision",
      icon: Book,
      color: "from-indigo-500 to-purple-500",
      count: "2+ tools",
      route: "/tools/math/unit-converter",
      featured: [
        "Unit Converter", "Age Calculator"
      ]
    },
    {
      name: "Color Tools",
      description: "Work with colors and create palettes",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      count: "2+ tools",
      route: "/tools/color/color-picker",
      featured: [
        "Color Picker", "Hex Converter"
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
          </div>
        </section>

        {/* Tools Categories */}
        <section id="tools" className="py-20 bg-background">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolCategories.map((category) => (
                <Card key={category.name} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardContent className="p-8">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${category.color} mb-6`}>
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-foreground">
                        {category.name}
                      </h3>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                        {category.count}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      {category.featured.map((tool, index) => (
                        <div key={index} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mr-3"></div>
                          {tool}
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <Link to={category.route}>
                        Explore {category.name}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-16">
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-8">
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
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </SEOWrapper>
  );
};

export default Index;
