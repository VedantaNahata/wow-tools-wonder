
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import SEOWrapper from "@/components/SEOWrapper";
import { 
  Type, 
  Code, 
  Palette, 
  Image, 
  Search, 
  Calculator,
  FileText,
  Settings,
  Zap,
  Globe,
  Hash
} from "lucide-react";

const Features = () => {
  const toolCategories = [
    {
      title: "Text Tools",
      icon: <Type className="h-6 w-6" />,
      description: "Manipulate and transform text with powerful utilities",
      tools: [
        { name: "Case Converter", path: "/text/case-converter", description: "Convert text between different cases" },
        { name: "Word Counter", path: "/text/word-counter", description: "Count words, characters, and paragraphs" },
        { name: "Duplicate Line Remover", path: "/text/duplicate-line-remover", description: "Remove duplicate lines from text" },
        { name: "Find and Replace", path: "/text/find-and-replace", description: "Find and replace text patterns" },
        { name: "Lorem Generator", path: "/text/lorem-generator", description: "Generate Lorem Ipsum placeholder text" },
        { name: "Text Cleaner", path: "/text/text-cleaner", description: "Clean and format text" },
        { name: "Text Encryptor", path: "/text/text-encryptor", description: "Encrypt and decrypt text" },
        { name: "Text Reverser", path: "/text/text-reverser", description: "Reverse text and words" },
        { name: "Text Sorter", path: "/text/text-sorter", description: "Sort lines of text alphabetically" },
        { name: "Text to Binary", path: "/text/text-to-binary", description: "Convert text to binary and vice versa" },
        { name: "Word Frequency Counter", path: "/text/word-frequency-counter", description: "Count word frequency in text" }
      ]
    },
    {
      title: "Code Tools",
      icon: <Code className="h-6 w-6" />,
      description: "Format, validate, and convert code and data",
      tools: [
        { name: "JSON Formatter", path: "/code/json-formatter", description: "Format and validate JSON data" },
        { name: "HTML Table Generator", path: "/code/html-table-generator", description: "Generate HTML tables with styling" },
        { name: "Excel to HTML", path: "/code/excel-to-html", description: "Convert Excel data to HTML tables" },
        { name: "CSV to Table", path: "/code/csv-to-table", description: "Convert CSV data to HTML tables" },
        { name: "CSS Beautifier", path: "/code/css-beautifier", description: "Format and beautify CSS code" },
        { name: "CSS Minifier", path: "/code/css-minifier", description: "Minify CSS code for production" },
        { name: "HTML Beautifier", path: "/code/html-beautifier", description: "Format and beautify HTML code" },
        { name: "HTML Minifier", path: "/code/html-minifier", description: "Minify HTML code for production" },
        { name: "JavaScript Beautifier", path: "/code/javascript-beautifier", description: "Format and beautify JavaScript code" },
        { name: "JavaScript Minifier", path: "/code/javascript-minifier", description: "Minify JavaScript code for production" },
        { name: "JSON to HTML Table", path: "/code/json-to-html-table", description: "Convert JSON to HTML tables" },
        { name: "Markdown Table Generator", path: "/code/markdown-table-generator", description: "Generate Markdown tables" }
      ]
    },
    {
      title: "Color Tools",
      icon: <Palette className="h-6 w-6" />,
      description: "Work with colors, palettes, and gradients",
      tools: [
        { name: "Color Picker", path: "/color/color-picker", description: "Pick and convert colors between formats" },
        { name: "Color Extractor", path: "/color/color-extractor", description: "Extract colors from images" },
        { name: "Color to Image", path: "/color/color-to-image", description: "Generate solid color images" },
        { name: "Contrast Checker", path: "/color/contrast-checker", description: "Check color contrast ratios" },
        { name: "CSS Color Names", path: "/color/css-color-names", description: "Browse CSS named colors" },
        { name: "Gradient Generator", path: "/color/gradient-generator", description: "Create CSS gradients" },
        { name: "HEX Converter", path: "/color/hex-converter", description: "Convert between color formats" },
        { name: "Palette Generator", path: "/color/palette-generator", description: "Generate color palettes" },
        { name: "Random Color Generator", path: "/color/random-color-generator", description: "Generate random colors" },
        { name: "Shades & Tints Generator", path: "/color/shades-tints-generator", description: "Generate color variations" }
      ]
    },
    {
      title: "Image Tools",
      icon: <Image className="h-6 w-6" />,
      description: "Edit, convert, and optimize images",
      tools: [
        { name: "Base64 Converter", path: "/image/base64-converter", description: "Convert images to/from Base64" },
        { name: "Image to Base64", path: "/image/image-to-base64", description: "Convert images to Base64 encoding" },
        { name: "Base64 to Image", path: "/image/base64-to-image", description: "Convert Base64 to images" },
        { name: "Image Resizer", path: "/image/image-resizer", description: "Resize images to specific dimensions" },
        { name: "Format Converter", path: "/image/format-converter", description: "Convert between image formats" }
      ]
    },
    {
      title: "SEO Tools",
      icon: <Search className="h-6 w-6" />,
      description: "Optimize your website for search engines",
      tools: [
        { name: "Robots Tester", path: "/seo/robots-tester", description: "Test robots.txt files" },
        { name: "Alt Tag Checker", path: "/seo/alt-tag-checker", description: "Check image alt tags" },
        { name: "Broken Link Checker", path: "/seo/broken-link-checker", description: "Find broken links on websites" },
        { name: "Meta Tag Analyzer", path: "/seo/meta-tag-analyzer", description: "Analyze webpage meta tags" },
        { name: "Meta Tag Generator", path: "/seo/meta-tag-generator", description: "Generate meta tags for webpages" },
        { name: "OG Preview", path: "/seo/og-preview", description: "Preview Open Graph tags" },
        { name: "Page Size Checker", path: "/seo/page-size-checker", description: "Check webpage loading size" },
        { name: "Redirect Checker", path: "/seo/redirect-checker", description: "Check HTTP redirects" },
        { name: "Robots Generator", path: "/seo/robots-generator", description: "Generate robots.txt files" },
        { name: "SERP Preview", path: "/seo/serp-preview", description: "Preview search engine results" },
        { name: "Sitemap Generator", path: "/seo/sitemap-generator", description: "Generate XML sitemaps" }
      ]
    },
    {
      title: "Math Tools",
      icon: <Calculator className="h-6 w-6" />,
      description: "Mathematical calculations and conversions",
      tools: [
        { name: "Age Calculator", path: "/math/age-calculator", description: "Calculate age and time differences" },
        { name: "Base Converter", path: "/math/base-converter", description: "Convert between number bases" },
        { name: "Expression Simplifier", path: "/math/expression-simplifier", description: "Simplify mathematical expressions" },
        { name: "Factorial Calculator", path: "/math/factorial-calculator", description: "Calculate factorials" },
        { name: "Interest Calculator", path: "/math/interest-calculator", description: "Calculate simple and compound interest" },
        { name: "LCM/HCF Finder", path: "/math/lcm-hcf-finder", description: "Find LCM and HCF of numbers" },
        { name: "Matrix Calculator", path: "/math/matrix-calculator", description: "Perform matrix operations" },
        { name: "Percentage Calculator", path: "/math/percentage-calculator", description: "Calculate percentages" },
        { name: "Prime Checker", path: "/math/prime-checker", description: "Check if numbers are prime" },
        { name: "Quadratic Solver", path: "/math/quadratic-solver", description: "Solve quadratic equations" },
        { name: "Unit Converter", path: "/math/unit-converter", description: "Convert between units" }
      ]
    }
  ];

  return (
    <SEOWrapper
      title="Features - All Available Tools"
      description="Explore our comprehensive collection of text, code, color, image, SEO, and math tools designed to boost your productivity."
      keywords="online tools, text tools, code tools, color tools, image tools, SEO tools, math tools, web utilities"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            All Features & Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our complete collection of productivity tools organized by category. 
            Each tool is designed to save you time and boost your efficiency.
          </p>
        </div>

        <div className="grid gap-8">
          {toolCategories.map((category, index) => (
            <div key={index} className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.tools.map((tool, toolIndex) => (
                  <Card key={toolIndex} className="group hover:shadow-lg transition-all duration-200 hover:scale-105">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {tool.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <CardDescription className="text-sm">
                        {tool.description}
                      </CardDescription>
                      <Button asChild size="sm" className="w-full">
                        <Link to={tool.path}>
                          Try Tool
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SEOWrapper>
  );
};

export default Features;
