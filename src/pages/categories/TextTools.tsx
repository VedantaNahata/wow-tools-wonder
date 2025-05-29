
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEOWrapper from "@/components/SEOWrapper";
import AdSenseBox from "@/components/AdSenseBox";
import { 
  Type, 
  RotateCcw, 
  Eraser, 
  Copy, 
  ArrowUpDown, 
  BarChart3, 
  Search, 
  Shield, 
  Binary,
  FileText,
  ArrowRight
} from "lucide-react";

const TextTools = () => {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_TOOLS_COUNT = 6;

  const textTools = [
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
      icon: Search,
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
    },
    {
      name: "Lorem Generator",
      description: "Generate Lorem Ipsum placeholder text for your design projects.",
      icon: FileText,
      route: "/tools/text/lorem-generator",
      color: "from-violet-500 to-purple-500"
    }
  ];

  const displayedTools = showAll ? textTools : textTools.slice(0, INITIAL_TOOLS_COUNT);

  return (
    <SEOWrapper
      title="Text Tools - Free Online Text Processing Utilities"
      description="Complete collection of free online text tools. Convert case, count words, reverse text, remove duplicates, sort lines, and more. Perfect for writers and developers."
      keywords="text tools, case converter, word counter, text reverser, duplicate remover, text sorter, online text utilities"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Text Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Powerful collection of free online text processing tools. Transform, analyze, 
            and manipulate text with our comprehensive suite of utilities.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
              {textTools.length} Tools Available
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
              100% Free
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tools Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {displayedTools.map((tool) => (
                <Card key={tool.name} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${tool.color} mb-4`}>
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {tool.name}
                    </h3>
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
            {!showAll && textTools.length > INITIAL_TOOLS_COUNT && (
              <div className="text-center">
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setShowAll(true)}
                  className="px-8"
                >
                  Show {textTools.length - INITIAL_TOOLS_COUNT} More Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="category-sidebar" />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {textTools.slice(0, 4).map((tool) => (
                  <Link 
                    key={tool.name}
                    to={tool.route}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <tool.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{tool.name}</span>
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    No registration required
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Process text instantly
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Privacy-focused
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    Mobile-friendly
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default TextTools;
