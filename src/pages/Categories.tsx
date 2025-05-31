
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
  const handleSmoothScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const categories = [
    {
      id: "text",
      title: "Text Tools",
      icon: FileText,
      description: "Powerful text manipulation, conversion, and analysis tools",
      color: "from-blue-500 to-cyan-500",
      count: "11 Tools",
      tools: [
        { name: "Case Converter", path: "/text/case-converter" },
        { name: "Word Counter", path: "/text/word-counter" },
        { name: "Lorem Generator", path: "/text/lorem-generator" },
        { name: "Text Reverser", path: "/text/text-reverser" },
        { name: "Text Cleaner", path: "/text/text-cleaner" },
        { name: "Duplicate Line Remover", path: "/text/duplicate-line-remover" },
        { name: "Text Sorter", path: "/text/text-sorter" },
        { name: "Word Frequency Counter", path: "/text/word-frequency-counter" },
        { name: "Find and Replace", path: "/text/find-and-replace" },
        { name: "Text Encryptor", path: "/text/text-encryptor" },
        { name: "Text to Binary", path: "/text/text-to-binary" }
      ]
    },
    {
      id: "color",
      title: "Color Tools", 
      icon: Palette,
      description: "Complete color management, conversion, and design tools",
      color: "from-pink-500 to-rose-500",
      count: "10 Tools",
      tools: [
        { name: "Color Picker", path: "/color/color-picker" },
        { name: "HEX Converter", path: "/color/hex-converter" },
        { name: "Gradient Generator", path: "/color/gradient-generator" },
        { name: "Palette Generator", path: "/color/palette-generator" },
        { name: "Contrast Checker", path: "/color/contrast-checker" },
        { name: "Random Generator", path: "/color/random-generator" },
        { name: "Shades & Tints", path: "/color/shades-tints" },
        { name: "CSS Names", path: "/color/css-names" },
        { name: "Color to Image", path: "/color/color-to-image" },
        { name: "Color Extractor", path: "/color/color-extractor" }
      ]
    },
    {
      id: "seo",
      title: "SEO & Web Tools",
      icon: Search,
      description: "Essential SEO analysis and web optimization tools",
      color: "from-purple-500 to-pink-500", 
      count: "11 Tools",
      tools: [
        { name: "Meta Tag Generator", path: "/seo/meta-tag-generator" },
        { name: "Robots.txt Tester", path: "/seo/robots-tester" },
        { name: "Robots.txt Generator", path: "/seo/robots-generator" },
        { name: "Sitemap Generator", path: "/seo/sitemap-generator" },
        { name: "Open Graph Preview", path: "/seo/og-preview" },
        { name: "URL Redirect Checker", path: "/seo/redirect-checker" },
        { name: "SERP Preview", path: "/seo/serp-preview" },
        { name: "Page Size Checker", path: "/seo/page-size-checker" },
        { name: "Broken Link Checker", path: "/seo/broken-link-checker" },
        { name: "Alt Tag Checker", path: "/seo/alt-tag-checker" },
        { name: "Meta Tag Analyzer", path: "/seo/meta-tag-analyzer" }
      ]
    },
    {
      id: "code",
      title: "Code Tools",
      icon: Code,
      description: "Code formatting, minification, and development utilities",
      color: "from-orange-500 to-red-500",
      count: "6 Tools", 
      tools: [
        { name: "JSON Formatter", path: "/code/json-formatter" },
        { name: "CSS Beautifier", path: "/code/css-beautifier" },
        { name: "JavaScript Minifier", path: "/code/javascript-minifier" },
        { name: "HTML Minifier", path: "/code/html-minifier" },
        { name: "HTML Table Generator", path: "/code/html-table-generator" },
        { name: "Excel to HTML Table", path: "/code/excel-to-html-table" }
      ]
    },
    {
      id: "math",
      title: "Math & Conversion Tools",
      icon: Calculator,
      description: "Mathematical calculators and unit conversion tools",
      color: "from-indigo-500 to-purple-500",
      count: "12 Tools",
      tools: [
        { name: "Unit Converter", path: "/math/unit-converter" },
        { name: "Age Calculator", path: "/math/age-calculator" },
        { name: "Percentage Calculator", path: "/math/percentage-calculator" },
        { name: "Scientific Calculator", path: "/math/scientific-calculator" },
        { name: "Interest Calculator", path: "/math/interest-calculator" },
        { name: "Quadratic Solver", path: "/math/quadratic-solver" },
        { name: "Factorial Calculator", path: "/math/factorial-calculator" },
        { name: "Prime Checker", path: "/math/prime-checker" },
        { name: "LCM & HCF Finder", path: "/math/lcm-hcf-finder" },
        { name: "Matrix Calculator", path: "/math/matrix-calculator" },
        { name: "Base Converter", path: "/math/base-converter" },
        { name: "Expression Simplifier", path: "/math/expression-simplifier" }
      ]
    },
    {
      id: "image",
      title: "Image Tools",
      icon: Image,
      description: "Image processing, conversion, and optimization tools",
      color: "from-green-500 to-emerald-500",
      count: "2 Tools",
      tools: [
        { name: "Base64 Converter", path: "/image/base64-converter" },
        { name: "Image Compressor", path: "/image/image-compressor" }
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
          <div className="space-y-16">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <section key={index} id={category.id} className="scroll-mt-20">
                  <Card className="hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 group">
                    <CardHeader className="pb-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`p-4 bg-gradient-to-r ${category.color} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-3xl group-hover:text-primary transition-colors">
                              {category.title}
                            </CardTitle>
                            <div className="text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                              {category.count}
                            </div>
                          </div>
                          <p className="text-muted-foreground group-hover:text-foreground transition-colors mt-2 text-lg">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.tools.map((tool, toolIndex) => (
                          <Link 
                            key={toolIndex} 
                            to={tool.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/tool"
                          >
                            <div className="p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-accent/50 transition-all duration-200 group-hover/tool:scale-105 group-hover/tool:shadow-lg">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-foreground group-hover/tool:text-primary transition-colors">
                                  {tool.name}
                                </span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/tool:text-primary transition-colors" />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </section>
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
