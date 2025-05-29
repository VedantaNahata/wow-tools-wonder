
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { Copy, RotateCcw, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DuplicateLineRemover = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [duplicatesCount, setDuplicatesCount] = useState(0);
  const { toast } = useToast();

  const removeDuplicates = () => {
    const lines = inputText.split('\n');
    const originalCount = lines.length;
    const uniqueLines = [...new Set(lines)];
    const duplicates = originalCount - uniqueLines.length;
    
    setOutputText(uniqueLines.join('\n'));
    setDuplicatesCount(duplicates);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: "Text with duplicates removed copied to clipboard.",
    });
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
    setDuplicatesCount(0);
  };

  const faqs = [
    {
      question: "How does the duplicate line remover work?",
      answer: "The tool compares each line in your text and removes any duplicate lines, keeping only unique lines. It preserves the order of first occurrence."
    },
    {
      question: "Does it remove empty lines?",
      answer: "Empty lines are treated as regular lines. If you have multiple empty lines, only one will be kept unless you remove them manually first."
    },
    {
      question: "Is the comparison case-sensitive?",
      answer: "Yes, the comparison is case-sensitive. 'Hello' and 'hello' would be treated as different lines."
    },
    {
      question: "What file formats does it support?",
      answer: "You can paste any text content. It works with code files, lists, CSV data, or any text with line breaks."
    }
  ];

  return (
    <SEOWrapper
      title="Duplicate Line Remover - Remove Duplicate Lines from Text"
      description="Free online duplicate line remover tool. Remove duplicate lines from text, code, lists, and data instantly. Perfect for cleaning up content and code."
      keywords="duplicate line remover, remove duplicates, text cleaner, unique lines, code cleaner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Duplicate Line Remover
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Remove duplicate lines from your text, code, or data. Keep only unique lines 
            and clean up your content instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Remove Duplicate Lines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your text with duplicate lines here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-32"
                />
                
                <Button 
                  onClick={removeDuplicates} 
                  disabled={!inputText.trim()}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Duplicates
                </Button>

                {outputText && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Cleaned Text:</span>
                        <Badge variant="secondary">
                          {duplicatesCount} duplicates removed
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

            <ToolFAQ toolName="Duplicate Line Remover" faqs={faqs} />
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
                      apple<br/>
                      banana<br/>
                      apple<br/>
                      orange<br/>
                      banana<br/>
                      grape
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-muted-foreground mb-1">After:</div>
                    <div className="bg-muted p-2 rounded text-xs font-mono">
                      apple<br/>
                      banana<br/>
                      orange<br/>
                      grape
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

export default DuplicateLineRemover;
