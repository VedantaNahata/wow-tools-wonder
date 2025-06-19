import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdSenseBox from "@/components/AdSenseBox";
import SEOWrapper from "@/components/SEOWrapper";
import ToolFAQ from "@/components/ToolFAQ";
import { Copy, RotateCcw, Lock, Unlock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextEncryptor = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [method, setMethod] = useState("base64");
  const [caesarShift, setCaesarShift] = useState(3);
  const [isEncrypting, setIsEncrypting] = useState(true);
  const { toast } = useToast();

  const base64Encode = (text: string) => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (error) {
      throw new Error("Invalid characters for Base64 encoding");
    }
  };

  const base64Decode = (text: string) => {
    try {
      return decodeURIComponent(escape(atob(text)));
    } catch (error) {
      throw new Error("Invalid Base64 string");
    }
  };

  const caesarEncode = (text: string, shift: number) => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= "Z" ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - start + shift) % 26) + start
      );
    });
  };

  const caesarDecode = (text: string, shift: number) => {
    return caesarEncode(text, 26 - shift);
  };

  const processText = () => {
    try {
      let result = "";

      if (method === "base64") {
        result = isEncrypting
          ? base64Encode(inputText)
          : base64Decode(inputText);
      } else if (method === "caesar") {
        result = isEncrypting
          ? caesarEncode(inputText, caesarShift)
          : caesarDecode(inputText, caesarShift);
      }

      setOutputText(result);
      toast({
        title: `${isEncrypting ? "Encryption" : "Decryption"} Complete!`,
        description: `Text has been ${
          isEncrypting ? "encrypted" : "decrypted"
        } successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: "Copied!",
      description: `${
        isEncrypting ? "Encrypted" : "Decrypted"
      } text copied to clipboard.`,
    });
  };

  const clearText = () => {
    setInputText("");
    setOutputText("");
  };

  const faqs = [
    {
      question: "What is a text encryptor tool?",
      answer:
        "A text encryptor tool converts readable text into an encrypted format using methods like Base64, Caesar Cipher, or ROT13. It’s used to protect data or hide sensitive messages.",
    },
    {
      question: "How do I use this free online text encryptor?",
      answer:
        "Paste your text into the input area, select your preferred encryption method like Base64 or Caesar Cipher, and click encrypt. The encrypted output will appear instantly.",
    },
    {
      question: "What encryption methods does this tool support?",
      answer:
        "This online tool supports various basic encryption schemes like Base64 encoding, Caesar Cipher, and ROT13. These are ideal for lightweight encryption or educational purposes.",
    },
    {
      question: "Is this text encryption secure and done in-browser?",
      answer:
        "Yes, all text is encrypted locally in your browser. No data is transmitted or stored on servers, making it safe and privacy-friendly.",
    },
    {
      question: "Who can use a text encryptor tool?",
      answer:
        "This tool is useful for developers, students, and privacy-conscious users looking to encode text for secure sharing or basic data protection.",
    },
  ];

  return (
    <SEOWrapper
      title="Free Online Text Encryptor - Encrypt with Base64, Caesar Cipher"
      description="Use this free online text encryptor to convert text using Base64, Caesar Cipher. Encode and decode text using Base64 and Caesar cipher methods."
      keywords="free online text encryptor, text encrypter, free online text encrypter, text encryptor, base64 text encryption, caesar cipher tool, encrypt text online, encode decode text, encode messages, secure text encryption"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Text Encryptor / Decryptor
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encode and decode text using various methods like Base64 and Caesar
            cipher. Perfect for basic text obfuscation and educational purposes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Encrypt / Decrypt Text</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-32"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Method:</Label>
                    <Select value={method} onValueChange={setMethod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="base64">Base64</SelectItem>
                        <SelectItem value="caesar">Caesar Cipher</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {method === "caesar" && (
                    <div className="space-y-2">
                      <Label>Shift Amount:</Label>
                      <Input
                        type="number"
                        min="1"
                        max="25"
                        value={caesarShift}
                        onChange={(e) =>
                          setCaesarShift(parseInt(e.target.value) || 3)
                        }
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Action:</Label>
                    <Select
                      value={isEncrypting ? "encrypt" : "decrypt"}
                      onValueChange={(value) =>
                        setIsEncrypting(value === "encrypt")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="encrypt">Encrypt</SelectItem>
                        <SelectItem value="decrypt">Decrypt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={processText}
                  disabled={!inputText.trim()}
                  className="w-full"
                >
                  {isEncrypting ? (
                    <Lock className="h-4 w-4 mr-2" />
                  ) : (
                    <Unlock className="h-4 w-4 mr-2" />
                  )}
                  {isEncrypting ? "Encrypt" : "Decrypt"} Text
                </Button>

                {outputText && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {isEncrypting ? "Encrypted" : "Decrypted"} Text:
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={copyToClipboard}
                        >
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
                      className="min-h-32 font-mono"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <ToolFAQ toolName="Text Encryptor / Decryptor" faqs={faqs} />
          </div>

          <div className="space-y-6">
            <AdSenseBox format="rectangle" slot="tool-sidebar" />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-medium mb-1">Base64</div>
                    <div className="text-muted-foreground text-xs">
                      Encoding method that converts text to ASCII characters
                    </div>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Caesar Cipher</div>
                    <div className="text-muted-foreground text-xs">
                      Simple substitution cipher that shifts letters
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </SEOWrapper>
  );
};

export default TextEncryptor;
