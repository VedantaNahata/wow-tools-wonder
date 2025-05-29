
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";
import { Copy, RotateCcw, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const formatJson = (indent = 2) => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setIsValid(true);
      setError("");
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setIsValid(true);
      setError("");
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setIsValid(true);
      setError("");
    } catch (err) {
      setIsValid(false);
      setError(err instanceof Error ? err.message : "Invalid JSON");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Formatted JSON copied to clipboard.",
    });
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setIsValid(null);
    setError("");
  };

  const loadSample = () => {
    const sample = {
      "name": "John Doe",
      "age": 30,
      "email": "john@example.com",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "zipCode": "10001"
      },
      "hobbies": ["reading", "swimming", "coding"],
      "isActive": true
    };
    setInput(JSON.stringify(sample));
  };

  return (
    <SEOWrapper
      title="JSON Formatter & Validator - Format and Validate JSON Online"
      description="Free online JSON formatter and validator. Format, minify, and validate JSON data instantly. Perfect for developers working with APIs and data."
      keywords="json formatter, json validator, json minifier, json beautifier, format json, validate json"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            JSON Formatter & Validator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Format, validate, and minify JSON data instantly. Perfect for developers 
            working with APIs, configuration files, and data structures.
          </p>
        </div>

        <AdSenseBox format="horizontal" slot="tool-header" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Input JSON</span>
                  {isValid !== null && (
                    <Badge variant={isValid ? "default" : "destructive"} className="flex items-center gap-1">
                      {isValid ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      {isValid ? "Valid" : "Invalid"}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste your JSON here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-48 font-mono text-sm"
                />
                
                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  <Button onClick={() => formatJson(2)} disabled={!input.trim()}>
                    Format (2 spaces)
                  </Button>
                  <Button onClick={() => formatJson(4)} disabled={!input.trim()} variant="outline">
                    Format (4 spaces)
                  </Button>
                  <Button onClick={minifyJson} disabled={!input.trim()} variant="outline">
                    Minify
                  </Button>
                  <Button onClick={validateJson} disabled={!input.trim()} variant="outline">
                    Validate Only
                  </Button>
                  <Button onClick={loadSample} variant="outline">
                    Load Sample
                  </Button>
                </div>
              </CardContent>
            </Card>

            {output && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Formatted JSON</span>
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
                        onClick={clearAll}
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={output}
                    readOnly
                    className="min-h-48 font-mono text-sm"
                  />
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>About JSON Formatter</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <p>
                  JSON (JavaScript Object Notation) is a lightweight data interchange format 
                  that's easy for humans to read and write. Our formatter helps you clean up 
                  and validate JSON data for better readability and debugging.
                </p>
                
                <h3>Features:</h3>
                <ul>
                  <li>Format JSON with customizable indentation</li>
                  <li>Minify JSON to reduce file size</li>
                  <li>Validate JSON syntax</li>
                  <li>Real-time error detection</li>
                  <li>Copy formatted output to clipboard</li>
                </ul>

                <h3>Common Use Cases:</h3>
                <ul>
                  <li>API response formatting</li>
                  <li>Configuration file validation</li>
                  <li>Data structure debugging</li>
                  <li>JSON file cleanup</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">JSON Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="font-medium">String values:</div>
                  <div className="text-muted-foreground">Must be in double quotes</div>
                </div>
                <div>
                  <div className="font-medium">Property names:</div>
                  <div className="text-muted-foreground">Must be in double quotes</div>
                </div>
                <div>
                  <div className="font-medium">No trailing commas:</div>
                  <div className="text-muted-foreground">Remove extra commas</div>
                </div>
                <div>
                  <div className="font-medium">Escape characters:</div>
                  <div className="text-muted-foreground">Use backslash for quotes</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SEOWrapper>
  );
};

export default JsonFormatter;
