
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
        reversed = inputText.split(" ").map(word => 
          word.split("").reverse().join("")
        ).join(" ");
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
    { id: "entire", label: "Reverse Entire Text", example: "Hello World → dlroW olleH" },
    { id: "words", label: "Reverse Each Word", example: "Hello World → olleH dlroW" },
    { id: "lines", label: "Reverse Line Order", example: "Line 1\nLine 2 → Line 2\nLine 1" },
    { id: "wordOrder", label: "Reverse Word Order", example: "Hello World → World Hello" },
  ];

  const faqs = [
    {
      question: "What is text reversal?",
      answer: "Text reversal is the process of changing the order of characters, words, or lines in text. It can be used for creative purposes, encoding, or data manipulation."
    },
    {
      question: "What's the difference between reversing entire text and reversing words?",
      answer: "Reversing entire text flips all characters including spaces, while reversing words only flips the characters within each word, keeping word positions intact."
    },
    {
      question: "Can I reverse multiple lines of text?",
      answer: "Yes, you can choose to reverse the order of lines or reverse the content within each line. The tool handles multi-line text efficiently."
    },
    {
      question: "Is there a limit to text length?",
      answer: "No, you can reverse text of any length. The tool processes everything in your browser without server limitations."
    }
  ];

  return (
    <SEOWrapper
      title="Text Reverser - Reverse Text, Words, and Lines Online"
      description="Free online text reverser tool. Reverse entire text, individual words, line order, or word order instantly. Perfect for creative writing and text manipulation."
      keywords="text reverser, reverse text, flip text, text manipulation, reverse words, reverse lines"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Text Reverser
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Reverse your text in multiple ways. Flip entire text, individual words, 
            line order, or word order with a single click.
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
                      <div className="font-medium text-muted-foreground mb-1">{type.label}:</div>
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
    </SEOWrapper>
  );
};

export default TextReverser;
