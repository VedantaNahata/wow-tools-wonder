
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";
import { Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LoremGenerator = () => {
  const [count, setCount] = useState(5);
  const [type, setType] = useState("paragraphs");
  const [generated, setGenerated] = useState("");
  const { toast } = useToast();

  const loremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum"
  ];

  const generateSentence = () => {
    const sentenceLength = Math.floor(Math.random() * 10) + 8;
    const words = [];
    for (let i = 0; i < sentenceLength; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    return words.join(" ") + ".";
  };

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 4) + 3;
    const sentences = [];
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(" ");
  };

  const generateLorem = () => {
    let result = "";
    
    switch (type) {
      case "words":
        const words = [];
        for (let i = 0; i < count; i++) {
          words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
        result = words.join(" ");
        break;
        
      case "sentences":
        const sentences = [];
        for (let i = 0; i < count; i++) {
          sentences.push(generateSentence());
        }
        result = sentences.join(" ");
        break;
        
      case "paragraphs":
        const paragraphs = [];
        for (let i = 0; i < count; i++) {
          paragraphs.push(generateParagraph());
        }
        result = paragraphs.join("\n\n");
        break;
    }
    
    setGenerated(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    toast({
      title: "Copied!",
      description: "Lorem ipsum text copied to clipboard.",
    });
  };

  const clearText = () => {
    setGenerated("");
  };

  return (
    <SEOWrapper
      title="Lorem Ipsum Generator - Generate Placeholder Text"
      description="Free lorem ipsum generator. Create dummy text for your designs, websites, and layouts. Generate words, sentences, or paragraphs instantly."
      keywords="lorem ipsum, placeholder text, dummy text, text generator, design tools, mockup text"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Lorem Ipsum Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate placeholder text for your designs and layouts. Create lorem ipsum 
            text in words, sentences, or paragraphs.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Generate Lorem Ipsum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <Label htmlFor="count">Count</Label>
                    <Input
                      id="count"
                      type="number"
                      min="1"
                      max="100"
                      value={count}
                      onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="words">Words</SelectItem>
                        <SelectItem value="sentences">Sentences</SelectItem>
                        <SelectItem value="paragraphs">Paragraphs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-end">
                    <Button onClick={generateLorem} className="w-full">
                      Generate
                    </Button>
                  </div>
                </div>

                {generated && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Generated Text</Label>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyToClipboard}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearText}
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Clear
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={generated}
                      readOnly
                      className="min-h-48"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About Lorem Ipsum</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                  It has been the industry's standard dummy text ever since the 1500s, when an 
                  unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                
                <h3>Why Use Lorem Ipsum?</h3>
                <ul>
                  <li>Focus on design without content distraction</li>
                  <li>Industry standard for placeholder text</li>
                  <li>Looks more realistic than repeated text</li>
                  <li>Available in various lengths</li>
                </ul>

                <h3>Common Uses:</h3>
                <ul>
                  <li>Website mockups and wireframes</li>
                  <li>Print design layouts</li>
                  <li>Content management system testing</li>
                  <li>Typography testing</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Generate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setCount(50);
                    setType("words");
                    generateLorem();
                  }}
                >
                  50 Words
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setCount(5);
                    setType("sentences");
                    generateLorem();
                  }}
                >
                  5 Sentences
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setCount(3);
                    setType("paragraphs");
                    generateLorem();
                  }}
                >
                  3 Paragraphs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default LoremGenerator;
