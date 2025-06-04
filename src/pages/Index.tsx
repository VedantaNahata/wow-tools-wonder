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
  Archive,
  Globe,
  Bot,
  Ruler,
  Calendar,
  Pipette,
  Hash,
  FileCode,
  MapPin,
  Eye,
  Link as LinkIcon,
  Monitor,
  AlertTriangle,
  ImageOff,
  Tags,
  Percent,
  SquareAsterisk,
  Timer,
  Plus,
  Thermometer,
  Table,
  PaintBucket,
  Contrast,
  Shuffle,
  Layers,
  Droplet,
  Hash as HashIcon,
  Undo
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

  const handleExploreClick = () => {
    const element = document.getElementById('tools');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
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
          route: "/text/case-converter",
          color: "from-blue-500 to-cyan-500"
        },
        {
          name: "Word Counter",
          description: "Count words, characters, paragraphs, and reading time in your text.",
          icon: FileText,
          route: "/text/word-counter",
          color: "from-green-500 to-emerald-500"
        },
        {
          name: "Text Reverser",
          description: "Reverse entire text or individual words with multiple reversal options.",
          icon: RotateCcw,
          route: "/text/text-reverser",
          color: "from-purple-500 to-pink-500"
        },
        {
          name: "Text Cleaner",
          description: "Remove extra spaces, line breaks, and clean up messy text formatting.",
          icon: Eraser,
          route: "/text/text-cleaner",
          color: "from-orange-500 to-red-500"
        },
        {
          name: "Lorem Generator",
          description: "Generate Lorem Ipsum placeholder text for your design projects.",
          icon: FileText,
          route: "/text/lorem-generator",
          color: "from-violet-500 to-purple-500"
        },
        {
          name: "Duplicate Line Remover",
          description: "Remove duplicate lines from text - perfect for cleaning up lists and code.",
          icon: Copy,
          route: "/text/duplicate-line-remover",
          color: "from-indigo-500 to-purple-500"
        },
        {
          name: "Text Sorter",
          description: "Sort lines alphabetically (A-Z, Z-A) or numerically with multiple options.",
          icon: ArrowUpDown,
          route: "/text/text-sorter",
          color: "from-pink-500 to-rose-500"
        },
        {
          name: "Word Frequency Counter",
          description: "Analyze text and see how often each word appears with detailed statistics.",
          icon: BarChart3,
          route: "/text/word-frequency-counter",
          color: "from-teal-500 to-cyan-500"
        },
        {
          name: "Find and Replace",
          description: "Search for specific text and replace it with new content instantly.",
          icon: SearchIcon,
          route: "/text/find-and-replace",
          color: "from-amber-500 to-orange-500"
        },
        {
          name: "Text Encryptor",
          description: "Encrypt and decrypt text using Caesar cipher or Base64 encoding methods.",
          icon: Shield,
          route: "/text/text-encryptor",
          color: "from-red-500 to-pink-500"
        },
        {
          name: "Text to Binary",
          description: "Convert text to binary code and binary back to text with ease.",
          icon: Binary,
          route: "/text/text-to-binary",
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
          route: "/image/base64-converter",
          color: "from-purple-500 to-pink-500"
        },
        {
          name: "Image Compressor",
          description: "Compress images to reduce file size while maintaining quality.",
          icon: Archive,
          route: "/image/image-compressor",
          color: "from-green-500 to-emerald-500"
        }
      ]
    },
    seo: {
      name: "Web & SEO Tools",
      description: "Optimize your website for search engines",
      icon: Search,
      color: "from-green-500 to-emerald-500",
      initialCount: 4,
      tools: [
        {
          name: "Meta Tag Generator",
          description: "Create SEO-optimized meta tags for titles, descriptions, Open Graph, and Twitter Cards.",
          icon: Tags,
          route: "/seo/meta-tag-generator",
          color: "from-green-500 to-emerald-500"
        },
        {
          name: "Robots.txt Generator",
          description: "Generate customizable robots.txt files for controlling search engine crawlers.",
          icon: FileCode,
          route: "/seo/robots-generator",
          color: "from-blue-500 to-cyan-500"
        },
        {
          name: "Sitemap Generator",
          description: "Create simple XML sitemaps from a list of URLs for better search indexing.",
          icon: MapPin,
          route: "/seo/sitemap-generator",
          color: "from-purple-500 to-pink-500"
        },
        {
          name: "Open Graph Preview Tool",
          description: "Preview how your link will look when shared on social media platforms.",
          icon: Eye,
          route: "/seo/og-preview",
          color: "from-orange-500 to-red-500"
        },
        {
          name: "URL Redirect Checker",
          description: "Check the redirect path of any URL (301, 302, etc.) and analyze redirect chains.",
          icon: LinkIcon,
          route: "/seo/redirect-checker",
          color: "from-indigo-500 to-purple-500"
        },
        {
          name: "SERP Snippet Preview",
          description: "Simulate how your page title & meta description will appear in search results.",
          icon: Monitor,
          route: "/seo/serp-preview",
          color: "from-pink-500 to-rose-500"
        },
        {
          name: "Page Size Checker",
          description: "Calculate the size of a given URL's content and resource weight analysis.",
          icon: BarChart3,
          route: "/seo/page-size-checker",
          color: "from-teal-500 to-cyan-500"
        },
        {
          name: "Broken Link Checker",
          description: "Scan pasted HTML code for broken anchor tags and invalid links.",
          icon: AlertTriangle,
          route: "/seo/broken-link-checker",
          color: "from-red-500 to-pink-500"
        },
        {
          name: "Alt Tag Checker",
          description: "Check for missing or empty alt attributes in pasted image HTML code.",
          icon: ImageOff,
          route: "/seo/alt-tag-checker",
          color: "from-amber-500 to-orange-500"
        },
        {
          name: "HTML Meta Tag Analyzer",
          description: "Analyze pasted HTML code and extract all SEO-relevant meta tags.",
          icon: Code,
          route: "/seo/meta-tag-analyzer",
          color: "from-violet-500 to-purple-500"
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
          route: "/code/json-formatter",
          color: "from-orange-500 to-red-500"
        },
        {
          name: "CSS Beautifier",
          description: "Format and beautify CSS code with proper indentation and structure.",
          icon: Paintbrush,
          route: "/code/css-beautifier",
          color: "from-blue-500 to-cyan-500"
        },
        {
          name: "JavaScript Minifier",
          description: "Minify JavaScript code by removing whitespace and comments.",
          icon: Zap,
          route: "/code/javascript-minifier",
          color: "from-yellow-500 to-orange-500"
        },
        {
          name: "HTML Minifier",
          description: "Remove unnecessary characters and compress HTML code.",
          icon: Minimize2,
          route: "/code/html-minifier",
          color: "from-red-500 to-pink-500"
        }
      ]
    },
    math: {
      name: "Math & Conversion",
      description: "Calculate and convert units with precision",
      icon: Calculator,
      color: "from-indigo-500 to-purple-500",
      initialCount: 4,
      tools: [
        {
          name: "Unit Converter",
          description: "Convert between different units of measurement with precision.",
          icon: Ruler,
          route: "/math/unit-converter",
          color: "from-indigo-500 to-purple-500"
        },
        {
          name: "Age Calculator",
          description: "Calculate age, days lived, and other time-based calculations.",
          icon: Calendar,
          route: "/math/age-calculator",
          color: "from-green-500 to-emerald-500"
        },
        {
          name: "Percentage Calculator",
          description: "Calculate percentage increase, decrease, and proportion values.",
          icon: Percent,
          route: "/math/percentage-calculator",
          color: "from-blue-500 to-cyan-500"
        },
        {
          name: "Scientific Calculator",
          description: "A full-featured calculator with trigonometric, logarithmic, and power functions.",
          icon: Calculator,
          route: "/math/scientific-calculator",
          color: "from-purple-500 to-pink-500"
        },
        {
          name: "Interest Calculator",
          description: "Compute simple and compound interest with given principal, rate, and time.",
          icon: BarChart3,
          route: "/math/interest-calculator",
          color: "from-orange-500 to-red-500"
        },
        {
          name: "Quadratic Equation Solver",
          description: "Solve and visualize roots of quadratic equations.",
          icon: SquareAsterisk,
          route: "/math/quadratic-solver",
          color: "from-teal-500 to-cyan-500"
        },
        {
          name: "Factorial Calculator",
          description: "Enter a number and get its factorial instantly.",
          icon: Plus,
          route: "/math/factorial-calculator",
          color: "from-pink-500 to-rose-500"
        },
        {
          name: "Prime Number Checker",
          description: "Check if a number is prime with detailed explanation.",
          icon: Hash,
          route: "/math/prime-checker",
          color: "from-violet-500 to-purple-500"
        },
        {
          name: "LCM & HCF Finder",
          description: "Calculate Least Common Multiple and Highest Common Factor.",
          icon: ArrowUpDown,
          route: "/math/lcm-hcf-finder",
          color: "from-amber-500 to-orange-500"
        },
        {
          name: "Matrix Calculator",
          description: "Add, subtract, or multiply two matrices.",
          icon: Table,
          route: "/math/matrix-calculator",
          color: "from-slate-500 to-gray-500"
        },
        {
          name: "Number Base Converter",
          description: "Convert between binary, octal, decimal, and hexadecimal.",
          icon: Binary,
          route: "/math/base-converter",
          color: "from-red-500 to-pink-500"
        },
        {
          name: "Algebraic Expression Simplifier",
          description: "Simplify algebraic expressions like 2x + 3x - 5.",
          icon: SquareAsterisk,
          route: "/math/expression-simplifier",
          color: "from-green-500 to-emerald-500"
        }
      ]
    },
    color: {
      name: "Color Tools",
      description: "Work with colors and create palettes",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      initialCount: 4,
      tools: [
        {
          name: "Color Picker",
          description: "Choose any color and get its HEX, RGB, and HSL values instantly.",
          icon: Droplet,
          route: "/color/color-picker",
          color: "from-pink-500 to-rose-500"
        },
        {
          name: "Hex Converter",
          description: "Convert between HEX, RGB, HSL, and other color formats with live preview.",
          icon: Hash,
          route: "/color/hex-converter",
          color: "from-purple-500 to-pink-500"
        },
        {
          name: "Gradient Generator",
          description: "Create linear/radial gradients, adjust direction & colors, and copy CSS code.",
          icon: PaintBucket,
          route: "/color/gradient-generator",
          color: "from-blue-500 to-cyan-500"
        },
        {
          name: "Color Palette Generator",
          description: "Enter a base color and auto-generate 5-tone harmonious palettes.",
          icon: Layers,
          route: "/color/palette-generator",
          color: "from-green-500 to-emerald-500"
        },
        {
          name: "Contrast Checker Tool",
          description: "Enter background and text colors to get accessibility rating (WCAG compliance).",
          icon: Contrast,
          route: "/color/contrast-checker",
          color: "from-orange-500 to-red-500"
        },
        {
          name: "Random Color Generator",
          description: "Click to get a completely random color with its code and preview.",
          icon: Shuffle,
          route: "/color/random-generator",
          color: "from-indigo-500 to-purple-500"
        },
        {
          name: "Shades & Tints Generator",
          description: "Enter one color and get multiple lighter/darker versions.",
          icon: Layers,
          route: "/color/shades-tints",
          color: "from-teal-500 to-cyan-500"
        },
        {
          name: "CSS Color Names Explorer",
          description: "View all 140+ named CSS colors with previews and HEX codes.",
          icon: Eye,
          route: "/color/css-names",
          color: "from-amber-500 to-orange-500"
        },
        {
          name: "Color to Image Generator",
          description: "Convert a solid color to a downloadable image for backgrounds.",
          icon: ImageIcon,
          route: "/color/color-to-image",
          color: "from-red-500 to-pink-500"
        },
        {
          name: "Color Code Extractor",
          description: "Upload an image and extract dominant HEX colors using canvas.",
          icon: Pipette,
          route: "/color/color-extractor",
          color: "from-violet-500 to-purple-500"
        }
      ]
    }
  };

  return (
    <SEOWrapper 
      title="Free Online Tools for Developers & Designers"
      description="WowsomeTools offers 50+ free online tools for developers, designers, and digital professionals. Text tools, image converters, SEO utilities, code formatters, and more."
      keywords="online tools, developer tools, text converter, image tools, SEO tools, code formatter, color picker, free utilities"
    >
      <div className="min-h-screen">
        {/* Hero Section - Full viewport height */}
        <section className="h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 leading-tight">
                Wowsome <span className="text-primary">Tools</span>
              </h1>
              <p className="text-xl md:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
                Your ultimate collection of <span className="text-primary font-semibold">free online tools</span> for developers, designers, 
                and digital professionals. All tools work directly in your browser.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Button size="lg" className="text-lg px-8 py-4 h-auto" onClick={handleExploreClick}>
                  Explore 50+ Tools <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="bg-primary/10 px-3 py-1 rounded-full">✨ No Registration</span>
                <span className="bg-primary/10 px-3 py-1 rounded-full">🚀 Works Offline</span>
                <span className="bg-primary/10 px-3 py-1 rounded-full">🔒 Privacy First</span>
                <span className="bg-primary/10 px-3 py-1 rounded-full">💯 Free Forever</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#tools" className="smooth-scroll text-muted-foreground hover:text-primary transition-colors">
              <ChevronDown className="h-8 w-8" />
            </a>
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
                              <Link to={tool.route} target="_blank" rel="noopener noreferrer">
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
          </div>
        </section>
      </div>
    </SEOWrapper>
  );
};

export default Index;
