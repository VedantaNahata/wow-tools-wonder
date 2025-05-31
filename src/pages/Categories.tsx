
import { Link } from "react-router-dom";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Image, 
  Search, 
  Code, 
  Calculator, 
  Palette,
  ArrowRight
} from "lucide-react";

const Categories = () => {
  const categories = [
    {
      title: "Text Tools",
      icon: FileText,
      description: "Powerful text manipulation, conversion, and analysis tools",
      color: "from-blue-500 to-cyan-500",
      count: "11 Tools",
      tools: [
        "Case Converter", "Word Counter", "Lorem Generator", "Text Reverser",
        "Text Cleaner", "Duplicate Line Remover", "Text Sorter", "Word Frequency Counter",
        "Find and Replace", "Text Encryptor", "Text to Binary"
      ]
    },
    {
      title: "Color Tools", 
      icon: Palette,
      description: "Complete color management, conversion, and design tools",
      color: "from-pink-500 to-rose-500",
      count: "10 Tools",
      tools: [
        "Color Picker", "HEX Converter", "Gradient Generator", "Palette Generator",
        "Contrast Checker", "Random Generator", "Shades & Tints", "CSS Names",
        "Color to Image", "Color Extractor"
      ]
    },
    {
      title: "SEO & Web Tools",
      icon: Search,
      description: "Essential SEO analysis and web optimization tools",
      color: "from-purple-500 to-pink-500", 
      count: "11 Tools",
      tools: [
        "Meta Tag Generator", "Robots.txt Tester", "Robots.txt Generator", "Sitemap Generator",
        "Open Graph Preview", "URL Redirect Checker", "SERP Preview", "Page Size Checker",
        "Broken Link Checker", "Alt Tag Checker", "Meta Tag Analyzer"
      ]
    },
    {
      title: "Code Tools",
      icon: Code,
      description: "Code formatting, minification, and development utilities",
      color: "from-orange-500 to-red-500",
      count: "4 Tools", 
      tools: [
        "JSON Formatter", "CSS Beautifier", "JavaScript Minifier", "HTML Minifier"
      ]
    },
    {
      title: "Math & Conversion Tools",
      icon: Calculator,
      description: "Mathematical calculators and unit conversion tools",
      color: "from-indigo-500 to-purple-500",
      count: "12 Tools",
      tools: [
        "Unit Converter", "Age Calculator", "Percentage Calculator", "Scientific Calculator",
        "Interest Calculator", "Quadratic Solver", "Factorial Calculator", "Prime Checker",
        "LCM & HCF Finder", "Matrix Calculator", "Base Converter", "Expression Simplifier"
      ]
    },
    {
      title: "Image Tools",
      icon: Image,
      description: "Image processing, conversion, and optimization tools",
      color: "from-green-500 to-emerald-500",
      count: "2 Tools",
      tools: [
        "Base64 Converter", "Image Compressor"
      ]
    }
  ];

  return (
    <SEOWrapper
      title="Tool Categories - WowsomeTools"
      description="Browse all tool categories on WowsomeTools - Text, Color, SEO, Code, Math, and Image tools."
      keywords="tool categories, text tools, color tools, seo tools, code tools, math tools, image tools"
    >
      <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Tool Categories
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive collection of free online tools organized by category. 
              Find exactly what you need to boost your productivity.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-4 bg-gradient-to-r ${category.color} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                            {category.title}
                          </CardTitle>
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <p className="text-sm text-primary font-medium">{category.count}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {category.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {category.tools.map((tool, toolIndex) => (
                        <div key={toolIndex} className="text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent/50">
                          • {tool}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
              <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                All tools are completely free, require no registration, and work entirely in your browser.
              </p>
              <Link to="/">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium transition-colors gap-2 inline-flex items-center">
                  Browse All Tools <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default Categories;
