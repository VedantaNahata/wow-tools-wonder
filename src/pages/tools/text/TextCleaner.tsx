import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextCleaner = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [options, setOptions] = useState({
    removeLineBreaks: true,
    removeExtraSpaces: true,
    removeTabs: true,
    trimSpaces: true,
  });
  const { toast } = useToast();

  const cleanText = () => {
    let cleaned = inputText;

    if (options.removeLineBreaks) {
      cleaned = cleaned.replace(/\n/g, " ");
    }

    if (options.removeTabs) {
      cleaned = cleaned.replace(/\t/g, " ");
    }

    if (options.removeExtraSpaces) {
      cleaned = cleaned.replace(/\s+/g, " ");
    }

    if (options.trimSpaces) {
      cleaned = cleaned.trim();
    }

    setOutputText(cleaned);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: "Cleaned text copied to clipboard successfully.",
    });
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
  };

  const toggleOption = (option: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const faqs = [
    {
      question: "What is a text cleaner tool?",
      answer:
        "A text cleaner tool helps remove unwanted characters, extra spaces, line breaks, HTML tags, or formatting issues from your text. It ensures your content is clean, structured, and ready to use.",
    },
    {
      question: "How do I clean my text using this free online tool?",
      answer:
        "Paste your text into the input area, select the cleaning options you want such as removing extra spaces or special characters, and click clean. The cleaned text will appear instantly.",
    },
    {
      question: "What types of formatting can this text cleaner remove?",
      answer:
        "This tool can remove line breaks, tabs, extra spaces, duplicate spaces, non-ASCII characters, HTML tags, and more — making your content clean and professional.",
    },
    {
      question: "Is this text cleaner tool free and safe to use?",
      answer:
        "Yes, this is a 100% free online text cleaner tool. It runs entirely in your browser, and no data is stored or uploaded to any server.",
    },
    {
      question: "Who should use a text cleaner tool?",
      answer:
        "Writers, developers, students, content creators, and anyone working with messy or copied content can use a text cleaner to streamline and format their text easily.",
    },
  ];

  return (
    <SEOWrapper
      title="Free Online Text Cleaner - Remove Unwanted Characters & Formatting"
      description="Clean your text instantly with this free online text cleaner tool. Remove special characters, line breaks, HTML tags, extra spaces, and more for perfectly formatted content."
      keywords="free online text cleaner, clean text tool, remove special characters, text formatting cleaner, clean up copied text, remove line breaks, text cleaner, text cleaner online, text formatting, text formatting online"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Text Cleaner
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Clean up messy text by removing unwanted line breaks, extra spaces,
            tabs, and other formatting issues.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Clean Your Text</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your messy text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-32"
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="removeLineBreaks"
                        checked={options.removeLineBreaks}
                        onCheckedChange={() => toggleOption("removeLineBreaks")}
                      />
                      <label htmlFor="removeLineBreaks" className="text-sm">
                        Remove line breaks
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="removeExtraSpaces"
                        checked={options.removeExtraSpaces}
                        onCheckedChange={() =>
                          toggleOption("removeExtraSpaces")
                        }
                      />
                      <label htmlFor="removeExtraSpaces" className="text-sm">
                        Remove extra spaces
                      </label>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="removeTabs"
                        checked={options.removeTabs}
                        onCheckedChange={() => toggleOption("removeTabs")}
                      />
                      <label htmlFor="removeTabs" className="text-sm">
                        Remove tabs
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="trimSpaces"
                        checked={options.trimSpaces}
                        onCheckedChange={() => toggleOption("trimSpaces")}
                      />
                      <label htmlFor="trimSpaces" className="text-sm">
                        Trim leading/trailing spaces
                      </label>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={cleanText}
                  disabled={!inputText.trim()}
                  className="w-full"
                >
                  Clean Text
                </Button>

                {outputText && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Cleaned Text:</span>
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

            <ToolFAQ toolName="Text Cleaner" faqs={faqs} />
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Before & After</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-medium text-muted-foreground mb-1">
                      Before:
                    </div>
                    <div className="bg-muted p-2 rounded text-xs font-mono">
                      This is messy{"\n"}
                      text with{"\t"}tabs{"\n"}
                      and extra spaces
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-muted-foreground mb-1">
                      After:
                    </div>
                    <div className="bg-muted p-2 rounded text-xs font-mono">
                      This is messy text with tabs and extra spaces
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

export default TextCleaner;
