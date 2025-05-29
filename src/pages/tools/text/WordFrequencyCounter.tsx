
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { BarChart3, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WordFrequency {
  word: string;
  count: number;
  percentage: number;
}

const WordFrequencyCounter = () => {
  const [inputText, setInputText] = useState("");
  const [wordFrequencies, setWordFrequencies] = useState<WordFrequency[]>([]);
  const [totalWords, setTotalWords] = useState(0);
  const { toast } = useToast();

  const analyzeText = () => {
    if (!inputText.trim()) return;

    // Clean and split text into words
    const words = inputText
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove punctuation
      .split(/\s+/)
      .filter(word => word.length > 0);

    const total = words.length;
    const frequencyMap = new Map<string, number>();

    // Count frequencies
    words.forEach(word => {
      frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    });

    // Convert to array and calculate percentages
    const frequencies: WordFrequency[] = Array.from(frequencyMap.entries())
      .map(([word, count]) => ({
        word,
        count,
        percentage: (count / total) * 100
      }))
      .sort((a, b) => b.count - a.count); // Sort by frequency

    setWordFrequencies(frequencies);
    setTotalWords(total);
    
    toast({
      title: "Analysis Complete!",
      description: `Found ${frequencies.length} unique words in ${total} total words.`,
    });
  };

  const clearText = () => {
    setInputText("");
    setWordFrequencies([]);
    setTotalWords(0);
  };

  const faqs = [
    {
      question: "How does word frequency analysis work?",
      answer: "The tool counts how many times each unique word appears in your text and calculates the percentage of total words each represents."
    },
    {
      question: "Are words case-sensitive?",
      answer: "No, the analysis converts all words to lowercase, so 'Word' and 'word' are counted as the same word."
    },
    {
      question: "How are punctuation marks handled?",
      answer: "Punctuation marks are removed before analysis, so 'word,' and 'word' are treated as the same word."
    },
    {
      question: "What's the minimum word length counted?",
      answer: "All words are counted regardless of length, including single-letter words like 'a' and 'I'."
    }
  ];

  return (
    <SEOWrapper
      title="Word Frequency Counter - Analyze Text Word Usage"
      description="Free online word frequency counter. Analyze text to see how often each word appears. Perfect for content analysis and SEO optimization."
      keywords="word frequency counter, text analysis, word usage, content analysis, text statistics"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Word Frequency Counter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Analyze your text to see how frequently each word appears. Perfect for 
            content analysis, SEO optimization, and understanding word usage patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analyze Word Frequency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your text here to analyze word frequency..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-32"
                />
                
                <div className="flex gap-2">
                  <Button 
                    onClick={analyzeText} 
                    disabled={!inputText.trim()}
                    className="flex-1"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analyze Text
                  </Button>
                  <Button variant="outline" onClick={clearText}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                </div>

                {wordFrequencies.length > 0 && (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Total words: {totalWords} | Unique words: {wordFrequencies.length}
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto border rounded">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Word</TableHead>
                            <TableHead>Count</TableHead>
                            <TableHead>Percentage</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {wordFrequencies.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-mono">{item.word}</TableCell>
                              <TableCell>{item.count}</TableCell>
                              <TableCell>{item.percentage.toFixed(2)}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <ToolFAQ toolName="Word Frequency Counter" faqs={faqs} />
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Analysis Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Case-insensitive counting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Punctuation removal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Frequency percentage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Sorted by popularity</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default WordFrequencyCounter;
