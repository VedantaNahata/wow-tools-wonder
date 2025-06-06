
import { useState } from "react";
import SEOWrapper from "@/components/SEOWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import AdSenseBox from "@/components/AdSenseBox";
import ToolFAQ from "@/components/ToolFAQ";

const HtmlBeautifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indentSize, setIndentSize] = useState("2");

  const beautifyHTML = () => {
    if (!input.trim()) {
      toast.error("Please enter HTML code to beautify");
      return;
    }

    try {
      const indent = " ".repeat(parseInt(indentSize));
      let beautified = input;
      
      // Remove extra whitespace between tags
      beautified = beautified.replace(/>\s+</g, '><');
      
      // Add newlines after opening and before closing tags
      beautified = beautified.replace(/></g, '>\n<');
      
      // Split into lines and add proper indentation
      const lines = beautified.split('\n');
      let indentLevel = 0;
      const indentedLines = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (!line) continue;
        
        // Decrease indent for closing tags
        if (line.startsWith('</') && !line.match(/<\/\w+>/)) {
          indentLevel = Math.max(0, indentLevel - 1);
        }
        
        // Self-closing tags or single-line tags
        const isSelfClosing = line.endsWith('/>') || 
          line.match(/<(\w+)[^>]*>.*<\/\1>/) ||
          ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'].some(tag => 
            line.includes(`<${tag}`)
          );
        
        // Add indented line
        indentedLines.push(indent.repeat(indentLevel) + line);
        
        // Increase indent for opening tags (but not self-closing or single-line)
        if (line.startsWith('<') && !line.startsWith('</') && !isSelfClosing) {
          indentLevel++;
        }
        
        // Decrease indent for closing tags that are on the same line
        if (line.includes('</') && !line.startsWith('</')) {
          indentLevel = Math.max(0, indentLevel - 1);
        }
      }
      
      setOutput(indentedLines.join('\n'));
      toast.success("HTML code beautified successfully!");
    } catch (error) {
      toast.error("Error beautifying HTML code");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success("Beautified HTML copied to clipboard!");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const faqs = [
    {
      question: "What does HTML beautification do?",
      answer: "HTML beautification formats messy or minified HTML code into clean, readable code with proper indentation, consistent spacing, and organized structure."
    },
    {
      question: "Can this handle minified HTML?",
      answer: "Yes, this tool can take minified HTML code and format it into readable, properly indented HTML with clear tag hierarchy."
    },
    {
      question: "Does this tool validate HTML?",
      answer: "This tool focuses on formatting and beautification. While it helps organize your HTML structure, it doesn't validate HTML syntax or check for errors."
    }
  ];

  return (
    <SEOWrapper
      title="HTML Beautifier - Format & Pretty Print HTML Code"
      description="Format messy HTML code into clean, readable markup with proper indentation and structure. Perfect for developers and web designers."
      keywords="html beautifier, html formatter, code formatter, pretty print html, html beautify"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            HTML Beautifier
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Format and beautify messy HTML code with proper indentation and structure.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>HTML Beautifier</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="indentSize">Indent Size (spaces)</Label>
                  <Input
                    id="indentSize"
                    type="number"
                    min="1"
                    max="8"
                    value={indentSize}
                    onChange={(e) => setIndentSize(e.target.value)}
                    className="w-32"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="input">HTML Code Input</Label>
                  <Textarea
                    id="input"
                    placeholder="Paste your HTML code here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[200px] font-mono"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={beautifyHTML} className="flex-1">
                    Beautify HTML
                  </Button>
                  <Button onClick={clearAll} variant="outline">
                    Clear All
                  </Button>
                </div>

                {output && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="output">Beautified HTML</Label>
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
                )}
              </CardContent>
            </Card>

            <div className="mt-8">
              <ToolFAQ toolName="HTML Beautifier" faqs={faqs} />
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

export default HtmlBeautifier;
