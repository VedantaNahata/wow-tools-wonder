import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
      .replace(/[^\w\s]/g, "") // Remove punctuation
      .split(/\s+/)
      .filter((word) => word.length > 0);

    const total = words.length;
    const frequencyMap = new Map<string, number>();

    // Count frequencies
    words.forEach((word) => {
      frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    });

    // Convert to array and calculate percentages
    const frequencies: WordFrequency[] = Array.from(frequencyMap.entries())
      .map(([word, count]) => ({
        word,
        count,
        percentage: (count / total) * 100,
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
      question: "What is a word frequency counter tool?",
      answer:
        "A word frequency counter analyzes your text and counts how many times each word appears. It's used to identify the most frequently used words in a paragraph, document, or article.",
    },
    {
      question: "How do I use this free online word frequency counter?",
      answer:
        "Paste your text into the input box and click the count button. The tool will instantly display a list of unique words along with how often each word appears.",
    },
    {
      question: "Why would I need to check word frequency?",
      answer:
        "Writers and editors use word frequency counters to avoid redundancy, improve clarity, and ensure balanced keyword usage in content. It's also used in linguistic analysis and SEO optimization.",
    },
    {
      question: "Is this word frequency counter free and browser-based?",
      answer:
        "Yes, this tool is completely free and runs in your browser. No downloads, sign-ups, or data uploads are required.",
    },
    {
      question: "Can I use this tool for large text blocks or essays?",
      answer:
        "Absolutely. The word frequency counter is optimized to handle large volumes of text, making it perfect for analyzing essays, research papers, articles, or any large content block.",
    },
  ];

  return (
    <SEOWrapper
      title="Free Online Word Frequency Counter - Analyze Word Usage in Text"
      description="Use this free online word frequency counter to analyze your text and find how often each word appears. Perfect for essays, SEO, writing, and research. Fast, browser-based, no login."
      keywords="free online word frequency counter, count word occurrences in text, text frequency analyzer, word usage checker, word frequency tool, most used words in a paragraph, find repeated words"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Word Frequency Counter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Analyze your text to see how frequently each word appears. Perfect
            for content analysis, SEO optimization, and understanding word usage
            patterns.
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
                      Total words: {totalWords} | Unique words:{" "}
                      {wordFrequencies.length}
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
                              <TableCell className="font-mono">
                                {item.word}
                              </TableCell>
                              <TableCell>{item.count}</TableCell>
                              <TableCell>
                                {item.percentage.toFixed(2)}%
                              </TableCell>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </SEOWrapper>
  );
};

export default WordFrequencyCounter;
