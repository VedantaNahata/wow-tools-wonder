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

const TextReverser = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [reverseType, setReverseType] = useState<string>("");
  const { toast } = useToast();

  const reverseText = (type: string) => {
    let reversed = "";

    switch (type) {
      case "entire":
        reversed = inputText.split("").reverse().join("");
        break;
      case "words":
        reversed = inputText
          .split(" ")
          .map((word) => word.split("").reverse().join(""))
          .join(" ");
        break;
      case "lines":
        reversed = inputText.split("\n").reverse().join("\n");
        break;
      case "wordOrder":
        reversed = inputText.split(" ").reverse().join(" ");
        break;
      default:
        reversed = inputText;
    }

    setOutputText(reversed);
    setReverseType(type);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: "Reversed text copied to clipboard successfully.",
    });
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
    setReverseType("");
  };

  const reverseTypes = [
    {
      id: "entire",
      label: "Reverse Entire Text",
      example: "Hello World → dlroW olleH",
    },
    {
      id: "words",
      label: "Reverse Each Word",
      example: "Hello World → olleH dlroW",
    },
    {
      id: "lines",
      label: "Reverse Line Order",
      example: "Line 1\nLine 2 → Line 2\nLine 1",
    },
    {
      id: "wordOrder",
      label: "Reverse Word Order",
      example: "Hello World → World Hello",
    },
  ];

  const faqs = [
    {
      question: "What is a text reverser tool?",
      answer:
        "A text reverser tool takes your input text and flips it, displaying the characters or words in reverse order. It's useful for fun, privacy, puzzles, and code testing.",
    },
    {
      question: "How do I use the free online text reverser?",
      answer:
        "Just paste your text into the input box and click the reverse button. The tool instantly outputs the reversed version of your text, either by characters or words.",
    },
    {
      question: "Can I reverse words instead of individual characters?",
      answer:
        "Yes, many text reverser tools offer the option to reverse entire words, individual characters, or full sentences depending on your needs.",
    },
    {
      question: "Is this text reverser tool free and browser-based?",
      answer:
        "Yes, this is a completely free online tool that runs entirely in your browser. No installation, login, or data submission is required.",
    },
    {
      question: "Who uses text reverser tools and why?",
      answer:
        "Text reverser tools are used by developers, puzzle creators, language learners, and people who want to play with or obfuscate text for fun or privacy.",
    },
  ];

  return (
    <SEOWrapper
      title="Free Online Text Reverser - Reverse Text, Words & Sentences"
      description="Reverse your text instantly with this free online text reverser tool. Flip letters, words, or entire sentences backwards in one click. Works in-browser with no login required."
      keywords="free online text reverser, reverse text online, flip text backwards, mirror text generator, reverse a sentence, reverse words in text, reverse letters tool, reverse text generator"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Text Reverser
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reverse your text in multiple ways. Flip entire text, individual
            words, line order, or word order with a single click.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reverse Your Text</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-32"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {reverseTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={reverseType === type.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => reverseText(type.id)}
                      disabled={!inputText.trim()}
                      className="text-xs"
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>

                {outputText && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Reversed Text:</span>
                        <Badge variant="secondary">{reverseType}</Badge>
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

            <ToolFAQ toolName="Text Reverser" faqs={faqs} />
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reverseTypes.map((type) => (
                    <div key={type.id} className="text-sm">
                      <div className="font-medium text-muted-foreground mb-1">
                        {type.label}:
                      </div>
                      <div className="bg-muted p-2 rounded text-xs font-mono">
                        {type.example}
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

export default TextReverser;
