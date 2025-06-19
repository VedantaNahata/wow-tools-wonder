import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { Copy, RotateCcw, Search, Replace } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FindAndReplace = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [replaceCount, setReplaceCount] = useState(0);
  const { toast } = useToast();

  const performReplace = () => {
    if (!findText) {
      toast({
        title: "Error",
        description: "Please enter text to find.",
        variant: "destructive",
      });
      return;
    }

    let result = inputText;
    let count = 0;

    if (caseSensitive) {
      // Case-sensitive replacement
      const regex = new RegExp(escapeRegExp(findText), "g");
      result = inputText.replace(regex, (match) => {
        count++;
        return replaceText;
      });
    } else {
      // Case-insensitive replacement
      const regex = new RegExp(escapeRegExp(findText), "gi");
      result = inputText.replace(regex, (match) => {
        count++;
        return replaceText;
      });
    }

    setOutputText(result);
    setReplaceCount(count);

    toast({
      title: "Replacement Complete!",
      description: `${count} instances replaced.`,
    });
  };

  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: "Text with replacements copied to clipboard.",
    });
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
    setFindText("");
    setReplaceText("");
    setReplaceCount(0);
  };

  const faqs = [
    {
      question: "What is a find and replace tool?",
      answer:
        "A find and replace tool allows you to search for specific words, phrases, or characters in your text and replace them with new content instantly. It’s widely used for editing large blocks of text, code, or data.",
    },
    {
      question: "How do I use the free online find and replace tool?",
      answer:
        "Just paste your text into the input field, enter the word or phrase to find, specify the replacement, and click the replace button. Your updated text will appear instantly.",
    },
    {
      question: "Can I find and replace multiple words at once?",
      answer:
        "Yes, advanced find and replace tools allow you to handle multiple replacements in a single operation, improving speed and productivity for bulk text editing.",
    },
    {
      question: "Is this find and replace tool safe and free to use?",
      answer:
        "Absolutely. This is a 100% free online tool with no login or download required. Your data is processed instantly in the browser and is never stored.",
    },
    {
      question: "Why should I use an online find and replace tool?",
      answer:
        "Online find and replace tools are ideal for quick, bulk edits without the need for complex software. They're useful for writers, coders, marketers, and students handling repetitive text changes.",
    },
  ];

  return (
    <SEOWrapper
      title="Free Online Find and Replace Tool - Quickly Edit Text"
      description="Use this free online find and replace tool to search and replace words, phrases, or characters in your text instantly. Perfect for editing documents, code, and lists with ease."
      keywords="free online find and replace tool, find and replace tool, free online bulk find and replace, replace text online, bulk find and replace, search and replace words, edit text instantly online, text replacement tool"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find and Replace Tool
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search for specific text and replace it with new text. Perfect for
            editing documents, code, and making bulk text changes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Find and Replace Text</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-32"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="findText">Find:</Label>
                    <Input
                      id="findText"
                      placeholder="Text to find"
                      value={findText}
                      onChange={(e) => setFindText(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="replaceText">Replace with:</Label>
                    <Input
                      id="replaceText"
                      placeholder="Replacement text"
                      value={replaceText}
                      onChange={(e) => setReplaceText(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="caseSensitive"
                    checked={caseSensitive}
                    onCheckedChange={(checked) =>
                      setCaseSensitive(checked as boolean)
                    }
                  />
                  <Label htmlFor="caseSensitive" className="text-sm">
                    Case sensitive
                  </Label>
                </div>

                <Button
                  onClick={performReplace}
                  disabled={!inputText.trim() || !findText}
                  className="w-full"
                >
                  <Replace className="h-4 w-4 mr-2" />
                  Find and Replace
                </Button>

                {outputText && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Result:</span>
                        <Badge variant="secondary">
                          {replaceCount} replacements made
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

            <ToolFAQ toolName="Find and Replace Tool" faqs={faqs} />
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Search className="h-4 w-4 mt-0.5 text-primary" />
                    <div>
                      <div className="font-medium">Case Matching</div>
                      <div className="text-muted-foreground">
                        Use case-sensitive for exact matches
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Replace className="h-4 w-4 mt-0.5 text-primary" />
                    <div>
                      <div className="font-medium">Delete Text</div>
                      <div className="text-muted-foreground">
                        Leave replace field empty to delete
                      </div>
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

export default FindAndReplace;
