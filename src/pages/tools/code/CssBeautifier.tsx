
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { Copy, RotateCcw, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CssBeautifier = () => {
  const [inputCss, setInputCss] = useState("");
  const [outputCss, setOutputCss] = useState("");
  const { toast } = useToast();

  const beautifyCss = () => {
    let beautified = inputCss
      // Remove extra whitespace
      .replace(/\s+/g, ' ')
      // Add line breaks after opening braces
      .replace(/\{/g, ' {\n  ')
      // Add line breaks after semicolons
      .replace(/;/g, ';\n  ')
      // Add line breaks before closing braces
      .replace(/\}/g, '\n}\n\n')
      // Add line breaks after commas in selectors
      .replace(/,/g, ',\n')
      // Clean up extra spaces
      .replace(/\s*{\s*/g, ' {\n  ')
      .replace(/;\s*}/g, ';\n}')
      // Fix indentation issues
      .replace(/\n\s*\n/g, '\n')
      // Remove trailing spaces
      .replace(/\s+$/gm, '')
      // Clean up final output
      .trim();

    setOutputCss(beautified);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputCss);
    toast({
      title: "Copied!",
      description: "Beautified CSS copied to clipboard.",
    });
  };

  const clearCss = () => {
    setInputCss("");
    setOutputCss("");
  };

  const faqs = [
    {
      question: "What does CSS beautification do?",
      answer: "CSS beautification formats your CSS code with proper indentation, line breaks, and spacing to make it more readable and maintainable."
    },
    {
      question: "Will this change my CSS functionality?",
      answer: "No, beautification only changes the formatting and whitespace. Your CSS styles will work exactly the same way."
    },
    {
      question: "Can I beautify minified CSS?",
      answer: "Yes, this tool is perfect for making minified or compressed CSS code readable again by adding proper formatting."
    },
    {
      question: "Should I beautify CSS for production?",
      answer: "For production, minified CSS is preferred for performance. Use beautified CSS during development for better readability."
    }
  ];

  return (
    <SEOWrapper
      title="CSS Beautifier - Format and Beautify CSS Code"
      description="Free online CSS beautifier tool. Format and beautify messy CSS code with proper indentation and formatting for better readability and maintenance."
      keywords="css beautifier, css formatter, format css, beautify css, css pretty print"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            CSS Beautifier
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Format and beautify your CSS code with proper indentation and spacing 
            for better readability and maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Beautify CSS Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your CSS code here..."
                  value={inputCss}
                  onChange={(e) => setInputCss(e.target.value)}
                  className="min-h-48 font-mono text-sm"
                />
                
                <Button 
                  onClick={beautifyCss} 
                  disabled={!inputCss.trim()}
                  className="w-full"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Beautify CSS
                </Button>

                {outputCss && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Beautified CSS:</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={copyToClipboard}>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button size="sm" variant="outline" onClick={clearCss}>
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Clear
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={outputCss}
                      readOnly
                      className="min-h-48 font-mono text-sm"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <ToolFAQ toolName="CSS Beautifier" faqs={faqs} />
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
                    <div className="font-medium text-muted-foreground mb-1">Before:</div>
                    <div className="bg-muted p-2 rounded text-xs font-mono">
                      {`body{margin:0;padding:0}.header{color:red;font-size:16px}`}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-muted-foreground mb-1">After:</div>
                    <div className="bg-muted p-2 rounded text-xs font-mono whitespace-pre">
{`body {
  margin: 0;
  padding: 0;
}

.header {
  color: red;
  font-size: 16px;
}`}
                    </div>
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

export default CssBeautifier;
