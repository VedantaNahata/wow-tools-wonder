import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SEOWrapper from "@/components/SEOWrapper";
import AdSenseBox from "@/components/AdSenseBox";

const Index = () => {
  const tools = [
    // Text Tools
    { name: "Case Converter", description: "Convert text between cases", path: "/text/case-converter" },
    { name: "Word Counter", description: "Count words and characters", path: "/text/word-counter" },
    { name: "Lorem Generator", description: "Generate placeholder text", path: "/text/lorem-generator" },
    { name: "Text Reverser", description: "Reverse your text", path: "/text/text-reverser" },
    { name: "Text Cleaner", description: "Clean and format text", path: "/text/text-cleaner" },
    { name: "Duplicate Line Remover", description: "Remove duplicate lines", path: "/text/duplicate-line-remover" },
    { name: "Text Sorter", description: "Sort lines alphabetically", path: "/text/text-sorter" },
    { name: "Word Frequency Counter", description: "Count word frequency", path: "/text/word-frequency-counter" },
    { name: "Find and Replace", description: "Find and replace text", path: "/text/find-and-replace" },
    { name: "Text Encryptor", description: "Encrypt and decrypt text", path: "/text/text-encryptor" },
    { name: "Text to Binary", description: "Convert text to binary", path: "/text/text-to-binary" },
    
    // Image Tools
    { name: "Base64 Converter", description: "Convert images to base64", path: "/image/base64-converter" },
    { name: "Image Compressor", description: "Compress images", path: "/image/image-compressor" },
    
    // Web & SEO Tools
    { name: "Meta Tag Generator", description: "Generate SEO meta tags", path: "/seo/meta-tag-generator" },
    { name: "Robots.txt Tester", description: "Test robots.txt files", path: "/seo/robots-tester" },
    { name: "Robots.txt Generator", description: "Generate robots.txt", path: "/seo/robots-generator" },
    { name: "Sitemap Generator", description: "Generate XML sitemaps", path: "/seo/sitemap-generator" },
    { name: "Open Graph Preview", description: "Preview social media cards", path: "/seo/og-preview" },
    { name: "URL Redirect Checker", description: "Check URL redirects", path: "/seo/redirect-checker" },
    { name: "SERP Snippet Preview", description: "Preview search results", path: "/seo/serp-preview" },
    { name: "Page Size Checker", description: "Check page size", path: "/seo/page-size-checker" },
    { name: "Broken Link Checker", description: "Find broken links", path: "/seo/broken-link-checker" },
    { name: "Alt Tag Checker", description: "Check image alt tags", path: "/seo/alt-tag-checker" },
    { name: "Meta Tag Analyzer", description: "Analyze meta tags", path: "/seo/meta-tag-analyzer" },
    
    // Code Tools
    { name: "JSON Formatter", description: "Format and validate JSON", path: "/code/json-formatter" },
    { name: "CSS Beautifier", description: "Format and beautify CSS", path: "/code/css-beautifier" },
    { name: "JavaScript Minifier", description: "Minify JavaScript code", path: "/code/javascript-minifier" },
    { name: "HTML Minifier", description: "Minify HTML code", path: "/code/html-minifier" },
    
    // Math & Conversion Tools
    { name: "Unit Converter", description: "Convert between units", path: "/math/unit-converter" },
    { name: "Age Calculator", description: "Calculate your age", path: "/math/age-calculator" },
    { name: "Percentage Calculator", description: "Calculate percentages", path: "/math/percentage-calculator" },
    { name: "Scientific Calculator", description: "Advanced calculator", path: "/math/scientific-calculator" },
    { name: "Interest Calculator", description: "Calculate compound interest", path: "/math/interest-calculator" },
    { name: "Quadratic Solver", description: "Solve quadratic equations", path: "/math/quadratic-solver" },
    { name: "Factorial Calculator", description: "Calculate factorials", path: "/math/factorial-calculator" },
    { name: "Prime Checker", description: "Check if number is prime", path: "/math/prime-checker" },
    { name: "LCM & HCF Finder", description: "Find LCM and HCF", path: "/math/lcm-hcf-finder" },
    { name: "Matrix Calculator", description: "Matrix operations", path: "/math/matrix-calculator" },
    { name: "Base Converter", description: "Convert number bases", path: "/math/base-converter" },
    { name: "Expression Simplifier", description: "Simplify expressions", path: "/math/expression-simplifier" },
    
    // Color Tools
    { name: "Color Picker", description: "Pick and convert colors", path: "/color/color-picker" },
    { name: "Hex Converter", description: "Convert color formats", path: "/color/hex-converter" },
  ];

  return (
    <SEOWrapper
      title="WowsomeTools - Free Online Tools for Everyone"
      description="A collection of free online tools for text, images, SEO, code, math, and more. Boost your productivity with our easy-to-use tools."
      keywords="online tools, free tools, text tools, image tools, SEO tools, code tools, math tools, conversion tools"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Welcome to WowsomeTools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive suite of free online tools designed to simplify your
            daily tasks.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <section id="tools" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Link key={index} to={tool.path}>
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle>{tool.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>

        <AdSenseBox format="horizontal" slot="tool-footer" className="mt-8" />
      </div>
    </SEOWrapper>
  );
};

export default Index;
