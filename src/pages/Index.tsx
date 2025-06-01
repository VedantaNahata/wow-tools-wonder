import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEOWrapper from "@/components/SEOWrapper";
import { useState, useRef } from "react";
import { 
  FileText, 
  Image, 
  Search, 
  Code, 
  Calculator, 
  Palette,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const toolsRef = useRef<HTMLElement>(null);

  const scrollToTools = () => {
    if (toolsRef.current) {
      toolsRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const toggleCategory = (categoryIndex: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryIndex) 
        ? prev.filter(index => index !== categoryIndex)
        : [...prev, categoryIndex]
    );
  };

  const textTools = [
    { name: "Case Converter", description: "Convert text between cases", path: "/text/case-converter", icon: FileText },
    { name: "Word Counter", description: "Count words and characters", path: "/text/word-counter", icon: FileText },
    { name: "Lorem Generator", description: "Generate placeholder text", path: "/text/lorem-generator", icon: FileText },
    { name: "Text Reverser", description: "Reverse your text", path: "/text/text-reverser", icon: FileText },
    { name: "Text Cleaner", description: "Clean and format text", path: "/text/text-cleaner", icon: FileText },
    { name: "Duplicate Line Remover", description: "Remove duplicate lines", path: "/text/duplicate-line-remover", icon: FileText },
    { name: "Text Sorter", description: "Sort lines alphabetically", path: "/text/text-sorter", icon: FileText },
    { name: "Word Frequency Counter", description: "Count word frequency", path: "/text/word-frequency-counter", icon: FileText },
    { name: "Find and Replace", description: "Find and replace text", path: "/text/find-and-replace", icon: Search },
    { name: "Text Encryptor", description: "Encrypt and decrypt text", path: "/text/text-encryptor", icon: FileText },
    { name: "Text to Binary", description: "Convert text to binary", path: "/text/text-to-binary", icon: Code },
  ];

  const imageTools = [
    { name: "Base64 Converter", description: "Convert images to base64", path: "/image/base64-converter", icon: Image },
    { name: "Image Compressor", description: "Compress images", path: "/image/image-compressor", icon: Image },
  ];

  const seoTools = [
    { name: "Meta Tag Generator", description: "Generate SEO meta tags", path: "/seo/meta-tag-generator", icon: Search },
    { name: "Robots.txt Tester", description: "Test robots.txt files", path: "/seo/robots-tester", icon: Search },
    { name: "Robots.txt Generator", description: "Generate robots.txt", path: "/seo/robots-generator", icon: Search },
    { name: "Sitemap Generator", description: "Generate XML sitemaps", path: "/seo/sitemap-generator", icon: Search },
    { name: "Open Graph Preview", description: "Preview social media cards", path: "/seo/og-preview", icon: Search },
    { name: "URL Redirect Checker", description: "Check URL redirects", path: "/seo/redirect-checker", icon: Search },
    { name: "SERP Snippet Preview", description: "Preview search results", path: "/seo/serp-preview", icon: Search },
    { name: "Page Size Checker", description: "Check page size", path: "/seo/page-size-checker", icon: Search },
    { name: "Broken Link Checker", description: "Find broken links", path: "/seo/broken-link-checker", icon: Search },
    { name: "Alt Tag Checker", description: "Check image alt tags", path: "/seo/alt-tag-checker", icon: Search },
    { name: "Meta Tag Analyzer", description: "Analyze meta tags", path: "/seo/meta-tag-analyzer", icon: Search },
  ];

  const codeTools = [
    { name: "JSON Formatter", description: "Format and validate JSON", path: "/code/json-formatter", icon: Code },
    { name: "CSS Beautifier", description: "Format and beautify CSS", path: "/code/css-beautifier", icon: Code },
    { name: "JavaScript Minifier", description: "Minify JavaScript code", path: "/code/javascript-minifier", icon: Code },
    { name: "HTML Minifier", description: "Minify HTML code", path: "/code/html-minifier", icon: Code },
    { name: "HTML Table Generator", description: "Create HTML tables easily", path: "/code/html-table-generator", icon: Code },
    { name: "Excel to HTML Table", description: "Convert Excel to HTML tables", path: "/code/excel-to-html-table", icon: Code },
  ];

  const mathTools = [
    { name: "Unit Converter", description: "Convert between units", path: "/math/unit-converter", icon: Calculator },
    { name: "Age Calculator", description: "Calculate your age", path: "/math/age-calculator", icon: Calculator },
    { name: "Percentage Calculator", description: "Calculate percentages", path: "/math/percentage-calculator", icon: Calculator },
    { name: "Scientific Calculator", description: "Advanced calculator", path: "/math/scientific-calculator", icon: Calculator },
    { name: "Interest Calculator", description: "Calculate compound interest", path: "/math/interest-calculator", icon: Calculator },
    { name: "Quadratic Solver", description: "Solve quadratic equations", path: "/math/quadratic-solver", icon: Calculator },
    { name: "Factorial Calculator", description: "Calculate factorials", path: "/math/factorial-calculator", icon: Calculator },
    { name: "Prime Checker", description: "Check if number is prime", path: "/math/prime-checker", icon: Calculator },
    { name: "LCM & HCF Finder", description: "Find LCM and HCF", path: "/math/lcm-hcf-finder", icon: Calculator },
    { name: "Matrix Calculator", description: "Matrix operations", path: "/math/matrix-calculator", icon: Calculator },
    { name: "Base Converter", description: "Convert number bases", path: "/math/base-converter", icon: Calculator },
    { name: "Expression Simplifier", description: "Simplify expressions", path: "/math/expression-simplifier", icon: Calculator },
  ];

  const colorTools = [
    { name: "Color Picker", description: "Choose colors and get HEX, RGB, HSL values", path: "/color/color-picker", icon: Palette },
    { name: "HEX Converter", description: "Convert between color formats", path: "/color/hex-converter", icon: Palette },
    { name: "Gradient Generator", description: "Create linear/radial gradients with CSS", path: "/color/gradient-generator", icon: Palette },
    { name: "Palette Generator", description: "Generate harmonious color palettes", path: "/color/palette-generator", icon: Palette },
    { name: "Contrast Checker", description: "Check accessibility compliance", path: "/color/contrast-checker", icon: Palette },
    { name: "Random Color Generator", description: "Generate random colors instantly", path: "/color/random-generator", icon: Palette },
    { name: "Shades & Tints Generator", description: "Create lighter/darker color versions", path: "/color/shades-tints", icon: Palette },
    { name: "CSS Color Names", description: "Explore 140+ named CSS colors", path: "/color/css-names", icon: Palette },
    { name: "Color to Image", description: "Convert colors to downloadable images", path: "/color/color-to-image", icon: Palette },
    { name: "Color Extractor", description: "Extract colors from uploaded images", path: "/color/color-extractor", icon: Palette },
  ];

  const toolCategories = [
    {
      title: "Text Tools",
      icon: FileText,
      count: 11,
      iconBg: "from-blue-500 to-cyan-500",
      tools: [
        { name: "Case Converter", path: "/text/case-converter", description: "Convert text between different cases" },
        { name: "Word Counter", path: "/text/word-counter", description: "Count words and characters" },
        { name: "Lorem Generator", path: "/text/lorem-generator", description: "Generate placeholder text" },
        { name: "Text Reverser", path: "/text/text-reverser", description: "Reverse your text" },
        { name: "Text Cleaner", path: "/text/text-cleaner", description: "Clean and format text" },
        { name: "Duplicate Line Remover", path: "/text/duplicate-line-remover", description: "Remove duplicate lines" },
        { name: "Text Sorter", path: "/text/text-sorter", description: "Sort lines alphabetically" },
        { name: "Word Frequency Counter", path: "/text/word-frequency-counter", description: "Count word frequency" },
        { name: "Find and Replace", path: "/text/find-and-replace", description: "Find and replace text" },
        { name: "Text Encryptor", path: "/text/text-encryptor", description: "Encrypt and decrypt text" },
        { name: "Text to Binary", path: "/text/text-to-binary", description: "Convert text to binary" }
      ]
    },
    {
      title: "Color Tools",
      icon: Palette,
      count: 10,
      iconBg: "from-pink-500 to-rose-500",
      tools: [
        { name: "Color Picker", path: "/color/color-picker", description: "Pick and convert colors instantly" },
        { name: "HEX Converter", path: "/color/hex-converter", description: "Convert between color formats" },
        { name: "Gradient Generator", path: "/color/gradient-generator", description: "Create beautiful CSS gradients" },
        { name: "Palette Generator", path: "/color/palette-generator", description: "Generate harmonious color palettes" },
        { name: "Contrast Checker", path: "/color/contrast-checker", description: "Check color accessibility compliance" },
        { name: "Random Generator", path: "/color/random-generator", description: "Generate random colors instantly" },
        { name: "Shades & Tints", path: "/color/shades-tints", description: "Create color variations" },
        { name: "CSS Names", path: "/color/css-names", description: "Explore CSS color names" },
        { name: "Color to Image", path: "/color/color-to-image", description: "Convert colors to images" },
        { name: "Color Extractor", path: "/color/color-extractor", description: "Extract colors from images" }
      ]
    },
    {
      title: "SEO Tools",
      icon: Search,
      count: 11,
      iconBg: "from-purple-500 to-pink-500",
      tools: [
        { name: "Meta Tag Generator", path: "/seo/meta-tag-generator", description: "Generate SEO meta tags" },
        { name: "Robots.txt Tester", path: "/seo/robots-tester", description: "Test robots.txt files" },
        { name: "Robots.txt Generator", path: "/seo/robots-generator", description: "Generate robots.txt" },
        { name: "Sitemap Generator", path: "/seo/sitemap-generator", description: "Generate XML sitemaps" },
        { name: "Open Graph Preview", path: "/seo/og-preview", description: "Preview social media cards" },
        { name: "URL Redirect Checker", path: "/seo/redirect-checker", description: "Check URL redirects" },
        { name: "SERP Snippet Preview", path: "/seo/serp-preview", description: "Preview search results" },
        { name: "Page Size Checker", path: "/seo/page-size-checker", description: "Check page size" },
        { name: "Broken Link Checker", path: "/seo/broken-link-checker", description: "Find broken links" },
        { name: "Alt Tag Checker", path: "/seo/alt-tag-checker", description: "Check image alt tags" },
        { name: "Meta Tag Analyzer", path: "/seo/meta-tag-analyzer", description: "Analyze meta tags" }
      ]
    },
    {
      title: "Code Tools",
      icon: Code,
      count: 8,
      iconBg: "from-orange-500 to-red-500",
      tools: [
        { name: "JSON Formatter", path: "/code/json-formatter", description: "Format and validate JSON" },
        { name: "CSS Beautifier", path: "/code/css-beautifier", description: "Format and beautify CSS code" },
        { name: "JavaScript Minifier", path: "/code/javascript-minifier", description: "Minify JavaScript code" },
        { name: "HTML Minifier", path: "/code/html-minifier", description: "Minify HTML code" },
        { name: "HTML Table Generator", path: "/code/html-table-generator", description: "Create HTML tables easily" },
        { name: "Excel to HTML Table", path: "/code/excel-to-html-table", description: "Convert Excel to HTML tables" }
      ]
    },
    {
      title: "Math Tools",
      icon: Calculator,
      count: 12,
      iconBg: "from-indigo-500 to-purple-500",
      tools: [
        { name: "Unit Converter", path: "/math/unit-converter", description: "Convert between units" },
        { name: "Age Calculator", path: "/math/age-calculator", description: "Calculate your age" },
        { name: "Percentage Calculator", path: "/math/percentage-calculator", description: "Calculate percentages" },
        { name: "Scientific Calculator", path: "/math/scientific-calculator", description: "Advanced calculator" },
        { name: "Interest Calculator", path: "/math/interest-calculator", description: "Calculate compound interest" },
        { name: "Quadratic Solver", path: "/math/quadratic-solver", description: "Solve quadratic equations" },
        { name: "Factorial Calculator", path: "/math/factorial-calculator", description: "Calculate factorials" },
        { name: "Prime Checker", path: "/math/prime-checker", description: "Check if number is prime" },
        { name: "LCM & HCF Finder", path: "/math/lcm-hcf-finder", description: "Find LCM and HCF" },
        { name: "Matrix Calculator", path: "/math/matrix-calculator", description: "Matrix operations" },
        { name: "Base Converter", path: "/math/base-converter", description: "Convert number bases" },
        { name: "Expression Simplifier", path: "/math/expression-simplifier", description: "Simplify expressions" }
      ]
    },
    {
      title: "Image Tools",
      icon: Image,
      count: 2,
      iconBg: "from-green-500 to-emerald-500",
      tools: [
        { name: "Base64 Converter", path: "/image/base64-converter", description: "Convert images to Base64" },
        { name: "Image Compressor", path: "/image/image-compressor", description: "Compress images for web" }
      ]
    }
  ];

  return (
    <SEOWrapper 
      title="WowsomeTools - Free Online Tools for Everyone"
      description="Discover 50+ free online tools for text processing, color manipulation, SEO optimization, code formatting, mathematical calculations, and image editing. No registration required!"
      keywords="free online tools, text tools, color tools, SEO tools, code formatter, calculator, image converter"
    >
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-[pulse_4s_ease-in-out_infinite]"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-[pulse_4s_ease-in-out_infinite] animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-[pulse_4s_ease-in-out_infinite] animation-delay-4000"></div>
          </div>

          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Wowsome<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Tools</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Your ultimate collection of <span className="text-purple-400 font-semibold">50+ free online tools</span> for 
                developers, designers, and digital professionals
              </p>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                <span className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                  ✨ No Registration Required
                </span>
                <span className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                  🚀 Works Offline
                </span>
                <span className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                  🔒 Privacy First
                </span>
              </div>

              <button 
                onClick={scrollToTools}
                className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-pulse hover:animate-none"
              >
                Explore Tools
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
            
            {/* Scroll indicator */}
            <div 
              onClick={scrollToTools}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce hover:animate-pulse"
            >
              <ChevronDown className="h-8 w-8 text-white/70 hover:text-white transition-colors" />
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section ref={toolsRef} className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Powerful Tools for Every Need
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From text processing to color manipulation, we've got you covered with professional-grade tools
              </p>
            </div>

            {/* Tool Categories */}
            <div className="space-y-12">
              {toolCategories.map((category, categoryIndex) => {
                const Icon = category.icon;
                const isExpanded = expandedCategories.includes(categoryIndex);
                const displayedTools = isExpanded ? category.tools : category.tools.slice(0, 6);

                return (
                  <div key={categoryIndex} className="animate-fade-in-up">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-3 bg-gradient-to-r ${category.iconBg} rounded-xl shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                        <p className="text-gray-600">{category.count} professional tools</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                      {displayedTools.map((tool, toolIndex) => (
                        <Link
                          key={toolIndex}
                          to={tool.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group"
                        >
                          <Card className="h-full hover:shadow-xl hover:scale-105 transition-all duration-300 border-gray-200 hover:border-purple-300 bg-white/80 backdrop-blur-sm">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className={`p-2 bg-gradient-to-r ${category.iconBg} rounded-lg shadow-sm`}>
                                    <Icon className="h-5 w-5 text-white" />
                                  </div>
                                  <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                                    {tool.name}
                                  </h4>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ArrowRight className="h-4 w-4 text-purple-600" />
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {tool.description}
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>

                    {category.tools.length > 6 && (
                      <div className="text-center">
                        <Button
                          variant="outline"
                          onClick={() => toggleCategory(categoryIndex)}
                          className="group border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300"
                        >
                          {isExpanded ? (
                            <>
                              Show Less <ChevronUp className="ml-2 h-4 w-4 transition-transform" />
                            </>
                          ) : (
                            <>
                              Show {category.tools.length - 6} More <ChevronDown className="ml-2 h-4 w-4 transition-transform" />
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

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our tools are designed to help you save time and increase productivity
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolCategories.slice(0, 6).map((category, index) => {
                const Icon = category.icon;
                return (
                  <div key={index} className="animate-fade-in-up">
                    <Card className="h-full hover:shadow-xl hover:scale-105 transition-all duration-300 border-gray-200 hover:border-purple-300 bg-white/80 backdrop-blur-sm group">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 bg-gradient-to-r ${category.iconBg} rounded-lg group-hover:scale-110 transition-transform`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">{category.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {category.title === "Text Tools" && "Convert, count, and analyze text"}
                          {category.title === "Color Tools" && "Choose colors and create beautiful designs"}
                          {category.title === "SEO Tools" && "Optimize your website for search engines"}
                          {category.title === "Code Tools" && "Format, minify, and convert code"}
                          {category.title === "Math Tools" && "Calculate, convert, and analyze numbers"}
                          {category.title === "Image Tools" && "Convert, compress, and manipulate images"}
                        </p>
                      </CardContent>
                    </Card>
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
