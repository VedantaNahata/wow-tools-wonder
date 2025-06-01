
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEOWrapper from "@/components/SEOWrapper";
import { useState } from "react";
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
  const [showAllText, setShowAllText] = useState(false);
  const [showAllImage, setShowAllImage] = useState(false);
  const [showAllSeo, setShowAllSeo] = useState(false);
  const [showAllCode, setShowAllCode] = useState(false);
  const [showAllMath, setShowAllMath] = useState(false);
  const [showAllColor, setShowAllColor] = useState(false);

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
    { name: "Hex Converter", description: "Convert between color formats", path: "/color/hex-converter", icon: Palette },
    { name: "Gradient Generator", description: "Create linear/radial gradients with CSS", path: "/color/gradient-generator", icon: Palette },
    { name: "Color Palette Generator", description: "Generate harmonious color palettes", path: "/color/palette-generator", icon: Palette },
    { name: "Contrast Checker", description: "Check accessibility compliance", path: "/color/contrast-checker", icon: Palette },
    { name: "Random Color Generator", description: "Generate random colors instantly", path: "/color/random-generator", icon: Palette },
    { name: "Shades & Tints Generator", description: "Create lighter/darker color versions", path: "/color/shades-tints", icon: Palette },
    { name: "CSS Color Names", description: "Explore 140+ named CSS colors", path: "/color/css-names", icon: Palette },
    { name: "Color to Image", description: "Convert colors to downloadable images", path: "/color/color-to-image", icon: Palette },
    { name: "Color Extractor", description: "Extract colors from uploaded images", path: "/color/color-extractor", icon: Palette },
  ];

  const handleExploreClick = () => {
    const toolsSection = document.getElementById('tools-section');
    if (toolsSection) {
      toolsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const CategorySection = ({ 
    title, 
    icon: Icon, 
    tools, 
    showAll, 
    setShowAll, 
    iconColor 
  }: {
    title: string;
    icon: any;
    tools: any[];
    showAll: boolean;
    setShowAll: (show: boolean) => void;
    iconColor: string;
  }) => {
    const displayTools = showAll ? tools : tools.slice(0, 6);
    
    return (
      <div className="mb-16 animate-fade-in-up">
        <div className="flex items-center gap-4 mb-8">
          <div className={`p-4 ${iconColor} rounded-2xl shadow-lg hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayTools.map((tool, index) => {
            const ToolIcon = tool.icon;
            return (
              <Link key={index} to={tool.path} target="_blank" rel="noopener noreferrer">
                <Card className="hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <ToolIcon className="h-5 w-5 text-primary" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors ml-auto" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{tool.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
        
        {tools.length > 6 && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="gap-2 hover:scale-105 transition-all duration-200"
              size="lg"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show More {title} <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <SEOWrapper
      title="WowsomeTools - Free Online Tools for Everyone"
      description="A collection of free online tools for text, images, SEO, code, math, and more. Boost your productivity with our easy-to-use tools."
      keywords="online tools, free tools, text tools, image tools, SEO tools, code tools, math tools, conversion tools"
    >
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-primary/5 bg-grid-pattern flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <div className="inline-block mb-6">
            <div className="p-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl backdrop-blur-sm animate-pulse">
              <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl">
                <Code className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text">
            WowsomeTools
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            A comprehensive suite of <span className="text-primary font-semibold">free online tools</span> designed to 
            <br className="hidden md:block" />
            simplify your daily tasks and boost productivity
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleExploreClick}
              size="lg" 
              className="gap-2 hover:scale-105 transition-all duration-200 animate-bounce text-lg px-8 py-3 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              Explore Tools <ArrowRight className="h-5 w-5" />
            </Button>
            <Link to="/features">
              <Button variant="outline" size="lg" className="hover:scale-105 transition-all duration-200 text-lg px-8 py-3">
                Learn More
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center animate-fade-in animate-delay-100">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Tools Available</div>
            </div>
            <div className="text-center animate-fade-in animate-delay-200">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Free to Use</div>
            </div>
            <div className="text-center animate-fade-in animate-delay-300">
              <div className="text-3xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Registration Required</div>
            </div>
            <div className="text-center animate-fade-in animate-delay-400">
              <div className="text-3xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Usage Limit</div>
            </div>
          </div>
        </div>
        
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:text-primary transition-colors"
          onClick={handleExploreClick}
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors" />
        </div>
      </div>

      {/* Tools Section */}
      <div id="tools-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful Tools for Every Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our extensive collection of tools organized by category
          </p>
        </div>

        <CategorySection
          title="Text Tools"
          icon={FileText}
          tools={textTools}
          showAll={showAllText}
          setShowAll={setShowAllText}
          iconColor="bg-gradient-to-r from-blue-500 to-cyan-500"
        />

        <CategorySection
          title="Color Tools"
          icon={Palette}
          tools={colorTools}
          showAll={showAllColor}
          setShowAll={setShowAllColor}
          iconColor="bg-gradient-to-r from-pink-500 to-rose-500"
        />

        <CategorySection
          title="SEO & Web Tools"
          icon={Search}
          tools={seoTools}
          showAll={showAllSeo}
          setShowAll={setShowAllSeo}
          iconColor="bg-gradient-to-r from-purple-500 to-pink-500"
        />

        <CategorySection
          title="Code Tools"
          icon={Code}
          tools={codeTools}
          showAll={showAllCode}
          setShowAll={setShowAllCode}
          iconColor="bg-gradient-to-r from-orange-500 to-red-500"
        />

        <CategorySection
          title="Math & Conversion Tools"
          icon={Calculator}
          tools={mathTools}
          showAll={showAllMath}
          setShowAll={setShowAllMath}
          iconColor="bg-gradient-to-r from-indigo-500 to-purple-500"
        />

        <CategorySection
          title="Image Tools"
          icon={Image}
          tools={imageTools}
          showAll={showAllImage}
          setShowAll={setShowAllImage}
          iconColor="bg-gradient-to-r from-green-500 to-emerald-500"
        />
      </div>
    </SEOWrapper>
  );
};

export default Index;
