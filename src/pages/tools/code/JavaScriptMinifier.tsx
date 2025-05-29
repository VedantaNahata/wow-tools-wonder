
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { Copy, RotateCcw, Minimize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JavaScriptMinifier = () => {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [compressionStats, setCompressionStats] = useState({ original: 0, minified: 0, saved: 0 });
  const { toast } = useToast();

  const minifyCode = () => {
    // Simple JavaScript minification (removes comments, extra spaces, line breaks)
    let minified = inputCode
      // Remove single-line comments
      .replace(/\/\/.*$/gm, '')
      // Remove multi-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove extra whitespace and line breaks
      .replace(/\s+/g, ' ')
      // Remove spaces around operators and brackets
      .replace(/\s*([{}();,:])\s*/g, '$1')
      // Remove trailing semicolons before }
      .replace(/;}/g, '}')
      // Trim
      .trim();

    const originalSize = inputCode.length;
    const minifiedSize = minified.length;
    const saved = originalSize - minifiedSize;
    const savedPercentage = originalSize > 0 ? Math.round((saved / originalSize) * 100) : 0;

    setOutputCode(minified);
    setCompressionStats({
      original: originalSize,
      minified: minifiedSize,
      saved: savedPercentage
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputCode);
    toast({
      title: "Copied!",
      description: "Minified JavaScript copied to clipboard.",
    });
  };

  const clearCode = () => {
    setInputCode("");
    setOutputCode("");
    setCompressionStats({ original: 0, minified: 0, saved: 0 });
  };

  const faqs = [
    {
      question: "What does JavaScript minification do?",
      answer: "JavaScript minification removes comments, whitespace, and unnecessary characters from your code to reduce file size while maintaining functionality. This improves page load times."
    },
    {
      question: "Is the minified code still functional?",
      answer: "Yes, minification only removes unnecessary characters and whitespace. The functionality of your JavaScript code remains exactly the same."
    },
    {
      question: "Should I minify code for production?",
      answer: "Yes, minifying JavaScript is a best practice for production environments as it reduces file sizes and improves website performance."
    },
    {
      question: "Can I beautify minified code?",
      answer: "While you can add formatting back to minified code, variable names and comments are permanently removed during minification."
    }
  ];

  return (
    <SEOWrapper
      title="JavaScript Minifier - Minify JS Code Online"
      description="Free online JavaScript minifier tool. Compress and minify your JS code by removing whitespace, comments, and unnecessary characters to improve website performance."
      keywords="javascript minifier, js minifier, minify javascript, compress js, javascript optimizer"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            JavaScript Minifier
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Minify and compress your JavaScript code to reduce file size and improve 
            website performance. Remove comments, whitespace, and unnecessary characters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Minify JavaScript Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your JavaScript code here..."
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="min-h-48 font-mono text-sm"
                />
                
                <Button 
                  onClick={minifyCode} 
                  disabled={!inputCode.trim()}
                  className="w-full"
                >
                  <Minimize2 className="h-4 w-4 mr-2" />
                  Minify JavaScript
                </Button>

                {outputCode && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Minified Code:</span>
                        <Badge variant="secondary">
                          {compressionStats.saved}% smaller
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={copyToClipboard}>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button size="sm" variant="outline" onClick={clearCode}>
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Clear
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={outputCode}
                      readOnly
                      className="min-h-32 font-mono text-sm"
                    />
                    <div className="text-sm text-muted-foreground">
                      Original: {compressionStats.original} characters • 
                      Minified: {compressionStats.minified} characters • 
                      Saved: {compressionStats.original - compressionStats.minified} characters
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <ToolFAQ toolName="JavaScript Minifier" faqs={faqs} />
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
                      {`function sayHello() {
  // This is a comment
  console.log("Hello World");
}`}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-muted-foreground mb-1">After:</div>
                    <div className="bg-muted p-2 rounded text-xs font-mono">
                      {`function sayHello(){console.log("Hello World")}`}
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

export default JavaScriptMinifier;
