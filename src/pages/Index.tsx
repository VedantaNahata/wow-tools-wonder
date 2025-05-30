
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEOWrapper from "@/components/SEOWrapper";
import { 
  Text, 
  Image, 
  Search, 
  Code, 
  Calculator,
  ArrowRight,
  Palette,
  ChevronDown,
  ChevronUp,
  Type, 
  FileText, 
  RotateCcw, 
  Eraser, 
  Copy, 
  ArrowUpDown, 
  BarChart3, 
  SearchIcon, 
  Shield, 
  Binary,
  Zap,
  Paintbrush,
  Minimize2,
  Braces,
  ImageIcon,
  Compress,
  Globe,
  Bot,
  Ruler,
  Calendar,
  Eyedropper,
  Hash
} from "lucide-react";

const Index = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  const toolCategories = {
    text: {
      name: "Text Tools",
      description: "Transform and analyze text with powerful utilities",
      icon: Text,
      color: "from-blue-500 to-cyan-500",
      initialCount: 4,
      tools: [
        {
          name: "Case Converter",
          description: "Convert text between uppercase, lowercase, title case, and more formats instantly.",
          icon: Type,
          route: "/tools/text/case-converter",
          color: "from-blue-500 to-cyan-500"
        },
        {
          name: "Word Counter",
          description: "Count words, characters, paragraphs, and reading time in your text.",
          icon: FileText,
          route: "/tools/text/word-counter",
          color: "from-green-500 to-emerald-500"
        },
        {
          name: "Text Reverser",
          description: "Reverse entire text or individual words with multiple reversal options.",
          icon: RotateCcw,
          route: "/tools/text/text-reverser",
          color: "from-purple-500 to-pink-500"
        },
        {
          name: "Text Cleaner",
          description: "Remove extra spaces, line breaks, and clean up messy text formatting.",
          icon: Eraser,
          route: "/tools/text/text-cleaner",
          color: "from-orange-500 to-red-500"
        },
        {
          name: "Lorem Generator",
          description: "Generate Lorem Ipsum placeholder text for your design projects.",
          icon: FileText,
          route: "/tools/text/lorem-generator",
          color: "from-violet-500 to-purple-500"
        },
        {
          name: "Duplicate Line Remover",
          description: "Remove duplicate lines from text - perfect for cleaning up lists and code.",
          icon: Copy,
          route: "/tools/text/duplicate-line-remover",
          color: "from-indigo-500 to-purple-500"
        },
        {
          name: "Text Sorter",
          description: "Sort lines alphabetically (A-Z, Z-A) or numerically with multiple options.",
          icon: ArrowUpDown,
          route: "/tools/text/text-sorter",
          color: "from-pink-500 to-rose-500"
        },
        {
          name: "Word Frequency Counter",
          description: "Analyze text and see how often each word appears with detailed statistics.",
          icon: BarChart3,
          route: "/tools/text/word-frequency-counter",
          color: "from-teal-500 to-cyan-500"
        },
        {
          name: "Find and Replace",
          description: "Search for specific text and replace it with new content instantly.",
          icon: SearchIcon,
          route: "/tools/text/find-and-replace",
          color: "from-amber-500 to-orange-500"
        },
        {
          name: "Text Encryptor",
          description: "Encrypt and decrypt text using Caesar cipher or Base64 encoding methods.",
          icon: Shield,
          route: "/tools/text/text-encryptor",
          color: "from-red-500 to-pink-500"
        },
        {
          name: "Text to Binary",
          description: "Convert text to binary code and binary back to text with ease.",
          icon: Binary,
          route: "/tools/text/text-to-binary",
          color: "from-slate-500 to-gray-500"
        }
      ]
    },
    image: {
      name: "Image Tools",
      description: "Process and convert images effortlessly",
      icon: Image,
      color: "from-purple-500 to-pink-500",
      initialCount: 2,
      tools: [
        {
          name: "Base64 Converter",
          description: "Convert images to Base64 format and back for web development and data transfer.",
          icon: ImageIcon,
          route: "/tools/image/base64-converter",
          color: "from-purple-500 to-pink-500"
        },
        {
          name: "Image Compressor",
          description: "Compress images to reduce file size while maintaining quality.",
          icon: Compress,
          route: "/tools/image/image-compressor",
          color: "from-green-500 to-emerald-500"
        }
      ]
    },
    seo: {
      name: "Web & SEO Tools",
      description: "Optimize your website for search engines",
      icon: Search,
      color: "from-green-500 to-emerald-500",
      initialCount: 2,
      tools: [
        {
          name: "Meta Tag Generator",
          description: "Generate SEO-friendly meta tags for your website pages.",
          icon: Globe,
          route: "/tools/seo/meta-tag-generator",
          color: "from-green-500 to-emerald-500"
        },
        {
          name: "Robots.txt Tester",
          description: "Test and validate your robots.txt file for proper search engine crawling.",
          icon: Bot,
          route: "/tools/seo/robots-tester",
          color: "from-blue-500 to-cyan-500"
        }
      ]
    },
    code: {
      name: "Code Tools",
      description: "Format, minify, and validate your code",
      icon: Code,
      color: "from-orange-500 to-red-500",
      initialCount: 3,
      tools: [
        {
          name: "JSON Formatter",
          description: "Format, validate, and beautify JSON data with syntax highlighting.",
          icon: Braces,
          route: "/tools/code/json-formatter",
          color: "from-orange-500 to-red-500"
        },
        {
          name: "CSS Beautifier",
          description: "Format and beautify CSS code with proper indentation and structure.",
          icon: Paintbrush,
          route: "/tools/code/css-beautifier",
          color: "from-blue-500 to-cyan-500"
        },
        {
          name: "JavaScript Minifier",
          description: "Minify JavaScript code by removing whitespace and comments.",
          icon: Zap,
          route: "/tools/code/javascript-minifier",
          color: "from-yellow-500 to-orange-500"
        },
        {
          name: "HTML Minifier",
          description: "Remove unnecessary characters and compress HTML code.",
          icon: Minimize2,
          route: "/tools/code/html-minifier",
          color: "from-red-500 to-pink-500"
        }
      ]
    },
    math: {
      name: "Math & Conversion",
      description: "Calculate and convert units with precision",
      icon: Calculator,
      color: "from-indigo-500 to-purple-500",
      initialCount: 2,
      tools: [
        {
          name: "Unit Converter",
          description: "Convert between different units of measurement with precision.",
          icon: Ruler,
          route: "/tools/math/unit-converter",
          color: "from-indigo-500 to-purple-500"
        },
        {
          name: "Age Calculator",
          description: "Calculate age, days lived, and other time-based calculations.",
          icon: Calendar,
          route: "/tools/math/age-calculator",
          color: "from-green-500 to-emerald-500"
        }
      ]
    },
    color: {
      name: "Color Tools",
      description: "Work with colors and create palettes",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      initialCount: 2,
      tools: [
        {
          name: "Color Picker",
          description: "Pick and explore colors with our advanced color picker tool.",
          icon: Eyedropper,
          route: "/tools/color/color-picker",
          color: "from-pink-500 to-rose-500"
        },
        {
          name: "Hex Converter",
          description: "Convert colors between HEX, RGB, HSL, and other color formats.",
          icon: Hash,
          route: "/tools/color/hex-converter",
          color: "from-purple-500 to-pink-500"
        }
      ]
    }
  };

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

        {/* Tools Categories Sections */}
        <section id="tools" className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Choose Your Tools by Category
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover powerful utilities organized by category. Each tool is optimized 
                for performance and works entirely in your browser.
              </p>
            </div>

            <div className="space-y-16">
              {Object.entries(toolCategories).map(([key, category]) => {
                const isExpanded = expandedSections.includes(key);
                const displayedTools = isExpanded ? category.tools : category.tools.slice(0, category.initialCount);
                const hasMoreTools = category.tools.length > category.initialCount;

                return (
                  <div key={key} className="space-y-8">
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${category.color}`}>
                        <category.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                          {category.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium text-sm">
                          {category.tools.length} tools
                        </span>
                      </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {displayedTools.map((tool, index) => (
                        <Card 
                          key={tool.name} 
                          className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 animate-fade-in"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <CardContent className="p-6">
                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${tool.color} mb-4`}>
                              <tool.icon className="h-6 w-6 text-white" />
                            </div>
                            <h4 className="text-lg font-bold text-foreground mb-2">
                              {tool.name}
                            </h4>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                              {tool.description}
                            </p>
                            <Button 
                              variant="outline" 
                              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                              asChild
                            >
                              <Link to={tool.route}>
                                Use Tool
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Show More Button */}
                    {hasMoreTools && (
                      <div className="text-center">
                        <Button 
                          variant="outline"
                          onClick={() => toggleSection(key)}
                          className="px-8 py-2"
                        >
                          {isExpanded ? (
                            <>
                              Show Less
                              <ChevronUp className="ml-2 h-4 w-4" />
                            </>
                          ) : (
                            <>
                              Show {category.tools.length - category.initialCount} More Tools
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
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
