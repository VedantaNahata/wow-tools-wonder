
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { Copy, RotateCcw, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextSorter = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [sortType, setSortType] = useState("alphabetical-asc");
  const { toast } = useToast();

  const sortText = () => {
    const lines = inputText.split('\n').filter(line => line.trim() !== '');
    let sortedLines: string[] = [];

    switch (sortType) {
      case "alphabetical-asc":
        sortedLines = lines.sort((a, b) => a.localeCompare(b));
        break;
      case "alphabetical-desc":
        sortedLines = lines.sort((a, b) => b.localeCompare(a));
        break;
      case "numerical-asc":
        sortedLines = lines.sort((a, b) => {
          const numA = parseFloat(a) || 0;
          const numB = parseFloat(b) || 0;
          return numA - numB;
        });
        break;
      case "numerical-desc":
        sortedLines = lines.sort((a, b) => {
          const numA = parseFloat(a) || 0;
          const numB = parseFloat(b) || 0;
          return numB - numA;
        });
        break;
      case "length-asc":
        sortedLines = lines.sort((a, b) => a.length - b.length);
        break;
      case "length-desc":
        sortedLines = lines.sort((a, b) => b.length - a.length);
        break;
      case "random":
        sortedLines = lines.sort(() => Math.random() - 0.5);
        break;
      default:
        sortedLines = lines;
    }

    setOutputText(sortedLines.join('\n'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: "Sorted text copied to clipboard successfully.",
    });
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
  };

  const sortOptions = [
    { value: "alphabetical-asc", label: "Alphabetical (A-Z)" },
    { value: "alphabetical-desc", label: "Alphabetical (Z-A)" },
    { value: "numerical-asc", label: "Numerical (0-9)" },
    { value: "numerical-desc", label: "Numerical (9-0)" },
    { value: "length-asc", label: "Length (Short to Long)" },
    { value: "length-desc", label: "Length (Long to Short)" },
    { value: "random", label: "Random Order" },
  ];

  const faqs = [
    {
      question: "How does alphabetical sorting work?",
      answer: "Alphabetical sorting arranges lines in dictionary order, comparing characters from left to right. It's case-sensitive by default."
    },
    {
      question: "What happens with numerical sorting on non-numbers?",
      answer: "Non-numerical lines are treated as 0 for numerical sorting. For best results with numbers, ensure each line contains only numerical values."
    },
    {
      question: "Does length sorting count all characters?",
      answer: "Yes, length sorting counts all characters including spaces and special characters in each line."
    },
    {
      question: "Are empty lines removed?",
      answer: "Yes, empty lines are automatically filtered out before sorting to provide cleaner results."
    }
  ];

  return (
    <SEOWrapper
      title="Text Sorter - Sort Lines Alphabetically and Numerically"
      description="Free online text sorter tool. Sort lines alphabetically, numerically, by length, or randomly. Perfect for organizing lists and data."
      keywords="text sorter, sort lines, alphabetical sort, numerical sort, organize text, list sorter"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Text Sorter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sort your text lines in various ways: alphabetically, numerically, 
            by length, or randomly. Perfect for organizing lists and data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sort Your Text</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter text lines to sort (one item per line)..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-32"
                />
                
                <div className="flex gap-4">
                  <Select value={sortType} onValueChange={setSortType}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    onClick={sortText} 
                    disabled={!inputText.trim()}
                  >
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Sort
                  </Button>
                </div>

                {outputText && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Sorted Text:</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={copyToClipboard}>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button size="sm" variant="outline" onClick={clearText}>
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Clear
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={outputText}
                      readOnly
                      className="min-h-32"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <ToolFAQ toolName="Text Sorter" faqs={faqs} />
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sort Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {sortOptions.map((option) => (
                    <div key={option.value} className="flex items-center justify-between">
                      <span className="font-medium">{option.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {option.value === sortType ? "Active" : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default TextSorter;
