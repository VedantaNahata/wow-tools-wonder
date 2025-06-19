import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { Copy, RotateCcw, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DuplicateLineRemover = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [duplicatesCount, setDuplicatesCount] = useState(0);
  const { toast } = useToast();

  const removeDuplicates = () => {
    const lines = inputText.split("\n");
    const originalCount = lines.length;
    const uniqueLines = [...new Set(lines)];
    const duplicates = originalCount - uniqueLines.length;

    setOutputText(uniqueLines.join("\n"));
    setDuplicatesCount(duplicates);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: "Text with duplicates removed copied to clipboard.",
    });
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
    setDuplicatesCount(0);
  };

  const faqs = [
    {
      question: "What is a duplicate line remover tool?",
      answer:
        "A duplicate line remover tool scans your input text and automatically deletes repeated lines, keeping only unique entries. It's ideal for cleaning up lists, code, and large text blocks.",
    },
    {
      question: "How do I use the duplicate line remover online?",
      answer:
        "Paste your text into the input box, click the remove duplicates button, and instantly get a cleaned-up version with all duplicate lines eliminated.",
    },
    {
      question: "Is this duplicate line remover free to use?",
      answer:
        "Yes, this tool is completely free and online. You don't need to register or download anything to remove duplicate lines from your text.",
    },
    {
      question: "Can I remove duplicate lines from large text files?",
      answer:
        "Absolutely. The tool is optimized to handle large volumes of text, making it suitable for developers, writers, and data analysts who work with big datasets or logs.",
    },
    {
      question: "Why should I remove duplicate lines from my text?",
      answer:
        "Removing duplicate lines ensures clean formatting, reduces errors in code or data processing, and improves readability and performance in scripts or documents.",
    },
  ];

  return (
    <SEOWrapper
      title="Free Online Duplicate Line Remover - Clean Up Text Instantly"
      description="Use this free online duplicate line remover to instantly delete repeated lines from your text. Perfect for cleaning lists, code, logs, or documents. Fast, easy, and no sign-up needed."
      keywords="free online duplicate line remover, duplicate line remover, remove duplicate lines from text, delete repeated lines tool, text deduplication online, clean up text tool, remove duplicate entries online"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Duplicate Line Remover
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Remove duplicate lines from your text, code, or data. Keep only
            unique lines and clean up your content instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Remove Duplicate Lines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your text with duplicate lines here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-32"
                />

                <Button
                  onClick={removeDuplicates}
                  disabled={!inputText.trim()}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Duplicates
                </Button>

                {outputText && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Cleaned Text:</span>
                        <Badge variant="secondary">
                          {duplicatesCount} duplicates removed
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={copyToClipboard}
                        >
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

            <ToolFAQ toolName="Duplicate Line Remover" faqs={faqs} />
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-medium text-muted-foreground mb-1">
                      Before:
                    </div>
                    <div className="bg-muted p-2 rounded text-xs font-mono">
                      apple
                      <br />
                      banana
                      <br />
                      apple
                      <br />
                      orange
                      <br />
                      banana
                      <br />
                      grape
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-muted-foreground mb-1">
                      After:
                    </div>
                    <div className="bg-muted p-2 rounded text-xs font-mono">
                      apple
                      <br />
                      banana
                      <br />
                      orange
                      <br />
                      grape
                    </div>
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

export default DuplicateLineRemover;
