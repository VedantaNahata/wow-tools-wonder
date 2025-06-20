import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CaseConverter = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeCase, setActiveCase] = useState<string>("");
  const { toast } = useToast();

  const convertCase = (caseType: string) => {
    let converted = "";

    switch (caseType) {
      case "uppercase":
        converted = inputText.toUpperCase();
        break;
      case "lowercase":
        converted = inputText.toLowerCase();
        break;
      case "titlecase":
        converted = inputText.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        break;
      case "sentencecase":
        converted = inputText
          .toLowerCase()
          .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case "alternatingcase":
        converted = inputText
          .split("")
          .map((char, index) =>
            index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
          )
          .join("");
        break;
      case "inversecase":
        converted = inputText
          .split("")
          .map((char) =>
            char === char.toUpperCase()
              ? char.toLowerCase()
              : char.toUpperCase()
          )
          .join("");
        break;
      default:
        converted = inputText;
    }

    setOutputText(converted);
    setActiveCase(caseType);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard successfully.",
    });
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
    setActiveCase("");
  };

  const caseTypes = [
    { id: "uppercase", label: "UPPERCASE", example: "HELLO WORLD" },
    { id: "lowercase", label: "lowercase", example: "hello world" },
    { id: "titlecase", label: "Title Case", example: "Hello World" },
    { id: "sentencecase", label: "Sentence case", example: "Hello world" },
    {
      id: "alternatingcase",
      label: "aLtErNaTiNg CaSe",
      example: "hElLo WoRlD",
    },
    { id: "inversecase", label: "iNVERSE cASE", example: "hELLO wORLD" },
  ];

  const faqs = [
    {
      question: "What is a case converter tool?",
      answer:
        "A case converter tool allows you to transform text into different letter cases such as uppercase, lowercase, title case, sentence case, and more. It's useful for formatting text consistently across documents, websites, and programming code.",
    },
    {
      question: "How do I convert text to uppercase or lowercase instantly?",
      answer:
        "Simply paste your text into the input field of the case converter and choose the desired case format like UPPERCASE or lowercase. The converted output appears instantly.",
    },
    {
      question: "Is this case converter tool free to use?",
      answer:
        "Yes, this case converter tool is 100% free to use with no sign-up required. You can convert unlimited text without restrictions.",
    },
    {
      question:
        "Can I use this tool to convert large paragraphs or code snippets?",
      answer:
        "Absolutely. The case converter supports both short and long-form text, including articles, paragraphs, and programming code, ensuring consistent formatting across all text types.",
    },
    {
      question:
        "Why should I use an online case converter instead of manually editing?",
      answer:
        "Manually editing case formatting is time-consuming and error-prone. An online case converter ensures accuracy, saves time, and improves productivity when working with text.",
    },
  ];

  return (
    <SEOWrapper
      title="Case Converter - Convert Text to Any Case Format"
      description="Free online case converter tool. Convert text to uppercase, lowercase, title case, sentence case, alternating case, and inverse case instantly. Ideal for writing, coding, and editing."
      keywords="free online case converter, case converter, convert text case online, convert text case, case converter, text converter, uppercase converter, lowercase tool, title case, sentence case, alternating case, inverse case, online text formatter, free text transformation tool"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Case Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your text into any case format instantly. Perfect for
            developers, writers, and anyone who needs to quickly change text
            formatting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Convert Your Text</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-32"
                />

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {caseTypes.map((caseType) => (
                    <Button
                      key={caseType.id}
                      variant={
                        activeCase === caseType.id ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => convertCase(caseType.id)}
                      disabled={!inputText.trim()}
                      className="text-xs"
                    >
                      {caseType.label}
                    </Button>
                  ))}
                </div>

                {outputText && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Output:</span>
                        <Badge variant="secondary">{activeCase}</Badge>
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

            <ToolFAQ toolName="Case Converter" faqs={faqs} />
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {caseTypes.map((caseType) => (
                    <div key={caseType.id} className="text-sm">
                      <div className="font-medium text-muted-foreground">
                        {caseType.label}:
                      </div>
                      <div className="bg-muted p-2 rounded text-xs font-mono">
                        {caseType.example}
                      </div>
                    </div>
                  ))}
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

export default CaseConverter;
