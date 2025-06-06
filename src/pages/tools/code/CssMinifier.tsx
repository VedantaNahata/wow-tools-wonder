
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const CssMinifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [minifiedSize, setMinifiedSize] = useState(0);

  const minifyCSS = () => {
    if (!input.trim()) {
      toast.error("Please enter CSS code to minify");
      return;
    }

    try {
      let minified = input;
      
      // Remove comments
      minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');
      
      // Remove unnecessary whitespace
      minified = minified.replace(/\s+/g, ' ');
      
      // Remove spaces around certain characters
      minified = minified.replace(/\s*{\s*/g, '{');
      minified = minified.replace(/\s*}\s*/g, '}');
      minified = minified.replace(/\s*:\s*/g, ':');
      minified = minified.replace(/\s*;\s*/g, ';');
      minified = minified.replace(/\s*,\s*/g, ',');
      minified = minified.replace(/\s*>\s*/g, '>');
      minified = minified.replace(/\s*\+\s*/g, '+');
      minified = minified.replace(/\s*~\s*/g, '~');
      
      // Remove trailing semicolon before closing brace
      minified = minified.replace(/;}/g, '}');
      
      // Remove leading/trailing whitespace
      minified = minified.trim();
      
      // Calculate sizes
      const original = new Blob([input]).size;
      const compressed = new Blob([minified]).size;
      const savings = Math.round(((original - compressed) / original) * 100);
      
      setOutput(minified);
      setOriginalSize(original);
      setMinifiedSize(compressed);
      
      toast.success(`CSS minified successfully! ${savings}% size reduction`);
    } catch (error) {
      toast.error("Error minifying CSS code");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success("Minified CSS copied to clipboard!");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setOriginalSize(0);
    setMinifiedSize(0);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const faqs = [
    {
      question: "What does CSS minification do?",
      answer: "CSS minification removes unnecessary characters like whitespace, comments, and semicolons to reduce file size while maintaining functionality."
    },
    {
      question: "How much can CSS minification reduce file size?",
      answer: "CSS minification typically reduces file size by 20-40%, depending on the original formatting and comments. This improves website loading speed."
    },
    {
      question: "Is minified CSS still functional?",
      answer: "Yes, minified CSS works exactly the same as the original. Only unnecessary whitespace and comments are removed, not functional code."
    }
  ];

  return (
    <SEOWrapper
      title="CSS Minifier - Compress CSS Code for Production"
      description="Minify CSS code to reduce file size and improve website performance. Remove unnecessary whitespace and comments while preserving functionality."
      keywords="css minifier, css compressor, minify css, optimize css, css compression"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            CSS Minifier
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Minify CSS code to reduce file size and improve website performance.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>CSS Minifier</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="input">CSS Code Input</Label>
                  <Textarea
                    id="input"
                    placeholder="Paste your CSS code here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[200px] font-mono"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={minifyCSS} className="flex-1">
                    Minify CSS
                  </Button>
                  <Button onClick={clearAll} variant="outline">
                    Clear All
                  </Button>
                </div>

                {output && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg text-center">
                        <h3 className="font-semibold text-blue-700 dark:text-blue-300">Original Size</h3>
                        <p className="text-lg font-bold">{formatBytes(originalSize)}</p>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg text-center">
                        <h3 className="font-semibold text-green-700 dark:text-green-300">Minified Size</h3>
                        <p className="text-lg font-bold">{formatBytes(minifiedSize)}</p>
                      </div>
                      <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg text-center">
                        <h3 className="font-semibold text-purple-700 dark:text-purple-300">Savings</h3>
                        <p className="text-lg font-bold">
                          {originalSize > 0 ? Math.round(((originalSize - minifiedSize) / originalSize) * 100) : 0}%
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="output">Minified CSS</Label>
                        <Button onClick={copyToClipboard} variant="outline" size="sm">
                          Copy to Clipboard
                        </Button>
                      </div>
                      <Textarea
                        id="output"
                        value={output}
                        readOnly
                        className="min-h-[200px] font-mono bg-muted"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="CSS Minifier" faqs={faqs} />
            </div>
          </div>
          <div>
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default CssMinifier;
