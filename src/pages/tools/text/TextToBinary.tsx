
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { Copy, RotateCcw, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextToBinary = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState("text-to-binary");
  const [separator, setSeparator] = useState("space");
  const { toast } = useToast();

  const textToBinary = (text: string, sep: string) => {
    const separatorMap: { [key: string]: string } = {
      space: ' ',
      comma: ', ',
      dash: ' - ',
      none: ''
    };
    
    return text
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(separatorMap[sep]);
  };

  const binaryToText = (binary: string) => {
    // Remove any separators and split into 8-bit chunks
    const cleanBinary = binary.replace(/[^01]/g, '');
    const chunks = cleanBinary.match(/.{1,8}/g) || [];
    
    return chunks
      .map(chunk => {
        if (chunk.length !== 8) return '';
        const charCode = parseInt(chunk, 2);
        return String.fromCharCode(charCode);
      })
      .join('');
  };

  const convert = () => {
    try {
      let result = "";
      
      if (mode === "text-to-binary") {
        result = textToBinary(inputText, separator);
      } else {
        result = binaryToText(inputText);
      }
      
      setOutputText(result);
      toast({
        title: "Conversion Complete!",
        description: `Text has been converted successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid input for conversion",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: "Converted text copied to clipboard.",
    });
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
  };

  const switchMode = () => {
    const newMode = mode === "text-to-binary" ? "binary-to-text" : "text-to-binary";
    setMode(newMode);
    // Swap input and output if there's content
    if (outputText) {
      setInputText(outputText);
      setOutputText("");
    }
  };

  const faqs = [
    {
      question: "How does text to binary conversion work?",
      answer: "Each character is converted to its ASCII code, then that number is converted to an 8-bit binary representation (0s and 1s)."
    },
    {
      question: "What do the separator options do?",
      answer: "Separators make binary output more readable by adding spaces, commas, or dashes between each 8-bit byte."
    },
    {
      question: "Can I convert binary back to text?",
      answer: "Yes, use the 'Binary to Text' mode. The tool automatically handles common separators and converts 8-bit chunks back to characters."
    },
    {
      question: "What characters are supported?",
      answer: "All ASCII characters are supported, including letters, numbers, symbols, and special characters."
    }
  ];

  return (
    <SEOWrapper
      title="Text to Binary Converter - Convert Text to Binary Code"
      description="Free online text to binary converter. Convert text to binary code and binary to text instantly. Perfect for programming and educational purposes."
      keywords="text to binary, binary to text, binary converter, ASCII to binary, text encoder, binary decoder"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Text to Binary Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert text to binary code and vice versa. Perfect for understanding 
            how computers represent text data in binary format.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Convert Text ↔ Binary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder={mode === "text-to-binary" ? "Enter text to convert to binary..." : "Enter binary code to convert to text..."}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-32"
                />
                
                <div className="flex flex-wrap gap-4">
                  <Select value={mode} onValueChange={setMode}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text-to-binary">Text to Binary</SelectItem>
                      <SelectItem value="binary-to-text">Binary to Text</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {mode === "text-to-binary" && (
                    <Select value={separator} onValueChange={setSeparator}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="space">Space</SelectItem>
                        <SelectItem value="comma">Comma</SelectItem>
                        <SelectItem value="dash">Dash</SelectItem>
                        <SelectItem value="none">No Separator</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  
                  <Button variant="outline" onClick={switchMode}>
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    Switch Mode
                  </Button>
                </div>

                <Button 
                  onClick={convert} 
                  disabled={!inputText.trim()}
                  className="w-full"
                >
                  Convert {mode === "text-to-binary" ? "to Binary" : "to Text"}
                </Button>

                {outputText && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {mode === "text-to-binary" ? "Binary Code:" : "Converted Text:"}
                      </span>
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
                      className="min-h-32 font-mono text-sm"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <ToolFAQ toolName="Text to Binary Converter" faqs={faqs} />
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-medium text-muted-foreground mb-1">Text: "Hi"</div>
                    <div className="bg-muted p-2 rounded text-xs font-mono">
                      01001000 01101001
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-muted-foreground mb-1">ASCII Values:</div>
                    <div className="text-xs text-muted-foreground">
                      H = 72 = 01001000<br/>
                      i = 105 = 01101001
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

export default TextToBinary;
