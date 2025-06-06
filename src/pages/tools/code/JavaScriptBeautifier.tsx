
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

const JavaScriptBeautifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indentSize, setIndentSize] = useState("2");
  const [useSpaces, setUseSpaces] = useState(true);

  const beautifyJS = () => {
    if (!input.trim()) {
      toast.error("Please enter JavaScript code to beautify");
      return;
    }

    try {
      const indent = useSpaces ? " ".repeat(parseInt(indentSize)) : "\t";
      let beautified = input;
      
      // Basic beautification logic
      beautified = beautified
        // Remove extra whitespace
        .replace(/\s+/g, ' ')
        // Add newlines after { and ;
        .replace(/\{/g, '{\n')
        .replace(/\}/g, '\n}')
        .replace(/;/g, ';\n')
        // Add space after commas
        .replace(/,/g, ', ')
        // Add spaces around operators
        .replace(/([^=!<>])=([^=])/g, '$1 = $2')
        .replace(/\+/g, ' + ')
        .replace(/-/g, ' - ')
        .replace(/\*/g, ' * ')
        .replace(/\//g, ' / ')
        // Clean up multiple spaces
        .replace(/\s+/g, ' ')
        .trim();

      // Add proper indentation
      const lines = beautified.split('\n');
      let indentLevel = 0;
      const indentedLines = lines.map(line => {
        const trimmedLine = line.trim();
        
        if (trimmedLine.includes('}')) {
          indentLevel = Math.max(0, indentLevel - 1);
        }
        
        const indentedLine = trimmedLine ? indent.repeat(indentLevel) + trimmedLine : '';
        
        if (trimmedLine.includes('{')) {
          indentLevel++;
        }
        
        return indentedLine;
      });

      setOutput(indentedLines.join('\n'));
      toast.success("JavaScript code beautified successfully!");
    } catch (error) {
      toast.error("Error beautifying JavaScript code");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success("Beautified code copied to clipboard!");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  const faqs = [
    {
      question: "What does JavaScript beautification do?",
      answer: "JavaScript beautification formats messy or minified code into clean, readable code with proper indentation, spacing, and line breaks."
    },
    {
      question: "Can this tool handle minified JavaScript?",
      answer: "Yes, this tool can take minified JavaScript code and format it into readable, properly indented code with consistent spacing."
    },
    {
      question: "What's the difference between spaces and tabs for indentation?",
      answer: "Spaces provide consistent visual indentation across all editors, while tabs allow users to set their preferred indentation width. Most style guides recommend 2 or 4 spaces."
    }
  ];

  return (
    <SEOWrapper
      title="JavaScript Beautifier - Format & Pretty Print JS Code"
      description="Format messy JavaScript code into clean, readable code with proper indentation and spacing. Supports custom indentation settings."
      keywords="javascript beautifier, js formatter, code formatter, pretty print javascript, code beautify"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            JavaScript Beautifier
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Format and beautify messy JavaScript code with proper indentation and spacing.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>JavaScript Beautifier</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="indentSize">Indent Size</Label>
                    <Input
                      id="indentSize"
                      type="number"
                      min="1"
                      max="8"
                      value={indentSize}
                      onChange={(e) => setIndentSize(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Indentation Type</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={useSpaces}
                          onChange={() => setUseSpaces(true)}
                          className="mr-2"
                        />
                        Spaces
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          checked={!useSpaces}
                          onChange={() => setUseSpaces(false)}
                          className="mr-2"
                        />
                        Tabs
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="input">JavaScript Code Input</Label>
                  <Textarea
                    id="input"
                    placeholder="Paste your JavaScript code here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[200px] font-mono"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={beautifyJS} className="flex-1">
                    Beautify JavaScript
                  </Button>
                  <Button onClick={clearAll} variant="outline">
                    Clear All
                  </Button>
                </div>

                {output && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="output">Beautified JavaScript</Label>
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
              <ToolFAQ toolName="JavaScript Beautifier" faqs={faqs} />
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

export default JavaScriptBeautifier;
