
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";
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
        converted = inputText.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        break;
      case "sentencecase":
        converted = inputText.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => 
          c.toUpperCase()
        );
        break;
      case "alternatingcase":
        converted = inputText.split("").map((char, index) => 
          index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
        ).join("");
        break;
      case "inversecase":
        converted = inputText.split("").map((char) => 
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        ).join("");
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
    { id: "alternatingcase", label: "aLtErNaTiNg CaSe", example: "hElLo WoRlD" },
    { id: "inversecase", label: "iNVERSE cASE", example: "hELLO wORLD" },
  ];

  return (
    <SEOWrapper
      title="Case Converter - Convert Text to Any Case Format"
      description="Free online case converter tool. Convert text to uppercase, lowercase, title case, sentence case, alternating case, and inverse case instantly."
      keywords="case converter, text converter, uppercase, lowercase, title case, sentence case, text transformation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Case Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your text into any case format instantly. Perfect for developers, 
            writers, and anyone who needs to quickly change text formatting.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Input Text</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-32 mb-4"
                />
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                  {caseTypes.map((caseType) => (
                    <Button
                      key={caseType.id}
                      variant={activeCase === caseType.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => convertCase(caseType.id)}
                      disabled={!inputText.trim()}
                      className="text-xs"
                    >
                      {caseType.label}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={!outputText}
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
              </CardContent>
            </Card>

            {outputText && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Output Text
                    <Badge variant="secondary">{activeCase}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={outputText}
                    readOnly
                    className="min-h-32"
                  />
                </CardContent>
              </Card>
            )}

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>About Case Converter</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  Our case converter tool helps you quickly transform text into different case formats. 
                  Whether you're coding, writing, or formatting content, this tool saves you time by 
                  instantly converting text to the desired case.
                </p>
                
                <h3>Supported Case Types:</h3>
                <ul>
                  <li><strong>UPPERCASE:</strong> Converts all letters to capital letters</li>
                  <li><strong>lowercase:</strong> Converts all letters to small letters</li>
                  <li><strong>Title Case:</strong> Capitalizes the first letter of each word</li>
                  <li><strong>Sentence case:</strong> Capitalizes the first letter of each sentence</li>
                  <li><strong>aLtErNaTiNg CaSe:</strong> Alternates between lowercase and uppercase</li>
                  <li><strong>iNVERSE cASE:</strong> Inverts the case of each letter</li>
                </ul>

                <h3>How to Use:</h3>
                <ol>
                  <li>Enter or paste your text in the input field</li>
                  <li>Click on the desired case conversion button</li>
                  <li>Copy the converted text to your clipboard</li>
                </ol>
              </CardContent>
            </Card>
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
                      <div className="font-medium text-muted-foreground">{caseType.label}:</div>
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
    </SEOWrapper>
  );
};

export default CaseConverter;
