
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { Copy, RotateCcw, Search, Replace } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FindAndReplace = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [replaceCount, setReplaceCount] = useState(0);
  const { toast } = useToast();

  const performReplace = () => {
    if (!findText) {
      toast({
        title: "Error",
        description: "Please enter text to find.",
        variant: "destructive",
      });
      return;
    }

    let result = inputText;
    let count = 0;

    if (caseSensitive) {
      // Case-sensitive replacement
      const regex = new RegExp(escapeRegExp(findText), 'g');
      result = inputText.replace(regex, (match) => {
        count++;
        return replaceText;
      });
    } else {
      // Case-insensitive replacement
      const regex = new RegExp(escapeRegExp(findText), 'gi');
      result = inputText.replace(regex, (match) => {
        count++;
        return replaceText;
      });
    }

    setOutputText(result);
    setReplaceCount(count);
    
    toast({
      title: "Replacement Complete!",
      description: `${count} instances replaced.`,
    });
  };

  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: "Text with replacements copied to clipboard.",
    });
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
    setFindText("");
    setReplaceText("");
    setReplaceCount(0);
  };

  const faqs = [
    {
      question: "How does find and replace work?",
      answer: "The tool searches for all instances of your 'find' text and replaces them with your 'replace' text. You can choose case-sensitive or case-insensitive matching."
    },
    {
      question: "Can I use special characters in find and replace?",
      answer: "Yes, you can use any characters including symbols, numbers, and punctuation. The tool handles special regex characters automatically."
    },
    {
      question: "What's the difference between case-sensitive and case-insensitive?",
      answer: "Case-sensitive matches exact letter cases (A ≠ a), while case-insensitive treats upper and lowercase letters as the same (A = a)."
    },
    {
      question: "Can I replace text with nothing to delete it?",
      answer: "Yes, leave the 'replace with' field empty to effectively delete all instances of the found text."
    }
  ];

  return (
    <SEOWrapper
      title="Find and Replace Text Tool - Search and Replace Online"
      description="Free online find and replace tool. Search for text and replace it with new text. Supports case-sensitive and case-insensitive replacements."
      keywords="find and replace, text replace, search replace, text editor, find text, replace text"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find and Replace Tool
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search for specific text and replace it with new text. Perfect for 
            editing documents, code, and making bulk text changes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Find and Replace Text</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-32"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="findText">Find:</Label>
                    <Input
                      id="findText"
                      placeholder="Text to find"
                      value={findText}
                      onChange={(e) => setFindText(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="replaceText">Replace with:</Label>
                    <Input
                      id="replaceText"
                      placeholder="Replacement text"
                      value={replaceText}
                      onChange={(e) => setReplaceText(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="caseSensitive"
                    checked={caseSensitive}
                    onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
                  />
                  <Label htmlFor="caseSensitive" className="text-sm">
                    Case sensitive
                  </Label>
                </div>

                <Button 
                  onClick={performReplace} 
                  disabled={!inputText.trim() || !findText}
                  className="w-full"
                >
                  <Replace className="h-4 w-4 mr-2" />
                  Find and Replace
                </Button>

                {outputText && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Result:</span>
                        <Badge variant="secondary">
                          {replaceCount} replacements made
                        </Badge>
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

            <ToolFAQ toolName="Find and Replace Tool" faqs={faqs} />
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Search className="h-4 w-4 mt-0.5 text-primary" />
                    <div>
                      <div className="font-medium">Case Matching</div>
                      <div className="text-muted-foreground">Use case-sensitive for exact matches</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Replace className="h-4 w-4 mt-0.5 text-primary" />
                    <div>
                      <div className="font-medium">Delete Text</div>
                      <div className="text-muted-foreground">Leave replace field empty to delete</div>
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

export default FindAndReplace;
